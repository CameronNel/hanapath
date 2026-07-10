import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptsDir = path.join(root, "scripts");
const allocationPath = path.join(scriptsDir, "curriculum_v2_allocation.json");
const snapshotPath = path.join(scriptsDir, "curriculum_v1_snapshot.json");
const namesPath = path.join(scriptsDir, "curriculum_v2_names.json");
const outputPath = path.join(root, "words_lesson_plan.js");
const lockPath = path.join(scriptsDir, "curriculum_v2_lock.json");
const reportPath = path.join(scriptsDir, "curriculum_v2_report.md");

const DEFAULT_CHECKPOINTS = ["ko-to-meaning", "audio-to-meaning", "meaning-to-ko", "type-ko", "sentence-blank"];
const DEFAULT_PASS = { minFirstTryPct: 75, requireTypedAttempt: true };
const DEFAULT_REVIEW_POLICY = { includeDue: true, maxReviewCards: 4 };
const scenarioNames = {
  firstwords: ["Reading the signs", "Useful first exchanges", "Questions on the street", "Counting everyday things"],
  feelings: ["How was your day", "Rainy-day moods", "Describing the room", "A bright morning", "Small talk outside", "Good news today"],
  actions: ["Getting things done", "Morning action verbs", "Plans in motion", "A busy afternoon", "Helping hands", "Moving through town"],
  travel: ["Finding your way", "Getting around town", "At the station", "City landmarks", "A day trip", "Checking the route"],
  study: ["In the classroom", "Study plans", "Reading together", "School supplies", "Working on a project"],
  daily: ["Morning routines", "Time on the calendar", "Meals at home", "After-work plans", "A quiet evening"],
  work: ["At the workplace", "Meeting the team", "Jobs and duties", "A busy workday"],
  nature: ["Weather today", "Animals nearby", "A walk outdoors", "Seasonal changes"],
  shopping: ["At the market", "Choosing clothes", "Paying the bill", "Finding the right size", "Shopping together"],
  tech: ["Everyday devices", "At the desk", "Messages and calls", "Fixing a small problem"],
  people: ["Family introductions", "Talking about friends", "People around us", "Making plans together"],
  food: ["Ordering a meal", "Drinks and dishes", "Cooking at home", "Choosing from the menu"],
  health: ["Body and movement", "At the clinic", "Feeling better", "Healthy routines"],
  hobbies: ["Free-time plans", "Sports with friends", "Music and games", "A weekend hobby"],
  grammar: ["Function words", "Connecting clauses", "Register and respect", "Forms and nuance"],
};
const lessonTemplates = {
  firstwords: ["Read it aloud", "Ask a simple question", "Point it out", "Count what you see", "Use it in a greeting"],
  feelings: ["Talking about %k", "A %k kind of day", "Describing %k", "Noticing %k", "Sharing a %k feeling"],
  actions: ["How to %k", "Ready to %k", "A plan to %k", "When we %k", "Helping with %k"],
  travel: ["Finding %k", "Asking about %k", "On the way to %k", "Around %k", "Planning %k"],
  study: ["Learning about %k", "Using %k in class", "A lesson on %k", "Working with %k", "Preparing %k"],
  daily: ["Starting with %k", "Making time for %k", "At %k", "Before and after %k", "Planning %k"],
  work: ["Working with %k", "A task for %k", "Talking about %k", "Planning the %k"],
  nature: ["Seeing %k", "Talking about %k", "A day with %k", "Watching %k"],
  shopping: ["Choosing %k", "Buying %k", "Comparing %k", "Paying for %k", "Finding %k"],
  tech: ["Using %k", "Fixing %k", "Sending %k", "Finding %k"],
  people: ["Meeting %k", "Talking with %k", "Introducing %k", "Making plans with %k"],
  food: ["Ordering %k", "Sharing %k", "Cooking %k", "Choosing %k"],
  health: ["Talking about %k", "Checking %k", "Caring for %k", "Moving with %k"],
  hobbies: ["Trying %k", "Playing %k", "Planning %k", "Enjoying %k"],
  grammar: ["Using %k", "Building with %k", "Choosing %k", "Practising %k"],
};

