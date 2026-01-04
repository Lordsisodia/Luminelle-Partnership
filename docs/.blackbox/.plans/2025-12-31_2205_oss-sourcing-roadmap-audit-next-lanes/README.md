# Plan: OSS sourcing roadmap (audit + next lanes)

## Goal
Maintain a **high-signal OSS catalog + curation** for Lumelle (Shopify-connected e-commerce ops), so we can:
- stop “infinite repo searching” and instead keep a small **POC backlog** with clear decisions,
- mine mature OSS codebases for patterns (storefront/blog/returns) without adopting risky licenses,
- keep discovery runs repeatable (commands + stop rules) and measurable (tag coverage + deltas).

## Created
2025-12-31 22:05

## Target (optional)
Ongoing, with a “weekly loop”: run 1–2 targeted discovery passes, then promote a few to `deepen` / `poc`.

## Context
- Prompt: we want an agentic system that keeps finding useful OSS (GitHub + internet), but avoids churn.
- Current state (snapshot):
  - Catalog: ~`1080` repos
  - Curation: ~`756` items (triage/deepen/poc/watch/reject)
  - Gap: `returns` coverage is still low vs other tags.
- Constraints:
  - **Do not paste/commit tokens**; use GitHub CLI auth + `GITHUB_TOKEN="$(gh auth token)" ...`
  - Prefer metadata + pointers; avoid cloning/vendoring repos into `docs/` unless explicitly requested.
  - Treat copyleft (GPL/AGPL) as **reference-only** by default.
- “Done enough” (per `search-focus.md`):
  - Curated shortlist: `10–25` strong candidates
  - POC backlog: `3–6` with timeboxed scope + measurable acceptance criteria
  - Tag gaps reduced (especially `returns`, `policy`, `support` where needed)

## Docs To Read (and why)
- [ ] `.blackbox/oss-catalog/search-focus.md` — what we are looking for + stop rules
- [ ] `.blackbox/oss-catalog/lanes/storefront-content.md` — storefront/blog pattern mining lane + recommended run commands
- [ ] `.blackbox/oss-catalog/lanes/returns-store-credit.md` — returns/store-credit mining lane + “where to mine” pointers
- [ ] `.blackbox/.prompts/oss-discovery-loop-pack.md` — pasteable loop prompts (agent runs)
- [ ] `.blackbox/deepresearch/2025-12-31_returns-domain-model-contrast-saleor-spree-solidus.md` — returns domain primitives + license stance

## Plan Steps
- [x] Step 1: Capture baseline catalog/curation metrics (counts + tag coverage)
- [x] Step 2: Run a storefront/content pass (pattern mining) and measure delta
- [x] Step 3: Run a returns/shipping pass (gap fill) and measure delta
- [ ] Step 4: Promote best new finds to `deepen` (pattern mining) and write “what to mine” pointers
- [ ] Step 5: License cleanup sweep (top stars in `verify`/`flagged`) → `watch`/`reject`
- [ ] Step 6: Convert 3–6 best candidates into POCs (1–2 day timebox) and stop searching

## Artifacts (created/updated)
- `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/metrics.md` — current snapshot counts + links to recent runs
- `.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/metrics.json` — machine-readable snapshot

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- Risk: diminishing returns from broad GitHub search as the catalog saturates → enforce stop rules and rotate lanes.
- Risk: license ambiguity overwrites verified decisions → keep “verified license wins” behavior (see catalog merge code).
- Risk: “returns” OSS is niche; best value may come from **mining** mature platforms (Saleor/Solidus) vs finding portals.

## Notes / Revisions
- 2025-12-31: seeded metrics snapshot + ran storefront/content + returns/shipping passes; captured deltas.
