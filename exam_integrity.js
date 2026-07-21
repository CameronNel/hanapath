// Workstream 0 · Box 0A — immutable exam-result provenance and legacy migration.
//
// This file is deliberately UI-invisible. It loads before app.js and exposes a
// pure browser/CommonJS API. app.js invokes the v1 migration immediately after
// loadState(), before DOMContentLoaded. Existing Hangul and Core Words summary
// records remain untouched as compatibility indexes.
(function installExamIntegrity(root, factory) {
  "use strict";

  const api = factory();

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  if (root && typeof root === "object") {
    root.HANAPATH_EXAM_INTEGRITY = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createExamIntegrityApi() {
  "use strict";

  const RESULT_SCHEMA_VERSION = 1;
  const INTEGRITY_SCHEMA_VERSION = 1;
  const MIGRATION_VERSION = 1;
  const TAINT_SCHEMA_VERSION = 1;
  const REQUIRED_TAINT_FIELDS = Object.freeze([
    "taintSchemaVersion",
    "taintEventId",
    "controlId",
    "affectedPillars",
    "scopeSectionIds",
    "scopeUnitIds",
    "scopeLessonIds",
    "activatedAt",
    "appVersion",
    "appAssetRevision",
    "queryGate",
    "sourceRoute",
    "note",
    "clearedAt",
  ]);
  const VALID_RESULT_STATUSES = Object.freeze([
    "hanaPath",
    "practice",
    "legacy-incomplete",
  ]);
  const REQUIRED_RESULT_FIELDS = Object.freeze([
    "resultSchemaVersion",
    "attemptId",
    "examId",
    "attemptMode",
    "blueprintVersion",
    "engineVersion",
    "generationSeed",
    "contentBankRevision",
    "eligibilityRevision",
    "generatedAt",
    "submittedAt",
    "durationSeconds",
    "scopeSectionIds",
    "itemCount",
    "scoreSummary",
    "floorSummary",
    "status",
    "overrideFlags",
    "overrideEventIds",
    "qualifyingAttemptId",
    "retentionAttemptId",
    "legacyProvenanceStatus",
    "checksum",
  ]);

  function isPlainObject(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  }

  function cloneJson(value) {
    if (value === undefined) return null;
    return JSON.parse(JSON.stringify(value));
  }

  function stableValue(value) {
    if (Array.isArray(value)) return value.map(stableValue);
    if (!isPlainObject(value)) return value;
    const out = {};
    Object.keys(value).sort().forEach((key) => {
      const item = value[key];
      if (item !== undefined) out[key] = stableValue(item);
    });
    return out;
  }

  function stableStringify(value) {
    return JSON.stringify(stableValue(value));
  }

  // Small deterministic fingerprint for stable legacy IDs. It is not a
  // security primitive and is never presented as an authenticity check.
  function fingerprint(value) {
    const text = stableStringify(value);
    let hash = 0x811c9dc5;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(16).padStart(8, "0");
  }

  function finiteNumber(value) {
    return typeof value === "number" && Number.isFinite(value) ? value : null;
  }

  function integerOrNull(value) {
    return Number.isInteger(value) ? value : null;
  }

  function booleanOrNull(value) {
    return typeof value === "boolean" ? value : null;
  }

  function timestampFromIso(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function safeArray(value) {
    return Array.isArray(value) ? cloneJson(value) : null;
  }

  function normalizeStringList(value) {
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((item) => typeof item === "string" && item.length > 0))];
  }

  function makeTaintEventId(options = {}) {
    if (typeof options.taintEventId === "string" && options.taintEventId) {
      return options.taintEventId;
    }
    const cryptoApi = typeof globalThis !== "undefined" ? globalThis.crypto : null;
    if (cryptoApi && typeof cryptoApi.randomUUID === "function") {
      return `taint-${cryptoApi.randomUUID()}`;
    }
    const now = finiteNumber(options.now) ?? Date.now();
    const entropy = finiteNumber(options.randomValue) ?? Math.random();
    return `taint-${now.toString(36)}-${fingerprint({ now, entropy })}`;
  }

  function createTaintEvent(input = {}, options = {}) {
    const activatedAt = finiteNumber(input.activatedAt)
      ?? finiteNumber(options.now)
      ?? Date.now();
    return {
      taintSchemaVersion: TAINT_SCHEMA_VERSION,
      taintEventId: makeTaintEventId({
        taintEventId: input.taintEventId,
        now: activatedAt,
        randomValue: options.randomValue,
      }),
      controlId: typeof input.controlId === "string" ? input.controlId : "",
      affectedPillars: normalizeStringList(input.affectedPillars),
      scopeSectionIds: normalizeStringList(input.scopeSectionIds),
      scopeUnitIds: normalizeStringList(input.scopeUnitIds),
      scopeLessonIds: normalizeStringList(input.scopeLessonIds),
      activatedAt,
      appVersion: typeof input.appVersion === "string" ? input.appVersion : "",
      appAssetRevision: typeof input.appAssetRevision === "string" ? input.appAssetRevision : "",
      queryGate: typeof input.queryGate === "string" ? input.queryGate : "",
      sourceRoute: isPlainObject(input.sourceRoute) ? cloneJson(input.sourceRoute) : null,
      note: typeof input.note === "string" ? input.note : "",
      clearedAt: finiteNumber(input.clearedAt),
      globalExamOverride: input.globalExamOverride === true,
    };
  }

  function validateTaintEvent(event, index = 0) {
    const errors = [];
    const label = isPlainObject(event) && event.taintEventId
      ? event.taintEventId
      : String(index);
    if (!isPlainObject(event)) return [`taint event ${label} must be an object`];
    REQUIRED_TAINT_FIELDS.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(event, field)) {
        errors.push(`taint event ${label} missing ${field}`);
      }
    });
    if (event.taintSchemaVersion !== TAINT_SCHEMA_VERSION) {
      errors.push(`taint event ${label} has invalid schema version`);
    }
    if (typeof event.taintEventId !== "string" || !event.taintEventId) {
      errors.push(`taint event ${label} missing taintEventId`);
    }
    if (typeof event.controlId !== "string" || !event.controlId) {
      errors.push(`taint event ${label} missing controlId`);
    }
    if (!Number.isFinite(event.activatedAt)) {
      errors.push(`taint event ${label} missing activatedAt`);
    }
    if (typeof event.appVersion !== "string" || !event.appVersion) {
      errors.push(`taint event ${label} missing appVersion`);
    }
    if (typeof event.appAssetRevision !== "string" || !event.appAssetRevision) {
      errors.push(`taint event ${label} missing appAssetRevision`);
    }
    if (event.queryGate !== "__wetest") {
      errors.push(`taint event ${label} has invalid queryGate`);
    }
    ["affectedPillars", "scopeSectionIds", "scopeUnitIds", "scopeLessonIds"].forEach((field) => {
      if (!Array.isArray(event[field]) || event[field].some((item) => typeof item !== "string" || !item)) {
        errors.push(`taint event ${label} has invalid ${field}`);
      }
    });
    if (event.controlId.endsWith("section-completion") && (!Array.isArray(event.scopeSectionIds) || !event.scopeSectionIds.length)) {
      errors.push(`taint event ${label} missing section scope`);
    }
    if (event.clearedAt !== null && !Number.isFinite(event.clearedAt)) {
      errors.push(`taint event ${label} has invalid clearedAt`);
    }
    return errors;
  }

  function appendTaintEvent(stateValue, event) {
    if (!isPlainObject(stateValue)) return { added: false, reason: "invalid-state" };
    const eventErrors = validateTaintEvent(event);
    if (eventErrors.length) return { added: false, reason: "invalid-event", errors: eventErrors };
    const integrity = normalizeExamIntegrityContainer(stateValue.examIntegrity);
    if (integrity.taintEvents.some((item) => item && item.taintEventId === event.taintEventId)) {
      return { added: false, reason: "duplicate-id", eventId: event.taintEventId };
    }
    integrity.taintEvents.push(cloneJson(event));
    stateValue.examIntegrity = integrity;
    return { added: true, eventId: event.taintEventId };
  }

  function getTaintEventById(stateValue, taintEventId) {
    const events = stateValue && stateValue.examIntegrity && Array.isArray(stateValue.examIntegrity.taintEvents)
      ? stateValue.examIntegrity.taintEvents
      : [];
    return events.find((event) => event && event.taintEventId === taintEventId) || null;
  }

  function getIntersectingTaintEventIds(stateValue, scopeSectionIds) {
    const scope = new Set(normalizeStringList(scopeSectionIds));
    const events = stateValue && stateValue.examIntegrity && Array.isArray(stateValue.examIntegrity.taintEvents)
      ? stateValue.examIntegrity.taintEvents
      : [];
    return events
      .filter((event) => isPlainObject(event) && event.clearedAt == null)
      .filter((event) => event.globalExamOverride === true
        || (Array.isArray(event.scopeSectionIds) && event.scopeSectionIds.some((sectionId) => scope.has(sectionId))))
      .map((event) => event.taintEventId)
      .filter((eventId) => typeof eventId === "string" && eventId.length > 0);
  }

  function getAttemptTaintContext(stateValue, scopeSectionIds, overrideFlags = []) {
    const eventIds = getIntersectingTaintEventIds(stateValue, scopeSectionIds);
    const flags = normalizeStringList(overrideFlags);
    return {
      overrideEventIds: eventIds,
      overrideFlags: flags,
      status: eventIds.length || flags.length ? "practice" : "hanaPath",
      isPractice: Boolean(eventIds.length || flags.length),
    };
  }

  function normalizeExamResultsContainer(raw) {
    const safe = isPlainObject(raw) ? raw : {};
    const byAttemptId = isPlainObject(safe.byAttemptId) ? safe.byAttemptId : {};
    return {
      ...safe,
      version: RESULT_SCHEMA_VERSION,
      byAttemptId: { ...byAttemptId },
    };
  }

  function normalizeExamIntegrityContainer(raw) {
    const safe = isPlainObject(raw) ? raw : {};
    return {
      ...safe,
      version: INTEGRITY_SCHEMA_VERSION,
      taintEvents: Array.isArray(safe.taintEvents) ? cloneJson(safe.taintEvents) : [],
      resultRelations: Array.isArray(safe.resultRelations) ? cloneJson(safe.resultRelations) : [],
      migrationLog: Array.isArray(safe.migrationLog) ? cloneJson(safe.migrationLog) : [],
    };
  }

  function hasAlphabetHistory(record) {
    if (!isPlainObject(record)) return false;
    return (
      (Number.isInteger(record.attempts) && record.attempts > 0) ||
      (Number.isInteger(record.bestCorrect) && record.bestCorrect > 0) ||
      record.mastered === true ||
      (typeof record.completedAt === "string" && record.completedAt.length > 0)
    );
  }

  function hasWordHistory(record) {
    if (!isPlainObject(record)) return false;
    return (
      (Number.isInteger(record.attempts) && record.attempts > 0) ||
      (typeof record.bestPct === "number" && record.bestPct > 0) ||
      record.passed === true ||
      record.distinguished === true ||
      typeof record.masteryEarnedAt === "number" ||
      typeof record.confirmationDueFrom === "number" ||
      typeof record.confirmationExpiresAt === "number" ||
      typeof record.lastAttemptAt === "number" ||
      (Array.isArray(record.qualifyingTargetIds) && record.qualifyingTargetIds.length > 0) ||
      isPlainObject(record.lastResult)
    );
  }

  function wordBlueprintMap(blueprints) {
    const map = new Map();
    (Array.isArray(blueprints) ? blueprints : []).forEach((blueprint) => {
      if (blueprint && typeof blueprint.id === "string") map.set(blueprint.id, blueprint);
    });
    return map;
  }

  function makeLegacyBase({ attemptId, examId, attemptMode, blueprintVersion,
    submittedAt, durationSeconds, scopeSectionIds, itemCount, scoreSummary,
    floorSummary, sourceKind, sourceRecordVersion, sourceKey, sourceSnapshot,
    sourceFingerprint }) {
    return {
      resultSchemaVersion: RESULT_SCHEMA_VERSION,
      attemptId,
      examId,
      attemptMode,
      blueprintVersion,
      engineVersion: null,
      generationSeed: null,
      contentBankRevision: null,
      eligibilityRevision: null,
      generatedAt: null,
      submittedAt,
      durationSeconds,
      scopeSectionIds,
      itemCount,
      scoreSummary,
      floorSummary,
      status: "legacy-incomplete",
      overrideFlags: null,
      overrideEventIds: null,
      qualifyingAttemptId: null,
      retentionAttemptId: null,
      legacyProvenanceStatus: "legacy-incomplete",
      checksum: null,
      legacySource: {
        kind: sourceKind,
        key: sourceKey,
        recordVersion: sourceRecordVersion,
        compatibilityFingerprint: sourceFingerprint,
        compatibilitySnapshot: cloneJson(sourceSnapshot),
        summaryKind: "compatibility-summary",
      },
    };
  }

  function buildAlphabetLegacyRecord(rawRecord) {
    if (!hasAlphabetHistory(rawRecord)) return null;
    const snapshot = cloneJson(rawRecord);
    const sourceFingerprint = fingerprint(snapshot);
    const attemptId = `legacy-hangul-mastery-v2-${sourceFingerprint}`;
    const bestCorrect = integerOrNull(rawRecord.bestCorrect);
    const attempts = integerOrNull(rawRecord.attempts);
    const mastered = booleanOrNull(rawRecord.mastered);
    return makeLegacyBase({
      attemptId,
      examId: "hangul-mastery-exam",
      attemptMode: null,
      blueprintVersion: integerOrNull(rawRecord.version),
      submittedAt: timestampFromIso(rawRecord.completedAt),
      durationSeconds: null,
      scopeSectionIds: ["alphabet"],
      itemCount: null,
      scoreSummary: {
        correct: bestCorrect,
        total: null,
        pct: null,
        unanswered: null,
        attempts,
        summaryKind: "best-known-aggregate",
      },
      floorSummary: {
        passed: mastered,
        distinguished: null,
        details: { mastered },
      },
      sourceKind: "alphabetMasteryExam",
      sourceRecordVersion: integerOrNull(rawRecord.version),
      sourceKey: "alphabetMasteryExam",
      sourceSnapshot: snapshot,
      sourceFingerprint,
    });
  }

  function buildWordLegacyRecord(examId, rawRecord, blueprint) {
    if (!hasWordHistory(rawRecord)) return null;
    const snapshot = cloneJson(rawRecord);
    const sourceFingerprint = fingerprint({ examId, record: snapshot });
    const safeExamId = String(examId).replace(/[^a-zA-Z0-9_-]/g, "-");
    const sourceVersion = integerOrNull(rawRecord.blueprintVersion);
    const attemptId = `legacy-word-${safeExamId}-v${sourceVersion == null ? "unknown" : sourceVersion}-${sourceFingerprint}`;
    const lastResult = isPlainObject(rawRecord.lastResult) ? rawRecord.lastResult : null;
    const mode = lastResult && (lastResult.mode === "full" || lastResult.mode === "confirmation")
      ? lastResult.mode
      : null;
    const total = lastResult ? integerOrNull(lastResult.total) : null;
    const correct = lastResult ? integerOrNull(lastResult.correct) : null;
    const pct = lastResult ? finiteNumber(lastResult.pct) : finiteNumber(rawRecord.bestPct);
    const unanswered = lastResult ? integerOrNull(lastResult.unanswered) : null;
    const passed = lastResult ? booleanOrNull(lastResult.passed) : booleanOrNull(rawRecord.passed);
    const distinguished = lastResult
      ? booleanOrNull(lastResult.distinguished)
      : booleanOrNull(rawRecord.distinguished);
    const scope = blueprint && Array.isArray(blueprint.scopeSectionIds)
      ? cloneJson(blueprint.scopeSectionIds)
      : null;

    return makeLegacyBase({
      attemptId,
      examId,
      attemptMode: mode,
      blueprintVersion: sourceVersion,
      submittedAt: finiteNumber(rawRecord.lastAttemptAt),
      durationSeconds: null,
      scopeSectionIds: scope,
      itemCount: total,
      scoreSummary: {
        correct,
        total,
        pct,
        unanswered,
        attempts: integerOrNull(rawRecord.attempts),
        summaryKind: lastResult ? "last-known-result" : "best-known-aggregate",
      },
      floorSummary: {
        passed,
        distinguished,
        details: {
          compatibilityPassed: booleanOrNull(rawRecord.passed),
          compatibilityDistinguished: booleanOrNull(rawRecord.distinguished),
          masteryEarnedAt: finiteNumber(rawRecord.masteryEarnedAt),
          confirmationDueFrom: finiteNumber(rawRecord.confirmationDueFrom),
          confirmationExpiresAt: finiteNumber(rawRecord.confirmationExpiresAt),
          qualifyingTargetIds: safeArray(rawRecord.qualifyingTargetIds),
        },
      },
      sourceKind: "wordExams",
      sourceRecordVersion: sourceVersion,
      sourceKey: examId,
      sourceSnapshot: snapshot,
      sourceFingerprint,
    });
  }

  function migrationLogEntry(record) {
    return {
      migrationSchemaVersion: 1,
      migrationId: `migration-${record.attemptId}`,
      migrationVersion: MIGRATION_VERSION,
      sourceKind: record.legacySource.kind,
      sourceKey: record.legacySource.key,
      sourceRecordVersion: record.legacySource.recordVersion,
      sourceFingerprint: record.legacySource.compatibilityFingerprint,
      resultAttemptIds: [record.attemptId],
      migratedAt: null,
      legacyProvenanceStatus: "legacy-incomplete",
    };
  }

  function collectExpectedLegacyRecords(stateValue, options) {
    const expected = [];
    const alphabet = buildAlphabetLegacyRecord(stateValue && stateValue.alphabetMasteryExam);
    if (alphabet) expected.push(alphabet);

    const blueprints = wordBlueprintMap(options && options.wordExamBlueprints);
    const wordRoot = stateValue && isPlainObject(stateValue.wordExams)
      ? stateValue.wordExams
      : null;
    const byExamId = wordRoot && isPlainObject(wordRoot.byExamId)
      ? wordRoot.byExamId
      : {};
    Object.keys(byExamId).sort().forEach((examId) => {
      const record = buildWordLegacyRecord(examId, byExamId[examId], blueprints.get(examId));
      if (record) expected.push(record);
    });
    return expected;
  }

  function migrateExamIntegrityState(stateValue, options = {}) {
    if (!isPlainObject(stateValue)) {
      return { state: stateValue, changed: false, addedAttemptIds: [], conflicts: [] };
    }

    const before = stableStringify({
      examResults: stateValue.examResults,
      examIntegrity: stateValue.examIntegrity,
    });
    const examResults = normalizeExamResultsContainer(stateValue.examResults);
    const examIntegrity = normalizeExamIntegrityContainer(stateValue.examIntegrity);
    const existingLogIds = new Set(
      examIntegrity.migrationLog
        .filter(isPlainObject)
        .map((entry) => entry.migrationId)
        .filter((value) => typeof value === "string"),
    );
    // One wrapper per source, ever. A summary record keeps evolving through
    // the pre-provenance runners after Box 0A ships; re-wrapping each new
    // aggregate state would mint an unbounded series of pseudo-historical
    // records. The first wrap captures the knowable pre-migration history;
    // later activity is recorded for real by Boxes 0C/0D.
    const migratedSourceKeys = new Set(
      examIntegrity.migrationLog
        .filter(isPlainObject)
        .map((entry) => `${entry.sourceKind}:${entry.sourceKey}`),
    );
    const addedAttemptIds = [];
    const conflicts = [];

    collectExpectedLegacyRecords(stateValue, options).forEach((record) => {
      const sourceKey = `${record.legacySource.kind}:${record.legacySource.key}`;
      if (migratedSourceKeys.has(sourceKey)) return;
      const existing = examResults.byAttemptId[record.attemptId];
      if (!existing) {
        examResults.byAttemptId[record.attemptId] = record;
        addedAttemptIds.push(record.attemptId);
      } else if (stableStringify(existing) !== stableStringify(record)) {
        // Submitted history is immutable. Keep the stored record and expose the
        // mismatch to audits instead of silently rewriting it.
        conflicts.push(record.attemptId);
      }

      const log = migrationLogEntry(record);
      if (!existingLogIds.has(log.migrationId)) {
        examIntegrity.migrationLog.push(log);
        existingLogIds.add(log.migrationId);
        migratedSourceKeys.add(sourceKey);
      }
    });

    stateValue.examResults = examResults;
    stateValue.examIntegrity = examIntegrity;
    const after = stableStringify({ examResults, examIntegrity });
    return {
      state: stateValue,
      changed: before !== after,
      addedAttemptIds,
      conflicts,
    };
  }

  function validateExamIntegrityState(stateValue, options = {}) {
    const errors = [];
    const results = stateValue && isPlainObject(stateValue.examResults)
      ? stateValue.examResults
      : null;
    const integrity = stateValue && isPlainObject(stateValue.examIntegrity)
      ? stateValue.examIntegrity
      : null;
    if (!results || results.version !== RESULT_SCHEMA_VERSION || !isPlainObject(results.byAttemptId)) {
      errors.push("examResults must be version 1 with byAttemptId");
      return errors;
    }
    if (!integrity || integrity.version !== INTEGRITY_SCHEMA_VERSION) {
      errors.push("examIntegrity must be version 1");
      return errors;
    }
    ["taintEvents", "resultRelations", "migrationLog"].forEach((field) => {
      if (!Array.isArray(integrity[field])) errors.push(`examIntegrity.${field} must be an array`);
    });

    if (Array.isArray(integrity.taintEvents)) {
      const taintIds = new Set();
      const completedLessonIds = new Set([
        ...(Array.isArray(stateValue.vocabLessonCompleted) ? stateValue.vocabLessonCompleted : []),
        ...(Array.isArray(stateValue.phaseOneCompleted) ? stateValue.phaseOneCompleted : []),
      ]);
      integrity.taintEvents.forEach((event, index) => {
        errors.push(...validateTaintEvent(event, index));
        if (!isPlainObject(event) || typeof event.taintEventId !== "string" || !event.taintEventId) return;
        if (taintIds.has(event.taintEventId)) errors.push(`duplicate taintEventId ${event.taintEventId}`);
        else taintIds.add(event.taintEventId);
        if (event.clearedAt != null
            && Array.isArray(event.scopeLessonIds)
            && event.scopeLessonIds.some((lessonId) => completedLessonIds.has(lessonId))) {
          errors.push(`taint event ${event.taintEventId} clears taint while preserving test-awarded progression`);
        }
      });
    }

    const records = results.byAttemptId;
    const seenAttemptIds = new Set();
    Object.keys(records).forEach((key) => {
      const record = records[key];
      if (!isPlainObject(record)) {
        errors.push(`result ${key} must be an object`);
        return;
      }
      REQUIRED_RESULT_FIELDS.forEach((field) => {
        if (!Object.prototype.hasOwnProperty.call(record, field)) {
          errors.push(`result ${key} missing ${field}`);
        }
      });
      if (record.attemptId !== key) errors.push(`result key ${key} disagrees with attemptId`);
      if (seenAttemptIds.has(record.attemptId)) errors.push(`duplicate attemptId ${record.attemptId}`);
      seenAttemptIds.add(record.attemptId);
      if (!VALID_RESULT_STATUSES.includes(record.status)) {
        errors.push(`result ${key} has invalid status ${record.status}`);
      }
      if (record.status === "legacy-incomplete") {
        if (record.legacyProvenanceStatus !== "legacy-incomplete") {
          errors.push(`legacy result ${key} missing legacy-incomplete marker`);
        }
        [
          "engineVersion",
          "generationSeed",
          "contentBankRevision",
          "eligibilityRevision",
          "generatedAt",
          "durationSeconds",
          "overrideFlags",
          "overrideEventIds",
          "qualifyingAttemptId",
          "retentionAttemptId",
          "checksum",
        ].forEach((field) => {
          if (record[field] !== null) errors.push(`legacy result ${key} invents ${field}`);
        });
      } else if (record.legacyProvenanceStatus === "legacy-incomplete") {
        errors.push(`result ${key} silently upgrades legacy provenance`);
      }
    });

    if (Array.isArray(integrity.resultRelations)) {
      const relationIds = new Set();
      integrity.resultRelations.forEach((relation, index) => {
        if (!isPlainObject(relation)) {
          errors.push(`relation ${index} must be an object`);
          return;
        }
        if (typeof relation.relationId !== "string" || !relation.relationId) {
          errors.push(`relation ${index} missing relationId`);
        } else if (relationIds.has(relation.relationId)) {
          errors.push(`duplicate relationId ${relation.relationId}`);
        } else relationIds.add(relation.relationId);
        const from = records[relation.fromAttemptId];
        const to = records[relation.toAttemptId];
        if (!from || !to) errors.push(`relation ${relation.relationId || index} has broken linkage`);
        if (from && to && relation.type === "retention") {
          if (from.examId !== to.examId) errors.push(`retention relation ${relation.relationId} crosses exam IDs`);
          if (from.blueprintVersion !== to.blueprintVersion) {
            errors.push(`retention relation ${relation.relationId} crosses blueprint versions`);
          }
        }
      });
    }

    if (Array.isArray(integrity.migrationLog)) {
      const migrationIds = new Set();
      integrity.migrationLog.forEach((entry, index) => {
        if (!isPlainObject(entry)) {
          errors.push(`migration log ${index} must be an object`);
          return;
        }
        if (typeof entry.migrationId !== "string" || !entry.migrationId) {
          errors.push(`migration log ${index} missing migrationId`);
        } else if (migrationIds.has(entry.migrationId)) {
          errors.push(`duplicate migrationId ${entry.migrationId}`);
        } else migrationIds.add(entry.migrationId);
        if (entry.migratedAt !== null) errors.push(`migration ${entry.migrationId || index} invents migratedAt`);
        (Array.isArray(entry.resultAttemptIds) ? entry.resultAttemptIds : []).forEach((attemptId) => {
          if (!records[attemptId]) errors.push(`migration ${entry.migrationId || index} references missing result ${attemptId}`);
        });
      });
    }

    // Compatibility-index agreement: every source that currently carries
    // history has been wrapped exactly once, and each stored wrapper is
    // self-consistent with the snapshot it captured. The live summary may
    // legitimately evolve past the snapshot afterwards (pre-provenance
    // runners keep updating it until Boxes 0C/0D), so equality with the
    // current summary is deliberately NOT required.
    const wrappedSources = new Set();
    Object.keys(records).forEach((key) => {
      const record = records[key];
      if (!isPlainObject(record) || !isPlainObject(record.legacySource)) return;
      const source = record.legacySource;
      wrappedSources.add(`${source.kind}:${source.key}`);
      const recomputed = source.kind === "wordExams"
        ? fingerprint({ examId: source.key, record: source.compatibilitySnapshot })
        : fingerprint(source.compatibilitySnapshot);
      if (recomputed !== source.compatibilityFingerprint) {
        errors.push(`legacy result ${key} disagrees with its captured snapshot`);
      }
      if (record.status !== "legacy-incomplete") {
        errors.push(`legacy result ${key} silently upgraded from compatibility index`);
      }
    });
    collectExpectedLegacyRecords(stateValue, options).forEach((expected) => {
      const sourceKey = `${expected.legacySource.kind}:${expected.legacySource.key}`;
      if (!wrappedSources.has(sourceKey)) {
        errors.push(`compatibility index missing legacy result for ${sourceKey}`);
      }
    });

    return errors;
  }

  return Object.freeze({
    RESULT_SCHEMA_VERSION,
    INTEGRITY_SCHEMA_VERSION,
    MIGRATION_VERSION,
    TAINT_SCHEMA_VERSION,
    REQUIRED_TAINT_FIELDS,
    VALID_RESULT_STATUSES,
    REQUIRED_RESULT_FIELDS,
    stableStringify,
    fingerprint,
    createTaintEvent,
    validateTaintEvent,
    appendTaintEvent,
    getTaintEventById,
    getIntersectingTaintEventIds,
    getAttemptTaintContext,
    collectExpectedLegacyRecords,
    migrateExamIntegrityState,
    validateExamIntegrityState,
  });
});
