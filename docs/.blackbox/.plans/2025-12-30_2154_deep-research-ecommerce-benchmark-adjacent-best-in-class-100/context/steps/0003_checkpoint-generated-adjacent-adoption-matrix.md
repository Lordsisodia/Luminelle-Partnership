---
step: 0003
created_at: "2025-12-30 22:26"
title: "Checkpoint: Generated adjacent adoption matrix"
---

# Step 0003: Checkpoint: Generated adjacent adoption matrix

## ✅ What I did (facts)

- Added a generator script for a cross-niche adoption matrix:
  - `.blackbox/scripts/research/generate_adjacent_feature_adoption_matrix.py`
- Generated an evidence-linked adoption matrix for the adjacent (100) list:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-feature-adoption-matrix.md`
- Updated the benchmarking index + docs ledger:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`
  - `08-meta/repo/docs-ledger.md`

## 🧠 What I learned (new information)

- BNPL signals are common across niches and skew toward a few vendors in the 100-store set:
  - Klarna: 17 stores; Afterpay: 10; Affirm: 7 (from the adoption matrix).
- Reviews/social proof tooling shows a similar concentration (e.g., Yotpo and Bazaarvoice appear frequently), reinforcing that “reviews + UGC” is a cross-niche conversion default for many high-performing stores.

## 🧭 What changes because of this

- We now have an evidence-linked “feature inventory” of what modern e-commerce stacks look like across niches, which we can map directly into build decisions for women’s fashion (what to integrate vs what to defer).

## ➡️ Next step

- Use the adoption matrix + top picks ranking to produce a short “what to copy first” implementation roadmap for women’s fashion (features in build order, with examples + evidence).

## 🔗 Links / references

- Adoption matrix:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-feature-adoption-matrix.md`
- Input dataset:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-100.enriched.csv`
