#!/usr/bin/env node
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const core = require(join(ROOT, "sentence_exam_runner_core.js"));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

const index = readFileSync(join(ROOT, "index.html"), "utf8");
const sw = readFileSync(join(ROOT, "sw.js"), "utf8");
const runner = readFileSync(join(ROOT, "sentence_exam_runner.js"), "utf8");
const runnerCore = readFileSync(join(ROOT, "sentence_exam_runner_core.js"), "utf8");
const css = readFileSync(join(ROOT, "sentence_exam_runner.css"), "utf8");
const integrity = readFileSync(join(ROOT, "exam_integrity.js"), "utf8");

const sandbox = { window: {} };
sandbox.globalThis = sandbox.window;
vm.createContext(sandbox);
for (const file of ["sentence_exam_blueprints.js", "sentence_exam_runner_core.js"]) {
  vm.runInContext(readFileSync(join(ROOT, file), "utf8"), sandbox, { filename: file });
}
const exams = sandbox.window.HANAPATH_SENTENCE_EXAMS;
const meta = sandbox.window.HANAPATH_SENTENCE_EXAM_META;

check(Array.isArray(exams) && exams.length === 5, "exactly five achievement cards/blueprints are required");
check(exams?.slice(0, 4).every((exam) => exam.itemCount === 24 && exam.timeLimitMinutes === 40), "stage contracts must remain 24 items / 40 minutes");
check(exams?.[4]?.itemCount === 50 && exams?.[4]?.timeLimitMinutes === 75, "final contract must remain 50 items / 75 minutes");
check(exams?.[4]?.retention?.itemCount === 25 && exams?.[4]?.retention?.timeLimitMinutes === 40, "retention contract must remain 25 items / 40 minutes");
check(meta?.runnerVersion === 1, "runner metadata marker must be version 1");
check(meta?.retention === true, "runner metadata must declare delayed retention shipped");

