# Client-Project Modularity Blueprint (swap UI + providers)

Goal:
- Make client projects “composition” work, not “copy/paste then diverge”.
- UI is swappable, backend provider integrations are swappable, and shared domain logic stays stable.

Repo evidence for current structure:
- `src/domains/platform/**` exists and already separates ports/adapters/runtimes: `artifacts/snapshots/src-domains-platform-files.find.txt`
- Cloudflare backend surface exists under `functions/api/**`: `artifacts/snapshots/functions-files.find.txt`, `artifacts/snapshots/functions-api-files.clean.find.txt`, `artifacts/snapshots/functions-api-handlers.clean.rg.txt`
- Environment secret split is documented: `artifacts/snapshots/env-example-secrets.rg.txt`

Related “what exists” maps (docs-only):
- Domain module conventions (`src/domains/**`): `domain-module-conventions.md`
- Backend boundary conventions (`functions/**` + `/api/*`): `backend-boundary-conventions.md`
- Data-layer conventions (Supabase + migrations): `data-layer-conventions.md`

---

## 1) Define the “swappable seam” (three layers)

### Layer 1 — UI (client specific)

What varies per client:
- branding/theme
- marketing content and layout
- client-specific admin pages and workflows
- optional client-specific storefront experiences

What must NOT be in UI:
- Shopify/Stripe/Supabase credentials
- vendor IDs (e.g., Shopify GIDs)
- vendor SDK assumptions

Enforcement gates:
- `acceptance-gates.md` (G1–G3)

### Layer 2 — Boundary (stable BFF contract)

Definition:
- A stable `/api/*` surface that aligns to platform ports and emits DTOs + capability objects.

Where it lives today:
- Cloudflare Pages Functions: `functions/api/**` (inventory evidence): `artifacts/snapshots/functions-api-dir.ls.txt`

### Layer 3 — Platform (shared domain logic + provider plugins)

Definition:
- Provider-agnostic “ports” define what the product needs.
- Providers implement ports via adapters.
- Runtimes select the active provider (per tenant).

Where it lives today:
- `src/domains/platform/**` (inventory evidence): `artifacts/snapshots/src-domains-platform-files.find.txt`

---

## 2) Provider plugin model (what we should standardize)

For each “service domain” we support:
- Commerce (Shopify today)
- Payments (Stripe later)
- Content/CMS (Supabase-based or third-party later)

We standardize:
- a port interface (already exists in `src/domains/platform/**/ports/*`)
- adapter implementations under `src/domains/platform/**/adapters/<provider>/*`
- a runtime selector that is:
  - tenant-aware
  - capability-driven
  - non-UI

Evidence that runtime selection exists:
- `artifacts/snapshots/platform-runtime-files.txt`

---

## 3) Multi-client deployment model (how we “reuse backend”)

We want to support:
- multiple client frontends
- one shared backend boundary implementation (Cloudflare Functions)
- one Supabase instance eventually shared (multi-tenant) or per-client (simpler)

We standardize:
- tenant resolution by host (storefront) and/or by auth (admin)
- tenant integration config lookup (Shopify shop domain, Stripe account, etc.)

Evidence for tenancy rules:
- `tenancy-context-rules.md`

---

## 4) Recommended packaging targets (docs-first, future code layout)

Even if we keep a single repo, we can structure “packages” conceptually:

- `@lumelle/ui-core` (shared UI primitives)
- `@lumelle/ui-client/<client>` (brand + pages)
- `@lumelle/platform` (ports + runtimes)
- `@lumelle/platform-shopify` (commerce adapter)
- `@lumelle/platform-stripe` (payments adapter)
- `@lumelle/api` (Cloudflare Functions implementing `/api/*`)

Evidence that “UI primitives kit” contracts and mining pointers already exist (docs-only, ready to implement):
- Blocks Kit contracts excerpt:  
  `artifacts/snapshots/oss-catalog-blocks-kit-contracts.head200.txt`
- Component source map excerpt (exact OSS file pointers):  
  `artifacts/snapshots/oss-catalog-component-source-map.head200.txt`
- Storefront primitives acceptance criteria excerpt (PLP/PDP/cart):  
  `artifacts/snapshots/oss-catalog-blocks-inventory.storefront-v1.5.150-270.txt`
- Blog Page Kit mini‑POC checklist excerpt (MDX/Markdown pipeline + TOC + code blocks + marketing blocks):  
  `artifacts/snapshots/research-plan-0551-blog-kit.step0002.head220.txt`

Evidence this maps to today’s folder layout:
- `src-domains-platform-files.find.txt` and `functions-files.find.txt`

### 4.1 A pragmatic “apps + packages” target (when/if you want hard separation)

Prescriptive (future state), designed to maximize swap-ability:

- `apps/storefront-*` (one per client, if desired)
  - contains: `client/**` UI domains + client theme/content
  - allowed dependency: `packages/contracts` + `packages/platform-sdk` (no adapters)

- `apps/admin-*` (one per client, if desired)
  - contains: admin UI + client-specific admin workflows
  - allowed dependency: `packages/contracts` + `packages/platform-sdk`

- `packages/contracts`
  - contains: DTOs, keys, capability models, stable error codes
  - must remain vendor-agnostic
  - contract anchor: `dto-and-capabilities-spec-v0.1.md`

- `packages/platform`
  - contains: ports + runtimes (provider-agnostic), thin SDKs for calling `/api/*`
  - maps to today’s `src/domains/platform/**` foundation  
    Evidence: `artifacts/snapshots/src-domains-platform-files.find.txt`

- `packages/adapters-<provider>`
  - contains: provider-specific implementations, server-only where possible
  - maps to today’s `src/domains/platform/**/adapters/**`  
    Evidence: `artifacts/snapshots/platform-adapters-files.txt`

- `apps/boundary`
  - the canonical `/api/*` implementation (Cloudflare Pages Functions)
  - maps to today’s `functions/api/**`  
    Evidence: `artifacts/snapshots/functions-api-files.clean.find.txt`

Why this helps:
- Swapping UI becomes “point the new UI at the same `/api/*`” (no vendor SDK rewrite).
- Swapping providers becomes “add/replace an adapter package + runtime selection” (UI stays stable).

### 4.2 Non-negotiable enforcement for packaging (gates)

To keep the above layout honest:
- “UI/client cannot import adapters” gate stays empty:
  - Evidence baseline: `artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`
- “No vendor IDs above adapters” leak count trends to 0:
  - Evidence baseline: `artifacts/snapshots/check-vendor-leaks.txt`

---

## 5) What we can do next without code changes

- Expand the “boundary contract” with a per-domain DTO spec:
  - `backend-boundary-contract-v1.md`
- Expand acceptance gates into a CI-ready checklist:
  - `acceptance-gates.md`
- Write the tenant onboarding runbook so client #2 is predictable:
  - `tenant-2-onboarding-runbook.md`

Also (docs-only, higher leverage for “swap readiness”):
- Keep `CANONICAL.md` up to date so the plan gets simpler as it grows.
- Use the stop-point dashboard as the “what to implement next” signal:
  - `stop-point-status-dashboard.md`
