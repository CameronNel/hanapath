import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const HANGUL_RE = /[\u1100-\u11ff\u3131-\u318e\uac00-\ud7a3]/u;

function norm(value) {
  return String(value == null ? "" : value).trim().normalize("NFC");
}

function createAppSandbox() {
  const window = {};
  const document = {
    addEventListener() {},
    getElementById() { return null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
  };
  const sandbox = {
    window,
    console,
    Map,
    Set,
    Date,
    Math,
    JSON,
    Array,
    Object,
    String,
    Number,
    Boolean,
    RegExp,
    Intl,
    URL,
    URLSearchParams,
    document,
    location: { search: "", pathname: "/", hash: "" },
    history: { replaceState() {}, pushState() {} },
    navigator: { userAgent: "node" },
    localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    sessionStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
    setTimeout() { return 0; },
    clearTimeout() {},
    setInterval() { return 0; },
    clearInterval() {},
    requestAnimationFrame() { return 0; },
    cancelAnimationFrame() {},
    Audio: function Audio() {},
    speechSynthesis: { cancel() {}, speak() {} },
    SpeechSynthesisUtterance: function SpeechSynthesisUtterance() {},
    fetch: async () => ({ ok: false }),
  };
  sandbox.globalThis = sandbox;
  sandbox.self = window;
  window.window = window;
  window.document = document;
  window.location = sandbox.location;
  window.localStorage = sandbox.localStorage;
  window.navigator = sandbox.navigator;
  vm.createContext(sandbox);
  return sandbox;
}

const APP_RUNTIME_FILES = [
  "audio_map.js",
  "words_curated_core.js",
  "words_inflect.js",
  "words_lesson_plan.js",
  "raw_word_meanings.js",
  "sentences_core.js",
  "sentences_lesson_plan.js",
  "sentence_lesson_contrast_ui.js",
  "sentence_lesson_contrasts_sections_1_4.js",
  "sentence_lesson_contrasts_sections_5_8.js",
  "sentence_exam_eligibility_shard_a.js",
  "sentence_exam_eligibility_shard_b.js",
  "sentence_exam_eligibility_shard_c.js",
  "sentence_exam_eligibility_shard_d.js",
  "sentence_exam_eligibility.js",
  "hangul_strokes.js",
  "hangul_mastery_exam.js",
  "word_exam_blueprints.js",
  "word_exam_engine.js",
  "exam_integrity.js",
  "form_check_blueprints.js",
  "sentence_exam_prompt_templates.js",
  "sentence_exam_curated_bank.js",
  "sentence_exam_curated_bank_freeze.js",
  "sentence_exam_grader.js",
  "sentence_feedback.js",
];

function loadAppRuntime(root) {
  const sandbox = createAppSandbox();
  for (const filename of APP_RUNTIME_FILES) {
    const filePath = path.join(root, filename);
    if (!fs.existsSync(filePath)) continue;
    vm.runInContext(fs.readFileSync(filePath, "utf8"), sandbox, { filename });
  }
  vm.runInContext(fs.readFileSync(path.join(root, "app.js"), "utf8"), sandbox, { filename: "app.js" });
  return sandbox;
}

function pushTarget(targets, value, category) {
  const key = norm(value);
  if (!key || !HANGUL_RE.test(key)) return;
  targets.push({ key, category });
}

function collectRuntimeTargets(sandbox) {
  return vm.runInContext(`(() => {
    const targets = [];
    const add = (value, category) => {
      const key = String(value == null ? "" : value).trim().normalize("NFC");
      if (/[\\u1100-\\u11ff\\u3131-\\u318e\\uac00-\\ud7a3]/u.test(key)) targets.push({ key, category });
    };

    for (const check of getFormChecks()) {
      if (check.surface === "sentences") {
        for (const row of getFormCheckSentenceRows(check)) {
          add(row.voiceText || row.korean, "form-check:" + check.id + ":voice");
          add(row.korean, "form-check:" + check.id + ":answer");
          for (const answer of row.acceptAlso || []) add(answer, "form-check:" + check.id + ":accepted");
        }
        continue;
      }

      const directions = (check.modes || []).map((mode) => FORM_CHECK_MODE_DIRECTION[mode]).filter(Boolean);
      for (const word of getFormCheckTargets(check)) {
        for (const direction of directions) {
          const item = generateWordQuestionFor(word, direction);
          if (!item) continue;
          add(item.voiceText || item.answer, "form-check:" + check.id + ":voice");
          add(item.answer, "form-check:" + check.id + ":answer");
          for (const answer of item.acceptedAnswers || []) add(answer, "form-check:" + check.id + ":accepted");
        }
      }
    }

    // The production-bridge Form Check generates these surfaces at runtime.
    // Mirror the finite source formulas, then compare representative real
    // builder output below so source drift fails instead of silently escaping
    // the manifest.
    const inflect = window.HANAPATH_INFLECT;
    const words = window.HANAPATH_CURATED_WORDS || [];
    const lessons = window.HANAPATH_WORD_LESSONS || [];
    const taughtIds = new Set(lessons.flatMap((lesson) => lesson.newWordIds || []));
    for (const word of words) {
      if (!taughtIds.has(word.id) || (word.pos !== "verb" && word.pos !== "adjective")) continue;
      let past = null;
      let polite = null;
      try {
        past = inflect.conjugate(word.korean, word.pos, word.irregularFamily, "past");
        polite = inflect.conjugate(word.korean, word.pos, word.irregularFamily, "polite");
      } catch (_) {}
      add(past, "form-check:form-check-past-negation:v3-past");
      if (!polite) continue;
      add("안 " + polite, "form-check:form-check-past-negation:v3-negation");
      const isAction = word.pos === "verb" && word.morphTag !== "VA";
      if (isAction) add("못 " + polite, "form-check:form-check-past-negation:v3-negation");
      let stem = null;
      try { stem = inflect.getStem(word.korean); } catch (_) {}
      if (stem) {
        add(stem + "지 않아요", "form-check:form-check-past-negation:v3-negation");
        if (isAction) add(stem + "지 못해요", "form-check:form-check-past-negation:v3-negation");
      }
    }

    // Prove the mirror contains every surface emitted by the real V3 builder
    // over a deterministic adversarial seed sample. The mirror itself is
    // exhaustive over the finite taught predicate pool.
    window.state = { vocabLessonCompleted: (window.HANAPATH_WORD_LESSONS || []).map((lesson) => lesson.id) };
    const productionCheck = getFormChecks().find((check) => check.id === "form-check-past-negation");
    const mirrored = new Set(targets.map((target) => target.key));
    for (const seed of [1, 2, 3, 7, 11, 31, 97, 313, 997, 4093, 65537, 999983]) {
      for (const item of buildFormCheckItems(productionCheck, seed)) {
        if (item.formCheckCategory !== "typed-past" && item.formCheckCategory !== "typed-negation") continue;
        for (const value of [item.voiceText, item.answer, ...(item.acceptedAnswers || [])]) {
          const key = String(value == null ? "" : value).trim().normalize("NFC");
          if (/[\\u1100-\\u11ff\\u3131-\\u318e\\uac00-\\ud7a3]/u.test(key) && !mirrored.has(key)) {
            throw new Error("V3 Form Check audio mirror missed runtime surface " + JSON.stringify(key));
          }
        }
      }
    }

    return targets;
  })()`, sandbox, { filename: "authored-audio-targets:runtime" });
}

function collectAudioFields(targets, value, source, seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    for (const child of value) collectAudioFields(targets, child, source, seen);
    return;
  }
  for (const [field, child] of Object.entries(value)) {
    if ((field === "voiceText" || field === "audioText") && typeof child === "string") {
      pushTarget(targets, child, `${source}:${field}`);
    }
    if (child && typeof child === "object") collectAudioFields(targets, child, source, seen);
  }
}

