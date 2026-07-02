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

  const VALID_REGISTERS = new Set(['everyday', 'polite', 'formal', 'honorific', 'written-formal']);
  const VALID_SPEECH_LEVELS = new Set(['plain', 'polite informal', 'polite formal']);
  const VALID_ORIGIN_TYPES = new Set(['native', 'Sino-Korean', 'loanword', 'hybrid']);
  const VALID_IRREGULAR_FAMILIES = new Set(['ㄷ', 'ㅂ', 'ㅅ', 'ㅎ', '르', '러', 'ㄹ-deletion']);
  const VALID_MORPH_TAGS = new Set([
    'NNG', 'NNB', 'XR', 'NNP', 'NP', 'VV', 'VX', 'VCP', 'VCN', 'VA', 'MAG', 'MAJ',
    'JKS', 'JKC', 'JKG', 'JKO', 'JKB', 'JKV', 'JKQ', 'JX', 'JC',
    'EP', 'EF', 'EC', 'ETN', 'ETM', 'XPN', 'XSN', 'XSA', 'XSV', 'IC'
  ]);

  if (word.register !== undefined && !VALID_REGISTERS.has(word.register)) {
    errors.push(`${label}: invalid register "${word.register}"`);
  }
  if (word.speechLevel !== undefined && !VALID_SPEECH_LEVELS.has(word.speechLevel)) {
    errors.push(`${label}: invalid speechLevel "${word.speechLevel}"`);
  }
  if (word.originType !== undefined && !VALID_ORIGIN_TYPES.has(word.originType)) {
    errors.push(`${label}: invalid originType "${word.originType}"`);
  }
  if (word.irregularFamily !== undefined && !VALID_IRREGULAR_FAMILIES.has(word.irregularFamily)) {
    errors.push(`${label}: invalid irregularFamily "${word.irregularFamily}"`);
  }
  if (word.morphTag !== undefined && !VALID_MORPH_TAGS.has(word.morphTag)) {
    errors.push(`${label}: invalid morphTag "${word.morphTag}"`);
  }
  if (word.senseKey !== undefined && typeof word.senseKey !== 'string') {
    errors.push(`${label}: senseKey must be a string`);
  }
  if (word.senseNo !== undefined && (!Number.isInteger(word.senseNo) || word.senseNo < 1)) {
    errors.push(`${label}: senseNo must be a positive integer`);
  }
  if (word.hanja !== undefined && typeof word.hanja !== 'string') {
    errors.push(`${label}: hanja must be a string`);
  }
  if (word.inflections !== undefined) {
    if (typeof word.inflections !== 'object' || word.inflections === null || Array.isArray(word.inflections)) {
      errors.push(`${label}: inflections must be a key-value object`);
    } else {
      for (const [key, val] of Object.entries(word.inflections)) {
        if (typeof key !== 'string' || typeof val !== 'string') {
          errors.push(`${label}: inflections key and value must be strings`);
        }
      }
    }
  }

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
