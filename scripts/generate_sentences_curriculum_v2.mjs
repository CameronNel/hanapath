import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const scriptsDir = path.join(root, "scripts");

const sentencesCorePath = path.join(root, "sentences_core.js");
const wordsLessonPlanPath = path.join(root, "words_lesson_plan.js");
const wordsNamesPath = path.join(scriptsDir, "curriculum_v2_names.json");
const sentencesNamesPath = path.join(scriptsDir, "sentences_curriculum_v2_names.json");
const sentencesPlanV2Path = path.join(root, "sentences_lesson_plan.js");
const lockPath = path.join(scriptsDir, "sentences_curriculum_v2_lock.json");
const reportPath = path.join(scriptsDir, "sentences_curriculum_v2_report.md");

// Helper to evaluate browser JS files in a simulated window context
function loadBrowserJS(filePath, varName) {
  const content = fs.readFileSync(filePath, "utf8");
  const sandbox = { window: {} };
  // A simple function wrapper simulation
  const fn = new Function("window", content);
  fn(sandbox.window);
  return sandbox.window[varName];
}

// Load inputs
const sentences = loadBrowserJS(sentencesCorePath, "HANAPATH_SENTENCES");
const wordUnits = loadBrowserJS(wordsLessonPlanPath, "HANAPATH_WORD_UNITS");
const wordLessons = loadBrowserJS(wordsLessonPlanPath, "HANAPATH_WORD_LESSONS");
const wordsNames = JSON.parse(fs.readFileSync(wordsNamesPath, "utf8"));

// 1. Build word to unit mapping
const wordToUnitId = new Map();
for (const lesson of wordLessons) {
  if (lesson.type === "content" && Array.isArray(lesson.newWordIds)) {
    for (const wordId of lesson.newWordIds) {
      wordToUnitId.set(wordId, lesson.unitId);
    }
  }
}

const wordUnitMap = new Map(wordUnits.map((u, i) => [u.id, { unit: u, index: i }]));

// 2. Map each sentence to its gating unit
const sentenceGatingUnits = new Map();
const rawReassignments = {
  "s0045": "s2-grammar-u1",
  "s2021": "s2-daily-u1",
  "s2041": "s2-actions-u1",
  "s2045": "s2-actions-u1"
};

for (const row of sentences) {
  if (rawReassignments[row.id]) {
    sentenceGatingUnits.set(row.id, rawReassignments[row.id]);
    continue;
  }
  let gatingUnitId = null;
  let maxIndex = -1;
  const focusIds = Array.isArray(row.focusWordIds) ? row.focusWordIds : [];
  for (const wordId of focusIds) {
    const unitId = wordToUnitId.get(wordId);
    if (unitId) {
      const meta = wordUnitMap.get(unitId);
      if (meta && meta.index > maxIndex) {
        maxIndex = meta.index;
        gatingUnitId = unitId;
      }
    }
  }
  // Fallback to first unit if not resolved
  if (!gatingUnitId) {
    gatingUnitId = "s1-firstwords-u1";
  }
  sentenceGatingUnits.set(row.id, gatingUnitId);
}

// Group sentence IDs by gating unit
const unitRows = new Map();
for (const unit of wordUnits) {
  unitRows.set(unit.id, []);
}
for (const row of sentences) {
  const gating = sentenceGatingUnits.get(row.id);
  if (unitRows.has(gating)) {
    unitRows.get(gating).push(row);
  }
}

