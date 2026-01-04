# Plan: deep-research-ecommerce-benchmark-adjacent-best-in-class-100

## Goal
- Expand the existing “adjacent best-in-class” list from 30 → 100 stores across multiple e-commerce niches.
- Capture **homepage HTML snapshots** as durable evidence and extract lightweight conversion signals.
- Produce a build-oriented playbook of **patterns worth copying into women’s fashion** (discovery, trust, subscriptions, loyalty, post-purchase).
- Ship reusable deliverables into:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/` (CSV + playbook)

## Created
2025-12-30 21:54

## Target (optional)
- ASAP (rolling)

## Context
- Prompted by the women’s fashion benchmarking run (100 stores) needing cross-niche inspiration (best-in-class e-commerce UX patterns).
- Constraints:
  - Evidence must be URL or on-disk snapshot path.
  - Snapshots are **static HTML only** (no JS execution); some sites block bots.
  - Full funnel proof (PDP/cart/checkout screenshots) is out-of-scope for this automated pass.
- “Done” definition:
  - `adjacent-best-in-class-100.csv` + `.enriched.csv` generated.
  - Snapshots saved for as many of the 100 as possible; failures marked.
  - Updated playbook markdown generated and linked from benchmarking README.

## Docs To Read (and why)
- [ ] `.blackbox/README.md` — how plans + artifacts should be structured.
- [ ] `.blackbox/scripts/research/snapshot_urls.py` — snapshot mechanics + retry strategy.
- [ ] `.blackbox/scripts/research/summarize_store_snapshots.py` — what signals we can detect from HTML.

## Plan Steps
- [ ] Step 1: Create the 100-store seed list + base CSV (niche + short notes).
- [ ] Step 2: Snapshot homepages to `artifacts/snapshots/homepages/` (stable filenames).
- [ ] Step 3: Summarize snapshots into CSV/MD, enrich base CSV with signals.
- [ ] Step 4: Generate the adjacent playbook markdown and link it from benchmarking docs.

## Artifacts (created/updated)
- `artifact-seeds/adjacent-best-in-class-100.txt` — URL + label list (input to snapshotting).
- `artifacts/snapshots/homepages/` — saved HTML snapshots (durable evidence).
- `artifacts/reports/store-snapshots-summary.csv` — extracted signals from snapshots.
- `artifacts/reports/store-snapshots-summary.md` — quick coverage + counts.
- `artifacts/agent-plan.md` — current plan + next 3 actions.
- `artifacts/prompt-log.md` — prompt history for this run.
- `artifacts/output-index.md` — what changed and why.
- `artifacts/skills-log.md` — skills used (search/snapshot/extraction/ranking).

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- How many targets will block static HTML fetching (Cloudflare etc)? If too many, consider alternative snapshot strategy (e.g., changing UA, increasing timeout, batching).
- Some brands may redirect by geo; treat as “blocked_evidence” and move on.

## Notes / Revisions
- 2025-12-30: Initialized plan with concrete steps + deliverables.
