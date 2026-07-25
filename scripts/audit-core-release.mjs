#!/usr/bin/env node
// audit-core-release.mjs — the single deterministic core-release gate.
//
// Governing contract: docs/CORE_APP_COMPLETION_ROADMAP.md packet C1.
//
// Responsibilities:
//   1. Run the wired core audit matrix as child processes and exit non-zero if
//      any blocking child fails. This is a *superset* of the CI validate job and
//      weakens no existing audit, but it is not yet the full roadmap §9 matrix —
//      the generated report's coverage-gaps section names what is still excluded.
//   2. Derive every headline curriculum / examination / audio / eligibility /
//      shell count directly from the live browser-global data files (no
//      hand-entered numbers) and render docs/CORE_APP_STATUS.md from them.
//   3. Guard that the committed status report is not stale (--check-status),
//      which also runs as the final gate step so drift fails the gate.
//
// Usage:
//   node scripts/audit-core-release.mjs                # full gate (release/CI)
//   node scripts/audit-core-release.mjs --full         # explicit full gate
//   node scripts/audit-core-release.mjs --quick        # reduced seed counts
//   node scripts/audit-core-release.mjs --write-status # (re)generate the report
//   node scripts/audit-core-release.mjs --check-status # fail if report is stale
//   node scripts/audit-core-release.mjs --list         # print the gate steps
//
// This orchestrator changes no product behaviour and bumps no cache. It only
// reads data files and shells out to the existing audits.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STATUS_FILE = join(ROOT, "docs", "CORE_APP_STATUS.md");

const args = process.argv.slice(2);
const QUICK = args.includes("--quick");

// ---------------------------------------------------------------------------
// Live-data derivation (deterministic; no hand-entered counts)
// ---------------------------------------------------------------------------

// Ordered so dependency globals (words/inflect/audio) load before the exam
// blueprints and engine that read them, matching the browser load order.
const DATA_FILES = [
  "audio_map.js",
  "words_curated_core.js",
  "words_lesson_plan.js",
  "words_inflect.js",
  "word_exam_blueprints.js",
  "word_exam_engine.js",
  "form_check_blueprints.js",
  "sentences_core.js",
  "sentences_lesson_plan.js",
  // Eligibility shards load before the aggregate merger that publishes
  // HANAPATH_SENTENCE_EXAM_ELIGIBILITY (E0).
  "sentence_exam_eligibility_a.js",
  "sentence_exam_eligibility_b.js",
  "sentence_exam_eligibility_c.js",
  "sentence_exam_eligibility_d.js",
  "sentence_exam_eligibility.js",
  "hangul_mastery_exam.js",
  "hangul_strokes.js",
  "raw_word_meanings.js",
];

// Locked Sentence Mastery examination readiness contract.
//
// The report's readiness rows are derived, not hand-maintained: they flip
// automatically as each packet lands its artifacts, with NO edit to this file.
// The X1/X2 packets satisfy the contract by shipping these exact files and
// publishing the runtime meta marker:
//
//   - E2  : every bank row has an approved eligibility record
//           (derived from HANAPATH_SENTENCE_EXAM_ELIGIBILITY — approved === rows).
//   - X1  : `sentence_exam_blueprints.js` publishes HANAPATH_SENTENCE_EXAM_BLUEPRINTS;
//           `sentence_exam_engine.js` publishes HANAPATH_SENTENCE_EXAM_META with a
//           numeric `engineVersion`; `scripts/audit-sentence-exams.mjs` exists
//           (the roadmap §9 / X1 seed audit).
//   - X2  : HANAPATH_SENTENCE_EXAM_META gains a non-null `runnerVersion` and, once
//           the delayed retention flow ships, `retention === true`.
const SENTENCE_EXAM_CONTRACT = {
  blueprintsFile: "sentence_exam_blueprints.js",
  engineFile: "sentence_exam_engine.js",
  seedAuditFile: "scripts/audit-sentence-exams.mjs",
  blueprintsGlobal: "HANAPATH_SENTENCE_EXAM_BLUEPRINTS",
  metaGlobal: "HANAPATH_SENTENCE_EXAM_META",
};

