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

## Step 2 — Pick the next task

From **§11**: choose the lowest-numbered milestone whose status is **not ✅** and
whose dependencies are all ✅. Then open that milestone's block in **§12** and
follow *preconditions → where → how → done-when*.

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

If a milestone advanced, **update §8 and §11 status** in the teaching spec in the
same PR, so the next AI session picks up cleanly from an honest scoreboard.
