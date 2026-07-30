#!/usr/bin/env node
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "exam_integrity_hardening.js"), "utf8");

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!value || typeof value !== "object") return value;
  const out = {};
  for (const key of Object.keys(value).sort()) if (value[key] !== undefined) out[key] = stableValue(value[key]);
  return out;
}
function stableStringify(value) { return JSON.stringify(stableValue(value)); }
function fingerprint(value) {
  const text = stableStringify(value);
  let hash = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

const state = {
  examResults: {
    version: 1,
    byAttemptId: {
      old: {
        attemptId: "old",
        status: "hanaPath",
        checksum: null,
        scoreSummary: { pct: 80 },
      },
    },
  },
  examIntegrity: { version: 1, taintEvents: [], resultRelations: [], migrationLog: [] },
};
let saves = 0;
const context = {
  window: null,
  state,
  console,
  Date,
  JSON,
  Object,
  Array,
  Set,
  CustomEvent: class CustomEvent { constructor(type, options) { this.type = type; this.detail = options?.detail; } },
  saveState: () => { saves += 1; return true; },
  writeExamResultRecord(attemptId, record) { state.examResults.byAttemptId[attemptId] = record; },
  validateImportedExamIntegrity: () => [],
  getWordExamsList: () => [],
  getHangulExamTaintContext: () => ({ status: "hanaPath", isPractice: false, overrideFlags: [], overrideEventIds: [] }),
  getWordExamTaintContext: () => ({ status: "hanaPath", isPractice: false, overrideFlags: [], overrideEventIds: [] }),
};
context.window = context;
context.HANAPATH_EXAM_INTEGRITY = Object.freeze({
  fingerprint,
  stableStringify,
  validateExamIntegrityState: () => [],
  migrateExamIntegrityState: () => ({ changed: false }),
  getAttemptTaintContext: () => ({ status: "hanaPath", isPractice: false, overrideFlags: [], overrideEventIds: [] }),
});
vm.createContext(context);
vm.runInContext(source, context, { filename: "exam_integrity_hardening.js" });

assert.equal(saves, 1, "missing historical checksum must be explicitly backfilled and persisted once");
assert.match(state.examResults.byAttemptId.old.checksum, /^fp1:/);
assert.deepEqual(state.examIntegrity.checksumBackfills[0].attemptIds, ["old"]);

const record = {
  attemptId: "new",
  status: "hanaPath",
  checksum: null,
  scoreSummary: { pct: 90 },
};
const stored = context.writeExamResultRecord("new", record);
assert.match(stored.checksum, /^fp1:/);
assert.equal(context.writeExamResultRecord("new", record).checksum, stored.checksum, "idempotent identical write must be accepted");
assert.throws(
  () => context.writeExamResultRecord("new", { ...record, scoreSummary: { pct: 10 } }),
  (error) => error && error.code === "EXAM_RESULT_ID_COLLISION",
);

state.examResults.byAttemptId.new.scoreSummary.pct = 12;
assert.ok(
  context.HANAPATH_EXAM_INTEGRITY.validateExamIntegrityState(state).some((message) => /checksum does not match/.test(message)),
  "stored content mutation must be detected",
);

context.HANAPATH_EXAM_INTEGRITY = null;
assert.deepEqual(
  context.validateImportedExamIntegrity({ examResults: {}, examIntegrity: {} }),
  ["exam-integrity validator is unavailable; import rejected"],
);
assert.equal(context.getHangulExamTaintContext([]).status, "practice");
assert.ok(context.getHangulExamTaintContext([]).overrideFlags.includes("integrity-api-unavailable"));

// Reproduce the old review-hash laundering path in an isolated fixture. `--write`
// must now fail and leave the independently reviewed file byte-for-byte unchanged.
const temp = mkdtempSync(join(tmpdir(), "hanapath-review-hash-"));
try {
  mkdirSync(join(temp, "scripts"), { recursive: true });
  mkdirSync(join(temp, "docs", "generated"), { recursive: true });
  mkdirSync(join(temp, "docs", "reviews"), { recursive: true });
  const reviewScript = readFileSync(join(root, "scripts", "review-sentence-exam-capacity-remediation.mjs"), "utf8");
  writeFileSync(join(temp, "scripts", "review-sentence-exam-capacity-remediation.mjs"), reviewScript);
  const authored = {
    revision: "r1",
    authoredBy: "author-a",
    entries: [{
      id: "r1", mode: "recognition", templateId: "recognition", examPromptEn: "Choose.",
      canonicalAnswer: "가요.", englishMeaning: "I go.", recognitionAnswerEn: "I go.",
      manualAlternatives: [], sourceSectionOrder: 1, sourceLessonIds: ["l1"], patternTags: [],
    }],
  };
  const review = {
    revision: "r1",
    entries: [{
      id: "r1", reviewStatus: "approved", reviewedBy: "reviewer-b", reviewedAt: "2026-07-30T12:00:00Z",
      reviewedRevision: "r1", authoredContentHash: "stale", reviewerNote: "A substantive independent review note that is long enough.",
      fairnessDecision: "recognition-only", acceptedAnswerPolicy: "selected-response",
    }],
  };
  const authorPath = join(temp, "docs", "generated", "sentence_exam_cb6_capacity_authoring.json");
  const reviewPath = join(temp, "docs", "reviews", "sentence_exam_cb6_capacity_reviews.json");
  writeFileSync(authorPath, `${JSON.stringify(authored, null, 2)}\n`);
  const before = `${JSON.stringify(review, null, 2)}\n`;
  writeFileSync(reviewPath, before);
  const run = spawnSync(process.execPath, [join(temp, "scripts", "review-sentence-exam-capacity-remediation.mjs"), "--write"], { encoding: "utf8" });
  assert.notEqual(run.status, 0, "--write must reject a stale independent-review hash");
  assert.equal(readFileSync(reviewPath, "utf8"), before, "failed review validation must not rewrite the approval file");
} finally {
  rmSync(temp, { recursive: true, force: true });
}

console.log("Immutable result writes, fail-closed integrity, checksums, and review hashes passed.");
