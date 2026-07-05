#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import {
  SENTENCES_FILE,
  buildSentenceBank,
  loadCuratedWords,
  loadExistingSentenceBank,
  serializeSentenceBank,
  writeSentenceBankFile,
} from "./sentences-bank.mjs";

const checkOnly = process.argv.includes("--check");
const fresh = process.argv.includes("--fresh");
const words = loadCuratedWords();
const existing = fresh ? [] : loadExistingSentenceBank();
const { sentences, stats } = buildSentenceBank({ words, existingSentences: existing });
const rendered = serializeSentenceBank(sentences);

if (checkOnly) {
  if (!existsSync(SENTENCES_FILE)) {
    console.error("sentences_core.js is missing");
    process.exit(1);
  }

  const current = readFileSync(SENTENCES_FILE, "utf8");
  if (current !== rendered) {
    console.error("sentences_core.js is out of date");
    process.exit(1);
  }
} else {
  writeSentenceBankFile(sentences);
}

const bandCounts = sentences.reduce(
  (acc, row) => {
    const band = Math.max(1, Math.min(5, Number(row.band) || 1));
    acc[band] = (acc[band] || 0) + 1;
    return acc;
  },
  { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
);

const zeroTagRows = sentences.filter((row) => !Array.isArray(row.patternTags) || row.patternTags.length === 0).length;

console.log(`Words rows: ${stats.sourceRows}`);
console.log(`Sentence rows: ${stats.uniqueSentences}`);
console.log(`Duplicate groups merged: ${stats.duplicateGroups}`);
console.log(`Ids reused: ${stats.reusedIds}`);
console.log(`Ids assigned: ${stats.assignedIds}`);
console.log(`Band distribution: ${JSON.stringify(bandCounts)}`);
console.log(`Rows without tags: ${zeroTagRows}`);
if (fresh) {
  console.log("Existing bank ignored: fresh rebuild mode.");
}
console.log(checkOnly ? "Sentence bank check passed." : "Sentence bank written.");
