#!/usr/bin/env node
// Regression cover for the exam compute freeze — the one sanctioned way a
// core-gate step may be skipped. The freeze trades ~20 minutes of pull-request
// CI for a hash comparison, so its failure mode matters more than its success
// one: every ambiguous case must resolve to "run the sweep".
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { AUDITS, MANIFEST_PATH, checkFreeze, diffPinnedInputs } from "./exam-compute-freeze.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

assert.ok(existsSync(MANIFEST_PATH), "exam compute freeze manifest is missing; run --write");
const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
assert.equal(manifest.schemaVersion, 1);

// ── Fail-closed behaviour ───────────────────────────────────────────────────
// Anything the freeze does not positively recognise must report not-frozen.
const unknown = checkFreeze("no-such-audit");
assert.equal(unknown.frozen, false, "an unpinned key must never report frozen");

assert.deepEqual(diffPinnedInputs({ "a.js": "hash" }, () => "hash"), [], "matching hashes are unchanged");
assert.deepEqual(diffPinnedInputs({ "a.js": "hash" }, () => "other"), ["a.js"], "a differing hash must be reported");
assert.deepEqual(diffPinnedInputs({ "a.js": "hash" }, () => null), ["a.js (missing)"], "a deleted input must be reported");
assert.deepEqual(
  diffPinnedInputs({ "a.js": "h1", "b.js": "h2" }, (rel) => (rel === "a.js" ? "h1" : "changed")),
  ["b.js"],
  "only the changed input is reported",
);

// ── Pinned surface ──────────────────────────────────────────────────────────
for (const audit of AUDITS) {
  const entry = manifest.audits?.[audit.key];
  assert.ok(entry, `${audit.key} is not pinned`);
  const inputs = Object.keys(entry.inputs);
  assert.ok(inputs.length > 0, `${audit.key} pinned an empty input set`);

  // Editing the audit must un-freeze it, or an audit could be weakened and
  // then skipped on every pull request.
  assert.ok(inputs.includes(audit.script), `${audit.key} must pin its own audit script`);

  for (const rel of inputs) {
    assert.ok(existsSync(join(ROOT, rel)), `${audit.key} pins a file that no longer exists: ${rel}`);
  }

  // Presentation is never an input to a seed sweep. This is the property that
  // lets styling work skip both sweeps, so it is asserted rather than assumed.
  const presentation = inputs.filter((rel) => /\.(css|html|webmanifest)$/.test(rel));
  assert.deepEqual(presentation, [], `${audit.key} must not pin presentation files: ${presentation.join(", ")}`);
}

// The sweeps' actual compute inputs, pinned so a refactor cannot quietly drop
// one and leave the sweep frozen against a stale surface.
for (const [key, required] of [
  ["sentence-exams", [
    "sentence_exam_blueprints.js",
    "sentence_exam_curated_bank.js",
    "sentence_exam_curated_bank_freeze.js",
    "sentence_exam_engine.js",
    "sentence_exam_grader.js",
    "sentences_lesson_plan.js",
  ]],
  ["word-exams", [
    "word_exam_blueprints.js",
    "word_exam_engine.js",
    "words_curated_core.js",
    "words_inflect.js",
    "words_lesson_plan.js",
    // audit-word-exams.mjs executes app.js to check production-bridge
    // readiness, so app.js is a genuine input. This is why word-exams still
    // runs on most app.js pull requests while sentence-exams freezes.
    "app.js",
  ]],
]) {
  const inputs = Object.keys(manifest.audits[key].inputs);
  for (const rel of required) {
    assert.ok(inputs.includes(rel), `${key} must pin ${rel}`);
  }
}

assert.ok(
  !Object.keys(manifest.audits["sentence-exams"].inputs).includes("app.js"),
  "sentence-exams does not read app.js; pinning it would needlessly unfreeze the 12-minute sweep",
);

console.log(
  `Exam compute freeze regression passed (${AUDITS.length} sweeps pinned, `
  + `${Object.values(manifest.audits).reduce((n, a) => n + Object.keys(a.inputs).length, 0)} inputs, fail-closed).`,
);
