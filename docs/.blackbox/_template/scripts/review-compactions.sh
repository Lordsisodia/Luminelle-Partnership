#!/usr/bin/env bash
set -euo pipefail

# Review compactions for a plan-local memory system.
#
# From docs/:
#   ./.blackbox/scripts/review-compactions.sh --plan .blackbox/.plans/<run> --write --create-missing-review-scaffolds
#
# From repo root:
#   ./docs/.blackbox/scripts/review-compactions.sh --plan docs/.blackbox/.plans/<run> --write

here="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
docs_root="$(cd "$here/../.." && pwd)"

python3 "$docs_root/.blackbox/scripts/research/review_compactions.py" "$@"

