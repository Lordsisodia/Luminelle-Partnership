# ADR 0002 — Capability-driven UI (no provider branching)

Status:
- Proposed (docs-only phase; implement later)

Decision:
- UI behavior should switch on **capabilities** (e.g., `supportsDiscounts`, checkout `mode`) rather than branching on provider flags (`shopifyEnabled`) or provider-specific route rules.

Context / problem:
- Provider branching in UI quickly blocks:
  - swapping providers
  - swapping the UI
  - supporting multiple tenants with different provider configurations

Evidence:
- Research explicitly recommends “capability model so UI doesn’t hardcode Shopify,” including using first-party proxy/handoff URLs when available.  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`
- DTO + capability conventions are defined for this plan:  
  - `dto-and-capabilities-spec-v0.1.md`

Consequences:
- Pros:
  - UI becomes replaceable (any UI can interpret the same capabilities).
  - Provider swaps do not require UI refactors.
  - Easier multi-tenant behavior differences (capabilities per tenant).
- Cons:
  - Requires disciplined, versioned capability surfaces.