// Browser-global files loaded only when they exist, so the meta marker becomes
// readable the moment X1/X2 add them (loaded after DATA_FILES for dependencies).
const OPTIONAL_DATA_FILES = [
  SENTENCE_EXAM_CONTRACT.blueprintsFile,
  SENTENCE_EXAM_CONTRACT.engineFile,
];

function loadDataGlobals() {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  const files = [
    ...DATA_FILES,
    ...OPTIONAL_DATA_FILES.filter((file) => existsSync(join(ROOT, file))),
  ];
  for (const file of files) {
    const code = readFileSync(join(ROOT, file), "utf8");
    vm.runInContext(code, sandbox, { filename: file });
  }
  return sandbox.window;
}

function len(value) {
  if (Array.isArray(value)) return value.length;
  if (value && typeof value === "object") return Object.keys(value).length;
  return 0;
}

// App-shell metrics, derived from the static wiring the same way
// audit-app-shell.mjs reads them (index.html loads + sw.js APP_SHELL / cache).
function deriveShell() {
  const indexHtml = readFileSync(join(ROOT, "index.html"), "utf8");
  const swJs = readFileSync(join(ROOT, "sw.js"), "utf8");

  const indexAssets = [];
  for (const m of indexHtml.matchAll(
    /<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=["']([^"']+)["'][^>]*>/gi
  )) {
    indexAssets.push(m[1]);
  }
  for (const m of indexHtml.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) {
    indexAssets.push(m[1]);
  }
  const localIndexAssets = indexAssets.filter((a) => a.startsWith("./"));

  const shellMatch = swJs.match(/const\s+APP_SHELL\s*=\s*\[([\s\S]*?)\];/);
  const shellAssets = shellMatch
    ? [...shellMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
    : [];

  const cacheMatch = swJs.match(/const\s+CACHE_NAME\s*=\s*"([^"]+)";/);

  return {
    cacheName: cacheMatch ? cacheMatch[1] : null,
    indexLocalAssets: localIndexAssets.length,
    precachedShellAssets: shellAssets.length,
  };
}

// Sentence Mastery examination is delivered across E2/X1/X2. Every milestone
// below is derived live from the eligibility corpus and the locked readiness
// contract, so each row flips on its own as the packet lands — nothing here is
// hand-entered.
function deriveSentenceExamReadiness(W, sentenceRows, approvedRows) {
  const has = (rel) => existsSync(join(ROOT, rel));
  const meta = W[SENTENCE_EXAM_CONTRACT.metaGlobal] || null;
  const blueprints = W[SENTENCE_EXAM_CONTRACT.blueprintsGlobal] || null;
  const engineVersion = meta && meta.engineVersion != null ? meta.engineVersion : null;
  const runnerVersion = meta && meta.runnerVersion != null ? meta.runnerVersion : null;

  return [
    {
      id: "eligibility-corpus",
      label: "Reviewed eligibility corpus (E2)",
      present: sentenceRows > 0 && approvedRows === sentenceRows,
      note: `${approvedRows}/${sentenceRows} rows approved`,
    },
    {
      id: "blueprints",
      label: "Exam blueprints (X1)",
      present: Boolean(blueprints) && has(SENTENCE_EXAM_CONTRACT.blueprintsFile),
    },
    {
      id: "engine",
      label: "Generator/grader engine (X1)",
      present: engineVersion != null,
      note: engineVersion != null ? `engine v${engineVersion}` : undefined,
    },
    {
      id: "seed-audit",
      label: "Seed audit (X1)",
      present: has(SENTENCE_EXAM_CONTRACT.seedAuditFile),
    },
    {
      id: "runner",
      label: "Browser runner + provenance (X2)",
      present: runnerVersion != null,
      note: runnerVersion != null ? `runner v${runnerVersion}` : undefined,
    },
    {
      id: "retention",
      label: "Delayed retention confirmation (X2)",
      present: Boolean(meta && meta.retention === true),
    },
  ];
}

