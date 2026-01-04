---
compaction: 0002
created_at: "2025-12-30 23:12"
range: "0011-0020"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0002 (0011–0020)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0011_checkpoint-update-auth-evidence-link-pr2-plan.md

---
step: 0011
created_at: "2025-12-30 21:32"
title: "Checkpoint: Update auth evidence + link PR2 plan"
---

# Step 0011: Checkpoint: Update auth evidence + link PR2 plan

## ✅ What I did (facts)

- Fixed the contract evidence heuristic to treat `requireInternalAuth(` as an auth cue:
  - updated script: `docs/.blackbox/scripts/refresh-1909-contract-evidence.sh`
- Refreshed gate outputs so the plan evidence reflects the fixed heuristic:
  - `./.blackbox/scripts/refresh-1909-contract-evidence.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
- Wrote an implementation-ready plan for PR 2 (“wire auth guards into admin/metrics/orders”) with explicit endpoint list + UI coordination notes:
  - `pr-2-auth-guards-detailed-plan.md`
- Reduced plan drift by aligning “contract v0” references → “contract v1” across execution/scaling/runbook docs:
  - `migration-stages.md`
  - `tenant-2-onboarding-runbook.md`
  - `scalability-plan.md`
  - `tenancy-context-rules.md`
  - `api-endpoints-to-ports-map.md`
  - `final-report.md`
- Regenerated plan snapshots that are used as evidence anchors by other docs:
  - `artifacts/snapshots/plan-tenancy-context-rules.md.head120.txt`
  - `artifacts/snapshots/plan-scalability-plan.md.head120.txt`
  - `artifacts/snapshots/plan-migration-stages.md.head120.txt`
  - `artifacts/snapshots/plan-backend-boundary-contract-v1.md.head120.txt`

## 🧠 What I learned (new information)

- The auth-gaps report had false positives because `requireInternalAuth` did not match the old auth cue regex; fixing this drops “missing auth cues” from 17 → 13 (Δ -4): `stop-point-status-dashboard.md`
- The remaining “missing auth cues” are now concentrated in `admin/orders/**`, `metrics/**`, and `orders/**` (not exports/admin sections): `contract-gaps-report-v1.1.md`
- The admin UI already has a compatible “manual bearer pass” pattern in one area (content sections), but admin orders calls do not send Authorization headers:
  - `artifacts/snapshots/src-domains-admin-pages-ui-pages-ContentPage.tsx.head260.txt`
  - `artifacts/snapshots/src-domains-admin-orders-data-adminOrdersApi.ts.head220.txt`

## 🧭 What changes because of this

- The stop-point dashboard and gaps report are now a more reliable guide for “what to implement next”, because endpoints already guarded by `requireInternalAuth` no longer appear as auth gaps.
- PR 2 scope is clearer and smaller (wire internal/admin auth into only the remaining 13 endpoints + update the admin UI client to send headers), so it’s less risky to start implementation when code changes are allowed.

## ➡️ Next step

- If/when code changes are allowed: implement PR 2 using `pr-2-auth-guards-detailed-plan.md`, then re-run:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- If staying docs-only: tighten PR 3 tenant-resolution wiring plan by enumerating exactly which endpoint families must resolve tenant context and how cache keys/Vary headers are set (grounded in `backend-boundary-contract-v1.md` + v1.1 endpoint table).

## 🔗 Links / references

- Gaps + dashboard:
  - `contract-gaps-report-v1.1.md`
  - `stop-point-status-dashboard.md`
- PR 2 plan:
  - `pr-2-auth-guards-detailed-plan.md`
- Gate scripts:
  - `docs/.blackbox/scripts/refresh-1909-contract-evidence.sh`
  - `docs/.blackbox/scripts/refresh-1909-all-gates.sh`

---

### 0012_checkpoint-pr3-pr4-plans-cache-heuristics.md

---
step: 0012
created_at: "2025-12-30 21:54"
title: "Checkpoint: PR3 + PR4 plans, cache heuristics"
---

# Step 0012: Checkpoint: PR3 + PR4 plans, cache heuristics

## ✅ What I did (facts)

- Created a detailed, implementation-ready PR 3 plan for tenant resolution wiring across tenant-scoped endpoints:
  - `pr-3-tenant-resolution-detailed-plan.md`
- Created a detailed, implementation-ready PR 4 plan for cache header normalization on public endpoints:
  - `pr-4-cache-headers-detailed-plan.md`
- Generated/updated scope snapshot lists used as audit evidence:
  - PR 3 scope list: `artifacts/snapshots/pr3-tenant-scoped-endpoints.list.txt`
  - PR 4 cache gaps list: `artifacts/snapshots/pr4-cache-missing-endpoints.list.txt`
- Improved the contract evidence generator to be more semantically correct:
  - Fixed experiment endpoint classification so `experiment/track` is treated as `no-store` (not edge-cacheable).
  - Refined cache gap detection to require an explicit cache policy (`Cache-Control` / TTL helpers), not just the presence of an `ETag`.
  - Updated script: `docs/.blackbox/scripts/refresh-1909-contract-evidence.sh`
- Captured missing “public endpoint” heads as evidence for the cache policy work:
  - `artifacts/snapshots/functions-api-storefront-landing-sections.ts.head220.txt`
  - `artifacts/snapshots/functions-api-storefront-product-by-handle.ts.head220.txt`
  - `artifacts/snapshots/functions-api-storefront-product-sections.ts.head220.txt`
  - `artifacts/snapshots/functions-api-experiment-config.ts.head220.txt`
  - `artifacts/snapshots/functions-api-experiment-track.ts.head220.txt`
- Updated plan indices to link PR 3/4 plans from the canonical entrypoints:
  - `START-HERE.md`, `CANONICAL.md`, `artifact-map.md`, `pr-by-pr-stop-points-plan.md`, `pr-stop-point-gate-pack.md`
- Refreshed evidence outputs + dashboard:
  - `contract-gaps-report-v1.1.md`
  - `stop-point-status-dashboard.md`

## 🧠 What I learned (new information)

- The cache “gaps” signal was previously under-reporting real issues: `experiment/config` had `ETag` support but no explicit cache policy, so it should be treated as a cache-policy gap for an edge-cacheable endpoint.
- Separating “ETag exists” from “explicit Cache-Control exists” makes PR 4 measurable and prevents false confidence from heuristic scans.

## 🧭 What changes because of this

- PR 3 and PR 4 are now “implementation-ready” in the same way PR 2 is: they have explicit scope lists, acceptance checks, and expected evidence deltas.
- The dashboard’s cache-gap count may increase in the short term, but it’s now a more accurate reflection of what must be fixed for a swappable, scalable frontend/backend boundary.

## ➡️ Next step

- Keep the implementation sequencing: PR 2 → PR 3 → PR 4 (auth, then tenancy wiring, then caching), re-running:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- Optional docs-only follow-up: tighten PR 5/6 (tenant tables + tenant integration lookup) into detailed plans using the same “scope list + acceptance deltas” pattern.

## 🔗 Links / references

- Plans:
  - `pr-2-auth-guards-detailed-plan.md`
  - `pr-3-tenant-resolution-detailed-plan.md`
  - `pr-4-cache-headers-detailed-plan.md`
- Evidence + dashboards:
  - `contract-gaps-report-v1.1.md`
  - `stop-point-status-dashboard.md`
  - `artifacts/snapshots/_snapshot-index.ls.txt`

---

### 0013_checkpoint-pr5-pr6-multitenancy-plans.md

---
step: 0013
created_at: "2025-12-30 22:00"
title: "Checkpoint: PR5/PR6 multitenancy plans"
---

# Step 0013: Checkpoint: PR5/PR6 multitenancy plans

## ✅ What I did (facts)

- Created a detailed PR 5 plan for adding Supabase tenancy configuration tables (keeps runtime behavior unchanged for tenant #1):
  - `pr-5-tenancy-tables-detailed-plan.md`
- Created a detailed PR 6 plan for moving provider configuration from env vars → `tenant_integrations` (and secrets via `secret_ref`):
  - `pr-6-tenant-integration-config-lookup-detailed-plan.md`
- Captured an evidence snapshot of where/how functions currently call Supabase (tables + RPCs touched today):
  - `artifacts/snapshots/functions-supabase-calls.rg.txt`
- Updated plan entrypoints/indices to link PR 5/6 plans:
  - `START-HERE.md`
  - `CANONICAL.md`
  - `artifact-map.md`
  - `pr-by-pr-stop-points-plan.md`
  - `pr-stop-point-gate-pack.md`
  - `artifacts/next-actions.md`
  - `work-queue.md`
- Refreshed gate outputs after the plan changes:
  - `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

## 🧠 What I learned (new information)

- Supabase usage in `functions/` already spans both “tenant-like config” tables (Session, webhook deliveries) and business tables (ShopOrders, events, experiments, loyalty_points_ledger), so introducing multitenancy will require a staged approach:
  - evidence inventory: `artifacts/snapshots/functions-supabase-calls.rg.txt`
- PR 5 can safely add tenant config tables without touching existing business tables (so behavior remains stable), while PR 6 is the pivot that removes env sprawl by using tenant-scoped config.

## 🧭 What changes because of this

- The multitenancy roadmap is now “PR-sized” and implementation-ready through PR 6: auth → tenant wiring → caching → Supabase tables → tenant integration lookup.
- Tenant #2 onboarding becomes operationally realistic: it becomes “insert DB rows + secrets” rather than “redeploy with new env vars”, matching the original interchangeability goal.

## ➡️ Next step

- Optional next docs-only work: write a detailed PR 7 plan (vendor key mapping remediation) driven by the current leak scan evidence:
  - `artifacts/snapshots/check-vendor-leaks.txt`
- Or, if implementation is allowed: start PR 2 and follow the PR 2/3/4/5/6 plans in sequence, re-running gates after each PR.

## 🔗 Links / references

- PR plans:
  - `pr-2-auth-guards-detailed-plan.md`
  - `pr-3-tenant-resolution-detailed-plan.md`
  - `pr-4-cache-headers-detailed-plan.md`
  - `pr-5-tenancy-tables-detailed-plan.md`
  - `pr-6-tenant-integration-config-lookup-detailed-plan.md`
- Evidence:
  - `artifacts/snapshots/functions-supabase-calls.rg.txt`
  - `stop-point-status-dashboard.md`

---

### 0014_checkpoint-pr7-vendor-key-mapping-plan.md

---
step: 0014
created_at: "2025-12-30 22:05"
title: "Checkpoint: PR7 vendor key mapping plan"
---

# Step 0014: Checkpoint: PR7 vendor key mapping plan

## ✅ What I did (facts)

- Wrote an implementation-ready PR 7 plan to eliminate Shopify GID leaks above adapters by migrating UI/client code to internal keys + adapter-level mapping:
  - `pr-7-vendor-key-mapping-detailed-plan.md`
- Grounded the PR 7 scope in the existing vendor leak gate output (source of truth for offender paths/lines):
  - `artifacts/snapshots/check-vendor-leaks.txt`
- Linked the PR 7 plan from the main indices/roadmap:
  - `START-HERE.md`
  - `CANONICAL.md`
  - `artifact-map.md`
  - `pr-by-pr-stop-points-plan.md`
  - `pr-stop-point-gate-pack.md`
  - `artifacts/next-actions.md`
  - `work-queue.md`

## 🧠 What I learned (new information)

- The vendor leak surface is small and localized (5 lines total), which makes PR 7 feasible as a focused “swap unlock” rather than a massive refactor:
  - evidence: `artifacts/snapshots/check-vendor-leaks.txt`

## 🧭 What changes because of this

- The stop-point roadmap is now implementation-ready through PR 7: auth → tenancy wiring → caching → Supabase tenancy tables → tenant integration config lookup → vendor key mapping.
- Swappability becomes mechanically enforceable once PR 7 is implemented, because the vendor leak scan can become a hard gate (`disallowed_lines=0`).

## ➡️ Next step

- Optional docs-only follow-up: tighten PR 8 (tenant #2 onboarding) by mapping each onboarding step to the concrete PR outputs (tables/config endpoints/gates) so it becomes a fully scriptable runbook.
- Or, when implementation is allowed: execute PR 2 → PR 7 in order, re-running gate scripts after each PR.

## 🔗 Links / references

- Specs:
  - `key-mapping-spec-v1.md`
- Evidence + gates:
  - `artifacts/snapshots/check-vendor-leaks.txt`
  - `./.blackbox/scripts/check-vendor-leaks.sh`

---

### 0015_checkpoint-pr8-tenant-2-onboarding-plan.md

---
step: 0015
created_at: "2025-12-30 22:09"
title: "Checkpoint: PR8 tenant #2 onboarding plan"
---

# Step 0015: Checkpoint: PR8 tenant #2 onboarding plan

## ✅ What I did (facts)

- Wrote an implementation-ready PR 8 plan that turns “onboard tenant #2” into an explicit operational proof with acceptance checks:
  - `pr-8-tenant-2-onboarding-detailed-plan.md`
- Anchored PR 8 to the existing runbook and the earlier stop-point outputs (auth, tenant wiring, caching, tables, config lookup, key mapping):
  - `tenant-2-onboarding-runbook.md`
  - `pr-by-pr-stop-points-plan.md`
- Linked the PR 8 plan from the plan’s indices/entrypoints so it’s discoverable:
  - `START-HERE.md`
  - `CANONICAL.md`
  - `artifact-map.md`
  - `pr-stop-point-gate-pack.md`
  - `artifacts/next-actions.md`

## 🧠 What I learned (new information)

- The existing tenant #2 runbook is “ops-first”, but PR 8 benefits from an explicit acceptance checklist that maps directly to earlier PR outputs (tenant tables/config lookup/cache safety/auth), so onboarding can be treated like a verifiable milestone rather than an ad-hoc effort.

## 🧭 What changes because of this

- The roadmap is now “end-to-end plan complete”: PR 2 → PR 8 has dedicated, implementation-ready guidance for each stop point.
- Tenant #2 onboarding is framed as a proof of isolation + operational maturity, which is the real test of “frontend/backend interchangeable + scalable.”

## ➡️ Next step

- If staying docs-only: optionally add a small “tenant isolation smoke checklist” that can be executed locally via curl with custom Host headers (to generate repeatable evidence files).
- If implementing: execute PR 2 first (auth), then proceed sequentially through PR 8, refreshing gates and writing PR evidence diffs after each.

## 🔗 Links / references

- PR 8 plan:
  - `pr-8-tenant-2-onboarding-detailed-plan.md`
- Runbook:
  - `tenant-2-onboarding-runbook.md`
- Dashboard:
  - `stop-point-status-dashboard.md`

---

### 0016_checkpoint-added-legacy-api-server-inventories-clarified-canonical-boundary.md

---
step: 0016
created_at: "2025-12-30 22:23"
title: "Checkpoint: Added legacy api/server inventories + clarified canonical boundary"
---

# Step 0016: Checkpoint: Added legacy api/server inventories + clarified canonical boundary

## ✅ What I did (facts)

- Added a gate snapshot step for “legacy/aux inventories” (repo top-level + `api/` + `server/`) to the full gate refresh script:
  - `.blackbox/scripts/refresh-1909-all-gates.sh`
- Ran the refreshed gate suite so the new inventories are present as stable evidence files:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/repo-top-level.ls.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-files.find.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/server-files.find.txt`
  - Run log: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.2025-12-30_222228.log.txt`
- Updated the “Architecture Atlas” to document the presence of `api/**` and `server/**` and to clarify that `functions/api/**` is the canonical boundary in this plan:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-atlas.md`
- Added a backlog item to prevent contract drift by consolidating the boundary surface:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-backlog.md`
- Strengthened risk evidence for “Cloudflare vs legacy assumptions” with concrete repo inventories:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/risk-register.md`

## 🧠 What I learned (new information)

- The repo contains a full parallel route tree under `api/**` that mirrors many `/api/*` families (admin/orders, metrics, storefront cart/product, shopify webhooks, etc.), which is a concrete drift risk if left ambiguous.
  - Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-files.find.txt`
- The repo contains explicit Vercel artifacts (`.vercel/`, `vercel.json`) alongside Cloudflare artifacts (`functions/`, `.wrangler/`), indicating multiple deployment “shapes” exist in-tree.
  - Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/repo-top-level.ls.txt`
- DB migrations live under `server/migrations/**` and include experiments/CMS/shopify-related schema work; this is part of “backend truth” even though it’s not part of the UI swap seam.
  - Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/server-files.find.txt`

## 🧭 What changes because of this

- The plan now makes the “one boundary” stance enforceable by evidence:
  - Canonical boundary for swappable frontends: `functions/api/**`
  - Legacy surface to avoid touching: `api/**`
- Future planning and implementation work can reference stable inventories for `api/` + `server/` without creating ad-hoc one-off snapshots.
- This reduces confusion for new contributors and reduces the chance of accidentally implementing a feature in the “wrong” backend surface.

## ➡️ Next step

- Extend the invariants/acceptance docs to explicitly include “single canonical backend boundary” as an invariant (and link it to the new inventories), then keep executing the PR stop-point plan starting from PR 2 when code changes are allowed.

## 🔗 Links / references

- Gate refresh script: `.blackbox/scripts/refresh-1909-all-gates.sh`
- New inventories:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/repo-top-level.ls.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-files.find.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/server-files.find.txt`
- Docs updated:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-atlas.md`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-backlog.md`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/risk-register.md`

---

### 0017_checkpoint-added-backend-surface-drift-diff-triaged-api-only-endpoints.md

---
step: 0017
created_at: "2025-12-30 22:39"
title: "Checkpoint: Added backend-surface drift diff + triaged api-only endpoints"
---

# Step 0017: Checkpoint: Added backend-surface drift diff + triaged api-only endpoints

## ✅ What I did (facts)

- Automated a repeatable drift signal between the legacy backend surface (`api/**`) and the canonical Cloudflare surface (`functions/api/**`) by extending the main gate refresh:
  - `.blackbox/scripts/refresh-1909-all-gates.sh`
- Generated stable “surface diff” snapshot outputs (written on every gate refresh):
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-only-endpoints.txt`
- Extended the stop-point dashboard to surface “backend surface drift” as an at-risk signal + to recommend P0.3 when non-zero:
  - `.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
  - Output: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`
- Ran an evidence-first usage scan to see which api-only endpoints are actually referenced by the repo, and saved the latest snapshot for future citations:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.usage-scan.latest.txt`
- Updated canonical plan docs to incorporate drift evidence + an evidence-backed triage list:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-backlog.md`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/api-endpoints-to-ports-map.md`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/migration-stages.md`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-by-pr-stop-points-plan.md`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-stop-point-gate-pack.md`

## 🧠 What I learned (new information)

- There is measurable contract drift risk today: `api/**` contains endpoints not present under `functions/api/**`.
  - Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`
- Some of the api-only endpoints are directly called by the current frontend UI, so consolidating the boundary isn’t just cleanup; it can be required for “Cloudflare-first” operation.
  - Evidence (direct `/api/<endpoint>` calls): `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`

## 🧭 What changes because of this

- Backend consolidation is now a first-class stop signal (visible in the dashboard) instead of a “hidden” repo fact.
  - Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`
- The plan now has an explicit, evidence-backed triage of api-only endpoints so future consolidation work is scoped to what’s actually referenced by the repo.
  - Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/architecture-backlog.md`

## ➡️ Next step

- Produce a “migration sketch” for P0.3 that maps each api-only endpoint to one of:
  - migrate into `functions/api/**` (if required),
  - keep as non-contract legacy until deleted,
  - delete/replace (if stub / unused),
  and tie it to an implementation stop point (without changing code yet).

## 🔗 Links / references

- Drift summary + endpoint lists:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-only-endpoints.txt`
- Api-only usage evidence:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-only-endpoints.usage-scan.latest.txt`
- Dashboard + gate scripts:
  - `.blackbox/scripts/refresh-1909-all-gates.sh`
  - `.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

---

### 0018_checkpoint-snapshotted-key-legacy-api-endpoint-implementations-for-p0-3.md

---
step: 0018
created_at: "2025-12-30 22:47"
title: "Checkpoint: Snapshotted key legacy api endpoint implementations for P0.3"
---

# Step 0018: Checkpoint: Snapshotted key legacy api endpoint implementations for P0.3

## ✅ What I did (facts)

- Captured heads of key legacy `api/**` endpoint implementations so the future P0.3 consolidation can be executed with concrete code-level evidence:
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-admin-media-upsert.ts.head260.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-admin-media-list.ts.head260.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-admin-media-list-all.ts.head260.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-admin-media-delete.ts.head260.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-og.ts.head260.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-storefront-cart-share.ts.head260.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-storefront-cart-restore.ts.head260.txt`
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-internal-recovery-cron.ts.head260.txt`

## 🧠 What I learned (new information)

- The legacy newsletter endpoint is not a drop-in Cloudflare function: it uses a direct Postgres pool and runs `CREATE TABLE IF NOT EXISTS` at request time.  
  Evidence: `artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`
- The legacy Cloudinary signing endpoint is explicitly Vercel-shaped (`@vercel/node`) and depends on Node `crypto` + `process.env`, so migrating it to Cloudflare requires a handler rewrite (PagesFunction + env bindings + Web Crypto equivalents).  
  Evidence: `artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`
- Some legacy endpoints are intentionally stubbed/flagged (cart share/restore + recovery cron), which supports treating them as “do not migrate until needed” in P0.3.  
  Evidence:  
  - `artifacts/snapshots/api-storefront-cart-share.ts.head260.txt`  
  - `artifacts/snapshots/api-storefront-cart-restore.ts.head260.txt`  
  - `artifacts/snapshots/api-internal-recovery-cron.ts.head260.txt`

## 🧭 What changes because of this

- P0.3 consolidation is now decomposable into “easy ports” (Vercel handler → PagesFunction) vs “needs re-architecture” (direct Postgres access).
- The plan can now reference concrete implementation shapes when deciding what can be moved into `functions/api/**` vs what needs redesign (e.g., Supabase-backed storage).

## ➡️ Next step

- Add a short “migration notes” section to P0.3 (in `architecture-backlog.md`) for each must-migrate api-only endpoint, based on these snapshots (no code changes yet).

## 🔗 Links / references

- Drift + triage:
  - `artifacts/snapshots/api-vs-functions.summary.txt`
  - `artifacts/snapshots/api-only-endpoints.txt`
  - `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
- Key legacy endpoint snapshots (for migration):
  - `artifacts/snapshots/api-newsletter-subscribe.ts.head260.txt`
  - `artifacts/snapshots/api-cloudinary-sign.ts.head260.txt`
  - `artifacts/snapshots/api-admin-media-upsert.ts.head260.txt`

---

### 0019_checkpoint-refreshed-gates-filled-rolling-context-added-p0-3-detailed-plan.md

---
step: 0019
created_at: "2025-12-30 23:06"
title: "Checkpoint: refreshed gates, filled rolling context, added P0.3 detailed plan"
---

# Step 0019: Checkpoint: refreshed gates, filled rolling context, added P0.3 detailed plan

## ✅ What I did (facts)

- Refreshed the full 1909 gate suite (contract evidence + drift + vendor leak scan + inventories).  
  Evidence logs:  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.2025-12-30_160613.log.txt`  
  - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-contract-evidence.2025-12-30_160613.log.txt`
- Refreshed the stop-point dashboard.  
  Evidence log: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-30_160620.log.txt`
- Replaced placeholders in the rolling plan memory file with current, evidence-backed bullets.  
  Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/context/context.md`
- Updated the plan’s `artifacts/summary.md` to include the “Prompts 7–18” additions (contract automation, dashboard, drift triage, PR-sized plans).  
  Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/summary.md`
- Added a detailed P0.3 boundary consolidation plan with migration recipes and acceptance checks.  
  Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`
- Made the gate refresh scripts more robust by automatically writing timestamped `*.log.txt` files into `artifacts/snapshots/` (so evidence is preserved per run).  
  Evidence (script changes):  
  - `.blackbox/scripts/refresh-1909-all-gates.sh`  
  - `.blackbox/scripts/refresh-1909-contract-evidence.sh`  
  - `.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`

## 🧠 What I learned (new information)

- The two biggest current “swappability blockers” are still:
  - backend surface drift (`api_only=22`)  
    Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/api-vs-functions.summary.txt`
  - vendor IDs above adapters (`disallowed_lines=5`)  
    Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`
- The stop-point dashboard continues to recommend P0.3 before PR 2/3/4 because the canonical boundary is ambiguous until drift is reduced.  
  Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`

## 🧭 What changes because of this

- The plan is easier to run in long CLI sessions because each refresh now produces durable, timestamped logs in `artifacts/snapshots/` (no “what ran?” ambiguity).  
  Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.latest.log.txt`
- The plan’s “always read” memory (`context/context.md`) now matches the current gate outputs, which reduces confusion when resuming the loop.  
  Evidence: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/context/context.md`

## ➡️ Next step

- If code changes are allowed: execute P0.3 migration (start with `/api/newsletter/subscribe` + `/api/cloudinary/sign`), then re-run gates to confirm `api_only` decreases.  
  Plan: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`
- If staying docs-only: keep refreshing gates as you work and record any evidence diffs under `context/pr-diffs/`.  
  Template: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/pr-evidence-diff-summary-template.md`

## 🔗 Links / references

- Entry point: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/START-HERE.md`
- Canonical map: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/CANONICAL.md`
- Latest dashboard: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/stop-point-status-dashboard.md`

---

### 0020_checkpoint-gates-now-snapshot-script-heads-runbook-links-p0-3-plan.md

---
step: 0020
created_at: "2025-12-30 23:12"
title: "Checkpoint: gates now snapshot script heads + runbook links P0.3 plan"
---

# Step 0020: Checkpoint: gates now snapshot script heads + runbook links P0.3 plan

## ✅ What I did (facts)

- Updated `docs/.blackbox/scripts/refresh-1909-all-gates.sh` so each run also snapshots the gate scripts (heads) and the `.blackbox/scripts` directory listing for auditability.
- Updated the acceptance gates runbook to document the new timestamped logs produced by the one-command refresh scripts.
- Linked the new P0.3 detailed plan from the PR stop-point gate pack so P0.3 is runnable without hunting.
- Re-ran the gate refresh + dashboard refresh to ensure the new “script head snapshots” are populated and the dashboard still renders.
  - Evidence logs:
    - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.2025-12-30_161233.log.txt`
    - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-stop-point-dashboard.2025-12-30_161233.log.txt`

## 🧠 What I learned (new information)

- The plan’s “operator surface” (commands + evidence files) is now self-auditing: every refresh produces both the evidence outputs *and* the scripts used to produce them (in snapshot form).

## 🧭 What changes because of this

- It’s now much harder for the loop to silently regress (e.g., someone edits a gate script and the evidence becomes “not comparable”) because the producing scripts are captured as snapshots per run.
  - Evidence (latest convenience logs):
    - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-all-gates.latest.log.txt`
    - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-contract-evidence.latest.log.txt`
    - `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/refresh-1909-stop-point-dashboard.latest.log.txt`

## ➡️ Next step

- Consolidate “research inputs” across other `.blackbox/.plans/*` runs into a minimal set of referenced snapshots inside this 1909 plan (so implementation doesn’t rely on scattered plan folders).
- Starting target: `external-research-notes.md`

## 🔗 Links / references

- Gate runbook: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/acceptance-gates-runbook.md`
- P0.3 plan: `.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/p0-3-boundary-consolidation-detailed-plan.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
