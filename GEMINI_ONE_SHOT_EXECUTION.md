# Gemini one-shot execution — four exact HanaPath work packages

**Prepared:** 2026-07-23
**Required base:** `origin/main` at or after `1cc967ca3` (PR #343)
**Executor:** Gemini
**Mode:** one uninterrupted autonomous run; four small draft PRs

## Your operating rule

You are the implementer, not the planner. Execute the four packages below in
order. Do not broaden, redesign, reprioritise, or substitute tasks. Do not ask
the owner to choose between alternatives already resolved here.

You must finish a package by committing, pushing, and opening its draft PR
before starting the next package. Continue to the next package when the prior
package is pushed; do not wait for review or merge. Packages 3 and 4 are
explicitly stacked because they depend on the preceding package.

Never merge a PR. Gemini is not an auto-merge model family under `AGENTS.md`;
every PR you create must remain a draft.

## Non-negotiable repository rules

1. Read `AGENTS.md`, `AI_INSTRUCTIONS.md`, and the package-specific documents
   named below before editing.
2. Never read or search `.agent-ignore/**`.
3. Keep the canonical root app vanilla/static: no framework, bundler,
   `package.json`, or build step.
4. Do not edit Alphabet content, Words rows, Sentence rows, audio assets,
   `audio_map.js`, or owner-gated Words Phase 2 material.
5. Preserve every existing lesson/unit/check/exam ID and all historical
   progress. Changes must be additive and backward-compatible.
6. Do not weaken, delete, skip, or special-case an audit to make it pass.
7. For every changed loaded asset, choose a fresh revision not present on the
   branch, update its query string in both `index.html` and `sw.js`, increment
   `CACHE_NAME`, and update app/integrity pins that explicitly assert those
   values.
8. Use `git diff --check` before every commit. Never force-push, reset, or
   merge an old branch.
9. Use `gh pr create --draft`. Put the exact base branch, verification commands,
   and unresolved risks in every PR body.
10. If a package hits a genuine contradiction in a locked specification, record
    the exact file/line and failing command in `GEMINI_BLOCKERS.md`, commit and
    push that evidence on the package branch, open the draft PR, and continue
    to the next independent package. Do not invent a product decision.

## Start once

Run:

```powershell
git fetch origin --prune
git status --short
git rev-parse origin/main
git merge-base --is-ancestor 1cc967ca3 origin/main
gh pr list --repo CameronNel/hanapath --state open
```

The ancestry command must succeed. The starting worktree must be clean. PR
#343 is complete; do not recreate or alter its v3 minima or prompt-leak fix.
PR #342 already replaces obsolete PR #297; do not redo Writing Practice.

---

## Package 1 — recreate Drill Lab End Session styling on fresh main

### Branch and PR

```text
branch: gemini/drill-end-session-styling-v2
base: main
draft PR title: Drill Lab: distinguish and right-align End session
supersedes: #341 and #312
```

Create the branch directly from `origin/main`.

### Exact visual change

Touch only `styles.css`, `index.html`, and `sw.js`, plus an audit pin only if a
current audit explicitly requires the new cache/revision literal.

In the existing rule:

```css
.alphabet-lesson-player .player-actions.word-card-nav-actions.drill-quick-actions
```

change the desktop grid from two 112px columns centred to one 112px column
right-aligned:

```css
grid-template-columns: minmax(0, 112px);
justify-content: end;
```

Add these exact semantic styles to the existing `#drillEndBtn`:

```css
#drillEndBtn {
  border: 1px solid rgba(251, 146, 60, .45);
  background: rgba(251, 146, 60, .12);
  color: #fdba74;
}
#drillEndBtn:hover:not(:disabled) {
  background: rgba(251, 146, 60, .2);
  border-color: rgba(251, 146, 60, .6);
}
```

Do not copy cache numbers from PR #341 or #312. Derive the next cache and
stylesheet revision from fresh `origin/main`.

### Verification

Run:

```powershell
node --check sw.js
node scripts/audit-app-shell.mjs
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-premium-handwriting.mjs
git diff --check
```

Serve the app and smoke-test a Drill Lab session at desktop and narrow mobile
width. Prove:

- `End session` is at the right edge;
- it uses the orange exit treatment;
- hover/focus remains legible;
- the Back/Previous control and mobile layout are not regressed.

Commit, push, and open the draft PR against `main`. Then continue.

---

## Package 2 — Words C4 frozen-v2 resolver and migration fixtures

### Branch and PR

```text
branch: gemini/words-c4-frozen-v2
base: main
draft PR title: Words C4: preserve live v2 qualifier retention
```

Create this branch directly from the current `origin/main`, not from Package 1.

### Read before editing

Read these exact sections:

- `docs/WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md` §§7, 9, 10, and box C4;
- `docs/INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md`;
- `docs/CORE_WORD_EXAM_SPECS.md`;
- the current resolver/generator paths in `word_exam_blueprints.js`,
  `word_exam_engine.js`, and `app.js`;
- `scripts/fixtures/exam-integrity/words-mid-retention-save.json`;
- `scripts/audit-exam-integrity.mjs` and `scripts/audit-word-exams.mjs`.

### Exact result

Implement a frozen Words blueprint-v2 compatibility path for a learner whose
stored, valid v2 qualifier still has an open retention window after v3 ships.

Required behaviour:

1. Add an explicit version resolver. The public shape must include
   `resolveWordExamBlueprint(examId, version)` or an equivalently named
   function with the same two inputs.
2. Ordinary new attempts resolve to v3.
3. A retention attempt linked to a valid v2 qualifier resolves to frozen v2
   allocation/eligibility and records blueprint version 2.
4. A v2 qualifier never links to a v3 retention attempt.
5. A v3 qualifier never links to a v2 retention attempt.
6. Historical records are displayed and scored from stored values; never
   recompute their scores, cuts, distinction, mastery, due date, or expiry.
7. A failed or expired v2 confirmation does not silently convert to v3; the
   learner must create a new v3 qualifier.
8. Do not remove v2. Add a clearly named expiry-proof audit gate; removal is
   future box C6 and is out of scope.
9. Do not change paper lengths, timers, v3 minima, strand allocations, Words
   lesson data, or the four prompt frames merged in PR #343.

Add deterministic fixtures covering:

- valid v2 qualifier → v2 retention;
- valid v3 qualifier → v3 retention;
- rejection of both cross-version pairings;
- expired v2 qualifier → new v3 qualification required;
- old save loads with existing crowns/results unchanged.

Prefer small versioned frozen data next to the current blueprint definitions.
Do not duplicate the whole application or create a second runner.

### Verification

Run:

```powershell
node --check app.js sw.js word_exam_blueprints.js word_exam_engine.js exam_integrity.js
node scripts/audit-exam-integrity.mjs
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-app-shell.mjs
git diff --check
```

Browser-smoke both a v2 live-retention fixture and a new v3 attempt. Include
the exact fixture names and observed blueprint versions in the PR body.

Commit, push, and open the draft PR against `main`. Then continue.

---

## Package 3 — Words C5 v3 readiness and migration UI

### Branch and stacked PR

```text
branch: gemini/words-c5-v3-readiness
base: gemini/words-c4-frozen-v2
draft PR title: Words C5: activate v3 readiness after production bridge
```

Create this branch from the pushed head of Package 2. Open the PR against
`gemini/words-c4-frozen-v2`, not `main`, so its diff contains only C5.

### Read before editing

Read:

- `docs/WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md` §§1.2, 4, 7, 8, 10,
  and box C5;
- current lesson `s3-grammar-u2-l3` in `words_lesson_plan.js`;
- current competency readiness data/report;
- the Words exam hub/readiness functions in `app.js`.

### Exact result

Implement the UI/readiness boundary already specified by Workstream C:

1. Completion of `s3-grammar-u2-l3` is the production-readiness milestone for
   new v3 attempts.
2. Existing learners keep every crown and completed lesson. Never uncrown or
   relock Section 3.
3. An old crowned learner who has not completed the bridge sees the additive
   message `Production bridge available` with a direct route to
   `s3-grammar-u2-l3`.
4. Before the bridge is complete, do not serve typed v3 production as if it
   were taught. Preserve any valid frozen-v2 retention path from Package 2.
5. After bridge completion, ordinary new exam attempts resolve to v3 and the
   hub reports production readiness.
6. Persist the bridge milestone without rewriting historical completion or
   exam records.
7. Do not add a second exam card, change exam lengths/timers/minima, or edit
   curriculum rows.

Add deterministic audit/fixture coverage for a new learner, an old crowned
learner before the bridge, the same learner after the bridge, and a learner
with a live v2 retention window.

### Verification

Run the complete Package 2 verification list again. Browser-smoke all four
fixtures and confirm the direct bridge route opens the exact lesson.

Commit, push, and open the draft PR against the Package 2 branch. Then
continue.

---

## Package 4 — Form Checks B5 automatic past/negation upgrade

### Branch and stacked PR

```text
branch: gemini/form-checks-b5-past-negation
base: gemini/words-c5-v3-readiness
draft PR title: Form Checks B5: upgrade Past & Negation after bridge
```

Create this branch from the pushed head of Package 3. Open the PR against
`gemini/words-c5-v3-readiness`.

### Read before editing

Read:

- `docs/FORM_CHECKS_PLAN_DRAFT.md` §§0–4, §6, §§8–10, and box B5;
- the current `form-check-past-negation` declaration in
  `form_check_blueprints.js`;
- the current Form Check builder/runner in `app.js`;
- `scripts/audit-form-checks.mjs`;
- Package 3's readiness function. Reuse that single source of truth.

### Exact result

Keep one stable card with ID `form-check-past-negation` and exactly 12 items.

Before `s3-grammar-u2-l3` completion, it remains v2:

```text
0 typed past
0 typed negation
12 recognition/context items
```

After all three conditions are true —
`past-tense.scoredProduction`, `negation.scoredProduction`, and the bridge
lesson complete — it becomes v3:

```text
3 typed past
3 typed negation
3 context/blank
3 recognition/discrimination
```

Required safeguards:

1. Reuse the audited past generator and the four finite negation frames merged
   in PR #343. Do not create a generic negation inflection mode.
2. Typed prompts identify the requested frame without exposing the accepted
   answer.
3. Accepted answers are finite and reviewed.
4. Every typed item routes to `s3-grammar-u2-l3`; earlier recognition/context
   remediation remains `s3-grammar-u2-l2`.
5. Targets are unique within a session.
6. Immediate feedback appears only after submission.
7. This remains practice: no pass/fail/mastery/retention language and no
   mutation of SRS, crowns, lesson completion, or formal exam records.
8. Historical Form Check summaries are not recomputed and no second card is
   created.

Extend `scripts/audit-form-checks.mjs` to hard-fail on early typed production,
wrong 3/3/3/3 allocation, answer leakage, unresolved routes, duplicate targets,
or practice-state mutation.

### Verification

Run:

```powershell
node --check app.js sw.js form_check_blueprints.js word_exam_engine.js
node scripts/audit-form-checks.mjs
node scripts/audit-exam-integrity.mjs
node scripts/audit-word-exams.mjs
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-app-shell.mjs
git diff --check
```

Browser-smoke the same card before and after bridge completion. Submit one
wrong and one correct typed past item and one item from each negation frame.
Prove immediate feedback, exact remediation route, no pre-answer leak, and no
formal progress mutation.

Commit, push, and open the draft PR against the Package 3 branch.

## Final report

After all four draft PRs exist, print one compact report containing:

- each branch, PR number/URL, and base branch;
- exact files changed per package;
- every verification command and pass/fail result;
- browser/device evidence;
- any `GEMINI_BLOCKERS.md` entries;
- confirmation that no PR was merged;
- the exact branch the owner should review first.

Do not start Words Phase 2 imports, Sentence classification, new authored
content, audio generation, mobile milestones, or any fifth package.
