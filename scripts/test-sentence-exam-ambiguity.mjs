#!/usr/bin/env node
import {
  CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION,
  CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION,
  controlledClauseReplacementInstruction,
  detectAmbiguityFlags,
  validateControlledClauseContract,
} from "./lib/sentence-exam-ambiguity.mjs";
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

const clauseRow = {
  id: "s-clause",
  korean: "저는 아침을 안 먹지만 커피는 마셔요.",
  english: "I do not eat breakfast, but I drink coffee.",
  patternTags: ["but-jiman", "neg-an", "object-eul-reul", "present-polite", "topic-neun"],
};
const openClausePrompt = "Tell a classmate that you do not eat breakfast, but you drink coffee.";
const openClause = detectAmbiguityFlags(clauseRow, openClausePrompt, { requiresLexicalAnchor: true });
check("open clause translation remains excluded from typed scoring", openClause.flags.includes("productive-clause-family"));
check("particle-dense open clause translation remains excluded", openClause.flags.includes("particle-or-order-family"));

const controlledClausePrompt = [
  "Combine these supplied Korean clauses into one ordinary polite sentence.",
  "Source 1: 저는 아침을 안 먹어요.",
  "Source 2: 커피는 마셔요.",
  "Use -지만 for the required contrast.",
  controlledClauseReplacementInstruction("어요", "지만"),
  CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION,
  CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION,
].join(" ");
const controlledClauseContract = {
  schemaVersion: 1,
  operation: "combine-clauses",
  requiredPatternTag: "but-jiman",
  requiredConstructionCue: "-지만",
  sourceFragments: ["저는 아침을 안 먹어요.", "커피는 마셔요."],
  sourceEnding: "어요",
  targetEnding: "지만",
  preservedClauseEvidence: [],
  preserveSourceOrder: true,
  preserveLexicalMaterial: true,
  preserveParticles: true,
  acceptedAnswerPolicy: "reviewed-finite-only",
};
const controlledValidation = validateControlledClauseContract(clauseRow, controlledClausePrompt, controlledClauseContract);
check("complete controlled-clause contract validates", controlledValidation.valid);
const controlledClause = detectAmbiguityFlags(clauseRow, controlledClausePrompt, {
  requiresLexicalAnchor: true,
  controlledClauseContract,
});
check("controlled clause contract removes productive-family flag", !controlledClause.flags.includes("productive-clause-family"));
check("controlled preservation contract removes particle/order flag", !controlledClause.flags.includes("particle-or-order-family"));
check("controlled prompt explicitly forces all remaining ambiguity axes", controlledClause.flags.length === 0);

function makeControlledFixture({ tag, operation, cue, sourceFragments, sourceEnding, targetEnding, canonical }) {
  const prompt = [
    operation === "combine-clauses"
      ? "Combine the supplied Korean clauses into one sentence."
      : "Transform the supplied Korean sentence using the required construction.",
    ...sourceFragments.map((fragment, index) => `Source ${index + 1}: ${fragment}`),
    `Use ${cue} as the required construction.`,
    controlledClauseReplacementInstruction(sourceEnding, targetEnding),
    CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION,
    CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION,
  ].join(" ");
  const row = { id: `fixture-${tag}`, korean: canonical, patternTags: [tag] };
  const contract = {
    schemaVersion: 1,
    operation,
    requiredPatternTag: tag,
    requiredConstructionCue: cue,
    sourceFragments,
    sourceEnding,
    targetEnding,
    preservedClauseEvidence: [],
    preserveSourceOrder: true,
    preserveLexicalMaterial: true,
    preserveParticles: true,
    acceptedAnswerPolicy: "reviewed-finite-only",
  };
  return { row, prompt, contract };
}

