# AI_INSTRUCTIONS.md — read this first to continue the project

**If the user says "continue the project," this file is your runbook.** Follow it
top to bottom. It tells you where to look, how to pick the next task, and how to
ship it.

## Mission

Build the HanaPath **Sentences** section toward the target defined in
[`docs/SENTENCES_TEACHING_SPEC.md`](docs/SENTENCES_TEACHING_SPEC.md). The app is
a **vanilla static PWA — no framework, no build step.** The **alphabet and
Words sections are complete and protected** — do not regress them (the Words
finalization closed 2026-07-05; its historical queue is
`docs/archive/WORDS_FINAL_ROADMAP.md`).

## Step 0 — Orient (do this first, every time)

```bash
git status
git log --oneline -8
gh pr list --state open      # anything already in flight?
```

Then read [`CLAUDE.md`](CLAUDE.md) — the rules and the full document map.

## Step 1 — Know the target

Read [`docs/SENTENCES_TEACHING_SPEC.md`](docs/SENTENCES_TEACHING_SPEC.md):

- **§1 research basis + adaptation decisions** — what the design is and where
  it deliberately diverges from the research report (no backend, no lyric
  mining, stub speech scoring).
- **§2 existing assets** — what to reuse instead of rebuilding (the ~2,007
  audio-backed curated example sentences, the tile keyboard, the Leitner SRS,
  the inflection engine…).
- **§3–§7 schema / tags / bands / drills / SRS** — the design contract.
- **§8 status scorecard** — what is shipped vs missing.
- **§9 milestone reference sheet** — S0…S10 with depends-on, files, done-when.

The verbatim research source is
[`docs/SENTENCES_TEACHING_SPEC_SOURCE.md`](docs/SENTENCES_TEACHING_SPEC_SOURCE.md).
The Words-section reference docs (`docs/VOCABULARY_TEACHING_SPEC.md`,
`docs/WORDS_SECTION_MASTER_SPEC.md`) describe the shipped engines the
Sentences work reuses.

## Model allocation (who does what kind of task)

Route work by its shape, not its size:

