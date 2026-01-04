# Plan: blocks-kit v1 mini POC (blog + marketing + storefront)

## Goal
Produce a **ready-to-implement Blocks Kit v1** spec + mining pointers so engineering can build:
- blog/article blocks (MDX, TOC, code blocks, callouts),
- marketing sections (FAQ, pricing, testimonials, newsletter),
- storefront primitives (product cards, variant selector, cart drawer, facets),
without more OSS discovery churn.

## Created
2025-12-31 19:22

## Target (optional)
Timebox: **1 day** for “spec + mining pointers + POC plan”.

## Context
- Prompt: OSS discovery is saturated for storefront/blog/sections (recent passes produced 0 net-new curation).
- Constraint: no cloning/vendoring; only patterns + contracts + file pointers.
- Done definition:
  - Blocks Kit contracts are explicit and testable (acceptance criteria per block).
  - File pointers exist for each block in at least 2 OSS sources (safe licenses preferred).
  - A 1-day mini‑POC plan exists with measurable success criteria.

## Docs To Read (and why)
- [ ] `docs/.blackbox/oss-catalog/blocks-inventory.md` — the block list + current sources
- [ ] `docs/.blackbox/oss-catalog/component-source-map.md` — exact OSS file pointers
- [ ] `docs/.blackbox/oss-catalog/blocks-kit-contracts.md` — stable interfaces to implement
- [ ] `docs/.blackbox/oss-catalog/component-mining-playbook.md` — mining rules + license gating

## Plan Steps
- [ ] Step 1: Write Blocks Kit contracts (stable interfaces + acceptance criteria)
- [ ] Step 2: Ensure source map covers every contract (file pointers per block)
- [ ] Step 3: Write 1-day mini‑POC plan (what to build first + “done” checks)

## Artifacts (created/updated)
- `docs/.blackbox/oss-catalog/blocks-kit-contracts.md` — canonical contracts for Blocks Kit v1
- `docs/.blackbox/oss-catalog/component-source-map.md` — storefront + marketing file pointers
- `docs/.blackbox/oss-catalog/storefront-reference-set.md` — points to source map for exact locations

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- Licensing: `solidusio/solidus` and `spree/spree` are `license_bucket=verify` in our catalog → reference-only until verified.
- Framework choice: contracts are React-first, but patterns should remain portable.

## Notes / Revisions
- 2025-12-31: created plan skeleton (this folder).
