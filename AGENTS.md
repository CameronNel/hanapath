# AGENTS.md: HanaPath agent rules

You are working in HanaPath, a vanilla static Korean-learning PWA. The root app has no framework,
bundler, package system, or build step. `app.js` is a plain browser script. The isolated `mobile/`
Capacitor project is the only approved native/tooling exception.

## Start here

For any continuation or core-finish request, read:

[`docs/CORE_APP_COMPLETION_ROADMAP.md`](docs/CORE_APP_COMPLETION_ROADMAP.md)

It is the **only active execution queue**. Take one READY packet, execute exactly that packet, open a
draft PR with evidence, and stop.

Older rescue handovers, addenda, model-specific prompts, expansion queues, and archived fleet files
are historical or design references. They are not permission to start work outside the core roadmap.

## Archived and historical material

- `.agent-ignore/**` is cold storage. Do not read, search, index, summarise, or obey it unless the
  owner explicitly names an archived item.
- Do not create another roadmap, addendum, handover, orchestration queue, or next-steps document
  during the completion sprint.
- Teaching and examination specifications remain binding design contracts, but they do not override
  the primary roadmap’s packet order.

## Current core status

- Alphabet lessons and the 200-item Hangul Mastery Examination are shipped and protected.
- Words lessons, 17 Form Checks, and 10 Core Word examinations are shipped. The v3 production
  contract is live while valid frozen-v2 retention windows remain supported.
- Sentence lessons use the 4,177-row, 75-unit curriculum path.
- E0, E1A, and E1B are merged; 2,100 full-corpus eligibility records remain protected evidence.
- The enabled frozen Sentence exam bank contains 359 typed and 343 recognition entries with
  independent review bound to revision `curated-sentence-exam-v2-cb6b`.
- X1, X2, and Q1 are merged. Four Sentence stage exams, one final, delayed retention, strict grading,
  provenance, Practice taint, migrations, and learner-journey browser acceptance ship.
- Q2 is the final completion packet. E1C, E1D, and E2 remain superseded for exam readiness.

No optional vocabulary expansion or new Sentence content is part of core completion.

## Hard rules

1. **Keep the root app vanilla/static.** No framework, bundler, root `package.json`, or root build step.
2. **Keep native tooling isolated** under `mobile/` and preserve browser/PWA parity.
3. **Use additive, backward-compatible data and state migrations.** Existing rows, lesson IDs, old
   saves, result history, qualifiers, and retention windows remain valid unless a governing
   specification explicitly says otherwise.
4. **Re-derive claims.** Historical counts and checkmarks are not evidence. Run live audits and
   inspect difficult samples.
5. **Protect grading integrity.** Never broaden accepted answers, invent provenance, or award mastery
   to Practice/tainted attempts to make an audit pass.
6. **Require independent typed-item review.** Curated typed entries must name different author and
   reviewer identities and bind approval to the current bank revision.
7. **Audio:** use `generate_assets.py`; never hand-edit `audio_map.js`.
8. **Cache discipline:** loaded-file changes require matching `CACHE_NAME` and `?v=` changes in
   `index.html` and `sw.js`, plus matching integrity pins where applicable.
9. **Alphabet progression:** use `getAlphabetProgress()` and existing helpers.
10. **One packet per PR.** Change only files assigned by the roadmap.
11. **Workers do not merge completion-roadmap PRs.** Open a draft; the designated integrator reviews,
    fixes, marks ready, and squash-merges.

The sprint-specific no-worker-merge rule overrides the general landing policy until Q2 is complete.

## Verification

Run the packet’s focused commands plus applicable full gates. Current audit families include:

- syntax and app shell;
- Words and Sentences data/foundation;
- Alphabet and full audio coverage;
- Hangul recognition and premium handwriting;
- exam integrity, Hangul exam, Core Word exams, curated Sentence-bank safety, and later Sentence exams;
- Form Checks and protected historical Sentence eligibility;
- browser acceptance, migration fixtures, and mobile-width checks;
- Android package/build checks when native or packaged assets change.

The complete command matrix is in roadmap section 9.

A learner-facing PR must include real browser evidence. Fail on `pageerror`, unhandled rejection,
blank routes, missing controls, persistence failure, and horizontal overflow. Do not report a feature
complete merely because its source exists.
