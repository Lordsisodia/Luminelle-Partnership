---
compaction: 0001
created_at: "2025-12-31 06:51"
range: "0001-0010"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0001 (0001–0010)

## ✅ Summary (fill this after compaction)

- Built a complete Tier‑B funnel evidence pack for the women’s fashion Top‑25 (apparel-first) and promoted it into canonical benchmarking docs:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-patterns.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
- Scaffolded a Top‑25 Tier‑A manual audit system (per-store docs + evidence folder structure + postprocess automation) so screenshots can directly update pattern cards + backlog:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/DASHBOARD.md`
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/`
- Converted the 100-store matrix into human-browsable views and planning aids (store cards, feature exemplars, segment models, Top‑50 expansion queue):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.store-cards.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/feature-exemplars-index.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-segment-models.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top50-apparel-first-expansion.md`
- Produced a concrete “what to screenshot first” ROI map + “what to build first” backlog shortlist from the Top‑25 Tier‑B rollups:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/AUDIT-ROI-MAP.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md`

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
  - Prefer generating docs from CSV artifacts (repeatable + less drift) instead of manual summaries.
  - When linking store-specific files, use the Top‑25 `store-slug-map.json` to avoid slug mismatches.
- Checklist improvements:
  - Add explicit “evidence root + naming + coverage” links to dashboards/runbooks to reduce audit friction.
  - Always include example snapshot file paths next to URLs when claiming “evidence exists”.
- Better stop conditions:
  - Stop “analysis-only” work once remaining high-impact insights require Tier‑A screenshots (cart/checkout interaction can’t be proven from Tier‑B HTML).

## Steps compacted (trimmed)

### 0001_checkpoint-built-top-25-tier-b-funnel-snapshot-pack.md

---
step: 0001
created_at: "2025-12-30 23:04"
title: "Checkpoint: Built Top-25 Tier-B funnel snapshot pack"
---

# Step 0001: Checkpoint: Built Top-25 Tier-B funnel snapshot pack

## ✅ What I did (facts)