// 3. Load or bootstrap names manifest
let sentencesNames = {};
if (fs.existsSync(sentencesNamesPath)) {
  sentencesNames = JSON.parse(fs.readFileSync(sentencesNamesPath, "utf8"));
} else {
  // Bootstrap names manifest
  const sections = {
    "sn1": { name: "Trainee Orientation", flavor: "First day at the company: greet, thank, apologise, survive." },
    "sn2": { name: "Practice Room Days", flavor: "Daily routine, food runs, the grind." },
    "sn3": { name: "On Schedule", flavor: "The van, the city, shops, weather — moving between schedules." },
    "sn4": { name: "Backstage Family", flavor: "Members, managers, staff; making plans, checking on people." },
    "sn5": { name: "Comeback Prep", flavor: "Tasks, requests, honorifics for seniors and staff." },
    "sn6": { name: "Promo Season", flavor: "Travel, nature, wider topics between broadcasts." },
    "sn7": { name: "Variety Night", flavor: "Reactions, contrast, nuance — surviving a variety show." },
    "sn8": { name: "Finishing the Core", flavor: "The full range; long sentences, all registers." }
  };

  const units = {};
  const lessons = {};

  const emojis = {
    "firstwords": "👋", "feelings": "💭", "actions": "🏃", "travel": "✈️",
    "study": "📚", "daily": "📅", "work": "💼", "nature": "🌿",
    "shopping": "🛒", "tech": "💻", "people": "👥", "food": "☕",
    "health": "🏥", "hobbies": "🎨", "grammar": "📖"
  };

  const usedTitles = new Set();

  // High quality trainee themed scenario title pools
  const traineeScenarios = [
    "Vocal Warmup", "Dance Practice", "Lyric Review", "Choreo Check", "Dorm Talk",
    "Snack Run", "Staff Meeting", "Mic Setup", "Outfit Fitting", "Van Ride",
    "Concept Talk", "Behind Camera", "Beat Practice", "Group Harmony", "Line Check",
    "Morning Jog", "Producer Chat", "Vocal Demo", "Stretching Out", "Feedback Time",
    "Late Night Grind", "Lunch Break", "Mirror Practice", "Album Review", "Dorm Dinner",
    "First Stage Run", "Rehearsal Walk", "Outfit Choices", "Mic Test", "Stage Rehearsal",
    "Signing Albums", "Fan Letters", "Press Briefing", "Dorm Cleanup", "Manager Chat",
    "Quiet Coffee", "Dorm Rules", "Promo Routine", "Variety Prep", "Backstage Wait",
    "Broadcast Check", "Stage Entrance", "Audition Day", "Backup Plan", "Concept Check",
    "Demo Feedback", "Studio Session", "Lyric Brainstorm", "Rhythm Drill", "Showcase Prep",
    "Wardrobe Check", "Stage Makeup", "Hair Session", "In Ear Check", "Opening Line",
    "Dance Break", "Bridge Vocal", "Mixing Session", "Art Preview", "Teaser Shoot",
    "Views Check", "Forum Letters", "Social Post", "Van Chat", "Street Promo",
    "Opening Speech", "Pose Rehearsal", "Trainee Diary", "Post Stage Chat", "Dinner Plan"
  ];

  const scenarioQualifiers = [
    "Session", "Drill", "Check", "Prep", "Run", "Warmup", "Feedback", "Focus",
    "Practice", "Review", "Break", "Routine", "Briefing", "Study", "Test", "Grit",
    "Vibe", "Flow", "Beats", "Tune", "Take", "Demo", "Cut", "Rehearsal", "Replay"
  ];

  // Map units and lessons
  for (const wUnit of wordUnits) {
    const sUnitId = wUnit.id.replace(/^s/, "sn");
    const sectionId = wUnit.sectionId.replace(/^s/, "sn");
    const wordsName = wordsNames.units[wUnit.id]?.name || wUnit.name;
    const track = wUnit.id.split("-")[1] || "grammar";
    const emoji = emojis[track] || "🎤";

    units[sUnitId] = {
      name: wordsName,
      emoji: emoji
    };

    const rows = unitRows.get(wUnit.id) || [];
    const n = rows.length;
    const k = n <= 7 ? 1 : Math.ceil(n / 7);
    const b = Math.floor(n / k);
    const r = n % k;

    const wUnitIndex = wordUnits.indexOf(wUnit);
    // Generate unique lesson titles/subtitles/goals
    for (let i = 0; i < k; i++) {
      const lessonIndex = i + 1;
      const lessonId = `${sUnitId}-l${lessonIndex}`;

      // Determine a unique trainee themed title
      let baseTitle = traineeScenarios[(wUnitIndex * 7 + i) % traineeScenarios.length];
      let title = baseTitle;
      let attempt = 0;
      while (usedTitles.has(title.toLowerCase()) || title.length > 32) {
        attempt++;
        const qual = scenarioQualifiers[(wUnitIndex * 5 + i * 2 + attempt) % scenarioQualifiers.length];
        title = `${baseTitle} ${qual}`;
        if (title.length > 32) {
          title = `${baseTitle.slice(0, 32 - qual.length - 1)} ${qual}`;
        }
      }
      usedTitles.add(title.toLowerCase());

      lessons[lessonId] = {
        title: title,
        subtitle: `Trainee life: ${wordsName.toLowerCase()}`,
        goal: `Express ${wordsName.toLowerCase()} concepts naturally in Korean.`
      };
    }
  }

  sentencesNames = {
    sections,
    units,
    lessons
  };
}