function fileSha256(file) { return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"); }
function stable(value) { return JSON.stringify(value, null, 2) + "\n"; }
function trim(text, max) { return String(text).replace(/\s+/g, " ").trim().slice(0, max).replace(/[,:;–—-]+$/g, "").trim(); }
function keyword(word) {
  const value = String(word?.meaningShort || word?.meaning || "word").replace(/\([^)]*\)/g, "").split(/[;,/]/)[0].trim();
  return value.split(/\s+/).slice(0, 3).join(" ") || "this word";
}
function loadInputs() {
  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
  const allocation = JSON.parse(fs.readFileSync(allocationPath, "utf8"));
  const names = fs.existsSync(namesPath) ? JSON.parse(fs.readFileSync(namesPath, "utf8")) : null;
  return { snapshot, allocation, names };
}
function ensureUnique(candidate, used, max, alternatives) {
  const options = [candidate, ...alternatives];
  for (const option of options) {
    const value = trim(option, max);
    if (value && !used.has(value.toLowerCase())) { used.add(value.toLowerCase()); return value; }
  }
  let suffix = " practice";
  let value = trim(candidate, max - suffix.length) + suffix;
  if (used.has(value.toLowerCase())) value = trim(candidate, max - 5) + " focus";
  used.add(value.toLowerCase());
  return value;
}
function buildNames(allocation, snapshot) {
  const words = new Map(snapshot.words.map((word) => [word.id, word]));
  const units = {};
  const lessons = {};
  const usedUnitsBySection = new Map();
  const usedTitlesBySection = new Map();
  for (const unit of allocation.units) {
    const usedUnits = usedUnitsBySection.get(unit.sectionId) || new Set();
    usedUnitsBySection.set(unit.sectionId, usedUnits);
    const track = unit.track;
    const scenarios = scenarioNames[track] || scenarioNames.grammar;
    const firstWordId = allocation.lessons.find((lesson) => lesson.unitId === unit.id && lesson.type === "content")?.wordIds?.[0];
    const word = words.get(firstWordId);
    const base = scenarios[(unit.order - 1) % scenarios.length];
    const candidate = unit.order > scenarios.length ? `${base} ${keyword(word)}` : base;
    const unitName = ensureUnique(candidate, usedUnits, 24, scenarios.map((scenario) => `${scenario} ${keyword(word)}`));
    units[unit.id] = { name: unitName, emoji: "✏️" };
    const usedTitles = usedTitlesBySection.get(unit.sectionId) || new Set();
    usedTitlesBySection.set(unit.sectionId, usedTitles);
    const templates = lessonTemplates[track] || lessonTemplates.grammar;
    for (const lesson of allocation.lessons.filter((row) => row.unitId === unit.id && row.type === "content")) {
      const lessonWord = words.get(lesson.wordIds[0]);
      const key = keyword(lessonWord);
      const template = templates[(lesson.order - 1) % templates.length].replace("%k", key);
      const alternatives = templates.map((item) => item.replace("%k", key));
      const title = ensureUnique(template, usedTitles, 32, alternatives);
      lessons[lesson.id] = {
        title,
        subtitle: trim(`${key} in context`, 48),
        goal: `Use ${key} in a simple Korean exchange.`,
      };
    }
    const checkpoint = allocation.lessons.find((lesson) => lesson.id === unit.checkpointId);
    const checkpointTitle = trim(`${unitName} review`, 32);
    const checkpointSubtitle = `Review ${checkpoint.reviewWordIds.length} words`;
    lessons[unit.checkpointId] = { title: checkpointTitle, subtitle: checkpointSubtitle, goal: "Recall the words from this unit." };
    usedTitles.add(checkpointTitle.toLowerCase());
  }
  return { units, lessons };
}
function sourceLesson(snapshot, id) { return snapshot.lessons.find((lesson) => lesson.id === id); }
function generate(inputs) {
  const { snapshot, allocation, names } = inputs;
  if (!names) throw new Error("Missing scripts/curriculum_v2_names.json; run with --bootstrap-names first");
  const nameData = names;
  const sections = allocation.sections.map((section) => ({ ...section, unlock: section.id === "s1" ? { requiresAlphabetComplete: true } : { previousSectionId: section.prerequisiteSectionId } }));
  const units = allocation.units.map((unit) => ({
    id: unit.id, sectionId: unit.sectionId, track: unit.track, name: nameData.units[unit.id].name, emoji: nameData.units[unit.id].emoji,
    order: unit.order, prerequisiteUnitId: unit.prerequisiteUnitId, lessonIds: unit.lessonIds, checkpointId: unit.checkpointId,
    senseSafeException: unit.senseSafeException || null,
  }));
  const lessons = allocation.lessons.map((row) => {
    const namesForLesson = nameData.lessons[row.id];
    if (!namesForLesson) throw new Error(`Missing name manifest entry for ${row.id}`);
    if (row.type === "checkpoint") return {
      id: row.id, unitId: row.unitId, stage: row.sectionId, type: "checkpoint", title: namesForLesson.title, subtitle: namesForLesson.subtitle,
      goal: namesForLesson.goal, tutorial: false, newWordIds: [], reviewWordIds: row.reviewWordIds,
      reviewPolicy: DEFAULT_REVIEW_POLICY, checkpoints: DEFAULT_CHECKPOINTS, pass: { minFirstTryPct: 80, requireTypedAttempt: false },
    };
    const protectedSource = row.protected && row.sourceLessonIds.map((id) => sourceLesson(snapshot, id)).find(Boolean);
    return {
      id: row.id, unitId: row.unitId, stage: row.sectionId, type: "content", title: namesForLesson.title, subtitle: namesForLesson.subtitle,
      goal: namesForLesson.goal, tutorial: Boolean(row.tutorial), newWordIds: row.wordIds,
      reviewPolicy: DEFAULT_REVIEW_POLICY, checkpoints: protectedSource?.checkpoints || DEFAULT_CHECKPOINTS,
      pass: protectedSource?.pass || DEFAULT_PASS,
    };
  });
  const v1Snapshot = { lessons: Object.fromEntries(snapshot.lessons.map((lesson) => [lesson.id, lesson.newWordIds])) };
  const plan = `// HanaPath Words curriculum v2. Generated deterministically; not loaded by index.html until P1-C.\n(function () {\n  "use strict";\n  window.HANAPATH_WORD_SECTIONS = ${JSON.stringify(sections, null, 2)};\n  window.HANAPATH_WORD_UNITS = ${JSON.stringify(units, null, 2)};\n  window.HANAPATH_WORD_LESSONS = ${JSON.stringify(lessons, null, 2)};\n  window.HANAPATH_WORD_V1_SNAPSHOT = ${JSON.stringify(v1Snapshot, null, 2)};\n}());\n`;
  const lock = {
    schemaVersion: 1, immutable: true, sourceSnapshot: "scripts/curriculum_v1_snapshot.json", sourceAllocation: "scripts/curriculum_v2_allocation.json",
    sourceHashes: { snapshot: fileSha256(snapshotPath), allocation: fileSha256(allocationPath), names: fileSha256(namesPath) },
    sections, units, lessons: lessons.map((lesson) => ({ id: lesson.id, unitId: lesson.unitId, type: lesson.type, title: lesson.title, subtitle: lesson.subtitle, wordIds: lesson.newWordIds, reviewWordIds: lesson.reviewWordIds || [] })),
  };
  const reportLines = ["# Words curriculum v2 report", "", `Generated from ${snapshot.wordCount} curated words and ${allocation.units.length} allocated units.`, "", "## Sections and units", ""];
  for (const section of sections) {
    reportLines.push(`### ${section.id} — ${section.name}`, "");
    for (const unit of units.filter((row) => row.sectionId === section.id)) {
      reportLines.push(`- **${unit.id}** · ${unit.name} · ${unit.track}`, `  - Lessons: ${unit.lessonIds.map((id) => `\`${id}\``).join(", ")}`, `  - Checkpoint: \`${unit.checkpointId}\``);
    }
    reportLines.push("");
  }
  reportLines.push("## Invariants", "", `- Content lessons: ${lessons.filter((lesson) => lesson.type === "content").length}; checkpoints: ${lessons.filter((lesson) => lesson.type === "checkpoint").length}.`, "- Every curated word is assigned to exactly one content lesson.", "- P1-0 duplicate, connective, contrast, and sense-safe exception decisions remain in the allocation manifest.", "- This output is unreferenced by index.html; P1-C performs the app switchover.", "");
  return { plan, lock, report: reportLines.join("\n") };
}
function bootstrapNames(inputs) {
  const names = buildNames(inputs.allocation, inputs.snapshot);
  fs.writeFileSync(namesPath, stable(names));
  console.log(`Wrote ${path.relative(root, namesPath)}`);
}

const inputs = loadInputs();
if (process.argv.includes("--bootstrap-names")) bootstrapNames(inputs);
if (!fs.existsSync(namesPath)) throw new Error("Names manifest missing; run --bootstrap-names");
const generated = generate(loadInputs());
if (process.argv.includes("--check")) {
  const expectedPlan = generated.plan;
  if (fs.readFileSync(outputPath, "utf8") !== expectedPlan) throw new Error("words_lesson_plan_v2.js is stale or non-deterministic");
  if (fs.readFileSync(lockPath, "utf8") !== stable(generated.lock)) throw new Error("curriculum_v2_lock.json is stale or non-deterministic");
  if (fs.readFileSync(reportPath, "utf8") !== generated.report) throw new Error("curriculum_v2_report.md is stale or non-deterministic");
  console.log("Words curriculum v2 outputs are byte-identical.");
} else {
  fs.writeFileSync(outputPath, generated.plan);
  fs.writeFileSync(lockPath, stable(generated.lock));
  fs.writeFileSync(reportPath, generated.report);
  console.log(`Wrote ${path.relative(root, outputPath)}, ${path.relative(root, lockPath)}, ${path.relative(root, reportPath)}`);
}
