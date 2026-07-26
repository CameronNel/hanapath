const TIME_CUE_RE = /\b(yesterday|today|tomorrow|tonight|this morning|this afternoon|this evening|last night|last week|next week|right now|soon|later|every day|each week|on (?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)|at \d{1,2}(?::\d{2})?)\b/i;
const REGISTER_CUE_RE = /\b(formal|informal|politely|respectfully|casually|to (?:a|your) (?:classmate|friend|teacher|boss|elder|judge|customer|child)|in polite formal style|in polite style)\b/i;
const TOPIC_CUE_RE = /\b(as for|regarding|speaking of|in contrast to)\b/i;
const FOCUS_CUE_RE = /\b(answer(?:ing)? (?:the question )?["“']?(?:who|what|which)|the one who|the thing that|it is .+ that)\b/i;
const LEXICAL_CUE_RE = /\b(using|use) (?:the word|the expression|the verb|the noun|the adjective)\b/i;
const COMMUNICATIVE_ACT_RE = /\b(tell|ask|request|invite|suggest|thank|apologise|apologize|warn|promise|answer|say)\b/i;

const WHOLE_TOKEN_CONTRACTIONS = [
  { from: "저는", to: "전", id: "jeoneun-jeon" },
  { from: "나는", to: "난", id: "naneun-nan" },
  { from: "이것은", to: "이건", id: "igeoseun-igeon" },
  { from: "그것은", to: "그건", id: "geugeoseun-geugeon" },
  { from: "저것은", to: "저건", id: "jeogeoseun-jeogeon" },
];

function normalizeSentenceExamAnswer(value) {
  return String(value == null ? "" : value)
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ");
}

function stripTrailingPunctuation(token) {
  return String(token || "").replace(/[.,!?;:”“"'’]+$/g, "");
}

function tokenize(value) {
  return normalizeSentenceExamAnswer(value)
    .split(" ")
    .map(stripTrailingPunctuation)
    .filter(Boolean);
}

function countWholeTokenContractions(korean) {
  const tokens = tokenize(korean);
  const families = [];
  for (const rule of WHOLE_TOKEN_CONTRACTIONS) {
    if (tokens.includes(rule.from)) families.push(rule.id);
  }
  return { count: families.length, families };
}

function hasAnyTag(row, tags) {
  const set = new Set(Array.isArray(row?.patternTags) ? row.patternTags : []);
  return tags.some((tag) => set.has(tag));
}

function detectAmbiguityFlags(row, examPromptEn, options = {}) {
  const prompt = String(examPromptEn || "").trim();
  const korean = normalizeSentenceExamAnswer(row?.korean);
  const tokens = tokenize(korean);
  const flags = [];
  const notes = [];

  const hasTopicOrSubject = hasAnyTag(row, ["topic-neun", "subject-i-ga"]);
  const tenseSensitive = hasAnyTag(row, ["past-polite", "future-geoyeyo"]);
  const registerSensitive = hasAnyTag(row, ["formal-nida", "honorific-si", "imperative-seyo"]);
  const clauseSensitive = hasAnyTag(row, ["and-go", "because-aseo", "if-myeon", "when-ttae", "but-jiman", "want-go-sipda", "propositive-eyo"]);
  const particleDense = tokens.filter((token) => /(은|는|이|가|을|를|에|에서|에게|한테|으로|로|와|과|하고|도|만)$/.test(token)).length >= 3;

  if (hasTopicOrSubject && !TOPIC_CUE_RE.test(prompt) && !FOCUS_CUE_RE.test(prompt)) {
    flags.push("topic-or-focus-not-forced");
    notes.push("The prompt does not make the intended information structure explicit.");
  }

  if (tenseSensitive && !TIME_CUE_RE.test(prompt)) {
    flags.push("time-or-tense-not-forced");
    notes.push("The prompt lacks a concrete time or aspect cue for a tense-sensitive target.");
  }

  if (registerSensitive && !REGISTER_CUE_RE.test(prompt)) {
    flags.push("register-not-forced");
    notes.push("The prompt does not identify the addressee or social setting.");
  }

  if (!COMMUNICATIVE_ACT_RE.test(prompt)) {
    flags.push("communicative-act-not-forced");
    notes.push("The prompt does not clearly state what the learner is doing with the sentence.");
  }

  if (options.requiresLexicalAnchor === true && !LEXICAL_CUE_RE.test(prompt)) {
    flags.push("lexical-choice-not-forced");
    notes.push("The row requires a lexical anchor, but the prompt does not supply one.");
  }

  if (clauseSensitive) {
    flags.push("productive-clause-family");
    notes.push("The target belongs to a clause family that commonly permits several natural renderings.");
  }

  if (particleDense) {
    flags.push("particle-or-order-family");
    notes.push("The target contains several independently movable or omissible constituents.");
  }

  const duplicateCanonicalKeys = options.duplicateCanonicalKeys instanceof Set
    ? options.duplicateCanonicalKeys
    : new Set();
  if (duplicateCanonicalKeys.has(korean)) {
    flags.push("duplicate-canonical-target");
    notes.push("Another candidate has the same normalized Korean target.");
  }

  const contraction = countWholeTokenContractions(korean);
  const plausibleVariantCount = contraction.count + flags.length;

  return {
    flags: [...new Set(flags)],
    notes,
    contractionFamilies: contraction.families,
    plausibleVariantCount,
    typedSafeHeuristic: flags.length === 0 && plausibleVariantCount <= 4,
  };
}

export {
  normalizeSentenceExamAnswer,
  tokenize,
  countWholeTokenContractions,
  detectAmbiguityFlags,
};
