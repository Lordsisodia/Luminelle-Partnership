# Architecture Expansion From Research (turn “feature research” into modular domains)

Purpose:
- Take the existing “swappable frontend/backend” boundary plan and extend it using the gathered research:
  - admin primitives (RBAC, audit log, workflow automation)
  - per-tenant rollout controls (feature flags)
  - CMS/content ops and analytics
- Keep the plan consistent with the repo’s existing architectural seams:
  - stable backend boundary: `/api/*` implemented in `functions/api/**`
  - swappable providers behind platform ports/adapters

Evidence rule:
- Any statement about “what research recommends” must cite a research snapshot in this plan folder.
- Any statement about “what exists in this repo today” must cite a code snapshot or gate output in this plan folder.

Research evidence anchors (this plan folder):
- Research synthesis summary excerpt:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-summary.head220.txt`
- SAFE-only OSS shortlist excerpt (license posture):  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`
- UI↔infra plugin architecture research excerpt:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`
- “Ports implemented via internal API first” research excerpt:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`

Repo current-state evidence anchors (this plan folder):
- `/api/*` surface exists in Pages Functions:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`
- Platform ports/runtime/adapters inventories exist:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-adapters-files.txt`

---

## 0) Ground truth: what the research is actually saying

The “feature research synthesis” recommends prioritizing early **safety rails** for any admin surface:
- RBAC + granular permissions
- audit log (“who changed what”)
- feature flags + staged rollouts
- workflow automation hooks with a run log  
Evidence: `artifacts/snapshots/feature-research-summary.head220.txt`

This is relevant to architecture because:
- these capabilities become cross-cutting primitives that must remain:
  - **tenant-scoped**
  - **backend-owned**
  - **UI-swappable**

The synthesis also includes SAFE-only OSS accelerators (permissive licenses) for building admin scaffolding and feature flags:  
Evidence: `artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`

---

## 1) Architecture implication: turn “features” into modular platform domains

Rule:
- Every new capability from research becomes a **platform domain** with:
  - a `Port` (contract)
  - optional adapters (providers)
  - a runtime selector / config resolver (tenant-aware later)
  - `/api/*` endpoints as the stable boundary for any UI

This aligns with the existing plugin direction:
- UI consumes ports + internal API, and does not embed vendor IDs or vendor-specific branching.  
Evidence: `artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`

And it aligns with the “internal API first” recommendation:
- ports should call `/api/*` by default, keeping vendor tokens + vendor endpoints out of UI.  
Evidence: `artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`

---

## 2) Proposed “expansion domains” (ordered by leverage)

Each domain below is defined in terms of:
- new stable ports
- new `/api/*` endpoint families
- Supabase tenancy + isolation expectations

### 2.1 `platform/authz` (RBAC + permissions)

Why it’s first:
- RBAC is a prerequisite for safely exposing *any* admin actions across multiple tenants.  
Evidence (research ranking): `artifacts/snapshots/feature-research-summary.head220.txt`

Boundary decisions:
- UI checks capabilities/permissions only via backend-provided signals (capability model), not by importing auth provider internals.  
Evidence that “capabilities, not vendor branching” is the goal: `artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`

### 2.2 `platform/audit` (append-only audit log)

Why it’s first:
- “Who changed what” is a compounding safety primitive and reduces ops mistakes.  
Evidence: `artifacts/snapshots/feature-research-summary.head220.txt`

Architecture shape:
- audit emission happens in backend boundary (`functions/api/**`) because:
  - it can include tenant context reliably
  - it can avoid leaking sensitive details to browser code

### 2.3 `platform/flags` (feature flags + staged rollouts per tenant)

Why it’s early:
- Research ranking puts “feature flags + staged rollouts” at the top as a velocity/safety lever.  
Evidence: `artifacts/snapshots/feature-research-summary.head220.txt`

Architecture shape:
- flags are evaluated server-side for tenant-scoped features by default.
- UI can still receive “public flags” (allowlisted) via `/api/config/public` or `/api/flags/public` per tenant.  
Related plan: `tenant-integrations-config-spec.md`

License posture note:
- SAFE-only shortlist includes a feature-flag backend candidate.  
Evidence: `artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`

### 2.4 `platform/automation` (workflow hooks + approvals + run log)

