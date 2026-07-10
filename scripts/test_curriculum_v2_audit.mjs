import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const planSource = fs.readFileSync(path.join(root, "words_lesson_plan.js"), "utf8");
const wordsSource = fs.readFileSync(path.join(root, "words_curated_core.js"), "utf8");
function loadPlan() {
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(wordsSource, context);
  vm.runInContext(planSource, context);
  if (!context.window.HANAPATH_WORD_SECTIONS || !context.window.HANAPATH_WORD_SECTIONS.length) {
    throw new Error("Plan does not contain HANAPATH_WORD_SECTIONS - has it been reverted to v1 schema?");
  }
  return { words: context.window.HANAPATH_CURATED_WORDS, units: context.window.HANAPATH_WORD_UNITS, lessons: context.window.HANAPATH_WORD_LESSONS };
}
function validate(plan) {
  const errors = [];
  const ids = new Set(plan.words.map((word) => word.id));
  const content = plan.lessons.filter((lesson) => lesson.type === "content");
  const occurrence = new Map();
  for (const lesson of content) for (const id of lesson.newWordIds) occurrence.set(id, (occurrence.get(id) || 0) + 1);
  for (const id of ids) if (occurrence.get(id) !== 1) errors.push(`word occurrence ${id}`);
  const byUnit = new Map(plan.units.map((unit) => [unit.id, unit]));
  for (const checkpoint of plan.lessons.filter((lesson) => lesson.type === "checkpoint")) {
    const expected = content.filter((lesson) => lesson.unitId === checkpoint.unitId).flatMap((lesson) => lesson.newWordIds);
    if (checkpoint.reviewWordIds.join("\u0000") !== expected.join("\u0000")) errors.push(`checkpoint review ${checkpoint.id}`);
  }
  const titles = new Set();
  for (const lesson of content) {
    const section = byUnit.get(lesson.unitId)?.sectionId;
    const key = `${section}\u0000${lesson.title.toLowerCase()}`;
    if (titles.has(key)) errors.push(`duplicate title ${lesson.id}`);
    titles.add(key);
  }
  return errors;
}
function expectFailure(label, mutate) {
  const plan = loadPlan();
  mutate(plan);
  if (!validate(plan).length) throw new Error(`${label} mutation was not rejected`);
}
expectFailure("duplicate word", (plan) => { plan.lessons.find((lesson) => lesson.type === "content").newWordIds.push(plan.lessons.find((lesson) => lesson.type === "content").newWordIds[0]); });
expectFailure("checkpoint membership", (plan) => { plan.lessons.find((lesson) => lesson.type === "checkpoint").reviewWordIds.pop(); });
expectFailure("duplicate title", (plan) => { const content = plan.lessons.filter((lesson) => lesson.type === "content"); content[1].title = content[0].title; });
console.log("Curriculum v2 audit mutation self-test passed: three invalid copies rejected.");
