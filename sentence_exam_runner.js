(function installSentenceExamRunnerUi() {
  "use strict";

  const core = typeof window !== "undefined" ? window.HANAPATH_SENTENCE_EXAM_RUNNER : null;
  const engine = typeof window !== "undefined" ? window.HANAPATH_SENTENCE_EXAM_ENGINE : null;
  const exams = typeof window !== "undefined" && Array.isArray(window.HANAPATH_SENTENCE_EXAMS)
    ? window.HANAPATH_SENTENCE_EXAMS
    : [];
  if (!core || !engine || exams.length !== 5) return;

  const ITEM_ID = "sentence-exams";
  const ELIGIBILITY_REVISION = window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY?.revision || "sentence-eligibility-v1";
  const STRAND_ORDER = ["P", "F", "X", "R", "C"];
  const generationKeyForMode = (examId, mode) => mode === "retention" ? `${examId}:retention` : examId;

  let sentenceExamAttempt = null;
  let sentenceExamCountdownHandle = 0;
  let composing = false;
  let currentTimingItemId = null;

  function esc(value) {
    if (typeof escapeHtml === "function") return escapeHtml(String(value == null ? "" : value));
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function now() {
    const injected = window.__SENTENCE_EXAM_NOW;
    return Number.isFinite(injected) ? injected : Date.now();
  }

  function formatClock(ms) {
    const seconds = Math.max(0, Math.ceil(Number(ms || 0) / 1000));
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  }

  function randomSeed() {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
      return `sentence-${globalThis.crypto.randomUUID()}`;
    }
    return `sentence-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function testQueryActive() {
    return typeof location !== "undefined" && /[?&]__wetest=1\b/.test(location.search);
  }

  function getMeta() {
    return window.HANAPATH_SENTENCE_EXAM_META || {};
  }

  function getExamById(examId) {
    return exams.find((exam) => exam.id === examId) || null;
  }

  function getRecord(examId) {
    if (!state.sentenceExams || state.sentenceExams.version !== core.STATE_VERSION) {
      state.sentenceExams = core.normalizeSentenceExams(state.sentenceExams, exams);
    }
    return state.sentenceExams.byExamId[examId] || null;
  }

  function normalizeStateSlice() {
    const before = JSON.stringify(state.sentenceExams || null);
    state.sentenceExams = core.normalizeSentenceExams(state.sentenceExams, exams);
    if (JSON.stringify(state.sentenceExams) !== before) saveState();
  }

  function sectionComplete(sectionId) {
    return typeof isSentenceSectionComplete === "function" && isSentenceSectionComplete(sectionId);
  }

  function examUnlocked(exam) {
    return core.isExamUnlocked(exam, sectionComplete);
  }

  function scopeSectionIds(exam) {
    return core.sectionIdsForExam(exam);
  }

  function taintContext(exam, flags) {
    const normalizedFlags = [...new Set(Array.isArray(flags) ? flags : [])];
    const api = window.HANAPATH_EXAM_INTEGRITY;
    if (api && typeof api.getAttemptTaintContext === "function") {
      return api.getAttemptTaintContext(state, scopeSectionIds(exam), normalizedFlags);
    }
    return {
      overrideEventIds: [],
      overrideFlags: normalizedFlags,
      status: normalizedFlags.length ? "practice" : "hanaPath",
      isPractice: normalizedFlags.length > 0,
    };
  }

  function retentionPhase(exam) {
    return core.retentionStatus(getRecord(exam.id), exam, now());
  }

  function stageScopeLabel(exam) {
    const orders = Array.isArray(exam.scopeSectionOrders) ? exam.scopeSectionOrders : [];
    if (!orders.length) return "Sentences";
    if (orders.length === 8) return "All 8 Sentence sections";
    return `Sentence sections 1–${Math.max(...orders)}`;
  }

  function bandLabel(record, exam) {
    if (!record || !record.lastResult) return "";
    if (exam.retention && record.masteryEarnedAt) return "문장 완전 습득 · Sentence Mastery";
    if (record.distinguished) return "우수 · Distinction";
    if (record.passed) return "합격 · Passed";
    return "미합격 · Not yet passed";
  }

  function clearCountdown() {
    if (sentenceExamCountdownHandle) {
      window.clearInterval(sentenceExamCountdownHandle);
      sentenceExamCountdownHandle = 0;
    }
  }

  function setExamActive(value) {
    if (typeof examActive !== "undefined") examActive = Boolean(value);
  }

  function motion(direction, delta) {
    if (typeof queueScreenMotion === "function") queueScreenMotion(direction, delta);
  }

  function mountScreen(title, onBack) {
    const el = typeof showScreen === "function" ? showScreen("detail") : document.getElementById("screen-detail");
    if (!el) return null;
    if (typeof showDetailBarWithBack === "function") {
      showDetailBarWithBack("exam", title, onBack, "Sentence Mastery");
    }
    return el;
  }

  function sentenceProgressHtml(secondary, position) {
    const remaining = sentenceExamAttempt ? sentenceExamAttempt.deadline - now() : 0;
    const low = remaining <= 5 * 60 * 1000;
    return `
      <div class="exam-progress sentence-exam-progress">
        <div class="exam-progress-heading">
          <span class="eyebrow">${esc(sentenceExamAttempt?.exam?.title || "Sentence Mastery")}</span>
          <span class="exam-progress-secondary">${esc(secondary)}</span>
        </div>
        <div class="exam-progress-meta">
          <span class="exam-progress-position">${esc(position)}</span>
          <span class="exam-countdown${low ? " exam-countdown-low" : ""}" id="sentenceExamCountdown" aria-label="Time remaining">${esc(formatClock(remaining))}</span>
        </div>
      </div>`;
  }

  function installHubEntry() {
    if (typeof HUB_DEFS === "undefined" || !HUB_DEFS.exam || !Array.isArray(HUB_DEFS.exam.items)) return;
    if (!HUB_DEFS.exam.items.some((item) => item.id === ITEM_ID)) {
      HUB_DEFS.exam.items.push({
        id: ITEM_ID,
        title: "Sentence Mastery",
        desc: "Four cumulative stages, a mastery final, and delayed retention",
        icon: "🧩",
        custom: "sentenceExamHub",
      });
    }
    if (typeof openHubItem === "function" && openHubItem.__sentenceExamWrapped !== true) {
      const previous = openHubItem;
      const wrapped = function wrappedOpenHubItem(hub, itemId) {
        if (hub === "exam" && itemId === ITEM_ID) {
          if (typeof refreshProgressionState === "function") refreshProgressionState();
          if (typeof activeHub !== "undefined") activeHub = "exam";
          if (typeof setNavActive === "function") setNavActive("exam");
          state.route = { hub: "exam", item: ITEM_ID, stage: null };
          saveState();
          renderSentenceExamHub();
          return;
        }
        return previous(hub, itemId);
      };
      wrapped.__sentenceExamWrapped = true;
      openHubItem = wrapped;
    }
  }

  function renderSentenceExamHub() {
    normalizeStateSlice();
    clearCountdown();
    sentenceExamAttempt = null;
    currentTimingItemId = null;
    setExamActive(false);
    const el = mountScreen("Sentence Mastery · Examination Suite", () => goHub("exam"));
    if (!el) return;
    const cards = exams.map((exam) => {
      const record = getRecord(exam.id);
      const unlocked = examUnlocked(exam);
      const retention = exam.retention ? retentionPhase(exam) : null;
      const last = record?.lastResult;
      const status = bandLabel(record, exam);
      let badge = "";
      if (!unlocked) {
        const end = Math.max(...exam.unlockSectionOrders);
        badge = `<div class="sentence-exam-lock">🔒 Complete Sentence section ${end} to unlock</div>`;
      } else if (retention?.phase === "mastered") {
        badge = `<div class="sentence-exam-badge is-mastered">👑 Sentence Mastery retained</div>`;
      } else if (retention?.phase === "open") {
        badge = `<div class="sentence-exam-badge is-retention">Retention confirmation open · 25 items</div>`;
      } else if (retention?.phase === "waiting") {
        const days = Math.max(1, Math.ceil((retention.opensAt - now()) / core.DAY_MS));
        badge = `<div class="sentence-exam-badge">Retention opens in about ${days} day${days === 1 ? "" : "s"}</div>`;
      } else if (retention?.phase === "expired") {
        badge = `<div class="sentence-exam-badge is-expired">Retention window expired · qualify again with a new final</div>`;
      } else if (status) {
        badge = `<div class="sentence-exam-badge">${esc(status)} · best ${Number(record.bestPct || 0).toFixed(1).replace(/\.0$/, "")}%</div>`;
      }
      const prior = last
        ? `<div class="sentence-exam-last">Last: ${esc(last.pct)}% · ${last.correct}/${last.total}${last.mode === "retention" ? " · retention" : ""}</div>`
        : "";
      return `
        <div class="sentence-exam-card${unlocked ? "" : " is-locked"}">
          <button class="sentence-exam-card-main" type="button" data-sentence-exam="${esc(exam.id)}" ${unlocked ? "" : "disabled"}>
            <span class="sentence-exam-card-order">${exam.order}</span>
            <span class="sentence-exam-card-copy">
              <span class="sentence-exam-card-title">${esc(exam.title)}</span>
              <span class="sentence-exam-card-scope">${esc(stageScopeLabel(exam))} · ${exam.itemCount} items · ${exam.timeLimitMinutes} min</span>
            </span>
          </button>
          ${badge}${prior}
          ${last ? `<button class="button subtle compact sentence-exam-last-result" type="button" data-sentence-result="${esc(last.attemptId)}">View last result</button>` : ""}
        </div>`;
    }).join("");
    el.innerHTML = `
      <div class="sentence-exam-hub" data-lesson-motion-root>
        <div class="eyebrow">문장 시험 · Sentence achievement exams</div>
        <h2 class="screen-title" style="margin-bottom:6px;">Sentence Mastery Examination Suite</h2>
        <p class="screen-sub">Five cumulative assessments of the sentence patterns HanaPath has explicitly taught. Four stage exams lead to a final and delayed retention confirmation. No hints, answer feedback, or helper ladder appears before submission.</p>
        <p class="screen-sub sentence-exam-fineprint">Provisional HanaPath achievement standards. These device-local results are not TOPIK or CEFR certification.</p>
        <div class="sentence-exam-list">${cards}</div>
      </div>`;
    el.querySelectorAll("[data-sentence-exam]").forEach((button) => {
      button.addEventListener("click", () => renderSentenceExamIntro(button.dataset.sentenceExam));
    });
    el.querySelectorAll("[data-sentence-result]").forEach((button) => {
      button.addEventListener("click", () => renderStoredSentenceResult(button.dataset.sentenceResult));
    });
  }

  function renderSentenceExamIntro(examId, forcedMode) {
    const exam = getExamById(examId);
    if (!exam || !examUnlocked(exam)) return renderSentenceExamHub();
    const record = getRecord(exam.id);
    const retention = exam.retention ? retentionPhase(exam) : null;
    const mode = forcedMode || (retention?.phase === "open" ? "retention" : "achievement");
    if (mode === "retention" && retention?.phase !== "open") return renderSentenceExamHub();
    const blueprint = mode === "retention" ? engine.resolveBlueprint(exam.id, "retention") : exam;
    const el = mountScreen(exam.title, () => renderSentenceExamHub());
    if (!el) return;
    const typed = Number(blueprint.allocations.P || 0) + Number(blueprint.allocations.F || 0) + Number(blueprint.allocations.X || 0);
    const selected = Number(blueprint.allocations.R || 0) + Number(blueprint.allocations.C || 0);
    const prior = record.attempts
      ? `<div class="sentence-exam-prior">Attempts: ${record.attempts} · Best: ${record.bestPct}%${record.distinguished ? " · Distinction" : record.passed ? " · Passed" : ""}</div>`
      : "";
    const alternateAction = mode === "retention"
      ? `<button class="button secondary" type="button" id="sentenceExamAlternate">Retake the full final instead</button>`
      : (retention?.phase === "open" ? `<button class="button secondary" type="button" id="sentenceExamAlternate">Open retention confirmation</button>` : "");
    el.innerHTML = `
      <div class="lesson-player-wrap alphabet-lesson-player exam-runner sentence-exam-runner" data-lesson-motion-root>
        <div class="exam-question">
          <div class="eyebrow">${mode === "retention" ? "지연 확인 · Retention confirmation" : "성취 시험 · Achievement exam"}</div>
          <h2 class="screen-title" style="margin-bottom:8px;">${esc(blueprint.title)}</h2>
          <p class="screen-sub">${blueprint.itemCount} items · ${blueprint.timeLimitMinutes} minutes · ${typed} typed production · ${selected} selected response.</p>
          <ul class="exam-rules-list sentence-exam-rules">
            <li>Previous, Next, flagging, and a review screen are available before final submission.</li>
            <li>No correctness, hints, accepted variants, answer reveals, or lesson helpers appear before submission.</li>
            <li>Typed responses use strict reviewed Korean spacing and wording.</li>
            <li>Timeout submits the answers currently entered; quitting discards answers but preserves form freshness.</li>
            <li>Practice or testing mode records a score for review but cannot award pass, distinction, qualification, retention, or mastery.</li>
            ${mode === "retention" ? "<li>This form avoids every canonical target from the qualifying final.</li>" : ""}
          </ul>
          <p class="screen-sub sentence-exam-fineprint">${esc(core.DISCLOSURE)}</p>
          ${prior}
        </div>
        <div class="player-actions exam-actions sentence-exam-intro-actions">
          ${alternateAction}
          <button class="button primary" type="button" id="sentenceExamStart">${mode === "retention" ? "Begin retention confirmation" : (record.attempts ? "Retake with a fresh form" : "Begin exam")}</button>
        </div>
      </div>`;
    el.querySelector("#sentenceExamStart")?.addEventListener("click", () => startSentenceExamAttempt(exam.id, mode));
    el.querySelector("#sentenceExamAlternate")?.addEventListener("click", () => renderSentenceExamIntro(exam.id, mode === "retention" ? "achievement" : "retention"));
  }

  function startSentenceExamAttempt(examId, mode, seed) {
    const exam = getExamById(examId);
    if (!exam || !examUnlocked(exam)) return renderSentenceExamHub();
    const record = getRecord(exam.id);
    const useSeed = seed == null ? randomSeed() : String(seed);
    const generatedAt = now();
    const initialFlags = testQueryActive() ? ["__wetest"] : [];
    const initialTaint = taintContext(exam, initialFlags);
    const generationKey = generationKeyForMode(exam.id, mode);
    const options = mode === "retention"
      ? { attemptMode: "retention", qualifyingTargetKeys: record.qualifyingTargetKeys || [] }
      : { freshnessHistory: core.generationHistoryForEngine(state.sentenceExams, exam.id) };
    let generated;
    try {
      generated = engine.generateAttempt(exam.id, useSeed, options);
    } catch (error) {
      return renderSentenceExamUnavailable(exam, error);
    }
    const generationEntry = core.makeGenerationEntry(generated, {
      generatedAt,
      status: initialTaint.status,
      eligibilityRevision: ELIGIBILITY_REVISION,
    });
    core.appendGenerationEntry(state.sentenceExams, generationKey, generationEntry);
    if (!saveState()) {
      core.markGenerationDiscarded(state.sentenceExams, generationKey, generationEntry.generationId);
      return renderSentenceExamUnavailable(exam, new Error("This exam cannot start because generation history could not be saved on this device."));
    }
    clearCountdown();
    const deadline = generatedAt + generated.timeLimitMinutes * 60 * 1000;
    sentenceExamAttempt = {
      exam,
      mode,
      generated,
      generationKey,
      generationId: generationEntry.generationId,
      items: generated.items,
      index: 0,
      answers: {},
      flagged: new Set(),
      startedAt: generatedAt,
      deadline,
      submitted: false,
      result: null,
      stage: "attempt",
      overrideFlags: initialTaint.overrideFlags,
      overrideEventIds: initialTaint.overrideEventIds,
      responseTiming: {},
      timedOut: false,
    };
    setExamActive(true);
    installVisibilityTiming();
    startCountdown();
    motion("forward", 1);
    renderSentenceExamAttempt();
  }

  function renderSentenceExamUnavailable(exam, error) {
    clearCountdown();
    setExamActive(false);
    const el = mountScreen("Sentence exam unavailable", () => renderSentenceExamHub());
    if (!el) return;
    el.innerHTML = `
      <div class="card sentence-exam-error">
        <div class="eyebrow">Fail-closed protection</div>
        <h2 class="screen-title">This form is temporarily unavailable</h2>
        <p class="screen-sub">The reviewed item pool or device persistence could not satisfy the locked exam contract. No attempt was scored.</p>
        <details><summary>Technical detail</summary><pre>${esc(error?.message || "Unknown generation error")}</pre></details>
        <button class="button primary" type="button" id="sentenceExamErrorBack">Back to Sentence exams</button>
      </div>`;
    el.querySelector("#sentenceExamErrorBack")?.addEventListener("click", renderSentenceExamHub);
  }

  function startCountdown() {
    clearCountdown();
    sentenceExamCountdownHandle = window.setInterval(() => {
      const attempt = sentenceExamAttempt;
      if (!attempt || attempt.submitted) return clearCountdown();
      const remaining = attempt.deadline - now();
      const clock = document.getElementById("sentenceExamCountdown");
      if (clock) {
        clock.textContent = formatClock(remaining);
        clock.classList.toggle("exam-countdown-low", remaining <= 5 * 60 * 1000);
      }
      if (remaining <= 0) {
        attempt.timedOut = true;
        clearCountdown();
        submitSentenceExam(true);
      }
    }, 1000);
  }

  function timingDeviceClass() {
    const width = Math.max(document.documentElement?.clientWidth || 0, window.innerWidth || 0);
    return width <= 600 ? "phone" : width <= 1024 ? "tablet" : "desktop";
  }

  function timingViewportBucket() {
    const width = Math.max(document.documentElement?.clientWidth || 0, window.innerWidth || 0);
    return width <= 400 ? "narrow-phone" : width <= 600 ? "phone" : width <= 1024 ? "tablet" : "desktop";
  }

  function ensureTiming(item) {
    if (!sentenceExamAttempt.responseTiming[item.itemId]) {
      sentenceExamAttempt.responseTiming[item.itemId] = {
        itemId: item.itemId,
        mode: item.mode,
        primaryStrand: item.primaryStrand,
        firstShownAt: null,
        lastShownAt: null,
        answerFirstChangedAt: null,
        answerLastChangedAt: null,
        submittedAt: null,
        activeVisibleMs: 0,
        visitCount: 0,
        answerChangeCount: 0,
        answerLength: 0,
        wasBlank: true,
        timedOut: false,
        deviceClass: timingDeviceClass(),
        viewportBucket: timingViewportBucket(),
        inputMethod: "unknown",
        _activeSince: null,
      };
    }
    return sentenceExamAttempt.responseTiming[item.itemId];
  }

  function closeCurrentTiming(at = now()) {
    if (!sentenceExamAttempt || !currentTimingItemId) return;
    const timing = sentenceExamAttempt.responseTiming[currentTimingItemId];
    if (timing && Number.isFinite(timing._activeSince)) {
      timing.activeVisibleMs += Math.max(0, at - timing._activeSince);
      timing._activeSince = null;
      timing.lastShownAt = at;
    }
    currentTimingItemId = null;
  }

  function openTiming(item, at = now()) {
    closeCurrentTiming(at);
    const timing = ensureTiming(item);
    if (timing.firstShownAt == null) timing.firstShownAt = at;
    timing.lastShownAt = at;
    timing.visitCount += 1;
    if (!document.hidden) timing._activeSince = at;
    currentTimingItemId = item.itemId;
  }

  function noteAnswerChange(item, value, inputMethod) {
    const timing = ensureTiming(item);
    const at = now();
    if (timing.answerFirstChangedAt == null) timing.answerFirstChangedAt = at;
    timing.answerLastChangedAt = at;
    timing.answerChangeCount += 1;
    timing.answerLength = String(value == null ? "" : value).length;
    timing.wasBlank = String(value == null ? "" : value).trim() === "";
    if (inputMethod && timing.inputMethod === "unknown") timing.inputMethod = inputMethod;
  }

  function installVisibilityTiming() {
    if (installVisibilityTiming.installed) return;
    installVisibilityTiming.installed = true;
    document.addEventListener("visibilitychange", () => {
      if (!sentenceExamAttempt || sentenceExamAttempt.submitted || !currentTimingItemId) return;
      const timing = sentenceExamAttempt.responseTiming[currentTimingItemId];
      const at = now();
      if (document.hidden) {
        if (timing && Number.isFinite(timing._activeSince)) {
          timing.activeVisibleMs += Math.max(0, at - timing._activeSince);
          timing._activeSince = null;
        }
      } else if (timing && timing._activeSince == null) {
        timing._activeSince = at;
      }
    });
  }

  function renderSentenceExamAttempt() {
    const attempt = sentenceExamAttempt;
    if (!attempt) return renderSentenceExamHub();
    if (attempt.stage === "review") return renderSentenceExamReview();
    if (attempt.stage === "results") return renderSentenceExamResult();
    const item = attempt.items[attempt.index];
    if (!item) {
      attempt.stage = "review";
      return renderSentenceExamReview();
    }
    const el = mountScreen(attempt.exam.title, () => showSentenceExamQuitConfirm(() => renderSentenceExamHub()));
    if (!el) return;
    openTiming(item);
    const current = attempt.answers[item.itemId];
    const flagged = attempt.flagged.has(item.itemId);
    let interaction;
    if (item.mode === "typed") {
      interaction = `
        <label class="sentence-exam-input-label" for="sentenceExamInput">Your Korean answer</label>
        <textarea class="sentence-input exam-input sentence-exam-input" id="sentenceExamInput" rows="3" autocomplete="off" autocapitalize="off" spellcheck="false" lang="ko" placeholder="한국어로 입력">${esc(current || "")}</textarea>`;
    } else {
      interaction = `<div class="quiz-options exam-options sentence-exam-options">${item.options.map((option, index) => `
        <button class="option exam-option${current === option ? " exam-selected" : ""}" type="button" data-sentence-option="${esc(option)}">
          <span class="exam-option-mark" aria-hidden="true">${index + 1}</span>
          <span class="exam-option-text">${esc(option)}</span>
        </button>`).join("")}</div>`;
    }
    el.innerHTML = `
      <div class="lesson-player-wrap alphabet-lesson-player exam-runner sentence-exam-runner" data-lesson-motion-root>
        <div class="player-head exam-head">${sentenceProgressHtml(core.STRAND_LABELS[item.primaryStrand] || item.primaryStrand, `Question ${attempt.index + 1} of ${attempt.items.length}`)}</div>
        <div class="exam-question sentence-exam-question">
          <div class="word-exam-flag-row">
            <button class="button subtle compact word-exam-flag${flagged ? " is-flagged" : ""}" type="button" id="sentenceExamFlag">${flagged ? "🚩 Flagged" : "⚑ Flag for review"}</button>
          </div>
          <div class="sentence-exam-mode">${item.mode === "typed" ? "Typed production" : "Selected response"} · ${esc(item.primaryStrand)}</div>
          <h3 class="exam-prompt sentence-exam-prompt">${esc(item.promptEn)}</h3>
          ${interaction}
        </div>
        <div class="player-actions exam-actions word-exam-nav sentence-exam-nav">
          <button class="button secondary" type="button" id="sentenceExamPrev" ${attempt.index === 0 ? "disabled" : ""}>← Previous</button>
          <button class="button secondary compact" type="button" id="sentenceExamReview">Review</button>
          <button class="button primary" type="button" id="sentenceExamNext">${attempt.index === attempt.items.length - 1 ? "Review & submit" : "Next →"}</button>
        </div>
      </div>`;
    if (item.mode === "typed") {
      const input = el.querySelector("#sentenceExamInput");
      input.addEventListener("compositionstart", () => { composing = true; ensureTiming(item).inputMethod = "korean-ime"; });
      input.addEventListener("compositionend", () => {
        composing = false;
        attempt.answers[item.itemId] = input.value;
        noteAnswerChange(item, input.value, "korean-ime");
      });
      input.addEventListener("input", () => {
        attempt.answers[item.itemId] = input.value;
        if (!composing) noteAnswerChange(item, input.value, "hardware");
      });
      window.setTimeout(() => { try { input.focus(); } catch (_) {} }, 100);
    } else {
      el.querySelectorAll("[data-sentence-option]").forEach((button) => {
        button.addEventListener("click", () => {
          attempt.answers[item.itemId] = button.dataset.sentenceOption;
          noteAnswerChange(item, button.dataset.sentenceOption, "tile-fallback");
          el.querySelectorAll("[data-sentence-option]").forEach((candidate) => candidate.classList.toggle("exam-selected", candidate === button));
        });
      });
    }
    el.querySelector("#sentenceExamFlag")?.addEventListener("click", () => {
      if (attempt.flagged.has(item.itemId)) attempt.flagged.delete(item.itemId); else attempt.flagged.add(item.itemId);
      renderSentenceExamAttempt();
    });
    el.querySelector("#sentenceExamPrev")?.addEventListener("click", () => {
      if (attempt.index > 0) {
        attempt.index -= 1;
        motion("back", -1);
        renderSentenceExamAttempt();
      }
    });
    el.querySelector("#sentenceExamReview")?.addEventListener("click", () => {
      attempt.stage = "review";
      motion("forward", 1);
      renderSentenceExamReview();
    });
    el.querySelector("#sentenceExamNext")?.addEventListener("click", () => {
      if (attempt.index < attempt.items.length - 1) {
        attempt.index += 1;
        motion("forward", 1);
        renderSentenceExamAttempt();
      } else {
        attempt.stage = "review";
        motion("forward", 1);
        renderSentenceExamReview();
      }
    });
  }

  function answered(attempt, item) {
    const value = attempt.answers[item.itemId];
    return value != null && String(value).trim() !== "";
  }

  function renderSentenceExamReview() {
    const attempt = sentenceExamAttempt;
    if (!attempt) return renderSentenceExamHub();
    closeCurrentTiming();
    const el = mountScreen("답안 확인 · Review", () => showSentenceExamQuitConfirm(() => renderSentenceExamHub()));
    if (!el) return;
    const answeredCount = attempt.items.filter((item) => answered(attempt, item)).length;
    const rows = attempt.items.map((item, index) => {
      const done = answered(attempt, item);
      const flagged = attempt.flagged.has(item.itemId);
      return `
        <button class="word-exam-review-row${done ? "" : " is-unanswered"}${flagged ? " is-flagged" : ""}" type="button" data-sentence-review-index="${index}">
          <span class="word-exam-review-num">${index + 1}</span>
          <span class="word-exam-review-state">${done ? "Answered" : "Not answered"}${flagged ? " · 🚩" : ""}</span>
          <span class="word-exam-review-strand">${esc(core.STRAND_LABELS[item.primaryStrand] || item.primaryStrand)}</span>
        </button>`;
    }).join("");
    el.innerHTML = `
      <div class="lesson-player-wrap alphabet-lesson-player exam-runner sentence-exam-runner" data-lesson-motion-root>
        <div class="player-head exam-head">${sentenceProgressHtml("Review", "답안 확인 · Review")}</div>
        <div class="exam-question">
          <div class="eyebrow">답안 확인 · Review before submitting</div>
          <h2 class="exam-part-title">${answeredCount} answered · ${attempt.items.length - answeredCount} unanswered</h2>
          <p class="screen-sub">Tap any item to return to it. Unanswered items score zero. No correct answers or accepted variants are shown before submission.</p>
          <div class="word-exam-review-list">${rows}</div>
        </div>
        <div class="player-actions exam-actions word-exam-nav">
          <button class="button secondary" type="button" id="sentenceExamBackItems">← Back to questions</button>
          <button class="button primary" type="button" id="sentenceExamSubmit">최종 제출 · Submit exam</button>
        </div>
      </div>`;
    el.querySelectorAll("[data-sentence-review-index]").forEach((button) => {
      button.addEventListener("click", () => {
        attempt.index = Number(button.dataset.sentenceReviewIndex);
        attempt.stage = "attempt";
        motion("back", -1);
        renderSentenceExamAttempt();
      });
    });
    el.querySelector("#sentenceExamBackItems")?.addEventListener("click", () => {
      attempt.stage = "attempt";
      motion("back", -1);
      renderSentenceExamAttempt();
    });
    el.querySelector("#sentenceExamSubmit")?.addEventListener("click", () => confirmSentenceExamSubmit(attempt.items.length - answeredCount));
  }

  function confirmSentenceExamSubmit(unanswered) {
    if (unanswered <= 0) return submitSentenceExam(false);
    if (document.getElementById("sentenceExamConfirmOverlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "sentenceExamConfirmOverlay";
    overlay.className = "exam-quit-overlay";
    overlay.innerHTML = `
      <div class="exam-quit-dialog" role="alertdialog" aria-modal="true" aria-labelledby="sentenceSubmitTitle">
        <h3 id="sentenceSubmitTitle">제출하시겠습니까? · Submit now?</h3>
        <p>${unanswered} item${unanswered === 1 ? " is" : "s are"} unanswered and will score zero. Answers cannot be changed after submission.</p>
        <div class="exam-quit-actions">
          <button class="button secondary" type="button" id="sentenceSubmitCancel">Keep reviewing</button>
          <button class="button primary" type="button" id="sentenceSubmitGo">Submit exam</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#sentenceSubmitCancel")?.addEventListener("click", () => overlay.remove());
    overlay.querySelector("#sentenceSubmitGo")?.addEventListener("click", () => { overlay.remove(); submitSentenceExam(false); });
  }

  function qualifierIsValid(exam, record) {
    const id = record?.qualifyingAttemptId;
    const qualifier = id && typeof getExamResultRecord === "function" ? getExamResultRecord(id) : null;
    return Boolean(qualifier)
      && qualifier.status === "hanaPath"
      && qualifier.legacyProvenanceStatus == null
      && qualifier.examId === exam.id
      && qualifier.blueprintVersion === getMeta().blueprintVersion
      && qualifier.contentBankRevision === getMeta().contentBankRevision
      && Array.isArray(record.qualifyingTargetKeys)
      && record.qualifyingTargetKeys.length > 0;
  }

  function finalizeTiming(submittedAt, auto) {
    closeCurrentTiming(submittedAt);
    const attempt = sentenceExamAttempt;
    for (const item of attempt.items) {
      const timing = ensureTiming(item);
      const answer = attempt.answers[item.itemId];
      timing.submittedAt = submittedAt;
      timing.answerLength = String(answer == null ? "" : answer).length;
      timing.wasBlank = String(answer == null ? "" : answer).trim() === "";
      timing.timedOut = Boolean(auto);
      delete timing._activeSince;
    }
  }

  function answerReviewRows(attempt, graded) {
    const byId = new Map(graded.items.map((item) => [item.itemId, item]));
    return attempt.items.map((item) => {
      const score = byId.get(item.itemId) || { correct: false, diagnostics: ["unclassified"] };
      const given = attempt.answers[item.itemId];
      return {
        itemId: item.itemId,
        sourceEntryId: item.sourceEntryId,
        sourceLessonIds: item.sourceLessonIds.slice(),
        primaryStrand: item.primaryStrand,
        mode: item.mode,
        promptEn: item.promptEn,
        candidateAnswer: given == null ? "" : String(given),
        canonicalAnswer: item.canonicalAnswer,
        acceptedAlternatives: item.manualAlternatives.slice(),
        recognitionAnswerEn: item.answerContract?.recognitionAnswerEn || null,
        correct: score.correct === true,
        diagnostics: Array.isArray(score.diagnostics) ? score.diagnostics.slice() : [],
      };
    });
  }

  function submitSentenceExam(auto) {
    const attempt = sentenceExamAttempt;
    if (!attempt || attempt.submitted) return;
    attempt.submitted = true;
    attempt.timedOut = Boolean(auto);
    setExamActive(false);
    clearCountdown();
    if (typeof stopSpeech === "function") stopSpeech();
    const submittedAt = now();
    finalizeTiming(submittedAt, auto);
    const graded = engine.gradeAttempt(attempt.generated, attempt.answers);
    graded.unanswered = attempt.items.filter((item) => !answered(attempt, item)).length;
    const bands = core.evaluateBands(attempt.exam, graded, attempt.mode, attempt.items);
    const record = getRecord(attempt.exam.id);
    const submitFlags = testQueryActive() ? ["__wetest"] : [];
    const submitTaint = taintContext(attempt.exam, submitFlags);
    let overrideFlags = [...new Set([...(attempt.overrideFlags || []), ...(submitTaint.overrideFlags || [])])];
    const overrideEventIds = [...new Set([...(attempt.overrideEventIds || []), ...(submitTaint.overrideEventIds || [])])];
    let qualifyingAttemptId = null;
    if (attempt.mode === "retention") {
      qualifyingAttemptId = record.qualifyingAttemptId;
      if (!qualifierIsValid(attempt.exam, record)) overrideFlags = [...new Set([...overrideFlags, "retention-qualifier-invalid"])];
      const overlap = attempt.generated.targetKeys.filter((key) => (record.qualifyingTargetKeys || []).includes(key));
      if (overlap.length) overrideFlags = [...new Set([...overrideFlags, "retention-target-overlap"])];
    }
    const status = overrideFlags.length || overrideEventIds.length ? "practice" : "hanaPath";
    const attemptId = typeof makeExamAttemptId === "function" ? makeExamAttemptId() : `attempt-${Date.now()}-${Math.random()}`;
    const recordBeforeUpdate = core.clone(record);
    const achievement = core.updateAchievementRecord(record, {
      result: graded,
      bands,
      mode: attempt.mode,
      status,
      now: submittedAt,
      attemptId,
      attempt: attempt.generated,
      exam: attempt.exam,
    });
    const answerReview = answerReviewRows(attempt, graded);
    const floorDetails = {
      mode: attempt.mode,
      auto: Boolean(auto),
      passed: bands.passed,
      distinguished: bands.distinguished,
      masteryQualified: bands.masteryQualified,
      typed: bands.typed,
      production: bands.production,
      form: bands.form,
      context: bands.context,
      formContext: bands.formContext,
      twoSectionBands: bands.twoSectionBands,
    };
    const resultRecord = core.buildResultRecord({
      attemptId,
      examId: attempt.exam.id,
      attemptMode: attempt.mode,
      blueprintVersion: attempt.generated.blueprintVersion,
      engineVersion: attempt.generated.engineRevision || attempt.generated.engineVersion,
      generationSeed: attempt.generated.resolvedSeed,
      contentBankRevision: attempt.generated.contentBankRevision,
      eligibilityRevision: ELIGIBILITY_REVISION,
      generatedAt: attempt.startedAt,
      submittedAt,
      durationSeconds: Math.max(0, Math.round((submittedAt - attempt.startedAt) / 1000)),
      scopeSectionIds: scopeSectionIds(attempt.exam),
      itemCount: graded.total,
      scoreSummary: { correct: graded.correct, total: graded.total, pct: Math.round(graded.pct * 10) / 10, unanswered: graded.unanswered },
      floorSummary: { passed: bands.passed, distinguished: bands.distinguished, details: floorDetails },
      status,
      overrideFlags,
      overrideEventIds,
      qualifyingAttemptId: attempt.mode === "retention" && status === "hanaPath" ? qualifyingAttemptId : null,
      retentionAttemptId: achievement.mastered ? attemptId : null,
      generationId: attempt.generationId,
      answerReview,
      responseTiming: attempt.responseTiming,
    });
    const integrity = window.HANAPATH_EXAM_INTEGRITY;
    if (integrity && typeof integrity.fingerprint === "function") {
      resultRecord.checksum = integrity.fingerprint({ ...resultRecord, checksum: null });
    }
    if (typeof writeExamResultRecord === "function") writeExamResultRecord(attemptId, resultRecord);
    core.markGenerationSubmitted(state.sentenceExams, attempt.generationKey, attempt.generationId, attemptId);
    if (status === "hanaPath" && attempt.mode === "retention" && qualifyingAttemptId && typeof appendExamResultRelation === "function") {
      appendExamResultRelation({ type: "retention", fromAttemptId: qualifyingAttemptId, toAttemptId: attemptId });
    }
    if (!saveState()) {
      overrideFlags = [...new Set([...overrideFlags, "persistence-failed"])];
      state.sentenceExams.byExamId[attempt.exam.id] = recordBeforeUpdate;
      if (state.examResults && state.examResults.byAttemptId) delete state.examResults.byAttemptId[attemptId];
      resultRecord.status = "practice";
      resultRecord.overrideFlags = overrideFlags;
      attempt.result = { graded, bands, status: "practice", isPractice: true, attemptId, resultRecord, persistenceFailed: true };
    } else {
      attempt.result = { graded, bands, status, isPractice: status === "practice", attemptId, resultRecord, achievement };
    }
    attempt.stage = "results";
    motion("forward", 1);
    renderSentenceExamResult();
  }

  function evidenceHtml(bucket) {
    const evidence = core.subscoreEvidence(bucket.correct, bucket.total);
    const detail = evidence.pct == null ? evidence.label : `${evidence.pct}%`;
    return `${esc(detail)} · ${bucket.correct}/${bucket.total}`;
  }

  function strandProfileHtml(attempt, graded) {
    return STRAND_ORDER.map((code) => {
      const bucket = graded.strand[code] || { correct: 0, total: 0 };
      return `<div class="word-exam-macro-row"><span class="word-exam-macro-name">${esc(core.STRAND_LABELS[code])}</span><span class="word-exam-macro-score">${evidenceHtml(bucket)}</span></div>`;
    }).join("");
  }

  function bandProfileHtml(bands) {
    return Object.entries(bands.twoSectionBands).map(([key, bucket]) => {
      if (!bucket.total) return "";
      const number = key.split("-")[1];
      return `<div class="word-exam-macro-row"><span class="word-exam-macro-name">Sections ${Number(number) * 2 - 1}–${Number(number) * 2}</span><span class="word-exam-macro-score">${evidenceHtml(bucket)}</span></div>`;
    }).join("");
  }

  function patternProfileHtml(attempt, graded) {
    const byId = new Map(graded.items.map((item) => [item.itemId, item]));
    const tags = new Map();
    for (const item of attempt.items) {
      for (const tag of item.patternTags || []) {
        const bucket = tags.get(tag) || { correct: 0, total: 0 };
        bucket.total += 1;
        if (byId.get(item.itemId)?.correct) bucket.correct += 1;
        tags.set(tag, bucket);
      }
    }
    const rows = [...tags.entries()]
      .filter(([, bucket]) => bucket.total >= 4)
      .sort((left, right) => (left[1].correct / left[1].total) - (right[1].correct / right[1].total) || right[1].total - left[1].total)
      .slice(0, 12)
      .map(([tag, bucket]) => `<div class="sentence-exam-pattern-row"><span>${esc(tag)}</span><span>${evidenceHtml(bucket)}</span></div>`)
      .join("");
    return rows ? `<div class="sentence-exam-pattern-profile"><div class="word-exam-weak-title">Pattern evidence</div>${rows}</div>` : "";
  }

  function weakRoutesHtml(attempt, graded) {
    const scored = new Map(graded.items.map((item) => [item.itemId, item]));
    const routes = [];
    const seen = new Set();
    for (const item of attempt.items) {
      if (scored.get(item.itemId)?.correct) continue;
      for (const lessonId of item.sourceLessonIds || []) {
        if (!seen.has(lessonId)) {
          seen.add(lessonId);
          routes.push({ lessonId, prompt: item.promptEn });
          if (routes.length === 3) break;
        }
      }
      if (routes.length === 3) break;
    }
    if (!routes.length) return "";
    return `<div class="word-exam-weak"><div class="word-exam-weak-title">Weak routes · return to the exact lesson</div>${routes.map((route) => `<button class="button secondary compact" type="button" data-sentence-weak-route="${esc(route.lessonId)}">Review lesson ${esc(route.lessonId)} →</button>`).join("")}</div>`;
  }

  function fullReviewHtml(review) {
    const rows = (Array.isArray(review) ? review : []).map((item, index) => {
      const candidate = item.candidateAnswer && item.candidateAnswer.trim() ? item.candidateAnswer : "— (blank)";
      const correct = item.mode === "recognition" ? item.recognitionAnswerEn : item.canonicalAnswer;
      const alternatives = item.mode === "typed" && item.acceptedAlternatives.length
        ? `<div class="sentence-exam-review-alts">Reviewed alternatives: ${item.acceptedAlternatives.map(esc).join(" / ")}</div>`
        : "";
      const diagnostics = !item.correct && item.diagnostics.length
        ? `<div class="sentence-exam-review-diagnostics">${item.diagnostics.map(esc).join(" · ")}</div>`
        : "";
      return `
        <div class="exam-review-row ${item.correct ? "is-correct" : "is-wrong"}">
          <span class="exam-review-mark" aria-hidden="true">${item.correct ? "✓" : "✗"}</span>
          <div class="exam-review-body">
            <div class="exam-review-prompt">${index + 1}. ${esc(item.promptEn)}</div>
            <div class="exam-review-answers"><span class="exam-review-given" lang="ko">Your answer: ${esc(candidate)}</span><span class="exam-review-correct">Correct: ${esc(correct)}</span></div>
            ${alternatives}${diagnostics}
          </div>
        </div>`;
    }).join("");
    return `<details class="exam-review-part sentence-exam-full-review"><summary><span>답안 확인 · Full answer review</span><span class="exam-review-part-score">${review.filter((item) => item.correct).length}/${review.length}</span></summary><div class="exam-review-list">${rows}</div></details>`;
  }

  function qualificationNote(attempt) {
    const record = getRecord(attempt.exam.id);
    if (!attempt.exam.retention) return "";
    if (record.masteryEarnedAt) return `<div class="word-exam-retention-note">${esc(core.MASTERY_LINE)}</div>`;
    if (attempt.mode === "retention") return "";
    const phase = retentionPhase(attempt.exam);
    if (phase.phase === "waiting") {
      const days = Math.max(1, Math.ceil((phase.opensAt - now()) / core.DAY_MS));
      return `<div class="word-exam-retention-note">Mastery qualification earned. The 25-item retention confirmation opens in about ${days} day${days === 1 ? "" : "s"} and remains open for ${attempt.exam.retention.expiresAfterDays} days.</div>`;
    }
    return "";
  }

  function renderSentenceExamResult() {
    const attempt = sentenceExamAttempt;
    if (!attempt || !attempt.result) return renderSentenceExamHub();
    const el = mountScreen("시험 결과 · Results", () => { sentenceExamAttempt = null; renderSentenceExamHub(); });
    if (!el) return;
    const { graded, bands, isPractice, attemptId, resultRecord } = attempt.result;
    const record = getRecord(attempt.exam.id);
    let tone = "neutral";
    let icon = "spark";
    let eyebrow = "아직 합격 전 · Not yet passed";
    let title = "Keep going";
    let copy = "Review the weakest sentence patterns below, then try a fresh form.";
    if (isPractice) {
      eyebrow = "연습 · Practice";
      title = "Practice result";
      copy = "This score is available for review but does not count toward passing, distinction, qualification, retention, or mastery.";
    } else if (attempt.mode === "retention" && bands.passed && record.masteryEarnedAt) {
      tone = "crown"; icon = "crown"; eyebrow = "문장 완전 습득 · Sentence Mastery"; title = "Sentence Mastery retained"; copy = core.MASTERY_LINE;
    } else if (bands.distinguished) {
      tone = "success"; icon = "check"; eyebrow = "우수 · Distinction"; title = "Distinction"; copy = "Strong, balanced production across the taught Sentence curriculum.";
    } else if (bands.passed) {
      tone = "success"; icon = "check"; eyebrow = "합격 · Passed"; title = attempt.mode === "retention" ? "Retention confirmed" : "Exam passed"; copy = "You cleared the provisional HanaPath achievement standard for this paper.";
    }
    const duration = formatClock(resultRecord.durationSeconds * 1000);
    const detailsHtml = `
      ${typeof examProvenanceCardHtml === "function" ? examProvenanceCardHtml(typeof getExamResultRecord === "function" ? getExamResultRecord(attemptId) : resultRecord) : ""}
      <div class="sentence-exam-disclosure">${esc(core.DISCLOSURE)}</div>
      ${qualificationNote(attempt)}
      <div class="word-exam-macro-profile"><div class="word-exam-weak-title">Typed-production profile</div><div class="word-exam-macro-row"><span class="word-exam-macro-name">P + F + X</span><span class="word-exam-macro-score">${evidenceHtml(bands.typed)}</span></div></div>
      <div class="word-exam-macro-profile"><div class="word-exam-weak-title">Macrostrand profile</div>${strandProfileHtml(attempt, graded)}</div>
      <div class="word-exam-macro-profile"><div class="word-exam-weak-title">Two-section bands</div>${bandProfileHtml(bands)}</div>
      ${patternProfileHtml(attempt, graded)}
      ${weakRoutesHtml(attempt, graded)}
      ${fullReviewHtml(resultRecord.answerReview)}`;
    const actionsHtml = `
      <button class="button primary" type="button" id="sentenceExamRetake">${attempt.mode === "retention" ? "Retake retention confirmation" : "Retake with a fresh form"}</button>
      <button class="button secondary" type="button" id="sentenceExamBackHub">Back to Sentence exams</button>`;
    if (typeof premiumCompletionHtml === "function") {
      el.innerHTML = premiumCompletionHtml({
        tone, icon, eyebrow, title, copy,
        score: { value: `${Math.round(graded.pct * 10) / 10}%`, label: isPractice ? "Practice score" : bands.passed ? (bands.distinguished ? "Distinction" : "Passed") : "Achievement score" },
        stats: [
          { value: `${graded.correct}/${graded.total}`, label: "Correct" },
          { value: evidenceHtml(bands.typed), label: "Typed production" },
          { value: duration, label: "Time used" },
          { value: `${graded.unanswered}`, label: "Unanswered" },
        ],
        detailsHtml, actionsHtml, celebrate: !isPractice && bands.passed, className: "exam-completion sentence-exam-completion",
      });
    } else {
      el.innerHTML = `<div class="card"><h2>${esc(title)}</h2><p>${esc(copy)}</p>${detailsHtml}${actionsHtml}</div>`;
    }
    el.querySelectorAll("[data-sentence-weak-route]").forEach((button) => {
      button.addEventListener("click", () => {
        sentenceExamAttempt = null;
        if (typeof openSentenceLesson === "function") openSentenceLesson(button.dataset.sentenceWeakRoute);
      });
    });
    el.querySelector("#sentenceExamRetake")?.addEventListener("click", () => startSentenceExamAttempt(attempt.exam.id, attempt.mode));
    el.querySelector("#sentenceExamBackHub")?.addEventListener("click", () => { sentenceExamAttempt = null; renderSentenceExamHub(); });
  }

  function renderStoredSentenceResult(attemptId) {
    const record = typeof getExamResultRecord === "function" ? getExamResultRecord(attemptId) : null;
    if (!record || !String(record.examId || "").startsWith("sentence-exam-")) return renderSentenceExamHub();
    const el = mountScreen("Stored Sentence result", () => renderSentenceExamHub());
    if (!el) return;
    const review = Array.isArray(record.answerReview) ? record.answerReview : [];
    el.innerHTML = `
      <div class="card sentence-exam-stored-result">
        <div class="eyebrow">${esc(record.status === "practice" ? "Practice result" : "HanaPath result")}</div>
        <h2 class="screen-title">${esc(record.examId)} · ${esc(record.scoreSummary?.pct)}%</h2>
        ${typeof examProvenanceCardHtml === "function" ? examProvenanceCardHtml(record) : ""}
        <div class="sentence-exam-disclosure">${esc(core.DISCLOSURE)}</div>
        ${review.length ? fullReviewHtml(review) : "<p class=\"screen-sub\">No stored answer review is available for this result.</p>"}
        <button class="button primary" type="button" id="sentenceStoredBack">Back to Sentence exams</button>
      </div>`;
    el.querySelector("#sentenceStoredBack")?.addEventListener("click", renderSentenceExamHub);
  }

  function discardSentenceAttempt() {
    if (!sentenceExamAttempt) return;
    core.markGenerationDiscarded(state.sentenceExams, sentenceExamAttempt.generationKey, sentenceExamAttempt.generationId);
    saveState();
    closeCurrentTiming();
    clearCountdown();
    sentenceExamAttempt = null;
    setExamActive(false);
  }

  function showSentenceExamQuitConfirm(onProceed) {
    if (!sentenceExamAttempt || sentenceExamAttempt.submitted) {
      if (typeof onProceed === "function") onProceed();
      return;
    }
    if (document.getElementById("sentenceExamQuitOverlay")) return;
    const overlay = document.createElement("div");
    overlay.id = "sentenceExamQuitOverlay";
    overlay.className = "exam-quit-overlay";
    overlay.innerHTML = `
      <div class="exam-quit-dialog" role="alertdialog" aria-modal="true" aria-labelledby="sentenceQuitTitle">
        <h3 id="sentenceQuitTitle">시험을 종료하시겠습니까? · Quit the exam?</h3>
        <p>Leaving discards candidate answers. This generated form remains in freshness history so quitting cannot recycle its targets immediately.</p>
        <div class="exam-quit-actions">
          <button class="button secondary" type="button" id="sentenceQuitCancel">Resume exam</button>
          <button class="button exam-quit-discard" type="button" id="sentenceQuitGo">Quit &amp; discard</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("#sentenceQuitCancel")?.addEventListener("click", () => overlay.remove());
    overlay.querySelector("#sentenceQuitGo")?.addEventListener("click", () => {
      overlay.remove();
      discardSentenceAttempt();
      if (typeof onProceed === "function") onProceed();
    });
  }

  function wrapQuitInterceptor() {
    if (typeof requestExamQuit !== "function" || requestExamQuit.__sentenceExamWrapped === true) return;
    const previous = requestExamQuit;
    const wrapped = function wrappedRequestExamQuit(onProceed) {
      if (sentenceExamAttempt && !sentenceExamAttempt.submitted) return showSentenceExamQuitConfirm(onProceed);
      return previous(onProceed);
    };
    wrapped.__sentenceExamWrapped = true;
    requestExamQuit = wrapped;
  }

  function installTestHook() {
    if (!testQueryActive()) return;
    window.__sentenceExamTest = {
      openHub: renderSentenceExamHub,
      openIntro: renderSentenceExamIntro,
      startAttempt: startSentenceExamAttempt,
      attempt: () => sentenceExamAttempt,
      submitNow: (auto) => submitSentenceExam(Boolean(auto)),
      setNow: (value) => { window.__SENTENCE_EXAM_NOW = value; },
      record: getRecord,
      state: () => state.sentenceExams,
      sentenceProgress: () => core.clone(getSentencesProgress()),
      unlockThrough(order) {
        const progress = getSentencesProgress();
        const allowed = new Set(getSentenceSections().filter((section) => section.order <= order).map((section) => section.id));
        for (const unit of getSentenceUnits()) {
          if (allowed.has(unit.sectionId) && unit.checkpointId && !progress.completedLessons.includes(unit.checkpointId)) {
            progress.completedLessons.push(unit.checkpointId);
          }
        }
        saveState();
        if (typeof refreshProgressionState === "function") refreshProgressionState();
      },
      answerAllCorrect() {
        if (!sentenceExamAttempt) return;
        for (const item of sentenceExamAttempt.items) {
          sentenceExamAttempt.answers[item.itemId] = item.mode === "typed"
            ? item.canonicalAnswer
            : item.answerContract.recognitionAnswerEn;
        }
      },
      discard: discardSentenceAttempt,
    };
  }

  normalizeStateSlice();
  installHubEntry();
  wrapQuitInterceptor();
  installTestHook();
})();
