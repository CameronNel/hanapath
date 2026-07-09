import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = path.join(root, "scripts", "curriculum_v1_snapshot.json");
const allocationPath = path.join(root, "scripts", "curriculum_v2_allocation.json");
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
const allocation = JSON.parse(fs.readFileSync(allocationPath, "utf8"));
const fail = (message) => { throw new Error(message); };
const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(path.join(root, file))).digest("hex");

const context = { window: {}, console };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "words_curated_core.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(root, "words_lesson_plan.js"), "utf8"), context);
const words = context.window.HANAPATH_CURATED_WORDS;
const legacyLessons = context.window.HANAPATH_WORD_LESSONS;
const byId = new Map(words.map((word) => [word.id, word]));
const wordIds = new Set(words.map((word) => word.id));
const firstGroups = new Set(["post-hangul-bridge", "survival-core", "people-pronouns", "things-demonstratives", "question-words"]);
const mixedConnectives = new Set(allocation.connectiveClassification.movedToGrammar);
const expectedS1 = [];
const seen = new Set();
for (const lesson of legacyLessons) for (const id of lesson.newWordIds || []) {
  if (seen.has(id)) continue;
  seen.add(id);
  if (firstGroups.has(byId.get(id).lessonGroup)) expectedS1.push(id);
}

if (snapshot.wordCount !== 2028 || words.length !== snapshot.wordCount) fail("Curated word count is not 2,028");
if (snapshot.lessonCount !== legacyLessons.length) fail("v1 lesson snapshot lesson count drifted");
if (snapshot.sourceHashes.wordsCuratedCore !== sha256("words_curated_core.js")) fail("v1 snapshot word-data hash drifted");
if (snapshot.sourceHashes.wordsLessonPlan !== sha256("words_lesson_plan.js")) fail("v1 snapshot lesson-plan hash drifted");
if (snapshot.sourceHashes.frequencyCsv !== sha256("korean_5000_claude_ready.csv")) fail("v1 snapshot frequency hash drifted");
if (allocation.provisional !== true || allocation.idsFrozen !== false) fail("P1-0 allocation must remain provisional");
if (allocation.previews.s1WordIds.join("\u0000") !== expectedS1.join("\u0000")) fail("S1 order differs from the frozen legacy first-occurrence order");
if (expectedS1.length !== 97) fail(`S1 has ${expectedS1.length} words, expected 97`);

const contentLessons = allocation.lessons.filter((lesson) => lesson.type === "content");
const checkpoints = allocation.lessons.filter((lesson) => lesson.type === "checkpoint");
const occurrence = new Map();
for (const lesson of contentLessons) {
  if (!Array.isArray(lesson.wordIds)) fail(`${lesson.id} has no wordIds array`);
  if (lesson.track !== "grammar" && (lesson.wordIds.length < 8 || lesson.wordIds.length > 12)) fail(`${lesson.id} has ${lesson.wordIds.length} words outside 8–12`);
  for (const id of lesson.wordIds) {
    if (!wordIds.has(id)) fail(`${lesson.id} references unknown word ${id}`);
    occurrence.set(id, (occurrence.get(id) || 0) + 1);
  }
}
if (occurrence.size !== words.length) fail(`Only ${occurrence.size} distinct curated words have destinations`);
for (const id of wordIds) if (occurrence.get(id) !== 1) fail(`${id} occurs ${occurrence.get(id) || 0} times in content lessons`);
if (Object.keys(allocation.wordDestinations).length !== words.length) fail("wordDestinations does not cover every word");
for (const lesson of checkpoints) {
  if (lesson.wordIds.length !== 0) fail(`${lesson.id} checkpoint has new words`);
  const expected = contentLessons.filter((row) => row.unitId === lesson.unitId).flatMap((row) => row.wordIds);
  if (lesson.reviewWordIds.join("\u0000") !== expected.join("\u0000")) fail(`${lesson.id} reviewWordIds is not the exact unit content union`);
}

