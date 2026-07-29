#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RUNTIME_FILES = [
  "sentence_exam_curated_bank.js",
  "sentence_exam_curated_bank_freeze.js",
  "sentence_exam_grader.js",
  "sentence_exam_blueprints.js",
  "sentence_exam_engine.js",
];
const EXAM_IDS = [
  "sentence-exam-1",
  "sentence-exam-2",
  "sentence-exam-3",
  "sentence-exam-4",
  "sentence-exam-5",
];
const ACTIVE_REVISION = "curated-sentence-exam-v2-cb6b";

function loadRuntime() {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  for (const filename of RUNTIME_FILES) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, filename), "utf8"), sandbox, { filename });
  }
  return sandbox;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function countBy(values, keyOf) {
  const counts = {};
  for (const value of values) {
    const key = keyOf(value);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function assertAttempt(engine, attempt, expected) {
  assert.equal(attempt.contentBankRevision, ACTIVE_REVISION);
  assert.equal(attempt.itemCount, expected.count);
  assert.equal(attempt.items.length, expected.count);
  assert.equal(attempt.timeLimitMinutes, expected.minutes);
  assert.deepEqual(countBy(attempt.items, (item) => item.primaryStrand), expected.allocations);
  assert.equal(engine.validateAttempt(attempt).length, 0);
  assert.equal(new Set(attempt.targetKeys).size, expected.count, "paper repeats a canonical target");
  assert.equal(new Set(attempt.items.map((item) => item.canonicalAnswer)).size, expected.count, "paper repeats a Korean surface");
  assert.equal(new Set(attempt.sourceEntryIds).size, expected.count, "paper repeats a source row");
  assert.equal(new Set(attempt.prompts.map((prompt) => (
    `${prompt.templateId}|${prompt.promptEn}|${prompt.itemId}`
  ))).size, expected.count, "paper repeats a prompt identity");
  assert.equal(attempt.sourceEntryIds.length, expected.count);
  assert.equal(attempt.canonicalTargetKeys.length, expected.count);
  assert.equal(attempt.strands.length, expected.count);
  assert.equal(attempt.prompts.length, expected.count);
  assert.equal(attempt.answerContracts.length, expected.count);
  for (const item of attempt.items) {
    assert.ok(item.sourceLessonIds.length > 0, `${item.itemId} has no source lesson route`);
    assert.equal(item.answerContract.canonicalAnswer, item.canonicalAnswer);
    assert.equal(item.answerContract.templateId, item.promptTemplateId);
    if (item.mode !== "recognition") continue;
    const answer = item.answerContract.recognitionAnswerEn;
    assert.equal(item.options.length, 4);
    assert.equal(new Set(item.options.map((value) => value.toLocaleLowerCase("en"))).size, 4);
    assert.equal(item.options.filter((value) => value === answer).length, 1);
  }
}

const contracts = {
  "sentence-exam-1": { count: 24, minutes: 40, allocations: { P: 14, F: 3, X: 3, R: 2, C: 2 } },
  "sentence-exam-2": { count: 24, minutes: 40, allocations: { P: 14, F: 3, X: 3, R: 2, C: 2 } },
  "sentence-exam-3": { count: 24, minutes: 40, allocations: { P: 14, F: 3, X: 3, R: 2, C: 2 } },
  "sentence-exam-4": { count: 24, minutes: 40, allocations: { P: 14, F: 3, X: 3, R: 2, C: 2 } },
  "sentence-exam-5": { count: 50, minutes: 75, allocations: { P: 30, F: 6, X: 4, R: 5, C: 5 } },
  "sentence-exam-5:retention": { count: 25, minutes: 40, allocations: { P: 15, F: 3, X: 2, R: 3, C: 2 } },
};

const sandbox = loadRuntime();
const engine = sandbox.window.HANAPATH_SENTENCE_EXAM_ENGINE;
const bank = sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
const meta = sandbox.window.HANAPATH_SENTENCE_EXAM_META;
const exams = sandbox.window.HANAPATH_SENTENCE_EXAMS;
assert.ok(engine, "engine global missing");
assert.equal(engine.engineVersion, 1);
assert.equal(engine.engineRevision, "sentence-exam-engine-v1-x1");
assert.equal(meta.contentBankRevision, ACTIVE_REVISION);
assert.equal(bank.revision, ACTIVE_REVISION);
assert.equal(bank.enabled, true);
assert.equal(bank.freezeState, "frozen");
assert.equal(bank.entries.length, 702);
assert.equal(bank.entries.filter((entry) => entry.mode === "typed").length, 359);
assert.equal(bank.entries.filter((entry) => entry.mode === "recognition").length, 343);
assert.equal(exams.length, 5, "exactly five achievement blueprints must ship");
assert.deepEqual(Array.from(exams, (exam) => exam.id), EXAM_IDS);

for (const examId of EXAM_IDS) {
  const blueprint = engine.resolveBlueprint(examId);
  assert.equal(blueprint.kind, examId === "sentence-exam-5" ? "final" : "stage");
  assert.equal(blueprint.itemCount, contracts[examId].count);
  assert.equal(blueprint.timeLimitMinutes, contracts[examId].minutes);
  assert.deepEqual(clone(blueprint.allocations), contracts[examId].allocations);
  const attempt = engine.generateAttempt(examId, `x1-contract-${examId}`);
  assertAttempt(engine, attempt, contracts[examId]);
}

const retentionBlueprint = engine.resolveBlueprint("sentence-exam-5", "retention");
assert.equal(retentionBlueprint.id, "sentence-exam-5:retention");
assert.equal(retentionBlueprint.baseExamId, "sentence-exam-5");
assert.equal(retentionBlueprint.kind, "retention");
assert.deepEqual(clone(retentionBlueprint.allocations), contracts["sentence-exam-5:retention"].allocations);

const deterministicA = engine.generateAttempt("sentence-exam-1", "x1-determinism");
const deterministicB = engine.generateAttempt("sentence-exam-1", "x1-determinism");
assert.deepEqual(deterministicB, deterministicA, "same seed is not byte-deterministic");
const alternate = engine.generateAttempt("sentence-exam-1", "x1-determinism-alt");
assert.notDeepEqual(alternate.targetKeys, deterministicA.targetKeys, "different seeds produced an identical paper");
assert.ok(deterministicA.cycleVariationCount > 0, "capacity scaffold was emitted without variation");

const optionAttemptA = engine.generateAttempt("sentence-exam-4", "x1-option-order");
const optionAttemptB = engine.generateAttempt("sentence-exam-4", "x1-option-order");
assert.deepEqual(optionAttemptB, optionAttemptA, "recognition option order is not deterministic");
const optionAttemptC = engine.generateAttempt("sentence-exam-4", "x1-option-order-alt");
assert.notDeepEqual(
  optionAttemptC.items.filter((item) => item.mode === "recognition").map((item) => item.options),
  optionAttemptA.items.filter((item) => item.mode === "recognition").map((item) => item.options),
  "legitimate seed variation did not affect recognition papers",
);

const typedItem = deterministicA.items.find((item) => item.mode === "typed");
const grader = sandbox.window.HANAPATH_SENTENCE_EXAM_GRADER;
const directGrade = grader.scoreSentenceExamResponse(
  { canonicalAnswer: typedItem.canonicalAnswer, manualAlternatives: typedItem.manualAlternatives },
  typedItem.canonicalAnswer,
);
let delegatedCalls = 0;
const originalScore = grader.scoreSentenceExamResponse;
grader.scoreSentenceExamResponse = function delegatedScore(item, response) {
  delegatedCalls += 1;
  return originalScore(item, response);
};
const engineGrade = engine.gradeAttempt(deterministicA, { [typedItem.itemId]: typedItem.canonicalAnswer });
assert.equal(delegatedCalls, deterministicA.items.filter((item) => item.mode === "typed").length);
assert.equal(engineGrade.items.find((item) => item.itemId === typedItem.itemId).correct, directGrade.correct);
grader.scoreSentenceExamResponse = originalScore;

const spacingOnly = String(typedItem.canonicalAnswer).replace(/\s+/g, "");
const strictSpacing = engine.gradeAttempt(deterministicA, { [typedItem.itemId]: spacingOnly });
assert.equal(
  strictSpacing.items.find((item) => item.itemId === typedItem.itemId).correct,
  spacingOnly === typedItem.canonicalAnswer,
  "engine weakened the formal grader's strict spacing contract",
);

const directSequence = engine.generateFreshnessSequence("sentence-exam-5", "x1-direct-sequence");
assert.equal(directSequence.length, 5);
const directTargets = new Set();
for (const attempt of directSequence) {
  assertAttempt(engine, attempt, contracts["sentence-exam-5"]);
  assert.equal(attempt.freshnessWindowAttempts, 5);
  assert.equal(attempt.freshnessMaxCanonicalUses, 1);
  for (const target of attempt.targetKeys) {
    assert.equal(directTargets.has(target), false, `freshness target ${target} was reused`);
    directTargets.add(target);
  }
}
assert.equal(directTargets.size, 250);

const history = [];
const historyTargets = new Set();
for (let index = 0; index < 5; index += 1) {
  const before = JSON.stringify(history);
  const attempt = engine.generateAttempt("sentence-exam-1", `x1-history-${index}`, { freshnessHistory: history });
  assert.equal(JSON.stringify(history), before, "engine mutated caller-provided freshness history");
  for (const target of attempt.targetKeys) {
    assert.equal(historyTargets.has(target), false, `rolling freshness target ${target} was reused`);
    historyTargets.add(target);
  }
  history.push(attempt);
}
assert.equal(historyTargets.size, 120);
const sixth = engine.generateAttempt("sentence-exam-1", "x1-history-5", { freshnessHistory: history });
const priorFourTargets = new Set(history.slice(-4).flatMap((attempt) => attempt.targetKeys));
assert.equal(sixth.targetKeys.some((target) => priorFourTargets.has(target)), false, "rolling W=5 window is off by one");
assert.deepEqual(
  new Set(sixth.targetKeys),
  new Set(history[0].targetKeys),
  "the sixth attempt did not deterministically reopen the first cycle partition",
);

const qualifyingFinal = engine.generateAttempt("sentence-exam-5", "x1-qualifying-final");
const retention = engine.generateAttempt("sentence-exam-5", "x1-retention", {
  attemptMode: "retention",
  qualifyingTargetKeys: qualifyingFinal.targetKeys,
});
assertAttempt(engine, retention, contracts["sentence-exam-5:retention"]);
assert.equal(retention.attemptMode, "retention");
assert.equal(retention.baseExamId, "sentence-exam-5");
const qualifyingTargets = new Set(qualifyingFinal.targetKeys);
assert.equal(retention.targetKeys.some((target) => qualifyingTargets.has(target)), false, "retention reused a qualifying-final target");

const entryById = new Map(bank.entries.map((entry) => [entry.id, entry]));
let clozeItem = null;
let controlledItem = null;
for (const seed of ["x1-preservation-a", "x1-preservation-b", "x1-preservation-c"]) {
  const items = engine.generateFreshnessSequence("sentence-exam-5", seed).flatMap((attempt) => attempt.items);
  clozeItem ||= items.find((item) => item.promptEn.includes("Complete this exact Korean lesson frame"));
  controlledItem ||= items.find((item) => item.promptTemplateId === "controlled-clause-transformation");
  if (clozeItem && controlledItem) break;
}
assert.ok(clozeItem, "no exact Korean cloze appeared in preservation fixtures");
assert.ok(controlledItem, "no controlled transformation appeared in preservation fixtures");
for (const item of [clozeItem, controlledItem]) {
  const source = entryById.get(item.sourceEntryId);
  assert.equal(item.canonicalAnswer, source.canonicalAnswer);
  assert.deepEqual(item.manualAlternatives, source.manualAlternatives);
  assert.equal(item.promptEn, source.examPromptEn);
  assert.equal(item.promptTemplateId, source.templateId);
  assert.deepEqual(item.controlledClause, source.controlledClause || null);
  assert.deepEqual(item.eligibilityReauthorization, source.eligibilityReauthorization || null);
}
assert.equal(controlledItem.controlledClause.preserveSourceOrder, true);
assert.equal(controlledItem.controlledClause.preserveParticles, true);
assert.equal(controlledItem.controlledClause.preserveLexicalMaterial, true);

const stage1Capacity = engine.analyzeCapacity("sentence-exam-1");
assert.equal(stage1Capacity.typedDistinctTargets, 100);
assert.equal(stage1Capacity.typedRequiredForWindow, 100);
assert.equal(stage1Capacity.typedMargin, 0);
assert.equal(stage1Capacity.ready, true);

const collisionSandbox = loadRuntime();
const collisionBank = clone(collisionSandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK);
const stage1Scaffold = collisionSandbox.window.HANAPATH_SENTENCE_EXAM_CAPACITY_SCAFFOLDS.exams["sentence-exam-1"];
const scaffoldRecognitionIds = stage1Scaffold.match(/s\d+:(?:R|C)/g).map((value) => value.split(":")[0]);
for (const [index, id] of scaffoldRecognitionIds.entries()) {
  const entry = collisionBank.entries.find((candidate) => candidate.id === id);
  entry.recognitionAnswerEn = index % 2 === 0 ? "Case Collision" : "case collision";
}
collisionSandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK = collisionBank;
const collisionSequence = collisionSandbox.window.HANAPATH_SENTENCE_EXAM_ENGINE.generateFreshnessSequence(
  "sentence-exam-1",
  "x1-recognition-collisions",
);
for (const item of collisionSequence.flatMap((attempt) => attempt.items).filter((entry) => entry.mode === "recognition")) {
  assert.equal(new Set(item.options.map((value) => value.toLocaleLowerCase("en"))).size, 4);
  assert.equal(item.options.filter((value) => value === item.answerContract.recognitionAnswerEn).length, 1);
}

const mismatchSandbox = loadRuntime();
mismatchSandbox.window.HANAPATH_SENTENCE_EXAM_META = Object.freeze({
  ...mismatchSandbox.window.HANAPATH_SENTENCE_EXAM_META,
  contentBankRevision: "wrong-revision",
});
assert.throws(
  () => mismatchSandbox.window.HANAPATH_SENTENCE_EXAM_ENGINE.generateAttempt("sentence-exam-1", "x1-revision-mismatch"),
  (error) => error.code === "SENTENCE_EXAM_POOL_UNAVAILABLE"
    && error.failures.length === 33
    && error.failures.every((failure) => failure.includes("blueprint revision mismatch")),
);

for (const property of ["enabled", "freezeState"]) {
  const unavailableSandbox = loadRuntime();
  const unavailableBank = clone(unavailableSandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK);
  if (property === "enabled") unavailableBank.enabled = false;
  else unavailableBank.freezeState = "draft";
  unavailableSandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK = unavailableBank;
  assert.throws(
    () => unavailableSandbox.window.HANAPATH_SENTENCE_EXAM_ENGINE.generateAttempt("sentence-exam-1", `x1-${property}`),
    (error) => error.code === "SENTENCE_EXAM_POOL_UNAVAILABLE" && error.failures.length === 33,
  );
}

const insufficientSandbox = loadRuntime();
const insufficientBank = clone(insufficientSandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK);
let recognitionIndex = 0;
for (const entry of insufficientBank.entries) {
  if (entry.mode !== "recognition") continue;
  entry.recognitionAnswerEn = ["Only one", "ONLY ONE", "Only two"][recognitionIndex % 3];
  recognitionIndex += 1;
}
insufficientSandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK = insufficientBank;
let firstExhaustion;
for (let repetition = 0; repetition < 2; repetition += 1) {
  assert.throws(
    () => insufficientSandbox.window.HANAPATH_SENTENCE_EXAM_ENGINE.generateAttempt("sentence-exam-1", "x1-exhaustion"),
    (error) => {
      assert.equal(error.code, "SENTENCE_EXAM_POOL_UNAVAILABLE");
      assert.equal(error.failures.length, 33, "fallback must execute seed through seed#32 exactly");
      assert.ok(error.failures[0].startsWith("x1-exhaustion:"));
      assert.ok(error.failures[32].startsWith("x1-exhaustion#32:"));
      if (!firstExhaustion) firstExhaustion = error.failures;
      else assert.deepEqual(error.failures, firstExhaustion, "fallback exhaustion is not deterministic");
      return true;
    },
  );
}

assert.throws(
  () => engine.generateAttempt("sentence-exam-1", "x1-malformed-history", {
    freshnessHistory: [{ baseExamId: "sentence-exam-1", targetKeys: [] }],
  }),
  (error) => error.code === "SENTENCE_EXAM_POOL_UNAVAILABLE"
    && error.failures.length === 33
    && error.failures.every((failure) => failure.includes("history is malformed")),
);

console.log("Sentence exam pure-engine regression passed under the frozen CB6B contract.");