function deriveStatus() {
  const W = loadDataGlobals();

  const eligibility = W.HANAPATH_SENTENCE_EXAM_ELIGIBILITY || {};
  const reviewedRows = eligibility.reviewedRows || {};
  const sentenceCount = len(W.HANAPATH_SENTENCES);
  const reviewedCount = len(reviewedRows);
  let approvedCount = 0;
  for (const id of Object.keys(reviewedRows)) {
    if (reviewedRows[id] && reviewedRows[id].reviewStatus === "approved") approvedCount++;
  }

  const hangulExam = W.HANGUL_MASTERY_EXAM || {};
  const hangulSections = Array.isArray(hangulExam.sections) ? hangulExam.sections : [];
  const hangulItems = hangulSections.reduce(
    (sum, section) => sum + (Array.isArray(section.items) ? section.items.length : 0),
    0
  );

  const wordExamMeta = W.HANAPATH_WORD_EXAM_META || {};

  return {
    shell: deriveShell(),
    sentenceExam: deriveSentenceExamReadiness(W, sentenceCount, approvedCount),
    alphabet: {
      strokeGuides: Number(W.HANGUL_STROKE_GUIDE_COUNT) || len(W.HANGUL_STROKES),
      hangulExamItems: hangulItems,
      hangulExamParts: hangulSections.length,
      hangulExamVersion: hangulExam.version ?? null,
      hangulExamRequiredCorrect: hangulExam.requiredCorrect ?? null,
    },
    words: {
      curatedSenses: len(W.HANAPATH_CURATED_WORDS),
      units: len(W.HANAPATH_WORD_UNITS),
      sections: len(W.HANAPATH_WORD_SECTIONS),
      lessons: len(W.HANAPATH_WORD_LESSONS),
      formChecks: len(W.HANAPATH_FORM_CHECKS),
      coreExams: len(W.HANAPATH_WORD_EXAMS),
      examBlueprintVersion: wordExamMeta.blueprintVersion ?? null,
    },
    sentences: {
      rows: sentenceCount,
      units: len(W.HANAPATH_SENTENCE_UNITS),
      sections: len(W.HANAPATH_SENTENCE_SECTIONS),
      lessons: len(W.HANAPATH_SENTENCE_LESSONS),
      eligibilityRevision: eligibility.revision ?? null,
      eligibilityReviewed: reviewedCount,
      eligibilityApproved: approvedCount,
    },
    audio: {
      mappedKeys: len(W.AUDIO_MAP),
    },
  };
}

function pct(part, whole) {
  if (!whole) return "0.00";
  return ((part / whole) * 100).toFixed(2);
}

// ---------------------------------------------------------------------------
// Gate definition
// ---------------------------------------------------------------------------

// Every root-level browser script is syntax-checked. Discovered
// deterministically (sorted) from the repository root so a newly added root
// script cannot silently escape the check and no hand-maintained list drifts.
function discoverRootScripts() {
  return readdirSync(ROOT)
    .filter((name) => name.endsWith(".js"))
    .sort();
}
const SYNTAX_FILES = discoverRootScripts();

