(() => {
  "use strict";

  const PLUGIN_NAME = "HanaPathAds";
  const SUBJECTS = ["alphabet", "words", "sentences"];
  const PRIVACY_SECTION_ID = "nativeAdsPrivacySettings";

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
    let alphabetIds = [];
    let sentenceIds = [];
    try {
      alphabetIds = typeof getAlphabetProgress === "function"
        ? safeArray(getAlphabetProgress()?.completedIds)
        : safeArray(profile.phaseOneCompleted);
    } catch (_) {
      alphabetIds = safeArray(profile.phaseOneCompleted);
    }
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
      alphabet: new Set(alphabetIds),
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
  let privacyOptionsRequired = false;

  function ensurePrivacyOptionsUI() {
    const existing = document.getElementById(PRIVACY_SECTION_ID);
    if (!privacyOptionsRequired) {
      existing?.remove();
      return;
    }
    if (existing) return;

    const settings = document.getElementById("screen-menu");
    if (!settings || !settings.querySelector(".settings-section")) return;

    const section = document.createElement("div");
    section.id = PRIVACY_SECTION_ID;
    section.className = "settings-section";
    section.innerHTML = `
      <h3 class="settings-section-title">Ad privacy</h3>
      <p class="settings-section-sub">Review the privacy choices used for ads in the Android app.</p>
      <button class="button secondary compact" type="button" id="nativeAdsPrivacyBtn">Privacy choices</button>
    `;
    section.querySelector("#nativeAdsPrivacyBtn")?.addEventListener("click", async () => {
      const plugin = getAdsPlugin();
      if (!plugin?.showPrivacyOptions) return;
      try {
        await plugin.showPrivacyOptions();
      } catch (error) {
        console.warn("HanaPath ad privacy options could not be shown", error);
      }
    });
    settings.appendChild(section);
  }

  function setPrivacyOptionsRequired(required) {
    privacyOptionsRequired = required === true;
    ensurePrivacyOptionsUI();
  }

  async function refreshPrivacyOptionsRequirement() {
    const plugin = getAdsPlugin();
    if (!plugin?.getStatus) return;
    try {
      const status = await plugin.getStatus();
      setPrivacyOptionsRequired(status?.privacyOptionsRequired === true);
    } catch (_) {
      // Consent state is allowed to be unavailable while the native plugin is
      // starting. The plugin also emits a status event after UMP resolves.
    }
  }

  async function scanForCompletion() {
    scanQueued = false;
    if (!armed || !previous) return;
    ensurePrivacyOptionsUI();

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
      refreshPrivacyOptionsRequirement();

      const plugin = getAdsPlugin();
      if (plugin?.addListener) {
        plugin.addListener("privacyOptionsStatusChanged", (event) => {
          setPrivacyOptionsRequired(event?.required === true);
        });
      }
    });
  }

  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm, { once: true });

  // A resumed app can have had state restored while its WebView was hidden.
  // Refresh the baseline without showing an ad for work that did not complete
  // at a visible lesson boundary.
  document.addEventListener("visibilitychange", () => {
    if (armed && document.visibilityState === "visible") {
      previous = readCompletionSnapshot();
      refreshPrivacyOptionsRequirement();
    }
  });
})();
