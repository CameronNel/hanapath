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

function loadRuntime() {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  for (const file of [
    "sentences_lesson_plan.js",
    "sentence_exam_grader.js",
    "sentence_exam_curated_bank.js",
  ]) {
    vm.runInContext(readFileSync(join(ROOT, file), "utf8"), sandbox, { filename: file });
  }
  const routes = new Map();
  for (const lesson of sandbox.window.HANAPATH_SENTENCE_LESSONS || []) {
    for (const sentenceId of lesson.sentenceIds || []) {
      if (!routes.has(sentenceId)) routes.set(sentenceId, []);
      routes.get(sentenceId).push(lesson.id);
    }
  }
  const runtimeBank = sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
  const bank = runtimeBank?.revision === "curated-sentence-exam-v2-cb6b"
    ? {
        ...runtimeBank,
        revision: runtimeBank.baseRevision,
        entries: runtimeBank.entries.filter(
          (entry) => entry.authoredRevision !== "curated-sentence-exam-v2-cb6b-authoring",
        ),
      }
    : runtimeBank;
  return {
    bank,
    routes,
    fullBank: runtimeBank,
    grader: sandbox.window.HANAPATH_SENTENCE_EXAM_GRADER,
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const runtime = loadRuntime();
const base = {
  authoring: readJson("docs/generated/sentence_exam_cb6_capacity_authoring.json"),
  reviews: readJson("docs/reviews/sentence_exam_cb6_capacity_reviews.json"),
  witness: readJson("docs/generated/sentence_exam_cb6_capacity_witness.json"),
  inventory: readJson("docs/generated/sentence_exam_inventory.json"),
  bank: runtime.bank,
  routes: runtime.routes,
};

// 1. Valid exact assignment passes
const clean = auditCapacityRemediationState(base);
assert.equal(clean.ok, true, clean.failures.join("\n"));
assert.equal(clean.summary.additions, 94);
assert.ok(clean.summary.stage1TypedDistinctTargets >= 100);
assert.equal(clean.summary.independentReviewRequired, 0);

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

// 9. Pending strict state is rejected if independent approval is removed.
const pendingBase = clone(base);
for (const review of pendingBase.reviews.entries) {
  review.reviewStatus = "pending";
  review.reviewedBy = null;
  review.reviewedAt = null;
  review.reviewedRevision = null;
  review.reviewerNote = null;
}
pendingBase.reviews.state = "awaiting-independent-review";
pendingBase.reviews.approvedCount = 0;
pendingBase.reviews.pendingCount = pendingBase.reviews.entries.length;
const pendingStrict = auditCapacityRemediationState({ ...pendingBase, requireApproved: true });
assert.equal(pendingStrict.ok, false);
assert.ok(pendingStrict.failures.some((failure) => failure.includes("independent approval required")));

// 10. A new typed row may not reuse a lesson already occupied by the frozen bank.
const capCollision = clone(base);
capCollision.routes = new Map(base.routes);
const occupiedTyped = base.bank.entries.find((entry) => entry.mode === "typed" && base.routes.has(entry.id));
const additionTyped = capCollision.authoring.entries.find((entry) => entry.mode === "typed");
capCollision.routes.set(additionTyped.id, [...base.routes.get(occupiedTyped.id)]);
const capCollisionResult = auditCapacityRemediationState(capCollision);
assert.equal(capCollisionResult.ok, false);
assert.ok(capCollisionResult.failures.some((failure) => failure.includes("typed lesson cap exceeded")));

// 11. Exact-cloze repairs accept the one visible-prompt answer and reject ordinary
// variants that the former English-plus-anchor prompts left unresolved.
const correctedById = new Map(runtime.fullBank.entries.map((entry) => [entry.id, entry]));
const fairnessCases = [
  {
    axis: "pronoun",
    id: "s2067",
    rejected: "오늘은 내 생일이 아니에요.",
  },
  {
    axis: "demonstrative",
    id: "s2061",
    rejected: "이거는 책이 아니에요.",
  },
  {
    axis: "particle",
    id: "s1028",
    rejected: "어려운 상황에서도 희망 잃지 마세요.",
  },
  {
    axis: "register",
    id: "s2061",
    rejected: "이것은 책이 아닙니다.",
  },
  {
    axis: "information structure",
    id: "s0897",
    rejected: "학교에 아직 도착하지 않았어요.",
  },
];
for (const { axis, id, rejected } of fairnessCases) {
  const item = correctedById.get(id);
  assert.ok(item.examPromptEn.includes("Complete this exact Korean lesson frame"), `${id}: repaired cloze prompt is missing.`);
  assert.equal(item.manualAlternatives.length, 0, `${id}: variants outside the visible frame must not be accepted.`);
  assert.equal(runtime.grader.scoreSentenceExamResponse(item, item.canonicalAnswer).correct, true, `${id}: canonical ${axis} answer must pass.`);
  assert.equal(runtime.grader.scoreSentenceExamResponse(item, rejected).correct, false, `${id}: unintended ${axis} variant must fail.`);
}

console.log("CB6 capacity remediation regression passed: clean witness accepted; duplicate, drift, freshness reuse, wrong strand, out-of-scope, unknown item, self-review, pending strict state, projected-bank lesson-cap collision, and repaired pronoun/demonstrative/particle/register/information-structure grading contracts verified.");