// Each step is a blocking audit unless marked optional. `quickArgs` replaces
// `fullArgs` in --quick mode. `requiresPath` steps SKIP (do not fail) when the
// path is absent — used for validations the local environment cannot perform.
const GATE_STEPS = [
  { id: "syntax", label: "Syntax check (node --check, all root scripts)", internal: "syntax" },
  { id: "syntax-gate-regression", label: "Syntax-gate regression (every file checked)", script: "scripts/test-core-release-syntax-gate.mjs" },
  { id: "readiness-derivation", label: "Sentence-exam readiness derivation regression", script: "scripts/test-sentence-exam-readiness.mjs" },
  { id: "exam-integrity", label: "Exam integrity", script: "scripts/audit-exam-integrity.mjs" },
  { id: "hangul-mastery", label: "Hangul Mastery examination", script: "scripts/audit-hangul-mastery-exam.mjs" },
  { id: "word-competency-map", label: "Word-exam competency map", script: "scripts/build-word-exam-competency-map.mjs", fullArgs: ["--check"], quickArgs: ["--check"] },
  { id: "word-exams", label: "Core Word examinations", script: "scripts/audit-word-exams.mjs", fullArgs: [], quickArgs: ["--quick"] },
  { id: "words-data", label: "Words data", script: "scripts/audit-words-data.mjs", fullArgs: ["--strict"], quickArgs: ["--strict"] },
  { id: "thin-lesson", label: "Thin-lesson heuristic regression", script: "scripts/test-thin-lesson-heuristic.mjs" },
  { id: "sentences-data", label: "Sentences data", script: "scripts/audit-sentences-data.mjs", fullArgs: ["--strict"], quickArgs: ["--strict"] },
  { id: "sentences-foundation", label: "Sentences foundation coverage", script: "scripts/audit-sentences-foundation.mjs" },
  { id: "form-checks", label: "Form Checks", script: "scripts/audit-form-checks.mjs" },
  {
    id: "sentence-eligibility",
    label: "Sentence eligibility (schema + progress)",
    // Mirrors CI exactly: strict mode is deferred to packet E2. Using
    // --allow-incomplete here does not weaken the schema/progress checks.
    script: "scripts/audit-sentence-eligibility.mjs",
    fullArgs: ["--allow-incomplete"],
    quickArgs: ["--allow-incomplete"],
  },
  {
    id: "sentence-exams",
    label: "Sentence Mastery examination seed audit",
    script: "scripts/audit-sentence-exams.mjs",
    // Ships in packet X1; SKIP (not fail) until the audit script exists.
    requiresPath: "scripts/audit-sentence-exams.mjs",
    pending: "packet X1 (Sentence exam engine) not yet shipped",
  },
  { id: "audio-coverage", label: "Audio coverage", script: "scripts/audit-audio-coverage.mjs" },
  { id: "alphabet-audio", label: "Alphabet audio coverage", script: "scripts/audit-alphabet-audio.mjs", fullArgs: ["--strict"], quickArgs: ["--strict"] },
  { id: "hangul-recognition", label: "Hangul recognition", script: "scripts/audit-hangul-recognition.mjs" },
  { id: "premium-handwriting", label: "Premium handwriting", script: "scripts/audit-premium-handwriting.mjs" },
  { id: "app-shell", label: "App shell", script: "scripts/audit-app-shell.mjs" },
  {
    id: "mobile-package",
    label: "Mobile package validation",
    script: "scripts/audit-mobile-package.mjs",
    // Requires a prepared payload; the Android workflow runs `npm run
    // prepare:web` first. SKIP locally when mobile/www is absent.
    requiresPath: "mobile/www",
    pending: "requires `npm run prepare:web` in mobile/ (produced by the Android workflow)",
  },
  { id: "status-freshness", label: "CORE_APP_STATUS.md freshness", internal: "status-check" },
];

// Documented but intentionally excluded from the gate, each with the reason and
// a named owning packet so no coverage gap floats indefinitely.
const EXCLUDED = [
  {
    script: "scripts/audit-learning-questions.mjs",
    owner: "packet L1 (lesson reachability / question coverage)",
    reason:
      "throws on main (`appendAuthoredItemQuestions is not defined` — an audit-harness extraction bug, not a product defect) and is not wired into CI, so learner-question coverage and answer-leak safety are not yet protected by this one-command gate.",
  },
];

