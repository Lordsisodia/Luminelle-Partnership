---
step: 0002
created_at: "2025-12-30 22:23"
title: "Checkpoint: Ranked top picks from snapshot signals"
---

# Step 0002: Checkpoint: Ranked top picks from snapshot signals

## ✅ What I did (facts)

- Added a repeatable heuristic ranking script:
  - `.blackbox/scripts/research/rank_adjacent_best_in_class.py`
- Generated a full ranked CSV for the adjacent (100) list:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-100.ranked.csv`
- Generated an evidence-linked “top picks” markdown (top overall + top per niche):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-100.top-picks.md`
- Updated the benchmarking index + ledger to reflect these new deliverables:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`
  - `08-meta/repo/docs-ledger.md`

## 🧠 What I learned (new information)

- The top overall list is currently dominated by niches whose homepages expose more detectable tooling (beauty DTC + beverage DTC), which is useful but introduces scoring bias.
- Some “big retail” targets remain under-scored due to missing snapshots/timeouts; they need manual verification if we want to treat them as best-in-class exemplars.

## 🧭 What changes because of this

- We have a fast way to select the next manual audit shortlist (top 15 overall or top 2 per niche) with explicit evidence pointers.
- The adjacent best-in-class dataset is now not just “a list” but a triage-able ranked artifact.

## ➡️ Next step

- Translate the top ~15 most transferable patterns into the existing pattern library + backlog mapping, and mark which are “women’s fashion must-haves” vs “nice-to-have”.

## 🔗 Links / references

- Ranking outputs:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-100.top-picks.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-100.ranked.csv`
- Evidence base:
  - `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/artifacts/snapshots/homepages/`