const controlledFamilyFixtures = [
  makeControlledFixture({
    tag: "and-go",
    operation: "combine-clauses",
    cue: "-고",
    sourceFragments: ["저는 밥을 먹어요.", "물을 마셔요."],
    sourceEnding: "어요",
    targetEnding: "고",
    canonical: "저는 밥을 먹고 물을 마셔요.",
  }),
  makeControlledFixture({
    tag: "because-aseo",
    operation: "combine-clauses",
    cue: "-해서",
    sourceFragments: ["이 방은 아늑해요.", "오래 있어요."],
    sourceEnding: "해요",
    targetEnding: "해서",
    canonical: "이 방은 아늑해서 오래 있어요.",
  }),
  makeControlledFixture({
    tag: "if-myeon",
    operation: "combine-clauses",
    cue: "-으면",
    sourceFragments: ["시간이 있어요.", "커피를 마셔요."],
    sourceEnding: "어요",
    targetEnding: "으면",
    canonical: "시간이 있으면 커피를 마셔요.",
  }),
  makeControlledFixture({
    tag: "when-ttae",
    operation: "combine-clauses",
    cue: "-을 때",
    sourceFragments: ["시간이 있어요.", "커피를 마셔요."],
    sourceEnding: "어요",
    targetEnding: "을 때",
    canonical: "시간이 있을 때 커피를 마셔요.",
  }),
  makeControlledFixture({
    tag: "but-jiman",
    operation: "combine-clauses",
    cue: "-지만",
    sourceFragments: ["저는 아침을 안 먹어요.", "커피는 마셔요."],
    sourceEnding: "어요",
    targetEnding: "지만",
    canonical: "저는 아침을 안 먹지만 커피는 마셔요.",
  }),
  makeControlledFixture({
    tag: "want-go-sipda",
    operation: "recast-predicate",
    cue: "-고 싶어요",
    sourceFragments: ["저는 한국에 가요."],
    sourceEnding: "요",
    targetEnding: "고 싶어요",
    canonical: "저는 한국에 가고 싶어요.",
  }),
  makeControlledFixture({
    tag: "propositive-eyo",
    operation: "change-speech-act-ending",
    cue: "-ㅂ시다",
    sourceFragments: ["우리 같이 가요."],
    sourceEnding: "가요",
    targetEnding: "갑시다",
    canonical: "우리 같이 갑시다.",
  }),
];
for (const fixture of controlledFamilyFixtures) {
  const result = validateControlledClauseContract(fixture.row, fixture.prompt, fixture.contract);
  check(`controlled reconstruction validates for ${fixture.contract.requiredPatternTag}`, result.valid);
}

const hiddenReplacementPrompt = controlledClausePrompt.replace(
  controlledClauseReplacementInstruction("어요", "지만"),
  "Apply the required ending change.",
);
check(
  "the exact source-to-target replacement must be visible to the learner",
  !validateControlledClauseContract(clauseRow, hiddenReplacementPrompt, controlledClauseContract).valid,
);
const wholeFragmentReplacement = {
  ...controlledClauseContract,
  sourceEnding: "저는 아침을 안 먹어요",
  targetEnding: "저는 아침을 안 먹지만",
};
const wholeFragmentPrompt = controlledClausePrompt.replace(
  controlledClauseReplacementInstruction("어요", "지만"),
  controlledClauseReplacementInstruction("저는 아침을 안 먹어요", "저는 아침을 안 먹지만"),
);
check(
  "a controlled item may not replace the whole transformed fragment",
  !validateControlledClauseContract(clauseRow, wholeFragmentPrompt, wholeFragmentReplacement).valid,
);
const oversizedEndingContract = {
  ...controlledClauseContract,
  targetEnding: "아침을 안 먹지만",
};
const oversizedEndingPrompt = controlledClausePrompt.replace(
  controlledClauseReplacementInstruction("어요", "지만"),
  controlledClauseReplacementInstruction("어요", "아침을 안 먹지만"),
);
check(
  "a replacement ending may not smuggle a multi-eojeol clause",
  !validateControlledClauseContract(clauseRow, oversizedEndingPrompt, oversizedEndingContract).valid,
);

const malformedContract = { ...controlledClauseContract, sourceFragments: ["저는 아침을 안 먹어요.", "차를 마셔요."] };
const malformedValidation = validateControlledClauseContract(clauseRow, controlledClausePrompt, malformedContract);
check("hidden or mismatched source fragment invalidates the contract", !malformedValidation.valid);
const malformedClause = detectAmbiguityFlags(clauseRow, controlledClausePrompt, {
  requiresLexicalAnchor: true,
  controlledClauseContract: malformedContract,
});
check("malformed contract fails closed to productive-family flag", malformedClause.flags.includes("productive-clause-family"));

const wrongCueContract = { ...controlledClauseContract, requiredConstructionCue: "-으면" };
const wrongCuePrompt = controlledClausePrompt.replace("-지만", "-으면");
check("construction cue must match the declared pattern tag", !validateControlledClauseContract(clauseRow, wrongCuePrompt, wrongCueContract).valid);

const wrongTransformationContract = { ...controlledClauseContract, targetEnding: "으면" };
const wrongTransformationPrompt = controlledClausePrompt.replace(
  controlledClauseReplacementInstruction("어요", "지만"),
  controlledClauseReplacementInstruction("어요", "으면"),
);
check("declared transformation must reconstruct the canonical target exactly", !validateControlledClauseContract(clauseRow, wrongTransformationPrompt, wrongTransformationContract).valid);

function clonePolicy() {
  return JSON.parse(JSON.stringify(LOCKED_SELECTION_POLICY));
}

const templates = {
  schemaVersion: 1,
  templates: [
    { id: "plain-statement" },
    { id: "controlled-clause-transformation" },
  ],
};
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

