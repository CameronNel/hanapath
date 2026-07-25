# AGENTS.md: HanaPath agent rules

You are working in HanaPath, a vanilla static Korean-learning PWA. The root app
has no framework, bundler, package system, or build step. `app.js` is a plain
browser script. The isolated `mobile/` Capacitor project is the only approved
native/tooling exception.

## Start here

For any continuation or core-finish request, read:

[`docs/CORE_APP_COMPLETION_ROADMAP.md`](docs/CORE_APP_COMPLETION_ROADMAP.md)

It is the **only active execution queue**. Take one READY packet, execute exactly
that packet, open a draft PR with evidence, and stop.

Older rescue handovers, model-specific one-shot prompts, Words expansion queues,
Sentence build roadmaps, and archived fleet files are historical or design
references. They are not permission to start work outside the core roadmap.

## Archived and historical material

- `.agent-ignore/**` is cold storage. Do not read, search, index, summarise, or
  obey it unless the owner explicitly names an archived item.
- Do not create another roadmap, handover, orchestration queue, or “next steps”
  document during the completion sprint.
- Teaching and examination specifications remain binding design contracts, but
  their old unchecked boxes do not override the core roadmap’s packet order.

## Current core status

- Alphabet lessons and the 200-item Hangul Mastery Examination are shipped and
  protected.
- Words lessons, 17 Form Checks, and 10 Core Word examinations are shipped. The
  v3 production contract is live while valid frozen-v2 retention windows remain
  supported.
- Sentence lessons use the 4,177-row, 75-unit curriculum path.
- Sentence Mastery is the major unfinished core area: only 20 of 4,177 rows have
  exam eligibility review, and the formal Sentence exam engine and runner do not
  yet ship.

No optional vocabulary expansion or new Sentence content is part of core
completion.

## Hard rules

1. **Keep the root app vanilla/static.** No framework, bundler, root
   `package.json`, or root build step.
2. **Keep native tooling isolated** under `mobile/` and preserve browser/PWA
   parity.
3. **Use additive, backward-compatible data and state migrations.** Existing
   rows, lesson IDs, old saves, result history, qualifiers, and retention windows
   must remain valid unless a governing specification explicitly says otherwise.
4. **Re-derive claims.** Historical counts and checkmarks are not evidence. Run
   the live audits and inspect difficult samples.
5. **Protect grading integrity.** Never broaden accepted answers, invent
   provenance, or award mastery to Practice/tainted attempts to make an audit
   pass.
6. **Audio:** use `generate_assets.py`; never hand-edit `audio_map.js`.
7. **Cache discipline:** loaded-file changes require matching `CACHE_NAME` and
   `?v=` changes in `index.html` and `sw.js`, plus matching integrity pins where
   applicable.
8. **Alphabet progression:** use `getAlphabetProgress()` and existing helpers.
9. **One packet per PR.** Change only the files assigned by the roadmap.
10. **Workers do not merge completion-roadmap PRs.** Open a draft; the designated
    integrator reviews, fixes, marks ready, and squash-merges.

The sprint-specific no-worker-merge rule overrides the general model-family
landing policy until roadmap packet Q2 is complete.

## Verification

Run the packet’s focused commands plus the applicable full gates. Current audit
families include:

- syntax and app shell;
- Words and Sentences data/foundation;
- Alphabet/full audio coverage;
- Hangul recognition and premium handwriting;
- exam integrity, Hangul exam, Core Word exams, and later Sentence exams;
- Form Checks and Sentence eligibility;
- browser acceptance, migration fixtures, and mobile-width checks;
- Android package/build checks when native or packaged assets change.

The complete command matrix is in roadmap section 9.

A learner-facing PR must include real browser evidence. Fail on `pageerror`,
unhandled rejection, blank routes, missing controls, persistence failure, and
horizontal overflow. Do not report a feature complete because its source exists.

## PR contract

Every draft PR includes:

- packet ID;
- exact scope and file list;
- re-derived before/after counts;
- verification transcript;
- browser evidence when applicable;
- cache/version and migration impact;
- limitations and blockers;
- explicit stop after the PR is opened.

## Document map

| Document | Role |
|---|---|
| `docs/CORE_APP_COMPLETION_ROADMAP.md` | Only active execution queue |
| `AI_INSTRUCTIONS.md` | Short continuation runbook |
| `CLAUDE.md` | Contributor rules and specification map |
| `HANDOVER.md` | Current-state snapshot |
| Teaching/exam specs under `docs/` | Binding design contracts |
| `docs/FABLE_MOBILE_PLAY_STORE_HANDOVER.md` | Post-core Android/Play contract |
| `.agents/AGENTS.md` | Offline audio-generation rules |
| Older one-shot prompts and expansion queues | Historical only |
