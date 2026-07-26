# HanaPath core app completion roadmap

> **Authority:** this is the only active execution queue for finishing the HanaPath core app.
> It supersedes every older handover, marathon prompt, rescue plan, agent queue, and unchecked
> roadmap box as a source of **what to do next**. Older documents remain useful as design
> contracts and history only.
>
> **Target:** core release candidate by **Sunday 26 July 2026, 23:59 Europe/Amsterdam**.
> The date is a target, not permission to weaken an audit, invent linguistic review, skip a
> migration test, or merge an unfinished feature.
>
> **Owner intent:** lessons and examinations must be functionally complete, internally
> consistent, reviewable, and protected by strict automated gates. No new curriculum expansion
> is allowed during this completion sprint.

> **Active amendment — Sentence exam eligibility path (CB0+):** the Sentence-exam source bank
> is now the curated `HANAPATH_SENTENCE_EXAM_CURATED_BANK`, not all 4,177 lesson rows. Packets
> **E1C and E1D are paused** and **E2 is replaced by CB1–CB5**; do **not** review shard C or D
> under the old full-corpus requirement in the section 7 table below. Follow
> [`CORE_APP_COMPLETION_ROADMAP_CURATED_BANK_ADDENDUM.md`](CORE_APP_COMPLETION_ROADMAP_CURATED_BANK_ADDENDUM.md)
> for the active Sentence-exam packet board and
> [`SENTENCE_MASTERY_EXAM_CURATED_BANK_AMENDMENT.md`](SENTENCE_MASTERY_EXAM_CURATED_BANK_AMENDMENT.md)
> for the amended readiness contract. All other scope, ownership, and release rules here stay active.

## 1. What “core app complete” means

The core app is complete only when all of the following are true on `main`:

1. **Alphabet lessons** are reachable, resumable, audio-complete, regression-tested, and the
   200-item Hangul Mastery Examination remains fully functional.
2. **Words lessons** are reachable, resumable, audio-complete, migration-safe, and the Core Word
   Examination Suite uses the shipped v3 production contract while preserving valid frozen-v2
   retention windows.
3. **Sentence lessons** are reachable, resumable, audio-complete, and Translate & Type gives
   final-quality positional and near-miss feedback without weakening answer correctness.
4. **Sentence examinations** ship as specified: four cumulative stage examinations, one final,
   and one delayed retention confirmation, all driven by reviewed finite eligibility metadata.
5. All exam results use the immutable provenance and taint model. Practice attempts cannot award
   pass, distinction, qualification, retention, or mastery.
6. All retained old saves load without a reset. Export/import preserves learning state, taint,
   result history, qualifiers, and retention relations.
7. CI contains strict data, exam, integrity, shell, and browser gates. There is no active
   `--allow-incomplete` exception for core content.
8. A cold learner can complete the intended Learn and Exam journeys at phone width with zero
   uncaught browser errors, broken routes, blank screens, clipped primary controls, or stale-cache
   behaviour.
9. Root documentation describes the product that actually exists and routes every agent to this
   roadmap.

A green static audit alone is not “complete.” A feature must also be reachable through the real
browser UI and survive reload, migration, and mobile-width use.

## 2. Scope freeze

### Included in this completion sprint

- Existing Alphabet, Words, and Sentences lesson quality and reachability.
- Existing review, Drill Lab, Form Checks, writing, listening, progress, and backup surfaces.
- Hangul Mastery and Core Word examination regression closure.
- Full Sentence Mastery examination implementation.
- Browser automation, strict CI, migration fixtures, accessibility and responsive acceptance.
- Documentation consolidation and a release-candidate evidence report.

### Explicitly excluded from core completion

These items must not delay the core release candidate:

- New elective Words imports or the ranks 1,001 to 22,679 expansion queue.
- New Sentence scenario packs or expansion beyond the existing 4,177-row bank.
- New lesson themes, new exams, gamification, accounts, cloud sync, or backend services.
- Public Google Play launch, store listing submission, paid-product activation, or real-money
  purchase testing.
- iOS/iPadOS native packaging.
- Choosing ML Kit as the free Alphabet grading authority.
- Root-app modularisation, framework adoption, or a bundler.
- Time-gated cleanup such as exam-integrity 0F or removal of frozen-v2 compatibility while valid
  v2 retention windows may still exist.

