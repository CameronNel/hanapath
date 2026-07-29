#!/usr/bin/env node
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const core = require(join(ROOT, "sentence_exam_runner_core.js"));

const stage = {
  id: "sentence-exam-1",
  kind: "stage",
  version: 1,
  unlockSectionOrders: [1, 2],
  retention: null,
};
const finalExam = {
  id: "sentence-exam-5",
  kind: "final",
  version: 1,
  unlockSectionOrders: [1, 2, 3, 4, 5, 6, 7, 8],
  retention: { opensAfterDays: 7, expiresAfterDays: 21 },
};
const state = core.normalizeSentenceExams(null, [stage, finalExam]);
assert.equal(state.version, 1);
assert.deepEqual(Object.keys(state.byExamId), [stage.id, finalExam.id]);
assert.equal(state.byExamId[finalExam.id].masteryEarnedAt, null);
assert.deepEqual(core.sectionIdsForExam(stage), ["sn1", "sn2"]);
assert.equal(core.isExamUnlocked(stage, (id) => id === "sn1" || id === "sn2"), true);
assert.equal(core.isExamUnlocked(stage, (id) => id === "sn1"), false);

function makeItems(kind = "stage") {
  const allocation = kind === "retention"
    ? { P: 15, F: 3, X: 2, R: 3, C: 2 }
    : kind === "final"
      ? { P: 30, F: 6, X: 4, R: 5, C: 5 }
      : { P: 14, F: 3, X: 3, R: 2, C: 2 };
  const items = [];
  let index = 0;
  for (const [strand, count] of Object.entries(allocation)) {
    for (let slot = 0; slot < count; slot += 1) {
      items.push({
        itemId: `i${++index}`,
        primaryStrand: strand,
        sourceSectionOrder: kind === "stage" ? (index % 2) + 1 : (index % 8) + 1,
      });
    }
  }
  return items;
}

function grade(items, wrongIds = new Set()) {
  const scored = items.map((item) => ({ itemId: item.itemId, primaryStrand: item.primaryStrand, correct: !wrongIds.has(item.itemId) }));
  const strand = {};
  for (const item of scored) {
    const bucket = strand[item.primaryStrand] || { correct: 0, total: 0 };
    bucket.total += 1;
    if (item.correct) bucket.correct += 1;
    strand[item.primaryStrand] = bucket;
  }
  const correct = scored.filter((item) => item.correct).length;
  return { correct, total: items.length, pct: (correct / items.length) * 100, strand, items: scored, unanswered: 0 };
}

const stageItems = makeItems("stage");
const perfectStage = grade(stageItems);
const stageBands = core.evaluateBands(stage, perfectStage, "achievement", stageItems);
assert.equal(stageBands.passed, true);
assert.equal(stageBands.distinguished, true);

const finalItems = makeItems("final");
const perfectFinal = grade(finalItems);
const finalBands = core.evaluateBands(finalExam, perfectFinal, "achievement", finalItems);
assert.equal(finalBands.passed, true);
assert.equal(finalBands.distinguished, true);
assert.equal(finalBands.masteryQualified, true);

const retentionItems = makeItems("retention");
const perfectRetention = grade(retentionItems);
const retentionBands = core.evaluateBands(finalExam, perfectRetention, "retention", retentionItems);
assert.equal(retentionBands.passed, true);
assert.equal(retentionBands.masteryQualified, false);

const record = state.byExamId[finalExam.id];
const targetKeys = finalItems.map((item) => `target-${item.itemId}`);
const qualification = core.updateAchievementRecord(record, {
  result: perfectFinal,
  bands: finalBands,
  mode: "achievement",
  status: "hanaPath",
  now: 1_000_000,
  attemptId: "qualifier-1",
  attempt: { targetKeys },
  exam: finalExam,
});
assert.equal(qualification.qualified, true);
assert.equal(record.qualifyingAttemptId, "qualifier-1");
assert.equal(record.confirmationDueFrom, 1_000_000 + 7 * core.DAY_MS);
assert.equal(record.confirmationExpiresAt, record.confirmationDueFrom + 21 * core.DAY_MS);
assert.deepEqual(record.qualifyingTargetKeys, targetKeys);
assert.equal(core.retentionStatus(record, finalExam, record.confirmationDueFrom - 1).phase, "waiting");
assert.equal(core.retentionStatus(record, finalExam, record.confirmationDueFrom).phase, "open");
assert.equal(core.retentionStatus(record, finalExam, record.confirmationExpiresAt + 1).phase, "expired");

