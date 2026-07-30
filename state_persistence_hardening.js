// Persistence, backup, and local-calendar safety layer.
(function () {
  "use strict";

  const BACKUP_FORMAT = "hanapath-backup";
  const BACKUP_VERSION = 2;
  const MAX_BACKUP_BYTES = 5 * 1024 * 1024;
  const MAX_BACKUP_DEPTH = 40;
  const MAX_BACKUP_NODES = 100000;
  const ROLLBACK_KEY = `${STORAGE_KEY}-import-rollback-v2`;
  const LEGACY_ROLLBACK_KEY = `${STORAGE_KEY}-import-rollback`;
  const ROLLBACK_TTL_MS = 7 * 24 * 60 * 60 * 1000;
  const EXAM_RESULT_LIMIT = 500;
  const EXAM_RELATION_LIMIT = 500;
  const WRITING_HISTORY_LIMIT = 100;
  const VOCAB_EVENT_LIMIT = 5000;
  const FORBIDDEN_KEYS = new Set(["__proto__", "prototype", "constructor"]);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isPlainObject(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  }

  function localDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function byteLength(text) {
    if (typeof TextEncoder === "function") return new TextEncoder().encode(text).length;
    return unescape(encodeURIComponent(text)).length;
  }

  function validateJsonGraph(root) {
    const stack = [{ value: root, depth: 0 }];
    let nodes = 0;
    while (stack.length) {
      const { value, depth } = stack.pop();
      nodes += 1;
      if (nodes > MAX_BACKUP_NODES) throw new Error("Backup contains too many values.");
      if (depth > MAX_BACKUP_DEPTH) throw new Error("Backup nesting is too deep.");
      if (!value || typeof value !== "object") continue;
      for (const key of Object.keys(value)) {
        if (FORBIDDEN_KEYS.has(key)) throw new Error(`Backup contains forbidden key '${key}'.`);
        stack.push({ value: value[key], depth: depth + 1 });
      }
    }
  }

  function hasRecognizableStateShape(candidate) {
    return ["onboarded", "level", "phaseOneCompleted", "correct", "examResults", "skills"]
      .some((key) => Object.prototype.hasOwnProperty.call(candidate, key));
  }

  function deriveLevel(candidate) {
    const order = Array.isArray(window.ALPHABET_LESSON_IDS)
      ? window.ALPHABET_LESSON_IDS
      : (typeof ALPHABET_LESSON_IDS !== "undefined" && Array.isArray(ALPHABET_LESSON_IDS) ? ALPHABET_LESSON_IDS : []);
    const completed = new Set(Array.isArray(candidate.phaseOneCompleted) ? candidate.phaseOneCompleted : []);
    let index = order.length && order.every((id) => completed.has(id)) ? 1 : 0;
    const correct = Math.max(0, Number(candidate.correct) || 0);
    const known = Array.isArray(candidate.vocabKnownRanks) ? candidate.vocabKnownRanks.length : 0;
    const days = Math.max(0, Number(candidate.studyDays) || 0);
    if (index >= 1 && correct >= 20) index = 2;
    if (index >= 2 && correct >= 50 && known >= 20) index = 3;
    if (index >= 3 && correct >= 100 && days >= 3) index = 4;
    if (index >= 4 && correct >= 180 && known >= 100) index = 5;
    return ["K0", "K1", "K2", "K3", "K4", "K5"][index];
  }

  function parseBackupStateStrict(text) {
    const source = String(text || "");
    if (!source.trim()) throw new Error("Backup file is empty.");
    if (byteLength(source) > MAX_BACKUP_BYTES) throw new Error("Backup exceeds the 5 MiB safety limit.");

    const parsed = JSON.parse(source);
    validateJsonGraph(parsed);
    let candidate;
    if (isPlainObject(parsed) && Object.prototype.hasOwnProperty.call(parsed, "state")) {
      if (![1, BACKUP_VERSION].includes(Number(parsed.version))) {
        throw new Error(`Unsupported HanaPath backup version '${parsed.version}'.`);
      }
      if (Number(parsed.version) === BACKUP_VERSION && parsed.format !== BACKUP_FORMAT) {
        throw new Error("Backup format marker is missing or incorrect.");
      }
      if (parsed.exportedAt && !Number.isFinite(Date.parse(parsed.exportedAt))) {
        throw new Error("Backup export timestamp is invalid.");
      }
      candidate = parsed.state;
    } else {
      candidate = parsed;
    }
    if (!isPlainObject(candidate) || !hasRecognizableStateShape(candidate)) {
      throw new Error("Backup file does not contain recognizable HanaPath state data.");
    }
    validateJsonGraph(candidate);
    const safe = clone(candidate);
    safe.level = deriveLevel(safe);
    return safe;
  }

  function recordTime(record) {
    for (const key of ["submittedAt", "completedAt", "finishedAt", "startedAt", "createdAt", "timestamp"]) {
      const value = Number(record?.[key]);
      if (Number.isFinite(value)) return value;
      const parsed = Date.parse(record?.[key]);
      if (Number.isFinite(parsed)) return parsed;
    }
    return 0;
  }

  function pruneStateHistories(target) {
    if (!target || typeof target !== "object") return target;
    if (Array.isArray(target.hangulWritingHistory) && target.hangulWritingHistory.length > WRITING_HISTORY_LIMIT) {
      target.hangulWritingHistory = target.hangulWritingHistory.slice(-WRITING_HISTORY_LIMIT);
    }
    if (Array.isArray(target.vocabReviewEvents) && target.vocabReviewEvents.length > VOCAB_EVENT_LIMIT) {
      target.vocabReviewEvents = target.vocabReviewEvents.slice(-VOCAB_EVENT_LIMIT);
    }

    const integrity = target.examIntegrity;
    if (integrity && typeof integrity === "object") {
      if (Array.isArray(integrity.resultRelations) && integrity.resultRelations.length > EXAM_RELATION_LIMIT) {
        integrity.resultRelations = integrity.resultRelations.slice(-EXAM_RELATION_LIMIT);
      }
      if (Array.isArray(integrity.taintEvents) && integrity.taintEvents.length > 500) integrity.taintEvents = integrity.taintEvents.slice(-500);
      if (Array.isArray(integrity.migrationLog) && integrity.migrationLog.length > 100) integrity.migrationLog = integrity.migrationLog.slice(-100);
      if (Array.isArray(integrity.checksumBackfills) && integrity.checksumBackfills.length > 50) integrity.checksumBackfills = integrity.checksumBackfills.slice(-50);
    }

    const records = target.examResults?.byAttemptId;
    if (records && typeof records === "object" && !Array.isArray(records)) {
      const referenced = new Set();
      for (const relation of target.examIntegrity?.resultRelations || []) {
        for (const key of ["sourceAttemptId", "targetAttemptId", "qualifyingAttemptId", "retentionAttemptId", "attemptId"]) {
          if (typeof relation?.[key] === "string") referenced.add(relation[key]);
        }
      }
      const ordered = Object.entries(records)
        .sort((a, b) => recordTime(b[1]) - recordTime(a[1]) || a[0].localeCompare(b[0]));
      const keep = new Set(ordered.slice(0, EXAM_RESULT_LIMIT).map(([attemptId]) => attemptId));
      for (const attemptId of referenced) if (records[attemptId]) keep.add(attemptId);
      for (const attemptId of Object.keys(records)) if (!keep.has(attemptId)) delete records[attemptId];
    }
    return target;
  }

  function showPersistenceBanner(message) {
    if (typeof document === "undefined") return;
    let banner = document.getElementById("hanapathPersistenceAlert");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "hanapathPersistenceAlert";
      banner.setAttribute("role", "alert");
      banner.style.cssText = "position:fixed;left:12px;right:12px;top:calc(12px + var(--app-safe-top,0px));z-index:9999;padding:12px 14px;border:1px solid #f59e0b;border-radius:10px;background:#2a1d05;color:#fff;font:600 14px/1.4 system-ui;box-shadow:0 8px 30px rgba(0,0,0,.35)";
      document.body.appendChild(banner);
    }
    banner.textContent = message;
    banner.hidden = false;
  }

  function installSaveGuard() {
    if (typeof saveState !== "function" || saveState.__hanapathPersistenceHardened) return false;
    const originalSaveState = saveState;
    const wrapped = function saveStateWithBounds() {
      pruneStateHistories(state);
      const ok = originalSaveState.apply(this, arguments);
      if (!ok) {
        showPersistenceBanner("HanaPath could not save progress on this device. Export a backup before closing the app and free some storage space.");
        try {
          window.dispatchEvent(new CustomEvent("hanapath-storage-error", {
            detail: { source: "learner-state", operation: "save" },
          }));
        } catch {}
      }
      return ok;
    };
    wrapped.__hanapathPersistenceHardened = true;
    saveState = wrapped;
    window.saveState = wrapped;
    return true;
  }

  function installBackupFunctions() {
    getBackupPayload = function getBackupPayloadV2() {
      pruneStateHistories(state);
      return {
        format: BACKUP_FORMAT,
        version: BACKUP_VERSION,
        exportedAt: new Date().toISOString(),
        state: clone(state),
      };
    };
    window.getBackupPayload = getBackupPayload;

    getBackupFilename = function getBackupFilenameLocal() {
      return `hanapath-backup-${localDateKey()}.json`;
    };
    window.getBackupFilename = getBackupFilename;

    parseBackupState = parseBackupStateStrict;
    window.parseBackupState = parseBackupStateStrict;
  }

  function rollbackEnvelope(raw) {
    return JSON.stringify({
      format: "hanapath-import-rollback",
      version: 1,
      createdAt: Date.now(),
      stateRaw: raw,
    });
  }

  function readRollback() {
    try {
      const current = localStorage.getItem(ROLLBACK_KEY);
      if (current) {
        const parsed = JSON.parse(current);
        if (isPlainObject(parsed) && typeof parsed.stateRaw === "string") {
          if (Date.now() - Number(parsed.createdAt || 0) <= ROLLBACK_TTL_MS) return parsed;
          localStorage.removeItem(ROLLBACK_KEY);
        }
      }
      const legacy = localStorage.getItem(LEGACY_ROLLBACK_KEY);
      if (legacy) {
        localStorage.setItem(ROLLBACK_KEY, rollbackEnvelope(legacy));
        localStorage.removeItem(LEGACY_ROLLBACK_KEY);
        return JSON.parse(localStorage.getItem(ROLLBACK_KEY));
      }
    } catch (error) {
      showPersistenceBanner(`HanaPath could not inspect the rollback copy: ${error?.message || error}`);
    }
    return null;
  }

  function writeVerified(key, value) {
    localStorage.setItem(key, value);
    if (localStorage.getItem(key) !== value) throw new Error(`Storage verification failed for ${key}.`);
  }

  function setStatus(message) {
    const line = document.getElementById("backupStatusLine");
    if (line) line.textContent = message;
  }

  function installBackupControls() {
    const exportOriginal = document.getElementById("exportProgressBtn");
    const importOriginal = document.getElementById("importProgressBtn");
    const inputOriginal = document.getElementById("importProgressFile");
    if (!exportOriginal || !importOriginal || !inputOriginal || exportOriginal.dataset.persistenceHardened === "1") return;

    const exportButton = exportOriginal.cloneNode(true);
    const importButton = importOriginal.cloneNode(true);
    const input = inputOriginal.cloneNode(true);
    exportOriginal.replaceWith(exportButton);
    importOriginal.replaceWith(importButton);
    inputOriginal.replaceWith(input);
    exportButton.dataset.persistenceHardened = "1";
    importButton.dataset.persistenceHardened = "1";
    input.dataset.persistenceHardened = "1";

    exportButton.addEventListener("click", () => {
      if (!saveState()) {
        setStatus("Progress could not be saved, so HanaPath did not create a misleading backup.");
        return;
      }
      downloadBackupFile();
      setStatus("Versioned backup downloaded. Keep it somewhere safe.");
    });

    importButton.addEventListener("click", () => input.click());
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      input.value = "";
      if (!file) return;
      if (Number(file.size) > MAX_BACKUP_BYTES) {
        setStatus("That backup exceeds the 5 MiB safety limit. Nothing was changed.");
        return;
      }
      let imported;
      try {
        imported = parseBackupStateStrict(await file.text());
        const integrityErrors = validateImportedExamIntegrity(imported);
        if (integrityErrors.length) throw new Error(`Invalid exam-result data: ${integrityErrors[0]}`);
      } catch (error) {
        setStatus(`That file is not a valid HanaPath backup. Nothing was changed. (${error?.message || "unreadable file"})`);
        return;
      }
      if (!window.confirm("Replace this device's progress with the validated backup? A verified rollback copy will be kept for seven days.")) {
        setStatus("Import cancelled. Nothing was changed.");
        return;
      }

      const before = localStorage.getItem(STORAGE_KEY);
      const importedRaw = JSON.stringify(imported);
      try {
        if (before != null) writeVerified(ROLLBACK_KEY, rollbackEnvelope(before));
        writeVerified(STORAGE_KEY, importedRaw);
      } catch (error) {
        try {
          if (before == null) localStorage.removeItem(STORAGE_KEY);
          else writeVerified(STORAGE_KEY, before);
        } catch (restoreError) {
          showPersistenceBanner(`Import failed and the previous save could not be restored automatically: ${restoreError?.message || restoreError}`);
        }
        setStatus(`Import could not be committed safely. Previous progress was restored. (${error?.message || error})`);
        return;
      }
      window.location.reload();
    });

    const rollback = readRollback();
    if (rollback && !document.getElementById("restoreImportRollbackBtn")) {
      const button = document.createElement("button");
      button.id = "restoreImportRollbackBtn";
      button.type = "button";
      button.className = "button secondary compact";
      button.textContent = "Restore pre-import progress";
      const status = document.getElementById("backupStatusLine");
      (status?.parentElement || importButton.parentElement)?.appendChild(button);
      button.addEventListener("click", () => {
        if (!window.confirm("Restore the progress from immediately before the last import?")) return;
        try {
          const current = localStorage.getItem(STORAGE_KEY);
          writeVerified(STORAGE_KEY, rollback.stateRaw);
          if (current != null) writeVerified(ROLLBACK_KEY, rollbackEnvelope(current));
          window.location.reload();
        } catch (error) {
          setStatus(`Rollback could not be restored safely. (${error?.message || error})`);
        }
      });
    }
  }

  function installSettingsGuard() {
    if (typeof renderSettings !== "function" || renderSettings.__hanapathPersistenceHardened) return false;
    const original = renderSettings;
    const wrapped = function renderSettingsWithSafeBackups() {
      const result = original.apply(this, arguments);
      installBackupControls();
      return result;
    };
    wrapped.__hanapathPersistenceHardened = true;
    renderSettings = wrapped;
    window.renderSettings = wrapped;
    return true;
  }

  function installLocalCalendarInit() {
    if (typeof init !== "function" || init.__hanapathLocalCalendar) return false;
    const original = init;
    const wrapped = async function initWithLocalStudyDate() {
      const localToday = localDateKey();
      const previousLocal = typeof state.localStudyDate === "string"
        ? state.localStudyDate
        : (typeof state.lastDate === "string" ? state.lastDate : localToday);
      const shouldReset = previousLocal !== localToday;
      // Suppress the historical UTC reset inside init; apply exactly one local
      // calendar transition after all ordinary initialization has succeeded.
      state.lastDate = new Date().toISOString().slice(0, 10);
      const result = await original.apply(this, arguments);
      if (shouldReset) {
        if (Array.isArray(state.todayDone) && state.todayDone.length > 0) state.studyDays = Math.max(0, Number(state.studyDays) || 0) + 1;
        state.todayDone = [];
        state.speakDone = false;
      }
      state.localStudyDate = localToday;
      state.todayDate = localToday;
      state.lastDate = localToday;
      saveState();
      return result;
    };
    wrapped.__hanapathLocalCalendar = true;
    init = wrapped;
    window.init = wrapped;
    return true;
  }

  installSaveGuard();
  installBackupFunctions();
  installSettingsGuard();
  installLocalCalendarInit();
  readRollback();

  const preflightError = sessionStorage.getItem("hanapath-state-preflight-error");
  if (preflightError) {
    showPersistenceBanner(`HanaPath recovered from unreadable saved progress. The original raw save was preserved separately. ${preflightError}`);
  }

  window.HANAPATH_PERSISTENCE_HARDENING = Object.freeze({
    backupVersion: BACKUP_VERSION,
    maxBackupBytes: MAX_BACKUP_BYTES,
    localDateKey,
    parseBackupStateStrict,
    pruneStateHistories,
    deriveLevel,
  });
})();
