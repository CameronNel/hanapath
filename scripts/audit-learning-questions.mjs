#!/usr/bin/env node
// Audit learner-facing Alphabet, Words, and Sentences question coverage.
//
// Checks that:
// - all 19 consonants and 21 vowels are generated in both drill directions;
// - Alphabet lesson cards do not render their exact answer before submission;
// - the generic quiz visual fallback never renders the answer;
// - every required-core word belongs to a content lesson and its unit review;
// - the real word/sentence lesson planners cover every required row twice; and
// - no untracked pre-answer surface prints or speaks the target.

import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import vm from "node:vm";

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const appSrc = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
const stylesSrc = fs.readFileSync(path.join(ROOT, "styles.css"), "utf8");
const indexSrc = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
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
  const paramsOpen = appSrc.indexOf("(", start);
  const paramsClose = findMatching(appSrc, paramsOpen, "(", ")");
  const open = appSrc.indexOf("{", paramsClose);
  const close = findMatching(appSrc, open, "{", "}");
  return appSrc.slice(start, close + 1);
}

function readWindowFunction(name) {
  const marker = `window.${name} = function(`;
  const start = appSrc.indexOf(marker);
  if (start < 0) throw new Error(`Missing window.${name}`);
  const paramsOpen = appSrc.indexOf("(", start);
  const paramsClose = findMatching(appSrc, paramsOpen, "(", ")");
  const open = appSrc.indexOf("{", paramsClose);
  const close = findMatching(appSrc, open, "{", "}");
  return appSrc.slice(start, close + 1);
}

