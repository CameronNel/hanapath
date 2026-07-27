# HanaPath core app completion roadmap

> **Authority:** this is the only active execution queue for finishing the HanaPath core app.
> It supersedes every older handover, addendum, rescue plan, model prompt, agent queue, and unchecked
> roadmap box as a source of what to do next. Other documents may define design contracts, but they
> do not schedule work.
>
> **Target:** core release candidate by **Sunday 26 July 2026, 23:59 Europe/Amsterdam**.
> The date is a target, not permission to weaken an audit, invent linguistic review, skip migration
> testing, or merge unfinished work.
>
> **Owner decision:** Sentence examinations use a deliberately curated source bank. The 4,177-row
> Sentence corpus remains the lesson and practice corpus. Completing eligibility shards C and D is
> no longer required for Sentence-exam readiness. The 2,100 reviews already completed in E1A/E1B
> remain protected evidence for candidate selection.

## 1. What “core app complete” means

The core app is complete only when all of the following are true on `main`:

1. Alphabet lessons are reachable, resumable, audio-complete, regression-tested, and the 200-item
   Hangul Mastery Examination remains fully functional.
2. Words lessons are reachable, resumable, audio-complete, migration-safe, and the Core Word
   Examination Suite uses the shipped v3 contract while preserving valid frozen-v2 retention.
3. Sentence lessons are reachable, resumable, audio-complete, and Translate & Type gives clear
   positional and near-miss feedback without weakening correctness.
4. Sentence lessons explicitly teach meaning contrasts before any row becomes an exact-answer exam
   item.
5. Sentence examinations ship as four cumulative stage exams, one final, and one delayed retention
   confirmation, driven only by the enabled, independently reviewed curated bank.
6. All exam results use immutable provenance and taint. Practice cannot award pass, distinction,
   qualification, retention, or mastery.
7. Retained old saves load without reset. Export/import preserves learning state, taint, result
   history, qualifiers, and retention relations.
8. CI contains strict data, exam, integrity, shell, and browser gates. No release-critical content
   gate remains in an incomplete mode.
9. A cold learner can complete the intended Learn and Exam journeys at phone width with no uncaught
   browser errors, broken routes, blank screens, clipped primary controls, or stale-cache failure.
10. Root documentation describes the product that actually exists and sends every agent here.

A green static audit alone is not complete. Learner-facing work must be reachable through the real
browser UI and survive reload, migration, backup/import, offline use, and mobile-width use.

## 2. Scope freeze

### Included

- Existing Alphabet, Words, and Sentences lesson quality and reachability.
- Existing review, Drill Lab, Form Checks, writing, listening, progress, and backup surfaces.
- Hangul Mastery and Core Word examination regression closure.
- Sentence lesson contrast restructuring for curated exam candidates.
- Curated Sentence exam-bank authoring, review, activation, engine, runner, and retention.
- Browser automation, strict CI, migration fixtures, accessibility, and responsive acceptance.
- Documentation consolidation and release-candidate evidence.

### Excluded from core completion

- New elective Words imports or ranks 1,001 to 22,679.
- New Sentence scenarios or expansion beyond the existing 4,177 rows.
- New lesson themes, extra exams, gamification, accounts, cloud sync, or backend services.
- Public Google Play launch, paid-product activation, or real-money purchase testing.
- iOS/iPadOS native packaging.
- Framework adoption, root modularisation, a bundler, or a root package system.
- Time-gated compatibility cleanup while valid retained windows still exist.

## 3. Verified current state

Re-derive these claims before editing affected product code:

- Alphabet has 8 stages and a shipped 200-item Hangul Mastery Examination.
- Words has 2,028 curated senses, 75 units, 284 lessons, 17 Form Checks, and 10 Core Word exams.
- Sentences has 4,177 unique audio-backed rows, 75 units, 8 sections, and 703 lessons.
- E0, E1A, and E1B are merged. Exactly 2,100 full-corpus eligibility records are protected.
- CB0 is merged. It provides a disabled curated-bank contract, strict grader, prompt templates,
  deterministic inventory tooling, ambiguity screening, audits, tests, and the implementation plan.
- CB1 is merged. It provides a deterministic 4,177-row inventory plus 400 typed candidates from
  400 distinct lessons and 456 disjoint recognition candidates.
- CB5 is merged. It provides an enabled, frozen, independently reviewed curated bank containing
  exactly 288 typed entries and 320 recognition entries, locked to a checked-in freeze manifest with
  strict readiness gates.
