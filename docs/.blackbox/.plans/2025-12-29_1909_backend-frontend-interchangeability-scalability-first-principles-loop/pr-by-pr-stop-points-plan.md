# PR-by-PR Stop Points Plan (implementation roadmap)

This converts the architecture checklist into PR-sized increments with explicit stop points.

Evidence anchors:
- Checklist source: `contract-implementation-checklist.md`
- Contract table: `backend-boundary-contract-v1.1-endpoint-table.md`
- Gap report: `contract-gaps-report-v1.1.md`
- Acceptance gates runbook: `acceptance-gates-runbook.md`
- Vendor leak baseline: `artifacts/snapshots/check-vendor-leaks.txt`
- Backend surface drift summary (`api/**` vs `functions/api/**`): `artifacts/snapshots/api-vs-functions.summary.txt`

Meta rule:
- Each PR should be small, reversible, and end with a runnable set of acceptance gates that produce updated evidence under `artifacts/snapshots/`.

PR workflow additions:
- Run `./.blackbox/scripts/refresh-1909-all-gates.sh` after every PR.
- Record a short evidence diff summary using:
  - `pr-evidence-diff-summary-template.md`

---

## PR 0 — Repo hygiene for repeatable evidence (docs-only / optional)

- Goal: make it easy to keep evidence snapshots up to date during the implementation phase.
- Changes: none required in app code.
- Verify:
  - Run: `acceptance-gates-runbook.md` and ensure outputs refresh.

Stop point:
- Evidence index updated: `artifacts/snapshots/_snapshot-index.ls.txt`
- Drift summary exists (so consolidation work is measurable): `artifacts/snapshots/api-vs-functions.summary.txt`

PR notes (fill when you complete PR 0):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:

---

## P0.3 — Consolidate backend boundary surface (api/** → functions/api/**)

- Goal: ensure there is a single canonical `/api/*` surface so frontends can swap against one contract.
- Why: the repo contains a legacy route tree under `api/**` that is not fully mirrored in `functions/api/**`.  
  Evidence (quantified drift): `artifacts/snapshots/api-vs-functions.summary.txt`
- Detailed implementation plan (recommended reading before coding):
  - `p0-3-boundary-consolidation-detailed-plan.md`
- Inputs:
  - Api-only endpoints list: `artifacts/snapshots/api-only-endpoints.txt`
  - Usage triage: `artifacts/snapshots/api-only-endpoints.exact-usage.latest.txt`
- Minimum scope (high leverage):
  - Migrate any api-only endpoints directly called by UI into `functions/api/**` first (keeps UI unchanged).
