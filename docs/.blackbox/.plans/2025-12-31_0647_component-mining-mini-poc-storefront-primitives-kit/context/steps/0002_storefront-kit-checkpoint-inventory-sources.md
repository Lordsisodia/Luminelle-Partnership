---
step: 0002
created_at: "2025-12-31 06:54"
title: "Storefront kit checkpoint (inventory + sources)"
---

# Step 0002: Storefront kit checkpoint (inventory + sources)

## ✅ What I did (facts)

- Updated the Blocks Inventory to include a v1.5 set of storefront primitives (PLP/PDP/cart):
  - `docs/.blackbox/oss-catalog/blocks-inventory.md`
- Added storefront-focused mining notes + tagging to key curated sources:
  - `Shopify/hydrogen-v1`, `Blazity/enterprise-commerce`, `withastro/storefront`, `vuestorefront/storefront-ui`
  - supporting primitives: `pbeshai/use-query-params` (URL state), `itemsapi/itemsjs` (facets model), `DivanteLtd/storefront-integration-sdk` (adapters), `basementstudio/commerce-toolkit` (toolkit patterns)
  - `docs/.blackbox/oss-catalog/curation.json`
- Created an evergreen storefront pattern-mining index (pattern → best repos):
  - `docs/.blackbox/oss-catalog/storefront-reference-set.md`
- Wrote an engineer-executable 1-day mini‑POC checklist for the storefront kit:
  - `docs/.blackbox/.plans/2025-12-31_0647_component-mining-mini-poc-storefront-primitives-kit/context/steps/0001_1-day-storefront-kit-mini-poc-checklist.md`
- Updated snapshots + routing:
  - `docs/.blackbox/oss-catalog/inventory.md` (status counts)
  - `docs/08-meta/repo/docs-ledger.md` (append-only registry)
  - `docs/.blackbox/journal.md` (blackbox journal)

## 🧠 What I learned (new information)

- The main risk is no longer “missing repos”; it’s inconsistent contracts and UI state semantics across different starters/libraries.
- URL-synced state (filters/pagination/saved views) is a shared primitive across storefront and admin; treating it as “page glue” leads to rework.
- We should keep storefront mining centered on 4 canonical sources (Hydrogen + 2 alternates + 1 UI primitives lib) and stop expanding the set unless a primitive is missing.

## 🧭 What changes because of this

- The storefront sourcing loop shifts from discovery to execution: build a small primitives kit and only return to search when we hit a concrete gap.
- We now have a repeatable “kit-first” workflow:
  - inventory defines the primitives and acceptance criteria
  - reference set defines where to mine patterns
  - curation notes capture extraction targets per repo
  - mini‑POC checklist validates the kit in 1 day

## ➡️ Next step

- Execute the 1‑day Storefront Primitives Kit mini‑POC checklist and capture artifacts in this plan folder (`artifacts/run-meta.yaml`, `artifacts/sources.md`, `artifacts/summary.md`).

## 🔗 Links / references

- `docs/.blackbox/oss-catalog/blocks-inventory.md`
- `docs/.blackbox/oss-catalog/storefront-reference-set.md`
- `docs/.blackbox/oss-catalog/curation.json`
- `docs/.blackbox/oss-catalog/lanes/storefront-content.md`
