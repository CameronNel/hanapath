#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { ROOT, SENTENCES_FILE } from "./sentences-bank.mjs";

export function normalizeSentenceExamAnswer(value) {
  return String(value == null ? "" : value)
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ");
}

const ELIGIBILITY_FILE = join(ROOT, "sentence_exam_eligibility.js");

// The four deterministic, non-overlapping eligibility shards (packet E0). They
// load BEFORE the merger, in this order, into the same browser window; the
// merger publishes window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY.
export const SHARD_FILES = [
  "sentence_exam_eligibility_shard_a.js",
  "sentence_exam_eligibility_shard_b.js",
  "sentence_exam_eligibility_shard_c.js",
  "sentence_exam_eligibility_shard_d.js",
];

// Canonical range each shard MUST declare. The audit hard-fails if a shard's
// self-declared range drifts from this contract.
export const EXPECTED_SHARD_RANGES = {
  A: { fromId: "s0001", toId: "s1050", fromNum: 1, toNum: 1050 },
  B: { fromId: "s1051", toId: "s2100", fromNum: 1051, toNum: 2100 },
  C: { fromId: "s2101", toId: "s3150", fromNum: 2101, toNum: 3150 },
  D: { fromId: "s3151", toId: "s4177", fromNum: 3151, toNum: 4177 },
};

const ID_PATTERN = /^s\d{4}$/;

function idToNum(id) {
  return ID_PATTERN.test(id) ? parseInt(id.slice(1), 10) : NaN;
}

function loadBrowserGlobal(filePath, globalName) {
  const window = {};
  const sandbox = { window, self: window, globalThis: window };
  vm.createContext(sandbox);
  const code = readFileSync(filePath, "utf8");
  vm.runInContext(code, sandbox, { filename: filePath });
  return sandbox.window[globalName];
}

// Run every shard file + the merger in ONE window (browser load order) and
// return both the raw shard registry and the merged public contract.
function loadShardedEligibility() {
  const window = {};
  const sandbox = { window, self: window, globalThis: window };
  vm.createContext(sandbox);
  for (const file of SHARD_FILES) {
    vm.runInContext(readFileSync(join(ROOT, file), "utf8"), sandbox, { filename: file });
  }
  vm.runInContext(readFileSync(ELIGIBILITY_FILE, "utf8"), sandbox, { filename: "sentence_exam_eligibility.js" });
  return {
    shards: sandbox.window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS,
    eligibility: sandbox.window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY,
  };
}