// Older bootstrapped manifests clipped a few unit names mid-word. Repair those
// deterministic carry-overs before emitting learner-facing lesson copy.
const staleCopyRepairs = new Map([
  ["morning routines to brea", "morning routines"],
  ["getting things done to p", "getting things done"],
  ["rainy-day moods freshnes", "rainy-day moods"],
  ["getting around town to g", "getting around town"],
  ["describing the room to g", "describing the room"],
  ["at the station tourist s", "at the station"],
]);
for (const meta of Object.values(sentencesNames.lessons || {})) {
  for (const field of ["title", "subtitle", "goal"]) {
    if (typeof meta[field] !== "string") continue;
    for (const [stale, replacement] of staleCopyRepairs) {
      meta[field] = meta[field].replaceAll(stale, replacement);
    }
  }
}

// 4. Generate lesson plan structures
const sentenceSections = [];
for (let i = 1; i <= 8; i++) {
  const sectId = `sn${i}`;
  const twinId = `s${i}`;
  const sectMeta = sentencesNames.sections[sectId] || {};
  sentenceSections.push({
    id: sectId,
    twinSectionId: twinId,
    name: sectMeta.name || `Section ${i}`,
    order: i
  });
}

const sentenceUnits = [];
const sentenceLessons = [];

// Determine expected lessons and assign modes
for (const wUnit of wordUnits) {
  const sUnitId = wUnit.id.replace(/^s/, "sn");
  const sSectionId = wUnit.sectionId.replace(/^s/, "sn");
  const rows = unitRows.get(wUnit.id) || [];

  // Sort rows: band ascending, id ascending
  rows.sort((a, b) => {
    if (a.band !== b.band) return a.band - b.band;
    return a.id.localeCompare(b.id);
  });

  const n = rows.length;
  const k = n <= 7 ? 1 : Math.ceil(n / 7);
  const b = Math.floor(n / k);
  const r = n % k;

  const lessonIds = [];
  const checkpointId = `${sUnitId}-cp`;

  let start = 0;
  for (let i = 0; i < k; i++) {
    const lessonIndex = i + 1;
    const lessonId = `${sUnitId}-l${lessonIndex}`;
    lessonIds.push(lessonId);

    const size = b + (i < r ? 1 : 0);
    const lessonRows = rows.slice(start, start + size);
    start += size;

    // Sort sentence IDs within the lesson in ascending order
    const sentenceIds = lessonRows.map(r => r.id).sort((a, b) => a.localeCompare(b));

    // Drill plan assignment:
    // Translate >= 50% (L - 2 rows), one build/transform (at L-2), one listen (at L-1)
    const L = lessonRows.length;
    const drillPlan = [];

    // Sort lesson rows by band ascending, id ascending for predictable layout
    const sortedLessonRows = [...lessonRows].sort((a, b) => {
      if (a.band !== b.band) return a.band - b.band;
      return a.id.localeCompare(b.id);
    });

    for (let idxInLesson = 0; idxInLesson < L; idxInLesson++) {
      const row = sortedLessonRows[idxInLesson];
      let mode = "translate";
      if (idxInLesson === L - 1) {
        mode = "listen";
      } else if (idxInLesson === L - 2) {
        if ((lessonIndex % 2 === 1) && row.band >= 3) {
          mode = "transform";
        } else {
          mode = "build";
        }
      }
      drillPlan.push({ sentenceId: row.id, mode });
    }

    // Pattern tags: up to 3 most frequent tags in the lesson
    const tagCounts = {};
    for (const row of lessonRows) {
      const tags = Array.isArray(row.patternTags) ? row.patternTags : [];
      for (const t of tags) {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      }
    }
    const patternTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 3)
      .map(entry => entry[0]);

    const lessonMeta = sentencesNames.lessons[lessonId] || {
      title: `Lesson ${lessonIndex}`,
      subtitle: `Speak naturally`,
      goal: `Learn sentences in context.`
    };

    sentenceLessons.push({
      id: lessonId,
      unitId: sUnitId,
      type: "content",
      title: lessonMeta.title,
      subtitle: lessonMeta.subtitle,
      goal: lessonMeta.goal,
      sentenceIds,
      drillPlan,
      patternTags,
      pass: { minFirstTryPct: 75 }
    });
  }

  // Create checkpoint
  const unitMeta = sentencesNames.units[sUnitId] || {
    name: wUnit.name,
    emoji: "🎤"
  };

  const allSentenceIds = rows.map(r => r.id).sort((a, b) => a.localeCompare(b));
  sentenceLessons.push({
    id: checkpointId,
    unitId: sUnitId,
    type: "checkpoint",
    title: `Stage rehearsal: ${unitMeta.name}`,
    subtitle: `Prove your ${n} lines stick`,
    goal: `Prove the whole unit sticks.`,
    sentenceIds: [],
    reviewSentenceIds: allSentenceIds,
    promptBounds: {
      min: Math.min(12, n),
      max: Math.min(18, Math.max(12, n))
    },
    pass: { minFirstTryPct: 80 }
  });

  sentenceUnits.push({
    id: sUnitId,
    sectionId: sSectionId,
    twinUnitId: wUnit.id,
    name: unitMeta.name,
    emoji: unitMeta.emoji,
    order: wUnit.order, // mirror Words unit order exactly
    lessonIds,
    checkpointId
  });
}

