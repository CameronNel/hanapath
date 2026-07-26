#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { buildLessonContrastEntry, selectContrastRow } from "./lib/sentence-lesson-contrast-authoring.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const RUNTIME_FILE = join(ROOT, "sentence_lesson_contrasts_sections_1_4.js");
const REPORT_FILE = join(ROOT, "docs", "generated", "sentence_lesson_contrasts_sections_1_4.json");
const SHORTLIST_FILE = join(ROOT, "docs", "generated", "sentence_exam_shortlist.json");
const SECTION_ORDERS = Object.freeze([1, 2, 3, 4]);
const REVISION = "sentence-lesson-contrasts-cb2-v2";
const MANUAL_CONTRAST_OVERRIDES = Object.freeze({
  s0043: "s2047", // "It's there." vs "It's over there."
  s0391: "s3025", // direct instruction vs polite request to open
  s0411: "s0412", // scarf vs necktie around the neck
  s0757: "s3117", // decision question vs statement about that decision
  s0990: "s3173", // two ways to express being proud
  s2032: "s2703", // first meeting vs past meeting closure
  s2998: "s2043", // "my point" idiom vs asking what something means
});

function loadGlobals(files) {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  for (const file of files) {
    vm.runInContext(readFileSync(join(ROOT, file), "utf8"), sandbox, { filename: file });
  }
  return sandbox.window;
}

function buildSectionMaps(W, lessons) {
  const sections = Array.isArray(W.HANAPATH_SENTENCE_SECTIONS) ? W.HANAPATH_SENTENCE_SECTIONS : [];
  const units = Array.isArray(W.HANAPATH_SENTENCE_UNITS) ? W.HANAPATH_SENTENCE_UNITS : [];
  const sectionOrderById = new Map(sections.map((section) => [section.id, section.order]));
  const sectionOrderByUnit = new Map(units.map((unit) => [unit.id, sectionOrderById.get(unit.sectionId) || null]));
  const lessonIdsByRow = new Map();
  const sectionOrdersByRow = new Map();
  const rowIdsBySection = new Map();
  for (const lesson of lessons) {
    const sectionOrder = sectionOrderByUnit.get(lesson.unitId);
    if (!Number.isInteger(sectionOrder)) continue;
    if (!rowIdsBySection.has(sectionOrder)) rowIdsBySection.set(sectionOrder, new Set());
    for (const rowId of lesson.sentenceIds || []) {
      rowIdsBySection.get(sectionOrder).add(rowId);
      if (!lessonIdsByRow.has(rowId)) lessonIdsByRow.set(rowId, new Set());
      lessonIdsByRow.get(rowId).add(lesson.id);
      if (!sectionOrdersByRow.has(rowId)) sectionOrdersByRow.set(rowId, new Set());
      sectionOrdersByRow.get(rowId).add(sectionOrder);
    }
  }
  return { sectionOrderByUnit, lessonIdsByRow, sectionOrdersByRow, rowIdsBySection };
}

function buildPayload() {
  const W = loadGlobals(["sentences_core.js", "sentences_lesson_plan.js"]);
  const rows = Array.isArray(W.HANAPATH_SENTENCES) ? W.HANAPATH_SENTENCES : [];
  const lessons = Array.isArray(W.HANAPATH_SENTENCE_LESSONS) ? W.HANAPATH_SENTENCE_LESSONS : [];
  const shortlist = JSON.parse(readFileSync(SHORTLIST_FILE, "utf8"));
  const { sectionOrderByUnit, lessonIdsByRow, sectionOrdersByRow, rowIdsBySection } = buildSectionMaps(W, lessons);
  const rowById = new Map(rows.map((row) => [row.id, row]));
  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const candidates = (shortlist.typedCandidates || [])
    .filter((candidate) => SECTION_ORDERS.includes(candidate.sectionOrder))
    .sort((a, b) => a.sectionOrder - b.sectionOrder || a.lessonIds[0].localeCompare(b.lessonIds[0], "en") || a.id.localeCompare(b.id, "en"));

  const entries = candidates.map((candidate) => {
    if (!Array.isArray(candidate.lessonIds) || candidate.lessonIds.length !== 1) {
      throw new Error(`${candidate.id}: CB2 requires one stable lesson route.`);
    }
    const lesson = lessonById.get(candidate.lessonIds[0]);
    const target = rowById.get(candidate.id);
    if (!lesson || !target) throw new Error(`${candidate.id}: missing live target or lesson.`);
    const sectionOrder = sectionOrderByUnit.get(lesson.unitId);
    if (sectionOrder !== candidate.sectionOrder) {
      throw new Error(`${candidate.id}: shortlist section ${candidate.sectionOrder} does not match live route ${sectionOrder}.`);
    }
    const nearbyRowIds = new Set();
    for (const [candidateSection, rowIds] of rowIdsBySection) {
      if (Math.abs(candidateSection - sectionOrder) > 2) continue;
      for (const rowId of rowIds) nearbyRowIds.add(rowId);
    }
    const sectionRows = [...nearbyRowIds].map((id) => rowById.get(id)).filter(Boolean);
    const overrideId = MANUAL_CONTRAST_OVERRIDES[target.id] || null;
    const overrideRow = overrideId ? rowById.get(overrideId) : null;
    if (overrideId && !overrideRow) throw new Error(`${target.id}: missing manual contrast override ${overrideId}.`);
    const contrastSelection = selectContrastRow(target, overrideRow ? [overrideRow] : sectionRows, {
      targetLessonId: lesson.id,
      targetSectionOrder: sectionOrder,
      lessonIdsByRow,
      sectionOrdersByRow,
    });
    contrastSelection.selectionMethod = overrideRow ? "manual-semantic-override" : "ranked";
    return buildLessonContrastEntry({ candidate, target, contrastSelection, lesson, sectionOrder });
  });

  const countsBySection = SECTION_ORDERS.map((sectionOrder) => ({
    sectionOrder,
    count: entries.filter((entry) => entry.sectionOrder === sectionOrder).length,
    generatedPromptCount: entries.filter((entry) => entry.sectionOrder === sectionOrder && entry.promptReviewRequired).length,
    strongContrastCount: entries.filter((entry) => entry.sectionOrder === sectionOrder && entry.contrastSelection.qualityTier === "strong").length,
    usableContrastCount: entries.filter((entry) => entry.sectionOrder === sectionOrder && entry.contrastSelection.qualityTier === "usable").length,
    weakContrastCount: entries.filter((entry) => entry.sectionOrder === sectionOrder && entry.contrastSelection.qualityTier === "weak").length,
  }));
  const report = {
    schemaVersion: 1,
    revision: REVISION,
    sectionOrders: [...SECTION_ORDERS],
    entryCount: entries.length,
    bankApprovedCount: entries.filter((entry) => entry.bankApproved).length,
    generatedPromptCount: entries.filter((entry) => entry.promptReviewRequired).length,
    strongContrastCount: entries.filter((entry) => entry.contrastSelection.qualityTier === "strong").length,
    usableContrastCount: entries.filter((entry) => entry.contrastSelection.qualityTier === "usable").length,
    weakContrastCount: entries.filter((entry) => entry.contrastSelection.qualityTier === "weak").length,
    rankedWeakContrastCount: entries.filter((entry) => entry.contrastSelection.selectionMethod === "ranked" && entry.contrastSelection.qualityTier === "weak").length,
    sameLessonContrastCount: entries.filter((entry) => entry.contrastSelection.sourceScope === "same-lesson").length,
    sameSectionContrastCount: entries.filter((entry) => entry.contrastSelection.sourceScope === "same-section").length,
    nearbySectionContrastCount: entries.filter((entry) => entry.contrastSelection.sourceScope === "nearby-section").length,
    manualOverrideCount: entries.filter((entry) => entry.contrastSelection.selectionMethod === "manual-semantic-override").length,
    countsBySection,
    decisionRule: "CB2 teaches and constrains candidates but never approves curated-bank content.",
    entries,
  };
  return report;
}

