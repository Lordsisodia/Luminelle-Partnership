---
step: 0001
created_at: "2025-12-30 21:48"
title: "Checkpoint: snapshotted adjacent best-in-class + playbook"
---

# Step 0001: Checkpoint: snapshotted adjacent best-in-class + playbook

## ✅ What I did (facts)

- Created a dedicated `.blackbox` run folder for the adjacent best-in-class set:
  - `.blackbox/.plans/2025-12-30_2140_deep-research-ecommerce-benchmark-adjacent-best-in-class`
- Snapshotted 29 curated adjacent stores (homepages) with stable filenames:
  - Snapshots saved: 26 / 29
  - Snapshot evidence: `.blackbox/.plans/2025-12-30_2140_deep-research-ecommerce-benchmark-adjacent-best-in-class/artifacts/snapshots/homepages/`
- Ran automated signal extraction on the saved HTML snapshots:
  - `.blackbox/.plans/2025-12-30_2140_deep-research-ecommerce-benchmark-adjacent-best-in-class/artifacts/reports/store-snapshots-summary.csv`
  - `.blackbox/.plans/2025-12-30_2140_deep-research-ecommerce-benchmark-adjacent-best-in-class/artifacts/reports/store-snapshots-summary.md`
- Joined curated notes + snapshot signals into an enriched planning dataset:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-30.enriched.csv`
- Generated a grouped playbook view (by niche) with evidence links + snapshot signals:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-playbook.md`

## 🧠 What I learned (new information)

- Even in a handpicked “best-in-class” list, bot protection is common: 3 / 29 homepages tripped blocked/defended heuristics, and 3 URLs timed out during snapshotting (OUAI, Drunk Elephant, REI).
- Adjacent niches show different “conversion mechanics” emphasis:
  - Beauty skews toward routine-building, social proof, subscriptions.
  - Pets and grocery emphasize reorder/autoship and retention loops.
  - Home and large-ticket goods emphasize specs, financing, delivery/returns clarity.

## 🧭 What changes because of this

- Adjacent benchmarks are now evidence-linked and searchable just like the women’s fashion set, making it easier to borrow specific mechanics (not vibes).
- We can now compare “what vendors/mechanics show up” across fashion vs non-fashion cohorts using the same snapshot-signal approach.

## ➡️ Next step

- Pull the most transferable patterns from the adjacent playbook (subscriptions, loyalty, onboarding, reorder loops) and map them into the women’s fashion conversion checklist/backlog.
- If needed, retry snapshotting the 3 timed-out sites with a higher timeout and/or different URL variants.

## 🔗 Links / references

- Adjacent enriched dataset: `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-30.enriched.csv`
- Adjacent playbook: `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-playbook.md`
- Snapshot report: `.blackbox/.plans/2025-12-30_2140_deep-research-ecommerce-benchmark-adjacent-best-in-class/artifacts/reports/store-snapshots-summary.md`
