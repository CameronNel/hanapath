#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { detectAmbiguityFlags } from "./lib/sentence-exam-ambiguity.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUILDER = join(ROOT, "scripts", "build-sentence-exam-curated-bank.mjs");
const AUTHORING = join(ROOT, "docs", "generated", "sentence_exam_curated_bank_cb4_authoring.json");
const REVIEWS = join(ROOT, "docs", "reviews", "sentence_exam_curated_bank_cb4_reviews.json");
const UNRESOLVABLE = new Set(["productive-clause-family", "particle-or-order-family", "duplicate-canonical-target"]);

function patchBuilder() {
  let text = readFileSync(BUILDER, "utf8");
  const marker = "  const analysis = detectAmbiguityFlags(row, prompt, { requiresLexicalAnchor });\n";
  const insertion = `${marker}  const unresolvableFlags = analysis.flags.filter((flag) => ["productive-clause-family", "particle-or-order-family", "duplicate-canonical-target"].includes(flag));\n  if (unresolvableFlags.length > 0) return { rejected: \`unresolved-family:${"${unresolvableFlags.join(\",\")}"}\` };\n`;
  if (!text.includes(insertion)) {
    if (!text.includes(marker)) throw new Error("Could not locate ambiguity analysis in CB4 builder.");
    text = text.replace(marker, insertion);
    writeFileSync(BUILDER, text);
    console.log("Patched CB4 selector to reject irreducibly ambiguous typed candidates.");
  } else {
    console.log("CB4 irreducible-ambiguity rejection already installed.");
  }
}

function loadSentences() {
  const sandbox = { window: {} };
  sandbox.self = sandbox.window;
  sandbox.globalThis = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(join(ROOT, "sentences_core.js"), "utf8"), sandbox, { filename: "sentences_core.js" });
  return new Map((sandbox.window.HANAPATH_SENTENCES || []).map((row) => [row.id, row]));
}

function strengthenedPrompt(entry) {
  let prompt = entry.examPromptEn.trim();
  const flags = new Set(entry.authoringAmbiguityFlags || []);
  const tags = new Set(entry.patternTags || []);
  if (flags.has("topic-or-focus-not-forced")) {
    prompt = tags.has("topic-neun")
      ? `As for the stated topic, ${prompt}`
      : `Answer what or who is at issue. ${prompt}`;
  }
  if (flags.has("time-or-tense-not-forced")) {
    prompt += tags.has("past-polite") ? " The event happened yesterday." : " The event will happen tomorrow.";
  }
  if (flags.has("register-not-forced")) prompt += " Speak politely to a teacher.";
  if (flags.has("communicative-act-not-forced")) {
    prompt = `Say the complete sentence that performs the stated task. ${prompt}`;
  }
  if (flags.has("lexical-choice-not-forced")) prompt += " Use the expression taught in this lesson.";
  return prompt.replace(/\s+/g, " ").trim();
}

function prefillReviews() {
  const authoring = JSON.parse(readFileSync(AUTHORING, "utf8"));
  const reviews = JSON.parse(readFileSync(REVIEWS, "utf8"));
  const authoredById = new Map(authoring.entries.filter((entry) => entry.mode === "typed").map((entry) => [entry.id, entry]));
  const sentences = loadSentences();
  let overrideCount = 0;
  for (const review of reviews.entries) {
    const authored = authoredById.get(review.id);
    if (!authored) throw new Error(`Review manifest contains unknown typed id ${review.id}.`);
    const irreducible = (authored.authoringAmbiguityFlags || []).filter((flag) => UNRESOLVABLE.has(flag));
    if (irreducible.length > 0) throw new Error(`${review.id} still contains irreducible ambiguity: ${irreducible.join(", ")}.`);
    const proposed = strengthenedPrompt(authored);
    const row = sentences.get(review.id);
    if (!row) throw new Error(`Missing live sentence ${review.id}.`);
    const result = detectAmbiguityFlags(row, proposed, { requiresLexicalAnchor: authored.requiresLexicalAnchor === true });
    if (result.flags.length > 0) {
      throw new Error(`${review.id} proposed prompt remains ambiguous: ${result.flags.join(", ")}.`);
    }
    review.promptOverride = proposed === authored.examPromptEn ? null : proposed;
    if (review.promptOverride) overrideCount += 1;
    review.reviewStatus = "pending";
    review.reviewedBy = null;
    review.reviewedAt = null;
    review.reviewedRevision = null;
    review.reviewerNote = null;
  }
  reviews.state = "awaiting-independent-review";
  reviews.approvedCount = 0;
  reviews.pendingCount = reviews.entries.length;
  reviews.proposedPromptOverrideCount = overrideCount;
  reviews.proposalRule = "Agent 1 proposed mechanical cue strengthening only. The independent reviewer must inspect, accept, revise, or reject each prompt before approval.";
  writeFileSync(REVIEWS, `${JSON.stringify(reviews, null, 2)}\n`);
  console.log(`Prefilled ${overrideCount} proposed prompt overrides; all pass the ambiguity detector and remain pending independent review.`);
}

if (process.argv.includes("--patch-builder")) patchBuilder();
else if (process.argv.includes("--prefill-reviews")) prefillReviews();
else throw new Error("Use --patch-builder or --prefill-reviews.");