function runtimeText(report) {
  const data = JSON.stringify(report, null, 2);
  return `// Generated by scripts/build-sentence-lesson-contrasts.mjs. Do not hand-edit.\n(function installSentenceLessonContrastsSections1To4() {\n  "use strict";\n  const contract = ${data};\n  const lessons = Array.isArray(window.HANAPATH_SENTENCE_LESSONS) ? window.HANAPATH_SENTENCE_LESSONS : [];\n  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));\n  for (const entry of contract.entries) {\n    const lesson = lessonById.get(entry.lessonId);\n    if (!lesson) throw new Error(\`CB2 contrast lesson missing: \${entry.lessonId}\`);\n    const mutation = entry.lessonMutation;\n    lesson.goal = mutation.goal;\n    lesson.subtitle = mutation.subtitle;\n    lesson.concept = mutation.concept;\n    lesson.sentenceIds = mutation.sentenceIds.slice();\n    lesson.drillPlan = mutation.drillPlan.map((item) => ({ ...item }));\n    lesson.contrastTeaching = entry;\n  }\n  window.HANAPATH_SENTENCE_LESSON_CONTRASTS_1_4 = contract;\n})();\n`;
}

function pretty(value) {
  return JSON.stringify(value, null, 2) + "\n";
}

function checkFile(path, expected) {
  let current = "";
  try {
    current = readFileSync(path, "utf8");
  } catch {
    console.error(`Missing generated file: ${path}`);
    return false;
  }
  if (current !== expected) {
    console.error(`Stale generated file: ${path}`);
    return false;
  }
  console.log(`Generated file is current: ${path}`);
  return true;
}

const report = buildPayload();
const runtime = runtimeText(report);
const reportOutput = pretty(report);

if (process.argv.includes("--write")) {
  mkdirSync(dirname(REPORT_FILE), { recursive: true });
  writeFileSync(RUNTIME_FILE, runtime);
  writeFileSync(REPORT_FILE, reportOutput);
  console.log(`Wrote ${RUNTIME_FILE}`);
  console.log(`Wrote ${REPORT_FILE}`);
} else if (process.argv.includes("--check")) {
  const okay = checkFile(RUNTIME_FILE, runtime) && checkFile(REPORT_FILE, reportOutput);
  if (!okay) {
    console.error("Run: node scripts/build-sentence-lesson-contrasts.mjs --write");
    process.exit(1);
  }
} else {
  console.log(JSON.stringify({
    revision: report.revision,
    entryCount: report.entryCount,
    generatedPromptCount: report.generatedPromptCount,
    strongContrastCount: report.strongContrastCount,
    usableContrastCount: report.usableContrastCount,
    weakContrastCount: report.weakContrastCount,
    rankedWeakContrastCount: report.rankedWeakContrastCount,
    sameLessonContrastCount: report.sameLessonContrastCount,
    sameSectionContrastCount: report.sameSectionContrastCount,
    nearbySectionContrastCount: report.nearbySectionContrastCount,
    manualOverrideCount: report.manualOverrideCount,
    countsBySection: report.countsBySection,
  }, null, 2));
}
