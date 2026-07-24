# CLAUDE.md: read this first

> **Continuing HanaPath?** Read
> [`docs/CORE_APP_COMPLETION_ROADMAP.md`](docs/CORE_APP_COMPLETION_ROADMAP.md).
> It is the only active task queue. `AI_INSTRUCTIONS.md` contains the short
> dispatch protocol; this file contains the durable rules and specification map.

HanaPath is a vanilla static Korean-learning PWA. The root app has no framework,
bundler, package system, or build step. `app.js` is a large plain browser script
loaded with `<script defer>`.

The owner-approved native exception is isolated under `mobile/`, where Capacitor
and Android tooling package the same audited web application. Do not turn the
root app into a framework project or demote browser/PWA support.

## Completion-sprint authority

The repository accumulated overlapping roadmaps, one-shot prompts, rescue
handovers, and model queues. They are no longer active instructions.

During the core completion sprint:

- the core roadmap alone decides what is READY;
- one packet equals one branch and draft PR;
- workers do not merge their own packet PRs;
- one designated high-intelligence integrator reviews and squash-merges;
- no agent creates another handover, roadmap, or shadow queue;
- optional curriculum expansion is frozen.

This sprint-specific merge rule overrides the older model-family auto-merge
policy until packet Q2 closes the release candidate.

## Current product reality

### Lessons

- Alphabet: complete 8-stage course, writing, Drill Lab, audio, skill review.
- Words: 2,028 curated senses, 75 units, 284 lessons, SRS, inflection,
  pronunciation, production bridge, and 17 Form Checks.
- Sentences: 4,177 unique audio-backed rows, 75-unit path, shadowing,
  Translate & Type, build, dictation, transform, checkpoints, SRS, and listening.

No new Words imports or Sentence scenario packs belong to core completion.

### Examinations

- Hangul Mastery: shipped, 200 items.
- Core Words: shipped, 10 exams, v3 typed past/negation production, delayed
  retention, valid frozen-v2 retention compatibility.
- Sentence Mastery: not shipped. Eligibility covers 20 of 4,177 rows; strict
  review, blueprints, engine, runner, provenance, and retention remain.

### Integrity

`exam_integrity.js` provides immutable result records, Practice/taint handling,
legacy-incomplete labelling, qualifier/retention relations, migration, and
backup validation. Never bypass or weaken this layer.

## Hard rules

1. **Vanilla/static root.** Plain browser globals load before `app.js`.
2. **Native isolation.** Build/native tooling stays in `mobile/`.
3. **Additive compatibility.** Preserve existing IDs, old saves, SRS, crowns,
   result records, qualifiers, and valid retention windows.
4. **Honest evidence.** Re-derive every count and semantic claim from live data.
   Historical scorecards have been wrong and a prior merge silently dropped
   reviewed work while audits stayed green.
5. **Fair grading.** Never broaden accepted answers, invent alternatives,
   collapse Korean spaces in formal Sentence exams, fabricate provenance, or
   let Practice attempts award achievement.
6. **Audio pipeline.** New Korean text goes through `generate_assets.py`; never
   hand-edit `audio_map.js`.
7. **Cache discipline.** Loaded-file changes require coordinated `CACHE_NAME`
   and query-string bumps in `index.html` and `sw.js`, plus matching integrity
   pins where applicable.
8. **Alphabet protection.** Use `getAlphabetProgress()` and existing progression
   helpers.
9. **Packet boundaries.** Touch only the files assigned by the roadmap and avoid
   concurrent `app.js` ownership.
10. **Browser proof.** Learner-facing code needs real static-browser acceptance,
    not only source inspection or Node audits.

## Specification map

| Document | Authority |
|---|---|
| `docs/CORE_APP_COMPLETION_ROADMAP.md` | Only active packet queue, merge order, definition of done |
| `docs/SENTENCES_TEACHING_SPEC.md` | Sentence lesson pedagogy, schema, tags, bands, drills, SRS |
| `docs/SENTENCES_CURRICULUM_V2_PLAN.md` | Shipped Sentence path design and historical implementation record |
| `docs/SENTENCES_FINAL_ROADMAP.md` | Historical Sentence build/content record, not an active queue |
| `docs/SENTENCE_ELIGIBILITY_AUTHORING.md` | Binding row-classification rules for Sentence exams |
| `docs/SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md` | Binding Sentence stage/final/retention contract for roadmap packets E/X |
| `docs/HANGUL_MASTERY_EXAM_CLAUDE_SPEC.md` | Hangul Mastery design contract |
| `docs/CORE_WORD_EXAM_SPECS.md` | Core Word suite contract; shipped v3 changes and compatibility must remain audited |
| `docs/CORE_WORD_EXAM_COMPETENCY_MAP.md` | Generated proof of taught-before-tested Word competencies |
| `docs/INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md` | Result provenance, taint, migration, disclosure, and relation contract |
| `docs/FORM_CHECKS_PLAN_DRAFT.md` | Design contract for the shipped 17 Form Checks |
| `docs/WORDS_PAST_NEGATION_PRODUCTION_PLAN_DRAFT.md` | Design contract/history for the shipped production bridge and v3 work |
| `docs/EXAM_TAB_HANDOVER.md` | Current Exam-tab status and file map |
| `docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md` | Post-core Android/Play execution contract |
| `HANDOVER.md` | Concise current-state snapshot |
| `.agents/AGENTS.md` | Offline audio-generation rules |

A document labelled “draft” may still be a binding design contract when the
roadmap names it. It is not an active queue unless the core roadmap says so.

## Verification

Run the packet-specific commands and the applicable full matrix from roadmap
section 9. Core audit families include:

- syntax, shell, cache wiring;
- Words/Sentences data and curriculum foundation;
- Alphabet/full audio coverage;
- Hangul recognition and Handwriting Coach;
- exam integrity, Hangul, Core Word, and later Sentence exams;
- Form Checks and Sentence eligibility;
- browser journeys and migration fixtures;
- Android package/build checks for native or packaged changes.

After a data merge, independently compare merged `main` with the reviewed head
at row/field level. After a UI merge, rerun the critical browser route on fresh
`main`.

## Cold-learner standard

Serve the app statically and test fresh, progressed, legacy, tainted, and
imported profiles. Fail on uncaught errors, blank routes, unreachable lessons,
wrong grading, lost state, stale assets, clipped primary controls, or horizontal
overflow at phone width.
