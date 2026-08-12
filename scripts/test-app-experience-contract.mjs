#!/usr/bin/env node
// Focused regression for PR #391's learner-experience contract. This stays
// deliberately cheap: it locks the high-risk source and shell invariants
// without running the expensive exam seed sweeps.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

const contract = read("app_experience_contract.js");
const contractCss = read("app_experience_contract.css");
const policy = read("hangul_mastery_scoring_policy.js");
const index = read("index.html");
const sw = read("sw.js");
const app = read("app.js");
const hangulAudit = read("scripts/audit-hangul-mastery-exam.mjs");
const amendment = read("docs/HANGUL_MASTERY_SCORING_POLICY_AMENDMENT.md");

function readFunction(name) {
  const start = app.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `${name} is missing from app.js`);
  const braceStart = app.indexOf("{", start);
  let depth = 0;
  for (let index = braceStart; index < app.length; index += 1) {
    if (app[index] === "{") depth += 1;
    if (app[index] === "}") depth -= 1;
    if (depth === 0) return app.slice(start, index + 1);
  }
  throw new Error(`${name} has an unbalanced body`);
}

// Generic practice must keep question generation scoped to the active tab;
// otherwise a stale global studio can leak Alphabet questions into Vocabulary
// (or another subject) after the first answered prompt.
assert.match(
  app,
  /function generateFreshQuestion\(scope = getCurrentQuizScope\(\)[\s\S]*?generateQuestion\(safeScope\)/,
  "scoped practice must pass the active subject into question generation",
);
assert.match(
  app,
  /function generateQuestion\(scope = null\)[\s\S]*?const studio = getQuestionStudio\(scope\);[\s\S]*?const pools = getPools\(studio\);/,
  "question generation must derive routing and pools from one effective studio",
);
assert.match(
  app,
  /const SPECIAL_PRACTICE_STUDIOS = new Set\(\["sound", "survival", "grammar", "verb", "conversation"\]\);/,
  "every specialist studio must be protected from generic tab scope routing",
);

// Run the scope and pool logic, not just source matching. Generic subject
// tabs must recover from stale state, while an explicitly selected specialist
// drill remains selected and Alphabet always takes its progression-aware pool.
const scopeSandbox = vm.createContext({
  state: { studio: "alphabet" },
  getStudioForNavTab: (tab) => ({ today: "alphabet", library: "vocab", practice: "sentences", listening: "listen" }[tab]),
  getNavTabForMainTab: (tab) => ({ alphabet: "today", vocabulary: "library", sentences: "practice", listening: "listening" }[tab]),
  normalizeMainTab: (tab) => (["alphabet", "vocabulary", "sentences", "listening"].includes(tab) ? tab : "alphabet"),
  getTrackLevel: () => 10,
  getAlphabetQuizPools: () => ({ label: "progression-aware alphabet" }),
  SIMPLE_INITIALS: [],
  SIMPLE_MEDIALS: [],
  SIMPLE_FINALS: [],
  INITIALS: [],
  MEDIALS: [],
  FINALS: [],
});
vm.runInContext(
  [
    readFunction("getStudio"),
    'const SPECIAL_PRACTICE_STUDIOS = new Set(["sound", "survival", "grammar", "verb", "conversation"]);',
    readFunction("getQuestionStudio"),
    readFunction("getPools"),
    "this.getQuestionStudio = getQuestionStudio; this.getPools = getPools;",
  ].join("\n"),
  scopeSandbox,
);
scopeSandbox.state.studio = "alphabet";
assert.equal(scopeSandbox.getQuestionStudio("vocabulary"), "vocab", "Vocabulary scope must recover from stale Alphabet state");
for (const studio of ["sound", "survival", "grammar", "verb", "conversation"]) {
  scopeSandbox.state.studio = studio;
  assert.equal(scopeSandbox.getQuestionStudio("alphabet"), studio, `${studio} drill must survive generic scope routing`);
}
const alphabetPools = scopeSandbox.getPools("alphabet");
assert.equal(alphabetPools.label, "progression-aware alphabet", "Alphabet scope must use the canonical progression pool");

// Structural lesson surfaces stay neutral in static CSS. Do not recreate the
// old top-right accent bloom or inject policy CSS at runtime from JavaScript.
assert.match(contractCss, /\.alphabet-lesson-player\s*\{\s*background:\s*var\(--panel\);\s*\}/s);
assert.doesNotMatch(contractCss, /radial-gradient/);
assert.doesNotMatch(contract, /hanapath-experience-surface-policy/);
assert.doesNotMatch(contract, /document\.createElement\(["']style["']\)/);

// Korean keyboard recommendation: a real accessible dialog that persists
// until the learner dismisses it. Showing the modal alone must not mark it seen.
assert.match(contract, /role="dialog"/);
assert.match(contract, /aria-modal="true"/);
assert.match(contract, /aria-labelledby="koreanKeyboardModalTitle"/);
assert.match(contract, /aria-describedby="koreanKeyboardModalCopy"/);
assert.match(contract, /document\.querySelector\("\.korean-keyboard-modal-overlay"\)/);
assert.match(contract, /event\.key === "Escape"/);
assert.match(contract, /event\.key !== "Tab"/);
assert.match(contract, /restoreFocus/);
assert.match(contract, /previousFocus\.focus\(\)/);
assert.match(
  contract,
  /const dismiss = \(\) => \{[\s\S]{0,240}state\.hasSeenKoreanKeyboardModal = true;[\s\S]{0,100}saveState\(\)/,
  "keyboard recommendation should persist its seen flag only when dismissed",
);
const dismissAt = contract.indexOf("const dismiss = () => {");
const firstSeenWrite = contract.indexOf("state.hasSeenKoreanKeyboardModal = true;");
assert.ok(dismissAt >= 0 && firstSeenWrite > dismissAt, "showing the keyboard recommendation must not mark it seen before dismissal");
assert.doesNotMatch(contract, /setTimeout\(dismiss,\s*7000\)/, "keyboard recommendation must not disappear on a timer");
for (const token of ["--scrim", "--card", "--border", "--text", "--muted"]) {
  assert.ok(contract.includes(token), `keyboard modal must use canonical theme token ${token}`);
}
for (const staleToken of ["--card-bg", "--border-color", "--text-color", "--text-sub"]) {
  assert.ok(!contract.includes(staleToken), `keyboard modal must not rely on undefined theme token ${staleToken}`);
}

// Progress denominators and exam totals are live data, not copied scorecard
// numbers. Formal achievement counts only immutable full-provenance hanaPath
// records, excluding Practice and legacy-incomplete compatibility records.
for (const liveSource of [
  "getAlphabetProgress()",
  "getWordLessons()",
  "window.HANAPATH_SENTENCE_LESSONS",
  "getFormChecks()",
  "window.HANAPATH_WORD_EXAMS",
  "window.HANAPATH_SENTENCE_EXAMS",
]) {
  assert.ok(contract.includes(liveSource), `Progress must derive from ${liveSource}`);
}
assert.doesNotMatch(
  contract,
  /getWordLessons\(\)\.filter[\s\S]{0,160}checkpoint/,
  "Progress must count the full live Word curriculum, including checkpoint lessons",
);
assert.match(
  app,
  /function isWordUnitCrowned\(unit\) \{ return Boolean\(unit && isWordLessonCompleted\(unit\.checkpointId\)\); \}/,
  "Word unit crowns must remain backed by checkpoint lesson completion",
);
assert.match(
  app,
  /if \(wordLessonPassed\(lesson, view\)\) \{[\s\S]{0,180}state\.vocabLessonCompleted\.push\(lesson\.id\)/,
  "passed Word checkpoints must remain in the same completion store as content lessons",
);
assert.match(
  app,
  /function isSentenceUnitCrowned\(unit, completedSet\)[\s\S]{0,220}activeCompleted\.has\(unit\.checkpointId\)/,
  "Sentence unit crowns must remain backed by checkpoint lesson completion",
);
assert.match(
  app,
  /if \(firstTryPct >= requiredPct && !progress\.completedLessons\.includes\(session\.lessonId\)\) \{[\s\S]{0,120}progress\.completedLessons\.push\(session\.lessonId\)/,
  "passed Sentence checkpoints must remain in the same completion store as content lessons",
);
assert.match(contract, /record\.status !== "hanaPath"/);
assert.match(contract, /record\.floorSummary\?\.passed !== true/);
assert.match(contract, /const hangulFormalPassed = examRecords\.some/);
assert.match(contract, /record\?\.examId === "hangul-mastery-exam"/);
assert.match(contract, /record\.status === "hanaPath"/);
assert.match(contract, /record\.floorSummary\?\.passed === true/);
assert.match(contract, /\(hangulFormalPassed \? 1 : 0\)/);
assert.doesNotMatch(contract, /\|\|\s*284\b/);
assert.doesNotMatch(contract, /\|\|\s*703\b/);
assert.doesNotMatch(contract, /\|\|\s*17\b/);
assert.doesNotMatch(contract, />\$\{wordExamCount\}\/10</);
assert.doesNotMatch(contract, />\$\{sentenceExamCount\}\/5</);

// Browser/PWA Back needs a sentinel above the app root. Root exit must not leave
// HanaPath without a guard when browser history has nowhere to go, and Forward
// re-entry must repair the sentinel without hijacking unrelated history.
assert.match(contract, /history\.replaceState\(rootState/);
assert.match(contract, /history\.pushState\(guardState/);
assert.match(contract, /if \(handleHanaPathBackAction\(\)\)/);
assert.match(contract, /releasingToBrowser = true/);
assert.match(contract, /window\.history\.back\(\)/);
assert.match(contract, /window\.addEventListener\("pageshow"/);
assert.match(contract, /leftHanaPathHistory/);
assert.match(contract, /event\.state\?\.hanaPath !== true/);
assert.match(contract, /pushGuardFromRoot\(\)/);
assert.match(contract, /releaseWatchdog = window\.setTimeout/);
assert.match(contract, /Never hijack unrelated same-document history entries/);

// Current Hangul mastery policy is explicit and regression-locked to 150/200.
assert.match(policy, /requiredCorrect:\s*150/);
assert.match(policy, /passPct:\s*75/);
assert.match(policy, /exam\.requiredCorrect = policy\.requiredCorrect/);
assert.match(amendment, /150\/200 \(75%\) or better/);
assert.match(app, /const mastered = correct >= 150 && total === 200/);
assert.match(hangulAudit, /hangul_mastery_scoring_policy\.js/);
assert.match(hangulAudit, /requiredCorrect must be 150/);

// Shell order and offline/native parity. The Hangul policy remains on revision
// f; the app source and mobile experience CSS have their own current pins.
const bankRef = index.indexOf('src="./hangul_mastery_exam.js');
const policyRef = index.indexOf('src="./hangul_mastery_scoring_policy.js?v=20260810f"');
const appRef = index.indexOf('src="./app.js?v=20260811c"');
const contractRef = index.indexOf('src="./app_experience_contract.js?v=20260810g"');
const contractCssRef = index.indexOf('href="./app_experience_contract.css?v=20260810g"');
assert.ok(bankRef >= 0 && policyRef > bankRef && appRef > policyRef, "Hangul scoring policy must load after the bank and before app.js");
assert.ok(contractRef > appRef, "experience contract must load after app.js so its global overrides win before DOMContentLoaded");
assert.ok(contractCssRef >= 0, "static experience surface policy must be loaded by index.html");
assert.match(sw, /const CACHE_NAME = "hanapath-shell-v466"/);
assert.match(sw, /"\.\/hangul_mastery_scoring_policy\.js\?v=20260810f"/);
assert.match(sw, /"\.\/app_experience_contract\.css\?v=20260810g"/);
assert.match(sw, /"\.\/app_experience_contract\.js\?v=20260810g"/);

console.log("App experience contract regression passed (static neutral lesson surface, accessible dismissal-persisted keyboard modal, live curricula, formal-only exam counts, resilient sentinel Back, Hangul 75% policy, v466 shell wiring).");
