# PR Evidence Diff Summary Template (fill per PR)

Copy this file to a new file named:
- `context/pr-diffs/YYYY-MM-DD_pr-<number>_<short-title>.md`

Special-case (pre-PR stop point):
- For boundary consolidation (P0.3), name it:
  - `context/pr-diffs/YYYY-MM-DD_p0-3_<short-title>.md`

Then fill it out with bullets only.

---

## PR

- PR number/name:
- Goal (1 line):
- Stop point (from `pr-by-pr-stop-points-plan.md`):

---

## Gates run

- Command:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`

---

## Evidence snapshot deltas (what changed and why)

- `artifacts/snapshots/functions-api-files.clean.find.txt`:
  - expected changes:
  - unexpected changes:

- `artifacts/snapshots/api-vs-functions.summary.txt`:
  - expected changes: (P0.3 should drive `api_only` downward)

- `artifacts/snapshots/api-only-endpoints.txt`:
  - expected changes: (P0.3 should shrink this list)

- `artifacts/snapshots/functions-cart-c-catchall.ts.head200.txt`:
  - expected changes: (should generally be stable; regressions here affect checkout handoff)

- `artifacts/snapshots/functions-checkouts-catchall.ts.head200.txt`:
  - expected changes: (should generally be stable; regressions here affect checkout handoff)

- `artifacts/snapshots/functions-_lib-shopifyCheckoutProxy.ts.head240.txt`:
  - expected changes: (should generally be stable; vendor-specific changes should remain isolated here)

- `artifacts/snapshots/functions-api-auth-tenant-cues.rg.txt`:
  - expected changes:

- `artifacts/snapshots/functions-api-cache-cues.rg.txt`:
  - expected changes:

- `artifacts/snapshots/functions-api-cues.matrix.txt`:
  - expected changes:

- `backend-boundary-contract-v1.1-endpoint-table.md`:
  - expected changes:

- `contract-gaps-report-v1.1.md`:
  - expected changes:

- `artifacts/snapshots/check-vendor-leaks.txt`:
  - expected changes:

- `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`:
  - expected changes: (should generally be stable; new matches require justification or a cleanup plan)

- `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`:
  - expected changes:

- `artifacts/snapshots/platform-ports-files.txt`:
  - expected changes:

- `artifacts/snapshots/platform-runtime-files.txt`:
  - expected changes:

- `artifacts/snapshots/platform-adapters-files.txt`:
  - expected changes:

---

## Notes / risks

- Any regressions spotted:
- Follow-ups created:
