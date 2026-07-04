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
for (const file of ["words_curated_core.js", "words_inflect.js", "words_lesson_plan.js"]) {
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
const HANJA_RE = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;

const idSet = new Set();
const annotationSourceCounts = {
  register: { explicit: 0, inferred: 0, absent: 0 },
  speechLevel: { explicit: 0, inferred: 0, absent: 0 },
  originType: { explicit: 0, inferred: 0, absent: 0 },
  morphTag: { explicit: 0, inferred: 0, absent: 0 },
  hanja: { explicit: 0, inferred: 0, absent: 0 },
};
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
  const VALID_ANNOTATION_SOURCES = new Set(['explicit', 'inferred', 'absent']);
  const VALID_IRREGULAR_FAMILIES = new Set(['ㄷ', 'ㅂ', 'ㅅ', 'ㅎ', '르', '러', 'ㄹ-deletion']);
  const VALID_MORPH_TAGS = new Set([
    'NNG', 'NNB', 'XR', 'NNP', 'NP', 'NR', 'VV', 'VX', 'VCP', 'VCN', 'VA', 'MAG', 'MAJ', 'MM',
    'JKS', 'JKC', 'JKG', 'JKO', 'JKB', 'JKV', 'JKQ', 'JX', 'JC',
    'EP', 'EF', 'EC', 'ETN', 'ETM', 'XPN', 'XSN', 'XSA', 'XSV', 'IC'
  ]);

  if (!word.register) {
    errors.push(`${label}: missing effective register`);
  } else if (!VALID_REGISTERS.has(word.register)) {
    errors.push(`${label}: invalid register "${word.register}"`);
  }
  if (!word.speechLevel) {
    errors.push(`${label}: missing effective speechLevel`);
  } else if (!VALID_SPEECH_LEVELS.has(word.speechLevel)) {
    errors.push(`${label}: invalid speechLevel "${word.speechLevel}"`);
  }
  if (!word.originType) {
    errors.push(`${label}: missing effective originType`);
  } else if (!VALID_ORIGIN_TYPES.has(word.originType)) {
    errors.push(`${label}: invalid originType "${word.originType}"`);
  }
  if (word.irregularFamily !== undefined && !VALID_IRREGULAR_FAMILIES.has(word.irregularFamily)) {
    errors.push(`${label}: invalid irregularFamily "${word.irregularFamily}"`);
  }
  if (!word.morphTag) {
    errors.push(`${label}: missing effective morphTag`);
  } else if (!VALID_MORPH_TAGS.has(word.morphTag)) {
    errors.push(`${label}: invalid morphTag "${word.morphTag}"`);
  }
  if (!word.annotationSource || typeof word.annotationSource !== 'object' || Array.isArray(word.annotationSource)) {
    errors.push(`${label}: missing annotationSource`);
  } else {
    for (const key of ['register', 'speechLevel', 'originType', 'morphTag', 'hanja']) {
      if (!VALID_ANNOTATION_SOURCES.has(word.annotationSource[key])) {
        errors.push(`${label}: invalid annotationSource.${key} "${word.annotationSource[key]}"`);
      } else {
        annotationSourceCounts[key][word.annotationSource[key]] += 1;
      }
    }
    if (word.hanja && word.annotationSource.hanja !== 'explicit') {
      errors.push(`${label}: hanja annotationSource must be explicit when hanja is present`);
    }
    if (!word.hanja && word.annotationSource.hanja !== 'absent') {
      errors.push(`${label}: hanja annotationSource must be absent when hanja is missing`);
    }
  }
  if (word.senseKey !== undefined && typeof word.senseKey !== 'string') {
    errors.push(`${label}: senseKey must be a string`);
  }
  if (word.senseNo !== undefined && (!Number.isInteger(word.senseNo) || word.senseNo < 1)) {
    errors.push(`${label}: senseNo must be a positive integer`);
  }
  if (word.hanja !== undefined) {
    if (typeof word.hanja !== 'string') {
      errors.push(`${label}: hanja must be a string`);
    } else if (!HANJA_RE.test(word.hanja)) {
      errors.push(`${label}: hanja must contain at least one CJK ideograph`);
    }
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

// Duplicate-content check: two curated rows with the same Korean surface form
// and (near-)identical meaning are almost certainly an accidental re-add
// (e.g. a later authoring batch re-teaching an existing word), not real
// polysemy. Pairs are compared across the whole same-surface group — POS is
// NOT part of the grouping key, because a duplicate previously escaped by
// carrying a different POS label for the same meaning (언제 adverb+pronoun
// "when", 거나 ending+particle "or"). Likewise, distinct senseKeys do NOT
// exempt a pair whose core gloss is identical — a fabricated key pair
// ("stomach"/"belly") previously disguised the same sense as polysemy.
function normalizeMeaningForDupeCheck(meaning) {
  return String(meaning || "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[\/,;]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !["to", "be", "a", "an", "the", "and", "up", "or"].includes(t));
}
function meaningJaccard(a, b) {
  const setA = new Set(a);
  const setB = new Set(b);
  const inter = [...setA].filter((t) => setB.has(t)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : inter / union;
}
// Core gloss: the short meaning with parentheticals and punctuation noise
// stripped. Two rows for the same surface whose core glosses are identical
// teach the same sense — no senseKey or POS relabel makes them two senses.
function coreGlossForDupeCheck(word) {
  return String(word.meaningShort || word.meaning || "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[\/,;.!?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
const byKorean = new Map();
for (const word of words || []) {
  if (!word || !word.korean) continue;
  if (!byKorean.has(word.korean)) byKorean.set(word.korean, []);
  byKorean.get(word.korean).push(word);
}
// A `senseKey` only exempts a PAIR from the duplicate-content check when both
// rows carry one, the two keys are genuinely different, AND the core glosses
// differ — real polysemy means distinct senses get distinct keys and distinct
// meanings. Two rows sharing the identical senseKey, or where only one row in
// the pair is tagged, or whose glosses are identical despite different keys,
// are not exempt: those patterns previously let accidental re-adds hide
// behind a copy-pasted, one-sided, or fabricated senseKey instead of being
// merged. (See #54 cleanup: 74 rows were disguised duplicates; a later pass
// caught 4 more that had slipped through the POS grouping and the
// distinct-senseKey blanket exemption.)
for (const [korean, group] of byKorean) {
  if (group.length < 2) continue;
  for (let i = 0; i < group.length; i += 1) {
    for (let j = i + 1; j < group.length; j += 1) {
      const a = group[i];
      const b = group[j];
      if (a.senseKey && b.senseKey && a.senseKey === b.senseKey) {
        errors.push(`duplicate senseKey: ${a.id} and ${b.id} share korean "${a.korean}" (${a.pos}/${b.pos}) and the identical senseKey "${a.senseKey}" — this is disguised duplicate content, not two senses. Merge the rows or give them genuinely distinct senseKeys.`);
        continue;
      }
      const glossA = coreGlossForDupeCheck(a);
      const glossB = coreGlossForDupeCheck(b);
      if (glossA && glossA === glossB) {
        errors.push(`duplicate content: ${a.id} and ${b.id} share korean "${a.korean}" (${a.pos}/${b.pos}) and the identical core gloss "${glossA}" — distinct senseKeys or POS labels do not make one sense two. Merge the rows.`);
        continue;
      }
      if (a.senseKey && b.senseKey && a.senseKey !== b.senseKey) continue; // genuinely distinct declared senses
      const tokensA = normalizeMeaningForDupeCheck(a.meaning);
      const tokensB = normalizeMeaningForDupeCheck(b.meaning);
      const sim = meaningJaccard(tokensA, tokensB);
      if (sim >= 0.99) {
        errors.push(`duplicate content: ${a.id} and ${b.id} share korean "${a.korean}" (${a.pos}/${b.pos}) and an identical meaning ("${a.meaning}" / "${b.meaning}"). Remove one, or add distinct senseKey/senseNo to both if this is intentional polysemy.`);
      } else if (sim >= 0.4 && a.pos === b.pos) {
        warnings.push(`possible duplicate content: ${a.id} and ${b.id} share korean "${a.korean}" (${a.pos}) with similar meanings ("${a.meaning}" / "${b.meaning}"). Review: merge, or add distinct senseKey/senseNo to both if this is intentional polysemy.`);
      }
    }
  }
}

const stageLessonCounts = new Map();
for (const lesson of lessons || []) {
  if (!lesson.stage) continue;
  stageLessonCounts.set(lesson.stage, (stageLessonCounts.get(lesson.stage) || 0) + 1);
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
  // A hand-authored "Learn N common words" subtitle drifts out of sync with
  // newWordIds whenever a later pass adds/removes/dedupes words (this class
  // of bug shipped silently in PRs #51/#53/#54 - see #58 cleanup). Catch it.
  const subtitleMatch = /^Learn (\d+) common words?$/.exec(lesson.subtitle || "");
  if (subtitleMatch && Number(subtitleMatch[1]) !== lesson.newWordIds.length) {
    errors.push(`${label}: subtitle claims ${subtitleMatch[1]} words but newWordIds has ${lesson.newWordIds.length}`);
  }
  const hasFoldableSibling = lesson.stage && (stageLessonCounts.get(lesson.stage) || 0) > 1;
  if (lesson.newWordIds.length < 4 && hasFoldableSibling) {
    warnings.push(`${label}: thin lesson with only ${lesson.newWordIds.length} word(s) - consider folding into a same-stage sibling`);
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

// Inflection engine verification
const Inflect = sandbox.window.HANAPATH_INFLECT;
if (!Inflect) {
  errors.push("HANAPATH_INFLECT is not loaded in sandbox context");
} else {
  const GOLD_INFLECTIONS = [
    { korean: "가다", pos: "verb", forms: { polite: "가요", formal: "갑니다", past: "갔어요", honorific: "가세요", attributive: "가는" } },
    { korean: "먹다", pos: "verb", forms: { polite: "먹어요", formal: "먹습니다", past: "먹었어요", honorific: "먹으세요", attributive: "먹는" } },
    { korean: "크다", pos: "adjective", forms: { polite: "커요", formal: "큽니다", past: "컸어요", honorific: "크세요", attributive: "큰" } },
    { korean: "작다", pos: "adjective", forms: { polite: "작아요", formal: "작습니다", past: "작았어요", honorific: "작으세요", attributive: "작은" } },
    { korean: "하다", pos: "verb", forms: { polite: "해요", formal: "합니다", past: "했어요", honorific: "하세요", attributive: "하는" } },
    { korean: "듣다", pos: "verb", irregularFamily: "ㄷ", forms: { polite: "들어요", formal: "듣습니다", past: "들었어요", honorific: "들으세요", attributive: "듣는" } },
    { korean: "걷다", pos: "verb", irregularFamily: "ㄷ", forms: { polite: "걸어요", formal: "걷습니다", past: "걸었어요", honorific: "걸으세요", attributive: "걷는" } },
    { korean: "춥다", pos: "adjective", irregularFamily: "ㅂ", forms: { polite: "추워요", formal: "춥습니다", past: "추웠어요", honorific: "추우세요", attributive: "추운" } },
    { korean: "돕다", pos: "verb", irregularFamily: "ㅂ", forms: { polite: "도와요", formal: "돕습니다", past: "도왔어요", honorific: "도우세요", attributive: "돕는" } },
    { korean: "짓다", pos: "verb", irregularFamily: "ㅅ", forms: { polite: "지어요", formal: "짓습니다", past: "지었어요", honorific: "지으세요", attributive: "짓는" } },
    { korean: "빨갛다", pos: "adjective", irregularFamily: "ㅎ", forms: { polite: "빨개요", formal: "빨갛습니다", past: "빨갰어요", honorific: "빨가세요", attributive: "빨간" } },
    { korean: "빠르다", pos: "adjective", irregularFamily: "르", forms: { polite: "빨라요", formal: "빠릅니다", past: "빨랐어요", honorific: "빠르세요", attributive: "빠른" } },
    { korean: "살다", pos: "verb", irregularFamily: "ㄹ-deletion", forms: { polite: "살아요", formal: "삽니다", past: "살았어요", honorific: "사세요", attributive: "사는" } }
  ];

  for (const testCase of GOLD_INFLECTIONS) {
    for (const [formName, expected] of Object.entries(testCase.forms)) {
      const generated = Inflect.conjugate(testCase.korean, testCase.pos, testCase.irregularFamily, formName);
      if (generated !== expected) {
        errors.push(`Inflection engine fail: conjugate(${testCase.korean}, ${formName}) expected "${expected}" but got "${generated}"`);
      }
    }
  }

  if (typeof Inflect.recognize !== "function") {
    errors.push("Inflection engine fail: recognize(surface, candidates, formNames) is missing");
  } else {
    const recognized = Inflect.recognize("들어요", [
      { id: "gold_listen", korean: "듣다", pos: "verb", irregularFamily: "ㄷ" },
      { id: "gold_walk", korean: "걷다", pos: "verb", irregularFamily: "ㄷ" }
    ], ["polite"]);
    const recognizedIds = recognized.map((match) => match.word && match.word.id);
    if (!recognizedIds.includes("gold_listen") || recognizedIds.includes("gold_walk")) {
      errors.push(`Inflection engine fail: recognize("들어요") expected 듣다 only, got ${JSON.stringify(recognizedIds)}`);
    }
  }
}

console.log(`Curated words: ${(words || []).length}`);
console.log(`Lessons: ${(lessons || []).length}`);
console.log(`Annotation sources: ${JSON.stringify(annotationSourceCounts)}`);
console.log(`Errors: ${errors.length}`);
for (const message of errors) console.log(`  ERROR ${message}`);
console.log(`Warnings: ${warnings.length}`);
for (const message of warnings) console.log(`  warn  ${message}`);

if (errors.length || (strict && warnings.length)) {
  process.exit(1);
}
console.log(strict ? "Words data audit passed (strict)." : "Words data audit passed.");
