#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { detectAmbiguityFlags, normalizeSentenceExamAnswer } from "./lib/sentence-exam-ambiguity.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_FILE = join(ROOT, "docs", "generated", "sentence_exam_inventory.json");

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

function buildRoutes(W) {
  const units = Array.isArray(W.HANAPATH_SENTENCE_UNITS) ? W.HANAPATH_SENTENCE_UNITS : [];
  const sections = Array.isArray(W.HANAPATH_SENTENCE_SECTIONS) ? W.HANAPATH_SENTENCE_SECTIONS : [];
  const lessons = Array.isArray(W.HANAPATH_SENTENCE_LESSONS) ? W.HANAPATH_SENTENCE_LESSONS : [];
  const unitToSection = new Map(units.map((unit) => [unit.id, unit.sectionId]));
  const sectionOrder = new Map(sections.map((section) => [section.id, section.order]));
  const routes = new Map();
  for (const lesson of lessons) {
    for (const sentenceId of lesson.sentenceIds || []) {
      if (!routes.has(sentenceId)) routes.set(sentenceId, []);
      routes.get(sentenceId).push({
        lessonId: lesson.id,
        unitId: lesson.unitId,
        sectionOrder: sectionOrder.get(unitToSection.get(lesson.unitId)) || null,
      });
    }
  }
  return routes;
}

function buildPayload() {
  const W = loadGlobals([
    "sentences_core.js",
    "sentences_lesson_plan.js",
    "sentence_exam_eligibility_shard_a.js",
    "sentence_exam_eligibility_shard_b.js",
    "sentence_exam_eligibility_shard_c.js",
    "sentence_exam_eligibility_shard_d.js",
    "sentence_exam_eligibility.js",
  ]);
  const sentences = Array.isArray(W.HANAPATH_SENTENCES) ? W.HANAPATH_SENTENCES : [];
  const reviewedRows = W.HANAPATH_SENTENCE_EXAM_ELIGIBILITY?.reviewedRows || {};
  const routes = buildRoutes(W);

  const counts = new Map();
  for (const row of sentences) {
    const key = normalizeSentenceExamAnswer(row.korean);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const duplicateCanonicalKeys = new Set([...counts].filter(([, count]) => count > 1).map(([key]) => key));

  const inventory = sentences.map((row) => {
    const review = reviewedRows[row.id] || null;
    const analysis = detectAmbiguityFlags(row, review?.examPromptEn || row.english, {
      duplicateCanonicalKeys,
      requiresLexicalAnchor: false,
    });
    const rowRoutes = routes.get(row.id) || [];
    return {
      id: row.id,
      korean: row.korean,
      english: row.english,
      lessonIds: [...new Set(rowRoutes.map((route) => route.lessonId))],
      sectionOrders: [...new Set(rowRoutes.map((route) => route.sectionOrder).filter(Number.isInteger))],
      patternTags: Array.isArray(row.patternTags) ? row.patternTags : [],
      existingTypedClass: review?.typedClass || null,
      existingExamPromptEn: review?.examPromptEn || null,
      ambiguityFlags: analysis.flags,
      contractionFamilies: analysis.contractionFamilies,
      plausibleVariantCount: analysis.plausibleVariantCount,
      typedSafeHeuristic: analysis.typedSafeHeuristic,
    };
  });

  return {
    schemaVersion: 1,
    eligibilityRevision: W.HANAPATH_SENTENCE_EXAM_ELIGIBILITY?.revision || null,
    sentenceCount: inventory.length,
    reviewedCount: Object.keys(reviewedRows).length,
    typedSafeHeuristicCount: inventory.filter((item) => item.typedSafeHeuristic).length,
    flaggedCount: inventory.filter((item) => item.ambiguityFlags.length > 0).length,
    inventory,
  };
}

const payload = buildPayload();
const text = JSON.stringify(payload, null, 2) + "\n";

if (process.argv.includes("--write")) {
  mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
  writeFileSync(OUTPUT_FILE, text);
  console.log(`Wrote ${OUTPUT_FILE}`);
} else if (process.argv.includes("--check")) {
  let current = "";
  try {
    current = readFileSync(OUTPUT_FILE, "utf8");
  } catch {
    console.error(`Missing inventory: ${OUTPUT_FILE}`);
    console.error("Run: node scripts/build-sentence-exam-inventory.mjs --write");
    process.exit(1);
  }
  if (current !== text) {
    console.error(`Stale inventory: ${OUTPUT_FILE}`);
    console.error("Run: node scripts/build-sentence-exam-inventory.mjs --write");
    process.exit(1);
  }
  console.log(`Inventory is current: ${OUTPUT_FILE}`);
} else {
  console.log(JSON.stringify({
    sentenceCount: payload.sentenceCount,
    reviewedCount: payload.reviewedCount,
    typedSafeHeuristicCount: payload.typedSafeHeuristicCount,
    flaggedCount: payload.flaggedCount,
  }, null, 2));
}
