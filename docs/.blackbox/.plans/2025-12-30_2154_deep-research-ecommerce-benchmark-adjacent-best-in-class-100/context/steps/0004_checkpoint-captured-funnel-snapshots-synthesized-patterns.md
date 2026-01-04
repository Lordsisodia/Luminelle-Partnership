---
step: 0004
created_at: "2025-12-30 22:37"
title: "Checkpoint: Captured funnel snapshots + synthesized patterns"
---

# Step 0004: Checkpoint: Captured funnel snapshots + synthesized patterns

## ✅ What I did (facts)

- Built a Tier‑B funnel snapshot seed set for the adjacent Top‑15 stores by extracting candidate URLs from homepage snapshots:
  - `.blackbox/scripts/research/build_funnel_snapshot_seeds_from_homepage.py`
  - Seeds: `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifact-seeds/adjacent-top15-funnel-seeds.txt`
  - Seed plan: `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/reports/adjacent-top15-funnel-seed-plan.md`
- Captured 51/51 funnel page HTML snapshots (collection/product/returns/shipping/support):
  - `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/snapshots/funnel-top15/`
- Summarized the funnel snapshots into CSV/MD:
  - `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/reports/adjacent-top15-funnel-snapshots-summary.csv`
  - `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/reports/adjacent-top15-funnel-snapshots-summary.md`
- Wrote a build-oriented synthesis mapping cross‑niche patterns → women’s fashion:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-top15-transferable-patterns.md`

## 🧠 What I learned (new information)

- Tier‑B “beyond homepage” snapshots are dramatically more informative than homepage-only scans:
  - 0/51 blocked in the Top‑15 funnel snapshot pack.
  - Vendor/tooling signals become much clearer on product/policy pages than on homepages.
- In the adjacent Top‑15 funnel pages, some tools are effectively “default stack” across high-performers:
  - Reviews: nearly universal (Yotpo/Okendo/Trustpilot/Bazaarvoice all common).
  - Support: Gorgias frequently present.
  - Search/personalization: Dynamic Yield, Klevu, Searchspring, Rebuy appear repeatedly.
  - Returns tooling is less universal but still clearly present (Narvar / Happy Returns).

## 🧭 What changes because of this

- We can now cite Tier‑B evidence paths for key patterns (returns center, policy clarity, support/help placement) without waiting for screenshots.
- The women’s fashion checklist can incorporate cross-niche learnings in a build-first order, while reserving checkout/carts for Tier‑A audits.

## ➡️ Next step

- Decide whether to:
  - expand funnel snapshots from Top‑15 → Top‑30 (more niches), or
  - invest in Tier‑A manual audits (screenshots) for the women’s fashion shortlist to finalize pattern cards + backlog mapping.

## 🔗 Links / references

- Synthesis:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-top15-transferable-patterns.md`
- Funnel evidence pack:
  - `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/snapshots/funnel-top15/`
  - `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/reports/adjacent-top15-funnel-snapshots-summary.md`
