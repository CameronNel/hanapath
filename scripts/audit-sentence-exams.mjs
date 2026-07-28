#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPORT_PATH = path.join(ROOT, "docs", "generated", "sentence_exam_x1_coverage.json");
const args = new Set(process.argv.slice(2));
const WRITE_REPORT = args.has("--write-report");
const CHECK_REPORT = args.has("--check-report");
const PREFLIGHT = args.has("--preflight");
const ACTIVE_REVISION = "curated-sentence-exam-v2-cb6b";
const FULL_INDEPENDENT_COUNTS = {
  "sentence-exam-1": 500,
  "sentence-exam-2": 500,
  "sentence-exam-3": 500,
  "sentence-exam-4": 500,
  "sentence-exam-5": 1000,
};
const FULL_FRESHNESS_COUNTS = {
  "sentence-exam-1": 250,
  "sentence-exam-2": 250,
  "sentence-exam-3": 250,
  "sentence-exam-4": 250,
  "sentence-exam-5": 500,
};
const INDEPENDENT_COUNTS = PREFLIGHT
  ? Object.fromEntries(Object.keys(FULL_INDEPENDENT_COUNTS).map((examId) => [examId, 5]))
  : FULL_INDEPENDENT_COUNTS;
const FRESHNESS_COUNTS = PREFLIGHT
  ? Object.fromEntries(Object.keys(FULL_FRESHNESS_COUNTS).map((examId) => [examId, 1]))
  : FULL_FRESHNESS_COUNTS;

if (PREFLIGHT && (WRITE_REPORT || CHECK_REPORT)) {
  console.error("Preflight mode cannot write or verify release evidence.");
  process.exit(2);
}

const startedAt = performance.now();
const sandbox = { window: {}, console };
vm.createContext(sandbox);
for (const filename of [
  "sentences_lesson_plan.js",
  "sentence_exam_curated_bank.js",
  "sentence_exam_curated_bank_freeze.js",
  "sentence_exam_grader.js",
  "sentence_exam_blueprints.js",
  "sentence_exam_engine.js",
]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, filename), "utf8"), sandbox, { filename });
}

const bank = sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
const freeze = sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE;
const exams = sandbox.window.HANAPATH_SENTENCE_EXAMS || [];
const meta = sandbox.window.HANAPATH_SENTENCE_EXAM_META;
const engine = sandbox.window.HANAPATH_SENTENCE_EXAM_ENGINE;
const grader = sandbox.window.HANAPATH_SENTENCE_EXAM_GRADER;
const lessons = sandbox.window.HANAPATH_SENTENCE_LESSONS || [];
const lessonIds = new Set(lessons.map((lesson) => lesson.id));
const capacityScaffolds = sandbox.window.HANAPATH_SENTENCE_EXAM_CAPACITY_SCAFFOLDS;
const failures = [];

function stable(value) {
  return JSON.stringify(value, null, 2) + "\n";
}

function addFailure(code, message, details = {}) {
  failures.push({ code, message, details });
}

