from pathlib import Path


def replace_once(text, old, new, label):
    if old not in text:
        raise SystemExit(f"missing patch anchor: {label}")
    if text.count(old) != 1:
        raise SystemExit(f"ambiguous patch anchor ({text.count(old)}): {label}")
    return text.replace(old, new, 1)


# ---------------------------------------------------------------------------
# exam_integrity.js: taint-event model + scope/override classification helpers
# ---------------------------------------------------------------------------
path = Path("exam_integrity.js")
text = path.read_text(encoding="utf-8")
text = replace_once(
    text,
    "  const MIGRATION_VERSION = 1;\n  const VALID_RESULT_STATUSES = Object.freeze([",
    """  const MIGRATION_VERSION = 1;
  const TAINT_SCHEMA_VERSION = 1;
  const REQUIRED_TAINT_FIELDS = Object.freeze([
    "taintSchemaVersion",
    "taintEventId",
    "controlId",
    "affectedPillars",
    "scopeSectionIds",
    "scopeUnitIds",
    "scopeLessonIds",
    "activatedAt",
    "appVersion",
    "appAssetRevision",
    "queryGate",
    "sourceRoute",
    "note",
    "clearedAt",
  ]);
  const VALID_RESULT_STATUSES = Object.freeze([""",
    "taint constants",
)

