# External Research Notes (carried into this plan)

Purpose: capture “outside research” that is relevant to the *architecture* decisions in this plan (swappability + scalability), without letting it sprawl or turn into product brainstorming.

Evidence rule:
- Every external research claim must cite a snapshot under this plan’s `artifacts/snapshots/` (we copy excerpts in so the plan is self-contained).

Evidence sources copied into this plan:
- Feature research summary excerpt (high-level outcomes):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-summary.head220.txt`
- “SAFE-only” OSS shortlist excerpt (license posture sanity check):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`
- UI↔infra plugin architecture excerpt (why to treat providers as plugins):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`
- “Ports implemented via internal API first” excerpt (why `/api/*` is the seam):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`
- Key mapping strategy excerpt (why vendor IDs must not leak above adapters):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-key-mapping-strategy.md.head220.txt`
- Supabase multitenancy + decoupled backend excerpt (host-first tenancy + config in DB):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-supabase-multitenancy-decoupled-backend.md.head220.txt`
- Upstream plan excerpts (internal deep-research runs; pinned here for self-containment):
  - UI↔infra plugin architecture (2014 run excerpt):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-2014-ui-infra-plugin.final-report.head140.txt`
  - Key mapping migration (0741 run excerpt):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-0741-key-mapping.final-report.head200.txt`
  - Feature research (step-01 run excerpt):  
    `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-feature-research-step01.summary.head120.txt`

---

## What is directly relevant to this architecture plan

- License posture matters for “swap-ability” because we want to be able to embed or reuse components in client projects without viral licensing surprises.  
  Evidence that license posture was explicitly tracked and SAFE-only shortlists exist:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`

- The “plugin architecture” framing is directly aligned with the ports/adapters approach:
  - UI should depend on stable contracts (ports + DTOs), and providers should be isolated behind adapters.
  - This turns “swap Shopify later” into “implement a new adapter + mapping layer”, not “rewrite UI”.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`

- The “internal API first” recommendation maps to our strongest swap seam:
  - Make `/api/*` the canonical boundary and default execution path for ports.
  - Keep provider secrets and provider SDK calls on the backend side of the boundary.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`

- Key mapping is the mechanism that makes swaps mechanical (not aspirational):
  - Replace vendor identifiers (Shopify GIDs, Stripe IDs) with internal keys in UI/client code.
  - Encode/decode only inside adapters and the backend boundary.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-key-mapping-strategy.md.head220.txt`

- Multi-tenant readiness requires backend-owned tenant resolution and backend-owned config/secrets:
  - Resolve tenant context host-first (cache-safe) and pass it through the backend boundary.
  - Keep per-tenant integration config in data tables, not env vars (so adding tenants is operationally cheap).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-supabase-multitenancy-decoupled-backend.md.head220.txt`

- The research outputs include infrastructure-adjacent tools (feature flags, admin UIs, analytics) that can be treated as **pluggable providers** behind our platform domains, rather than being imported directly from UI/client code.  
  Evidence that platform domains already exist for feature flags/observability (meaning we have a place to hang these):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-domains-platform-files.find.txt`

---

## What is explicitly *not* in scope for this plan (for now)

- Choosing a specific OSS product for any capability (feature flags, analytics, CMS) is not required to finalize the backend/frontend boundary.  
  Evidence that the boundary is already being shaped by internal ports and Cloudflare `/api/*` instead:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/platform-ports-files.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/functions-api-handlers.clean.rg.txt`

- Competitor feature parity research is not a prerequisite for the “swap-ability” goal. The acceptance gates + contract boundary are the prerequisite.  
  Evidence that acceptance gates and boundary contract are already drafted:  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-acceptance-gates.md.head120.txt`  
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/plan-backend-boundary-contract-v0.md.head120.txt`
