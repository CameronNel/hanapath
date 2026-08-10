#!/usr/bin/env node
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GATE_STEPS } from "./audit-core-release.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ids = new Set(GATE_STEPS.map((step) => step.id));

assert.equal(ids.size, GATE_STEPS.length, "core gate step IDs must be unique");
assert.ok(GATE_STEPS.length >= 55, "Q2 full gate must retain the complete release matrix");

// Q2 forbids path-conditional and pending steps outright. Content freezing is
// the one sanctioned exception and it is deliberately narrower: it is opt-in
// per run, limited to the two pure seed sweeps, keyed on input hashes rather
// than paths, and withheld on push:main. Everything below pins those limits so
// the exception cannot quietly widen into a general skip mechanism.
const FREEZABLE_STEPS = new Set(["sentence-exams", "word-exams"]);

for (const step of GATE_STEPS) {
  assert.equal("requiresPath" in step, false, `${step.id} must not be conditional`);
  assert.equal("pending" in step, false, `${step.id} must not carry a pending/skip state`);
  if ("freezeKey" in step) {
    assert.ok(
      FREEZABLE_STEPS.has(step.id),
      `${step.id} must not be freezable: only the pure exam seed sweeps may be content-frozen`,
    );
    assert.equal(step.freezeKey, step.id, `${step.id} freezeKey must match its step id`);
  }
  if (step.script) {
    assert.ok(existsSync(join(ROOT, step.script)), `${step.id} script is missing: ${step.script}`);
  } else {
    assert.ok(step.internal, `${step.id} must name a script or internal runner`);
  }
}

for (const required of [
  "sentence-exams",
  "sentence-exam-runner-audit",
  "sentence-exam-runner-regression",
  "sentence-exam-runner-browser",
  "mobile-package",
  "status-freshness",
]) {
  assert.ok(ids.has(required), `release-critical step is missing: ${required}`);
}

const eligibility = GATE_STEPS.find((step) => step.id === "sentence-eligibility");
assert.deepEqual(eligibility.fullArgs, ["--protect-historical-evidence"]);
assert.equal(
  GATE_STEPS.some((step) => [...(step.fullArgs || []), ...(step.quickArgs || [])].includes("--allow-incomplete")),
  false,
  "release gate must not use the permissive eligibility mode"
);

for (const id of FREEZABLE_STEPS) {
  const step = GATE_STEPS.find((candidate) => candidate.id === id);
  assert.ok(step, `freezable step ${id} is missing from the gate`);
  assert.equal(step.freezeKey, id, `${id} must carry its freezeKey to be skippable at all`);
}

// Freezing must be inert unless explicitly requested, and every freezable step
// must actually be pinned — an unpinned key reports not-frozen and runs, but a
// silently absent manifest should fail here rather than in six months.
const gateSource = readFileSync(join(ROOT, "scripts", "audit-core-release.mjs"), "utf8");
assert.match(gateSource, /const RESPECT_FREEZE = args\.includes\("--respect-freeze"\)/);
assert.match(gateSource, /if \(RESPECT_FREEZE && step\.freezeKey\)/);
assert.match(gateSource, /state: "frozen"/, "a frozen step must be recorded as frozen, never as passed");

const manifestPath = join(ROOT, "docs", "generated", "exam_compute_freeze.json");
assert.ok(existsSync(manifestPath), "exam compute freeze manifest is missing");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
for (const id of FREEZABLE_STEPS) {
  const entry = manifest.audits?.[id];
  assert.ok(entry?.inputs && Object.keys(entry.inputs).length > 0, `${id} has no pinned inputs`);
  assert.ok(
    Object.keys(entry.inputs).includes(entry.script),
    `${id} must pin its own audit script, or edits to the audit would not re-run it`,
  );
}

const workflow = readFileSync(join(ROOT, ".github", "workflows", "ci.yml"), "utf8");
assert.match(workflow, /node mobile\/scripts\/prepare-web\.mjs/);
assert.match(workflow, /node scripts\/audit-core-release\.mjs --full/);
assert.doesNotMatch(workflow, /--allow-incomplete|continue-on-error/);
// The freeze may shorten pull requests. It must never shorten main or a
// release, so the branch-push job has to run the gate without it.
assert.match(
  workflow,
  /github\.event_name == 'pull_request'/,
  "ci.yml must distinguish pull-request runs from push runs to scope the freeze",
);
const pushGateLines = workflow
  .split("\n")
  .filter((line) => line.includes("audit-core-release.mjs --full") && !line.includes("--respect-freeze"));
assert.ok(pushGateLines.length > 0, "push:main must run the full gate without --respect-freeze");

console.log(
  `Q2 strict-gate wiring regression passed (${GATE_STEPS.length} blocking steps, `
  + `${FREEZABLE_STEPS.size} content-freezable on pull requests only, zero path-conditional).`,
);
