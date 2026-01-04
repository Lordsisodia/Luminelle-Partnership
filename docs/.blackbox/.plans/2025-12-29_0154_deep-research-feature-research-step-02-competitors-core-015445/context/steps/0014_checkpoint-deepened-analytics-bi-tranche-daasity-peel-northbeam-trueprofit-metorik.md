---
step: 0014
created_at: "2025-12-29 21:46"
title: "Checkpoint: deepened analytics/BI tranche (Daasity/Peel/Northbeam/TrueProfit/Metorik)"
---

# Step 0014: Checkpoint: deepened analytics/BI tranche (Daasity/Peel/Northbeam/TrueProfit/Metorik)

## ✅ What I did (facts)

- Snapshotted and extracted evidence for tranche-10 analytics/BI competitors (N=5):
  - Daasity, Peel, Northbeam, TrueProfit, Metorik
- Captured durable snapshots for home + variant pages (pricing/product/integrations/docs/listings where available):
  - `competitors/snapshots-home/daasity.html`, `competitors/snapshots-home/peel.html`, `competitors/snapshots-home/northbeam.html`, `competitors/snapshots-home/trueprofit.html`, `competitors/snapshots-home/metorik.html`
  - Northbeam product/docs fixups: `competitors/snapshots-variants/northbeam-multi-touch-attribution.html`, `competitors/snapshots-variants/northbeam-profit-benchmarks.html`, `competitors/snapshots-variants/northbeam-docs-getting-started.html`
  - Shopify listing evidence where durable: `competitors/snapshots-variants/daasity-shopify-app-store.html`, `competitors/snapshots-variants/trueprofit-shopify-app-store-dup.html`
- Recovered evidence from URL drift/404s by creating fixup URL lists (timeboxed, no spiraling):
  - Daasity `/pricing` and `/product` returned Not Found; used Shopify listing + integration pages instead. Evidence: `competitors/evidence/daasity.md`.
  - Northbeam `/product` returned Not Found; used `/products/*` + `/features/*` pages from navigation. Evidence: `competitors/evidence/northbeam.md`.
- Generated standardized evidence extracts and appended tranche-10 deep dives (3 features, 2 workflows, 3 steal ideas):
  - `competitors/evidence/daasity.md`
  - `competitors/evidence/peel.md`
  - `competitors/evidence/northbeam.md`
  - `competitors/evidence/trueprofit.md`
  - `competitors/evidence/metorik.md`
- Updated shared artifacts:
  - `artifacts/competitor-matrix.md` (added tranche-10 analytics blocks)
  - `artifacts/sources.md` (added tranche-10 URLs + confidence notes)
  - `artifacts/summary.md` (added tranche-10 durable insights)

## 🧠 What I learned (new information)

- “Automation / time-to-first-insight” is the dominant positioning lever in ecommerce analytics tooling (automated insights > manual dashboard building). Evidence: `competitors/evidence/peel.md`, `competitors/evidence/daasity.md`.
- Profit-first analytics is a distinct wedge:
  - TrueProfit focuses on profit calculation with costs + ad spend + product analytics + scheduled reporting. Evidence: `competitors/evidence/trueprofit.md`.
  - Northbeam frames “profit benchmarks” as an optimization artifact alongside attribution/MMM. Evidence: `competitors/evidence/northbeam.md`.
- Segmentation depth matters for more advanced merchants:
  - Daasity explicitly calls out B2B vs D2C cuts and sales rep/territory filtering in listing screenshots. Evidence: `competitors/evidence/daasity.md`.
- Docs remain a meaningful product surface in attribution/analytics (complexity requires structured onboarding). Evidence: `competitors/evidence/northbeam.md`.

## 🧭 What changes because of this

- A build-ready analytics thin slice should prioritize: connect → default dashboards → clear “next actions”, instead of starting with a generic BI builder. Evidence: `competitors/evidence/peel.md`, `competitors/evidence/daasity.md`.
- Profit-first reporting (P&L-like views that incorporate costs + ad spend) is a strong wedge because it maps to merchant decision-making better than ROAS-only dashboards. Evidence: `competitors/evidence/trueprofit.md`.
- For Shopify Plus / B2B merchants, segmentation dimensions (B2B vs D2C, rep/territory) are likely differentiators that basic analytics won’t cover. Evidence: `competitors/evidence/daasity.md`.

## ➡️ Next step

- Append Cycle 10 logs (output-index already updated) and run validator:
  - `python3 .blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445 --kind step-02`
- Pick next tranche (N=3–6) from `artifacts/competitor-seeds.txt` (good next: marketing automation/journeys or search/merchandising deepening if not already sufficient).

## 🔗 Links / references

- Matrix: `artifacts/competitor-matrix.md`
- Sources: `artifacts/sources.md`
- Summary: `artifacts/summary.md`
- Evidence:
  - `competitors/evidence/daasity.md`
  - `competitors/evidence/peel.md`
  - `competitors/evidence/northbeam.md`
  - `competitors/evidence/trueprofit.md`
  - `competitors/evidence/metorik.md`
