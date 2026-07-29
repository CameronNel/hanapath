# AI instructions: continue HanaPath

If the user says **“continue the project,” “finish the core app,” “do this,”** or
anything equivalent, follow this file.

## The instruction

Read [`docs/CORE_APP_COMPLETION_ROADMAP.md`](docs/CORE_APP_COMPLETION_ROADMAP.md),
take the next **READY** packet you are qualified for, execute exactly that
packet, open a draft PR with the required evidence, and stop.

Do not create a new roadmap, rescue handover, continuation prompt, or private
queue. Do not merge your own packet PR. The designated integrator reviews and
merges completion-roadmap work.

## Step 0: orient

```bash
git status
git fetch origin
git log --oneline -8
gh pr list --state open
```

Then:

1. Read `AGENTS.md` and `CLAUDE.md` for hard rules.
2. Read the assigned packet in the core roadmap.
3. Read only the governing teaching/exam specifications named by that packet.
4. Re-derive every count and status claim from live `main`.
5. Confirm no other active PR owns the same files.

## Mission

Finish the existing HanaPath lessons and examinations without expanding scope.

The current core finish line is:

- protect and regression-close Alphabet and Hangul Mastery;
- regression-close Words lessons, Form Checks, Core Word v3, and valid v2
  retention compatibility;
- finalise Sentence lesson feedback, reachability, resume, audio, and migration;
- protect the 2,100 historical eligibility reviews and use only the enabled,
  independently reviewed frozen curated bank for Sentence exams;
- ship four Sentence stage exams, one final, and delayed retention;
- make all core audits and browser journeys strict and green.

Optional Words expansion, new Sentence packs, Play launch, paid activation,
ML Kit authority changes, iOS, modularisation, and time-gated compatibility
cleanup are outside the sprint.

## Packet discipline

- One roadmap packet equals one branch and one draft PR.
- Branch from fresh `origin/main` unless the packet names a different base.
- Branch name: `core/<packet-id>-<short-slug>`.
- Change only the files allowed by the packet.
- Do not absorb unrelated local changes.
- Do not edit the roadmap status table unless you are the integrator.
- If the specification does not settle a linguistic or product decision, stop
  with a clear blocker. Never guess to improve counts.

## Verification

Run every focused check named by the packet and every unaffected mandatory gate
for the files you touched. The full release matrix is in roadmap section 9, and
`node scripts/audit-core-release.mjs --full` runs the wired subset as one gate
(the `core-gate` CI job). Note: `node --check` only checks its first filename
argument, so check each edited file in its own invocation — never
`node --check a.js b.js`.

At minimum:

```bash
for file in <every edited JavaScript file>; do
  node --check "$file" || exit 1
done
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-exam-integrity.mjs
node scripts/audit-hangul-mastery-exam.mjs
node scripts/build-word-exam-competency-map.mjs --check
node scripts/audit-word-exams.mjs
node scripts/audit-form-checks.mjs
node scripts/audit-sentence-eligibility.mjs --protect-historical-evidence
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-hangul-recognition.mjs
node scripts/audit-premium-handwriting.mjs
node scripts/audit-app-shell.mjs
git diff --check
```

Learner-facing packets also require a real static-browser smoke test with
`pageerror`, unhandled rejection, route, viewport, reload, and persistence
checks. A passing Node audit is not proof that a UI feature is reachable.

## PR body contract

Every packet PR states:

- packet ID and exact scope;
- files changed;
- re-derived before/after counts;
- complete verification transcript;
- browser evidence when applicable;
- cache/version changes;
- migration and old-save impact;
- limitations or blockers;
- explicit statement that the PR is draft and unmerged for integrator review.

## Stop condition

After opening the draft PR, stop. Do not start the next packet from your branch.
The integrator verifies and merges before dependent work begins.
