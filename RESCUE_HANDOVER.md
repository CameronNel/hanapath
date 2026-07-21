# HanaPath PR #332 rescue handover

## Mission

You are the sole senior rescue engineer for **CameronNel/hanapath**.

Work directly on the existing branch **`task/gemini-final-megabatch`**, which backs draft PR **#332**. Turn that WIP branch into one coherent, fully verified implementation. Do not reset the branch, discard existing work, create a replacement megabatch PR, or resurrect the archived multi-agent fleet.

The owner has deliberately retired the token-heavy fleet. **Do not read, search, index, summarize, or follow anything under `.agent-ignore/` unless this handover names one exact archived file as evidence.** Nothing under that directory is active instruction or current project state.

Your outcome is not another plan. Your outcome is working code, green audits, a green Android build, an honest PR body, and repository state that another cold reviewer can understand.

Follow root `AGENTS.md`, `AI_INSTRUCTIONS.md`, and `CLAUDE.md`. Where this handover is more specific, this handover controls the scope and ordering. Do not merge until every required gate is green; after that, follow the model-family landing policy in `AGENTS.md`.

---

## Operating constraints

1. Preserve the canonical web app as a vanilla static PWA. No root framework, bundler, build step, or package conversion.
2. Preserve browser/PWA support while keeping native tooling isolated under `mobile/`.
3. Work on `task/gemini-final-megabatch`; do not branch-sprawl.
4. Never force-push, rewrite history, or reset away the existing checkpoint.
5. Use logical commits so a reviewer can isolate:
   - baseline/diagnostic fixes;
   - Words C1 completion;
   - Workstream 0 provenance;
   - sentence eligibility;
   - Form Checks;
   - mobile/CI cleanup.
6. Do not fabricate Korean content, accepted answers, pool sizes, audit results, or test transcripts.
7. Do not introduce runtime LLM grading, fuzzy matching, automatic particle swapping, automatic word-order permutations, or generated synonym acceptance.
8. Any new Korean string must have valid audio under the repository audio rules. Prefer existing audio-backed strings. If new audio is unavoidable, run the governed offline pipeline rather than hand-editing `audio_map.js`.
9. Keep changes additive and backward-compatible. Never uncrown learners, re-lock already unlocked sections, or erase historical exam records.
10. Do not revive `ops/`, worker loops, heartbeat files, queue polling, or agent assignment machinery. The archived fleet is cold storage only.

---

## Read these active sources before editing

Read only the active project sources needed for this rescue:

- `AGENTS.md`
- `AI_INSTRUCTIONS.md`
- `CLAUDE.md`
- `docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md`
- `docs/INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md`
- `docs/CODEX_WORKSTREAM_0_COMPLETION_PROMPT.md`
- `docs/SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md`
- `docs/SENTENCE_ELIGIBILITY_AUTHORING.md`
- `docs/FORM_CHECKS_PLAN_DRAFT.md`
- `docs/WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md`
- `docs/CORE_WORD_EXAM_SPECS.md`
- `docs/CORE_WORD_EXAM_COMPETENCY_MAP.md`
- `docs/EXAM_TAB_HANDOVER.md`
- `docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md`
- `.agents/AGENTS.md` only when audio work is actually required
- `.github/workflows/ci.yml`
- `.github/workflows/android-build.yml`

Inspect PRs **#329, #330, #331, and #332** and compare their branch tips against `main`. The useful work from #329–#331 has already been incorporated into #332, but the older PRs remain open and must not become competing sources of truth.

Inspect GitHub Actions runs **29871433736** and **29868123923** if available. Both Android runs failed in the `Learning-data audits` step, before packaging or APK construction. Do not guess which command failed. Reproduce the workflow locally and identify the exact first failure.

---

## Known starting state

Treat these as findings to verify, not excuses to skip inspection:

- PR #332 is a mergeable draft WIP based on `main`.
- General CI passed, but the current general CI is shallow and is not equivalent to the repository merge gate.
- Android CI failed before `npm ci`, payload generation, Capacitor sync, Gradle, manifest verification, or artifact upload.
- PR #332 incorporates useful work from:
  - TASK-001 / PR #329: Hangul result provenance and taint binding;
  - TASK-004 / PR #330: sentence eligibility schema, audit, and authoring guide;
  - TASK-010 / PR #331: a partial Words C1 lesson;
  - additional Android packaging and resume-tool changes.
