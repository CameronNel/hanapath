#!/usr/bin/env node
import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
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

const V1_LESSON_FILE = join(ROOT, "sentences_lesson_plan.js");
const V2_LESSON_FILE = join(ROOT, "sentences_lesson_plan_v2.js");
const NAMES_FILE = join(ROOT, "scripts", "sentences_curriculum_v2_names.json");
const WORDS_PLAN_FILE = join(ROOT, "words_lesson_plan.js");

const SENTENCE_SESSION_LENGTH = 5;
const EXPECTED_LESSON_COUNT_V1 = 12;
const EXPECTED_LESSON_SENTENCE_COUNT_V1 = 6;
const EXPECTED_LEGACY_APP_ROWS = 53;

const TRANSFORM_TASKS = [
  { id: "present-to-past", sourceForm: "polite", targetForm: "past" },
  { id: "past-to-present", sourceForm: "past", targetForm: "polite" },
  { id: "polite-to-formal", sourceForm: "polite", targetForm: "formal" },
  { id: "polite-to-honorific", sourceForm: "polite", targetForm: "honorific" },
];

const sentences = loadExistingSentenceBank();
const words = loadCuratedWords();
const rowsById = new Map(sentences.map((row) => [row.id, row]));
const wordsById = new Map(words.map((word) => [word.id, word]));

