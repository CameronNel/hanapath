from pathlib import Path


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    if new in text:
        print(f"already patched: {path}")
        return
    if old not in text:
        raise SystemExit(f"missing expected source in {path}: {old[:120]!r}")
    p.write_text(text.replace(old, new, 1), encoding="utf-8")
    print(f"patched: {path}")


replace_once(
    "app.js",
    '''function buildSentenceLessonQuestionPlan(lesson, studyRows) {
  const configured = new Map((Array.isArray(lesson.drillPlan) ? lesson.drillPlan : [])
    .map((entry) => [entry.sentenceId, entry.mode]));
  const primary = studyRows.map((row) => ({
    sentenceId: row.id,
    mode: normalizeSentenceLessonMode(row, configured.get(row.id)),
  }));''',
    '''function buildSentenceLessonQuestionPlan(lesson, studyRows) {
  const configured = new Map((Array.isArray(lesson.drillPlan) ? lesson.drillPlan : [])
    .filter((entry) => entry && typeof entry.sentenceId === "string")
    .map((entry) => [entry.sentenceId, entry]));
  const primary = studyRows.map((row) => {
    const configuredEntry = configured.get(row.id) || {};
    return {
      sentenceId: row.id,
      mode: normalizeSentenceLessonMode(row, configuredEntry.mode),
      promptEn: typeof configuredEntry.promptEn === "string" ? configuredEntry.promptEn : "",
      cueLabel: typeof configuredEntry.cueLabel === "string" ? configuredEntry.cueLabel : "",
      teachingPhase: typeof configuredEntry.teachingPhase === "string" ? configuredEntry.teachingPhase : "",
    };
  });''',
)
replace_once(
    "app.js",
    '''  const tagTips = (lesson.patternTags || [])
    .map((tag) => PATTERN_TAG_INFO[tag])
    .filter(Boolean)
    .slice(0, 4)
    .map((tip) => `<li>${escapeHtml(tip)}</li>`)
    .join("");
  return `''',
    '''  const tagTips = (lesson.patternTags || [])
    .map((tag) => PATTERN_TAG_INFO[tag])
    .filter(Boolean)
    .slice(0, 4)
    .map((tip) => `<li>${escapeHtml(tip)}</li>`)
    .join("");
  const contrastUi = window.HANAPATH_SENTENCE_CONTRAST_UI;
  const contrastGuide = contrastUi && typeof contrastUi.renderIntroGuide === "function"
    ? contrastUi.renderIntroGuide(lesson.contrastTeaching, escapeHtml)
    : "";
  return `''',
)
replace_once(
    "app.js",
    '''      <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(lesson.concept || "")}</div>
      ${tagTips ? `<ul class="ss-tip-list">${tagTips}</ul>` : ""}''',
    '''      <div class="screen-sub" style="margin-bottom:12px;">${escapeHtml(lesson.concept || "")}</div>
      ${contrastGuide}
      ${tagTips ? `<ul class="ss-tip-list">${tagTips}</ul>` : ""}''',
)
replace_once(
    "app.js",
    '''  const studyRows = session.studyRows || session.rows;
  const row = studyRows[session.studyIndex];
  const total = studyRows.length;
  return `''',
    '''  const studyRows = session.studyRows || session.rows;
  const row = studyRows[session.studyIndex];
  const total = studyRows.length;
  const lesson = session.lessonId ? getSentenceLessonById(session.lessonId) : null;
  const contrastUi = window.HANAPATH_SENTENCE_CONTRAST_UI;
  const contrastStudyNote = contrastUi && typeof contrastUi.renderStudyNote === "function"
    ? contrastUi.renderStudyNote(lesson?.contrastTeaching, row.id, escapeHtml)
    : "";
  return `''',
)
replace_once(
    "app.js",
    '''      <div class="screen-sub" style="margin:14px 0;">${escapeHtml(row.english)}</div>
      <div class="word-card-actions word-card-nav-actions">''',
    '''      <div class="screen-sub" style="margin:14px 0;">${escapeHtml(row.english)}</div>
      ${contrastStudyNote}
      <div class="word-card-actions word-card-nav-actions">''',
)
replace_once(
    "app.js",
    '''function sentenceQuestionHtml(session) {
  const row = session.rows[session.index];
  const mode = sentenceQuestionMode(session);

  let innerContent = "";''',
    '''function getSentenceLessonDrillEntry(session) {
  if (!session || session.modeId !== "lesson") return null;
  const entry = session.drillPlan?.[session.index];
  return entry && typeof entry === "object" ? entry : null;
}

function sentenceLessonPromptText(session, row) {
  const contrastUi = window.HANAPATH_SENTENCE_CONTRAST_UI;
  if (contrastUi && typeof contrastUi.promptForDrill === "function") {
    return contrastUi.promptForDrill(getSentenceLessonDrillEntry(session), row?.english || "");
  }
  return row?.english || "";
}

function sentenceLessonCueLabel(session, fallback) {
  const contrastUi = window.HANAPATH_SENTENCE_CONTRAST_UI;
  if (contrastUi && typeof contrastUi.labelForDrill === "function") {
    return contrastUi.labelForDrill(getSentenceLessonDrillEntry(session), fallback);
  }
  return fallback;
}

function sentenceQuestionHtml(session) {
  const row = session.rows[session.index];
  const mode = sentenceQuestionMode(session);
  const lessonPrompt = sentenceLessonPromptText(session, row);

  let innerContent = "";''',
)
replace_once(
    "app.js",
    '''      ${sentencePromptTileHtml(`<div class="sentence-prompt-text">${escapeHtml(row.english)}</div>`, "is-english")}
      ${sentenceModeMetaHtml(row, "Translate & Type")}''',
    '''      ${sentencePromptTileHtml(`<div class="sentence-prompt-text">${escapeHtml(lessonPrompt)}</div>`, "is-english")}
      ${sentenceModeMetaHtml(row, sentenceLessonCueLabel(session, "Translate & Type"))}''',
)
replace_once(
    "app.js",
    '''      ${sentencePromptTileHtml(`<div class="sentence-prompt-text">${escapeHtml(row.english)}</div>`, "is-english")}
      ${sentenceModeMetaHtml(row, "Word Builder")}''',
    '''      ${sentencePromptTileHtml(`<div class="sentence-prompt-text">${escapeHtml(lessonPrompt)}</div>`, "is-english")}
      ${sentenceModeMetaHtml(row, sentenceLessonCueLabel(session, "Word Builder"))}''',
)
replace_once(
    "index.html",
    '''    <script defer src="./sentences_core.js?v=20260717u"></script>
    <script defer src="./sentences_lesson_plan.js?v=20260717u"></script>''',
    '''    <script defer src="./sentences_core.js?v=20260717u"></script>
    <script defer src="./sentences_lesson_plan.js?v=20260717u"></script>
    <script defer src="./sentence_lesson_contrast_ui.js?v=20260726a"></script>
    <script defer src="./sentence_lesson_contrasts_sections_1_4.js?v=20260726a"></script>''',
)
replace_once(
    "index.html",
    '    <script defer src="./app.js?v=20260725a"></script>',
    '    <script defer src="./app.js?v=20260726a"></script>',
)
replace_once(
    "sw.js",
    '''// [2026-07-25] Cache bumped for E0 Sentence-eligibility sharding (four new browser-loaded shard files + merger).
const CACHE_NAME = "hanapath-shell-v449";''',
    '''// [2026-07-26] Cache bumped for CB2 Sentence lesson contrast teaching (shared UI + sections 1-4 data + app prompt support).
const CACHE_NAME = "hanapath-shell-v450";''',
)
replace_once(
    "sw.js",
    '''  "./sentences_core.js?v=20260717u",
  "./sentences_lesson_plan.js?v=20260717u",''',
    '''  "./sentences_core.js?v=20260717u",
  "./sentences_lesson_plan.js?v=20260717u",
  "./sentence_lesson_contrast_ui.js?v=20260726a",
  "./sentence_lesson_contrasts_sections_1_4.js?v=20260726a",''',
)
replace_once("sw.js", '  "./app.js?v=20260725a",', '  "./app.js?v=20260726a",')
replace_once(
    "scripts/audit-app-shell.mjs",
    '''  "./raw_word_meanings.js",
  "./sentences_core.js",
  "./app.js",''',
    '''  "./raw_word_meanings.js",
  "./sentences_core.js",
  "./sentence_lesson_contrast_ui.js",
  "./sentence_lesson_contrasts_sections_1_4.js",
  "./app.js",''',
)
replace_once(
    ".github/workflows/ci.yml",
    "          for f in app.js sw.js exam_integrity.js sentence_exam_eligibility.js sentence_exam_prompt_templates.js sentence_exam_curated_bank.js sentence_exam_grader.js words_lesson_plan.js; do",
    "          for f in app.js sw.js exam_integrity.js sentence_exam_eligibility.js sentence_exam_prompt_templates.js sentence_exam_curated_bank.js sentence_exam_grader.js sentence_lesson_contrast_ui.js sentence_lesson_contrasts_sections_1_4.js words_lesson_plan.js; do",
)
replace_once(
    ".github/workflows/ci.yml",
    '''      - name: Check CB1 inventory and shortlist freshness
        run: node scripts/build-sentence-exam-inventory.mjs --check
''',
    '''      - name: Check CB1 inventory and shortlist freshness
        run: node scripts/build-sentence-exam-inventory.mjs --check
      - name: Sentence lesson contrast authoring regression
        run: node scripts/test-sentence-lesson-contrast-authoring.mjs
      - name: Sentence lesson contrast UI regression
        run: node scripts/test-sentence-lesson-contrast-ui.mjs
      - name: Check CB2 lesson contrast freshness
        run: node scripts/build-sentence-lesson-contrasts.mjs --check
      - name: Audit CB2 lesson contrast coverage and safety
        run: node scripts/audit-sentence-lesson-contrasts.mjs
      - name: Sentence lesson contrast browser fixtures
        run: node scripts/test-sentence-lesson-contrasts-browser.mjs
''',
)
replace_once(
    "scripts/audit-core-release.mjs",
    '''  { id: "sentence-exam-inventory", label: "Sentence-exam inventory and shortlist freshness (CB1)", script: "scripts/build-sentence-exam-inventory.mjs", fullArgs: ["--check"], quickArgs: ["--check"] },
  {''',
    '''  { id: "sentence-exam-inventory", label: "Sentence-exam inventory and shortlist freshness (CB1)", script: "scripts/build-sentence-exam-inventory.mjs", fullArgs: ["--check"], quickArgs: ["--check"] },
  { id: "sentence-lesson-contrast-authoring", label: "Sentence lesson contrast authoring regression (CB2)", script: "scripts/test-sentence-lesson-contrast-authoring.mjs" },
  { id: "sentence-lesson-contrast-ui", label: "Sentence lesson contrast UI regression (CB2)", script: "scripts/test-sentence-lesson-contrast-ui.mjs" },
  { id: "sentence-lesson-contrast-freshness", label: "Sentence lesson contrast data freshness (CB2)", script: "scripts/build-sentence-lesson-contrasts.mjs", fullArgs: ["--check"], quickArgs: ["--check"] },
  { id: "sentence-lesson-contrasts", label: "Sentence lesson contrast coverage and safety (CB2)", script: "scripts/audit-sentence-lesson-contrasts.mjs" },
  { id: "sentence-lesson-contrast-browser", label: "Sentence lesson contrast browser fixtures (CB2)", script: "scripts/test-sentence-lesson-contrasts-browser.mjs" },
  {''',
)
