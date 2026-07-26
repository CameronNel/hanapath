#!/usr/bin/env node
import { detectAmbiguityFlags } from "./lib/sentence-exam-ambiguity.mjs";
import { auditCuratedBankState, LOCKED_SELECTION_POLICY } from "./audit-sentence-exam-curated-bank.mjs";

let failures = 0;
function check(name, condition) {
  if (condition) console.log(`PASS: ${name}`);
  else {
    console.error(`FAIL: ${name}`);
    failures += 1;
  }
}

const topicRow = {
  korean: "미나는 연습생이에요.",
  english: "Mina is a trainee.",
  patternTags: ["topic-neun", "copula-ieyo"],
};
const ambiguousTopic = detectAmbiguityFlags(topicRow, "Mina is a trainee.");
check("topic sentence without discourse context is flagged", ambiguousTopic.flags.includes("topic-or-focus-not-forced"));
check("prompt without a communicative act is flagged", ambiguousTopic.flags.includes("communicative-act-not-forced"));

const anchoredTopic = detectAmbiguityFlags(topicRow, "As for Mina, tell a classmate that she is a trainee.");
check("topic framing removes the topic/focus flag", !anchoredTopic.flags.includes("topic-or-focus-not-forced"));
check("explicit action removes the communicative-act flag", !anchoredTopic.flags.includes("communicative-act-not-forced"));

const pastRow = {
  korean: "어제 한국어를 공부했어요.",
  english: "I studied Korean.",
  patternTags: ["past-polite", "object-eul-reul"],
};
const unanchoredPast = detectAmbiguityFlags(pastRow, "Tell a classmate that you studied Korean.");
check("past target without a time cue is flagged", unanchoredPast.flags.includes("time-or-tense-not-forced"));

const anchoredPast = detectAmbiguityFlags(pastRow, "Tell a classmate that you studied Korean yesterday.");
check("past target with a time cue is not tense-flagged", !anchoredPast.flags.includes("time-or-tense-not-forced"));

const formalRow = {
  korean: "감사합니다.",
  english: "Thank you.",
  patternTags: ["formal-nida"],
};
const formalPrompt = detectAmbiguityFlags(formalRow, "At a formal reception, thank the host respectfully.");
check("formal prompt with social setting is not register-flagged", !formalPrompt.flags.includes("register-not-forced"));

function clonePolicy() {
  return JSON.parse(JSON.stringify(LOCKED_SELECTION_POLICY));
}

const templates = { schemaVersion: 1, templates: [{ id: "plain-statement" }] };
const sentences = [{ id: "s-test", korean: "문이 열려 있어요.", patternTags: [] }];
const routes = new Map([["s-test", [{ lessonId: "lesson-test", sectionOrder: 1 }]]]);
const approvedEntry = {
  id: "s-test",
  mode: "typed",
  templateId: "plain-statement",
  examPromptEn: "Tell a classmate that the door is open.",
  canonicalAnswer: "문이 열려 있어요.",
  manualAlternatives: [],
  requiresLexicalAnchor: false,
  authoredBy: "author-a",
  reviewStatus: "approved",
  reviewedBy: "reviewer-b",
  reviewedAt: "2026-07-26T11:00:00Z",
  reviewedRevision: "curated-sentence-exam-v1",
  reviewerNote: "The context forces the intended statement.",
};
const cleanBank = {
  schemaVersion: 1,
  revision: "curated-sentence-exam-v1",
  enabled: false,
  selectionPolicy: clonePolicy(),
  entries: [approvedEntry],
};
const cleanAudit = auditCuratedBankState({
  bank: cleanBank,
  templates,
  sentences,
  reviewedRows: { "s-test": { typedClass: "canonical" } },
  routes,
});
check("fully reviewed typed entry passes the structural audit", cleanAudit.errors.length === 0);

const loweredPolicyBank = {
  ...cleanBank,
  enabled: true,
  selectionPolicy: {
    ...clonePolicy(),
    typedTargetSize: 0,
    recognitionTargetSize: 0,
    minTypedPerSection: 0,
    minRecognitionPerSection: 0,
  },
};
const loweredAudit = auditCuratedBankState({ bank: loweredPolicyBank, templates, sentences, routes });
check("lowered policy constants are rejected", loweredAudit.errors.some((error) => error.includes("selectionPolicy.typedTargetSize")));
check("enabled quotas use locked constants rather than bank-provided values", loweredAudit.errors.some((error) => error.includes("locked target is 288")));

const unreviewedBank = {
  ...cleanBank,
  entries: [{ ...approvedEntry, reviewStatus: "rejected", reviewedBy: "" }],
};
const unreviewedAudit = auditCuratedBankState({ bank: unreviewedBank, templates, sentences, routes });
check("typed entries without approved review evidence are rejected", unreviewedAudit.errors.some((error) => error.includes("approved independent-review status")));
check("typed entries without reviewer identity are rejected", unreviewedAudit.errors.some((error) => error.includes("no reviewedBy identity")));

const selfReviewedBank = {
  ...cleanBank,
  entries: [{ ...approvedEntry, reviewedBy: approvedEntry.authoredBy }],
};
const selfReviewedAudit = auditCuratedBankState({ bank: selfReviewedBank, templates, sentences, routes });
check("self-reviewed typed entries are rejected", selfReviewedAudit.errors.some((error) => error.includes("someone other than its author")));

if (failures > 0) {
  console.error(`\nSentence-exam ambiguity and audit-safety regression failed with ${failures} failure(s).`);
  process.exit(1);
}
console.log("\nSentence-exam ambiguity and audit-safety regression passed.");