const unitById = new Map(allocation.units.map((unit) => [unit.id, unit]));
for (const unit of allocation.units) {
  const unitContent = contentLessons.filter((lesson) => lesson.unitId === unit.id);
  if (unitContent.length < 2 || unitContent.length > 4) fail(`${unit.id} has ${unitContent.length} content lessons`);
  if (!unitById.has(unit.id)) fail(`Missing unit ${unit.id}`);
  const surfaces = new Map();
  for (const id of unitContent.flatMap((lesson) => lesson.wordIds)) {
    const surface = byId.get(id).korean;
    if (!surfaces.has(surface)) surfaces.set(surface, []);
    surfaces.get(surface).push(id);
  }
  const duplicateSurfaces = [...surfaces].filter(([, ids]) => ids.length > 1);
  if (duplicateSurfaces.length && !unit.senseSafeException) fail(`${unit.id} has unapproved duplicate surfaces: ${duplicateSurfaces.map(([surface]) => surface).join(", ")}`);
}

const sectionCounts = Object.fromEntries(["s2", "s3", "s4", "s5", "s6", "s7", "s8"].map((id) => [id, allocation.units.filter((unit) => unit.sectionId === id).length]));
for (const [section, count] of Object.entries(sectionCounts)) if (count < 8 || count > 11) fail(`${section} has ${count} units outside 8–11`);
const s2Tracks = new Set(allocation.units.filter((unit) => unit.sectionId === "s2").map((unit) => unit.track));
for (const track of ["actions", "daily", "feelings", "food", "grammar", "people", "travel"]) if (!s2Tracks.has(track)) fail(`S2 preview is missing ${track}`);

const duplicateResolutionIds = new Set(allocation.duplicateResolutions.map((row) => row.wordId));
if (duplicateResolutionIds.size !== 5) fail("Expected exactly five duplicate resolutions");
for (const row of allocation.duplicateResolutions) {
  if (!legacyLessons.find((lesson) => lesson.id === row.keep)?.newWordIds.includes(row.wordId)) fail(`${row.wordId} keep placement is not a legacy placement`);
  if (!legacyLessons.find((lesson) => lesson.id === row.drop)?.newWordIds.includes(row.wordId)) fail(`${row.wordId} drop placement is not a legacy placement`);
}
for (const id of mixedConnectives) {
  const destination = allocation.wordDestinations[id];
  if (!destination || destination.track !== "grammar") fail(`Mixed connective ${id} was not moved to Grammar Glue`);
}

const surfaceToIds = new Map();
for (const word of words) { if (!surfaceToIds.has(word.korean)) surfaceToIds.set(word.korean, []); surfaceToIds.get(word.korean).push(word.id); }
const actualContrastStatuses = { unique: 0, polysemous: 0, unresolved: 0 };
for (const word of words) for (const target of word.contrastWith || []) {
  const matches = surfaceToIds.get(target) || [];
  const status = matches.length === 0 ? "unresolved" : matches.length === 1 ? "unique" : "polysemous";
  actualContrastStatuses[status] += 1;
  const row = allocation.contrastWith.rows.find((candidate) => candidate.fromId === word.id && candidate.targetSurface === target);
  if (!row || row.status !== status || row.matches.join("\u0000") !== matches.join("\u0000")) fail(`Contrast resolver drifted for ${word.id} → ${target}`);
}
if (JSON.stringify(actualContrastStatuses) !== JSON.stringify(allocation.reconciliation.contrastSummary)) fail("Contrast summary drifted");

const deterministic = spawnSync(process.execPath, [path.join(root, "scripts", "reconcile_curriculum_v2.mjs"), "--check"], { cwd: root, encoding: "utf8" });
if (deterministic.status !== 0) fail(deterministic.stderr || deterministic.stdout || "Determinism check failed");
console.log(`Curriculum allocation self-check passed: ${words.length} words, ${allocation.units.length} units, ${contentLessons.length} content lessons, ${checkpoints.length} checkpoints.`);
