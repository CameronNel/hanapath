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
//   - every declared lesson checkpoint can generate at least one question
//     (mirrors app.js makeWordSentenceBlank incl. the inflection fallback,
//     the isFunctionWord gate, and the form-drill conjugation requirements —
//     Track F4; dead checkpoints shipped silently for months before this)

import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const strict = process.argv.includes("--strict");
const planArgIndex = process.argv.indexOf("--plan");
const planV2Requested = planArgIndex >= 0 && process.argv[planArgIndex + 1] === "v2";
const planFile = planV2Requested && existsSync(join(root, "words_lesson_plan_v2.js")) ? "words_lesson_plan_v2.js" : "words_lesson_plan.js";
const planV2 = planV2Requested || readFileSync(join(root, planFile), "utf8").includes("HANAPATH_WORD_SECTIONS");

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["words_curated_core.js", "words_inflect.js", planFile, "audio_map.js"]) {
  vm.runInContext(readFileSync(join(root, file), "utf8"), sandbox, { filename: file });
}

const words = sandbox.window.HANAPATH_CURATED_WORDS;
const lessons = sandbox.window.HANAPATH_WORD_LESSONS;
const sections = sandbox.window.HANAPATH_WORD_SECTIONS;
const units = sandbox.window.HANAPATH_WORD_UNITS;
const allocation = planV2 ? JSON.parse(readFileSync(join(root, "scripts", "curriculum_v2_allocation.json"), "utf8")) : null;

const errors = [];
const warnings = [];
const wordsById = new Map((words || []).map((w) => [w.id, w]));

