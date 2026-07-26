#!/usr/bin/env node
import assert from "node:assert/strict";
import {
  buildCb4AuthoringPackage,
  buildReviewManifest,
  buildReviewedBank,
  validateReviewManifest,
} from "./build-sentence-exam-curated-bank.mjs";
import { LOCKED_SELECTION_POLICY, auditCuratedBankState } from "./audit-sentence-exam-curated-bank.mjs";

const { source, package: authoringPackage } = buildCb4AuthoringPackage();
assert.equal(authoringPackage.summary.typedCount, 288);
assert.equal(authoringPackage.summary.recognitionCount, 320);
assert.ok(authoringPackage.summary.finiteTypedShare <= LOCKED_SELECTION_POLICY.maxFiniteTypedShare);
for (let section = 1; section <= 8; section += 1) {
  assert.ok(authoringPackage.summary.typedBySection[section] >= LOCKED_SELECTION_POLICY.minTypedPerSection);
  assert.ok(authoringPackage.summary.recognitionBySection[section] >= LOCKED_SELECTION_POLICY.minRecognitionPerSection);
}

const pending = buildReviewManifest(authoringPackage);
assert.equal(pending.pendingCount, 288);
assert.deepEqual(validateReviewManifest(authoringPackage, pending), []);
assert.ok(validateReviewManifest(authoringPackage, pending, { requireApproved: true }).length >= 288);

const approved = structuredClone(pending);
approved.state = "independently-approved";
approved.approvedCount = approved.entries.length;
approved.pendingCount = 0;
for (const review of approved.entries) {
  review.reviewStatus = "approved";
  review.reviewedBy = "Claude Opus 4.8 / CB4 independent reviewer";
  review.reviewedAt = "2026-07-26T19:00:00Z";
  review.reviewedRevision = authoringPackage.revision;
  review.reviewerNote = `Independently checked ${review.id}: prompt forces the live target, canonical Korean matches, and any finite alternatives are bounded and collision-free.`;
}
assert.deepEqual(validateReviewManifest(authoringPackage, approved, { requireApproved: true }), []);

const bank = buildReviewedBank(authoringPackage, approved);
assert.equal(bank.enabled, false);
assert.equal(bank.reviewState, "independently-approved");
const audited = auditCuratedBankState({
  bank,
  templates: source.templates,
  sentences: source.sentences,
  reviewedRows: source.reviewedRows,
  routes: source.routes,
});
const nonAmbiguityErrors = audited.errors.filter((error) => !error.includes("remains ambiguous:"));
assert.deepEqual(nonAmbiguityErrors, []);
const flaggedTypedIds = new Set(authoringPackage.entries
  .filter((entry) => entry.mode === "typed" && entry.authoringAmbiguityFlags.length > 0)
  .map((entry) => entry.id));
const auditedAmbiguousIds = new Set(audited.errors
  .filter((error) => error.includes("remains ambiguous:"))
  .map((error) => error.match(/Curated typed entry (s\d+)/)?.[1])
  .filter(Boolean));
assert.deepEqual(auditedAmbiguousIds, flaggedTypedIds);
assert.equal(audited.typedCount, 288);
assert.equal(audited.recognitionCount, 320);

const sameAuthor = structuredClone(approved);
sameAuthor.entries[0].reviewedBy = authoringPackage.authoredBy;
assert.ok(validateReviewManifest(authoringPackage, sameAuthor, { requireApproved: true })
  .some((error) => error.includes("reviewer must differ from author")));

const collisionBank = structuredClone(bank);
const typedEntries = collisionBank.entries.filter((entry) => entry.mode === "typed");
typedEntries[0].manualAlternatives = [typedEntries[1].canonicalAnswer];
const collisionAudit = auditCuratedBankState({
  bank: collisionBank,
  templates: source.templates,
  sentences: source.sentences,
  reviewedRows: source.reviewedRows,
  routes: source.routes,
});
assert.ok(collisionAudit.errors.some((error) => error.includes("Accepted answer collision")));

const tamperedPolicy = structuredClone(bank);
tamperedPolicy.selectionPolicy.typedTargetSize = 287;
const policyAudit = auditCuratedBankState({
  bank: tamperedPolicy,
  templates: source.templates,
  sentences: source.sentences,
  reviewedRows: source.reviewedRows,
  routes: source.routes,
});
assert.ok(policyAudit.errors.some((error) => error.includes("selectionPolicy.typedTargetSize")));

console.log(`CB4 curated-bank authoring regression passed with ${flaggedTypedIds.size} typed prompts reserved for independent ambiguity review.`);
