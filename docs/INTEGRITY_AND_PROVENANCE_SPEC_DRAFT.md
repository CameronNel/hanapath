# HanaPath — Integrity, Provenance, and Honest Claims Specification Draft

> **Workstream 0 · P0 prerequisite.** This specification ships before any new
> formal examination. It carries locked Decisions 11, 12, and 15 forward
> unchanged from the [locked decision record](https://github.com/CameronNel/hanapath/blob/claude/exam-section-audit-fxv6nh/docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md).
>
> **Status:** Phase 2 planning contract, pending Claude repository-binding
> review.  
> **Audited application baseline:** `55ac88981fdab0eb79cafd1770b25cde25340234`.  
> **Evidence:** [Phase 1 report](https://github.com/CameronNel/hanapath/blob/research/exam-programme-phase-1/docs/EXAM_PROGRAMME_RESEARCH_REPORT.md) and
> [decision memo](https://github.com/CameronNel/hanapath/blob/research/exam-programme-phase-1/docs/EXAM_PROGRAMME_DECISION_MEMO.md).

## 0. Executive decision

HanaPath examinations are **device-local curriculum achievement assessments**.
They are not proctored, independently verified, cryptographically secured, or
tamper-proof credentials.

Workstream 0 must therefore do four things before the examination programme
grows:

1. move the owner-mandated section-completion control behind the existing
   private query/test-mode pattern;
2. write persistent local taint events whenever a completion or test override
   affects examinable scope;
3. classify every submitted result as either a **HanaPath result** or a
   **Practice result**, with tainted attempts permanently ineligible for
   mastery and retention;
4. store enough versioned provenance to reproduce and interpret each result
   without pretending that local metadata proves authenticity.

This is an honesty and reproducibility system, not an anti-tamper security
system. A capable user can edit `localStorage`, including the provenance
records. The product must say that plainly.

## 1. Locked decisions

The following are binding:

- the section-completion control remains available to the owner;
- ordinary learner UI does not expose it;
- access is query-gated using the existing private testing-pattern precedent;
- override use creates persistent local taint;
- any attempt whose scope intersects tainted scope is a `Practice result`;
- a `Practice result` may be completed and reviewed but may never qualify for
  mastery, open retention, satisfy retention, or replace an untainted mastery
  pair;
- untainted attempts are `HanaPath results`;
- the words **official**, **verified**, **certified**, and equivalent
  authenticity language are prohibited for HanaPath results;
- result records are versioned and immutable;
- legacy records are migrated additively and marked `legacy-incomplete` where
  provenance cannot be known;
- a checksum may detect accidental corruption but must never be described as
  authenticity proof;
- the short result-card claim and full disclosure in §8 are exact owner copy.

## 2. Current-state boundary and threat model

### 2.1 Current persistence

`app.js` stores the application state under the existing `STORAGE_KEY` through
`loadState()` and `saveState()`. The Settings screen also exports and imports a
JSON backup of that state. The current Words suite normalizes compact aggregate
records through `normalizeWordExams()` and stores a qualifying target list for
retention.

These are useful local-product features. They also mean:

- browser developer tools can inspect or edit the state;
- a backup file can be edited before import;
- a local checksum can be recomputed by anyone who can inspect the code;
- query-gating raises the effort required to invoke testing controls but does
  not create external trust.

### 2.2 Threats this specification handles

- accidental use of a testing shortcut in ordinary use;
- a shortcut-awarded section crown unlocking an exam;
- a test-mode hook remaining active during an attempt;
- a result losing its seed, blueprint, bank, or override context;
- a new blueprint silently reinterpreting an old result;
- a qualifying attempt being paired with an incompatible retention attempt;
- migrated legacy records being presented with provenance they never had;
- learner-facing copy implying external verification.

### 2.3 Threats it does not claim to solve

- a user editing `localStorage`;
- a user editing an exported backup;
- a user modifying the JavaScript application;
- clock manipulation;
- device compromise;
- identity verification;
- proctoring;
- remote attestation;
- third-party credential verification.

No implementation box may add copy suggesting that these threats are solved.

## 3. Terminology and status model

| Term | Contract |
|---|---|
| **HanaPath result** | Submitted attempt with no intersecting taint and no active testing override at generation or submission. It is still device-local and unproctored. |
| **Practice result** | Submitted attempt tainted by a scope-intersecting completion override or any active testing hook. It is scored and reviewable but never mastery-bearing. |
| **Legacy result** | Result written before this provenance schema. It retains its historical score and gains only knowable migration fields. |
| **`legacy-incomplete`** | Provenance status used when seed, blueprint, bank revision, override status, or linkage cannot be reconstructed. |
| **Taint event** | Append-only local record of a test control changing progression or of a test-mode hook being active. |
| **Active override** | Test hook or control state active when an attempt is generated, resumed, or submitted. |
| **Immutable history** | Submitted result records are appended and never recomputed, re-banded, rewritten, or deleted by normal product flows. |
| **Derived summary** | Best score, pass flag, or hub badge calculated from immutable results. It may be rebuilt without changing the source records. |

Result status is an enum, not a presentation guess:

```text
hanaPath
practice
legacy-incomplete
```

`legacy-incomplete` is not silently upgraded to `hanaPath`.

## 4. Query-gated section-completion control

### 4.1 Gate

The live `TEST_ENABLE_WORD_SECTION_COMPLETION` control must no longer render in
ordinary use. It renders only when all of the following are true:

1. the existing private test-mode query is active, using the repository's
   `?__wetest=1` precedent;
2. the session has passed a deliberate confirmation screen that names the
   affected section and states that results become Practice results;
3. the control's implementation is enabled by the owner-maintained constant.

A proposed central helper may be named `isWetTestModeActive()`. That name is
new; the behaviour is binding.

The gate is not a password and must not be described as security. It prevents
casual discovery and accidental activation.

### 4.2 Activation sequence

Before crowning a section:

1. resolve the exact section ID and all units/lessons/checkpoints that will be
   changed;
2. show a destructive-style confirmation;
3. append and save a taint event;
4. only after the taint event is durably saved, perform the completion
   mutation;
5. re-read the saved event and verify its ID before reporting success;
6. refresh progression and exam unlocks.

If event persistence fails, the completion mutation must not run.

### 4.3 Persistent taint-event shape

```js
{
  taintSchemaVersion: 1,
  taintEventId: "taint-<uuid>",
  controlId: "word-section-completion",
  affectedPillars: ["words"],
  scopeSectionIds: ["s3"],
  scopeUnitIds: ["..."],
  scopeLessonIds: ["..."],
  activatedAt: 1784635200000,
  appVersion: "hanapath-shell-v...",
  appAssetRevision: "<revision>",
  queryGate: "__wetest",
  sourceRoute: { hub: "learn", item: "vocabulary", stage: null },
  note: "Owner testing override",
  clearedAt: null
}
```

Rules:

- IDs are unique and never reused.
- Events are append-only in normal flows.
- `scopeSectionIds` is mandatory for section completion.
- `scopeUnitIds` and `scopeLessonIds` capture what was actually crowned.
- A developer-only **Reset testing data** action may remove all test-created
  progression and taint records together after explicit confirmation. It may
  not selectively delete taint while preserving shortcut-awarded progress.
- Importing a backup imports its taint history. Import cannot strip it.

### 4.4 Testing-hook events

When `?__wetest=1`, `TEST_UNLOCK_ALL_STAGES`, a simulated examination clock, or
any future override can alter an examination's availability, timing, content,
or outcome:

- the active hook is copied to `overrideFlags` at generation;
- it is checked again at submission;
- any active hook makes the attempt a Practice result, even if it did not
  visibly change the generated items;
- clock-only browser acceptance fixtures may bypass persistence only inside
  automated harnesses that never write learner state. Shipped UI may not.

## 5. Taint propagation

### 5.1 Scope intersection

For an exam attempt `A` and taint event `T`:

```text
intersects(A,T) =
  A.scopeSectionIds ∩ T.scopeSectionIds is non-empty
  OR T is a global exam/testing override
```

At attempt generation, store all intersecting `taintEventId` values. Recheck
before submission so a taint created mid-attempt cannot be missed.

### 5.2 Result classification

```text
Practice result when:
- one or more intersecting taint events exist; or
- one or more active override flags exist at generation, resume, or submit; or
- imported/migrated state cannot establish that an override was absent and
  the record is newly claiming mastery.

HanaPath result when:
- the result is newly generated under the provenance schema;
- no intersecting event exists;
- no override flag is active;
- required provenance fields are complete.
```

A migrated historical score with unknown override status remains
`legacy-incomplete`. Existing mastery is preserved historically, but the UI
must not represent the migrated record as newly verified.

### 5.3 Mastery and retention

A Practice result:

- may receive an overall score and diagnostic profile;
- may display pass/distinction calculations for rehearsal, clearly labelled
  practice;
- must not set `passed`, `distinguished`, `masteryEarnedAt`, or equivalent
  official programme state used by normal cards;
- must not create `confirmationDueFrom` or `confirmationExpiresAt`;
- must not be used as `qualifyingAttemptId`;
- must not satisfy retention;
- must not replace or erase an earlier HanaPath result.

A retention attempt becomes Practice if either it or its linked qualifier is
tainted or provenance-incomplete.

## 6. Provenance schema

### 6.1 Immutable result record

Every new Hangul, Words, and Sentence result stores at least:

```js
{
  resultSchemaVersion: 1,
  attemptId: "attempt-<uuid>",
  examId: "word-exam-10",
  attemptMode: "full", // full | retention | practice
  blueprintVersion: 2,
  engineVersion: 2,
  generationSeed: "12345",
  contentBankRevision: "words-v2@<sha>",
  eligibilityRevision: null,
  generatedAt: 1784635200000,
  submittedAt: 1784640000000,
  durationSeconds: 4800,
  scopeSectionIds: ["s1","s2","s3","s4","s5","s6","s7","s8"],
  itemCount: 150,
  scoreSummary: { correct: 136, total: 150, pct: 90.7, unanswered: 0 },
  floorSummary: { passed: true, distinguished: true, details: {} },
  status: "hanaPath",
  overrideFlags: [],
  overrideEventIds: [],
  qualifyingAttemptId: null,
  retentionAttemptId: null,
  legacyProvenanceStatus: null,
  checksum: null
}
```

Sentence records add `eligibilityRevision`; Words may add competency-map
revision; Hangul may leave fields not applicable as explicit `null`.

### 6.2 Attempt linkage

- A qualifying result stores no `retentionAttemptId` until confirmation is
  submitted.
- A retention record stores `qualifyingAttemptId`.
- After valid retention, the qualifier's derived index may point to the
  retention attempt, but the original result record is not edited. Store the
  linkage in a separate append-only relation/index.
- Mastery pairs must match exam ID, blueprint major version, engine compatibility
  family, content-bank compatibility family, and status `hanaPath`.

### 6.3 Result collections and indexes

```js
state.examIntegrity = {
  version: 1,
  taintEvents: [],
  resultRelations: [],
  migrationLog: []
};

state.examResults = {
  version: 1,
  byAttemptId: {}
};
```

Existing `state.wordExams` and Hangul summary fields remain compatibility
indexes until their UI is migrated. New source-of-truth records live in
`state.examResults.byAttemptId`. Index rebuilding must be deterministic.

## 7. Migration and immutable history

### 7.1 Additive migration

On load:

1. preserve the raw historical record;
2. create a new immutable wrapper only where a stable historical object exists;
3. copy knowable score, timestamps, exam ID, and mastery state;
4. set unknown fields to `null`, not invented defaults;
5. set `legacyProvenanceStatus: "legacy-incomplete"`;
6. record a migration-log entry with source shape and migration version;
7. never reset lesson, SRS, crown, pass, or mastery progress.

Migration must be idempotent. Running it twice produces byte-equivalent
normalized state and no duplicate attempts.

### 7.2 No retroactive recomputation

When a blueprint, bank, scoring threshold, or eligibility set changes:

- historical percentages remain unchanged;
- historical pass/distinction/mastery labels remain the labels earned under the
  stored version;
- new thresholds apply only to new attempts;
- UI displays the stored version where details are shown;
- aggregated “best” summaries compare stored outcomes without regrading.

### 7.3 Backups

Export and import include:

- immutable result records;
- taint events;
- result relations;
- migration log;
- compatibility indexes.

Import validation rejects malformed IDs, duplicate attempt IDs, broken
linkages, and impossible status combinations before replacing state.

## 8. Learner-facing labels and claim copy

### 8.1 Required labels

Use exactly:

- **HanaPath result**
- **Practice result**
- **Legacy result · provenance incomplete**

Never use:

- official result;
- verified result;
- certified result;
- secure credential;
- tamper-proof;
- externally validated;
- TOPIK/CEFR equivalent.

### 8.2 Sentence Mastery card

Exact locked short copy:

> You demonstrated and retained the taught HanaPath sentence patterns in this device-local assessment.

### 8.3 Immediately accessible full disclosure

A visible `About this result` or equivalent control on the result card opens
the full copy without leaving the result context:

> HanaPath Sentence Mastery records that, under this version of HanaPath's local assessment, you produced the taught sentence patterns accurately and retained that performance after a delayed confirmation. Results are stored on this device and are not proctored or tamper-proof credentials.

The same full disclosure appears in examination help and exported result
details.

### 8.4 Practice copy

> This is a Practice result because testing controls affected this attempt. It
> is scored for review but cannot award HanaPath mastery or retention.

The card lists the broad reason, not internal query secrets.

## 9. Checksum rule

A checksum is optional and may be used only for:

- detecting accidental truncation;
- detecting malformed backup transport;
- supporting debugging.

Copy must say `Integrity check` or `File consistency check`, never
`verified signature`. The checksum algorithm and value are local and do not
establish who took the exam or whether the record was edited.

## 10. Audit contract

Add a dedicated audit, for example
`scripts/audit-exam-integrity.mjs`. It must load the same data contracts used by
the browser and hard-fail on:

1. ordinary UI rendering the section-completion control without the private
   query gate;
2. a completion mutation occurring before a taint event is saved;
3. a taint event missing schema version, ID, control ID, timestamp, app
   revision, or affected scope;
4. duplicate taint-event IDs;
5. selectively clearing taint while preserving test-awarded progression;
6. backup export omitting taint or result provenance;
7. backup import dropping taint;
8. a scoped exam failing to inherit an intersecting section taint;
9. a global testing hook failing to taint an attempt;
10. an override activated mid-attempt not appearing at submission;
11. a tainted attempt stored as `hanaPath`;
12. a Practice result changing pass, distinction, qualification, retention, or
    mastery state;
13. a tainted qualifier opening retention;
14. retention linked to a tainted or provenance-incomplete qualifier;
15. a result missing any required provenance field;
16. an invalid result status;
17. duplicate attempt IDs;
18. broken qualifier/retention linkage;
19. a mastery pair crossing incompatible blueprint major versions;
20. a result's item count disagreeing with its blueprint;
21. a result's exam ID or scope not resolving;
22. migration inventing seed, bank revision, override absence, or timestamps;
23. migration deleting or reducing existing progress;
24. migration not being idempotent;
25. historical records being recomputed after a blueprint change;
26. compatibility indexes disagreeing with immutable source records;
27. UI copy containing `official`, `verified`, `certified`, TOPIK equivalence,
    CEFR equivalence, or tamper-proof claims in an exam-result context;
28. the required short or full Sentence Mastery copy drifting;
29. the full disclosure requiring navigation away from the result;
30. a checksum being labelled as authentication or verification;
31. malformed imported provenance replacing good state;
32. legacy records being silently labelled HanaPath results.

On success, print counts by exam, status, blueprint version, bank revision,
override type, and legacy provenance state.

## 11. Browser acceptance tests

Test fresh, progressed, tainted, migrated, and imported profiles:

- no query: completion control absent;
- private query: control present only after the warning path;
- cancel warning: no progress and no taint;
- confirm warning: taint persists before progress changes;
- close/reopen: taint remains;
- export/import: taint and result history survive;
- take an intersecting Words exam: Practice result, no qualification;
- take a non-intersecting exam: classification follows only its own scope and
  global hooks;
- activate a hook mid-attempt: submission becomes Practice;
- Practice result shows score and review but no mastery action;
- legacy saves retain all old progress and receive `legacy-incomplete`;
- migration rerun produces no duplicates;
- old mastery remains visible as historical legacy achievement;
- new untainted attempt writes complete provenance;
- result detail shows seed, blueprint, bank, status, and disclosure;
- card uses the exact short Sentence Mastery copy;
- disclosure opens in one interaction;
- prohibited authenticity wording is absent;
- Hangul, Words, and Sentence result indexes rebuild after reload;
- corrupted import is rejected without replacing current state;
- phone and tablet layouts keep the disclosure and Practice label visible.

## 12. Ship checklist

```bash
node --check app.js sw.js
node scripts/audit-exam-integrity.mjs
node scripts/audit-word-exams.mjs
node scripts/audit-hangul-mastery-exam.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-app-shell.mjs
```

Also:

- inspect ordinary and private-query routes manually;
- export and import fresh, migrated, and tainted fixtures;
- verify no normal learning/SRS state changes from result migration;
- verify cache/query versions for every changed loaded asset;
- update examination handover docs only after shipment;
- keep Workstream 0 independent of the Sentence runner so it can land first.

## 13. One-box-per-PR execution queue

| Box | One draft PR | Acceptance gate |
|---|---|---|
| `0A` | Add immutable result/provenance schemas, fixture states, and idempotent migration | Migration audit green; no UI change |
| `0B` | Add taint-event model and query-gate the section-completion control | Mutation cannot occur without saved taint |
| `0C` | Bind Hangul results to provenance and labels | Existing Hangul exam behaviour unchanged |
| `0D` | Bind Words results, qualification, and retention to provenance/taint | Full Words audit plus taint fixtures green |
| `0E` | Add shared result labels, exact claim/disclosure copy, import/export validation | Copy audit and browser acceptance green |
| `0F` | Remove compatibility reads only where all routes use immutable records | Migration from every retained fixture green |

Workstream 0 is complete only after `0A` through `0E`. `0F` is optional cleanup
and may not delay the credibility prerequisite.

## 14. Locked decisions

All Decisions 11, 12, and 15 are reproduced without amendment in this
specification. Any change to labels, taint eligibility, provenance fields,
history immutability, or claim copy requires a new explicit owner decision.

## 15. Open questions for the owner

None at drafting time. An implementation discovery that makes a locked
requirement infeasible must stop the affected box and return to the owner. It
must not be redesigned silently.

## Repository references

This specification is bound to application baseline
`55ac88981fdab0eb79cafd1770b25cde25340234`. Implementation must re-check every cited symbol before coding
and flag drift rather than silently adapting the contract.

- [`app.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/app.js): `loadState`, `saveState`, `normalizeWordExams`, `isWordSectionComplete`, `isWordExamUnlocked`, `wordExamRetentionStatus`, the Core Word exam runner, the Sentences Translate & Type path, and the owner-mandated section-completion control.
- [`sentences_core.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/sentences_core.js): `window.HANAPATH_SENTENCES`, including `korean`, `english`, `tokens`, `band`, `patternTags`, `speechLevel`, `register`, and `acceptAlso`.
- [`sentences_lesson_plan.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/sentences_lesson_plan.js): `HANAPATH_SENTENCE_SECTIONS`, `HANAPATH_SENTENCE_UNITS`, and `HANAPATH_SENTENCE_LESSONS`.
- [`word_exam_blueprints.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/word_exam_blueprints.js): `HANAPATH_WORD_EXAMS`, `HANAPATH_WORD_EXAM_COMPETENCIES`, provisional bands, `MIN_SUBSCORE_ITEMS`, and the v2 retention contract.
- [`word_exam_engine.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/word_exam_engine.js): seeded generation, `competencyEligible`, typed grading, band evaluation, and retention generation.
- [`words_lesson_plan.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/words_lesson_plan.js): the live Words curriculum and exact grammar lesson IDs.
- [`words_inflect.js`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/words_inflect.js): `conjugate`, `recognize`, `recognizeWord`, and `inflect`.
- [`scripts/audit-word-exams.mjs`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/scripts/audit-word-exams.mjs) and [`scripts/audit-sentences-data.mjs`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/scripts/audit-sentences-data.mjs): established audit patterns.
- [`docs/CORE_WORD_EXAM_SPECS.md`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/docs/CORE_WORD_EXAM_SPECS.md) and [`docs/SENTENCES_TEACHING_SPEC.md`](https://github.com/CameronNel/hanapath/blob/55ac88981fdab0eb79cafd1770b25cde25340234/docs/SENTENCES_TEACHING_SPEC.md): sibling contracts and current teaching architecture.
