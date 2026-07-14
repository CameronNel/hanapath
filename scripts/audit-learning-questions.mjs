#!/usr/bin/env node
// Audit learner-facing Alphabet and required-core Words question coverage.
//
// Checks that:
// - all 19 consonants and 21 vowels are generated in both drill directions;
// - Alphabet lesson cards do not render their exact answer before submission;
// - the generic quiz visual fallback never renders the answer;
// - every required-core word belongs to a content lesson and its unit review;
// - the word-question fallback covers every lesson word; and
// - the Words study recall prompt does not print the Korean target.

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const appSrc = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const errors = [];

function findMatching(source, openAt, openChar, closeChar) {
  let depth = 0;
  for (let index = openAt; index < source.length; index += 1) {
    if (source[index] === openChar) depth += 1;
    if (source[index] === closeChar) depth -= 1;
    if (depth === 0) return index;
  }
  throw new Error(`Unclosed ${openChar} at ${openAt}`);
}

function readArray(name) {
  const marker = `const ${name} = [`;
  const start = appSrc.indexOf(marker);
  if (start < 0) throw new Error(`Missing ${name}`);
  const open = appSrc.indexOf("[", start);
  const close = findMatching(appSrc, open, "[", "]");
  return vm.runInNewContext(`(${appSrc.slice(open, close + 1)})`);
}

function readFunction(name) {
  const marker = `function ${name}(`;
  const start = appSrc.indexOf(marker);
  if (start < 0) throw new Error(`Missing ${name}`);
  const open = appSrc.indexOf("{", start);
  const close = findMatching(appSrc, open, "{", "}");
  return appSrc.slice(start, close + 1);
}

function readPhaseOneLessons() {
  const marker = "const phaseOneLessons = [";
  const start = appSrc.indexOf(marker);
  const open = appSrc.indexOf("[", start);
  const close = findMatching(appSrc, open, "[", "]");
  return vm.runInNewContext(`(${appSrc.slice(open, close + 1)})`);
}

