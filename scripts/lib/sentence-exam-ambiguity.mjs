const TIME_CUE_RE = /\b(yesterday|today|tomorrow|tonight|this morning|this afternoon|this evening|last night|last week|next week|right now|soon|later|every day|each week|on (?:monday|tuesday|wednesday|thursday|friday|saturday|sunday)|at \d{1,2}(?::\d{2})?|(?:keep|preserve) the (?:supplied )?tense)\b/i;
const REGISTER_CUE_RE = /\b(formal|informal|politely|respectfully|casually|to (?:a|your) (?:classmate|friend|teacher|boss|elder|judge|customer|child)|in polite formal style|in polite style|(?:keep|preserve) the (?:supplied )?(?:speech level|register))\b/i;
const TOPIC_CUE_RE = /\b(as for|regarding|speaking of|in contrast to|(?:keep|preserve) the (?:supplied )?(?:information structure|topic\/subject marking))\b/i;
const FOCUS_CUE_RE = /\b(answer(?:ing)? (?:the question )?["“']?(?:who|what|which)|the one who|the thing that|it is .+ that)\b/i;
const LEXICAL_CUE_RE = /\b((?:using|use) (?:the word|the expression|the verb|the noun|the adjective)|(?:keep|preserve) the supplied Korean (?:wording|lexical material))\b/i;
const COMMUNICATIVE_ACT_RE = /\b(tell|ask|request|invite|suggest|thank|apologise|apologize|warn|promise|answer|say|combine|join|recast|transform|change)\b/i;

const CONTROLLED_CLAUSE_PATTERN_TAGS = Object.freeze([
  "and-go",
  "because-aseo",
  "if-myeon",
  "when-ttae",
  "but-jiman",
  "want-go-sipda",
  "propositive-eyo",
]);

const CONTROLLED_CLAUSE_OPERATION_BY_TAG = Object.freeze({
  "and-go": "combine-clauses",
  "because-aseo": "combine-clauses",
  "if-myeon": "combine-clauses",
  "when-ttae": "combine-clauses",
  "but-jiman": "combine-clauses",
  "want-go-sipda": "recast-predicate",
  "propositive-eyo": "change-speech-act-ending",
});


const CONTROLLED_CLAUSE_CUE_RE_BY_TAG = Object.freeze({
  "and-go": /^-?고$/u,
  "because-aseo": /^-?(?:아\/어서|아서|어서|해서|여서|라서|이라서|돼서)$/u,
  "if-myeon": /^-?(?:\(으\)면|으면|면)$/u,
  "when-ttae": /^-?(?:\(으\)ㄹ 때|을 때|ㄹ 때|때)$/u,
  "but-jiman": /^-?지만$/u,
  "want-go-sipda": /^-?고 싶(?:다|어요|습니다)?$/u,
  "propositive-eyo": /^-?(?:\(으\)ㅂ시다|읍시다|ㅂ시다|아\/어요|아요|어요)$/u,
});

const CONTROLLED_CLAUSE_TARGET_ENDING_RE_BY_TAG = Object.freeze({
  "and-go": /고$/u,
  "because-aseo": /서$/u,
  "if-myeon": /면$/u,
  "when-ttae": /때(?:는)?$/u,
  "but-jiman": /지만$/u,
  "want-go-sipda": /고 싶(?:어요|습니다|다)$/u,
  "propositive-eyo": /(?:ㅂ시다|읍시다|아요|어요|여요|봐요)$/u,
});

const CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION = "Preserve the supplied Korean wording, particles, and order except for the required grammar change.";
const CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION = "Keep the tense shown in the Korean source fragments. Preserve the speech level shown in the Korean source fragments. Preserve the information structure shown in the Korean source fragments.";

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

function stripTerminalSentencePunctuation(value) {
  return normalizeSentenceExamAnswer(value).replace(/[.!?。！？]+$/u, "");
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

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function containsHangul(value) {
  return /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7a3]/u.test(String(value || ""));
}

function validateControlledClauseContract(row, examPromptEn, contract) {
  const errors = [];
  const prompt = normalizeSentenceExamAnswer(examPromptEn);
  const rowTags = new Set(Array.isArray(row?.patternTags) ? row.patternTags : []);

  if (!isRecord(contract)) {
    return { valid: false, errors: ["controlledClause contract is missing or malformed."] };
  }
  if (contract.schemaVersion !== 1) errors.push(`controlledClause.schemaVersion must be 1, got ${contract.schemaVersion}.`);

  const clauseTagsOnRow = CONTROLLED_CLAUSE_PATTERN_TAGS.filter((candidate) => rowTags.has(candidate));
  if (clauseTagsOnRow.length === 0) {
    errors.push("The source row carries no approved controlled-clause tag.");
  }

  const tag = String(contract.requiredPatternTag || "").trim();
  if (!CONTROLLED_CLAUSE_PATTERN_TAGS.includes(tag)) {
    errors.push(`controlledClause.requiredPatternTag '${tag}' is not an approved controlled-clause tag.`);
  } else if (!rowTags.has(tag)) {
    errors.push(`controlledClause.requiredPatternTag '${tag}' is not carried by the source row.`);
  }

  const expectedOperation = CONTROLLED_CLAUSE_OPERATION_BY_TAG[tag];
  if (contract.operation !== expectedOperation) {
    errors.push(`controlledClause.operation must be '${expectedOperation || "unavailable"}' for '${tag}', got '${contract.operation}'.`);
  }

  const fragments = Array.isArray(contract.sourceFragments) ? contract.sourceFragments : [];
  const requiredFragmentCount = expectedOperation === "combine-clauses" ? 2 : 1;
  if (fragments.length !== requiredFragmentCount) {
    errors.push(`controlledClause.sourceFragments must contain exactly ${requiredFragmentCount} Korean fragment(s) for '${expectedOperation || tag}'.`);
  }

  const normalizedFragments = [];
  for (let index = 0; index < fragments.length; index += 1) {
    const fragment = normalizeSentenceExamAnswer(fragments[index]);
    normalizedFragments.push(fragment);
    if (!fragment) errors.push(`controlledClause.sourceFragments[${index}] is empty.`);
    else if (!containsHangul(fragment)) errors.push(`controlledClause.sourceFragments[${index}] contains no Hangul.`);
    else if (!prompt.includes(fragment)) errors.push(`The learner prompt does not expose controlledClause.sourceFragments[${index}] verbatim.`);
  }
  if (new Set(normalizedFragments.filter(Boolean)).size !== normalizedFragments.filter(Boolean).length) {
    errors.push("controlledClause.sourceFragments must be distinct.");
  }

  const fragmentIndices = normalizedFragments.map((fragment) => fragment ? prompt.indexOf(fragment) : -1);
  for (let index = 1; index < fragmentIndices.length; index += 1) {
    if (fragmentIndices[index - 1] >= 0 && fragmentIndices[index] >= 0
        && fragmentIndices[index] <= fragmentIndices[index - 1]) {
      errors.push("The learner prompt does not present source fragments in the contracted order.");
      break;
    }
  }

  const canonicalTarget = normalizeSentenceExamAnswer(row?.korean);
  const canonicalLeakKey = stripTerminalSentencePunctuation(canonicalTarget);
  const promptLeakText = stripTerminalSentencePunctuation(prompt);
  if (canonicalLeakKey && promptLeakText.includes(canonicalLeakKey)) {
    errors.push("The learner prompt leaks the complete canonical answer.");
  }
  for (let index = 0; index < normalizedFragments.length; index += 1) {
    if (canonicalLeakKey && stripTerminalSentencePunctuation(normalizedFragments[index]) === canonicalLeakKey) {
      errors.push(`controlledClause.sourceFragments[${index}] must be a pre-transformation source, not the canonical answer.`);
    }
  }

  const constructionCue = normalizeSentenceExamAnswer(contract.requiredConstructionCue);
  if (!constructionCue) errors.push("controlledClause.requiredConstructionCue is missing.");
  else if (!containsHangul(constructionCue)) errors.push("controlledClause.requiredConstructionCue must contain the Korean construction surface.");
  else if (!prompt.includes(constructionCue)) errors.push("The learner prompt does not expose controlledClause.requiredConstructionCue verbatim.");
  const cuePattern = CONTROLLED_CLAUSE_CUE_RE_BY_TAG[tag];
  if (constructionCue && cuePattern && !cuePattern.test(constructionCue)) {
    errors.push(`controlledClause.requiredConstructionCue '${constructionCue}' does not match '${tag}'.`);
  }

  const sourceEnding = stripTerminalSentencePunctuation(contract.sourceEnding);
  const targetEnding = stripTerminalSentencePunctuation(contract.targetEnding);
  if (!sourceEnding || !containsHangul(sourceEnding)) errors.push("controlledClause.sourceEnding must contain the exact Korean source ending.");
  if (!targetEnding || !containsHangul(targetEnding)) errors.push("controlledClause.targetEnding must contain the exact Korean target ending.");
  if (sourceEnding && targetEnding && sourceEnding === targetEnding) errors.push("controlledClause.sourceEnding and targetEnding must differ.");
  const endingPattern = CONTROLLED_CLAUSE_TARGET_ENDING_RE_BY_TAG[tag];
  if (targetEnding && endingPattern && !endingPattern.test(targetEnding)) {
    errors.push(`controlledClause.targetEnding '${targetEnding}' does not realise '${tag}'.`);
  }

  const transformationSourceIndex = 0;
  const transformationSource = stripTerminalSentencePunctuation(normalizedFragments[transformationSourceIndex] || "");
  let transformedSource = "";
  if (sourceEnding && transformationSource && !transformationSource.endsWith(sourceEnding)) {
    errors.push("controlledClause.sourceEnding is not the exact suffix of the transformed source fragment.");
  } else if (sourceEnding && targetEnding && transformationSource) {
    transformedSource = `${transformationSource.slice(0, -sourceEnding.length)}${targetEnding}`;
  }
  const unchangedFragments = normalizedFragments.slice(1).map(stripTerminalSentencePunctuation);
  const reconstructedTarget = [transformedSource, ...unchangedFragments].filter(Boolean).join(" ");
  if (reconstructedTarget && canonicalLeakKey && reconstructedTarget !== canonicalLeakKey) {
    errors.push("The declared one-step transformation does not reconstruct the canonical Korean target exactly.");
  }

  if (contract.preserveSourceOrder !== true) errors.push("controlledClause.preserveSourceOrder must be true.");
  if (contract.preserveLexicalMaterial !== true) errors.push("controlledClause.preserveLexicalMaterial must be true.");
  if (contract.preserveParticles !== true) errors.push("controlledClause.preserveParticles must be true.");
  if (contract.acceptedAnswerPolicy !== "reviewed-finite-only") {
    errors.push("controlledClause.acceptedAnswerPolicy must be 'reviewed-finite-only'.");
  }

  if (!prompt.includes(CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION)) {
    errors.push("The learner prompt is missing the locked controlled-clause preservation instruction.");
  }
  if (!prompt.includes(CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION)) {
    errors.push("The learner prompt is missing the locked controlled-clause grammar instruction.");
  }

  return {
    valid: errors.length === 0,
    errors,
    requiredPatternTag: tag || null,
    expectedOperation: expectedOperation || null,
    reconstructedTarget: reconstructedTarget || null,
  };
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
  const clauseSensitive = hasAnyTag(row, CONTROLLED_CLAUSE_PATTERN_TAGS);
  const particleDense = tokens.filter((token) => /(은|는|이|가|을|를|에|에서|에게|한테|으로|로|와|과|하고|도|만)$/.test(token)).length >= 3;
  const controlledClause = options.controlledClauseContract == null
    ? { valid: false, errors: [] }
    : validateControlledClauseContract(row, prompt, options.controlledClauseContract);

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

  if (clauseSensitive && !controlledClause.valid) {
    flags.push("productive-clause-family");
    notes.push("The target belongs to a productive clause family and lacks a valid controlled-clause transformation contract.");
  }

  if (particleDense && !controlledClause.valid) {
    flags.push("particle-or-order-family");
    notes.push("The target contains several independently movable or omissible constituents without a valid preservation contract.");
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
    controlledClauseContractValid: controlledClause.valid,
    controlledClauseContractErrors: [...controlledClause.errors],
  };
}

export {
  CONTROLLED_CLAUSE_PATTERN_TAGS,
  CONTROLLED_CLAUSE_OPERATION_BY_TAG,
  CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION,
  CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION,
  normalizeSentenceExamAnswer,
  tokenize,
  countWholeTokenContractions,
  validateControlledClauseContract,
  detectAmbiguityFlags,
};