- The current TASK-010 patch appears structurally incomplete: it adds lesson metadata and generic checkpoints but does not visibly deliver the governing six-part lesson sequence, the required 16 scored practice items, typed past production, the four negation families, reviewed finite answers, or the old-save production milestone.
- Workstream 0 Boxes 0D and 0E are not complete.
- Sentence eligibility tooling exists, but the full 4,177-row classification/adjudication programme is not complete.
- Form Checks B1 was blocked by real pool insufficiency, especially the ㅎ-irregular family.
- The old fleet state and individual task PRs duplicate the consolidated branch and create stale operational context.

---

# Execution order

## Phase 0: establish a forensic baseline

Before editing:

```bash
git status --short
git branch --show-current
git log --oneline --decorate -12
git fetch origin
git diff --stat origin/main...HEAD
git diff --name-status origin/main...HEAD
gh pr view 332 --json number,title,state,isDraft,mergeable,headRefName,baseRefName,commits,files,statusCheckRollup
```

Confirm you are on `task/gemini-final-megabatch`.

Run and save the exact baseline outputs:

```bash
node --check app.js sw.js exam_integrity.js sentence_exam_eligibility.js words_lesson_plan.js
node scripts/audit-exam-integrity.mjs
node scripts/audit-hangul-mastery-exam.mjs
node scripts/build-word-exam-competency-map.mjs --check
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-sentence-eligibility.mjs --allow-incomplete
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-app-shell.mjs
```

Then reproduce the Android workflow's learning-data step exactly:

```bash
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
```

Record the first failing command and its root cause in the PR body. Fix causes, not symptoms. Do not weaken an audit to make it green unless the governing specification itself requires a corrected audit contract, and then add a regression fixture proving the new behavior.

---

## Phase 1: finish Words C1 properly

Implement Box C1 of `docs/WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md` completely. The current metadata-only lesson is not sufficient.

### Required learner contract

The additive lesson `s3-grammar-u2-l3` must genuinely implement:

1. concept card: contextual time cues force tense;
2. guided polite-past production;
3. short negation with `안` and `못`;
4. long negation with `-지 않아요` and `-지 못해요`;
5. mixed contextual retrieval;
6. a production-heavy checkpoint.

Deliver the required **16 scored practice items** with the plan's allocation:

- 4 polite-past typed forms;
- 2 polite-past context sentences;
- 2 `안` production items;
- 2 `못` production items;
- 2 `-지 않아요` production items;
- 2 `-지 못해요` production items;
- 2 mixed discrimination/context items.

### Generation and grading rules

- Generate eligible past forms through `HANAPATH_INFLECT.conjugate(..., "past")`.
- Use only predicates supported by the audited inflection engine.
- Use authored, reviewed frames for negation. The engine has no generic negation form and must not pretend otherwise.
- `못` must use semantically compatible action predicates.
- Every accepted response must be finite and explicit.
- Do not automatically equate short and long negation.
- Do not automatically exchange `안` and `못`.
- Do not automatically accept particle insertion/removal, word-order permutations, register changes, or synonyms.
- Preserve `scoredProduction: false` in Box C1 and do not prematurely modify the formal exam blueprints reserved for later boxes.
- Implement the old-save production milestone exactly: never uncrown, never re-lock, never delete old completion, and expose the production bridge without falsifying prior completion.
- Ensure lesson ordering, checkpoint behavior, competency mapping, and cache versions are coherent.
- Audit all new Korean strings against `audio_map.js`; regenerate governed assets only when required.

Add targeted audit coverage proving the lesson contains the required allocation and that each generated target is taught, supported, unique where required, and audio-safe.

---

## Phase 2: review-harden Hangul provenance, Box 0C

Do not merely trust the incorporated TASK-001 code. Review it against the governing integrity specification and fix any mismatch.

Acceptance requirements:

