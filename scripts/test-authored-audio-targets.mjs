#!/usr/bin/env node
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectAuthoredAudioTargets } from "./lib/authored-audio-targets.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const first = collectAuthoredAudioTargets(root);
const second = collectAuthoredAudioTargets(root);
assert.deepEqual(second, first, "authored audio discovery is not deterministic");
assert.ok(first.length > 2000, `expected a broad authored target set, got ${first.length}`);
for (const sample of ["계시세요", "드시세요", "주무시세요", "안 가요", "가지 않아요"]) {
  assert.ok(first.some((entry) => entry.key === sample), `missing expected generated Form Check target ${sample}`);
}
assert.ok(first.some((entry) => entry.categories.some((category) => category.startsWith("sentence-curated-exam-bank:"))),
  "curated Sentence exam bank audio targets were not discovered");
// Examination audio contracts must be traversed, not silently skipped. These
// guards fail closed if the loaded exam globals or the word-exam attempt call
// drift, so a broken exam-discovery path can never pass as "no gap".
assert.ok(first.some((entry) => entry.categories.some((category) => category.startsWith("hangul-mastery-exam:"))),
  "Hangul Mastery examination audio targets were not discovered");
assert.ok(first.some((entry) => entry.categories.some((category) => category.startsWith("word-exam:"))),
  "Core Word examination attempt audio targets were not discovered");
console.log(`Authored audio discovery passed: ${first.length} deterministic targets.`);
