(function () {
  "use strict";

  if (window.__wordSentenceRomanizationPatchInstalled) {
    return;
  }
  window.__wordSentenceRomanizationPatchInstalled = true;

  const escapeHtml = window.escapeHtml || function escapeHtmlFallback(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  };

  function stripSentencePunctuation(value) {
    return String(value || "").replace(/[.!?。！？…]+$/g, "").trim();
  }

  function romanizeSentence(text) {
    const source = String(text || "").normalize("NFC");
    if (typeof window.romanizeHangulChunk !== "function") {
      return stripSentencePunctuation(source);
    }

    const pattern = /[가-힣ㄱ-ㅎㅏ-ㅣ]+/g;
    let lastIndex = 0;
    let output = "";

    for (const match of source.matchAll(pattern)) {
      if (match.index > lastIndex) {
        output += source.slice(lastIndex, match.index);
      }
      output += window.romanizeHangulChunk(match[0], source, match.index);
      lastIndex = match.index + match[0].length;
    }

    if (!output) {
      return stripSentencePunctuation(source);
    }

    if (lastIndex < source.length) {
      output += source.slice(lastIndex);
    }

    return stripSentencePunctuation(output).replace(/\s+/g, " ").trim();
  }

  function cleanNoteText(value) {
    return String(value || "")
      .replace(/^Form note:\s*/i, "")
      .replace(/^Sound note:\s*/i, "")
      .trim();
  }

  function getFormNote(word) {
    const explicit = cleanNoteText(word.formNote);
    if (explicit) {
      return explicit;
    }

    const legacy = cleanNoteText(word.usageNote);
    const dictForm = String(word.display || word.korean || "").trim();

    if (legacy) {
      if (word.pos === "verb" || word.pos === "adjective") {
        return dictForm ? `${dictForm} is the dictionary form. ${legacy}` : legacy;
      }
      return legacy;
    }

    if (word.pos === "verb" || word.pos === "adjective") {
      return dictForm
        ? `${dictForm} is the dictionary form. In this sentence, the word changes to fit tense and politeness.`
        : "In this sentence, the word changes to fit tense and politeness.";
    }

    return "";
  }

  function getSoundNote(word) {
    return cleanNoteText(word.soundNote);
  }

  function noteHtml(label, body, extraClass) {
    if (!body) {
      return "";
    }

    return `
      <div class="word-note ${extraClass || ""}">
        <div class="word-note-label">${escapeHtml(label)}</div>
        <div class="word-note-body">${escapeHtml(body)}</div>
      </div>
    `;
  }

  function injectStyles() {
    if (document.getElementById("wordSentenceRomanizationPatchStyles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "wordSentenceRomanizationPatchStyles";
    style.textContent = `
      .word-example-rom {
        margin-top: 2px;
        font-size: .8rem;
        line-height: 1.35;
        color: var(--muted-2);
        text-align: center;
      }

      .word-note {
        margin-top: 10px;
        padding: 10px 12px;
        border: 1px solid rgba(108, 124, 255, 0.16);
        border-left: 2px solid var(--accent-2);
        border-radius: 8px;
        background: rgba(10, 14, 28, 0.72);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
        font-size: .9rem;
        line-height: 1.45;
      }

      .word-note-label {
        font-weight: 700;
        margin-bottom: 2px;
        color: var(--accent-2);
      }

      .word-note-body {
        color: var(--muted-1, var(--muted-2));
      }
    `;
    document.head.appendChild(style);
  }

  injectStyles();

  const originalWordBankDetailHtml = window.wordBankDetailHtml;
  if (typeof originalWordBankDetailHtml === "function") {
    window.wordBankDetailHtml = function wordBankDetailHtmlWithSentenceRomanization(row) {
      if (!row || !row.word) {
        return originalWordBankDetailHtml(row);
      }

      const knownSet = window.getVocabKnownSet();
      const hardSet = window.getVocabHardSet();
      const status = window.getWordRowStatus(row, knownSet, hardSet, Date.now());
      const statusLabel = status === "fresh" ? "Not studied yet" : status.charAt(0).toUpperCase() + status.slice(1);
      const word = row.word;
      const sentenceText = String(word.exampleVoiceText || word.exampleKo || "");
      const sentenceRomanization = stripSentencePunctuation(word.examplePronunciation || romanizeSentence(sentenceText));
      const formNote = getFormNote(word);
      const soundNote = getSoundNote(word);

      return `
        <div class="card word-bank-detail">
          <button class="button secondary compact" type="button" data-word-detail-back>‹ Back to list</button>
          <div class="word-card-ko-static" lang="ko">${escapeHtml(row.display || word.korean || "")}</div>
          <div class="word-card-meaning">${escapeHtml(word.meaning || "")}</div>
          <div class="word-card-meta"><strong>Dictionary form romanization</strong> · ${escapeHtml(word.pos || "")} · ${escapeHtml(word.pronunciation || "")}${Number.isInteger(row.rank) ? ` · #${row.rank}` : ""}</div>
          ${Array.isArray(word.forms) && word.forms.length ? `<div class="word-card-forms">Forms: ${word.forms.map((f) => `<span lang="ko">${escapeHtml(f)}</span>`).join(" · ")}</div>` : ""}
          <div class="word-example">
            <div class="word-example-ko-static" lang="ko">${escapeHtml(word.exampleKo || "")}</div>
            <div class="word-example-rom">${escapeHtml(sentenceRomanization)}</div>
            <div class="word-example-en">${escapeHtml(word.exampleEn || "")}</div>
          </div>
          ${noteHtml("Form note:", formNote, "word-note-form")}
          ${noteHtml("Sound note:", soundNote, "word-note-sound")}
          <div class="vocab-meta-grid" style="margin-top:12px;">
            <div class="vocab-meta-box"><span>Lesson group</span><strong>${escapeHtml(word.lessonTitle || word.lessonGroup || "")}</strong></div>
            <div class="vocab-meta-box"><span>Status</span><strong>${escapeHtml(statusLabel)}</strong></div>
          </div>
          <div class="word-card-actions">
            <button class="button secondary compact" type="button" data-word-detail-hear="${escapeHtml(word.voiceText || word.korean || "")}">▶ Hear word</button>
            <button class="button secondary compact" type="button" data-word-detail-hear="${escapeHtml(word.exampleVoiceText || word.exampleKo || "")}">▶ Hear example</button>
          </div>
          <div class="word-card-actions">
            <button class="button ${status === "known" ? "success" : "secondary"} compact" type="button" data-word-detail-known="${escapeHtml(row.id || "")}">${status === "known" ? "Known ✓" : "Mark known"}</button>
            <button class="button ${status === "hard" ? "primary" : "secondary"} compact" type="button" data-word-detail-hard="${escapeHtml(row.id || "")}">${status === "hard" ? "Hard ✓" : "Mark hard"}</button>
            <button class="button secondary compact" type="button" data-word-detail-review="${escapeHtml(row.id || "")}">Add to review</button>
          </div>
        </div>
      `;
    };
  }
})();
