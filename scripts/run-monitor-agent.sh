#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MAX_INPROGRESS="${MAX_INPROGRESS:-10}"
SLEEP_SECONDS="${SLEEP_SECONDS:-120}"
MODEL="${MODEL:-}"

if ! command -v codex >/dev/null 2>&1; then
  echo "missing: codex (Codex CLI)" >&2
  exit 1
fi

PROMPT=''
read -r -d '' PROMPT <<'EOF' || true
You are the monitor/dispatcher agent for this repo.

Goal
- Keep 6–10 Vibe Kanban tasks actively running via MCP workspace sessions for repo `lumelle` on base branch `dev`.
- Enforce the Option-B DONE gate: a task is DONE only when its PR is merged into `dev` AND the Black Box tracker status is DONE with worklog moved to `done-issues/`.

Source of truth
- UI tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`
- Black Box process: `docs/06-quality/feedback/ui-issue-tracker/ai-loop.md`
- Status command: `node scripts/blackbox-status.mjs`

Loop logic (do this once per run)
- Reality check: run `node scripts/blackbox-status.mjs` and summarize counts + hygiene.
- Pull GitHub PR state for `dev` (open + merged recent) via `gh` CLI.
- MCP: list Vibe Kanban tasks in `todo`, `inprogress`, `inreview`, `done` for project `lumelle`.
- Ensure queue is complete:
  - For any UNTRIAGED tracker issue (esp. 181–192) with no Kanban task matching `UI-###`, create a Kanban task in `todo` with a Black Box compliant description.
- Ensure work is running:
  - If `inprogress` count < MAX_INPROGRESS, pick highest-priority `todo` tasks and start workspace sessions via MCP on repo `lumelle` base branch `dev`.
- Ensure statuses are accurate:
  - If a task is `inreview` but no PR exists, move it back to `todo` with a note.
  - Only move to `done` when BOTH merged-to-dev AND Black Box is DONE.

Output
- A short, scannable status summary (counts, which tasks started this run, any newly queued tasks).
EOF

while true; do
  echo
  echo "== AI monitor run (MAX_INPROGRESS=$MAX_INPROGRESS, SLEEP_SECONDS=$SLEEP_SECONDS) =="
  date -u +"UTC %Y-%m-%d %H:%M:%S"
  echo

  if [[ -n "$MODEL" ]]; then
    codex exec --dangerously-bypass-approvals-and-sandbox -C "$ROOT_DIR" -m "$MODEL" "$PROMPT" || true
  else
    codex exec --dangerously-bypass-approvals-and-sandbox -C "$ROOT_DIR" "$PROMPT" || true
  fi

  echo
  echo "== sleep =="
  sleep "$SLEEP_SECONDS"
done
