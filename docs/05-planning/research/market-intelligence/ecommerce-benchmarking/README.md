---
status: active
last_reviewed: 2025-12-31
owner: growth
---

# E-commerce Benchmarking

This folder benchmarks high-performing e-commerce stores so we can:
- model proven conversion patterns (especially **women’s fashion**)
- avoid common UX pitfalls
- maintain a reusable “feature + funnel” checklist for future builds

## What’s here
- `EXECUTIVE-SUMMARY.md` — 1-page overview (what we learned + evidence + next actions)
- `womens-fashion-benchmark.md` — synthesis + patterns worth copying
- `womens-fashion-stores-100.csv` — list of 100 stores with per-store notes
- `womens-fashion-stores-100.enriched.csv` — same list, enriched with automated snapshot signals + evidence file paths (triage layer)
- `womens-fashion-stores-100.scored.csv` — enriched matrix plus a heuristic segment + model score (sortable)
- `womens-fashion-stores-100.store-cards.md` — human-readable version of the scored matrix (what works / watchouts / features + evidence per store)
- `womens-fashion-segment-models.md` — top model stores per segment (top 3 per segment; evidence-linked)
- `womens-fashion-feature-adoption-by-segment.md` — segment-level breakdown of tooling/feature adoption + “what to prioritize” per segment (evidence-linked)
- `womens-fashion-anti-patterns.md` — anti-patterns + watchouts across the 100-store benchmark (what not to copy; evidence-linked)
- `womens-fashion-niche-playbook.md` — niche-by-niche “model stores” shortlist with evidence links (built from the enriched matrix)
- `womens-fashion-feature-adoption-matrix.md` — adoption scan of common conversion tooling (BNPL, reviews, returns, search/personalization) with store examples + evidence links
- `womens-fashion-conversion-feature-checklist.md` — build/integrate checklist of conversion features (evidence-linked, with evidence-tier guidance)
- `feature-exemplars-index.md` — feature → “who to copy” index across women’s fashion + cross‑niche (evidence-linked; triage)
- `womens-fashion-top25-apparel-first-backlog-shortlist.md` — Top‑25 apparel-first evidence → prioritized backlog shortlist (evidence-linked)
- `womens-fashion-mvp-backlog-top10.md` — recommended “build next” order (Top 10 MVP backlog; evidence-linked)
- `conversion-roadmap.md` — build order + milestones for women’s fashion conversion features (evidence-linked)
- `womens-fashion-model-stores-top25.md` — overall top-25 heuristic shortlist (all segments)
- `womens-fashion-model-stores-top25-apparel-first.md` — top-25 heuristic shortlist excluding Jewelry/Footwear/Accessories
- `womens-fashion-top50-apparel-first-expansion.md` — expansion queue (next 25 apparel-first stores beyond the Top‑25 audit set; evidence-linked)
- `adjacent-best-in-class-100.csv` — cross-niche exemplars worth copying patterns from (discovery; subscription; trust)
- `adjacent-best-in-class-100.enriched.csv` — same list, enriched with automated snapshot signals + evidence file paths
- `adjacent-best-in-class-100.ranked.csv` — heuristic ranking (triage) based on snapshot signals + evidence coverage
- `adjacent-best-in-class-100.top-picks.md` — top overall + top per niche (triage; evidence-linked)
- `adjacent-best-in-class-feature-adoption-matrix.md` — adoption scan of conversion tooling + UX cues across the adjacent list (vendor signals + examples)
- `adjacent-best-in-class-playbook.md` — grouped playbook view of the adjacent list (with evidence links + snapshot signals)
- `adjacent-top15-transferable-patterns.md` — build-oriented “patterns to steal” from the adjacent top picks (Tier‑B evidence, women’s fashion translation)
- `cross-niche-modeling-guide.md` — which niches to model for women’s fashion (high/medium/low transfer) with evidence pointers
- `adjacent-best-in-class-30.csv` — original seed list (kept for historical reference)
- `adjacent-best-in-class-30.enriched.csv` — original seed list, enriched
- `manual-funnel-audit-rubric.md` — scoring rubric for deep manual audits (PDP/cart/checkout)
- `pattern-library.md` — evidence-backed “patterns to steal” (built from manual audits)
- `audits/README.md` — where the per-store manual audits live
- `audits/womens-fashion-shortlist-15/README.md` — shortlist audit set (15 stores)
- `audits/womens-fashion-top25-apparel-first/README.md` — Top‑25 apparel-first audit set (preflight injected from Tier‑B pack)
- `audits/evidence-capture-guide.md` — how to capture screenshots + URLs consistently
- `audits/audit-session-runbook.md` — how to run manual audits consistently
- `audits/bot-protection-playbook.md` — how to handle bot-protected sites safely
- `patterns/README.md` — pattern cards (one pattern per file)
- `pattern-to-backlog-mapping.md` — convert patterns into build backlog items

## Evidence / artifacts
Raw snapshots + automated signal scans live in the related Black Box run folder:
- `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/`
- `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/`
- `.blackbox/.plans/2025-12-30_2154_deep-research-ecommerce-benchmark-adjacent-best-in-class-100/`

Manual funnel audit evidence + reports live here:
- `.blackbox/.plans/2025-12-29_0552_deep-research-ecommerce-benchmark-manual-funnel-audits/`
