# Backend Boundary Contract v0 (ports-aligned, historical)

Status:
- **Historical / superseded**

Use instead:
- Contract v1 (current): `backend-boundary-contract-v1.md`
- Endpoint table + gap scan: `backend-boundary-contract-v1.1-endpoint-table.md`, `contract-gaps-report-v1.1.md`

Why keep this file:
- It captures the earlier reasoning and proposed endpoints before the v1 contract + v1.1 table were generated from the live `/api/*` surface.

---

# Prompt 3 — Backend Boundary Contract v0 (ports-aligned)

Goal:
- Define a stable backend boundary so frontends can be swapped without rewriting integration logic.

Constraint:
- Docs-only plan; no `src/` changes in this loop.

Evidence (what ports exist today):
- Platform ports inventory: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`
- Platform runtime inventory: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`

---

## 0) The boundary in one sentence

Frontends call a **stable, same-origin** API surface (`/api/*`) which returns DTOs and capability objects aligned to existing platform ports, while vendors (Shopify/Stripe) and DB (Supabase) live behind adapters and server-side enforcement.  
Evidence for “ports exist already”: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`

---

## 1) Contract principles (first principles)

### 1.1 Provider-agnostic identifiers

Contract uses internal opaque keys:
- `ProductKey`, `VariantKey`, `CartKey`, `CartLineKey`  
Evidence that these key types are part of the platform boundary: the `@platform/ports` primitives are in the platform ports list. `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`

### 1.2 Capabilities-driven UI

UI should not hard-code assumptions like “checkout is redirect”.
Instead, contract exposes:
- `CheckoutCapabilities`
- `PaymentCapabilities`  
Evidence these capabilities types exist in ports: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`

### 1.3 Stable error semantics

Contract errors are mapped to stable codes (e.g., NOT_CONFIGURED, UNAVAILABLE, INVALID_INPUT) and can be handled consistently by any frontend.  
Evidence for stable error codes class (snapshot):  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-ports-errors.ts.head.txt`

---

## 2) Proposed `/api/*` endpoints (v0)

These endpoints are intentionally “thin”: they mirror port methods and DTOs, so we can swap frontends without changing backend logic.

### 2.1 Commerce (`CatalogPort`, `CartPort`, `CheckoutPort`)

Evidence ports exist:
- commerce ports are present in inventory: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`

Endpoints:
- `GET /api/commerce/product/:handle`
  - Returns: `ProductDTO`
  - Aligns to: `CatalogPort.getProductByHandle(handle)`
- `GET /api/commerce/cart`
  - Returns: `CartDTO`
  - Aligns to: `CartPort.getCart()`
- `POST /api/commerce/cart/line/add`
  - Body: `{ variantKey, qty }`
  - Returns: `CartDTO`
  - Aligns to: `CartPort.addLine({ variantKey, qty })`
- `POST /api/commerce/cart/line/update`
  - Body: `{ lineKey, qty }`
  - Returns: `CartDTO`
  - Aligns to: `CartPort.updateLine({ lineKey, qty })`
- `POST /api/commerce/cart/line/remove`
  - Body: `{ lineKey }`
  - Returns: `CartDTO`
  - Aligns to: `CartPort.removeLine({ lineKey })`
- `GET /api/commerce/checkout/capabilities`
  - Returns: `CheckoutCapabilities`
  - Aligns to: `CheckoutPort.getCapabilities()`
- `POST /api/commerce/checkout/begin`
  - Returns: `CheckoutStart`
  - Aligns to: `CheckoutPort.beginCheckout()`

### 2.2 Content (`ContentPort`)

Evidence ports exist (content/cms re-export is present in inventory):  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`

Endpoints:
- `GET /api/content/landing-sections`
  - Returns: `SectionsDTO`
  - Aligns to: `ContentPort.getLandingSections()`

### 2.3 Payments (`PaymentsPort`)

Evidence ports exist:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`

Endpoints:
- `GET /api/payments/capabilities`
  - Returns: `PaymentCapabilities`
  - Aligns to: `PaymentsPort.getCapabilities()`
- `POST /api/payments/begin`
  - Body: `BeginPaymentInput`
  - Returns: `PaymentStart`
  - Aligns to: `PaymentsPort.beginPayment(input)`

---

## 3) Tenancy (v0 contract requirement)

Even in single-tenant mode, the boundary should be tenant-aware.

Proposal:
- Every `/api/*` request is associated with:
  - `tenantId` (server-resolved)
  - `userId` (optional, if authenticated)
- Tenancy resolution happens server-side (Cloudflare edge) and is not embedded in the frontend.

Tenancy context rules (Prompt 5; deterministic + cache-safe):  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenancy-context-rules.md`

### 3.1 Contract implication: tenant is always in scope

Minimum requirement for v0:
- The backend boundary resolves `tenantId` for every request (primary key = Host).
- The boundary enforces “deny on mismatch” for privileged/admin operations.

Evidence anchors that the current system has auth + data boundaries that tenancy will need to integrate with:
- Auth is part of frontend boot (ClerkProvider):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`
- Supabase access is centralized in a platform module:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-storage-supabase.ts.head.txt`

### 3.2 Caching rule: tenant-aware cache keys (no cross-tenant leaks)

If `/api/*` responses are cached at the edge:
- Public cache keys must include the effective tenant host (or tenantId).
- Private endpoints must not be shared cached across users/sessions.

Evidence anchor that we already treat caching/scaling as a first-class plan dimension:  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/scalability-plan.md`

---

## 4) Runtime/provider selection (how backend picks vendors)

Provider selection should remain centralized and invisible to the frontend.

Evidence for runtime selection pattern existing today (commerce/content/payments runtimes):  
`docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-runtime-files.txt`

---

## 5) Acceptance checks (contract-level)

When v0 is implemented, “frontend swappable” should be provably true:
- A minimal alternative frontend can implement:
  - product page
  - cart add/update/remove
  - begin checkout
  using only `/api/*` + DTOs/capabilities.
- No UI code imports adapters:
  - Evidence scan should stay empty: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/boundary-adapter-imports.txt`
- No vendor IDs above adapters (once Phase 1 executed):
  - measurable gate: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/check-vendor-leaks.txt`
- Tenancy is deterministic and cache-safe:
  - tenant resolution + propagation rules exist: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/tenancy-context-rules.md`
  - public caching varies by tenant host and private endpoints are never cross-user cached (guardrail): `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/scalability-plan.md`
