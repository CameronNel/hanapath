// HanaPath Hangul Mastery scoring policy amendment.
//
// The original v2 bank was authored under the earlier perfect-score policy.
// Product policy now uses the same canonical 75% pass bar as the other formal
// examination suites while preserving the 200-item bank and every coverage,
// no-hints, delayed-feedback, and exam-integrity restriction.
//
// Load immediately after hangul_mastery_exam.js and before app.js.
(function installHangulMasteryScoringPolicy(root) {
  "use strict";

  const policy = Object.freeze({
    revision: "hangul-mastery-scoring-2026-08-10",
    totalItems: 200,
    requiredCorrect: 150,
    passPct: 75,
  });

  const exam = root && root.HANGUL_MASTERY_EXAM;
  if (!exam || typeof exam !== "object") {
    throw new Error("HanaPath: Hangul Mastery bank must load before its scoring policy.");
  }

  exam.requiredCorrect = policy.requiredCorrect;
  root.HANAPATH_HANGUL_MASTERY_SCORING_POLICY = policy;
})(typeof window !== "undefined" ? window : globalThis);