- Parsed the women’s fashion Top‑25 apparel-first shortlist into an ordered ranked CSV:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/womens-top25-apparel-ranked.csv`
- Generated a Top‑25 funnel seed set (collection/product/sizing/shipping/returns/support) by extracting candidate URLs from homepage snapshots:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifact-seeds/womens-top25-apparel-funnel-seeds.txt`
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/womens-top25-apparel-funnel-seed-plan.md`
- Captured Tier‑B HTML snapshots for every seed URL (76/76) into:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/`
- Generated Tier‑B snapshot summary outputs:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-summary.md`
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-summary.csv`
- Promoted Tier‑B evidence pointers into canonical docs:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-conversion-feature-checklist.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`

## 🧠 What I learned (new information)

- Tier‑B funnel snapshots are much less likely to be bot-blocked than homepages (0/76 blocked in this pack).
- Returns tooling becomes far more visible at Tier‑B:
  - Loop Returns and Narvar appear repeatedly across the captured pages (see summary CSV).
- Fit/size guidance is often encoded as dedicated sizing pages (useful for linking directly from PDP).

## 🧭 What changes because of this

- The women’s fashion checklist now has more Tier‑B evidence examples (not just homepage signals), making it safer to treat certain features as table-stakes.
- We can proceed to Tier‑A manual audits with a prebuilt map of “which URLs to screenshot” per store.

## ➡️ Next step

- Decide whether to continue by expanding Tier‑B coverage (Top‑50) or stop and shift to Tier‑A manual screenshot audits for cart/checkout friction validation.

## 🔗 Links / references

- Snapshot pack:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/`
- Coverage summary:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-summary.md`
- Updated canonical docs:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-conversion-feature-checklist.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

---

### 0002_checkpoint-published-conversion-roadmap.md

---
step: 0002
created_at: "2025-12-30 23:07"
title: "Checkpoint: Published conversion roadmap"
---

# Step 0002: Checkpoint: Published conversion roadmap

## ✅ What I did (facts)

- Created an evidence-linked execution sequence for women’s fashion conversion features:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/conversion-roadmap.md`
- Linked the roadmap from the benchmarking index:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`
- Recorded the roadmap in the docs ledger:
  - `08-meta/repo/docs-ledger.md`

## 🧠 What I learned (new information)

- Turning research into milestones forces a more realistic ordering:
  - PDP confidence and returns de-risking show up repeatedly as early “conversion unlocks”.
  - Cart/checkout friction work should be scheduled only when Tier‑A audit evidence exists.

## 🧭 What changes because of this

- The benchmarking work is now actionable without re-reading large docs: roadmap → backlog mapping → audits.

## ➡️ Next step

- Stop here unless moving into Tier‑A manual audits (screenshots) for cart/checkout validation, which is the next major remaining evidence gap.

## 🔗 Links / references

- Roadmap:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/conversion-roadmap.md`
- Backlog mapping:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md`

---

### 0003_checkpoint-drafted-tier-a-screenshot-capture-checklist.md

---
step: 0003
created_at: "2025-12-30 23:09"
title: "Checkpoint: Drafted Tier-A screenshot capture checklist"
---

# Step 0003: Checkpoint: Drafted Tier-A screenshot capture checklist

## ✅ What I did (facts)

- Drafted a Tier‑A screenshot capture checklist for the women’s fashion Top‑25 (apparel-first) shortlist.
- Derived the store order from `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/womens-top25-apparel-ranked.csv`.
- Used the Tier‑B seed URLs as the default “starting points” for PLP/PDP/sizing/shipping/returns/support where available:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifact-seeds/womens-top25-apparel-funnel-seeds.txt`.
- Wrote down the minimum per‑store screenshot set (PLP, PDP, size module/guide, cart, checkout-start, returns) and suggested filenames for consistent evidence capture:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/womens-top25-tier-a-screenshot-capture-checklist.md`.

## 🧠 What I learned (new information)

- Tier‑B (HTML snapshot) coverage is excellent for policy/help/sizing pages, but it can’t fully prove cart/checkout UX friction, express pay, and interactive modules — screenshots are still required for “proof-grade” Tier‑A.
- Two stores in the Top‑25 shortlist (Andie Swim, Uniqlo) were missing Tier‑B seed URLs because their homepages didn’t yield navigational links during seed extraction; these require manual seed discovery to close the gap.

## 🧭 What changes because of this

- The research is now “audit-ready”: a human can capture consistent screenshots across stores without re-discovering URLs and without re-deciding what to capture.
- Once screenshots exist, we can run post-processing/report tooling to convert screenshots + notes into scored funnel audits (Tier‑A).
- The only remaining blocker for 100% Tier‑B coverage on the Top‑25 apparel-first list is adding manual seeds for Andie Swim + Uniqlo.

## ➡️ Next step

- Add manual Tier‑B funnel seeds for Andie Swim + Uniqlo (collection/product/sizing/shipping/returns/support), snapshot them into the existing pack, then regenerate the Tier‑B summary report and update the Tier‑A checklist to remove the “missing” notes.

## 🔗 Links / references

- Tier‑A checklist: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/womens-top25-tier-a-screenshot-capture-checklist.md`
- Tier‑B funnel seeds: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifact-seeds/womens-top25-apparel-funnel-seeds.txt`
- Tier‑B snapshots directory: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/snapshots/funnel-top25-apparel/`
- Tier‑B summary: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-summary.md`
- Canonical roadmap (execution sequence): `05-planning/research/market-intelligence/ecommerce-benchmarking/conversion-roadmap.md`

---

### 0004_checkpoint-fixed-evidence-paths-validated-postprocess.md

---
step: 0004
created_at: "2025-12-31 06:18"
title: "Checkpoint: Fixed evidence paths + validated postprocess"
---

# Step 0004: Checkpoint: Fixed evidence paths + validated postprocess

## ✅ What I did (facts)

- Fixed remaining broken evidence links after the evidence folder move:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-02.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-03.md`
- Updated the plan output log to reference the correct evidence root:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/output-index.md`
- Validated the postprocess pipeline wiring end-to-end (safe dry-run) for a single store:
  - `python3 .blackbox/scripts/research/postprocess_store_audit.py --dry-run --store-slug andie-swim ...`
- Confirmed the postprocess runner resolves evidence at:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim`

## 🧠 What I learned (new information)

- `postprocess_store_audit.py --dry-run` still produces useful “what’s missing / what would update” outputs even when **no screenshots exist yet** (it exits cleanly and gives next-step guidance).
- The evidence naming + coverage docs are generated automatically during postprocess runs:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence-naming.md`
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence-coverage.md`

## 🧭 What changes because of this

- Tier‑A audit queue docs (Batch‑02/03) no longer point at a non-existent evidence folder; auditors can click straight into `artifacts/evidence/<store-slug>/CHECKLIST.md`.
- The postprocess pipeline is now verified “ready-to-run” for when real screenshots get dropped (no more path mismatch risk).
- Evidence ops is clearer: we now have a generated naming spec + coverage report to drive screenshot completeness store-by-store.

## ➡️ Next step

- Start Tier‑A screenshot capture for Batch‑01 stores (use the per-store `CHECKLIST.md` in `artifacts/evidence/<store-slug>/`).
- After screenshots exist for a store, rerun `postprocess_store_audit.py` **without** `--dry-run`, then run `postprocess_batch_audits.py` for the batch.

## 🔗 Links / references

- Evidence root: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/`
- Dry-run outputs for Andie:
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/andie-swim-pattern-update-suggestions.md`
  - `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/andie-swim-pattern-autoapply.md`