if (!Array.isArray(words) || words.length === 0) {
  errors.push("window.HANAPATH_CURATED_WORDS is missing or empty");
}
if (!Array.isArray(lessons) || lessons.length === 0) {
  errors.push("window.HANAPATH_WORD_LESSONS is missing or empty");
}
if (planV2 && (!Array.isArray(sections) || !Array.isArray(units))) {
  errors.push("v2 plan must export HANAPATH_WORD_SECTIONS and HANAPATH_WORD_UNITS");
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
  const VALID_HONORIFIC_ROLES = new Set(['subject', 'listener', 'humble']);
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
  // Track D honorific axis (optional, additive)
  if (word.honorificRole !== undefined && !VALID_HONORIFIC_ROLES.has(word.honorificRole)) {
    errors.push(`${label}: invalid honorificRole "${word.honorificRole}"`);
  }
  if (word.contrastWith !== undefined && (!Array.isArray(word.contrastWith) || word.contrastWith.some((x) => typeof x !== 'string' || !x.trim()))) {
    errors.push(`${label}: contrastWith must be an array of non-empty strings`);
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
  if (word.honorificRole !== undefined && !VALID_HONORIFIC_ROLES.has(word.honorificRole)) {
    errors.push(`${label}: invalid honorificRole "${word.honorificRole}"`);
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
  const isCheckpoint = planV2 && lesson.type === "checkpoint";
  if (!lesson.id) errors.push(`lesson ${JSON.stringify(lesson.title)} has no id`);
  else if (lessonIds.has(lesson.id)) errors.push(`duplicate lesson id: ${lesson.id}`);
  else lessonIds.add(lesson.id);

  if (!Array.isArray(lesson.newWordIds) || (!isCheckpoint && lesson.newWordIds.length === 0)) {
    errors.push(`${label}: empty newWordIds`);
    if (!Array.isArray(lesson.newWordIds)) continue;
  }
  for (const wordId of lesson.newWordIds || []) {
    if (!idSet.has(wordId)) errors.push(`${label}: references missing word id ${wordId}`);
  }
  if (isCheckpoint && (!Array.isArray(lesson.reviewWordIds) || lesson.reviewWordIds.length === 0)) {
    errors.push(`${label}: checkpoint requires non-empty reviewWordIds`);
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
  if (!isCheckpoint && lesson.newWordIds.length < 4 && hasFoldableSibling) {
    warnings.push(`${label}: thin lesson with only ${lesson.newWordIds.length} word(s) - consider folding into a same-stage sibling`);
  }
}
for (const lesson of lessons || []) {
  if (planV2) continue;
  const prev = lesson.unlock && lesson.unlock.previousLessonId;
  if (prev && !lessonIds.has(prev)) {
    errors.push(`${lesson.id}: unlock.previousLessonId references missing lesson ${prev}`);
  }
}

if (planV2) {
  const sectionIds = new Set((sections || []).map((section) => section.id));
  const unitById = new Map((units || []).map((unit) => [unit.id, unit]));
  const contentOccurrences = new Map();
  const titleBySection = new Map();
  for (const unit of units || []) {
    if (!sectionIds.has(unit.sectionId)) errors.push(`${unit.id}: invalid sectionId`);
    if (!Array.isArray(unit.lessonIds) || unit.lessonIds.length < 2 || unit.lessonIds.length > 4) errors.push(`${unit.id}: unit must contain 2–4 content lessons`);
    if (!unit.checkpointId || !lessonIds.has(unit.checkpointId)) errors.push(`${unit.id}: checkpointId does not resolve`);
    const siblingNames = (units || []).filter((candidate) => candidate.sectionId === unit.sectionId && candidate.id !== unit.id).map((candidate) => String(candidate.name || "").toLowerCase());
    if (siblingNames.includes(String(unit.name || "").toLowerCase())) errors.push(`${unit.id}: duplicate unit name within section`);
  }
  for (const lesson of lessons || []) {
    if (!unitById.has(lesson.unitId)) errors.push(`${lesson.id}: invalid unitId`);
    const unit = unitById.get(lesson.unitId);
    if (unit && lesson.type === "content" && !unit.lessonIds.includes(lesson.id)) errors.push(`${lesson.id}: content lesson missing from unit.lessonIds`);
    if (lesson.type === "checkpoint") {
      if (lesson.newWordIds.length !== 0) errors.push(`${lesson.id}: checkpoint has newWordIds`);
      const expected = (lessons || []).filter((candidate) => candidate.unitId === lesson.unitId && candidate.type === "content").flatMap((candidate) => candidate.newWordIds);
      if (!Array.isArray(lesson.reviewWordIds) || lesson.reviewWordIds.join("\u0000") !== expected.join("\u0000")) errors.push(`${lesson.id}: reviewWordIds does not exactly equal unit content words`);
    } else {
      const grammarExempt = unit?.track === "grammar";
      if ((!grammarExempt && lesson.newWordIds.length < 5) || lesson.newWordIds.length > 15) errors.push(`${lesson.id}: content lesson has ${lesson.newWordIds.length} words outside hard 5–15 bounds`);
      if (!grammarExempt && (lesson.newWordIds.length < 8 || lesson.newWordIds.length > 12)) warnings.push(`${lesson.id}: content lesson has ${lesson.newWordIds.length} words outside target 8–12 band`);
      for (const id of lesson.newWordIds) contentOccurrences.set(id, (contentOccurrences.get(id) || 0) + 1);
      const titles = titleBySection.get(lesson.stage) || new Set();
      if (titles.has(String(lesson.title || "").toLowerCase())) errors.push(`${lesson.id}: duplicate title within section`);
      titles.add(String(lesson.title || "").toLowerCase()); titleBySection.set(lesson.stage, titles);
      if (/\b(\d+|II|III|IV|V)\b$/i.test(lesson.title || "")) errors.push(`${lesson.id}: title has forbidden numeral/Roman suffix`);
      if ((lesson.title || "").length > 32) warnings.push(`${lesson.id}: title exceeds 32 characters`);
      if ((lesson.subtitle || "").length > 48) warnings.push(`${lesson.id}: subtitle exceeds 48 characters`);
    }
  }
  for (const id of idSet) if (contentOccurrences.get(id) !== 1) errors.push(`v2 word ${id} occurs ${contentOccurrences.get(id) || 0} times in content lessons`);
  for (const unit of units || []) {
    const reviewIds = (lessons || []).filter((lesson) => lesson.unitId === unit.id && lesson.type === "content").flatMap((lesson) => lesson.newWordIds);
    const surfaces = new Map();
    for (const id of reviewIds) { const surface = wordsById.get(id)?.korean; if (!surfaces.has(surface)) surfaces.set(surface, []); surfaces.get(surface).push(id); }
    const duplicates = [...surfaces].filter(([, ids]) => ids.length > 1);
    if (duplicates.length && !unit.senseSafeException) errors.push(`${unit.id}: duplicate Korean surfaces in review words without a documented exception`);
  }
  if (allocation) {
    const surfaceToIds = new Map();
    for (const word of words) { if (!surfaceToIds.has(word.korean)) surfaceToIds.set(word.korean, []); surfaceToIds.get(word.korean).push(word.id); }
    for (const row of allocation.contrastWith?.rows || []) {
      const matches = surfaceToIds.get(row.targetSurface) || [];
      const status = matches.length === 0 ? "unresolved" : matches.length === 1 ? "unique" : "polysemous";
      if (row.status !== status || row.matches.join("\u0000") !== matches.join("\u0000")) errors.push(`contrast resolver drifted for ${row.fromId} → ${row.targetSurface}`);
    }
  }
}

// ── Checkpoint generatability (Track F4) ────────────────────────────────────
// A lesson may declare a checkpoint its words can never satisfy; the app's
// question builder silently skips it and learners just get fewer exercise
// types. 24 such dead checkpoints shipped unnoticed (found by the 2026-07-05
// cold-learner verification) because nothing audited the invariant. The
// predicates below mirror the app's generators; if app.js changes its rules
// (makeWordSentenceBlank / makeConjugatedSentenceBlank, the functionUsage
// gate, or the form-drill target selection), update them together.
const inflect = sandbox.window.HANAPATH_INFLECT;

const BLANK_FORM_NAMES = ["past", "honorific", "formal", "polite", "attributive"];
const BLANK_STEM_ENDINGS = ["고", "지", "서", "면"];
function acceptedAnswers(word) {
  const answers = [];
  if (Array.isArray(word.forms) && word.forms.length) answers.push(...word.forms);
  answers.push(word.korean);
  if (word.display && word.display !== word.korean) answers.push(word.display);
  return answers;
}
function isBlankable(word) {
  if (!word.exampleKo) return false;
  for (const form of acceptedAnswers(word)) {
    if (form && word.exampleKo.includes(form)) return true;
  }
  if (!inflect || (word.pos !== "verb" && word.pos !== "adjective")) return false;
  const candidates = [];
  for (const formName of BLANK_FORM_NAMES) {
    const form = inflect.conjugate(word.korean, word.pos, word.irregularFamily, formName);
    if (form && form !== word.korean) candidates.push(form);
  }
  const polite = inflect.conjugate(word.korean, word.pos, word.irregularFamily, "polite");
  if (polite && polite.endsWith("요")) candidates.push(polite.slice(0, -1));
  const stem = inflect.getStem(word.korean);
  if (stem && stem !== word.korean) {
    for (const ending of BLANK_STEM_ENDINGS) candidates.push(stem + ending);
  }
  for (const form of candidates) {
    if (form.length < 2) continue;
    const at = word.exampleKo.indexOf(form);
    if (at < 0) continue;
    if (at > 0 && !/[\s"“”‘’(【[]/.test(word.exampleKo[at - 1])) continue;
    return true;
  }
  return false;
}
function formDrillTarget(word, production) {
  if (word.lessonGroup === "honorifics" || word.lessonGroup === "irregular-families") return "honorific";
  if (word.lessonGroup === "noun-modification") return "attributive";
  if (production && (word.lessonGroup === "past-tense" || word.lessonGroup === "past-tense-negation")) return "past";
  return "polite";
}
function canFormDrill(word, recognition) {
  if (!inflect || (word.pos !== "verb" && word.pos !== "adjective")) return false;
  const target = formDrillTarget(word, !recognition);
  const form = inflect.conjugate(word.korean, word.pos, word.irregularFamily, target);
  if (!form || form === word.korean) return false;
  if (recognition) return inflect.recognize(form, [word], [target]).length > 0;
  return true;
}
const CHECKPOINT_PREDICATES = {
  "sentence-blank": (word) => isBlankable(word),
  "function-usage": (word) => Boolean(word.isFunctionWord) && isBlankable(word),
  "form-recognition": (word) => canFormDrill(word, true),
  "form-production": (word) => canFormDrill(word, false),
  // The remaining checkpoint types (ko-to-meaning, audio-to-meaning,
  // meaning-to-ko, type-ko) generate for any resolvable word.
};
for (const lesson of lessons || []) {
  if (!Array.isArray(lesson.checkpoints) || !Array.isArray(lesson.newWordIds)) continue;
  const auditWordIds = planV2 && lesson.type === "checkpoint" ? lesson.reviewWordIds : lesson.newWordIds;
  const lessonWords = (auditWordIds || []).map((id) => wordsById.get(id)).filter(Boolean);
  if (!lessonWords.length) continue; // missing ids already reported above
  for (const checkpoint of lesson.checkpoints) {
    const predicate = CHECKPOINT_PREDICATES[checkpoint];
    if (!predicate) continue;
    if (!lessonWords.some(predicate)) {
      errors.push(`${lesson.id}: checkpoint "${checkpoint}" cannot generate a single question from this lesson's words — drop it or fix the words`);
    }
  }
}

// Words never referenced by any lesson are allowed (bank-only), but flag them
// so orphaned content is visible.
const referenced = new Set((lessons || []).flatMap((l) => planV2 && l.type === "checkpoint" ? [] : (l.newWordIds || [])));
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

// ── Audio-map coverage ─────────────────────────────────────────────────────
// Every voiceText/exampleVoiceText the app can speak should resolve in
// window.AUDIO_MAP the same way speak() resolves it: exact trimmed key, or —
// for comma/slash/interpunct-separated sequences — every split part present.
// A miss falls back to robotic speechSynthesis, so it is a warning (fails
  // --strict) unless the sentence is on the explicit allow list below, which
  // records text that is knowingly awaiting a `python generate_assets.py` run.
  const AUDIO_PENDING_ALLOWED = new Set([]);
const audioMap = sandbox.window.AUDIO_MAP;
if (!audioMap || typeof audioMap !== "object") {
  errors.push("window.AUDIO_MAP is missing or not an object");
} else {
  const hasKey = (text) => {
    const t = String(text || "").trim();
    if (!t) return true;
    if (audioMap[t] || audioMap[t.normalize("NFC")]) return true;
    const parts = t.split(/[,\u3001\/·|]+/).map((x) => x.trim()).filter(Boolean);
    return parts.length > 1 && parts.every((x) => audioMap[x] || audioMap[x.normalize("NFC")]);
  };
  let audioMisses = 0;
  for (const word of words || []) {
    for (const field of ["voiceText", "exampleVoiceText"]) {
      const text = word[field];
      if (!text || !HANGUL_RE.test(text)) continue;
      if (hasKey(text)) continue;
      if (AUDIO_PENDING_ALLOWED.has(String(text).trim())) continue;
      audioMisses += 1;
      warnings.push(`${word.id}: ${field} has no audio_map entry: ${JSON.stringify(text)} (run generate_assets.py or add to AUDIO_PENDING_ALLOWED with a reason)`);
    }
  }
  console.log(`Audio coverage: ${audioMisses} unexpected miss(es); ${AUDIO_PENDING_ALLOWED.size} knowingly pending`);
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
