#!/usr/bin/env node
// Regression test for the Sentence Mastery examination readiness derivation.
//
// Proves the rows are derived rather than hand-maintained:
//   - CB5 flips only for an enabled, immutable 288/320 curated bank with a
//     matching frozen revision and all four committed SHA-256 hashes;
//   - X1 engine and X2 runner/retention flip on the runtime meta marker;
//   - file-gated rows remain false while their artifacts are absent.

import { deriveSentenceExamReadiness } from "./audit-core-release.mjs";

let failures = 0;
function check(name, cond) {
  if (!cond) {
    console.error(`FAIL: ${name}`);
    failures++;
  }
}
const byId = (rows, id) => rows.find((row) => row.id === id);

function frozenBank({ enabled = true, typed = 288, recognition = 320, revision = "curated-v1" } = {}) {
  const entries = [
    ...Array.from({ length: typed }, (_, index) => ({ id: `t${index}`, mode: "typed" })),
    ...Array.from({ length: recognition }, (_, index) => ({ id: `r${index}`, mode: "recognition" })),
  ];
  const freeze = {
    revision,
    entryCount: entries.length,
    typedCount: typed,
    recognitionCount: recognition,
    hashes: {
      promptsSha256: "a".repeat(64),
      answersSha256: "b".repeat(64),
      typedReviewsSha256: "c".repeat(64),
      entriesSha256: "d".repeat(64),
    },
  };
  const bank = { revision, enabled, freezeState: "frozen", freeze, entries };
  for (const entry of entries) Object.freeze(entry);
  Object.freeze(entries);
  Object.freeze(freeze.hashes);
  Object.freeze(freeze);
  Object.freeze(bank);
  return { bank, freeze };
}

const readyFixture = frozenBank();
const cb5Ready = deriveSentenceExamReadiness({
  HANAPATH_SENTENCE_EXAM_CURATED_BANK: readyFixture.bank,
  HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE: readyFixture.freeze,
});
check("CB5 present for exact enabled frozen bank", byId(cb5Ready, "curated-bank").present === true);
check(
  "CB5 note reports exact pool and revision",
  byId(cb5Ready, "curated-bank").note === "288 typed / 320 recognition — curated-v1"
);

const disabledFixture = frozenBank({ enabled: false });
check(
  "CB5 absent when bank disabled",
  byId(deriveSentenceExamReadiness({
    HANAPATH_SENTENCE_EXAM_CURATED_BANK: disabledFixture.bank,
    HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE: disabledFixture.freeze,
  }), "curated-bank").present === false
);
const shortFixture = frozenBank({ typed: 287 });
check(
  "CB5 absent when exact pool target drifts",
  byId(deriveSentenceExamReadiness({
    HANAPATH_SENTENCE_EXAM_CURATED_BANK: shortFixture.bank,
    HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE: shortFixture.freeze,
  }), "curated-bank").present === false
);
check(
  "CB5 absent without bank",
  byId(deriveSentenceExamReadiness({}), "curated-bank").present === false
);

const landed = deriveSentenceExamReadiness({
  HANAPATH_SENTENCE_EXAM_CURATED_BANK: readyFixture.bank,
  HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE: readyFixture.freeze,
  HANAPATH_SENTENCE_EXAM_META: { engineVersion: 4, runnerVersion: 2, retention: true },
});
check("engine present when META.engineVersion set", byId(landed, "engine").present === true);
check("engine note reflects version", byId(landed, "engine").note === "engine v4");
check("runner present when META.runnerVersion set", byId(landed, "runner").present === true);
check("runner note reflects version", byId(landed, "runner").note === "runner v2");
check("retention present when META.retention true", byId(landed, "retention").present === true);

const empty = deriveSentenceExamReadiness({
  HANAPATH_SENTENCE_EXAM_CURATED_BANK: readyFixture.bank,
  HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE: readyFixture.freeze,
});
check("engine absent without META", byId(empty, "engine").present === false);
check("runner absent without META", byId(empty, "runner").present === false);
check("retention absent without META", byId(empty, "retention").present === false);

const bpGlobalOnly = deriveSentenceExamReadiness({
  HANAPATH_SENTENCE_EXAM_CURATED_BANK: readyFixture.bank,
  HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE: readyFixture.freeze,
  HANAPATH_SENTENCE_EXAM_BLUEPRINTS: [{ id: "x" }],
});
check("blueprints absent when file missing", byId(bpGlobalOnly, "blueprints").present === false);
check("seed audit absent when file missing", byId(empty, "seed-audit").present === false);

if (failures > 0) {
  console.error(`\nSentence-exam readiness regression FAILED (${failures}).`);
  process.exit(1);
}
console.log("PASS: Sentence Mastery readiness is derived from CB5 frozen bank and X1/X2 artifacts.");