---

### 0005_checkpoint-updated-audit-runbook-docs.md

---
step: 0005
created_at: "2025-12-31 06:22"
title: "Checkpoint: Updated audit runbook docs"
---

# Step 0005: Checkpoint: Updated audit runbook docs

## ✅ What I did (facts)

- Updated the Top‑25 audit dashboard with:
  - evidence root + generated evidence helper links
  - copy/paste postprocess commands (single-store + batch)
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/DASHBOARD.md`
- Refreshed the shared evidence capture guide to remove a stale plan-folder hardcode and replace it with:
  - a generic `<active-run>` path
  - a concrete example for the current women’s fashion Top‑25 run
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/evidence-capture-guide.md`

## 🧠 What I learned (new information)

- The batch postprocess helper is extremely lightweight operationally: it only needs `--plan-artifacts-dir` plus a list of store slugs (it does not need auditors to pass patterns/mapping/checklist paths each time).

## 🧭 What changes because of this

- Auditors can now run the full workflow from a single doc (dashboard): pick store → capture screenshots → drop into evidence folder → run postprocess.
- We’ve reduced “broken link / wrong run folder” risk by removing a specific old plan-id from the generic evidence capture guide.

## ➡️ Next step

- Capture Tier‑A screenshots for Batch‑01 stores (starting with `andie-swim`) into `artifacts/evidence/<store-slug>/`.
- Run `postprocess_store_audit.py` (dry-run → real run) to begin populating pattern cards with screenshot links.

## 🔗 Links / references

- Dashboard: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/DASHBOARD.md`
- Evidence root: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/`
- Postprocess scripts:
  - `.blackbox/scripts/research/postprocess_store_audit.py`
  - `.blackbox/scripts/research/postprocess_batch_audits.py`

---

### 0006_checkpoint-published-top-100-store-cards.md

---
step: 0006
created_at: "2025-12-31 06:32"
title: "Checkpoint: Published Top-100 store cards"
---

# Step 0006: Checkpoint: Published Top-100 store cards

## ✅ What I did (facts)

- Rendered the Top‑100 women’s fashion scored matrix into a readable, evidence-linked “store cards” doc grouped by segment:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.store-cards.md`
- Updated the benchmarking README so the new doc is discoverable alongside the CSVs:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`

## 🧠 What I learned (new information)

- The scored CSV already contained everything needed for per-store summaries (`what_works`, `watchouts`, `features_to_steal`, `snapshot_path`), so the main bottleneck was “readability”, not missing data.

## 🧭 What changes because of this

- The team can now browse all 100 stores (what works / what doesn’t / what to steal) directly in markdown without spreadsheet friction.
- Segment-level clustering makes it much easier to pick “best models” per segment (e.g., Swimwear vs. Luxury Marketplace) without accidentally overfitting to a single niche.

## ➡️ Next step

- Produce a “feature → exemplars” index (for each high-impact conversion feature, list the best women’s fashion stores + cross-niche analogs to copy from), using:
  - `womens-fashion-conversion-feature-checklist.md`
  - `womens-fashion-stores-100.store-cards.md`
  - `cross-niche-modeling-guide.md`

## 🔗 Links / references

- Store cards: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.store-cards.md`
- Source dataset: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.scored.csv`
- Benchmark hub: `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`

---

### 0007_checkpoint-built-feature-exemplar-index.md

---
step: 0007
created_at: "2025-12-31 06:36"
title: "Checkpoint: Built feature→exemplar index"
---

# Step 0007: Checkpoint: Built feature→exemplar index

## ✅ What I did (facts)

- Generated a feature→exemplar index that maps key conversion features to:
  - top women’s fashion stores to copy
  - cross‑niche analogs with transferable mechanics
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/feature-exemplars-index.md`
- Linked the new index from the benchmarking hub README:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`

## 🧠 What I learned (new information)

- A surprisingly large amount of “who to copy” can be triaged from existing structured fields (`features_to_steal`, vendor signals, `ux_keywords`) without additional browsing, as long as we keep evidence pointers attached (snapshot paths).

## 🧭 What changes because of this

- Design/PM can now start from a feature (e.g., “returns portal”, “fit quiz”) and immediately jump to the best candidate stores + evidence, instead of reverse-searching store lists.
- This reduces the need to re-open 100-row CSVs during ideation and speeds up pattern selection for builds.

## ➡️ Next step

- Tighten the heuristic matches for a few overly-broad features (e.g., “entry points”) using Tier‑B funnel evidence for Top‑25 and/or Tier‑A screenshots once available.
- Once Tier‑A screenshots exist, replace “triage” matches with screenshot-backed proof for cart/checkout mechanics.

## 🔗 Links / references