const legacyLessons = [
  {
    id: "s0-topic-subject",
    title: "Topic & subject",
    concept: "Topic marker 은/는 introduces the main topic, while subject marker 이/가 focuses on the specific subject.",
    patternTags: ["topic-neun", "subject-i-ga"],
    sentenceIds: ["s0001", "s0002", "s0003", "s0024", "s0026", "s0030"]
  },
  {
    id: "s1-object-verb",
    title: "Object + verb",
    concept: "Identify the object of an action using the particle 을/를.",
    patternTags: ["object-eul-reul"],
    sentenceIds: ["s0002", "s0007", "s0008", "s0033", "s0062", "s0064"]
  },
  {
    id: "s2-location-direction",
    title: "Location & direction",
    concept: "Use 에 for destination/existence, 에서 for actions at a place, and 으로 for direction.",
    patternTags: ["location-e", "location-eseo", "direction-euro"],
    sentenceIds: ["s0043", "s0045", "s0114", "s0141", "s0170", "s0553"]
  },
  {
    id: "s3-past-tense",
    title: "Past tense",
    concept: "Describe past actions using the suffix 았/었어요.",
    patternTags: ["past-polite"],
    sentenceIds: ["s0324", "s0341", "s0641", "s0645", "s0785", "s2001"]
  },
  {
    id: "s4-future-tense",
    title: "Future tense",
    concept: "Express future plans or intentions using 거예요 or ㄹ게요.",
    patternTags: ["future-geoyeyo"],
    sentenceIds: ["s0019", "s0021", "s2020", "s2023", "s2045", "s2046"]
  },
  {
    id: "s5-basic-negation",
    title: "Basic negation",
    concept: "Negate actions and states using 안 (do not), 못 (cannot), or -지 않다.",
    patternTags: ["neg-an", "neg-mot", "neg-ji-anta"],
    sentenceIds: ["s0134", "s0235", "s0280", "s0281", "s0438", "s0670"]
  },
  {
    id: "s6-because-but",
    title: "Because & but",
    concept: "Connect sentences to show cause with 아서/어서 or contrast with 지만.",
    patternTags: ["because-aseo", "but-jiman"],
    sentenceIds: ["s0660", "s0722", "s0741", "s0744", "s0767", "s0841"]
  },
  {
    id: "s7-can-want",
    title: "Can & want",
    concept: "Express ability with ㄹ 수 있다 and desire with 고 싶다.",
    patternTags: ["can-su-itda", "want-go-sipda"],
    sentenceIds: ["s0353", "s0495", "s0779", "s0831", "s0955", "s2055"]
  },
  {
    id: "s8-must-should",
    title: "Must & should",
    concept: "Express obligation or necessity using -어야 하다/되다.",
    patternTags: ["must-ya-dwaeda"],
    sentenceIds: ["s0582", "s0760", "s0871", "s0923", "s0982", "s1053"]
  },
  {
    id: "s9-honorifics-formal",
    title: "Honorifics & formal",
    concept: "Use the honorific suffix -시- or the formal ending -습니다 to show politeness.",
    patternTags: ["honorific-si", "formal-nida"],
    sentenceIds: ["s0015", "s2031", "s2032", "s2033", "s2037", "s2040"]
  },
  {
    id: "s10-time-counters",
    title: "Telling time & counters",
    concept: "Learn how to tell time and count objects using number-classifier pairs.",
    patternTags: ["time-expression", "counter-phrase"],
    sentenceIds: ["s0050", "s0098", "s0099", "s0101", "s0103", "s0348"]
  },
  {
    id: "s11-existence-copula",
    title: "Existence & copula",
    concept: "State existence with 있다/없다 or identify things with copula 이다/아니다.",
    patternTags: ["existence-itda", "copula-ieyo", "copula-negative-anieyo"],
    sentenceIds: ["s0022", "s0025", "s0028", "s0030", "s0035", "s0043"]
  }
];

