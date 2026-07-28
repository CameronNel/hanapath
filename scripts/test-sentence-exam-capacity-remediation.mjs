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

// 1. Valid exact assignment passes
const clean = auditCapacityRemediationState(base);
assert.equal(clean.ok, true, clean.failures.join("\n"));
assert.equal(clean.summary.additions, 94);
assert.ok(clean.summary.stage1TypedDistinctTargets >= 100);
assert.equal(clean.summary.independentReviewRequired, 94);

// 2. Duplicate authoring item fails
const duplicate = clone(base);
duplicate.authoring.entries[1].id = duplicate.authoring.entries[0].id;
assert.equal(auditCapacityRemediationState(duplicate).ok, false);

// 3. Stale canonical answer fails
const staleAnswer = clone(base);
staleAnswer.authoring.entries[0].canonicalAnswer += "!";
assert.equal(auditCapacityRemediationState(staleAnswer).ok, false);

// 4. Freshness reuse fails
const reused = clone(base);
const exam1 = reused.witness.exams["sentence-exam-1"];
exam1[1][0] = clone(exam1[0][0]);
assert.equal(auditCapacityRemediationState(reused).ok, false);

// 5. Wrong strand fails
const wrongStrand = clone(base);
const exam1Strand = wrongStrand.witness.exams["sentence-exam-1"];
const pItem = exam1Strand[0].find((item) => item.strand === "P");
pItem.strand = "C"; // C is invalid for typed P item in sentence-exam-1
assert.equal(auditCapacityRemediationState(wrongStrand).ok, false);

// 6. Out-of-scope item fails
const outOfScope = clone(base);
const exam1Scope = outOfScope.witness.exams["sentence-exam-1"];
exam1Scope[0][0].id = "s3714"; // Section 8 authoring item in sentence-exam-1 (scope <= 2)
assert.equal(auditCapacityRemediationState(outOfScope).ok, false);

// 7. Unknown item fails
const unknownItem = clone(base);
const exam1Unknown = unknownItem.witness.exams["sentence-exam-1"];
exam1Unknown[0][0].id = "non-existent-id-99999";
assert.equal(auditCapacityRemediationState(unknownItem).ok, false);

// 8. Self-approval fails
const selfApproved = clone(base);
for (const review of selfApproved.reviews.entries) {
  review.reviewStatus = "approved";
  review.reviewedBy = selfApproved.authoring.authoredBy;
  review.reviewedRevision = selfApproved.authoring.revision;
  review.reviewerNote = "This deliberately invalid self-review note is long enough to reach the substantive length threshold.";
}
assert.equal(auditCapacityRemediationState({ ...selfApproved, requireApproved: true }).ok, false);

// 9. Pending strict state rejected before independent approval
const pendingStrict = auditCapacityRemediationState({ ...base, requireApproved: true });
assert.equal(pendingStrict.ok, false);
assert.ok(pendingStrict.failures.some((failure) => failure.includes("independent approval required")));

console.log("CB6 capacity remediation regression passed: clean witness accepted; duplicate, drift, freshness reuse, wrong strand, out-of-scope, unknown item, self-review, and pending strict state rejected.");
