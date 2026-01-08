#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== lumelle: monitor snapshot =="
date -u +"UTC %Y-%m-%d %H:%M:%S"
echo

echo "== repo quick status =="
./scripts/status.sh --quick || true
echo

if command -v gh >/dev/null 2>&1; then
  echo "== GitHub PRs (base: dev, open) =="
  gh pr list --base dev --state open --limit 50
  echo

  echo "== GitHub PRs (base: dev, merged recent) =="
  gh pr list --base dev --state merged --limit 20
  echo
else
  echo "== GitHub PRs =="
  echo "missing: gh (GitHub CLI)"
  echo
fi