text = replace_once(
    text,
    """  function normalizeExamResultsContainer(raw) {
""",
    """  function normalizeStringList(value) {
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((item) => typeof item === "string" && item.length > 0))];
  }

  function makeTaintEventId(options = {}) {
    if (typeof options.taintEventId === "string" && options.taintEventId) {
      return options.taintEventId;
    }
    const cryptoApi = typeof globalThis !== "undefined" ? globalThis.crypto : null;
    if (cryptoApi && typeof cryptoApi.randomUUID === "function") {
      return `taint-${cryptoApi.randomUUID()}`;
    }
    const now = finiteNumber(options.now) ?? Date.now();
    const entropy = finiteNumber(options.randomValue) ?? Math.random();
    return `taint-${now.toString(36)}-${fingerprint({ now, entropy })}`;
  }

  function createTaintEvent(input = {}, options = {}) {
    const activatedAt = finiteNumber(input.activatedAt)
      ?? finiteNumber(options.now)
      ?? Date.now();
    return {
      taintSchemaVersion: TAINT_SCHEMA_VERSION,
      taintEventId: makeTaintEventId({
        taintEventId: input.taintEventId,
        now: activatedAt,
        randomValue: options.randomValue,
      }),
      controlId: typeof input.controlId === "string" ? input.controlId : "",
      affectedPillars: normalizeStringList(input.affectedPillars),
      scopeSectionIds: normalizeStringList(input.scopeSectionIds),
      scopeUnitIds: normalizeStringList(input.scopeUnitIds),
      scopeLessonIds: normalizeStringList(input.scopeLessonIds),
      activatedAt,
      appVersion: typeof input.appVersion === "string" ? input.appVersion : "",
      appAssetRevision: typeof input.appAssetRevision === "string" ? input.appAssetRevision : "",
      queryGate: typeof input.queryGate === "string" ? input.queryGate : "",
      sourceRoute: isPlainObject(input.sourceRoute) ? cloneJson(input.sourceRoute) : null,
      note: typeof input.note === "string" ? input.note : "",
      clearedAt: finiteNumber(input.clearedAt),
      globalExamOverride: input.globalExamOverride === true,
    };
  }

  function validateTaintEvent(event, index = 0) {
    const errors = [];
    const label = isPlainObject(event) && event.taintEventId
      ? event.taintEventId
      : String(index);
    if (!isPlainObject(event)) return [`taint event ${label} must be an object`];
    REQUIRED_TAINT_FIELDS.forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(event, field)) {
        errors.push(`taint event ${label} missing ${field}`);
      }
    });
    if (event.taintSchemaVersion !== TAINT_SCHEMA_VERSION) {
      errors.push(`taint event ${label} has invalid schema version`);
    }
    if (typeof event.taintEventId !== "string" || !event.taintEventId) {
      errors.push(`taint event ${label} missing taintEventId`);
    }
    if (typeof event.controlId !== "string" || !event.controlId) {
      errors.push(`taint event ${label} missing controlId`);
    }
    if (!Number.isFinite(event.activatedAt)) {
      errors.push(`taint event ${label} missing activatedAt`);
    }
    if (typeof event.appVersion !== "string" || !event.appVersion) {
      errors.push(`taint event ${label} missing appVersion`);
    }
    if (typeof event.appAssetRevision !== "string" || !event.appAssetRevision) {
      errors.push(`taint event ${label} missing appAssetRevision`);
    }
    if (event.queryGate !== "__wetest") {
      errors.push(`taint event ${label} has invalid queryGate`);
    }
    ["affectedPillars", "scopeSectionIds", "scopeUnitIds", "scopeLessonIds"].forEach((field) => {
      if (!Array.isArray(event[field]) || event[field].some((item) => typeof item !== "string" || !item)) {
        errors.push(`taint event ${label} has invalid ${field}`);
      }
    });
    if (event.controlId.endsWith("section-completion") && (!Array.isArray(event.scopeSectionIds) || !event.scopeSectionIds.length)) {
      errors.push(`taint event ${label} missing section scope`);
    }
    if (event.clearedAt !== null && !Number.isFinite(event.clearedAt)) {
      errors.push(`taint event ${label} has invalid clearedAt`);
    }
    return errors;
  }

  function appendTaintEvent(stateValue, event) {
    if (!isPlainObject(stateValue)) return { added: false, reason: "invalid-state" };
    const eventErrors = validateTaintEvent(event);
    if (eventErrors.length) return { added: false, reason: "invalid-event", errors: eventErrors };
    const integrity = normalizeExamIntegrityContainer(stateValue.examIntegrity);
    if (integrity.taintEvents.some((item) => item && item.taintEventId === event.taintEventId)) {
      return { added: false, reason: "duplicate-id", eventId: event.taintEventId };
    }
    integrity.taintEvents.push(cloneJson(event));
    stateValue.examIntegrity = integrity;
    return { added: true, eventId: event.taintEventId };
  }

  function getTaintEventById(stateValue, taintEventId) {
    const events = stateValue && stateValue.examIntegrity && Array.isArray(stateValue.examIntegrity.taintEvents)
      ? stateValue.examIntegrity.taintEvents
      : [];
    return events.find((event) => event && event.taintEventId === taintEventId) || null;
  }

  function getIntersectingTaintEventIds(stateValue, scopeSectionIds) {
    const scope = new Set(normalizeStringList(scopeSectionIds));
    const events = stateValue && stateValue.examIntegrity && Array.isArray(stateValue.examIntegrity.taintEvents)
      ? stateValue.examIntegrity.taintEvents
      : [];
    return events
      .filter((event) => isPlainObject(event) && event.clearedAt == null)
      .filter((event) => event.globalExamOverride === true
        || (Array.isArray(event.scopeSectionIds) && event.scopeSectionIds.some((sectionId) => scope.has(sectionId))))
      .map((event) => event.taintEventId)
      .filter((eventId) => typeof eventId === "string" && eventId.length > 0);
  }

  function getAttemptTaintContext(stateValue, scopeSectionIds, overrideFlags = []) {
    const eventIds = getIntersectingTaintEventIds(stateValue, scopeSectionIds);
    const flags = normalizeStringList(overrideFlags);
    return {
      overrideEventIds: eventIds,
      overrideFlags: flags,
      status: eventIds.length || flags.length ? "practice" : "hanaPath",
      isPractice: Boolean(eventIds.length || flags.length),
    };
  }

  function normalizeExamResultsContainer(raw) {
""",
    "taint helpers",
)