// Pure structural validation of the shard registry. Returns an array of error
// strings (empty === valid). These are HARD failures independent of
// --allow-incomplete / --protect-historical-evidence: they signal data
// corruption, not review incompleteness.
//
// `bankIds` may be an array (preferred — lets the audit detect duplicate and
// malformed live-bank IDs) or a Set.
//
// Hard failures covered:
//   - malformed records (bad shard shape, bad row ID, non-object row);
//   - overlapping shard ranges;
//   - missing IDs (a live bank ID covered by no shard range);
//   - EXTRA IDs (an ID the shard ranges claim that is absent from the bank);
//   - a bank-vs-partition COUNT mismatch;
//   - duplicate IDs (a row reviewed in more than one shard);
//   - IDs outside the assigned range (a row in the wrong shard);
//   - reviewed IDs absent from the live Sentence bank;
//   - malformed or duplicate live-bank IDs (when `bankIds` is an array).
//
// The bank/partition comparison is BIDIRECTIONAL: the set of IDs the four
// ranges enumerate must equal the set of live bank IDs exactly — neither a hole
// in coverage nor a range claiming a row the bank no longer has may pass.
export function validateShardIntegrity(shards, bankIds) {
  const errors = [];

  // Normalise the bank IDs; detect malformed/duplicate entries when an array
  // (with its original multiplicity) is available.
  const bankIdSet = new Set();
  if (Array.isArray(bankIds)) {
    const seen = new Set();
    for (const id of bankIds) {
      if (typeof id !== "string" || !ID_PATTERN.test(id)) {
        errors.push(`Malformed live-bank ID '${id}': does not match /^s\\d{4}$/`);
        continue;
      }
      if (seen.has(id)) errors.push(`Duplicate live-bank ID ${id}`);
      seen.add(id);
      bankIdSet.add(id);
    }
  } else if (bankIds instanceof Set) {
    for (const id of bankIds) bankIdSet.add(id);
  }

  if (!shards || typeof shards !== "object") {
    errors.push("Shard registry (HANAPATH_SENTENCE_EXAM_ELIGIBILITY_SHARDS) is missing or not an object");
    return errors;
  }

  const expectedKeys = Object.keys(EXPECTED_SHARD_RANGES);

  // Unexpected shard keys → malformed.
  for (const key of Object.keys(shards)) {
    if (!expectedKeys.includes(key)) {
      errors.push(`Malformed registry: unexpected shard key '${key}' (expected exactly ${expectedKeys.join(", ")})`);
    }
  }

  const rangeList = [];
  const idToShards = new Map(); // id -> [shardKey, ...] for duplicate detection

  for (const key of expectedKeys) {
    const shard = shards[key];
    const expected = EXPECTED_SHARD_RANGES[key];

    if (!shard || typeof shard !== "object") {
      errors.push(`Malformed shard ${key}: missing or not an object`);
      continue;
    }
    if (shard.shardId !== key) {
      errors.push(`Malformed shard ${key}: shardId '${shard.shardId}' does not match its registry key '${key}'`);
    }
    const range = shard.range;
    if (!range || typeof range !== "object") {
      errors.push(`Malformed shard ${key}: missing range metadata`);
      continue;
    }
    if (
      range.fromId !== expected.fromId ||
      range.toId !== expected.toId ||
      range.fromNum !== expected.fromNum ||
      range.toNum !== expected.toNum
    ) {
      errors.push(
        `Shard ${key}: declared range ${JSON.stringify(range)} drifted from the locked contract ${JSON.stringify(expected)}`
      );
    }
    if (!Number.isInteger(range.fromNum) || !Number.isInteger(range.toNum) || range.fromNum > range.toNum) {
      errors.push(`Malformed shard ${key}: range bounds must be integers with fromNum <= toNum`);
      continue;
    }
    rangeList.push({ key, fromNum: range.fromNum, toNum: range.toNum });

    const rows = shard.reviewedRows;
    if (!rows || typeof rows !== "object") {
      errors.push(`Malformed shard ${key}: reviewedRows must be an object`);
      continue;
    }
    for (const [id, entry] of Object.entries(rows)) {
      if (!ID_PATTERN.test(id)) {
        errors.push(`Malformed record in shard ${key}: row ID '${id}' does not match /^s\\d{4}$/`);
        continue;
      }
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        errors.push(`Malformed record ${id} in shard ${key}: entry must be an object`);
      }
      const n = idToNum(id);
      if (n < range.fromNum || n > range.toNum) {
        errors.push(`Out-of-range ID ${id} in shard ${key}: outside its declared range [${range.fromNum}..${range.toNum}]`);
      }
      if (!bankIdSet.has(id)) {
        errors.push(`Reviewed ID ${id} in shard ${key} is absent from the live Sentence bank`);
      }
      if (!idToShards.has(id)) idToShards.set(id, []);
      idToShards.get(id).push(key);
    }
  }

  // Duplicate IDs across shards.
  for (const [id, keys] of idToShards) {
    if (keys.length > 1) {
      errors.push(`Duplicate ID ${id}: reviewed in more than one shard (${keys.join(", ")})`);
    }
  }

  // Overlapping shard ranges.
  const sorted = [...rangeList].sort((a, b) => a.fromNum - b.fromNum);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].fromNum <= sorted[i - 1].toNum) {
      errors.push(
        `Overlapping shard ranges: ${sorted[i - 1].key} [..${sorted[i - 1].toNum}] and ${sorted[i].key} [${sorted[i].fromNum}..]`
      );
    }
  }

  // Exact partition, BOTH directions. Build the full ID set the ranges
  // enumerate, then compare it against the live bank set for holes AND for
  // rows the ranges claim that the bank no longer contains.
  const expectedIdSet = new Set();
  for (const r of rangeList) {
    for (let n = r.fromNum; n <= r.toNum; n++) {
      expectedIdSet.add(`s${String(n).padStart(4, "0")}`);
    }
  }

  // Direction 1 — coverage: every live bank ID must fall in exactly one range.
  for (const id of bankIdSet) {
    const n = idToNum(id);
    if (Number.isNaN(n)) continue;
    const covering = rangeList.filter((r) => n >= r.fromNum && n <= r.toNum);
    if (covering.length === 0) {
      errors.push(`Missing ID ${id}: not covered by any shard range`);
    } else if (covering.length > 1) {
      errors.push(`Ambiguous ID ${id}: covered by multiple shard ranges (${covering.map((r) => r.key).join(", ")})`);
    }
  }

  // Direction 2 — no phantom coverage: every ID the ranges enumerate must exist
  // in the live bank (catches a shortened bank / a removed row the range still
  // claims).
  for (const id of expectedIdSet) {
    if (!bankIdSet.has(id)) {
      errors.push(`Extra ID ${id}: enumerated by the shard ranges but absent from the live Sentence bank`);
    }
  }

  // Count parity — a fast, explicit exact-partition assertion.
  if (expectedIdSet.size !== bankIdSet.size) {
    errors.push(
      `Partition count mismatch: shard ranges enumerate ${expectedIdSet.size} IDs but the live bank has ${bankIdSet.size}`
    );
  }

  return errors;
}

