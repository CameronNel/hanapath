(function () {
  "use strict";

  function normalizeSentenceExamAnswer(value) {
    return String(value == null ? "" : value)
      .normalize("NFC")
      .trim()
      .replace(/\s+/g, " ");
  }

  function tokenize(value) {
    return normalizeSentenceExamAnswer(value)
      .split(" ")
      .map(function (token) {
        return token.replace(/[.,!?;:”“"'’]+$/g, "");
      })
      .filter(Boolean);
  }

  function multisetEqual(a, b) {
    if (a.length !== b.length) return false;
    var counts = Object.create(null);
    for (var i = 0; i < a.length; i += 1) counts[a[i]] = (counts[a[i]] || 0) + 1;
    for (var j = 0; j < b.length; j += 1) {
      if (!counts[b[j]]) return false;
      counts[b[j]] -= 1;
    }
    return true;
  }

  function deriveDiagnostics(canonical, response) {
    var expected = normalizeSentenceExamAnswer(canonical);
    var actual = normalizeSentenceExamAnswer(response);
    if (!actual) return ["blank"];

    var diagnostics = [];
    if (expected.replace(/ /g, "") === actual.replace(/ /g, "") && expected !== actual) {
      diagnostics.push("spacing");
    }

    var expectedTokens = tokenize(expected);
    var actualTokens = tokenize(actual);
    if (multisetEqual(expectedTokens, actualTokens) && expectedTokens.join("\u0000") !== actualTokens.join("\u0000")) {
      diagnostics.push("word-order");
    }
    if (actualTokens.length < expectedTokens.length) diagnostics.push("missing-content");
    if (actualTokens.length > expectedTokens.length) diagnostics.push("extra-content");

    var expectedLast = expectedTokens[expectedTokens.length - 1] || "";
    var actualLast = actualTokens[actualTokens.length - 1] || "";
    var expectedFormal = /(습니다|ㅂ니다|합니다)$/.test(expectedLast);
    var actualFormal = /(습니다|ㅂ니다|합니다)$/.test(actualLast);
    if (expectedFormal !== actualFormal) diagnostics.push("register");

    var expectedPast = /(았|었|였|했)/.test(expectedLast);
    var actualPast = /(았|었|였|했)/.test(actualLast);
    if (expectedPast !== actualPast) diagnostics.push("tense");

    if (!diagnostics.length) diagnostics.push("different-unapproved-answer");
    return [...new Set(diagnostics)];
  }

  function scoreSentenceExamResponse(item, response) {
    var canonical = normalizeSentenceExamAnswer(item && (item.canonicalAnswer || item.canonicalTargetKey));
    var alternatives = Array.isArray(item && item.manualAlternatives)
      ? item.manualAlternatives
      : Array.isArray(item && item.acceptedAnswers)
        ? item.acceptedAnswers.slice(1)
        : [];
    var acceptedAnswers = [canonical]
      .concat(alternatives.map(normalizeSentenceExamAnswer))
      .filter(Boolean);
    acceptedAnswers = [...new Set(acceptedAnswers)];

    var normalizedResponse = normalizeSentenceExamAnswer(response);
    var correct = acceptedAnswers.includes(normalizedResponse);
    return {
      correct: correct,
      normalizedResponse: normalizedResponse,
      acceptedAnswers: acceptedAnswers,
      diagnostics: correct ? [] : deriveDiagnostics(canonical, normalizedResponse),
    };
  }

  window.HANAPATH_SENTENCE_EXAM_GRADER = {
    normalizeSentenceExamAnswer: normalizeSentenceExamAnswer,
    deriveDiagnostics: deriveDiagnostics,
    scoreSentenceExamResponse: scoreSentenceExamResponse,
  };
})();