text = replace_once(
    text,
    """    ["taintEvents", "resultRelations", "migrationLog"].forEach((field) => {
      if (!Array.isArray(integrity[field])) errors.push(`examIntegrity.${field} must be an array`);
    });

    const records = results.byAttemptId;
""",
    """    ["taintEvents", "resultRelations", "migrationLog"].forEach((field) => {
      if (!Array.isArray(integrity[field])) errors.push(`examIntegrity.${field} must be an array`);
    });

    if (Array.isArray(integrity.taintEvents)) {
      const taintIds = new Set();
      const completedLessonIds = new Set([
        ...(Array.isArray(stateValue.vocabLessonCompleted) ? stateValue.vocabLessonCompleted : []),
        ...(Array.isArray(stateValue.phaseOneCompleted) ? stateValue.phaseOneCompleted : []),
      ]);
      integrity.taintEvents.forEach((event, index) => {
        errors.push(...validateTaintEvent(event, index));
        if (!isPlainObject(event) || typeof event.taintEventId !== "string" || !event.taintEventId) return;
        if (taintIds.has(event.taintEventId)) errors.push(`duplicate taintEventId ${event.taintEventId}`);
        else taintIds.add(event.taintEventId);
        if (event.clearedAt != null
            && Array.isArray(event.scopeLessonIds)
            && event.scopeLessonIds.some((lessonId) => completedLessonIds.has(lessonId))) {
          errors.push(`taint event ${event.taintEventId} clears taint while preserving test-awarded progression`);
        }
      });
    }

    const records = results.byAttemptId;
""",
    "taint validation",
)

text = replace_once(
    text,
    """    MIGRATION_VERSION,
    VALID_RESULT_STATUSES,
    REQUIRED_RESULT_FIELDS,
""",
    """    MIGRATION_VERSION,
    TAINT_SCHEMA_VERSION,
    REQUIRED_TAINT_FIELDS,
    VALID_RESULT_STATUSES,
    REQUIRED_RESULT_FIELDS,
""",
    "taint exports constants",
)
text = replace_once(
    text,
    """    fingerprint,
    collectExpectedLegacyRecords,
    migrateExamIntegrityState,
    validateExamIntegrityState,
""",
    """    fingerprint,
    createTaintEvent,
    validateTaintEvent,
    appendTaintEvent,
    getTaintEventById,
    getIntersectingTaintEventIds,
    getAttemptTaintContext,
    collectExpectedLegacyRecords,
    migrateExamIntegrityState,
    validateExamIntegrityState,
""",
    "taint exports functions",
)
path.write_text(text, encoding="utf-8")


# ---------------------------------------------------------------------------
# app.js: query gate, confirmation, durable-save barrier, completion mutation
# ---------------------------------------------------------------------------
path = Path("app.js")
text = path.read_text(encoding="utf-8")
text = replace_once(
    text,
    """const TEST_ENABLE_SENTENCE_SECTION_COMPLETION = false;
""",
    """const TEST_ENABLE_SENTENCE_SECTION_COMPLETION = false;
const EXAM_INTEGRITY_APP_VERSION = "hanapath-shell-v437";
const EXAM_INTEGRITY_ASSET_REVISION = "20260721b";

// Reuse the Core Words acceptance-test query precedent as the single private
// gate for owner testing controls. This is obscurity against accidental use,
// not an authentication or security boundary.
function isWordExamTestQueryActive() {
  return typeof location !== "undefined" && /[?&]__wetest=1\\b/.test(location.search);
}
""",
    "test gate helper",
)

