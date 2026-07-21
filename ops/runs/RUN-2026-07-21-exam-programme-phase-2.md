# Run 2026-07-21 — exam programme Phase 2

## Status

- State: active
- Kickoff: 2026-07-21T21:59:41+02:00
- Baseline: `829998d0`
- Stop: queue empty, 24 hours elapsed, owner stop, or two consecutive heartbeats with every worker disabled

## Scope

Execute the seeded queue for:

- Workstream 0 boxes 0C, 0D, and 0E;
- Sentence exam A1/A2 eligibility schema, census, and four classification batches;
- Form Checks B1;
- Words past/negation production lesson C1;
- root README refresh.

The queue decomposition was reviewed at kickoff against
`docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md` and the four governing Phase 2
specifications. No new planning task is needed because the owner supplied the
fully decomposed one-box-per-PR queue.

## Dispatch plan

| Order | Agent | Tasks | Gate |
|---|---|---|---|
| 1 | opus | TASK-001 → TASK-002 | 0D waits for merged 0C |
| 1 | qwen | TASK-009 | independent |
| 1 | gemini-flash | TASK-011 | independent |
| 2 | qwen | TASK-003 | waits for merged 0D |
| 2 | opus | TASK-004 → TASK-010 | independent after higher-priority Workstream 0 tasks |
| 3 | gemini-flash | TASK-005 → TASK-006 → TASK-007 → TASK-008 | all wait for merged eligibility schema TASK-004 |

Review notes:

- Workstream 0 remains serial: 0C → 0D → 0E.
- Sentence classification workers submit `proposed`; Sol adjudicates rows at review.
- Form Checks B1 uses the seeded repository-binding correction for exact
  irregular-family and later-connective lesson routes.
- C1 must become `blocked-owner` with the exact missing strings if existing
  `audio_map.js` coverage cannot support the lesson.
- Sentence runner/UI, later Form Check boxes, Words C2+, and Workstream 0F are
  outside this run.

## Heartbeat 0 — kickoff

- Queue: 11 ready, 0 claimed, 0 in-review, 0 merged, 0 blocked-owner,
  0 handoff-incomplete.
- Runnable now: TASK-001, TASK-009, TASK-011.
- Merged this heartbeat: none.
- Blocked-owner: none.
- Orphan `task/*` branches: none.
- Agent health: opus enabled; qwen enabled; gemini-flash enabled; no disabled
  flags present.
- Worker environment: `ops/agents/WORKER_LOOP.md` and `ops/run-worker.sh`
  exist and match the current file-based claim/submit protocol.
- What happens next: worker loops claim the three runnable tasks; Sol's next
  heartbeat reviews submissions and unlocks dependency successors.

## Heartbeat 1 — 2026-07-21T22:03:00+02:00

- Queue: 11 ready, 0 claimed, 0 in-review, 0 merged, 0 blocked-owner,
  0 handoff-incomplete.
- Runnable now: TASK-001, TASK-009, TASK-011.
- Merged this heartbeat: none; no submissions were awaiting review.
- Blocked-owner: none.
- Orphan `task/*` branches: none.
- Agent health: opus enabled; qwen enabled; gemini-flash enabled; no disabled
  flags present.
- What happens next: worker loops claim the three runnable tasks; Sol's next
  heartbeat reviews any submissions and unlocks dependency successors.

## Heartbeat 2 — 2026-07-21T22:30:19+02:00

- Queue: 8 ready, 1 claimed, 0 in-review, 1 merged, 1 blocked-owner,
  0 handoff-incomplete.
- In progress: TASK-001 (claimed by opus). Runnable now: TASK-004, TASK-010.
  TASK-002/TASK-003 and
  TASK-005–TASK-008 remain dependency-gated.
- Merged this heartbeat: TASK-011 via PR #328 after confirming the docs-only
  diff, checking its claims against the live Exam implementation and handover,
  and passing `node scripts/audit-app-shell.mjs` (0 errors, 0 warnings).
- Blocked-owner: TASK-009 needs a decision on the undersized ㅎ-irregular
  pool plus target-key, gating, connective-unlock, and polite-present pool
  semantics; its task report contains the measured evidence and choices.
