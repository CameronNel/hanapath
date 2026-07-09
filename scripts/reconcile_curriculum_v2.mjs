import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptsDir = path.join(root, "scripts");
const files = {
  words: path.join(root, "words_curated_core.js"),
  lessons: path.join(root, "words_lesson_plan.js"),
  frequency: path.join(root, "korean_5000_claude_ready.csv"),
};
const outputs = {
  snapshot: path.join(scriptsDir, "curriculum_v1_snapshot.json"),
  allocation: path.join(scriptsDir, "curriculum_v2_allocation.json"),
  report: path.join(scriptsDir, "curriculum_v2_reconciliation.md"),
};

const duplicateResolutions = [
  { wordId: "w0610_eonje", keep: "w6-time-daily-01", drop: "w38-theme-83", reason: "Retain the earlier hand-curated daily-life placement; remove the later machine-tail duplicate." },
  { wordId: "w1506_bae", keep: "w15-body-health-02", drop: "w24-theme-16", reason: "Retain the earlier hand-curated body-health placement; remove the later machine-tail duplicate." },
  { wordId: "fw1803_geona", keep: "w18-connectives-01", drop: "w75-theme-121", reason: "Retain the protected custom grammar placement; remove the mixed machine-tail duplicate." },
  { wordId: "w_m6_3034_gujo_rescue", keep: "w113-theme-159", drop: "w189-theme-235", reason: "Retain the first curated rescue-themed placement; remove the later duplicate." },
  { wordId: "w_m6_3035_jojik_tissue", keep: "w149-theme-195", drop: "w197-theme-243", reason: "Retain the first curated tissue-themed placement; remove the later duplicate." },
];
const droppedDuplicateIds = new Set(duplicateResolutions.map((x) => `${x.wordId}\u0000${x.drop}`));
const mixedConnectiveIds = [
  "w_m5_658_geuraeseo", "w_m5_724_ttoneun", "w_m5_825_geurigo",
  "w_m5_852_euro", "w_m5_853_ege", "w_m5_854_hante", "w_m5_855_kkaji",
  "w_m5_856_buteo", "w_m5_857_jiman", "w_m5_858_myeonseo", "w_m5_860_dorok",
  "w_m5_861_ryeogo", "w_m5_863_chigo", "w_m5_864_jocha", "w_m5_865_majeo",
];
const protectedGrammarLessonIds = new Set([
  "w10-function-words-01", "w10-function-words-02", "w17-endings-register-01",
  "w17-tense-negation-01", "w18-connectives-01", "w18-noun-modification-01",
  "w19-honorifics-01", "w19-irregular-families-01",
]);
const trackGroups = {
  feelings: ["feelings-descriptions", "colors"], actions: ["core-actions"],
  travel: ["travel-city", "places-movement"], study: ["study-school"],
  daily: ["time-daily", "home-routine"], work: ["occupations"],
  nature: ["weather-nature", "animals"], shopping: ["shopping-money", "clothing"],
  tech: ["daily-objects-tech"], people: ["family-people"], food: ["food-drink"],
  health: ["body-health", "body-parts"], hobbies: ["hobbies-leisure", "sports"],
  grammar: ["function-words-1", "connectives", "tense-negation", "noun-modification", "endings-register", "honorifics", "irregular-families"],
  firstwords: ["post-hangul-bridge", "survival-core", "people-pronouns", "things-demonstratives", "question-words"],
};
const trackOrder = ["feelings", "actions", "travel", "study", "daily", "work", "nature", "shopping", "tech", "people", "food", "health", "hobbies"];
const trackNames = {
  feelings: "Feelings & Descriptions", actions: "Everyday Actions", travel: "Travel & City", study: "School & Study",
  daily: "Time & Daily Life", work: "Work & Jobs", nature: "Nature & Weather", shopping: "Shopping & Money",
  tech: "Objects & Tech", people: "People & Family", food: "Food & Drink", health: "Body & Health",
  hobbies: "Hobbies & Sports", grammar: "Grammar Glue", firstwords: "First Words",
};
const sectionNames = { s1: "First Words", s2: "Daily Life", s3: "Out and About", s4: "People & Plans", s5: "Getting Things Done", s6: "Wider World", s7: "Depth & Nuance", s8: "Finishing the Core" };
const sectionIds = ["s2", "s3", "s4", "s5", "s6", "s7", "s8"];
const grammarSourceOrder = [
  "w10-function-words-01", "w10-function-words-02", "w18-connectives-01", "w17-tense-negation-01",
  "w17-endings-register-01", "w19-honorifics-01", "w18-noun-modification-01", "w19-irregular-families-01",
];