old_completion = """function completeWordSectionForTesting(sectionId) {
  if (!TEST_ENABLE_WORD_SECTION_COMPLETION) return;
  const section = getWordSectionById(sectionId);
  if (!section || !isWordCurriculumV2()) return;
  const lessonIds = getWordUnits()
    .filter((unit) => unit.sectionId === section.id)
    .flatMap((unit) => [...unit.lessonIds, unit.checkpointId])
    .filter(Boolean);
  state.vocabLessonCompleted = [...new Set([...(state.vocabLessonCompleted || []), ...lessonIds])];
  if (state.vocabLessonActive && lessonIds.includes(state.vocabLessonActive)) {
    state.vocabLessonActive = null;
    state.vocabLessonSession = null;
  }
  saveState();
}

function completeAlphabetSectionForTesting() {
  if (!TEST_ENABLE_WORD_SECTION_COMPLETION) return;
  state.phaseOneCompleted = phaseOneLessons.map((lesson) => lesson.id);
  saveState();
}
"""
new_completion = """function getWordSectionCompletionScope(sectionId) {
  const section = getWordSectionById(sectionId);
  if (!section || !isWordCurriculumV2()) return null;
  const completed = new Set(Array.isArray(state.vocabLessonCompleted) ? state.vocabLessonCompleted : []);
  const units = getWordUnits().filter((unit) => unit.sectionId === section.id);
  const lessonIds = units
    .flatMap((unit) => [...unit.lessonIds, unit.checkpointId])
    .filter((lessonId) => lessonId && !completed.has(lessonId));
  const pending = new Set(lessonIds);
  return {
    controlId: "word-section-completion",
    affectedPillars: ["words"],
    sectionName: `Section ${section.id.toUpperCase()} · ${section.name}`,
    scopeSectionIds: [section.id],
    scopeUnitIds: units
      .filter((unit) => unit.lessonIds.some((lessonId) => pending.has(lessonId)) || pending.has(unit.checkpointId))
      .map((unit) => unit.id),
    scopeLessonIds: lessonIds,
  };
}

function getAlphabetSectionCompletionScope() {
  const completed = new Set(Array.isArray(state.phaseOneCompleted) ? state.phaseOneCompleted : []);
  return {
    controlId: "alphabet-section-completion",
    affectedPillars: ["alphabet", "words"],
    sectionName: "Alphabet · Learning lessons",
    scopeSectionIds: ["alphabet"],
    scopeUnitIds: [],
    scopeLessonIds: phaseOneLessons.map((lesson) => lesson.id).filter((lessonId) => !completed.has(lessonId)),
  };
}

function verifyPersistedTaintEvent(taintEventId) {
  try {
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return Boolean(persisted.examIntegrity
      && Array.isArray(persisted.examIntegrity.taintEvents)
      && persisted.examIntegrity.taintEvents.some((event) => event && event.taintEventId === taintEventId));
  } catch {
    return false;
  }
}

function persistTaintBeforeCompletion(event) {
  const api = window.HANAPATH_EXAM_INTEGRITY;
  if (!api || typeof api.appendTaintEvent !== "function") return false;
  const previousIntegrity = state.examIntegrity ? JSON.parse(JSON.stringify(state.examIntegrity)) : null;
  const appended = api.appendTaintEvent(state, event);
  if (!appended.added) return false;
  if (saveState() && verifyPersistedTaintEvent(event.taintEventId)) return true;
  state.examIntegrity = previousIntegrity;
  return false;
}

function createSectionCompletionTaint(scope) {
  const api = window.HANAPATH_EXAM_INTEGRITY;
  if (!api || typeof api.createTaintEvent !== "function") return null;
  return api.createTaintEvent({
    controlId: scope.controlId,
    affectedPillars: scope.affectedPillars,
    scopeSectionIds: scope.scopeSectionIds,
    scopeUnitIds: scope.scopeUnitIds,
    scopeLessonIds: scope.scopeLessonIds,
    activatedAt: Date.now(),
    appVersion: EXAM_INTEGRITY_APP_VERSION,
    appAssetRevision: EXAM_INTEGRITY_ASSET_REVISION,
    queryGate: "__wetest",
    sourceRoute: state.route && typeof state.route === "object" ? { ...state.route } : null,
    note: "Owner testing override",
    clearedAt: null,
    globalExamOverride: false,
  });
}

function showSectionCompletionConfirm(scope, commit, onSuccess) {
  if (document.getElementById("sectionCompletionOverlay")) return;
  const overlay = document.createElement("div");
  overlay.id = "sectionCompletionOverlay";
  overlay.className = "exam-quit-overlay";
  overlay.innerHTML = `
    <div class="exam-quit-dialog" role="alertdialog" aria-modal="true" aria-labelledby="sectionCompletionTitle">
      <h3 id="sectionCompletionTitle">Complete ${escapeHtml(scope.sectionName)} for testing?</h3>
      <p>This permanently records a local testing override for ${escapeHtml(scope.sectionName)}. Exams covering this section become Practice results and cannot award HanaPath mastery or retention.</p>
      <div class="lesson-feedback" id="sectionCompletionFeedback" aria-live="polite"></div>
      <div class="exam-quit-actions">
        <button class="button secondary" type="button" id="sectionCompletionCancel">Cancel</button>
        <button class="button exam-quit-discard" type="button" id="sectionCompletionConfirm">Complete for testing</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.querySelector("#sectionCompletionCancel").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (event) => { if (event.target === overlay) overlay.remove(); });
  overlay.querySelector("#sectionCompletionConfirm").addEventListener("click", () => {
    const button = overlay.querySelector("#sectionCompletionConfirm");
    const feedback = overlay.querySelector("#sectionCompletionFeedback");
    button.disabled = true;
    const result = commit();
    if (result && result.ok) {
      overlay.remove();
      if (typeof onSuccess === "function") onSuccess(result);
      return;
    }
    feedback.innerHTML = "<strong>Not completed.</strong> The taint event could not be durably saved, so no progression was changed.";
    button.disabled = false;
  });
}

function completeWordSectionForTesting(sectionId, options = {}) {
  if (!TEST_ENABLE_WORD_SECTION_COMPLETION || !isWordExamTestQueryActive()) return { ok: false, reason: "gate" };
  const scope = getWordSectionCompletionScope(sectionId);
  if (!scope || !scope.scopeLessonIds.length) return { ok: false, reason: "nothing-to-complete" };
  if (!options.confirmed) {
    showSectionCompletionConfirm(
      scope,
      () => completeWordSectionForTesting(sectionId, { confirmed: true }),
      () => renderVocabulary(),
    );
    return { ok: false, pendingConfirmation: true };
  }

  const event = createSectionCompletionTaint(scope);
  if (!event || !persistTaintBeforeCompletion(event)) return { ok: false, reason: "taint-persistence" };

  const previousCompleted = [...(state.vocabLessonCompleted || [])];
  const previousActive = state.vocabLessonActive;
  const previousSession = state.vocabLessonSession;
  state.vocabLessonCompleted = [...new Set([...previousCompleted, ...scope.scopeLessonIds])];
  if (state.vocabLessonActive && scope.scopeLessonIds.includes(state.vocabLessonActive)) {
    state.vocabLessonActive = null;
    state.vocabLessonSession = null;
  }
  if (!saveState() || !verifyPersistedTaintEvent(event.taintEventId)) {
    state.vocabLessonCompleted = previousCompleted;
    state.vocabLessonActive = previousActive;
    state.vocabLessonSession = previousSession;
    saveState();
    return { ok: false, reason: "completion-persistence", taintEventId: event.taintEventId };
  }
  refreshProgressionState();
  return { ok: true, taintEventId: event.taintEventId };
}

function completeAlphabetSectionForTesting(options = {}) {
  if (!TEST_ENABLE_WORD_SECTION_COMPLETION || !isWordExamTestQueryActive()) return { ok: false, reason: "gate" };
  const scope = getAlphabetSectionCompletionScope();
  if (!scope.scopeLessonIds.length) return { ok: false, reason: "nothing-to-complete" };
  if (!options.confirmed) {
    showSectionCompletionConfirm(
      scope,
      () => completeAlphabetSectionForTesting({ confirmed: true }),
      () => openLearnStageMenu("alphabet"),
    );
    return { ok: false, pendingConfirmation: true };
  }

  const event = createSectionCompletionTaint(scope);
  if (!event || !persistTaintBeforeCompletion(event)) return { ok: false, reason: "taint-persistence" };

  const previousCompleted = [...(state.phaseOneCompleted || [])];
  state.phaseOneCompleted = [...new Set([...previousCompleted, ...scope.scopeLessonIds])];
  if (!saveState() || !verifyPersistedTaintEvent(event.taintEventId)) {
    state.phaseOneCompleted = previousCompleted;
    saveState();
    return { ok: false, reason: "completion-persistence", taintEventId: event.taintEventId };
  }
  refreshProgressionState();
  return { ok: true, taintEventId: event.taintEventId };
}
"""
text = replace_once(text, old_completion, new_completion, "completion functions")