The Android shell, Play release, native handwriting, and store work remain in the post-core queue
in section 11.

## 3. Verified starting point on 24 July 2026

Treat these as orientation facts, then re-derive them in packet C1 before editing product code:

- `main` has no open pull requests and its latest CI and Android workflows are green.
- Alphabet has 8 learning stages and a shipped 200-item Hangul Mastery Examination.
- Words has 2,028 curated senses, 75 curriculum units, 284 lessons after the additive
  `s3-grammar-u2-l3` production bridge, 17 Form Checks, and 10 Core Word examinations.
- Core Word examination v3 typed past/negation production is shipped, with frozen-v2 retention
  compatibility retained for existing valid qualifiers.
- Sentences has 4,177 unique, audio-backed rows and a shipped 75-unit curriculum path.
- Sentence examination eligibility is the largest unfinished area: only 20 of 4,177 rows are
  reviewed, and CI currently uses `audit-sentence-eligibility.mjs --allow-incomplete`.
- The Sentence Mastery specification exists, but its blueprints, pure generator/grader, browser
  runner, retention flow, and strict eligibility gate do not yet ship.
- CI has extensive Node audits but no canonical end-to-end browser gate covering the whole core
  learner journey.

## 4. Programme operating rules

### 4.1 One queue, one integrator

During this completion sprint, this roadmap overrides the general model-family auto-merge rule.

- **Workers never merge their own packet PRs.** Every packet is opened as a draft.
- One designated high-intelligence integrator reviews, fixes, marks ready, and squash-merges.
- Workers may work in parallel only where the file-ownership table explicitly permits it.
- No agent may create another roadmap, rescue handover, continuation prompt, or shadow queue.
- A blocker is written in the current PR and this roadmap is updated by the integrator. It is not
  solved by inventing a new plan document.

### 4.2 One packet per PR

Every PR must contain exactly one packet from section 7 and must include:

- the packet ID in the title;
- exact files changed and why;
- re-derived before/after counts;
- the complete verification transcript;
- browser evidence when the packet has a learner-facing surface;
- migration impact;
- cache/version changes, or an explicit statement that no loaded file changed;
- remaining limitations, with no false “complete” language.

### 4.3 Branch and merge rules

- Branch from fresh `origin/main`, except eligibility classification branches created from the
  merged E0 sharding commit.
- Branch format: `core/<packet-id>-<short-slug>`.
- Do not stack PRs unless the packet explicitly says to stack.
- Do not use an integration megabranch to combine unrelated work.
- Rebase or recreate stale branches rather than resolving broad conflicts by hand.
- After every merge touching learning data, compare the merged result with the reviewed PR head
  at row/field level. A green audit is not proof that a merge retained all intended rows.

### 4.4 Root-app rules

- The canonical web app stays vanilla HTML/CSS/JavaScript with plain browser globals.
- No framework, bundler, root `package.json`, or root build step.
- `mobile/` remains the only native/tooling exception.
- Data and state migrations are additive and backward-compatible.
- New Korean text requires audited audio generation. Never hand-edit `audio_map.js`.
- Loaded-file changes require a coordinated `CACHE_NAME` and query-string bump in both
  `index.html` and `sw.js`, plus matching exam-integrity version pins where applicable.

## 5. File ownership and safe parallelism

| Lane | May edit | Must not edit concurrently |
|---|---|---|
| Eligibility infrastructure E0 | eligibility loader/shards, eligibility audit, shell wiring | no classification worker starts before E0 merges |
| Eligibility batches E1A to E1D | exactly one assigned shard file | `app.js`, shared audit logic, another shard |
| Lesson automation L1 | new smoke/audit scripts, CI | `app.js` unless a failing test proves a product bug and the integrator re-scopes it |
| Sentence feedback L2 | Sentence checking/feedback region in `app.js`, focused CSS/tests | no other `app.js` packet in parallel |
| Audio closure L3 | audio discovery/generation tooling and generated audio assets | lesson/exam logic |
| Sentence engine X1 | new blueprint/engine/audit files | `app.js` |
| Sentence runner X2 | Exam/Sentence runner region in `app.js`, styles, integrity bindings | no other `app.js` packet in parallel |
| Acceptance Q1 | browser tests and focused fixes authorised by failing evidence | only after L2 and X2 merge |
| Release closure Q2 | CI strictness, status/docs, release evidence | last packet only |

