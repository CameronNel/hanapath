# HanaPath handover

> **Authoritative status and packet history:**
> [`docs/CORE_APP_COMPLETION_ROADMAP.md`](docs/CORE_APP_COMPLETION_ROADMAP.md)
>
> This is a concise product snapshot, not an execution queue.

## Repository state

- `main` is the single source of truth.
- The canonical app is vanilla HTML/CSS/JavaScript with no root framework,
  bundler, package system, or build step.
- `mobile/` is the isolated Capacitor/native exception.
- State persists in `localStorage["hanapath-v1"]`.
- Completion-roadmap workers open draft PRs; the designated integrator reviews
  and merges them.

## Core product snapshot, 29 July 2026

### Lessons

- **Alphabet:** 8 stages, writing practice, Drill Lab, audio, skill review, and
  protected progression.
- **Words:** 2,028 curated senses, 75 units, 284 lessons, SRS, inflection,
  pronunciation, authored past/negation production, and 17 Form Checks.
- **Sentences:** 4,177 unique audio-backed rows, 75 units, 703 lessons,
  positional/near-miss feedback, checkpoints, SRS, listening, and exact
  remediation routes.

### Examinations

- **Hangul Mastery:** shipped, 200 items, immutable provenance and taint.
- **Core Words:** shipped, 10 exams, v3 typed past/negation production,
  retention, and valid frozen-v2 retention compatibility.
- **Sentence Mastery:** shipped from the enabled frozen
  `curated-sentence-exam-v2-cb6b` bank (359 typed / 343 recognition), with four
  stage exams, one final, delayed retention, deterministic generation, strict
  grading, Practice handling, immutable provenance, remediation, and migration.

Exactly 2,100 E1A/E1B full-corpus reviews remain protected historical evidence.
E1C/E1D were superseded; the independently reviewed frozen curated bank is the
strict live examination source.

### Integrity and verification

- Immutable results distinguish HanaPath, Practice, and legacy-incomplete
  records; testing overrides taint before progression mutation.
- Backup import validates exam state, qualifiers, retention links, taint, and
  provenance before replacement.
- `node scripts/audit-core-release.mjs --full` is the complete blocking matrix.
- CI generates the isolated mobile payload, then requires all 55 core steps to
  pass with zero conditional or skipped checks.
- Q1 browser acceptance covers cold, progressed, legacy, tainted, and imported
  profiles at exact phone/tablet viewports.

## Hard rules

1. Keep the root app vanilla/static and native tooling under `mobile/`.
2. Preserve old saves, IDs, SRS, results, qualifiers, and retention windows.
3. Re-derive counts and run the strict audits; historical prose is not evidence.
4. Never broaden exam answers, fabricate provenance, or let Practice award
   achievement.
5. Never hand-edit `audio_map.js`; use `generate_assets.py`.
6. Loaded learner-file changes require coordinated cache/query/integrity pins.
7. Workers do not merge their own completion-roadmap PRs.

## Post-core work

Real-device Android evidence, Play owner decisions, signing/keystore setup,
internal testing, paid Handwriting Coach activation, ML Kit authority selection,
iOS packaging, and optional curriculum expansion remain owner-scoped post-core
work. See roadmap section 11.
