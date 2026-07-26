const DIMENSIONS = Object.freeze({
  discourse: Object.freeze([
    "topic-neun", "subject-i-ga", "object-eul-reul", "location-e", "location-eseo",
    "direction-euro", "possessive-ui", "with-hago-wa", "only-man", "also-do",
    "from-buteo", "until-kkaji", "comparison-boda",
  ]),
  time: Object.freeze(["present-polite", "past-polite", "future-geoyeyo", "time-expression"]),
  act: Object.freeze([
    "question-polite", "imperative-seyo", "propositive-eyo", "copula-ieyo",
    "copula-negative-anieyo", "formal-nida",
  ]),
  polarity: Object.freeze(["neg-an", "neg-mot", "neg-ji-anta"]),
  clause: Object.freeze(["and-go", "but-jiman", "because-aseo", "if-myeon", "when-ttae"]),
  modality: Object.freeze(["want-go-sipda", "can-su-itda", "must-ya-dwaeda", "honorific-si", "existence-itda"]),
  quantity: Object.freeze(["counter-phrase"]),
});

const TAG_EXPLANATIONS = Object.freeze({
  "topic-neun": "sets something up as the topic or contrast",
  "subject-i-ga": "presents the subject or the information in focus",
  "object-eul-reul": "marks what the action affects",
  "location-e": "marks a destination, time, or static location",
  "location-eseo": "marks the place where an action happens",
  "direction-euro": "marks direction, route, or means",
  "possessive-ui": "connects an owner with what is owned",
  "with-hago-wa": "links a companion or another item",
  "only-man": "limits the meaning to only one item",
  "also-do": "adds the meaning also or too",
  "from-buteo": "marks the starting point",
  "until-kkaji": "marks the endpoint",
  "present-polite": "uses an everyday polite present-style ending",
  "past-polite": "places the event in the past",
  "future-geoyeyo": "presents a future plan or prediction",
  "formal-nida": "uses formal polite speech",
  "copula-ieyo": "identifies or describes something with the polite copula",
  "copula-negative-anieyo": "says that something is not the named thing",
  "question-polite": "asks a polite question",
  "imperative-seyo": "makes a polite request or instruction",
  "propositive-eyo": "makes a polite suggestion to do something together",
  "neg-an": "uses short negation with an",
  "neg-mot": "expresses inability with mot",
  "neg-ji-anta": "uses the longer ji anta negation",
  "and-go": "connects actions or descriptions with and",
  "but-jiman": "connects a contrast with but",
  "because-aseo": "gives a reason or sequence",
  "if-myeon": "sets an if or when condition",
  "when-ttae": "marks the time when something happens",
  "want-go-sipda": "expresses wanting to do something",
  "can-su-itda": "expresses ability or possibility",
  "must-ya-dwaeda": "expresses obligation",
  "honorific-si": "shows respect toward the subject",
  "counter-phrase": "uses a number with the appropriate counter",
  "time-expression": "anchors the sentence with an explicit time expression",
  "comparison-boda": "compares one thing with another",
  "existence-itda": "expresses existence, possession, or absence",
});

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function words(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9'\s-]/g, " ")
    .split(/\s+/)
    .filter((item) => item.length > 2 && !["the", "and", "that", "this", "with", "from", "your", "you", "are", "was", "were", "have", "has", "for"].includes(item));
}

function overlapScore(left, right) {
  const a = new Set(words(left));
  const b = new Set(words(right));
  let score = 0;
  for (const item of a) if (b.has(item)) score += 1;
  return score;
}

function tagsForDimension(tags, dimension) {
  const available = new Set(tags || []);
  return DIMENSIONS[dimension].filter((tag) => available.has(tag));
}

function differenceProfile(targetTags, contrastTags) {
  const profile = [];
  for (const dimension of Object.keys(DIMENSIONS)) {
    const target = tagsForDimension(targetTags, dimension);
    const contrast = tagsForDimension(contrastTags, dimension);
    if (target.join("|") !== contrast.join("|")) profile.push({ dimension, target, contrast });
  }
  return profile;
}

function compareContrastCandidates(target, left, right) {
  const score = (candidate) => {
    const targetTags = new Set(target.patternTags || []);
    const candidateTags = new Set(candidate.patternTags || []);
    let shared = 0;
    for (const tag of targetTags) if (candidateTags.has(tag)) shared += 1;
    const profile = differenceProfile(target.patternTags, candidate.patternTags);
    const meaningfulDimensions = profile.filter((item) => item.target.length || item.contrast.length).length;
    let value = shared * 18;
    if (meaningfulDimensions === 1) value += 30;
    else if (meaningfulDimensions === 2) value += 18;
    else if (meaningfulDimensions > 4) value -= (meaningfulDimensions - 4) * 5;
    value += overlapScore(target.english, candidate.english) * 25;
    const lengthGap = Math.abs(String(target.korean || "").length - String(candidate.korean || "").length);
    value -= Math.min(lengthGap, 20) / 4;
    if (String(target.english || "").trim() === String(candidate.english || "").trim()) value -= 100;
    if (String(target.korean || "").trim() === String(candidate.korean || "").trim()) value -= 1000;
    return value;
  };
  return score(right) - score(left) || String(left.id).localeCompare(String(right.id), "en");
}