function readCalls(source, callee) {
  const calls = [];
  const marker = `${callee}(`;
  let at = source.indexOf(marker);
  while (at >= 0) {
    const open = source.indexOf("(", at);
    const close = findMatching(source, open, "(", ")");
    calls.push(source.slice(at, close + 1));
    at = source.indexOf(marker, close + 1);
  }
  return calls;
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

function sampleList(values, limit = 8) {
  const unique = [...new Set(values.map((value) => String(value)))];
  const shown = unique.slice(0, limit);
  return `${shown.join(", ")}${unique.length > shown.length ? `, ... +${unique.length - shown.length}` : ""}`;
}

function increment(map, key, amount = 1) {
  map.set(key, (map.get(key) || 0) + amount);
}

function mapSummary(map) {
  return [...map.entries()]
    .sort(([a], [b]) => String(a).localeCompare(String(b)))
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");
}

function getWordTypeTarget(word) {
  if (Array.isArray(word.forms) && word.forms.length) return word.forms[0];
  return word.korean;
}

// App-wide interaction contracts that are easy to regress while changing a
// lesson renderer: one incoming screen, semantic navigation direction, a
// simple completion flourish, and Settings in the top-right app chrome.
const screenEntranceSource = readFunction("playScreenEntrance");
const hideOutgoingSource = readFunction("hideOutgoingScreen");
const completionSource = readFunction("premiumCompletionHtml");
if (
  !stylesSrc.includes(".screen-motion-forward { --screen-enter-x: 34px;")
  || !stylesSrc.includes(".screen-motion-back { --screen-enter-x: -34px;")
  || !screenEntranceSource.includes('motion.kind === "tab" && motion.direction < 0')
) {
  errors.push("Screen motion no longer enters forward from the right and back from the left");
}
if (
  !hideOutgoingSource.includes("screen.hidden = true")
  || !hideOutgoingSource.includes('screen.innerHTML = ""')
  || appSrc.includes("screen-motion-exit")
) {
  errors.push("Navigation can retain a second live outgoing screen and reintroduce twitchy overlap");
}
if (
  !completionSource.includes("completion-flourish")
  || completionSource.includes("completion-emblem")
  || appSrc.includes("completionIconSvg")
) {
  errors.push("Completion screens reintroduced the retired top checkmark/emblem treatment");
}
if (
  !indexSrc.includes('id="app-settings-button"')
  || !indexSrc.includes('aria-label="Open settings"')
  || !appSrc.includes('id="writingLineWidth" type="range"')
) {
  errors.push("Top-right Settings or its line-thickness control is missing");
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

// The scheduler can produce a complete 80-pair pass, but a learner must be
// able to select a finite session that actually consumes it. Infinite mode is
// not a coverage guarantee, and the live runner resets its queue per session.
const drillLengths = readArray("DRILL_LENGTHS");
const requiredAlphabetPairs = allJamo.length * directions.length;
const finiteDrillLengths = drillLengths
  .map((value) => Number(value))
  .filter((value) => Number.isFinite(value) && value > 0);
const maxFiniteDrillLength = finiteDrillLengths.length ? Math.max(...finiteDrillLengths) : 0;
if (maxFiniteDrillLength < requiredAlphabetPairs) {
  errors.push(
    `Alphabet finite Letters coverage is ${maxFiniteDrillLength}/${requiredAlphabetPairs} pairs; add a finite ${requiredAlphabetPairs}-question pass`,
  );
}

const phaseOneLessons = readPhaseOneLessons();
for (const lesson of phaseOneLessons) {
  for (const [index, question] of (lesson.questions || []).entries()) {
    const answer = String(question.answer || question.target || "").trim();
    const visual = visibleText(question.visual);
    if (answer && visual.includes(answer)) {
      errors.push(`${lesson.id} question ${index + 1} visibly includes its answer ${answer}`);
    }
    const completePreAnswerCopy = visibleText([question.prompt, question.detail, question.visual].join(" "));
    if (answer && completePreAnswerCopy.includes(answer) && !visual.includes(answer)) {
      errors.push(`${lesson.id} question ${index + 1} includes its answer ${answer} in prompt/detail copy`);
    }
    if (question.type !== "build") {
      const options = Array.isArray(question.options) ? question.options : [];
      if (new Set(options).size < 2 || options.filter((option) => option === question.answer).length !== 1) {
        errors.push(`${lesson.id} question ${index + 1} has a trivial or invalid choice set`);
      }
    }
  }
}

// Keep the Phase-One Reference surface out of unanswered checkpoints. A later
// answered state may reveal it without compromising the attempt.
const phaseOnePlayerSource = readFunction("renderPhaseOnePlayer");
const phaseOneReferenceIsGated = phaseOnePlayerSource.includes(
  'const showReference = phaseOneView.mode !== "check" || phaseOneView.answered',
) && phaseOnePlayerSource.includes('style.display = showReference ? "" : "none"');
if (phaseOnePlayerSource.includes("phaseOneReferenceButton") && !phaseOneReferenceIsGated) {
  errors.push("Alphabet checkpoints expose the untracked Reference surface before submission");
}

// The shared progress tile can show Reference on menus and completed states,
// but every live Alphabet assessment must pass its own answered/completed flag.
// Execute both the renderer and the actual call expressions so this guard
// catches a missing fourth argument as well as an inverted or hard-coded one.
const alphabetProgressSandbox = { escapeHtml: (value) => String(value) };
vm.createContext(alphabetProgressSandbox);
vm.runInContext(readFunction("alphabetPracticeProgressHtml"), alphabetProgressSandbox);
if (alphabetProgressSandbox.alphabetPracticeProgressHtml("Probe", 1, 2, false).includes("data-checkpoint-open-reference")) {
  errors.push("Alphabet practice progress renders Reference when its assessment has not been answered");
}
if (!alphabetProgressSandbox.alphabetPracticeProgressHtml("Probe", 2, 2, true).includes("data-checkpoint-open-reference")) {
  errors.push("Alphabet practice progress cannot restore Reference after an assessment is answered");
}

const alphabetReferenceCallSpecs = [
  {
    label: "generic Alphabet quiz",
    source: readFunction("renderAlphabetPractice"),
    callMarker: "practiceSession.complete",
    context: (allowed) => ({ practiceSession: { complete: allowed } }),
  },
  {
    label: "active Alphabet Drill Lab",
    source: readFunction("renderDrillQuestion"),
    callMarker: "s.answered",
    context: (allowed) => ({ s: { total: 10, asked: 0, answered: allowed }, modeLabel: "Letters" }),
  },
  {
    label: "active pronunciation drill",
    source: readWindowFunction("renderPronunciationDrill"),
    callMarker: "pronDrillState.answered",
    context: (allowed) => ({
      pronDrillState: { currentIndex: 0, questionCount: 5, answered: allowed },
    }),
  },
  {
    label: "letter review",
    source: readFunction("renderLetterReview"),
    callMarker: "letterReview.answered",
    context: (allowed) => ({ letterReview: { index: 0, answered: allowed }, total: 5 }),
  },
];
for (const spec of alphabetReferenceCallSpecs) {
  const call = readCalls(spec.source, "alphabetPracticeProgressHtml")
    .find((candidate) => candidate.includes(spec.callMarker));
  if (!call) {
    errors.push(`${spec.label} does not gate its Reference progress control with ${spec.callMarker}`);
    continue;
  }
  for (const allowed of [false, true]) {
    let capturedArgs = null;
    vm.runInNewContext(call, {
      ...spec.context(allowed),
      alphabetPracticeProgressHtml: (...args) => {
        capturedArgs = args;
        return "";
      },
    });
    if (!capturedArgs || capturedArgs[3] !== allowed) {
      errors.push(
        `${spec.label} passes ${String(capturedArgs?.[3])} to Reference gating when answered/completed is ${allowed}`,
      );
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
for (const file of ["words_inflect.js", "words_curated_core.js", "words_lesson_plan.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), wordsSandbox, { filename: file });
}
const words = wordsSandbox.window.HANAPATH_CURATED_WORDS || [];
const lessons = wordsSandbox.window.HANAPATH_WORD_LESSONS || [];
const units = wordsSandbox.window.HANAPATH_WORD_UNITS || [];
const inflect = wordsSandbox.window.HANAPATH_INFLECT;
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

// Reproduce the real context-blank feasibility rules and verify that every
// occurrence is removed, including compounds and repeated tokens.
const VOCAB_BLANK_FORM_NAMES = ["past", "honorific", "formal", "polite", "attributive"];
const VOCAB_BLANK_STEM_ENDINGS = ["고", "지", "서", "면"];

function getWordAcceptedAnswers(word) {
  const answers = [];
  if (Array.isArray(word.forms) && word.forms.length) answers.push(...word.forms);
  answers.push(word.korean);
  if (word.display && word.display !== word.korean) answers.push(word.display);
  return answers;
}

function deriveWordSentenceBlank(word) {
  if (!word.exampleKo) return null;
  const forms = getWordAcceptedAnswers(word).sort((a, b) => b.length - a.length);
  for (const form of forms) {
    if (form && word.exampleKo.includes(form)) {
      return { blanked: word.exampleKo.split(form).join("____"), answer: form };
    }
  }

  if (!inflect || (word.pos !== "verb" && word.pos !== "adjective")) return null;
  const candidates = [];
  for (const formName of VOCAB_BLANK_FORM_NAMES) {
    const form = inflect.conjugate(word.korean, word.pos, word.irregularFamily, formName);
    if (form && form !== word.korean) candidates.push({ form, conj: { formName } });
  }
  const polite = candidates.find((candidate) => candidate.conj.formName === "polite");
  if (polite && polite.form.endsWith("요")) {
    candidates.push({ form: polite.form.slice(0, -1), conj: { formName: "polite", trim: true } });
  }
  const stem = inflect.getStem(word.korean);
  if (stem && stem !== word.korean) {
    VOCAB_BLANK_STEM_ENDINGS.forEach((ending) => candidates.push({ form: stem + ending, conj: { ending } }));
  }
  candidates.sort((a, b) => b.form.length - a.form.length);
  for (const { form, conj } of candidates) {
    if (form.length < 2) continue;
    const at = word.exampleKo.indexOf(form);
    if (at < 0) continue;
    if (at > 0 && !/[\s"“”‘’(【[]/.test(word.exampleKo[at - 1])) continue;
    return { blanked: word.exampleKo.split(form).join("____"), answer: form, conj };
  }
  return null;
}

function wordFormTarget(word, production = false) {
  if (!inflect || (word.pos !== "verb" && word.pos !== "adjective")) return null;
  let formName = "polite";
  if (word.lessonGroup === "honorifics" || word.lessonGroup === "irregular-families") {
    formName = "honorific";
  } else if (word.lessonGroup === "noun-modification") {
    formName = "attributive";
  } else if (production && (word.lessonGroup === "past-tense" || word.lessonGroup === "past-tense-negation")) {
    formName = "past";
  }
  const form = inflect.inflect(word, formName);
  if (!form || form === word.korean) return null;
  return { formName, form };
}

function makeWordQuestionBlueprint(word, direction) {
  if (!word) return null;
  if (["koToMeaning", "audioToMeaning", "meaningToKo", "audioToKo", "typeKo"].includes(direction)) {
    return { wordId: word.id, direction };
  }
  if (direction === "context") {
    const blank = deriveWordSentenceBlank(word);
    return blank ? { wordId: word.id, direction, blank } : null;
  }
  if (direction === "functionUsage") {
    const blank = word.isFunctionWord ? deriveWordSentenceBlank(word) : null;
    return blank ? { wordId: word.id, direction, blank } : null;
  }
  if (direction === "formRecognition") {
    const target = wordFormTarget(word, false);
    if (!target) return null;
    const matches = typeof inflect.recognize === "function"
      ? inflect.recognize(target.form, [word], [target.formName])
      : [];
    return matches.length ? { wordId: word.id, direction } : null;
  }
  if (direction === "formProduction") {
    return wordFormTarget(word, true) ? { wordId: word.id, direction } : null;
  }
  return null;
}

const wordById = new Map(words.map((word) => [word.id, word]));
// Execute the real lesson builder so a new branch cannot be missed by a stale
// copy of its control flow. The stub preserves the real direction feasibility
// rules while avoiding irrelevant option shuffling and HTML generation.
const wordBuilderSandbox = {
  generateWordQuestionFor: (word, direction) => makeWordQuestionBlueprint(word, direction),
};
vm.createContext(wordBuilderSandbox);
vm.runInContext(
  `${readFunction("ensureEveryWordTested")}\n${readFunction("buildWordLessonQuestions")}`,
  wordBuilderSandbox,
);
const generatedWordQuestions = lessons.flatMap((lesson) => {
  const ids = lesson.type === "checkpoint" ? (lesson.reviewWordIds || []) : (lesson.newWordIds || []);
  const lessonWords = ids.map((id) => wordById.get(id)).filter(Boolean);
  return wordBuilderSandbox.buildWordLessonQuestions(lesson, lessonWords)
    .map((question) => ({ ...question, lessonId: lesson.id, lessonType: lesson.type }));
});
const generatedWordCounts = new Map(coreWords.map((word) => [word.id, 0]));
const generatedWordModeCounts = new Map();
for (const question of generatedWordQuestions) {
  if (generatedWordCounts.has(question.wordId)) increment(generatedWordCounts, question.wordId);
  increment(generatedWordModeCounts, question.direction);
}
const generatedWordCountDistribution = new Map();
for (const count of generatedWordCounts.values()) increment(generatedWordCountDistribution, count);
const underTestedWords = [...generatedWordCounts.entries()].filter(([, count]) => count < 2);
if (underTestedWords.length) {
  errors.push(
    `Real Words generation tests ${underTestedWords.length}/${coreWords.length} core words fewer than twice: ${sampleList(underTestedWords.map(([id, count]) => `${id}(${count})`))}`,
  );
}

const declaredWordModes = new Map();
for (const lesson of lessons) {
  for (const checkpoint of lesson.checkpoints || []) increment(declaredWordModes, checkpoint);
}
const checkpointModeToDirection = new Map([
  ["ko-to-meaning", "koToMeaning"],
  ["audio-to-meaning", "audioToMeaning"],
  ["meaning-to-ko", "meaningToKo"],
  ["type-ko", "typeKo"],
  ["sentence-blank", "context"],
  ["function-usage", "functionUsage"],
  ["form-recognition", "formRecognition"],
  ["form-production", "formProduction"],
]);
for (const direction of checkpointModeToDirection.values()) {
  if (!generatedWordModeCounts.has(direction)) generatedWordModeCounts.set(direction, 0);
}
for (const [declaredMode, lessonCount] of declaredWordModes) {
  const direction = checkpointModeToDirection.get(declaredMode);
  if (!direction) continue;
  const emitted = generatedWordModeCounts.get(direction) || 0;
  if (emitted < 2) {
    errors.push(`Words mode ${declaredMode} is declared by ${lessonCount} lesson(s) but emits ${emitted} real question(s)`);
  }
}

const contextBlankLeaks = coreWords
  .map((word) => ({ word, blank: deriveWordSentenceBlank(word) }))
  .filter(({ blank }) => blank && blank.blanked.includes(blank.answer));
const scheduledContextLeakQuestions = generatedWordQuestions.filter((question) =>
  question.blank && question.blank.blanked.includes(question.blank.answer));
const wordBlankSources = `${readFunction("makeWordSentenceBlank")}\n${readFunction("makeConjugatedSentenceBlank")}`;
const splitAllBlankBranches = wordBlankSources.match(/\.split\(form\)\.join\("____"\)/g) || [];
if (splitAllBlankBranches.length < 2) {
  errors.push("Words context blanking does not remove every visible occurrence of its answer");
}
if (contextBlankLeaks.length) {
  errors.push(
    `Context blank leaves its answer visible in ${contextBlankLeaks.length} word row(s); ${scheduledContextLeakQuestions.length} generated occurrence(s) [${sampleList(scheduledContextLeakQuestions.map((question) => `${question.wordId}@${question.lessonId}`), 6)}]; rows: ${sampleList(contextBlankLeaks.map(({ word }) => word.id), 6)}`,
  );
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

const wordCheckpointRenderer = readFunction("wordLessonCheckHtml");
const wordTileSource = readFunction("getWordSyllableTiles");
const wordLessonBinder = readFunction("bindWordLessonRoot");
const wordLessonSerializer = readFunction("serializeWordLessonView");
const wordLessonRehydrator = readFunction("rehydrateWordLessonView");
const wordTypedAnswerSource = readFunction("answerWordLessonTyped");
const studyTypeStart = studyRenderer.indexOf('if (step.type === "type")');
const studyTypeEnd = studyRenderer.indexOf("// repeat / shadow", studyTypeStart);
const studyTypeRenderer = studyTypeStart >= 0 && studyTypeEnd > studyTypeStart
  ? studyRenderer.slice(studyTypeStart, studyTypeEnd)
  : "";

const wordTileTargets = coreWords.map((word) => {
  const target = getWordTypeTarget(word);
  const syllables = Array.from(target).filter((char) => /[ㄱ-ㆎ가-힣]/u.test(char));
  return { word, target, syllables };
});
const componentWordTiles = wordTileTargets.filter(({ syllables }) => syllables.length > 0);
const oneSyllableWordTiles = wordTileTargets.filter(({ syllables }) => syllables.length === 1);
const missingTargetWordTiles = wordTileTargets.filter(({ syllables }) => syllables.length === 0);
if (!wordTileSource.includes("/[ㄱ-ㆎ가-힣]/u.test") || missingTargetWordTiles.length) {
  errors.push(
    `Words tile keyboard cannot enter ${missingTargetWordTiles.length} target(s): ${sampleList(missingTargetWordTiles.map(({ word, target }) => `${word.id}(${target})`))}`,
  );
}

const helperBranchStart = wordLessonBinder.indexOf('if (event.target.closest("[data-word-show-tiles]"))');
const helperBranchEnd = wordLessonBinder.indexOf("const tileBtn", helperBranchStart);
const helperBranch = helperBranchStart >= 0 && helperBranchEnd > helperBranchStart
  ? wordLessonBinder.slice(helperBranchStart, helperBranchEnd)
  : "";
const helperStateIsTracked = helperBranch.includes("view.typeHelperVisible = true")
  && helperBranch.includes("persistWordLessonSession(view)")
  && wordLessonSerializer.includes("typeHelperVisible: Boolean(view.typeHelperVisible)")
  && wordLessonRehydrator.includes("typeHelperVisible: Boolean(snapshot.typeHelperVisible)");
const checkpointHelperIsAided = helperBranch.includes('if (view.mode === "check") view.questionHelperUsed = true')
  && wordTypedAnswerSource.includes("aided: Boolean(view.questionHelperUsed)")
  && wordTypedAnswerSource.includes('view.questionHelperUsed ? "aided" : "correct"');
const studyTilesAreGated = studyTypeRenderer.includes("view.typeHelperVisible || view.typedDone")
  && studyTypeRenderer.includes("data-word-show-tiles")
  && helperStateIsTracked;
if (!studyTilesAreGated && componentWordTiles.length) {
  errors.push(
    `Words study typing exposes target-answer tiles without a tracked helper for ${componentWordTiles.length}/${coreWords.length} word(s); ${oneSyllableWordTiles.length} show the whole answer in one tile`,
  );
}

const typeKoQuestions = generatedWordQuestions.filter((question) => question.direction === "typeKo");
const exactOneTileTypeKoQuestions = typeKoQuestions.filter((question) => {
  const word = wordById.get(question.wordId);
  const syllables = Array.from(word ? getWordTypeTarget(word) : "").filter((char) => /[ㄱ-ㆎ가-힣]/u.test(char));
  return syllables.length === 1;
});
const checkpointTilesAreGated = wordCheckpointRenderer.includes("view.typeHelperVisible || view.answered")
  && wordCheckpointRenderer.includes("data-word-show-tiles")
  && helperStateIsTracked
  && checkpointHelperIsAided;
if (!checkpointTilesAreGated && typeKoQuestions.length) {
  errors.push(
    `Words checkpoint typeKo exposes target-answer tiles without aided-state tracking in ${typeKoQuestions.length} question(s); ${exactOneTileTypeKoQuestions.length} show the whole answer in one tile`,
  );
}
const studyReferenceIndex = studyTypeRenderer.indexOf("data-word-open-reference");
const studyReferenceContext = studyReferenceIndex >= 0
  ? studyTypeRenderer.slice(Math.max(0, studyReferenceIndex - 220), studyReferenceIndex)
  : "";
const studyReferenceIsPostAnswer = studyReferenceIndex < 0 || studyReferenceContext.includes("view.typedDone ?");
const checkpointReferenceIsPostAnswer = wordCheckpointRenderer.includes("view.answered ? wordReferenceButtonHtml() :");
if (!studyReferenceIsPostAnswer || !checkpointReferenceIsPostAnswer) {
  errors.push("Words study/check screens expose the untracked full Word Bank before submission");
}
if (recallPrompt.includes("data-speak") && recallPrompt.includes("word.voiceText || word.korean")) {
  errors.push(`Words study typing exposes the exact Korean target through an untracked Hear control for ${coreWords.length} word(s)`);
}
const answerSpeakingWordDirections = new Set([
  "meaningToKo",
  "typeKo",
  "context",
  "functionUsage",
  "formRecognition",
]);
const answerSpeakingWordQuestions = generatedWordQuestions.filter((question) =>
  answerSpeakingWordDirections.has(question.direction));
const checkpointHearIsGated = wordCheckpointRenderer.includes(
  'question.voiceText && (view.answered || String(question.direction || "").startsWith("audio"))',
);
if (!checkpointHearIsGated && answerSpeakingWordQuestions.length) {
  errors.push(
    `Words checkpoints expose answers through an untracked Hear control in ${answerSpeakingWordQuestions.length} generated question(s)`,
  );
}

// Load the real Sentences bank/plan and reproduce the first curriculum pass.
// The real content planner doubles rows with index-aligned modes; checkpoints
// still sort and cap their review set independently.
for (const file of ["sentences_core.js", "sentences_lesson_plan.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, file), "utf8"), wordsSandbox, { filename: file });
}
const sentenceRows = wordsSandbox.window.HANAPATH_SENTENCES || [];
const sentenceLessons = wordsSandbox.window.HANAPATH_SENTENCE_LESSONS || [];
const sentenceUnits = wordsSandbox.window.HANAPATH_SENTENCE_UNITS || [];
const sentenceRowById = new Map(sentenceRows.map((row) => [row.id, row]));
const sentenceLessonById = new Map(sentenceLessons.map((lesson) => [lesson.id, lesson]));
const sentenceModes = readArray("SENTENCE_MODES");
const sentenceTransformTasks = readArray("SENTENCE_TRANSFORM_TASKS");

// Execute the current transform/mode/lesson-plan functions with real bank data
// rather than mirroring their branching in this audit.
const sentencePlannerSandbox = {
  window: { HANAPATH_INFLECT: inflect },
  curatedWordsById: wordById,
  SENTENCE_TRANSFORM_TASKS: sentenceTransformTasks,
};
vm.createContext(sentencePlannerSandbox);
vm.runInContext(
  [
    readFunction("tokenizeSentence"),
    readFunction("sentenceRowHasInflectedSurface"),
    readFunction("buildSentenceTransformForRow"),
    readFunction("normalizeSentenceLessonMode"),
    readFunction("buildSentenceLessonQuestionPlan"),
  ].join("\n"),
  sentencePlannerSandbox,
);

const sentenceContentMembership = new Map(sentenceRows.map((row) => [row.id, 0]));
const sentenceCheckpointMembership = new Map(sentenceRows.map((row) => [row.id, 0]));
for (const lesson of sentenceLessons) {
  for (const sentenceId of lesson.sentenceIds || []) {
    if (sentenceContentMembership.has(sentenceId)) increment(sentenceContentMembership, sentenceId);
  }
  for (const sentenceId of lesson.reviewSentenceIds || []) {
    if (sentenceCheckpointMembership.has(sentenceId)) increment(sentenceCheckpointMembership, sentenceId);
  }
}
const badSentenceMembership = sentenceRows.filter((row) =>
  sentenceContentMembership.get(row.id) !== 1 || sentenceCheckpointMembership.get(row.id) !== 1);
if (badSentenceMembership.length) {
  errors.push(
    `Sentence curriculum membership is not 1 content + 1 checkpoint for ${badSentenceMembership.length} row(s): ${sampleList(badSentenceMembership.map((row) => row.id))}`,
  );
}

const sentencePresentationCounts = new Map(sentenceRows.map((row) => [row.id, 0]));
const sentenceModeCounts = new Map();
const sentencePresentations = [];
let configuredTransformPrompts = 0;
let normalizedTransformPrompts = 0;
function addSentencePresentation(sentenceId, mode, source, lessonId) {
  const row = sentenceRowById.get(sentenceId);
  if (!row) {
    errors.push(`Sentence presentation references missing row ${sentenceId}`);
    return;
  }
  increment(sentencePresentationCounts, sentenceId);
  increment(sentenceModeCounts, mode);
  sentencePresentations.push({ row, mode, source, lessonId });
}

for (const lesson of sentenceLessons.filter((candidate) => candidate.type === "content")) {
  const studyRows = (lesson.sentenceIds || []).map((sentenceId) => sentenceRowById.get(sentenceId)).filter(Boolean);
  const runtimePlan = sentencePlannerSandbox.buildSentenceLessonQuestionPlan(lesson, studyRows);
  const expectedLength = studyRows.length * 2;
  if (
    runtimePlan.studyRows.length !== studyRows.length
    || runtimePlan.rows.length !== expectedLength
    || runtimePlan.drillPlan.length !== expectedLength
  ) {
    errors.push(
      `Sentence content planner returns mis-sized study/question decks for ${lesson.id}: ${runtimePlan.studyRows.length}/${runtimePlan.rows.length}/${runtimePlan.drillPlan.length}`,
    );
  }

  const configuredById = new Map((lesson.drillPlan || []).map((entry) => [entry.sentenceId, entry.mode]));
  for (let index = 0; index < runtimePlan.rows.length; index += 1) {
    const row = runtimePlan.rows[index];
    const entry = runtimePlan.drillPlan[index];
    if (!row || !entry || entry.sentenceId !== row.id) {
      errors.push(`Sentence content planner loses row/mode index alignment in ${lesson.id} at ${index}`);
      continue;
    }
    if (index < studyRows.length) {
      const configured = configuredById.get(row.id);
      if (!configured) errors.push(`Sentence content lesson ${lesson.id} has no drill mode for ${row.id}`);
      if (configured === "transform") {
        configuredTransformPrompts += 1;
        if (entry.mode !== "transform") normalizedTransformPrompts += 1;
      }
    } else {
      const firstMode = runtimePlan.drillPlan[index - studyRows.length]?.mode;
      if (firstMode === entry.mode) {
        errors.push(`Sentence content planner repeats ${row.id} twice in mode ${entry.mode}`);
      }
    }
    addSentencePresentation(row.id, entry.mode, "content", lesson.id);
  }
}

let cappedSentenceCheckpointPrompts = 0;
for (const unit of sentenceUnits) {
  const checkpoint = sentenceLessonById.get(unit.checkpointId);
  if (!checkpoint || checkpoint.type !== "checkpoint") {
    errors.push(`Sentence unit ${unit.id} is missing checkpoint ${unit.checkpointId}`);
    continue;
  }
  // A fresh learner has no box/due differences, so the live comparator falls
  // through to the stable sentence-id ordering before applying the cap.
  const reviewIds = (checkpoint.reviewSentenceIds || [])
    .filter((id) => sentenceRowById.has(id))
    .sort((a, b) => a.localeCompare(b));
  const maxPrompts = Math.max(1, Number(checkpoint.promptBounds?.max) || reviewIds.length);
  const selected = reviewIds.slice(0, maxPrompts);
  cappedSentenceCheckpointPrompts += selected.length;
  selected.forEach((sentenceId, index) => {
    const requestedMode = index === selected.length - 1
      ? "listen"
      : index === selected.length - 2
        ? "build"
        : "translate";
    const row = sentenceRowById.get(sentenceId);
    const mode = sentencePlannerSandbox.normalizeSentenceLessonMode(row, requestedMode);
    addSentencePresentation(sentenceId, mode, "checkpoint", checkpoint.id);
  });
}

const underTestedSentences = [...sentencePresentationCounts.entries()].filter(([, count]) => count < 2);
if (underTestedSentences.length) {
  errors.push(
    `Runtime curriculum tests ${underTestedSentences.length}/${sentenceRows.length} sentence(s) fewer than twice after checkpoint caps: ${sampleList(underTestedSentences.map(([id, count]) => `${id}(${count})`))}`,
  );
}

const requiredSentenceModes = sentenceModes.map((mode) => mode.id).filter((mode) => mode !== "mixed");
const underCoveredSentenceModes = requiredSentenceModes.filter((mode) => (sentenceModeCounts.get(mode) || 0) < 2);
if (underCoveredSentenceModes.length) {
  errors.push(
    `Sentence assessment mode(s) have fewer than 2 authored/runtime prompts: ${sampleList(underCoveredSentenceModes.map((mode) => `${mode}(${sentenceModeCounts.get(mode) || 0})`))}`,
  );
}

const sentenceLessonTypeCounts = new Map();
for (const lesson of sentenceLessons) increment(sentenceLessonTypeCounts, lesson.type || "missing");
const underCoveredSentenceLessonTypes = [...sentenceLessonTypeCounts.entries()].filter(([, count]) => count < 2);
if (underCoveredSentenceLessonTypes.length) {
  errors.push(
    `Sentence lesson type(s) occur fewer than twice: ${sampleList(underCoveredSentenceLessonTypes.map(([type, count]) => `${type}(${count})`))}`,
  );
}

const sentenceTagRows = new Map();
const sentenceTagPresentations = new Map();
for (const row of sentenceRows) {
  for (const tag of row.patternTags || []) {
    if (!sentenceTagRows.has(tag)) sentenceTagRows.set(tag, new Set());
    sentenceTagRows.get(tag).add(row.id);
  }
}
for (const presentation of sentencePresentations) {
  for (const tag of presentation.row.patternTags || []) increment(sentenceTagPresentations, tag);
}
const underCoveredSentenceTags = [...sentenceTagRows.entries()].filter(([tag, rowIds]) =>
  rowIds.size < 2 || (sentenceTagPresentations.get(tag) || 0) < 2);
if (underCoveredSentenceTags.length) {
  errors.push(
    `Sentence pattern tag(s) lack 2 distinct rows/presentations: ${sampleList(underCoveredSentenceTags.map(([tag, rowIds]) => `${tag}(rows=${rowIds.size},prompts=${sentenceTagPresentations.get(tag) || 0})`))}`,
  );
}

// Inspect the complete live pre-answer templates, including controls outside
// prompt/visual text. Deliberate helper-ladder reveals are tracked and are not
// flagged; global reference and interaction tiles currently are not.
const sentenceQuestionRenderer = readFunction("sentenceQuestionHtml");
const sentenceProgressRenderer = readFunction("sentenceSessionProgressHtml");
const sentenceReferenceRenderer = readFunction("openSentenceReferenceOverlay");
const sentenceEventBinder = readFunction("bindSentenceSessionRoot");

// Execute the live shadow renderer in unanswered states. The target may be
// present in the function's scored branch, so a source-string check would
// either miss regressions or reject the intentional post-attempt reveal.
const shadowKoreanProbe = "그림자 비밀 문장";
const shadowRomanizationProbe = "GEURIMJA-ROMANIZATION-PROBE";
const shadowSoundNoteProbe = "SHADOW-SOUND-NOTE-PROBE";
const shadowRowProbe = {
  id: "shadow-audit-probe",
  korean: shadowKoreanProbe,
  voiceText: shadowKoreanProbe,
  english: "Repeat the hidden line.",
  romanization: shadowRomanizationProbe,
  sourceWordIds: ["shadow-word-probe"],
  patternTags: [],
  tokens: [],
};
const shadowRendererSandbox = {
  window: { SpeechRecognition: function SpeechRecognitionProbe() {} },
  curatedWordsById: new Map([
    ["shadow-word-probe", { soundNote: shadowSoundNoteProbe }],
  ]),
  sentenceQuestionMode: () => "shadow",
  sentenceSessionProgressHtml: () => '<div data-progress-probe></div>',
  sentenceModeMetaHtml: (_row, label) => `<div>${label}</div>`,
  speakingScoreHtml: (target, transcript) => `<div>${target} ${transcript}</div>`,
  approximateSentenceRomanization: () => shadowRomanizationProbe,
  escapeHtml: (value) => String(value ?? ""),
};
vm.createContext(shadowRendererSandbox);
vm.runInContext(sentenceQuestionRenderer, shadowRendererSandbox);

function renderShadowProbe({ speechSupported, audioPlayed = false, speech = {} }) {
  shadowRendererSandbox.window = speechSupported
    ? { SpeechRecognition: function SpeechRecognitionProbe() {} }
    : {};
  return shadowRendererSandbox.sentenceQuestionHtml({
    rows: [shadowRowProbe],
    index: 0,
    modeId: "shadow",
    showRepeatPrompt: audioPlayed,
    speech,
  });
}

const supportedShadowPreAudio = renderShadowProbe({ speechSupported: true });
const supportedShadowPostAudio = renderShadowProbe({ speechSupported: true, audioPlayed: true });
const unsupportedShadowPreAudio = renderShadowProbe({ speechSupported: false });
for (const [label, probe] of [
  ["written Korean", shadowKoreanProbe],
  ["romanization", shadowRomanizationProbe],
  ["pronunciation note", shadowSoundNoteProbe],
]) {
  if (supportedShadowPreAudio.includes(probe) || supportedShadowPostAudio.includes(probe)) {
    errors.push(`Sentence shadow prompt renders ${label} before a scored attempt`);
  }
}
if (!supportedShadowPreAudio.includes("data-sentence-record")) {
  errors.push("Sentence shadow prompt does not make speech scoring the primary supported completion control");
}
if (
  supportedShadowPreAudio.includes("data-sentence-selfmark")
  || supportedShadowPostAudio.includes("data-sentence-selfmark")
) {
  errors.push("Sentence shadow prompt offers one-click self-marking while speech scoring is supported and unanswered");
}
if (unsupportedShadowPreAudio.includes("data-sentence-selfmark")) {
  errors.push("Sentence shadow prompt offers one-click self-marking before its audio has played");
}

// Exercise the delegated controls as the browser does. Shadow slow replay must
// stay audio-only, while the record control must enter the scoring pipeline.
let shadowSlowPlayCount = 0;
let shadowOverlayOpenCount = 0;
let shadowSpeechStartCount = 0;
const shadowBinderSession = {
  rows: [shadowRowProbe],
  index: 0,
  phase: "question",
  attempts: 0,
  showRepeatPrompt: false,
};
const shadowBinderSandbox = {
  sentenceStudioSession: shadowBinderSession,
  sentenceQuestionMode: () => "shadow",
  clearSentenceSessionTimeouts: () => {},
  speakSentenceSlow: () => { shadowSlowPlayCount += 1; },
  openSentenceSlowOverlay: () => { shadowOverlayOpenCount += 1; },
  startSentenceSpeechScoring: () => { shadowSpeechStartCount += 1; },
  renderPracticeView: () => {},
};
vm.createContext(shadowBinderSandbox);
vm.runInContext(sentenceEventBinder, shadowBinderSandbox);
const shadowListeners = {};
const shadowRootProbe = {
  querySelector: () => null,
  contains: () => true,
  addEventListener: (type, handler) => {
    if (!shadowListeners[type]) shadowListeners[type] = [];
    shadowListeners[type].push(handler);
  },
};
shadowBinderSandbox.bindSentenceSessionRoot(shadowRootProbe);
const shadowClickHandler = (shadowListeners.click || [])[0];
if (!shadowClickHandler) {
  errors.push("Sentence session root does not bind its delegated shadow controls");
} else {
  const clickControl = (attribute) => shadowClickHandler({
    target: {
      closest: (selector) => selector === `[${attribute}]` ? {} : null,
    },
  });
  clickControl("data-sentence-slow");
  clickControl("data-sentence-record");
  if (shadowSlowPlayCount !== 1 || shadowOverlayOpenCount !== 0) {
    errors.push("Sentence shadow slow replay can open the written-target overlay instead of staying audio-only");
  }
  if (shadowSpeechStartCount !== 1) {
    errors.push("Sentence shadow record control does not start supported speech scoring");
  }
}

const referenceBranchStart = sentenceEventBinder.indexOf("const referenceBtn");
const referenceBranchEnd = sentenceEventBinder.indexOf("const speakBtn", referenceBranchStart);
const referenceBranch = referenceBranchStart >= 0 && referenceBranchEnd > referenceBranchStart
  ? sentenceEventBinder.slice(referenceBranchStart, referenceBranchEnd)
  : "";
const sentenceProgressCalls = [];
let sentenceProgressCallAt = sentenceQuestionRenderer.indexOf("sentenceSessionProgressHtml(");
while (sentenceProgressCallAt >= 0) {
  const open = sentenceQuestionRenderer.indexOf("(", sentenceProgressCallAt);
  const close = findMatching(sentenceQuestionRenderer, open, "(", ")");
  sentenceProgressCalls.push(sentenceQuestionRenderer.slice(sentenceProgressCallAt, close + 1));
  sentenceProgressCallAt = sentenceQuestionRenderer.indexOf("sentenceSessionProgressHtml(", close + 1);
}
const questionEnablesReference = sentenceProgressCalls.some((call) => /,\s*true\s*\)$/.test(call));
const exactReferencePresentations = sentencePresentations.filter((presentation) =>
  ["translate", "build", "listen"].includes(presentation.mode));
if (
  questionEnablesReference
  && sentenceProgressRenderer.includes("data-sentence-reference")
  && sentenceReferenceRenderer.includes("escapeHtml(row.korean)")
  && referenceBranch
  && !referenceBranch.includes("markSentenceHelperUsed")
) {
  errors.push(
    `Sentence questions expose the exact Korean through an untracked Reference control in ${exactReferencePresentations.length} mandatory prompt(s)`,
  );
}

const sentenceTilePoolSource = readFunction("makeSentenceTilePool");
const buildSentencePresentations = sentencePresentations.filter((presentation) => presentation.mode === "build");
const shortBuildSentencePresentations = buildSentencePresentations.filter((presentation) =>
  (presentation.row.tokens || []).length <= 2);
if (
  sentenceQuestionRenderer.includes("data-sentence-tile")
  && sentenceTilePoolSource.includes("const tiles = (row.tokens || []).map")
  && shortBuildSentencePresentations.length
) {
  errors.push(
    `Sentence build leaves ${shortBuildSentencePresentations.length}/${buildSentencePresentations.length} prompt(s) trivial with only 1-2 target tokens`,
  );
}
if (!sentenceTilePoolSource.includes("return shuffle(tiles.concat(distractors))")) {
  errors.push("Sentence build tile pool is not explicitly shuffled after adding answer tokens");
}

// Execute dormant generic factories too, so re-routing one cannot revive a
// copy-the-answer prompt. Options are excluded: seeing possible choices is the
// assessment itself; duplicating the exact answer in prompt/detail/visual is not.
const legacyFactorySandbox = {
  verbHonorificBank: readArray("verbHonorificBank"),
  conversationDialogueBank: readArray("conversationDialogueBank"),
  randomItem: (items) => items[0],
  makeTextChoices: (answer, pool) => [answer, ...pool.filter((item) => item !== answer).slice(0, 3)],
  escapeHtml: (value) => String(value),
};
vm.createContext(legacyFactorySandbox);
vm.runInContext(
  `${readFunction("generateVerbHonorificQuestion")}\n${readFunction("generateConversationDialogueQuestion")}`,
  legacyFactorySandbox,
);
for (const [label, bankName, factoryName] of [
  ["Generic verb honorific factory", "verbHonorificBank", "generateVerbHonorificQuestion"],
  ["Generic conversation dialogue factory", "conversationDialogueBank", "generateConversationDialogueQuestion"],
]) {
  const leaks = [];
  for (const item of legacyFactorySandbox[bankName]) {
    legacyFactorySandbox.randomItem = (items) => items.includes(item) ? item : items[0];
    const question = legacyFactorySandbox[factoryName]();
    const preAnswerCopy = visibleText([question.prompt, question.detail, question.visual].join(" "));
    if (preAnswerCopy.includes(String(question.answer))) leaks.push(question.answer);
  }
  if (leaks.length) {
    errors.push(`${label} renders its answer verbatim in ${leaks.length} row(s): ${sampleList(leaks, 5)}`);
  }
}

const genericQuestionRenderer = readFunction("renderQuestion");
if (!genericQuestionRenderer.includes("currentAnswered || audioIsPrompt || !answerIsHangul")) {
  errors.push("Generic quiz Hear control is not gated behind an answered state or an explicit audio prompt");
}

const transcriptProbe = "비밀문장";
const meaningListenSandbox = {
  getRepeatBandSlice: (items) => items,
  randomItem: (items) => items[0],
  createSentenceChoiceOptions: (item) => [item.meaning, "one", "two", "three"],
  escapeHtml: (value) => String(value),
  getTrackLevel: () => 1,
};
vm.createContext(meaningListenSandbox);
vm.runInContext(readFunction("makeMeaningListenQuestion"), meaningListenSandbox);
const meaningListenQuestion = meaningListenSandbox.makeMeaningListenQuestion([
  { korean: transcriptProbe, meaning: "hidden transcript probe", voiceText: transcriptProbe },
], "Probe", "Listen.", "Audio only.", 1);
const meaningListenPreAnswerCopy = visibleText([
  meaningListenQuestion.prompt,
  meaningListenQuestion.detail,
  meaningListenQuestion.visual,
  meaningListenQuestion.helper,
].join(" "));
if (meaningListenPreAnswerCopy.includes(transcriptProbe)) {
  errors.push("Phrase/conversation listening factory renders the Korean transcript before the audio-only answer");
}

console.log("Learning question audit");
console.log("=======================");
console.log(`Alphabet jamo       : ${allJamo.length}`);
console.log(`Alphabet directions : ${directions.length}`);
console.log(`Coverage pairs       : ${scheduled.size}`);
console.log(`Max finite drill     : ${maxFiniteDrillLength}/${requiredAlphabetPairs}`);
console.log(`Phase One questions  : ${phaseOneLessons.reduce((sum, lesson) => sum + (lesson.questions || []).length, 0)}`);
console.log(`Required core words  : ${coreWords.length}`);
console.log(`Generated word qs    : ${generatedWordQuestions.length} (${Math.min(...generatedWordCounts.values())} min/word)`);
console.log(`Word q distribution  : ${mapSummary(generatedWordCountDistribution)}`);
console.log(`Word modes           : ${mapSummary(generatedWordModeCounts)}`);
console.log(`Sentence rows        : ${sentenceRows.length}`);
console.log(`Sentence prompts     : ${sentencePresentations.length} (${cappedSentenceCheckpointPrompts} checkpoint)`);
console.log(`Sentence <2 prompts  : ${underTestedSentences.length}`);
console.log(`Transform normalized : ${normalizedTransformPrompts}/${configuredTransformPrompts}`);
console.log(`Sentence modes       : ${mapSummary(sentenceModeCounts)}`);
console.log(`Sentence types       : ${mapSummary(sentenceLessonTypeCounts)}`);
console.log(`Sentence tags        : ${sentenceTagRows.size}`);
console.log(`Failure groups       : ${errors.length}`);

if (errors.length) {
  console.log("\nQuestion coverage problems:");
  for (const error of errors) console.log(`  - ${error}`);
  process.exit(1);
}

console.log("\nResult: every required item is assessed twice in a finite learner path and no untracked pre-answer surface reveals its target.");
