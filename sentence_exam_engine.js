(function () {
  "use strict";

  const FORM_TAGS = new Set([
    "present-polite", "past-polite", "future-geoyeyo", "formal-nida", "honorific-si",
    "imperative-seyo", "propositive-eyo", "copula-ieyo", "copula-negative-anieyo",
    "neg-an", "neg-mot", "neg-ji-anta", "want-go-sipda", "can-su-itda", "must-ya-dwaeda",
  ]);
  const CONTEXT_TAGS = new Set([
    "topic-neun", "subject-i-ga", "object-eul-reul", "time-expression", "location-e",
    "location-eseo", "possessive-ui", "because-aseo", "direction-euro", "and-go",
    "with-hago-wa", "if-myeon", "existence-itda", "counter-phrase", "when-ttae",
    "also-do", "comparison-boda", "until-kkaji", "but-jiman", "only-man", "from-buteo",
    "question-polite",
  ]);
  const ACTIVE_BANK_REVISION = "curated-sentence-exam-v2-cb6b";
  const ACTIVE_BANK_COUNTS = Object.freeze({ total: 702, typed: 359, recognition: 343 });
  const FRESHNESS_ATTEMPTS = 5;
  const FALLBACK_SEED_ATTEMPTS = 32;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function hashSeed(value) {
    let hash = 2166136261;
    const text = String(value);
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function rngFor(seed) {
    let state = hashSeed(seed) || 0x9e3779b9;
    return function random() {
      state += 0x6d2b79f5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(values, random) {
    const copy = values.slice();
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const other = Math.floor(random() * (index + 1));
      [copy[index], copy[other]] = [copy[other], copy[index]];
    }
    return copy;
  }

  function normalize(value) {
    const grader = window.HANAPATH_SENTENCE_EXAM_GRADER;
    if (!grader || typeof grader.normalizeSentenceExamAnswer !== "function") {
      throw new Error("Sentence exam grader is unavailable.");
    }
    return grader.normalizeSentenceExamAnswer(value);
  }

  function getBankEntries() {
    const bank = window.HANAPATH_SENTENCE_EXAM_CURATED_BANK;
    const meta = window.HANAPATH_SENTENCE_EXAM_META;
    if (!bank || bank.enabled !== true || bank.freezeState !== "frozen" || !Array.isArray(bank.entries)) {
      throw new Error("The enabled frozen curated Sentence exam bank is unavailable.");
    }
    if (!meta || meta.contentBankRevision !== ACTIVE_BANK_REVISION) {
      throw new Error(`Sentence exam blueprint revision mismatch: expected ${ACTIVE_BANK_REVISION}, got ${meta?.contentBankRevision}.`);
    }
    if (bank.revision !== ACTIVE_BANK_REVISION || bank.revision !== meta.contentBankRevision) {
      throw new Error(`Sentence exam bank revision mismatch: expected ${ACTIVE_BANK_REVISION}, got ${bank.revision}.`);
    }
    const freeze = window.HANAPATH_SENTENCE_EXAM_CURATED_BANK_FREEZE;
    if (!freeze || freeze.revision !== ACTIVE_BANK_REVISION) {
      throw new Error("Sentence exam freeze manifest is unavailable or has the wrong revision.");
    }
    const typed = bank.entries.filter((entry) => entry.mode === "typed").length;
    const recognition = bank.entries.filter((entry) => entry.mode === "recognition").length;
    if (bank.entries.length !== ACTIVE_BANK_COUNTS.total
        || typed !== ACTIVE_BANK_COUNTS.typed
        || recognition !== ACTIVE_BANK_COUNTS.recognition
        || freeze.entryCount !== ACTIVE_BANK_COUNTS.total
        || freeze.typedCount !== ACTIVE_BANK_COUNTS.typed
        || freeze.recognitionCount !== ACTIVE_BANK_COUNTS.recognition) {
      throw new Error("Sentence exam bank counts do not match the active frozen CB6B contract.");
    }
    return bank.entries;
  }

  function resolveBlueprint(examId, attemptMode) {
    const exams = window.HANAPATH_SENTENCE_EXAMS || [];
    const retentionRequested = attemptMode === "retention" || examId === "sentence-exam-5:retention";
    const baseId = retentionRequested ? "sentence-exam-5" : examId;
    const base = exams.find((exam) => exam.id === baseId);
    if (!base) throw new Error(`Unknown Sentence exam blueprint: ${examId}`);
    if (!retentionRequested) return clone(base);
    if (!base.retention) throw new Error(`Blueprint ${base.id} has no retention mode.`);
    return {
      ...clone(base),
      ...clone(base.retention),
      baseExamId: base.id,
      kind: "retention",
      scopeSectionOrders: clone(base.scopeSectionOrders),
      unlockSectionOrders: clone(base.unlockSectionOrders),
    };
  }

  function candidateFor(entry) {
    const tags = Array.isArray(entry.patternTags) ? entry.patternTags.slice() : [];
    const typed = entry.mode === "typed";
    return {
      entry,
      id: entry.id,
      mode: entry.mode,
      targetKey: normalize(entry.canonicalAnswer),
      surfaceKey: normalize(entry.canonicalAnswer),
      promptKey: entry.mode === "recognition"
        ? `${String(entry.examPromptEn || "").trim().toLocaleLowerCase("en")}|${normalize(entry.canonicalAnswer)}`
        : String(entry.examPromptEn || "").trim().toLocaleLowerCase("en"),
      sectionOrder: Number(entry.sourceSectionOrder),
      band: Math.max(1, Math.min(4, Math.ceil(Number(entry.sourceSectionOrder) / 2))),
      tags,
      strands: typed
        ? ["P", ...(tags.some((tag) => FORM_TAGS.has(tag)) ? ["F"] : []),
          ...(tags.some((tag) => CONTEXT_TAGS.has(tag)) ? ["X"] : [])]
        : ["R", "C"],
    };
  }

  function countTags(selected) {
    const counts = {};
    for (const item of selected) {
      for (const tag of item.tags) counts[tag] = (counts[tag] || 0) + 1;
    }
    return counts;
  }

  function countCoverage(selected) {
    const counts = {};
    for (const item of selected) {
      counts[`section-${item.sectionOrder}`] = (counts[`section-${item.sectionOrder}`] || 0) + 1;
      counts[`band-${item.band}`] = (counts[`band-${item.band}`] || 0) + 1;
    }
    return counts;
  }

  function deficits(selected, blueprint) {
    const tagCounts = countTags(selected);
    const coverageCounts = countCoverage(selected);
    const missingTags = {};
    const missingCoverage = {};
    for (const [tag, minimum] of Object.entries(blueprint.tagFloors || {})) {
      if ((tagCounts[tag] || 0) < minimum) missingTags[tag] = minimum - (tagCounts[tag] || 0);
    }
    for (const [key, minimum] of Object.entries(blueprint.sectionFloors || {})) {
      if ((coverageCounts[key] || 0) < minimum) missingCoverage[key] = minimum - (coverageCounts[key] || 0);
    }
    return { missingTags, missingCoverage };
  }

  function selectionErrors(selected, blueprint) {
    const errors = [];
    const allocations = {};
    const targets = new Set();
    const surfaces = new Set();
    const rows = new Set();
    const prompts = new Set();
    for (const candidate of selected) {
      allocations[candidate.primaryStrand] = (allocations[candidate.primaryStrand] || 0) + 1;
      if (!candidate.strands.includes(candidate.primaryStrand)) {
        errors.push(`${candidate.id}: ineligible ${candidate.primaryStrand} assignment`);
      }
      for (const [set, key, label] of [
        [targets, candidate.targetKey, "target"],
        [surfaces, candidate.surfaceKey, "surface"],
        [rows, candidate.id, "source row"],
        [prompts, candidate.promptKey, "prompt"],
      ]) {
        if (set.has(key)) errors.push(`duplicate ${label}: ${key}`);
        set.add(key);
      }
    }
    if (selected.length !== blueprint.itemCount) {
      errors.push(`item count ${selected.length} != ${blueprint.itemCount}`);
    }
    for (const [strand, expected] of Object.entries(blueprint.allocations || {})) {
      if ((allocations[strand] || 0) !== expected) {
        errors.push(`${strand} allocation ${allocations[strand] || 0} != ${expected}`);
      }
    }
    const missing = deficits(selected, blueprint);
    for (const [tag, amount] of Object.entries(missing.missingTags)) {
      errors.push(`tag floor ${tag} short by ${amount}`);
    }
    for (const [key, amount] of Object.entries(missing.missingCoverage)) {
      errors.push(`coverage floor ${key} short by ${amount}`);
    }
    return errors;
  }

  function parseCapacityScaffold(examId, blueprint, pool) {
    const scaffold = window.HANAPATH_SENTENCE_EXAM_CAPACITY_SCAFFOLDS;
    const encoded = scaffold?.exams?.[examId];
    if (!scaffold || scaffold.revision !== "curated-sentence-exam-v2-cb6b-authoring" || !encoded) {
      throw new Error(`The reviewed CB6B capacity scaffold is unavailable for ${examId}.`);
    }
    const byId = new Map(pool.map((candidate) => [candidate.id, candidate]));
    const attempts = encoded.split("/").map((attemptText) => attemptText.split(",").map((selection) => {
      const separator = selection.lastIndexOf(":");
      const id = selection.slice(0, separator);
      const primaryStrand = selection.slice(separator + 1);
      const candidate = byId.get(id);
      if (!candidate) throw new Error(`${examId} capacity scaffold references unavailable entry ${id}.`);
      return { ...candidate, primaryStrand };
    }));
    if (attempts.length !== FRESHNESS_ATTEMPTS) {
      throw new Error(`${examId} capacity scaffold must contain exactly five attempts.`);
    }
    const allTargets = new Set();
    for (const [index, attempt] of attempts.entries()) {
      const errors = selectionErrors(attempt, blueprint);
      if (errors.length) throw new Error(`${examId} capacity scaffold attempt ${index + 1}: ${errors.join("; ")}`);
      for (const candidate of attempt) {
        if (allTargets.has(candidate.targetKey)) {
          throw new Error(`${examId} capacity scaffold repeats target ${candidate.targetKey}.`);
        }
        allTargets.add(candidate.targetKey);
      }
    }
    return attempts;
  }

  function buildFreshnessCycle(examId, cycleSeed) {
    const blueprint = resolveBlueprint(examId);
    if (blueprint.kind === "retention") throw new Error("Retention does not use an achievement capacity scaffold.");
    const scope = new Set(blueprint.scopeSectionOrders);
    const pool = getBankEntries().map(candidateFor).filter((candidate) => scope.has(candidate.sectionOrder));
    const base = parseCapacityScaffold(examId, blueprint, pool);
    const attempts = base.map((attempt) => attempt.map((candidate) => ({ ...candidate })));
    const random = rngFor(`${examId}|${cycleSeed}|capacity-variation`);
    const eligibleByStrand = Object.fromEntries(["P", "F", "X", "R", "C"].map((strand) => [
      strand,
      pool.filter((candidate) => candidate.strands.includes(strand)),
    ]));
    const used = new Set(attempts.flat().map((candidate) => candidate.id));
    let acceptedChanges = 0;
    const iterations = blueprint.itemCount * 48;

    for (let iteration = 0; iteration < iterations; iteration += 1) {
      if (random() < 0.45) {
        const attemptIndex = Math.floor(random() * attempts.length);
        const attempt = attempts[attemptIndex];
        const slotIndex = Math.floor(random() * attempt.length);
        const outgoing = attempt[slotIndex];
        const candidates = eligibleByStrand[outgoing.primaryStrand];
        let incoming = null;
        for (let probe = 0; probe < 16; probe += 1) {
          const candidate = candidates[Math.floor(random() * candidates.length)];
          if (candidate && !used.has(candidate.id)) {
            incoming = candidate;
            break;
          }
        }
        if (!incoming) continue;
        attempt[slotIndex] = { ...incoming, primaryStrand: outgoing.primaryStrand };
        if (selectionErrors(attempt, blueprint).length === 0) {
          used.delete(outgoing.id);
          used.add(incoming.id);
          acceptedChanges += 1;
        } else {
          attempt[slotIndex] = outgoing;
        }
        continue;
      }

      const leftIndex = Math.floor(random() * attempts.length);
      let rightIndex = Math.floor(random() * attempts.length);
      if (rightIndex === leftIndex) rightIndex = (rightIndex + 1) % attempts.length;
      const left = attempts[leftIndex];
      const right = attempts[rightIndex];
      const leftSlot = Math.floor(random() * left.length);
      const rightSlot = Math.floor(random() * right.length);
      const leftCandidate = left[leftSlot];
      const rightCandidate = right[rightSlot];
      if (!rightCandidate.strands.includes(leftCandidate.primaryStrand)
          || !leftCandidate.strands.includes(rightCandidate.primaryStrand)) continue;
      left[leftSlot] = { ...rightCandidate, primaryStrand: leftCandidate.primaryStrand };
      right[rightSlot] = { ...leftCandidate, primaryStrand: rightCandidate.primaryStrand };
      if (selectionErrors(left, blueprint).length === 0 && selectionErrors(right, blueprint).length === 0) {
        acceptedChanges += 2;
      } else {
        left[leftSlot] = leftCandidate;
        right[rightSlot] = rightCandidate;
      }
    }

    if (acceptedChanges === 0) {
      throw new Error(`${examId} seed ${cycleSeed} could not produce a varied five-attempt cycle.`);
    }
    const variedOrder = shuffle(attempts, random);
    const cycleTargets = new Set();
    for (const [index, attempt] of variedOrder.entries()) {
      const errors = selectionErrors(attempt, blueprint);
      if (errors.length) throw new Error(`${examId} varied cycle attempt ${index + 1}: ${errors.join("; ")}`);
      for (const candidate of attempt) {
        if (cycleTargets.has(candidate.targetKey)) {
          throw new Error(`${examId} varied cycle repeats target ${candidate.targetKey}.`);
        }
        cycleTargets.add(candidate.targetKey);
      }
    }
    return { attempts: variedOrder, variationCount: acceptedChanges };
  }

  function forbiddenTargetKeys(history, qualifyingTargetKeys, retention) {
    const forbidden = new Set();
    const attempts = Array.isArray(history) ? history.slice(-(FRESHNESS_ATTEMPTS - 1)) : [];
    for (const attempt of attempts) {
      for (const key of attempt?.targetKeys || attempt?.canonicalTargetKeys || attempt?.presentedTargetKeys || []) {
        forbidden.add(normalize(key));
      }
    }
    if (retention) {
      for (const key of qualifyingTargetKeys || []) forbidden.add(normalize(key));
    }
    return forbidden;
  }

  function selectGreedyPaper(blueprint, seed, forbidden) {
    const random = rngFor(`${blueprint.id}|${seed}|greedy-paper`);
    const scope = new Set(blueprint.scopeSectionOrders);
    const pool = getBankEntries().map(candidateFor).filter((candidate) => (
      scope.has(candidate.sectionOrder) && !forbidden.has(candidate.targetKey)
    ));
    for (const candidate of pool) candidate.tie = random();
    const selected = [];
    const used = new Set();
    const slots = [];
    for (const strand of ["F", "X", "R", "C", "P"]) {
      for (let count = 0; count < Number(blueprint.allocations[strand] || 0); count += 1) slots.push(strand);
    }
    for (const strand of slots) {
      const missing = deficits(selected, blueprint);
      const candidates = pool.filter((candidate) => !used.has(candidate.id) && candidate.strands.includes(strand));
      candidates.sort((left, right) => {
        function score(candidate) {
          let value = 0;
          for (const tag of candidate.tags) value += (missing.missingTags[tag] || 0) * 1000;
          value += (missing.missingCoverage[`section-${candidate.sectionOrder}`] || 0) * 700;
          value += (missing.missingCoverage[`band-${candidate.band}`] || 0) * 700;
          return value + candidate.tags.length * 0.01 + candidate.tie;
        }
        return score(right) - score(left) || left.id.localeCompare(right.id);
      });
      const chosen = candidates[0];
      if (!chosen) throw new Error(`Insufficient ${strand} candidates for ${blueprint.id}.`);
      used.add(chosen.id);
      selected.push({ ...chosen, primaryStrand: strand });
    }
    const errors = selectionErrors(selected, blueprint);
    if (errors.length) throw new Error(errors.join("; "));
    return selected;
  }

  function recognitionOptions(candidate, recognitionPool, random) {
    const answer = String(candidate.entry.recognitionAnswerEn || "").trim();
    if (!answer) throw new Error(`Recognition entry ${candidate.id} has no English answer.`);
    const options = [answer];
    const seen = new Set([answer.toLocaleLowerCase("en")]);
    for (const distractor of shuffle(recognitionPool, random)) {
      const text = String(distractor.entry.recognitionAnswerEn || "").trim();
      const key = text.toLocaleLowerCase("en");
      if (!text || seen.has(key) || distractor.id === candidate.id || distractor.targetKey === candidate.targetKey) continue;
      options.push(text);
      seen.add(key);
      if (options.length === 4) break;
    }
    if (options.length !== 4) throw new Error(`Recognition entry ${candidate.id} cannot form four unique options.`);
    return shuffle(options, random);
  }

  function answerContractFor(entry) {
    return {
      mode: entry.mode,
      canonicalAnswer: entry.canonicalAnswer,
      manualAlternatives: clone(entry.manualAlternatives || []),
      recognitionAnswerEn: entry.mode === "recognition" ? entry.recognitionAnswerEn : null,
      templateId: entry.templateId,
      controlledClause: entry.controlledClause ? clone(entry.controlledClause) : null,
      gradingPolicy: entry.mode === "typed" ? "strict-curated-exact" : "exact-option",
    };
  }

  function materializeItem(candidate, index, resolvedSeed, recognitionPool, random) {
    const entry = candidate.entry;
    const base = {
      itemId: `${resolvedSeed}:${String(index + 1).padStart(2, "0")}`,
      sourceEntryId: entry.id,
      sourceLessonIds: clone(entry.sourceLessonIds || []),
      sourceSectionOrder: candidate.sectionOrder,
      canonicalTargetKey: candidate.targetKey,
      canonicalAnswer: entry.canonicalAnswer,
      manualAlternatives: clone(entry.manualAlternatives || []),
      promptEn: entry.examPromptEn,
      promptTemplateId: entry.templateId,
      promptOrigin: entry.promptOrigin || null,
      requiresLexicalAnchor: entry.requiresLexicalAnchor === true,
      controlledClause: entry.controlledClause ? clone(entry.controlledClause) : null,
      eligibilityReauthorization: entry.eligibilityReauthorization
        ? clone(entry.eligibilityReauthorization)
        : null,
      patternTags: candidate.tags.slice(),
      primaryStrand: candidate.primaryStrand,
      mode: entry.mode,
      answerContract: answerContractFor(entry),
    };
    if (entry.mode === "recognition") {
      base.options = recognitionOptions(candidate, recognitionPool, random);
    }
    return base;
  }

  function materializeAttempt(blueprint, selected, requestedSeed, resolvedSeed, provenance = {}) {
    const random = rngFor(`${blueprint.id}|${resolvedSeed}|${window.HANAPATH_SENTENCE_EXAM_META.engineVersion}|materialize`);
    const scope = new Set(blueprint.scopeSectionOrders);
    const recognitionPool = getBankEntries()
      .map(candidateFor)
      .filter((candidate) => candidate.mode === "recognition" && scope.has(candidate.sectionOrder));
    const ordered = shuffle(selected, random);
    const items = ordered.map((candidate, index) => (
      materializeItem(candidate, index, resolvedSeed, recognitionPool, random)
    ));
    const attempt = {
      schemaVersion: 1,
      examId: blueprint.id,
      baseExamId: blueprint.baseExamId || blueprint.id,
      attemptMode: blueprint.kind === "retention" ? "retention" : "achievement",
      blueprintVersion: window.HANAPATH_SENTENCE_EXAM_META.blueprintVersion,
      engineVersion: window.HANAPATH_SENTENCE_EXAM_META.engineVersion,
      engineRevision: window.HANAPATH_SENTENCE_EXAM_META.engineRevision,
      contentBankRevision: window.HANAPATH_SENTENCE_EXAM_META.contentBankRevision,
      requestedSeed: String(requestedSeed),
      resolvedSeed: String(resolvedSeed),
      itemCount: blueprint.itemCount,
      timeLimitMinutes: blueprint.timeLimitMinutes,
      sourceEntryIds: items.map((item) => item.sourceEntryId),
      sourceLessonIds: [...new Set(items.flatMap((item) => item.sourceLessonIds))],
      canonicalTargetKeys: items.map((item) => item.canonicalTargetKey),
      targetKeys: items.map((item) => item.canonicalTargetKey),
      strands: items.map((item) => item.primaryStrand),
      prompts: items.map((item) => ({
        itemId: item.itemId,
        templateId: item.promptTemplateId,
        promptEn: item.promptEn,
        controlledClause: item.controlledClause,
        eligibilityReauthorization: item.eligibilityReauthorization,
      })),
      answerContracts: items.map((item) => ({ itemId: item.itemId, ...clone(item.answerContract) })),
      items,
      ...provenance,
    };
    const errors = validateAttempt(attempt, blueprint);
    if (errors.length) throw new Error(errors.join("; "));
    return attempt;
  }

  function validateAttempt(attempt, blueprintArg) {
    const blueprint = blueprintArg || resolveBlueprint(attempt.baseExamId || attempt.examId, attempt.attemptMode);
    const errors = [];
    const selected = attempt.items.map((item) => ({
      id: item.sourceEntryId,
      targetKey: normalize(item.canonicalTargetKey),
      surfaceKey: normalize(item.canonicalAnswer),
      promptKey: item.mode === "recognition"
        ? `${String(item.promptEn || "").trim().toLocaleLowerCase("en")}|${normalize(item.canonicalAnswer)}`
        : String(item.promptEn || "").trim().toLocaleLowerCase("en"),
      sectionOrder: Number(item.sourceSectionOrder),
      band: Math.ceil(Number(item.sourceSectionOrder) / 2),
      tags: item.patternTags || [],
      strands: item.mode === "typed"
        ? ["P", ...((item.patternTags || []).some((tag) => FORM_TAGS.has(tag)) ? ["F"] : []),
          ...((item.patternTags || []).some((tag) => CONTEXT_TAGS.has(tag)) ? ["X"] : [])]
        : ["R", "C"],
      primaryStrand: item.primaryStrand,
    }));
    errors.push(...selectionErrors(selected, blueprint));
    if (attempt.timeLimitMinutes !== blueprint.timeLimitMinutes) {
      errors.push(`time limit ${attempt.timeLimitMinutes} != ${blueprint.timeLimitMinutes}`);
    }
    if (attempt.contentBankRevision !== ACTIVE_BANK_REVISION) errors.push("attempt bank revision mismatch");
    if (!attempt.requestedSeed || !attempt.resolvedSeed) errors.push("attempt seed provenance is incomplete");
    for (const item of attempt.items) {
      if (!Array.isArray(item.sourceLessonIds) || item.sourceLessonIds.length === 0) {
        errors.push(`${item.itemId}: source lesson route is missing`);
      }
      if (item.mode === "recognition") {
        const answer = String(item.answerContract?.recognitionAnswerEn || "");
        const optionKeys = (item.options || []).map((value) => String(value).toLocaleLowerCase("en"));
        if (!Array.isArray(item.options) || item.options.length !== 4 || new Set(optionKeys).size !== 4) {
          errors.push(`${item.itemId}: recognition options are not exactly four case-insensitively unique strings`);
        }
        if ((item.options || []).filter((value) => value === answer).length !== 1) {
          errors.push(`${item.itemId}: recognition answer is not represented exactly once`);
        }
        if (String(item.promptEn || "").toLocaleLowerCase("en").includes(answer.toLocaleLowerCase("en"))) {
          errors.push(`${item.itemId}: recognition prompt leaks its answer`);
        }
      } else if (normalize(item.promptEn).includes(normalize(item.canonicalAnswer))) {
        errors.push(`${item.itemId}: typed prompt leaks its canonical answer`);
      }
    }
    return errors;
  }

  function freshnessContext(examId, resolvedSeed, history) {
    if (history === undefined) return null;
    if (!Array.isArray(history)) throw new Error("Freshness history must be an array.");
    if (history.length === 0) return { cycleSeed: resolvedSeed, cycleIndex: 0 };
    const previous = history[history.length - 1];
    if (previous?.baseExamId !== examId
        || previous?.attemptMode !== "achievement"
        || typeof previous?.freshnessCycleSeed !== "string"
        || !Number.isInteger(previous?.freshnessCycleIndex)
        || previous.freshnessCycleIndex < 0
        || previous.freshnessCycleIndex >= FRESHNESS_ATTEMPTS) {
      throw new Error("Freshness history is malformed or belongs to another examination.");
    }
    return {
      cycleSeed: previous.freshnessCycleSeed,
      cycleIndex: (previous.freshnessCycleIndex + 1) % FRESHNESS_ATTEMPTS,
    };
  }

  function attemptForSeed(examId, seed, options) {
    const blueprint = resolveBlueprint(examId, options.attemptMode);
    const requestedSeed = String(options.requestedSeed ?? seed);
    if (blueprint.kind === "retention") {
      const forbidden = forbiddenTargetKeys(options.freshnessHistory, options.qualifyingTargetKeys, true);
      const selected = selectGreedyPaper(blueprint, seed, forbidden);
      return materializeAttempt(blueprint, selected, requestedSeed, seed);
    }

    const freshness = freshnessContext(blueprint.id, seed, options.freshnessHistory);
    const cycleSeed = freshness?.cycleSeed || seed;
    const cycle = buildFreshnessCycle(blueprint.id, cycleSeed);
    const cycleIndex = freshness?.cycleIndex ?? (hashSeed(`${blueprint.id}|${seed}|independent`) % FRESHNESS_ATTEMPTS);
    const attempt = materializeAttempt(blueprint, cycle.attempts[cycleIndex], requestedSeed, seed, freshness ? {
      freshnessCycleSeed: cycleSeed,
      freshnessCycleIndex: cycleIndex,
      freshnessWindowAttempts: FRESHNESS_ATTEMPTS,
      freshnessMaxCanonicalUses: 1,
      cycleVariationCount: cycle.variationCount,
    } : {
      cycleVariationCount: cycle.variationCount,
    });
    const forbidden = forbiddenTargetKeys(options.freshnessHistory, [], false);
    const overlap = attempt.targetKeys.filter((key) => forbidden.has(normalize(key)));
    if (overlap.length) throw new Error(`Freshness overlap: ${overlap.slice(0, 5).join(", ")}`);
    return attempt;
  }

  function generateAttempt(examId, seed, options = {}) {
    const requested = String(seed);
    const failures = [];
    for (let index = 0; index <= FALLBACK_SEED_ATTEMPTS; index += 1) {
      const resolved = index === 0 ? requested : `${requested}#${index}`;
      try {
        return attemptForSeed(examId, resolved, { ...options, requestedSeed: requested });
      } catch (error) {
        failures.push(`${resolved}: ${error.message}`);
      }
    }
    const error = new Error("This exam form is temporarily unavailable because the reviewed item pool cannot meet its coverage rules.");
    error.code = "SENTENCE_EXAM_POOL_UNAVAILABLE";
    error.failures = failures;
    throw error;
  }

  function generateFreshnessSequence(examId, seed) {
    const blueprint = resolveBlueprint(examId);
    if (blueprint.kind === "retention") throw new Error("Retention cannot be generated as an achievement freshness sequence.");
    const requested = String(seed);
    const failures = [];
    for (let fallback = 0; fallback <= FALLBACK_SEED_ATTEMPTS; fallback += 1) {
      const cycleSeed = fallback === 0 ? requested : `${requested}#${fallback}`;
      try {
        const cycle = buildFreshnessCycle(blueprint.id, cycleSeed);
        return cycle.attempts.map((selected, index) => materializeAttempt(
          blueprint,
          selected,
          `${requested}:attempt-${index + 1}`,
          `${cycleSeed}:attempt-${index + 1}`,
          {
            freshnessCycleSeed: cycleSeed,
            freshnessCycleIndex: index,
            freshnessWindowAttempts: FRESHNESS_ATTEMPTS,
            freshnessMaxCanonicalUses: 1,
            cycleVariationCount: cycle.variationCount,
          },
        ));
      } catch (error) {
        failures.push(`${cycleSeed}: ${error.message}`);
      }
    }
    const error = new Error("This freshness sequence is temporarily unavailable because the reviewed item pool cannot meet its coverage rules.");
    error.code = "SENTENCE_EXAM_POOL_UNAVAILABLE";
    error.failures = failures;
    throw error;
  }

  function gradeAttempt(attempt, responses) {
    const grader = window.HANAPATH_SENTENCE_EXAM_GRADER;
    if (!grader || typeof grader.scoreSentenceExamResponse !== "function") {
      throw new Error("Sentence exam grader is unavailable.");
    }
    const byItemId = responses && typeof responses === "object" ? responses : {};
    const scored = attempt.items.map((item) => {
      const response = byItemId[item.itemId];
      if (item.mode === "typed") {
        const result = grader.scoreSentenceExamResponse(
          {
            canonicalAnswer: item.answerContract.canonicalAnswer,
            manualAlternatives: item.answerContract.manualAlternatives,
          },
          response,
        );
        return {
          itemId: item.itemId,
          correct: result.correct,
          diagnostics: result.diagnostics,
          primaryStrand: item.primaryStrand,
        };
      }
      const selected = typeof response === "number" ? item.options[response] : String(response || "");
      return {
        itemId: item.itemId,
        correct: selected === item.answerContract.recognitionAnswerEn,
        primaryStrand: item.primaryStrand,
      };
    });
    const correct = scored.filter((result) => result.correct).length;
    const strand = {};
    for (const result of scored) {
      const bucket = strand[result.primaryStrand] || { correct: 0, total: 0 };
      bucket.total += 1;
      if (result.correct) bucket.correct += 1;
      strand[result.primaryStrand] = bucket;
    }
    return {
      correct,
      total: scored.length,
      pct: scored.length ? (correct / scored.length) * 100 : 0,
      strand,
      items: scored,
    };
  }

  function analyzeCapacity(examId, options = {}) {
    const blueprint = resolveBlueprint(examId, options.attemptMode);
    const scope = new Set(blueprint.scopeSectionOrders);
    const entries = getBankEntries().map(candidateFor).filter((candidate) => scope.has(candidate.sectionOrder));
    const typedTargets = new Set(entries.filter((candidate) => candidate.mode === "typed").map((candidate) => candidate.targetKey));
    const recognitionTargets = new Set(entries.filter((candidate) => candidate.mode === "recognition").map((candidate) => candidate.targetKey));
    const typedPerPaper = Number(blueprint.allocations.P || 0)
      + Number(blueprint.allocations.F || 0)
      + Number(blueprint.allocations.X || 0);
    const recognitionPerPaper = Number(blueprint.allocations.R || 0)
      + Number(blueprint.allocations.C || 0);
    return {
      examId: blueprint.id,
      typedDistinctTargets: typedTargets.size,
      recognitionDistinctTargets: recognitionTargets.size,
      typedPerPaper,
      recognitionPerPaper,
      freshnessWindow: FRESHNESS_ATTEMPTS,
      typedRequiredForWindow: typedPerPaper * FRESHNESS_ATTEMPTS,
      recognitionRequiredForWindow: recognitionPerPaper * FRESHNESS_ATTEMPTS,
      typedMargin: typedTargets.size - typedPerPaper * FRESHNESS_ATTEMPTS,
      recognitionMargin: recognitionTargets.size - recognitionPerPaper * FRESHNESS_ATTEMPTS,
      ready: typedTargets.size >= typedPerPaper * FRESHNESS_ATTEMPTS
        && recognitionTargets.size >= recognitionPerPaper * FRESHNESS_ATTEMPTS,
    };
  }

  window.HANAPATH_SENTENCE_EXAM_ENGINE = Object.freeze({
    engineVersion: window.HANAPATH_SENTENCE_EXAM_META?.engineVersion || 1,
    engineRevision: window.HANAPATH_SENTENCE_EXAM_META?.engineRevision || "sentence-exam-engine-v1-x1",
    resolveBlueprint,
    generateAttempt,
    generateFreshnessSequence,
    gradeAttempt,
    validateAttempt,
    analyzeCapacity,
  });
})();