function stepArgs(step) {
  if (QUICK && step.quickArgs) return step.quickArgs;
  return step.fullArgs || [];
}

// ---------------------------------------------------------------------------
// Status report rendering (pure function of derived counts)
// ---------------------------------------------------------------------------

function renderStatusMarkdown(status) {
  const a = status.alphabet;
  const w = status.words;
  const s = status.sentences;
  const sentenceExamsShipped = existsSync(join(ROOT, "scripts", "audit-sentence-exams.mjs"));

  const lines = [];
  lines.push("# HanaPath core app status");
  lines.push("");
  lines.push(
    "> **Generated file — do not hand-edit.** Regenerate with"
  );
  lines.push("> `node scripts/audit-core-release.mjs --write-status`. Every number below is");
  lines.push("> derived directly from the live data files; `--check-status` (and the core gate)");
  lines.push("> fail if this report drifts from the code.");
  lines.push("");
  lines.push(
    "This report is the machine-derived companion to"
  );
  lines.push("[`docs/CORE_APP_COMPLETION_ROADMAP.md`](CORE_APP_COMPLETION_ROADMAP.md). The roadmap");
  lines.push("owns *what to do next*; this file owns *what currently exists*.");
  lines.push("");

  lines.push("## Derived counts");
  lines.push("");
  lines.push("### Alphabet");
  lines.push("");
  lines.push("| Metric | Value |");
  lines.push("|---|---|");
  lines.push(`| Hangul stroke guides | ${a.strokeGuides} |`);
  lines.push(
    `| Hangul Mastery Examination items | ${a.hangulExamItems} (across ${a.hangulExamParts} parts) |`
  );
  lines.push(`| Hangul Mastery required-correct pool | ${a.hangulExamRequiredCorrect} |`);
  lines.push(`| Hangul Mastery blueprint version | ${a.hangulExamVersion} |`);
  lines.push("");
  lines.push("### Words");
  lines.push("");
  lines.push("| Metric | Value |");
  lines.push("|---|---|");
  lines.push(`| Curated senses | ${w.curatedSenses} |`);
  lines.push(`| Curriculum units | ${w.units} |`);
  lines.push(`| Curriculum sections | ${w.sections} |`);
  lines.push(`| Lessons | ${w.lessons} |`);
  lines.push(`| Form Checks | ${w.formChecks} |`);
  lines.push(`| Core Word examinations | ${w.coreExams} |`);
  lines.push(`| Word-exam blueprint version | ${w.examBlueprintVersion} |`);
  lines.push("");
  lines.push("### Sentences");
  lines.push("");
  lines.push("| Metric | Value |");
  lines.push("|---|---|");
  lines.push(`| Bank rows | ${s.rows} |`);
  lines.push(`| Curriculum units | ${s.units} |`);
  lines.push(`| Curriculum sections | ${s.sections} |`);
  lines.push(`| Lessons | ${s.lessons} |`);
  lines.push(`| Eligibility revision | ${s.eligibilityRevision} |`);
  lines.push(
    `| Eligibility rows reviewed | ${s.eligibilityReviewed} / ${s.rows} (${pct(s.eligibilityReviewed, s.rows)}%) |`
  );
  lines.push(
    `| Eligibility rows approved | ${s.eligibilityApproved} / ${s.rows} (${pct(s.eligibilityApproved, s.rows)}%) |`
  );
  lines.push("");
  lines.push("### Audio");
  lines.push("");
  lines.push("| Metric | Value |");
  lines.push("|---|---|");
  lines.push(`| Mapped audio keys | ${status.audio.mappedKeys} |`);
  lines.push("");
  lines.push("### App shell");
  lines.push("");
  lines.push("| Metric | Value |");
  lines.push("|---|---|");
  lines.push(`| Service-worker cache name | ${status.shell.cacheName} |`);
  lines.push(`| Versioned local assets loaded by index.html | ${status.shell.indexLocalAssets} |`);
  lines.push(`| Precached service-worker shell assets | ${status.shell.precachedShellAssets} |`);
  lines.push("");
  lines.push("### Sentence Mastery examination readiness");
  lines.push("");
  lines.push("Delivered across packets E2/X1/X2. Each row is derived live — E2 from the");
  lines.push("eligibility corpus (approved rows === bank rows), X1/X2 from the locked readiness");
  lines.push("contract in `scripts/audit-core-release.mjs` (the named artifact files plus the");
  lines.push("`HANAPATH_SENTENCE_EXAM_META` runtime marker) — so each flips automatically as its");
  lines.push("packet lands, with no edit to this report or the generator.");
  lines.push("");
  lines.push("| Milestone | Present |");
  lines.push("|---|---|");
  for (const item of status.sentenceExam) {
    const mark = item.present ? "yes" : "no";
    const note = item.note ? ` — ${item.note}` : "";
    lines.push(`| ${item.label} | ${mark}${note} |`);
  }
  lines.push("");

  lines.push("## Core gate steps");
  lines.push("");
  lines.push("Run by `node scripts/audit-core-release.mjs` (full). `blocking` steps fail the");
  lines.push("gate; `conditional` steps SKIP when the environment cannot perform them.");
  lines.push("");
  lines.push("| Step | Command | Kind |");
  lines.push("|---|---|---|");
  for (const step of GATE_STEPS) {
    let command;
    if (step.internal === "syntax") command = "`node --check` (all root scripts)";
    else if (step.internal === "status-check") command = "`--check-status` (internal)";
    else command = "`node " + [step.script, ...(step.fullArgs || [])].join(" ") + "`";
    const kind = step.requiresPath ? "conditional" : "blocking";
    lines.push(`| ${step.label} | ${command} | ${kind} |`);
  }
  lines.push("");

  lines.push("## Open core gates");
  lines.push("");
  lines.push(
    `- **Sentence eligibility** is at ${s.eligibilityApproved} / ${s.rows} approved rows ` +
      `(${pct(s.eligibilityApproved, s.rows)}%). CI and this gate run ` +
      "`audit-sentence-eligibility.mjs --allow-incomplete`; the strict gate lands with packet **E2**."
  );
  lines.push(
    `- **Sentence Mastery examination** engine/runner: ${
      sentenceExamsShipped ? "seed audit present." : "not yet shipped (packets **X1** and **X2**); the seed audit step SKIPs."
    }`
  );
  lines.push(
    "- **Mobile package validation** is conditional on a prepared `mobile/www`; the Android " +
      "workflow performs it after `npm run prepare:web`."
  );
  lines.push("");

  lines.push("## Coverage gaps (this gate is not yet the complete lesson/exam matrix)");
  lines.push("");
  lines.push(
    "The roadmap §9 universal verification matrix is broader than the checks wired in"
  );
  lines.push("here. The following are deliberately excluded, each with a named owning packet:");
  lines.push("");
  for (const item of EXCLUDED) {
    lines.push(`- \`${item.script}\` — ${item.reason} **Owner: ${item.owner}.**`);
  }
  lines.push("");

  return lines.join("\n") + "\n";
}

