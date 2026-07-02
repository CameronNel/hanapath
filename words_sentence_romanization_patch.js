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

  function romanizeSentence(text) {
    const source = String(text || "").normalize("NFC");
    if (typeof window.romanizeHangulChunk !== "function") {
      return source;
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
      return source;
    }

    if (lastIndex < source.length) {
      output += source.slice(lastIndex);
    }

    return output.replace(/\s+/g, " ").trim();
  }

  function getTransformNote(word) {
    const usageNote = String(word.usageNote || "").trim();

    if (word.pos === "verb" || word.pos === "adjective") {
      const base = "Dictionary form is the base entry. In sentences, Korean verbs and adjectives conjugate to fit tense and politeness.";
      return usageNote ? `${base} ${usageNote}` : base;
    }

    return usageNote;
  }

  function injectStyles() {
    if (document.getElementById("wordSentenceRomanizationPatchStyles")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "wordSentenceRomanizationPatchStyles";
    style.textContent = `
      .word-example-rom {
        font-size: .8rem;
        line-height: 1.35;
        color: var(--muted-2);
        text-align: center;
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
      const sentenceRomanization = romanizeSentence(sentenceText);
      const transformNote = getTransformNote(word);

      return `
        <div class="card word-bank-detail">
          <button class="button secondary compact" type="button" data-word-detail-back>‹ Back to list</button>
          <div class="word-card-ko-static" lang="ko">${escapeHtml(row.display)}</div>
          <div class="word-card-meaning">${escapeHtml(word.meaning)}</div>
          <div class="word-card-meta">Dictionary form romanization · ${escapeHtml(word.pos)} · ${escapeHtml(word.pronunciation)}${Number.isInteger(row.rank) ? ` · #${row.rank}` : ""}</div>
          ${Array.isArray(word.forms) && word.forms.length ? `<div class="word-card-forms">Forms: ${word.forms.map((f) => `<span lang="ko">${escapeHtml(f)}</span>`).join(" · ")}</div>` : ""}
          <div class="word-example">
            <div class="word-example-ko-static" lang="ko">${escapeHtml(word.exampleKo)}</div>
            <div class="word-example-rom">${escapeHtml(sentenceRomanization)}</div>
            <div class="word-example-en">${escapeHtml(word.exampleEn)}</div>
          </div>
          ${transformNote ? `<div class="word-usage-note">${escapeHtml(transformNote)}</div>` : ""}
          <div class="vocab-meta-grid" style="margin-top:12px;">
            <div class="vocab-meta-box"><span>Lesson group</span><strong>${escapeHtml(word.lessonTitle || word.lessonGroup)}</strong></div>
            <div class="vocab-meta-box"><span>Status</span><strong>${escapeHtml(statusLabel)}</strong></div>
          </div>
          <div class="word-card-actions">
            <button class="button secondary compact" type="button" data-word-detail-hear="${escapeHtml(word.voiceText || word.korean)}">▶ Hear word</button>
            <button class="button secondary compact" type="button" data-word-detail-hear="${escapeHtml(word.exampleVoiceText || word.exampleKo)}">▶ Hear example</button>
          </div>
          <div class="word-card-actions">
            <button class="button ${status === "known" ? "success" : "secondary"} compact" type="button" data-word-detail-known="${escapeHtml(row.id)}">${status === "known" ? "Known ✓" : "Mark known"}</button>
            <button class="button ${status === "hard" ? "primary" : "secondary"} compact" type="button" data-word-detail-hard="${escapeHtml(row.id)}">${status === "hard" ? "Hard ✓" : "Mark hard"}</button>
            <button class="button secondary compact" type="button" data-word-detail-review="${escapeHtml(row.id)}">Add to review</button>
          </div>
        </div>
      `;
    };
  }
})();