const practiceRecord = core.normalizeSentenceExams(null, [finalExam]).byExamId[finalExam.id];
core.updateAchievementRecord(practiceRecord, {
  result: perfectFinal,
  bands: finalBands,
  mode: "achievement",
  status: "practice",
  now: 2_000_000,
  attemptId: "practice-1",
  attempt: { targetKeys },
  exam: finalExam,
});
assert.equal(practiceRecord.attempts, 1);
assert.equal(practiceRecord.bestPct, 0);
assert.equal(practiceRecord.passed, false);
assert.equal(practiceRecord.qualifyingAttemptId, null);

const mastery = core.updateAchievementRecord(record, {
  result: perfectRetention,
  bands: retentionBands,
  mode: "retention",
  status: "hanaPath",
  now: record.confirmationDueFrom,
  attemptId: "retention-1",
  attempt: { targetKeys: retentionItems.map((item) => `ret-${item.itemId}`) },
  exam: finalExam,
});
assert.equal(mastery.mastered, true);
assert.equal(record.retentionAttemptId, "retention-1");
assert.equal(record.masteryEarnedAt, record.confirmationDueFrom);
assert.equal(core.retentionStatus(record, finalExam, record.confirmationExpiresAt + 999).phase, "incompatible");
assert.equal(core.retentionStatus(record, finalExam, record.confirmationExpiresAt + 999, { masteryIsValid: true }).phase, "mastered");
const timestampOnlyMastery = core.normalizeSentenceExams({
  byExamId: { [finalExam.id]: { masteryEarnedAt: 123_456 } },
}, [finalExam]).byExamId[finalExam.id];
assert.equal(timestampOnlyMastery.masteryEarnedAt, null);
assert.equal(core.retentionStatus(timestampOnlyMastery, finalExam, 200_000).phase, "none");

const historyAttempt = {
  examId: stage.id,
  baseExamId: stage.id,
  attemptMode: "achievement",
  blueprintVersion: 1,
  engineVersion: 1,
  contentBankRevision: "bank-v1",
  requestedSeed: "seed",
  resolvedSeed: "seed#1",
  targetKeys: ["a", "b"],
  freshnessCycleSeed: "cycle",
  freshnessCycleIndex: 0,
};
const historyEntry = core.makeGenerationEntry(historyAttempt, { generatedAt: 10, status: "hanaPath", eligibilityRevision: "elig-v1" });
core.appendGenerationEntry(state, stage.id, historyEntry);
assert.equal(state.generationHistory[stage.id].length, 1);
assert.equal(state.generationHistory[stage.id][0].status, "active");
assert.equal(state.generationHistory[stage.id][0].integrityStatus, "hanaPath");
assert.equal(core.markGenerationDiscarded(state, stage.id, historyEntry.generationId), true);
assert.equal(state.generationHistory[stage.id][0].status, "discarded");
assert.equal(state.generationHistory[stage.id][0].discarded, true);
assert.equal(core.markGenerationSubmitted(state, stage.id, historyEntry.generationId, "attempt-invalid"), false);
const engineHistory = core.generationHistoryForEngine(state, stage.id);
assert.deepEqual(engineHistory[0].targetKeys, ["a", "b"]);
assert.equal(engineHistory[0].freshnessCycleIndex, 0);

const submittedAttempt = { ...historyAttempt, requestedSeed: "submitted", resolvedSeed: "submitted" };
const submittedEntry = core.makeGenerationEntry(submittedAttempt, { generatedAt: 20, status: "practice", eligibilityRevision: "elig-v1" });
core.appendGenerationEntry(state, stage.id, submittedEntry);
assert.equal(submittedEntry.integrityStatus, "practice");
assert.equal(core.markGenerationSubmitted(state, stage.id, submittedEntry.generationId, "attempt-1"), true);
assert.equal(state.generationHistory[stage.id][1].status, "submitted");
assert.equal(state.generationHistory[stage.id][1].submittedAttemptId, "attempt-1");