- Verify:
  - Run: `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - Check drift deltas:
    - `artifacts/snapshots/api-vs-functions.summary.txt` (`api_only` should decrease over time)
    - `artifacts/snapshots/api-only-endpoints.txt` (shrinks as parity is established)

Stop point:
- “Backend surface drift” signal exists and is trending down (dashboard shows it): `stop-point-status-dashboard.md`

Notes:
- This is not a “contract tiering” PR; it’s a prerequisite for making the Cloudflare boundary the single source of truth.

---

## PR 1 — Add shared boundary primitives (tenant + auth + cache) with no wiring

- Goal: create the shared helpers without changing endpoint behavior yet.
- Changes:
  - Add `functions/_lib/tenant.ts` (host normalization + `resolveTenantContext`).
  - Add `functions/_lib/authGuards.ts` (tier guards, reuse existing helpers where possible).
  - Extend `functions/_lib/response.ts` with cache helpers (`jsonNoStore`, `jsonTenantPublic`).
- Spec sources:
  - `functions-tenant-resolution-spec.md`
  - `functions-auth-guards-spec.md`
  - `functions-cache-policy-spec.md`

Verify:
- No route behavior changes expected (but endpoints can now opt into helpers later).
- Evidence that existing helpers exist today (inputs for this PR):
  - `artifacts/snapshots/functions-_lib-internalAuth.ts.head160.txt`
  - `artifacts/snapshots/functions-_lib-response.ts.head160.txt`

Stop point:
- All helpers exist and are unused (safe scaffolding).

PR notes (fill when you complete PR 1):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:

---

## PR 2 — Wire auth guards into admin/exports/metrics/orders endpoints

- Goal: close the biggest security risk flagged by the gaps report (admin endpoints look unauthenticated by scan).
- Detailed implementation plan (recommended reading before coding):
  - `pr-2-auth-guards-detailed-plan.md`
- Scope:
  - `functions/api/admin/**`
  - `functions/api/exports/**`
  - `functions/api/metrics/**`
  - `functions/api/orders/**`
- Verify:
  - Run the cue scan again and compare (evidence should show auth cues or internal auth usage):
    - `artifacts/snapshots/functions-api-auth-tenant-cues.rg.txt`
  - Re-run contract table generator (optional) and confirm “auth cues” increase for admin endpoints:
    - `artifacts/snapshots/functions-api-cues.matrix.txt`

Stop point:
- Admin surface no longer appears “unauthenticated”.

PR notes (fill when you complete PR 2):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:

---

## PR 3 — Wire tenant resolution into tenant-scoped endpoints (storefront/customer/payments)

- Goal: ensure tenant context is resolved once and used consistently per request.
- Detailed implementation plan (recommended reading before coding):
  - `pr-3-tenant-resolution-detailed-plan.md`
- Scope:
  - `functions/api/storefront/**`
  - `functions/api/customer/**`
  - `functions/api/payments/**`
  - `functions/api/experiment/**` (if tenant-scoped)
- Verify:
  - Update the cue scan and compare:
    - `artifacts/snapshots/functions-api-auth-tenant-cues.rg.txt`
  - Ensure the approach stays cache-safe (host-first, auth restricts):
    - `functions-tenant-resolution-spec.md`

Stop point:
- Tenant resolution is no longer ad-hoc and is invoked from each relevant endpoint.

PR notes (fill when you complete PR 3):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:

---

## PR 4 — Normalize cache headers for public endpoints (landing/product/experiment config)

- Goal: make caching explicit and safe (tenant-public vs no-store).
- Detailed implementation plan (recommended reading before coding):
  - `pr-4-cache-headers-detailed-plan.md`
- Scope (public-ish):
  - `functions/api/storefront/landing/sections.ts`
  - `functions/api/storefront/product/*`
  - `functions/api/experiment/config.ts` (already uses ETag; align with policy)
- Verify:
  - Re-run cache cue scan and ensure these endpoints show explicit cache headers:
    - `artifacts/snapshots/functions-api-cache-cues.rg.txt`
  - Confirm gaps report “missing cache headers” shrinks:
    - regenerate `contract-gaps-report-v1.1.md` (optional)

Stop point:
- Public endpoints have explicit cache behavior.

PR notes (fill when you complete PR 4):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:

---

## PR 5 — Add tenancy tables (Supabase) without changing runtime behavior

- Goal: create `tenants`, `tenant_domains`, `tenant_integrations`, `tenant_memberships` (unused initially).
- Detailed implementation plan (recommended reading before coding):
  - `pr-5-tenancy-tables-detailed-plan.md`
- Spec source:
  - `tenant-data-model-proposal.md`
- Evidence anchor (existing Supabase blueprint is RLS-first and service-role by default):
  - `artifacts/snapshots/docs-02-engineering-technical-SUPABASE-SCHEMA.md.head260.txt`

Stop point:
- Tables exist; single tenant continues to function unchanged.

PR notes (fill when you complete PR 5):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:

---

## PR 6 — Switch provider config lookup from env → tenant_integrations (still single tenant)

- Goal: remove env-only provider config dependence (prereq for tenant #2).
- Detailed implementation plan (recommended reading before coding):
  - `pr-6-tenant-integration-config-lookup-detailed-plan.md`
- Evidence anchor that env currently contains provider config (doesn’t scale):
  - `artifacts/snapshots/env-example-secrets.rg.txt`

Stop point:
- Tenant-scoped integration config is usable (even if only one tenant row exists).

PR notes (fill when you complete PR 6):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:

---

## PR 7 — Eliminate vendor ID leaks above adapters (key mapping)

- Goal: make swaps mechanically possible by removing Shopify GIDs from UI/client config.
- Detailed implementation plan (recommended reading before coding):
  - `pr-7-vendor-key-mapping-detailed-plan.md`
- Spec source:
  - `key-mapping-spec-v1.md`
- Verify:
  - Run vendor leak scan and ensure disallowed lines → 0:
    - `./.blackbox/scripts/check-vendor-leaks.sh > artifacts/snapshots/check-vendor-leaks.txt`

Stop point:
- Vendor leak scan is clean; make it a hard gate later.

PR notes (fill when you complete PR 7):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:

---

## PR 8 — Onboard tenant #2 (proof)

- Goal: prove isolation and operational onboarding works.
- Detailed implementation plan (recommended reading before execution):
  - `pr-8-tenant-2-onboarding-detailed-plan.md`
- Runbook:
  - `tenant-2-onboarding-runbook.md`

Stop point:
- Tenant #2 serves its own domain/config without affecting tenant #1.

PR notes (fill when you complete PR 8):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:

---

## PR 9 — Identity decoupling (reduce Clerk coupling outside platform/auth)

- Goal: keep identity provider details out of UI/client domains so auth can be swapped without rewriting the UI.
- Detailed implementation plan (recommended reading before execution):
  - `pr-9-identity-decoupling-detailed-plan.md`
- Verify (evidence-based drift signal already exists):
  - Run: `./.blackbox/scripts/refresh-1909-all-gates.sh`
  - Check vendor SDK drift report (goal: drive Clerk imports outside platform/auth to 0 over time):
    - `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`
    - `artifacts/snapshots/stop-point-metrics.latest.txt`

Stop point:
- Identity coupling is isolated to platform/auth and explicit webhook surfaces (and remains measurable).

PR notes (fill when you complete PR 9):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:

---

## PR 10 — Storefront DTO normalization (provider-neutral storefront boundary)

- Goal: make storefront UI truly swappable by ensuring `/api/storefront/*` responses do not require Shopify object shapes or Shopify IDs.
- Detailed implementation plan (recommended reading before execution):
  - `pr-10-storefront-dto-normalization-detailed-plan.md`
- Mapping reference (what must change, endpoint-by-endpoint):
  - `storefront-contract-dto-mapping-v0.1.md`
- Verify (implementation phase):
  - Add/execute a “storefront response vendor-id leak” check (responses must not contain `gid://shopify/`).
  - Keep `check-vendor-leaks` clean for UI/client code:
    - `./.blackbox/scripts/check-vendor-leaks.sh > artifacts/snapshots/check-vendor-leaks.txt`

Stop point:
- Storefront contract returns provider-neutral DTOs and is safe for a new UI to integrate using only HTTP+JSON.

PR notes (fill when you complete PR 10):
- Summary (1–3 bullets):
- Evidence diff summary link (create under `context/pr-diffs/`):
- Follow-ups:
