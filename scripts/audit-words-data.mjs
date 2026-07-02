#!/usr/bin/env node
// Audit the curated Words data files (words_curated_core.js, words_lesson_plan.js).
//
// Usage:
//   node scripts/audit-words-data.mjs           # report, exit 0 unless errors
//   node scripts/audit-words-data.mjs --strict  # warnings also fail the run
//
// Loads the two plain-browser data files in a vm sandbox with a stub `window`
// (same pattern as scripts/audit-alphabet-audio.mjs) and validates:
//   - no duplicate curated IDs
//   - no missing Korean / meaning / POS / lesson group
//   - voiceText and exampleVoiceText present and Korean (no English-only audio)
//   - core items have examples with example voice text
//   - function words carry forms or a usage note
//   - lessons reference only existing word IDs and have non-empty newWordIds
//   - lesson unlock chain references existing lessons

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["words_curated_core.js", "words_lesson_plan.js"]) {
  vm.runInContext(readFileSync(join(root, file), "utf8"), sandbox, { filename: file });
}

const words = sandbox.window.HANAPATH_CURATED_WORDS;
const lessons = sandbox.window.HANAPATH_WORD_LESSONS;

const errors = [];
const warnings = [];

if (!Array.isArray(words) || words.length === 0) {
  errors.push("window.HANAPATH_CURATED_WORDS is missing or empty");
}
if (!Array.isArray(lessons) || lessons.length === 0) {
  errors.push("window.HANAPATH_WORD_LESSONS is missing or empty");
}

const HANGUL_RE = /[가-힣ㄱ-ㅎㅏ-ㅣ]/;
const LATIN_RE = /[a-zA-Z]/;

const idSet = new Set();
for (const word of words || []) {
  const label = word.id || word.korean || "(unknown entry)";
  if (!word.id) errors.push(`entry ${JSON.stringify(word.korean)} has no id`);
  else if (idSet.has(word.id)) errors.push(`duplicate curated id: ${word.id}`);
  else idSet.add(word.id);

  if (!word.korean || !HANGUL_RE.test(word.korean)) errors.push(`${label}: missing or non-Hangul korean`);
  if (!word.meaning) errors.push(`${label}: missing meaning`);
  if (!word.pos) errors.push(`${label}: missing pos`);
  if (!word.lessonGroup) errors.push(`${label}: missing lessonGroup`);
  if (!word.pronunciation) errors.push(`${label}: missing pronunciation`);

  if (!word.voiceText) errors.push(`${label}: missing voiceText`);
  else if (!HANGUL_RE.test(word.voiceText)) errors.push(`${label}: voiceText has no Hangul: ${JSON.stringify(word.voiceText)}`);
  else if (LATIN_RE.test(word.voiceText)) errors.push(`${label}: voiceText contains English letters: ${JSON.stringify(word.voiceText)}`);

  const isCore = (word.priority || "core") === "core";
  if (!word.exampleKo) {
    (isCore ? errors : warnings).push(`${label}: missing exampleKo`);
  } else if (!HANGUL_RE.test(word.exampleKo)) {
    errors.push(`${label}: exampleKo has no Hangul`);
  }
  if (!word.exampleEn) (isCore ? errors : warnings).push(`${label}: missing exampleEn`);
  if (isCore) {
    if (!word.exampleVoiceText) errors.push(`${label}: core item missing exampleVoiceText`);
    else if (!HANGUL_RE.test(word.exampleVoiceText)) errors.push(`${label}: exampleVoiceText has no Hangul`);
    else if (LATIN_RE.test(word.exampleVoiceText)) errors.push(`${label}: exampleVoiceText contains English letters`);
  }

  if (word.isFunctionWord) {
    const hasForms = Array.isArray(word.forms) && word.forms.length > 0;
    if (!hasForms && !word.usageNote) {
      errors.push(`${label}: function word needs forms or a usageNote`);
    }
    if (!word.usageNote) warnings.push(`${label}: function word has no usageNote`);
  }
}

const lessonIds = new Set();
for (const lesson of lessons || []) {
  const label = lesson.id || lesson.title || "(unknown lesson)";
  if (!lesson.id) errors.push(`lesson ${JSON.stringify(lesson.title)} has no id`);
  else if (lessonIds.has(lesson.id)) errors.push(`duplicate lesson id: ${lesson.id}`);
  else lessonIds.add(lesson.id);

  if (!Array.isArray(lesson.newWordIds) || lesson.newWordIds.length === 0) {
    errors.push(`${label}: empty newWordIds`);
    continue;
  }
  for (const wordId of lesson.newWordIds) {
    if (!idSet.has(wordId)) errors.push(`${label}: references missing word id ${wordId}`);
  }
  if (!Array.isArray(lesson.checkpoints) || lesson.checkpoints.length === 0) {
    warnings.push(`${label}: no checkpoints`);
  }
}
for (const lesson of lessons || []) {
  const prev = lesson.unlock && lesson.unlock.previousLessonId;
  if (prev && !lessonIds.has(prev)) {
    errors.push(`${lesson.id}: unlock.previousLessonId references missing lesson ${prev}`);
  }
}

// Words never referenced by any lesson are allowed (bank-only), but flag them
// so orphaned content is visible.
const referenced = new Set((lessons || []).flatMap((l) => l.newWordIds || []));
for (const word of words || []) {
  if (word.id && !referenced.has(word.id)) warnings.push(`${word.id}: not used by any lesson`);
}

console.log(`Curated words: ${(words || []).length}`);
console.log(`Lessons: ${(lessons || []).length}`);
console.log(`Errors: ${errors.length}`);
for (const message of errors) console.log(`  ERROR ${message}`);
console.log(`Warnings: ${warnings.length}`);
for (const message of warnings) console.log(`  warn  ${message}`);

if (errors.length || (strict && warnings.length)) {
  process.exit(1);
}
console.log(strict ? "Words data audit passed (strict)." : "Words data audit passed.");
