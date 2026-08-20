(() => {
  "use strict";

  const PLUGIN_NAME = "HanaPathAds";
  const SUBJECTS = ["alphabet", "words", "sentences"];
  const PRIVACY_SECTION_ID = "nativeAdsPrivacySettings";
  const SUBSCRIPTION_SECTION_ID = "nativeAdsSubscriptionSettings";

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

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
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
  let subscription = {
    available: false,
    configured: false,
    resolved: false,
    entitled: false,
    pending: false,
    product: null,
  };

  function subscriptionFromStatus(status) {
    const source = status?.subscription && typeof status.subscription === "object"
      ? status.subscription : status;
    return {
      available: source?.available === true,
      configured: source?.configured === true,
      resolved: source?.resolved === true,
      entitled: source?.entitled === true || status?.adFree === true,
      pending: source?.pending === true,
      product: source?.product && typeof source.product === "object" ? source.product : null,
    };
  }

  function ensureSubscriptionUI() {
    const settings = document.getElementById("screen-menu");
    if (!settings || !settings.querySelector(".settings-section")) return;
    const stateKey = JSON.stringify({
      available: subscription.available,
      configured: subscription.configured,
      resolved: subscription.resolved,
      entitled: subscription.entitled,
      pending: subscription.pending,
      price: subscription.product?.price || "",
    });
    const existing = document.getElementById(SUBSCRIPTION_SECTION_ID);
    if (existing?.dataset?.stateKey === stateKey) return;
    existing?.remove();

    const section = document.createElement("div");
    section.id = SUBSCRIPTION_SECTION_ID;
    section.className = "settings-section";
    section.dataset.stateKey = stateKey;
    const product = subscription.product;
    const price = product?.price ? escapeHtml(product.price) : "";

    if (subscription.entitled) {
      section.innerHTML = `
        <h3 class="settings-section-title">HanaPath Ad-Free</h3>
        <p class="settings-section-sub">Your Google Play subscription is active. Lesson-completion ads are disabled on this Android device.</p>
        <div class="settings-backup-actions">
          <button class="button secondary compact" type="button" id="nativeAdsManageSubscription">Manage subscription</button>
          <button class="button secondary compact" type="button" id="nativeAdsRestoreSubscription">Refresh status</button>
        </div>
        <p class="settings-section-sub" id="nativeAdsSubscriptionStatus" role="status" aria-live="polite" style="margin-top:10px;margin-bottom:0;"></p>`;
    } else if (subscription.pending) {
      section.innerHTML = `
        <h3 class="settings-section-title">HanaPath Ad-Free</h3>
        <p class="settings-section-sub">Your subscription payment is pending. Ads stop only after Google Play confirms payment.</p>
        <button class="button secondary compact" type="button" id="nativeAdsRestoreSubscription">Check again</button>
        <p class="settings-section-sub" id="nativeAdsSubscriptionStatus" role="status" aria-live="polite" style="margin-top:10px;margin-bottom:0;"></p>`;
    } else if (subscription.available && subscription.configured && product && price) {
      section.innerHTML = `
        <h3 class="settings-section-title">Enjoy HanaPath ad-free</h3>
        <p class="settings-section-sub">Remove Android lesson-completion ads for ${price} per month. Every learning feature remains free.</p>
        <p class="settings-section-sub">Monthly auto-renewing subscription billed by Google Play. Renews unless canceled; Google Play shows the final localized price and taxes before purchase.</p>
        <div class="settings-backup-actions">
          <button class="button primary compact" type="button" id="nativeAdsSubscribe">Subscribe for ${price}/month</button>
          <button class="button secondary compact" type="button" id="nativeAdsRestoreSubscription">Restore subscription</button>
        </div>
        <p class="settings-section-sub" id="nativeAdsSubscriptionStatus" role="status" aria-live="polite" style="margin-top:10px;margin-bottom:0;"></p>`;
    } else {
      section.innerHTML = `
        <h3 class="settings-section-title">Enjoy HanaPath ad-free</h3>
        <p class="settings-section-sub">The optional monthly subscription will appear here in a Google Play-installed release once Play returns its localized price. Every learning feature remains free.</p>
        <button class="button secondary compact" type="button" id="nativeAdsRestoreSubscription">Check Google Play</button>
        <p class="settings-section-sub" id="nativeAdsSubscriptionStatus" role="status" aria-live="polite" style="margin-top:10px;margin-bottom:0;"></p>`;
    }

    const statusLine = () => section.querySelector("#nativeAdsSubscriptionStatus");
    section.querySelector("#nativeAdsSubscribe")?.addEventListener("click", async (event) => {
      event.currentTarget.disabled = true;
      if (statusLine()) statusLine().textContent = "Opening Google Play…";
      try {
        const result = await getAdsPlugin()?.purchaseAdFree?.();
        if (result?.status === "cancelled") {
          if (statusLine()) statusLine().textContent = "Subscription canceled. Nothing was charged.";
        } else if (result?.status === "pending") {
          if (statusLine()) statusLine().textContent = "Payment is pending; ads remain enabled until Google Play confirms it.";
        } else {
          if (statusLine()) statusLine().textContent = "Subscription confirmed. HanaPath is now ad-free.";
        }
      } catch (error) {
        if (statusLine()) statusLine().textContent = `Subscription did not complete: ${error?.message || "Google Play unavailable"}.`;
      }
      await refreshNativeStatus();
    });
    section.querySelector("#nativeAdsRestoreSubscription")?.addEventListener("click", async (event) => {
      event.currentTarget.disabled = true;
      if (statusLine()) statusLine().textContent = "Checking Google Play…";
      try {
        await getAdsPlugin()?.restoreAdFree?.();
      } catch (error) {
        if (statusLine()) statusLine().textContent = `Status could not be refreshed: ${error?.message || "Google Play unavailable"}.`;
      }
      await refreshNativeStatus();
    });
    section.querySelector("#nativeAdsManageSubscription")?.addEventListener("click", async () => {
      try {
        await getAdsPlugin()?.manageSubscription?.();
      } catch (error) {
        if (statusLine()) statusLine().textContent = `Google Play subscription settings could not open: ${error?.message || "unavailable"}.`;
      }
    });
    settings.appendChild(section);
  }

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

  async function refreshNativeStatus() {
    const plugin = getAdsPlugin();
    if (!plugin?.getStatus) return;
    try {
      const status = await plugin.getStatus();
      setPrivacyOptionsRequired(status?.privacyOptionsRequired === true);
      subscription = subscriptionFromStatus(status);
      ensureSubscriptionUI();
    } catch (_) {
      // Consent state is allowed to be unavailable while the native plugin is
      // starting. The plugin also emits a status event after UMP resolves.
    }
  }

  async function scanForCompletion() {
    scanQueued = false;
    if (!armed || !previous) return;
    ensurePrivacyOptionsUI();
    ensureSubscriptionUI();

    const current = readCompletionSnapshot();
    const completions = newlyCompleted(previous, current);
    previous = current;

    // Normal learner progression records one lesson at a time. Bulk test or
    // migration operations may add many ids at once; never monetize those.
    if (completions.length !== 1) return;
    if (document.visibilityState !== "visible") return;

    const plugin = getAdsPlugin();
    if (!plugin?.lessonCompleted || subscription.entitled) return;

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
      refreshNativeStatus();

      const plugin = getAdsPlugin();
      if (plugin?.addListener) {
        plugin.addListener("privacyOptionsStatusChanged", (event) => {
          setPrivacyOptionsRequired(event?.required === true);
        });
        plugin.addListener("subscriptionStatusChanged", (event) => {
          subscription = {
            ...subscription,
            entitled: event?.entitled === true,
            pending: event?.pending === true,
            resolved: event?.resolved === true || subscription.resolved,
          };
          ensureSubscriptionUI();
          void refreshNativeStatus();
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
      refreshNativeStatus();
    }
  });
})();
