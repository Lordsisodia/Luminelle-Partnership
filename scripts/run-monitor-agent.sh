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

PROMPT=$(cat <<'EOF'
You are the monitor/dispatcher agent for this repo.

Goal:
- Keep 6–10 Vibe Kanban tasks actively running via MCP workspace sessions for repo `lumelle` on base branch `dev`.
- Enforce the Option-B DONE gate: a task is DONE only when (1) its PR is merged into `dev` AND (2) Black Box tracker status is DONE with worklog moved to `done-issues/`.

Source of truth:
- UI tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`
- Black Box process: `docs/06-quality/feedback/ui-issue-tracker/ai-loop.md`
- Status command: `node scripts/blackbox-status.mjs`

Loop logic (do this once per run):
1) Reality check: run `node scripts/blackbox-status.mjs` and summarize counts + hygiene.
2) Pull GitHub PR state for `dev` (open + merged recent) via `gh` CLI.
3) MCP: list Vibe Kanban tasks in `todo`, `inprogress`, `inreview`, `done` for project `lumelle`.
4) Ensure queue is complete:
   - For any UNTRIAGED tracker issue (esp. 181–192) that has no Kanban task matching `UI-###`, create a Kanban task in `todo` with a Black Box compliant description.
5) Ensure work is running:
   - If `inprogress` count < MAX_INPROGRESS, pick highest-priority `todo` tasks (prefer P5/P6 then triage batches) and start workspace sessions via MCP on repo `lumelle` base branch `dev`.
6) Ensure statuses are accurate:
   - If a task is `inreview` but no PR exists, move it back to `todo` with a note.
   - If a task is `inprogress` but has no activity and no PR, keep it `inprogress` but add a note about what’s missing.
   - Only move to `done` when BOTH merged-to-dev AND Black Box is DONE (tracker + moved worklog).

Output:
- A short, scannable status summary (counts, which tasks started this run, any newly queued tasks).
EOF
)

while true; do
  echo
  echo "== AI monitor run (MAX_INPROGRESS=$MAX_INPROGRESS, SLEEP_SECONDS=$SLEEP_SECONDS) =="
  date -u +"UTC %Y-%m-%d %H:%M:%S"
  echo

  if [[ -n "$MODEL" ]]; then
    codex exec -s danger-full-access -a never -C "$ROOT_DIR" -m "$MODEL" "$PROMPT" || true
  else
    codex exec -s danger-full-access -a never -C "$ROOT_DIR" "$PROMPT" || true
  fi

  echo
  echo "== sleep =="
  sleep "$SLEEP_SECONDS"
done

