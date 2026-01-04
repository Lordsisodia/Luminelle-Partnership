# Plan: deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack

## Goal
- Create a Tier‑B (HTML) funnel evidence pack for the **women’s fashion Top‑25 (apparel-first)** model stores.
- Use that evidence to:
  - strengthen the conversion checklist with more non-screenshot examples,
  - reduce reliance on homepage-only vendor signals,
  - accelerate future Tier‑A manual audits by pre-selecting high-signal URLs per store.

## Created
2025-12-30 22:53

## Target (optional)
- Rolling / ASAP

## Context
- Prompted by: women’s fashion benchmarking + the need for stronger evidence without depending on manual screenshots.
- Constraints:
  - Tier‑B uses **static HTML snapshots** (no JS execution), so it proves content structure/copy/tooling presence but not full interactive UX.
  - Some stores may block bot-like fetches; treat as missing evidence and move on.
- “Done” definition:
  - Funnel snapshot pack exists for Top‑25 apparel-first stores (PLP/collection + PDP/product + sizing + shipping + returns + support when discoverable).
  - Snapshot summary (coverage + signal counts) generated.
  - Women’s fashion checklist updated with added Tier‑B evidence pointers where relevant.

## Docs To Read (and why)
- [ ] `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-model-stores-top25-apparel-first.md` — defines the target store set.
- [ ] `.blackbox/scripts/research/snapshot_urls.py` — snapshot mechanics.
- [ ] `.blackbox/scripts/research/build_funnel_snapshot_seeds_from_homepage.py` — seed extraction from homepage snapshots.

## Plan Steps
- [ ] Step 1: Build a ranked/ordered Top‑25 store list + seed URLs for key funnel pages.
- [ ] Step 2: Capture Tier‑B HTML snapshots (stable filenames) and summarize coverage/signals.
- [ ] Step 3: Promote learnings into checklist + backlog mapping (evidence-linked).

## Artifacts (created/updated)
- `artifact-seeds/womens-top25-apparel-funnel-seeds.txt` — snapshot seed list (URLs + labels).
- `artifacts/snapshots/funnel-top25-apparel/` — saved HTML snapshots.
- `artifacts/reports/funnel-top25-apparel-summary.csv` — extracted signals from the snapshot pack.
- `artifacts/reports/funnel-top25-apparel-summary.md` — coverage + counts.

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- Some top stores may block static HTML fetching; mitigate by:
  - using collection/help/policy pages (often less protected than homepages),
  - tolerating partial coverage and recording missing evidence explicitly.

## Notes / Revisions
- 2025-12-30: Initialized plan.
