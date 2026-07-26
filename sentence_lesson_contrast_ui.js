// Shared learner-facing renderer for Sentence lesson contrast teaching.
(function installSentenceLessonContrastUi(root, factory) {
  "use strict";
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root && typeof root === "object") root.HANAPATH_SENTENCE_CONTRAST_UI = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createSentenceLessonContrastUi() {
  "use strict";

  function safeEscape(escapeHtml, value) {
    const text = String(value ?? "");
    return typeof escapeHtml === "function" ? escapeHtml(text) : text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function validEntry(entry) {
    return Boolean(entry && typeof entry === "object" && entry.targetSentenceId && entry.contrastSentenceId);
  }

  function renderIntroGuide(entry, escapeHtml) {
    if (!validEntry(entry)) return "";
    const e = (value) => safeEscape(escapeHtml, value);
    const titleId = `sentence-contrast-${e(entry.lessonId)}-title`;
    return `
      <section class="ss-helper-panel sentence-contrast-guide" aria-labelledby="${titleId}" data-sentence-contrast-guide>
        <div class="eyebrow">Meaning contrast</div>
        <h3 id="${titleId}" class="sentence-contrast-title">Choose the intended meaning</h3>
        <div class="study-list sentence-contrast-pair">
          <article class="study-row" data-sentence-contrast-role="target">
            <div>
              <div class="eyebrow">Target</div>
              <div class="study-row-ko" lang="ko">${e(entry.contrastClosure.targetKorean)}</div>
              <div class="study-row-sub">${e(entry.contrastClosure.targetMeaning)}</div>
            </div>
            <span class="pill muted">Produce</span>
          </article>
          <article class="study-row" data-sentence-contrast-role="contrast">
            <div>
              <div class="eyebrow">Valid contrast</div>
              <div class="study-row-ko" lang="ko">${e(entry.contrastClosure.contrastKorean)}</div>
              <div class="study-row-sub">${e(entry.contrastClosure.contrastMeaning)}</div>
            </div>
            <span class="pill muted">Compare</span>
          </article>
        </div>
        <p class="screen-sub sentence-contrast-explanation">${e(entry.contrastClosure.explanation)}</p>
        <div class="word-card-definition sentence-contrast-cues" role="note">
          <strong>Controlled cue:</strong> ${e(entry.controlledProduction.promptEn)}
        </div>
        <p class="fs-xs text-muted-2 sentence-contrast-variation">${e(entry.variationAwareness.note)}</p>
      </section>`;
  }

  function renderStudyNote(entry, sentenceId, escapeHtml) {
    if (!validEntry(entry)) return "";
    const note = entry.studyNotes && entry.studyNotes[sentenceId];
    if (!note) return "";
    const e = (value) => safeEscape(escapeHtml, value);
    return `
      <div class="ss-helper-panel sentence-contrast-study-note" role="note" aria-label="${e(note.phase)}" data-sentence-contrast-study="${e(sentenceId)}">
        <div class="ss-helper-title">${e(note.phase)}</div>
        <div class="screen-sub" style="margin-bottom:0;">${e(note.note)}</div>
      </div>`;
  }

  function promptForDrill(drillEntry, fallback) {
    if (drillEntry && typeof drillEntry.promptEn === "string" && drillEntry.promptEn.trim()) {
      return drillEntry.promptEn.trim();
    }
    return String(fallback || "");
  }

  function labelForDrill(drillEntry, fallback) {
    if (drillEntry && typeof drillEntry.cueLabel === "string" && drillEntry.cueLabel.trim()) {
      return drillEntry.cueLabel.trim();
    }
    return String(fallback || "");
  }

  return Object.freeze({
    labelForDrill,
    promptForDrill,
    renderIntroGuide,
    renderStudyNote,
    validEntry,
  });
});
