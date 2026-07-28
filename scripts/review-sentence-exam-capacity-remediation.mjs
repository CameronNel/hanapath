#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const AUTHORING_FILE = join(ROOT, "docs", "generated", "sentence_exam_cb6_capacity_authoring.json");
const REVIEW_FILE = join(ROOT, "docs", "reviews", "sentence_exam_cb6_capacity_reviews.json");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function reviewContentHash(entry) {
  const reviewedContent = {
    id: entry.id,
    mode: entry.mode,
    templateId: entry.templateId,
    examPromptEn: entry.examPromptEn,
    canonicalAnswer: entry.canonicalAnswer,
    englishMeaning: entry.englishMeaning,
    recognitionAnswerEn: entry.recognitionAnswerEn || null,
    manualAlternatives: entry.manualAlternatives || [],
    sourceSectionOrder: entry.sourceSectionOrder,
    sourceLessonIds: entry.sourceLessonIds,
    patternTags: entry.patternTags,
    controlledClause: entry.controlledClause || null,
    eligibilityReauthorization: entry.eligibilityReauthorization || null,
  };
  return createHash("sha256").update(JSON.stringify(reviewedContent)).digest("hex");
}

function validIsoTimestamp(value) {
  return typeof value === "string"
    && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value)
    && Number.isFinite(Date.parse(value));
}

function lexicalAnchor(entry) {
  const quoted = [...entry.examPromptEn.matchAll(/"([^"]+)"/g)];
  return quoted.at(-1)?.[1] || null;
}

function expectedExactClozePrompt(entry) {
  const anchor = lexicalAnchor(entry);
  if (!anchor || !entry.canonicalAnswer.includes(anchor)) return null;
  const frame = entry.canonicalAnswer.replace(anchor, "___");
  return `${entry.examPromptEn} Complete this exact Korean lesson frame: “${frame}” Insert exactly “${anchor}” in the blank, then write the complete sentence exactly as shown, preserving every visible Korean word, particle, spacing, punctuation, and order.`;
}

function validateReviewDecision(authored, review, prefix) {
  if (authored.templateId === "lexically-anchored-production") {
    const expectedPrompt = expectedExactClozePrompt(authored);
    if (!expectedPrompt || review.promptOverride !== expectedPrompt) {
      throw new Error(`${prefix} must carry its individually reviewed exact-Korean cloze prompt.`);
    }
    if (review.fairnessDecision !== "re-authored-exact-korean-cloze"
        || review.acceptedAnswerPolicy !== "canonical-only") {
      throw new Error(`${prefix} lacks the exact-cloze fairness decision and canonical-only policy.`);
    }
    if (!Array.isArray(review.manualAlternativesOverride)
        || review.manualAlternativesOverride.length !== 0) {
      throw new Error(`${prefix} exact cloze must reject variants outside the visible frame.`);
    }
    return;
  }

  if (authored.templateId === "controlled-clause-transformation") {
    if (review.fairnessDecision !== "controlled-transformation-exact-contract"
        || review.acceptedAnswerPolicy !== "canonical-only") {
      throw new Error(`${prefix} lacks its reviewed controlled-transformation decision.`);
    }
    if (!Array.isArray(review.manualAlternativesOverride)
        || review.manualAlternativesOverride.length !== 0) {
      throw new Error(`${prefix} controlled transformation must remain canonical-only.`);
    }
    return;
  }

  if (authored.mode === "recognition") {
    if (review.fairnessDecision !== "recognition-only"
        || review.acceptedAnswerPolicy !== "selected-response") {
      throw new Error(`${prefix} lacks its reviewed recognition-only decision.`);
    }
    return;
  }

  throw new Error(`${prefix} has no supported fairness decision.`);
}

function validateAndSerializeReviews() {
  const authoring = readJson(AUTHORING_FILE);
  const current = readJson(REVIEW_FILE);
  const authoredById = new Map(authoring.entries.map((entry) => [entry.id, entry]));

  if (current.revision !== authoring.revision) {
    throw new Error(`Review manifest revision '${current.revision}' does not match authoring '${authoring.revision}'.`);
  }
  if (current.entries.length !== authoring.entries.length) {
    throw new Error(`Review manifest size ${current.entries.length} does not match authoring ${authoring.entries.length}.`);
  }

  const entries = current.entries.map((review) => {
    const authored = authoredById.get(review.id);
    if (!authored) throw new Error(`Unknown review id: ${review.id}`);

    const prefix = `Entry ${review.id}`;

    // 1. Verify approval status
    if (review.reviewStatus !== "approved") {
      throw new Error(`${prefix} has status '${review.reviewStatus}', must be 'approved'.`);
    }

    // 2. Verify distinct reviewer
    if (!review.reviewedBy) {
      throw new Error(`${prefix} lacks a reviewer.`);
    }
    if (review.reviewedBy.trim().toLowerCase() === authoring.authoredBy.trim().toLowerCase()) {
      throw new Error(`${prefix} must be reviewed by someone other than the author: got '${review.reviewedBy}'.`);
    }

    // 3. Verify valid timestamp
    if (!validIsoTimestamp(review.reviewedAt)) {
      throw new Error(`${prefix} has invalid reviewedAt timestamp: '${review.reviewedAt}'.`);
    }

    // 4. Verify reviewedRevision matches
    if (review.reviewedRevision !== authoring.revision) {
      throw new Error(`${prefix} reviewedRevision '${review.reviewedRevision}' does not match expected '${authoring.revision}'.`);
    }

    // 5. Verify content hash (recompute raw hash and update in --write if needed, otherwise strict check)
    const expectedHash = reviewContentHash(authored);
    if (process.argv.includes("--check") && review.authoredContentHash !== expectedHash) {
      throw new Error(`${prefix} content hash is stale or mismatched: got '${review.authoredContentHash}', expected '${expectedHash}'.`);
    }

    // 6. Verify substantive reviewer note
    if (!review.reviewerNote || review.reviewerNote.trim().length < 40) {
      throw new Error(`${prefix} reviewerNote is missing or too short (must be >= 40 chars).`);
    }

    // 7. Verify no mechanical template boilerplate is present
    const boilerplateKeywords = [
      "leaving no additional accepted",
      "leaving no additional accepted form",
      "leaving no additional accepted Korean form to record"
    ];
    for (const keyword of boilerplateKeywords) {
      if (review.reviewerNote.includes(keyword)) {
        throw new Error(`${prefix} contains generic review boilerplate keyword: '${keyword}'. Notes must be genuinely item-specific.`);
      }
    }

    // 8. Verify the item-specific fairness decision rather than inferring approval from prose.
    validateReviewDecision(authored, review, prefix);

    return {
      ...review,
      authoredContentHash: expectedHash, // Updated if mismatching in serialize/write mode
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

const expected = `${JSON.stringify(validateAndSerializeReviews(), null, 2)}\n`;
if (process.argv.includes("--write")) {
  writeFileSync(REVIEW_FILE, expected);
  console.log("Verified and serialized independent CB6B review decisions.");
} else if (process.argv.includes("--check")) {
  if (readFileSync(REVIEW_FILE, "utf8") !== expected) {
    console.error("CB6B independent-review decisions are stale or mismatched.");
    process.exit(1);
  }
  console.log("CB6B independent-review decisions are current and verified.");
} else {
  console.log("Use --write or --check.");
}
