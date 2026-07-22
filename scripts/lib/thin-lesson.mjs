// Shared "thin lesson" heuristic used by scripts/audit-words-data.mjs.
//
// Content lessons that introduce very few new words are usually a mistake — a
// stray fragment that should be folded into a same-stage sibling. The audit
// flags them so a human re-checks the split.
//
// Grammar-track lessons are the deliberate exception. They drill *forms* of
// words that were already taught elsewhere rather than introducing new
// vocabulary, so a low `newWordIds` count is expected, not a smell. The
// canonical case is the additive `s3-grammar-u2-l3` past/negation production
// bridge required by docs/WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md, whose
// §0/§1 explicitly forbid folding it into `s3-grammar-u2-l2`. The heuristic's
// only remedy ("fold into a same-stage sibling") is therefore invalid for the
// grammar track, so we exempt it. See scripts/test-thin-lesson-heuristic.mjs.
export const THIN_LESSON_MIN_WORDS = 4;

// Returns true when `lesson` should raise the thin-lesson warning.
// `context` supplies the lookups the audit already builds:
//   - isCheckpoint(lesson): checkpoints never warn (they carry no newWordIds)
//   - stageLessonCounts:    Map<stage, count> — a foldable sibling must exist
//   - unitTrackById:        Map<unitId, track> — used for the grammar exemption
export function isThinLessonWarning(lesson, { isCheckpoint, stageLessonCounts, unitTrackById }) {
  if (!lesson || isCheckpoint) return false;
  const newWordCount = Array.isArray(lesson.newWordIds) ? lesson.newWordIds.length : 0;
  if (newWordCount >= THIN_LESSON_MIN_WORDS) return false;
  const hasFoldableSibling = Boolean(lesson.stage) && (stageLessonCounts.get(lesson.stage) || 0) > 1;
  if (!hasFoldableSibling) return false;
  const grammarTrackLesson = unitTrackById.get(lesson.unitId) === "grammar";
  if (grammarTrackLesson) return false;
  return true;
}