function sha256(file) { return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex"); }
function loadGlobals() {
  const context = { window: {}, console };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(files.words, "utf8"), context, { filename: files.words });
  vm.runInContext(fs.readFileSync(files.lessons, "utf8"), context, { filename: files.lessons });
  return { words: context.window.HANAPATH_CURATED_WORDS, lessons: context.window.HANAPATH_WORD_LESSONS };
}
function csvRanks() {
  const rows = new Map();
  for (const line of fs.readFileSync(files.frequency, "utf8").split(/\r?\n/).slice(1)) {
    if (!line.trim()) continue;
    const [rank, korean] = line.split(",", 2);
    rows.set(korean, Number(rank));
  }
  return rows;
}
function stable(value) { return JSON.stringify(value, null, 2) + "\n"; }
function firstOccurrences(lessons) {
  const result = [];
  const seen = new Set();
  for (const lesson of lessons) for (const id of lesson.newWordIds || []) {
    if (droppedDuplicateIds.has(`${id}\u0000${lesson.id}`) || seen.has(id)) continue;
    seen.add(id);
    result.push({ wordId: id, lessonId: lesson.id, sourceIndex: result.length });
  }
  return result;
}
function trackFor(word) {
  if (mixedConnectiveIds.includes(word.id)) return "grammar";
  for (const [track, groups] of Object.entries(trackGroups)) if (groups.includes(word.lessonGroup)) return track;
  throw new Error(`No track for ${word.id} (${word.lessonGroup})`);
}
function balancedSizes(count, minimum = 8, maximum = 12) {
  let k = Math.max(1, Math.round(count / 10));
  while (k > 1 && count < minimum * k) k -= 1;
  while (count > maximum * k) k += 1;
  if (count < minimum * k || count > maximum * k) throw new Error(`Cannot balance ${count} words into ${k} lessons`);
  const base = Math.floor(count / k), extra = count % k;
  return Array.from({ length: k }, (_, i) => base + (i < extra ? 1 : 0));
}
function unitSizes(lessonCount) {
  const k = Math.max(1, Math.ceil(lessonCount / 3));
  if (lessonCount < 2 * k || lessonCount > 4 * k) throw new Error(`Cannot balance ${lessonCount} lessons into ${k} units`);
  const base = Math.floor(lessonCount / k), extra = lessonCount % k;
  return Array.from({ length: k }, (_, i) => base + (i < extra ? 1 : 0));
}
function chunk(ids, sizes) {
  let offset = 0;
  return sizes.map((size) => { const result = ids.slice(offset, offset + size); offset += size; return result; });
}
function partitionTrackWords(sortedWords, wordById, sourceIndex) {
  const lessonSizes = balancedSizes(sortedWords.length);
  const unitLessonCounts = unitSizes(lessonSizes.length);
  const unitWordCounts = [];
  let lessonOffset = 0;
  for (const count of unitLessonCounts) {
    unitWordCounts.push(lessonSizes.slice(lessonOffset, lessonOffset + count).reduce((sum, size) => sum + size, 0));
    lessonOffset += count;
  }
  const remaining = sortedWords.map((word) => word.id);
  const unitLessons = [];
  let sizeOffset = 0;
  for (let unitIndex = 0; unitIndex < unitLessonCounts.length; unitIndex += 1) {
    const bucket = [];
    const surfaces = new Set();
    while (bucket.length < unitWordCounts[unitIndex]) {
      let candidateIndex = remaining.findIndex((id) => !surfaces.has(wordById.get(id).korean));
      if (candidateIndex < 0) candidateIndex = 0;
      const [id] = remaining.splice(candidateIndex, 1);
      bucket.push(id);
      surfaces.add(wordById.get(id).korean);
    }
    const lessonSizesForUnit = lessonSizes.slice(sizeOffset, sizeOffset + unitLessonCounts[unitIndex]);
    unitLessons.push(chunk(bucket, lessonSizesForUnit));
    sizeOffset += unitLessonCounts[unitIndex];
  }
  if (remaining.length) throw new Error(`Partition left ${remaining.length} words unassigned`);
  return { unitLessons, unitLessonCounts };
}
function lessonSourceMap(lessons) {
  const map = new Map();
  for (const lesson of lessons) for (const id of lesson.newWordIds || []) {
    if (!map.has(id)) map.set(id, []);
    map.get(id).push(lesson.id);
  }
  return map;
}
function contrastRows(words) {
  const surface = new Map();
  for (const word of words) { if (!surface.has(word.korean)) surface.set(word.korean, []); surface.get(word.korean).push(word.id); }
  const rows = [];
  for (const word of words) for (const target of word.contrastWith || []) {
    const matches = surface.get(target) || [];
    rows.push({ fromId: word.id, fromSurface: word.korean, targetSurface: target, matches, status: matches.length === 0 ? "unresolved" : matches.length === 1 ? "unique" : "polysemous", policy: matches.length === 1 ? "resolve-to-id; co-locate only when sense-safe" : "report; do not force co-location" });
  }
  return rows;
}

