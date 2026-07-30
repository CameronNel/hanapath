// Phase One skill SRS and first-run safety layer.
//
// This script loads after app.js. It keeps skill review state inside the
// canonical HanaPath learner state so export/import/reset all see the same data.
(function () {
  "use strict";

  const CANONICAL_STORAGE_KEY = "hanapath-v1";
  const LEGACY_STORAGE_KEY = "hanapath-alphabet-skill-srs-v1";
  const SKILL_STATE_FIELD = "alphabetSkillSrs";
  const SKILL_INTERVALS = [
    10 * 60 * 1000,
    20 * 60 * 60 * 1000,
    3 * 24 * 60 * 60 * 1000,
    7 * 24 * 60 * 60 * 1000,
  ];

  const SKILL_DEFS = [
    {
      id: "block-geometry",
      unlockAfter: "block-geometry",
      weight: 2,
      makeQuestion: () => {
        const items = [
          { syllable: "나", vowel: "ㅏ", answer: "to the right", other: ["below the consonant", "on the floor", "above the block"], note: "ㅏ is vertical, so it sits to the right of ㄴ." },
          { syllable: "고", vowel: "ㅗ", answer: "below the consonant", other: ["to the right", "on the floor", "above the block"], note: "ㅗ is horizontal, so it sits below ㄱ." },
          { syllable: "구", vowel: "ㅜ", answer: "below the consonant", other: ["to the right", "on the floor", "above the block"], note: "ㅜ is horizontal, so it sits below ㄱ." },
          { syllable: "미", vowel: "ㅣ", answer: "to the right", other: ["below the consonant", "on the floor", "above the block"], note: "ㅣ is vertical, so it sits to the right of ㅁ." },
        ];
        const item = pick(items);
        return {
          kind: "Skill review",
          mode: "Block geometry SRS",
          prompt: `Where does ${item.vowel} sit in ${item.syllable}?`,
          detail: "Review the seat map, not just the sound.",
          visual: `<div class="big-glyph">${escapeHtml(item.syllable)}</div>`,
          options: shuffle([item.answer, ...item.other]),
          answer: item.answer,
          explanation: item.note,
          voiceText: item.syllable,
          alphabetSkillId: "block-geometry",
        };
      },
    },
    {
      id: "batchim-detection",
      unlockAfter: "batchim-basics",
      weight: 2,
      makeQuestion: () => {
        const items = [
          { syllable: "간", answer: "ㄴ", parts: "ㄱ + ㅏ + ㄴ" },
          { syllable: "밥", answer: "ㅂ", parts: "ㅂ + ㅏ + ㅂ" },
          { syllable: "공", answer: "ㅇ", parts: "ㄱ + ㅗ + ㅇ" },
          { syllable: "글", answer: "ㄹ", parts: "ㄱ + ㅡ + ㄹ" },
          { syllable: "산", answer: "ㄴ", parts: "ㅅ + ㅏ + ㄴ" },
        ];
        const item = pick(items);
        return {
          kind: "Skill review",
          mode: "Batchim detection SRS",
          prompt: `Which consonant is the batchim in ${item.syllable}?`,
          detail: "Look for the final consonant on the floor of the block.",
          visual: `<div class="big-glyph">${escapeHtml(item.syllable)}</div>`,
          options: shuffle([item.answer, ...pickDistractors(item.answer, ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅇ"])]),
          answer: item.answer,
          explanation: `${item.syllable} breaks into ${item.parts}; the final consonant is ${item.answer}.`,
          voiceText: item.syllable,
          alphabetSkillId: "batchim-detection",
        };
      },
    },
    {
      id: "word-decoding",
      unlockAfter: "reading-graduation",
      weight: 1,
      makeQuestion: () => {
        const items = [
          { word: "나무", split: "나 / 무", blocks: "2" },
          { word: "바다", split: "바 / 다", blocks: "2" },
          { word: "한글", split: "한 / 글", blocks: "2" },
          { word: "아기", split: "아 / 기", blocks: "2" },
          { word: "우유", split: "우 / 유", blocks: "2" },
        ];
        const item = pick(items);
        const askSplit = Math.random() < 0.65;
        if (askSplit) {
          const splits = items.map((entry) => entry.split);
          return {
            kind: "Skill review",
            mode: "Word decoding SRS",
            prompt: `How does ${item.word} split into syllable blocks?`,
            detail: "Read one square, then move to the next.",
            visual: `<div class="big-glyph">${escapeHtml(item.word)}</div>`,
            options: makeChoices(item.split, splits),
            answer: item.split,
            explanation: `${item.word} is read block by block: ${item.split}.`,
            voiceText: item.word,
            alphabetSkillId: "word-decoding",
          };
        }
        return {
          kind: "Skill review",
          mode: "Word decoding SRS",
          prompt: `How many syllable blocks are in ${item.word}?`,
          detail: "Count written squares, not loose jamo.",
          visual: `<div class="big-glyph">${escapeHtml(item.word)}</div>`,
          options: shuffle([item.blocks, "1", "3", "4"]),
          answer: item.blocks,
          explanation: `${item.word} splits as ${item.split}, so it has ${item.blocks} blocks.`,
          voiceText: item.word,
          alphabetSkillId: "word-decoding",
        };
      },
    },
  ];

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function shuffle(list) {
    const copy = [...list];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swap]] = [copy[swap], copy[index]];
    }
    return copy;
  }

  function makeChoices(answer, pool, count = 4) {
    const choices = new Set([answer]);
    while (choices.size < count && choices.size < pool.length) choices.add(pick(pool));
    return shuffle([...choices]);
  }

  function pickDistractors(answer, pool, count = 3) {
    return shuffle(pool.filter((item) => item !== answer)).slice(0, count);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function emitStorageError(operation, error) {
    const message = error && error.message ? error.message : String(error || "Unknown storage error");
    console.error(`[HanaPath] Alphabet skill SRS ${operation} failed: ${message}`);
    try {
      window.dispatchEvent(new CustomEvent("hanapath-storage-error", {
        detail: { source: "alphabet-skill-srs", operation, message },
      }));
    } catch {
      // The console error remains available in non-browser test harnesses.
    }
  }

  function parseObject(raw, fallback = {}) {
    try {
      const parsed = JSON.parse(raw || "");
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  function getCanonicalStateObject() {
    if (typeof state !== "undefined" && state && typeof state === "object") return state;
    try {
      return parseObject(localStorage.getItem(CANONICAL_STORAGE_KEY), {});
    } catch (error) {
      emitStorageError("read", error);
      return {};
    }
  }

  function persistCanonicalState(canonical) {
    if (typeof state !== "undefined" && state && typeof state === "object") {
      state[SKILL_STATE_FIELD] = canonical[SKILL_STATE_FIELD];
      if (typeof saveState === "function") {
        try {
          const saved = saveState();
          if (saved === false) throw new Error("saveState returned false");
          return true;
        } catch (error) {
          emitStorageError("write", error);
          return false;
        }
      }
    }
    try {
      localStorage.setItem(CANONICAL_STORAGE_KEY, JSON.stringify(canonical));
      return true;
    } catch (error) {
      emitStorageError("write", error);
      return false;
    }
  }

  function normalizeSkillState(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    const normalized = {};
    for (const skill of SKILL_DEFS) {
      const record = value[skill.id];
      if (!record || typeof record !== "object" || Array.isArray(record)) continue;
      const box = Math.max(0, Math.min(SKILL_INTERVALS.length - 1, Math.trunc(Number(record.box) || 0)));
      const due = Math.max(0, Number(record.due) || 0);
      const reviewedAt = Math.max(0, Number(record.reviewedAt) || 0);
      normalized[skill.id] = { box, due, reviewedAt };
    }
    return normalized;
  }

  function migrateLegacySkillState() {
    const canonical = getCanonicalStateObject();
    const existing = normalizeSkillState(canonical[SKILL_STATE_FIELD]);
    let legacy = {};
    try {
      legacy = normalizeSkillState(parseObject(localStorage.getItem(LEGACY_STORAGE_KEY), {}));
    } catch (error) {
      emitStorageError("legacy-read", error);
    }
    const merged = { ...legacy, ...existing };
    canonical[SKILL_STATE_FIELD] = merged;
    if (typeof state !== "undefined" && state && typeof state === "object") state[SKILL_STATE_FIELD] = merged;

    if (!Object.keys(legacy).length) return merged;
    if (persistCanonicalState(canonical)) {
      try {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch (error) {
        emitStorageError("legacy-remove", error);
      }
    }
    return merged;
  }

  function readSkillState() {
    const canonical = getCanonicalStateObject();
    const normalized = normalizeSkillState(canonical[SKILL_STATE_FIELD]);
    canonical[SKILL_STATE_FIELD] = normalized;
    if (typeof state !== "undefined" && state && typeof state === "object") state[SKILL_STATE_FIELD] = normalized;
    return normalized;
  }

  function writeSkillState(value) {
    const canonical = getCanonicalStateObject();
    canonical[SKILL_STATE_FIELD] = normalizeSkillState(value);
    return persistCanonicalState(canonical);
  }

  function restoreRecoveredAlphabetProgress() {
    const canonical = getCanonicalStateObject();
    const recovery = canonical.migrationRecovery && canonical.migrationRecovery.phaseOneCompletedBeforeSafetyV2;
    if (!recovery || !Array.isArray(recovery.ids) || recovery.restoredAt) return false;
    const restored = [...new Set(recovery.ids.filter((id) => typeof id === "string" && id))];
    canonical.phaseOneCompleted = restored;
    recovery.restoredAt = Date.now();
    if (typeof state !== "undefined" && state && typeof state === "object") {
      state.phaseOneCompleted = restored;
      state.migrationRecovery = canonical.migrationRecovery;
    }
    return persistCanonicalState(canonical);
  }

  function getCompletedPhaseOneIds() {
    if (typeof getAlphabetProgress === "function") {
      const progress = getAlphabetProgress();
      if (progress && Array.isArray(progress.completedIds)) return progress.completedIds;
    }
    const canonical = getCanonicalStateObject();
    return Array.isArray(canonical.phaseOneCompleted) ? canonical.phaseOneCompleted : [];
  }

  function getDueSkills(now = Date.now()) {
    const completed = new Set(getCompletedPhaseOneIds());
    const stored = readSkillState();
    return SKILL_DEFS
      .filter((skill) => completed.has(skill.unlockAfter))
      .filter((skill) => !stored[skill.id] || !stored[skill.id].due || stored[skill.id].due <= now)
      .flatMap((skill) => Array.from({ length: skill.weight }, () => skill));
  }

  function recordSkillReview(skillId, correct, now = Date.now()) {
    if (!skillId || !SKILL_DEFS.some((skill) => skill.id === skillId)) return false;
    const stored = readSkillState();
    const current = stored[skillId] || { box: 0, due: 0, reviewedAt: 0 };
    const currentBox = Math.max(0, Math.min(SKILL_INTERVALS.length - 1, Math.trunc(Number(current.box) || 0)));
    const intervalIndex = correct ? currentBox : 0;
    const nextBox = correct ? Math.min(currentBox + 1, SKILL_INTERVALS.length - 1) : 0;
    stored[skillId] = {
      box: nextBox,
      due: now + SKILL_INTERVALS[intervalIndex],
      reviewedAt: now,
    };
    return writeSkillState(stored);
  }

  function shouldOfferSkillCard() {
    return !(typeof getStudio === "function" && getStudio() !== "alphabet");
  }

  function installOnboardingGuard() {
    if (typeof init !== "function") return false;
    if (init.__hanapathOnboardingGuard) return true;
    const originalInit = init;
    const guarded = async function guardedHanaPathInit() {
      const canonical = getCanonicalStateObject();
      const query = new URLSearchParams(window.location.search);
      const needsOnboarding = canonical.onboarded !== true && !query.has("onboarding");
      if (!needsOnboarding) return originalInit.apply(this, arguments);

      const originalUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      const temporary = new URL(window.location.href);
      temporary.searchParams.set("onboarding", "1");
      window.history.replaceState(window.history.state, "", `${temporary.pathname}${temporary.search}${temporary.hash}`);
      try {
        return await originalInit.apply(this, arguments);
      } finally {
        window.history.replaceState(window.history.state, "", originalUrl);
      }
    };
    guarded.__hanapathOnboardingGuard = true;
    guarded.__hanapathOriginalInit = originalInit;
    init = guarded;
    window.init = guarded;
    return true;
  }

  function installQuestionHooks() {
    if (
      typeof generateQuestion !== "function"
      || typeof renderQuestion !== "function"
      || typeof finalizeQuestionAttempt !== "function"
    ) {
      console.error("[HanaPath] Alphabet skill SRS could not install because quiz hooks are unavailable.");
      return false;
    }
    if (generateQuestion.__hanapathAlphabetSkillSrs) return true;

    const originalGenerateQuestion = generateQuestion;
    const originalRenderQuestion = renderQuestion;
    const originalFinalizeQuestionAttempt = finalizeQuestionAttempt;
    let activeSkillId = "";

    const wrappedGenerateQuestion = function generateQuestionWithSkillSrs() {
      if (shouldOfferSkillCard()) {
        const dueSkills = getDueSkills();
        if (dueSkills.length) return pick(dueSkills).makeQuestion();
      }
      return originalGenerateQuestion.apply(this, arguments);
    };
    wrappedGenerateQuestion.__hanapathAlphabetSkillSrs = true;

    const wrappedRenderQuestion = function renderQuestionWithSkillSrs(question) {
      activeSkillId = question && question.alphabetSkillId ? question.alphabetSkillId : "";
      return originalRenderQuestion.apply(this, arguments);
    };

    const wrappedFinalizeQuestionAttempt = function finalizeQuestionAttemptWithSkillSrs(userAnswer, isCorrect, feedbackHtml) {
      const skillId = activeSkillId;
      activeSkillId = "";
      if (skillId) recordSkillReview(skillId, Boolean(isCorrect));
      return originalFinalizeQuestionAttempt.apply(this, arguments);
    };

    generateQuestion = wrappedGenerateQuestion;
    renderQuestion = wrappedRenderQuestion;
    finalizeQuestionAttempt = wrappedFinalizeQuestionAttempt;
    window.generateQuestion = wrappedGenerateQuestion;
    window.renderQuestion = wrappedRenderQuestion;
    window.finalizeQuestionAttempt = wrappedFinalizeQuestionAttempt;
    return true;
  }

  migrateLegacySkillState();
  restoreRecoveredAlphabetProgress();
  if (typeof ALPHABET_LESSON_IDS !== "undefined" && Array.isArray(ALPHABET_LESSON_IDS)) {
    Object.freeze(ALPHABET_LESSON_IDS);
  }
  installOnboardingGuard();
  installQuestionHooks();

  window.HANAPATH_ALPHABET_SKILL_SRS = Object.freeze({
    intervals: [...SKILL_INTERVALS],
    getDueSkills,
    readSkillState,
    recordSkillReview,
    migrateLegacySkillState,
    restoreRecoveredAlphabetProgress,
  });
})();
