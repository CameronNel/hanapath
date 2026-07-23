// HanaPath Form Checks — declarative inventory (Workstream B, Box B1).
//
// Form Checks are short, blocked, immediately-corrective practice diagnostics
// that live under Learn. They are NOT examinations: they never appear on the
// Exam tab and never award pass, distinction, retention, or mastery, and never
// mutate SRS, crowns, lesson completion, or exam records. See
// docs/FORM_CHECKS_PLAN_DRAFT.md. This file is the data + routing contract only
// (B1); the shared runner is B2.
//
// Each check declares:
//   id, titleKo, title            — stable id + bilingual name
//   surface                       — "words" | "sentences"
//   itemCount                     — honest live pool size, capped at the plan
//                                   maximum; never padded with unrelated words
//   unlock.lessonIds              — lessons that must be complete (milestone
//                                   taught-before-tested proxy; B2 enforces
//                                   per-generated-target gating)
//   competencies, modes           — what it drills, using existing drill modes
//   routePolicy                   — how an error routes back to a lesson
//   remediation                   — exact lesson id(s) an error opens; for the
//                                   register check, per-axis routing
//   pool                          — how the audit computes the eligible pool
//                                   (source + key + formNames); target key is
//                                   (wordId, formName) for inflection checks
//   targetFamily                  — irregular family, where applicable
//   notes                         — drift / owner-decision annotations
//
// Owner-authorised B1 resolutions (RESCUE_HANDOVER §Phase 6):
//   1. Inflection-check canonical target uniqueness is (wordId, formName).
//   2. A check's item count is its real eligible pool; ㅎ-irregular is honestly
//      small (1 taught word → 2 forms) — not padded to ten.
//   3. B1 enforces a milestone-level taught-before-tested proxy.
//   4. Connectives unlock only after the lesson that teaches their pool.
//   5. Polite-present uses only targets taught by its unlock; the live
//      curriculum has no dedicated Section-1 polite-production lesson, so its
//      unlock is moved later to the first form-production teaching (documented
//      drift from the draft plan's "Section 1").
(function () {
  "use strict";

  var CHECKS = [
    // ── Core Words checks ────────────────────────────────────────────────
    {
      id: "form-check-polite-present",
      titleKo: "해요체 현재형 확인",
      title: "Polite Present Check",
      surface: "words",
      itemCount: 10,
      unlock: { lessonIds: ["s5-grammar-u3-l1"] },
      competencies: ["formal-register"],
      modes: ["form-recognition", "form-production", "sentence-blank"],
      routePolicy: "item-supporting-lesson",
      remediation: { default: "s5-grammar-u3-l1" },
      pool: { source: "predicates", formNames: ["polite"] },
      notes: "Live curriculum has no dedicated Section-1 polite-production lesson; unlock moved to the first form-production teaching (s5-grammar-u3-l1) per RESCUE_HANDOVER §Phase 6 resolution 5.",
    },
    {
      id: "form-check-past-negation",
      titleKo: "과거와 부정 확인",
      title: "Past & Negation Check",
      surface: "words",
      itemCount: 12,
      unlock: { lessonIds: ["s3-grammar-u2-l2"] },
      competencies: ["past-tense", "negation"],
      // v2 state: recognition/context only. Typed past/negation production is
      // gated behind Workstream C (past-tense/negation scoredProduction) and is
      // added by Box B5, never before — see notes.
      modes: ["ko-to-meaning", "meaning-to-ko", "sentence-blank", "function-usage"],
      routePolicy: "item-supporting-lesson",
      remediation: { default: "s3-grammar-u2-l2", production: "s3-grammar-u2-l3" },
      pool: { source: "competency", keys: ["past-tense", "negation"] },
      productionGated: true,
      notes: "v2 recognition/context. Typed production requires past-tense & negation scoredProduction === true and s3-grammar-u2-l3 complete (Box B5); the audit rejects typed past/negation items until then.",
    },
    {
      id: "form-check-particles-location",
      titleKo: "조사와 장소 확인",
      title: "Particles & Location Check",
      surface: "words",
      itemCount: 10,
      unlock: { lessonIds: ["s2-grammar-u1-l1", "s2-grammar-u1-l2"] },
      competencies: ["particle-function"],
      modes: ["function-usage", "sentence-blank"],
      routePolicy: "item-supporting-lesson",
      remediation: { default: "s2-grammar-u1-l1", alt: "s2-grammar-u1-l2" },
      pool: { source: "competency", keys: ["particle-function"] },
    },
    {
      id: "form-check-connectives",
      titleKo: "연결 표현 확인",
      title: "Connectives Check",
      surface: "words",
      itemCount: 12,
      unlock: { lessonIds: ["s3-grammar-u2-l1"] },
      competencies: ["connectives"],
      modes: ["sentence-blank", "function-usage", "form-production"],
      routePolicy: "item-supporting-lesson",
      remediation: { default: "s3-grammar-u2-l1" },
      pool: { source: "competency", keys: ["connectives"] },
    },
    {
      id: "form-check-register-honorific",
      titleKo: "격식과 높임 표현 확인",
      title: "Register & Honorific Check",
      surface: "words",
      itemCount: 12,
      unlock: { lessonIds: ["s5-grammar-u3-l1", "s5-grammar-u3-l2"] },
      competencies: ["formal-register", "subject-honorific"],
      modes: ["register-choice", "form-production"],
      routePolicy: "item-supporting-lesson",
      // Ending/register errors route to l1; subject/lexical honorific errors to l2.
      remediation: { register: "s5-grammar-u3-l1", honorific: "s5-grammar-u3-l2" },
      pool: { source: "competency", keys: ["formal-register", "subject-honorific"] },
    },
    {
      id: "form-check-modifiers",
      titleKo: "관형형 확인",
      title: "Modifier Forms Check",
      surface: "words",
      itemCount: 10,
      unlock: { lessonIds: ["s7-grammar-u4-l1"] },
      competencies: ["noun-modification"],
      modes: ["form-recognition", "form-production"],
      routePolicy: "item-supporting-lesson",
      remediation: { default: "s7-grammar-u4-l1" },
      pool: { source: "competency", keys: ["noun-modification"], formNames: ["attributive"] },
    },
    // Irregular-family checks — honest pools (target key = (wordId, formName)).
    makeIrregularCheck("form-check-irregular-d", "ㄷ 불규칙 확인", "ㄷ-Irregular Check", "ㄷ", 4),
    makeIrregularCheck("form-check-irregular-b", "ㅂ 불규칙 확인", "ㅂ-Irregular Check", "ㅂ", 10),
    makeIrregularCheck("form-check-irregular-s", "ㅅ 불규칙 확인", "ㅅ-Irregular Check", "ㅅ", 4),
    makeIrregularCheck("form-check-irregular-h", "ㅎ 불규칙 확인", "ㅎ-Irregular Check", "ㅎ", 2),
    makeIrregularCheck("form-check-irregular-reu", "르 불규칙 확인", "르-Irregular Check", "르", 6),
    makeIrregularCheck("form-check-irregular-rieul", "ㄹ 탈락 확인", "ㄹ-Deletion Check", "ㄹ-deletion", 10),

    // ── Sentence-pattern checks (Box B4) ─────────────────────────────────
    // Each item's exact supportingLessonId is resolved by the runner from the
    // row → HANAPATH_SENTENCE_LESSONS mapping. pool.patternTags scopes the rows
    // to the pattern the check drills (empty = the whole unlocked section).
    sentenceCheck("sentence-check-order", "문장 순서 확인", "Sentence Order Check", 12, "sn3",
      ["sentence-build", "translate-type"], []),
    sentenceCheck("sentence-check-tense", "문장 시제 확인", "Sentence Tense Check", 12, "sn4",
      ["translate-type"], ["present-polite", "past-polite", "future-geoyeyo"]),
    sentenceCheck("sentence-check-negation", "문장 부정 확인", "Sentence Negation Check", 10, "sn4",
      ["translate-type"], ["neg-an", "neg-mot", "neg-ji-anta", "copula-negative-anieyo"]),
    sentenceCheck("sentence-check-connectives", "문장 연결 확인", "Connected Sentence Check", 12, "sn6",
      ["sentence-build", "translate-type"], ["because-aseo", "and-go", "if-myeon", "when-ttae", "but-jiman"]),
    sentenceCheck("sentence-check-register", "문장 말높임 확인", "Sentence Register Check", 12, "sn8",
      ["translate-type"], ["formal-nida", "honorific-si", "imperative-seyo", "propositive-eyo", "question-polite"]),
  ];

  function makeIrregularCheck(id, titleKo, title, family, itemCount) {
    return {
      id: id,
      titleKo: titleKo,
      title: title,
      surface: "words",
      itemCount: itemCount,
      unlock: { lessonIds: ["s7-grammar-u4-l2"] },
      competencies: ["irregular-families"],
      modes: ["form-recognition", "form-production"],
      routePolicy: "family-lesson",
      remediation: { default: "s7-grammar-u4-l2" },
      targetFamily: family,
      pool: { source: "irregular-family", key: family, formNames: ["past", "polite"] },
    };
  }

  function sentenceCheck(id, titleKo, title, itemCount, section, modes, patternTags) {
    return {
      id: id,
      titleKo: titleKo,
      title: title,
      surface: "sentences",
      itemCount: itemCount,
      unlock: { sectionsComplete: [section] },
      competencies: ["sentence-pattern"],
      modes: modes,
      routePolicy: "row-supporting-lesson",
      remediation: { section: section },
      pool: { source: "sentence-section", key: section, patternTags: patternTags || [] },
    };
  }

  if (typeof window !== "undefined") window.HANAPATH_FORM_CHECKS = CHECKS;
  if (typeof module !== "undefined" && module.exports) module.exports = { HANAPATH_FORM_CHECKS: CHECKS };
})();
