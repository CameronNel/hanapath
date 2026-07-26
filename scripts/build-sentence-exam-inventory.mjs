#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { detectAmbiguityFlags, normalizeSentenceExamAnswer } from "./lib/sentence-exam-ambiguity.mjs";
import { DEFAULT_SHORTLIST_POLICY, selectBalancedShortlist } from "./lib/sentence-exam-candidate-ranking.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const INVENTORY_FILE = join(ROOT, "docs", "generated", "sentence_exam_inventory.json");
const SHORTLIST_FILE = join(ROOT, "docs", "generated", "sentence_exam_shortlist.json");

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

function buildPayloads() {
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

  const rawInventory = sentences.map((row) => {
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
      lessonIds: [...new Set(rowRoutes.map((route) => route.lessonId))].sort(),
      sectionOrders: [...new Set(rowRoutes.map((route) => route.sectionOrder).filter(Number.isInteger))].sort((a, b) => a - b),
      patternTags: Array.isArray(row.patternTags) ? [...row.patternTags].sort() : [],
      existingTypedClass: review?.typedClass || null,
      existingExamPromptEn: review?.examPromptEn || null,
      ambiguityFlags: [...analysis.flags].sort(),
      contractionFamilies: [...analysis.contractionFamilies].sort(),
      plausibleVariantCount: analysis.plausibleVariantCount,
      typedSafeHeuristic: analysis.typedSafeHeuristic,
    };
  });

  const selection = selectBalancedShortlist(rawInventory, DEFAULT_SHORTLIST_POLICY);
  const inventory = {
    schemaVersion: 2,
    generatorVersion: 1,
    eligibilityRevision: W.HANAPATH_SENTENCE_EXAM_ELIGIBILITY?.revision || null,
    sentenceCount: selection.inventory.length,
    reviewedCount: Object.keys(reviewedRows).length,
    typedSafeHeuristicCount: selection.inventory.filter((item) => item.typedSafeHeuristic).length,
    flaggedCount: selection.inventory.filter((item) => item.ambiguityFlags.length > 0).length,
    shortlistPolicy: selection.policy,
    shortlistSummary: selection.summary,
    inventory: selection.inventory,
  };
  const shortlist = {
    schemaVersion: 1,
    generatorVersion: 1,
    eligibilityRevision: inventory.eligibilityRevision,
    policy: selection.policy,
    summary: selection.summary,
    decisionRule: "Heuristics rank and flag only. Every item remains unapproved until CB4 independent review.",
    typedCandidates: selection.typed,
    recognitionCandidates: selection.recognition,
  };
  return { inventory, shortlist };
}

function stringifyPretty(value) {
  return JSON.stringify(value, null, 2) + "\n";
}

function stringifyCompact(value) {
  return JSON.stringify(value) + "\n";
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

const payloads = buildPayloads();
const inventoryText = stringifyCompact(payloads.inventory);
const shortlistText = stringifyPretty(payloads.shortlist);

if (process.argv.includes("--write")) {
  mkdirSync(dirname(INVENTORY_FILE), { recursive: true });
  writeFileSync(INVENTORY_FILE, inventoryText);
  writeFileSync(SHORTLIST_FILE, shortlistText);
  console.log(`Wrote ${INVENTORY_FILE}`);
  console.log(`Wrote ${SHORTLIST_FILE}`);
} else if (process.argv.includes("--check")) {
  const okay = checkFile(INVENTORY_FILE, inventoryText) && checkFile(SHORTLIST_FILE, shortlistText);
  if (!okay) {
    console.error("Run: node scripts/build-sentence-exam-inventory.mjs --write");
    process.exit(1);
  }
} else {
  console.log(JSON.stringify({
    sentenceCount: payloads.inventory.sentenceCount,
    reviewedCount: payloads.inventory.reviewedCount,
    typedSafeHeuristicCount: payloads.inventory.typedSafeHeuristicCount,
    flaggedCount: payloads.inventory.flaggedCount,
    typedShortlistCount: payloads.shortlist.summary.typedCount,
    recognitionShortlistCount: payloads.shortlist.summary.recognitionCount,
    overlapCount: payloads.shortlist.summary.overlapCount,
    bySection: payloads.shortlist.summary.bySection,
  }, null, 2));
}