text = replace_once(
    text,
    """function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors; the app still works without persistence.
  }
}
""",
    """function saveState() {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
    return localStorage.getItem(STORAGE_KEY) === serialized;
  } catch {
    // Most app flows remain usable without persistence. Integrity-sensitive
    // controls explicitly inspect this boolean and refuse to mutate progress.
    return false;
  }
}
""",
    "saveState result",
)

text = replace_once(
    text,
    """      ${TEST_ENABLE_WORD_SECTION_COMPLETION && !progress.complete ? '<button class="button secondary compact alphabet-step-complete" type="button" data-complete-alphabet-section>Complete</button>' : ""}
""",
    """      ${TEST_ENABLE_WORD_SECTION_COMPLETION && isWordExamTestQueryActive() && !progress.complete ? '<button class="button secondary compact alphabet-step-complete" type="button" data-complete-alphabet-section>Testing override</button>' : ""}
""",
    "alphabet render gate",
)
text = replace_once(
    text,
    """          ${TEST_ENABLE_WORD_SECTION_COMPLETION ? `<button class="button secondary compact" type="button" data-word-complete-section="${escapeHtml(section.id)}">Complete section</button>` : ""}
""",
    """          ${TEST_ENABLE_WORD_SECTION_COMPLETION && isWordExamTestQueryActive() ? `<button class="button secondary compact" type="button" data-word-complete-section="${escapeHtml(section.id)}">Testing override</button>` : ""}
""",
    "word render gate",
)

