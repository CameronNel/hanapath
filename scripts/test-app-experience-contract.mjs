#!/usr/bin/env node
// Focused regression for PR #391's learner-experience contract. This stays
// deliberately cheap: it locks the exact source and shell invariants that made
// the original implementation unsafe or stale without running the expensive
// exam seed sweeps.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => readFileSync(join(ROOT, rel), "utf8");

const contract = read("app_experience_contract.js");
const policy = read("hangul_mastery_scoring_policy.js");
const index = read("index.html");
const sw = read("sw.js");
const app = read("app.js");
const hangulAudit = read("scripts/audit-hangul-mastery-exam.mjs");
const amendment = read("docs/HANGUL_MASTERY_SCORING_POLICY_AMENDMENT.md");

// Structural lesson surfaces stay neutral. The older lesson-player stylesheet
// paints a radial accent wash from the top-right; the v463 experience layer
// deliberately overrides that surface to the plain panel while keeping accent
// on progress, buttons, focus, and feedback where it communicates state.
assert.match(contract, /hanapath-experience-surface-policy/);
assert.match(contract, /\.alphabet-lesson-player\s*\{\s*background:\s*var\(--panel\);/s);
assert.doesNotMatch(
  contract,
  /\.alphabet-lesson-player\s*\{[^}]*radial-gradient/s,
  "the experience override must not reintroduce the top-right accent bloom",
);

// Korean keyboard recommendation: an actual accessible dialog that persists
// until the learner dismisses it. The old seven-second timer is forbidden.
assert.match(contract, /role="dialog"/);
assert.match(contract, /aria-modal="true"/);
assert.match(contract, /aria-labelledby="koreanKeyboardModalTitle"/);
assert.match(contract, /aria-describedby="koreanKeyboardModalCopy"/);
assert.match(contract, /event\.key === "Escape"/);
assert.match(contract, /event\.key !== "Tab"/);
assert.match(contract, /restoreFocus/);
assert.match(contract, /previousFocus\.focus\(\)/);
assert.doesNotMatch(contract, /setTimeout\(dismiss,\s*7000\)/, "keyboard recommendation must not disappear on a timer");

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
assert.match(contract, /record\.status !== "hanaPath"/);
assert.match(contract, /record\.floorSummary\?\.passed !== true/);
assert.doesNotMatch(contract, /\|\|\s*284\b/);
assert.doesNotMatch(contract, /\|\|\s*703\b/);
assert.doesNotMatch(contract, /\|\|\s*17\b/);
assert.doesNotMatch(contract, />\$\{wordExamCount\}\/10</);
assert.doesNotMatch(contract, />\$\{sentenceExamCount\}\/5</);

// Browser/PWA Back needs a sentinel above the app root. Replacing the current
// entry alone cannot intercept a first Back action. At HanaPath's true root the
// handler must deliberately release to the real browser history.
assert.match(contract, /history\.replaceState\(rootState/);
assert.match(contract, /history\.pushState\(guardState/);
assert.match(contract, /if \(handleHanaPathBackAction\(\)\)/);
assert.match(contract, /releasingToBrowser = true/);
assert.match(contract, /window\.history\.back\(\)/);

// Current Hangul mastery policy is an explicit source of truth, not an
// undocumented disagreement between app.js and the old 200/200 design text.
assert.match(policy, /requiredCorrect:\s*150/);
assert.match(policy, /passPct:\s*75/);
assert.match(policy, /exam\.requiredCorrect = policy\.requiredCorrect/);
assert.match(amendment, /150\/200 \(75%\) or better/);
assert.match(app, /const mastered = correct >= 150 && total === 200/);
assert.match(hangulAudit, /hangul_mastery_scoring_policy\.js/);
assert.match(hangulAudit, /requiredCorrect must be 150/);

// Shell order and offline/native parity: policy before app, experience wrapper
// after app, and both assets versioned + precached in the same unreleased v463
// packet. prepare-web.mjs discovers these index assets for native packaging.
const bankRef = index.indexOf('src="./hangul_mastery_exam.js');
const policyRef = index.indexOf('src="./hangul_mastery_scoring_policy.js?v=20260810f"');
const appRef = index.indexOf('src="./app.js?v=20260810f"');
const contractRef = index.indexOf('src="./app_experience_contract.js?v=20260810f"');
assert.ok(bankRef >= 0 && policyRef > bankRef && appRef > policyRef, "Hangul scoring policy must load after the bank and before app.js");
assert.ok(contractRef > appRef, "experience contract must load after app.js so its global overrides win before DOMContentLoaded");
assert.match(sw, /const CACHE_NAME = "hanapath-shell-v463"/);
assert.match(sw, /"\.\/hangul_mastery_scoring_policy\.js\?v=20260810f"/);
assert.match(sw, /"\.\/app_experience_contract\.js\?v=20260810f"/);

console.log("App experience contract regression passed (neutral lesson surface, live Progress, formal-only exam counts, accessible keyboard modal, sentinel Back, Hangul 75% policy). ");
