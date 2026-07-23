// word_exam_engine.js — Core Word Examination Suite deterministic engine (v3).
// Plain browser global; must load before app.js and after word_exam_blueprints.js.
// Governing contract: docs/CORE_WORD_EXAM_SPECS.md.
//
// PURE + DETERMINISTIC. The only entropy is a seeded PRNG derived from
// (examId, seed, mode). Given the same live curriculum/data, the same
// (examId, seed, mode) always produces byte-equivalent item metadata. It never
// reads learner SRS/recent-history/error state, so official attempts are
// comparable. The browser runner (app.js) and scripts/audit-word-exams.mjs call
// the exact same functions on the same browser globals.
//
// Reads these globals (window in browser, one shared VM sandbox in the audit):
//   HANAPATH_CURATED_WORDS, HANAPATH_WORD_SECTIONS/UNITS/LESSONS,
//   HANAPATH_INFLECT, AUDIO_MAP, HANAPATH_WORD_EXAMS,
//   HANAPATH_WORD_EXAM_COMPETENCIES, HANAPATH_WORD_EXAM_META
(function () {
  "use strict";

  var G = typeof window !== "undefined" ? window : globalThis;

  // ── Deterministic PRNG (integer math, identical in Node + browser) ─────────
  function xmur3(str) {
    var h = 1779033703 ^ str.length;
    for (var i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return h >>> 0;
    };
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeRng(seedStr) {
    var seed = xmur3(String(seedStr));
    return mulberry32(seed());
  }
  function shuffle(arr, rng) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pick(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }

  function nfc(s) { return String(s == null ? "" : s).normalize("NFC").trim(); }

  // ── Data model (memoized; live globals are static after load) ──────────────
  var _dataCache = null;
  function buildData() {
    if (_dataCache) return _dataCache;
    return (_dataCache = buildDataUncached());
  }
  function buildDataUncached() {
    var words = G.HANAPATH_CURATED_WORDS || [];
    var sections = G.HANAPATH_WORD_SECTIONS || [];
    var units = G.HANAPATH_WORD_UNITS || [];
    var lessons = G.HANAPATH_WORD_LESSONS || [];
    var audioMap = G.AUDIO_MAP || {};

    var wordById = new Map();
    words.forEach(function (w) { wordById.set(w.id, w); });
    var unitById = new Map();
    units.forEach(function (u) { unitById.set(u.id, u); });
    var sectionById = new Map();
    sections.forEach(function (s) { sectionById.set(s.id, s); });
    var sectionOrder = new Map();
    sections.forEach(function (s) { sectionOrder.set(s.id, s.order); });

    // word -> its single content lesson / unit / section (spec §1.1: every
    // curated word is allocated once to a content lesson).
    var wordUnit = new Map();
    var unitOrderInSection = new Map();
    lessons.forEach(function (l) {
      if (l.type !== "content") return;
      (l.newWordIds || []).forEach(function (wid) {
        var u = unitById.get(l.unitId);
        if (u) wordUnit.set(wid, u);
      });
    });
    units.forEach(function (u) { unitOrderInSection.set(u.id, u.order); });

    // Audio index (NFC-normalized keys → non-empty file).
    var audioIndex = new Set();
    Object.keys(audioMap).forEach(function (k) {
      if (audioMap[k]) audioIndex.add(nfc(k));
    });
    function hasAudio(text) { return audioIndex.has(nfc(text)); }

    // Annotate each word once (kills per-slot Map lookups in generation).
    words.forEach(function (w) {
      var u = wordUnit.get(w.id);
      w._unitId = u ? u.id : null;
      w._sectionId = u ? u.sectionId : null;
      w._korean = nfc(w.korean);
    });

    return {
      words: words, sections: sections, units: units, lessons: lessons,
      wordById: wordById, unitById: unitById, sectionById: sectionById,
      sectionOrder: sectionOrder, wordUnit: wordUnit,
      unitOrderInSection: unitOrderInSection, hasAudio: hasAudio,
      inflect: G.HANAPATH_INFLECT || null,
      competencies: G.HANAPATH_WORD_EXAM_COMPETENCIES || {},
    };
  }

  function examById(examId, version) {
    if (G.resolveWordExamBlueprint) {
      return G.resolveWordExamBlueprint(examId, version);
    }
    var ver = (version == null || version === "") ? 3 : Number(version);
    var exams = (ver === 2 && G.HANAPATH_WORD_EXAM_BLUEPRINTS && G.HANAPATH_WORD_EXAM_BLUEPRINTS.EXAMS_V2)
      ? G.HANAPATH_WORD_EXAM_BLUEPRINTS.EXAMS_V2
      : (G.HANAPATH_WORD_EXAMS || []);
    return exams.find(function (e) { return e.id === examId; });
  }

  // ── Word helpers ───────────────────────────────────────────────────────────
  function isPredicate(w) { return w && (w.pos === "verb" || w.pos === "adjective"); }
  function isFunctionish(w) {
    return w && (w.isFunctionWord || w.pos === "particle" || w.pos === "ending" || w.pos === "conjunction");
  }
  // Clean single Korean surface (no allomorph slash / pattern placeholder) so it
  // is safe to type or blank.
  function isTypableSurface(w) {
    var k = nfc(w.korean);
    return /^[가-힣][가-힣 ]*$/.test(k) && k.indexOf("/") === -1;
  }
  function shortMeaning(w) { return nfc(w.meaningShort || w.meaning); }
  function fullMeaning(w) { return nfc(w.meaning); }
  function posClass(w) {
    if (isPredicate(w)) return "predicate";
    if (isFunctionish(w)) return "function";
    if (w.pos === "noun" || w.pos === "pronoun") return "noun";
    return "other";
  }

  function conjugate(data, w, formName) {
    if (!data.inflect || !isPredicate(w)) return null;
    // Only conjugate genuine citation forms (…다). A few curated "predicates"
    // carry an already-derived surface (e.g. 지나온); conjugating those yields
    // an invalid form that embeds the lemma, so skip them entirely.
    if (!nfc(w.korean).endsWith("다")) return null;
    try {
      var form = data.inflect.conjugate(w.korean, w.pos, w.irregularFamily, formName);
      form = nfc(form);
      if (!form || form === nfc(w.korean)) return null;
      return form;
    } catch (e) { return null; }
  }

  // All generated/authored surfaces of a word (used to keep distractors from
  // being accepted inflection variants of the answer — spec §5.3.6).
  function allSurfaces(data, w) {
    var set = new Set([nfc(w.korean)]);
    (w.forms || []).forEach(function (f) { set.add(nfc(f)); });
    (w.inflections || []).forEach(function (f) { set.add(nfc(f)); });
    if (isPredicate(w)) {
      ["polite", "formal", "past", "honorific", "attributive"].forEach(function (fn) {
        var f = conjugate(data, w, fn);
        if (f) set.add(f);
      });
    }
    return set;
  }

  // ── Scope resolution ───────────────────────────────────────────────────────
  function resolveScope(data, exam) {
    var sectionSet = new Set(exam.scopeSectionIds);
    var maxSection = 0;
    exam.scopeSectionIds.forEach(function (sid) {
      maxSection = Math.max(maxSection, data.sectionOrder.get(sid) || 0);
    });
    var scopeWords = [];
    data.words.forEach(function (w) {
      var u = data.wordUnit.get(w.id);
      if (u && sectionSet.has(u.sectionId)) scopeWords.push(w);
    });
    // Stable order by id so generation is deterministic regardless of source order.
    scopeWords.sort(function (a, b) { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; });
    var scopeUnits = data.units.filter(function (u) { return sectionSet.has(u.sectionId); });
    scopeUnits.sort(function (a, b) {
      var so = (data.sectionOrder.get(a.sectionId) || 0) - (data.sectionOrder.get(b.sectionId) || 0);
      return so !== 0 ? so : (a.order - b.order);
    });
    return { sectionSet: sectionSet, maxSection: maxSection, scopeWords: scopeWords, scopeUnits: scopeUnits };
  }

  // A competency may be tested by an exam iff its milestone section ≤ the exam's
  // highest scope section (form knowledge is cumulative — spec §3.4.1).
  function competencyEligible(data, exam, scope, competencyId) {
    var c = data.competencies[competencyId];
    if (!c) return false;
    return (c.minimumExamSection || 1) <= scope.maxSection;
  }

  // ── Distractor helpers ─────────────────────────────────────────────────────
  // Meaning distractors: other in-scope words with a distinct gloss, distinct
  // wordId, not a sibling sense of the answer (spec §5.3).
  function meaningDistractors(data, answerWord, pool, rng, n, preferPos) {
    var answerGloss = shortMeaning(answerWord);
    var answerLemma = nfc(answerWord.lemma || answerWord.korean);
    var answerSense = answerWord.senseKey || null;
    var seen = new Set([answerGloss.toLowerCase()]);
    var out = [];
    var ordered = shuffle(pool, rng).sort(function (a, b) {
      if (!preferPos) return 0;
      var pa = posClass(a) === preferPos ? 0 : 1;
      var pb = posClass(b) === preferPos ? 0 : 1;
      return pa - pb;
    });
    for (var i = 0; i < ordered.length && out.length < n; i++) {
      var w = ordered[i];
      if (w.id === answerWord.id) continue;
      var g = shortMeaning(w);
      if (!g) continue;
      if (seen.has(g.toLowerCase())) continue; // no duplicate gloss
      if (nfc(w.lemma || w.korean) === answerLemma) continue; // no sibling of same lemma
      if (answerSense && w.senseKey === answerSense) continue;
      seen.add(g.toLowerCase());
      out.push(g);
    }
    return out.length === n ? out : null;
  }

  // Korean-surface distractors: distinct surfaces, none an accepted inflection
  // of the answer (spec §5.3.6).
  function surfaceDistractors(data, answerWord, answerSurface, pool, rng, n, preferPos) {
    var banned = allSurfaces(data, answerWord);
    banned.add(nfc(answerSurface));
    var seen = new Set([nfc(answerSurface)]);
    var out = [];
    var ordered = shuffle(pool, rng).sort(function (a, b) {
      if (!preferPos) return 0;
      var pa = posClass(a) === preferPos ? 0 : 1;
      var pb = posClass(b) === preferPos ? 0 : 1;
      return pa - pb;
    });
    for (var i = 0; i < ordered.length && out.length < n; i++) {
      var w = ordered[i];
      if (w.id === answerWord.id) continue;
      var s = nfc(w.korean);
      if (!s || !isTypableSurface(w)) continue;
      if (banned.has(s) || seen.has(s)) continue;
      seen.add(s);
      out.push(s);
    }
    return out.length === n ? out : null;
  }

  function assembleOptions(answer, distractors, rng) {
    var opts = [answer].concat(distractors);
    // dedupe defensively
    var uniq = [];
    var seen = new Set();
    opts.forEach(function (o) { var k = nfc(o); if (!seen.has(k)) { seen.add(k); uniq.push(o); } });
    if (uniq.length !== 4) return null;
    return shuffle(uniq, rng);
  }

  // ── Item builders (each returns a valid item or null) ──────────────────────
  // Common metadata: primary strand, competency, target, section/unit/pos.
  function baseItem(data, w, strand, mode, competencyId) {
    var u = data.wordUnit.get(w.id);
    return {
      mode: mode,
      strand: strand,
      competencyId: competencyId,
      secondaryCompetencyIds: [],
      targetWordId: w.id,
      sectionId: u ? u.sectionId : null,
      unitId: u ? u.id : null,
      pos: w.pos,
      posClass: posClass(w),
      korean: nfc(w.korean),
      isNonCitation: false,
      audioText: null,
      allowSpaceFlexible: false,
    };
  }

  function buildKoToMeaning(data, w, scope, rng) {
    var gloss = shortMeaning(w);
    if (!gloss) return null;
    var d = meaningDistractors(data, w, scope.scopeWords, rng, 3, posClass(w));
    if (!d) return null;
    var options = assembleOptions(gloss, d, rng);
    if (!options) return null;
    var it = baseItem(data, w, "R", "ko-to-meaning", "lexeme-identity");
    it.promptKo = nfc(w.korean);
    it.promptEn = "What does this word mean?";
    it.stimulus = nfc(w.display || w.korean);
    it.options = options;
    it.answer = gloss;
    return it;
  }

  function buildAudioToMeaning(data, w, scope, rng) {
    var voice = nfc(w.voiceText || w.korean);
    if (!data.hasAudio(voice)) return null;
    var gloss = shortMeaning(w);
    if (!gloss) return null;
    var d = meaningDistractors(data, w, scope.scopeWords, rng, 3, posClass(w));
    if (!d) return null;
    var options = assembleOptions(gloss, d, rng);
    if (!options) return null;
    var it = baseItem(data, w, "R", "audio-to-meaning", "lexeme-identity");
    it.promptKo = "잘 듣고 뜻을 고르십시오.";
    it.promptEn = "Listen and choose the meaning.";
    it.audioText = voice;
    it.options = options;
    it.answer = gloss;
    return it;
  }

  function buildMeaningToKo(data, w, scope, rng) {
    if (!isTypableSurface(w)) return null;
    var surface = nfc(w.korean);
    var d = surfaceDistractors(data, w, surface, scope.scopeWords, rng, 3, posClass(w));
    if (!d) return null;
    var options = assembleOptions(surface, d, rng);
    if (!options) return null;
    var it = baseItem(data, w, "C", "meaning-to-ko", "lexeme-identity");
    it.promptKo = "알맞은 낱말을 고르십시오.";
    it.promptEn = "Which Korean word means “" + fullMeaning(w) + "”?";
    it.stimulus = fullMeaning(w);
    it.options = options;
    it.answer = surface;
    return it;
  }

  function buildTypeKo(data, w, scope, rng, audioCue) {
    if (!isTypableSurface(w)) return null;
    var surface = nfc(w.korean);
    var it = baseItem(data, w, "P", "type-ko", "lexeme-identity");
    // Keep the generic instruction lexically neutral: "한국어로" reveals the
    // complete answer for 한국어 and partially reveals 한국.
    it.promptKo = "입력하십시오.";
    it.promptEn = "Type the Korean for “" + fullMeaning(w) + "”.";
    it.stimulus = fullMeaning(w);
    it.answer = surface;
    var accepted = new Set([surface]);
    if (w.display && isTypableSurface({ korean: w.display })) accepted.add(nfc(w.display));
    it.acceptedAnswers = Array.from(accepted);
    it.allowSpaceFlexible = Boolean(w.allowSpaceFlexible);
    if (audioCue && data.hasAudio(nfc(w.voiceText || w.korean))) it.audioText = nfc(w.voiceText || w.korean);
    return it;
  }

  // X — sentence-blank from the word's authored example (spec §5.2 authored
  // context). MCQ over four Korean surfaces.
  function buildSentenceBlank(data, w, scope, rng) {
    if (!isTypableSurface(w)) return null;
    var ex = nfc(w.exampleKo);
    var surface = nfc(w.korean);
    if (!ex || ex.indexOf(surface) === -1) return null;
    // Only blank when the surface occurs once (unique, defensible fill).
    if (ex.split(surface).length - 1 !== 1) return null;
    var d = surfaceDistractors(data, w, surface, scope.scopeWords, rng, 3, posClass(w));
    if (!d) return null;
    var options = assembleOptions(surface, d, rng);
    if (!options) return null;
    var blanked = ex.replace(surface, "____");
    var it = baseItem(data, w, "X", "sentence-blank", "lexeme-identity");
    it.promptKo = blanked;
    it.promptEn = "Choose the word that completes the sentence.";
    it.stimulus = blanked;
    it.contextEn = nfc(w.exampleEn);
    it.options = options;
    it.answer = surface;
    return it;
  }

  // X — function-usage: an authored example of a function word with the function
  // word blanked; MCQ over four function-word surfaces (spec §5.1).
  function buildFunctionUsage(data, w, scope, rng) {
    if (!isFunctionish(w)) return null;
    var ex = nfc(w.exampleKo);
    var surface = nfc(w.korean);
    if (!ex || surface.indexOf("/") !== -1) {
      // allomorph particle (은/는): fall back to the recognition-of-function frame
      return buildParticleFunction(data, w, scope, rng, "X");
    }
    if (ex.indexOf(surface) === -1 || ex.split(surface).length - 1 !== 1) {
      return buildParticleFunction(data, w, scope, rng, "X");
    }
    var pool = scope.scopeWords.filter(isFunctionish);
    var d = surfaceDistractors(data, w, surface, pool, rng, 3, "function");
    if (!d) return null;
    var options = assembleOptions(surface, d, rng);
    if (!options) return null;
    var blanked = ex.replace(surface, "____");
    var comp = w.lessonGroup === "tense-negation" ? "negation" : (w.lessonGroup === "connectives" ? "connectives" : "particle-function");
    if (!competencyEligible(data, scope.examRef, scope, comp)) comp = "particle-function";
    var it = baseItem(data, w, "X", "function-usage", comp);
    it.promptKo = blanked;
    it.promptEn = "Choose the particle/ending that fits.";
    it.stimulus = blanked;
    it.contextEn = nfc(w.exampleEn);
    it.options = options;
    it.answer = surface;
    return it;
  }

  // Function/role recognition MCQ (used for F, and as an X fallback for
  // allomorph particles). Options are learner-facing role labels.
  var ROLE_LABELS = {
    topic: "Marks the topic", subject: "Marks the subject", object: "Marks the object",
    possessive: "Shows possession (of)", "location-time": "Marks place or time",
    "action-location": "Marks where an action happens", additive: "Means “also / too”",
    connective: "Joins two nouns/clauses", "verb-connective": "Joins two verbs (“and”)",
    direction: "Shows direction", "direction-means": "Shows direction or means",
    recipient: "Marks the recipient (to a person)", limit: "Means “up to / until”",
    "start-point": "Means “from”", purpose: "Shows purpose", comparison: "Shows comparison",
    emphasis: "Adds emphasis (even)", vocative: "Calls out to someone", quotation: "Marks a quotation",
    complement: "Marks a complement",
  };
  function roleLabel(role) { return ROLE_LABELS[role] || null; }
  function buildParticleFunction(data, w, scope, rng, strand) {
    var role = w.grammarRole;
    var answer = roleLabel(role);
    if (!answer) return null;
    var others = Object.keys(ROLE_LABELS).map(function (k) { return ROLE_LABELS[k]; })
      .filter(function (lbl) { return lbl !== answer; });
    var d = shuffle(others, rng).slice(0, 3);
    if (d.length < 3) return null;
    var options = assembleOptions(answer, d, rng);
    if (!options) return null;
    var comp = "particle-function";
    var it = baseItem(data, w, strand || "F", "form-recognition", comp);
    it.promptKo = nfc(w.korean) + " — 알맞은 기능을 고르십시오.";
    it.promptEn = "What is the grammatical function of “" + nfc(w.korean) + "”?";
    it.stimulus = nfc(w.korean);
    it.options = options;
    it.answer = answer;
    return it;
  }

  var GRAMMAR_GROUPS = {
    "tense-negation": true, connectives: true, "endings-register": true,
    honorifics: true, "noun-modification": true, "function-words-1": true,
  };
  function isGrammarWord(w) { return w && GRAMMAR_GROUPS[w.lessonGroup]; }
  function grammarCompetency(w) {
    var g = w.lessonGroup;
    if (g === "tense-negation") return (w.tags && w.tags.indexOf("past") !== -1) ? "past-tense" : "negation";
    if (g === "connectives") return "connectives";
    if (g === "endings-register") return "formal-register";
    if (g === "honorifics") return w.honorificRole === "subject" ? "subject-honorific" : "honorific-lexical";
    if (g === "noun-modification") return "noun-modification";
    return "particle-function";
  }
  // F — grammar/function word recognition by function (form → meaning/function).
  // Covers negation, past ending, connectives, register endings, modifiers, and
  // honorific/humble lexemes — all genuinely taught in their grammar units.
  function buildGrammarFormRecognition(data, w, scope, rng) {
    var comp = grammarCompetency(w);
    if (!competencyEligible(data, scope.examRef, scope, comp)) return null;
    var answer = shortMeaning(w);
    if (!answer) return null;
    var pool = scope.scopeWords.filter(function (x) {
      return x.id !== w.id && (isGrammarWord(x) || isFunctionish(x));
    });
    var d = meaningDistractors(data, w, pool.length >= 6 ? pool : scope.scopeWords, rng, 3, null);
    if (!d) return null;
    var options = assembleOptions(answer, d, rng);
    if (!options) return null;
    var it = baseItem(data, w, "F", "form-recognition", comp);
    it.promptKo = nfc(w.korean) + " — 알맞은 뜻/기능을 고르십시오.";
    it.promptEn = "What does “" + nfc(w.korean) + "” mean or do?";
    it.stimulus = nfc(w.korean);
    it.options = options;
    it.answer = answer;
    return it;
  }

  // F — polite-present form recognition: parse the non-citation polite form and
  // choose its meaning (spec §2: form → function/meaning/context). Meaning
  // distractors keep this feasible even where predicates are scarce (S1/S2).
  function buildPolitePresentRecognition(data, w, scope, rng) {
    var form = conjugate(data, w, "polite");
    if (!form) return null;
    var gloss = shortMeaning(w);
    if (!gloss) return null;
    var d = meaningDistractors(data, w, scope.scopeWords, rng, 3, null);
    if (!d) return null;
    var options = assembleOptions(gloss, d, rng);
    if (!options) return null;
    var it = baseItem(data, w, "F", "form-recognition", "polite-present");
    it.promptKo = form + " — 뜻을 고르십시오.";
    it.promptEn = "“" + form + "” is a polite present form. What does it mean?";
    it.stimulus = form;
    it.options = options;
    it.answer = gloss;
    it.isNonCitation = true;
    return it;
  }

  // F — register-choice: scenario audience → uniquely appropriate produced form
  // (spec §5.1 register-choice). Context (not an instruction) selects the form.
  var REGISTER_FORMS = [
    { formName: "formal", label: "formal", competency: "formal-register",
      scenarioKo: "회사에서 상사에게 격식 있게 말할 때", scenarioEn: "Speaking formally to your boss at work" },
    { formName: "honorific", label: "honorific", competency: "subject-honorific",
      scenarioKo: "웃어른께 높임말로 말할 때", scenarioEn: "Speaking respectfully to an elder (subject honorific)" },
    { formName: "polite", label: "polite", competency: "formal-register",
      scenarioKo: "친한 사이에서 편하게 존댓말로 말할 때", scenarioEn: "Speaking politely but casually to a friend" },
  ];
  function buildRegisterChoice(data, w, scope, rng, wantFormName) {
    if (!isPredicate(w)) return null;
    var spec = REGISTER_FORMS.filter(function (r) { return !wantFormName || r.formName === wantFormName; });
    var target = null;
    for (var i = 0; i < spec.length; i++) {
      if (!competencyEligible(data, scope.examRef, scope, spec[i].competency)) continue;
      var f = conjugate(data, w, spec[i].formName);
      if (f) { target = { def: spec[i], form: f }; break; }
    }
    if (!target) return null;
    // Distractor forms = the same verb in other speech levels (all authored by
    // the inflection engine, all supported) — the scenario makes exactly one
    // appropriate.
    var alt = [];
    ["polite", "formal", "honorific", "past"].forEach(function (fn) {
      if (fn === target.def.formName) return;
      var f = conjugate(data, w, fn);
      if (f && f !== target.form && alt.indexOf(f) === -1) alt.push(f);
    });
    if (alt.length < 3) return null;
    var d = shuffle(alt, rng).slice(0, 3);
    var options = assembleOptions(target.form, d, rng);
    if (!options) return null;
    var it = baseItem(data, w, "F", "register-choice", target.def.competency);
    it.promptKo = target.def.scenarioKo + " — 알맞은 형태를 고르십시오.";
    it.promptEn = target.def.scenarioEn + ". Choose the form of “" + nfc(w.korean) + "” that fits.";
    it.stimulus = fullMeaning(w) + " — " + nfc(w.korean);
    it.options = options;
    it.answer = target.form;
    it.isNonCitation = true;
    it.registerRole = target.def.formName === "honorific" ? "subject" : "listener";
    return it;
  }

  // F — irregular / modifier family recognition (attributive form → lemma),
  // tagged by irregular family where present (spec Exam 8).
  function buildAttributiveRecognition(data, w, scope, rng) {
    var form = conjugate(data, w, "attributive");
    if (!form) return null;
    var lemma = nfc(w.korean);
    var pool = scope.scopeWords.filter(function (x) { return isPredicate(x) && isTypableSurface(x); });
    var d = surfaceDistractors(data, w, lemma, pool, rng, 3, "predicate");
    if (!d) return null;
    var options = assembleOptions(lemma, d, rng);
    if (!options) return null;
    var comp = w.irregularFamily ? "irregular-families" : "noun-modification";
    var it = baseItem(data, w, "F", "form-recognition", comp);
    it.promptKo = form + " — 기본형을 고르십시오.";
    it.promptEn = "“" + form + "” is the noun-modifying form of which dictionary word?";
    it.stimulus = form;
    it.options = options;
    it.answer = lemma;
    it.isNonCitation = true;
    if (w.irregularFamily) it.irregularFamily = w.irregularFamily;
    return it;
  }

  // D — sense-disambiguation using an authored contrast pair (spec §5.1).
  function buildSenseDisambiguation(data, w, scope, rng) {
    var partners = (w.contrastWith || []).map(function (k) {
      // contrastWith stores Korean surfaces; resolve to an in-scope word.
      return scope.scopeWords.find(function (x) { return nfc(x.korean) === nfc(k) && x.id !== w.id; });
    }).filter(Boolean);
    if (!partners.length) return null;
    var partner = pick(partners, rng);
    var ex = nfc(w.exampleKo);
    if (!ex) return null;
    var gloss = shortMeaning(w);
    var partnerGloss = shortMeaning(partner);
    if (!gloss || !partnerGloss || gloss.toLowerCase() === partnerGloss.toLowerCase()) return null;
    var extra = meaningDistractors(data, w, scope.scopeWords, rng, 2, posClass(w));
    if (!extra) return null;
    // ensure partner gloss not duplicated by extras
    extra = extra.filter(function (g) { return g.toLowerCase() !== partnerGloss.toLowerCase(); });
    if (extra.length < 2) {
      extra = meaningDistractors(data, w, scope.scopeWords.filter(function (x) { return x.id !== partner.id; }), rng, 2, posClass(w));
      if (!extra) return null;
    }
    var options = assembleOptions(gloss, [partnerGloss].concat(extra.slice(0, 2)), rng);
    if (!options) return null;
    var it = baseItem(data, w, "D", "sense-disambiguation", "sense-distinction");
    it.promptKo = ex;
    it.promptEn = "In this sentence, what does “" + nfc(w.korean) + "” mean here?";
    it.stimulus = ex;
    it.contextEn = nfc(w.exampleEn);
    it.options = options;
    it.answer = gloss;
    it.secondaryCompetencyIds = ["sense-distinction"];
    return it;
  }

  // D — collocation-choice: authored frame + same-POS close distractors.
  function buildCollocation(data, w, scope, rng) {
    if (!isTypableSurface(w)) return null;
    var ex = nfc(w.exampleKo);
    var surface = nfc(w.korean);
    if (!ex || ex.indexOf(surface) === -1 || ex.split(surface).length - 1 !== 1) return null;
    var pool = scope.scopeWords.filter(function (x) { return posClass(x) === posClass(w); });
    if (pool.length < 6) pool = scope.scopeWords;
    var d = surfaceDistractors(data, w, surface, pool, rng, 3, posClass(w));
    if (!d) return null;
    var options = assembleOptions(surface, d, rng);
    if (!options) return null;
    var blanked = ex.replace(surface, "____");
    var it = baseItem(data, w, "D", "collocation-choice", "collocation");
    it.promptKo = blanked;
    it.promptEn = "Which word naturally fits this expression?";
    it.stimulus = blanked;
    it.contextEn = nfc(w.exampleEn);
    it.options = options;
    it.answer = surface;
    return it;
  }

  // P — typed past-tense production (v3). The prompt names the target lemma
  // and the required transformation (mirroring the taught s3-grammar-u2-l3
  // items, e.g. "보다 → past"); no pre-answer field contains the conjugated
  // answer. Uses the audited inflection engine.
  function buildPastProduction(data, w, scope, rng) {
    if (!isPredicate(w)) return null;
    if (scope.examRef && scope.examRef.version === 2) return null;
    if (!competencyEligible(data, scope.examRef, scope, "past-tense")) return null;
    var past = conjugate(data, w, "past");
    if (!past) return null;
    var it = baseItem(data, w, "P", "form-production", "past-tense");
    it.isNonCitation = true;
    it.promptEn = "Change “" + nfc(w.korean) + "” (" + fullMeaning(w) +
      ") to the polite past form.";
    it.promptKo = nfc(w.korean) + " — 공손한 과거형으로 입력하십시오.";
    it.stimulus = it.promptEn;
    it.answer = past;
    it.acceptedAnswers = [past];
    it.typeTarget = past;
    return it;
  }

  // F — typed negation production (v3). The prompt names exactly one of the
  // four taught negation frames (안 / 못 / -지 않아요 / -지 못해요, mirroring
  // s3-grammar-u2-l3 "Negate with 안: …") so the required construction is
  // unambiguous, but never shows the completed surface form — no pre-answer
  // field may contain the accepted answer (PR #343 review). Authored patterns
  // only — the inflection engine has no generic negation form.
  var NEGATION_FRAMES = [
    { prefix: "안 ", suffix: null, actionOnly: false, label: "short-negative",
      marker: "안", frameEn: "short negation" },
    { prefix: "못 ", suffix: null, actionOnly: true,  label: "short-inability",
      marker: "못", frameEn: "short inability" },
    { prefix: null, suffix: "지 않아요", actionOnly: false, label: "long-negative",
      marker: "-지 않아요", frameEn: "long negation" },
    { prefix: null, suffix: "지 못해요", actionOnly: true,  label: "long-inability",
      marker: "-지 못해요", frameEn: "long inability" },
  ];
  function buildNegationProduction(data, w, scope, rng) {
    if (!isPredicate(w)) return null;
    if (scope.examRef && scope.examRef.version === 2) return null;
    if (!competencyEligible(data, scope.examRef, scope, "negation")) return null;
    var polite = conjugate(data, w, "polite");
    if (!polite) return null;
    var isAction = w.pos === "verb" && w.morphTag !== "VA";
    var eligible = NEGATION_FRAMES.filter(function (f) { return !f.actionOnly || isAction; });
    var frame = eligible[Math.floor(rng() * eligible.length)];
    var stem = data.inflect ? data.inflect.getStem(nfc(w.korean)) : null;
    var answer;
    if (frame.prefix) {
      answer = frame.prefix + polite;
    } else {
      if (!stem) return null;
      answer = stem + frame.suffix;
    }
    answer = nfc(answer);
    var it = baseItem(data, w, "F", "form-production", "negation");
    it.isNonCitation = true;
    it.negationFrame = frame.label;
    it.promptEn = "Change “" + nfc(w.korean) + "” (" + fullMeaning(w) +
      ") to the polite present using " + frame.frameEn + " " + frame.marker + ".";
    it.promptKo = nfc(w.korean) + " — " + frame.marker + " 형식의 공손한 부정형으로 입력하십시오.";
    it.stimulus = it.promptEn;
    it.answer = answer;
    it.acceptedAnswers = [answer];
    it.typeTarget = answer;
    return it;
  }

  // ── Strand fill order (scarcest pools first) ───────────────────────────────
  var STRAND_SLOTS = ["R_text", "R_audio", "C", "P", "X", "F", "D"];
  var STRAND_PRIMARY = { R_text: "R", R_audio: "R", C: "C", P: "P", X: "X", F: "F", D: "D" };
  // Fill order: constrained strands first so scarce targets (predicates,
  // contrast words, function words) are reserved before abundant noun R/C fill.
  var FILL_ORDER = ["D", "F", "X", "P", "C", "R_audio", "R_text"];

  function surfaceKey(it) { return it.korean || nfc(it.answer); }

  // ── Core generation ────────────────────────────────────────────────────────
  function generateItems(exam, seed, mode, options) {
    var data = buildData();
    var scope = resolveScope(data, exam);
    scope.examRef = exam;
    var rng = makeRng(exam.id + "|" + mode + "|" + seed);
    var allocation = mode === "confirmation" && exam.retention
      ? exam.retention.allocation
      : exam.allocation;
    var maxSameSurface = (exam.finalInvariants && exam.finalInvariants.maxSameSurface) || 2;
    var avoid = new Set((options && options.avoidTargetIds) || []);

    var usedByStrand = {}; // wordId -> Set(strand) for without-replacement per strand
    var surfaceCounts = new Map();
    var items = [];

    function canUse(w, strand) {
      if (avoid.has(w.id)) return false;
      var strands = usedByStrand[w.id];
      if (strands && strands.has(strand)) return false; // same strand twice never
      if (strands && strands.size >= 2) return false;    // ≤2 strands per word
      var sc = surfaceCounts.get(w._korean || nfc(w.korean)) || 0;
      if (sc >= maxSameSurface) return false;
      return true;
    }
    function commit(it) {
      var wid = it.targetWordId;
      if (!usedByStrand[wid]) usedByStrand[wid] = new Set();
      usedByStrand[wid].add(it.strand);
      var k = surfaceKey(it);
      surfaceCounts.set(k, (surfaceCounts.get(k) || 0) + 1);
      items.push(it);
    }

    // Candidate builders per strand slot, tried in order until one yields a
    // valid, safe item.
    function buildForSlot(slot, unitFilter, preferClass) {
      var strand = STRAND_PRIMARY[slot];
      var pool = scope.scopeWords.filter(function (w) {
        if (unitFilter && (!data.wordUnit.get(w.id) || data.wordUnit.get(w.id).id !== unitFilter)) return false;
        return canUse(w, strand);
      });
      pool = shuffle(pool, rng);
      function prefRank(w) {
        if (!preferClass) return 0;
        if (preferClass === "function") return (isFunctionish(w) || isGrammarWord(w)) ? 0 : 1;
        if (preferClass === "predicate") return isPredicate(w) ? 0 : 1;
        if (preferClass === "past-production") return isPredicate(w) ? 0 : 1;
        if (preferClass === "negation-production") return isPredicate(w) ? 0 : 1;
        return 0;
      }
      // Stable 4-bucket partition equivalent to sorting by (prefRank, unitNeeded).
      // Preserves shuffle order within buckets — identical result to a stable
      // sort, without the O(N log N) + repeated Map lookups.
      var buckets = [[], [], [], []];
      for (var pi = 0; pi < pool.length; pi++) {
        var pw = pool[pi];
        var key = prefRank(pw) * 2 + (unitsNeeding.has(pw._unitId) ? 0 : 1);
        buckets[key].push(pw);
      }
      pool = buckets[0].concat(buckets[1], buckets[2], buckets[3]);
      for (var i = 0; i < pool.length; i++) {
        var w = pool[i];
        var it = null;
        if (slot === "R_text") it = buildKoToMeaning(data, w, scope, rng);
        else if (slot === "R_audio") it = buildAudioToMeaning(data, w, scope, rng);
        else if (slot === "C") it = buildMeaningToKo(data, w, scope, rng);
        else if (slot === "P") {
          if (preferClass === "past-production") it = buildPastProduction(data, w, scope, rng);
          if (!it) it = buildTypeKo(data, w, scope, rng, false);
        }
        else if (slot === "X") it = buildX(w);
        else if (slot === "F") {
          if (preferClass === "negation-production") it = buildNegationProduction(data, w, scope, rng);
          if (!it) it = buildF(w, { wantNonCitation: preferClass === "predicate" });
        }
        else if (slot === "D") it = buildD(w);
        if (it) return it;
      }
      return null;
    }

    function buildX(w) {
      if (isFunctionish(w)) { var fu = buildFunctionUsage(data, w, scope, rng); if (fu) return fu; }
      return buildSentenceBlank(data, w, scope, rng);
    }
    function buildF(w, opts) {
      // Choose an F builder appropriate to the word + eligible competencies.
      var wantNonCitation = opts && opts.wantNonCitation;
      var predicateBuilders = [];
      if (isPredicate(w)) {
        if (competencyEligible(data, exam, scope, "formal-register") ||
            competencyEligible(data, exam, scope, "subject-honorific")) {
          predicateBuilders.push(function () { return buildRegisterChoice(data, w, scope, rng, null); });
        }
        if (competencyEligible(data, exam, scope, "noun-modification") ||
            competencyEligible(data, exam, scope, "irregular-families")) {
          predicateBuilders.push(function () { return buildAttributiveRecognition(data, w, scope, rng); });
        }
        predicateBuilders.push(function () { return buildPolitePresentRecognition(data, w, scope, rng); });
      }
      var grammarBuilders = [];
      if (isFunctionish(w) || isGrammarWord(w)) {
        grammarBuilders.push(function () { return buildGrammarFormRecognition(data, w, scope, rng); });
        if (w.grammarRole) grammarBuilders.push(function () { return buildParticleFunction(data, w, scope, rng, "F"); });
      }
      // When biasing for non-citation predicate items, use only the conjugating
      // (non-citation) builders for predicates — some honorific/connective
      // lexemes are both predicates AND grammar words.
      var builders = wantNonCitation && predicateBuilders.length
        ? predicateBuilders
        : shuffle(predicateBuilders.concat(grammarBuilders), rng);
      for (var i = 0; i < builders.length; i++) { var it = builders[i](); if (it) return it; }
      return null;
    }
    function buildD(w) {
      var sd = buildSenseDisambiguation(data, w, scope, rng);
      if (sd) return sd;
      return buildCollocation(data, w, scope, rng);
    }

    // Track units needing representation. The 60-item retention confirmation
    // cannot represent all 75 final units, so unit coverage is a full-attempt
    // invariant only (spec: confirmation is a retention re-test, not coverage).
    var requireEveryUnit = exam.requireEveryUnit && mode !== "confirmation";
    var unitsNeeding = new Set(requireEveryUnit ? scope.scopeUnits.map(function (u) { return u.id; }) : []);
    function markUnit(it) { if (it.unitId) unitsNeeding.delete(it.unitId); }

    // Build the full slot list from the allocation, in FILL_ORDER.
    var slotList = [];
    FILL_ORDER.forEach(function (slot) {
      var n = allocation[slot] || 0;
      for (var i = 0; i < n; i++) slotList.push(slot);
    });

    // Floor targets that bias target selection (spec exam-specs + §9.21/§9.23).
    // Kept distinct so one floor never steals another's slots:
    //   functionPosTarget — function/particle POS floor (biases F)
    //   fnCtxTarget — contextual particle/function items (biases X function-usage)
    //   predTarget — predicate POS floor (biases F/P)
    //   nonCitPredTarget — verbs/adjectives tested in non-citation forms (biases F)
    var functionPosTarget = (exam.posFloor && exam.posFloor.functionOrParticle) || 0;
    var predTarget = (exam.posFloor && exam.posFloor.predicate) || 0;
    var fnCtxTarget = exam.minFunctionContextItems || 0;
    var nonCitPredTarget = (exam.finalInvariants && exam.finalInvariants.minNonCitationPredicateItems) ||
      exam.minNonCitationPredicateItems || 0;
    var pastProdTarget = (mode === "confirmation" && exam.retention && exam.retention.minPastProduction) ||
      exam.minPastProduction || 0;
    var negProdTarget = (mode === "confirmation" && exam.retention && exam.retention.minNegationProduction) ||
      exam.minNegationProduction || 0;
    function functionCount() { return items.filter(function (x) { return x.posClass === "function"; }).length; }
    function predCount() { return items.filter(function (x) { return x.posClass === "predicate"; }).length; }
    function fnUsageCount() { return items.filter(function (x) { return x.mode === "function-usage"; }).length; }
    function nonCitPredCount() { return items.filter(function (x) { return x.isNonCitation && x.posClass === "predicate"; }).length; }
    function pastProdCount() { return items.filter(function (x) { return x.competencyId === "past-tense" && x.mode === "form-production"; }).length; }
    function negProdCount() { return items.filter(function (x) { return x.competencyId === "negation" && x.mode === "form-production"; }).length; }

    // Pass 1 — fill every slot, biasing scarce floors first.
    for (var s = 0; s < slotList.length; s++) {
      var slot = slotList[s];
      var prefer = null;
      if (slot === "F") {
        if (negProdCount() < negProdTarget) prefer = "negation-production";
        else if (functionCount() < functionPosTarget) prefer = "function";
        else if (nonCitPredCount() < nonCitPredTarget) prefer = "predicate";
        else if (predCount() < predTarget) prefer = "predicate";
      } else if (slot === "X") {
        if (fnUsageCount() < fnCtxTarget) prefer = "function";
      } else if (slot === "P") {
        if (pastProdCount() < pastProdTarget) prefer = "past-production";
        else if (predCount() < predTarget) prefer = "predicate";
      }
      var it = buildForSlot(slot, null, prefer);
      if (!it && prefer) it = buildForSlot(slot, null, null); // relax preference before failing
      if (!it) {
        throw new Error("word-exam engine: could not fill slot " + slot +
          " for " + exam.id + " (mode=" + mode + ", seed=" + seed + ")");
      }
      commit(it);
      markUnit(it);
    }

    // Pass 2 — guarantee unit representation by swapping surplus R_text items
    // for anchors from still-missing units.
    if (unitsNeeding.size) {
      var missing = Array.from(unitsNeeding);
      for (var m = 0; m < missing.length; m++) {
        var unitId = missing[m];
        // find a replaceable item: an R strand item from an over-represented unit
        var replaceableIdx = -1;
        var unitCounts = {};
        items.forEach(function (x) { unitCounts[x.unitId] = (unitCounts[x.unitId] || 0) + 1; });
        for (var k = 0; k < items.length; k++) {
          if (items[k].strand === "R" && unitCounts[items[k].unitId] > 1) { replaceableIdx = k; break; }
        }
        if (replaceableIdx === -1) {
          throw new Error("word-exam engine: cannot represent unit " + unitId + " for " + exam.id);
        }
        // Build an item for the missing unit in the freed strand slot.
        var freedSlot = items[replaceableIdx].strand === "R" ? "R_text" : "R_text";
        // release the old surface count
        var old = items[replaceableIdx];
        surfaceCounts.set(surfaceKey(old), (surfaceCounts.get(surfaceKey(old)) || 1) - 1);
        if (usedByStrand[old.targetWordId]) usedByStrand[old.targetWordId].delete(old.strand);
        var repl = buildForSlot(freedSlot, unitId);
        if (!repl) {
          throw new Error("word-exam engine: no anchor item buildable for unit " + unitId + " in " + exam.id);
        }
        items[replaceableIdx] = repl;
        if (!usedByStrand[repl.targetWordId]) usedByStrand[repl.targetWordId] = new Set();
        usedByStrand[repl.targetWordId].add(repl.strand);
        surfaceCounts.set(surfaceKey(repl), (surfaceCounts.get(surfaceKey(repl)) || 0) + 1);
      }
    }

    // Final order: interleave by a seeded shuffle so strands/sections mix within
    // the paper (spec §6.3 / Exam 5 mixSections). Deterministic.
    var ordered = shuffle(items, rng);
    ordered.forEach(function (it, i) {
      it.index = i;
      it.id = exam.id + ":" + mode + ":" + seed + ":" + String(i).padStart(3, "0");
      it.examId = exam.id;
      it.seed = String(seed);
      it.attemptMode = mode;
    });
    return { examId: exam.id, seed: String(seed), mode: mode, blueprintVersion: exam.version, items: ordered };
  }

  // ── Exam 10 final: layered generation (A anchors / B proportional / C spec) ─
  function generateFinal(exam, seed, mode, options) {
    // The default allocation-driven generator already enforces every-unit
    // representation (Layer A), proportional fill by the abundant pools (Layer
    // B), and the specialist F/D strands (Layer C). We add the final invariants
    // as a post-check and, where needed, targeted audio-cued P upgrades so
    // ≥minUniqueAudioTargets distinct audio items exist.
    var result = generateItems(exam, seed, mode, options);
    var inv = exam.finalInvariants;
    if (mode === "full" && inv) {
      ensureAudioTargets(result, inv.minUniqueAudioTargets);
    }
    return result;
  }

  function ensureAudioTargets(result, minUnique) {
    var data = buildData();
    var audioItems = result.items.filter(function (it) { return it.audioText; });
    var have = new Set(audioItems.map(function (it) { return nfc(it.audioText); }));
    if (have.size >= minUnique) return;
    // Upgrade P (type-ko) items to be audio-cued where the target has audio,
    // deterministically by index, until the threshold is met.
    for (var i = 0; i < result.items.length && have.size < minUnique; i++) {
      var it = result.items[i];
      if (it.mode !== "type-ko" || it.audioText) continue;
      var w = data.wordById.get(it.targetWordId);
      var voice = nfc((w && (w.voiceText || w.korean)) || "");
      if (voice && data.hasAudio(voice) && !have.has(voice)) {
        it.audioText = voice;
        have.add(voice);
      }
    }
  }

  function generateAttempt(examId, seed, opts) {
    var ver = (opts && (opts.version != null ? opts.version : opts.blueprintVersion)) || null;
    var exam = (opts && opts.blueprint) || examById(examId, ver);
    if (!exam) throw new Error("word-exam engine: unknown exam " + examId);
    var mode = (opts && opts.mode) || "full";
    if (exam.finalLayers && mode === "full") return generateFinal(exam, seed, mode, opts);
    return generateItems(exam, seed, mode, opts);
  }

  // ── Grading ────────────────────────────────────────────────────────────────
  function gradeTyped(it, given) {
    var g = nfc(given);
    if (!g) return false;
    var accepted = (it.acceptedAnswers || [it.answer]).map(nfc);
    if (accepted.indexOf(g) !== -1) return true;
    if (it.allowSpaceFlexible) {
      var gg = g.replace(/\s+/g, "");
      return accepted.some(function (a) { return a.replace(/\s+/g, "") === gg; });
    }
    return false;
  }
  function gradeItem(it, given) {
    if (it.mode === "type-ko" || it.mode === "form-production") return gradeTyped(it, given);
    return nfc(given) === nfc(it.answer);
  }

  function pct(n, d) { return d ? Math.round((n / d) * 1000) / 10 : 0; }

  function gradeAttempt(attempt, answers) {
    var items = attempt.items;
    var byMacrostrand = {}, bySection = {}, byUnit = {}, byCompetency = {}, byPos = {}, byTrack = {};
    var correct = 0, unanswered = 0;
    function bump(map, key, ok, answered) {
      if (key == null) return;
      if (!map[key]) map[key] = { correct: 0, total: 0, answered: 0 };
      map[key].total += 1;
      if (answered) map[key].answered += 1;
      if (ok) map[key].correct += 1;
    }
    items.forEach(function (it) {
      var given = answers ? answers[it.id] : undefined;
      var answered = given != null && String(given).trim() !== "";
      if (!answered) unanswered += 1;
      var ok = answered ? gradeItem(it, given) : false;
      if (ok) correct += 1;
      bump(byMacrostrand, it.strand, ok, answered);
      bump(bySection, it.sectionId, ok, answered);
      bump(byUnit, it.unitId, ok, answered);
      bump(byPos, it.pos, ok, answered);
      bump(byCompetency, it.competencyId, ok, answered);
      (it.secondaryCompetencyIds || []).forEach(function (c) { if (c !== it.competencyId) bump(byCompetency, c, ok, answered); });
    });
    var total = items.length;
    return {
      correct: correct, total: total, pct: pct(correct, total), unanswered: unanswered,
      byMacrostrand: byMacrostrand, bySection: bySection, byUnit: byUnit,
      byCompetency: byCompetency, byPos: byPos, byTrack: byTrack,
    };
  }

  // ── Band evaluation ────────────────────────────────────────────────────────
  function macroPct(result, code) {
    var m = result.byMacrostrand[code];
    return m ? pct(m.correct, m.total) : 0;
  }
  function combinedPct(result, codes) {
    var c = 0, t = 0;
    codes.forEach(function (code) { var m = result.byMacrostrand[code]; if (m) { c += m.correct; t += m.total; } });
    return pct(c, t);
  }
  function minSectionPct(result) {
    var min = 101;
    Object.keys(result.bySection).forEach(function (s) {
      var m = result.bySection[s]; if (m.total) min = Math.min(min, pct(m.correct, m.total));
    });
    return min === 101 ? 100 : min;
  }
  function checkFloors(result, floors) {
    if (!floors) return true;
    return Object.keys(floors).every(function (key) {
      var need = floors[key];
      if (key === "XF") return combinedPct(result, ["X", "F"]) >= need;
      return macroPct(result, key) >= need;
    });
  }
  function evaluateBands(exam, result, mode) {
    var scoring = exam.scoring;
    var out = { passed: false, distinguished: false };
    if (mode === "confirmation" && exam.retention) {
      var c = exam.retention.confirm;
      out.passed = result.pct >= c.overallPct && checkFloors(result, c.floors) &&
        (c.noSectionBelowPct == null || minSectionPct(result) >= c.noSectionBelowPct);
      return out;
    }
    var p = scoring.pass;
    out.passed = result.pct >= p.overallPct && checkFloors(result, p.floors) &&
      (p.noSectionBelowPct == null || minSectionPct(result) >= p.noSectionBelowPct);
    var d = scoring.distinction;
    var distOk = result.pct >= d.overallPct;
    if (d.noSectionBelowPct != null) distOk = distOk && minSectionPct(result) >= d.noSectionBelowPct;
    if (d.everyMacrostrandPct != null) {
      distOk = distOk && ["R", "C", "P", "X", "F", "D"].every(function (code) {
        var m = result.byMacrostrand[code];
        return !m || !m.total || pct(m.correct, m.total) >= d.everyMacrostrandPct;
      });
    }
    if (d.everyMajorMacrostrandPct != null) {
      distOk = distOk && ["R", "P", "X", "F", "D"].every(function (code) {
        var m = result.byMacrostrand[code];
        return !m || !m.total || pct(m.correct, m.total) >= d.everyMajorMacrostrandPct;
      });
    }
    out.distinguished = out.passed && distOk;
    return out;
  }

  // Exam 10 qualifying check (opens delayed retention confirmation — §7.2).
  function qualifiesForConfirmation(exam, result) {
    if (!exam.retention) return false;
    var q = exam.retention.qualify;
    return result.pct >= q.overallPct && checkFloors(result, q.floors) &&
      minSectionPct(result) >= q.noSectionBelowPct;
  }

  G.HANAPATH_WORD_EXAM_ENGINE = {
    generateAttempt: generateAttempt,
    gradeAttempt: gradeAttempt,
    gradeItem: gradeItem,
    evaluateBands: evaluateBands,
    qualifiesForConfirmation: qualifiesForConfirmation,
    resolveWordExamBlueprint: function (examId, version) { return examById(examId, version); },
    resolveScope: function (examId, version) { var e = examById(examId, version); return resolveScope(buildData(), e); },
    buildData: buildData,
    resetDataCache: function () { _dataCache = null; },
    _internals: { makeRng: makeRng, nfc: nfc, competencyEligible: competencyEligible },
  };
})();
