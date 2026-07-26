#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SECTION_ORDERS = Object.freeze([1, 2, 3, 4]);
const EXPECTED_COUNTS = Object.freeze({ 1: 34, 2: 55, 3: 55, 4: 54 });
const EXPECTED_TOTAL = 198;
const REVISION = "sentence-lesson-contrasts-cb2-v1";
const RUNTIME_ASSET = "./sentence_lesson_contrasts_sections_1_4.js?v=20260726a";
const UI_ASSET = "./sentence_lesson_contrast_ui.js?v=20260726a";

const errors = [];
const warnings = [];
function fail(message) { errors.push(message); }
function warn(message) { warnings.push(message); }
function read(path) { return readFileSync(join(ROOT, path), "utf8"); }

function loadGlobals(files) {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  for (const file of files) vm.runInContext(read(file), sandbox, { filename: file });
  return sandbox.window;
}

function exactSet(label, actualValues, expectedValues) {
  const actual = new Set(actualValues);
  const expected = new Set(expectedValues);
  for (const item of expected) if (!actual.has(item)) fail(`${label}: missing ${item}`);
  for (const item of actual) if (!expected.has(item)) fail(`${label}: unexpected ${item}`);
  if (actual.size !== actualValues.length) fail(`${label}: duplicate values detected`);
}

const base = loadGlobals(["sentences_core.js", "sentences_lesson_plan.js"]);
const applied = loadGlobals([
  "sentences_core.js",
  "sentences_lesson_plan.js",
  "sentence_lesson_contrasts_sections_1_4.js",
]);
const shortlist = JSON.parse(read("docs/generated/sentence_exam_shortlist.json"));
const report = JSON.parse(read("docs/generated/sentence_lesson_contrasts_sections_1_4.json"));
const baseRows = new Map((base.HANAPATH_SENTENCES || []).map((row) => [row.id, row]));
const baseLessons = new Map((base.HANAPATH_SENTENCE_LESSONS || []).map((lesson) => [lesson.id, lesson]));
const appliedLessons = new Map((applied.HANAPATH_SENTENCE_LESSONS || []).map((lesson) => [lesson.id, lesson]));
const expectedCandidates = (shortlist.typedCandidates || [])
  .filter((candidate) => SECTION_ORDERS.includes(candidate.sectionOrder));
const entries = Array.isArray(report.entries) ? report.entries : [];

if (report.revision !== REVISION) fail(`report revision must be ${REVISION}`);
if (report.entryCount !== EXPECTED_TOTAL || entries.length !== EXPECTED_TOTAL) {
  fail(`entry count must be ${EXPECTED_TOTAL}; report=${report.entryCount}, entries=${entries.length}`);
}
if (report.bankApprovedCount !== 0) fail("CB2 may not approve curated-bank entries");
if (expectedCandidates.length !== EXPECTED_TOTAL) fail(`shortlist sections 1-4 must contain ${EXPECTED_TOTAL} typed candidates`);
exactSet("target coverage", entries.map((entry) => entry.targetSentenceId), expectedCandidates.map((candidate) => candidate.id));
exactSet("lesson coverage", entries.map((entry) => entry.lessonId), expectedCandidates.map((candidate) => candidate.lessonIds[0]));

for (const sectionOrder of SECTION_ORDERS) {
  const actual = entries.filter((entry) => entry.sectionOrder === sectionOrder).length;
  if (actual !== EXPECTED_COUNTS[sectionOrder]) {
    fail(`section ${sectionOrder} entry count ${actual} != ${EXPECTED_COUNTS[sectionOrder]}`);
  }
}

