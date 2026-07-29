#!/usr/bin/env node
// One-shot X2 integration patch. The follow-up commit triggers the temporary workflow.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
function read(path) { return readFileSync(join(ROOT, path), "utf8"); }
function write(path, text) { writeFileSync(join(ROOT, path), text); }
function replaceOnce(text, before, after, label) {
  const count = text.split(before).length - 1;
  if (count !== 1) throw new Error(`${label}: expected one anchor, found ${count}`);
  return text.replace(before, after);
}

let index = read("index.html");
index = replaceOnce(
  index,
  '    <link rel="stylesheet" href="./styles.css?v=20260727a" />\n',
  '    <link rel="stylesheet" href="./styles.css?v=20260727a" />\n    <link rel="stylesheet" href="./sentence_exam_runner.css?v=20260729a" />\n',
  "index X2 stylesheet",
);
index = replaceOnce(
  index,
  '    <script defer src="./sentence_exam_eligibility.js?v=20260725a"></script>\n',
  '    <script defer src="./sentence_exam_eligibility.js?v=20260725a"></script>\n    <!-- Sentence Mastery Examination Suite — frozen bank, X1 engine, and X2 state contract -->\n    <script defer src="./sentence_exam_prompt_templates.js?v=20260729a"></script>\n    <script defer src="./sentence_exam_curated_bank.js?v=20260729a"></script>\n    <script defer src="./sentence_exam_curated_bank_freeze.js?v=20260729a"></script>\n    <script defer src="./sentence_exam_grader.js?v=20260729a"></script>\n    <script defer src="./sentence_exam_blueprints.js?v=20260729a"></script>\n    <script defer src="./sentence_exam_engine.js?v=20260729a"></script>\n    <script defer src="./sentence_exam_runner_core.js?v=20260729a"></script>\n',
  "index Sentence X1/X2 assets",
);
index = replaceOnce(
  index,
  '    <script defer src="./app.js?v=20260727a"></script>\n',
  '    <script defer src="./app.js?v=20260727a"></script>\n    <script defer src="./sentence_exam_runner.js?v=20260729a"></script>\n',
  "index X2 runner",
);
write("index.html", index);

let sw = read("sw.js");
sw = replaceOnce(
  sw,
  '// [2026-07-27] Cache bumped for L2 deterministic Sentence positional and near-miss feedback.\nconst CACHE_NAME = "hanapath-shell-v452";',
  '// [2026-07-29] Cache bumped for X2 Sentence exam runner, provenance, results, and retention.\nconst CACHE_NAME = "hanapath-shell-v453";',
  "service-worker cache bump",
);
sw = replaceOnce(
  sw,
  '  "./styles.css?v=20260727a",\n',
  '  "./styles.css?v=20260727a",\n  "./sentence_exam_runner.css?v=20260729a",\n',
  "service-worker X2 stylesheet",
);
sw = replaceOnce(
  sw,
  '  "./sentence_exam_eligibility.js?v=20260725a",\n',
  '  "./sentence_exam_eligibility.js?v=20260725a",\n  "./sentence_exam_prompt_templates.js?v=20260729a",\n  "./sentence_exam_curated_bank.js?v=20260729a",\n  "./sentence_exam_curated_bank_freeze.js?v=20260729a",\n  "./sentence_exam_grader.js?v=20260729a",\n  "./sentence_exam_blueprints.js?v=20260729a",\n  "./sentence_exam_engine.js?v=20260729a",\n  "./sentence_exam_runner_core.js?v=20260729a",\n',
  "service-worker Sentence X1/X2 assets",
);
sw = replaceOnce(
  sw,
  '  "./app.js?v=20260727a",\n',
  '  "./app.js?v=20260727a",\n  "./sentence_exam_runner.js?v=20260729a",\n',
  "service-worker X2 runner",
);
write("sw.js", sw);

