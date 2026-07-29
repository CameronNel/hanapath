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
  `      engineVersion: attempt.generated.engineRevision || attempt.generated.engineVersion,`,
  `      engineVersion: attempt.generated.engineVersion,`,
  "result engine version provenance",
);
replaceOnce(
  "scripts/audit-sentence-exam-runner.mjs",
  `check(runner.includes('qualifier.attemptMode === "achievement"') && runner.includes("qualifier.engineVersion === getMeta().engineVersion") && runner.includes("qualifier.eligibilityRevision === ELIGIBILITY_REVISION"), "retention qualifier provenance compatibility is incomplete");`,
  `check(runner.includes('qualifier.attemptMode === "achievement"') && runner.includes("qualifier.engineVersion === getMeta().engineVersion") && runner.includes("qualifier.eligibilityRevision === ELIGIBILITY_REVISION"), "retention qualifier provenance compatibility is incomplete");
check(runner.includes("engineVersion: attempt.generated.engineVersion,"), "result provenance must store the numeric X1 engine version used by retention compatibility checks");
check(!runner.includes("engineVersion: attempt.generated.engineRevision || attempt.generated.engineVersion"), "result provenance must not substitute the human-readable engine revision for engineVersion");`,
  "audit engine provenance",
);

console.log("Aligned Sentence result engineVersion with retention provenance compatibility.");
