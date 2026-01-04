# Frontend Swap Playbook (how to plug in a new UI safely)

Goal:
- Enable “new frontend in days” by ensuring the frontend only depends on:
  - `/api/*` (same-origin BFF boundary on Cloudflare Pages Functions)
  - platform port semantics (keys, capabilities, error codes)
- Avoid requiring the new frontend to understand Shopify/Stripe/Clerk/Supabase specifics.

Evidence rule:
- Any claim about “what exists today” cites an evidence snapshot under:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Primary evidence:
- `/api/*` exists as Cloudflare Pages Functions in `functions/api/**`:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`
- Platform contracts exist (ports + shared primitives/errors):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-primitives.ts.head.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

---

## 1) What a “frontend” is allowed to do (boundary rules)

- Allowed:
  - Call same-origin `/api/*` endpoints.
  - Use platform port types/DTOs as the *semantic* contract.
  - Render based on **capabilities**, not provider names (e.g., embedded vs redirect checkout).

- Not allowed:
  - Import provider adapters directly.
  - Import commerce provider SDKs directly (Shopify) from UI/client code (outside platform adapters/runtimes).
  - Import payments provider UI SDKs (Stripe Elements) as the default checkout/payment UI.
    - If embedded payment UI exists, it must be explicit, capability/flag gated, and easy to remove.
  - Embed vendor-specific IDs (e.g. Shopify GIDs) in UI state/config.

Evidence that “no adapter imports in UI/client” is currently true (baseline scans are empty):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.ui-client.rg.txt`

Evidence of “vendor SDK imports outside platform” (baseline report; used to drive isolation/cleanup over time):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`

Evidence that vendor IDs currently leak above adapters (baseline to fix in implementation phase):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`

---

## 2) The contract a new frontend implements against

Use this file as the stable contract grounding:
- `/api/*` → ports mapping:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/api-endpoints-to-ports-map.md`

Two key patterns already exist:

- Payments is already “provider-abstracted”:
  - `PaymentsPort.beginPayment()` returns `{ mode: 'redirect' | 'embedded' | 'none' }`  
    Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-payments-ports-payments.ts.head.txt`

- Commerce is already “provider-abstracted”:
  - `CatalogPort`, `CartPort`, `CheckoutPort` exist and are selected by runtime.  
    Evidence:  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-cart.ts.head220.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-catalog.ts.head220.txt`  
    - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-checkout.ts.head260.txt`

---

## 3) How to add a new frontend (sequence)

### Step A — Decide frontend category

- Storefront (public + cart + checkout)
- Admin (requires auth + tenant-scoped data)
- Mobile app (likely API-only, no server rendering)

Evidence that the current backend surface supports both public + admin flows:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

### Step B — Implement the minimal “thin slice”

For a storefront UI:
- Landing sections:
  - call `/api/storefront/landing/sections`
- PDP:
  - call `/api/storefront/product/by-handle`
  - call `/api/storefront/product/sections`
- Cart:
  - call `/api/storefront/cart/create` and `/api/storefront/cart/fetch`

Evidence those endpoints exist today:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-files.clean.find.txt`

### Step C — Add checkout based on capabilities (not provider branding)

- Read `CheckoutPort.getCapabilities()` and render:
  - redirect flow UI (if supported)
  - embedded flow UI (if supported)
  - disabled UI (if `mode: 'none'`)

Evidence that “capabilities exist” is already part of the commerce contract:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-commerce-ports-checkout.ts.head260.txt`

---

## 4) How to keep the new frontend from reintroducing coupling

Run these gates after adding any new UI project:
- Gate: no adapter imports from UI/client:
  - `rg -n \"domains/platform/.*/adapters\" <new-frontend-path> > artifacts/snapshots/<new-frontend>-adapter-imports.rg.txt || true`
- Gate: no vendor IDs above adapters (scan for Shopify GIDs and known strings):
  - reuse: `./.blackbox/scripts/check-vendor-leaks.sh`

Evidence that a runnable gate set exists:
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/acceptance-gates-runbook.md`

---

## 5) Known constraint (important)

Today, a browser Supabase client exists (Vite env keys), which means:
- A new frontend could accidentally couple itself to Supabase directly unless we treat Supabase access as a port/boundary concern.  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`

Planned resolution:
- Prefer service-role backend for most data access; keep client direct access only for explicitly scoped needs (realtime / user-owned reads).  
Evidence for this recommendation: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-1901-supabase-multitenancy-plan.md.head260.txt`