Why:
- Automation hooks turn internal events into compounding ops value.
- A run log is inherently backend-owned and tenant-scoped.  
Evidence: `artifacts/snapshots/feature-research-summary.head220.txt`

### 2.5 `platform/cms` and `platform/analytics` (content ops + usage analytics)

Why:
- CMS is listed as a core recommendation (reduce bottlenecks).
- Admin usage analytics helps avoid “building in the dark.”  
Evidence: `artifacts/snapshots/feature-research-summary.head220.txt`

Note:
- These domains must remain decoupled from “commerce provider identity” (Shopify vs Stripe), so they are ideal candidates to be “provider-neutral from day 1.”

### 2.6 Storefront primitives kit (PLP/PDP/cart) — treat as a first-class “UI kit” with stable DTOs

Why it matters (for interchangeability):
- Storefront UI is often where provider coupling sneaks in (IDs, SDKs, “page glue” logic).
- The storefront kit plan explicitly shifts focus from more “repo discovery” to **contract normalization** (DTOs + state semantics), and calls out that separating UI primitives from backend adapters early prevents lock-in.  
  Evidence: `artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`

Architecture shape (how this plugs into the same boundary model):
- Define minimal storefront DTOs as part of the `/api/*` contract and platform ports:
  - `ProductSummary`, `ProductDetail`, `Variant`
  - `Cart`, `CartLine`  
  Evidence that the plan calls these out explicitly as the first step: `artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`
- Treat URL-synced state as a reusable primitive (filters + pagination + saved views), not “page glue.”  
  Evidence: `artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`
- Anchor the storefront kit acceptance criteria to the internal Blocks Inventory and keep a short canonical reference set for mining patterns:  
  - Storefront primitives acceptance criteria excerpt: `artifacts/snapshots/oss-catalog-blocks-inventory.storefront-v1.5.150-270.txt`  
  - Storefront reference set excerpt: `artifacts/snapshots/oss-catalog-storefront-reference-set.head170.txt`

What changes in this plan because of it:
- We stop treating “storefront UI work” as purely a frontend exercise; it becomes a **contract + kit** exercise:
  - backend boundary emits stable DTOs
  - UI implements primitives against DTOs (not provider SDKs)
  - adapters own provider translation

### 2.7 Blog / content pages kit — treat content surfaces as repeatable “kits”, not bespoke pages

Why it matters (for interchangeability):
- In client work, “content surfaces” (blog, guides, landing pages) tend to fork early and silently; if they’re not kit-driven they become the first major divergence point between client UIs.
- A stable content rendering stack (Markdown/MDX → headings/TOC/code blocks) + a small marketing-block set (FAQ/pricing/testimonials/newsletter) forms a reusable unit you can port across clients without changing the backend boundary.

Evidence anchor (kit checklist; timeboxed + engineer-executable):
- Blog Page Kit mini‑POC checklist excerpt (rendering pipeline + TOC + code blocks + marketing blocks):  
  `artifacts/snapshots/research-plan-0551-blog-kit.step0002.head220.txt`

Architecture shape (how this plugs into the same boundary model):
- Treat content pages as “UI kits” that:
  - accept stable inputs (MDX/Markdown + block data)
  - emit consistent UI contracts (heading IDs, anchor links, TOC model, code block rendering)
  - keep interactive behavior modular (avoid locking into one JS runtime/library)
  - remain compatible with the same `/api/*` boundary (for analytics/flags, not for rendering itself)

---

## 3) How this plugs into the existing plan (stop-point alignment)

This expansion does not change the existing stop-point plan; it clarifies what comes *after* the boundary hardening work.

Prerequisites from the current plan:
- Enforce auth tiering on sensitive endpoint families: `contract-gaps-report-v1.1.md`
- Enforce “no vendor IDs above adapters”: `key-mapping-spec-v1.md` + `artifacts/snapshots/check-vendor-leaks.txt`
- Establish tenant tables and config resolution: `tenant-data-model-proposal.md` + `tenant-integrations-config-spec.md`

---

## 4) Output of this doc (what we should create next)

Create domain templates and v0.1 specs for:
- `platform-domain-template.md` (one standard recipe)
- `authz-rbac-design-v0.1.md`
- `audit-log-design-v0.1.md`
- `feature-flags-per-tenant-design-v0.1.md`
