#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { detectAmbiguityFlags, normalizeSentenceExamAnswer } from "./lib/sentence-exam-ambiguity.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadGlobals(files) {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  for (const file of files) {
    vm.runInContext(readFileSync(join(ROOT, file), "utf8"), sandbox, { filename: file });
  }
  return sandbox.window;
}

function buildRoutes(W) {
  const units = Array.isArray(W.HANAPATH_SENTENCE_UNITS) ? W.HANAPATH_SENTENCE_UNITS : [];
  const sections = Array.isArray(W.HANAPATH_SENTENCE_SECTIONS) ? W.HANAPATH_SENTENCE_SECTIONS : [];
  const lessons = Array.isArray(W.HANAPATH_SENTENCE_LESSONS) ? W.HANAPATH_SENTENCE_LESSONS : [];
  const unitToSection = new Map(units.map((unit) => [unit.id, unit.sectionId]));
  const sectionOrder = new Map(sections.map((section) => [section.id, section.order]));
  const routes = new Map();
  for (const lesson of lessons) {
    for (const sentenceId of lesson.sentenceIds || []) {
      if (!routes.has(sentenceId)) routes.set(sentenceId, []);
      routes.get(sentenceId).push({
        lessonId: lesson.id,
        sectionOrder: sectionOrder.get(unitToSection.get(lesson.unitId)) || null,
      });
    }
  }
  return routes;
}

const W = loadGlobals([
  "sentences_core.js",
  "sentences_lesson_plan.js",
  "sentence_exam_eligibility_shard_a.js",
  "sentence_exam_eligibility_shard_b.js",
  "sentence_exam_eligibility_shard_c.js",
  "sentence_exam_eligibility_shard_d.js",
  "sentence_exam_eligibility.js",
  "sentence_exam_prompt_templates.js",
  "sentence_exam_curated_bank.js",
]);

const bank = W.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
const templates = W.HANAPATH_SENTENCE_EXAM_PROMPT_TEMPLATES;
const sentences = Array.isArray(W.HANAPATH_SENTENCES) ? W.HANAPATH_SENTENCES : [];
const reviewedRows = W.HANAPATH_SENTENCE_EXAM_ELIGIBILITY?.reviewedRows || {};
const sentenceMap = new Map(sentences.map((row) => [row.id, row]));
const templateMap = new Map((templates?.templates || []).map((template) => [template.id, template]));
const routes = buildRoutes(W);
const errors = [];

if (!bank || typeof bank !== "object") errors.push("Curated bank global is missing.");
if (bank?.schemaVersion !== 1) errors.push(`Expected curated-bank schemaVersion 1, got ${bank?.schemaVersion}.`);
if (!Array.isArray(bank?.entries)) errors.push("Curated bank entries must be an array.");
if (!templates || templates.schemaVersion !== 1) errors.push("Prompt-template contract is missing or has the wrong schema version.");

const canonicalCounts = new Map();
for (const row of sentences) {
  const key = normalizeSentenceExamAnswer(row.korean);
  canonicalCounts.set(key, (canonicalCounts.get(key) || 0) + 1);
}
const duplicateCanonicalKeys = new Set([...canonicalCounts].filter(([, count]) => count > 1).map(([key]) => key));

const seenIds = new Set();
const acceptedOwner = new Map();
const typedEntries = [];
const recognitionEntries = [];

