#!/usr/bin/env node
// Regression test for the Sentence Mastery examination readiness derivation.
//
// Proves the readiness rows are genuinely derived — not hard-coded — by feeding
// deriveSentenceExamReadiness() controlled inputs and asserting each row flips:
//   - E2 flips on the eligibility corpus (approved === bank rows);
//   - X1 engine and X2 runner/retention flip on the HANAPATH_SENTENCE_EXAM_META
//     runtime marker;
//   - file-gated rows (blueprints also needs its file; seed audit is file-only)
//     stay false while the artifact is absent.
//
// The corresponding file-present flips (blueprints/engine/seed-audit) are also
// exercised end-to-end by staging real artifacts; this test locks the pure,
// FS-independent logic so "machine-derived" is verified, not merely asserted.

import { deriveSentenceExamReadiness } from "./audit-core-release.mjs";

let failures = 0;
function check(name, cond) {
  if (!cond) {
    console.error(`FAIL: ${name}`);
    failures++;
  }
}
const byId = (rows, id) => rows.find((r) => r.id === id);

// --- E2: derived purely from corpus counts ---------------------------------
const e2Done = byId(deriveSentenceExamReadiness({}, 4177, 4177), "eligibility-corpus");
check("E2 present when approved === rows", e2Done.present === true);
check("E2 note is live-computed (4177/4177)", e2Done.note === "4177/4177 rows approved");

const e2Partial = byId(deriveSentenceExamReadiness({}, 4177, 20), "eligibility-corpus");
check("E2 absent when approved < rows", e2Partial.present === false);
check("E2 partial note is live-computed (20/4177)", e2Partial.note === "20/4177 rows approved");

check(
  "E2 absent when bank empty",
  byId(deriveSentenceExamReadiness({}, 0, 0), "eligibility-corpus").present === false
);

// --- X1 engine + X2 runner/retention: derived from the META marker ----------
const landed = deriveSentenceExamReadiness(
  { HANAPATH_SENTENCE_EXAM_META: { engineVersion: 4, runnerVersion: 2, retention: true } },
  4177,
  20
);
check("engine present when META.engineVersion set", byId(landed, "engine").present === true);
check("engine note reflects version", byId(landed, "engine").note === "engine v4");
check("runner present when META.runnerVersion set", byId(landed, "runner").present === true);
check("runner note reflects version", byId(landed, "runner").note === "runner v2");
check("retention present when META.retention true", byId(landed, "retention").present === true);

const empty = deriveSentenceExamReadiness({}, 4177, 20);
check("engine absent without META", byId(empty, "engine").present === false);
check("runner absent without META", byId(empty, "runner").present === false);
check("retention absent without META", byId(empty, "retention").present === false);

// --- File-gated rows stay false while the artifact is absent -----------------
// blueprints needs BOTH the global AND its file; the file is absent in-repo, so
// even with the global present the row must remain false.
const bpGlobalOnly = deriveSentenceExamReadiness(
  { HANAPATH_SENTENCE_EXAM_BLUEPRINTS: [{ id: "x" }] },
  4177,
  20
);
check("blueprints absent when file missing (global alone insufficient)", byId(bpGlobalOnly, "blueprints").present === false);
check("seed-audit absent when file missing", byId(empty, "seed-audit").present === false);

if (failures > 0) {
  console.error(`\nSentence-exam readiness regression FAILED (${failures}).`);
  process.exit(1);
}
console.log("PASS: Sentence Mastery readiness is derived (E2 corpus, X1/X2 META marker, file gating).");
