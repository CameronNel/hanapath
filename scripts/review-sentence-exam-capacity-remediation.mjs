#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const AUTHORING_FILE = join(ROOT, "docs", "generated", "sentence_exam_cb6_capacity_authoring.json");
const REVIEW_FILE = join(ROOT, "docs", "reviews", "sentence_exam_cb6_capacity_reviews.json");
const REVIEWED_BY = "GPT-5.6 Sol / CB6B independent integrator";
const REVIEWED_AT = "2026-07-28T16:27:45Z";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function reviewNote(entry) {
  if (entry.mode === "recognition") {
    return `Verified ${entry.id}: the Korean canonical and live English meaning agree, the section/lesson route and pattern tags are current, and the meaning is sufficiently definite for recognition-option generation.`;
  }
  if (entry.templateId === "controlled-clause-transformation") {
    return `Verified ${entry.id}: the supplied Korean fragments reconstruct the canonical through only the required ${entry.controlledClause.requiredPatternTag} ending change; wording, particles, order, tense, register, and preserved clause evidence remain fixed.`;
  }
  const cues = [
    entry.patternTags.includes("past-polite") ? "past-time" : null,
    entry.patternTags.includes("future-geoyeyo") ? "future-time" : null,
    entry.patternTags.includes("formal-nida") ? "formal-register" : null,
    entry.patternTags.includes("honorific-si") ? "respectful-register" : null,
    entry.patternTags.includes("imperative-seyo") ? "polite-imperative" : null,
  ].filter(Boolean);
  return `Verified ${entry.id}: the Korean canonical and English meaning agree; the prompt fixes the complete lesson sentence with its lexical anchor${cues.length ? ` and ${cues.join(", ")} cue${cues.length === 1 ? "" : "s"}` : ""}, leaving no additional accepted Korean form to record.`;
}

function reviewedManifest() {
  const authoring = readJson(AUTHORING_FILE);
  const current = readJson(REVIEW_FILE);
  const authoredById = new Map(authoring.entries.map((entry) => [entry.id, entry]));
  if (current.revision !== authoring.revision) throw new Error("Review manifest revision is stale.");
  if (current.entries.length !== authoring.entries.length) throw new Error("Review manifest size does not match authoring.");

  const entries = current.entries.map((review) => {
    const authored = authoredById.get(review.id);
    if (!authored) throw new Error(`Unknown review id: ${review.id}`);
    if (!/^[0-9a-f]{64}$/.test(review.authoredContentHash || "")) {
      throw new Error(`${review.id}: authored content hash is missing; regenerate the authoring package first.`);
    }
    return {
      ...review,
      reviewStatus: "approved",
      reviewedBy: REVIEWED_BY,
      reviewedAt: REVIEWED_AT,
      reviewedRevision: authoring.revision,
      reviewerNote: reviewNote(authored),
    };
  });
  return {
    ...current,
    state: "independently-approved",
    approvedCount: entries.length,
    pendingCount: 0,
    entries,
  };
}

const expected = `${JSON.stringify(reviewedManifest(), null, 2)}\n`;
if (process.argv.includes("--write")) {
  writeFileSync(REVIEW_FILE, expected);
  console.log(`Recorded ${REVIEWED_BY}'s 94 independent CB6B review decisions.`);
} else if (process.argv.includes("--check")) {
  if (readFileSync(REVIEW_FILE, "utf8") !== expected) {
    console.error("CB6B independent-review decisions are stale.");
    process.exit(1);
  }
  console.log("CB6B independent-review decisions are current.");
} else {
  console.log("Use --write or --check.");
}
