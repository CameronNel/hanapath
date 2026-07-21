# Gemini final megabatch

You are the sole implementation worker for the remaining HanaPath fleet run.
The owner explicitly authorizes one consolidated batch; do not stop after one
task and do not wait for dependency-by-dependency dispatch.

1. Read `AI_INSTRUCTIONS.md`, `ops/PROTOCOL.md`, every unfinished task in
   `ops/queue/`, the active run manifest, and all specification files those
   tasks cite.
2. Resume the existing `task/gemini-final-megabatch` worktree exactly as it
   stands. Preserve every tracked modification already present. If the branch
   does not yet exist, create it from `origin/main`; never reset or discard
   existing megabatch work.
3. Incorporate the complete work from the existing draft branches/PRs:
   `task/001-hangul-provenance` (#329),
   `task/004-sentence-eligibility-schema` (#330), and
   `task/010-past-negation-lesson` (#331). Resolve cache/version conflicts as
   one coherent final state. Inspect the preserved Sol review worktree at
   `C:/Users/Camer/OneDrive/Documents/Korean-gemini-android-sol-review-001`
   and incorporate its valid uncommitted TASK-001 review fixes.
4. Complete every remaining unfinished queue item in this same branch:
   TASK-002, TASK-003, TASK-005, TASK-006, TASK-007, TASK-008, and TASK-009.
   TASK-009's former owner block is explicitly lifted for this run: make the
   safest spec-compliant resolution, document the actual eligible inventory,
   and never fabricate data merely to satisfy a numeric target.
5. Fix the Android check failure inherited from PR #331. Keep the root app
   vanilla/static, preserve backward compatibility, follow cache-bump rules,
   and regenerate audio only if the governing instructions require it.
6. Run every verification command required by all included task files and
   `AGENTS.md`, including strict data audits, app-shell checks, JS syntax
   checks, targeted smoke tests, and the Android check/build relevant to
   PR #331. Do not substitute quick audits where a full audit is required.
7. Commit the complete coherent result, push `task/gemini-final-megabatch`,
   and open exactly one consolidated draft PR against `main`. Update all
   included queue reports/statuses to reference that PR. Do not merge it.
8. Print a concise final report with commit, PR, files/features delivered,
   verification results, and any remaining risk. Then stop.

Work autonomously and use best judgment. This is one large batch, not seven
separate task invocations or PRs.
