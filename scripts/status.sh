#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

RUN_CI=0
for arg in "${@:-}"; do
  case "$arg" in
    --ci) RUN_CI=1 ;;
    --quick) RUN_CI=0 ;;
    *)
      echo "Unknown arg: $arg" >&2
      echo "Usage: ./scripts/status.sh [--quick] [--ci]" >&2
      exit 2
      ;;
  esac
done

echo "== lumelle: status =="
echo

echo "== git (current) =="
git status -sb || true
echo

echo "== git (diff summary) =="
git diff --stat || true
echo

echo "== git (recent commits) =="
git log -10 --oneline --decorate || true
echo

echo "== docs blackbox (tasks) =="
if [[ -f "docs/.blackbox/tasks.md" ]]; then
  sed -n '1,160p' docs/.blackbox/tasks.md
else
  echo "missing: docs/.blackbox/tasks.md"
fi
echo

echo "== docs blackbox (recent plans) =="
ls -1dt docs/.blackbox/.plans/* 2>/dev/null | head -n 12 || echo "no plans found"
echo

echo "== UI tracker blackbox status =="
if [[ -f "scripts/blackbox-status.mjs" ]]; then
  node scripts/blackbox-status.mjs || true
else
  echo "missing: scripts/blackbox-status.mjs"
fi
echo

echo "== CI-like checks =="
if [[ "$RUN_CI" -eq 0 ]]; then
  echo "Tip: run full checks when you need high confidence:"
  echo "  ./scripts/status.sh --ci"
  echo
  echo "Or run individually:"
  echo "  npm run validate:tokens"
  echo "  npm run lint:tokens"
  echo "  npm run lint"
  echo "  npm run typecheck"
  echo "  npm run build"
  exit 0
fi

run_check() {
  local label="$1"
  shift
  local exit_code=0
  if "$@" >/dev/null 2>&1; then
    printf "%-24s %s\n" "$label" "OK"
  else
    exit_code=$?
    printf "%-24s %s (exit %s)\n" "$label" "FAIL" "$exit_code"
  fi
}

echo "Running (this matches CI order):"
run_check "validate:tokens" npm run --silent validate:tokens
run_check "lint:tokens" npm run --silent lint:tokens
run_check "lint" npm run --silent lint
run_check "typecheck" npm run --silent typecheck
run_check "build" npm run --silent build
