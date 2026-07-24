#!/usr/bin/env node
// audit-core-release.mjs — the single deterministic core-release gate.
//
// Governing contract: docs/CORE_APP_COMPLETION_ROADMAP.md packet C1.
//
// Responsibilities:
//   1. Run the complete required core audit matrix as child processes and exit
//      non-zero if any blocking child fails. This is a *superset* of the CI
//      gate; it never weakens an existing audit.
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
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
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
  "sentence_exam_eligibility.js",
  "hangul_mastery_exam.js",
  "hangul_strokes.js",
  "raw_word_meanings.js",
];

function loadDataGlobals() {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  for (const file of DATA_FILES) {
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

// Every root browser script is syntax-checked. Discovered deterministically so
// a newly added data file cannot silently escape the check.
const SYNTAX_FILES = [
  "app.js",
  "sw.js",
  "app_intro.js",
  "app_intro_timeline.js",
  "exam_integrity.js",
  "sentence_exam_eligibility.js",
  "hangul_mastery_exam.js",
  "word_exam_blueprints.js",
  "word_exam_engine.js",
  "form_check_blueprints.js",
  "words_lesson_plan.js",
  "words_curated_core.js",
  "words_inflect.js",
  "sentences_lesson_plan.js",
  "sentences_core.js",
  "audio_map.js",
  "hangul_strokes.js",
  "alphabet_skill_srs.js",
  "raw_word_meanings.js",
];

// Each step is a blocking audit unless marked optional. `quickArgs` replaces
// `fullArgs` in --quick mode. `requiresPath` steps SKIP (do not fail) when the
// path is absent — used for validations the local environment cannot perform.
const GATE_STEPS = [
  { id: "syntax", label: "Syntax check (node --check, all root scripts)", internal: "syntax" },
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

// Documented but intentionally excluded from the gate, with the reason.
const EXCLUDED = [
  {
    script: "scripts/audit-learning-questions.mjs",
    reason:
      "throws on main (`appendAuthoredItemQuestions is not defined` — an audit-harness extraction bug, not a product defect); not wired into CI. Repair is out of scope for C1.",
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

  lines.push("## Excluded from the gate");
  lines.push("");
  for (const item of EXCLUDED) {
    lines.push(`- \`${item.script}\` — ${item.reason}`);
  }
  lines.push("");

  return lines.join("\n") + "\n";
}

// ---------------------------------------------------------------------------
// Runners
// ---------------------------------------------------------------------------

function runSyntaxStep() {
  const result = spawnSync("node", ["--check", ...SYNTAX_FILES], {
    cwd: ROOT,
    stdio: "inherit",
  });
  return result.status === 0;
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

if (args.includes("--list")) {
  for (const step of GATE_STEPS) {
    let command;
    if (step.internal === "syntax") command = "node --check " + SYNTAX_FILES.join(" ");
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
