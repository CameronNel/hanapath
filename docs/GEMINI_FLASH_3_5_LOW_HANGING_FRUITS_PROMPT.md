# Gemini Flash 3.5 Bulk Work Order — HanaPath Words

You are working in the HanaPath repository, a vanilla static Korean-learning PWA.
You are Gemini Flash 3.5: fast, implementation-oriented, and good at high-volume
recipe-driven work. Your job is to complete a large batch of safe, low-judgment
tasks without inventing product scope or making semantic guesses.

## Mission

Finish the remaining low-hanging Words-section work after the Words Curriculum v2
restructure. The live v2 path is already shipped and frozen. Do not redesign it.
Build the Phase 2 expansion plumbing and clean up stale v2 verification/documentation
artifacts so the next authoring batches can run safely.

## Repository facts you must verify first

Working directory: `C:\Users\Camer\OneDrive\Documents\Korean`

Read these files before editing:

1. `AI_INSTRUCTIONS.md`
2. `CLAUDE.md`
3. `HANDOVER.md`
4. `docs/WORDS_CURRICULUM_V2_PLAN.md`
5. `docs/VOCABULARY_TEACHING_SPEC.md`
6. `.agents/AGENTS.md`

The project is static and has no framework, bundler, build step, or `package.json`.
Data files are browser globals loaded before `app.js`.

The current live facts must be re-derived, not trusted from prose:

- `words_curated_core.js`: 2,028 curated rows.
- `words_lesson_plan.js`: the live v2 curriculum, currently 283 lessons across 8 sections.
- `TEST_UNLOCK_ALL_STAGES` must remain `false`.
- Existing v2 section/unit/lesson IDs and word membership are frozen.
- Existing Words and Alphabet behavior must not regress.

Start with:

```powershell
git status --short --branch
git log --oneline -8
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-app-shell.mjs
```

If the checkout is dirty, preserve unrelated user changes. Do not reset, checkout,
stash, or delete user work.

## Operating mode

## Luna handoff trigger

Gemini owns only the deterministic plumbing in this work order. The moment a
task requires a Korean semantic judgment, learner-facing copy decision, new
curriculum/content authoring, or owner approval, stop that item and hand it to
**Luna** with the file, row range, evidence, and the unresolved decision. Do not
guess, and do not pull Sentences work into this queue.

Work in small, independently reviewable batches. You may complete several tightly
specified low-judgment tasks in one working session, but keep each logical change
separable and easy to review. Do not make broad opportunistic refactors.

Use `apply_patch` for edits. Use `rg` for searches. Use Node scripts for deterministic
data processing. Do not use Python or shell redirection to write repository files.

When a requirement involves Korean meaning, polysemy, register, grammar, or example
authoring and the specification does not settle the answer, stop and record the item
as `needs-sense-review`; do not guess.

## Priority queue

Execute these in order. Complete as many as can be completed safely, but do not start
the next item if the previous item has unresolved audit failures.

### 1. Repair stale Curriculum v2 audit verification

`scripts/test_curriculum_v2_audit.mjs` currently expects the deleted
`words_lesson_plan_v2.js`, while the live curriculum is now in
`words_lesson_plan.js`.

Do the smallest safe repair:

- Inspect the test and the current audit `--plan` behavior.
- Make the test exercise the live v2 plan without reintroducing a duplicate plan file.
- Preserve any intended mutation/regression checks.
- Make the test fail clearly if the live plan is accidentally reverted to the old schema.
- Run the test and the strict audit afterward.

Do not weaken the audit or hard-code a false pass.

### 2. Add the Phase 2 expansion ledger

Create `docs/WORDS_EXPANSION_LEDGER.md` as specified in §5.4 of
`docs/WORDS_CURRICULUM_V2_PLAN.md`.

Use a precise, machine-checkable table structure with columns for:

- batch ID
- date
- source file/range and source hash
- disposition counts
- qualified lemmas
- curated words/senses added
- cumulative curated count
- draft or published elective pack
- audio run and cache confirmation
- independent review result
- notes/blockers

Include an initial baseline row for the current 2,028-row state, clearly marked as
the pre-expansion baseline rather than a completed expansion batch. Do not fabricate
source disposition counts. Use `TBD` or `not yet measured` where evidence does not
exist, and explain how the field will be derived.

### 3. Scaffold `scripts/words_expansion/`

Implement the P2-0 tooling required by §5.1 of the v2 plan. Keep it deterministic,
append-safe, and conservative.

Required files:

- `scripts/words_expansion/build_candidate_queue.mjs`
- `scripts/words_expansion/author_batch_template.md`
- `scripts/words_expansion/import_batch.mjs`
- `scripts/words_expansion/batch_qa_checklist.md`
- `scripts/words_expansion/candidate_decisions.jsonl`
- any narrowly scoped schema/adapter/helper files needed by the above

#### 3a. Candidate queue

`build_candidate_queue.mjs` must:

- accept explicit input paths and output paths via CLI flags;
- merge the 5k and 15k source CSVs deterministically;
- normalize surfaces without destroying the original surface;
- emit stable ordering by rank, then deterministic tie-breakers;
- identify likely duplicates against curated `korean`, `display`, and known inflected forms;
- flag particles, endings, romanization artifacts, conjugated forms, and ambiguous short forms;
- never silently drop a row solely because it resembles a curated surface;
- produce review flags and disposition candidates instead;
- print counts by disposition/flag;
- be safe to re-run byte-identically on unchanged inputs.

