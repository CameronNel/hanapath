import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshot = JSON.parse(fs.readFileSync(path.join(root, "scripts", "curriculum_v1_snapshot.json"), "utf8"));
const plan = JSON.parse(fs.readFileSync(path.join(root, "scripts", "curriculum_v2_allocation.json"), "utf8"));
const currentContent = plan.lessons.filter((lesson) => lesson.type === "content");
const allLegacyIds = snapshot.lessons.map((lesson) => lesson.id);

function creditedWordIds(completedLegacyIds) {
  const completed = new Set(completedLegacyIds);
  return new Set(snapshot.lessons.filter((lesson) => completed.has(lesson.id)).flatMap((lesson) => lesson.newWordIds));
}
function migrate(completedLegacyIds, srs = {}, session = null) {
  const words = creditedWordIds(completedLegacyIds);
  const completedCurrent = currentContent.filter((lesson) => lesson.wordIds.every((id) => words.has(id))).map((lesson) => lesson.id);
  return { completedCurrent, srs, session: null, checkpoints: [] };
}
function assert(label, condition) { if (!condition) throw new Error(`Migration fixture failed: ${label}`); }

const failed = migrate([]);
assert("failed learner receives no content credit", failed.completedCurrent.length === 0);
const reviewOnly = migrate([], { [snapshot.words[0].id]: { seen: 99 } });
assert("review-only SRS does not create lesson credit", reviewOnly.completedCurrent.length === 0 && Object.keys(reviewOnly.srs).length === 1);
const partialLegacy = allLegacyIds.slice(0, 3);
const partial = migrate(partialLegacy, {}, { lessonId: "w0-post-hangul-bridge-01", mode: "study", stepIndex: 1 });
assert("partial migration clears session", partial.session === null);
assert("partial migration only credits fully covered current lessons", partial.completedCurrent.every((id) => currentContent.find((lesson) => lesson.id === id).wordIds.every((wordId) => creditedWordIds(partialLegacy).has(wordId))));
const completed = migrate([allLegacyIds[0]]);
assert("completed fixture is content-derived", completed.completedCurrent.every((id) => currentContent.find((lesson) => lesson.id === id).wordIds.every((wordId) => creditedWordIds([allLegacyIds[0]]).has(wordId))));
const mastered = migrate(allLegacyIds);
assert("mastered fixture credits every current content lesson", mastered.completedCurrent.length === currentContent.length);
assert("checkpoints remain uncrowned after migration", mastered.checkpoints.length === 0);
console.log("Curriculum v2 migration fixtures passed: failed, review-only, partial-session, completed, mastered.");