const allowIncomplete = process.argv.includes("--allow-incomplete");
const protectHistoricalEvidence = process.argv.includes("--protect-historical-evidence");
const PROTECTED_REVIEWED_ROWS = 2100;

if (allowIncomplete && protectHistoricalEvidence) {
  console.error("Use only one eligibility mode: --allow-incomplete or --protect-historical-evidence.");
  process.exit(1);
}

const LOCKED_TAG_FLOORS = [
  { tag: "object-eul-reul", q_t: 4, r_t: 2 },
  { tag: "present-polite", q_t: 4, r_t: 2 },
  { tag: "subject-i-ga", q_t: 4, r_t: 2 },
  { tag: "past-polite", q_t: 5, r_t: 3 },
  { tag: "topic-neun", q_t: 4, r_t: 2 },
  { tag: "time-expression", q_t: 3, r_t: 2 },
  { tag: "location-e", q_t: 3, r_t: 2 },
  { tag: "location-eseo", q_t: 3, r_t: 2 },
  { tag: "possessive-ui", q_t: 2, r_t: 1 },
  { tag: "because-aseo", q_t: 2, r_t: 1 },
  { tag: "imperative-seyo", q_t: 2, r_t: 1 },
  { tag: "copula-ieyo", q_t: 2, r_t: 1 },
  { tag: "direction-euro", q_t: 2, r_t: 1 },
  { tag: "honorific-si", q_t: 4, r_t: 2 },
  { tag: "and-go", q_t: 2, r_t: 1 },
  { tag: "question-polite", q_t: 2, r_t: 1 },
  { tag: "with-hago-wa", q_t: 2, r_t: 1 },
  { tag: "formal-nida", q_t: 4, r_t: 2 },
  { tag: "if-myeon", q_t: 2, r_t: 1 },
  { tag: "existence-itda", q_t: 2, r_t: 1 },
  { tag: "counter-phrase", q_t: 2, r_t: 1 },
  { tag: "when-ttae", q_t: 2, r_t: 1 },
  { tag: "can-su-itda", q_t: 2, r_t: 1 },
  { tag: "must-ya-dwaeda", q_t: 2, r_t: 1 },
  { tag: "also-do", q_t: 2, r_t: 1 },
  { tag: "comparison-boda", q_t: 2, r_t: 1 },
  { tag: "want-go-sipda", q_t: 2, r_t: 1 },
  { tag: "neg-ji-anta", q_t: 2, r_t: 1 },
  { tag: "neg-an", q_t: 2, r_t: 1 },
  { tag: "neg-mot", q_t: 2, r_t: 1 },
  { tag: "future-geoyeyo", q_t: 5, r_t: 3 },
  { tag: "until-kkaji", q_t: 1, r_t: 1 },
  { tag: "propositive-eyo", q_t: 1, r_t: 1 },
  { tag: "but-jiman", q_t: 2, r_t: 1 },
  { tag: "only-man", q_t: 1, r_t: 1 },
  { tag: "from-buteo", q_t: 1, r_t: 1 },
  { tag: "copula-negative-anieyo", q_t: 2, r_t: 1 }
].map((item) => ({
  ...item,
  M_t: Math.max(5 * item.q_t, item.q_t + item.r_t)
}));