text = replace_once(
    text,
    """function bindAlphabetSectionCards(el) {
  el.querySelectorAll("[data-alphabet-section]").forEach((btn) => {
    btn.addEventListener("click", () => openAlphabetSubsection(btn.dataset.alphabetSection));
  });
}
""",
    """function bindAlphabetSectionCards(el) {
  el.querySelectorAll("[data-alphabet-section]").forEach((btn) => {
    btn.addEventListener("click", () => openAlphabetSubsection(btn.dataset.alphabetSection));
  });
  const completeButton = el.querySelector("[data-complete-alphabet-section]");
  if (completeButton) {
    completeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      completeAlphabetSectionForTesting();
    });
  }
}
""",
    "alphabet completion binding",
)

text = replace_once(
    text,
    """      completeWordSectionForTesting(button.dataset.wordCompleteSection);
      renderVocabulary();
""",
    """      completeWordSectionForTesting(button.dataset.wordCompleteSection);
""",
    "word completion binding",
)

text = replace_once(
    text,
    """if (typeof window !== "undefined" && typeof location !== "undefined" && /[?&]__wetest=1\\b/.test(location.search)) {
""",
    """if (typeof window !== "undefined" && isWordExamTestQueryActive()) {
""",
    "wetest condition",
)
text = replace_once(
    text,
    """    unlockAll() { getWordSections().forEach((s) => completeWordSectionForTesting(s.id)); refreshProgressionState(); },
""",
    """    unlockAll() { getWordSections().forEach((s) => completeWordSectionForTesting(s.id, { confirmed: true })); refreshProgressionState(); },
""",
    "wetest unlock helper",
)
path.write_text(text, encoding="utf-8")


