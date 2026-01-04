---
status: draft
last_reviewed: 2025-12-31
owner: growth
---

# Top‑25 apparel-first — Audit Dashboard

This dashboard is the “single place” to run and review the **Top‑25 apparel-first** manual audit workflow.

## Key links

- Benchmark narrative: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
- Tier‑B patterns note (prevalence + evidence pointers): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-patterns.md`
- Tier‑B cart/checkout prevalence (express checkout signals): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-cart-checkout-patterns.md`
- Tier‑B checkout signal triage (which stores to screenshot first for checkout UX): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-checkout-signal-triage.md`
- Tier‑A screenshot checklist (URLs + what to capture): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/womens-top25-tier-a-screenshot-capture-checklist.md`
- Evidence root (drop screenshots per store): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/`
- Evidence naming rules (generated): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence-naming.md`
- Evidence coverage report (generated): `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence-coverage.md`
- Pre-audit priority (reachability-first): `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/PRE-AUDIT-PRIORITY.md`
- Audit ROI map (signals + reachability → recommended order): `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/AUDIT-ROI-MAP.md`
- Scorecard (desktop + mobile rows): `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/scorecard.csv`
- Scorecard guide: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/scorecard-guide.md`
- Pattern capture checklist (screenshots → pattern cards → backlog): `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/PATTERN-CAPTURE-CHECKLIST.md`
- Batch 01 queue (recommended first-pass stores): `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-01.md`
- Batch — checkout focus (express checkout evidence first): `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-CHECKOUT.md`
- Batch — returns focus (returns portal evidence first): `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-RETURNS.md`
- Batch 02 queue: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-02.md`
- Batch 03 queue: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-03.md`
- Bot protection playbook: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/bot-protection-playbook.md`
- Evidence capture guide: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/evidence-capture-guide.md`

## How to run a store audit (timeboxed)

1) Pick the next store from:
   - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/PRE-AUDIT-PRIORITY.md`
2) Open the store doc in this folder (example):
   - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/andie-swim.md`
3) Use the “Desk research preflight” target URLs to speed-run:
   - collection → product → cart → checkout start → returns/help
4) Capture the minimum screenshot set from:
   - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/womens-top25-tier-a-screenshot-capture-checklist.md`
   - For exact filenames + required screenshots, also use the per-store evidence checklist:
     - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/<store-slug>/CHECKLIST.md`
5) Fill “Quick verdict” + scorecard section in the store doc (desktop + mobile).

## Postprocess (after screenshots exist)

After you drop screenshots into `artifacts/evidence/<store-slug>/`, run postprocess to:
- validate naming + coverage
- update pattern cards with screenshot links
- refresh the scored reports (rankings/backlog/triage)

### Single store (recommended per-audit loop)

Start with a dry-run:

```bash
python3 .blackbox/scripts/research/postprocess_store_audit.py \
  --dry-run \
  --store-slug andie-swim \
  --plan-artifacts-dir .blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts \
  --audits-dir 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first \
  --patterns-dir 05-planning/research/market-intelligence/ecommerce-benchmarking/patterns \
  --mapping-md 05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md \
  --capture-checklist-md 05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/PATTERN-CAPTURE-CHECKLIST.md
```

Then rerun the same command **without** `--dry-run` to write pattern-card updates once you’re happy with the suggestions report.

### Multiple stores (batch)

```bash
python3 .blackbox/scripts/research/postprocess_batch_audits.py \
  --plan-artifacts-dir .blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts \
  --stores andie-swim skims thirdlove
```