function selectContrastRow(target, lessonRows) {
  const options = (lessonRows || []).filter((row) => row && row.id !== target.id && row.korean !== target.korean);
  if (!options.length) throw new Error(`No contrast row available for ${target.id}`);
  return options.sort((a, b) => compareContrastCandidates(target, a, b))[0];
}

function communicativeAct(tags) {
  const set = new Set(tags || []);
  if (set.has("question-polite")) return "ask a polite question";
  if (set.has("imperative-seyo")) return "make a polite request or instruction";
  if (set.has("propositive-eyo")) return "make a polite suggestion";
  if (set.has("copula-negative-anieyo")) return "politely correct an identification";
  return "make one complete statement";
}

function registerCue(tags) {
  return (tags || []).includes("formal-nida") ? "using formal polite speech" : "using everyday polite speech";
}

function timeCue(tags) {
  const set = new Set(tags || []);
  if (set.has("past-polite")) return "keep the event in the past";
  if (set.has("future-geoyeyo")) return "keep the future plan or prediction";
  if (set.has("time-expression")) return "keep the stated time anchor";
  return "keep the lesson's present or general-time meaning";
}

function discourseCue(tags) {
  const set = new Set(tags || []);
  if (set.has("topic-neun")) return "keep the lesson's topic or contrast framing";
  if (set.has("subject-i-ga")) return "keep the subject or focus framing";
  if (set.has("object-eul-reul")) return "keep the affected object explicit";
  if (set.has("location-eseo")) return "keep the action location explicit";
  if (set.has("location-e")) return "keep the destination, time, or static location explicit";
  return "keep the same information focus as the target line";
}

function cueSummary(tags) {
  return `${registerCue(tags)}; ${timeCue(tags)}; ${discourseCue(tags)}.`;
}

function explainTagSet(tags) {
  const descriptions = unique((tags || []).map((tag) => TAG_EXPLANATIONS[tag])).slice(0, 3);
  return descriptions.length ? descriptions.join(", ") : "serves a different communicative purpose";
}

function buildContrastExplanation(target, contrast) {
  const profile = differenceProfile(target.patternTags, contrast.patternTags);
  const priority = ["act", "time", "discourse", "polarity", "modality", "clause", "quantity"];
  const main = priority.map((dimension) => profile.find((item) => item.dimension === dimension)).find(Boolean);
  if (main && (main.target.length || main.contrast.length)) {
    const targetDescription = explainTagSet(main.target);
    const contrastDescription = explainTagSet(main.contrast);
    return `The target ${targetDescription}. The contrast ${contrastDescription}. Both are natural, but they answer different cues.`;
  }
  return `Both sentences are natural in this lesson, but the target means “${target.english}” while the contrast means “${contrast.english}”. Use each only for its own communicative goal.`;
}

function displayLessonTitle(value) {
  return String(value || "Sentence lesson")
    .replace(/^S\d+\s*·\s*/, "")
    .replace(/\s*·\s*\d+$/, "")
    .trim();
}

function withoutTerminalPunctuation(value) {
  return String(value || "").trim().replace(/[.!?]+$/, "");
}

function generatedPrompt(candidate, lessonTitle) {
  return `In the “${displayLessonTitle(lessonTitle)}” situation, ${registerCue(candidate.patternTags)}, ${communicativeAct(candidate.patternTags)} that means exactly: “${candidate.english}” Keep the intended time meaning and information focus: ${timeCue(candidate.patternTags)}; ${discourseCue(candidate.patternTags)}. Use the vocabulary taught in the target line.`;
}

function normalizeExistingDrillPlan(lesson) {
  return new Map((Array.isArray(lesson.drillPlan) ? lesson.drillPlan : [])
    .filter((entry) => entry && typeof entry.sentenceId === "string")
    .map((entry) => [entry.sentenceId, { ...entry }]));
}

