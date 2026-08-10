(function () {
  "use strict";

  const PROGRESS_KEY = "hanapath-v1";
  const AUTH_SESSION_KEY = "hanapath-firebase-auth-v1";
  const DEVICE_ID_KEY = "hanapath-cloud-device-v1";
  const SYNC_META_PREFIX = "hanapath-cloud-sync-v1:";
  const CONFLICT_PREFIX = "hanapath-cloud-conflict-v1:";
  const CLOUD_ROLLBACK_KEY = "hanapath-v1-cloud-rollback";
  const RELOAD_GUARD_PREFIX = "hanapath-cloud-reload-v1:";
  const MAX_CLOUD_STATE_BYTES = 700 * 1024;
  const SYNC_DEBOUNCE_MS = 4000;
  const TOKEN_REFRESH_SKEW_MS = 5 * 60 * 1000;

  const IDENTITY_TOOLKIT_BASE = "https://identitytoolkit.googleapis.com";
  const SECURE_TOKEN_BASE = "https://securetoken.googleapis.com";
  const FIRESTORE_BASE = "https://firestore.googleapis.com";

  const CONFIG = Object.freeze({
    firebaseApiKey: String(window.HANAPATH_AUTH_CONFIG?.firebaseApiKey || "").trim(),
    firebaseProjectId: String(window.HANAPATH_AUTH_CONFIG?.firebaseProjectId || "").trim(),
    webClientId: String(window.HANAPATH_AUTH_CONFIG?.webClientId || "").trim(),
  });

  const originalStorageSetItem = Storage.prototype.setItem;
  let suppressProgressHook = false;
  let session = null;
  let syncTimer = null;
  let activeSync = null;
  let syncRequestedWhileActive = false;
  let lastSyncStatus = { code: "idle", message: "" };

  function isNative() {
    return Boolean(window.Capacitor?.isNativePlatform?.());
  }

  function nativePlugin() {
    return window.Capacitor?.Plugins?.GoogleSignIn || null;
  }

  function configured() {
    if (!CONFIG.firebaseApiKey || !CONFIG.firebaseProjectId) return false;
    if (!isNative() && !CONFIG.webClientId) return false;
    return true;
  }

  function capability() {
    if (!configured()) {
      return {
        ready: false,
        code: "missing-firebase-config",
        message: "Google sync needs the owner’s Firebase project configuration.",
      };
    }
    if (!window.crypto?.getRandomValues || !window.crypto?.subtle || typeof TextEncoder !== "function") {
      return {
        ready: false,
        code: "secure-browser-unavailable",
        message: "Google sync needs a secure browser context.",
      };
    }
    if (isNative()) {
      if (!nativePlugin()?.signIn) {
        return {
          ready: false,
          code: "native-plugin-unavailable",
          message: "Google sign-in is not available in this app build.",
        };
      }
      return { ready: true, platform: "android" };
    }
    if (!window.HANAPATH_GOOGLE_WEB_AUTH?.renderButton) {
      return {
        ready: false,
        code: "web-adapter-unavailable",
        message: "Google sign-in is unavailable in this browser.",
      };
    }
    return { ready: true, platform: "web" };
  }

  function safeJsonParse(value, fallback = null) {
    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  function storageGet(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      originalStorageSetItem.call(localStorage, key, value);
      return localStorage.getItem(key) === value;
    } catch {
      return false;
    }
  }

  function storageRemove(key) {
    try {
      localStorage.removeItem(key);
    } catch {}
  }

  function randomId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    const bytes = new Uint8Array(24);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
  }

  function deviceId() {
    const existing = storageGet(DEVICE_ID_KEY);
    if (existing) return existing;
    const created = randomId();
    storageSet(DEVICE_ID_KEY, created);
    return created;
  }

  async function sha256(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function firebaseError(payload, fallback) {
    const raw = payload?.error?.message || payload?.error_description || fallback || "Firebase request failed.";
    const message = String(raw).replace(/_/g, " ").toLowerCase();
    const error = new Error(message.charAt(0).toUpperCase() + message.slice(1));
    error.code = String(raw);
    return error;
  }

  async function fetchJson(url, options = {}, fallbackMessage = "Request failed.") {
    const response = await fetch(url, options);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = firebaseError(payload, fallbackMessage);
      error.httpStatus = response.status;
      throw error;
    }
    return { response, payload };
  }

  function normalizeSession(payload, previous = null) {
    const expiresSeconds = Number(payload.expiresIn ?? payload.expires_in ?? 3600);
    return {
      uid: String(payload.localId || payload.user_id || previous?.uid || ""),
      email: String(payload.email || previous?.email || ""),
      displayName: String(payload.displayName || previous?.displayName || ""),
      photoUrl: String(payload.photoUrl || previous?.photoUrl || ""),
      idToken: String(payload.idToken || payload.id_token || ""),
      refreshToken: String(payload.refreshToken || payload.refresh_token || previous?.refreshToken || ""),
      expiresAt: Date.now() + Math.max(60, expiresSeconds) * 1000,
    };
  }

  function persistSession(next) {
    if (!next?.uid || !next?.idToken || !next?.refreshToken) return false;
    // The Google credential itself is never persisted. This is Firebase's
    // renewable client session, equivalent to Firebase Auth web persistence.
    if (!storageSet(AUTH_SESSION_KEY, JSON.stringify(next))) return false;
    session = next;
    return true;
  }

  function restoreStoredSession() {
    const parsed = safeJsonParse(storageGet(AUTH_SESSION_KEY));
    if (!parsed?.uid || !parsed?.refreshToken) return null;
    session = parsed;
    return session;
  }

  function clearSession() {
    session = null;
    storageRemove(AUTH_SESSION_KEY);
  }

  async function refreshSession(force = false) {
    if (!session?.refreshToken) return null;
    if (!force && session.idToken && Number(session.expiresAt) > Date.now() + TOKEN_REFRESH_SKEW_MS) return session;

    const form = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: session.refreshToken,
    });
    try {
      const { payload } = await fetchJson(
        `${SECURE_TOKEN_BASE}/v1/token?key=${encodeURIComponent(CONFIG.firebaseApiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: form.toString(),
        },
        "Firebase session refresh failed.",
      );
      const refreshed = normalizeSession(payload, session);
      if (!persistSession(refreshed)) throw new Error("The refreshed Firebase session could not be saved.");
      return refreshed;
    } catch (error) {
      if (/TOKEN_EXPIRED|USER_DISABLED|USER_NOT_FOUND|INVALID_REFRESH_TOKEN|PROJECT_NUMBER_MISMATCH/.test(error?.code || "")) {
        clearSession();
        emitAuthChanged();
      }
      throw error;
    }
  }

  async function signInWithGoogle(googleIdToken) {
    if (!configured()) throw new Error("Firebase is not configured for HanaPath yet.");
    if (!googleIdToken) throw new Error("Google did not return an ID token.");

    const postBody = new URLSearchParams({
      id_token: googleIdToken,
      providerId: "google.com",
    }).toString();
    const requestUri = window.location?.origin && window.location.origin !== "null"
      ? window.location.origin
      : "http://localhost";

    const { payload } = await fetchJson(
      `${IDENTITY_TOOLKIT_BASE}/v1/accounts:signInWithIdp?key=${encodeURIComponent(CONFIG.firebaseApiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestUri,
          postBody,
          returnIdpCredential: true,
          returnSecureToken: true,
        }),
      },
      "Google could not be exchanged for a Firebase account.",
    );

    const next = normalizeSession(payload);
    if (!persistSession(next)) throw new Error("The Firebase session could not be saved on this device.");
    emitAuthChanged();
    await syncNow("sign-in");
    return { user: publicUser(), sync: lastSyncStatus };
  }

  function publicUser() {
    if (!session?.uid) return null;
    return {
      uid: session.uid,
      email: session.email || "",
      displayName: session.displayName || "",
      photoUrl: session.photoUrl || "",
    };
  }

  function syncMetaKey(uid) {
    return `${SYNC_META_PREFIX}${uid}`;
  }

  function conflictKey(uid) {
    return `${CONFLICT_PREFIX}${uid}`;
  }

  function readSyncMeta(uid) {
    return safeJsonParse(storageGet(syncMetaKey(uid)), {}) || {};
  }

  function writeSyncMeta(uid, meta) {
    storageSet(syncMetaKey(uid), JSON.stringify({
      uid,
      deviceId: deviceId(),
      ...meta,
    }));
  }

  function readConflict(uid) {
    return safeJsonParse(storageGet(conflictKey(uid)), null);
  }

  function clearConflict(uid) {
    storageRemove(conflictKey(uid));
  }

  function setSyncStatus(code, message, detail = {}) {
    lastSyncStatus = { code, message, ...detail };
    window.dispatchEvent(new CustomEvent("hanapath:cloud-sync", { detail: lastSyncStatus }));
    rerenderAuthPanels();
  }

  function readLocalProgress() {
    const raw = storageGet(PROGRESS_KEY);
    if (!raw) return null;
    const parsed = safeJsonParse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return { raw, parsed };
  }

  function hasMeaningfulProgress(profile) {
    try {
      if (typeof window.hasMeaningfulLearnerProgress === "function") {
        return Boolean(window.hasMeaningfulLearnerProgress(profile));
      }
    } catch {}
    if (!profile || typeof profile !== "object") return false;
    if ([profile.asked, profile.correct, profile.totalMinutes, profile.studyDays].some((value) => Number(value) > 0)) return true;
    if (Array.isArray(profile.phaseOneCompleted) && profile.phaseOneCompleted.length > 0) return true;
    if (profile.alphabetMasteryExam && Number(profile.alphabetMasteryExam.attempts) > 0) return true;
    if (profile.wordExams && Object.values(profile.wordExams).some((entry) => Number(entry?.attempts) > 0)) return true;
    if (profile.sentenceExams && JSON.stringify(profile.sentenceExams).length > 250) return true;
    return false;
  }

  function firestoreDocumentUrl(uid) {
    return `${FIRESTORE_BASE}/v1/projects/${encodeURIComponent(CONFIG.firebaseProjectId)}`
      + `/databases/(default)/documents/users/${encodeURIComponent(uid)}/progress/current`;
  }

  async function authorizedFetch(url, options = {}, retry = true) {
    const active = await refreshSession(false);
    if (!active?.idToken) throw new Error("Sign in again to sync progress.");
    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${active.idToken}`);
    const response = await fetch(url, { ...options, headers });
    if (response.status === 401 && retry) {
      await refreshSession(true);
      return authorizedFetch(url, options, false);
    }
    return response;
  }

  function decodeCloudDocument(payload) {
    const fields = payload?.fields || {};
    const stateJson = String(fields.stateJson?.stringValue || "");
    const parsed = safeJsonParse(stateJson);
    if (!stateJson || !parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Cloud progress is unreadable; this device was left unchanged.");
    }
    return {
      stateJson,
      parsed,
      stateSha256: String(fields.stateSha256?.stringValue || ""),
      revision: Number(fields.revision?.integerValue || 0),
      deviceId: String(fields.deviceId?.stringValue || ""),
      clientUpdatedAt: String(fields.clientUpdatedAt?.timestampValue || ""),
      updateTime: String(payload.updateTime || ""),
    };
  }

  async function fetchCloudProgress() {
    const response = await authorizedFetch(firestoreDocumentUrl(session.uid), { method: "GET" });
    if (response.status === 404) return null;
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw firebaseError(payload, "Cloud progress could not be loaded.");
    const cloud = decodeCloudDocument(payload);
    const actualHash = await sha256(cloud.stateJson);
    if (!cloud.stateSha256 || cloud.stateSha256 !== actualHash) {
      throw new Error("Cloud progress failed its integrity check; this device was left unchanged.");
    }
    return cloud;
  }

  function progressDocument(localRaw, hash, revision) {
    return {
      fields: {
        schemaVersion: { integerValue: "1" },
        stateJson: { stringValue: localRaw },
        stateSha256: { stringValue: hash },
        revision: { integerValue: String(revision) },
        deviceId: { stringValue: deviceId() },
        clientUpdatedAt: { timestampValue: new Date().toISOString() },
      },
    };
  }

  async function uploadLocalProgress(local, remote = null) {
    const bytes = new TextEncoder().encode(local.raw).byteLength;
    if (bytes > MAX_CLOUD_STATE_BYTES) {
      throw new Error("This progress file is too large for HanaPath cloud sync. Export a backup before continuing.");
    }
    const hash = await sha256(local.raw);
    const revision = Math.max(0, Number(remote?.revision || 0)) + 1;
    const url = new URL(firestoreDocumentUrl(session.uid));
    if (remote?.updateTime) url.searchParams.set("currentDocument.updateTime", remote.updateTime);
    else url.searchParams.set("currentDocument.exists", "false");

    const response = await authorizedFetch(url.toString(), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progressDocument(local.raw, hash, revision)),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = firebaseError(payload, "Cloud progress could not be saved.");
      error.httpStatus = response.status;
      throw error;
    }
    const written = decodeCloudDocument(payload);
    writeSyncMeta(session.uid, {
      lastSyncedHash: hash,
      lastCloudUpdateTime: written.updateTime,
      lastRevision: revision,
      lastSyncedAt: new Date().toISOString(),
    });
    clearConflict(session.uid);
    setSyncStatus("synced", "Progress synced across your signed-in devices.", { revision });
    return written;
  }

  function persistConflict(local, remote) {
    const record = {
      uid: session.uid,
      detectedAt: new Date().toISOString(),
      localState: local.raw,
      remoteHash: remote.stateSha256,
      remoteUpdateTime: remote.updateTime,
      remoteRevision: remote.revision,
    };
    storageSet(conflictKey(session.uid), JSON.stringify(record));
    setSyncStatus(
      "conflict",
      "Both this device and the cloud changed. HanaPath kept both copies instead of overwriting progress.",
      { revision: remote.revision },
    );
  }

  function applyCloudProgress(remote) {
    const existing = storageGet(PROGRESS_KEY);
    if (existing && existing !== remote.stateJson) storageSet(CLOUD_ROLLBACK_KEY, existing);
    suppressProgressHook = true;
    try {
      originalStorageSetItem.call(localStorage, PROGRESS_KEY, remote.stateJson);
    } finally {
      suppressProgressHook = false;
    }
    writeSyncMeta(session.uid, {
      lastSyncedHash: remote.stateSha256,
      lastCloudUpdateTime: remote.updateTime,
      lastRevision: remote.revision,
      lastSyncedAt: new Date().toISOString(),
    });
    clearConflict(session.uid);
    setSyncStatus("downloaded", "Newer cloud progress was downloaded to this device.", { revision: remote.revision });

    try {
      const guardKey = `${RELOAD_GUARD_PREFIX}${session.uid}`;
      if (sessionStorage.getItem(guardKey) !== remote.updateTime) {
        sessionStorage.setItem(guardKey, remote.updateTime);
        window.setTimeout(() => window.location.reload(), 60);
      }
    } catch {}
  }

  async function reconcileProgress(local, remote) {
    const localHash = await sha256(local.raw);
    if (!remote) return uploadLocalProgress(local, null);

    if (localHash === remote.stateSha256) {
      writeSyncMeta(session.uid, {
        lastSyncedHash: localHash,
        lastCloudUpdateTime: remote.updateTime,
        lastRevision: remote.revision,
        lastSyncedAt: new Date().toISOString(),
      });
      clearConflict(session.uid);
      setSyncStatus("synced", "Progress is up to date on this device.", { revision: remote.revision });
      return remote;
    }

    const meta = readSyncMeta(session.uid);
    const baseHash = String(meta.lastSyncedHash || "");
    if (baseHash) {
      const localChanged = localHash !== baseHash;
      const remoteChanged = remote.stateSha256 !== baseHash;
      if (!localChanged && remoteChanged) {
        applyCloudProgress(remote);
        return remote;
      }
      if (localChanged && !remoteChanged) return uploadLocalProgress(local, remote);
      if (localChanged && remoteChanged) {
        persistConflict(local, remote);
        return null;
      }
    }

    const localMeaningful = hasMeaningfulProgress(local.parsed);
    const remoteMeaningful = hasMeaningfulProgress(remote.parsed);
    if (!localMeaningful && remoteMeaningful) {
      applyCloudProgress(remote);
      return remote;
    }
    if (localMeaningful && !remoteMeaningful) return uploadLocalProgress(local, remote);
    if (!localMeaningful && !remoteMeaningful) {
      applyCloudProgress(remote);
      return remote;
    }

    persistConflict(local, remote);
    return null;
  }

  async function performSync(reason = "manual") {
    if (!configured()) return setSyncStatus("disabled", "Cloud sync is not configured yet.");
    if (!session?.refreshToken) return setSyncStatus("signed-out", "Sign in with Google to sync progress.");
    if (navigator.onLine === false) return setSyncStatus("offline", "Offline. Progress is safe locally and will sync later.");

    const local = readLocalProgress();
    if (!local) return setSyncStatus("waiting", "Waiting for local progress to initialize.");

    setSyncStatus("syncing", "Syncing progress…", { reason });
    try {
      const remote = await fetchCloudProgress();
      return await reconcileProgress(local, remote);
    } catch (error) {
      if ([409, 412].includes(error?.httpStatus)) {
        const remote = await fetchCloudProgress();
        return reconcileProgress(local, remote);
      }
      setSyncStatus("error", error?.message || "Cloud sync failed. Local progress is unchanged.");
      return null;
    }
  }

  async function syncNow(reason = "manual") {
    if (activeSync) {
      syncRequestedWhileActive = true;
      return activeSync;
    }
    activeSync = performSync(reason).finally(() => {
      activeSync = null;
      if (syncRequestedWhileActive) {
        syncRequestedWhileActive = false;
        scheduleSync("queued");
      }
    });
    return activeSync;
  }

  function scheduleSync(reason = "local-change") {
    if (!session?.refreshToken || !configured()) return;
    if (syncTimer) window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(() => {
      syncTimer = null;
      syncNow(reason);
    }, SYNC_DEBOUNCE_MS);
  }

  Storage.prototype.setItem = function (key, value) {
    const result = originalStorageSetItem.call(this, key, value);
    try {
      if (!suppressProgressHook && this === window.localStorage && key === PROGRESS_KEY) scheduleSync("local-save");
    } catch {}
    return result;
  };

  async function resolveConflict(strategy) {
    if (!session?.uid) throw new Error("Sign in to resolve cloud progress.");
    const conflict = readConflict(session.uid);
    if (!conflict) return syncNow("conflict-check");
    const remote = await fetchCloudProgress();
    if (!remote) return uploadLocalProgress(readLocalProgress(), null);

    if (strategy === "cloud") {
      applyCloudProgress(remote);
      return;
    }
    if (strategy === "device") {
      if (conflict.remoteUpdateTime && remote.updateTime !== conflict.remoteUpdateTime) {
        throw new Error("The cloud copy changed again. Sync once more before choosing this device.");
      }
      const local = readLocalProgress();
      if (!local) throw new Error("No local progress is available.");
      return uploadLocalProgress(local, remote);
    }
    throw new Error("Unknown conflict resolution choice.");
  }

  async function signOut() {
    clearSession();
    setSyncStatus("signed-out", "Signed out. Progress remains safely on this device.");
    emitAuthChanged();
  }

  async function deleteCloudAccount() {
    if (!session?.uid) throw new Error("No signed-in HanaPath account was found.");
    await refreshSession(false);
    const uid = session.uid;
    const progressResponse = await authorizedFetch(firestoreDocumentUrl(uid), { method: "DELETE" });
    if (!progressResponse.ok && progressResponse.status !== 404) {
      const payload = await progressResponse.json().catch(() => ({}));
      throw firebaseError(payload, "Cloud progress could not be deleted.");
    }

    const { payload } = await fetchJson(
      `${IDENTITY_TOOLKIT_BASE}/v1/accounts:delete?key=${encodeURIComponent(CONFIG.firebaseApiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: session.idToken }),
      },
      "The Firebase account could not be deleted.",
    );
    void payload;
    storageRemove(syncMetaKey(uid));
    storageRemove(conflictKey(uid));
    clearSession();
    setSyncStatus("deleted", "Cloud account and synced progress deleted. Local progress was kept on this device.");
    emitAuthChanged();
  }

  function emitAuthChanged() {
    window.dispatchEvent(new CustomEvent("hanapath:auth-changed", {
      detail: { signedIn: Boolean(session?.uid), user: publicUser() },
    }));
    rerenderAuthPanels();
  }

  function statusLine(container, message, tone = "") {
    const line = container.querySelector("[data-google-auth-status]");
    if (!line) return;
    line.textContent = message;
    line.dataset.tone = tone;
  }

  function patchSettingsCopy(container) {
    if (container?.id !== "googleAuthSettings") return;
    const section = container.closest(".settings-section");
    const subtitle = section?.querySelector(".settings-section-sub");
    if (subtitle) {
      subtitle.textContent = configured()
        ? "Google sign-in is optional. Signed-in progress is backed up to Firebase and synced across your devices; a local offline copy remains on each device."
        : "Google sign-in is optional. Cloud sync will stay disabled until the owner adds the Firebase project configuration.";
    }
    const backupSection = section?.nextElementSibling;
    const backupSubtitle = backupSection?.querySelector?.(".settings-section-sub");
    if (backupSubtitle && configured()) {
      backupSubtitle.textContent = "HanaPath keeps a local offline copy even when cloud sync is enabled. Manual exports remain useful as an independent backup you control.";
    }
  }

  function signedInMarkup(container) {
    const user = publicUser();
    const label = user?.displayName || user?.email || "Google account";
    const conflict = readConflict(user.uid);
    const deleteButton = container.id === "googleAuthSettings"
      ? '<button class="button secondary compact" type="button" data-cloud-delete>Delete cloud account</button>'
      : "";
    const conflictButtons = conflict
      ? '<div class="settings-backup-actions"><button class="button secondary compact" type="button" data-cloud-use-device>Keep this device</button><button class="button secondary compact" type="button" data-cloud-use-cloud>Use cloud copy</button></div>'
      : "";
    return `
      <div class="google-auth-signed-in">
        <p class="google-auth-note">Signed in as <strong>${escapeHtml(label)}</strong>. Progress syncs automatically and remains available offline.</p>
        <p class="google-auth-status" data-google-auth-status role="status" aria-live="polite"></p>
        ${conflictButtons}
        <div class="settings-backup-actions">
          <button class="button secondary compact" type="button" data-cloud-sync-now>Sync now</button>
          <button class="button secondary compact" type="button" data-google-signout>Sign out</button>
          ${deleteButton}
        </div>
      </div>`;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function bindSignedInActions(container) {
    container.querySelector("[data-cloud-sync-now]")?.addEventListener("click", () => syncNow("manual"));
    container.querySelector("[data-google-signout]")?.addEventListener("click", () => signOut());
    container.querySelector("[data-cloud-use-device]")?.addEventListener("click", async () => {
      statusLine(container, "Keeping this device’s progress…");
      try { await resolveConflict("device"); } catch (error) { statusLine(container, error?.message || "Could not resolve the conflict.", "error"); }
    });
    container.querySelector("[data-cloud-use-cloud]")?.addEventListener("click", async () => {
      statusLine(container, "Using the cloud copy…");
      try { await resolveConflict("cloud"); } catch (error) { statusLine(container, error?.message || "Could not resolve the conflict.", "error"); }
    });
    container.querySelector("[data-cloud-delete]")?.addEventListener("click", async () => {
      const confirmed = window.confirm("Delete your HanaPath cloud account and its synced progress? Progress stored on this device will remain here.");
      if (!confirmed) return;
      statusLine(container, "Deleting cloud account…");
      try { await deleteCloudAccount(); } catch (error) { statusLine(container, error?.message || "Cloud account deletion failed.", "error"); }
    });
    if (lastSyncStatus.message) statusLine(container, lastSyncStatus.message, lastSyncStatus.code === "error" ? "error" : lastSyncStatus.code === "synced" ? "success" : "");
  }

  function render(container, options = {}) {
    if (!container) return;
    patchSettingsCopy(container);
    const available = capability();

    if (session?.uid) {
      container.innerHTML = signedInMarkup(container);
      bindSignedInActions(container);
      options.onSuccess?.({ user: publicUser(), restored: true });
      return;
    }

    container.innerHTML = `
      <div class="google-auth-button-slot" data-google-auth-button></div>
      <p class="google-auth-status" data-google-auth-status role="status" aria-live="polite"></p>
      <p class="google-auth-note">Sign in to back up learning progress and sync it across your devices. HanaPath still works offline and keeps a local copy.</p>`;
    const slot = container.querySelector("[data-google-auth-button]");
    statusLine(container, available.ready ? "" : available.message, available.ready ? "" : "muted");

    if (!available.ready) {
      slot.innerHTML = '<button class="google-signin-disabled" type="button" disabled aria-disabled="true"><span class="google-g" aria-hidden="true">G</span><span>Continue with Google</span></button>';
      return;
    }

    const complete = async (credential) => {
      statusLine(container, "Signing in securely…");
      try {
        const result = await signInWithGoogle(credential);
        statusLine(container, result.sync?.message || "Signed in with Google.", "success");
        options.onSuccess?.(result);
        rerenderAuthPanels();
      } catch (error) {
        statusLine(container, error?.message || "Google sign-in could not be completed.", "error");
        options.onError?.(error);
      }
    };

    if (available.platform === "android") {
      slot.innerHTML = '<button class="google-signin-native" type="button"><span class="google-g" aria-hidden="true">G</span><span>Continue with Google</span></button>';
      slot.querySelector("button")?.addEventListener("click", async () => {
        statusLine(container, "Opening Google…");
        try {
          const result = await nativePlugin().signIn();
          if (!result?.idToken || !result?.nonce) throw new Error("Google sign-in did not return a complete credential.");
          await complete(result.idToken);
        } catch (error) {
          statusLine(container, error?.message || "Google sign-in was cancelled.", "error");
        }
      });
      return;
    }

    window.HANAPATH_GOOGLE_WEB_AUTH.renderButton(slot, {
      clientId: CONFIG.webClientId,
      nonce: randomId(),
      onCredential: complete,
      onError: (error) => statusLine(container, error?.message || "Google sign-in is unavailable.", "error"),
    });
  }

  function rerenderAuthPanels() {
    for (const id of ["googleAuthOnboarding", "googleAuthSettings"]) {
      const container = document.getElementById(id);
      if (container?.isConnected) render(container);
    }
  }

  async function bootstrap() {
    if (!configured()) {
      setSyncStatus("disabled", "Cloud sync is not configured yet.");
      return;
    }
    restoreStoredSession();
    if (!session) {
      emitAuthChanged();
      return;
    }
    try {
      await refreshSession(false);
      emitAuthChanged();
      await syncNow("startup");
    } catch (error) {
      setSyncStatus("error", error?.message || "Cloud session could not be restored. Local progress is unchanged.");
    }
  }

  window.addEventListener("online", () => scheduleSync("online"));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && session?.uid) syncNow("background");
  });
  window.addEventListener("DOMContentLoaded", () => bootstrap(), { once: true });

  window.HANAPATH_GOOGLE_AUTH = Object.freeze({ capability, render, signOut, deleteCloudAccount });
  window.HANAPATH_FIREBASE_SYNC = Object.freeze({
    configured,
    currentUser: publicUser,
    status: () => ({ ...lastSyncStatus }),
    syncNow,
    resolveConflict,
  });
}());