- Feature exemplars: `05-planning/research/market-intelligence/ecommerce-benchmarking/feature-exemplars-index.md`
- Women’s fashion scored matrix: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.scored.csv`
- Adjacent ranked matrix: `05-planning/research/market-intelligence/ecommerce-benchmarking/adjacent-best-in-class-100.ranked.csv`

---

### 0008_checkpoint-built-segment-model-shortlist.md

---
step: 0008
created_at: "2025-12-31 06:38"
title: "Checkpoint: Built segment model shortlist"
---

# Step 0008: Checkpoint: Built segment model shortlist

## ✅ What I did (facts)

- Generated a concise “Top 3 model stores per segment” doc from the 100-store scored matrix:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-segment-models.md`
- Linked it from the benchmarking hub README for discoverability:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`

## 🧠 What I learned (new information)

- The highest-scoring “model stores” aren’t all apparel: footwear/jewelry can dominate the top ranks, so segment-based shortlists are essential to avoid copying the wrong category mechanics.

## 🧭 What changes because of this

- We can now pick model references correctly per category (Swimwear vs. Plus-size vs. Luxury Marketplace) without reading the full Top‑100 store cards or filtering CSVs.

## ➡️ Next step

- Build an “audit priority map” that merges:
  - segment shortlists
  - Top‑25 Tier‑B funnel evidence
  - bot-protection risk
  so we can decide which stores are worth Tier‑A screenshot effort first.

## 🔗 Links / references

- Segment models: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-segment-models.md`
- Store cards (full 100): `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.store-cards.md`
- Source matrix: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.scored.csv`

---

### 0009_checkpoint-built-top-50-apparel-first-expansion-queue.md

---
step: 0009
created_at: "2025-12-31 06:42"
title: "Checkpoint: Built Top-50 apparel-first expansion queue"
---

# Step 0009: Checkpoint: Built Top-50 apparel-first expansion queue

## ✅ What I did (facts)

- Generated a Top‑50 apparel-first expansion queue (“next 25”) beyond the existing Top‑25 audit set:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top50-apparel-first-expansion.md`
- Linked the expansion queue from the benchmarking hub:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`

## 🧠 What I learned (new information)

- Filtering out Jewelry/Footwear/Accessories materially changes the “next best stores” list (it surfaces more true apparel use-cases like maternity, rental, plus-size), which is exactly what we want for women’s fashion modeling.

## 🧭 What changes because of this

- We now have a disciplined path to expand audits from Top‑25 → Top‑50 without re-doing discovery work or arguing about which stores “feel” best.

## ➡️ Next step

- When the Top‑25 Tier‑A screenshots are complete, promote the best 5–10 stores from this expansion queue into a “Top‑50 audit set” folder and repeat the same Tier‑B → Tier‑A workflow.

## 🔗 Links / references

- Top‑50 expansion: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top50-apparel-first-expansion.md`
- Existing Top‑25 audit set: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/README.md`
- Source matrix: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.scored.csv`

---

### 0010_checkpoint-audit-roi-map-backlog-shortlist.md

---
step: 0010
created_at: "2025-12-31 06:51"
title: "Checkpoint: Audit ROI map + backlog shortlist"
---

# Step 0010: Checkpoint: Audit ROI map + backlog shortlist

## ✅ What I did (facts)

- Generated a Tier‑A audit ROI map (signal density + reachability) so screenshot audits start with the most pattern-dense stores:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/AUDIT-ROI-MAP.md`
- Generated a Top‑25 evidence-led backlog shortlist (what to build first, with snapshot-backed examples):
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md`
- Linked both from the canonical hub/docs so they are discoverable:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/DASHBOARD.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/README.md`

## 🧠 What I learned (new information)

- Tier‑B rollups are strong enough to prioritize “where screenshots will be most valuable” (returns portals, reviews tooling, personalization), even though they can’t prove cart/checkout interaction UX.

## 🧭 What changes because of this

- Tier‑A screenshot work can now be sequenced by expected yield instead of intuition (start with Frankies Bikinis / LoveShackFancy / Negative Underwear / Andie / ThirdLove, then move down the list).
- Engineering can start a backlog discussion from evidence-backed prevalence (returns portals + reviews tooling + BNPL + personalization) rather than from brand preferences.

## ➡️ Next step

- Capture Tier‑A screenshots for the top ROI stores in `AUDIT-ROI-MAP.md`, drop them into `artifacts/evidence/<store-slug>/`, and run postprocess to start populating pattern cards with real screenshot links.
- Re-score/re-rank once Tier‑A evidence exists for cart/checkout-specific patterns (variant editing, express checkout, trust cues).

## 🔗 Links / references

- Tier‑B patterns note: `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/reports/funnel-top25-apparel-patterns.md`
- Audit ROI map: `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/AUDIT-ROI-MAP.md`
- Backlog shortlist: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
