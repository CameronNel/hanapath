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

for (const step of GATE_STEPS) {
  assert.equal("requiresPath" in step, false, `${step.id} must not be conditional`);
  assert.equal("pending" in step, false, `${step.id} must not carry a pending/skip state`);
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

const workflow = readFileSync(join(ROOT, ".github", "workflows", "ci.yml"), "utf8");
assert.match(workflow, /node mobile\/scripts\/prepare-web\.mjs/);
assert.match(workflow, /node scripts\/audit-core-release\.mjs --full/);
assert.doesNotMatch(workflow, /--allow-incomplete|continue-on-error/);

console.log(`Q2 strict-gate wiring regression passed (${GATE_STEPS.length} blocking steps, zero conditional).`);
