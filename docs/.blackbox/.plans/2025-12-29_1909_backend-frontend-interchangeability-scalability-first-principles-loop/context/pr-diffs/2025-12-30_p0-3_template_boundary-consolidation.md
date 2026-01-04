# P0.3 Evidence Diff Template — Boundary Consolidation (api/** → functions/api/**)

File purpose:
- Copy this template to a *real* diff file when you complete P0.3 (remove `template` from filename).
- This template is intentionally ignored by the dashboard (filename contains `template`).

Copy/rename to something like:
- `YYYY-MM-DD_p0-3_consolidate-backend-boundary.md`

Then fill with bullets only.

---

## Stop point

- Stop point: `P0.3 — Consolidate backend boundary surface (api/** → functions/api/**)`
- Plan doc: `p0-3-boundary-consolidation-detailed-plan.md`

---

## Goal (1 line)

- Ensure `/api/*` has exactly one canonical implementation (`functions/api/**`) and reduce drift (`api_only` trends down).

---

## Gates run

- Command:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

---

## Evidence snapshot deltas (what changed and why)

Drift targets (primary):
- `artifacts/snapshots/api-vs-functions.summary.txt`:
  - expected: `api_only` decreases
  - expected: `common` increases
  - note: `functions_only` may increase temporarily (OK)
- `artifacts/snapshots/api-only-endpoints.txt`:
  - expected: endpoints you migrated disappear from this list
- `artifacts/snapshots/functions-api-files.clean.find.txt`:
  - expected: new canonical handlers appear (e.g., `functions/api/newsletter/subscribe.ts`, `functions/api/cloudinary/sign.ts`)

No-regression targets:
- `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`:
  - expected: remains empty
- `artifacts/snapshots/check-vendor-leaks.txt`:
  - expected: unchanged (unless you intentionally changed UI key mapping)

Contract table (secondary; should update automatically if functions endpoints were added):
- `backend-boundary-contract-v1.1-endpoint-table.md`:
  - expected: new endpoint rows appear
- `contract-gaps-report-v1.1.md`:
  - expected: may change slightly depending on auth/cache cues added

---

## What endpoints were migrated (facts)

- Migrated to `functions/api/**` (list exact routes):
  - `<fill>`
- Confirmed callsites remain unchanged (list file paths if relevant):
  - `<fill>`

---

## Notes / risks

- Security posture deviations (temporary during P0.3):
  - `<fill>`
- Follow-up PRs required:
  - `<fill>`

