# CLAUDE.md — read this first

> **Continuing the project?** Start with **[`AI_INSTRUCTIONS.md`](AI_INSTRUCTIONS.md)** —
> the step-by-step runbook (orient → find the next task → build → verify → ship).
> This file is the rules + document map it refers back to.

HanaPath is a **vanilla static Korean-learning PWA**: no framework, no bundler,
**no build step**, no `package.json`. `app.js` is one large plain browser script
loaded via `<script defer>`. Keep it that way unless the owner explicitly asks
otherwise.

**Owner-approved native-packaging exception (2026-07-16):** the canonical web
app remains vanilla and build-free, but an isolated `mobile/` Capacitor project
may contain its own package/build/native tooling for Android Google Play and a
later iOS/iPadOS shell. Follow
[`docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md`](docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md);
do not turn the root app into a framework project or remove browser/PWA support.

## The Sentences section has a governing north star (current active work)

> The **Sentences section** is being rebuilt toward a specific target, defined
> in **[`docs/SENTENCES_TEACHING_SPEC.md`](docs/SENTENCES_TEACHING_SPEC.md)** —
> the source of truth for **what and how** the Sentences section should teach.
> The flagship feature is **Translate & Type**: English prompt → learner types
> the Korean in Hangul, with a tip / word-bank / next-chunk / reveal helper
> ladder.
>
> **The curriculum-v2 path restructure is shipped and Phase 1 is closed
> (owner-accepted 2026-07-10):** the Sentences lesson/hub structure now runs
> the Duolingo-style path from
> **[`docs/SENTENCES_CURRICULUM_V2_PLAN.md`](docs/SENTENCES_CURRICULUM_V2_PLAN.md)**
> (S2-A…S2-G all complete). **Phase 2 (§5) — authored expansion via Track H —
> is also complete: the 21-batch queue closed 2026-07-19** (s2061–s4177,
> 2,117 authored rows; ledger in the roadmap §13). Any further scenario pack
> requires fresh owner approval of themes — do not author one autonomously.
> Track I closed 2026-07-19: the Listening tab reads the full bank and the
> legacy aggregation is deleted. Remaining: the plan's §8 carried-over items.
> Bank-level and authored-content work (Track H) still follows
> **[`docs/SENTENCES_FINAL_ROADMAP.md`](docs/SENTENCES_FINAL_ROADMAP.md)**
> (one box = one PR; owner-gated items are marked 🔒), cross-checked against
> the spec's **status scorecard (§8)** and **milestone sheet (§9)**.

The **Alphabet section is complete and protected**. The Words section is now
restructured under the live v2 curriculum plan:
[`docs/WORDS_CURRICULUM_V2_PLAN.md`](docs/WORDS_CURRICULUM_V2_PLAN.md). Read
that plan before changing Words; its hardened owner decisions override older
provisional Words prose. The old Words finalization queue is historical
(deleted 2026-07-10 with the rest of `docs/archive/`; recover from git history
if ever needed). Do not regress either section; the audits are the guard.