Do not claim that heuristics prove lemma identity. Ambiguous candidates must remain
reviewable.

#### 3b. Immutable decision history

`candidate_decisions.jsonl` is append-only history, not a regenerated queue.

Each record must include, when available:

- source file hash
- source row key
- original surface
- normalized surface
- canonical lemma
- rank/band
- status: `accepted`, `covered`, `merged`, `inflected`, `deferred`, `rejected`,
  or `needs-sense-review`
- parent curated ID when applicable
- human-readable reason
- date/batch identifier

Do not rewrite prior decisions during queue regeneration. Add a validation command or
mode that detects malformed records, duplicate decision keys, invalid statuses, and
source-hash mismatches.

#### 3c. Import adapter

`import_batch.mjs` must be conservative and schema-aware:

- accept machine-readable JSON/JSONL, never executable LLM-generated JavaScript;
- validate required curated-row fields before touching repository data;
- reject duplicate IDs and existing-ID mutations;
- preserve frozen v2 IDs, memberships, and core progression;
- support draft elective-pack placement only;
- avoid changing the finite S1–S8 core;
- provide a dry-run mode that reports every intended change;
- refuse to import rows with unresolved sense or annotation ambiguity;
- never generate or hand-edit `audio_map.js`;
- print the exact audio/cache follow-up required for new spoken fields.

If a full safe import cannot be implemented without making assumptions, implement a
validated dry-run adapter and document the deliberate boundary rather than guessing.

#### 3d. Authoring contract and QA checklist

Write the authoring template and QA checklist from §5.1/§5.2 of the v2 plan. They
must explicitly cover:

- no invented senses or fake polysemy;
- duplicate-gloss checks against the existing bank;
- beginner-parseable examples;
- source evidence for accepted senses;
- stable IDs and provenance;
- lessonGroup versus form-drill track distinction;
- 8–12-word coherent scenario lessons;
- controlled-vocabulary examples;
- register, speech level, origin, morphTag, and function-word review;
- audio extraction and missing-key checks;
- strict audits, deterministic regeneration, browser smoke testing;
- independent review of high-risk forms, homographs, particles, proper nouns, and
  Sino-Korean/native distinctions;
- storage/performance budget checks before large-scale imports.

### 4. Add focused deterministic tests

Add only tests that protect the new tooling and existing invariants. At minimum,
cover:

- unchanged input produces byte-identical candidate queue output;
- duplicate or conflicting candidate decisions are rejected;
- existing curated IDs cannot be overwritten;
- frozen v2 lesson/unit/section IDs cannot be changed;
- a dry-run import makes no data mutation;
- invalid row schema is rejected;
- a source-hash mismatch is reported;
- the stale audit test now targets the live plan.

Prefer Node’s built-in facilities and existing repository patterns. Do not add a test
framework or dependency.

### 5. Reconcile current documentation only where it is demonstrably stale

Update current operational docs if they still say P1-G is pending or imply that the
old 298-lesson curriculum is live. Preserve historical notes in the archived Words
roadmap. Do not rewrite history to make old numbers disappear.

If you find a contradiction such as “298 lessons” in a historical scorecard versus
“283 lessons” in the live v2 plan, label it clearly as historical/current rather than
silently replacing it.

## Explicit non-goals

Do not:

- author or bulk-import new Korean vocabulary in this task;
- invent meanings, examples, translations, hanja, or pronunciation data;
- modify `words_curated_core.js` except through a reviewed import fixture, if absolutely
  required to test the adapter;
- modify the frozen v2 curriculum;
- change `app.js` except for a narrowly necessary stale-test compatibility fix;
- change the Sentences section;
- touch Alphabet data or UI;
- hand-edit `audio_map.js`;
- add frameworks, bundlers, dependencies, or a `package.json`;
- turn on `TEST_UNLOCK_ALL_STAGES`;
- weaken or bypass an audit to make a test pass;
- perform destructive git operations;
- commit or push unless explicitly asked.

## Verification gates

After each logical batch, run the relevant checks. Before reporting completion, run all
of these and include their results:

```powershell
node --check app.js
node --check words_curated_core.js
node --check words_lesson_plan.js
node scripts/audit-words-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-app-shell.mjs
node scripts/test_curriculum_v2_migration.mjs
node scripts/test_curriculum_v2_audit.mjs
```

Also run every new expansion-tool test and at least one deterministic dry-run using
the real source inputs, without importing or mutating curated data.

For any changed loaded asset, verify the cache name and matching `?v=` query strings
in both `index.html` and `sw.js`. If no loaded asset changed, say so explicitly.

## Final report format

Report:

1. files changed;
2. each completed task and its exact scope;
3. anything intentionally left unfinished;
4. all commands run and pass/fail results;
5. exact blockers or decisions requiring a stronger model/owner;
6. whether the working tree is clean.

Do not claim the Words expansion has started merely because the plumbing exists. Keep
the finite v2 core frozen, keep every decision evidence-based, and leave the next
authoring model a deterministic, reviewable queue.
