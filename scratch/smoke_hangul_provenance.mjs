import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Set up mock window and state
const dom = {
  window: {
    location: { search: "" },
    localStorage: { getItem: () => null, setItem: () => {} },
    addEventListener: () => {},
    setInterval: () => 1,
    clearInterval: () => {},
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    HANAPATH_SENTENCES: [],
    HANAPATH_SENTENCE_SECTIONS: [],
    HANAPATH_WORD_EXAMS: [],
  }
};

const appCode = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const context = vm.createContext({
  window: dom.window,
  location: dom.window.location,
  localStorage: dom.window.localStorage,
  document: {
    addEventListener: () => {},
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ addEventListener: () => {}, appendChild: () => {}, setAttribute: () => {} }),
  },
  console,
  Date,
  Math,
  JSON,
  Array,
  Object,
  Set,
  Map,
  Number,
  String,
  Boolean,
  RegExp,
  globalThis: dom.window,
});

vm.runInContext(fs.readFileSync(path.join(ROOT, "exam_integrity.js"), "utf8"), context);
vm.runInContext(appCode, context);

// Test 1: Untainted submitHangulExam
vm.runInContext(`
Object.assign(state, {
  onboarded: true,
  alphabetMasteryExam: { version: 2, bestCorrect: 0, mastered: false, attempts: 0 },
  examResults: { version: 1, byAttemptId: {} },
  examIntegrity: { version: 1, taintEvents: [], resultRelations: [], migrationLog: [] },
});

hangulExamAttempt = {
  bank: { timeLimitMinutes: 90 },
  parts: [{ section: { part: 1 }, items: Array(200).fill().map((_, i) => ({ id: "q" + i, type: "mcq", answer: "A" })) }],
  answers: Object.fromEntries(Array(200).fill().map((_, i) => ["q" + i, "A"])),
  verdicts: Object.fromEntries(Array(200).fill().map((_, i) => ["q" + i, true])),
  startedAt: Date.now() - 100000,
  stage: "confirm",
  submitted: false,
  overrideFlags: [],
  overrideEventIds: [],
};

submitHangulExam(false);
`, context);

const state1 = vm.runInContext("state", context);
const untaintedKeys = Object.keys(state1.examResults.byAttemptId);
assert.equal(untaintedKeys.length, 1);
const untaintedRecord = state1.examResults.byAttemptId[untaintedKeys[0]];
console.log("--- Untainted Attempt Trace ---");
console.log("Attempt ID:", untaintedRecord.attemptId);
console.log("Exam ID:", untaintedRecord.examId);
console.log("Status:", untaintedRecord.status);
console.log("Score:", untaintedRecord.scoreSummary);
console.log("Mastered in state:", state1.alphabetMasteryExam.mastered);
console.log("BestCorrect in state:", state1.alphabetMasteryExam.bestCorrect);
assert.equal(untaintedRecord.status, "hanaPath");
assert.equal(state1.alphabetMasteryExam.mastered, true);
assert.equal(state1.alphabetMasteryExam.bestCorrect, 200);

// Test 2: an override active at generation remains attached after the query is cleared.
context.window.location.search = "?__wetest=1";
vm.runInContext(`
Object.assign(state, {
  onboarded: true,
  alphabetMasteryExam: { version: 2, bestCorrect: 0, mastered: false, attempts: 0 },
  examResults: { version: 1, byAttemptId: {} },
  examIntegrity: { version: 1, taintEvents: [], resultRelations: [], migrationLog: [] },
});

hangulExamAttempt = buildHangulExamAttempt({
  id: "hangul-mastery-v2",
  version: 2,
  timeLimitMinutes: 90,
  sections: [{ part: 1, items: Array(200).fill().map((_, i) => ({ id: "q" + i, type: "mcq", answer: "A", options: ["A"] })) }],
});
hangulExamAttempt.answers = Object.fromEntries(Array(200).fill().map((_, i) => ["q" + i, "A"]));
hangulExamAttempt.verdicts = Object.fromEntries(Array(200).fill().map((_, i) => ["q" + i, true]));
hangulExamAttempt.startedAt = Date.now() - 100000;
hangulExamAttempt.stage = "confirm";
window.location.search = "";

submitHangulExam(false);
`, context);

const state2 = vm.runInContext("state", context);
const taintedKeys = Object.keys(state2.examResults.byAttemptId);
assert.equal(taintedKeys.length, 1);
const taintedRecord = state2.examResults.byAttemptId[taintedKeys[0]];
console.log("\n--- Tainted Attempt Trace ---");
console.log("Attempt ID:", taintedRecord.attemptId);
console.log("Exam ID:", taintedRecord.examId);
console.log("Status:", taintedRecord.status);
console.log("Override Flags:", taintedRecord.overrideFlags);
console.log("Override Event IDs:", taintedRecord.overrideEventIds);
console.log("Score:", taintedRecord.scoreSummary);
console.log("Mastered in state:", state2.alphabetMasteryExam.mastered);
console.log("BestCorrect in state:", state2.alphabetMasteryExam.bestCorrect);
assert.equal(taintedRecord.status, "practice");
assert.deepEqual(taintedRecord.overrideFlags, ["__wetest"]);
assert.equal(state2.alphabetMasteryExam.mastered, false);
assert.equal(state2.alphabetMasteryExam.bestCorrect, 0);

console.log("\nSUCCESS: Untainted and tainted submitHangulExam traces verified.");
