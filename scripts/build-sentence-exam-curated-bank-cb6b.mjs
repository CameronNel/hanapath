#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import {
  buildCb4AuthoringPackage,
  buildReviewedBank,
} from "./build-sentence-exam-curated-bank.mjs";
import {
  CB6B_LOCKED_SELECTION_POLICY,
  auditCuratedBankState,
} from "./audit-sentence-exam-curated-bank.mjs";
import { auditCapacityRemediationState } from "./audit-sentence-exam-capacity-remediation.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const REVISION = "curated-sentence-exam-v2-cb6b";
const BANK_FILE = join(ROOT, "sentence_exam_curated_bank.js");
const CB4_REVIEW_FILE = join(ROOT, "docs", "reviews", "sentence_exam_curated_bank_cb4_reviews.json");
const AUTHORING_FILE = join(ROOT, "docs", "generated", "sentence_exam_cb6_capacity_authoring.json");
const REVIEW_FILE = join(ROOT, "docs", "reviews", "sentence_exam_cb6_capacity_reviews.json");
const WITNESS_FILE = join(ROOT, "docs", "generated", "sentence_exam_cb6_capacity_witness.json");
const INVENTORY_FILE = join(ROOT, "docs", "generated", "sentence_exam_inventory.json");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function loadRawLessonGlobals() {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(join(ROOT, "sentences_lesson_plan.js"), "utf8"), sandbox, {
    filename: "sentences_lesson_plan.js",
  });
  return sandbox.window;
}

function liveLessonRoutes(W, { withSections = false } = {}) {
  const routes = new Map();
  const unitToSection = new Map((W.HANAPATH_SENTENCE_UNITS || []).map((unit) => [unit.id, unit.sectionId]));
  const sectionOrder = new Map((W.HANAPATH_SENTENCE_SECTIONS || []).map((section) => [section.id, section.order]));
  for (const lesson of W.HANAPATH_SENTENCE_LESSONS || []) {
    for (const sentenceId of lesson.sentenceIds || []) {
      if (!routes.has(sentenceId)) routes.set(sentenceId, []);
      routes.get(sentenceId).push(withSections ? {
        lessonId: lesson.id,
        sectionOrder: sectionOrder.get(unitToSection.get(lesson.unitId)) || null,
      } : lesson.id);
    }
  }
  return routes;
}

function applyReview(entry, review) {
  if (!review || review.reviewStatus !== "approved") {
    throw new Error(`${entry.id}: approved CB6B review decision is required.`);
  }
  const manualAlternatives = review.manualAlternativesOverride == null
    ? [...(entry.manualAlternatives || [])]
    : [...review.manualAlternativesOverride];
  return {
    ...entry,
    examPromptEn: review.promptOverride || entry.examPromptEn,
    recognitionAnswerEn: review.recognitionAnswerOverride || entry.recognitionAnswerEn,
    manualAlternatives,
    reviewStatus: "approved",
    reviewedBy: review.reviewedBy,
    reviewedAt: review.reviewedAt,
    reviewedRevision: review.reviewedRevision,
    reviewerNote: review.reviewerNote,
  };
}

export function buildCb6bCuratedBank() {
  const { source, package: cb4Authoring } = buildCb4AuthoringPackage();
  const baseBank = buildReviewedBank(cb4Authoring, readJson(CB4_REVIEW_FILE));
  const authoring = readJson(AUTHORING_FILE);
  const reviews = readJson(REVIEW_FILE);
  const witness = readJson(WITNESS_FILE);
  const inventory = readJson(INVENTORY_FILE);
  const rawLessonGlobals = loadRawLessonGlobals();
  const routes = liveLessonRoutes(rawLessonGlobals);
  const capacityAudit = auditCapacityRemediationState({
    authoring,
    reviews,
    witness,
    inventory,
    bank: baseBank,
    routes,
    requireApproved: true,
  });
  if (!capacityAudit.ok) throw new Error(capacityAudit.failures.join("\n"));
  if (authoring.baseBank.revision !== baseBank.revision || authoring.baseBank.entryCount !== baseBank.entries.length) {
    throw new Error("CB6B authoring base-bank provenance is stale.");
  }

  const reviewById = new Map(reviews.entries.map((entry) => [entry.id, entry]));
  const additions = authoring.entries.map((entry) => applyReview(entry, reviewById.get(entry.id)));
  const bank = {
    schemaVersion: 1,
    revision: REVISION,
    enabled: false,
    reviewState: "independently-approved",
    baseRevision: baseBank.revision,
    capacityRevision: authoring.revision,
    selectionPolicy: CB6B_LOCKED_SELECTION_POLICY,
    entries: [...baseBank.entries, ...additions],
  };
  const bankAudit = auditCuratedBankState({
    bank: { ...bank, enabled: true },
    templates: source.templates,
    sentences: source.sentences,
    reviewedRows: source.reviewedRows,
    routes: liveLessonRoutes(rawLessonGlobals, { withSections: true }),
  });
  if (bankAudit.errors.length > 0) throw new Error(bankAudit.errors.join("\n"));
  return bank;
}

export function renderCb6bCuratedBank(bank) {
  return `(function () {\n  "use strict";\n\n  window.HANAPATH_SENTENCE_EXAM_CURATED_BANK = ${JSON.stringify(bank, null, 2)};\n})();\n`;
}

const expected = renderCb6bCuratedBank(buildCb6bCuratedBank());
if (process.argv.includes("--write")) {
  writeFileSync(BANK_FILE, expected);
  console.log("Wrote the independently reviewed 702-entry CB6B curated Sentence exam bank.");
} else if (process.argv.includes("--check")) {
  if (readFileSync(BANK_FILE, "utf8") !== expected) {
    console.error("CB6B curated Sentence exam bank is stale.");
    process.exit(1);
  }
  console.log("CB6B curated Sentence exam bank is current.");
} else {
  console.log("Use --write or --check.");
}
