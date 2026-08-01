#!/usr/bin/env node
// Regression gate for the PRs #1-#50 audit findings on Words/Sentences
// assessment and analytics (PR #37 SRS and pass-rule defects, PR #48 response
// time defects). Each block reproduces the original defect and then asserts the
// corrected behaviour, so a future edit cannot quietly restore it.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const appSource = readFileSync(join(ROOT, "app.js"), "utf8");

// ── Extract real app.js declarations ─────────────────────────────────────────
// The audited behaviour lives inside the monolithic browser script, so the gate
// runs the actual shipped function bodies rather than a restatement of them.

// Brace matching that ignores braces inside strings and comments, and that only
// starts once the parameter list is closed (so `meta = {}` defaults are safe).
function extractFunction(name) {
  const start = appSource.indexOf(`\nfunction ${name}(`);
  assert.notEqual(start, -1, `app.js must declare function ${name}`);
  const bodyStart = appSource.indexOf("{", appSource.indexOf(")", start));
  assert.notEqual(bodyStart, -1, `unterminated signature for ${name}`);

  let depth = 0;
  let quote = "";
  let comment = "";
  for (let i = bodyStart; i < appSource.length; i += 1) {
    const char = appSource[i];
    const next = appSource[i + 1];
    if (comment) {
      if (comment === "//" && char === "\n") comment = "";
      else if (comment === "/*" && char === "*" && next === "/") { comment = ""; i += 1; }
      continue;
    }
    if (quote) {
      if (char === "\\") { i += 1; continue; }
      if (char === quote) quote = "";
      continue;
    }
    if (char === "/" && (next === "/" || next === "*")) { comment = `/${next}`; i += 1; continue; }
    if (char === "\"" || char === "'" || char === "`") { quote = char; continue; }
    if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) return appSource.slice(start + 1, i + 1);
    }
  }
  throw new Error(`unbalanced body for ${name}`);
}

function extractConst(name) {
  const array = appSource.match(new RegExp(`\\nconst ${name} = \\[[\\s\\S]*?\\n\\];`));
  if (array) return `${array[0]}\n`;
  const scalar = appSource.match(new RegExp(`\\nconst ${name} = [^\\n;]+;`));
  assert.ok(scalar, `app.js must declare const ${name}`);
  return `${scalar[0]}\n`;
}

let now = 1_000_000_000_000;
const sandbox = {
  console,
  Math,
  Number,
  Object,
  Array,
  String,
  Boolean,
  JSON,
  Map,
  Set,
  Date: { now: () => now },
  document: undefined,
};
vm.createContext(sandbox);

const PRELUDE = `
var wordBankStatusVersion = 0;
var documentHiddenTotalMs = 0;
var documentHiddenSince = 0;
var state = { vocabSrs: {}, vocabReviewEvents: [], vocabLessonCompleted: [], vocabLessonActive: null, vocabLessonSession: null };
var curatedWordsById = new Map();
var wordReferenceById = new Map();
var setVocabStatusCalls = [];
function setVocabStatus(rank, status) { setVocabStatusCalls.push({ rank, status }); }
function saveState() {}
var sentenceProgress = { results: {} };
function getSentencesProgress() { return sentenceProgress; }
var sentenceStudioSession = { helperUsed: [], questionStartedAt: 0, questionHiddenBaselineMs: 0, results: [], index: 0, rows: [] };
function sentenceQuestionMode() { return "translate"; }
function pushSentenceReviewEvent() { return null; }
function rememberRecentQuestionKey() {}
function sentenceQuestionKey() { return "k"; }
function markSentencesDirty() {}
`;

vm.runInContext(PRELUDE, sandbox, { filename: "prelude.js" });
for (const constant of ["VOCAB_SRS_INTERVALS", "VOCAB_REVIEW_EVENT_LIMIT", "RESPONSE_TIME_CAP_MS"]) {
  vm.runInContext(extractConst(constant), sandbox, { filename: `${constant}.js` });
}
for (const name of [
  "getVocabGradedAnswerCount",
  "getVocabSrsRecord",
  "getSrsDirectionRecord",
  "normalizeVocabReviewResult",
  "inferVocabErrorType",
  "estimateVocabConfidence",
  "normalizeVocabReviewEvent",
  "pushVocabReviewEvent",
  "recordVocabAttempt",
  "setCuratedWordStatus",
  "getWordLessonResultStats",
  "wordLessonPassed",
  "getDocumentHiddenTotalMs",
  "getActiveElapsedMs",
]) {
  vm.runInContext(extractFunction(name), sandbox, { filename: `${name}.js` });
}

