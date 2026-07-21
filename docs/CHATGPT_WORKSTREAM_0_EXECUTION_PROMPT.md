# ChatGPT execution order — Workstream 0: Integrity & Provenance

> **Owner instructions (not part of the prompt):** send ChatGPT this single
> message, no attachments:
>
> > Look at
> > https://raw.githubusercontent.com/CameronNel/hanapath/main/docs/CHATGPT_WORKSTREAM_0_EXECUTION_PROMPT.md
> > and execute it fully.

---

You are no longer the researcher. You are the **execution engineer** for
**Workstream 0** of the HanaPath exam programme. The planning stack you
helped produce is merged to `main`; now you build it — carefully, box by
box, in a codebase with hard conventions that are not yours to bend.

## Your governing contract

Read these on `main`, completely, before writing any code:

1. `CLAUDE.md` — the repository's hard rules. They override everything.
2. `AI_INSTRUCTIONS.md` — the working runbook.
3. **`docs/INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md`** — the spec you are
   implementing. Its §13 one-box-per-PR queue is your work plan; its §10
   audit contract and §11 browser acceptance tests are your definition of
   done.
4. `docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md` — the owner's locked
   decisions (11, 12, 15 govern this workstream). Not reopenable.
5. `docs/EXAM_TAB_HANDOVER.md` — how the shipped exam code is organised.
6. The live code you will touch: `app.js` (search
   `EXAM HUB · HANGUL MASTERY EXAMINATION`, `CORE WORD EXAMINATION SUITE`,
   `STORAGE_KEY`, `loadState`, `saveState`, `normalizeWordExams`,
   `normalizeAlphabetMasteryExam`, `TEST_ENABLE_WORD_SECTION_COMPLETION`,
   `__wetest`), plus `word_exam_blueprints.js`, `word_exam_engine.js`,
   and the audit scripts under `scripts/`.

## Non-negotiable repository rules (from CLAUDE.md — verbatim intent)

- **Vanilla static app.** No framework, no bundler, no build step, no
  `package.json`, no TypeScript, no test framework. Plain browser globals
  loaded before `app.js`.
- **Additive, backward-compatible state.** Old saves must never lose
  progress. All migration happens in load-time normalizers, idempotently.
- **Audits are the guardrails.** After your changes, ALL of these must be
  green, every box:

  ```bash
  node --check app.js sw.js   # plus any file you add/edit
  node scripts/audit-words-data.mjs --strict
  node scripts/audit-sentences-data.mjs --strict
  node scripts/audit-alphabet-audio.mjs --strict
  node scripts/audit-hangul-mastery-exam.mjs
  node scripts/audit-word-exams.mjs
  node scripts/audit-app-shell.mjs
  ```

- **Cache bumps.** If you change `app.js`, `styles.css`, or any loaded
  data file: bump `CACHE_NAME` in `sw.js` AND the matching `?v=` query
  strings in both `index.html` and `sw.js`. New loaded files join
  `APP_SHELL`. `node scripts/audit-app-shell.mjs` enforces this.
- **The Alphabet section is protected.** Do not regress it. Binding
  Hangul results to provenance (box `0C`) must leave its behaviour
  observably unchanged.
- **One box = one small draft PR** off `main`. The owner squash-merges.
  Never stack a box on an unmerged box.
- **Verify like a cold learner:** serve statically
  (`python -m http.server 8000`) and smoke-test in a browser; state lives
  in `localStorage` under `hanapath-v1`.

## The box queue (spec §13) — sequential, one PR each

| Box | Deliverable | Gate |
|---|---|---|
| `0A` | Immutable result/provenance schemas (`state.examResults`, `state.examIntegrity`), fixture states, idempotent load-time migration, and the first version of `scripts/audit-exam-integrity.mjs` covering the migration/provenance subset of spec §10 | Migration audit green; **zero UI change**; all existing audits green |
| `0B` | Taint-event model; query-gate the section-completion control behind the `?__wetest=1` precedent with the confirmation screen; taint saved **before** any completion mutation | Mutation impossible without a durably saved taint event |
| `0C` | Bind Hangul Mastery results to provenance + status labels | Hangul exam behaviour unchanged; its audit green |
| `0D` | Bind Words results, qualification, and retention to provenance/taint; Practice results never qualify | Full word-exam audit + taint fixtures green |
| `0E` | Shared result labels (`HanaPath result` / `Practice result` / `Legacy result · provenance incomplete`), exact claim/disclosure copy, import/export validation | Copy checks + browser acceptance (spec §11) green |

Box `0F` (compatibility-read cleanup) is **deferred** — do not do it now.

**Start with `0A` only.** Open its draft PR, then STOP and wait for it to
be merged before starting `0B`. Announce in each PR body which box it is,
what the spec section coverage is, and paste your audit outputs.

## Box `0A` — precise scope

Build exactly what spec §6–§7 defines, UI-invisible:

- `state.examResults` (`version: 1`, `byAttemptId`) and
  `state.examIntegrity` (`version: 1`, `taintEvents`, `resultRelations`,
  `migrationLog`) added by a load-time normalizer, backfilled safely for
  old saves, missing fields `null` — never invented.
- Migration wraps existing knowable history (the Hangul
  `state.alphabetMasteryExam` v2 record and `state.wordExams` v2 records)
  into immutable result records marked
  `legacyProvenanceStatus: "legacy-incomplete"`, preserving the raw
  originals as compatibility indexes. Idempotent: running it twice is
  byte-equivalent, no duplicate attempts.
- No existing behaviour changes: hubs, exams, unlocks, badges all render
  exactly as before. No new UI.
- `scripts/audit-exam-integrity.mjs` v1 enforcing at least spec §10
  items 15–26 and 31–32 (provenance completeness, valid statuses, unique
  attempt IDs, linkage integrity, migration idempotence/safety, index
  agreement, no silent legacy upgrade), on fixture states: fresh save,
  progressed save, old pre-exam save, save with Hangul mastery, save with
  Words mastery mid-retention-window.
- Cache bump per the rules (you are editing `app.js`).

## Binding warnings (from Claude's verification pass — heed these)

- `isWetTestModeActive()` in the spec is a **placeholder name**. When you
  reach `0B`, follow the existing code's naming conventions and the
  existing `?__wetest=1` gate implementation (search `__wetest` in
  `app.js`) rather than inventing a parallel pattern.
- The spec was written against baseline `55ac8898`; `main` has since
  gained only docs. Re-check every cited symbol against live code before
  using it; if anything drifted, flag it in the PR body — do not silently
  adapt.
- `normalizeWordExams` and `normalizeAlphabetMasteryExam` are the
  existing normalizer precedents — study both before writing yours.

## Git and PR conventions

- Branch per box off `main`: suggested `exec/workstream-0-box-0a`.
- Draft PR against `main`, titled like
  `Workstream 0 · 0A: immutable exam result provenance + migration`.
- PR body: box ID, spec sections implemented, what is deliberately NOT in
  this box, full audit command outputs, browser smoke-test notes, and a
  reference to `docs/INTEGRITY_AND_PROVENANCE_SPEC_DRAFT.md` and this
  execution order.
- Commit messages: imperative, scoped, no model IDs.
- Touch nothing outside the box's scope. If a locked requirement proves
  infeasible mid-box, stop and report in the PR — never redesign around
  it.

If you cannot push or open a PR, deliver the complete diff as
per-file Markdown code blocks with exact paths, plus the audit outputs,
and stop.
