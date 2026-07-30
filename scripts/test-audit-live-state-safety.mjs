#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(new URL("..", import.meta.url)));
const index = readFileSync(join(root, "index.html"), "utf8");
const skillSource = readFileSync(join(root, "alphabet_skill_srs.js"), "utf8");
const sw = readFileSync(join(root, "sw.js"), "utf8");

function storage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
}

const inlineScripts = [...index.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
assert.equal(inlineScripts.length, 1, "expected one state-preflight inline script");

{
  const localStorage = storage({
    "hanapath-v1": JSON.stringify({
      phaseOneCompleted: ["anchor-vowels", "strong-consonants"],
    }),
  });
  const context = {
    localStorage,
    sessionStorage: storage(),
    console,
    Date: { now: () => 12345 },
    Set,
    JSON,
    Array,
    Object,
    String,
  };
  vm.runInNewContext(inlineScripts[0], context);
  const migrated = JSON.parse(localStorage.getItem("hanapath-v1"));
  assert.equal(migrated.onboarded, true, "legacy progress must protect the profile from onboarding-era deletion");
  assert.deepEqual(
    [...migrated.migrationRecovery.phaseOneCompletedBeforeSafetyV2.ids],
    ["anchor-vowels", "strong-consonants"],
    "preflight must preserve the complete original evidence",
  );
  assert.equal(migrated.stateMigrations.alphabetProgressSafetyV2.preservedProgress, true);
}

{
  const localStorage = storage();
  vm.runInNewContext(inlineScripts[0], {
    localStorage,
    sessionStorage: storage(),
    console,
    Date,
    Set,
    JSON,
    Array,
    Object,
    String,
  });
  assert.equal(localStorage.getItem("hanapath-v1"), null, "fresh profiles must remain fresh for onboarding");
}

{
  const now = 1_000_000;
  const canonical = {
    onboarded: true,
    phaseOneCompleted: ["anchor-vowels", "base-consonants", "block-geometry"],
  };
  const localStorage = storage({
    "hanapath-v1": JSON.stringify(canonical),
    "hanapath-alphabet-skill-srs-v1": JSON.stringify({
      "block-geometry": { box: 0, due: 0, reviewedAt: 0 },
    }),
  });
  const state = structuredClone(canonical);
  const window = {
    location: {
      href: "https://example.test/",
      pathname: "/",
      search: "",
      hash: "",
    },
    history: {
      state: null,
      replaceState(_state, _title, value) {
        const next = new URL(value, "https://example.test/");
        window.location.href = next.href;
        window.location.pathname = next.pathname;
        window.location.search = next.search;
        window.location.hash = next.hash;
      },
    },
    dispatchEvent: () => {},
  };

  const context = {
    window,
    localStorage,
    sessionStorage: storage(),
    state,
    saveState() {
      localStorage.setItem("hanapath-v1", JSON.stringify(state));
      return true;
    },
    getAlphabetProgress: () => ({ completedIds: state.phaseOneCompleted }),
    getStudio: () => "alphabet",
    generateQuestion: () => ({ kind: "ordinary" }),
    renderQuestion: (question) => question,
    finalizeQuestionAttempt: (_answer, correct) => correct,
    init: async () => "init",
    ALPHABET_LESSON_IDS: ["anchor-vowels", "base-consonants", "block-geometry"],
    URL,
    URLSearchParams,
    CustomEvent: class CustomEvent {
      constructor(type, options) { this.type = type; this.detail = options && options.detail; }
    },
    console,
    Date: class extends Date { static now() { return now; } },
    Math,
    Set,
    JSON,
    Array,
    Object,
    String,
    structuredClone,
  };
  window.window = window;
  vm.createContext(context);
  vm.runInContext(skillSource, context, { filename: "alphabet_skill_srs.js" });

  assert.equal(localStorage.getItem("hanapath-alphabet-skill-srs-v1"), null, "legacy sidecar must be removed after canonical migration");
  assert.ok(state.alphabetSkillSrs["block-geometry"], "legacy SRS must migrate into canonical state");

  const question = context.generateQuestion();
  assert.equal(question.alphabetSkillId, "block-geometry", "a due skill must be offered deterministically");
  context.renderQuestion(question);
  context.finalizeQuestionAttempt("", true, "");
  const first = state.alphabetSkillSrs["block-geometry"];
  assert.equal(first.box, 1);
  assert.equal(first.due - now, 10 * 60 * 1000, "first correct review must use the first 10-minute interval");

  context.window.HANAPATH_ALPHABET_SKILL_SRS.recordSkillReview("block-geometry", true, now);
  const second = state.alphabetSkillSrs["block-geometry"];
  assert.equal(second.box, 2);
  assert.equal(second.due - now, 20 * 60 * 60 * 1000, "second correct review must use the 20-hour interval");
}

assert.match(skillSource, /Object\.freeze\(ALPHABET_LESSON_IDS\)/);
assert.match(skillSource, /hanapath-storage-error/);
assert.match(skillSource, /__hanapathOnboardingGuard/);
assert.match(index, /alphabet_skill_srs\.js\?v=20260730a/);
assert.match(sw, /alphabet_skill_srs\.js\?v=20260730a/);
assert.match(sw, /key\.startsWith\(CACHE_PREFIX\)/);
assert.match(sw, /NON_AUDIO_RUNTIME_CACHE_LIMIT/);
assert.match(sw, /NAVIGATION_TIMEOUT_MS/);
assert.doesNotMatch(sw, /if \(key !== CACHE_NAME\)/);

console.log("State safety, onboarding, canonical Alphabet SRS, and bounded cache contracts passed.");