let shellAudit = read("scripts/audit-app-shell.mjs");
shellAudit = replaceOnce(
  shellAudit,
  '  "./sentence_feedback.js",\n  "./app.js",\n',
  '  "./sentence_feedback.js",\n  "./sentence_exam_runner.css",\n  "./sentence_exam_prompt_templates.js",\n  "./sentence_exam_curated_bank.js",\n  "./sentence_exam_curated_bank_freeze.js",\n  "./sentence_exam_grader.js",\n  "./sentence_exam_blueprints.js",\n  "./sentence_exam_engine.js",\n  "./sentence_exam_runner_core.js",\n  "./app.js",\n  "./sentence_exam_runner.js",\n',
  "app-shell required X2 assets",
);
write("scripts/audit-app-shell.mjs", shellAudit);

let coreGate = read("scripts/audit-core-release.mjs");
coreGate = replaceOnce(
  coreGate,
  '  engineFile: "sentence_exam_engine.js",\n  seedAuditFile: "scripts/audit-sentence-exams.mjs",\n',
  '  engineFile: "sentence_exam_engine.js",\n  runnerCoreFile: "sentence_exam_runner_core.js",\n  seedAuditFile: "scripts/audit-sentence-exams.mjs",\n  runnerAuditFile: "scripts/audit-sentence-exam-runner.mjs",\n  runnerRegressionFile: "scripts/test-sentence-exam-runner.mjs",\n  runnerBrowserFile: "scripts/test-sentence-exam-runner-browser.mjs",\n',
  "core gate X2 contract files",
);
coreGate = replaceOnce(
  coreGate,
  '  SENTENCE_EXAM_CONTRACT.blueprintsFile,\n  SENTENCE_EXAM_CONTRACT.engineFile,\n];\n',
  '  SENTENCE_EXAM_CONTRACT.blueprintsFile,\n  SENTENCE_EXAM_CONTRACT.engineFile,\n  SENTENCE_EXAM_CONTRACT.runnerCoreFile,\n];\n',
  "core gate load X2 meta",
);
coreGate = replaceOnce(
  coreGate,
  '  { id: "audio-coverage", label: "Audio coverage", script: "scripts/audit-audio-coverage.mjs" },\n',
  '  { id: "sentence-exam-runner-audit", label: "Sentence Mastery X2 runner, provenance, and retention audit", script: SENTENCE_EXAM_CONTRACT.runnerAuditFile },\n  { id: "sentence-exam-runner-regression", label: "Sentence Mastery X2 state and scoring regression", script: SENTENCE_EXAM_CONTRACT.runnerRegressionFile },\n  { id: "sentence-exam-runner-browser", label: "Sentence Mastery X2 browser acceptance", script: SENTENCE_EXAM_CONTRACT.runnerBrowserFile },\n  { id: "audio-coverage", label: "Audio coverage", script: "scripts/audit-audio-coverage.mjs" },\n',
  "core gate X2 tests",
);
write("scripts/audit-core-release.mjs", coreGate);

let ci = read(".github/workflows/ci.yml");
ci = replaceOnce(
  ci,
  '      # Authored-item audio closure (L3).\n',
  '      # Sentence Mastery runner, provenance, results, and retention (X2).\n      - name: Check Sentence X2 runner syntax\n        run: |\n          node --check sentence_exam_runner_core.js\n          node --check sentence_exam_runner.js\n          node --check scripts/audit-sentence-exam-runner.mjs\n          node --check scripts/test-sentence-exam-runner.mjs\n          node --check scripts/test-sentence-exam-runner-browser.mjs\n      - name: Audit Sentence X2 runner contract\n        run: node scripts/audit-sentence-exam-runner.mjs\n      - name: Sentence X2 state and scoring regression\n        run: node scripts/test-sentence-exam-runner.mjs\n      - name: Sentence X2 browser acceptance\n        run: node scripts/test-sentence-exam-runner-browser.mjs\n\n      # Authored-item audio closure (L3).\n',
  "CI X2 gates",
);
write(".github/workflows/ci.yml", ci);

console.log("Applied X2 static integration patches.");