- Sentence exam blueprints, engine, browser runner, and retention do not yet ship.
- The full learner-journey browser gate ships (packet **L1**, #365): `scripts/test-lesson-journey-gate.mjs`
  drives the real static app in headless Chrome at 375×812 and 768×1024 and is a blocking CI and
  core-gate step.
- Deterministic positional and near-miss Sentence feedback now ships (packet **L2**, #368): the pure
  `HANAPATH_SENTENCE_FEEDBACK` helper aligns Translate & Type, Dictation, and Transform attempts,
  distinguishing correct, moved, substituted, missing, and extra tokens with a polite screen-reader
  summary. Lesson correctness stays spacing-tolerant, curated `acceptAlso` alternatives remain
  accepted, and the formal Sentence-exam grader is unchanged. Sentence exam UI, L3 audio closure,
  and packets X1, X2, Q1, and Q2 do not yet ship.

## 4. Operating rules

### 4.1 One queue, one integrator

- This file is the sole active queue.
- Workers take one READY packet, open a draft PR with evidence, and stop.
- Workers never merge their own completion packet.
- The designated integrator reviews, fixes, marks ready, and squash-merges.
- Do not create another roadmap, addendum, handover, rescue queue, or shadow schedule.
- A blocker is recorded in the current PR and this roadmap is updated by the integrator.

### 4.2 One packet per PR

Every packet PR must include:

- the packet ID in the title;
- exact files changed and why;
- re-derived before/after counts;
- the complete verification transcript;
- browser evidence for learner-facing changes;
- migration impact;
- cache/version impact, or an explicit statement that no loaded file changed;
- remaining limitations without false completion language.

### 4.3 Branch and merge rules

- Branch from fresh `origin/main`.
- Branch format: `core/<packet-id>-<short-slug>`.
- Do not stack PRs unless the packet explicitly permits it.
- Do not combine unrelated packets in an integration branch.
- Recreate stale branches instead of resolving broad conflicts by hand.
- After a data merge, compare merged rows and fields against the reviewed head.

### 4.4 Root-app rules

- The web app remains vanilla HTML, CSS, and JavaScript with browser globals.
- No root framework, bundler, package file, or build step.
- `mobile/` remains the only native/tooling exception.
- State and data migrations are additive and backward-compatible.
- New Korean text requires the official audio pipeline. Never hand-edit `audio_map.js`.
- Loaded-file changes require coordinated `CACHE_NAME`, `index.html`, `sw.js`, query-string, and
  exam-integrity pin updates where applicable.

### 4.5 Curated Sentence exam rules

- Lesson rows and exam items are separate responsibilities.
- Exact typed items must be taught through context, contrast, controlled production, and variation
  awareness before they enter the bank.
- Typed items accept only the canonical answer and at most four manually reviewed alternatives.
- Every typed entry records its author and a different independent reviewer, an approval status,
  UTC review time, reviewed bank revision, and reviewer note.
- No automatic particle swapping, particle deletion/insertion, word-order permutation, synonym
  expansion, register conversion, spacing deletion, fuzzy matching, semantic matching, or LLM
  grading.
- Recognition items are used where exact typed grading would reject ordinary valid Korean.

## 5. File ownership and safe execution

| Lane | May edit | Must not edit concurrently |
|---|---|---|
| CB1 inventory | inventory tooling and generated candidate inventory | lesson/runtime behavior |
| CB2 lesson restructure 1–4 | assigned Sentence lesson data, focused browser fixtures | CB3 when the same physical file is touched |
| CB3 lesson restructure 5–8 | assigned Sentence lesson data, focused browser fixtures | CB2 when the same physical file is touched |
| CB4 bank authoring | curated bank entries and review evidence | engine or app runner |
| CB5 freeze | bank revision/hashes, readiness audit/status wiring | further bank authoring |
| L1 browser gate | smoke/audit scripts, CI, evidence-proven fixes | unrelated `app.js` work |
| L2 feedback | Sentence checking/feedback region in `app.js`, focused CSS/tests | X2 or any other `app.js` packet |
| L3 audio | audio discovery/generation tooling and generated assets | lesson/exam logic |
| X1 engine | new blueprint/engine/audit files | `app.js` |
| X2 runner | Exam/Sentence runner region, styles, integrity bindings | any other `app.js` packet |
| Q1 acceptance | browser tests and focused evidence-driven fixes | runs only after prerequisites merge |
| Q2 closure | CI strictness, status/docs, release evidence | last packet only |

CB2 and CB3 may run in parallel only after the integrator proves they edit different physical files.
Otherwise run CB2, merge it, then run CB3 from fresh `main`.

## 6. Required merge order

```text
D0 -> C1 -> E0 -> E1A/E1B -> CB0
                               |
                               +--> CB1 inventory and shortlist
                                      |
                                      +--> CB2 lesson contrasts, sections 1-4
                                      |       |
                                      |       +--> CB3 lesson contrasts, sections 5-8
                                      |               |
                                      +---------------+--> CB4 bank authoring and independent review
                                                              |
                                                              +--> CB5 freeze and activate
                                                                       |
                                                                       +--> X1 engine
                                                                              |
                                                                              +--> X2 runner

C1 -> L1 -> L2 ---------------------------------------------------------------+
C1 -> L3 ---------------------------------------------------------------------+--> Q1 -> Q2
```

L1 and L3 may proceed in parallel with CB1-CB5. L2 must merge before X2. CB2/CB3
parallelism is conditional on non-overlapping physical files as stated above.

## 7. Status board

The integrator updates this table after each merge. Workers do not edit it.

| ID | Packet | State | Depends on | Primary output |
|---|---|---|---|---|
| D0 | Documentation consolidation and single roadmap | COMPLETE (#350) | none | One authority chain |
| C1 | Baseline census and one-command core gate | COMPLETE (#351, #352) | D0 | Derived status and full gate |
| E0 | Eligibility sharding | COMPLETE (#354) | C1 | Four protected shards |
| E1A | Review rows s0001-s1050 | COMPLETE (#355) | E0 | 1,050 records |
| E1B | Review rows s1051-s2100 | COMPLETE (#356) | E0 | 1,050 records |
| E1C | Review rows s2101-s3150 | SUPERSEDED | E0 | Not required for exam readiness |
| E1D | Review rows s3151-s4177 | SUPERSEDED | E0 | Not required for exam readiness |
| E2 | Full-corpus freeze | SUPERSEDED | E1A-D | Replaced by CB4/CB5 |
| CB0 | Curated-bank foundation and research plan | COMPLETE (#358) | E1B | Disabled bank and safety rails |
| CB1 | Inventory and candidate shortlist | COMPLETE (#360) | CB0 | Ranked candidates and generated inventory |
| CB2 | Lesson contrast restructuring, sections 1-4 | COMPLETE (#362) | CB1 | Taught contrasts and controlled prompts |
| CB3 | Lesson contrast restructuring, sections 5-8 | COMPLETE (#363) | CB2 | Taught contrasts and controlled prompts |
| CB4 | Curate and independently review bank | COMPLETE (#364) | CB2 + CB3 | 288 typed and 320 recognition entries |
| CB5 | Freeze, enable, and lock readiness | COMPLETE (#366) | CB4 | Enabled frozen bank |
| L1 | Lesson reachability, resume, migration, and mobile smoke | COMPLETE (#365) | C1 | Browser gate |
| L2 | Final Sentence positional and near-miss feedback | COMPLETE (#368) | L1 | Clear lesson feedback |
| L3 | Authored-item audio closure | READY | C1 | Complete mapped audio |
| X1 | Sentence exam blueprints and pure engine | READY | CB5 | Deterministic papers and seed audit |
| X2 | Sentence exam UI, provenance, results, and retention | BLOCKED | X1 (L2 met) | Learner-facing exam suite |
| Q1 | Full learner-journey acceptance | BLOCKED | L1-L3 + X2 | Defect closure and evidence |
| Q2 | Strict release-candidate closure | BLOCKED | Q1 | Final evidence and documentation |

The next READY packets are **L3** and **X1**.

## 8. Packet instructions

### Completed historical packets

D0, C1, E0, E1A, E1B, CB0, CB1, CB2, CB3, CB4, CB5, L1, and L2 are complete. Do not recreate or rerun them as new packets.
The 2,100 E1A/E1B records remain protected candidate evidence. E1C, E1D, and E2 are superseded
for exam readiness and must not be started.

### CB1: Inventory and candidate shortlist

> Generate the deterministic Sentence exam inventory from live `main`. Reuse E1A/E1B evidence,
> rank candidates by section, lesson, grammar family, route stability, and ambiguity risk, and
> produce a manually reviewable shortlist of at least 400 typed candidates and 450 recognition
> candidates. Heuristics may reject or flag candidates but may never approve them automatically.
> Do not enable the bank or change learner-facing behavior. Open a draft PR and stop.

Acceptance:

- `docs/generated/sentence_exam_inventory.json` is deterministic and checked in.
- Every candidate resolves to live sentence and lesson data.
- At least 400 typed and 450 recognition candidates are shortlisted.
- Candidate ranking records why a row was included, flagged, or rejected.
- E1A/E1B evidence is reused without claiming it is sufficient approval for the curated bank.

### CB2: Lesson contrast restructuring, sections 1-4

> Restructure shortlisted candidate lessons in Sentence sections 1-4. For every typed candidate,
> teach meaning in context, a nearby valid contrast, controlled production with forced cues, natural
> variation awareness, and free practice. Add focused browser fixtures and mobile/accessibility
> evidence. Do not author or enable the final bank. Open a draft PR and stop.

### CB3: Lesson contrast restructuring, sections 5-8

> From fresh `main`, repeat CB2 for sections 5-8. Give extra scrutiny to clauses, formal register,
> honorifics, future, negation, requests, proposals, counters, and topic/focus choices. Do not run
> concurrently with CB2 unless the integrator has proven non-overlapping physical files. Open a
> draft PR and stop.

### CB4: Curate and independently review the bank

> Select exactly the reviewed source pool required by the locked policy: at least 288 typed entries
> and 320 recognition entries with all section and lesson floors/caps satisfied. Review every typed
> prompt, canonical answer, and manual alternative. The author and reviewer identities must differ.
> Record `authoredBy`, `reviewStatus: "approved"`, `reviewedBy`, UTC `reviewedAt`,
> `reviewedRevision`, and a substantive `reviewerNote`. Keep the bank disabled. Open a draft PR and
> stop.

Acceptance:

- Every typed item has complete independent-review evidence for the current bank revision.
- No typed item has unresolved ambiguity, source drift, route failure, or accepted-answer collision.
- No item has more than four alternatives.
- The finite typed share is at most 15%.
- Locked quotas are enforced by audit-owned constants, not trusted from bank data.

### CB5: Freeze and activate

> Freeze the curated bank revision and prompt/answer hashes, enable the bank, check in the generated
> inventory, make Sentence-exam readiness depend on the curated bank, and make all readiness gates
> strict. Do not build the exam runner. Open a draft PR and stop.

Acceptance:

- Enabled bank passes the audit with locked 288/320 targets, section floors, lesson caps, and finite cap.
- All typed reviews match the frozen revision.
- Shards C and D remain historical evidence and are not release prerequisites.
- No old save, route, lesson row, or completed E1A/E1B record is removed.

### L1: Lesson reachability and migration browser gate

> Add deterministic browser smoke coverage for cold start, unlocks, resume, completion, reload,
> backup export/import, legacy migration, phone/tablet width, and console errors across Alphabet,
> Words, Sentences, Drill Lab, Form Checks, writing, listening, and Progress. Fix only defects proven
> by the suite. Open a draft PR and stop.

Minimum journeys include first-use onboarding, all three lesson families, review/SRS persistence,
Sentence checkpoints and Form Check return routes, exact backup restoration, legacy migration,
375 px and tablet layouts, and failure on `pageerror`, unhandled rejection, blank routes, or missing
primary controls.

### L2: Final Sentence feedback

> Replace coarse Sentence Translate & Type feedback with deterministic positional alignment and
> near-miss feedback. Distinguish missing, extra, substituted, and moved tokens; handle repeated
> tokens; preserve current correctness; keep stricter formal-exam spacing; and add browser and
> screen-reader evidence. Do not use fuzzy acceptance or hidden correction. Open a draft PR and stop.

### L3: Authored-item audio closure

> Extend audio discovery to every loaded authored lesson item, Form Check answer, and examination
> audio string. Generate missing assets through the official pipeline, never by editing
> `audio_map.js`. Prove the browser uses mapped assets rather than TTS fallback. Open a draft PR and
> stop.

### X1: Sentence exam blueprints and pure engine

> Implement four cumulative stage blueprints, one final, one retention confirmation, and a pure
> deterministic generator/grader/selector using only the enabled frozen curated bank. Do not touch
> `app.js`. Add the full seed audit and generated coverage report. Open a draft PR and stop.

Non-negotiable contracts:

- Stage/final/retention lengths are 24/50/25 with 20/40/20 typed items.
- Existing timing, strand allocation, cut score, mastery, retention, freshness, and subscore rules remain.
- Browser and audit use the same strict grader byte-for-byte.
- Seeds are deterministic and non-personalised.
- Audit covers exposure, duplicates, option uniqueness, freshness, pool floors, answer leakage,
  route resolution, and retention avoidance.

### X2: Sentence exam runner, provenance, results, and retention

> Add the Sentence examination suite to the Exam tab using X1. Implement intro, timer, navigation,
> review, submission, result, remediation, qualification, delayed retention, immutable provenance,
> Practice handling, migration, and backup validation. Reuse existing exam components. Open a draft
> PR and stop.

No hints, helper ladder, answer feedback, or correctness signal appears before submission. Active
taint/testing forces Practice. Practice cannot award progression or retention. Legacy state remains
visible but is never relabelled as a proven HanaPath result.

### Q1: Full core acceptance and defect closure

> Run the complete core gate and real browser journeys on fresh, progressed, legacy, tainted, and
> imported profiles. Test phone/tablet layouts, Korean keyboard composition, offline relaunch, audio,
> save/resume, all exam families, and retention fixtures. Fix only release-blocking defects supported
> by evidence. Open one draft PR with focused fixes and an evidence report.

P0 and P1 issues block release. Cosmetic P2 issues block only when they obscure meaning or controls.
No new feature or content expansion is permitted.

### Q2: Release-candidate closure

> Make every core CI gate strict, update generated status and root documentation to exact merged
> reality, mark all packets complete with PR links and verified counts, and produce release-candidate
> evidence. Do not tag a release unless the owner explicitly requests it. Open a draft PR and stop.

Acceptance:

- No release-critical incomplete flag remains.
- Full audits and browser acceptance pass on one exact commit.
- No open P0/P1 core issue or untriaged browser failure remains.
- Root documentation agrees.
- The final evidence records commands, versions, counts, browser profiles, viewports, migrations,
  known P2 issues, and the exact commit.

## 9. Universal verification matrix

Run the focused checks plus every unaffected gate required by touched files. Q1 and Q2 run the full
matrix. `node scripts/audit-core-release.mjs --full` is the deterministic superset gate.

```bash
# Syntax: each file must be checked separately.
node --check app.js
node --check sw.js
node --check exam_integrity.js
node --check sentence_exam_eligibility.js
node --check sentence_exam_prompt_templates.js
node --check sentence_exam_curated_bank.js
node --check sentence_exam_grader.js

node scripts/audit-exam-integrity.mjs
node scripts/audit-hangul-mastery-exam.mjs
node scripts/build-word-exam-competency-map.mjs --check
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/test-thin-lesson-heuristic.mjs
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-sentences-foundation.mjs
node scripts/audit-form-checks.mjs
node scripts/audit-sentence-eligibility.mjs --allow-incomplete
node scripts/test-sentence-eligibility-shards.mjs
node scripts/audit-sentence-exam-curated-bank.mjs
node scripts/test-sentence-exam-ambiguity.mjs
node scripts/test-sentence-exam-grader.mjs
node scripts/audit-sentence-exams.mjs               # after X1
node scripts/audit-audio-coverage.mjs
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-app-shell.mjs
node scripts/audit-mobile-package.mjs
node scripts/audit-core-release.mjs --full
```

Also run when applicable:

- `git diff --check`;
- deterministic generator `--check` modes;
- the canonical browser smoke suite;
- Android tests/build for native or packaged-asset changes;
- before/after localStorage fixture comparison for migrations.

Do not omit a slow command silently. State why it could not run and rely on authoritative CI only
when the environment genuinely lacks the platform.

## 10. Integrator review checklist

Before merging any packet:

1. Confirm the branch base and one-packet scope.
2. Read the governing specification and this roadmap, not only the PR summary.
3. Verify exact changed files and reject unrelated churn.
4. Re-run the focused audit and an independent spot-check.
5. For data, compare IDs and fields with the base and review difficult samples.
6. For generated files, rerun the generator or check mode.
7. For UI, reproduce browser evidence at phone width and inspect console errors.
8. For cache changes, verify every version and integrity pin agrees.
9. Confirm typed curated entries contain current independent-review evidence and the reviewer differs
   from the author.
10. After merge, fetch fresh `main`, rerun critical audits, and compare the merge with the reviewed head.
11. Update this status board in an integrator-owned correction when needed.

## 11. Post-core queue

After Q2:

1. Run the real Android phone/tablet device matrix.
2. Decide the Handwriting Coach commercial configuration.
3. Confirm Play owner, package, support, privacy, audience, and country decisions.
4. Create the upload keystore and protected environment, then exercise signed AAB output.
5. Complete Play testing requirements.
6. Decide the free Alphabet ML Kit authority after device evidence.
7. Build iOS/StoreKit parity if desired.
8. Resume optional Words or Sentence expansion only with new owner-approved scope.
9. Perform time-gated compatibility cleanup only after retained windows expire safely.

## 12. One-line dispatch instruction

> Read `docs/CORE_APP_COMPLETION_ROADMAP.md`, take the next READY packet you are qualified for,
> execute exactly that packet, open a draft PR with evidence, and stop. Do not create a new plan or
> merge your own work.
