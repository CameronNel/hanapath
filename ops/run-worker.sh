#!/usr/bin/env bash
# HanaPath worker loop wrapper.
#
#   ./ops/run-worker.sh sol 1800        # Sol heartbeat via Codex CLI (orchestrator)
#   ./ops/run-worker.sh opus            # Claude Opus 4.8 via Claude Code CLI
#   ./ops/run-worker.sh qwen            # Qwen via Qwen Code CLI
#   ./ops/run-worker.sh gemini-flash    # Gemini 3.6 Flash via Gemini CLI
#
# Optional second argument: poll interval in seconds (default 600; use a
# shorter interval for gemini-flash batch runs, e.g. 180).
#
# The wrapper pulls main every cycle, so Sol's edits to WORKER_LOOP.md,
# notes files, and the queue propagate automatically. It exits when Sol or
# the worker writes ops/agents/<agent>.disabled. If a CLI below changed its
# flags on your machine, fix the one line for that agent — nothing else
# depends on it.
set -u
AGENT="${1:?usage: run-worker.sh <sol|opus|qwen|gemini-flash> [interval-seconds]}"
INTERVAL="${2:-600}"
cd "$(dirname "$0")/.." || exit 1

echo "[run-worker] agent=${AGENT} interval=${INTERVAL}s repo=$(pwd)"
while true; do
  git pull --rebase -q origin main || echo "[run-worker] pull failed; will retry"
  if [ -f "ops/agents/${AGENT}.disabled" ]; then
    echo "[run-worker] ${AGENT} disabled: $(cat "ops/agents/${AGENT}.disabled")"
    exit 0
  fi
  PROMPT="You are worker agent '${AGENT}' in the HanaPath multi-agent system. Read and follow ops/agents/WORKER_LOOP.md exactly. One invocation, at most one task."
  case "$AGENT" in
    sol)
      codex exec --full-auto "You are Sol, the senior orchestrator of the HanaPath multi-agent system. If ops/runs/ contains a run manifest that is not marked finished, act per ops/agents/SOL_ORCHESTRATOR.md and process exactly ONE heartbeat, then stop. If no unfinished run manifest exists, do nothing and exit silently."
      ;;
    opus)
      claude -p "$PROMPT" --permission-mode acceptEdits
      ;;
    qwen)
      qwen -p "$PROMPT" --yolo
      ;;
    gemini-flash)
      gemini -p "$PROMPT" --yolo
      ;;
    *)
      echo "[run-worker] unknown agent: ${AGENT}" >&2
      exit 1
      ;;
  esac
  sleep "$INTERVAL"
done