const INTERVALS = vm.runInContext("VOCAB_SRS_INTERVALS", sandbox);
const FIVE_MIN = 5 * 60 * 1000;
const TWENTY_MIN = 20 * 60 * 1000;
assert.equal(INTERVALS[0], FIVE_MIN, "box 0 must remain the five-minute interval");
assert.equal(INTERVALS[1], TWENTY_MIN, "box 1 must remain the twenty-minute interval");

const run = (expression) => vm.runInContext(expression, sandbox);
const registerWord = (id, rank = null) => {
  run(`curatedWordsById.set(${JSON.stringify(id)}, { id: ${JSON.stringify(id)} });`);
  if (rank !== null) run(`wordReferenceById.set(${JSON.stringify(id)}, { id: ${JSON.stringify(id)}, rank: ${rank} });`);
};
const srs = (id) => run(`state.vocabSrs[${JSON.stringify(id)}]`);
const reset = () => run("state.vocabSrs = {}; state.vocabReviewEvents = []; setVocabStatusCalls = [];");

// ── PR #37: a fresh word's first correct answer skipped the first interval ────
{
  reset();
  registerWord("w-first");
  run(`recordVocabAttempt("w-first", "koToMeaning", true, { source: "quiz" });`);
  const record = srs("w-first");
  assert.equal(record.box, 0, "the first graded answer must serve box 0, not jump to box 1");
  assert.equal(record.due - now, FIVE_MIN, "first correct review must come back after five minutes");
  assert.equal(record.directions.koToMeaning.box, 0, "direction records must not skip the first interval either");
  assert.equal(record.directions.koToMeaning.due - now, FIVE_MIN);

  run(`recordVocabAttempt("w-first", "koToMeaning", true, { source: "quiz" });`);
  const promoted = srs("w-first");
  assert.equal(promoted.box, 1, "the second correct answer must promote");
  assert.equal(promoted.due - now, TWENTY_MIN, "the second correct review must use box 1");
  assert.equal(promoted.directions.koToMeaning.box, 1);
}

// A word only introduced by a lesson (seen bumped, never answered) must still
// start at box 0 on its first real answer.
{
  reset();
  registerWord("w-introduced");
  run(`state.vocabSrs["w-introduced"] = { box: 0, due: ${now}, seen: 1, correct: 0, missed: 0, lastSeen: 0, lastResult: null, isKnown: false, isHard: false, leech: false, directions: {}, introducedAt: ${now} };`);
  run(`recordVocabAttempt("w-introduced", "koToMeaning", true, { source: "lesson" });`);
  const record = srs("w-introduced");
  assert.equal(record.box, 0, "introduction is not a graded review and must not authorise promotion");
  assert.equal(record.due - now, FIVE_MIN);
}

// A wrong answer still resets to box 0 and marks the word hard.
{
  reset();
  registerWord("w-missed");
  run(`recordVocabAttempt("w-missed", "koToMeaning", true, { source: "quiz" });`);
  run(`recordVocabAttempt("w-missed", "koToMeaning", true, { source: "quiz" });`);
  run(`recordVocabAttempt("w-missed", "koToMeaning", false, { source: "quiz" });`);
  const record = srs("w-missed");
  assert.equal(record.box, 0, "a miss must still reset the box");
  assert.equal(record.isHard, true);
  assert.equal(record.due - now, FIVE_MIN);
}

// Leech detection must divide by graded answers, not by the `seen` marker.
{
  reset();
  registerWord("w-leech");
  run(`state.vocabSrs["w-leech"] = { box: 0, due: 0, seen: 40, correct: 2, missed: 5, lastSeen: 0, lastResult: null, isKnown: false, isHard: false, leech: false, directions: {} };`);
  run(`recordVocabAttempt("w-leech", "koToMeaning", false, { source: "quiz" });`);
  assert.equal(srs("w-leech").leech, true, "an inflated `seen` count must not hide a leech");
}

