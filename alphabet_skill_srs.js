// Tiny Phase One skill SRS layer.
// Loads after app.js and wraps the existing quiz flow without changing the main script.
(function () {
  const STORAGE_KEY = "hanapath-alphabet-skill-srs-v1";
  const SKILL_INTERVALS = [10 * 60 * 1000, 20 * 60 * 60 * 1000, 3 * 24 * 60 * 60 * 1000, 7 * 24 * 60 * 60 * 1000];

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
    while (choices.size < count && choices.size < pool.length) {
      choices.add(pick(pool));
    }
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

  function readSkillState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  }

  function writeSkillState(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Ignore storage errors; the review cards still work for this session.
    }
  }

  function getCompletedPhaseOneIds() {
    try {
      const parsed = JSON.parse(localStorage.getItem("hanapath-v1") || "{}");
      return Array.isArray(parsed.phaseOneCompleted) ? parsed.phaseOneCompleted : [];
    } catch {
      return [];
    }
  }

  function getDueSkills(now = Date.now()) {
    const completed = new Set(getCompletedPhaseOneIds());
    const stored = readSkillState();
    return SKILL_DEFS.filter((skill) => completed.has(skill.unlockAfter))
      .filter((skill) => !stored[skill.id] || !stored[skill.id].due || stored[skill.id].due <= now)
      .flatMap((skill) => Array.from({ length: skill.weight }, () => skill));
  }

  function recordSkillReview(skillId, correct) {
    if (!skillId) return;
    const stored = readSkillState();
    const current = stored[skillId] || { box: 0, due: 0 };
    const nextBox = correct ? Math.min((current.box || 0) + 1, SKILL_INTERVALS.length - 1) : 0;
    stored[skillId] = {
      box: nextBox,
      due: Date.now() + SKILL_INTERVALS[nextBox],
      reviewedAt: Date.now(),
    };
    writeSkillState(stored);
  }

  function shouldOfferSkillCard() {
    if (typeof getStudio === "function" && getStudio() !== "alphabet") return false;
    return Math.random() < 0.35;
  }

  function install() {
    if (typeof generateQuestion !== "function" || typeof renderQuestion !== "function" || typeof finalizeQuestionAttempt !== "function") {
      return;
    }

    const originalGenerateQuestion = generateQuestion;
    const originalRenderQuestion = renderQuestion;
    const originalFinalizeQuestionAttempt = finalizeQuestionAttempt;
    let activeSkillId = "";

    generateQuestion = function generateQuestionWithSkillSrs() {
      if (shouldOfferSkillCard()) {
        const dueSkills = getDueSkills();
        if (dueSkills.length) {
          return pick(dueSkills).makeQuestion();
        }
      }
      return originalGenerateQuestion.apply(this, arguments);
    };

    renderQuestion = function renderQuestionWithSkillSrs(question) {
      activeSkillId = question && question.alphabetSkillId ? question.alphabetSkillId : "";
      return originalRenderQuestion.apply(this, arguments);
    };

    finalizeQuestionAttempt = function finalizeQuestionAttemptWithSkillSrs(userAnswer, isCorrect, feedbackHtml) {
      if (activeSkillId) {
        recordSkillReview(activeSkillId, Boolean(isCorrect));
      }
      return originalFinalizeQuestionAttempt.apply(this, arguments);
    };

    window.generateQuestion = generateQuestion;
    window.renderQuestion = renderQuestion;
    window.finalizeQuestionAttempt = finalizeQuestionAttempt;
  }

  install();
})();