// ---------------------------------------------------------------------------
// Runners
// ---------------------------------------------------------------------------

// `node --check` only checks its FIRST filename argument; any further filenames
// are ignored. So every file must be passed in its own invocation, otherwise the
// gate silently skips all but the first script. Returns true only if every file
// passes; reports each failing file.
export function checkSyntax(files, cwd = ROOT) {
  let ok = true;
  for (const file of files) {
    const result = spawnSync("node", ["--check", file], { cwd, stdio: "inherit" });
    if (result.status !== 0) {
      console.error(`  syntax check failed: ${file}`);
      ok = false;
    }
  }
  return ok;
}

function runSyntaxStep() {
  return checkSyntax(SYNTAX_FILES);
}

function runStatusCheckStep() {
  const expected = renderStatusMarkdown(deriveStatus());
  if (!existsSync(STATUS_FILE)) {
    console.error("  docs/CORE_APP_STATUS.md is missing. Run --write-status.");
    return false;
  }
  const actual = readFileSync(STATUS_FILE, "utf8");
  if (actual !== expected) {
    console.error("  docs/CORE_APP_STATUS.md is stale. Run:");
    console.error("    node scripts/audit-core-release.mjs --write-status");
    return false;
  }
  console.log("  docs/CORE_APP_STATUS.md is up to date.");
  return true;
}

