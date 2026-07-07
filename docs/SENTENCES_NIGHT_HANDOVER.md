# Sentences — Handover (updated 2026-07-07)

> Cross-PC handover so a fresh session (different machine, no chat history) can
> continue. **First step: `git checkout main && git pull origin main`.**
> Authoritative queue is [`SENTENCES_FINAL_ROADMAP.md`](SENTENCES_FINAL_ROADMAP.md);
> north star is [`SENTENCES_TEACHING_SPEC.md`](SENTENCES_TEACHING_SPEC.md). This
> file is a snapshot + task list, not a substitute for those.

## Who this is for (read before you touch anything)

You are likely **Gemini 3.5 Flash** or a similarly fast, Sonnet-level model. You
are fast and capable — the failure mode is **moving before you have the full
picture**, not lack of ability. So work like this:

1. **Follow the runbook, don't improvise a shortcut.** Do
   [`../AI_INSTRUCTIONS.md`](../AI_INSTRUCTIONS.md) top to bottom (orient → target
   → pick the next box → build → verify → ship). It exists so you don't have to
   reconstruct the plan from scratch — trust it.
2. **One box = one branch off `main` = one draft PR.** Never batch two roadmap
   boxes into one PR, never commit to `main`, never leave work only local.
3. **Verify before you claim, always.** A green checkmark or an
   `annotationSource:"explicit"` is a *claim*, not proof — the Words scorecard was
   wrong **four times** (PRs #50, #51, #54, and merge `b385e77` silently dropping
   already-merged work; see AI_INSTRUCTIONS §"Pick the next task"). Re-derive every
   number you report from the actual data/audit output before trusting it.
4. **Stop and ask on ambiguity — do not guess.** If a box needs a judgment call
   the spec doesn't settle (which pattern tag really applies, whether a sentence
   is band 2 or 3), pick the interpretation the spec supports and *write down why*
   in the PR; if the spec genuinely doesn't decide it, surface the question
   rather than silently choosing. Never invent new scope.
5. **Speed is welcome; skipping the verify gates is not.** Run every audit in the
   checklist below on every PR, even for a one-line change — they are this repo's
   only test suite.

## Delivery constraint (non-negotiable)
Everything must be **on GitHub** — the owner continues from a different PC and
won't have tonight's machine. **One task = one branch off `main` = one draft PR,
pushed to `origin`.** Never leave work only local, never commit to `main`, never
stack unrelated work. After each PR, confirm it exists on GitHub.

## Current state (main tip `a663d49`, PR #121)
- Bank `sentences_core.js` = **2,060 rows**. Cache **`v244`** /
  `app.js?v=20260707a` (`sentences_core.js?v=20260706d`, `styles.css?v=20260706b`).
- `band`: explicit on all 2,060 / 0 inferred.
- `patternTags`: explicit on 2,007 / **inferred on 53** (new rows **s2008–s2060**).
- Tracks **A, B, C, D** done; **H/I** legacy consolidation landed (#109).
- **Sentence Studio bugfixes landed (#121, 2026-07-07):** the locked-band
  "Learn N more words" CTA now routes to the vocabulary section
  (`data-ss-goto="vocabulary"`, was the invalid `"vocab"` → fell through to
  Today), and the "Reviews due" stat now colors via `var(--warn)` (was the
  undefined `var(--warning-color)`, silently dropped). Both were found in the
  post-rebuild review; no data touched.
- All audits pass `--strict`.

## Tasks (priority order — each its own pushed draft PR)
1. **Finish Track D on s2008–s2060.** Flip their `patternTags` inferred→explicit
   per spec §4 closed set / §5 table. Goal: `patternTags` back to 0 inferred.
2. **Pattern-tag accuracy pass (hard).** `counter-phrase` was over-applied; 75
   zero-number rows already corrected. ~40 rows remain where a number is present
   but the head noun is debatable (`두 부서`, `두 사람`) — set a consistent policy
   (§4 = "number **plus counter**"), document it, apply uniformly. Then sweep the
   other tags (highest-risk: `location-e`/`location-eseo`/dative 에, connectives,
   `time-expression`). ~200-row batches, one PR each, with an accuracy report.
3. **Runtime-verify the Listening / survival-phrases tab.** #109 removed legacy
   mini-banks from `app.js` and repointed the survival/grammar/verb/honorific/
   conversation decks at `HANAPATH_SENTENCES` via a `.find()` by Korean text.
   The **static** risk is already cleared: the #121 review confirmed all 54 of
   those lookups resolve (0 misses, 0 empty `english`). What remains is the
   **browser** check — serve (`python -m http.server 8000`), open that tab,
   confirm render + audio playback, and that meanings show. Fix in a PR if broken.
4. **Track E — pattern micro-lessons** (`app.js`, judgment work) — only after 1–3.

## Rules (every PR)
- Vanilla/static; additive; never reuse/renumber `id`s or touch
  `korean`/`english`/`tokens`. Tags only from the §4 closed set (37).
- **Don't trust `annotationSource:"explicit"` = correct — re-derive from the Korean.**
- Run: `node --check <file>`, `audit-sentences-data.mjs --strict` (0 errors),
  `audit-words-data.mjs --strict`, `audit-app-shell.mjs`,
  `audit-alphabet-audio.mjs --strict`.
- Cache bump on any loaded-file change: `CACHE_NAME` in `sw.js` + `?v=` in **both**
  `index.html` and `sw.js`, kept in sync (monotonic).
- New Korean text → regenerate audio per `.agents/AGENTS.md` (tasks 1–4 need none).

## End-of-night checklist
Every task = a merged-or-open **draft PR on GitHub**; `git status` clean;
`git log origin/main..` empty on each branch (all pushed); `main` left green.