const errors = [];
const warnings = [];
let isStrict = process.argv.includes("--strict");

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
    if ((byBand[band] || 0) < 5) {
      if (existsSync(V2_LESSON_FILE)) {
        addError(`v2 Audit: Transform candidates in band ${band} must be at least 5; found ${byBand[band] || 0}.`);
      } else {
        addWarning(`Transform candidates are thin in band ${band}: ${byBand[band] || 0}.`);
      }
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

// v1 audit execution
function runV1Audit() {
  const lessons = loadBrowserGlobal(V1_FILE, "HANAPATH_SENTENCE_LESSONS") || [];
  if (lessons.length !== EXPECTED_LESSON_COUNT_V1) {
    addError(`Expected ${EXPECTED_LESSON_COUNT_V1} sentence lessons, found ${lessons.length}.`);
  }
  for (const lesson of lessons) {
    const ids = Array.isArray(lesson.sentenceIds) ? lesson.sentenceIds : [];
    if (ids.length !== EXPECTED_LESSON_SENTENCE_COUNT_V1) {
      addError(`${lesson.id}: expected ${EXPECTED_LESSON_SENTENCE_COUNT_V1} sentenceIds, found ${ids.length}.`);
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
  auditTransforms();
  auditLegacyRows();
}

// v2 audit execution
function runV2Audit() {
  const sections = loadBrowserGlobal(V2_LESSON_FILE, "HANAPATH_SENTENCE_SECTIONS") || [];
  const units = loadBrowserGlobal(V2_LESSON_FILE, "HANAPATH_SENTENCE_UNITS") || [];
  const lessons = loadBrowserGlobal(V2_LESSON_FILE, "HANAPATH_SENTENCE_LESSONS") || [];
  const snapshot = loadBrowserGlobal(V2_LESSON_FILE, "HANAPATH_SENTENCE_V1_SNAPSHOT") || [];

  const wordUnits = loadBrowserGlobal(WORDS_PLAN_FILE, "HANAPATH_WORD_UNITS") || [];
  const wordSections = loadBrowserGlobal(WORDS_PLAN_FILE, "HANAPATH_WORD_SECTIONS") || [];
  const wordLessons = loadBrowserGlobal(WORDS_PLAN_FILE, "HANAPATH_WORD_LESSONS") || [];

  const names = existsSync(NAMES_FILE) ? JSON.parse(readFileSync(NAMES_FILE, "utf8")) : null;

  // 1. Units map 1:1
  if (units.length !== 75) {
    addError(`v2 Audit: Expected exactly 75 units, found ${units.length}.`);
  }
  if (wordUnits.length !== 75) {
    addError(`v2 Audit: Expected exactly 75 Word units, found ${wordUnits.length}.`);
  }
  for (let i = 0; i < 75; i++) {
    const unit = units[i];
    const wUnit = wordUnits[i];
    if (unit && wUnit) {
      if (unit.twinUnitId !== wUnit.id) {
        addError(`v2 Audit: Unit ordering mismatch at index ${i}: sentence unit is ${unit.id} (twin: ${unit.twinUnitId}), word unit is ${wUnit.id}.`);
      }
    }
  }

  // 2. Sections checks
  if (sections.length !== 8) {
    addError(`v2 Audit: Expected exactly 8 sections, found ${sections.length}.`);
  }
  const sectionIds = new Set(sections.map(s => s.id));
  const unitIds = new Set(units.map(u => u.id));
  const lessonIds = new Set(lessons.map(l => l.id));

  // 3. Referential integrity
  const lessonToUnitMap = new Map();
  for (const lesson of lessons) {
    if (!lesson.unitId || !unitIds.has(lesson.unitId)) {
      addError(`v2 Audit: Lesson ${lesson.id} has invalid unitId ${lesson.unitId}.`);
    }
    lessonToUnitMap.set(lesson.id, lesson.unitId);
  }

  for (const unit of units) {
    if (!unit.sectionId || !sectionIds.has(unit.sectionId)) {
      addError(`v2 Audit: Unit ${unit.id} has invalid sectionId ${unit.sectionId}.`);
    }
    const twinUnitExists = wordUnits.some(wu => wu.id === unit.twinUnitId);
    if (!twinUnitExists) {
      addError(`v2 Audit: Unit ${unit.id} has unresolvable twinUnitId ${unit.twinUnitId}.`);
    }
    const twinSect = wordSections.find(ws => ws.id === unit.sectionId.replace(/^sn/, "s"));
    if (!twinSect) {
      addError(`v2 Audit: Unit ${unit.id} twin section resolves to invalid Word section.`);
    }

    const ids = Array.isArray(unit.lessonIds) ? unit.lessonIds : [];
    for (const lid of ids) {
      if (!lessonIds.has(lid)) {
        addError(`v2 Audit: Unit ${unit.id} lists missing lesson ${lid}.`);
      }
    }
    if (!lessonIds.has(unit.checkpointId)) {
      addError(`v2 Audit: Unit ${unit.id} lists missing checkpoint ${unit.checkpointId}.`);
    }
  }

  // 4. Content lesson exact mapping
  const contentLessons = lessons.filter(l => l.type === "content");
  const checkpointLessons = lessons.filter(l => l.type === "checkpoint");

  if (checkpointLessons.length !== 75) {
    addError(`v2 Audit: Expected exactly 75 checkpoints, found ${checkpointLessons.length}.`);
  }

  const lessonOccurrence = new Map();
  for (const unit of units) {
    const ids = Array.isArray(unit.lessonIds) ? unit.lessonIds : [];
    for (const lid of ids) {
      lessonOccurrence.set(lid, (lessonOccurrence.get(lid) || 0) + 1);
    }
  }
  for (const lesson of contentLessons) {
    const count = lessonOccurrence.get(lesson.id) || 0;
    if (count !== 1) {
      addError(`v2 Audit: Content lesson ${lesson.id} must be in exactly one unit's lessonIds; found in ${count}.`);
    }
  }

  // 5. Coverage
  const rowOccurrence = new Map();
  for (const lesson of contentLessons) {
    const ids = Array.isArray(lesson.sentenceIds) ? lesson.sentenceIds : [];
    const seen = new Set();
    for (const id of ids) {
      if (seen.has(id)) {
        addError(`v2 Audit: Lesson ${lesson.id} has duplicate sentence id ${id}.`);
      }
      seen.add(id);
      if (!rowsById.has(id)) {
        addError(`v2 Audit: Lesson ${lesson.id} references missing sentence ${id}.`);
      }
      rowOccurrence.set(id, (rowOccurrence.get(id) || 0) + 1);
    }
  }

  for (const row of sentences) {
    const count = rowOccurrence.get(row.id) || 0;
    if (count !== 1) {
      addError(`v2 Audit: Sentence row ${row.id} must belong to exactly one content lesson; found in ${count}.`);
    }
  }

  // 6. Checkpoint equality & size
  for (const lesson of checkpointLessons) {
    const unit = units.find(u => u.checkpointId === lesson.id);
    if (!unit) {
      addError(`v2 Audit: Checkpoint ${lesson.id} has no matching unit.`);
      continue;
    }
    const unitLessons = contentLessons.filter(l => l.unitId === unit.id);
    const expectedIds = unitLessons.flatMap(l => l.sentenceIds).sort((a, b) => a.localeCompare(b));
    const actualIds = [...(lesson.reviewSentenceIds || [])].sort((a, b) => a.localeCompare(b));

    if (expectedIds.length !== actualIds.length || !expectedIds.every((val, index) => val === actualIds[index])) {
      addError(`v2 Audit: Checkpoint ${lesson.id} reviewSentenceIds does not match the union of content rows.`);
    }

    const n = expectedIds.length;
    const expectedMin = Math.min(12, n);
    const expectedMax = Math.min(18, Math.max(12, n));
    if (!lesson.promptBounds || lesson.promptBounds.min !== expectedMin || lesson.promptBounds.max !== expectedMax) {
      addError(`v2 Audit: Checkpoint ${lesson.id} has invalid promptBounds: ${JSON.stringify(lesson.promptBounds)} (expected min ${expectedMin}, max ${expectedMax}).`);
    }
    if (lesson.sentenceIds && lesson.sentenceIds.length !== 0) {
      addError(`v2 Audit: Checkpoint ${lesson.id} sentenceIds must be empty.`);
    }
  }

  // 7. Sorting
  for (const lesson of lessons) {
    const ids = lesson.type === "checkpoint" ? lesson.reviewSentenceIds : lesson.sentenceIds;
    const sorted = [...ids].sort((a, b) => a.localeCompare(b));
    if (!ids.every((val, index) => val === sorted[index])) {
      addError(`v2 Audit: Lesson ${lesson.id} sentenceIds are not sorted in ascending order.`);
    }
  }

  // 8. Word coverage and cumulative subset check
  const wordUnitIndexMap = new Map(wordUnits.map((u, i) => [u.id, i]));
  const wordLessonsByUnitIndex = [];
  for (let i = 0; i < 75; i++) {
    wordLessonsByUnitIndex[i] = wordLessons.filter(l => l.type === "content" && wordUnitIndexMap.get(l.unitId) <= i);
  }

  const wordsUpToUnitIndex = wordLessonsByUnitIndex.map(lessons => {
    return new Set(lessons.flatMap(l => l.newWordIds || []));
  });

  // Reassignments list to exempt
  const exemptRowIds = new Set(["s0045", "s2021", "s2041", "s2045"]);

  // Track unit-level focus word coverage by twin + ancestors + prior sections
  const unitWordIdsMap = new Map();
  for (const wu of wordUnits) {
    const sectionIndex = wordSections.find(s => s.id === wu.sectionId)?.order || 1;
    const ancestorUnitIds = new Set();
    const collectAncestors = (uid) => {
      if (!uid) return;
      ancestorUnitIds.add(uid);
      const parent = wordUnits.find(u => u.id === uid);
      if (parent && parent.prerequisiteUnitId) {
        collectAncestors(parent.prerequisiteUnitId);
      }
    };
    collectAncestors(wu.id);

    const allowedWords = new Set();
    for (const otherWu of wordUnits) {
      const otherSectionIndex = wordSections.find(s => s.id === otherWu.sectionId)?.order || 1;
      if (otherSectionIndex < sectionIndex || ancestorUnitIds.has(otherWu.id)) {
        const uLessons = wordLessons.filter(l => l.type === "content" && l.unitId === otherWu.id);
        for (const wl of uLessons) {
          for (const wid of wl.newWordIds || []) allowedWords.add(wid);
        }
      }
    }
    unitWordIdsMap.set(wu.id, allowedWords);
  }

  for (const lesson of contentLessons) {
    const uId = lesson.unitId;
    const wUnitId = uId.replace(/^sn/, "s");
    const twinIndex = wordUnitIndexMap.get(wUnitId);
    const twinAllowedWords = wordsUpToUnitIndex[twinIndex] || new Set();
    const twinWordsPlusAncestors = unitWordIdsMap.get(wUnitId) || new Set();

    for (const sid of lesson.sentenceIds) {
      const row = rowsById.get(sid);
      if (!row) continue;
      const focusIds = Array.isArray(row.focusWordIds) ? row.focusWordIds : [];

      // i+1 Check (Hard Error)
      if (!exemptRowIds.has(row.id)) {
        for (const wid of focusIds) {
          if (!twinAllowedWords.has(wid)) {
            addError(`v2 Audit: Sentence ${row.id} in unit ${uId} requires focus word ${wid} which is not introduced up to twin unit ${wUnitId} (index ${twinIndex}).`);
          }
        }
      }

      // Twin + Ancestor + Prior Section Check (Warning)
      if (!exemptRowIds.has(row.id)) {
        for (const wid of focusIds) {
          if (!twinWordsPlusAncestors.has(wid)) {
            addWarning(`v2 Audit: Sentence ${row.id} in unit ${uId} requires focus word ${wid} which is not covered by twin unit ${wUnitId}, ancestors, or prior sections.`);
          }
        }
      }
    }
  }

  // 9. Names metadata
  if (!names) {
    addError(`v2 Audit: Names manifest is missing.`);
  } else {
    const lessonTitleMap = new Map();

    // Validate units
    for (const unit of units) {
      const nameMeta = names.units[unit.id];
      if (!nameMeta) {
        addError(`v2 Audit: Unit ${unit.id} has no entry in sentences_curriculum_v2_names.json.`);
        continue;
      }
      if (nameMeta.emoji === "✏️") {
        addWarning(`v2 Audit: Unit ${unit.id} name uses placeholder emoji ✏️.`);
      }
    }

    // Validate lessons
    for (const lesson of lessons) {
      if (lesson.type === "checkpoint") continue;
      const nameMeta = names.lessons[lesson.id];
      if (!nameMeta) {
        addError(`v2 Audit: Lesson ${lesson.id} has no entry in sentences_curriculum_v2_names.json.`);
        continue;
      }
      const title = nameMeta.title || "";
      const subtitle = nameMeta.subtitle || "";
      const goal = nameMeta.goal || "";

      // Global title uniqueness
      const lowerTitle = title.toLowerCase();
      if (lessonTitleMap.has(lowerTitle)) {
        addError(`v2 Audit: Lesson title "${title}" is not globally unique (found in ${lessonTitleMap.get(lowerTitle)} and ${lesson.id}).`);
      }
      lessonTitleMap.set(lowerTitle, lesson.id);

      // Suffix ban
      if (/\b(\d+|II|III|IV|V)\b$/.test(title)) {
        addError(`v2 Audit: Lesson ${lesson.id} title "${title}" has numeral/Roman suffix.`);
      }

      // Title length caps
      if (title.length > 32) {
        addWarning(`v2 Audit: Lesson ${lesson.id} title "${title}" exceeds 32 characters.`);
      }
      if (subtitle.length > 48) {
        addWarning(`v2 Audit: Lesson ${lesson.id} subtitle "${subtitle}" exceeds 48 characters.`);
      }

      // Goal Outcome Sentence
      if (typeof goal !== "string" || !goal.endsWith(".")) {
        addError(`v2 Audit: Lesson ${lesson.id} goal must be one outcome sentence ending with a period.`);
      }
    }
  }

  // 10. Tag coverage
  for (const lesson of contentLessons) {
    const lessonTags = Array.isArray(lesson.patternTags) ? lesson.patternTags : [];
    let hasTagMatch = false;
    for (const sid of lesson.sentenceIds) {
      const row = rowsById.get(sid);
      if (!row) continue;
      const rowTags = Array.isArray(row.patternTags) ? row.patternTags : [];
      if (lessonTags.some(t => rowTags.includes(t))) {
        hasTagMatch = true;
        break;
      }
    }
    if (!hasTagMatch) {
      addError(`v2 Audit: Lesson ${lesson.id} does not have tag coverage (no sentence contains any of the target pattern tags [${lessonTags.join(", ")}]).`);
    }

    // Subset check for patternTags
    const lessonRowTags = new Set(lesson.sentenceIds.flatMap(sid => rowsById.get(sid)?.patternTags || []));
    for (const tag of lessonTags) {
      if (!lessonRowTags.has(tag)) {
        addWarning(`v2 Audit: Lesson ${lesson.id} target patternTag "${tag}" is not present in any of the lesson's rows.`);
      }
    }
  }

  // 11. Drill plans and duplicate surface check
  for (const lesson of contentLessons) {
    const ids = Array.isArray(lesson.sentenceIds) ? lesson.sentenceIds : [];
    const L = ids.length;

    if (L < 3 || L > 9) {
      addError(`v2 Audit: Lesson ${lesson.id} size is outside bounds: must be 3-9, found ${L}.`);
    } else if (L < 4 || L > 7) {
      addWarning(`v2 Audit: Lesson ${lesson.id} size is ${L}; expected 4-7 rows.`);
    }

    const seenKorean = new Set();
    for (const sid of ids) {
      const row = rowsById.get(sid);
      if (!row) continue;
      const key = normalizeSentenceKey(row.korean);
      if (seenKorean.has(key)) {
        addError(`v2 Audit: Lesson ${lesson.id} has duplicate Korean sentence surface "${row.korean}".`);
      }
      seenKorean.add(key);
    }

    const drills = Array.isArray(lesson.drillPlan) ? lesson.drillPlan : [];
    if (drills.length !== L) {
      addError(`v2 Audit: Lesson ${lesson.id} drillPlan length ${drills.length} does not match sentenceIds length ${L}.`);
    }

    let translateCount = 0;
    for (const drill of drills) {
      if (!["translate", "build", "listen", "shadow", "transform"].includes(drill.mode)) {
        addError(`v2 Audit: Lesson ${lesson.id} drill mode "${drill.mode}" is invalid.`);
      }
      if (drill.mode === "translate") {
        translateCount++;
      }
      if (drill.mode === "transform") {
        const row = rowsById.get(drill.sentenceId);
        if (row && row.band < 3) {
          addError(`v2 Audit: Lesson ${lesson.id} drill transforms row ${row.id} which has band ${row.band} (requires band >= 3).`);
        }
      }
    }

    if (translateCount / L < 0.5) {
      addWarning(`v2 Audit: Lesson ${lesson.id} has less than 50% translate drills (${translateCount}/${L}).`);
    }
  }

  // 12. Snapshot verbatim match
  const legacyLessons = loadBrowserGlobal(V1_LESSON_FILE, "HANAPATH_SENTENCE_LESSONS") || [];
  if (snapshot.length !== legacyLessons.length) {
    addError(`v2 Audit: Legacy snapshot length mismatch.`);
  } else {
    for (let i = 0; i < legacyLessons.length; i++) {
      const a = legacyLessons[i];
      const b = snapshot[i];
      if (JSON.stringify(a) !== JSON.stringify(b)) {
        addError(`v2 Audit: Legacy snapshot mismatch at index ${i} (${a.id} vs ${b.id}).`);
      }
    }
  }

  auditTransforms();
  auditLegacyRows();
}

// Check which audit to run based on v2 file presence
const v2Exists = existsSync(V2_LESSON_FILE);
console.log(`Sentences foundation audit: running ${v2Exists ? "v2" : "v1"} checks`);

if (v2Exists) {
  runV2Audit();
} else {
  runV1Audit();
}

// Print results
console.log("Sentences foundation audit");
console.log("==========================");
console.log(`Sentence rows: ${sentences.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
for (const warning of warnings) console.log(`Warning: ${warning}`);
for (const error of errors) console.log(`Error: ${error}`);

// strict failing
const exitOnError = errors.length > 0;
const exitOnWarning = isStrict && warnings.length > 0;

if (exitOnError || (v2Exists && exitOnWarning)) {
  process.exitCode = 1;
} else {
  console.log("Sentences foundation audit passed.");
}
