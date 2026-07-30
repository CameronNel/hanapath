// Runtime fairness guard for Sentence Mastery attempts and lesson feedback.
(function () {
  "use strict";

  const SYNONYMS = Object.freeze({
    learn: "study", learns: "study", learned: "study", learnt: "study", learning: "study", studies: "study", studied: "study", studying: "study",
    purchase: "buy", purchases: "buy", purchased: "buy", purchasing: "buy", bought: "buy",
    film: "movie", films: "movie", movies: "movie",
    begin: "start", begins: "start", began: "start", begun: "start", beginning: "start", started: "start", starting: "start",
    finish: "end", finishes: "end", finished: "end", finishing: "end", ended: "end", ending: "end",
    child: "kid", children: "kid", kids: "kid",
    automobile: "car", automobiles: "car", cars: "car",
    residence: "home", house: "home", houses: "home",
    speak: "say", speaks: "say", spoke: "say", spoken: "say", speaking: "say", says: "say", said: "say", talking: "say", talked: "say", talk: "say",
    listens: "listen", listened: "listen", listening: "listen", hears: "listen", heard: "listen", hearing: "listen",
  });
  const STOP_WORDS = new Set(["a", "an", "the", "i", "me", "my", "we", "us", "our", "you", "your", "he", "him", "his", "she", "her", "it", "its", "they", "them", "their", "am", "is", "are", "was", "were", "be", "been", "being", "do", "does", "did"]);
  const NEGATION_WORDS = new Set(["not", "no", "never", "cannot", "can't", "dont", "don't", "doesnt", "doesn't", "didnt", "didn't"]);
  const OPERATION_PROMPT_RE = Object.freeze({
    "combine-clauses": /\b(?:combine|join|connect)\b[^.]{0,100}\b(?:clause|clauses|fragment|fragments|sentence)\b/i,
    "recast-predicate": /\b(?:transform|recast|change)\b[^.]{0,100}\b(?:predicate|sentence|construction)\b|\bexpress\b[^.]{0,60}\bwant\b/i,
    "change-speech-act-ending": /\b(?:transform|change)\b[^.]{0,100}\b(?:ending|speech act|sentence|construction)\b|\b(?:suggest|invite|let['’]?s)\b/i,
  });

  function englishTokens(value) {
    return String(value || "")
      .normalize("NFKC")
      .toLocaleLowerCase("en")
      .replace(/[’]/g, "'")
      .replace(/[^a-z0-9'\s-]/g, " ")
      .split(/[\s-]+/)
      .filter(Boolean);
  }

  function semanticKey(value) {
    const raw = englishTokens(value);
    const negated = raw.some((token) => NEGATION_WORDS.has(token));
    const content = raw
      .filter((token) => !STOP_WORDS.has(token) && !NEGATION_WORDS.has(token))
      .map((token) => SYNONYMS[token] || token.replace(/(?:ing|ed|es|s)$/i, ""))
      .filter(Boolean)
      .sort();
    return `${negated ? "neg" : "pos"}|${content.join("|")}`;
  }

  function deterministicRank(seed, value) {
    let hash = 2166136261;
    const text = `${seed}|${value}`;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function recognitionPoolFor(item) {
    const bank = window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
    if (!bank || !Array.isArray(bank.entries)) return [];
    return bank.entries
      .filter((entry) => entry.mode === "recognition" && entry.id !== item.sourceEntryId)
      .map((entry) => ({
        id: entry.id,
        target: String(entry.canonicalAnswer || ""),
        text: String(entry.recognitionAnswerEn || "").trim(),
      }))
      .filter((entry) => entry.text)
      .sort((a, b) => deterministicRank(item.itemId, a.id) - deterministicRank(item.itemId, b.id) || a.id.localeCompare(b.id));
  }

  function repairRecognitionOptions(item) {
    if (item.mode !== "recognition") return item;
    const answer = String(item.answerContract?.recognitionAnswerEn || "").trim();
    if (!answer) throw new Error(`${item.itemId}: recognition answer is missing.`);
    const answerSemantic = semanticKey(answer);
    const answerTarget = String(item.canonicalAnswer || item.canonicalTargetKey || "");
    const kept = [];
    const exactSeen = new Set();
    const semanticSeen = new Set();

    function accept(text, target = "") {
      const clean = String(text || "").trim();
      const exact = clean.toLocaleLowerCase("en");
      const semantic = semanticKey(clean);
      if (!clean || exactSeen.has(exact) || semanticSeen.has(semantic)) return false;
      if (clean !== answer && (semantic === answerSemantic || target === answerTarget)) return false;
      kept.push(clean);
      exactSeen.add(exact);
      semanticSeen.add(semantic);
      return true;
    }

    for (const option of item.options || []) accept(option);
    if (!exactSeen.has(answer.toLocaleLowerCase("en"))) accept(answer, answerTarget);
    for (const candidate of recognitionPoolFor(item)) {
      if (kept.length >= 4) break;
      accept(candidate.text, candidate.target);
    }
    if (kept.length !== 4) {
      throw new Error(`${item.itemId}: cannot form four semantically distinct recognition options.`);
    }

    // Preserve the original answer position when possible, so the repair does
    // not introduce a deterministic correct-option slot.
    const originalAnswerIndex = Math.max(0, (item.options || []).indexOf(answer));
    const distractors = kept.filter((option) => option !== answer).slice(0, 3);
    const options = distractors.slice();
    options.splice(Math.min(originalAnswerIndex, options.length), 0, answer);
    item.options = options;
    return item;
  }

  function addReviewedAlternative(item) {
    if (item.mode !== "typed" || item.sourceEntryId !== "s0007") return item;
    const alternative = "음악 들어요.";
    const manual = new Set([...(item.manualAlternatives || []), alternative]);
    item.manualAlternatives = [...manual];
    if (item.answerContract) item.answerContract.manualAlternatives = [...manual];
    return item;
  }

  function assertControlledClauseOperation(item) {
    const contract = item.controlledClause || item.answerContract?.controlledClause;
    if (!contract) return item;
    const pattern = OPERATION_PROMPT_RE[contract.operation];
    if (pattern && !pattern.test(String(item.promptEn || ""))) {
      throw new Error(`${item.itemId}: controlled-clause prompt hides the '${contract.operation}' operation.`);
    }
    return item;
  }

  function repairAttempt(attempt) {
    if (!attempt || !Array.isArray(attempt.items)) return attempt;
    for (const item of attempt.items) {
      addReviewedAlternative(item);
      repairRecognitionOptions(item);
      assertControlledClauseOperation(item);
    }
    attempt.answerContracts = attempt.items.map((item) => ({ itemId: item.itemId, ...JSON.parse(JSON.stringify(item.answerContract)) }));
    return attempt;
  }

  function validateFairness(attempt) {
    const errors = [];
    for (const item of attempt?.items || []) {
      if (item.mode === "recognition") {
        const keys = (item.options || []).map(semanticKey);
        if (new Set(keys).size !== keys.length) errors.push(`${item.itemId}: recognition options contain semantic equivalents`);
      }
      try {
        assertControlledClauseOperation(item);
      } catch (error) {
        errors.push(error.message);
      }
    }
    return errors;
  }

  function installEngineGuard() {
    const original = window.HANAPATH_SENTENCE_EXAM_ENGINE;
    if (!original || original.__fairnessGuard) return Boolean(original);
    const guarded = Object.freeze({
      ...original,
      __fairnessGuard: true,
      generateAttempt(examId, seed, options) {
        return repairAttempt(original.generateAttempt(examId, seed, options));
      },
      generateFreshnessSequence(examId, seed) {
        return original.generateFreshnessSequence(examId, seed).map(repairAttempt);
      },
      validateAttempt(attempt, blueprint) {
        return [...original.validateAttempt(attempt, blueprint), ...validateFairness(attempt)];
      },
    });
    window.HANAPATH_SENTENCE_EXAM_ENGINE = guarded;
    return true;
  }

  function feedbackCost(alignment) {
    const counts = alignment?.counts || {};
    return Number(counts.substituted || 0) * 4
      + Number(counts.missing || 0) * 3
      + Number(counts.extra || 0) * 3
      + Number(counts.moved || 0);
  }

  function acceptedTargetsFor(row) {
    const targets = [row?.korean, ...(Array.isArray(row?.acceptAlso) ? row.acceptAlso : [])].filter(Boolean);
    if (typeof getSentenceBankRows === "function" && typeof normalizeStudyText === "function") {
      for (const other of getSentenceBankRows()) {
        if (normalizeStudyText(other?.english) !== normalizeStudyText(row?.english)) continue;
        targets.push(other.korean, ...(Array.isArray(other.acceptAlso) ? other.acceptAlso : []));
      }
    }
    return [...new Set(targets.filter(Boolean))];
  }

  function installClosestAcceptedFeedback() {
    if (typeof sentenceTokenDiffHtml !== "function") return false;
    const feedback = window.HANAPATH_SENTENCE_FEEDBACK;
    if (!feedback || typeof feedback.alignTokens !== "function" || typeof feedback.render !== "function") return false;
    const wrapped = function sentenceTokenDiffHtmlClosestAccepted(row, typed) {
      const targets = acceptedTargetsFor(row);
      let best = targets[0] || row?.korean || "";
      let bestCost = Infinity;
      for (const target of targets) {
        const alignment = feedback.alignTokens(target, typed);
        const cost = feedbackCost(alignment);
        if (cost < bestCost) {
          best = target;
          bestCost = cost;
        }
      }
      return feedback.render(best, typed);
    };
    wrapped.__hanapathClosestAccepted = true;
    sentenceTokenDiffHtml = wrapped;
    window.sentenceTokenDiffHtml = wrapped;
    return true;
  }

  const engineInstalled = installEngineGuard();
  const feedbackInstalled = installClosestAcceptedFeedback();
  window.HANAPATH_SENTENCE_EXAM_FAIRNESS = Object.freeze({
    semanticKey,
    repairAttempt,
    validateFairness,
    engineInstalled,
    feedbackInstalled,
  });
})();
