(() => {
  "use strict";

  const PLUGIN_NAME = "HanaPathAds";
  const SUBJECTS = ["alphabet", "words", "sentences"];

  function isNativeRuntime() {
    try {
      return Boolean(window.Capacitor?.isNativePlatform?.());
    } catch (_) {
      return false;
    }
  }

  function getAdsPlugin() {
    if (!isNativeRuntime()) return null;
    return window.Capacitor?.Plugins?.[PLUGIN_NAME] || null;
  }

  function safeArray(value) {
    return Array.isArray(value) ? value.filter((item) => typeof item === "string" && item) : [];
  }

  function readCompletionSnapshot() {
    const profile = typeof state !== "undefined" && state && typeof state === "object" ? state : {};
    let sentenceIds = [];
    try {
      if (typeof getSentencesProgress === "function") {
        sentenceIds = safeArray(getSentencesProgress()?.completedLessons);
      } else {
        sentenceIds = safeArray(profile.sentencesProgress?.completedLessons);
      }
    } catch (_) {
      sentenceIds = safeArray(profile.sentencesProgress?.completedLessons);
    }

    return {
      alphabet: new Set(safeArray(profile.phaseOneCompleted)),
      words: new Set(safeArray(profile.vocabLessonCompleted)),
      sentences: new Set(sentenceIds),
    };
  }

  function newlyCompleted(previous, current) {
    const found = [];
    for (const subject of SUBJECTS) {
      for (const lessonId of current[subject]) {
        if (!previous[subject].has(lessonId)) found.push({ subject, lessonId });
      }
    }
    return found;
  }

  if (!isNativeRuntime()) return;

  let previous = null;
  let scanQueued = false;
  let armed = false;

  async function scanForCompletion() {
    scanQueued = false;
    if (!armed || !previous) return;

    const current = readCompletionSnapshot();
    const completions = newlyCompleted(previous, current);
    previous = current;

    // Normal learner progression records one lesson at a time. Bulk test or
    // migration operations may add many ids at once; never monetize those.
    if (completions.length !== 1) return;
    if (document.visibilityState !== "visible") return;

    const plugin = getAdsPlugin();
    if (!plugin?.lessonCompleted) return;

    try {
      await plugin.lessonCompleted({
        subject: completions[0].subject,
        lessonId: completions[0].lessonId,
        completedAt: Date.now(),
      });
    } catch (error) {
      console.warn("HanaPath lesson ad was skipped", error);
    }
  }

  function queueScan() {
    if (!armed || scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(scanForCompletion);
  }

  const observer = new MutationObserver(queueScan);

  function arm() {
    if (armed) return;
    // Arm only after the window load boundary and one paint. That puts the
    // snapshot after load-time state migration/bootstrap, so a migration that
    // repairs one historical lesson can never masquerade as a fresh learner
    // completion and display an ad.
    requestAnimationFrame(() => {
      previous = readCompletionSnapshot();
      armed = true;
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    });
  }

  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm, { once: true });

  // A resumed app can have had state restored while its WebView was hidden.
  // Refresh the baseline without showing an ad for work that did not complete
  // at a visible lesson boundary.
  document.addEventListener("visibilitychange", () => {
    if (armed && document.visibilityState === "visible") previous = readCompletionSnapshot();
  });
})();