Do not assume "done" or "not done" from memory or from a checkmark: **verify
scorecard claims against the actual data** (the Words scorecard was wrong four
times: PRs #50, #51, #54, and the b385e77 merge loss).

Gemini completed Words Phase 2 P2-0 tooling; Claude completed the top-1,000
sweep and first draft pack, which Codex independently reviewed and merged.
**Luna** owns the remaining Words Phase 2 marathon queue from rank 1001 onward
in `docs/LUNA_WORDS_PHASE_2_BATCH_PROMPT.md`. This is not part of the active
Sentences queue.

## Document map (what to read for what)

| Doc | Purpose |
|---|---|
| **`docs/SENTENCES_CURRICULUM_V2_PLAN.md`** | Sentences **path restructure**: K-pop-trainee-themed Duolingo-style curriculum plan + execution queue (current active work) |
| **`docs/SENTENCES_TEACHING_SPEC.md`** | Sentences **north star**: pedagogy, bank schema, pattern tags, bands, drill modes, status scorecard, milestone sheet |
| **`docs/SENTENCES_FINAL_ROADMAP.md`** | Sentences v1 build record + **Track H authored-content queue** (bank-level work) |
| `docs/SENTENCES_TEACHING_SPEC_SOURCE.md` | The Sentences research report, **verbatim** (source of record) |
| `docs/VOCABULARY_TEACHING_SPEC.md` | Words north star (section **shipped**; reference for its pedagogy + data axes) |
| `docs/WORDS_SECTION_MASTER_SPEC.md` | Words implementation reference (schema, SRS, lesson flow — reuse these engines for Sentences) |
| **`docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md`** | Hangul Mastery Examination contract: 200-item bank, grading, exam-mode rules (Exam tab) |
| **`docs/CORE_WORD_EXAM_SPECS.md`** | Core Word Examination Suite contract: ten achievement exams, macrostrands, generation, scoring, retention, audit (Exam tab, beneath Hangul) |
| **`docs/CORE_WORD_EXAM_COMPETENCY_MAP.md`** | Generated competency milestone map (first gate) proving every scored form was taught before it is tested |
| **`docs/EXAM_TAB_HANDOVER.md`** | Exam-tab structure shipped 2026-07-20 + one-shot runbook for finishing the exam attempt runner |
| **`docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md`** | Owner-approved Capacitor/Android/Google Play execution handover; preserves browser/PWA and later iOS compatibility |
| `HANDOVER.md` | Repo snapshot + conventions for the next contributor |
| `.agents/AGENTS.md` | Offline audio-generation pipeline rules |
| `README.md` | Product overview + run instructions |

## Hard rules for any agent

1. **Keep the canonical app vanilla/static.** No framework, bundler, or build
   step in the root web app. Data files are plain browser globals loaded before
   `app.js`. The only approved exception is isolated native packaging under
   `mobile/`, governed by `docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md`.
2. **Additive, backward-compatible changes** to the Words and Sentences data
   schemas. Existing curated rows and lessons must keep passing the audits.
3. **Run the audits** after touching learning data:
   `node scripts/audit-words-data.mjs --strict`,
   `node scripts/audit-sentences-data.mjs --strict`, and
   `node scripts/audit-alphabet-audio.mjs --strict`; run
   `node scripts/audit-hangul-recognition.mjs` after changing Hangul writing
   recognition, stroke templates, or its browser adapter; run
   `node scripts/audit-premium-handwriting.mjs` after touching premium writing,
   native recognition, or billing; run
   `node scripts/audit-hangul-mastery-exam.mjs` after touching the Exam tab or
   `hangul_mastery_exam.js`; run
   `node scripts/audit-word-exams.mjs` (and
   `node scripts/build-word-exam-competency-map.mjs --check`) after touching the
   Core Word Examination Suite (`word_exam_blueprints.js`, `word_exam_engine.js`,
   or the Words curriculum/curated data it reads); run
   `node scripts/audit-app-shell.mjs` after touching `index.html`, `sw.js`, or
   any loaded asset version; `node --check` any JS you edit.
4. **Bump caches** when you change `app.js`, `styles.css`, or any loaded data
   file: update `CACHE_NAME` in `sw.js` **and** the matching `?v=...` query
   strings in both `index.html` and `sw.js`.
5. **Audio:** if you add Korean text, regenerate assets per `.agents/AGENTS.md`
   (`python generate_assets.py`); never hand-edit `audio_map.js`.
6. **Alphabet section is complete and protected** — don't regress it. Go through
   `getAlphabetProgress()` for progression.
7. **Workflow:** branch off `main`, open a **draft PR**, keep it small and
   single-purpose. The owner marks ready and squash-merges.

## Verify like a cold learner

Serve statically (`python -m http.server 8000`) and open `index.html`. There is
no test framework; validate with `node --check`, the audit scripts, and a
browser smoke test (state persists in `localStorage` under `hanapath-v1`).
