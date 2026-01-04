# Rolling Context (read first)

Keep this compact and current. This file is the “always read” memory.

## Current goal

- Publish a “single pane of glass” synthesis for merchant-admin-first product decisions:
  - ranked build vs integrate recommendations (with thin-slice specs)
  - OSS accelerators + license posture
  - explicit next actions derived from known evidence gaps
  - references to where the women’s fashion conversion benchmarking outputs live (store list + patterns + audit harness)

Evidence pointers:
- Platform/feature synthesis: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/final-synthesis.md`
- Gap-driven queue: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/next-actions.md`
- Women’s fashion benchmark: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
- 100-store list: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.csv`

## Current assumptions / constraints

- Evidence-first: every durable claim must cite a URL or an on-disk artifact path (e.g. `artifacts/*`, competitor evidence files, or snapshot paths).
- License posture: prefer permissive OSS (MIT/Apache/BSD); flag GPL/AGPL/BUSL/SUL/ELv2/unknown (see: `artifacts/license-verification-sweep-002.json`).
- Research outputs are desk-research + artifacts; any “conversion truth” for stores still needs manual funnel audits (see: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/DASHBOARD.md`).
- Integration bias: prioritize “easy integration / low ops” primitives over building full subsystems early (encoded in `artifacts/feature-research-config.yaml`).

## Current best candidates / hypotheses

- Highest-leverage primitives to ship first (from `artifacts/final-synthesis.md`):
  - per-tenant feature flags + staged rollouts (thin slice: `artifacts/thin-slices/01_feature-flags-staged-rollouts-per-tenant.md`)
  - workflow automation hooks (thin slice: `artifacts/thin-slices/02_workflow-automation-hooks-triggers-actions-approvals.md`)
  - audit log + RBAC as safety rails for all admin actions (thin slices: `artifacts/thin-slices/03_audit-log-who-changed-what.md`, `artifacts/thin-slices/04_rbac-granular-permissions.md`)
- Women’s fashion “best in class” should be treated as a pattern source for:
  - PDP confidence builders (fit/size help, rich media, returns clarity)
  - cart/checkout friction removal (express pay, cart drawer, edit controls)
  - post-purchase margin protection (exchange-first, self-serve status)
  (evidence: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`)

## Open questions / decisions needed

1) Are we optimizing for:
   - a) merchant-admin platform primitives (internal ops tooling), OR
   - b) storefront conversion UX patterns (women’s fashion funnel)?
   Current artifacts cover both, but the backlog needs a single “north star” to rank tradeoffs.
2) What is the initial business model + integration boundary?
   - “Integrate-first behind a service boundary” is assumed in `artifacts/final-synthesis.md`, but needs confirmation for each primitive (flags/automation/search/CMS).
3) Which 3–5 women’s fashion stores should be manually audited first (PDP → cart → checkout) to convert homepage benchmarking into conversion-proof features?
   - Candidate shortlist is in `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md` (“Best models” section).

## Recent progress (latest 3–5)

- Feature-research synthesis artifacts exist and are internally linked:
  - ranked features: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/features-ranked.md`
  - ranked OSS: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-ranked.md`
  - thin slice specs: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/thin-slices/README.md`
- Women’s fashion benchmarking outputs are compiled (store list + synthesis):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.csv`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
- Manual funnel audit harness is scaffolded for a 15-store shortlist:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/DASHBOARD.md`
