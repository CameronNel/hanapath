#!/usr/bin/env node
// Regression: prove the E0 shard-integrity validator HARD-FAILS on each class
// of corruption it is meant to catch, and PASSES on a well-formed registry;
// and prove the browser merger FAILS CLOSED (throws, publishes nothing) when a
// shard is missing.
//
// This documents the packet-E0 hard failures:
//   duplicate IDs, missing IDs, overlapping shard ranges, out-of-range IDs,
//   malformed records, reviewed IDs absent from the live bank, EXTRA IDs (a
//   shortened bank the ranges still claim), partition COUNT mismatch, and
//   malformed/duplicate live-bank IDs.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { validateShardIntegrity, EXPECTED_SHARD_RANGES } from "./audit-sentence-eligibility.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

let failures = 0;
function check(name, cond) {
  if (cond) {
    console.log(`  PASS  ${name}`);
  } else {
    console.error(`  FAIL  ${name}`);
    failures++;
  }
}

// A well-formed bank covering s0001..s4177 (matches the live bank shape).
const bankIds = new Set();
for (let n = 1; n <= 4177; n++) bankIds.add(`s${String(n).padStart(4, "0")}`);

function baselineShards() {
  const shards = {};
  for (const key of Object.keys(EXPECTED_SHARD_RANGES)) {
    shards[key] = {
      shardId: key,
      range: { ...EXPECTED_SHARD_RANGES[key] },
      reviewedRows: {},
    };
  }
  // One valid reviewed row in shard A.
  shards.A.reviewedRows.s0001 = { typedClass: "canonical", examPromptEn: "x" };
  return shards;
}
const clone = (o) => JSON.parse(JSON.stringify(o));
const hasErr = (errs, needle) => errs.some((e) => e.includes(needle));

// 0. Positive control.
{
  const errs = validateShardIntegrity(baselineShards(), bankIds);
  check("well-formed registry → 0 errors", errs.length === 0);
}

// 1. Duplicate IDs (same row reviewed in two shards).
{
  const s = baselineShards();
  s.B.reviewedRows.s0001 = { typedClass: "canonical", examPromptEn: "dup" }; // also out-of-range in B
  const errs = validateShardIntegrity(s, bankIds);
  check("duplicate ID across shards → hard fail", hasErr(errs, "Duplicate ID s0001"));
}

// 2. Missing IDs (a bank ID covered by no shard range).
{
  const s = baselineShards();
  s.D.range.toNum = 4000; // leaves s4001..s4177 uncovered
  const errs = validateShardIntegrity(s, bankIds);
  check("uncovered bank ID → 'Missing ID' hard fail", hasErr(errs, "Missing ID s4001"));
}

// 3. Overlapping shard ranges.
{
  const s = baselineShards();
  s.B.range.fromNum = 1000; // overlaps A's [..1050]
  const errs = validateShardIntegrity(s, bankIds);
  check("overlapping ranges → hard fail", hasErr(errs, "Overlapping shard ranges"));
}

// 4. IDs outside the assigned range.
{
  const s = baselineShards();
  s.A.reviewedRows.s2000 = { typedClass: "canonical", examPromptEn: "wrong shard" };
  const errs = validateShardIntegrity(s, bankIds);
  check("out-of-range ID in wrong shard → hard fail", hasErr(errs, "Out-of-range ID s2000 in shard A"));
}

// 5. Malformed records (bad row-ID key and non-object entry).
{
  const s = baselineShards();
  s.A.reviewedRows["bogus"] = { typedClass: "canonical", examPromptEn: "bad id" };
  const errs = validateShardIntegrity(s, bankIds);
  check("malformed row ID key → hard fail", hasErr(errs, "Malformed record in shard A: row ID 'bogus'"));

  const s2 = baselineShards();
  s2.A.reviewedRows.s0002 = null;
  const errs2 = validateShardIntegrity(s2, bankIds);
  check("non-object row entry → hard fail", hasErr(errs2, "Malformed record s0002"));

  const s3 = baselineShards();
  s3.A.range = { fromId: "s0001", toId: "s1050", fromNum: 5, toNum: 1050 }; // drifted
  const errs3 = validateShardIntegrity(s3, bankIds);
  check("range drift from locked contract → hard fail", hasErr(errs3, "drifted from the locked contract"));
}

