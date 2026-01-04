# ADR 0001 — Internal API First (ports call `/api/*` by default)

Status:
- Proposed (docs-only phase; implement later)

Decision:
- Platform ports (`CatalogPort`, `CartPort`, `CheckoutPort`, `ContentPort`, etc.) should call the internal backend boundary (`/api/*`) by default, rather than calling vendor APIs directly from UI.

Context / problem:
- We want a frontend that is swappable without rewriting infra/provider logic.
- We want providers to be swappable (Shopify now; Stripe later) without pushing vendor SDKs and tokens into frontends.

Evidence:
- Research recommendation: “Internal API first” (ports implemented via internal endpoints / Pages Functions) is the v1 default.  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`
- Current repo already has an `/api/*` boundary implemented in Cloudflare Pages Functions:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`

Consequences:
- Pros:
  - Strongest “UI is plug-in” property (any frontend can consume HTTP+JSON).
  - Centralizes caching, rate limiting, auth, and tenancy in one place.
  - Keeps vendor secrets out of browser runtimes.
- Cons:
  - Local dev must run the backend boundary.
  - Requires disciplined DTO + error envelope conventions.

Related docs:
- Backend contract: `backend-boundary-contract-v1.md`
- DTO conventions: `dto-and-capabilities-spec-v0.1.md`