const controlledEntry = {
  ...approvedEntry,
  id: "s-clause",
  templateId: "controlled-clause-transformation",
  examPromptEn: controlledClausePrompt,
  canonicalAnswer: clauseRow.korean,
  requiresLexicalAnchor: true,
  controlledClause: controlledClauseContract,
  reviewedRevision: "curated-sentence-exam-controlled-v1",
};
const controlledBank = {
  ...cleanBank,
  revision: "curated-sentence-exam-controlled-v1",
  entries: [controlledEntry],
};
const controlledAudit = auditCuratedBankState({
  bank: controlledBank,
  templates,
  sentences: [clauseRow],
  reviewedRows: { "s-clause": { typedClass: "excluded", exclusionReasons: ["connective-clause-continuation"] } },
  routes: new Map([["s-clause", [{ lessonId: "lesson-clause", sectionOrder: 2 }]]]),
});
check("independently reviewed controlled transformation may supersede historical open-translation exclusion", controlledAudit.errors.length === 0);
const controlledAlternativeAudit = auditCuratedBankState({
  bank: { ...controlledBank, entries: [{ ...controlledEntry, manualAlternatives: ["저는 아침을 먹지 않지만 커피는 마셔요."] }] },
  templates,
  sentences: [clauseRow],
  reviewedRows: { "s-clause": { typedClass: "excluded", exclusionReasons: ["connective-clause-continuation"] } },
  routes: new Map([["s-clause", [{ lessonId: "lesson-clause", sectionOrder: 2 }]]]),
});
check(
  "controlled transformations reject manual alternatives because the visible replacement yields one output",
  controlledAlternativeAudit.errors.some((error) => error.includes("permits only the canonical output")),
);

const lockedHistoricalAudit = auditCuratedBankState({
  bank: controlledBank,
  templates,
  sentences: [clauseRow],
  reviewedRows: { "s-clause": { typedClass: "excluded", exclusionReasons: ["future-authoring-locked"] } },
  routes: new Map([["s-clause", [{ lessonId: "lesson-clause", sectionOrder: 2 }]]]),
});
check("controlled contract cannot override an unrelated historical exclusion", lockedHistoricalAudit.errors.some((error) => error.includes("not resolved by the controlled-clause contract")));

const multiClauseRow = {
  id: "s-multi-clause",
  korean: "이 방은 아늑해서 오래 있고 싶어요.",
  english: "This room is cosy, so I want to stay for a long time.",
  patternTags: ["because-aseo", "want-go-sipda", "topic-neun", "present-polite"],
};
const multiClausePrompt = [
  "Combine these supplied Korean clauses into one ordinary polite sentence.",
  "Source 1: 이 방은 아늑해요.",
  "Source 2: 오래 있고 싶어요.",
  "Use -해서 for the required reason connection.",
  controlledClauseReplacementInstruction("해요", "해서"),
  CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION,
  CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION,
].join(" ");
const multiClauseContract = {
  ...controlledClauseContract,
  requiredPatternTag: "because-aseo",
  requiredConstructionCue: "-해서",
  sourceFragments: ["이 방은 아늑해요.", "오래 있고 싶어요."],
  sourceEnding: "해요",
  targetEnding: "해서",
  preservedClauseEvidence: [
    { patternTag: "want-go-sipda", sourceFragmentIndex: 1, visibleSurface: "고 싶어요" },
  ],
};
const multiClauseValidation = validateControlledClauseContract(multiClauseRow, multiClausePrompt, multiClauseContract);
check("one operation may preserve another productive form already fixed in a source fragment", multiClauseValidation.valid);
const missingPreservedEvidence = { ...multiClauseContract, preservedClauseEvidence: [] };
check(
  "every additional productive tag requires explicit evidence in an unchanged source fragment",
  !validateControlledClauseContract(multiClauseRow, multiClausePrompt, missingPreservedEvidence).valid,
);
const uncontrolledSecondOperation = {
  ...multiClauseContract,
  sourceFragments: ["이 방은 아늑해요.", "오래 있어요."],
};
const uncontrolledSecondPrompt = multiClausePrompt.replace("오래 있고 싶어요.", "오래 있어요.");
const uncontrolledSecondValidation = validateControlledClauseContract(multiClauseRow, uncontrolledSecondPrompt, uncontrolledSecondOperation);
check("a contract fails when the canonical target would require a second hidden grammar operation", !uncontrolledSecondValidation.valid);

const leakedPrompt = `${controlledClausePrompt} ${clauseRow.korean}`;
const leakedValidation = validateControlledClauseContract(clauseRow, leakedPrompt, controlledClauseContract);
check("controlled prompt cannot leak the complete canonical answer", !leakedValidation.valid);

const missingContractBank = {
  ...controlledBank,
  entries: [{ ...controlledEntry, controlledClause: undefined }],
};
const missingContractAudit = auditCuratedBankState({
  bank: missingContractBank,
  templates,
  sentences: [clauseRow],
  reviewedRows: {},
  routes: new Map([["s-clause", [{ lessonId: "lesson-clause", sectionOrder: 2 }]]]),
});
check("clause-sensitive typed entry without a contract is rejected", missingContractAudit.errors.some((error) => error.includes("invalid controlled-clause contract")));
check("missing contract also remains ambiguity-flagged", missingContractAudit.errors.some((error) => error.includes("productive-clause-family")));

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