- Every Hangul Mastery submission writes one complete immutable result record to `state.examResults.byAttemptId`.
- Use a collision-resistant attempt ID.
- Record the real exam ID, blueprint version, content-bank revision, scope, timestamps, duration, item count, score summary, floor summary, status, override flags, and override event IDs.
- Use explicit `null` for non-applicable provenance fields; never invent versions or seeds.
- Determine taint at attempt generation and again at submission.
- Union start-time and submission-time override flags and taint event IDs.
- An override active at generation must remain attached even if the query disappears before submission.
- A durable taint event created during the attempt must affect submission.
- Practice attempts remain scoreable and reviewable but must not:
  - set mastery;
  - raise the HanaPath `bestCorrect`;
  - create misleading HanaPath completion timestamps;
  - satisfy any formal achievement claim.
- Untainted attempts must preserve existing behavior.
- Saving and migration must pass integrity validation.
- Keep regression fixtures for clean, query-tainted, and durable-event-tainted attempts.
- Run the browser/VM smoke trace for both clean and practice results.

If the current fallback path can classify a result as HanaPath when the integrity API is missing or malformed, fail safely rather than awarding an unverified HanaPath result.

---

## Phase 3: implement Workstream 0 Box 0D

Bind the full Core Word Examination Suite, including qualification and retention, to immutable provenance and taint.

Required behavior:

- Every full and confirmation/retention attempt writes a complete immutable record.
- Store real generation seed, blueprint version, engine version, content-bank revision, eligibility revision, and exact scope.
- Re-check taint at generation and submission.
- Practice attempts must never:
  - set passed, distinguished, best percentage, or mastery timestamps;
  - open, satisfy, or advance retention;
  - store qualifying target IDs as formal qualification;
  - create HanaPath achievement relations.
- A HanaPath retention result must link to a valid HanaPath qualifier with:
  - the same exam ID;
  - compatible blueprint major;
  - intact provenance;
  - an explicit `qualifyingAttemptId`;
  - a matching `type: "retention"` relation.
- A retention attempt paired with a tainted, legacy-incomplete, missing, malformed, or incompatible qualifier becomes Practice.
- Preserve existing learner history through additive migration.
- Keep all word-exam seed audits green.
- Add fixtures for:
  - clean qualification;
  - query-tainted qualification;
  - durable-tainted qualification;
  - clean retention pairing;
  - practice retention caused by tainted qualifier;
  - broken/missing/incompatible linkage.

Do not use the private browser query to create supposedly clean acceptance fixtures. Inject clean state programmatically where the governing test trap requires it.

---

## Phase 4: implement Workstream 0 Box 0E

Complete result labeling, honest disclosure, result details, export/import preservation, and backup validation.

### Result surfaces

Where a stored record backs the display, show exactly the appropriate class:

- `HanaPath result`
- `Practice result`
- `Legacy result · provenance incomplete`

Expose provenance details without marketing inflation:

- blueprint version;
- engine version where present;
- bank/eligibility revision;
- generation seed where present;
- status;
- relevant qualifier/retention linkage.

Put the full device-local disclosure one interaction away from every result card and in exam help. Enforce the specification's Practice copy.

Audit-prohibit unsupported credential language, including claims equivalent to:

- official;
- verified credential;
- certified;
- tamper-proof;
- TOPIK equivalence;
- CEFR equivalence.

### Backup validation

Before imported state replaces live state, reject:

- malformed records;
- duplicate attempt IDs;
- key/record attempt-ID mismatch;
- impossible statuses;
- broken qualifier or retention links;
- invalid relation types;
- duplicate or contradictory relations;
- malformed taint references;
- unsupported schema shapes that cannot be migrated safely.

Exports must preserve all integrity collections and relations. Imports must validate into a temporary candidate before mutating live state. A failed import must leave the current state untouched.

Complete the full integrity audit contract and browser-acceptance rows that are applicable after 0E.

---

## Phase 5: finish sentence examination eligibility data

The schema/audit/authoring guide from TASK-004 may be retained only if they match the specification after review.

### Tooling requirements

