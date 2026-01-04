---
step: 0003
created_at: "2025-12-31 06:16"
title: "Mining notes + storefront additions checkpoint"
---

# Step 0003: Mining notes + storefront additions checkpoint

## ✅ What I did (facts)

- Finished the “Mining notes (Blocks Kit v1)” scaffolding for the remaining deepen section/component sources in:
  - `docs/.blackbox/oss-catalog/curation.json`
  - updated repos: `saadeghi/daisyui`, `markmead/hyperui`, `themesberg/flowbite`, `mertJF/tailblocks`, `merakiuilabs/merakiui`
- Ran targeted storefront discovery passes to find real storefront/starter codebases and seeded any new repos into curation.
  - Net new addition: `lambda-curry/medusa2-starter` (MIT) → promoted to `status=deepen` with storefront mining notes.
- Refreshed rendered artifacts + snapshot docs:
  - `docs/.blackbox/oss-catalog/shortlist.md`
  - `docs/.blackbox/oss-catalog/poc-backlog.md`
  - `docs/.blackbox/oss-catalog/risk.md`
  - `docs/.blackbox/oss-catalog/inventory.md`
  - `docs/.blackbox/oss-catalog/gaps.md`
  - `docs/.blackbox/oss-catalog/next-plan.md`
  - `docs/.blackbox/oss-catalog/lanes/storefront-content.md`

## 🧠 What I learned (new information)

- For storefront/template hunting, the default global excludes (“template/starter/boilerplate”) are counterproductive; we should override excludes per-lane to avoid filtering out exactly the repos we want.
- Storefront discovery is showing diminishing returns at higher star thresholds because we already cataloged many top repos; “prefer-new” often leaves a tiny tranche.
- GitHub Search rate limits can trigger during boost/top-up stages; keeping query budgets small and disabling boosts for targeted passes improves reliability.

## 🧭 What changes because of this

- The component-mining plan is now unblocked: the “what to mine” notes are embedded directly in curation, so an engineer can jump from block → source repo quickly.
- Future storefront runs should be treated as “pattern reference collection”, not volume scraping:
  - prefer precise query packs
  - keep boosts disabled
  - accept that <3 new repos/run is a stop signal unless we change the query strategy

## ➡️ Next step

- Execute the 1‑day Blog Page Kit mini‑POC checklist (Step 0002) in a scratch app or the product repo, and capture artifacts in this plan folder (`artifacts/run-meta.yaml`, `artifacts/sources.md`, `artifacts/summary.md`).

## 🔗 Links / references

- `docs/.blackbox/oss-catalog/curation.json`
- `docs/.blackbox/oss-catalog/blocks-inventory.md`
- `docs/.blackbox/oss-catalog/component-mining-playbook.md`
- `docs/.blackbox/oss-catalog/lanes/storefront-content.md`
- `docs/.blackbox/oss-catalog/next-plan.md`
