# Bootstrap — how to run the multi-agent system

## One-time setup (owner, ~15 minutes, once ever)

1. Install and authenticate the three worker CLIs on your machine:
   Claude Code (`claude`), Qwen Code (`qwen`), Gemini CLI (`gemini`) —
   each logged in to its account and authorised for autonomous edits.
2. Clone this repo somewhere the CLIs can use, with push access.
3. `chmod +x ops/run-worker.sh`.
4. **Sol runs through the Codex CLI** (`codex`), authenticated in this
   repo. Her heartbeat is automatic: `./ops/run-worker.sh sol 1800` polls
   like any worker and processes one heartbeat per cycle whenever an
   unfinished run manifest exists. No ChatGPT-app setup is required.
   (Alternative, if you prefer Sol in the ChatGPT app: skip the sol loop
   and create a scheduled task with the same heartbeat instruction — but
   the loop is the zero-touch default.)

## Per-run flow (owner, ~1 minute)

1. Kick off the run — one command in the repo:

   ```bash
   codex exec --full-auto "You are Sol. Read ops/agents/SOL_ORCHESTRATOR.md \
   and take charge of the following plan; perform the kickoff now (open the \
   run manifest, dispatch planning/first tasks), then stop — your heartbeat \
   loop continues from there. Plan: <PLAN — prose, a doc link, or 'the \
   seeded queue in ops/queue/'>"
   ```

2. Start the loops (tmux sessions or one terminal each):

   ```bash
   ./ops/run-worker.sh sol 1800
   ./ops/run-worker.sh opus
   ./ops/run-worker.sh qwen
   ./ops/run-worker.sh gemini-flash 180
   ```

3. Walk away. Catch up later by reading the newest `ops/runs/RUN-*.md`
   and answering anything Sol parked as `blocked-owner`. Stop the fleet
   any time: `touch ops/agents/<agent>.disabled` per agent (Sol's stop
   conditions also end runs on their own).

## Who maintains what

- **Sol maintains everything inside `ops/`** except this file's one-time
  steps: the protocol, worker behaviour, per-agent notes, kill-switch
  flags, wrapper script, queue, and manifests. Workers re-read all of it
  every cycle, so Sol's commits reconfigure the fleet without you.
- **You maintain only:** the three terminal loops (start/restart them when
  Sol's manifest asks), CLI logins, and `blocked-owner` answers.
- **An agent that dies** (limits, crash) leaves `status:
  handoff-incomplete` + `ops/agents/<agent>.disabled` and its loop stops.
  Sol salvages the work. To bring the agent back: delete its `.disabled`
  file and rerun its loop.

## Safety properties you can rely on

- Only Sol merges to `main`; workers only add `task/*` branches and flip
  their own task statuses.
- Nothing merges with a red audit — the merge gate in `ops/PROTOCOL.md`
  is mechanical.
- Owner-gated decisions (locked exam decisions, new Korean content
  themes, audio-pipeline runs, anything outward-facing) always stop at
  `blocked-owner` — the fleet never spends your money or your judgement.
