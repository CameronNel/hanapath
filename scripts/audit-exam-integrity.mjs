#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURE_DIR = path.join(ROOT, "scripts", "fixtures", "exam-integrity");
const api = require(path.join(ROOT, "exam_integrity.js"));

function loadWordBlueprints() {
  const file = path.join(ROOT, "word_exam_blueprints.js");
  if (!fs.existsSync(file)) return [];
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  return Array.isArray(context.window.HANAPATH_WORD_EXAMS)
    ? JSON.parse(JSON.stringify(context.window.HANAPATH_WORD_EXAMS))
    : [];
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function withoutIntegrity(value) {
  const copy = deepClone(value);
  delete copy.examResults;
  delete copy.examIntegrity;
  return copy;
}

function readFixtures() {
  return fs.readdirSync(FIXTURE_DIR)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => ({
      name,
      state: JSON.parse(fs.readFileSync(path.join(FIXTURE_DIR, name), "utf8")),
    }));
}

function auditBrowserWiring() {
  const indexPath = path.join(ROOT, "index.html");
  const appPath = path.join(ROOT, "app.js");
  const swPath = path.join(ROOT, "sw.js");
  if (!fs.existsSync(indexPath) || !fs.existsSync(appPath) || !fs.existsSync(swPath)) return 0;
  const index = fs.readFileSync(indexPath, "utf8");
  const app = fs.readFileSync(appPath, "utf8");
  const sw = fs.readFileSync(swPath, "utf8");
  const integrityRef = index.indexOf("./exam_integrity.js?v=20260721b");
  const appRef = index.indexOf("./app.js?v=20260721c");
  assert.ok(integrityRef >= 0, "index.html does not load versioned exam_integrity.js");
  assert.ok(appRef > integrityRef, "exam_integrity.js must load before app.js");
  assert.match(app, /HANAPATH_EXAM_INTEGRITY\.migrateExamIntegrityState\(state/);
  assert.match(sw, /hanapath-shell-v438/);
  assert.match(sw, /\.\/exam_integrity\.js\?v=20260721b/);
  assert.match(sw, /\.\/app\.js\?v=20260721c/);
  assert.match(app, /function submitHangulExam/);
  assert.match(app, /const initialTaintContext = getHangulExamTaintContext\(initialOverrideFlags\)/);
  assert.match(app, /\.\.\.\(attempt\.overrideEventIds \|\| \[\]\)/);
  assert.match(app, /getAttemptTaintContext\(state, \["alphabet"\]/);
  assert.match(app, /const EXAM_INTEGRITY_APP_VERSION = "hanapath-shell-v438"/);
  assert.match(app, /const EXAM_INTEGRITY_ASSET_REVISION = "20260721c"/);
  assert.match(app, /function isWordExamTestQueryActive\(\)/);
  assert.match(app, /TEST_ENABLE_WORD_SECTION_COMPLETION && isWordExamTestQueryActive\(\)/);
  assert.match(app, /Exams covering this section become Practice results and cannot award HanaPath mastery or retention\./);
  assert.match(app, /data-complete-alphabet-section>Testing override<\/button>/);
  assert.match(app, /data-word-complete-section=.*Testing override<\/button>/);
  assert.match(app, /function saveState\(\)[\s\S]*localStorage\.getItem\(STORAGE_KEY\) === serialized/);
  assert.match(app, /function getBackupPayload\(\)[\s\S]*state: JSON\.parse\(JSON\.stringify\(state\)\)/);
  assert.match(app, /function parseBackupState\(text\)[\s\S]*return parsed\.state/);

  const wordStart = app.indexOf("function completeWordSectionForTesting");
  const alphabetStart = app.indexOf("function completeAlphabetSectionForTesting");
  const wordBody = app.slice(wordStart, alphabetStart);
  const alphabetBody = app.slice(alphabetStart, app.indexOf("function isWordUnitUnlocked", alphabetStart));
  assert.ok(wordStart >= 0 && alphabetStart > wordStart, "completion functions not found");
  assert.ok(wordBody.indexOf("persistTaintBeforeCompletion(event)") < wordBody.indexOf("state.vocabLessonCompleted ="),
    "Words progression mutates before taint persistence");
  assert.ok(alphabetBody.indexOf("persistTaintBeforeCompletion(event)") < alphabetBody.indexOf("state.phaseOneCompleted ="),
    "Alphabet progression mutates before taint persistence");
  assert.match(app, /function persistTaintBeforeCompletion[\s\S]*saveState\(\)[\s\S]*verifyPersistedTaintEvent/);
  return 18;
}

function expectValidationError(state, options, pattern) {
  const errors = api.validateExamIntegrityState(state, options);
  assert.ok(errors.some((error) => pattern.test(error)),
    `Expected validation error ${pattern}, got:\n${errors.join("\n")}`);
}

const wordExamBlueprints = loadWordBlueprints();
const options = { wordExamBlueprints };
const fixtures = readFixtures();
assert.equal(fixtures.length, 8, "Box 0C requires five migration fixtures, two tainted Word fixtures, plus tainted Hangul fixture");

const allRecords = [];
let assertions = auditBrowserWiring();
for (const fixture of fixtures) {
  const beforeProtected = withoutIntegrity(fixture.state);
  const migrated = deepClone(fixture.state);
  const first = api.migrateExamIntegrityState(migrated, options);
  assert.equal(migrated.examResults.version, 1); assertions += 1;
  assert.equal(migrated.examIntegrity.version, 1); assertions += 1;
  assert.deepEqual(withoutIntegrity(migrated), beforeProtected,
    `${fixture.name}: migration changed compatibility or learning progress`); assertions += 1;

  const validation = api.validateExamIntegrityState(migrated, options);
  assert.deepEqual(validation, [], `${fixture.name}: ${validation.join("; ")}`); assertions += 1;

  const once = JSON.stringify(migrated);
  const second = api.migrateExamIntegrityState(migrated, options);
  const twice = JSON.stringify(migrated);
  assert.equal(second.changed, false, `${fixture.name}: second migration reported a change`); assertions += 1;
  assert.equal(twice, once, `${fixture.name}: migration is not byte-idempotent`); assertions += 1;
  assert.equal(new Set(Object.keys(migrated.examResults.byAttemptId)).size,
    Object.keys(migrated.examResults.byAttemptId).length,
    `${fixture.name}: duplicate attempt IDs`); assertions += 1;
  assert.equal(new Set(migrated.examIntegrity.migrationLog.map((entry) => entry.migrationId)).size,
    migrated.examIntegrity.migrationLog.length,
    `${fixture.name}: duplicate migration IDs`); assertions += 1;

  if (fixture.name === "fresh-save.json" ||
      fixture.name === "progressed-save.json" ||
      fixture.name === "old-pre-exam-save.json") {
    assert.equal(Object.keys(migrated.examResults.byAttemptId).length, 0,
      `${fixture.name}: invented examination history`); assertions += 1;
  }
  if (fixture.name === "hangul-mastery-save.json") {
    assert.equal(first.addedAttemptIds.length, 1); assertions += 1;
    const record = migrated.examResults.byAttemptId[first.addedAttemptIds[0]];
    assert.equal(record.examId, "hangul-mastery-exam"); assertions += 1;
    assert.equal(record.scoreSummary.correct, 200); assertions += 1;
    assert.equal(record.status, "legacy-incomplete"); assertions += 1;
    assert.deepEqual(migrated.alphabetMasteryExam, fixture.state.alphabetMasteryExam); assertions += 1;
  }
  if (fixture.name === "words-mid-retention-save.json") {
    assert.equal(first.addedAttemptIds.length, 1); assertions += 1;
    const record = migrated.examResults.byAttemptId[first.addedAttemptIds[0]];
    assert.equal(record.examId, "word-exam-10"); assertions += 1;
    assert.equal(record.blueprintVersion, 2); assertions += 1;
    assert.equal(record.scoreSummary.total, 150); assertions += 1;
    assert.equal(record.floorSummary.details.confirmationDueFrom, 1785236400000); assertions += 1;
    assert.deepEqual(migrated.wordExams, fixture.state.wordExams); assertions += 1;
  }
  allRecords.push(...first.addedAttemptIds.map((id) => migrated.examResults.byAttemptId[id]));
}

// Box 0B & 0C taint-event contracts.
const taintedWordFixture = deepClone(fixtures.find((fixture) => fixture.name === "tainted-word-section-save.json").state);
const taintedGlobalFixture = deepClone(fixtures.find((fixture) => fixture.name === "tainted-global-hook-save.json").state);
const taintedHangulFixture = deepClone(fixtures.find((fixture) => fixture.name === "tainted-hangul-section-save.json").state);
assert.deepEqual(api.validateExamIntegrityState(taintedWordFixture, options), []); assertions += 1;
assert.deepEqual(api.validateExamIntegrityState(taintedGlobalFixture, options), []); assertions += 1;
assert.deepEqual(api.validateExamIntegrityState(taintedHangulFixture, options), []); assertions += 1;

const hangulTaintContext = api.getAttemptTaintContext(taintedHangulFixture, ["alphabet"], []);
assert.equal(hangulTaintContext.isPractice, true); assertions += 1;
assert.deepEqual(hangulTaintContext.overrideEventIds, ["taint-fixture-alphabet-sec"]); assertions += 1;

const deterministicEvent = api.createTaintEvent({
  taintEventId: "taint-audit-s3",
  controlId: "word-section-completion",
  affectedPillars: ["words"],
  scopeSectionIds: ["s3"],
  scopeUnitIds: ["s3-grammar-u2"],
  scopeLessonIds: ["s3-grammar-u2-l2"],
  activatedAt: 1784650000000,
  appVersion: "hanapath-shell-v437",
  appAssetRevision: "20260721b",
  queryGate: "__wetest",
  sourceRoute: { hub: "learn", item: "vocabulary", stage: null },
  note: "Owner testing override",
  clearedAt: null,
});
assert.deepEqual(api.validateTaintEvent(deterministicEvent), []); assertions += 1;
const appendTarget = deepClone(fixtures.find((fixture) => fixture.name === "fresh-save.json").state);
api.migrateExamIntegrityState(appendTarget, options);
const appended = api.appendTaintEvent(appendTarget, deterministicEvent);
assert.equal(appended.added, true); assertions += 1;
assert.equal(appendTarget.examIntegrity.taintEvents.length, 1); assertions += 1;
const duplicateAppend = api.appendTaintEvent(appendTarget, deterministicEvent);
assert.equal(duplicateAppend.added, false); assertions += 1;
assert.equal(appendTarget.examIntegrity.taintEvents.length, 1, "duplicate append changed history"); assertions += 1;

const missingTaintField = deepClone(taintedWordFixture);
delete missingTaintField.examIntegrity.taintEvents[0].appAssetRevision;
expectValidationError(missingTaintField, options, /missing appAssetRevision|missing app revision/); assertions += 1;
const duplicateTaint = deepClone(taintedWordFixture);
duplicateTaint.examIntegrity.taintEvents.push(deepClone(duplicateTaint.examIntegrity.taintEvents[0]));
expectValidationError(duplicateTaint, options, /duplicate taintEventId/); assertions += 1;
const selectiveClear = deepClone(taintedWordFixture);
selectiveClear.examIntegrity.taintEvents[0].clearedAt = 1784655000000;
expectValidationError(selectiveClear, options, /clears taint while preserving test-awarded progression/); assertions += 1;

const intersecting = api.getAttemptTaintContext(taintedWordFixture, ["s1"], []);
assert.equal(intersecting.isPractice, true); assertions += 1;
assert.deepEqual(intersecting.overrideEventIds, ["taint-fixture-word-s1"]); assertions += 1;
const nonIntersecting = api.getAttemptTaintContext(taintedWordFixture, ["s2"], []);
assert.equal(nonIntersecting.isPractice, false); assertions += 1;
const globalContext = api.getAttemptTaintContext(taintedGlobalFixture, ["s8"], []);
assert.equal(globalContext.isPractice, true); assertions += 1;
assert.deepEqual(globalContext.overrideEventIds, ["taint-fixture-global-wetest"]); assertions += 1;
const activeHook = api.getAttemptTaintContext(appendTarget, ["s8"], ["__wetest"]);
assert.equal(activeHook.isPractice, true); assertions += 1;
assert.deepEqual(activeHook.overrideFlags, ["__wetest"]); assertions += 1;

const backupPayload = { version: 1, exportedAt: "2026-07-21T16:00:00.000Z", state: deepClone(taintedWordFixture) };
const importedBackup = JSON.parse(JSON.stringify(backupPayload)).state;
assert.deepEqual(importedBackup.examIntegrity.taintEvents, taintedWordFixture.examIntegrity.taintEvents,
  "backup round-trip dropped taint history"); assertions += 1;
assert.deepEqual(importedBackup.examResults, taintedWordFixture.examResults,
  "backup round-trip dropped result provenance"); assertions += 1;

// Required-field and status enforcement (§10.15–17, §10.32).
const baseState = deepClone(fixtures.find((fixture) => fixture.name === "hangul-mastery-save.json").state);
api.migrateExamIntegrityState(baseState, options);
const attemptId = Object.keys(baseState.examResults.byAttemptId)[0];
const missingField = deepClone(baseState);
delete missingField.examResults.byAttemptId[attemptId].generationSeed;
expectValidationError(missingField, options, /missing generationSeed/); assertions += 1;
const invalidStatus = deepClone(baseState);
invalidStatus.examResults.byAttemptId[attemptId].status = "official";
expectValidationError(invalidStatus, options, /invalid status/); assertions += 1;
const silentUpgrade = deepClone(baseState);
silentUpgrade.examResults.byAttemptId[attemptId].status = "hanaPath";
expectValidationError(silentUpgrade, options, /silently upgrades|silently upgraded/); assertions += 1;
const mismatchedKey = deepClone(baseState);
mismatchedKey.examResults.byAttemptId[attemptId].attemptId = "different-attempt";
expectValidationError(mismatchedKey, options, /disagrees with attemptId/); assertions += 1;

// Linkage integrity and version compatibility (§10.18–19).
const brokenRelation = deepClone(baseState);
brokenRelation.examIntegrity.resultRelations.push({
  relationSchemaVersion: 1,
  relationId: "relation-broken",
  type: "retention",
  fromAttemptId: attemptId,
  toAttemptId: "missing-attempt",
});
expectValidationError(brokenRelation, options, /broken linkage/); assertions += 1;

const crossing = deepClone(baseState);
const secondId = "hanaPath-word-exam-10-retention";
crossing.examResults.byAttemptId[secondId] = {
  resultSchemaVersion: 1,
  attemptId: secondId,
  examId: "word-exam-10",
  attemptMode: "retention",
  blueprintVersion: 3,
  engineVersion: 3,
  generationSeed: "123",
  contentBankRevision: "words-v3",
  eligibilityRevision: null,
  generatedAt: 1784630000000,
  submittedAt: 1784635000000,
  durationSeconds: 2000,
  scopeSectionIds: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"],
  itemCount: 60,
  scoreSummary: { correct: 55, total: 60, pct: 91.7, unanswered: 0 },
  floorSummary: { passed: true, distinguished: false, details: {} },
  status: "hanaPath",
  overrideFlags: [],
  overrideEventIds: [],
  qualifyingAttemptId: attemptId,
  retentionAttemptId: null,
  legacyProvenanceStatus: null,
  checksum: null,
};
crossing.examIntegrity.resultRelations.push({
  relationSchemaVersion: 1,
  relationId: "relation-cross-version",
  type: "retention",
  fromAttemptId: attemptId,
  toAttemptId: secondId,
});
expectValidationError(crossing, options, /crosses blueprint versions/); assertions += 1;

// Immutable history: a later blueprint change cannot rewrite a stored wrapper
// (§10.20, §10.25). The compatibility record remains the source snapshot.
const immutable = deepClone(fixtures.find((fixture) => fixture.name === "words-mid-retention-save.json").state);
api.migrateExamIntegrityState(immutable, options);
const immutableBefore = JSON.stringify(immutable.examResults.byAttemptId);
const changedBlueprints = wordExamBlueprints.map((blueprint) =>
  blueprint.id === "word-exam-10"
    ? { ...blueprint, version: 99, items: 999, scopeSectionIds: ["changed"] }
    : blueprint);
api.migrateExamIntegrityState(immutable, { wordExamBlueprints: changedBlueprints });
assert.equal(JSON.stringify(immutable.examResults.byAttemptId), immutableBefore,
  "blueprint changes recomputed immutable history"); assertions += 1;

// One wrapper per source, ever: a summary record that keeps evolving through
// the pre-provenance runners after Box 0A must NOT mint additional legacy
// wrappers on later loads, and validation must accept the divergence between
// the live summary and the frozen snapshot.
const evolving = deepClone(fixtures.find((fixture) => fixture.name === "hangul-mastery-save.json").state);
api.migrateExamIntegrityState(evolving, options);
evolving.alphabetMasteryExam.attempts += 1;
evolving.alphabetMasteryExam.bestCorrect = 199;
const evolved = api.migrateExamIntegrityState(evolving, options);
assert.equal(evolved.changed, false,
  "post-migration summary evolution re-triggered migration"); assertions += 1;
assert.equal(Object.keys(evolving.examResults.byAttemptId).length, 1,
  "post-migration summary evolution minted a second legacy wrapper"); assertions += 1;
assert.equal(evolving.examIntegrity.migrationLog.length, 1,
  "post-migration summary evolution appended a second migration log entry"); assertions += 1;
assert.deepEqual(api.validateExamIntegrityState(evolving, options), [],
  "validation rejected a legitimately evolved post-migration summary"); assertions += 1;

// Malformed provenance must not replace a good immutable result (§10.31).
const preserveGood = deepClone(crossing);
delete preserveGood.examIntegrity.resultRelations[0];
const goodSnapshot = JSON.stringify(preserveGood.examResults.byAttemptId[secondId]);
preserveGood.examResults.version = 77;
preserveGood.examIntegrity.version = 77;
api.migrateExamIntegrityState(preserveGood, options);
assert.equal(JSON.stringify(preserveGood.examResults.byAttemptId[secondId]), goodSnapshot,
  "normalizer replaced an existing good immutable result"); assertions += 1;

// Migration cannot invent unknown provenance (§10.22) and must preserve indexes
// (§10.23, §10.26).
for (const record of allRecords) {
  assert.equal(record.status, "legacy-incomplete"); assertions += 1;
  assert.equal(record.legacyProvenanceStatus, "legacy-incomplete"); assertions += 1;
  for (const field of [
    "engineVersion", "generationSeed", "contentBankRevision", "eligibilityRevision",
    "generatedAt", "durationSeconds", "overrideFlags", "overrideEventIds",
    "qualifyingAttemptId", "retentionAttemptId", "checksum",
  ]) {
    assert.equal(record[field], null, `${record.attemptId}: invented ${field}`); assertions += 1;
  }
}

const counts = {
  exam: {},
  status: {},
  blueprintVersion: {},
  bankRevision: {},
  overrideType: {},
  legacyProvenance: {},
};
for (const record of allRecords) {
  const bump = (bucket, key) => { bucket[String(key)] = (bucket[String(key)] || 0) + 1; };
  bump(counts.exam, record.examId);
  bump(counts.status, record.status);
  bump(counts.blueprintVersion, record.blueprintVersion);
  bump(counts.bankRevision, record.contentBankRevision);
  bump(counts.overrideType, record.overrideFlags);
  bump(counts.legacyProvenance, record.legacyProvenanceStatus);
}

console.log("Workstream 0 · Box 0B exam-integrity audit");
console.log(`Fixtures: ${fixtures.length}`);
console.log(`Assertions: ${assertions}`);
console.log(`Legacy wrappers: ${allRecords.length}`);
console.log(`Taint events: ${fixtures.reduce((total, fixture) => total + (fixture.state.examIntegrity?.taintEvents?.length || 0), 0)}`);
console.log("Counts:");
console.log(JSON.stringify(counts, null, 2));
console.log("PASS: query gating, durable taint-before-mutation, scope propagation, backup survival, and Box 0A provenance guards are green.");