function countBy(values, keyOf) {
  const counts = {};
  for (const value of values) {
    const key = keyOf(value);
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

function allocationCounts(attempt) {
  return countBy(attempt.items, (item) => item.primaryStrand);
}

function exposureAccumulator() {
  return { totalSelections: 0, sections: {}, strands: {}, tags: {}, targets: {}, entries: {} };
}

function addExposure(accumulator, attempt) {
  accumulator.totalSelections += attempt.items.length;
  for (const item of attempt.items) {
    for (const [bucket, key] of [
      [accumulator.sections, String(item.sourceSectionOrder)],
      [accumulator.strands, item.primaryStrand],
      [accumulator.targets, item.canonicalTargetKey],
      [accumulator.entries, item.sourceEntryId],
    ]) {
      bucket[key] = (bucket[key] || 0) + 1;
    }
    for (const tag of item.patternTags || []) {
      accumulator.tags[tag] = (accumulator.tags[tag] || 0) + 1;
    }
  }
}

function summarizeBucket(bucket) {
  const entries = Object.entries(bucket);
  const values = entries.map(([, value]) => value);
  const sorted = entries.slice().sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  return {
    distinct: values.length,
    min: values.length ? Math.min(...values) : 0,
    max: values.length ? Math.max(...values) : 0,
    mean: values.length
      ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(4))
      : 0,
    mostExposed: sorted.slice(0, 10).map(([key, count]) => ({ key, count })),
    leastExposed: sorted.slice(-10).reverse().map(([key, count]) => ({ key, count })),
  };
}

function summarizeExposure(accumulator) {
  return {
    totalSelections: accumulator.totalSelections,
    sections: summarizeBucket(accumulator.sections),
    strands: summarizeBucket(accumulator.strands),
    tags: summarizeBucket(accumulator.tags),
    targets: summarizeBucket(accumulator.targets),
    entries: summarizeBucket(accumulator.entries),
  };
}

function expectedContract(blueprint) {
  return {
    itemCount: blueprint.itemCount,
    timeLimitMinutes: blueprint.timeLimitMinutes,
    allocations: Object.fromEntries(Object.entries(blueprint.allocations || {})),
  };
}

function verifyAttempt(attempt, blueprint, label) {
  const errors = Array.from(engine.validateAttempt(attempt));
  if (errors.length) addFailure("attempt-validation", `${label} failed engine validation.`, { errors });
  if (attempt.itemCount !== blueprint.itemCount || attempt.items.length !== blueprint.itemCount) {
    addFailure("item-count", `${label} has the wrong item count.`, {
      expected: blueprint.itemCount,
      itemCount: attempt.itemCount,
      items: attempt.items.length,
    });
  }
  if (attempt.timeLimitMinutes !== blueprint.timeLimitMinutes) {
    addFailure("time-limit", `${label} has the wrong time limit.`, {
      expected: blueprint.timeLimitMinutes,
      actual: attempt.timeLimitMinutes,
    });
  }
  const actualAllocations = allocationCounts(attempt);
  const allocationMatches = Object.entries(blueprint.allocations || {})
    .every(([strand, expected]) => (actualAllocations[strand] || 0) === expected);
  if (!allocationMatches) {
    addFailure("allocation", `${label} has the wrong strand allocation.`, {
      expected: blueprint.allocations,
      actual: actualAllocations,
    });
  }
  if (attempt.contentBankRevision !== ACTIVE_REVISION
      || attempt.blueprintVersion !== meta.blueprintVersion
      || attempt.engineVersion !== meta.engineVersion) {
    addFailure("provenance", `${label} has invalid immutable provenance.`, {
      contentBankRevision: attempt.contentBankRevision,
      blueprintVersion: attempt.blueprintVersion,
      engineVersion: attempt.engineVersion,
    });
  }
  if (!attempt.requestedSeed || !attempt.resolvedSeed) {
    addFailure("seed-provenance", `${label} has incomplete seed provenance.`);
  }

  const targetKeys = new Set();
  const surfaces = new Set();
  const rows = new Set();
  const prompts = new Set();
  for (const item of attempt.items) {
    const promptIdentity = item.mode === "recognition"
      ? `${String(item.promptEn).toLocaleLowerCase("en")}|${grader.normalizeSentenceExamAnswer(item.canonicalAnswer)}`
      : String(item.promptEn).toLocaleLowerCase("en");
    for (const [set, key, duplicateCode] of [
      [targetKeys, item.canonicalTargetKey, "duplicate-target"],
      [surfaces, grader.normalizeSentenceExamAnswer(item.canonicalAnswer), "duplicate-surface"],
      [rows, item.sourceEntryId, "duplicate-source-row"],
      [prompts, promptIdentity, "duplicate-prompt"],
    ]) {
      if (set.has(key)) addFailure(duplicateCode, `${label} repeats ${key}.`);
      set.add(key);
    }
    for (const lessonId of item.sourceLessonIds || []) {
      if (!lessonIds.has(lessonId)) {
        addFailure("missing-route", `${label} item ${item.sourceEntryId} references missing lesson ${lessonId}.`);
      }
    }
    if (item.mode === "recognition") {
      const answer = item.answerContract?.recognitionAnswerEn;
      const optionKeys = (item.options || []).map((value) => value.toLocaleLowerCase("en"));
      if (item.options?.length !== 4 || new Set(optionKeys).size !== 4) {
        addFailure("recognition-options", `${label} item ${item.sourceEntryId} lacks four unique options.`);
      }
      if ((item.options || []).filter((value) => value === answer).length !== 1) {
        addFailure("recognition-answer", `${label} item ${item.sourceEntryId} lacks exactly one correct option.`);
      }
    }
  }

  const typed = attempt.items.find((item) => item.mode === "typed");
  if (typed) {
    const correct = engine.gradeAttempt(attempt, { [typed.itemId]: typed.canonicalAnswer });
    if (!correct.items.find((item) => item.itemId === typed.itemId)?.correct) {
      addFailure("strict-grader", `${label} rejected its canonical typed answer.`);
    }
    const spacingOnly = typed.canonicalAnswer.replace(/\s+/g, "");
    if (spacingOnly !== typed.canonicalAnswer) {
      const spacing = engine.gradeAttempt(attempt, { [typed.itemId]: spacingOnly });
      if (spacing.items.find((item) => item.itemId === typed.itemId)?.correct) {
        addFailure("strict-spacing", `${label} accepted a spacing-deleted typed answer.`);
      }
    }
  }
}

if (!bank || bank.enabled !== true || bank.freezeState !== "frozen") {
  addFailure("bank-not-frozen", "Enabled frozen curated bank is required.");
}
if (bank?.revision !== ACTIVE_REVISION
    || freeze?.revision !== ACTIVE_REVISION
    || meta?.contentBankRevision !== ACTIVE_REVISION) {
  addFailure("bank-revision", "Runtime, freeze, and blueprint revisions must match CB6B.", {
    bank: bank?.revision,
    freeze: freeze?.revision,
    meta: meta?.contentBankRevision,
  });
}
if (exams.length !== 5) addFailure("blueprint-count", "Exactly five achievement blueprints are required.", { count: exams.length });

const entries = Array.isArray(bank?.entries) ? bank.entries : [];
const typedEntries = entries.filter((entry) => entry.mode === "typed");
const recognitionEntries = entries.filter((entry) => entry.mode === "recognition");
if (entries.length !== 702 || freeze?.entryCount !== 702) {
  addFailure("bank-count", "Frozen bank must contain exactly 702 entries.", { actual: entries.length, frozen: freeze?.entryCount });
}
if (typedEntries.length !== 359 || freeze?.typedCount !== 359) {
  addFailure("typed-bank-count", "Frozen bank must contain exactly 359 typed entries.", { actual: typedEntries.length });
}
if (recognitionEntries.length !== 343 || freeze?.recognitionCount !== 343) {
  addFailure("recognition-bank-count", "Frozen bank must contain exactly 343 recognition entries.", { actual: recognitionEntries.length });
}
for (const entry of entries) {
  if (!entry.id || !entry.canonicalAnswer || !entry.sourceSectionOrder) {
    addFailure("malformed-entry", `Malformed curated entry ${entry.id || "(missing id)"}.`);
  }
  for (const lessonId of entry.sourceLessonIds || []) {
    if (!lessonIds.has(lessonId)) addFailure("missing-route", `${entry.id} references missing lesson ${lessonId}.`);
  }
}

const witnessAssignment = JSON.parse(fs.readFileSync(
  path.join(ROOT, "docs", "authoring", "sentence_exam_cb6b_witness_assignment.json"),
  "utf8",
));
if (capacityScaffolds?.revision !== witnessAssignment.revision) {
  addFailure("capacity-scaffold-revision", "Runtime capacity scaffold revision differs from the authoritative CB6B witness.", {
    runtime: capacityScaffolds?.revision,
    witness: witnessAssignment.revision,
  });
}
for (const examId of Object.keys(FULL_INDEPENDENT_COUNTS)) {
  const encodedWitness = (witnessAssignment.exams?.[examId] || [])
    .map((attempt) => attempt.map((selection) => `${selection.id}:${selection.strand}`).join(","))
    .join("/");
  if (capacityScaffolds?.exams?.[examId] !== encodedWitness) {
    addFailure("capacity-scaffold-drift", `${examId} runtime capacity scaffold differs from the authoritative CB6B witness.`);
  }
}

const blueprintContracts = {};
for (const exam of exams) blueprintContracts[exam.id] = expectedContract(exam);
const retentionBlueprint = engine.resolveBlueprint("sentence-exam-5", "retention");
blueprintContracts[retentionBlueprint.id] = expectedContract(retentionBlueprint);

const independentResults = {};
for (const exam of exams) {
  const requested = INDEPENDENT_COUNTS[exam.id];
  const exposure = exposureAccumulator();
  let completed = 0;
  let deterministicRepeats = 0;
  let fallbackResolved = 0;
  const examFailures = [];
  for (let index = 0; index < requested; index += 1) {
    const seed = `x1-independent-${exam.id}-${String(index).padStart(4, "0")}`;
    try {
      const attempt = engine.generateAttempt(exam.id, seed);
      const repeated = engine.generateAttempt(exam.id, seed);
      if (stable(repeated) !== stable(attempt)) {
        addFailure("seed-nondeterminism", `${exam.id} seed ${seed} is not byte-deterministic.`);
      } else {
        deterministicRepeats += 1;
      }
      verifyAttempt(attempt, exam, `${exam.id} independent seed ${index}`);
      addExposure(exposure, attempt);
      if (attempt.resolvedSeed !== seed) fallbackResolved += 1;
      completed += 1;
    } catch (error) {
      const detail = { index, seed, message: error.message, failures: (error.failures || []).slice(-3) };
      examFailures.push(detail);
      addFailure("independent-generation", `${exam.id} independent seed ${index} failed.`, detail);
    }
  }
  independentResults[exam.id] = {
    requested,
    completed,
    deterministicRepeats,
    failures: examFailures,
    fallbackResolved,
    capacity: engine.analyzeCapacity(exam.id),
    exposure: summarizeExposure(exposure),
  };
}

const freshnessResults = {};
const retentionEvidence = {
  requested: FRESHNESS_COUNTS["sentence-exam-5"],
  completed: 0,
  deterministicRepeats: 0,
  qualifyingTargetsExcluded: 0,
  overlapCount: 0,
  failures: [],
  exposure: exposureAccumulator(),
};
for (const exam of exams) {
  const requestedSequences = FRESHNESS_COUNTS[exam.id];
  const exposure = exposureAccumulator();
  let completedSequences = 0;
  let completedForms = 0;
  let deterministicRepeats = 0;
  let overlapCount = 0;
  let historyImmutabilityChecks = 0;
  let fallbackResolved = 0;
  let variationMin = null;
  let variationMax = 0;
  const examFailures = [];
  for (let sequenceIndex = 0; sequenceIndex < requestedSequences; sequenceIndex += 1) {
    const seed = `x1-freshness-${exam.id}-${String(sequenceIndex).padStart(4, "0")}`;
    try {
      const sequence = engine.generateFreshnessSequence(exam.id, seed);
      const repeated = engine.generateFreshnessSequence(exam.id, seed);
      if (stable(repeated) !== stable(sequence)) {
        addFailure("freshness-nondeterminism", `${exam.id} freshness sequence ${sequenceIndex} is not deterministic.`);
      } else {
        deterministicRepeats += 1;
      }
      if (sequence.length !== 5) {
        addFailure("freshness-length", `${exam.id} freshness sequence ${sequenceIndex} has ${sequence.length}/5 forms.`);
      }
      const seen = new Set();
      for (const [attemptIndex, attempt] of sequence.entries()) {
        verifyAttempt(attempt, exam, `${exam.id} freshness ${sequenceIndex} attempt ${attemptIndex}`);
        for (const target of attempt.targetKeys) {
          if (seen.has(target)) {
            overlapCount += 1;
            addFailure("freshness-overlap", `${exam.id} freshness sequence ${sequenceIndex} repeats target ${target}.`);
          }
          seen.add(target);
        }
        if (attempt.freshnessCycleSeed !== seed) fallbackResolved += 1;
        variationMin = variationMin == null
          ? attempt.cycleVariationCount
          : Math.min(variationMin, attempt.cycleVariationCount);
        variationMax = Math.max(variationMax, attempt.cycleVariationCount);
        addExposure(exposure, attempt);
        completedForms += 1;
      }

      if (sequenceIndex === 0) {
        const history = [];
        for (let attemptIndex = 0; attemptIndex < 5; attemptIndex += 1) {
          const before = stable(history);
          const attempt = engine.generateAttempt(exam.id, `${seed}-history-${attemptIndex}`, { freshnessHistory: history });
          if (stable(history) !== before) {
            addFailure("history-mutation", `${exam.id} mutated caller history at attempt ${attemptIndex}.`);
          }
          historyImmutabilityChecks += 1;
          history.push(attempt);
        }
      }

      if (exam.id === "sentence-exam-5") {
        const qualifying = sequence[sequenceIndex % sequence.length];
        const retentionSeed = `x1-retention-${String(sequenceIndex).padStart(4, "0")}`;
        try {
          const retention = engine.generateAttempt("sentence-exam-5", retentionSeed, {
            attemptMode: "retention",
            qualifyingTargetKeys: qualifying.targetKeys,
          });
          const repeatedRetention = engine.generateAttempt("sentence-exam-5", retentionSeed, {
            attemptMode: "retention",
            qualifyingTargetKeys: qualifying.targetKeys,
          });
          if (stable(repeatedRetention) !== stable(retention)) {
            addFailure("retention-nondeterminism", `Retention check ${sequenceIndex} is not deterministic.`);
          } else {
            retentionEvidence.deterministicRepeats += 1;
          }
          verifyAttempt(retention, retentionBlueprint, `retention check ${sequenceIndex}`);
          const qualifyingTargets = new Set(qualifying.targetKeys);
          const overlap = retention.targetKeys.filter((target) => qualifyingTargets.has(target));
          if (overlap.length) {
            retentionEvidence.overlapCount += overlap.length;
            addFailure("retention-overlap", `Retention check ${sequenceIndex} reused qualifying targets.`, { overlap });
          }
          retentionEvidence.qualifyingTargetsExcluded += qualifyingTargets.size;
          addExposure(retentionEvidence.exposure, retention);
          retentionEvidence.completed += 1;
        } catch (error) {
          const detail = { sequenceIndex, message: error.message, failures: (error.failures || []).slice(-3) };
          retentionEvidence.failures.push(detail);
          addFailure("retention-generation", `Retention check ${sequenceIndex} failed.`, detail);
        }
      }
      completedSequences += 1;
    } catch (error) {
      const detail = { sequenceIndex, seed, message: error.message, failures: (error.failures || []).slice(-3) };
      examFailures.push(detail);
      addFailure("freshness-generation", `${exam.id} freshness sequence ${sequenceIndex} failed.`, detail);
    }
  }
  freshnessResults[exam.id] = {
    requestedSequences,
    completedSequences,
    requestedForms: requestedSequences * 5,
    completedForms,
    deterministicRepeats,
    historyImmutabilityChecks,
    overlapCount,
    fallbackResolved,
    variationCount: { min: variationMin || 0, max: variationMax },
    failures: examFailures,
    exposure: summarizeExposure(exposure),
  };
}
retentionEvidence.exposure = summarizeExposure(retentionEvidence.exposure);

const malformedHistory = [];
try {
  engine.generateAttempt("sentence-exam-1", "x1-audit-malformed-history", {
    freshnessHistory: [{ baseExamId: "sentence-exam-1", targetKeys: [] }],
  });
  addFailure("fallback-exhaustion", "Malformed history did not fail closed.");
} catch (error) {
  malformedHistory.push(...(error.failures || []));
  if (error.code !== "SENTENCE_EXAM_POOL_UNAVAILABLE"
      || error.failures?.length !== 33
      || !error.failures?.[0]?.startsWith("x1-audit-malformed-history:")
      || !error.failures?.[32]?.startsWith("x1-audit-malformed-history#32:")) {
    addFailure("fallback-exhaustion", "Fallback did not execute exactly seed through seed#32.", {
      code: error.code,
      count: error.failures?.length,
    });
  }
}

if (PREFLIGHT) {
  addFailure("preflight-only", "Preflight mode is not release evidence; run the default full audit.");
}

const report = {
  schemaVersion: 2,
  generatedBy: "scripts/audit-sentence-exams.mjs",
  mode: PREFLIGHT ? "preflight" : "full",
  blueprintVersion: meta?.blueprintVersion,
  engineVersion: meta?.engineVersion,
  engineRevision: meta?.engineRevision,
  contentBankRevision: meta?.contentBankRevision,
  frozenBank: {
    enabled: bank?.enabled === true,
    freezeState: bank?.freezeState,
    revision: bank?.revision,
    entryCount: entries.length,
    typedEntries: typedEntries.length,
    recognitionEntries: recognitionEntries.length,
    typedBySection: countBy(typedEntries, (entry) => String(entry.sourceSectionOrder)),
    recognitionBySection: countBy(recognitionEntries, (entry) => String(entry.sourceSectionOrder)),
  },
  blueprintContracts,
  capacityScaffold: {
    revision: capacityScaffolds?.revision,
    source: capacityScaffolds?.source,
    authoritativeWitnessRevision: witnessAssignment.revision,
    exactWitnessMatch: Object.keys(FULL_INDEPENDENT_COUNTS).every((examId) => (
      capacityScaffolds?.exams?.[examId]
        === (witnessAssignment.exams?.[examId] || [])
          .map((attempt) => attempt.map((selection) => `${selection.id}:${selection.strand}`).join(","))
          .join("/")
    )),
  },
  workload: {
    independentFormsRequested: Object.values(INDEPENDENT_COUNTS).reduce((sum, value) => sum + value, 0),
    independentFormsCompleted: Object.values(independentResults).reduce((sum, result) => sum + result.completed, 0),
    independentDeterminismRepeats: Object.values(independentResults).reduce((sum, result) => sum + result.deterministicRepeats, 0),
    freshnessSequencesRequested: Object.values(FRESHNESS_COUNTS).reduce((sum, value) => sum + value, 0),
    freshnessSequencesCompleted: Object.values(freshnessResults).reduce((sum, result) => sum + result.completedSequences, 0),
    freshnessFormsRequested: Object.values(FRESHNESS_COUNTS).reduce((sum, value) => sum + value * 5, 0),
    freshnessFormsCompleted: Object.values(freshnessResults).reduce((sum, result) => sum + result.completedForms, 0),
    freshnessDeterminismRepeats: Object.values(freshnessResults).reduce((sum, result) => sum + result.deterministicRepeats, 0),
    retentionChecksRequested: retentionEvidence.requested,
    retentionChecksCompleted: retentionEvidence.completed,
  },
  independent: independentResults,
  freshness: freshnessResults,
  retentionAvoidance: retentionEvidence,
  fallbackEvidence: {
    requestedSeed: "x1-audit-malformed-history",
    attemptsExecuted: malformedHistory.length,
    firstResolvedSeed: malformedHistory[0]?.split(":")[0] || null,
    lastResolvedSeed: malformedHistory[32]?.split(":")[0] || null,
  },
  ready: !PREFLIGHT && failures.length === 0,
  blockers: failures,
};

const rendered = stable(report);
if (WRITE_REPORT) {
  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, rendered);
  console.log(`Wrote ${path.relative(ROOT, REPORT_PATH)}.`);
}
if (CHECK_REPORT) {
  const committed = fs.existsSync(REPORT_PATH) ? fs.readFileSync(REPORT_PATH, "utf8") : "";
  if (committed !== rendered) addFailure("stale-report", "Generated X1 coverage report is stale. Run with --write-report.");
}

