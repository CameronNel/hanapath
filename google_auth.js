(function () {
  "use strict";

  const CONFIG = window.HANAPATH_FIREBASE_CONFIG || {};
  const SESSION_KEY = "hanapath-firebase-session-v1";
  const SYNC_META_KEY = "hanapath-cloud-sync-meta-v1";
  const DEVICE_KEY = "hanapath-cloud-device-v1";
  const MAX_STATE_BYTES = 850000;
  const SYNC_DELAY_MS = 1800;
  let adapter = null;
  let syncTimer = 0;
  let syncPromise = null;
  let applyingRemote = false;
  const mounted = new Set();

  function isNative() {
    return Boolean(window.Capacitor?.isNativePlatform?.());
  }

  function nativePlugin() {
    return window.Capacitor?.Plugins?.GoogleSignIn || null;
  }

  function readJson(key, fallback = null) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return value && typeof value === "object" ? value : fallback;
    } catch {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getSession() {
    const value = readJson(SESSION_KEY);
    return value?.refreshToken && value?.uid ? value : null;
  }

  function setSession(value) {
    if (value) writeJson(SESSION_KEY, value);
    else localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new CustomEvent("hanapath:auth-changed", {
      detail: { signedIn: Boolean(value), user: value ? publicUser(value) : null },
    }));
  }

  function publicUser(value) {
    return {
      uid: value.uid,
      email: value.email || "",
      displayName: value.displayName || "",
      photoUrl: value.photoUrl || "",
    };
  }

  function capability() {
    if (!CONFIG.apiKey || !CONFIG.projectId) {
      return { ready: false, code: "missing-firebase-config", message: "Account sync is not configured in this build." };
    }
    if (!window.crypto?.subtle || (!window.crypto?.randomUUID && !window.crypto?.getRandomValues)) {
      return { ready: false, code: "secure-context-required", message: "Google sign-in needs a secure browser context." };
    }
    if (isNative()) {
      if (!nativePlugin()?.signIn) {
        return { ready: false, code: "native-plugin-unavailable", message: "Google sign-in is unavailable in this app build." };
      }
      return { ready: true, platform: "android" };
    }
    if (!CONFIG.webClientId) {
      return { ready: false, code: "missing-web-client-id", message: "Google sign-in is not configured for this website." };
    }
    if (!window.HANAPATH_GOOGLE_WEB_AUTH?.renderButton) {
      return { ready: false, code: "web-adapter-unavailable", message: "Google sign-in is unavailable in this browser." };
    }
    return { ready: true, platform: "web" };
  }

  function nonce() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    const bytes = new Uint8Array(24);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
  }

  function apiError(payload, fallback) {
    const code = String(payload?.error?.message || "");
    const known = {
      INVALID_IDP_RESPONSE: "Google could not verify this sign-in. Please try again.",
      FEDERATED_USER_ID_ALREADY_LINKED: "This Google account is already linked to another HanaPath account.",
      TOKEN_EXPIRED: "Your session expired. Please sign in again.",
      USER_DISABLED: "This account has been disabled.",
      CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "Please sign in again before deleting your account.",
    };
    return new Error(known[code] || fallback);
  }

  async function jsonRequest(url, options, fallback) {
    const response = await fetch(url, options);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw apiError(payload, fallback);
    return payload;
  }

  async function exchangeCredential(credential, requestNonce, platform) {
    if (!credential) throw new Error("Google did not return an ID token.");
    const postBody = new URLSearchParams({
      id_token: credential,
      providerId: "google.com",
      nonce: requestNonce,
    }).toString();
    const payload = await jsonRequest(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${encodeURIComponent(CONFIG.apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postBody,
          requestUri: platform === "android" ? "http://localhost" : window.location.origin,
          returnIdpCredential: false,
          returnSecureToken: true,
        }),
      },
      "Firebase could not verify this Google account.",
    );
    const session = {
      uid: payload.localId,
      email: payload.email || "",
      displayName: payload.displayName || "",
      photoUrl: payload.photoUrl || "",
      idToken: payload.idToken,
      refreshToken: payload.refreshToken,
      expiresAt: Date.now() + (Number(payload.expiresIn) || 3600) * 1000,
    };
    if (!session.uid || !session.refreshToken || !session.idToken) {
      throw new Error("Firebase returned an incomplete sign-in session.");
    }
    setSession(session);
    refreshMounted();
    return session;
  }

  async function validSession(forceRefresh = false) {
    const current = getSession();
    if (!current) throw new Error("Sign in with Google to sync progress.");
    if (!forceRefresh && current.idToken && Number(current.expiresAt) > Date.now() + 60000) return current;
    const payload = await jsonRequest(
      `https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(CONFIG.apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: current.refreshToken }).toString(),
      },
      "Your HanaPath session could not be refreshed. Please sign in again.",
    );
    const renewed = {
      ...current,
      uid: payload.user_id || current.uid,
      idToken: payload.id_token,
      refreshToken: payload.refresh_token || current.refreshToken,
      expiresAt: Date.now() + (Number(payload.expires_in) || 3600) * 1000,
    };
    setSession(renewed);
    return renewed;
  }

  function documentUrl(uid) {
    return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(CONFIG.projectId)}/databases/(default)/documents/users/${encodeURIComponent(uid)}/backups/current`;
  }

  async function firestoreRequest(url, options = {}, allowMissing = false) {
    let session = await validSession();
    let response = await fetch(url, {
      ...options,
      headers: { ...(options.headers || {}), Authorization: `Bearer ${session.idToken}` },
    });
    if (response.status === 401) {
      session = await validSession(true);
      response = await fetch(url, {
        ...options,
        headers: { ...(options.headers || {}), Authorization: `Bearer ${session.idToken}` },
      });
    }
    if (allowMissing && response.status === 404) return null;
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw apiError(payload, "Cloud progress could not be accessed.");
    return payload;
  }

  function decodeDocument(document) {
    if (!document?.fields?.stateJson?.stringValue) return null;
    try {
      const state = JSON.parse(document.fields.stateJson.stringValue);
      if (!adapter?.validate?.(state)) return null;
      return {
        state,
        checksum: String(document.fields.checksum?.stringValue || ""),
        updatedAtMillis: Number(document.fields.updatedAtMillis?.integerValue || 0),
      };
    } catch {
      return null;
    }
  }

  async function readRemote(session) {
    return decodeDocument(await firestoreRequest(documentUrl(session.uid), {}, true));
  }

  function source() {
    return isNative() ? "android" : "web";
  }

  function deviceId() {
    let value = localStorage.getItem(DEVICE_KEY);
    if (value) return value;
    value = nonce();
    localStorage.setItem(DEVICE_KEY, value);
    return value;
  }

  async function digest(text) {
    const bytes = new TextEncoder().encode(text);
    const hash = await window.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(hash), (value) => value.toString(16).padStart(2, "0")).join("");
  }

  async function prepareState(profile) {
    const cloudState = window.HANAPATH_CLOUD_MERGE.stripForCloud(profile);
    const stateJson = window.HANAPATH_CLOUD_MERGE.stableStringify(cloudState);
    if (new TextEncoder().encode(stateJson).byteLength > MAX_STATE_BYTES) {
      throw new Error("Your progress backup is too large for cloud sync. Export a local backup and contact support.");
    }
    return { state: cloudState, stateJson, checksum: await digest(stateJson) };
  }

  async function writeRemote(session, prepared) {
    const now = Date.now();
    const fields = {
      schemaVersion: { integerValue: "1" },
      stateJson: { stringValue: prepared.stateJson },
      checksum: { stringValue: prepared.checksum },
      deviceId: { stringValue: deviceId() },
      source: { stringValue: source() },
      updatedAt: { timestampValue: new Date(now).toISOString() },
      updatedAtMillis: { integerValue: String(now) },
    };
    await firestoreRequest(documentUrl(session.uid), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
    });
    writeJson(SYNC_META_KEY, { uid: session.uid, lastChecksum: prepared.checksum, lastSyncedAt: now });
    return now;
  }

  function statusText(message, tone = "") {
    for (const container of mounted) {
      if (!container.isConnected) {
        mounted.delete(container);
        continue;
      }
      const line = container.querySelector("[data-google-auth-status]");
      if (line) {
        line.textContent = message;
        line.dataset.tone = tone;
      }
    }
  }

  async function performSync() {
    if (!adapter || !navigator.onLine) {
      if (!navigator.onLine) statusText("Offline. Changes will sync when you reconnect.", "muted");
      return { status: "offline" };
    }
    const session = await validSession();
    const local = await prepareState(adapter.read());
    const remote = await readRemote(session);
    const meta = readJson(SYNC_META_KEY, {});
    const lastChecksum = meta?.uid === session.uid ? String(meta.lastChecksum || "") : "";

    if (!remote) {
      await writeRemote(session, local);
      return { status: "uploaded" };
    }
    if (remote.checksum === local.checksum) {
      writeJson(SYNC_META_KEY, { uid: session.uid, lastChecksum: local.checksum, lastSyncedAt: Date.now() });
      return { status: "current" };
    }
    if ((lastChecksum && local.checksum === lastChecksum) || (!lastChecksum && !adapter.meaningful(adapter.read()))) {
      writeJson(SYNC_META_KEY, { uid: session.uid, lastChecksum: remote.checksum, lastSyncedAt: Date.now() });
      applyingRemote = true;
      await adapter.apply(adapter.adoptRemote(adapter.read(), remote.state));
      return { status: "downloaded", reloading: true };
    }
    if (lastChecksum && remote.checksum === lastChecksum) {
      await writeRemote(session, local);
      return { status: "uploaded" };
    }

    const mergedState = adapter.merge(adapter.read(), remote.state);
    const merged = await prepareState(mergedState);
    await writeRemote(session, merged);
    if (merged.checksum !== local.checksum) {
      applyingRemote = true;
      await adapter.apply(mergedState);
      return { status: "merged", reloading: true };
    }
    return { status: "merged" };
  }

  function syncNow(options = {}) {
    if (syncPromise) return syncPromise;
    window.clearTimeout(syncTimer);
    if (options.visible !== false) statusText("Syncing progress…");
    syncPromise = performSync()
      .then((result) => {
        if (!result?.reloading) statusText(result?.status === "offline" ? "Offline. Changes will sync when you reconnect." : "Progress synced.", result?.status === "offline" ? "muted" : "success");
        return result;
      })
      .catch((error) => {
        statusText(error?.message || "Progress could not be synced.", "error");
        throw error;
      })
      .finally(() => { syncPromise = null; });
    return syncPromise;
  }

  function notifyLocalSave() {
    if (applyingRemote || !getSession()) return;
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(() => syncNow({ visible: false }).catch(() => {}), SYNC_DELAY_MS);
  }

  async function signOut() {
    window.clearTimeout(syncTimer);
    try { await nativePlugin()?.signOut?.(); } catch {}
    try { window.google?.accounts?.id?.disableAutoSelect?.(); } catch {}
    setSession(null);
    localStorage.removeItem(SYNC_META_KEY);
    refreshMounted();
  }

  async function deleteAccount() {
    const confirmed = window.confirm("Permanently delete your HanaPath account, cloud progress, and progress on this device? This cannot be undone.");
    if (!confirmed) return false;
    statusText("Deleting account and progress…");
    const session = await validSession(true);
    await firestoreRequest(documentUrl(session.uid), { method: "DELETE" }, true);
    await jsonRequest(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${encodeURIComponent(CONFIG.apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: session.idToken }),
      },
      "Your account could not be deleted. Please sign in again and retry.",
    );
    setSession(null);
    localStorage.removeItem(SYNC_META_KEY);
    await adapter?.clearLocal?.();
    return true;
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function renderSignedIn(container, session) {
    const identity = escapeHtml(session.displayName || session.email || "Google account");
    const secondary = session.displayName && session.email ? `<span class="google-auth-email">${escapeHtml(session.email)}</span>` : "";
    container.innerHTML = `
      <div class="google-auth-account"><strong>${identity}</strong>${secondary}</div>
      <div class="settings-backup-actions google-auth-actions">
        <button class="button primary compact" type="button" data-google-sync>Sync now</button>
        <button class="button secondary compact" type="button" data-google-signout>Sign out</button>
        <button class="button secondary compact" type="button" data-google-delete>Delete account</button>
      </div>
      <p class="google-auth-status" data-google-auth-status role="status" aria-live="polite"></p>
      <p class="google-auth-note">Progress is backed up to this Google-linked HanaPath account and merged across signed-in devices. Google Play separately manages ad-free subscription status.</p>`;
    container.querySelector("[data-google-sync]")?.addEventListener("click", () => syncNow().catch(() => {}));
    container.querySelector("[data-google-signout]")?.addEventListener("click", () => signOut().catch((error) => statusText(error.message, "error")));
    container.querySelector("[data-google-delete]")?.addEventListener("click", () => deleteAccount().catch((error) => statusText(error.message, "error")));
    const meta = readJson(SYNC_META_KEY, {});
    if (meta?.uid === session.uid && Number(meta.lastSyncedAt)) {
      statusText(`Last synced ${new Date(meta.lastSyncedAt).toLocaleString()}.`, "success");
    }
  }

  function renderSignedOut(container, available, options) {
    container.innerHTML = `
      <div class="google-auth-button-slot" data-google-auth-button></div>
      <p class="google-auth-status" data-google-auth-status role="status" aria-live="polite"></p>
      <p class="google-auth-note">Optional. Sign in to back up and merge learning progress across your HanaPath devices.</p>`;
    const slot = container.querySelector("[data-google-auth-button]");
    if (!available.ready) {
      slot.innerHTML = '<button class="google-signin-disabled" type="button" disabled aria-disabled="true"><span class="google-g" aria-hidden="true">G</span><span>Continue with Google</span></button>';
      statusText(available.message, "muted");
      return;
    }
    const complete = async (credential, requestNonce) => {
      statusText("Signing in securely…");
      try {
        await exchangeCredential(credential, requestNonce, available.platform);
        statusText("Signed in. Syncing progress…", "success");
        await syncNow();
        options.onSuccess?.(publicUser(getSession()));
      } catch (error) {
        statusText(error?.message || "Google sign-in could not be completed.", "error");
        options.onError?.(error);
      }
    };
    if (available.platform === "android") {
      slot.innerHTML = '<button class="google-signin-native" type="button"><span class="google-g" aria-hidden="true">G</span><span>Continue with Google</span></button>';
      slot.querySelector("button")?.addEventListener("click", async () => {
        statusText("Opening Google…");
        try {
          const result = await nativePlugin().signIn();
          if (!result?.nonce) throw new Error("Google sign-in did not return its request nonce.");
          await complete(result.idToken, result.nonce);
        } catch (error) {
          statusText(error?.message || "Google sign-in was cancelled.", "error");
        }
      });
      return;
    }
    const requestNonce = nonce();
    window.HANAPATH_GOOGLE_WEB_AUTH.renderButton(slot, {
      clientId: CONFIG.webClientId,
      nonce: requestNonce,
      onCredential: (credential) => complete(credential, requestNonce),
      onError: (error) => statusText(error?.message || "Google sign-in is unavailable.", "error"),
    });
  }

  function render(container, options = {}) {
    if (!container) return;
    mounted.add(container);
    const session = getSession();
    if (session) renderSignedIn(container, session);
    else renderSignedOut(container, capability(), options);
  }

  function refreshMounted() {
    for (const container of [...mounted]) {
      if (container.isConnected) render(container);
      else mounted.delete(container);
    }
  }

  function attachStateAdapter(value) {
    adapter = value;
    if (getSession()) syncNow({ visible: false }).catch(() => {});
  }

  window.addEventListener("online", () => {
    if (getSession()) syncNow({ visible: false }).catch(() => {});
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && getSession()) syncNow({ visible: false }).catch(() => {});
  });

  window.HANAPATH_GOOGLE_AUTH = Object.freeze({
    attachStateAdapter,
    capability,
    deleteAccount,
    getUser: () => getSession() ? publicUser(getSession()) : null,
    notifyLocalSave,
    render,
    signOut,
    syncNow,
  });
}());