- `sentence_exam_eligibility.js` exposes the exact schema required by the spec.
- The strict audit fails loudly on:
  - unreviewed rows;
  - malformed classes;
  - invalid canonical keys;
  - unreviewed or generated variants;
  - duplicate canonical targets;
  - unresolved lesson routes;
  - invalid modes;
  - impossible section order;
  - insufficient competency pools;
  - `future-geoyeyo` falling below its locked safety floor.
- `--allow-incomplete` reports progress without disguising incomplete work as shippable.
- Mobile payload and service-worker wiring include the new file with coherent cache versions.

### Classification requirements

Classify all rows `s0001`–`s4177` in bounded, checkpointed batches. This is one rescue branch, but use separate logical commits for the four ranges so review remains possible.

For each row:

- derive all fields from the real source row and lesson plan;
- assign `canonical`, `finite`, or `excluded`;
- author a constrained English exam prompt for eligible typed rows;
- force tense through context/time, not by naming a grammar rule;
- force register through addressee/social setting;
- force discourse role where particles or information structure matter;
- use the canonical Korean target plus only source-backed, human-reviewed finite alternatives;
- never invent `acceptAlso`;
- exclude conservatively where multiple ordinary Korean answers remain valid;
- map real supporting lesson IDs;
- compute truthful minimum section order;
- preserve mode eligibility and competency tags.

Use a two-pass process:

1. classification pass, marked `proposed`;
2. independent review pass over each batch, resolving collisions and ambiguity before marking `approved`.

Do not bulk-mark rows approved without the second pass. Do not use fuzzy or runtime model grading.

After each batch:

```bash
node --check sentence_exam_eligibility.js
node scripts/audit-sentence-eligibility.mjs --allow-incomplete
```

At completion, strict mode must pass without `--allow-incomplete`, and the per-tag census must satisfy the locked floors.

If a locked pool is mathematically insufficient after conservative classification, report the exact rows and counts and amend only the affected exam allocation or eligibility decision in the smallest honest way. Never fabricate eligible targets.

---

## Phase 6: resolve Form Checks B1 honestly

Implement the declarative inventory and audit from `docs/FORM_CHECKS_PLAN_DRAFT.md`, with these owner-authorized resolutions to the previously parked design questions:

1. **Canonical target uniqueness for inflection checks is `(wordId, formName)`.**
2. **The ㅎ-irregular check uses the actual eligible unique pool.** If the live curriculum still supports only five unique targets, set its explicit item count to five and document why. Do not duplicate targets and do not add unrelated curriculum words merely to hit ten.
3. **At B1, enforce a milestone-level taught-before-tested proxy.** B2 must enforce per-generated-target gating.
4. **Connectives may unlock only after the latest lesson needed by their eligible pool.** Prefer a later truthful unlock over testing material before teaching. Remediation routes must still point to the exact lesson that teaches each target.
5. **Polite-present inventory may use only targets genuinely taught by its unlock.** If the early pool is insufficient, move the unlock later or use spec-permitted authored sentence frames already taught. Never draw future material or silently repeat targets.
6. Keep all route IDs resolvable against the actual lesson plans.
7. Keep Form Checks diagnostic and non-certifying. Do not alter exam mastery.

Deliver:

- `form_check_blueprints.js`;
- all 17 declarative checks, except that an honestly reduced per-check item count is allowed where the unique live pool requires it;
- exact bilingual names, modes, unlocks, route policies, and pool definitions;
- `scripts/audit-form-checks.mjs` covering the B1 data-level contract;
- loaded asset/cache wiring;
- no runner or UI beyond B1 scope unless a small wiring change is strictly required by the governing plan.

The audit must print actual eligible-pool counts so future curriculum growth is visible.

---

## Phase 7: mobile packaging and Android build

After learning-data audits are green, validate every mobile-specific change rather than assuming the pipeline reaches it.

Required checks:

1. `sentence_exam_eligibility.js` is included in the allowlisted mobile payload and package audit.
2. `mobile/scripts/prepare-web.mjs` safely clears only marked generated output and works on Windows and Linux.
3. The generated web payload matches the canonical allowlist and contains no archived `.agent-ignore` material.
4. Capacitor sync succeeds.
5. Gradle lint, unit tests, and debug assembly succeed.
6. Merged-manifest permission verification passes.
7. The APK and package manifest artifacts are produced.

