#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";
import { ROOT, SENTENCES_FILE } from "./sentences-bank.mjs";

export function normalizeSentenceExamAnswer(value) {
  return String(value == null ? "" : value)
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ");
}

const ELIGIBILITY_FILE = join(ROOT, "sentence_exam_eligibility.js");

function loadBrowserGlobal(filePath, globalName) {
  const window = {};
  const sandbox = { window, self: window, globalThis: window };
  vm.createContext(sandbox);
  const code = readFileSync(filePath, "utf8");
  vm.runInContext(code, sandbox, { filename: filePath });
  return sandbox.window[globalName];
}

const allowIncomplete = process.argv.includes("--allow-incomplete");

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
  const eligibility = loadBrowserGlobal(ELIGIBILITY_FILE, "HANAPATH_SENTENCE_EXAM_ELIGIBILITY");

  if (!eligibility) {
    console.error("ERROR: HANAPATH_SENTENCE_EXAM_ELIGIBILITY global not found in sentence_exam_eligibility.js");
    process.exit(1);
  }

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

  // Strict check vs allow-incomplete
  const approvedCount = reviewedIds.filter((id) => reviewedRows[id]?.reviewStatus === "approved").length;
  console.log(`Sentence Exam Eligibility Audit`);
  console.log(`=================================`);
  console.log(`Total rows in bank : ${sentences.length}`);
  console.log(`Reviewed rows      : ${reviewedIds.length} / ${sentences.length} (${((reviewedIds.length / sentences.length) * 100).toFixed(2)}%)`);
  console.log(`Approved rows      : ${approvedCount} / ${sentences.length} (${((approvedCount / sentences.length) * 100).toFixed(2)}%)`);

  if (!allowIncomplete) {
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

    const statusStr = met ? "OK" : allowIncomplete ? "PENDING" : "FAIL";

    console.log(
      `${tag.padEnd(23)} ${String(rawCount).padStart(5)} ${String(revCount).padStart(5)} ${String(exclCount).padStart(5)} ${String(dupKeysCount).padStart(8)} ${String(class1Count).padStart(7)} ${String(class2Count).padStart(7)} ${String(E_t).padStart(4)} ${String(M_t).padStart(5)}   ${statusStr}`
    );

    // Special hard-fail check for future-geoyeyo if E_future < 25 and not allowIncomplete
    if (tag === "future-geoyeyo" && !met) {
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

  if (!allowIncomplete && anyFloorFailed) {
    console.error(`\nAudit failed: one or more tag floors (E_t < M_t) not satisfied in strict mode.`);
    process.exit(1);
  }

  console.log(`\nAudit passed cleanly.`);
  process.exit(0);
}

main();
