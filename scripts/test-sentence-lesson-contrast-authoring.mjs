#!/usr/bin/env node
import {
  applyLessonContrastEntry,
  buildLessonContrastEntry,
  generatedPrompt,
  selectContrastRow,
} from "./lib/sentence-lesson-contrast-authoring.mjs";

let failures = 0;
function check(name, condition) {
  if (condition) console.log(`PASS: ${name}`);
  else {
    console.error(`FAIL: ${name}`);
    failures += 1;
  }
}

const target = {
  id: "s1",
  korean: "저는 학교에 가요.",
  english: "I go to school.",
  patternTags: ["topic-neun", "location-e", "present-polite"],
  focusWordIds: ["school"],
};
const closeContrast = {
  id: "s2",
  korean: "제가 학교에 갔어요.",
  english: "I went to school.",
  patternTags: ["subject-i-ga", "location-e", "past-polite"],
  focusWordIds: ["school"],
};
const distantContrast = {
  id: "s3",
  korean: "친구가 커피를 마셔요.",
  english: "My friend drinks coffee.",
  patternTags: ["subject-i-ga", "object-eul-reul", "present-polite"],
  focusWordIds: ["coffee"],
};
const crossLessonContrast = {
  id: "s4",
  korean: "학교에 안 가요.",
  english: "I do not go to school.",
  patternTags: ["location-e", "neg-an", "present-polite"],
  focusWordIds: ["school"],
};
const lesson = {
  id: "lesson-1",
  unitId: "unit-1",
  title: "Going to school",
  sentenceIds: ["s1", "s3"],
  drillPlan: [
    { sentenceId: "s1", mode: "listen" },
    { sentenceId: "s3", mode: "listen" },
  ],
};
const candidate = {
  id: "s1",
  sectionOrder: 1,
  patternTags: target.patternTags,
  existingTypedClass: "canonical",
  existingExamPromptEn: "Speaking politely to a classmate, say that you go to school now.",
};
const lessonIdsByRow = new Map([
  ["s1", new Set(["lesson-1"])],
  ["s2", new Set(["lesson-2"])],
  ["s3", new Set(["lesson-1"])],
  ["s4", new Set(["lesson-2"])],
]);
const sectionOrdersByRow = new Map([
  ["s1", new Set([1])],
  ["s2", new Set([2])],
  ["s3", new Set([1])],
  ["s4", new Set([1])],
]);

const selected = selectContrastRow(target, [target, closeContrast, distantContrast, crossLessonContrast], {
  targetLessonId: lesson.id,
  targetSectionOrder: 1,
  lessonIdsByRow,
  sectionOrdersByRow,
});
check("selects a different live row", selected.row.id !== target.id);
check("prefers a semantically close contrast over an arbitrary same-lesson row", selected.row.id === "s4");
check("records cross-lesson provenance", selected.sourceScope === "same-section" && selected.sourceLessonIds.includes("lesson-2"));
check("records lexical and curriculum quality evidence", selected.assessment.englishOverlap >= 1 && selected.assessment.semanticIdOverlap === 1);
check("keeps heuristic contrasts reviewable", selected.assessment.reviewRequired === true);

const entry = buildLessonContrastEntry({ candidate, target, contrastSelection: selected, lesson, sectionOrder: 1 });
check("creates all six teaching responsibilities", Boolean(
  entry.meaningInContext
  && entry.contrastClosure
  && entry.controlledProduction
  && entry.variationAwareness
  && entry.freePractice
  && entry.examReadiness
));
check("keeps the bank unapproved", entry.bankApproved === false && entry.examReadiness === "typed-candidate");
check("keeps contrast selection independently reviewable", entry.contrastReviewRequired === true && entry.contrastSelection.qualityTier === "strong");
check("uses the reviewed constrained prompt when available", entry.controlledProduction.promptEn === candidate.existingExamPromptEn);
check("puts target and contrast first", entry.lessonMutation.sentenceIds[0] === "s1" && entry.lessonMutation.sentenceIds[1] === "s4");
check("preserves every original lesson row and adds the cross-lesson contrast", lesson.sentenceIds.every((id) => entry.lessonMutation.sentenceIds.includes(id)) && entry.lessonMutation.sentenceIds.includes("s4"));
check("configures controlled production only on the target", entry.lessonMutation.drillPlan[0].promptEn === candidate.existingExamPromptEn && !entry.lessonMutation.drillPlan[1].promptEn);
check("adds target and contrast study notes", Boolean(entry.studyNotes.s1 && entry.studyNotes.s4));

const mutated = applyLessonContrastEntry({ ...lesson, sentenceIds: [...lesson.sentenceIds], drillPlan: [...lesson.drillPlan] }, entry);
check("applies learner-facing concept and goal", mutated.concept.includes("Target:") && mutated.goal.includes("intended meaning"));
check("attaches auditable contrast metadata", mutated.contrastTeaching === entry);

const unreviewedPrompt = generatedPrompt({ ...candidate, existingExamPromptEn: null, english: target.english }, lesson.title);
check("generated prompt supplies context", unreviewedPrompt.includes(lesson.title));
check("generated prompt supplies register and meaning cues", /polite speech/.test(unreviewedPrompt) && unreviewedPrompt.includes(target.english));
check("generated prompt does not name internal tag ids", !unreviewedPrompt.includes("topic-neun") && !unreviewedPrompt.includes("present-polite"));

let missingContrastFailed = false;
try {
  selectContrastRow(target, [target], {
    targetLessonId: lesson.id,
    targetSectionOrder: 1,
    lessonIdsByRow,
    sectionOrdersByRow,
  });
} catch (error) {
  missingContrastFailed = /No contrast row/.test(String(error));
}
check("fails closed when no contrast exists", missingContrastFailed);

if (failures) {
  console.error(`\nSentence lesson contrast authoring regression failed with ${failures} failure(s).`);
  process.exit(1);
}
console.log("\nSentence lesson contrast authoring regression passed.");