Run the workflow locally as closely as practical:

```bash
cd mobile
npm ci
npm run prepare:web
cd ..
node scripts/audit-mobile-package.mjs
cd mobile
npx cap sync android
cd android
chmod +x gradlew
./gradlew lint testDebugUnitTest assembleDebug --no-daemon
```

Then perform the merged-manifest permission check from `.github/workflows/android-build.yml`.

Do not declare Android fixed merely because the earlier learning-data step turns green. The workflow must reach and pass the actual APK build.

---

## Phase 8: strengthen CI to match the risk

The existing general CI is too shallow for a megabatch touching exams, learning data, mobile packaging, and state integrity.

Update CI so a pull request cannot appear green while bypassing the relevant merge gate. At minimum, ensure the appropriate workflows enforce:

```bash
node --check app.js sw.js exam_integrity.js
node scripts/audit-exam-integrity.mjs
node scripts/audit-hangul-mastery-exam.mjs
node scripts/build-word-exam-competency-map.mjs --check
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-sentence-eligibility.mjs
node scripts/audit-form-checks.mjs
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-app-shell.mjs
```

Use path filters only where they cannot create a false-green result. Keep Android packaging/build checks in the Android workflow.

---

## Phase 9: integration hygiene

Before finalizing:

- Diff `origin/main...HEAD` at file and row level.
- Verify no already-merged content was silently dropped.
- Resolve cache/version conflicts as one coherent final state.
- Remove obsolete resume launchers from active project surfaces. Archived copies remain untouched.
- Do not recreate root `ops/`.
- Update documentation and scorecards only with re-derived facts.
- Update PR #332's title and body from WIP language to an exact implementation report.
- Include:
  - root causes;
  - features delivered;
  - migration behavior;
  - audit counts;
  - browser smoke results;
  - Android build result;
  - CI result;
  - remaining limitations, if any.
- Once #332 contains and verifies all useful work from #329, #330, and #331, comment on those PRs that they are superseded by #332 and close them. Do not merge duplicate branches.
- At the very end, move this handover file to:
  `.agent-ignore/completed-handovers/RESCUE_HANDOVER.md`
  so future agents do not reread it automatically.

---

# Final verification gate

Every applicable command below must pass from a clean checkout of the final branch:

```bash
node --check app.js sw.js exam_integrity.js sentence_exam_eligibility.js form_check_blueprints.js words_lesson_plan.js
node scripts/audit-exam-integrity.mjs
node scripts/audit-hangul-mastery-exam.mjs
node scripts/build-word-exam-competency-map.mjs --check
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-sentence-eligibility.mjs
node scripts/audit-form-checks.mjs
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-app-shell.mjs
node scripts/audit-mobile-package.mjs
```

Also run:

- targeted clean/practice Hangul provenance smoke tests;
- clean/practice Word qualification and retention smoke tests;
- malformed backup import fixtures;
- browser smoke tests for result labels/disclosures and the new Words lesson;
- mobile payload generation;
- Capacitor sync;
- Gradle lint, tests, and debug APK assembly;
- GitHub Actions re-run until all required checks are green.

Do not suppress, skip, loosen, or rename a failing gate to make the branch appear complete.

---

# Completion standard

You are finished only when:

- PR #332 is coherent rather than a bundle of partial branches;
- the Android workflow builds an APK successfully;
- Words C1 is a real production lesson, not metadata;
- Workstream 0 Boxes 0C–0E satisfy the integrity specification;
- sentence eligibility strict mode passes over all 4,177 rows;
- Form Checks B1 is honest about live pool sizes and passes its audit;
- mobile packaging includes every required asset and excludes archived agent material;
- CI enforces the relevant merge gate;
- duplicate PRs are closed as superseded;
- the old fleet remains archived and inactive;
- all required checks are green;
- the PR body contains reproducible evidence.

At completion, print a compact report in this exact order:

1. final branch and commit;
2. PR #332 status;
3. root causes fixed;
4. substantive features delivered;
5. migration/backward-compatibility notes;
6. verification commands with pass/fail;
7. Android APK result and artifact location;
8. superseded PR cleanup;
9. any residual risk.

Do the work. Do not return another planning memo.
