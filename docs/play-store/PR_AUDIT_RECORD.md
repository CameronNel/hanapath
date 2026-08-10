# Open-PR audit record — Play Store readiness branch

Evidence record, not a task queue. It states what was checked for each open pull
request at the time `codex/play-store-readiness` was prepared, what landed, and
why anything was refused. Verdicts are re-derivable with the commands shown.

Scope: every pull request open against `main` at audit time (`gh pr list
--state open`): **#370, #379, #380, #381, #382, #383, #384, #385, #386**.

## How to re-derive

```bash
gh pr view <number> --json files --jq '.files[].path'
```

Then check each path against the working tree. `PRESENT` alone does not prove
adoption — for the reimplemented PRs the behaviour, not the file, is the
contract, and each row below names the gate that proves it.

## Verdicts

| PR | Title | Verdict | Where it lives now |
|---|---|---|---|
| #370 | CB6 Sentence bank capacity remediation | **Landed** | All seven files present; `scripts/audit-sentence-exam-capacity-remediation.mjs` runs in the core gate. |
| #379 | Line-by-line error audit for PRs #1–#50 | **Not adopted** | Documentation-only retrospective covering PRs that predate this branch. Adds no runtime, data, or gate change; nothing to apply. |
| #380 | Protect learner state, onboarding, SRS, and caches | **Reimplemented** | Protections live in `app.js` (`loadState`/`saveState` recovery keys, `hasMeaningfulLearnerProgress`, the `init()` onboarding condition) instead of a monkey-patched `init`. See "Carried forward" below. |
| #381 | Make speech and study metrics truthful | **Reimplemented** | Metric relabelling and the speech-practice disclosure are inline in `app.js`; enforced by `scripts/test-runtime-truthfulness.mjs`, wired into `scripts/audit-app-shell.mjs`. |
| #382 | Harden Sentence exam fairness and feedback | **Refused (grading)** | See "Refusal detail". |
| #383 | Fail closed on exam provenance and review hashes | **Reimplemented** | `getHangulExamTaintContext` and `getWordExamTaintContext` now return `status: "practice"`, `isPractice: true`, and an `integrity-api-unavailable` flag when `exam_integrity.js` is missing, rather than silently grading as untainted. |
| #384 | Harden the free Android release surface | **Landed** | Branch commits `dbf5dbd3e`, `3041895c3`, `9f2174b97`, `a56694200`. `PremiumWritingPlugin.java` and `file_paths.xml` are deleted by design — `grep -rn "FileProvider\|file_paths" mobile/android/app/src/main` returns nothing, so the provider was unreferenced. |
| #385 | Make persistence and backups transactional | **Reimplemented** | `saveState()` writes a verified copy to `hanapath-v1-recovery` before the live key, restores the previous value on a silent write failure, and never deletes a live key on an ambiguous result. `loadState()` quarantines an unparseable payload to `hanapath-v1-corrupt` and falls back to the recovery copy. |
| #386 | Repair Words and Sentences assessment integrity | **Landed** | Branch commits `c8247ceb4`, `95f09b0f0`; gate `scripts/test-audit-words-assessment-integrity.mjs`. |

Reimplementation was chosen over merging four new top-level scripts
(`audit_runtime_truthfulness.js`, `sentence_exam_fairness.js`,
`exam_integrity_hardening.js`, `state_persistence_hardening.js`) because each
one patched already-loaded globals from a later `<script>` tag. That ordering is
fragile under the vanilla/static root contract in `CLAUDE.md` §1, and one of
them (#380) monkey-patched `init` itself.

## Refusal detail — #382

Two changes in `sentence_exam_fairness.js` broaden what a formal Sentence exam
accepts, which `CLAUDE.md` §5 prohibits:

1. `stripTerminalPunctuation()` removes `[.!?。！？]+$` before comparing a typed
   answer to its target, so a submission that omits required sentence-final
   punctuation grades as correct.
2. `acceptedTargetsFor()` collects every other bank row whose English gloss
   normalizes to the same string and adds those rows' Korean (and their
   `acceptAlso` lists) to the accepted set — a different Korean sentence is
   accepted because its translation matches.

Both are fairness-contract changes. They belong in
`docs/SENTENCE_MASTERY_EXAM_SPEC_DRAFT.md` under owner review, not in a release
branch. The non-grading parts of #382 (feedback rendering) were already covered
by `sentence_feedback.js` on `main`; `scripts/test-sentence-feedback-engine.mjs`
was updated only for the new asset revision.

## Carried forward from #380

Auditing #380 surfaced two problems that this branch fixes:

- **Rescue path deletion.** Removing `installOnboardingGuard()` from
  `alphabet_skill_srs.js` also removed `restoreRecoveredAlphabetProgress()`,
  which was the only consumer of
  `migrationRecovery.phaseOneCompletedBeforeSafetyV2`. Any live save still
  carrying an unconsumed rescue record would have kept its truncated Alphabet
  progress permanently. `migrateAlphabetProgress()` in `app.js` now consumes
  that record exactly once, before canonicalization, and stamps `restoredAt`.
- **Dead shell after onboarding.** Routing fresh installs to onboarding made
  `init()` return before it bound the bottom nav, the settings shortcut, and the
  delegated retry handlers; the onboarding start button only called
  `showTab("today")`. A new install reached the Learn hub with a non-functional
  bottom nav until the next app launch. Both paths now call `startAppShell()`.
