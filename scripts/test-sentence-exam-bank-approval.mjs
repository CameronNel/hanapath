#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { auditBankApprovalManifest } from "./audit-sentence-exam-curated-bank.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function readJson(path) {
  return JSON.parse(readFileSync(join(ROOT, path), "utf8"));
}

function loadBank() {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(
    readFileSync(join(ROOT, "sentence_exam_curated_bank.js"), "utf8"),
    sandbox,
    { filename: "sentence_exam_curated_bank.js" },
  );
  return JSON.parse(JSON.stringify(sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK));
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function audit(bank, approval) {
  return auditBankApprovalManifest({ bank, approval }).errors;
}

const bank = loadBank();
const approval = readJson("docs/reviews/sentence_exam_curated_bank_cb6b_approval.json");
assert.deepEqual(audit(bank, approval), [], "Exact active-bank approval should pass.");
assert.ok(audit(bank, null).some((error) => error.includes("missing or malformed")));

const wrongRevision = { ...approval, bankRevision: "curated-sentence-exam-v1-cb4" };
assert.ok(audit(bank, wrongRevision).some((error) => error.includes("does not match bank revision")));

const inheritedOnly = { ...approval, capacityRevision: bank.baseRevision };
assert.ok(audit(bank, inheritedOnly).some((error) => error.includes("capacityRevision")));

const staleHash = { ...approval, entriesSha256: "0".repeat(64) };
assert.ok(audit(bank, staleHash).some((error) => error.includes("entriesSha256")));

const changedContent = clone(bank);
changedContent.entries[0].reviewerNote += " tampered";
assert.ok(audit(changedContent, approval).some((error) => error.includes("entriesSha256")));

const changedSet = clone(bank);
changedSet.entries.reverse();
assert.ok(audit(changedSet, approval).some((error) => error.includes("entryIdsSha256")));

const selfApproved = { ...approval, approvedBy: bank.entries[0].authoredBy };
assert.ok(audit(bank, selfApproved).some((error) => error.includes("self-approved")));

const badTimestamp = { ...approval, approvedAt: "2026-99-99T99:99:99Z" };
assert.ok(audit(bank, badTimestamp).some((error) => error.includes("timestamp")));

const shortNote = { ...approval, reviewerNote: "Too short." };
assert.ok(audit(bank, shortNote).some((error) => error.includes("too short")));

console.log("PASS: complete-bank approval is bound to the active/base/capacity revisions, exact ordered entry set, reviewed content, independent reviewer, real UTC timestamp, and substantive evidence.");