function runScriptStep(step) {
  const result = spawnSync("node", [step.script, ...stepArgs(step)], {
    cwd: ROOT,
    stdio: "inherit",
  });
  return result.status === 0;
}

function runGate() {
  console.log(
    `HanaPath core-release gate (${QUICK ? "quick" : "full"} mode)\n` +
      "===============================================\n"
  );
  const results = [];
  for (const step of GATE_STEPS) {
    // Conditional steps skip cleanly when their prerequisite path is absent.
    if (step.requiresPath && !existsSync(join(ROOT, step.requiresPath))) {
      console.log(`--- SKIP ${step.id}: ${step.pending}`);
      results.push({ step, state: "skip" });
      continue;
    }
    console.log(`--- RUN  ${step.id}: ${step.label}`);
    const started = Date.now();
    let ok;
    if (step.internal === "syntax") ok = runSyntaxStep();
    else if (step.internal === "status-check") ok = runStatusCheckStep();
    else ok = runScriptStep(step);
    const ms = Date.now() - started;
    console.log(`--- ${ok ? "PASS" : "FAIL"} ${step.id} (${ms} ms)\n`);
    results.push({ step, state: ok ? "pass" : "fail" });
  }

  const failed = results.filter((r) => r.state === "fail");
  const skipped = results.filter((r) => r.state === "skip");
  const passed = results.filter((r) => r.state === "pass");

  console.log("Summary");
  console.log("-------");
  console.log(`  passed : ${passed.length}`);
  console.log(`  skipped: ${skipped.length}${skipped.length ? " (" + skipped.map((r) => r.step.id).join(", ") + ")" : ""}`);
  console.log(`  failed : ${failed.length}${failed.length ? " (" + failed.map((r) => r.step.id).join(", ") + ")" : ""}`);

  if (failed.length > 0) {
    process.exit(1);
  }
  console.log("\nCore-release gate passed.");
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

// Exported so the regression tests can import these without triggering the gate
// below (the entry point only runs when invoked as the main module).
export { deriveStatus, renderStatusMarkdown, deriveSentenceExamReadiness };

function main() {
  if (args.includes("--list")) {
    for (const step of GATE_STEPS) {
      let command;
      if (step.internal === "syntax")
        command = `node --check <each of ${SYNTAX_FILES.length} root scripts, separately>`;
      else if (step.internal === "status-check") command = "(internal status freshness check)";
      else command = "node " + [step.script, ...stepArgs(step)].join(" ");
      const tag = step.requiresPath ? " [conditional]" : "";
      console.log(`${step.id}${tag}: ${command}`);
    }
    process.exit(0);
  }

  if (args.includes("--write-status")) {
    const markdown = renderStatusMarkdown(deriveStatus());
    writeFileSync(STATUS_FILE, markdown);
    console.log(`Wrote ${STATUS_FILE}`);
    process.exit(0);
  }

  if (args.includes("--check-status")) {
    const ok = runStatusCheckStep();
    process.exit(ok ? 0 : 1);
  }

  runGate();
}

// Only run when invoked directly, not when imported by the regression test.
if (pathToFileURL(process.argv[1] || "").href === import.meta.url) {
  main();
}
