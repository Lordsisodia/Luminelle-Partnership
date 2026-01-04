---
step: 0001
created_at: "2025-12-31 19:29"
title: "Blocks Kit contracts + file pointers + mini-POC plan"
---

# Step 0001: Blocks Kit contracts + file pointers + mini-POC plan

## ✅ What I did (facts)

- Created canonical Blocks Kit contract spec: `docs/.blackbox/oss-catalog/blocks-kit-contracts.md`.
- Expanded `docs/.blackbox/oss-catalog/component-source-map.md` with:
  - marketing sections file pointers (FAQ/pricing/testimonials/newsletter)
  - storefront file pointers (Hydrogen v1 + Enterprise Commerce + Storefront UI)
- Added a 1-day execution checklist: `docs/.blackbox/.plans/2025-12-31_1922_blocks-kit-v1-mini-poc-blog-marketing-storefront/artifacts/mini-poc-plan.md`.
- Linked the new contracts doc from:
  - `docs/.blackbox/oss-catalog/blocks-inventory.md`
  - `docs/.blackbox/oss-catalog/component-mining-playbook.md`
  - `docs/.blackbox/oss-catalog/next-plan.md`
- Updated docs routing for findability:
  - `docs/08-meta/repo/docs-ledger.md`
  - `docs/.blackbox/journal.md`
- Rendered OSS artifacts + ran hygiene checks (`render-oss-catalog.sh`, `check-blackbox.sh`).

## 🧠 What I learned (new information)

- The “front-end blocks” lanes (storefront/blog/sections) are saturated for repo discovery; new net value comes from mining, not more search.
- HyperUI stores many blocks as raw copy/paste HTML under `public/components/marketing/*` (useful for fast section patterns).
- Tailblocks stores blocks in a composable structure under `src/blocks/*` (good for targeted extraction).
- Storefront UI has a clean primitive structure in `packages/sfui/frameworks/react/components/*` (drawer, chips, accordion item, rating, scrollable).

## 🧭 What changes because of this

- We can now implement Blocks Kit v1 from a stable spec (contracts) without further OSS discovery.
- OSS usage shifts to “read these files for patterns” (source map) rather than adding more repos.
- License gating is explicit: only copy from `license_bucket=safe`; treat `verify` as reference-only.

## ➡️ Next step

- Execute the mini‑POC in a throwaway app (outside this docs repo) using the contracts + source map; capture results as a short evergreen note (what worked / what needs redesign).

## 🔗 Links / references

- Contracts: `docs/.blackbox/oss-catalog/blocks-kit-contracts.md`
- File pointers: `docs/.blackbox/oss-catalog/component-source-map.md`
- Execution checklist: `docs/.blackbox/.plans/2025-12-31_1922_blocks-kit-v1-mini-poc-blog-marketing-storefront/artifacts/mini-poc-plan.md`
