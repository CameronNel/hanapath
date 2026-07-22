# HanaPath multi-agent protocol

> The coordination contract for autonomous multi-agent runs. The repository
> is the message bus: task files are commands, PRs are submissions, statuses
> are state. Every agent reads this file before acting. **Sol** (the
> orchestrator) is the only agent that merges to `main` (except the two
> narrow worker exceptions below).

## Roles

| Agent | Role | Powers |
|---|---|---|
| **sol** | Senior orchestrator & reviewer (ChatGPT 5.6 Sol) | Writes/edits task files, reviews PRs, pushes fix commits to task branches, squash-merges to `main`, dispatches new work, files issues, edits any `ops/` file |
| **opus** | Heavy engineering (Claude Opus 4.8) | Executes assigned tasks; PRs only |
| **qwen** | General engineering (Qwen, terminal) | Executes assigned tasks; PRs only |
| **gemini-flash** | High-volume/batch work (Gemini 3.6 Flash) | Executes assigned tasks; PRs only |

Workers never merge, never touch another agent's task, never self-assign,
and push to `main` **only** for the two protocol commits: a claim flip and
an in-review flip of their own task file. Everything else goes on a
`task/*` branch.

## Task files — `ops/queue/TASK-XXX-slug.md`

```markdown
---
id: TASK-014
title: Short imperative title
assignee: gemini-flash
status: ready
branch: task/014-slug
depends_on: []          # task IDs that must be status merged first
verify:                  # commands that must pass before submission
  - node --check app.js
priority: 2              # 1 = do first
claimedAt: null
pr: null
---
## Instruction
What to do, with exact file paths and governing-doc references.
Reference specs; do not duplicate them.

## Report
(appended by the worker at submission: what was done, verify output summary)

## Handoff
(only if the worker died mid-task: done / not done / exact next step)
```

### Status lifecycle

```text
ready → claimed → in-review → merged
                      ↘ changes-requested → in-review
claimed → handoff-incomplete   (worker hit limits/failure)
any     → blocked-owner        (needs a human decision; Sol parks it)
any     → cancelled            (Sol only)
```

Only Sol sets `merged`, `changes-requested`, `blocked-owner`, `cancelled`.

## Worker lifecycle (the loop)

1. `git pull` main. If `ops/agents/<you>.disabled` exists → exit.
2. Find the lowest-priority-number, oldest `ready` task with
   `assignee: <you>` whose `depends_on` are all `merged`. None → exit
   silently.
3. **Claim:** set `status: claimed` + `claimedAt`, commit
   `TASK-XXX: claim (<you>)` directly to `main`, push. If the push is
   rejected, pull and re-check — if the task is no longer `ready`, back
   off and exit. The successful push is the lock.
4. **Execute** on `branch` (create from current `main`). Obey `CLAUDE.md`
   completely: vanilla app, additive state, cache bumps, protected
   Alphabet, no model IDs in any artifact. Run every `verify` command
   plus any repo audit relevant to what you touched — all green before
   submitting.
5. **Submit:** push the branch; open a **draft PR** titled
   `TASK-XXX: <title>` whose body contains your report, verify
   transcripts, and, as the final line, the review command
   `@sol review TASK-XXX`. Then flip the task file on `main`:
   `status: in-review`, `pr: <number>`, append `## Report`. Commit
   `TASK-XXX: submit for review`, push (same rejection rule as claims).
   If you cannot open a PR from your environment, push the branch and
   flip to in-review anyway — Sol's heartbeat opens PRs for orphan
   branches.
6. Exit. Your wrapper re-invokes you next cycle.

### Token-exhaustion / failure protocol

If you detect imminent limits or cannot finish:

1. Commit and push whatever is **safe and consistent** on your branch
   (never half-edited state that breaks `node --check`).
2. Set `status: handoff-incomplete` and fill `## Handoff` (what is done,
   what is not, the exact next command). Push to `main`.
3. Write `ops/agents/<you>.disabled` containing one line: the reason and
   timestamp. Commit and push.
4. Exit. Your wrapper sees the flag and stops relaunching you. Only Sol
   or the owner deletes a `.disabled` flag.

## Sol's review contract

For every `in-review` task: check out the branch, review the diff against
the task instruction and the governing specs, **run the merge gate**, fix
shortcomings by pushing commits to the branch yourself, squash-merge with
title `TASK-XXX: <title> (#PR)`, flip `status: merged`, and dispatch any
now-unblocked dependents. If the work is unsalvageable, set
`changes-requested` with review comments and reset `status: ready` after
the worker's next attempt window, or reassign.

### Merge gate (mechanical — never skipped)

All of the following must pass on the branch before any merge that touches
app code or learning data:

```bash
node --check app.js sw.js               # plus every touched JS file
node scripts/audit-exam-integrity.mjs
node scripts/audit-hangul-mastery-exam.mjs
node scripts/audit-word-exams.mjs        # full seeds when exam data/engine touched
node scripts/audit-words-data.mjs --strict
node scripts/audit-sentences-data.mjs --strict
node scripts/audit-alphabet-audio.mjs --strict
node scripts/audit-app-shell.mjs
```

Docs-only diffs need none of these. A red audit is an automatic
`changes-requested` — no exceptions, including for Sol's own fixes.

## Run manifests — `ops/runs/RUN-<date>-<slug>.md`

Sol opens one per run (owner instruction) and updates it every heartbeat:
queue counts by status, merges this heartbeat, blocked-owner items, agent
health (disabled flags), and a one-line "what happens next". This file is
the owner's single place to catch up.

## Hard rules for every agent

- `CLAUDE.md` overrides everything here where they conflict.
- Locked decisions (`docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md`) are never
  reopened; infeasibility goes to `blocked-owner` with evidence.
- Immutable history: never rewrite merged work, published results, or
  another agent's commits; fixes are new commits.
- No model IDs, marketing names, or session links in code, commits kept
  on `main`, or docs (chat/PR bodies excepted).
- When in doubt: park it `blocked-owner`. A parked task costs an hour; a
  wrong autonomous decision costs a rollback.