- Orphan `task/*` branches: none.
- Agent health: opus enabled; qwen enabled; gemini-flash enabled; no disabled
  flags present.
- What happens next: Opus completes TASK-001, then proceeds through the
  remaining runnable work; qwen waits on TASK-002 or the TASK-009 owner
  decision, and gemini-flash waits on TASK-004 before beginning eligibility
  batches.

## Heartbeat 3 — 2026-07-21T22:34:11+02:00

- Queue: 8 ready, 1 claimed, 0 in-review, 1 merged, 1 blocked-owner,
  0 handoff-incomplete.
- In progress: TASK-001 (claimed by opus). Dependency-ready work remains
  TASK-004 and TASK-010; TASK-002/TASK-003 and TASK-005–TASK-008 remain
  dependency-gated.
- Merged this heartbeat: none; no submissions were awaiting review and no
  handoff-incomplete tasks required salvage.
- Blocked-owner: TASK-009 remains parked on the four curriculum/pool decisions
  recorded in its report.
- Orphan `task/*` branches: none.
- Agent health: opus enabled; qwen enabled; gemini-flash enabled; no disabled
  flags present.
- What happens next: Opus completes TASK-001; its submission will be reviewed
  on the next heartbeat, while qwen and gemini-flash remain dependency-gated.

## Heartbeat 4 — 2026-07-21T22:36:42+02:00

- Queue: 8 ready, 1 claimed, 0 in-review, 1 merged, 1 blocked-owner,
  0 handoff-incomplete.
- In progress: TASK-001 (claimed by opus). Dependency-ready work remains
  TASK-004 and TASK-010; TASK-002/TASK-003 and TASK-005–TASK-008 remain
  dependency-gated.
- Merged this heartbeat: none; no submissions were awaiting review and no
  handoff-incomplete tasks required salvage.
- Blocked-owner: TASK-009 remains parked on the four curriculum/pool decisions
  recorded in its report.
- Orphan `task/*` branches: none.
- Agent health: opus enabled; qwen enabled; gemini-flash enabled; no disabled
  flags present.
- What happens next: Opus completes TASK-001; its submission will be reviewed
  on the next heartbeat, while qwen and gemini-flash remain dependency-gated.

## Heartbeat 5 — 2026-07-21T22:40:27+02:00

- Queue: 8 ready, 1 claimed, 0 in-review, 1 merged, 1 blocked-owner,
  0 handoff-incomplete.
- In progress: TASK-001 (claimed by opus). Dependency-ready work remains
  TASK-004 and TASK-010; TASK-002/TASK-003 and TASK-005–TASK-008 remain
  dependency-gated.
- Merged this heartbeat: none; no submissions were awaiting review and no
  handoff-incomplete tasks required salvage.
- Blocked-owner: TASK-009 remains parked on the four curriculum/pool decisions
  recorded in its report.
- Orphan `task/*` branches: none.
- Agent health: opus enabled; qwen enabled; gemini-flash enabled; no disabled
  flags present.
- What happens next: Opus completes TASK-001; its submission will be reviewed
  on the next heartbeat, while qwen and gemini-flash remain dependency-gated.

## Heartbeat 6 — 2026-07-21T22:43:30+02:00

- Queue: 8 ready, 1 claimed, 0 in-review, 1 merged, 1 blocked-owner,
  0 handoff-incomplete.
- In progress: TASK-001 (claimed by opus). Dependency-ready work remains
  TASK-004 and TASK-010; TASK-002/TASK-003 and TASK-005–TASK-008 remain
  dependency-gated.
- Merged this heartbeat: none; no submissions were awaiting review and no
  handoff-incomplete tasks required salvage.
- Blocked-owner: TASK-009 remains parked on the four curriculum/pool decisions
  recorded in its report.
- Orphan `task/*` branches: none.
- Agent health: opus enabled; qwen enabled; gemini-flash enabled; no disabled
  flags present.
- What happens next: Opus completes TASK-001; its submission will be reviewed
  on the next heartbeat, while qwen and gemini-flash remain dependency-gated.