// ── PR #37: manual "known" fabricated review evidence ────────────────────────
{
  reset();
  registerWord("w-manual", 12);
  run(`setCuratedWordStatus("w-manual", "known");`);
  const record = srs("w-manual");
  assert.equal(record.box, 0, "tapping known must not claim four successful reviews");
  assert.equal(record.correct, 0, "manual status must not invent correct answers");
  assert.equal(record.missed, 0);
  assert.equal(run(`getVocabGradedAnswerCount(state.vocabSrs["w-manual"])`), 0, "manual status is not review evidence");
  assert.equal(record.isKnown, true, "the learner declaration itself must still be recorded");
  assert.equal(record.manualStatus, "known", "the declaration must be labelled as manual");
  assert.ok(record.due >= now + INTERVALS[4], "a declared word must stop crowding the review queue");
  assert.equal(run("JSON.stringify(setVocabStatusCalls)"), '[{"rank":12,"status":"known"}]', "legacy rank sets must stay in sync");
}

// A word with genuinely earned progress keeps it when marked known.
{
  reset();
  registerWord("w-earned");
  run(`recordVocabAttempt("w-earned", "koToMeaning", true, { source: "quiz" });`);
  run(`recordVocabAttempt("w-earned", "koToMeaning", true, { source: "quiz" });`);
  const earnedBox = srs("w-earned").box;
  run(`setCuratedWordStatus("w-earned", "known");`);
  assert.equal(srs("w-earned").box, earnedBox, "manual status must neither invent nor destroy earned progress");
  assert.equal(run(`getVocabGradedAnswerCount(state.vocabSrs["w-earned"])`), 2);
}

// Clearing a manual status removes the label.
{
  reset();
  registerWord("w-clear");
  run(`setCuratedWordStatus("w-clear", "hard");`);
  assert.equal(srs("w-clear").manualStatus, "hard");
  run(`setCuratedWordStatus("w-clear", "clear");`);
  assert.equal(srs("w-clear").manualStatus, null);
  assert.equal(srs("w-clear").isKnown, false);
  assert.equal(srs("w-clear").isHard, false);
}

// ── PR #37: empty result sets scored 100% and satisfied pass thresholds ───────
{
  const emptyView = { results: [], typedAttempts: {}, words: [{ id: "a" }] };
  assert.equal(run("getWordLessonResultStats")(emptyView).pct, 0, "no graded answers must not report a perfect score");
  assert.equal(
    run("wordLessonPassed")({ id: "l1", pass: { minFirstTryPct: 75 } }, emptyView),
    false,
    "a lesson with words but no graded answers must not pass",
  );

  const wordlessView = { results: [], typedAttempts: {}, words: [] };
  assert.equal(
    run("wordLessonPassed")({ id: "l0", pass: { minFirstTryPct: 75 } }, wordlessView),
    false,
    "an empty session must never pass, whatever it carried",
  );
}

// ── PR #37: requireTypedAttempt accepted skipped type cards ──────────────────
{
  const passed = run("wordLessonPassed");
  const lesson = { id: "l2", pass: { minFirstTryPct: 75, requireTypedAttempt: true } };
  const words = [{ id: "a" }, { id: "b" }];
  const results = [{ correct: true }, { correct: true }, { correct: true }, { correct: true }];

  assert.equal(
    passed(lesson, { results, words, typedAttempts: { a: false, b: false } }),
    false,
    "skipping every type card must not satisfy a typed-attempt requirement",
  );
  assert.equal(
    passed(lesson, { results, words, typedAttempts: { a: true, b: false } }),
    false,
    "one skipped type card must still fail the requirement",
  );
  assert.equal(
    passed(lesson, { results, words, typedAttempts: { a: true, b: true } }),
    true,
    "typing every word correctly must pass",
  );
  assert.equal(
    passed(lesson, { results, words, typedAttempts: { a: true } }),
    false,
    "a missing type card must fail the requirement",
  );
  assert.equal(
    passed({ id: "l3", pass: { minFirstTryPct: 75 } }, { results: [{ correct: true }, { correct: false }, { correct: true }, { correct: true }], words, typedAttempts: {} }),
    true,
    "lessons without the typed requirement keep their accuracy-only rule",
  );

  // The requirement asks whether typed production was ever demonstrated, so both
  // writers must be sticky. A later miss must not erase an earlier success.
  assert.match(
    appSource,
    /view\.typedAttempts\[typedAttemptKey\] = isCorrect \|\| Boolean\(view\.typedAttempts\[typedAttemptKey\]\)/,
    "the check-phase typed writer must not overwrite a demonstrated success",
  );
  assert.match(
    appSource,
    /view\.typedAttempts\[step\.wordId\] = isCorrect \|\| Boolean\(view\.typedAttempts\[step\.wordId\]\)/,
    "the study-phase typed writer must stay sticky",
  );
  assert.equal(
    passed({ id: "l4", pass: { minFirstTryPct: 75 } }, { results: [{ correct: true }, { correct: false }], words, typedAttempts: {} }),
    false,
    "the accuracy threshold must still be enforced",
  );
}

