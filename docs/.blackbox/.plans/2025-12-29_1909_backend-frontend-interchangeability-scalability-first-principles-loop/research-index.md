# Research Index (what we already gathered + what we actually used)

Purpose:
- Prevent “research sprawl” by making it explicit which research inputs are:
  - already ingested into this plan (self-contained via snapshots)
  - relevant but not yet ingested (optional)
  - out of scope for the backend/frontend boundary work

Evidence rule:
- Any claim about “what the research says” must cite a file under:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

---

## 1) Research already ingested (self-contained in this plan)

These are the inputs currently used to justify architecture expansion choices (RBAC/audit/flags/automation) and the core “UI ↔ infra plugin” seam.

### 1.1 UI ↔ infra plugin architecture (ports/adapters + capability-driven UI)

- Excerpt (from the research doc we pinned into this plan):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-plugin-architecture.md.head220.txt`
- Upstream deep-research plan (more complete narrative; referenced as historical context):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-2014-ui-infra-plugin.final-report.head140.txt`

### 1.2 “Internal API first” (why `/api/*` is the seam)

- Excerpt:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-port-implementation-strategy.md.head220.txt`

### 1.3 Key mapping strategy (why vendor IDs can’t be in UI/client)

- Excerpt (strategy framing):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-ui-infra-key-mapping-strategy.md.head220.txt`
- Upstream execution plan (earlier v0 “encode Shopify GIDs as VariantKeys” approach; now superseded by PR7 v0/v1 split in this plan):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-0741-key-mapping.final-report.head200.txt`

### 1.4 Supabase multitenancy (decoupled backend posture)

- Excerpt:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-supabase-multitenancy-decoupled-backend.md.head220.txt`

### 1.5 Feature research synthesis (what primitives compound)

We use this only for “platform expansion domain” selection (not to justify the core boundary decision).

- Feature synthesis excerpt (high-level):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-summary.head220.txt`
- SAFE-only OSS shortlist excerpt (license posture sanity check):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/feature-research-oss-ranked-safe-only.head160.txt`
- Upstream step-01 summary excerpt (detailed “durable patterns” notes, including security primitives like RBAC/audit/webhook verification):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-feature-research-step01.summary.head120.txt`

### 1.6 OSS catalog shortlist excerpts (optional accelerators)

We use this only to optionally accelerate platform domains (authz/audit/automation/flags).  
It is **not** required for the backend/frontend swap boundary.

- OSS mapping doc (this plan): `oss-platform-primitives-map.md`
- Evidence excerpts pinned into this plan (from `docs/.blackbox/oss-catalog/shortlist.md`):
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-shortlist.policy.1-120.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-shortlist.policy.300-340.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-shortlist.audit.45-105.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-shortlist.workflows.250-340.txt`
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-shortlist.flags.1318-1345.txt`

### 1.7 Architecture map + coupling report (historical context)

This earlier run mapped `src/` and identified coupling hotspots (vendor IDs/copy/shims).  
It overlaps heavily with this plan’s `architecture-atlas.md` + vendor leak gates, but it’s useful as an independent cross-check.

- Final report excerpt:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-1844-architecture-map-improvements.final-report.head220.txt`
- Coupling report excerpt:  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-1844-architecture-map-improvements.coupling-report.head200.txt`

### 1.8 Storefront primitives kit + Blocks Kit (UI modularity accelerators)

We use this to justify:
- treating “storefront primitives” as a repeatable kit (not page glue)
- making `Product/Variant/Cart` DTOs and URL-synced state first-class primitives
- keeping UI blocks provider-agnostic (Shopify now, other commerce backends later)

Evidence excerpts pinned into this plan:
- Storefront kit mini‑POC checklist excerpt (DTOs + primitives called out explicitly):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-0647-storefront-kit.step0001.head220.txt`
- Storefront kit checkpoint excerpt (what was updated in the OSS catalog + why):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-0647-storefront-kit.step0002.head220.txt`
- Storefront primitives inventory excerpt (v1.5 PLP/PDP/cart acceptance criteria):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-blocks-inventory.storefront-v1.5.150-270.txt`
- Storefront pattern mining index excerpt (pattern → canonical repos):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-storefront-reference-set.head170.txt`
- Blocks Kit contracts excerpt (stable UI contracts + acceptance criteria):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-blocks-kit-contracts.head200.txt`
- Component source map excerpt (exact file pointers, no cloning):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/oss-catalog-component-source-map.head200.txt`

### 1.9 Blog page kit + sections kit (content UI modularity accelerators)

We use this to justify:
- treating “blog / content pages” as a repeatable kit (not one-off page glue)
- separating *markup contracts* from *interactive behavior* early, so UI remains swappable and doesn’t lock into a single JS runtime/library

Evidence excerpts pinned into this plan:
- Blog kit mini‑POC checklist excerpt (pipeline + TOC + code blocks + marketing blocks):  
  `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-0551-blog-kit.step0002.head220.txt`

Upstream plan folder (more complete context; referenced as historical context):
- `docs/.blackbox/.plans/2025-12-31_0551_component-mining-mini-poc-blog-sections-kit/`

---

## 2) Research present in the repo but not yet ingested into this plan

This plan intentionally does **not** ingest every `.blackbox/.plans/**` run. Most runs are “product/UX benchmarking” or “OSS discovery” and aren’t required to define the swap boundary.

If you want to mine more, the safe method is:
- search first: `rg -n \"(swapp|ports|adapters|tenan|boundary|api/\\*|cache|rbac|audit)\" .blackbox/.plans -S`
- ingest by copying excerpts into this plan’s `artifacts/snapshots/` (so citations remain local)

Quick index (plan-folder name scan; helps avoid browsing noise):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/research-plan-folders.related.latest.txt`

---

## 3) What is explicitly out of scope for this plan (for now)

- Competitor/benchmark feature parity is not required to establish:
  - the canonical backend boundary (`functions/api/**`)
  - the “no vendor IDs above adapters” rule
  - tenancy resolution rules and caching rules

We treat benchmarks as optional inputs for later UI/product iterations.
