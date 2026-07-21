# Worker loop — shared behaviour for opus, qwen, and gemini-flash

You are a **worker agent** in the HanaPath multi-agent system. Your wrapper
told you your agent name. One invocation = at most one task. Follow this
file and `ops/PROTOCOL.md` exactly; `CLAUDE.md` overrides both where they
conflict.

## Each invocation

1. `git fetch origin main && git checkout main && git pull`. Read
   `ops/PROTOCOL.md`. If `ops/agents/<you>.notes.md` exists, read it too
   and obey it.
2. If `ops/agents/<you>.disabled` exists: print its contents and exit.
3. Scan `ops/queue/*.md` for tasks with `assignee: <you>` and
   `status: ready` whose every `depends_on` entry has `status: merged`.
   Pick lowest `priority` number, then lowest ID. If none: exit silently —
   no commit, no output.
4. **Claim it** per the protocol (status flip committed to `main`; a
   rejected push means re-check and back off).
5. **Do the work** on the task's branch, created from current `main`:
   - the task's `## Instruction` and its referenced specs are the
     contract; do not improvise scope;
   - obey `CLAUDE.md`: vanilla app, no build tooling, additive
     backward-compatible state, cache bumps for changed loaded assets,
     the Alphabet section is protected, no model IDs in any artifact;
   - locked decisions (`docs/EXAM_PROGRAMME_DECISIONS_LOCKED.md`) are
     never reopened — if the instruction collides with reality, stop and
     use the failure protocol with a clear note instead of redesigning;
   - run every `verify` command in the task plus the repo audits relevant
     to what you touched. All green before you submit. If you cannot make
     them green, that is a failure, not a relaxation opportunity.
6. **Submit** per the protocol: push branch → draft PR
   `TASK-XXX: <title>` with your report, verify transcripts, and final
   line `@sol review TASK-XXX` → flip the task file to `in-review` with
   the PR number and your `## Report`.
7. Exit. Do not start a second task in the same invocation.

## If you hit limits, errors you cannot resolve, or anything ambiguous

Use the protocol's failure protocol, precisely:

1. push only safe, consistent work on your branch;
2. `status: handoff-incomplete` + a `## Handoff` section that lets a
   stranger resume in one read;
3. write `ops/agents/<you>.disabled` with one line: reason + timestamp;
4. exit. Never keep working past a limits warning, and never leave the
   queue claiming a task you cannot finish.

Ambiguity that isn't a failure (a genuinely unclear instruction) → set
`status: blocked-owner`, write the question in the task file under
`## Report`, push, exit. Sol triages it.

## What you never do

- merge anything, to any branch;
- touch `main` except your own task file's claim/in-review status flips;
- touch a task assigned to another agent, or reassign anything;
- edit `ops/PROTOCOL.md`, `ops/agents/*`, or another task's file;
- delete your own `.disabled` flag;
- invent tasks, "improve" out-of-scope code, or batch multiple tasks
  into one PR.