function buildLessonContrastEntry({ candidate, target, contrast, lesson, sectionOrder }) {
  const promptEn = String(candidate.existingExamPromptEn || "").trim() || generatedPrompt(candidate, lesson.title || lesson.id);
  const explanation = buildContrastExplanation(target, contrast);
  const originalIds = unique(lesson.sentenceIds || []);
  const freePracticeIds = originalIds.filter((id) => id !== target.id && id !== contrast.id);
  const existingPlan = normalizeExistingDrillPlan(lesson);
  const reorderedIds = [target.id, contrast.id, ...freePracticeIds];
  const drillPlan = reorderedIds.map((sentenceId) => {
    if (sentenceId === target.id) {
      return {
        sentenceId,
        mode: "translate",
        teachingPhase: "controlled-production",
        cueLabel: "Controlled target",
        promptEn,
      };
    }
    if (sentenceId === contrast.id) {
      const tokenCount = String(contrast.korean || "").trim().split(/\s+/).filter(Boolean).length;
      return {
        sentenceId,
        mode: tokenCount >= 3 ? "build" : "listen",
        teachingPhase: "contrast-closure",
        cueLabel: "Nearby valid contrast",
      };
    }
    return {
      ...(existingPlan.get(sentenceId) || { sentenceId, mode: "translate" }),
      teachingPhase: "free-practice",
      cueLabel: "Free practice",
    };
  });

  return {
    schemaVersion: 1,
    targetSentenceId: target.id,
    contrastSentenceId: contrast.id,
    lessonId: lesson.id,
    sectionOrder,
    examReadiness: "typed-candidate",
    bankApproved: false,
    sourceCandidateClass: candidate.existingTypedClass || "unreviewed",
    promptReviewRequired: !candidate.existingExamPromptEn,
    meaningInContext: {
      heading: "Meaning in context",
      context: `Use this line in the “${displayLessonTitle(lesson.title || lesson.id)}” situation.`,
      communicativeGoal: `Express exactly: “${target.english}”`,
      cueSummary: cueSummary(target.patternTags),
    },
    contrastClosure: {
      heading: "Nearby valid contrast",
      targetKorean: target.korean,
      targetMeaning: target.english,
      contrastKorean: contrast.korean,
      contrastMeaning: contrast.english,
      explanation,
    },
    controlledProduction: {
      heading: "Controlled production",
      promptEn,
      requiredCues: {
        communicativeAct: communicativeAct(target.patternTags),
        register: registerCue(target.patternTags),
        time: timeCue(target.patternTags),
        discourseRole: discourseCue(target.patternTags),
        lexicalAnchor: "Use the vocabulary taught in the target line.",
        context: displayLessonTitle(lesson.title || lesson.id),
      },
      canonicalLessonAnswer: target.korean,
      automaticAlternatives: [],
    },
    variationAwareness: {
      heading: "Variation awareness",
      note: `${contrast.korean} is also natural Korean, but here it means “${withoutTerminalPunctuation(contrast.english)}”. It is not a substitute for the controlled target. ${explanation}`,
    },
    freePractice: {
      heading: "Free practice",
      sentenceIds: freePracticeIds,
      note: "Use the remaining lesson lines for broader supported practice. Their success does not make them exact-answer exam items.",
    },
    studyNotes: {
      [target.id]: {
        phase: "Meaning in context",
        note: `Target meaning: “${target.english}” ${cueSummary(target.patternTags)}`,
      },
      [contrast.id]: {
        phase: "Nearby valid contrast",
        note: `${explanation} Contrast meaning: “${contrast.english}”`,
      },
    },
    lessonMutation: {
      goal: "Choose the intended meaning, compare it with a nearby natural sentence, then produce the target from precise cues.",
      subtitle: `${reorderedIds.length} sentences · context, contrast, build, type`,
      concept: `Target: “${target.english}” Contrast: “${contrast.english}” ${explanation}`,
      sentenceIds: reorderedIds,
      drillPlan,
    },
  };
}

function applyLessonContrastEntry(lesson, entry) {
  if (!lesson || lesson.id !== entry.lessonId) throw new Error(`Lesson mismatch for ${entry.lessonId}`);
  const mutation = entry.lessonMutation;
  lesson.goal = mutation.goal;
  lesson.subtitle = mutation.subtitle;
  lesson.concept = mutation.concept;
  lesson.sentenceIds = [...mutation.sentenceIds];
  lesson.drillPlan = mutation.drillPlan.map((item) => ({ ...item }));
  lesson.contrastTeaching = entry;
  return lesson;
}

export {
  DIMENSIONS,
  TAG_EXPLANATIONS,
  applyLessonContrastEntry,
  buildContrastExplanation,
  buildLessonContrastEntry,
  communicativeAct,
  cueSummary,
  differenceProfile,
  displayLessonTitle,
  discourseCue,
  generatedPrompt,
  registerCue,
  selectContrastRow,
  timeCue,
};
