# PR 8 — Onboard Tenant #2 (proof) (detailed plan)

Scope: **plan-only** (this is an operational “proof PR”, not an architecture PR).

This PR proves the whole architecture loop actually works in practice:
- host-first tenant resolution
- tenant-scoped integrations/config
- swappable frontend boundary stability
- no cross-tenant leaks

Primary runbook:
- `tenant-2-onboarding-runbook.md`

---

## Preconditions (what must already be true)

The onboarding proof only makes sense once these stop-points are done:

- PR 2 — auth is consistent for sensitive endpoints:
  - `pr-2-auth-guards-detailed-plan.md`
- PR 3 — tenant context is wired across tenant-scoped endpoints:
  - `pr-3-tenant-resolution-detailed-plan.md`
- PR 4 — cache headers are explicit and tenant-safe for public endpoints:
  - `pr-4-cache-headers-detailed-plan.md`
- PR 5 — tenancy tables exist in Supabase:
  - `pr-5-tenancy-tables-detailed-plan.md`
- PR 6 — provider config lookup is tenant-scoped (env → tenant_integrations):
  - `pr-6-tenant-integration-config-lookup-detailed-plan.md`
- PR 7 — vendor IDs are eliminated above adapters (optional but strongly recommended before scaling client work):
  - `pr-7-vendor-key-mapping-detailed-plan.md`

Roadmap reference:
- `pr-by-pr-stop-points-plan.md`

---

## Target outcome (PR 8 acceptance checks)

Tenant #2 is considered “onboarded” when:

- `tenant2.<domain>` resolves to tenant #2 across the whole stack:
  - storefront endpoints (`/api/storefront/...`) return tenant #2 content/data
  - admin endpoints (`/api/admin/...`, `/api/metrics/...`) are accessible only to tenant #2 admins
- Tenant #1 behavior is unchanged:
  - tenant #1 still works on its domain
  - no cross-tenant bleed in cache or data
- Operational onboarding is “DB rows + secrets”, not “new env vars + redeploy”

---

## Operational steps (high level)

1) Provision domain + hosting
- Add tenant #2 domain in Cloudflare Pages (and ensure `/api/*` routes to Functions).
- Confirm host headers will be distinct (cache partitioning).

2) Create tenant records in Supabase
- Insert into:
  - `tenants`
  - `tenant_domains` (host → tenant_id mapping)
  - `tenant_integrations` (provider config)
  - `tenant_memberships` (admin users)

3) Store tenant secrets (encrypted)
- Insert into:
  - `tenant_integration_secrets`
- Wire `tenant_integrations.secret_ref` to the encrypted secret blob.

Spec source:
- `tenant-secrets-and-public-config-spec-v0.1.md`

4) Verify tenant resolution + isolation
- Hit tenant-public endpoints on both hosts (storefront sections, product reads) and ensure:
  - responses differ correctly per tenant
  - `Vary: Host` is present (or equivalent cache key partitioning)
- Hit admin endpoints and ensure:
  - tenant2 admin can access tenant2 data
  - tenant1 admin cannot access tenant2 data

5) Run acceptance gates + record evidence
- `./.blackbox/scripts/refresh-1909-all-gates.sh`
- `./.blackbox/scripts/refresh-1909-stop-point-dashboard.sh`
- Add PR diff summary under `context/pr-diffs/` using `pr-evidence-diff-summary-template.md`

---

## Evidence deltas expected (after PR 8)

- New `context/pr-diffs/*pr-008*` file exists and explains:
  - which tenant rows were added (no secrets)
  - which endpoints were verified
  - what evidence was captured
- The dashboard checkboxes show PR 8 complete (via the PR diff naming convention):
  - `stop-point-status-dashboard.md`

