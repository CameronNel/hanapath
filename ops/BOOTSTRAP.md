# Bootstrap — how to run the multi-agent system

## One-time setup (owner, ~15 minutes, once ever)

1. Install and authenticate the three worker CLIs on your machine:
   Claude Code (`claude`), Qwen Code (`qwen`), Gemini CLI (`gemini`) —
   each logged in to its account and authorised for autonomous edits.
2. Clone this repo somewhere the CLIs can use, with push access.
3. `chmod +x ops/run-worker.sh`.
4. Give Sol (ChatGPT 5.6) repository access via its GitHub connector.
5. **Sol's heartbeat:** create a ChatGPT scheduled task, every 30–60
   minutes:

   > Pull CameronNel/hanapath. If ops/runs/ has a run manifest that is not
   > marked finished, act as Sol per ops/agents/SOL_ORCHESTRATOR.md:
   > process one heartbeat, then stop. If no active run exists, do nothing.

   (No scheduling available? You are the heartbeat: message Sol
   "process the queue" whenever you pass by.)

## Per-run flow (owner, ~1 minute)

1. Give Sol one message:

   > Read ops/agents/SOL_ORCHESTRATOR.md in CameronNel/hanapath and take
   > charge of the following plan. Run autonomously for 24 hours or until
   > done: <PLAN — prose, a doc link, or "the seeded queue in ops/queue/">

2. Start a terminal per worker you want active:

   ```bash
   ./ops/run-worker.sh opus
   ./ops/run-worker.sh qwen
   ./ops/run-worker.sh gemini-flash 180
   ```

3. Walk away. Catch up later by reading the newest `ops/runs/RUN-*.md`
   and answering anything Sol parked as `blocked-owner`.

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
