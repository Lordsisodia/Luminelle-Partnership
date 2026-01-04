# Plan: Returns model mining (Saleor/Solidus/Spree)

## Goal
Extract a concrete, implementation-ready **returns/refunds/store-credit** domain model and workflow from high-signal OSS commerce platforms we already curate, without running more low-signal repo searches.

Deliverables:
- exact file pointers in upstream repos (no cloning) for:
  - return request / return line state models
  - refund + payment adjustment flows
  - store credit / gift card ledger concepts
  - audit/event logging hooks around returns decisions
- a “Lumelle mapping” summary (Shopify inputs → our internal objects → outputs)
- updates to the lane docs + source map so future work is “mining mode”, not “search mode”.

## Created
2025-12-31 21:32

## Target (optional)
2026-01-03 (timebox): enough signal to implement the first internal Returns v0 model + API contracts.

## Context
- Prompt:
  - `returns` tag coverage is still extremely shallow vs other ops primitives; repo search is now saturated/noisy.
- Constraints:
  - No cloning/vendoring OSS into this docs repo.
  - Use metadata + `gh api` only; capture links + file pointers + notes.
  - Prefer permissive licenses; copyleft is reference-only.
- Done definition:
  - Returns lane doc contains concrete “where to mine” pointers for 2–3 platforms.
  - Source map contains exact file pointers for return/refund/store-credit primitives.
  - We have a draft internal model sketch (entities + state machine) ready for engineering.

## Docs To Read (and why)
- [ ] `docs/.blackbox/oss-catalog/lanes/returns-store-credit.md` — current stop rules + existing keepers.
- [ ] `docs/.blackbox/oss-catalog/component-source-map.md` — where we already have file pointers (avoid duplicating).
- [ ] `docs/.blackbox/oss-catalog/curation.json` — which platforms are in watch/deepen and their license buckets.

## Plan Steps
- [ ] Step 1: Baseline gaps + target primitives list.
- [ ] Step 2: Mine Saleor return/refund/gift-card primitives (file pointers + model notes).
- [ ] Step 3: Mine Solidus/Spree store-credit + reimbursement flows (file pointers + model notes).
- [ ] Step 4: Publish updates (lane doc + source map + (optional) internal model sketch doc).

## Artifacts (created/updated)
- `docs/.blackbox/.plans/2025-12-31_2132_returns-model-mining-saleor-solidus-spree/artifacts/extracted.md` — mined file pointers + model notes (raw).
- `docs/.blackbox/.plans/2025-12-31_2132_returns-model-mining-saleor-solidus-spree/artifacts/summary.md` — concise “Lumelle mapping” summary.
- `docs/.blackbox/oss-catalog/lanes/returns-store-credit.md` — updated with “where to mine” pointers.
- `docs/.blackbox/oss-catalog/component-source-map.md` — updated returns/refunds/store-credit pointers.

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- Which OSS platform has the cleanest, most-minable return state machine representation (Saleor vs Solidus vs Spree)?
- How much of “store credit” we treat as a true ledger vs a balance field (audit requirements may force ledger).
- Shopify mapping: Shopify’s native objects may not represent returns as first-class in the same way; we may need an internal RMA object regardless.

## Notes / Revisions
- 2025-12-31: created plan; next steps are mining (not more discovery).