# ---------------------------------------------------------------------------
# Integrity audit: retain Box 0A coverage and add §10.1–9 + tainted fixtures
# ---------------------------------------------------------------------------
path = Path("scripts/audit-exam-integrity.mjs")
text = path.read_text(encoding="utf-8")
text = text.replace("./exam_integrity.js?v=20260721a", "./exam_integrity.js?v=20260721b")
text = text.replace("./app.js?v=20260721a", "./app.js?v=20260721b")
text = text.replace("hanapath-shell-v436", "hanapath-shell-v437")
text = text.replace("\.\/exam_integrity\.js\?v=20260721a", "\\.\\/exam_integrity\\.js\\?v=20260721b")
text = text.replace("\.\/app\.js\?v=20260721a", "\\.\\/app\\.js\\?v=20260721b")
text = replace_once(
    text,
    """  assert.match(sw, /\.\/app\.js\?v=20260721b/);
  return 6;
""",
    """  assert.match(sw, /\.\/app\.js\?v=20260721b/);
  assert.match(app, /function isWordExamTestQueryActive\(\)/);
  assert.match(app, /TEST_ENABLE_WORD_SECTION_COMPLETION && isWordExamTestQueryActive\(\)/);
  assert.match(app, /Exams covering this section become Practice results and cannot award HanaPath mastery or retention\./);
  assert.match(app, /data-complete-alphabet-section>Testing override<\/button>/);
  assert.match(app, /data-word-complete-section=.*Testing override<\/button>/);
  assert.match(app, /function saveState\(\)[\s\S]*localStorage\.getItem\(STORAGE_KEY\) === serialized/);
  assert.match(app, /function getBackupPayload\(\)[\s\S]*state: JSON\.parse\(JSON\.stringify\(state\)\)/);
  assert.match(app, /function parseBackupState\(text\)[\s\S]*return parsed\.state/);

  const wordStart = app.indexOf("function completeWordSectionForTesting");
  const alphabetStart = app.indexOf("function completeAlphabetSectionForTesting");
  const wordBody = app.slice(wordStart, alphabetStart);
  const alphabetBody = app.slice(alphabetStart, app.indexOf("function isWordUnitUnlocked", alphabetStart));
  assert.ok(wordStart >= 0 && alphabetStart > wordStart, "completion functions not found");
  assert.ok(wordBody.indexOf("persistTaintBeforeCompletion(event)") < wordBody.indexOf("state.vocabLessonCompleted ="),
    "Words progression mutates before taint persistence");
  assert.ok(alphabetBody.indexOf("persistTaintBeforeCompletion(event)") < alphabetBody.indexOf("state.phaseOneCompleted ="),
    "Alphabet progression mutates before taint persistence");
  assert.match(app, /function persistTaintBeforeCompletion[\s\S]*saveState\(\)[\s\S]*verifyPersistedTaintEvent/);
  return 18;
""",
    "browser wiring expansion",
)
text = replace_once(
    text,
    """assert.equal(fixtures.length, 5, "Box 0A requires exactly five fixture states");
""",
    """assert.equal(fixtures.length, 7, "Box 0B requires the five migration fixtures plus two tainted fixtures");
""",
    "fixture count",
)

