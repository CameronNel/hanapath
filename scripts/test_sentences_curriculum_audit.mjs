import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const planSource = fs.readFileSync(path.join(root, "sentences_lesson_plan_v2.js"), "utf8");
const sentencesSource = fs.readFileSync(path.join(root, "sentences_core.js"), "utf8");

function loadPlan() {
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(sentencesSource, context);
  vm.runInContext(planSource, context);
  if (!context.window.HANAPATH_SENTENCE_LESSONS || !context.window.HANAPATH_SENTENCE_LESSONS.length) {
    throw new Error("Plan does not contain HANAPATH_SENTENCE_LESSONS.");
  }
  return {
    sentences: context.window.HANAPATH_SENTENCES,
    units: context.window.HANAPATH_SENTENCE_UNITS,
    lessons: context.window.HANAPATH_SENTENCE_LESSONS
  };
}

function validate(plan) {
  const errors = [];
  const ids = new Set(plan.sentences.map((r) => r.id));
  const content = plan.lessons.filter((l) => l.type === "content");
  const checkpoints = plan.lessons.filter((l) => l.type === "checkpoint");

  // 1. Coverage: every row in exactly one content lesson
  const occurrence = new Map();
  for (const lesson of content) {
    for (const id of lesson.sentenceIds) {
      occurrence.set(id, (occurrence.get(id) || 0) + 1);
    }
  }
  for (const id of ids) {
    if (occurrence.get(id) !== 1) {
      errors.push(`sentence occurrence check failed for ${id}: count is ${occurrence.get(id) || 0}`);
    }
  }

  // 2. Checkpoint equality
  for (const checkpoint of checkpoints) {
    const unitLessons = content.filter((l) => l.unitId === checkpoint.unitId);
    const expected = unitLessons.flatMap((l) => l.sentenceIds).sort((a, b) => a.localeCompare(b));
    const actual = [...(checkpoint.reviewSentenceIds || [])].sort((a, b) => a.localeCompare(b));
    if (actual.join("\u0000") !== expected.join("\u0000")) {
      errors.push(`checkpoint review check failed for ${checkpoint.id}`);
    }
  }

  // 3. Suffix ban
  for (const lesson of content) {
    if (/\b(\d+|II|III|IV|V)\b$/.test(lesson.title)) {
      errors.push(`numeral/roman suffix check failed for lesson ${lesson.id}: title is "${lesson.title}"`);
    }
  }

  return errors;
}

function expectFailure(label, mutate) {
  const plan = loadPlan();
  mutate(plan);
  const errors = validate(plan);
  if (!errors.length) {
    throw new Error(`Self-test error: ${label} mutation was not rejected`);
  }
}

expectFailure("duplicate sentence in content lessons", (plan) => {
  const content = plan.lessons.filter((l) => l.type === "content");
  content[0].sentenceIds.push(content[0].sentenceIds[0]);
});

expectFailure("missing sentence in checkpoint", (plan) => {
  const checkpoint = plan.lessons.find((l) => l.type === "checkpoint");
  checkpoint.reviewSentenceIds.pop();
});

expectFailure("forbidden numeral/roman suffix in title", (plan) => {
  const content = plan.lessons.find((l) => l.type === "content");
  content.title = "Vocal Practice II";
});

console.log("Sentences curriculum v2 self-test passed: three invalid copies rejected.");
