# AI_INSTRUCTIONS.md — read this first to continue the project

**If the user says "continue the project," this file is your runbook.** Follow it
top to bottom. It tells you where to look, how to pick the next task, and how to
ship it.

## Mission

Build the HanaPath **Words (vocabulary)** section toward the target defined in
[`docs/VOCABULARY_TEACHING_SPEC.md`](docs/VOCABULARY_TEACHING_SPEC.md). The app is
a **vanilla static PWA — no framework, no build step.** The **alphabet section is
complete and protected** — do not regress it.

## Step 0 — Orient (do this first, every time)

```bash
git status
git log --oneline -8
gh pr list --state open      # anything already in flight?
```

Then read [`CLAUDE.md`](CLAUDE.md) — the rules and the full document map.

## Step 1 — Know the target

Read [`docs/VOCABULARY_TEACHING_SPEC.md`](docs/VOCABULARY_TEACHING_SPEC.md):

- **§8 status scorecard** — what is shipped vs missing (the source of truth for
  "where are we").
- **§9 finalization checklist** — the ordered list of what remains to finish
  the Words section (this is the live work list).
- **§11 milestone reference sheet** — the M0…M6 backlog with depends-on, files,
  acceptance, and status.
- **§12 dependency & implementation order** — historical for shipped
  milestones; still the *preconditions / where / how / done-when* for open M2.

The original research spec, verbatim, is
[`docs/VOCABULARY_TEACHING_SPEC_SOURCE.md`](docs/VOCABULARY_TEACHING_SPEC_SOURCE.md).
The implementation-level plan is
[`docs/WORDS_SECTION_MASTER_SPEC.md`](docs/WORDS_SECTION_MASTER_SPEC.md).

## Model allocation (who does what kind of task)

Route work by its shape, not its size:

- **Codex 5.4 — easy work that is bulky.** High-volume, low-judgment,
  recipe-driven batches where this runbook or the roadmap spells out the
  exact per-row decision: curation-style axis pinning, dropping flagged
  keys/fields from an enumerated list, applying a decision table row by row,
  subtitle/count sync, mechanical doc/count refreshes. One checkbox = one
  small PR; the audits are the safety net.
- **High intelligence model — everything else.** Anything needing judgment
  or synthesis: authoring new senses/example sentences, semantic calls
  ("is this real polysemy?"), schema or audit changes, anything touching
  `app.js`, merge/integration work, post-merge verification (see the
  roadmap's §0 warning — a bad merge once silently destroyed merged work),
  reconciling docs against re-derived data, and reviewing/landing the bulky
  batches Codex 5.4 produced.

When in doubt, or when a "bulky" task turns out to require a semantic
decision mid-batch, stop and hand it to the high intelligence model rather
than guessing.

## Step 2 — Pick the next task

The §9 checklist has a **batch-by-batch execution queue**:
[`docs/WORDS_FINAL_ROADMAP.md`](docs/WORDS_FINAL_ROADMAP.md). Prefer it — read
its §2 runbook, then take the next unchecked box (one box = one PR; Tracks
D/E are owner-gated). Fall back to working the teaching spec's **§9
finalization checklist top-down** only if the roadmap file is missing or
fully checked. Two special cases:

- **§9 item 1 (M2 sense split):** follow the M2 block in **§12.3**
  (*preconditions → where → how → done-when*).
- **§9 item 5 (pronunciation scoring):** owner-gated — do **not** start it
  unless the owner has explicitly decided the approach. Skip to nothing
  rather than attempting it silently.

If every §9 item is done or blocked on the owner, say so and stop — do not
invent new scope.

**Do not trust a "✅ done" at face value — verify it against the real data
first.** The scorecard has been wrong **three times**, each caught only by
re-deriving the claim from the data instead of reading the checkmark:
- a register/speech-level inferrer that read a word's *example sentence*
  instead of the word itself (fixed in #50)
- a senses count inflated by 67 accidental duplicate rows (fixed in #51,
  audit now catches that class)
- 74 duplicates disguised as polysemy via fabricated `senseKey`s that
  exploited a loophole in the #51 audit fix (fixed in #54, loophole closed —
  and the standing lesson: **a `senseKey` is not proof of a real sense; read
  the meanings**)

So before starting or reporting further progress on any milestone: run
`node scripts/audit-words-data.mjs --strict` and read its **Annotation
sources** output, spot-check a few rows/lessons in a `node -e` one-liner or a
browser reload, and only then trust the number. The current honest remaining
work is the teaching spec's **§9 finalization checklist**; `HANDOVER.md` →
"Words section planning" summarizes it.

If the user named a specific task, do that instead.

## Step 3 — Rules of engagement (full list in `CLAUDE.md`)

- **Vanilla/static** — no framework, bundler, or build step. New data is a plain
  browser-global file loaded before `app.js`.
- **Additive & backward-compatible** Words-data changes; existing rows and
  lessons keep passing the audit.
- **Bump caches:** change a loaded file → update `CACHE_NAME` in `sw.js` **and**
  the `?v=...` strings in `index.html` + `sw.js`.
- **Audio:** new Korean text → `python generate_assets.py`; never hand-edit
  `audio_map.js`.

## Step 4 — Verify (no test framework; use these)

```bash
node --check <file.js>                              # any JS you touched
node scripts/audit-words-data.mjs --strict          # Words data
node scripts/audit-alphabet-audio.mjs --strict      # audio coverage
node scripts/audit-app-shell.mjs                    # index.html / sw.js cache-version wiring
python -m http.server 8000                           # then open index.html, smoke-test + check console
```

## Step 5 — Ship

Branch off `main`, keep the change **small and single-purpose**, open a **draft
PR**, and report exactly what changed and how you verified it. The owner marks it
ready and squash-merges.

## Before you finish

If any work advanced, **update the teaching spec's §9 checklist (and §8/§11 if
a milestone moved)** in the same PR, so the next AI session picks up cleanly
from an honest scoreboard. Only claim numbers you re-derived from the data.