for (const entry of entries) {
  const label = `${entry.lessonId}/${entry.targetSentenceId}`;
  const originalLesson = baseLessons.get(entry.lessonId);
  const appliedLesson = appliedLessons.get(entry.lessonId);
  const target = baseRows.get(entry.targetSentenceId);
  const contrast = baseRows.get(entry.contrastSentenceId);
  if (!originalLesson) { fail(`${label}: missing original lesson`); continue; }
  if (!appliedLesson) { fail(`${label}: missing applied lesson`); continue; }
  if (!target) fail(`${label}: missing target row`);
  if (!contrast) fail(`${label}: missing contrast row ${entry.contrastSentenceId}`);
  if (entry.targetSentenceId === entry.contrastSentenceId) fail(`${label}: target and contrast are identical`);
  if (!originalLesson.sentenceIds.includes(entry.targetSentenceId)) fail(`${label}: target did not route through the original lesson`);
  if (!originalLesson.sentenceIds.includes(entry.contrastSentenceId)) fail(`${label}: contrast did not route through the original lesson`);
  exactSet(`${label}: preserved lesson rows`, appliedLesson.sentenceIds || [], originalLesson.sentenceIds || []);
  if (appliedLesson.sentenceIds?.[0] !== entry.targetSentenceId) fail(`${label}: target must be the first study line`);
  if (appliedLesson.sentenceIds?.[1] !== entry.contrastSentenceId) fail(`${label}: contrast must be the second study line`);
  if (appliedLesson.contrastTeaching?.targetSentenceId !== entry.targetSentenceId) fail(`${label}: runtime metadata was not applied`);
  if (!String(appliedLesson.goal || "").includes("intended meaning")) fail(`${label}: learner-facing goal is missing`);
  if (!String(appliedLesson.concept || "").includes("Target:")) fail(`${label}: learner-facing contrast concept is missing`);

  for (const field of ["meaningInContext", "contrastClosure", "controlledProduction", "variationAwareness", "freePractice", "examReadiness"]) {
    if (!entry[field]) fail(`${label}: missing ${field}`);
  }
  if (entry.examReadiness !== "typed-candidate") fail(`${label}: invalid exam-readiness decision`);
  if (entry.bankApproved !== false) fail(`${label}: bankApproved must remain false`);
  if (Object.prototype.hasOwnProperty.call(entry, "reviewedBy") || entry.reviewStatus === "approved") {
    fail(`${label}: CB2 must not invent independent bank approval`);
  }
  const prompt = String(entry.controlledProduction?.promptEn || "").trim();
  if (prompt.length < 20) fail(`${label}: controlled prompt is too short`);
  for (const internalTag of target?.patternTags || []) {
    if (prompt.includes(internalTag)) fail(`${label}: controlled prompt leaks internal grammar tag ${internalTag}`);
  }
  for (const cue of ["communicativeAct", "register", "time", "discourseRole", "lexicalAnchor", "context"]) {
    if (!String(entry.controlledProduction?.requiredCues?.[cue] || "").trim()) fail(`${label}: missing required cue ${cue}`);
  }
  if (!Array.isArray(entry.controlledProduction?.automaticAlternatives) || entry.controlledProduction.automaticAlternatives.length !== 0) {
    fail(`${label}: automatic alternatives are forbidden`);
  }
  if (!entry.studyNotes?.[entry.targetSentenceId] || !entry.studyNotes?.[entry.contrastSentenceId]) {
    fail(`${label}: target and contrast study notes are required`);
  }
  const targetDrill = appliedLesson.drillPlan?.find((item) => item.sentenceId === entry.targetSentenceId);
  const contrastDrill = appliedLesson.drillPlan?.find((item) => item.sentenceId === entry.contrastSentenceId);
  if (!targetDrill || targetDrill.mode !== "translate" || targetDrill.promptEn !== prompt) {
    fail(`${label}: target controlled-production drill is invalid`);
  }
  if (!contrastDrill || !["build", "listen"].includes(contrastDrill.mode) || contrastDrill.promptEn) {
    fail(`${label}: contrast drill must remain comparison practice without the target prompt`);
  }
}

const runtimeContract = applied.HANAPATH_SENTENCE_LESSON_CONTRASTS_1_4;
if (!runtimeContract || runtimeContract.revision !== REVISION || runtimeContract.entries?.length !== EXPECTED_TOTAL) {
  fail("browser runtime contract is missing or incomplete");
}

const appJs = read("app.js");
for (const marker of [
  "HANAPATH_SENTENCE_CONTRAST_UI",
  "contrastUi.renderIntroGuide",
  "contrastUi.renderStudyNote",
  "sentenceLessonPromptText",
  "configuredEntry.promptEn",
]) {
  if (!appJs.includes(marker)) fail(`app.js missing contrast integration marker: ${marker}`);
}

const indexHtml = read("index.html");
const lessonPlanIndex = indexHtml.indexOf("./sentences_lesson_plan.js");
const uiIndex = indexHtml.indexOf(UI_ASSET);
const dataIndex = indexHtml.indexOf(RUNTIME_ASSET);
const appIndex = indexHtml.indexOf("./app.js");
if (!(lessonPlanIndex >= 0 && uiIndex > lessonPlanIndex && dataIndex > uiIndex && appIndex > dataIndex)) {
  fail("index.html must load lesson plan, contrast UI, CB2 data, then app.js in that order");
}

const swJs = read("sw.js");
if (!swJs.includes(UI_ASSET)) fail(`sw.js APP_SHELL missing ${UI_ASSET}`);
if (!swJs.includes(RUNTIME_ASSET)) fail(`sw.js APP_SHELL missing ${RUNTIME_ASSET}`);
if (!/const CACHE_NAME = "hanapath-shell-v450";/.test(swJs)) fail("sw.js cache must be bumped to hanapath-shell-v450");

if (report.generatedPromptCount > 0) {
  warn(`${report.generatedPromptCount} controlled lesson prompts remain explicitly marked for CB4 review; they are teaching prompts, not approved exam items.`);
}

console.log(`CB2 contrast entries: ${entries.length}`);
console.log(`Section counts: ${SECTION_ORDERS.map((section) => `${section}:${entries.filter((entry) => entry.sectionOrder === section).length}`).join(", ")}`);
console.log(`Generated teaching prompts awaiting later bank review: ${report.generatedPromptCount}`);
for (const message of warnings) console.warn(`WARN: ${message}`);
if (errors.length) {
  for (const message of errors) console.error(`ERROR: ${message}`);
  console.error(`Sentence lesson contrast audit failed with ${errors.length} error(s).`);
  process.exit(1);
}
console.log("Sentence lesson contrast audit passed.");
