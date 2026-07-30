#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "state_persistence_hardening.js"), "utf8");
const index = readFileSync(join(root, "index.html"), "utf8");
const sw = readFileSync(join(root, "sw.js"), "utf8");

function makeStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
    removeItem(key) { values.delete(key); },
  };
}

const elements = new Map();
const document = {
  body: { appendChild(node) { if (node.id) elements.set(node.id, node); } },
  documentElement: {},
  createElement(tag) {
    return {
      tagName: tag.toUpperCase(), id: "", hidden: false, dataset: {}, style: {},
      setAttribute() {}, appendChild() {}, addEventListener() {}, cloneNode() { return this; }, replaceWith() {},
    };
  },
  getElementById(id) { return elements.get(id) || null; },
};
const localStorage = makeStorage();
const sessionStorage = makeStorage();
const state = {
  level: "K5",
  correct: 0,
  vocabKnownRanks: [],
  studyDays: 0,
  phaseOneCompleted: [],
  todayDone: [],
  hangulWritingHistory: Array.from({ length: 130 }, (_, index) => ({ index })),
  vocabReviewEvents: Array.from({ length: 5100 }, (_, index) => ({ index })),
  examResults: { version: 1, byAttemptId: {} },
  examIntegrity: { resultRelations: [], taintEvents: [], migrationLog: [], checksumBackfills: [] },
};
for (let index = 0; index < 520; index += 1) {
  state.examResults.byAttemptId[`a${index}`] = { attemptId: `a${index}`, submittedAt: index };
}
let saveCalls = 0;
const context = {
  window: null,
  document,
  localStorage,
  sessionStorage,
  state,
  STORAGE_KEY: "hanapath-v1",
  ALPHABET_LESSON_IDS: ["a", "b"],
  console,
  Date,
  JSON,
  Object,
  Array,
  Set,
  Map,
  Number,
  String,
  TextEncoder,
  Blob,
  URL,
  CustomEvent: class CustomEvent { constructor(type, options) { this.type = type; this.detail = options?.detail; } },
  unescape,
  encodeURIComponent,
  getBackupPayload: () => ({ version: 1, state }),
  getBackupFilename: () => "old.json",
  parseBackupState: () => ({}),
  downloadBackupFile: () => {},
  validateImportedExamIntegrity: () => [],
  renderSettings: () => {},
  init: async () => "ok",
  saveState: () => { saveCalls += 1; return true; },
};
context.window = context;
context.window.location = { reload() {} };
context.window.confirm = () => true;
context.window.dispatchEvent = () => {};
context.window.setTimeout = setTimeout;
vm.createContext(context);
vm.runInContext(source, context, { filename: "state_persistence_hardening.js" });

const api = context.HANAPATH_PERSISTENCE_HARDENING;
assert.equal(api.backupVersion, 2);
const payload = context.getBackupPayload();
assert.equal(payload.format, "hanapath-backup");
assert.equal(payload.version, 2);
assert.equal(payload.state.hangulWritingHistory.length, 100);
assert.equal(payload.state.vocabReviewEvents.length, 5000);
assert.equal(Object.keys(payload.state.examResults.byAttemptId).length, 500);
assert.equal(payload.state.level, "K5", "export does not mutate level; import derives it");

const parsed = api.parseBackupStateStrict(JSON.stringify({
  format: "hanapath-backup",
  version: 2,
  exportedAt: "2026-07-30T12:00:00.000Z",
  state: { level: "K5", correct: 0, vocabKnownRanks: [], studyDays: 0, phaseOneCompleted: [] },
}));
assert.equal(parsed.level, "K0", "imported level must be re-derived instead of trusted");
assert.throws(() => api.parseBackupStateStrict(JSON.stringify({ format: "wrong", version: 2, state: { correct: 1 } })), /format marker/);
assert.throws(() => api.parseBackupStateStrict(JSON.stringify({ format: "hanapath-backup", version: 999, state: { correct: 1 } })), /Unsupported/);
assert.throws(() => api.parseBackupStateStrict(`{"correct":1,"__proto__":{"polluted":true}}`), /forbidden key/);
assert.throws(() => api.parseBackupStateStrict("x".repeat(5 * 1024 * 1024 + 1)), /5 MiB/);

context.saveState();
assert.equal(saveCalls, 1);
assert.equal(state.hangulWritingHistory.length, 100);
assert.equal(state.vocabReviewEvents.length, 5000);
assert.equal(Object.keys(state.examResults.byAttemptId).length, 500);
assert.match(context.getBackupFilename(), /^hanapath-backup-\d{4}-\d{2}-\d{2}\.json$/);

assert.match(source, /Storage verification failed/);
assert.match(source, /Restore pre-import progress/);
assert.match(source, /ROLLBACK_TTL_MS/);
assert.match(source, /state\.localStudyDate/);
assert.match(source, /could not save progress/);
assert.match(index, /state_persistence_hardening\.js\?v=20260730a/);
assert.match(index, /hanapath-v1-corrupt-recovery/);
assert.match(sw, /state_persistence_hardening\.js\?v=20260730a/);

console.log("Persistence bounds, backup schema, rollback, corruption recovery, local dates, and level derivation passed.");
