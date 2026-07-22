// word_exam_blueprints.js — Core Word Examination Suite blueprints (v2).
// Plain browser global; must load before app.js. Governing contract:
// docs/CORE_WORD_EXAM_SPECS.md. Edit the spec, then this file, then keep
// scripts/audit-word-exams.mjs green after any change.
//
// This file is DECLARATIVE only: it defines scope, unlocks, lengths, times,
// macrostrand allocations, coverage floors, competency eligibility, scoring
// bands, and the Exam 10 final-layer + retention-confirmation contract. It
// never contains frozen item IDs — items are generated deterministically by
// word_exam_engine.js from the live curriculum and curated data.
//
// Macrostrands (docs/CORE_WORD_EXAM_SPECS.md §2):
//   R receptive breadth · C cued lexical selection · P controlled production
//   X contextual use · F form & sociolinguistic control · D lexical depth
// Each scored item has exactly one primary macrostrand.
(function () {
  "use strict";

  // ── Reviewed competency milestone map (spec §3.2–§3.4) ────────────────────
  // Re-derived from the live curriculum in scripts/build-word-exam-competency-map.mjs,
  // which fails loudly on drift. `firstTeachingUnitId` is the unit whose lessons
  // first teach/practise the competency; `firstProductionLessonId` is the lesson
  // that first teaches typed form-production for it; `minimumExamSection` is the
  // earliest section-exam that may test it. `scoredProduction` gates typed
  // form-production. Past tense and negation typed production is taught in
  // s3-grammar-u2-l3 (Words C1), so both are production-eligible (Words C2).
  // C2 updates evidence metadata only: v2 exam generation, quotas, and lengths
  // remain unchanged until the v3 generator work (Words C3).
  var COMPETENCIES = {
    "lexeme-identity": {
      learnerLabel: "Word identity",
      strands: ["R", "C", "P"],
      firstTeachingUnitId: "s1-firstwords-u1",
      minimumExamSection: 1,
      scoredProduction: true,
      acceptedFormsSource: "lemma",
      evidence: "Every content lesson teaches the citation form via ko-to-meaning, meaning-to-ko and type-ko.",
    },
    "polite-present": {
      learnerLabel: "Polite present form",
      strands: ["F", "R"],
      firstTeachingUnitId: "s1-firstwords-u1",
      minimumExamSection: 1,
      scoredProduction: false,
      acceptedFormsSource: "inflect:polite",
      evidence: "Section 1 verbs/descriptive verbs appear with -아요/어요 examples and formNotes; recognition only, no broad conjugation demand (spec Exam 1).",
    },
    "particle-function": {
      learnerLabel: "Particle & ending function",
      strands: ["F", "X"],
      firstTeachingUnitId: "s2-grammar-u1",
      minimumExamSection: 2,
      scoredProduction: false,
      acceptedFormsSource: "authored:grammarRole",
      evidence: "s2-grammar-u1 (Function words) teaches core particles/endings with grammarRole, practised via function-usage.",
    },
    "connectives": {
      learnerLabel: "Connectives & clause links",
      strands: ["F", "X"],
      firstTeachingUnitId: "s3-grammar-u2",
      minimumExamSection: 3,
      scoredProduction: true,
      acceptedFormsSource: "authored:pattern",
      evidence: "s3-grammar-u2-l1 (Using if) teaches connectives with form-recognition and form-production practice.",
    },
    "past-tense": {
      learnerLabel: "Past tense",
      strands: ["R", "X", "F"],
      firstTeachingUnitId: "s3-grammar-u2",
      firstProductionLessonId: "s3-grammar-u2-l3",
      minimumExamSection: 3,
      scoredProduction: true,
      acceptedFormsSource: "inflect:past",
      evidence: "s3-grammar-u2-l3 teaches six reviewed typed polite-past production items across four previously taught verbs.",
    },
    "negation": {
      learnerLabel: "Negation",
      strands: ["X", "F"],
      firstTeachingUnitId: "s3-grammar-u2",
      firstProductionLessonId: "s3-grammar-u2-l3",
      minimumExamSection: 3,
      scoredProduction: true,
      acceptedFormsSource: "authored:pattern",
      evidence: "s3-grammar-u2-l3 teaches ten reviewed typed 안, 못, -지 않아요, and -지 못해요 production items with finite authored answer sets.",
    },
    "formal-register": {
      learnerLabel: "Formal & polite register",
      strands: ["F"],
      firstTeachingUnitId: "s5-grammar-u3",
      minimumExamSection: 5,
      scoredProduction: true,
      acceptedFormsSource: "inflect:formal",
      evidence: "s5-grammar-u3 (Register and respect) teaches -아요/어요, -(스)ㅂ니다, -네요, -(으)ㄹ까요 with form-recognition and form-production.",
    },
    "subject-honorific": {
      learnerLabel: "Subject honorifics",
      strands: ["F"],
      firstTeachingUnitId: "s5-grammar-u3",
      minimumExamSection: 5,
      scoredProduction: true,
      acceptedFormsSource: "inflect:honorific",
      evidence: "s5-grammar-u3 teaches -(으)시- and honorific predicates (계시다/드시다/주무시다) with form practice.",
    },
    "honorific-lexical": {
      learnerLabel: "Honorific & humble words",
      strands: ["F", "D"],
      firstTeachingUnitId: "s5-grammar-u3",
      minimumExamSection: 5,
      scoredProduction: false,
      acceptedFormsSource: "authored:lexeme",
      evidence: "s5-grammar-u3 teaches honorific/humble lexemes (성함/연세/분) with honorificRole tags.",
    },
    "noun-modification": {
      learnerLabel: "Noun modifiers",
      strands: ["F"],
      firstTeachingUnitId: "s7-grammar-u4",
      minimumExamSection: 7,
      scoredProduction: true,
      acceptedFormsSource: "inflect:attributive",
      evidence: "s7-grammar-u4 (Forms and nuance) teaches present/past/prospective/adjective modifiers with form practice.",
    },
    "irregular-families": {
      learnerLabel: "Irregular verb families",
      strands: ["F"],
      firstTeachingUnitId: "s7-grammar-u4",
      minimumExamSection: 7,
      scoredProduction: true,
      acceptedFormsSource: "inflect:family",
      evidence: "s7-grammar-u4 teaches irregular families (ㄷ/ㅂ/ㅅ/ㅎ/르/ㄹ-deletion) diagnosed by family.",
    },
    "sense-distinction": {
      learnerLabel: "Sense & contrast depth",
      strands: ["D"],
      firstTeachingUnitId: null, // per-word: gated by the target (and contrast partner) being in scope
      minimumExamSection: 1,
      scoredProduction: false,
      acceptedFormsSource: "authored:contrast",
      evidence: "Words carry senseKey/senseNo and contrastWith; depth items require every involved word to be in the exam scope.",
    },
    "collocation": {
      learnerLabel: "Collocation depth",
      strands: ["D"],
      firstTeachingUnitId: null,
      minimumExamSection: 1,
      scoredProduction: false,
      acceptedFormsSource: "authored:example",
      evidence: "Depth collocation items reuse the target's authored exampleKo frame; the target must be in scope.",
    },
  };

  // ── Shared scoring band templates (spec §7.1) ─────────────────────────────
  // Percentages are provisional HanaPath achievement standards until pilot
  // calibration (spec §10). Floors reference macrostrand percentages; `XF`
  // means the combined X+F percentage.
  var SECTION_SCORING = {
    pass: { overallPct: 75, floors: { R: 70, P: 60, XF: 60 } },
    distinction: { overallPct: 88, everyMacrostrandPct: 75 },
  };
  var SECTION_SCORING_EXAM1 = {
    // Exam 1 has no separate F floor; its context floor uses X alone (spec §7.1).
    pass: { overallPct: 75, floors: { R: 70, P: 60, X: 60 } },
    distinction: { overallPct: 88, everyMacrostrandPct: 75 },
  };
  var MIDTERM_SCORING = {
    pass: { overallPct: 75, noSectionBelowPct: 60, floors: { P: 60, XF: 60 } },
    distinction: { overallPct: 88, noSectionBelowPct: 75, everyMacrostrandPct: 75 },
  };
  var FINAL_SCORING = {
    pass: { overallPct: 80, noSectionBelowPct: 60, floors: { R: 75, P: 65, X: 65, F: 60 } },
    distinction: { overallPct: 90, noSectionBelowPct: 75, everyMajorMacrostrandPct: 80 },
  };

  // Minimum scored items before a subscore row may display a percentage (§8).
  var MIN_SUBSCORE_ITEMS = 3;

  // Standard per-exam controls reused by section exams.
  function alloc(rText, rAudio, c, p, x, f, d) {
    return { R_text: rText, R_audio: rAudio, C: c, P: p, X: x, F: f, D: d };
  }

  // POS balance floors keep noun-heavy sections from erasing other classes
  // (spec §6.3.4). Expressed as minimum item counts across the whole exam,
  // enforced by the generator's proportional POS balancer. `predicate` covers
  // verbs + adjectives (descriptive verbs).
  function posFloor(overrides) {
    return Object.assign({ predicate: 0, functionOrParticle: 0 }, overrides || {});
  }

  var EXAMS = [
    {
      id: "word-exam-1",
      order: 1,
      version: 2,
      title: "First Words Achievement Exam",
      titleKo: "첫 낱말 성취 시험",
      scopeSectionIds: ["s1"],
      unlock: { requiresSectionsComplete: ["s1"] },
      items: 40,
      timeMinutes: 30,
      allocation: alloc(8, 6, 4, 8, 8, 3, 3),
      requireEveryUnit: true,
      posFloor: posFloor({ predicate: 2 }),
      minContextItems: 4,
      scoring: SECTION_SCORING_EXAM1,
      purpose: "Certify the post-Hangul lexical on-ramp.",
    },
    {
      id: "word-exam-2",
      order: 2,
      version: 2,
      title: "Daily Life Achievement Exam",
      titleKo: "일상 성취 시험",
      scopeSectionIds: ["s2"],
      unlock: { requiresSectionsComplete: ["s2"] },
      items: 50,
      timeMinutes: 40,
      allocation: alloc(10, 8, 4, 10, 10, 5, 3),
      requireEveryUnit: true,
      posFloor: posFloor({}),
      minContextItems: 5,
      minFunctionContextItems: 5, // spec Exam 2: ≥5 contextual particle/function items
      scoring: SECTION_SCORING,
    },
    {
      id: "word-exam-3",
      order: 3,
      version: 2,
      title: "Out and About Achievement Exam",
      titleKo: "바깥 활동 성취 시험",
      scopeSectionIds: ["s3"],
      unlock: { requiresSectionsComplete: ["s3"] },
      items: 50,
      timeMinutes: 40,
      allocation: alloc(10, 8, 4, 10, 9, 6, 3),
      requireEveryUnit: true,
      posFloor: posFloor({}),
      minContextItems: 5,
      minFunctionContextItems: 4, // spec Exam 3: connecting-clause / function items
      scoring: SECTION_SCORING,
    },
    {
      id: "word-exam-4",
      order: 4,
      version: 2,
      title: "People & Plans Achievement Exam",
      titleKo: "사람과 계획 성취 시험",
      scopeSectionIds: ["s4"],
      unlock: { requiresSectionsComplete: ["s4"] },
      items: 50,
      timeMinutes: 40,
      allocation: alloc(10, 8, 4, 10, 9, 5, 4),
      requireEveryUnit: true,
      posFloor: posFloor({ predicate: 5 }), // spec Exam 4: ≥5 descriptive-verb targets
      minContextItems: 5,
      minTransactionalContexts: 5,
      scoring: SECTION_SCORING,
    },
    {
      id: "word-exam-5",
      order: 5,
      version: 2,
      title: "Core Foundations Midterm",
      titleKo: "핵심 기초 중간 시험",
      scopeSectionIds: ["s1", "s2", "s3", "s4"],
      unlock: { requiresSectionsComplete: ["s1", "s2", "s3", "s4"] },
      items: 80,
      timeMinutes: 65,
      allocation: alloc(14, 12, 6, 16, 16, 10, 6),
      requireEveryUnit: true,
      mixSections: true, // interleave sections within parts (spec Exam 5)
      posFloor: posFloor({ predicate: 6 }),
      minContextItems: 12,
      minFunctionContextItems: 6, // s2-grammar function words represented in context
      cumulative: true,
      scoring: MIDTERM_SCORING,
    },
    {
      id: "word-exam-6",
      order: 6,
      version: 2,
      title: "Getting Things Done Achievement Exam",
      titleKo: "일 처리 성취 시험",
      scopeSectionIds: ["s5"],
      unlock: { requiresSectionsComplete: ["s5"] },
      items: 50,
      timeMinutes: 40,
      allocation: alloc(9, 7, 4, 10, 10, 7, 3),
      requireEveryUnit: true,
      posFloor: posFloor({ predicate: 6 }),
      minContextItems: 6,
      minFormItems: 7, // spec Exam 6: ≥7 F items, recognition + production
      requireFormProduction: true,
      registerTagsSeparate: true, // listener / subject / lexical honorific tagged separately
      scoring: SECTION_SCORING,
    },
    {
      id: "word-exam-7",
      order: 7,
      version: 2,
      title: "Wider World Achievement Exam",
      titleKo: "넓은 세상 성취 시험",
      scopeSectionIds: ["s6"],
      unlock: { requiresSectionsComplete: ["s6"] },
      items: 50,
      timeMinutes: 40,
      allocation: alloc(9, 7, 4, 10, 10, 7, 3),
      requireEveryUnit: true,
      posFloor: posFloor({ predicate: 6 }),
      minNonCitationPredicateItems: 6, // spec Exam 7: ≥6 verb/descriptive-verb targets in non-citation forms
      minContextItems: 6,
      cumulative: true,
      scoring: SECTION_SCORING,
    },
    {
      id: "word-exam-8",
      order: 8,
      version: 2,
      title: "Depth & Nuance Achievement Exam",
      titleKo: "깊이와 뉘앙스 성취 시험",
      scopeSectionIds: ["s7"],
      unlock: { requiresSectionsComplete: ["s7"] },
      items: 60,
      timeMinutes: 50,
      allocation: alloc(10, 8, 4, 12, 12, 9, 5),
      requireEveryUnit: true,
      posFloor: posFloor({ predicate: 6 }),
      minFunctionContextItems: 3, // s7-grammar connectives/particles in context
      minFormItems: 9, // spec Exam 8: ≥9 F
      minDepthItems: 5, // spec Exam 8: ≥5 D
      irregularByFamily: true,
      scoring: SECTION_SCORING,
    },
    {
      id: "word-exam-9",
      order: 9,
      version: 2,
      title: "Finishing the Core Achievement Exam",
      titleKo: "핵심 마무리 성취 시험",
      scopeSectionIds: ["s8"],
      unlock: { requiresSectionsComplete: ["s8"] },
      items: 60,
      timeMinutes: 50,
      allocation: alloc(10, 8, 4, 12, 12, 9, 5),
      requireEveryUnit: true,
      posFloor: posFloor({ predicate: 6 }),
      minProductiveContextualCombinedPct: 40, // spec Exam 9: ≥40% P/X/F/D combined
      cumulative: true,
      scoring: SECTION_SCORING,
    },
    {
      id: "word-exam-10",
      order: 10,
      version: 2,
      title: "Core Words Final Achievement Exam",
      titleKo: "핵심 낱말 최종 성취 시험",
      scopeSectionIds: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"],
      unlock: { requiresSectionsComplete: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] },
      items: 150,
      timeMinutes: 120,
      allocation: alloc(25, 20, 10, 30, 30, 20, 15),
      requireEveryUnit: true,
      cumulative: true,
      minFunctionContextItems: 8, // Layer C function words/connectives via contextual X
      purpose: "Serious cumulative evidence of Core Words achievement.",
      // Final coverage layers (spec Exam 10). Layer sizes sum to 150.
      finalLayers: {
        A: { items: 75, model: "unit-anchor" },   // exactly one target per current unit
        B: { items: 45, model: "proportional" },   // breadth/deployment weighted by eligible sense count
        C: { items: 30, model: "specialist" },     // form/tense/negation/register/honorific/irregular + function/connective/modifier + depth
      },
      finalInvariants: {
        everySection: true,
        everyUnit: true,
        minUniqueAudioTargets: 30,
        minTypedProductionItems: 30,
        minContextualItems: 30,
        minFormItems: 20,
        minDepthItems: 15,
        minNonCitationPredicateItems: 20,
        maxSameSurface: 3,
      },
      // Retention confirmation is part of Exam 10, not an eleventh card (§7.2).
      retention: {
        confirmationItems: 60,
        confirmationTimeMinutes: 50,
        opensAfterDays: 7,
        expiresAfterDays: 21,
        avoidQualifyingTargets: true,
        // Qualifying = first attempt that clears these thresholds (§7.2).
        qualify: {
          overallPct: 88,
          floors: { R: 75, P: 75, X: 75, F: 75 },
          noSectionBelowPct: 70,
        },
        // Confirmation pass thresholds (§7.2) → awards Core Words mastered.
        confirm: {
          overallPct: 80,
          floors: { P: 65, XF: 65 },
          noSectionBelowPct: 60,
        },
        // Confirmation allocation mirrors a 60-item form of the §6.2 shape,
        // scaled to keep every macrostrand represented.
        allocation: alloc(10, 8, 4, 12, 12, 9, 5),
      },
      scoring: FINAL_SCORING,
    },
  ];

  window.HANAPATH_WORD_EXAMS = EXAMS;
  window.HANAPATH_WORD_EXAM_COMPETENCIES = COMPETENCIES;
  window.HANAPATH_WORD_EXAM_META = {
    blueprintVersion: 2,
    minSubscoreItems: MIN_SUBSCORE_ITEMS,
    macrostrands: ["R", "C", "P", "X", "F", "D"],
    // Macrostrands that R_text and R_audio both roll up into.
    receptiveModes: { R_text: "ko-to-meaning", R_audio: "audio-to-meaning" },
    achievementStandardsProvisional: true,
  };
})();
