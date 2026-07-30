import {
  CONTROLLED_CLAUSE_PATTERN_TAGS,
  CONTROLLED_CLAUSE_OPERATION_BY_TAG,
  CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION,
  CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION,
  controlledClauseReplacementInstruction,
  normalizeSentenceExamAnswer,
  tokenize,
  countWholeTokenContractions,
  validateControlledClauseContract as validateBaseControlledClauseContract,
  detectAmbiguityFlags as detectBaseAmbiguityFlags,
} from "./sentence-exam-ambiguity.mjs";

const OPERATION_PROMPT_RE = Object.freeze({
  "combine-clauses": /\b(?:combine|join|connect)\b[^.]{0,100}\b(?:clause|clauses|fragment|fragments|sentence)\b/i,
  "recast-predicate": /\b(?:transform|recast|change)\b[^.]{0,100}\b(?:predicate|sentence|construction)\b|\bexpress\b[^.]{0,60}\bwant\b/i,
  "change-speech-act-ending": /\b(?:transform|change)\b[^.]{0,100}\b(?:ending|speech act|sentence|construction)\b|\b(?:suggest|invite|let['’]?s)\b/i,
});

const PARTICLE_SUFFIXES = Object.freeze([
  "에서", "에게", "한테", "으로", "하고", "은", "는", "이", "가", "을", "를", "에", "로", "와", "과", "도", "만",
]);
const STANDALONE_GRAMMAR_TOKENS = new Set([
  "고", "서", "면", "지만", "때", "을", "ㄹ", "아", "어", "아서", "어서", "해서", "여서", "라서", "이라서", "돼서",
]);

function stripTerminalPunctuation(value) {
  return normalizeSentenceExamAnswer(value).replace(/[.!?。！？]+$/u, "");
}

function particleBearingLexicalToken(token) {
  const clean = stripTerminalPunctuation(token);
  if (!clean || STANDALONE_GRAMMAR_TOKENS.has(clean)) return false;
  return PARTICLE_SUFFIXES.some((suffix) => clean.endsWith(suffix) && clean.length > suffix.length);
}

function strictContractErrors(examPromptEn, contract) {
  const errors = [];
  if (!contract || typeof contract !== "object" || Array.isArray(contract)) return errors;

  const prompt = normalizeSentenceExamAnswer(examPromptEn);
  const operation = String(contract.operation || "").trim();
  const operationCue = OPERATION_PROMPT_RE[operation];
  if (operationCue && !operationCue.test(prompt)) {
    errors.push(`The learner prompt must state the '${operation}' operation explicitly, not only expose replacement metadata.`);
  }

  const sourceEndingTokens = tokenize(stripTerminalPunctuation(contract.sourceEnding));
  const targetEndingTokens = tokenize(stripTerminalPunctuation(contract.targetEnding));

  // A source ending is the replaceable suffix of one predicate. Allowing two
  // eojeol lets a noun+particle or another lexical constituent be swallowed
  // while the contract still claims to preserve lexical material.
  if (sourceEndingTokens.length > 1) {
    errors.push("controlledClause.sourceEnding must be one Korean eojeol; lexical material may not be bundled into the replaceable suffix.");
  }

  for (const token of [...sourceEndingTokens, ...targetEndingTokens]) {
    if (particleBearingLexicalToken(token)) {
      errors.push(`controlledClause ending token '${token}' contains lexical material plus a particle; endings may not absorb noun/particle constituents.`);
    }
  }

  return errors;
}

function validateControlledClauseContract(row, examPromptEn, contract) {
  const base = validateBaseControlledClauseContract(row, examPromptEn, contract);
  const errors = [...base.errors, ...strictContractErrors(examPromptEn, contract)];
  return {
    ...base,
    valid: errors.length === 0,
    errors: [...new Set(errors)],
  };
}

function detectAmbiguityFlags(row, examPromptEn, options = {}) {
  const base = detectBaseAmbiguityFlags(row, examPromptEn, options);
  if (options.controlledClauseContract == null) return base;

  const strict = validateControlledClauseContract(row, examPromptEn, options.controlledClauseContract);
  if (strict.valid) {
    return {
      ...base,
      controlledClauseContractValid: true,
      controlledClauseContractErrors: [],
    };
  }

  const flags = new Set(base.flags || []);
  const tags = new Set(Array.isArray(row?.patternTags) ? row.patternTags : []);
  if (CONTROLLED_CLAUSE_PATTERN_TAGS.some((tag) => tags.has(tag))) flags.add("productive-clause-family");
  flags.add("particle-or-order-family");
  return {
    ...base,
    flags: [...flags],
    notes: [...(base.notes || []), ...strict.errors],
    plausibleVariantCount: countWholeTokenContractions(row?.korean).count + flags.size,
    typedSafeHeuristic: false,
    controlledClauseContractValid: false,
    controlledClauseContractErrors: strict.errors,
  };
}

export {
  CONTROLLED_CLAUSE_PATTERN_TAGS,
  CONTROLLED_CLAUSE_OPERATION_BY_TAG,
  CONTROLLED_CLAUSE_PRESERVATION_INSTRUCTION,
  CONTROLLED_CLAUSE_GRAMMAR_INSTRUCTION,
  controlledClauseReplacementInstruction,
  normalizeSentenceExamAnswer,
  tokenize,
  countWholeTokenContractions,
  validateControlledClauseContract,
  detectAmbiguityFlags,
};