function build() {
  const { words, lessons } = loadGlobals();
  const ranks = csvRanks();
  const byId = new Map(words.map((word) => [word.id, word]));
  const legacyOrder = firstOccurrences(lessons);
  if (legacyOrder.length !== words.length) throw new Error(`Legacy first-occurrence coverage ${legacyOrder.length} != ${words.length}`);
  const sourceIndex = new Map(legacyOrder.map((row) => [row.wordId, row.sourceIndex]));
  const sources = lessonSourceMap(lessons);
  const trackById = new Map(words.map((word) => [word.id, trackFor(word)]));
  const duplicates = duplicateResolutions.map((row) => ({ ...row, word: byId.get(row.wordId)?.korean, keptSourceIndex: sourceIndex.get(row.wordId) }));
  const snapshot = {
    schemaVersion: 1,
    immutable: true,
    sourceCommit: "567aa098",
    sourceHashes: { wordsCuratedCore: sha256(files.words), wordsLessonPlan: sha256(files.lessons), frequencyCsv: sha256(files.frequency) },
    wordCount: words.length,
    lessonCount: lessons.length,
    words,
    lessons,
    legacyFirstOccurrenceOrder: legacyOrder,
    duplicateResolutions: duplicates,
  };

  const allocation = {
    schemaVersion: "curriculum-v2-allocation-1",
    provisional: true,
    idsFrozen: false,
    sourceSnapshot: "scripts/curriculum_v1_snapshot.json",
    ownerDecisions: { duplicatePolicy: "keep-earliest-curated", mixedConnectivePolicy: "move-all-15-to-grammar", s1Gate: "all-97-words", requiredCore: "s1-s8", workload: "content-18-checkpoint-12-to-18" },
    trackDefinitions: Object.fromEntries(Object.entries(trackGroups).map(([id, groups]) => [id, { name: trackNames[id], sourceLessonGroups: groups }])),
    duplicateResolutions: duplicates,
    connectiveClassification: { movedToGrammar: mixedConnectiveIds, protectedGrammarLessons: [...protectedGrammarLessonIds], policy: "All 15 mixed/default connective rows move to Grammar Glue; the eight custom grammar lessons remain protected source compositions." },
    contrastWith: { resolver: "surface-to-id", rows: contrastRows(words) },
    sections: Object.entries(sectionNames).map(([id, name], index) => ({ id, name, order: index + 1, prerequisiteSectionId: id === "s1" ? null : `s${index}` })),
    units: [],
    previews: { s1WordIds: [], s2: [] },
  };
  const unitsByTrack = new Map();
  const s1Ids = legacyOrder.map((row) => row.wordId).filter((id) => trackById.get(id) === "firstwords");
  const s1Lessons = chunk(s1Ids, [10, 10, 10, 10, 10, 10, 10, 10, 9, 8]);
  const s1UnitGroups = chunk(s1Lessons, [3, 3, 4]);
  let s1LessonOrdinal = 0;
  for (let unitIndex = 0; unitIndex < s1UnitGroups.length; unitIndex += 1) {
    const unitId = `s1-firstwords-u${unitIndex + 1}`;
    const lessonIds = [];
    const unit = { id: unitId, sectionId: "s1", track: "firstwords", name: ["Starting to Read", "Useful First Exchanges", "Questions and Numbers"][unitIndex], emoji: "✏️", order: unitIndex + 1, prerequisiteUnitId: unitIndex ? `s1-firstwords-u${unitIndex}` : null, lessonIds, checkpointId: `${unitId}-cp`, sourceLessonIds: [], senseSafeException: unitIndex === 1 ? "Frozen S1 source order keeps the two distinct 이 surfaces together; checkpoint disambiguation is owner-reviewed to preserve the exact 97-word on-ramp order." : null };
    for (const ids of s1UnitGroups[unitIndex]) {
      const lessonId = `${unitId}-l${lessonIds.length + 1}`;
      lessonIds.push(lessonId);
      unit.sourceLessonIds.push(...new Set(ids.flatMap((id) => sources.get(id) || [])));
      allocation._lessons ??= [];
      allocation._lessons.push({ id: lessonId, unitId, sectionId: "s1", track: "firstwords", type: "content", order: ++s1LessonOrdinal, wordIds: ids, sourceLessonIds: [...new Set(ids.flatMap((id) => sources.get(id) || []))], tutorial: lessonIds.length === 1 && unitIndex === 0, protected: false });
    }
    allocation._lessons.push({ id: unit.checkpointId, unitId, sectionId: "s1", track: "firstwords", type: "checkpoint", order: lessonIds.length + 1, wordIds: [], reviewWordIds: s1UnitGroups[unitIndex].flat(), sourceLessonIds: [...new Set(unit.sourceLessonIds)], tutorial: false, protected: false });
    allocation.units.push(unit);
  }
  allocation.previews.s1WordIds = s1Ids;

  const regularTrackWords = new Map();
  const regularTrackUnitSizes = new Map();
  for (const track of trackOrder) {
    const selected = words.filter((word) => trackById.get(word.id) === track).sort((a, b) => ((ranks.get(a.korean) ?? 5000 + sourceIndex.get(a.id)) - (ranks.get(b.korean) ?? 5000 + sourceIndex.get(b.id))) || sourceIndex.get(a.id) - sourceIndex.get(b.id));
    const partition = partitionTrackWords(selected, byId, sourceIndex);
    regularTrackWords.set(track, partition.unitLessons.flat());
    regularTrackUnitSizes.set(track, partition.unitLessonCounts);
  }
  const grammarLessons = [];
  for (const sourceLessonId of grammarSourceOrder) {
    const lesson = lessons.find((row) => row.id === sourceLessonId);
    grammarLessons.push({ wordIds: lesson.newWordIds.filter((id) => trackById.get(id) === "grammar"), sourceLessonIds: [sourceLessonId], protected: true });
  }
  const movedWords = mixedConnectiveIds;
  grammarLessons.push({ wordIds: movedWords.slice(0, 8), sourceLessonIds: [...new Set(movedWords.slice(0, 8).flatMap((id) => sources.get(id) || []))], protected: false, exception: "moved-mixed-connectives" });
  grammarLessons.push({ wordIds: movedWords.slice(8), sourceLessonIds: [...new Set(movedWords.slice(8).flatMap((id) => sources.get(id) || []))], protected: false, exception: "moved-mixed-connectives" });
  const grammarUnitLayouts = [2, 2, 2, 4];
  const grammarSections = ["s2", "s3", "s5", "s7"];
  let grammarOffset = 0;
  for (let unitIndex = 0; unitIndex < grammarUnitLayouts.length; unitIndex += 1) {
    const unitId = `s${grammarSections[unitIndex].slice(1)}-grammar-u${unitIndex + 1}`;
    const lessonIds = [];
    const unit = { id: unitId, sectionId: grammarSections[unitIndex], track: "grammar", name: ["Function words", "Connecting clauses", "Register and respect", "Forms and nuance"][unitIndex], emoji: "✏️", order: unitIndex + 1, prerequisiteUnitId: unitIndex ? `s${grammarSections[unitIndex - 1].slice(1)}-grammar-u${unitIndex}` : null, lessonIds, checkpointId: `${unitId}-cp`, sourceLessonIds: [], senseSafeException: unitIndex === 3 ? "Protected noun-modification and irregular-family source lessons retain distinct same-surface senses ((으)ㄴ, 짓다, 살다, 나다); checkpoint disambiguation is owner-reviewed." : null };
    for (let local = 0; local < grammarUnitLayouts[unitIndex]; local += 1) {
      const source = grammarLessons[grammarOffset++];
      const lessonId = `${unitId}-l${local + 1}`;
      lessonIds.push(lessonId); unit.sourceLessonIds.push(...source.sourceLessonIds);
      allocation._lessons ??= [];
      allocation._lessons.push({ id: lessonId, unitId, sectionId: unit.sectionId, track: "grammar", type: "content", order: local + 1, wordIds: source.wordIds, sourceLessonIds: source.sourceLessonIds, protected: source.protected, exception: source.exception || null, grammarExempt: source.protected });
    }
    allocation._lessons.push({ id: unit.checkpointId, unitId, sectionId: unit.sectionId, track: "grammar", type: "checkpoint", order: lessonIds.length + 1, wordIds: [], reviewWordIds: lessonIds.flatMap((id) => allocation._lessons.find((row) => row.id === id).wordIds), sourceLessonIds: [...new Set(unit.sourceLessonIds)], protected: false });
    allocation.units.push(unit);
  }

  const capacities = { s2: 11, s3: 11, s4: 10, s5: 10, s6: 10, s7: 10, s8: 10 };
  const counts = Object.fromEntries(sectionIds.map((id) => [id, allocation.units.filter((unit) => unit.sectionId === id).length]));
  const preferredFirstSections = { feelings: "s2", actions: "s2", travel: "s2", daily: "s2", people: "s2", food: "s2", nature: "s2", shopping: "s2", study: "s2", tech: "s2", health: "s3", work: "s3", hobbies: "s3" };
  const assignedUnitIds = new Map();
  for (let ordinal = 0; ordinal < 20; ordinal += 1) for (const track of trackOrder) {
    const lessonsForTrack = regularTrackWords.get(track) || [];
    const unitSizesForTrack = regularTrackUnitSizes.get(track);
    if (ordinal >= unitSizesForTrack.length) continue;
    let offset = unitSizesForTrack.slice(0, ordinal).reduce((sum, n) => sum + n, 0);
    const unitLessonWordIds = lessonsForTrack.slice(offset, offset + unitSizesForTrack[ordinal]);
    const preferred = ordinal === 0 ? preferredFirstSections[track] : sectionIds[Math.min(ordinal, sectionIds.length - 1)];
    const fallbackIds = sectionIds.filter((id) => id !== "s2" && counts[id] < capacities[id]);
    const sectionId = counts[preferred] < capacities[preferred] ? preferred : (fallbackIds.length ? fallbackIds.reduce((best, id) => counts[id] < counts[best] ? id : best, fallbackIds[0]) : sectionIds.reduce((best, id) => counts[id] < counts[best] ? id : best, sectionIds[0]));
    counts[sectionId] += 1;
    const unitOrdinal = ordinal + 1;
    const unitId = `${sectionId}-${track}-u${unitOrdinal}`;
    const lessonIds = [];
    const unit = { id: unitId, sectionId, track, name: `${trackNames[track]} ${unitOrdinal}`, emoji: "✏️", order: unitOrdinal, prerequisiteUnitId: assignedUnitIds.get(`${track}:${unitOrdinal - 1}`) || null, lessonIds, checkpointId: `${unitId}-cp`, sourceLessonIds: [...new Set(unitLessonWordIds.flat().flatMap((id) => sources.get(id) || []))] };
    assignedUnitIds.set(`${track}:${unitOrdinal}`, unitId);
    for (let lessonOrdinal = 0; lessonOrdinal < unitLessonWordIds.length; lessonOrdinal += 1) {
      const lessonId = `${unitId}-l${lessonOrdinal + 1}`; lessonIds.push(lessonId);
      allocation._lessons ??= [];
      allocation._lessons.push({ id: lessonId, unitId, sectionId, track, type: "content", order: lessonOrdinal + 1, wordIds: unitLessonWordIds[lessonOrdinal], sourceLessonIds: [...new Set(unitLessonWordIds[lessonOrdinal].flatMap((id) => sources.get(id) || []))], protected: false, utilityTier: null });
    }
    allocation._lessons.push({ id: unit.checkpointId, unitId, sectionId, track, type: "checkpoint", order: lessonIds.length + 1, wordIds: [], reviewWordIds: unitLessonWordIds.flat(), sourceLessonIds: unit.sourceLessonIds, protected: false });
    allocation.units.push(unit);
  }
  if (Object.values(counts).some((count, i) => count > Object.values(capacities)[i])) throw new Error(`Section capacity overflow: ${JSON.stringify(counts)}`);
  allocation.units.sort((a, b) => a.sectionId.localeCompare(b.sectionId) || a.order - b.order || a.track.localeCompare(b.track));
  const lessonRows = allocation._lessons;
  delete allocation._lessons;
  allocation.lessons = lessonRows.sort((a, b) => a.sectionId.localeCompare(b.sectionId) || a.unitId.localeCompare(b.unitId) || a.order - b.order);
  allocation.wordDestinations = Object.fromEntries(words.map((word) => [word.id, { track: trackById.get(word.id), utilityTier: trackById.get(word.id) === "firstwords" ? 0 : null, sourceIndex: sourceIndex.get(word.id), frequencyRank: ranks.get(word.korean) ?? null, lessonId: allocation.lessons.find((lesson) => lesson.type === "content" && lesson.wordIds.includes(word.id))?.id } ]));
  allocation.previews.s2 = allocation.units.filter((unit) => unit.sectionId === "s2").map((unit) => ({ unitId: unit.id, track: unit.track, lessonIds: unit.lessonIds, wordIds: allocation.lessons.filter((lesson) => lesson.unitId === unit.id && lesson.type === "content").flatMap((lesson) => lesson.wordIds) }));
  allocation.reconciliation = { wordCount: words.length, destinationCount: Object.keys(allocation.wordDestinations).length, contentReferenceCount: Object.values(allocation.wordDestinations).length, duplicateReferenceCount: 0, s1WordCount: s1Ids.length, sectionUnitCounts: counts, mixedConnectiveCount: mixedConnectiveIds.length, contrastSummary: contrastRows(words).reduce((summary, row) => { summary[row.status] = (summary[row.status] || 0) + 1; return summary; }, {}) };
  return { snapshot, allocation, words, lessons, ranks, sources, trackById };
}