for (const entry of bank?.entries || []) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
    errors.push("Curated bank contains a non-object entry.");
    continue;
  }
  if (!entry.id || seenIds.has(entry.id)) {
    errors.push(`Curated entry has a missing or duplicate id: '${entry.id}'.`);
    continue;
  }
  seenIds.add(entry.id);

  const row = sentenceMap.get(entry.id);
  if (!row) {
    errors.push(`Curated entry ${entry.id} does not exist in sentences_core.js.`);
    continue;
  }
  if (!routes.has(entry.id) || routes.get(entry.id).length === 0) {
    errors.push(`Curated entry ${entry.id} has no live lesson route.`);
  }
  if (!templateMap.has(entry.templateId)) {
    errors.push(`Curated entry ${entry.id} uses unknown template '${entry.templateId}'.`);
  }
  if (!entry.examPromptEn || typeof entry.examPromptEn !== "string") {
    errors.push(`Curated entry ${entry.id} has no examPromptEn.`);
  }
  if (!Array.isArray(entry.manualAlternatives)) {
    errors.push(`Curated entry ${entry.id} manualAlternatives must be an array.`);
  }
  if ((entry.manualAlternatives || []).length > 4) {
    errors.push(`Curated entry ${entry.id} has more than four manual alternatives.`);
  }

  const canonical = normalizeSentenceExamAnswer(entry.canonicalAnswer);
  if (canonical !== normalizeSentenceExamAnswer(row.korean)) {
    errors.push(`Curated entry ${entry.id} canonicalAnswer does not match the live Korean row.`);
  }
  const accepted = [canonical, ...(entry.manualAlternatives || []).map(normalizeSentenceExamAnswer)].filter(Boolean);
  if (accepted.length !== new Set(accepted).size) {
    errors.push(`Curated entry ${entry.id} has duplicate accepted answers after normalization.`);
  }
  for (const answer of accepted) {
    const previous = acceptedOwner.get(answer);
    if (previous && previous !== entry.id) {
      errors.push(`Accepted answer collision: '${answer}' belongs to both ${previous} and ${entry.id}.`);
    } else {
      acceptedOwner.set(answer, entry.id);
    }
  }

  if (entry.mode === "typed") {
    typedEntries.push(entry);
    const review = reviewedRows[entry.id];
    if (review?.typedClass === "excluded") {
      errors.push(`Curated typed entry ${entry.id} contradicts the existing reviewed exclusion.`);
    }
    const analysis = detectAmbiguityFlags(row, entry.examPromptEn, {
      duplicateCanonicalKeys,
      requiresLexicalAnchor: entry.requiresLexicalAnchor === true,
    });
    if (analysis.flags.length > 0) {
      errors.push(`Curated typed entry ${entry.id} remains ambiguous: ${analysis.flags.join(", ")}.`);
    }
  } else if (entry.mode === "recognition") {
    recognitionEntries.push(entry);
  } else {
    errors.push(`Curated entry ${entry.id} has invalid mode '${entry.mode}'.`);
  }
}

if (bank?.enabled === true) {
  const policy = bank.selectionPolicy || {};
  if (typedEntries.length < policy.typedTargetSize) {
    errors.push(`Enabled typed pool has ${typedEntries.length} entries; target is ${policy.typedTargetSize}.`);
  }
  if (recognitionEntries.length < policy.recognitionTargetSize) {
    errors.push(`Enabled recognition pool has ${recognitionEntries.length} entries; target is ${policy.recognitionTargetSize}.`);
  }

  const typedBySection = new Map();
  const recognitionBySection = new Map();
  const typedByLesson = new Map();
  const recognitionByLesson = new Map();
  for (const entry of typedEntries) {
    for (const route of routes.get(entry.id) || []) {
      typedBySection.set(route.sectionOrder, (typedBySection.get(route.sectionOrder) || 0) + 1);
      typedByLesson.set(route.lessonId, (typedByLesson.get(route.lessonId) || 0) + 1);
    }
  }
  for (const entry of recognitionEntries) {
    for (const route of routes.get(entry.id) || []) {
      recognitionBySection.set(route.sectionOrder, (recognitionBySection.get(route.sectionOrder) || 0) + 1);
      recognitionByLesson.set(route.lessonId, (recognitionByLesson.get(route.lessonId) || 0) + 1);
    }
  }
  for (let section = 1; section <= 8; section += 1) {
    if ((typedBySection.get(section) || 0) < policy.minTypedPerSection) {
      errors.push(`Section ${section} has fewer than ${policy.minTypedPerSection} typed entries.`);
    }
    if ((recognitionBySection.get(section) || 0) < policy.minRecognitionPerSection) {
      errors.push(`Section ${section} has fewer than ${policy.minRecognitionPerSection} recognition entries.`);
    }
  }
  for (const [lessonId, count] of typedByLesson) {
    if (count > policy.maxTypedPerLesson) errors.push(`Lesson ${lessonId} exceeds the typed-entry cap.`);
  }
  for (const [lessonId, count] of recognitionByLesson) {
    if (count > policy.maxRecognitionPerLesson) errors.push(`Lesson ${lessonId} exceeds the recognition-entry cap.`);
  }

  const finiteCount = typedEntries.filter((entry) => (entry.manualAlternatives || []).length > 0).length;
  const finiteShare = typedEntries.length ? finiteCount / typedEntries.length : 0;
  if (finiteShare > policy.maxFiniteTypedShare) {
    errors.push(`Finite typed share ${(finiteShare * 100).toFixed(2)}% exceeds ${(policy.maxFiniteTypedShare * 100).toFixed(2)}%.`);
  }
}

console.log("Curated sentence exam bank audit");
console.log("================================");
console.log(`Enabled             : ${bank?.enabled === true ? "yes" : "no"}`);
console.log(`Typed entries       : ${typedEntries.length}`);
console.log(`Recognition entries : ${recognitionEntries.length}`);

if (errors.length > 0) {
  console.error(`\nAudit failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log("\nAudit passed cleanly.");
