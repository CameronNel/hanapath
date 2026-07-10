import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { qualifyWithConfig, qualify } from "./qualify_elective_range.mjs";

// An empty ledger keeps this test independent of which real batches have
// landed; the real ledger is only used for the skip-decided assertion below.
const emptyLedger = path.join(os.tmpdir(), "test_qualify_config_empty_ledger.jsonl");
fs.writeFileSync(emptyLedger, "# test ledger\n", "utf8");

// 1. Config-driven run over a range with explicit overrides.
const report = qualifyWithConfig({
  batchId: "test-config-r77-r95",
  minRank: 77,
  maxRank: 95,
  theme: "Test batch",
  decisionsPath: emptyLedger,
  overrides: {
    "한다": {
      status: "inflected",
      canonicalLemma: "하다",
      parentId: "w0701_hada",
      reason: "Plain-style present declarative of 하다; not a standalone lemma."
    }
  }
});
assert.equal(report.batchId, "test-config-r77-r95");
assert.equal(report.range.decidedRows + report.range.skippedAlreadyDecided, report.range.sourceRows);
assert.equal(report.importReadyRows, 0);
const handa = report.records.find((record) => record.normalizedSurface === "한다");
assert.equal(handa.status, "inflected");
assert.equal(handa.canonicalLemma, "하다");
assert.equal(handa.parentId, "w0701_hada");
const seyo = report.records.find((record) => record.normalizedSurface === "세요");
assert.equal(seyo.status, "needs-sense-review", "unflagged rows without an override must fall back to needs-sense-review");
assert.ok(report.records.every((record) => record.status !== "accepted" || record.canonicalLemma));

// 2. Rows already in the ledger are skipped, never re-decided.
const decided = qualifyWithConfig({
  batchId: "test-config-r112-r122",
  minRank: 112,
  maxRank: 122,
  theme: "Test batch",
  overrides: {}
});
assert.equal(decided.range.decidedRows, 0, "ranks 112-122 are fully decided in the ledger and must be skipped");
assert.ok(decided.range.skippedAlreadyDecided >= 11);

// 3. Guardrails fail loudly.
assert.throws(
  () => qualifyWithConfig({ batchId: "t", minRank: 77, maxRank: 95, theme: "t", decisionsPath: emptyLedger, overrides: { "님": { status: "accepted", canonicalLemma: "님", reason: "Attempt to override a heuristically flagged row." } } }),
  /heuristically flagged/
);
assert.throws(
  () => qualifyWithConfig({ batchId: "t", minRank: 77, maxRank: 95, theme: "t", decisionsPath: emptyLedger, overrides: { "한다": { status: "accepted", reason: "Accepted rows must always carry a canonical lemma." } } }),
  /canonicalLemma/
);
assert.throws(
  () => qualifyWithConfig({ batchId: "t", minRank: 77, maxRank: 95, theme: "t", decisionsPath: emptyLedger, overrides: { "없는표면": { status: "rejected", reason: "Overrides must target real undecided candidates." } } }),
  /not an undecided candidate/
);
assert.throws(
  () => qualifyWithConfig({ batchId: "t", minRank: 77, maxRank: 95, theme: "t", decisionsPath: emptyLedger, overrides: { "한다": { status: "inflected", parentId: "not_a_real_id", reason: "Parent ids must resolve to curated rows." } } }),
  /not a curated row id/
);
assert.throws(
  () => qualifyWithConfig({ batchId: "t", minRank: 77, maxRank: 95, theme: "t", skipDecided: false, overrides: {} }, { append: true }),
  /cannot disable skipDecided/
);
assert.throws(
  () => qualifyWithConfig({ batchId: "t", minRank: 77, maxRank: 95, theme: "t", decisionsPath: emptyLedger, overrides: {} }, { append: true }),
  /decisionsPath is test-only/
);

// 4. Legacy batch behavior is unchanged.
const legacy = qualify();
assert.equal(legacy.batchId, "p2-qualify-r345-r453");
assert.equal(legacy.range.sourceRows, legacy.records.length);
assert.ok(legacy.qualifiedLexicalCandidates.length >= 3);

console.log("Config-driven qualification tests passed.");
