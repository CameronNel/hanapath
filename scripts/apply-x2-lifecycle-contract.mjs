#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

function replaceOnce(path, before, after, label) {
  const text = readFileSync(path, "utf8");
  const count = text.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one anchor, found ${count}`);
  writeFileSync(path, text.replace(before, after));
}

replaceOnce(
  "sentence_exam_runner_core.js",
  `    return {
      generationId: stringOrNull(entry.generationId) || \`\${examId}:\${resolvedSeed}\`,
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
    };`,
  `    const lifecycleStatus = ["active", "submitted", "timed-out", "discarded"].includes(entry.status)
      ? entry.status
      : entry.discarded === true
        ? "discarded"
        : stringOrNull(entry.submittedAttemptId)
          ? "submitted"
          : "active";
    const integrityStatus = entry.integrityStatus === "practice" || entry.status === "practice"
      ? "practice"
      : "hanaPath";
    return {
      generationId: stringOrNull(entry.generationId) || \`\${examId}:\${resolvedSeed}\`,
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
      status: lifecycleStatus,
      integrityStatus,
      targetKeys,
      canonicalTargetKeys: targetKeys.slice(),
      freshnessCycleSeed: stringOrNull(entry.freshnessCycleSeed),
      freshnessCycleIndex: integer(entry.freshnessCycleIndex),
      discarded: lifecycleStatus === "discarded" || entry.discarded === true,
      submittedAttemptId: stringOrNull(entry.submittedAttemptId),
    };`,
  "generation lifecycle normalization",
);

replaceOnce(
  "sentence_exam_runner_core.js",
  `  function makeGenerationEntry(attempt, options = {}) {
    const generatedAt = finite(options.generatedAt, Date.now());
    const status = options.status === "practice" ? "practice" : "hanaPath";
    return normalizeGenerationEntry({`,
  `  function makeGenerationEntry(attempt, options = {}) {
    const generatedAt = finite(options.generatedAt, Date.now());
    const integrityStatus = options.status === "practice" ? "practice" : "hanaPath";
    return normalizeGenerationEntry({`,
  "generation integrity status local",
);
replaceOnce(
  "sentence_exam_runner_core.js",
  `      generatedAt,
      status,
      targetKeys: attempt.targetKeys || attempt.canonicalTargetKeys,`,
  `      generatedAt,
      status: "active",
      integrityStatus,
      targetKeys: attempt.targetKeys || attempt.canonicalTargetKeys,`,
  "generation starts active",
);
replaceOnce(
  "sentence_exam_runner_core.js",
  `  function markGenerationSubmitted(sentenceExams, key, generationId, attemptId) {
    const history = sentenceExams && sentenceExams.generationHistory && sentenceExams.generationHistory[key];
    const entry = Array.isArray(history) ? history.find((item) => item.generationId === generationId) : null;
    if (!entry || entry.submittedAttemptId) return false;
    entry.submittedAttemptId = attemptId;
    entry.discarded = false;
    return true;
  }`,
  `  function markGenerationSubmitted(sentenceExams, key, generationId, attemptId, lifecycleStatus = "submitted") {
    const history = sentenceExams && sentenceExams.generationHistory && sentenceExams.generationHistory[key];
    const entry = Array.isArray(history) ? history.find((item) => item.generationId === generationId) : null;
    if (!entry || entry.submittedAttemptId || entry.status === "discarded") return false;
    if (lifecycleStatus !== "submitted" && lifecycleStatus !== "timed-out") return false;
    entry.submittedAttemptId = attemptId;
    entry.status = lifecycleStatus;
    entry.discarded = false;
    return true;
  }`,
  "submitted lifecycle",
);
replaceOnce(
  "sentence_exam_runner_core.js",
  `    if (!entry || entry.submittedAttemptId) return false;
    entry.discarded = true;
    return true;
  }`,
  `    if (!entry || entry.submittedAttemptId) return false;
    entry.status = "discarded";
    entry.discarded = true;
    return true;
  }`,
  "discard lifecycle",
);

replaceOnce(
  "sentence_exam_runner.js",
  `      && qualifier.status === "hanaPath"
      && qualifier.legacyProvenanceStatus == null
      && qualifier.examId === exam.id
      && qualifier.blueprintVersion === getMeta().blueprintVersion
      && qualifier.contentBankRevision === getMeta().contentBankRevision`,
  `      && qualifier.status === "hanaPath"
      && qualifier.legacyProvenanceStatus == null
      && qualifier.examId === exam.id
      && qualifier.attemptMode === "achievement"
      && qualifier.blueprintVersion === getMeta().blueprintVersion
      && qualifier.engineVersion === getMeta().engineVersion
      && qualifier.contentBankRevision === getMeta().contentBankRevision
      && qualifier.eligibilityRevision === ELIGIBILITY_REVISION`,
  "retention qualifier provenance",
);
replaceOnce(
  "sentence_exam_runner.js",
  `    core.markGenerationSubmitted(state.sentenceExams, attempt.generationKey, attempt.generationId, attemptId);`,
  `    core.markGenerationSubmitted(state.sentenceExams, attempt.generationKey, attempt.generationId, attemptId, auto ? "timed-out" : "submitted");`,
  "submit lifecycle call",
);
replaceOnce(
  "sentence_exam_runner.js",
  `      <div class="word-exam-macro-profile"><div class="word-exam-weak-title">Two-section bands</div>\${bandProfileHtml(bands)}</div>
      \${patternProfileHtml(attempt, graded)}`,
  `      <div class="word-exam-macro-profile"><div class="word-exam-weak-title">Two-section bands</div>\${bandProfileHtml(bands)}</div>
      <div class="word-exam-macro-profile"><div class="word-exam-weak-title">Item-mode timing summary</div>
        <div class="word-exam-macro-row"><span class="word-exam-macro-name">Typed production</span><span class="word-exam-macro-score">\${resultRecord.timingSummary.typed.items ? formatClock(resultRecord.timingSummary.typed.meanActiveVisibleMs) + " mean active" : "Not recorded"}</span></div>
        <div class="word-exam-macro-row"><span class="word-exam-macro-name">Selected response</span><span class="word-exam-macro-score">\${resultRecord.timingSummary.selected.items ? formatClock(resultRecord.timingSummary.selected.meanActiveVisibleMs) + " mean active" : "Not recorded"}</span></div>
      </div>
      \${patternProfileHtml(attempt, graded)}`,
  "result timing summary",
);

replaceOnce(
  "scripts/test-sentence-exam-runner.mjs",
  `const historyEntry = core.makeGenerationEntry(historyAttempt, { generatedAt: 10, status: "hanaPath", eligibilityRevision: "elig-v1" });
core.appendGenerationEntry(state, stage.id, historyEntry);
assert.equal(state.generationHistory[stage.id].length, 1);
assert.equal(core.markGenerationDiscarded(state, stage.id, historyEntry.generationId), true);
assert.equal(state.generationHistory[stage.id][0].discarded, true);
const engineHistory = core.generationHistoryForEngine(state, stage.id);
assert.deepEqual(engineHistory[0].targetKeys, ["a", "b"]);
assert.equal(engineHistory[0].freshnessCycleIndex, 0);
assert.equal(core.markGenerationSubmitted(state, stage.id, historyEntry.generationId, "attempt-1"), true);
assert.equal(state.generationHistory[stage.id][0].submittedAttemptId, "attempt-1");`,
  `const historyEntry = core.makeGenerationEntry(historyAttempt, { generatedAt: 10, status: "hanaPath", eligibilityRevision: "elig-v1" });
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
assert.equal(state.generationHistory[stage.id][2].status, "timed-out");`,
  "runner lifecycle regression",
);

replaceOnce(
  "tests/fixtures/sentence_exam_runner.html",
  `          assert(saved.generationHistory["sentence-exam-1"][0].submittedAttemptId, "generation history not linked to result");`,
  `          assert(saved.generationHistory["sentence-exam-1"][0].submittedAttemptId, "generation history not linked to result");
          assert(saved.generationHistory["sentence-exam-1"][0].status === "submitted", "submitted lifecycle status missing");
          assert(saved.generationHistory["sentence-exam-1"][0].integrityStatus === "practice", "Practice generation integrity status missing");`,
  "browser submitted lifecycle",
);
replaceOnce(
  "tests/fixtures/sentence_exam_runner.html",
  `          assert(hook.state().generationHistory["sentence-exam-1"][1].discarded === true, "discarded form was not marked");`,
  `          assert(hook.state().generationHistory["sentence-exam-1"][1].discarded === true, "discarded form was not marked");
          assert(hook.state().generationHistory["sentence-exam-1"][1].status === "discarded", "discard lifecycle status missing");`,
  "browser discarded lifecycle",
);

replaceOnce(
  "scripts/audit-sentence-exam-runner.mjs",
  `const runner = readFileSync(join(ROOT, "sentence_exam_runner.js"), "utf8");
const css = readFileSync(join(ROOT, "sentence_exam_runner.css"), "utf8");`,
  `const runner = readFileSync(join(ROOT, "sentence_exam_runner.js"), "utf8");
const runnerCore = readFileSync(join(ROOT, "sentence_exam_runner_core.js"), "utf8");
const css = readFileSync(join(ROOT, "sentence_exam_runner.css"), "utf8");`,
  "audit runner core source",
);
replaceOnce(
  "scripts/audit-sentence-exam-runner.mjs",
  `check(runner.includes("markGenerationDiscarded") && runner.includes("generationHistory"), "quit/discard freshness preservation is missing");
check(runner.includes("timedOut") && runner.includes("submitSentenceExam(true)"), "timeout submission is missing");`,
  `check(runner.includes("markGenerationDiscarded") && runner.includes("generationHistory"), "quit/discard freshness preservation is missing");
check(runnerCore.includes('status: "active"') && runnerCore.includes('entry.status = "discarded"'), "generation lifecycle active/discarded states are missing");
check(runnerCore.includes('lifecycleStatus !== "submitted" && lifecycleStatus !== "timed-out"'), "generation submitted/timed-out states are missing");
check(runner.includes('auto ? "timed-out" : "submitted"'), "timeout does not persist a timed-out lifecycle status");
check(runner.includes('qualifier.attemptMode === "achievement"') && runner.includes("qualifier.engineVersion === getMeta().engineVersion") && runner.includes("qualifier.eligibilityRevision === ELIGIBILITY_REVISION"), "retention qualifier provenance compatibility is incomplete");
check(runner.includes("Item-mode timing summary") && runner.includes("meanActiveVisibleMs"), "result item-mode timing summary is missing");
check(runner.includes("timedOut") && runner.includes("submitSentenceExam(true)"), "timeout submission is missing");`,
  "audit lifecycle qualifier timing",
);

console.log("Applied X2 generation lifecycle, qualifier, and timing contracts.");
