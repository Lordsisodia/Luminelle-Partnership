# Sources (internal paths)

This loop is based on **direct inspection of the repository** (no external web research required).

Format:
- file path
  - Supports: what claim/data this source backs
  - Accessed: YYYY-MM-DD
  - Confidence: High | Medium | Low

## Loop scaffolding

- `docs/.blackbox/.prompts/backend-frontend-interchangeability-loop.md`
  - Supports: the 50-prompt first-principles procedure.
  - Accessed: 2025-12-29
  - Confidence: High

- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/invariants-and-acceptance.md`
  - Supports: invariants + acceptance checks.
  - Accessed: 2025-12-29
  - Confidence: High

- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/inspect-first.md`
  - Supports: initial ordered inspection list.
  - Accessed: 2025-12-29
  - Confidence: High

- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/inspect-first-backend.md`
  - Supports: ordered backend inspection list (Cloudflare Functions boundary + proxy/handoff + webhook seams).
  - Accessed: 2025-12-31
  - Confidence: High

- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/research-index.md`
  - Supports: which research runs were ingested vs out-of-scope (prevents plan sprawl).
  - Accessed: 2025-12-31
  - Confidence: High

## Repo architecture context (pre-existing)

- `docs/05-planning/research/lumelle-architecture-map.md`
  - Supports: macro architecture map from `src/`.
  - Accessed: 2025-12-29
  - Confidence: High

- `docs/05-planning/research/supabase-multitenancy-decoupled-backend.md`
  - Supports: multi-tenant Supabase + backend boundary plan.
  - Accessed: 2025-12-29
  - Confidence: Medium

## Upstream research runs (internal blackbox plans)

- `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/final-report.md`
  - Supports: ports/adapters plugin framing and capability-driven UI guidance (Shopify now, Stripe later).
  - Accessed: 2025-12-31
  - Confidence: High

- `docs/.blackbox/.plans/2025-12-29_0741_ui-infra-key-mapping-migration-remove-shopify-gids/final-report.md`
  - Supports: early execution plan for removing Shopify GIDs above adapters (v0 key encoding approach).
  - Accessed: 2025-12-31
  - Confidence: Medium

- `docs/.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-01-feature-hunt-oss-harvest-015445/artifacts/summary.md`
  - Supports: research-derived “durable patterns” for admin primitives (RBAC/audit/automation/queues) that inform platform domain expansion.
  - Accessed: 2025-12-31
  - Confidence: Medium

## Enforcement / measurement tools

- `docs/.blackbox/scripts/check-vendor-leaks.sh`
  - Supports: measurable “no vendor IDs above adapters” gate.
  - Accessed: 2025-12-29
  - Confidence: High
