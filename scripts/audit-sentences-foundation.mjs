#!/usr/bin/env node
import { createRequire } from "node:module";
import { join } from "node:path";
import {
  loadBrowserGlobal,
  loadCuratedWords,
  loadExistingSentenceBank,
  normalizeSentenceKey,
  ROOT,
} from "./sentences-bank.mjs";

const require = createRequire(import.meta.url);
const Inflect = require(join(ROOT, "words_inflect.js"));

const LESSON_FILE = join(ROOT, "sentences_lesson_plan.js");
const SENTENCE_SESSION_LENGTH = 5;
const EXPECTED_LESSON_COUNT = 12;
const EXPECTED_LESSON_SENTENCE_COUNT = 6;
const EXPECTED_LEGACY_APP_ROWS = 53;
const TRANSFORM_TASKS = [
  { id: "present-to-past", sourceForm: "polite", targetForm: "past" },
  { id: "past-to-present", sourceForm: "past", targetForm: "polite" },
  { id: "polite-to-formal", sourceForm: "polite", targetForm: "formal" },
  { id: "polite-to-honorific", sourceForm: "polite", targetForm: "honorific" },
];

const sentences = loadExistingSentenceBank();
const lessons = loadBrowserGlobal(LESSON_FILE, "HANAPATH_SENTENCE_LESSONS") || [];
const words = loadCuratedWords();
const rowsById = new Map(sentences.map((row) => [row.id, row]));
const wordsById = new Map(words.map((word) => [word.id, word]));
const errors = [];
const warnings = [];

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

function buildTransformForRow(row) {
  const focusIds = Array.isArray(row.focusWordIds) ? row.focusWordIds : [];
  for (const wordId of focusIds) {
    const word = wordsById.get(wordId);
    if (!word || (word.pos !== "verb" && word.pos !== "adjective")) continue;
    for (const task of TRANSFORM_TASKS) {
      const sourceSurface = Inflect.inflect(word, task.sourceForm);
      const targetSurface = Inflect.inflect(word, task.targetForm);
      if (!sourceSurface || !targetSurface || sourceSurface === targetSurface) continue;
      if (!String(row.korean || "").includes(sourceSurface)) continue;
      const expected = String(row.korean).replace(sourceSurface, targetSurface);
      if (expected === row.korean) continue;
      return { row, word, task, sourceSurface, targetSurface, expected };
    }
  }
  return null;
}

function auditLessons() {
  if (lessons.length !== EXPECTED_LESSON_COUNT) {
    addError(`Expected ${EXPECTED_LESSON_COUNT} sentence lessons, found ${lessons.length}.`);
  }

  for (const lesson of lessons) {
    const ids = Array.isArray(lesson.sentenceIds) ? lesson.sentenceIds : [];
    if (ids.length !== EXPECTED_LESSON_SENTENCE_COUNT) {
      addError(`${lesson.id}: expected ${EXPECTED_LESSON_SENTENCE_COUNT} sentenceIds, found ${ids.length}.`);
    }
    const seen = new Set();
    for (const id of ids) {
      if (seen.has(id)) addError(`${lesson.id}: duplicate sentence id ${id}.`);
      seen.add(id);
      const row = rowsById.get(id);
      if (!row) {
        addError(`${lesson.id}: missing sentence id ${id}.`);
        continue;
      }
      const lessonTags = Array.isArray(lesson.patternTags) ? lesson.patternTags : [];
      const rowTags = Array.isArray(row.patternTags) ? row.patternTags : [];
      if (!lessonTags.some((tag) => rowTags.includes(tag))) {
        addError(`${lesson.id}: ${id} has no lesson tag match (${rowTags.join(", ")}).`);
      }
      if (row.band > 3) {
        addWarning(`${lesson.id}: ${id} is band ${row.band}; lesson examples should stay short unless intentionally advanced.`);
      }
    }
  }
}

function auditTransforms() {
  const transforms = sentences.map((row) => buildTransformForRow(row)).filter(Boolean);
  const byBand = transforms.reduce((acc, item) => {
    acc[item.row.band] = (acc[item.row.band] || 0) + 1;
    return acc;
  }, {});
  if (transforms.length < SENTENCE_SESSION_LENGTH) {
    addError(`Transform foundation needs at least ${SENTENCE_SESSION_LENGTH} valid candidates; found ${transforms.length}.`);
  }
  for (const band of [1, 2, 3]) {
    if ((byBand[band] || 0) < SENTENCE_SESSION_LENGTH) {
      addWarning(`Transform candidates are thin in band ${band}: ${byBand[band] || 0}.`);
    }
  }
  const duplicateTargets = new Map();
  for (const item of transforms) {
    const key = normalizeSentenceKey(item.expected);
    if (!key) addError(`${item.row.id}: transform produced an empty normalized target.`);
    if (!duplicateTargets.has(key)) duplicateTargets.set(key, []);
    duplicateTargets.get(key).push(`${item.row.id}:${item.task.id}`);
  }
  for (const [key, refs] of duplicateTargets.entries()) {
    if (refs.length > 1) addWarning(`Duplicate transform target ${key}: ${refs.join(", ")}`);
  }
  return { transforms, byBand };
}

function auditLegacyRows() {
  const legacyRows = sentences.filter((row) => row.source === "legacy-app");
  if (legacyRows.length !== EXPECTED_LEGACY_APP_ROWS) {
    addWarning(`Expected ${EXPECTED_LEGACY_APP_ROWS} legacy-app rows, found ${legacyRows.length}. If Track I changed, update this audit.`);
  }
}

auditLessons();
const transformStats = auditTransforms();
auditLegacyRows();

console.log("Sentences foundation audit");
console.log("==========================");
console.log(`Sentence rows: ${sentences.length}`);
console.log(`Lesson units: ${lessons.length}`);
console.log(`Lesson references: ${lessons.reduce((sum, lesson) => sum + (lesson.sentenceIds || []).length, 0)}`);
console.log(`Transform candidates: ${transformStats.transforms.length}`);
console.log(`Transform candidates by band: ${JSON.stringify(transformStats.byBand)}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
for (const warning of warnings) console.log(`Warning: ${warning}`);
for (const error of errors) console.log(`Error: ${error}`);

if (errors.length) {
  process.exitCode = 1;
} else {
  console.log("Sentences foundation audit passed.");
}