function visibleText(value) {
  return String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

const initials = readArray("INITIALS");
const medials = readArray("MEDIALS");
const allJamo = [...initials, ...medials];
const directions = ["letter-to-sound", "sound-to-letter"];

// Execute the real direction-aware letter generator with deterministic stubs.
const generatorSandbox = {
  getEnrolledLetters: () => allJamo,
  consonantAtlas: initials.map((char) => ({ char })),
  vowelAtlas: medials.map((char) => ({ char })),
  LETTER_SOUND: Object.fromEntries(allJamo.map((char, index) => [char, `sound-${index}`])),
  HANGUL_JAMO_SPEAK: Object.fromEntries(allJamo.map((char) => [char, char])),
  ALPHABET_LETTER_QUESTION_DIRECTIONS: directions,
  randomItem: (items) => items[0],
  shuffle: (items) => [...items],
  escapeHtml: (value) => String(value),
};
vm.createContext(generatorSandbox);
vm.runInContext(readFunction("makeLetterDrillQuestion"), generatorSandbox);
for (const jamo of allJamo) {
  for (const direction of directions) {
    const question = generatorSandbox.makeLetterDrillQuestion(jamo, direction);
    if (question.coverageJamo !== jamo || question.coverageDirection !== direction) {
      errors.push(`Alphabet generator lost ${jamo} ${direction} coverage metadata`);
    }
    const visible = visibleText([question.visual, question.prompt, question.detail].join(" "));
    if (visible.includes(String(question.answer))) {
      errors.push(`Alphabet generator reveals ${jamo} ${direction} answer before submission`);
    }
  }
}

// Execute the real deck scheduler and prove it yields every jamo both ways
// before it starts another cycle.
const queueSandbox = {
  getEnrolledLetters: () => allJamo,
  consonantAtlas: initials.map((char) => ({ char })),
  vowelAtlas: medials.map((char) => ({ char })),
  ALPHABET_LETTER_QUESTION_DIRECTIONS: directions,
  shuffle: (items) => [...items],
};
vm.createContext(queueSandbox);
vm.runInContext(`let drillSession = { letterCoverageQueue: [] };\n${readFunction("nextLetterCoverageTarget")}\nthis.takeCoverageTarget = nextLetterCoverageTarget;`, queueSandbox);
const scheduled = new Set();
for (let index = 0; index < allJamo.length * directions.length; index += 1) {
  const target = queueSandbox.takeCoverageTarget();
  scheduled.add(`${target.letter}:${target.direction}`);
}
for (const jamo of allJamo) {
  for (const direction of directions) {
    if (!scheduled.has(`${jamo}:${direction}`)) errors.push(`Alphabet scheduler misses ${jamo} ${direction}`);
  }
}

const phaseOneLessons = readPhaseOneLessons();
for (const lesson of phaseOneLessons) {
  for (const [index, question] of (lesson.questions || []).entries()) {
    const answer = String(question.answer || question.target || "").trim();
    const visual = visibleText(question.visual);
    if (answer && visual.includes(answer)) {
      errors.push(`${lesson.id} question ${index + 1} visibly includes its answer ${answer}`);
    }
  }
}

const visualSandbox = { escapeHtml: (value) => String(value) };
vm.createContext(visualSandbox);
vm.runInContext(readFunction("getQuestionVisual"), visualSandbox);
if (visibleText(visualSandbox.getQuestionVisual({ answer: "VISIBLE-ANSWER" })).includes("VISIBLE-ANSWER")) {
  errors.push("Generic quiz fallback visibly includes its answer");
}

// Load browser-global Words data and re-derive required-core membership.
const wordsSandbox = { window: {} };
vm.createContext(wordsSandbox);
for (const file of ["words_curated_core.js", "words_lesson_plan.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), wordsSandbox, { filename: file });
}
const words = wordsSandbox.window.HANAPATH_CURATED_WORDS || [];
const lessons = wordsSandbox.window.HANAPATH_WORD_LESSONS || [];
const units = wordsSandbox.window.HANAPATH_WORD_UNITS || [];
const coreWords = words.filter((word) => (word.priority || "core") === "core");
const contentLessons = lessons.filter((lesson) => lesson.type === "content" && /^s[1-8]$/.test(lesson.stage));
const unitById = new Map(units.map((unit) => [unit.id, unit]));
const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
const contentMembership = new Map();
for (const lesson of contentLessons) {
  for (const wordId of lesson.newWordIds || []) {
    const list = contentMembership.get(wordId) || [];
    list.push(lesson);
    contentMembership.set(wordId, list);
  }
}
for (const word of coreWords) {
  const memberships = contentMembership.get(word.id) || [];
  if (memberships.length !== 1) {
    errors.push(`Core word ${word.id} belongs to ${memberships.length} required content lessons`);
    continue;
  }
  const contentLesson = memberships[0];
  const unit = unitById.get(contentLesson.unitId);
  const checkpoint = unit ? lessonById.get(unit.checkpointId) : null;
  if (!checkpoint || !(checkpoint.reviewWordIds || []).includes(word.id)) {
    errors.push(`Core word ${word.id} is missing from its unit checkpoint`);
  }
}

// Execute the real last-resort helper with a stub question generator.
const fallbackSandbox = {
  generateWordQuestionFor: (word, direction) => ({ wordId: word.id, direction }),
};
vm.createContext(fallbackSandbox);
vm.runInContext(readFunction("ensureEveryWordTested"), fallbackSandbox);
const seededQuestions = coreWords.filter((_, index) => index % 3 === 0).map((word) => ({ wordId: word.id }));
const coveredQuestions = fallbackSandbox.ensureEveryWordTested(seededQuestions, coreWords);
const coveredWordIds = new Set(coveredQuestions.map((question) => question.wordId));
for (const word of coreWords) {
  if (!coveredWordIds.has(word.id)) errors.push(`Word fallback misses core word ${word.id}`);
}

const studyRenderer = readFunction("wordLessonStudyHtml");
const recallStart = studyRenderer.indexOf('<div class="word-type-prompt-row">');
const recallEnd = studyRenderer.indexOf('<div class="word-type-box', recallStart);
const recallPrompt = recallStart >= 0 && recallEnd > recallStart ? studyRenderer.slice(recallStart, recallEnd) : "";
if (!recallPrompt || recallPrompt.includes("escapeHtml(target)")) {
  errors.push("Words recall prompt still displays the Korean target");
}

console.log("Learning question audit");
console.log("=======================");
console.log(`Alphabet jamo       : ${allJamo.length}`);
console.log(`Alphabet directions : ${directions.length}`);
console.log(`Coverage pairs       : ${scheduled.size}`);
console.log(`Phase One questions  : ${phaseOneLessons.reduce((sum, lesson) => sum + (lesson.questions || []).length, 0)}`);
console.log(`Required core words  : ${coreWords.length}`);
console.log(`Errors               : ${errors.length}`);

if (errors.length) {
  console.log("\nQuestion coverage problems:");
  for (const error of errors) console.log(`  - ${error}`);
  process.exit(1);
}

console.log("\nResult: every Hangul jamo has two-way coverage, every core word is tested, and prompts do not pre-reveal their answers.");