const elapsedSeconds = (performance.now() - startedAt) / 1000;
console.log("Sentence exam X1 audit");
console.log("======================");
console.log(`Mode: ${PREFLIGHT ? "preflight (non-release)" : "full release audit"}`);
console.log(`Frozen pool: ${entries.length} total / ${typedEntries.length} typed / ${recognitionEntries.length} recognition`);
for (const [examId, result] of Object.entries(independentResults)) {
  const freshness = freshnessResults[examId];
  console.log(
    `${examId}: independent ${result.completed}/${result.requested}; `
    + `freshness ${freshness.completedSequences}/${freshness.requestedSequences} sequences `
    + `(${freshness.completedForms}/${freshness.requestedForms} forms)`,
  );
}
console.log(`Retention avoidance: ${retentionEvidence.completed}/${retentionEvidence.requested}; overlaps ${retentionEvidence.overlapCount}`);
console.log(`Runtime: ${elapsedSeconds.toFixed(3)}s`);
if (failures.length) {
  console.log(`Blockers: ${failures.length}`);
  for (const failure of failures.slice(0, 30)) console.log(`  [${failure.code}] ${failure.message}`);
  if (failures.length > 30) console.log(`  ...and ${failures.length - 30} more`);
} else {
  console.log("All X1 blueprint, engine, seed, freshness, retention, route, and grading gates passed.");
}

if (failures.length) process.exit(1);