// 6. Write sentences_lesson_plan_v2.js
const outputCode = `// HanaPath sentences curriculum v2. Generated deterministically.
(function () {
  "use strict";

  window.HANAPATH_SENTENCE_SECTIONS = ${JSON.stringify(sentenceSections, null, 2)};

  window.HANAPATH_SENTENCE_UNITS = ${JSON.stringify(sentenceUnits, null, 2)};

  window.HANAPATH_SENTENCE_LESSONS = ${JSON.stringify(sentenceLessons, null, 2)};

  window.HANAPATH_SENTENCE_V1_SNAPSHOT = ${JSON.stringify(legacyLessons, null, 2)};
})();
`;

fs.writeFileSync(sentencesPlanV2Path, outputCode, "utf8");
console.log("Wrote sentences_lesson_plan.js");

// Write sentences_curriculum_v2_names.json back (in case we bootstrapped it)
fs.writeFileSync(sentencesNamesPath, JSON.stringify(sentencesNames, null, 2) + "\n", "utf8");
console.log("Wrote sentences_curriculum_v2_names.json");

// Write lock file
const lockContent = {
  schemaSha256: crypto.createHash("sha256").update(outputCode).digest("hex")
};
fs.writeFileSync(lockPath, JSON.stringify(lockContent, null, 2) + "\n", "utf8");
console.log("Wrote sentences_curriculum_v2_lock.json");

// Generate v2 report markdown
const reportLines = [
  "# Sentences Curriculum v2 Report",
  "",
  `Total sentence rows: ${sentences.length}`,
  `Total units: ${sentenceUnits.length}`,
  `Total content lessons: ${sentenceLessons.filter(l => l.type === "content").length}`,
  `Total checkpoints: ${sentenceLessons.filter(l => l.type === "checkpoint").length}`,
  "",
  "## Units Breakdown",
  ""
];

for (const unit of sentenceUnits) {
  const rows = unitRows.get(unit.twinUnitId) || [];
  reportLines.push(`### Unit: ${unit.id} (${unit.name} ${unit.emoji})`);
  reportLines.push(`- Section: ${unit.sectionId}`);
  reportLines.push(`- Twin Words Unit: ${unit.twinUnitId}`);
  reportLines.push(`- Total rows: ${rows.length}`);

  const contentLessons = sentenceLessons.filter(l => l.unitId === unit.id && l.type === "content");
  reportLines.push(`- Content Lessons: ${contentLessons.length}`);
  for (const lesson of contentLessons) {
    const drillModes = lesson.drillPlan.map(dp => dp.mode).join(", ");
    reportLines.push(`  - **${lesson.id}** (${lesson.title}): ${lesson.sentenceIds.length} rows [Drills: ${drillModes}]`);
  }
  reportLines.push("");
}

fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");
console.log("Wrote sentences_curriculum_v2_report.md");