// 6. Reviewed IDs absent from the live Sentence bank.
{
  const smallerBank = new Set(bankIds);
  smallerBank.delete("s0001");
  const errs = validateShardIntegrity(baselineShards(), smallerBank);
  check("reviewed ID absent from bank → hard fail", hasErr(errs, "absent from the live Sentence bank"));
}

// 7. Missing registry entirely.
{
  const errs = validateShardIntegrity(undefined, bankIds);
  check("missing registry → hard fail", hasErr(errs, "missing or not an object"));
}

// A well-formed bank as an ARRAY (lets the validator see multiplicity).
const bankIdArray = [];
for (let n = 1; n <= 4177; n++) bankIdArray.push(`s${String(n).padStart(4, "0")}`);

// 8. Extra ID / shortened bank: a row the ranges still claim was removed.
{
  const shortened = bankIdArray.filter((id) => id !== "s4177");
  const errs = validateShardIntegrity(baselineShards(), shortened);
  check("shortened bank (removed row) → 'Extra ID' hard fail", hasErr(errs, "Extra ID s4177"));
  check("shortened bank → 'Partition count mismatch' hard fail", hasErr(errs, "Partition count mismatch"));
}

// 9. Duplicate live-bank ID.
{
  const dupBank = [...bankIdArray, "s0100"];
  const errs = validateShardIntegrity(baselineShards(), dupBank);
  check("duplicate live-bank ID → hard fail", hasErr(errs, "Duplicate live-bank ID s0100"));
}

// 10. Malformed live-bank ID.
{
  const badBank = [...bankIdArray, "sABCD"];
  const errs = validateShardIntegrity(baselineShards(), badBank);
  check("malformed live-bank ID → hard fail", hasErr(errs, "Malformed live-bank ID 'sABCD'"));
}

// 11. Merger fails closed when a shard is missing (browser runtime guard).
function runInSandbox(files) {
  const window = {};
  const sandbox = { window, self: window, globalThis: window };
  vm.createContext(sandbox);
  for (const f of files) vm.runInContext(readFileSync(join(ROOT, f), "utf8"), sandbox, { filename: f });
  return sandbox.window;
}
const ALL_SHARDS = [
  "sentence_exam_eligibility_shard_a.js",
  "sentence_exam_eligibility_shard_b.js",
  "sentence_exam_eligibility_shard_c.js",
  "sentence_exam_eligibility_shard_d.js",
];
const MERGER = "sentence_exam_eligibility.js";
{
  // All four shards present → publishes the aggregate.
  const w = runInSandbox([...ALL_SHARDS, MERGER]);
  check("merger with all four shards → publishes aggregate", !!w.HANAPATH_SENTENCE_EXAM_ELIGIBILITY);

  // Shard D omitted → must throw and leave the global unset (fail closed).
  let threw = false;
  let published = true;
  try {
    const w2 = runInSandbox([...ALL_SHARDS.slice(0, 3), MERGER]);
    published = !!w2.HANAPATH_SENTENCE_EXAM_ELIGIBILITY;
  } catch {
    threw = true;
    published = false;
  }
  check("merger with a missing shard → throws (fail closed)", threw);
  check("merger with a missing shard → does NOT publish a partial aggregate", published === false);
}

if (failures > 0) {
  console.error(`\nSHARD FIXTURE TEST FAILED: ${failures} case(s).`);
  process.exit(1);
}
console.log("\nAll shard negative/positive fixtures behaved correctly.");
process.exit(0);
