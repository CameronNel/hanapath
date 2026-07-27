#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { auditCapacityRemediationState } from "./audit-sentence-exam-capacity-remediation.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function readJson(path) {
  return JSON.parse(readFileSync(join(ROOT, path), "utf8"));
}

function loadBank() {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  for (const file of ["sentence_exam_curated_bank.js", "sentence_exam_curated_bank_freeze.js"]) {
    vm.runInContext(readFileSync(join(ROOT, file), "utf8"), sandbox, { filename: file });
  }
  return sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const base = {
  authoring: readJson("docs/generated/sentence_exam_cb6_capacity_authoring.json"),
  reviews: readJson("docs/reviews/sentence_exam_cb6_capacity_reviews.json"),
  witness: readJson("docs/generated/sentence_exam_cb6_capacity_witness.json"),
  inventory: readJson("docs/generated/sentence_exam_inventory.json"),
  bank: loadBank(),
};

const clean = auditCapacityRemediationState(base);
assert.equal(clean.ok, true, clean.failures.join("\n"));
assert.equal(clean.summary.additions, 94);
assert.equal(clean.summary.stage1TypedDistinctTargets, 101);
assert.equal(clean.summary.independentReviewRequired, 94);

const duplicate = clone(base);
duplicate.authoring.entries[1].id = duplicate.authoring.entries[0].id;
assert.equal(auditCapacityRemediationState(duplicate).ok, false);

const staleAnswer = clone(base);
staleAnswer.authoring.entries[0].canonicalAnswer += "!";
assert.equal(auditCapacityRemediationState(staleAnswer).ok, false);

const reused = clone(base);
const exam = reused.witness.exams["sentence-exam-1"];
exam[1][0] = clone(exam[0][0]);
assert.equal(auditCapacityRemediationState(reused).ok, false);

const selfApproved = clone(base);
for (const review of selfApproved.reviews.entries) {
  review.reviewStatus = "approved";
  review.reviewedBy = selfApproved.authoring.authoredBy;
  review.reviewedRevision = selfApproved.authoring.revision;
  review.reviewerNote = "This deliberately invalid self-review note is long enough to reach the substantive length threshold.";
}
assert.equal(auditCapacityRemediationState({ ...selfApproved, requireApproved: true }).ok, false);

const pendingStrict = auditCapacityRemediationState({ ...base, requireApproved: true });
assert.equal(pendingStrict.ok, false);
assert.ok(pendingStrict.failures.some((failure) => failure.includes("independent approval required")));

console.log("CB6 capacity remediation regression passed: clean witness accepted; duplicate, drift, freshness reuse, self-review, and pending strict state rejected.");