function collectCanonicalAnswers(targets, value, source, seen = new Set()) {
  if (!value || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  if (Array.isArray(value)) {
    for (const child of value) collectCanonicalAnswers(targets, child, source, seen);
    return;
  }
  for (const [field, child] of Object.entries(value)) {
    if (field === "canonicalAnswer" && typeof child === "string") pushTarget(targets, child, `${source}:canonicalAnswer`);
    if (child && typeof child === "object") collectCanonicalAnswers(targets, child, source, seen);
  }
}

function collectExamTargets(targets, sandbox) {
  const window = sandbox.window;
  collectAudioFields(targets, window.HANGUL_MASTERY_EXAM, "hangul-mastery-exam");
  collectCanonicalAnswers(targets, window.HANAPATH_SENTENCE_EXAM_CURATED_BANK, "sentence-curated-exam-bank");

  const engine = window.HANAPATH_WORD_EXAM_ENGINE;
  const exams = window.HANAPATH_WORD_EXAMS || [];
  if (!engine || typeof engine.generateAttempt !== "function") return;
  for (const exam of exams) {
    const modes = exam.retention ? ["achievement", "confirmation"] : ["achievement"];
    for (const mode of modes) {
      for (const seed of [1, 2, 3, 7, 11, 31, 97, 313]) {
        const avoidTargetIds = mode === "confirmation" ? [] : undefined;
        let attempt;
        try {
          attempt = engine.generateAttempt(exam.id, String(seed), { mode, avoidTargetIds });
        } catch (_) {
          continue;
        }
        collectAudioFields(targets, attempt?.items || [], `word-exam:${exam.id}:${mode}`);
      }
    }
  }
}

export function collectAuthoredAudioTargets(root) {
  const sandbox = loadAppRuntime(root);
  const targets = collectRuntimeTargets(sandbox);
  collectExamTargets(targets, sandbox);
  const byKey = new Map();
  for (const target of targets) {
    if (!byKey.has(target.key)) byKey.set(target.key, new Set());
    byKey.get(target.key).add(target.category);
  }
  return [...byKey.entries()]
    .map(([key, categories]) => ({ key, categories: [...categories].sort() }))
    .sort((a, b) => a.key.localeCompare(b.key, "ko"));
}

