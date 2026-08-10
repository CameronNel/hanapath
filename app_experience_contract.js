// HanaPath learner-experience contract fixes layered after app.js.
//
// This file deliberately contains only browser-shell policy that must wrap the
// monolithic app without changing curriculum data: accessible one-time Korean
// keyboard guidance, live-derived Progress statistics, browser/PWA back
// behavior, and neutral structural surfaces. It loads after app.js so the
// existing global entry points can be tightened in one small, auditable surface.
(function installHanaPathExperienceContract() {
  "use strict";

  // Structural containers stay neutral. Accent belongs on controls, progress,
  // focus, and feedback, not as a diffuse bloom leaking through translucent
  // lesson cards. Keep this late override until the underlying stylesheet rule
  // is removed when the stacked visual packet is flattened for merge.
  const surfacePolicy = document.createElement("style");
  surfacePolicy.id = "hanapath-experience-surface-policy";
  surfacePolicy.textContent = `
    .alphabet-lesson-player {
      background: var(--panel);
    }
  `;
  document.head.appendChild(surfacePolicy);

  // -------------------------------------------------------------------------
  // One-time Korean keyboard recommendation: accessible modal semantics,
  // explicit dismissal only, keyboard focus trap, Escape, and focus restore.
  // -------------------------------------------------------------------------
  showKoreanKeyboardRecommendationModal = function showKoreanKeyboardRecommendationModalAccessible() {
    if (state.hasSeenKoreanKeyboardModal) return;
    state.hasSeenKoreanKeyboardModal = true;
    saveState();

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const overlay = document.createElement("div");
    overlay.className = "korean-keyboard-modal-overlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.65);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity 180ms ease;";
    overlay.innerHTML = `
      <div class="korean-keyboard-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="koreanKeyboardModalTitle" aria-describedby="koreanKeyboardModalCopy" tabindex="-1" style="background:var(--card-bg, #18181b);border:1px solid var(--border-color, rgba(255,255,255,0.15));border-radius:16px;padding:24px;max-width:380px;width:100%;box-shadow:0 20px 40px rgba(0,0,0,0.5);text-align:center;position:relative;">
        <button class="korean-keyboard-modal-close" type="button" aria-label="Close Korean keyboard recommendation" style="position:absolute;top:12px;right:12px;background:none;border:none;color:var(--text-muted, #a1a1aa);font-size:20px;cursor:pointer;padding:4px 8px;line-height:1;">✕</button>
        <div style="font-size:28px;margin-bottom:12px;" aria-hidden="true">⌨️</div>
        <h3 id="koreanKeyboardModalTitle" style="font-size:18px;font-weight:600;margin-bottom:8px;color:var(--text-color, #f4f4f5);">Korean Keyboard Recommended</h3>
        <p id="koreanKeyboardModalCopy" style="font-size:14px;color:var(--text-sub, #a1a1aa);line-height:1.5;margin-bottom:16px;">We recommend enabling the Korean keyboard on your device for the best learning experience.</p>
        <button class="button primary compact korean-keyboard-modal-ok" type="button" style="width:100%;">Got it</button>
      </div>
    `;

    const dialog = overlay.querySelector(".korean-keyboard-modal-dialog");
    const closeButton = overlay.querySelector(".korean-keyboard-modal-close");
    const okButton = overlay.querySelector(".korean-keyboard-modal-ok");
    const focusables = [closeButton, okButton].filter(Boolean);
    let dismissed = false;

    const restoreFocus = () => {
      if (previousFocus && previousFocus.isConnected && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dismiss();
        return;
      }
      if (event.key !== "Tab" || focusables.length < 2) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;
      document.removeEventListener("keydown", onKeyDown, true);
      overlay.style.opacity = "0";
      window.setTimeout(() => {
        overlay.remove();
        restoreFocus();
      }, 180);
    };

    closeButton?.addEventListener("click", dismiss);
    okButton?.addEventListener("click", dismiss);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) dismiss();
    });
    document.addEventListener("keydown", onKeyDown, true);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      (okButton || dialog)?.focus();
    });
  };

  // -------------------------------------------------------------------------
  // Progress: every denominator comes from the live browser globals/helpers.
  // Only immutable, full-provenance HanaPath exam results count as passed;
  // Practice and legacy-incomplete compatibility wrappers never do.
  // -------------------------------------------------------------------------
  renderProgress = function renderProgressFromCanonicalData() {
    const el = document.getElementById("screen-progress");
    if (!el) return;
    refreshProgressionState();

    const alphaProgress = getAlphabetProgress();
    const alphaCompleted = alphaProgress.completedCount;
    const alphaTotal = alphaProgress.total;
    const alphaPct = Math.round((alphaCompleted / Math.max(1, alphaTotal)) * 100);
    const hangulExamRecord = normalizeAlphabetMasteryExam(state.alphabetMasteryExam);
    const hangulRequiredCorrect = Number(window.HANGUL_MASTERY_EXAM?.requiredCorrect) || 150;
    const hangulTotal = Array.isArray(window.HANGUL_MASTERY_EXAM?.sections)
      ? window.HANGUL_MASTERY_EXAM.sections.reduce((sum, section) => sum + (Array.isArray(section?.items) ? section.items.length : 0), 0)
      : 0;
    const hangulStatusText = hangulExamRecord.mastered
      ? `Mastered (${hangulRequiredCorrect}/${hangulTotal || 200}+)`
      : (hangulExamRecord.attempts > 0
        ? `Best: ${hangulExamRecord.bestCorrect}/${hangulTotal || 200}`
        : "Not attempted");

    const wordLessons = getWordLessons().filter((lesson) => lesson?.type !== "checkpoint");
    const wordLessonIds = new Set(wordLessons.map((lesson) => lesson?.id).filter(Boolean));
    const wordCompletedLessons = wordLessons.filter((lesson) => lesson?.id && isWordLessonCompleted(lesson.id)).length;
    const wordTotalLessons = wordLessonIds.size;
    const wordPct = Math.round((wordCompletedLessons / Math.max(1, wordTotalLessons)) * 100);
    const learnedWordsCount = Array.isArray(state.vocabLearned)
      ? new Set(state.vocabLearned).size
      : (Array.isArray(state.vocabKnownRanks) ? new Set(state.vocabKnownRanks).size : 0);
    const vocabDueCount = getVocabDueCount();

    const sentenceLessons = Array.isArray(window.HANAPATH_SENTENCE_LESSONS)
      ? window.HANAPATH_SENTENCE_LESSONS
      : [];
    const sentenceLessonIds = new Set(sentenceLessons.map((lesson) => lesson?.id).filter(Boolean));
    const sentencesProgress = getSentencesProgress();
    const sentenceCompletedSet = new Set(
      (Array.isArray(sentencesProgress.completedLessons) ? sentencesProgress.completedLessons : [])
        .filter((id) => sentenceLessonIds.has(id)),
    );
    const sentenceTotalLessons = sentenceLessonIds.size;
    const sentenceCompletedCount = sentenceCompletedSet.size;
    const sentencePct = Math.round((sentenceCompletedCount / Math.max(1, sentenceTotalLessons)) * 100);
    const sentenceDueCount = getTotalDueSentencesCount();

    const formChecks = getFormChecks();
    const formChecksCompleted = formChecks.filter((check) => check?.id && (getFormCheckRecord(check.id)?.sessions || 0) > 0).length;
    const formChecksTotal = formChecks.length;

    const wordExamBlueprints = Array.isArray(window.HANAPATH_WORD_EXAMS) ? window.HANAPATH_WORD_EXAMS : [];
    const sentenceExamBlueprints = Array.isArray(window.HANAPATH_SENTENCE_EXAMS) ? window.HANAPATH_SENTENCE_EXAMS : [];
    const wordExamIds = new Set(wordExamBlueprints.map((exam) => exam?.id).filter(Boolean));
    const sentenceExamIds = new Set(sentenceExamBlueprints.map((exam) => exam?.id).filter(Boolean));
    const examRecords = state.examResults?.byAttemptId && typeof state.examResults.byAttemptId === "object"
      ? Object.values(state.examResults.byAttemptId)
      : [];
    const passedExamIds = new Set();
    for (const record of examRecords) {
      if (!record || record.status !== "hanaPath" || record.floorSummary?.passed !== true) continue;
      if (wordExamIds.has(record.examId) || sentenceExamIds.has(record.examId)) {
        passedExamIds.add(record.examId);
      }
    }
    const wordExamCount = [...passedExamIds].filter((id) => wordExamIds.has(id)).length;
    const sentenceExamCount = [...passedExamIds].filter((id) => sentenceExamIds.has(id)).length;
    const totalPassedExams = wordExamCount + sentenceExamCount + (hangulExamRecord.mastered ? 1 : 0);

    const wordSrsDue = getTodayReviewCount();
    const totalSrsDue = wordSrsDue + sentenceDueCount;

    el.innerHTML = `
      <div class="progress-hero">
        <div class="eyebrow">Your Journey</div>
        <h2 class="screen-title" style="margin-bottom:8px;">Curriculum &amp; Stats</h2>
        <div class="progress-level-name">Comprehensive Learning Progress</div>
        <div class="progress-level-sub">${state.studyDays} Day Streak · ${totalPassedExams} Exam${totalPassedExams === 1 ? "" : "s"} Passed · ${totalSrsDue} Due in SRS</div>
      </div>

      <div class="stats-grid">
        <div class="stat-box"><span class="sv">${alphaCompleted}/${alphaTotal}</span><span class="sl">Hangul stages</span></div>
        <div class="stat-box"><span class="sv">${wordCompletedLessons}/${wordTotalLessons}</span><span class="sl">Word lessons</span></div>
        <div class="stat-box"><span class="sv">${sentenceCompletedCount}/${sentenceTotalLessons}</span><span class="sl">Sentence lessons</span></div>
        <div class="stat-box"><span class="sv">${formChecksCompleted}/${formChecksTotal}</span><span class="sl">Form checks</span></div>
      </div>

      <div class="card">
        <div class="flex-between mb-12">
          <div>
            <div class="eyebrow">Alphabet · Hangul</div>
            <div class="screen-sub" style="margin-bottom:0;">Letters, reading, writing, and Hangul Mastery.</div>
          </div>
          <span class="pill ${alphaCompleted === alphaTotal && alphaTotal > 0 ? "accent" : "muted"}">${alphaPct}% Complete</span>
        </div>
        <div class="forecast-bar" style="margin-bottom:12px;">
          <div class="forecast-row you">
            <div class="forecast-hours">Stages</div>
            <div class="forecast-track"><div class="forecast-fill" style="width:${alphaPct}%"></div></div>
            <div class="forecast-label">${alphaCompleted}/${alphaTotal}</div>
          </div>
        </div>
        <div class="fs-xs text-muted-2">Exam status: <strong>${escapeHtml(hangulStatusText)}</strong></div>
      </div>

      <div class="card">
        <div class="flex-between mb-12">
          <div>
            <div class="eyebrow">Vocabulary · Core Words</div>
            <div class="screen-sub" style="margin-bottom:0;">Curated word path, SRS retention, and ${wordExamBlueprints.length} achievement exams.</div>
          </div>
          <span class="pill ${wordPct > 0 ? "accent" : "muted"}">${wordPct}% Complete</span>
        </div>
        <div class="stats-grid mb-12" style="margin-bottom:12px;">
          <div class="stat-box"><span class="sv">${learnedWordsCount}</span><span class="sl">Words learned</span></div>
          <div class="stat-box"><span class="sv">${vocabDueCount}</span><span class="sl">SRS due</span></div>
          <div class="stat-box"><span class="sv">${wordExamCount}/${wordExamBlueprints.length}</span><span class="sl">Exams passed</span></div>
        </div>
        <div class="forecast-bar">
          <div class="forecast-row">
            <div class="forecast-hours">Lessons</div>
            <div class="forecast-track"><div class="forecast-fill" style="width:${wordPct}%"></div></div>
            <div class="forecast-label">${wordCompletedLessons}/${wordTotalLessons}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex-between mb-12">
          <div>
            <div class="eyebrow">Sentences &amp; Form Checks</div>
            <div class="screen-sub" style="margin-bottom:0;">Curriculum path, ${formChecksTotal} Form Checks, and ${sentenceExamBlueprints.length} Sentence exams.</div>
          </div>
          <span class="pill ${sentencePct > 0 ? "accent" : "muted"}">${sentencePct}% Complete</span>
        </div>
        <div class="stats-grid mb-12" style="margin-bottom:12px;">
          <div class="stat-box"><span class="sv">${sentenceCompletedCount}</span><span class="sl">Lessons done</span></div>
          <div class="stat-box"><span class="sv">${formChecksCompleted}/${formChecksTotal}</span><span class="sl">Form checks</span></div>
          <div class="stat-box"><span class="sv">${sentenceExamCount}/${sentenceExamBlueprints.length}</span><span class="sl">Exams passed</span></div>
        </div>
        <div class="forecast-bar">
          <div class="forecast-row">
            <div class="forecast-hours">Path</div>
            <div class="forecast-track"><div class="forecast-fill" style="width:${sentencePct}%"></div></div>
            <div class="forecast-label">${sentenceCompletedCount}/${sentenceTotalLessons}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex-between mb-12">
          <div>
            <div class="eyebrow">Review Stack &amp; Momentum</div>
            <div class="screen-sub" style="margin-bottom:0;">Items waiting in your spaced repetition review loop.</div>
          </div>
          <span class="pill ${totalSrsDue > 0 ? "accent" : "muted"}">${totalSrsDue} total due</span>
        </div>
        <div class="stats-grid" style="margin-bottom:0;">
          <div class="stat-box"><span class="sv">${wordSrsDue}</span><span class="sl">Word SRS due</span></div>
          <div class="stat-box"><span class="sv">${sentenceDueCount}</span><span class="sl">Sentence SRS due</span></div>
          <div class="stat-box"><span class="sv">${state.studyDays}</span><span class="sl">Study days</span></div>
          <div class="stat-box"><span class="sv">${state.bestStreak}</span><span class="sl">Best streak</span></div>
        </div>
      </div>
    `;
  };

  // -------------------------------------------------------------------------
  // Browser/PWA back: keep one sentinel entry above the page root. A browser
  // Back action first consumes the sentinel, mirrors HanaPath's visible back
  // contract, then reinstates the sentinel. At the true app root, the second
  // history.back() is allowed to leave the app normally.
  // -------------------------------------------------------------------------
  registerBrowserBackButton = function registerBrowserBackButtonWithSentinel() {
    if (isHanaPathNative() || window.__hanaPathBrowserBackRegistered) return;
    window.__hanaPathBrowserBackRegistered = true;

    const rootState = { hanaPath: true, hanaPathBackGuard: false };
    const guardState = { hanaPath: true, hanaPathBackGuard: true };
    try {
      window.history.replaceState(rootState, "");
      window.history.pushState(guardState, "");
    } catch (_) {
      return;
    }

    let releasingToBrowser = false;
    window.addEventListener("popstate", () => {
      if (releasingToBrowser) return;

      if (handleHanaPathBackAction()) {
        try {
          window.history.pushState(guardState, "");
        } catch (_) {}
        return;
      }

      // We are already at the app's true root. Consume the actual browser
      // history now instead of trapping the user behind a synthetic entry.
      releasingToBrowser = true;
      try {
        window.history.back();
      } catch (_) {
        releasingToBrowser = false;
        return;
      }
      window.setTimeout(() => { releasingToBrowser = false; }, 0);
    });
  };
})();
