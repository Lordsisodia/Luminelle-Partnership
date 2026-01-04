---
step: 0025
created_at: "2025-12-31 13:40"
title: "Checkpoint: Tier-A returns portal screenshots (3 stores)"
---

# Step 0025: Checkpoint: Tier-A returns portal screenshots (3 stores)

## ✅ What I did (facts)

- Captured Tier‑A returns screenshots (desktop + mobile) for 3 Top‑25 stores and saved them into the plan evidence folders:
  - Andie Swim: `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/andie-swim/andie-swim__desktop__post-purchase__returns-portal__20251231.png` (+ mobile)
  - LoveShackFancy: `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/loveshackfancy/loveshackfancy__desktop__post-purchase__returns-portal__20251231.png` (+ mobile)
  - ThirdLove: `docs/.blackbox/.plans/2025-12-30_2253.../artifacts/evidence/thirdlove/thirdlove__desktop__post-purchase__returns-portal__20251231.png` (+ mobile)
- Fixed the Tier‑A postprocess runner so it can be used for the **Top‑25** audit folder (not just the older shortlist plan):
  - Updated `.blackbox/scripts/research/postprocess_batch_audits.py` to accept `--audits-dir` / `--capture-checklist-md` overrides and pass the plan artifacts dir through to `postprocess_store_audit.py`.
- Fixed evidence → pattern automation quality:
  - `.blackbox/scripts/research/apply_evidence_to_patterns.py`: screenshot link now normalizes to `docs/<docs-relative-path>` (no more `docs//Users/...` absolute-path junk) and post‑purchase URL selection prefers `returns` targets first.
  - `.blackbox/scripts/research/suggest_pattern_updates_from_evidence.py`: post‑purchase URL selection prefers returns URLs (no more “shortest URL wins” pointing at `/faq` or `/cart`).
- Re-ran Tier‑A postprocess for these stores to refresh reports and apply evidence where relevant:
  - Generated/updated `artifacts/reports/*-pattern-update-suggestions.md` + `artifacts/reports/*-pattern-autoapply.md`
  - Refreshed `artifacts/evidence-naming.md`, `artifacts/evidence-coverage.md`, `artifacts/backlog.md`, `artifacts/rankings.md`
- Promoted Tier‑A returns evidence into canonical docs:
  - Updated `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md` (ThirdLove as primary evidence; Andie as additional evidence).
  - Updated `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md` (returns portal row now includes Tier‑A screenshot links).
  - Updated `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md` (returns portal section now includes Tier‑A proof).

## 🧠 What I learned (new information)

- “Returns” pages in the Top‑25 split into two UX levels:
  - **Returns center/portal** (order lookup + start flow): ThirdLove returns center shows a structured returns-start experience (strongest proof for the portal pattern).
  - **Returns policy page + CTA entry points**: Andie’s returns page clearly differentiates Exchange vs Return and uses “Get Started” CTAs (likely launching a JS/embedded portal).
- Not every high-end brand has a self‑serve portal on the returns page: LoveShackFancy’s returns page appears policy-heavy (useful as a baseline/counterexample, not a “portal” proof).

## 🧭 What changes because of this

- The “Self‑serve returns portal” backlog item is now backed by Tier‑A screenshots (proof-grade, not just vendor signals in HTML).
- The automation loop (capture → postprocess → pattern/mapping updates) is more reliable for the Top‑25 audit set (fewer manual fixes needed per store).

## ➡️ Next step

- Expand Tier‑A returns evidence to 3–5 more stores from `BATCH-RETURNS.md` with explicit vendor signals (Loop/Narvar/Happy Returns) to cover multiple portal archetypes.
- Add a “click before screenshot” option to `.blackbox/scripts/research/capture_tier_a_screenshot.py` to capture the *actual* portal overlay/flow when the returns center is JS-triggered (Loop on-store widgets), not just the entry page.

## 🔗 Links / references

- Evidence root: `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/`
- Tier‑A returns screenshots (examples):
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__post-purchase__returns-portal__20251231.png`
  - `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__post-purchase__returns-portal__20251231.png`
- Updated pattern card: `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md`
- Updated mapping: `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`
- Updated shortlist: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md`