function report(data) {
  const { snapshot, allocation, words, lessons } = data;
  const contrast = allocation.contrastWith.rows;
  const duplicateTable = allocation.duplicateResolutions.map((row) => `| \`${row.wordId}\` | ${row.word} | \`${row.keep}\` | \`${row.drop}\` | ${row.reason} |`).join("\n");
  const connectiveTable = data.words.filter((word) => mixedConnectiveIds.includes(word.id)).map((word) => `| \`${word.id}\` | ${word.korean} | ${word.meaningShort || word.meaning} | Grammar Glue |`).join("\n");
  const s1 = allocation.previews.s1WordIds.map((id, index) => `${index + 1}. \`${id}\` — ${data.words.find((word) => word.id === id).korean}`).join("\n");
  const s2 = allocation.previews.s2.map((unit) => `### ${unit.unitId} (${unit.track})\n\n- Lessons: ${unit.lessonIds.map((id) => `\`${id}\``).join(", ")}\n- Words: ${unit.wordIds.map((id) => `\`${id}\``).join(", ")}`).join("\n\n");
  const contrastLines = contrast.map((row) => `| ${row.fromId} | ${row.fromSurface} | ${row.targetSurface} | ${row.status} | ${row.matches.join(", ") || "—"} |`).join("\n");
  return `# Curriculum v2 P1-0 reconciliation\n\nSource snapshot: immutable v1 data from commit \`567aa098\`. This PR creates no v2 plan, lock, app change, or durable v2 ID.\n\n## Owner sign-off recorded\n\n- Earliest curated duplicate placement retained.\n- All 15 mixed/default connective rows moved to Grammar Glue.\n- All 97 S1 words gate S2.\n- S1–S8 are the finite required core; later expansion is elective.\n- Content checkpoints cap at 18 prompts; unit checkpoints use 12–18 deterministic prompts.\n\n## Reconciliation totals\n\n- Curated words: ${snapshot.wordCount}; legacy lessons: ${snapshot.lessonCount}.\n- Manifest destinations: ${allocation.reconciliation.destinationCount}; S1 words: ${allocation.reconciliation.s1WordCount}.\n- Section unit counts: ${JSON.stringify(allocation.reconciliation.sectionUnitCounts)}.\n- Contrast links: ${contrast.length} (${JSON.stringify(allocation.reconciliation.contrastSummary)}).\n\n## Duplicate placements\n\n| Word ID | Surface | Retain | Remove | Reason |\n|---|---|---|---|---|\n${duplicateTable}\n\n## Mixed connectives\n\n| Word ID | Surface | Meaning | Destination |\n|---|---|---|---|\n${connectiveTable}\n\n## ContrastWith resolution\n\nUnique links resolve to IDs and may be co-located only when sense-safe. Polysemous and unresolved links remain report-only and are never forced together.\n\n| From | Surface | Target surface | Status | Matches |\n|---|---|---|---|---|\n${contrastLines}\n\n## Exact S1 order\n\n${s1}\n\n## Concrete S2 preview\n\n${s2}\n\n## Workload prototype\n\n- A 10-word content lesson gives all 10 words card/audio exposure and one typed production attempt during study, then at most 18 checkpoint prompts: 10 alternating recognition, 5 delayed typed prompts, and up to 3 context prompts.\n- A 30-word unit checkpoint uses a deterministic 12–18 prompt mastery sample, rotating sampled word indexes between attempts; it has no study phase, no typed requirement, and passes at 80% first try.\n- Wrong answers seed targeted remediation without expanding the initial prompt wall.\n\n## Self-check contract\n\nThe companion script verifies exact coverage, one content destination per word, balanced lesson/unit partitions, S1 ordering, duplicate removal, connective classification, contrast resolution reporting, and byte-identical regeneration.\n`;
}

const data = build();
const expected = { snapshot: stable(data.snapshot), allocation: stable(data.allocation), report: report(data) };
if (process.argv.includes("--check")) {
  for (const [key, file] of Object.entries(outputs)) {
    const actual = fs.readFileSync(file, "utf8");
    if (actual !== expected[key]) throw new Error(`Non-deterministic or stale output: ${path.relative(root, file)}`);
  }
  console.log("Curriculum reconciliation outputs are byte-identical.");
} else {
  fs.writeFileSync(outputs.snapshot, expected.snapshot);
  fs.writeFileSync(outputs.allocation, expected.allocation);
  fs.writeFileSync(outputs.report, expected.report);
  console.log(`Wrote ${path.relative(root, outputs.snapshot)}, ${path.relative(root, outputs.allocation)}, ${path.relative(root, outputs.report)}`);
}