function main() {
  const errors = [];
  const sentences = loadBrowserGlobal(SENTENCES_FILE, "HANAPATH_SENTENCES") || [];
  const { shards, eligibility } = loadShardedEligibility();

  if (!eligibility) {
    console.error("ERROR: HANAPATH_SENTENCE_EXAM_ELIGIBILITY global not published by sentence_exam_eligibility.js");
    process.exit(1);
  }

  // Shard integrity — hard failures regardless of the selected census mode.
  // Pass the raw ID array (not a Set) so duplicate/malformed bank IDs surface.
  const shardErrors = validateShardIntegrity(shards, sentences.map((s) => s.id));
  for (const err of shardErrors) errors.push(err);
  console.log(`Shard integrity     : ${shardErrors.length === 0 ? "OK" : `${shardErrors.length} error(s)`} (4 shards: A/B/C/D)`);

  if (eligibility.schemaVersion !== 1) {
    errors.push(`Invalid schemaVersion: expected 1, got ${eligibility.schemaVersion}`);
  }
  if (!eligibility.revision || typeof eligibility.revision !== "string") {
    errors.push("Missing or invalid revision string");
  }

  const sentenceMap = new Map(sentences.map((s) => [s.id, s]));
  const reviewedRows = eligibility.reviewedRows || {};

  // Check structural integrity of reviewed rows
  const reviewedIds = Object.keys(reviewedRows);
  for (const [id, entry] of Object.entries(reviewedRows)) {
    const sRow = sentenceMap.get(id);
    if (!sRow) {
      errors.push(`Reviewed row ${id} does not exist in HANAPATH_SENTENCES`);
      continue;
    }

    if (!["canonical", "finite", "excluded"].includes(entry.typedClass)) {
      errors.push(`Row ${id}: invalid typedClass '${entry.typedClass}' (must be canonical, finite, or excluded)`);
    }

    if (!entry.examPromptEn || typeof entry.examPromptEn !== "string" || entry.examPromptEn.trim() === "") {
      errors.push(`Row ${id}: missing or empty examPromptEn`);
    }

    const expectedCanonicalKey = normalizeSentenceExamAnswer(sRow.korean);
    if (entry.canonicalTargetKey !== expectedCanonicalKey) {
      errors.push(`Row ${id}: canonicalTargetKey mismatch. Expected '${expectedCanonicalKey}', got '${entry.canonicalTargetKey}'`);
    }

    if (!Array.isArray(entry.acceptedAnswers) || entry.acceptedAnswers.length === 0 || entry.acceptedAnswers.length > 5) {
      errors.push(`Row ${id}: acceptedAnswers must be array of 1 to 5 strings`);
    } else {
      const normalizedAnswers = entry.acceptedAnswers.map((ans) => normalizeSentenceExamAnswer(ans));
      if (!normalizedAnswers.includes(expectedCanonicalKey)) {
        errors.push(`Row ${id}: acceptedAnswers does not include canonical target key '${expectedCanonicalKey}'`);
      }
    }

    if (!Number.isInteger(entry.minimumSectionOrder) || entry.minimumSectionOrder < 1 || entry.minimumSectionOrder > 8) {
      errors.push(`Row ${id}: minimumSectionOrder must be integer 1..8`);
    }

    if (!Array.isArray(entry.primaryCompetencies)) {
      errors.push(`Row ${id}: primaryCompetencies must be an array`);
    }

    if (!entry.reviewStatus || typeof entry.reviewStatus !== "string") {
      errors.push(`Row ${id}: missing reviewStatus`);
    } else if (entry.reviewStatus === "approved") {
      if (entry.typedClass === "canonical" || entry.typedClass === "finite") {
        if (Array.isArray(entry.exclusionReasons) && entry.exclusionReasons.length > 0) {
          errors.push(`Row ${id}: typed-eligible approved row cannot have exclusionReasons`);
        }
      } else if (entry.typedClass === "excluded") {
        if (!Array.isArray(entry.exclusionReasons) || entry.exclusionReasons.length === 0) {
          errors.push(`Row ${id}: excluded approved row must state exclusionReasons`);
        }
      }
    }
  }

  // Full-corpus strict mode remains available for historical diagnostics.
  // Core release uses --protect-historical-evidence because E1C/E1D were
  // superseded by the independently reviewed, frozen curated bank. That mode
  // is strict about retaining the exact completed E1A/E1B evidence.
  const approvedCount = reviewedIds.filter((id) => reviewedRows[id]?.reviewStatus === "approved").length;
  console.log(`Sentence Exam Eligibility Audit`);
  console.log(`=================================`);
  console.log(`Total rows in bank : ${sentences.length}`);
  console.log(`Reviewed rows      : ${reviewedIds.length} / ${sentences.length} (${((reviewedIds.length / sentences.length) * 100).toFixed(2)}%)`);
  console.log(`Approved rows      : ${approvedCount} / ${sentences.length} (${((approvedCount / sentences.length) * 100).toFixed(2)}%)`);

  if (protectHistoricalEvidence) {
    if (reviewedIds.length !== PROTECTED_REVIEWED_ROWS) {
      errors.push(
        `Protected historical evidence must contain exactly ${PROTECTED_REVIEWED_ROWS} reviewed rows; found ${reviewedIds.length}`
      );
    }
    if (approvedCount !== PROTECTED_REVIEWED_ROWS) {
      errors.push(
        `Protected historical evidence must contain exactly ${PROTECTED_REVIEWED_ROWS} approved rows; found ${approvedCount}`
      );
    }
    for (let n = 1; n <= sentences.length; n++) {
      const id = `s${String(n).padStart(4, "0")}`;
      const rev = reviewedRows[id];
      if (n <= PROTECTED_REVIEWED_ROWS) {
        if (!rev) errors.push(`Protected historical row ${id} is missing`);
        else if (rev.reviewStatus !== "approved") {
          errors.push(`Protected historical row ${id} reviewStatus is '${rev.reviewStatus}' (not approved)`);
        }
      } else if (rev) {
        errors.push(`Unexpected historical eligibility row ${id} beyond the protected E1A/E1B range`);
      }
    }
  } else if (!allowIncomplete) {
    for (const sRow of sentences) {
      const rev = reviewedRows[sRow.id];
      if (!rev) {
        errors.push(`Unreviewed sentence row ${sRow.id} in strict mode`);
      } else if (rev.reviewStatus !== "approved") {
        errors.push(`Sentence row ${sRow.id} reviewStatus is '${rev.reviewStatus}' (not approved) in strict mode`);
      }
    }
  }

  // Census calculation for each locked floor tag
  console.log(`\nTag Census & Floor Status`);
  console.log(`-------------------------------------------------------------------------------`);
  console.log(`Tag                     Raw   Rev   Excl  DupKeys  Class1  Class2  E_t   M_t   Status`);
  console.log(`-------------------------------------------------------------------------------`);

  let anyFloorFailed = false;

  for (const floorDef of LOCKED_TAG_FLOORS) {
    const tag = floorDef.tag;
    const M_t = floorDef.M_t;

    let rawCount = 0;
    let revCount = 0;
    let exclCount = 0;
    let class1Count = 0;
    let class2Count = 0;

    const approvedTargetKeys = new Set();
    const allApprovedTargetKeysList = [];
    const futureExclReasons = {};

    for (const sRow of sentences) {
      const tags = new Set(sRow.patternTags || []);
      const rev = reviewedRows[sRow.id];

      if (rev && Array.isArray(rev.primaryCompetencies)) {
        for (const c of rev.primaryCompetencies) tags.add(c);
      }

      if (!tags.has(tag)) continue;

      rawCount++;

      if (rev) {
        revCount++;
        if (rev.reviewStatus === "approved") {
          if (rev.typedClass === "excluded") {
            exclCount++;
            if (tag === "future-geoyeyo") {
              for (const r of rev.exclusionReasons || ["unspecified"]) {
                futureExclReasons[r] = (futureExclReasons[r] || 0) + 1;
              }
            }
          } else if (rev.typedClass === "canonical" || rev.typedClass === "finite") {
            if (rev.typedClass === "canonical") class1Count++;
            if (rev.typedClass === "finite") class2Count++;
            approvedTargetKeys.add(rev.canonicalTargetKey);
            allApprovedTargetKeysList.push(rev.canonicalTargetKey);
          }
        }
      }
    }

    const E_t = approvedTargetKeys.size;
    const dupKeysCount = allApprovedTargetKeysList.length - E_t;
    const met = E_t >= M_t;
    if (!met) anyFloorFailed = true;

    const statusStr = met
      ? "OK"
      : protectHistoricalEvidence
        ? "HISTORICAL"
        : allowIncomplete
          ? "PENDING"
          : "FAIL";

    console.log(
      `${tag.padEnd(23)} ${String(rawCount).padStart(5)} ${String(revCount).padStart(5)} ${String(exclCount).padStart(5)} ${String(dupKeysCount).padStart(8)} ${String(class1Count).padStart(7)} ${String(class2Count).padStart(7)} ${String(E_t).padStart(4)} ${String(M_t).padStart(5)}   ${statusStr}`
    );

    // This legacy full-corpus floor report is relevant only in strict census
    // mode. The protected-history release mode uses the curated-bank audits.
    if (tag === "future-geoyeyo" && !met && !allowIncomplete && !protectHistoricalEvidence) {
      console.log(`\n--- FUTURE-TENSE GATE REPORT ---`);
      console.log(`Raw future-geoyeyo rows       : ${rawCount}`);
      console.log(`Excluded count by reason      : ${JSON.stringify(futureExclReasons)}`);
      console.log(`Duplicate canonical targets   : ${dupKeysCount}`);
      console.log(`Class 1 (canonical) count     : ${class1Count}`);
      console.log(`Class 2 (finite) count        : ${class2Count}`);
      console.log(`E_future                      : ${E_t}`);
      console.log(`Deficit to 25                 : ${25 - E_t}`);
      console.log(`🔒 Workstream D owner decision re-triggered`);
      console.log(`--------------------------------\n`);
    }
  }

  if (errors.length > 0) {
    console.error(`\nAudit failed with ${errors.length} error(s):`);
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  if (!allowIncomplete && !protectHistoricalEvidence && anyFloorFailed) {
    console.error(`\nAudit failed: one or more tag floors (E_t < M_t) not satisfied in strict mode.`);
    process.exit(1);
  }

  console.log(`\nAudit passed cleanly.`);
  process.exit(0);
}

// Only run the gate when invoked directly, so the regression test can import
// validateShardIntegrity / EXPECTED_SHARD_RANGES without exiting the process.
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
