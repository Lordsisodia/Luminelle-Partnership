---
step: 0002
created_at: "2025-12-30 17:24"
title: "Checkpoint: returns/shipping v3 (false-positive cleanup)"
---

# Step 0002: Checkpoint: returns/shipping v3 (false-positive cleanup)

## ✅ What I did (facts)

- Ran a targeted returns/shipping discovery pass using a v3 query pack with stricter CMS/portfolio excludes.
- Seeded the newest run into curation as `status=triage`.
- Kill-listed the newly seeded items that were clearly false positives (wrong domain).

## 🧠 What I learned (new information)

- Returns/shipping keyword searches at low star thresholds can still pull unrelated repos that mention “shipping” or have webhook/notification topics; these need immediate kill-listing to prevent churn.
- This indicates our current tag heuristics can misclassify “shipping” in unrelated contexts; the safest workflow is: **discover → seed → fast kill-list** for obvious non-commerce repos.

## 🧭 What changes because of this

- We should keep returns/shipping discovery running, but bias harder toward explicit terms like `rma`, `return label`, `carrier rate`, `tracking api`, `wms`, `3pl` and consider raising `--min-stars` slightly once we have enough candidates.

## ➡️ Next step

- Run a combined returns/shipping pass with more `topic:`-style queries and then promote 1–2 genuinely relevant repos to 1-day “domain primitive” POCs (RMA flow, label generation, tracking ingestion).

## 🔗 Links / references

- Query pack: `.blackbox/.local/github-search-queries.returns-shipping-v3.md`
- Plan: `.blackbox/.plans/2025-12-30_1722_oss-discovery-github-oss-discovery-cycle-172239`
- Catalog: `.blackbox/oss-catalog/catalog.json`
- Curation: `.blackbox/oss-catalog/curation.json`
