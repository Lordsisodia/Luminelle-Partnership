---
step: 0059
created_at: "2025-12-30 19:03"
title: "Checkpoint: Cycle 55 — Promotions measurement build vs integrate classification"
---

# Step 0059: Checkpoint: Cycle 55 — Promotions measurement build vs integrate classification

## ✅ What I did (facts)

- Added “Tranche #27 — Promotions measurement” to `artifacts/build-vs-integrate-matrix.md`, classifying promo inventory, attribution rollups, cohorts, holdouts/experiments, stacking overlap, abuse monitoring, and event pipeline needs.
- Anchored the tranche on existing evidence for Shopify discount inventory primitives, order truth access, and analytics/experimentation/event pipeline references. (S247, S210, S195–S199, S194)
- Updated required logs for this cycle: `artifacts/agent-plan.md`, `artifacts/search-log.md`, `artifacts/summary.md`, `artifacts/output-index.md`, `artifacts/skills-log.md`, `artifacts/prompt-log.md`, and `context/context.md`.

## 🧠 What I learned (new information)

- Promotions measurement is primarily “derived analytics + metric governance”: Shopify supplies discount/order truth, but ROI/cohort/overlap calculations depend on a consistent event schema and versioned KPI definitions. (S196, S197, S199)
- Abuse monitoring is best expressed as scheduled rules + alerts rather than ad-hoc dashboards. (S229)

## 🧭 What changes because of this

- Default recommendation becomes: treat promotions measurement as a first-class analytics domain with a metric registry and scheduled rollups; keep promo application logic in Shopify and store only derived results/flags.

## ➡️ Next step

- Classify Tranche #25 Shipping exceptions refresh (or re-run a short “API primitives upgrade pass” to replace help-center-only evidence with Shopify dev docs where possible).

## 🔗 Links / references

- `artifacts/build-vs-integrate-matrix.md` — Tranche #27 promotions measurement classification.
- `artifacts/sources.md` — S247 (discount inventory), S195 (experiments), S198/S199 (analytics/event pipeline), S196–S197 (metrics plumbing).
