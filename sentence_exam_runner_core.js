(function installSentenceExamRunnerCore(root, factory) {
  "use strict";

  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && typeof root === "object") {
    root.HANAPATH_SENTENCE_EXAM_RUNNER = api;
    const meta = root.HANAPATH_SENTENCE_EXAM_META;
    if (meta && typeof meta === "object") {
      root.HANAPATH_SENTENCE_EXAM_META = Object.freeze({
        ...meta,
        runnerVersion: 1,
        retention: true,
      });
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function createSentenceExamRunnerCore() {
  "use strict";

  const STATE_VERSION = 1;
  const RUNNER_VERSION = 1;
  const DAY_MS = 24 * 60 * 60 * 1000;
  const TYPED_STRANDS = Object.freeze(["P", "F", "X"]);
  const ALL_STRANDS = Object.freeze(["P", "F", "X", "R", "C"]);
  const STRAND_LABELS = Object.freeze({
    P: "Sentence production",
    F: "Form & register control",
    X: "Contextual integration",
    R: "Sentence recognition",
    C: "Cued discrimination",
  });
  const DISCLOSURE = "HanaPath Sentence Mastery records that, under this version of HanaPath's local assessment, you produced the taught sentence patterns accurately and retained that performance after a delayed confirmation. Results are stored on this device and are not proctored or tamper-proof credentials.";
  const MASTERY_LINE = "You demonstrated and retained the taught HanaPath sentence patterns in this device-local assessment.";

  function isPlainObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function clone(value) {
    if (value === undefined) return null;
    return JSON.parse(JSON.stringify(value));
  }

  function finite(value, fallback = null) {
    return typeof value === "number" && Number.isFinite(value) ? value : fallback;
  }

  function integer(value, fallback = null) {
    return Number.isInteger(value) ? value : fallback;
  }

  function stringOrNull(value) {
    return typeof value === "string" && value.length ? value : null;
  }

  function uniqueStrings(value) {
    return [...new Set((Array.isArray(value) ? value : []).filter((item) => typeof item === "string" && item.length))];
  }

  function percent(correct, total) {
    return total > 0 ? (correct / total) * 100 : 0;
  }

  function blueprintList(blueprints) {
    return (Array.isArray(blueprints) ? blueprints : []).filter((exam) => exam && typeof exam.id === "string");
  }

  function defaultRecord(exam) {
    return {
      blueprintVersion: integer(exam && exam.version, 1),
      attempts: 0,
      bestPct: 0,
      passed: false,
      distinguished: false,
      masteryEarnedAt: null,
      qualifyingAttemptId: null,
      confirmationDueFrom: null,
      confirmationExpiresAt: null,
      qualifyingTargetKeys: null,
      retentionAttemptId: null,
      lastAttemptAt: null,
      lastResultAttemptId: null,
      lastResult: null,
    };
  }

  function normalizeRecord(raw, exam) {
    const safe = isPlainObject(raw) ? raw : {};
    const base = defaultRecord(exam);
    return {
      blueprintVersion: integer(safe.blueprintVersion, base.blueprintVersion),
      attempts: Math.max(0, integer(safe.attempts, 0)),
      bestPct: Math.max(0, Math.min(100, finite(safe.bestPct, 0))),
      passed: safe.passed === true,
      distinguished: safe.distinguished === true,
      masteryEarnedAt: finite(safe.masteryEarnedAt),
      qualifyingAttemptId: stringOrNull(safe.qualifyingAttemptId),
      confirmationDueFrom: finite(safe.confirmationDueFrom),
      confirmationExpiresAt: finite(safe.confirmationExpiresAt),
      qualifyingTargetKeys: Array.isArray(safe.qualifyingTargetKeys) ? uniqueStrings(safe.qualifyingTargetKeys) : null,
      retentionAttemptId: stringOrNull(safe.retentionAttemptId),
      lastAttemptAt: finite(safe.lastAttemptAt),
      lastResultAttemptId: stringOrNull(safe.lastResultAttemptId),
      lastResult: isPlainObject(safe.lastResult) ? clone(safe.lastResult) : null,
    };
  }

  function normalizeGenerationEntry(entry) {
    if (!isPlainObject(entry)) return null;
    const examId = stringOrNull(entry.examId || entry.baseExamId);
    const resolvedSeed = stringOrNull(entry.resolvedSeed);
    const targetKeys = uniqueStrings(entry.targetKeys || entry.canonicalTargetKeys);
    if (!examId || !resolvedSeed || !targetKeys.length) return null;
    return {
      generationId: stringOrNull(entry.generationId) || `${examId}:${resolvedSeed}`,
      examId,
      baseExamId: stringOrNull(entry.baseExamId) || examId,
      attemptMode: entry.attemptMode === "retention" ? "retention" : "achievement",
      blueprintVersion: integer(entry.blueprintVersion, 1),
      engineVersion: entry.engineVersion == null ? null : entry.engineVersion,
      contentBankRevision: stringOrNull(entry.contentBankRevision),
      eligibilityRevision: stringOrNull(entry.eligibilityRevision),
      requestedSeed: stringOrNull(entry.requestedSeed) || resolvedSeed,
      resolvedSeed,
      generatedAt: finite(entry.generatedAt),
      status: entry.status === "practice" ? "practice" : "hanaPath",
      targetKeys,
      canonicalTargetKeys: targetKeys.slice(),
      freshnessCycleSeed: stringOrNull(entry.freshnessCycleSeed),
      freshnessCycleIndex: integer(entry.freshnessCycleIndex),
      discarded: entry.discarded === true,
      submittedAttemptId: stringOrNull(entry.submittedAttemptId),
    };
  }

  function normalizeSentenceExams(raw, blueprints) {
    const safe = isPlainObject(raw) ? raw : {};
    const previousById = isPlainObject(safe.byExamId) ? safe.byExamId : {};
    const previousHistory = isPlainObject(safe.generationHistory) ? safe.generationHistory : {};
    const out = { version: STATE_VERSION, byExamId: {}, generationHistory: {} };
    for (const exam of blueprintList(blueprints)) {
      out.byExamId[exam.id] = normalizeRecord(previousById[exam.id], exam);
      out.generationHistory[exam.id] = (Array.isArray(previousHistory[exam.id]) ? previousHistory[exam.id] : [])
        .map(normalizeGenerationEntry)
        .filter(Boolean);
    }
    const retentionHistory = Array.isArray(previousHistory["sentence-exam-5:retention"])
      ? previousHistory["sentence-exam-5:retention"].map(normalizeGenerationEntry).filter(Boolean)
      : [];
    if (retentionHistory.length) out.generationHistory["sentence-exam-5:retention"] = retentionHistory;
    return out;
  }

  function sectionIdsForExam(exam) {
    return (Array.isArray(exam && exam.unlockSectionOrders) ? exam.unlockSectionOrders : [])
      .filter(Number.isInteger)
      .map((order) => `sn${order}`);
  }

  function isExamUnlocked(exam, isSectionComplete) {
    if (!exam || typeof isSectionComplete !== "function") return false;
    const sectionIds = sectionIdsForExam(exam);
    return sectionIds.length > 0 && sectionIds.every((sectionId) => isSectionComplete(sectionId));
  }

  function retentionStatus(record, exam, now = Date.now()) {
    if (!exam || !exam.retention || !record) return { phase: "none" };
    if (finite(record.masteryEarnedAt) != null) return { phase: "mastered", at: record.masteryEarnedAt };
    if (finite(record.confirmationDueFrom) == null) return { phase: "none" };
    if (now < record.confirmationDueFrom) return { phase: "waiting", opensAt: record.confirmationDueFrom };
    if (finite(record.confirmationExpiresAt) != null && now > record.confirmationExpiresAt) return { phase: "expired", expiredAt: record.confirmationExpiresAt };
    return { phase: "open", expiresAt: record.confirmationExpiresAt };
  }

  function resultItemMap(result) {
    return new Map((Array.isArray(result && result.items) ? result.items : []).map((item) => [item.itemId, item]));
  }

  function scoreBucket(items, scoredById, predicate) {
    let total = 0;
    let correct = 0;
    for (const item of Array.isArray(items) ? items : []) {
      if (!predicate(item)) continue;
      total += 1;
      if (scoredById.get(item.itemId)?.correct === true) correct += 1;
    }
    return { correct, total, pct: percent(correct, total) };
  }

  function floorAtLeast(bucket, minimum) {
    return bucket.total > 0 && bucket.pct + 1e-9 >= minimum;
  }

  function evaluateBands(exam, result, mode, items) {
    const scoredById = resultItemMap(result);
    const all = scoreBucket(items, scoredById, () => true);
    const typed = scoreBucket(items, scoredById, (item) => TYPED_STRANDS.includes(item.primaryStrand));
    const production = scoreBucket(items, scoredById, (item) => item.primaryStrand === "P");
    const form = scoreBucket(items, scoredById, (item) => item.primaryStrand === "F");
    const context = scoreBucket(items, scoredById, (item) => item.primaryStrand === "X");
    const formContext = scoreBucket(items, scoredById, (item) => item.primaryStrand === "F" || item.primaryStrand === "X");
    const twoSectionBands = {};
    for (let band = 1; band <= 4; band += 1) {
      twoSectionBands[`band-${band}`] = scoreBucket(items, scoredById, (item) => Math.ceil(Number(item.sourceSectionOrder) / 2) === band);
    }
    const activeBands = Object.values(twoSectionBands).filter((bucket) => bucket.total > 0);
    const noBandBelow = (minimum) => activeBands.every((bucket) => floorAtLeast(bucket, minimum));
    const isRetention = mode === "retention";
    const isFinal = !isRetention && exam && exam.kind === "final";
    let passed = false;
    let distinguished = false;
    let masteryQualified = false;
    if (isRetention) {
      passed = all.correct >= 21 && floorAtLeast(all, 84) && floorAtLeast(typed, 80) && noBandBelow(70);
    } else if (isFinal) {
      passed = floorAtLeast(all, 80) && floorAtLeast(typed, 75) && floorAtLeast(production, 75)
        && floorAtLeast(formContext, 70) && noBandBelow(60);
      distinguished = floorAtLeast(all, 90) && floorAtLeast(typed, 85) && noBandBelow(75);
      masteryQualified = floorAtLeast(all, 88) && floorAtLeast(typed, 85) && floorAtLeast(production, 85)
        && floorAtLeast(form, 80) && floorAtLeast(context, 80) && noBandBelow(75);
    } else {
      passed = floorAtLeast(all, 75) && floorAtLeast(typed, 70) && floorAtLeast(production, 70) && noBandBelow(60);
      distinguished = floorAtLeast(all, 90) && floorAtLeast(typed, 85) && noBandBelow(75);
    }
    return {
      passed,
      distinguished,
      masteryQualified,
      overall: all,
      typed,
      production,
      form,
      context,
      formContext,
      twoSectionBands,
    };
  }

  function subscoreEvidence(correct, total) {
    const safeCorrect = Math.max(0, integer(correct, 0));
    const safeTotal = Math.max(0, integer(total, 0));
    const pct = percent(safeCorrect, safeTotal);
    if (safeTotal <= 4) {
      return { correct: safeCorrect, total: safeTotal, pct: null, label: "Not enough evidence this attempt", floorEligible: false };
    }
    if (safeTotal <= 7) {
      const label = pct >= 80 ? "Strong this attempt" : pct >= 60 ? "Mixed this attempt" : "Developing this attempt";
      return { correct: safeCorrect, total: safeTotal, pct: null, label, floorEligible: false };
    }
    return {
      correct: safeCorrect,
      total: safeTotal,
      pct: Math.round(pct * 10) / 10,
      label: null,
      floorEligible: safeTotal >= 10,
    };
  }

  function generationHistoryForEngine(sentenceExams, examId) {
    const history = sentenceExams && sentenceExams.generationHistory && Array.isArray(sentenceExams.generationHistory[examId])
      ? sentenceExams.generationHistory[examId]
      : [];
    return history.slice(-4).map((entry) => ({
      baseExamId: entry.baseExamId,
      attemptMode: entry.attemptMode,
      targetKeys: entry.targetKeys.slice(),
      canonicalTargetKeys: entry.targetKeys.slice(),
      freshnessCycleSeed: entry.freshnessCycleSeed,
      freshnessCycleIndex: entry.freshnessCycleIndex,
    }));
  }

  function makeGenerationEntry(attempt, options = {}) {
    const generatedAt = finite(options.generatedAt, Date.now());
    const status = options.status === "practice" ? "practice" : "hanaPath";
    return normalizeGenerationEntry({
      generationId: stringOrNull(options.generationId) || `${attempt.baseExamId || attempt.examId}:${attempt.resolvedSeed}:${generatedAt}`,
      examId: attempt.examId,
      baseExamId: attempt.baseExamId,
      attemptMode: attempt.attemptMode,
      blueprintVersion: attempt.blueprintVersion,
      engineVersion: attempt.engineVersion,
      contentBankRevision: attempt.contentBankRevision,
      eligibilityRevision: options.eligibilityRevision,
      requestedSeed: attempt.requestedSeed,
      resolvedSeed: attempt.resolvedSeed,
      generatedAt,
      status,
      targetKeys: attempt.targetKeys || attempt.canonicalTargetKeys,
      freshnessCycleSeed: attempt.freshnessCycleSeed,
      freshnessCycleIndex: attempt.freshnessCycleIndex,
      discarded: false,
      submittedAttemptId: null,
    });
  }

  function appendGenerationEntry(sentenceExams, key, entry) {
    if (!sentenceExams || !isPlainObject(sentenceExams.generationHistory)) throw new Error("Sentence exam generation history is unavailable.");
    const normalized = normalizeGenerationEntry(entry);
    if (!normalized) throw new Error("Sentence exam generation entry is invalid.");
    if (!Array.isArray(sentenceExams.generationHistory[key])) sentenceExams.generationHistory[key] = [];
    if (sentenceExams.generationHistory[key].some((item) => item.generationId === normalized.generationId)) {
      throw new Error(`Duplicate Sentence exam generation id ${normalized.generationId}.`);
    }
    sentenceExams.generationHistory[key].push(normalized);
    return normalized;
  }

  function markGenerationSubmitted(sentenceExams, key, generationId, attemptId) {
    const history = sentenceExams && sentenceExams.generationHistory && sentenceExams.generationHistory[key];
    const entry = Array.isArray(history) ? history.find((item) => item.generationId === generationId) : null;
    if (!entry || entry.submittedAttemptId) return false;
    entry.submittedAttemptId = attemptId;
    entry.discarded = false;
    return true;
  }

  function markGenerationDiscarded(sentenceExams, key, generationId) {
    const history = sentenceExams && sentenceExams.generationHistory && sentenceExams.generationHistory[key];
    const entry = Array.isArray(history) ? history.find((item) => item.generationId === generationId) : null;
    if (!entry || entry.submittedAttemptId) return false;
    entry.discarded = true;
    return true;
  }

  function compactResult(result, bands, mode, attemptId) {
    const strand = {};
    for (const code of ALL_STRANDS) {
      const bucket = result && result.strand && result.strand[code];
      if (bucket) strand[code] = { correct: bucket.correct, total: bucket.total };
    }
    return {
      attemptId,
      mode,
      correct: result.correct,
      total: result.total,
      pct: Math.round(result.pct * 10) / 10,
      unanswered: integer(result.unanswered, 0),
      passed: bands.passed,
      distinguished: bands.distinguished,
      masteryQualified: bands.masteryQualified,
      byStrand: strand,
    };
  }

  function updateAchievementRecord(record, context) {
    const { result, bands, mode, status, now, attemptId, attempt, exam } = context;
    record.attempts += 1;
    record.lastAttemptAt = now;
    record.lastResultAttemptId = attemptId;
    record.lastResult = compactResult(result, bands, mode, attemptId);
    if (status !== "hanaPath") return { qualified: false, mastered: false };
    record.bestPct = Math.max(record.bestPct, Math.round(result.pct * 10) / 10);
    if (bands.passed) record.passed = true;
    if (bands.distinguished) record.distinguished = true;
    let qualified = false;
    let mastered = false;
    if (exam && exam.retention) {
      if (mode === "retention") {
        if (bands.passed && !record.masteryEarnedAt) record.masteryEarnedAt = now;
        if (bands.passed) {
          record.retentionAttemptId = attemptId;
          mastered = true;
        }
      } else if (!record.masteryEarnedAt && bands.masteryQualified) {
        record.qualifyingAttemptId = attemptId;
        record.confirmationDueFrom = now + Number(exam.retention.opensAfterDays || 7) * DAY_MS;
        record.confirmationExpiresAt = record.confirmationDueFrom + Number(exam.retention.expiresAfterDays || 21) * DAY_MS;
        record.qualifyingTargetKeys = uniqueStrings(attempt.targetKeys || attempt.canonicalTargetKeys);
        qualified = true;
      }
    }
    return { qualified, mastered };
  }

  function timingSummary(records) {
    const values = Object.values(isPlainObject(records) ? records : {});
    const typed = values.filter((record) => record.mode === "typed");
    const selected = values.filter((record) => record.mode === "recognition");
    function summarize(rows) {
      if (!rows.length) return { items: 0, activeVisibleMs: 0, meanActiveVisibleMs: 0 };
      const total = rows.reduce((sum, row) => sum + Math.max(0, finite(row.activeVisibleMs, 0)), 0);
      return { items: rows.length, activeVisibleMs: total, meanActiveVisibleMs: Math.round(total / rows.length) };
    }
    return { typed: summarize(typed), selected: summarize(selected), all: summarize(values) };
  }

  function buildResultRecord(input) {
    const record = {
      resultSchemaVersion: 1,
      attemptId: input.attemptId,
      examId: input.examId,
      attemptMode: input.attemptMode,
      blueprintVersion: input.blueprintVersion,
      engineVersion: input.engineVersion,
      generationSeed: String(input.generationSeed),
      contentBankRevision: input.contentBankRevision,
      eligibilityRevision: input.eligibilityRevision,
      generatedAt: input.generatedAt,
      submittedAt: input.submittedAt,
      durationSeconds: input.durationSeconds,
      scopeSectionIds: uniqueStrings(input.scopeSectionIds),
      itemCount: input.itemCount,
      scoreSummary: clone(input.scoreSummary),
      floorSummary: clone(input.floorSummary),
      status: input.status,
      overrideFlags: uniqueStrings(input.overrideFlags),
      overrideEventIds: uniqueStrings(input.overrideEventIds),
      qualifyingAttemptId: stringOrNull(input.qualifyingAttemptId),
      retentionAttemptId: stringOrNull(input.retentionAttemptId),
      legacyProvenanceStatus: null,
      checksum: input.checksum || null,
      runnerVersion: RUNNER_VERSION,
      generationId: stringOrNull(input.generationId),
      answerReview: Array.isArray(input.answerReview) ? clone(input.answerReview) : [],
      responseTiming: isPlainObject(input.responseTiming) ? clone(input.responseTiming) : {},
      timingSummary: timingSummary(input.responseTiming),
    };
    return record;
  }

  return Object.freeze({
    STATE_VERSION,
    RUNNER_VERSION,
    DAY_MS,
    TYPED_STRANDS,
    ALL_STRANDS,
    STRAND_LABELS,
    DISCLOSURE,
    MASTERY_LINE,
    clone,
    normalizeSentenceExams,
    sectionIdsForExam,
    isExamUnlocked,
    retentionStatus,
    evaluateBands,
    subscoreEvidence,
    generationHistoryForEngine,
    makeGenerationEntry,
    appendGenerationEntry,
    markGenerationSubmitted,
    markGenerationDiscarded,
    compactResult,
    updateAchievementRecord,
    timingSummary,
    buildResultRecord,
  });
});
