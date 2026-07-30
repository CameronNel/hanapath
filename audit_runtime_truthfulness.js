// Truthful learner-facing labels for heuristic analytics and speech practice.
//
// Historical fields remain for compatibility, but the UI must describe what the
// browser actually measures: transcript similarity, elapsed-time proximity, and
// uncalibrated practice-history heuristics.
(function () {
  "use strict";

  const DISCLOSURE = "Uses your browser or device speech-recognition service. Its provider may process microphone audio under its own terms. HanaPath compares only the returned transcript and elapsed time on this page; this is not phonetic or prosodic analysis.";

  function colorFor(value) {
    return value >= 80 ? "#2ecc71" : value >= 55 ? "#f1c40f" : "#e74c3c";
  }

  function installSpeechTruthfulness() {
    if (typeof scoreSpeechAttempt !== "function" || typeof escapeHtml !== "function") {
      console.error("[HanaPath] Truthful speech-practice labels could not install.");
      return false;
    }

    const originalScoreSpeechAttempt = scoreSpeechAttempt;
    scoreSpeechAttempt = function scoreSpeechAttemptTruthfully(targetText, transcript, durationMs) {
      const historical = originalScoreSpeechAttempt(targetText, transcript, durationMs);
      return {
        ...historical,
        transcriptMatch: historical.segmental,
        speakingTimeFit: historical.prosodic,
        measurementKind: "transcript-and-duration-proxy",
      };
    };
    window.scoreSpeechAttempt = scoreSpeechAttempt;

    speakingScoreHtml = function speakingScoreHtmlTruthfully(targetLabel, transcript, score) {
      const transcriptMatch = Number(score.transcriptMatch ?? score.segmental ?? 0);
      const speakingTimeFit = Number(score.speakingTimeFit ?? score.prosodic ?? 0);
      const tip = transcriptMatch >= 80
        ? "The recognizer returned text close to the target. Listen and repeat again to practise pronunciation."
        : "The returned transcript differed from the target. Listen again and repeat slowly, one Hangul block at a time.";
      return `
        <div style="display:flex; justify-content:space-between; gap:12px; margin-bottom:4px;">
          <strong>Transcript match:</strong> <span style="color:${colorFor(transcriptMatch)};">${Math.round(transcriptMatch)}%</span>
        </div>
        <div style="display:flex; justify-content:space-between; gap:12px; margin-bottom:4px;">
          <strong>Speaking-time estimate:</strong> <span style="color:${colorFor(speakingTimeFit)};">${Math.round(speakingTimeFit)}%</span>
        </div>
        <div style="margin-top:6px;"><strong>Target:</strong> <span lang="ko">${escapeHtml(targetLabel)}</span></div>
        <div style="margin-top:4px;"><strong>Recognizer returned:</strong> <span lang="ko">${escapeHtml(transcript || "No transcript")}</span></div>
        <div style="margin-top:6px; font-size:0.8rem; color:var(--text-muted-2);">${escapeHtml(tip)}</div>
        <div class="speech-practice-disclosure" style="margin-top:8px; font-size:0.76rem; color:var(--text-muted-2);">${escapeHtml(DISCLOSURE)}</div>
      `;
    };
    window.speakingScoreHtml = speakingScoreHtml;

    window.handleSpeakingPractice = function handleSpeakingPracticeTruthfully(btn) {
      const area = btn && btn.closest ? btn.closest(".speaking-practice-area") : null;
      if (!area) return;
      const feedback = area.querySelector(".speaking-feedback");
      const status = area.querySelector(".speaking-status");
      const results = area.querySelector(".speaking-results");
      const wave = area.querySelector(".speaking-wave");
      if (!feedback || !status || !results || !wave) return;

      const targetText = area.dataset.speakingTarget || "";
      const targetLabel = area.dataset.speakingLabel || targetText;
      const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      btn.disabled = true;
      feedback.style.display = "block";
      status.innerText = "Listening for a transcript...";
      results.style.display = "none";
      results.innerHTML = "";
      wave.style.display = "flex";

      const bars = wave.querySelectorAll("div");
      const interval = setInterval(() => {
        bars.forEach((bar) => {
          bar.style.height = `${Math.floor(Math.random() * 20) + 10}px`;
        });
      }, 100);

      function finish(message) {
        clearInterval(interval);
        wave.style.display = "none";
        status.innerText = message;
        btn.disabled = false;
      }

      function showMessage(message) {
        results.innerHTML = `
          <div style="font-size:0.85rem; color:var(--text-muted-2);">${escapeHtml(message)}</div>
          <div class="speech-practice-disclosure" style="margin-top:8px; font-size:0.76rem; color:var(--text-muted-2);">${escapeHtml(DISCLOSURE)}</div>
        `;
        results.style.display = "block";
      }

      if (!Recognition) {
        finish("Transcript practice is not supported in this browser.");
        showMessage("Use Hear word and repeat aloud. This device cannot return a speech-recognition transcript to compare.");
        return;
      }

      const recognition = new Recognition();
      const startedAt = performance.now();
      let transcript = "";
      let handledError = false;
      recognition.lang = "ko-KR";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onresult = (event) => {
        const first = event.results && event.results[0] && event.results[0][0];
        transcript = first ? first.transcript : "";
      };
      recognition.onerror = () => {
        handledError = true;
        finish("No usable transcript was returned.");
        showMessage("Try again in a quiet room, or use Hear word and repeat aloud without transcript comparison.");
      };
      recognition.onend = () => {
        if (handledError || !btn.disabled) return;
        const durationMs = performance.now() - startedAt;
        const result = scoreSpeechAttempt(targetText, transcript, durationMs);
        finish("Transcript check complete.");
        results.innerHTML = speakingScoreHtml(targetLabel, transcript, result);
        results.style.display = "block";
      };

      try {
        recognition.start();
      } catch (error) {
        handledError = true;
        finish("Transcript practice could not start.");
        showMessage(error && error.message ? error.message : "The browser blocked speech recognition.");
      }
    };

    if (typeof wordBankDetailHtml === "function" && !wordBankDetailHtml.__hanapathTruthfulSpeech) {
      const originalWordBankDetailHtml = wordBankDetailHtml;
      const wrapped = function wordBankDetailHtmlWithDisclosure() {
        const html = originalWordBankDetailHtml.apply(this, arguments);
        return String(html).replace(
          '<button class="button secondary compact" type="button" onclick="handleSpeakingPractice(this)">',
          `<div class="speech-practice-disclosure" style="margin-bottom:8px; font-size:0.76rem; color:var(--text-muted-2);">${escapeHtml(DISCLOSURE)}</div>
          <button class="button secondary compact" type="button" onclick="handleSpeakingPractice(this)">`,
        );
      };
      wrapped.__hanapathTruthfulSpeech = true;
      wordBankDetailHtml = wrapped;
      window.wordBankDetailHtml = wrapped;
    }
    return true;
  }

  function installAnalyticsTruthfulness() {
    if (typeof buildVocabMetricsView !== "function" || buildVocabMetricsView.__hanapathTruthfulAnalytics) return false;
    const originalBuildVocabMetricsView = buildVocabMetricsView;
    const wrapped = function buildVocabMetricsViewTruthfully() {
      let html = String(originalBuildVocabMetricsView.apply(this, arguments));
      html = html
        .replace("Assessment & analytics", "Practice history & estimates")
        .replace(
          "Review events persist per item, and the dashboard tracks mastery, latency, and retention windows.",
          "Review events persist per item. Practice scores, ease estimates, and delayed-recall proxies are uncalibrated study aids, not proficiency or retention measurements.",
        )
        .replaceAll("% mastery", "% practice score")
        .replaceAll(">Mastery<", ">Practice score<")
        .replaceAll(">Mastered words<", ">High practice scores<")
        .replaceAll(">1-week retention<", ">7-day recall proxy<")
        .replaceAll(">1-month retention<", ">30-day recall proxy<")
        .replaceAll(">Confidence<", ">Speed-based ease estimate<")
        .replaceAll(" · conf ", " · ease estimate ")
        .replaceAll("Lowest mastery items bubble to the top.", "Lowest heuristic practice scores bubble to the top.")
        .replaceAll("1-week sample:", "7-day proxy sample:")
        .replaceAll("1-month sample:", "30-day proxy sample:");
      return html;
    };
    wrapped.__hanapathTruthfulAnalytics = true;
    buildVocabMetricsView = wrapped;
    window.buildVocabMetricsView = wrapped;
    return true;
  }

  installSpeechTruthfulness();
  installAnalyticsTruthfulness();

  window.HANAPATH_TRUTHFUL_METRICS = Object.freeze({
    disclosure: DISCLOSURE,
    speechInstalled: typeof speakingScoreHtml === "function",
    analyticsInstalled: typeof buildVocabMetricsView === "function",
  });
})();