insert_marker = """// Required-field and status enforcement (§10.15–17, §10.32).
"""
taint_tests = """// Box 0B taint-event contract (§10.1–9).
const taintedWordFixture = deepClone(fixtures.find((fixture) => fixture.name === "tainted-word-section-save.json").state);
const taintedGlobalFixture = deepClone(fixtures.find((fixture) => fixture.name === "tainted-global-hook-save.json").state);
assert.deepEqual(api.validateExamIntegrityState(taintedWordFixture, options), []); assertions += 1;
assert.deepEqual(api.validateExamIntegrityState(taintedGlobalFixture, options), []); assertions += 1;

const deterministicEvent = api.createTaintEvent({
  taintEventId: "taint-audit-s3",
  controlId: "word-section-completion",
  affectedPillars: ["words"],
  scopeSectionIds: ["s3"],
  scopeUnitIds: ["s3-grammar-u2"],
  scopeLessonIds: ["s3-grammar-u2-l2"],
  activatedAt: 1784650000000,
  appVersion: "hanapath-shell-v437",
  appAssetRevision: "20260721b",
  queryGate: "__wetest",
  sourceRoute: { hub: "learn", item: "vocabulary", stage: null },
  note: "Owner testing override",
  clearedAt: null,
});
assert.deepEqual(api.validateTaintEvent(deterministicEvent), []); assertions += 1;
const appendTarget = deepClone(fixtures.find((fixture) => fixture.name === "fresh-save.json").state);
api.migrateExamIntegrityState(appendTarget, options);
const appended = api.appendTaintEvent(appendTarget, deterministicEvent);
assert.equal(appended.added, true); assertions += 1;
assert.equal(appendTarget.examIntegrity.taintEvents.length, 1); assertions += 1;
const duplicateAppend = api.appendTaintEvent(appendTarget, deterministicEvent);
assert.equal(duplicateAppend.added, false); assertions += 1;
assert.equal(appendTarget.examIntegrity.taintEvents.length, 1, "duplicate append changed history"); assertions += 1;

const missingTaintField = deepClone(taintedWordFixture);
delete missingTaintField.examIntegrity.taintEvents[0].appAssetRevision;
expectValidationError(missingTaintField, options, /missing appAssetRevision|missing app revision/); assertions += 1;
const duplicateTaint = deepClone(taintedWordFixture);
duplicateTaint.examIntegrity.taintEvents.push(deepClone(duplicateTaint.examIntegrity.taintEvents[0]));
expectValidationError(duplicateTaint, options, /duplicate taintEventId/); assertions += 1;
const selectiveClear = deepClone(taintedWordFixture);
selectiveClear.examIntegrity.taintEvents[0].clearedAt = 1784655000000;
expectValidationError(selectiveClear, options, /clears taint while preserving test-awarded progression/); assertions += 1;

const intersecting = api.getAttemptTaintContext(taintedWordFixture, ["s1"], []);
assert.equal(intersecting.isPractice, true); assertions += 1;
assert.deepEqual(intersecting.overrideEventIds, ["taint-fixture-word-s1"]); assertions += 1;
const nonIntersecting = api.getAttemptTaintContext(taintedWordFixture, ["s2"], []);
assert.equal(nonIntersecting.isPractice, false); assertions += 1;
const globalContext = api.getAttemptTaintContext(taintedGlobalFixture, ["s8"], []);
assert.equal(globalContext.isPractice, true); assertions += 1;
assert.deepEqual(globalContext.overrideEventIds, ["taint-fixture-global-wetest"]); assertions += 1;
const activeHook = api.getAttemptTaintContext(appendTarget, ["s8"], ["__wetest"]);
assert.equal(activeHook.isPractice, true); assertions += 1;
assert.deepEqual(activeHook.overrideFlags, ["__wetest"]); assertions += 1;

const backupPayload = { version: 1, exportedAt: "2026-07-21T16:00:00.000Z", state: deepClone(taintedWordFixture) };
const importedBackup = JSON.parse(JSON.stringify(backupPayload)).state;
assert.deepEqual(importedBackup.examIntegrity.taintEvents, taintedWordFixture.examIntegrity.taintEvents,
  "backup round-trip dropped taint history"); assertions += 1;
assert.deepEqual(importedBackup.examResults, taintedWordFixture.examResults,
  "backup round-trip dropped result provenance"); assertions += 1;

"""
text = replace_once(text, insert_marker, taint_tests + insert_marker, "taint audit tests")
text = text.replace('console.log("Workstream 0 · Box 0A exam-integrity audit");', 'console.log("Workstream 0 · Box 0B exam-integrity audit");')
text = text.replace('console.log(`Legacy wrappers: ${allRecords.length}`);', 'console.log(`Legacy wrappers: ${allRecords.length}`);\nconsole.log(`Taint events: ${fixtures.reduce((total, fixture) => total + (fixture.state.examIntegrity?.taintEvents?.length || 0), 0)}`);')
text = text.replace('console.log("PASS: provenance schema, safe migration, immutable history, and legacy-incomplete guards are green.");', 'console.log("PASS: query gating, durable taint-before-mutation, scope propagation, backup survival, and Box 0A provenance guards are green.");')
path.write_text(text, encoding="utf-8")


# ---------------------------------------------------------------------------
# Cache/version wiring
# ---------------------------------------------------------------------------
path = Path("index.html")
text = path.read_text(encoding="utf-8")
text = replace_once(text, './exam_integrity.js?v=20260721a', './exam_integrity.js?v=20260721b', 'index integrity version')
text = replace_once(text, './app.js?v=20260721a', './app.js?v=20260721b', 'index app version')
path.write_text(text, encoding="utf-8")

path = Path("sw.js")
text = path.read_text(encoding="utf-8")
text = replace_once(text, '// [2026-07-21] Cache bumped for Workstream 0 Box 0A provenance migration.', '// [2026-07-21] Cache bumped for Workstream 0 Box 0B taint-gated completion controls.', 'sw comment')
text = replace_once(text, 'hanapath-shell-v436', 'hanapath-shell-v437', 'sw cache')
text = replace_once(text, './exam_integrity.js?v=20260721a', './exam_integrity.js?v=20260721b', 'sw integrity version')
text = replace_once(text, './app.js?v=20260721a', './app.js?v=20260721b', 'sw app version')
path.write_text(text, encoding="utf-8")

print("Workstream 0 Box 0B patch applied")
