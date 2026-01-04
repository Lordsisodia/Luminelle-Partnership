---
status: draft
last_reviewed: 2025-12-29
owner: growth
---

# Batch 03 — Manual Audit Queue (editorial DTC + marketplaces + bot-protected)

Batch 03 rounds out the shortlist with:
- **editorial French DTC** (Rouje)
- **contemporary designer DTC / legacy retail UX** (Ganni)
- **marketplaces & resale** (SSENSE, thredUP)
- **bot-protected premium leaders** (DÔEN, Lululemon)

## Desk research (already captured)

Targets + HTML snapshots:
- Batch 03 target URLs: `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/targets/batch-03-urls.txt`
- Batch 03 snapshot folder: `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/snapshots/batch-03/`

Automated tooling signals (triage only):
- Per-page signals: `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-03/batch-03-snapshots-summary.csv`
- Store rollup: `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-03/batch-03-store-rollup.csv`
- Findings note (by store): `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/reports/batch-03/batch-03-findings-by-store.md`

## Key observation: heavy bot protection in this batch

Automated snapshots show strong bot defenses on:
- **DÔEN** (Cloudflare “Just a moment…”)
- **SSENSE** (Cloudflare “Just a moment…”)
- **thredUP** (Cloudflare “Just a moment…”)
- **Lululemon** (“Access Denied” pages)

This is expected. For these stores:
- automated desk research is useful mainly to confirm “blocked vs reachable”
- real UX learnings must come from **manual, human-in-browser audits**
- follow: `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/bot-protection-playbook.md`

## Recommended manual-audit order (maximize learnings per hour)

1) **Rouje** — likely fully reachable; good for editorial merchandising + feminine brand voice + sizing/returns framing
2) **Ganni** — reachable; good for global localization + trust cues + help center UX + BNPL placement
3) **SSENSE** — manual-only; assess discovery/search/filter and PDP layouts if reachable in-browser
4) **thredUP** — manual-only; assess deal UX, condition taxonomy, saved-search loops
5) **DÔEN** — manual-only; assess editorial merchandising + PDP storytelling (if reachable)
6) **Lululemon** — manual-only; assess fit confidence + fabric/tech education (if reachable)

## What to do (per store)

For each store, do both **desktop** + **mobile**:
1) Homepage → PLP → PDP → cart → checkout start → shipping/returns/size guide
2) Capture screenshots following the checklist:
   - `docs/.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/artifacts/evidence/<store>/CHECKLIST.md`
3) Fill the store audit doc:
   - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/<store>.md`
4) Fill the scorecard rows (desktop + mobile):
   - `docs/05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/scorecard.csv`