- **Codex 5.4 — easy work that is bulky.** High-volume, low-judgment,
  recipe-driven batches where this runbook or the roadmap spells out the
  exact per-row decision: curation-style axis pinning (the Sentences
  roadmap's Track D tag/band batches), applying a decision table row by row,
  audio-regeneration runs, subtitle/count sync, mechanical doc/count
  refreshes. One checkbox = one small PR; the audits are the safety net.
- **High intelligence model — everything else.** Anything needing judgment
  or synthesis: authoring new sentences or helper copy, semantic calls
  ("is this tag really present in this sentence?"), schema or audit changes,
  anything touching `app.js` (all of the Sentences roadmap's Tracks B, C, E,
  F, G, I, J), merge/integration work, post-merge verification (see the
  roadmap's §0 warning — a bad merge once silently destroyed merged work),
  reconciling docs against re-derived data, and reviewing/landing the bulky
  batches Codex 5.4 produced.

- **Gemini 3.5 Flash — fast worker, Sonnet-level judgment, needs an explicit
  spec.** It can cover both lanes above — the bulky [codex] batches quickly,
  *and* the judgment-heavy [high] boxes — **as long as the box is fully
  specified** (exact files, exact per-row rule or spec section, exact
  done-when). Its failure mode is speed without the full picture, not lack of
  ability, so when you route to it:
  - Hand it **one roadmap box with the recipe already resolved** — don't ask it
    to decide scope or invent a plan.
  - Make the **verify gates non-optional and explicit** (the Step 4 checklist
    below runs on every PR, even a one-liner).
  - Tell it to **re-derive every claim from the data** and to **stop and ask**
    on any judgment the spec doesn't settle rather than guessing.
  - Keep it out of unsupervised **merge/integration** and **schema/audit design**
    work unless a high-intelligence pass reviews the result — those are where a
    silent, fast mistake is most expensive (see the roadmap's §0 merge warning).

Every box in the Sentences roadmap is pre-tagged **[codex]** or **[high]** —
follow the tag. Gemini 3.5 Flash may execute either tag when the box is fully
specified; the tag tells you how much judgment the box needs, not which model
must run it.

When in doubt, or when a "bulky" task turns out to require a semantic
decision mid-batch, stop and hand it to the high intelligence model rather
than guessing.

## Step 2 — Pick the next task

**Sentence curriculum/path/hub/runner work (current active queue):** take the
next unchecked box in §4 of
[`docs/SENTENCES_CURRICULUM_V2_PLAN.md`](docs/SENTENCES_CURRICULUM_V2_PLAN.md)
(S2-A…S2-G; one box = one PR; owner-approved 2026-07-10).

**Bank-level / authored-content work:** the batch-by-batch execution queue is
[`docs/SENTENCES_FINAL_ROADMAP.md`](docs/SENTENCES_FINAL_ROADMAP.md). Read its
§0 ground rules and §2 runbook, then take the **next unchecked box in
dependency order** (one box = one PR). Special cases:

- **Track H (authored expansion) is owner-gated 🔒** — do not start it unless
  the owner has approved themes and volume. Skip to nothing rather than
  attempting it silently.
- The owner's priority order is fixed: **Track A then Track B (Translate &
  Type)** before anything else.

If every box is done or blocked on the owner, say so and stop — do not invent
new scope.

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

(A fourth case: integration merge `b385e77` silently dropped already-merged
content while every audit stayed green — after any merge touching a curated
data file, diff the merged tip against `main` at the row/field level.)

So before starting or reporting further progress on any milestone: run the
relevant strict audit (`audit-sentences-data.mjs` once it exists,
`audit-words-data.mjs` always) and read its **Annotation sources** output,
spot-check a few rows in a `node -e` one-liner or a browser reload, and only
then trust the number. The current honest remaining work is the Sentences
spec's **§8 scorecard** + the roadmap's checkboxes, re-derived per the
roadmap's §2.1.

**Words delegation:** **Luna** owns the active Words Phase 2 marathon queue in
`docs/LUNA_WORDS_PHASE_2_BATCH_PROMPT.md`. The import boundary, top-1,000
qualification sweep, and first coherent draft lesson are complete; continue at
rank 1001 using one pushed draft PR per batch. Do not pull Words work into a
Sentences PR.

If the user named a specific task, do that instead.

## Step 3 — Rules of engagement (full list in `CLAUDE.md`)

- **Vanilla/static** — no framework, bundler, or build step. New data is a plain
  browser-global file loaded before `app.js` (`sentences_core.js` follows the
  same lifecycle as `words_curated_core.js`: script-generated once, committed,
  then hand-curated).
- **Additive & backward-compatible** data changes; existing rows and
  lessons keep passing the audits. Alphabet and Words must not regress.
- **Bump caches:** change a loaded file → update `CACHE_NAME` in `sw.js` **and**
  the `?v=...` strings in `index.html` + `sw.js`.
- **Audio:** new Korean text → `python generate_assets.py`; never hand-edit
  `audio_map.js`.

## Step 4 — Verify (no test framework; use these)

```bash
node --check <file.js>                              # any JS you touched
node scripts/audit-sentences-data.mjs --strict      # Sentences data (once Track A2 ships)
node scripts/audit-words-data.mjs --strict          # Words data (must stay green)
node scripts/audit-alphabet-audio.mjs --strict      # audio coverage
node scripts/audit-app-shell.mjs                    # index.html / sw.js cache-version wiring
python -m http.server 8000                           # then open index.html, smoke-test + check console
```

## Step 5 — Ship

Branch off `main`, keep the change **small and single-purpose**, open a **draft
PR**, and report exactly what changed and how you verified it. The owner marks it
ready and squash-merges.

## Before you finish

If any work advanced, **update the Sentences roadmap's checkbox + progress
log and the Sentences spec's §8 scorecard** in the same PR, so the next AI
session picks up cleanly from an honest scoreboard. Only claim numbers you
re-derived from the data.
