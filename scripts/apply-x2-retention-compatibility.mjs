#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";

function replaceOnce(path, before, after, label) {
  const text = readFileSync(path, "utf8");
  const count = text.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one anchor, found ${count}`);
  writeFileSync(path, text.replace(before, after));
}

replaceOnce(
  "sentence_exam_runner.js",
  `  function retentionPhase(exam) {
    return core.retentionStatus(getRecord(exam.id), exam, now());
  }`,
  `  function retentionPhase(exam) {
    const record = getRecord(exam.id);
    const phase = core.retentionStatus(record, exam, now());
    if ((phase.phase === "waiting" || phase.phase === "open") && !qualifierIsValid(exam, record)) {
      return { phase: "incompatible" };
    }
    return phase;
  }`,
  "retention phase compatibility",
);
replaceOnce(
  "sentence_exam_runner.js",
  `      } else if (retention?.phase === "expired") {
        badge = \`<div class="sentence-exam-badge is-expired">Retention window expired · qualify again with a new final</div>\`;
      } else if (status) {`,
  `      } else if (retention?.phase === "expired") {
        badge = \`<div class="sentence-exam-badge is-expired">Retention window expired · qualify again with a new final</div>\`;
      } else if (retention?.phase === "incompatible") {
        badge = \`<div class="sentence-exam-badge is-expired">Exam version changed · qualify again with a new final</div>\`;
      } else if (status) {`,
  "hub incompatible qualifier badge",
);
replaceOnce(
  "sentence_exam_runner.js",
  `    if (mode === "retention" && retention?.phase !== "open") return renderSentenceExamHub();`,
  `    if (mode === "retention" && retention?.phase !== "open") return renderSentenceExamHub();
    if (mode === "retention" && !qualifierIsValid(exam, record)) {
      return renderSentenceExamUnavailable(exam, new Error("Retention requires a compatible HanaPath qualifying final from this exact blueprint, engine, bank, and eligibility revision. Complete a new final to qualify again."));
    }`,
  "retention intro compatibility guard",
);
replaceOnce(
  "sentence_exam_runner.js",
  `    const record = getRecord(exam.id);
    const useSeed = seed == null ? randomSeed() : String(seed);`,
  `    const record = getRecord(exam.id);
    if (mode === "retention" && !qualifierIsValid(exam, record)) {
      return renderSentenceExamUnavailable(exam, new Error("Retention requires a compatible HanaPath qualifying final from this exact blueprint, engine, bank, and eligibility revision. Complete a new final to qualify again."));
    }
    const useSeed = seed == null ? randomSeed() : String(seed);`,
  "retention start compatibility guard",
);
replaceOnce(
  "scripts/audit-sentence-exam-runner.mjs",
  `check(runner.includes('qualifier.attemptMode === "achievement"') && runner.includes("qualifier.engineVersion === getMeta().engineVersion") && runner.includes("qualifier.eligibilityRevision === ELIGIBILITY_REVISION"), "retention qualifier provenance compatibility is incomplete");`,
  `check(runner.includes('qualifier.attemptMode === "achievement"') && runner.includes("qualifier.engineVersion === getMeta().engineVersion") && runner.includes("qualifier.eligibilityRevision === ELIGIBILITY_REVISION"), "retention qualifier provenance compatibility is incomplete");
check(runner.includes('return { phase: "incompatible" }') && runner.includes("Exam version changed · qualify again with a new final"), "incompatible retention qualification is not surfaced before the learner starts");
check((runner.match(/mode === "retention" && !qualifierIsValid\(exam, record\)/g) || []).length >= 2, "retention must fail closed at both intro and generation when qualifier provenance is incompatible");`,
  "audit pre-start retention compatibility",
);

console.log("Applied fail-closed retention qualifier compatibility guards.");