Eligibility batch workers must never edit the same file. The point of E0 is to turn the current
single-file collision magnet into deterministic shards.

## 6. Required merge order

```text
D0 documentation consolidation (this PR)
  |
  +--> C1 baseline census and core gate
  |
  +--> E0 eligibility sharding
  |      +--> E1A  s0001-s1050  --+
  |      +--> E1B  s1051-s2100  --+--> E2 adjudication + strict eligibility
  |      +--> E1C  s2101-s3150  --+
  |      +--> E1D  s3151-s4177  --+
  |                                      |
  |                                      +--> X1 sentence exam engine
  |                                               |
  |                                               +--> X2 runner + provenance + retention
  |
  +--> L1 lesson reachability/browser gate
  +--> L2 Sentence feedback finalisation
  +--> L3 authored-item audio closure
                                                  |
                                                  +--> Q1 full core acceptance
                                                          |
                                                          +--> Q2 release-candidate closure
```

E1A to E1D may run in parallel. L1 and L3 may run in parallel with eligibility work. L2 must own
`app.js` exclusively and merge before X2 starts.

## 7. Status board

The integrator updates this table after merge. Parallel workers do not edit it.

| ID | Packet | State | Depends on | Primary lane |
|---|---|---|---|---|
| D0 | Documentation consolidation and single roadmap | COMPLETE (this PR) | none | high |
| C1 | Re-derived baseline census and one-command core gate | COMPLETE (#351, #352) | D0 | high |
| E0 | Shard Sentence eligibility for conflict-free parallel review | READY | C1 | high |
| E1A | Review Sentence rows s0001-s1050 | BLOCKED | E0 | author + reviewer |
| E1B | Review Sentence rows s1051-s2100 | BLOCKED | E0 | author + reviewer |
| E1C | Review Sentence rows s2101-s3150 | BLOCKED | E0 | author + reviewer |
| E1D | Review Sentence rows s3151-s4177 | BLOCKED | E0 | author + reviewer |
| E2 | Independent adjudication, census, freeze, strict eligibility gate | BLOCKED | E1A-D | high |
| L1 | Automated lesson reachability, resume, migration, and mobile smoke | READY | C1 | high |
| L2 | Final Sentence positional and near-miss feedback | READY after L1 | L1 | high |
| L3 | Authored-item audio discovery and missing audio closure | READY | C1 | mechanical + review |
| X1 | Sentence exam blueprints, pure engine, grader, and seed audit | BLOCKED | E2 | high |
| X2 | Sentence exam UI, provenance, results, and retention | BLOCKED | X1 + L2 | high |
| Q1 | Full core learner-journey acceptance and defect closure | BLOCKED | L1-L3 + X2 | integrator |
| Q2 | Strict CI, final docs/status, release-candidate evidence | BLOCKED | Q1 | integrator |

**C1 delivered (merged to `main`):** `scripts/audit-core-release.mjs` (the one-command
core gate: full/quick modes, per-file `node --check`, `--write-status` / `--check-status`),
the generated `docs/CORE_APP_STATUS.md`, its regression tests
(`scripts/test-core-release-syntax-gate.mjs`, `scripts/test-sentence-exam-readiness.mjs`),
and an additive `core-gate` CI job. The next READY packets are **E0**, **L1**, and **L3**.

## 8. Agent packets

Each packet below is deliberately paste-ready. Give an agent the quoted command and no extra
planning task.

### D0: Documentation consolidation

**Command:**

> Execute packet D0 from `docs/CORE_APP_COMPLETION_ROADMAP.md`. Make this roadmap the only active
> queue, correct the root documentation to current repository reality, and mark old handovers as
> historical rather than active instructions. Documentation only. Open a draft PR and stop.

**Files:** this roadmap, `README.md`, `HANDOVER.md`, `AI_INSTRUCTIONS.md`, `AGENTS.md`, `CLAUDE.md`,
`docs/EXAM_TAB_HANDOVER.md`, and concise supersession banners on named top-level one-shot handovers.

**Done when:** a new agent reading any root entry document reaches this roadmap within one click
and is not told to continue a closed Sentences or Words expansion queue.

### C1: Re-derived baseline and one-command core gate

**Command:**

> Execute packet C1 from `docs/CORE_APP_COMPLETION_ROADMAP.md`. Re-derive the live curriculum,
> examination, audio, eligibility, and shell counts from `main`; add one deterministic core gate
> that runs the complete required audit set without weakening any existing audit; write a generated
> status report; do not change product behaviour. Open a draft PR and stop.

**Required output:**

- `scripts/audit-core-release.mjs` or an equivalently portable Node orchestrator.
- `docs/CORE_APP_STATUS.md`, generated from live files, containing counts and open gates.
- The gate runs syntax checks, exam integrity, Hangul exam, word competency map, word exams,
  Form Checks, Words data, Sentences data, Sentence eligibility, Alphabet audio, Hangul recognition,
  premium handwriting, app shell, and mobile package validation where the environment permits it.
- Expensive audits may expose `--quick` and `--full`, but CI/release uses full.

**Acceptance:** report generation is deterministic; command exits non-zero on any child failure;
no hand-entered counts; no product/cache change.

### E0: Eligibility sharding

**Command:**

> Execute packet E0 from `docs/CORE_APP_COMPLETION_ROADMAP.md`. Refactor Sentence examination
> eligibility into four deterministic, non-overlapping browser-loadable shards so four agents can
> classify rows without merge conflicts. Preserve the existing 20 reviewed rows exactly, keep one
> public aggregate contract, update the audit and shell wiring, add duplicate/missing/range guards,
> and do not classify new rows. Open a draft PR and stop.

**Required shape:**

- Four shard files with fixed ranges:
  - A: `s0001` to `s1050`
  - B: `s1051` to `s2100`
  - C: `s2101` to `s3150`
  - D: `s3151` to `s4177`
- `sentence_exam_eligibility.js` remains the single aggregate public API, or becomes a tiny merger
  that publishes the same `window.HANAPATH_SENTENCE_EXAM_ELIGIBILITY` contract.
- The audit fails on duplicate IDs, out-of-range IDs, overlapping shards, malformed rows, and a
  reviewed ID missing from the live sentence bank.
- Existing 20 entries remain byte-equivalent at field level.

### E1A to E1D: Eligibility classification

**Command template:**

> Execute packet E1X from `docs/CORE_APP_COMPLETION_ROADMAP.md` for your assigned row range. Edit
> only your shard. Review every row against `docs/SENTENCE_ELIGIBILITY_AUTHORING.md` and
> `docs/SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md`. Produce canonical, finite, or excluded metadata with
> no generated paraphrase acceptance. Run the range audit and all strict unaffected data audits.
> Open a draft PR and stop. Do not edit shared code, other shards, or this roadmap.

**Per-row rules:**

- Inspect the live Korean, English, tokens, register, speech level, tags, lesson route, and
  `acceptAlso` values.
- Write a contextual English exam prompt that forces the intended tense, register, lexical choice,
  discourse role, and communicative act.
- `canonical`: exactly one accepted target.
- `finite`: canonical plus at most four explicitly reviewed alternatives.
- `excluded`: explicit reason codes when the prompt cannot make exact typed grading fair.
- No automatic particle swapping, particle deletion/insertion, word-order permutation, synonym
  expansion, register conversion, spacing deletion, fuzzy match, or LLM-at-runtime grading.
- Every supporting lesson route and minimum section must resolve from live curriculum data.
- Never mark a row approved merely to improve pool counts.

**Review evidence:** each PR includes counts by class, exclusion reason, section, band, register,
and primary competency, plus a sample of at least 25 difficult decisions.

### E2: Independent adjudication and strict freeze

**Command:**

> Execute packet E2 from `docs/CORE_APP_COMPLETION_ROADMAP.md`. Independently review the merged
> four-shard eligibility corpus, adjudicate high-risk and inconsistent decisions, run the full
> feasibility census from the Sentence Mastery specification, freeze a revision and lock file, and
> remove `--allow-incomplete` from CI. Do not build the exam runner. Open a draft PR and stop.

**Mandatory adjudication sets:**

- All `finite` rows.
- All rows with topic/subject, particle omission, multiple ordinary word orders, formal/honorific,
  future, negation, imperatives/proposals, counters, or more than one clause.
- Duplicate or near-duplicate English prompts and Korean targets.
- Every eligibility/exclusion boundary affecting a required paper allocation or freshness floor.
- Random sample of at least 10% from each shard’s canonical and excluded classes.

**Acceptance:**

- 4,177 of 4,177 rows have a valid reviewed record.
- Strict audit passes without `--allow-incomplete`.
- Required stage/final/retention pools satisfy the exact five-attempt freshness and allocation
  formulae in the specification, or the packet stops with an owner-visible blocker.
- No future-tense content is authored unless the audited trigger in the locked decision is met.
- A lock records row IDs, classes, accepted targets, prompt hashes, blueprint major compatibility,
  and the eligibility revision.

### L1: Lesson reachability and migration browser gate

**Command:**

> Execute packet L1 from `docs/CORE_APP_COMPLETION_ROADMAP.md`. Add a deterministic browser smoke
> suite for the real lesson routes and retained saves. Cover cold start, unlocks, resume, completion,
> reload, backup import/export, mobile width, and console errors across Alphabet, Words, Sentences,
> Drill Lab, Form Checks, writing, listening, and Progress. Fix only defects directly proven by the
> suite. Open a draft PR and stop.

**Minimum journeys:**

1. Fresh onboarding to first Alphabet lesson and return.
2. Alphabet stage completion, writing practice, Drill Lab, and Hangul exam entry.
3. Words lesson study and production, review/SRS write, resume after reload, production bridge.
4. Sentence content lesson shadow and production phases, checkpoint crown, free practice, Form
   Check route back to the exact supporting lesson.
5. Progress export, destructive state change, import, and exact restoration of progress plus exam
   integrity collections.
6. Legacy fixture migration with no reset or lost completion.
7. 375 px and tablet viewport checks with zero horizontal overflow and visible primary actions.

The suite must fail on `pageerror`, unhandled rejection, broken route, blank detail screen, or a
missing required control.

### L2: Final Sentence feedback

**Command:**

> Execute packet L2 from `docs/CORE_APP_COMPLETION_ROADMAP.md`. Replace the remaining coarse
> Sentence Translate & Type diff with deterministic positional alignment and near-miss feedback.
> Preserve the current correctness contract and helper semantics. Add focused audit fixtures and
> browser acceptance. Open a draft PR and stop.

**Required behaviour:**

- Distinguish missing, extra, substituted, and moved tokens.
- Identify a near-miss within a Korean token without accepting it as correct.
- Handle repeated tokens deterministically.
- Keep exact grading rules unchanged for lessons and preserve stricter spacing rules for formal
  Sentence exams.
- Do not use an online model, fuzzy acceptance, or hidden correction.
- Feedback remains understandable on a 375 px screen and accessible to screen readers.

### L3: Authored-item audio closure

**Command:**

> Execute packet L3 from `docs/CORE_APP_COMPLETION_ROADMAP.md`. Extend audio discovery so all
> loaded authored lesson items, Form Check answers, and examination audio strings are audited. Add
> the currently missing past/negation authored-item audio and regenerate assets through the official
> pipeline. Never hand-edit `audio_map.js`. Open a draft PR and stop.

**Acceptance:**

- The audit enumerates `authoredItems` and any other loaded finite answer lists that can be spoken.
- Every required Korean audio key maps to a non-empty file, except explicitly documented silence.
- Generation is deterministic under the existing pipeline and generated files are included.
- Browser smoke confirms authored past/negation audio uses the mapped asset rather than TTS fallback.

### X1: Sentence exam blueprints and pure engine

**Command:**

> Execute packet X1 from `docs/CORE_APP_COMPLETION_ROADMAP.md`. Implement the Sentence Mastery
> examination blueprints and one pure deterministic seeded generator, grader, band evaluator, and
> retention selector from the locked specification and strict eligibility corpus. Do not add UI or
> touch `app.js`. Add the full seed audit. Open a draft PR and stop.

**Required files:** declarative browser-global blueprint data, pure engine, generated coverage
report, and `scripts/audit-sentence-exams.mjs`.

**Locked readiness contract (keep in sync with `scripts/audit-core-release.mjs`).** So the
generated `docs/CORE_APP_STATUS.md` readiness table flips on its own as X1/X2 land, ship exactly:

- `sentence_exam_blueprints.js` publishing the browser global `HANAPATH_SENTENCE_EXAM_BLUEPRINTS`.
- `sentence_exam_engine.js` publishing `HANAPATH_SENTENCE_EXAM_META`, with a numeric `engineVersion`
  (X1). X2 later sets `runnerVersion` (non-null) and `retention: true` on the same meta object.
- `scripts/audit-sentence-exams.mjs` (the seed audit; also the roadmap §9 entry).

E2 readiness is derived separately from the eligibility corpus (approved rows === bank rows); no
artifact is needed for it.

**Non-negotiable contracts:**

- Four cumulative stage exams after Sentences sections 2, 4, 6, and 8.
- One cumulative final and one delayed retention confirmation.
- Paper lengths, time limits, strand allocations, cut scores, mastery, retention, freshness, and
  graduated subscore evidence exactly match the locked specification.
- Typed production uses only canonical/finite reviewed targets and the formal Sentence exam
  normalizer. No lesson helper or spacing-tolerant practice grader leaks into the exam.
- Generator and browser will share the same engine byte-for-byte.
- Attempts are deterministic from seed and non-personalised.
- Audit covers required seed counts, exposure, duplicates, option uniqueness, target freshness,
  pool floors, answer leakage, route resolution, and retention avoidance.

### X2: Sentence exam runner, provenance, results, and retention

**Command:**

> Execute packet X2 from `docs/CORE_APP_COMPLETION_ROADMAP.md`. Add the Sentence examination suite
> to the Exam tab using the X1 engine. Implement intro, timed attempt, navigation, review, submission,
> result, remediation, qualification, delayed retention, immutable provenance, Practice handling,
> migration, and backup validation. Reuse existing exam components rather than creating a parallel
> design system. Open a draft PR and stop.

**Required behaviour:**

- No hints, helper ladder, answer feedback, or correctness signal before submission.
- Typed and selected interactions follow the Sentence specification.
- Leaving an active attempt requires confirmation and discards only the in-memory attempt.
- Result records include actual seed, engine version, eligibility revision, blueprint version,
  scope, timing, score, bands, status, and qualifier/retention relation.
- Set `runnerVersion` (non-null) and, once the delayed retention flow ships, `retention: true` on
  `HANAPATH_SENTENCE_EXAM_META` (the readiness contract in X1) so the status report's X2 rows flip.
- Active taint or testing hooks force `practice`; Practice cannot award progression or retention.
- Retention opens and expires on the locked schedule, avoids the qualifying attempt, and preserves
  sticky mastery after a valid pair.
- Legacy state remains visible and is never relabelled as a fully proven HanaPath result.
- Full post-submission review and exact lesson remediation routes are available.

### Q1: Full core acceptance and defect closure

**Command:**

> Execute packet Q1 from `docs/CORE_APP_COMPLETION_ROADMAP.md` as the designated integrator. Run the
> complete core gate and real browser journeys on fresh, progressed, legacy, tainted, and imported
> profiles. Test phone and tablet layouts, keyboard composition, offline relaunch, audio lifecycle,
> save/resume, all three examination families, and retention fixtures. Fix only release-blocking
> defects found by evidence. Open one draft PR containing the focused fixes and evidence report.

**Release-blocking severities:**

- P0: data loss, false pass/mastery, invalid payment exposure, broken migration, blank app, security
  or privacy misrepresentation.
- P1: unreachable core lesson/exam, wrong grading, missing required audio, impossible completion,
  broken retention, clipped primary action, offline core failure.
- P2 cosmetic issues do not block unless they obscure meaning or controls.

No new feature or content expansion is allowed in Q1.

### Q2: Release-candidate closure

**Command:**

> Execute packet Q2 from `docs/CORE_APP_COMPLETION_ROADMAP.md`. Make every core CI gate strict,
> update the generated status and root documentation to the exact merged state, mark all packets
> complete with PR links and verified counts, produce a release-candidate evidence report, and tag
> no release unless the owner explicitly requests a tag. Documentation and gate closure only unless
> a final gate reveals a blocker. Open a draft PR and stop.

**Acceptance:**

- No `--allow-incomplete` in core CI.
- All full audits and browser acceptance pass on the same commit.
- No open P0/P1 core issue or untriaged browser failure.
- `README.md`, `HANDOVER.md`, `AI_INSTRUCTIONS.md`, `AGENTS.md`, `CLAUDE.md`, and
  `docs/EXAM_TAB_HANDOVER.md` agree.
- `docs/CORE_APP_STATUS.md` is generated and names only intentional post-core work.
- The final evidence report records commands, versions, counts, browser profiles, viewport matrix,
  migrations, known P2 issues, and the exact commit.

## 9. Universal verification matrix

Packets run the focused checks plus every unaffected gate required by their touched files. Q1 and
Q2 run the full matrix.

The single command `node scripts/audit-core-release.mjs --full` runs the wired subset of
this matrix as one deterministic gate (and is the `core-gate` CI job). The individual
commands below remain the reference list.

```bash
# `node --check` only checks its FIRST filename argument, so check each file in
# its own invocation (never `node --check a.js b.js`).
for f in app.js sw.js exam_integrity.js \
         sentence_exam_eligibility.js hangul_mastery_exam.js \
         word_exam_blueprints.js word_exam_engine.js form_check_blueprints.js; do
  node --check "$f"
done

node scripts/audit-exam-integrity.mjs
node scripts/audit-hangul-mastery-exam.mjs
node scripts/build-word-exam-competency-map.mjs --check
node scripts/audit-word-exams.mjs
node scripts/audit-sentence-exams.mjs                # after X1
node scripts/audit-words-data.mjs --strict
node scripts/test-thin-lesson-heuristic.mjs
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-sentences-foundation.mjs
node scripts/audit-form-checks.mjs
node scripts/audit-sentence-eligibility.mjs          # strict after E2
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-audio-coverage.mjs                 # exact existing CLI options
node scripts/audit-learning-questions.mjs             # excluded from core-gate (throws on main; L1-owned)
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-app-shell.mjs
node scripts/audit-mobile-package.mjs
node scripts/audit-core-release.mjs --full            # C1 core gate (live); --quick for iteration
```

Also required when applicable:

- `git diff --check`.
- Deterministic generator `--check` modes.
- Static server plus canonical browser smoke suite.
- Android Gradle tests/build when native or packaged assets change.
- Before/after localStorage fixture comparison for migrations.

Do not silently omit a command because it is slow. State why a command could not run and rely on
an authoritative CI run only when the local environment genuinely lacks the required platform.

## 10. Review checklist for the integrator

Before merging any packet:

1. Confirm the branch started from the declared base and contains only the packet.
2. Re-read the governing specification, not only the PR summary.
3. Verify exact changed files and search for unrelated formatting churn.
4. Re-run the focused audit and at least one independent spot-check.
5. For data batches, compare row IDs and field counts with the base and review difficult samples.
6. For generated files, rerun the generator or `--check` oracle.
7. For UI, reproduce the browser evidence at phone width and inspect console errors.
8. For cache changes, verify `index.html`, `sw.js`, `CACHE_NAME`, loaded query strings, and integrity
   version pins all agree.
9. After merge, fetch fresh `main`, rerun the packet’s critical audit, and compare merge output with
   the reviewed head.
10. Update the roadmap status table in a small integrator-owned commit or PR.

## 11. Post-core queue, not blockers for lesson/exam finalisation

After Q2, work may resume in this order:

1. Run the real Android phone/tablet matrix in `docs/MOBILE_DEVICE_TEST_CHECKLIST.md`.
2. Decide whether Handwriting Coach launches `free_all` or as a configured paid product.
3. Confirm Play owner decisions, package ID, public support details, privacy URL, account type, and
   audience/countries.
4. Create the upload keystore and protected GitHub environment, then exercise the signed AAB path.
5. Upload to Play internal testing and complete any required closed-test programme.
6. Make the free Alphabet ML Kit authority decision only after device comparison evidence.
7. Build iOS/StoreKit parity on macOS/Xcode if desired.
8. Resume optional Words or Sentence expansion only with a new owner-approved scope.
9. Perform time-gated compatibility cleanup only after retained windows and fixtures prove it safe.

## 12. The one-line instruction

After D0 merges, the owner may instruct any agent:

> **Do this: read `docs/CORE_APP_COMPLETION_ROADMAP.md`, take the next READY packet you are qualified
> for, execute exactly that packet, open a draft PR with the required evidence, and stop. Do not
> create a new plan or merge your own work.**

That sentence is the entire dispatch protocol. The roadmap supplies the scope, files, gates, and
stop condition.