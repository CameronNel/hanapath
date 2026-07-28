#!/usr/bin/env node
import vm from "node:vm";
import { auditFreezeManifest, buildFreezeManifest } from "./lib/sentence-exam-freeze.mjs";
import { renderActivationScript } from "./build-sentence-exam-curated-bank-freeze.mjs";

const bank = {
  schemaVersion: 1,
  revision: "fixture-v1",
  enabled: false,
  entries: [
    {
      id: "s1",
      mode: "typed",
      templateId: "topic-statement",
      examPromptEn: "Tell a classmate that Hangul is fun.",
      canonicalAnswer: "한글은 재미있어요.",
      manualAlternatives: [],
      requiresLexicalAnchor: false,
      authoredBy: "author",
      reviewStatus: "approved",
      reviewedBy: "reviewer",
      reviewedAt: "2026-07-26T21:20:40Z",
      reviewedRevision: "fixture-v1",
      reviewerNote: "The prompt fixes topic and register.",
    },
    {
      id: "s2",
      mode: "recognition",
      templateId: "recognition-meaning",
      examPromptEn: "Choose the English meaning.",
      canonicalAnswer: "공항이 붐빕니다.",
      recognitionAnswerEn: "The airport is crowded.",
      manualAlternatives: [],
      requiresLexicalAnchor: false,
    },
  ],
};
const sources = {
  "sentence_exam_curated_bank.js": "bank",
  "docs/generated/sentence_exam_inventory.json": "inventory",
  "docs/generated/sentence_exam_shortlist.json": "shortlist",
  "docs/generated/sentence_exam_curated_bank_cb4_authoring.json": "authoring",
  "docs/reviews/sentence_exam_curated_bank_cb4_reviews.json": "reviews",
  "docs/authoring/sentence_exam_cb6b_controlled_items.json": "controlled",
  "docs/authoring/sentence_exam_cb6b_replacements.json": "replacements",
  "docs/authoring/sentence_exam_cb6b_witness_assignment.json": "assignment",
  "docs/generated/sentence_exam_cb6_capacity_authoring.json": "capacity-authoring",
  "docs/generated/sentence_exam_cb6_capacity_witness.json": "witness",
  "docs/generated/sentence_exam_cb6b_joint_solution.json": "joint-solution",
  "docs/reviews/sentence_exam_cb6_capacity_reviews.json": "capacity-reviews",
};
const manifest = buildFreezeManifest({ bank, sourceFileContents: sources });
let failures = 0;
function check(name, condition) {
  if (!condition) {
    failures += 1;
    console.error(`FAIL: ${name}`);
  }
}
check("fresh manifest passes", auditFreezeManifest({ bank, manifest, sourceFileContents: sources }).errors.length === 0);

const promptTamper = structuredClone(bank);
promptTamper.entries[0].examPromptEn += " Changed.";
check(
  "prompt tamper fails",
  auditFreezeManifest({ bank: promptTamper, manifest, sourceFileContents: sources }).errors.some((error) => error.includes("promptsSha256"))
);
const answerTamper = structuredClone(bank);
answerTamper.entries[0].canonicalAnswer = "한글이 재미있어요.";
check(
  "answer tamper fails",
  auditFreezeManifest({ bank: answerTamper, manifest, sourceFileContents: sources }).errors.some((error) => error.includes("answersSha256"))
);
check(
  "inventory tamper fails",
  auditFreezeManifest({
    bank,
    manifest,
    sourceFileContents: { ...sources, "docs/generated/sentence_exam_inventory.json": "changed" },
  }).errors.some((error) => error.includes("sentence_exam_inventory.json"))
);

const runtimeBank = structuredClone(bank);
const sandbox = { window: { HANAPATH_SENTENCE_EXAM_CURATED_BANK: runtimeBank } };
sandbox.self = sandbox.window;
sandbox.globalThis = sandbox.window;
vm.createContext(sandbox);
vm.runInContext(renderActivationScript(manifest), sandbox);
check("activation enables bank", runtimeBank.enabled === true);
check("activation marks bank frozen", runtimeBank.freezeState === "frozen");
check("activation freezes bank", Object.isFrozen(runtimeBank));
check("activation freezes entries", Object.isFrozen(runtimeBank.entries[0]));
check("runtime freeze global is frozen", Object.isFrozen(sandbox.window.HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE));

if (failures > 0) {
  console.error(`\nCB5 freeze regression FAILED (${failures}).`);
  process.exit(1);
}
console.log("PASS: CB5 curated-bank freeze hashes, source inventory pinning, activation, and tamper failures.");