// ── PR #48: response time counted hidden-tab and idle time ───────────────────
{
  const elapsed = run("getActiveElapsedMs");
  const started = now;

  now = started + 4000;
  assert.equal(elapsed(started, 0), 4000, "visible thinking time is real response time");

  // Four seconds of thinking, then thirty minutes with the document hidden.
  now = started + 4000 + (30 * 60 * 1000);
  run(`documentHiddenTotalMs = ${30 * 60 * 1000};`);
  assert.equal(elapsed(started, 0), 4000, "hidden-document time must not be charged as response time");

  // A card opened before the learner ever hid the tab keeps its own baseline.
  run("documentHiddenTotalMs = 0;");
  now = started;
  const second = now;
  now = second + 90_000;
  assert.equal(elapsed(second, 0), 90_000);

  // Idle-but-visible time is bounded instead of reported verbatim.
  now = second + (6 * 60 * 60 * 1000);
  assert.equal(elapsed(second, 0), 5 * 60 * 1000, "a single answer must never report hours of response time");

  assert.equal(elapsed(0, 0), 0, "an unstarted timer reports no response time");
  assert.equal(elapsed(undefined, 0), 0);
  now = started;
}

// ── PR #37: the same first-interval skip in the Sentence SRS ─────────────────
{
  vm.runInContext(extractFunction("recordSentenceResult"), sandbox, { filename: "recordSentenceResult.js" });
  run("sentenceProgress.results = {}; sentenceStudioSession.helperUsed = []; sentenceStudioSession.results = [];");
  const row = `{ id: "s0001", korean: "안녕하세요", tokens: ["안녕하세요"] }`;

  run(`recordSentenceResult(${row}, true, false, { latencyMs: 1000 });`);
  let record = run(`sentenceProgress.results.s0001`);
  assert.equal(record.box, 0, "a first correct sentence answer must serve box 0");
  assert.equal(record.due - now, FIVE_MIN);
  assert.equal(record.correct, 1);

  run(`recordSentenceResult(${row}, true, false, { latencyMs: 1000 });`);
  record = run(`sentenceProgress.results.s0001`);
  assert.equal(record.box, 1, "the second correct sentence answer must promote");
  assert.equal(record.due - now, TWENTY_MIN);

  // Helper-assisted answers still never promote.
  run("sentenceStudioSession.helperUsed = ['reveal'];");
  run(`recordSentenceResult(${row}, true, false, { latencyMs: 1000 });`);
  assert.equal(run(`sentenceProgress.results.s0001.box`), 1, "helper-assisted answers must not promote");
  run("sentenceStudioSession.helperUsed = [];");

  run(`recordSentenceResult(${row}, false, false, { latencyMs: 1000 });`);
  record = run(`sentenceProgress.results.s0001`);
  assert.equal(record.box, 0, "a wrong sentence answer must still reset the box");
  assert.equal(record.lapses, 1);
}

// ── Source contracts the behavioural blocks cannot observe ───────────────────
assert.match(
  appSource,
  /record\.introducedAt = Date\.now\(\);/,
  "lesson completion must label an introduced word instead of implying a review",
);
assert.doesNotMatch(
  appSource,
  /record\.box = Math\.max\(record\.box, 4\);/,
  "manual known must not restore the fabricated box-4 promotion",
);
assert.doesNotMatch(
  appSource,
  /const pct = total \? Math\.round\(\(firstTryCorrect \/ total\) \* 100\) : 100;/,
  "an empty result set must not restore the 100% fallback",
);
assert.doesNotMatch(
  appSource,
  /view\.words\.every\(\(word\) => word\.id in view\.typedAttempts\)/,
  "requireTypedAttempt must not fall back to attempt existence",
);
assert.match(
  appSource,
  /document\.addEventListener\("visibilitychange"/,
  "response-time measurement must observe document visibility",
);

console.log("Words and Sentences assessment integrity passed.");
