# NEXT (what to do next, in order)

Use this file when you come back after a break and you’re asking:
- “What are we doing?”
- “What’s next?”

This plan is **docs-first + evidence-first**:
- We only touch `src/**` / `functions/**` when a stop point is actively being executed.
- Every execution step ends by refreshing the gates so the dashboard remains the source of truth.

---

## Step 0 — Refresh evidence (always first)

From `docs/`:

- Run: `./.blackbox/scripts/run-1909-loop.sh`
- Read the dashboard: `stop-point-status-dashboard.md`
- Read the raw metric snapshot: `artifacts/snapshots/stop-point-metrics.latest.txt`

Why:
- The dashboard is the single “what should we do next?” signal and it is generated from the refreshed evidence bundle.  
  Source: `stop-point-status-dashboard.md`

---

## Step 1 — Confirm the top blocker (dashboard decides)

Expected current recommendation:
- Read it from: `stop-point-status-dashboard.md`
- Read the raw metrics from: `artifacts/snapshots/stop-point-metrics.latest.txt`

Current state (as of the latest gate refresh):
- Vendor leaks above adapters: fixed (`vendor_leaks_disallowed_lines=0`)  
  Evidence: `artifacts/snapshots/check-vendor-leaks.txt`
- Contract gaps (cache headers): fixed (`contract_gaps_missing_cache=0`)  
  Evidence: `contract-gaps-report-v1.1.md`, `artifacts/snapshots/stop-point-metrics.latest.txt`
- Backend boundary drift still exists (cleanup remaining): `backend_surface_api_only_endpoints=13`  
  Evidence: `artifacts/snapshots/api-vs-functions.summary.txt`, `artifacts/snapshots/stop-point-metrics.latest.txt`

Where this is defined:
- The detailed plan: `p0-3-boundary-consolidation-detailed-plan.md`
- The evidence drift summary: `artifacts/snapshots/api-vs-functions.summary.txt`
- The “what the UI actually calls” usage scan: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

Why this is the highest-leverage move:
- You don’t have a stable backend boundary if the repo has two competing `/api/*` implementations.  
  Evidence: `artifacts/snapshots/api-vs-functions.summary.txt`

---

## Step 2 — Keep docs stable (avoid plan sprawl)

Rule:
- If you need to clarify anything, update an existing canonical doc, don’t create a new one.

Canonical index:
- `CANONICAL.md`

---

## Step 3 — If the dashboard recommends P0.3 (cleanup): finish consolidating api/** drift

Notes:
- The initial thin-slice is already executed:
  - `context/pr-diffs/2025-12-31_p0-3_consolidate-backend-boundary-thin-slice.md`
- Remaining drift is now primarily “not referenced from src/**”, so treat it as cleanup unless scripts/ops depend on it.  
  Evidence: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

Where the exact contracts + migration recipes are recorded:
- `p0-3-boundary-consolidation-detailed-plan.md`

How to prove progress after implementing:
- Run the gate pack and confirm expected deltas:
  - `pr-stop-point-gate-pack.md`
  - Dashboard refresh: `stop-point-status-dashboard.md`
  - Drift summary should trend down: `artifacts/snapshots/api-vs-functions.summary.txt`

Stop condition:
- If `backend_surface_api_only_endpoints` trends down and `backend_surface_api_only_endpoints_used_by_src` stays `0`, keep going.  
  Evidence: `artifacts/snapshots/stop-point-metrics.latest.txt`

---

## Step 4 — Contract work (what’s next after cache + vendor leak fixes)

Already executed (evidence-backed):
- PR2 (auth guards): `context/pr-diffs/2025-12-31_pr-002_auth-guards-admin-metrics-orders.md`
- PR4 (cache headers): `context/pr-diffs/2025-12-31_pr-004_cache-headers-public-endpoints.md`
- PR7 (vendor key mapping): `context/pr-diffs/2025-12-31_pr-007_vendor-key-mapping.md`

Next contract-centric stop point (still outstanding):
- PR3 (tenant resolution wiring): `pr-3-tenant-resolution-detailed-plan.md`

Why this sequence:
- Without auth/tenant/cache being consistent, “frontend swappable” is theoretical (a new UI can’t safely integrate).

Contract gap evidence:
- `contract-gaps-report-v1.1.md`

---

## Step 5 — Provider swap readiness (after tenant resolution)

- PR7 (vendor key mapping; vendor leaks → 0): complete  
  Evidence: `context/pr-diffs/2025-12-31_pr-007_vendor-key-mapping.md`, `artifacts/snapshots/check-vendor-leaks.txt`
- PR9 (Clerk coupling localized; make identity swappable): `pr-9-identity-decoupling-detailed-plan.md`

Evidence gates:
- Vendor leak baseline + target: `artifacts/snapshots/check-vendor-leaks.txt`
- Vendor SDK drift baseline: `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`