const timeoutAttempt = { ...historyAttempt, requestedSeed: "timeout", resolvedSeed: "timeout" };
const timeoutEntry = core.makeGenerationEntry(timeoutAttempt, { generatedAt: 30, status: "hanaPath", eligibilityRevision: "elig-v1" });
core.appendGenerationEntry(state, stage.id, timeoutEntry);
assert.equal(core.markGenerationSubmitted(state, stage.id, timeoutEntry.generationId, "attempt-timeout", "timed-out"), true);
assert.equal(state.generationHistory[stage.id][2].status, "timed-out");

const transactionState = {
  sentenceExams: core.normalizeSentenceExams(null, [stage]),
  examResults: { version: 1, byAttemptId: { existing: { attemptId: "existing" } } },
  examIntegrity: {
    version: 1,
    resultRelations: [{ relationId: "existing-relation", type: "retention", fromAttemptId: "a", toAttemptId: "b" }],
  },
};
const transactionGeneration = core.makeGenerationEntry(historyAttempt, {
  generatedAt: 40,
  status: "hanaPath",
  eligibilityRevision: "elig-v1",
});
core.appendGenerationEntry(transactionState.sentenceExams, stage.id, transactionGeneration);
const transactionBefore = JSON.stringify(transactionState);
const transactionSnapshot = core.snapshotSubmissionState(transactionState, {
  examId: stage.id,
  generationKey: stage.id,
  generationId: transactionGeneration.generationId,
  attemptId: "attempt-rollback",
});
transactionState.sentenceExams.byExamId[stage.id].attempts = 99;
transactionState.examResults.byAttemptId["attempt-rollback"] = { attemptId: "attempt-rollback" };
core.markGenerationSubmitted(transactionState.sentenceExams, stage.id, transactionGeneration.generationId, "attempt-rollback");
transactionState.examIntegrity.resultRelations.push({
  relationId: "rollback-relation",
  type: "retention",
  fromAttemptId: "qualifier",
  toAttemptId: "attempt-rollback",
});
assert.equal(core.restoreSubmissionState(transactionState, transactionSnapshot), true);
assert.equal(JSON.stringify(transactionState), transactionBefore);

assert.equal(core.subscoreEvidence(4, 4).pct, null);
assert.equal(core.subscoreEvidence(4, 5).label, "Strong this attempt");
assert.equal(core.subscoreEvidence(7, 9).pct, 77.8);
assert.equal(core.subscoreEvidence(8, 10).floorEligible, true);

const resultRecord = core.buildResultRecord({
  attemptId: "attempt-1",
  examId: stage.id,
  attemptMode: "achievement",
  blueprintVersion: 1,
  engineVersion: "engine-v1",
  generationSeed: "seed#1",
  contentBankRevision: "bank-v1",
  eligibilityRevision: "elig-v1",
  generatedAt: 100,
  submittedAt: 200,
  durationSeconds: 100,
  scopeSectionIds: ["sn1", "sn2"],
  itemCount: 24,
  scoreSummary: { correct: 24, total: 24, pct: 100 },
  floorSummary: { passed: true, distinguished: true },
  status: "hanaPath",
  overrideFlags: [],
  overrideEventIds: [],
  answerReview: [{ itemId: "i1", candidateAnswer: "안녕하세요", correct: true }],
  responseTiming: {
    i1: { itemId: "i1", mode: "typed", activeVisibleMs: 1200 },
  },
});
assert.equal(resultRecord.runnerVersion, 1);
assert.equal(resultRecord.timingSummary.typed.items, 1);
assert.equal(resultRecord.answerReview[0].candidateAnswer, "안녕하세요");
assert.equal(core.DISCLOSURE.includes("not proctored or tamper-proof credentials"), true);
assert.equal(core.MASTERY_LINE, "You demonstrated and retained the taught HanaPath sentence patterns in this device-local assessment.");

console.log("Sentence exam X2 runner-core regression passed.");
