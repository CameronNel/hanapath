// Fail-closed exam-result integrity and immutable write guard.
(function () {
  "use strict";

  const originalApi = window.HANAPATH_EXAM_INTEGRITY;
  if (!originalApi || typeof originalApi.fingerprint !== "function" || typeof originalApi.stableStringify !== "function") {
    throw new Error("HanaPath exam integrity API is unavailable; result storage cannot start safely.");
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function checksumPayload(record) {
    const payload = clone(record || {});
    delete payload.checksum;
    return payload;
  }

  function computeResultChecksum(record) {
    return `fp1:${originalApi.fingerprint(checksumPayload(record))}`;
  }

  function normalizeStoredRecord(attemptId, resultRecord) {
    if (!attemptId || typeof attemptId !== "string") throw new Error("Exam result attemptId is required.");
    if (!resultRecord || typeof resultRecord !== "object" || Array.isArray(resultRecord)) {
      throw new Error(`Exam result ${attemptId} must be an object.`);
    }
    const record = clone(resultRecord);
    if (record.attemptId && record.attemptId !== attemptId) {
      throw new Error(`Exam result key ${attemptId} disagrees with record attemptId ${record.attemptId}.`);
    }
    record.attemptId = attemptId;
    if (record.status === "legacy-incomplete") {
      record.checksum = null;
    } else {
      record.checksum = computeResultChecksum(record);
    }
    return record;
  }

  function validateResultChecksums(stateValue) {
    const errors = [];
    const records = stateValue?.examResults?.byAttemptId;
    if (!records || typeof records !== "object" || Array.isArray(records)) return errors;
    for (const [attemptId, record] of Object.entries(records)) {
      if (!record || typeof record !== "object" || Array.isArray(record)) continue;
      if (record.status === "legacy-incomplete") {
        if (record.checksum !== null) errors.push(`legacy result ${attemptId} must not invent a checksum`);
        continue;
      }
      if (typeof record.checksum !== "string" || !record.checksum.startsWith("fp1:")) {
        errors.push(`result ${attemptId} is missing its deterministic checksum`);
        continue;
      }
      const expected = computeResultChecksum(record);
      if (record.checksum !== expected) errors.push(`result ${attemptId} checksum does not match its stored content`);
    }
    return errors;
  }

  function backfillMissingResultChecksums(stateValue) {
    const records = stateValue?.examResults?.byAttemptId;
    if (!records || typeof records !== "object" || Array.isArray(records)) return { changed: false, attemptIds: [] };
    const attemptIds = [];
    for (const [attemptId, record] of Object.entries(records)) {
      if (!record || typeof record !== "object" || Array.isArray(record) || record.status === "legacy-incomplete") continue;
      if (record.checksum == null || record.checksum === "") {
        record.checksum = computeResultChecksum(record);
        attemptIds.push(attemptId);
      }
    }
    if (!attemptIds.length) return { changed: false, attemptIds };
    if (!stateValue.examIntegrity || typeof stateValue.examIntegrity !== "object") stateValue.examIntegrity = {};
    if (!Array.isArray(stateValue.examIntegrity.checksumBackfills)) stateValue.examIntegrity.checksumBackfills = [];
    stateValue.examIntegrity.checksumBackfills.push({
      schemaVersion: 1,
      appliedAt: Date.now(),
      attemptIds,
      reason: "Backfilled deterministic checksums that older HanaPath writers left null.",
    });
    return { changed: true, attemptIds };
  }

  const hardenedApi = Object.freeze({
    ...originalApi,
    computeResultChecksum,
    validateResultChecksums,
    backfillMissingResultChecksums,
    validateExamIntegrityState(stateValue, options) {
      const errors = originalApi.validateExamIntegrityState(stateValue, options);
      return [...errors, ...validateResultChecksums(stateValue)];
    },
  });
  window.HANAPATH_EXAM_INTEGRITY = hardenedApi;

  if (typeof writeExamResultRecord === "function" && !writeExamResultRecord.__hanapathIntegrityHardened) {
    const hardenedWrite = function writeExamResultRecordImmutable(attemptId, resultRecord) {
      if (!state.examResults || typeof state.examResults !== "object") {
        state.examResults = { version: 1, byAttemptId: {} };
      }
      if (!state.examResults.byAttemptId || typeof state.examResults.byAttemptId !== "object") {
        state.examResults.byAttemptId = {};
      }
      const normalized = normalizeStoredRecord(attemptId, resultRecord);
      const existing = state.examResults.byAttemptId[attemptId];
      if (existing) {
        if (originalApi.stableStringify(existing) === originalApi.stableStringify(normalized)) return existing;
        const error = new Error(`Exam result attemptId collision: ${attemptId}`);
        error.code = "EXAM_RESULT_ID_COLLISION";
        throw error;
      }
      state.examResults.byAttemptId[attemptId] = normalized;
      return normalized;
    };
    hardenedWrite.__hanapathIntegrityHardened = true;
    writeExamResultRecord = hardenedWrite;
    window.writeExamResultRecord = hardenedWrite;
  }

  if (typeof validateImportedExamIntegrity === "function") {
    const originalValidateImportedExamIntegrity = validateImportedExamIntegrity;
    const hardenedImportValidation = function validateImportedExamIntegrityFailClosed(candidate) {
      const api = window.HANAPATH_EXAM_INTEGRITY;
      if (!api || typeof api.validateExamIntegrityState !== "function") {
        return ["exam-integrity validator is unavailable; import rejected"];
      }
      const errors = originalValidateImportedExamIntegrity(candidate);
      if (errors.length) return errors;
      if (!candidate || (candidate.examResults == null && candidate.examIntegrity == null)) return [];
      let copy;
      try {
        copy = clone(candidate);
        if (typeof api.migrateExamIntegrityState === "function") {
          api.migrateExamIntegrityState(copy, { wordExamBlueprints: typeof getWordExamsList === "function" ? getWordExamsList() : [] });
        }
        api.backfillMissingResultChecksums(copy);
      } catch {
        return ["exam-result data could not be normalized safely"];
      }
      return api.validateExamIntegrityState(copy, { wordExamBlueprints: typeof getWordExamsList === "function" ? getWordExamsList() : [] });
    };
    validateImportedExamIntegrity = hardenedImportValidation;
    window.validateImportedExamIntegrity = hardenedImportValidation;
  }

  function failClosedTaint(scope, overrideFlags) {
    const flags = [...new Set([...(Array.isArray(overrideFlags) ? overrideFlags : []), "integrity-api-unavailable"])];
    return {
      overrideEventIds: [],
      overrideFlags: flags,
      status: "practice",
      isPractice: true,
      scopeSectionIds: Array.isArray(scope) ? scope.slice() : [],
    };
  }

  if (typeof getHangulExamTaintContext === "function") {
    const originalHangulTaint = getHangulExamTaintContext;
    getHangulExamTaintContext = function getHangulExamTaintContextFailClosed(overrideFlags) {
      const api = window.HANAPATH_EXAM_INTEGRITY;
      return api && typeof api.getAttemptTaintContext === "function"
        ? originalHangulTaint(overrideFlags)
        : failClosedTaint(["alphabet"], overrideFlags);
    };
    window.getHangulExamTaintContext = getHangulExamTaintContext;
  }

  if (typeof getWordExamTaintContext === "function") {
    const originalWordTaint = getWordExamTaintContext;
    getWordExamTaintContext = function getWordExamTaintContextFailClosed(exam, overrideFlags) {
      const api = window.HANAPATH_EXAM_INTEGRITY;
      return api && typeof api.getAttemptTaintContext === "function"
        ? originalWordTaint(exam, overrideFlags)
        : failClosedTaint(exam?.scopeSectionIds || [], overrideFlags);
    };
    window.getWordExamTaintContext = getWordExamTaintContext;
  }

  if (typeof state !== "undefined" && state && typeof state === "object") {
    const migration = hardenedApi.backfillMissingResultChecksums(state);
    if (migration.changed && typeof saveState === "function") {
      const saved = saveState();
      if (saved === false) {
        console.error("[HanaPath] Backfilled exam checksums could not be persisted.");
        try {
          window.dispatchEvent(new CustomEvent("hanapath-storage-error", {
            detail: { source: "exam-integrity", operation: "checksum-backfill" },
          }));
        } catch {
          // Console error is the final fallback.
        }
      }
    }
  }

  window.HANAPATH_EXAM_INTEGRITY_HARDENING = Object.freeze({
    computeResultChecksum,
    validateResultChecksums,
    backfillMissingResultChecksums,
  });
})();
