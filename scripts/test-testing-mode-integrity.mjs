#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const app = readFileSync(join(root, "app.js"), "utf8");
const sentences = readFileSync(join(root, "sentence_exam_runner.js"), "utf8");
const index = readFileSync(join(root, "index.html"), "utf8");

assert.match(app, /const TEST_UNLOCK_ALL_STAGES = true;/, "owner-requested testing mode is not enabled");
assert.match(app, /function getTestingOverrideFlags\(\)[\s\S]*?TEST_UNLOCK_ALL_STAGES[\s\S]*?global-test-unlock/);
assert.match(app, /window\.HANAPATH_GET_TESTING_OVERRIDE_FLAGS = getTestingOverrideFlags/);
assert.match(index, /id="testing-mode-banner"[\s\S]*?formal exam results are Practice only/);

const sharedFlagCalls = app.match(/getTestingOverrideFlags\(\)/g) || [];
assert.ok(sharedFlagCalls.length >= 5, `expected helper + Hangul/Word start and submit calls, got ${sharedFlagCalls.length}`);
assert.match(app, /function buildHangulExamAttempt[\s\S]*?const initialOverrideFlags = getTestingOverrideFlags\(\)/);
assert.match(app, /function submitHangulExam[\s\S]*?const currentOverrideFlags = getTestingOverrideFlags\(\)/);
assert.match(app, /function startWordExamAttempt[\s\S]*?const startFlags = getTestingOverrideFlags\(\)/);
assert.match(app, /function submitWordExamAttempt[\s\S]*?const submitFlags = getTestingOverrideFlags\(\)/);

assert.match(sentences, /function testingOverrideFlags\(\)[\s\S]*?HANAPATH_GET_TESTING_OVERRIDE_FLAGS/);
assert.match(sentences, /const initialFlags = testingOverrideFlags\(\)/);
assert.match(sentences, /const submitFlags = testingOverrideFlags\(\)/);

const unitUnlockBody = app.match(/function isWordUnitUnlocked\(unit\) \{([\s\S]*?)\n\}/)?.[1] || "";
assert.ok(
  unitUnlockBody.indexOf("TEST_UNLOCK_ALL_STAGES") >= 0
    && unitUnlockBody.indexOf("TEST_UNLOCK_ALL_STAGES") < unitUnlockBody.indexOf("isWordSectionUnlocked"),
  "testing mode must bypass Word-unit prerequisites",
);
const lessonUnlockBody = app.match(/function isWordLessonUnlocked\(lesson\) \{([\s\S]*?)\n\}/)?.[1] || "";
assert.ok(
  lessonUnlockBody.indexOf("TEST_UNLOCK_ALL_STAGES") >= 0
    && lessonUnlockBody.indexOf("TEST_UNLOCK_ALL_STAGES") < lessonUnlockBody.indexOf("isWordCurriculumV2"),
  "testing mode must bypass v2 Word-lesson sequencing",
);

// Missing integrity APIs must degrade every formal runner to Practice rather
// than awarding clean mastery in a partially loaded shell.
assert.ok((app.match(/integrity-api-unavailable/g) || []).length >= 2, "Hangul and Word runners do not both fail closed");
assert.match(sentences, /integrity-api-unavailable/);
assert.match(app, /if \(!isPractice\) \{[\s\S]*?record\.bestCorrect/);
assert.match(app, /const status = isPractice \? "practice" : "hanaPath"/);
assert.match(sentences, /const status = overrideFlags\.length \|\| overrideEventIds\.length \? "practice" : "hanaPath"/);

console.log("Testing mode is enabled, visible, and Practice-tainted across Hangul, Word, and Sentence examinations.");