const expectedAssets = [
  "./sentence_exam_runner.css?v=20260729b",
  "./sentence_exam_prompt_templates.js?v=20260729a",
  "./sentence_exam_curated_bank.js?v=20260729a",
  "./sentence_exam_curated_bank_freeze.js?v=20260729a",
  "./sentence_exam_grader.js?v=20260729a",
  "./sentence_exam_blueprints.js?v=20260729a",
  "./sentence_exam_engine.js?v=20260729a",
  "./sentence_exam_runner_core.js?v=20260729c",
  "./sentence_exam_runner.js?v=20260810c",
];
for (const asset of expectedAssets) {
  check(index.includes(asset), `index.html is missing ${asset}`);
  check(sw.includes(asset), `sw.js is missing ${asset}`);
}
const orderedScripts = [
  "sentence_exam_prompt_templates.js",
  "sentence_exam_curated_bank.js",
  "sentence_exam_curated_bank_freeze.js",
  "sentence_exam_grader.js",
  "sentence_exam_blueprints.js",
  "sentence_exam_engine.js",
  "sentence_exam_runner_core.js",
  "app.js",
  "sentence_exam_runner.js",
];
let previous = -1;
for (const file of orderedScripts) {
  const at = index.indexOf(`src="./${file}`);
  check(at > previous, `index.html load order is wrong at ${file}`);
  previous = at;
}
check(/const CACHE_NAME = "hanapath-shell-v460";/.test(sw), "Sentence exam runner must use the synchronized service-worker cache at v460");
check(runner.includes("No correctness, hints, accepted variants, answer reveals, or lesson helpers"), "pre-submit no-helper disclosure is missing");
check(!runner.includes("scoreSentenceExamResponse("), "runner must delegate grading through the X1 engine, not call the grader directly");
check(runner.includes("engine.gradeAttempt("), "runner does not delegate scoring to the X1 engine");
check(runner.includes("freshnessHistory"), "achievement generation does not pass persistent freshness history");
check(runner.includes("qualifyingTargetKeys"), "retention generation does not exclude qualifier targets");
check(runner.includes("compositionstart") && runner.includes("compositionend"), "Korean IME composition instrumentation is missing");
check(runner.includes("visibilitychange") && runner.includes("activeVisibleMs"), "hidden-tab response-time instrumentation is missing");
for (const field of [
  "firstShownAt", "lastShownAt", "answerFirstChangedAt", "answerLastChangedAt", "submittedAt",
  "activeVisibleMs", "visitCount", "answerChangeCount", "answerLength", "wasBlank", "timedOut",
  "deviceClass", "viewportBucket", "inputMethod",
]) check(runner.includes(field), `response-time field ${field} is missing`);
check(runner.includes("core.DISCLOSURE"), "exact Sentence disclosure copy is not rendered");
check(core.MASTERY_LINE === "You demonstrated and retained the taught HanaPath sentence patterns in this device-local assessment.", "mastery card copy drifted");
check(integrity.includes("practice") && integrity.includes("hanaPath"), "generic Workstream 0 integrity status API is unavailable");
check(runner.includes("writeExamResultRecord") && runner.includes("appendExamResultRelation"), "immutable result provenance/relation integration is missing");
check(runner.includes("markGenerationDiscarded") && runner.includes("generationHistory"), "quit/discard freshness preservation is missing");
check(runnerCore.includes('status: "active"') && runnerCore.includes('entry.status = "discarded"'), "generation lifecycle active/discarded states are missing");
check(runnerCore.includes('lifecycleStatus !== "submitted" && lifecycleStatus !== "timed-out"'), "generation submitted/timed-out states are missing");
check(runner.includes('auto ? "timed-out" : "submitted"'), "timeout does not persist a timed-out lifecycle status");
check(runner.includes("resultProvenanceIsValid(exam, \"achievement\", qualifier, generation)") && runner.includes("result.attemptMode === mode") && runner.includes("result.engineVersion === meta.engineVersion") && runner.includes("result.eligibilityRevision === ELIGIBILITY_REVISION"), "retention qualifier provenance compatibility is incomplete");
check(runner.includes("qualifier.floorSummary?.details?.masteryQualified === true"), "retention qualifier does not prove the mastery-qualification floor");
check(runner.includes("entry.submittedAttemptId === result?.attemptId && entry.generationId === result?.generationId"), "retention qualifier is not linked to its exact generated form");
check(runner.includes("targetKeysMatch") && runner.includes('generation.integrityStatus === "hanaPath"'), "retention qualifier target set or generation integrity linkage is incomplete");
check(runner.includes("resultChecksumIsValid(result)") && runner.includes("integrity.fingerprint({ ...result, checksum: null }) === result.checksum"), "retention provenance does not verify the stored result checksum");
check(runner.includes("masteryIsValid(exam, record)") && runner.includes("retention.submittedAt === record.masteryEarnedAt") && runner.includes("relationExists"), "Sentence Mastery does not fail closed on compatible retention evidence");
check(runnerCore.includes('reason: "mastery-provenance"') && runnerCore.includes("evidence.masteryIsValid === true") && runnerCore.includes("qualifyingAttemptId && retentionAttemptId"), "timestamp-only Sentence Mastery records are not rejected");
check(runner.includes("core.snapshotSubmissionState(state") && runner.includes("core.restoreSubmissionState(state, submissionSnapshot)") && runnerCore.includes("resultRelations"), "submission persistence rollback is not transactionally complete");
check(runner.includes('sub: "Four cumulative stages, a mastery final, and delayed retention"'), "Sentence Mastery hub subtitle does not use the shared hub sub field");
check(runnerCore.includes("const preserveWindow = context.replaceQualificationWindow !== true") && runnerCore.includes('currentWindow.phase === "waiting" || currentWindow.phase === "open"'), "a new qualifying final does not preserve an existing live retention window");
check(runner.includes('if (phase.phase !== "open")') && runner.includes('retentionPhase(attempt.exam, submittedAt).phase !== "open"') && runner.includes('"retention-window-not-open"'), "retention does not recheck its live window at start and submission");
check(runner.includes('showTab("practice")') && runner.indexOf('showTab("practice")') < runner.indexOf("openSentenceLesson(button.dataset.sentenceWeakRoute)"), "weak-area remediation does not reveal the Sentence surface before opening the lesson");
check(css.includes(".sentence-exam-completion.completion-stage--crown #sentenceExamRetake") && css.includes("display: none;"), "mastered retention results still expose the unsupported retake action");
check(runner.includes('return { phase: "incompatible" }') && runner.includes("Exam version changed · qualify again with a new final"), "incompatible retention qualification is not surfaced before the learner starts");
check((runner.match(/Retention requires a compatible HanaPath qualifying final/g) || []).length >= 2, "retention must fail closed at both intro and generation when qualifier provenance is incompatible");
check(runner.includes("engineVersion: attempt.generated.engineVersion,"), "result provenance must store the numeric X1 engine version used by retention compatibility checks");
check(!runner.includes("engineVersion: attempt.generated.engineRevision || attempt.generated.engineVersion"), "result provenance must not substitute the human-readable engine revision for engineVersion");
check(runner.includes("Item-mode timing summary") && runner.includes("meanActiveVisibleMs"), "result item-mode timing summary is missing");
check(runner.includes("timedOut") && runner.includes("submitSentenceExam(true)"), "timeout submission is missing");
check(runner.includes("openSentenceLesson"), "weak-area routes do not resolve exact Sentence lessons");
check(css.includes("@media (max-width: 600px)"), "phone-width runner styling is missing");

assert.equal(core.subscoreEvidence(4, 4).pct, null);
assert.equal(core.subscoreEvidence(4, 5).pct, null);
assert.equal(core.subscoreEvidence(6, 7).pct, null);
assert.equal(core.subscoreEvidence(7, 8).pct, 87.5);
assert.equal(core.subscoreEvidence(8, 9).pct, 88.9);
assert.equal(core.subscoreEvidence(9, 10).floorEligible, true);

console.log("Sentence exam X2 runner audit");
console.log("=============================");
console.log(`Blueprint cards: ${Array.isArray(exams) ? exams.length : 0}`);
console.log(`Runner version: ${meta?.runnerVersion ?? "missing"}`);
console.log(`Retention marker: ${meta?.retention === true ? "yes" : "no"}`);
console.log(`Errors: ${errors.length}`);
for (const error of errors) console.log(`  ERROR ${error}`);
if (errors.length) process.exit(1);
console.log("Sentence exam X2 runner audit passed.");
