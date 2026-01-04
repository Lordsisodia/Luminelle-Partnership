---
step: 0021
created_at: "2026-01-01 00:40"
title: "Blocks Kit: add hero/cta/stats contracts + section-kit artifact"
---

# Step 0021: Blocks Kit: add hero/cta/stats contracts + section-kit artifact

## ✅ What I did (facts)

- Created a dedicated deepen artifact summarizing the best “section kits” for blog/marketing blocks and mapping them to our Blocks Kit contracts.
- Linked that artifact from the sections/components lane doc for quick execution.
- Expanded Blocks Kit contracts to include additional high-leverage marketing blocks:
  - `HeroSection`, `FeatureGrid`, `StatsSection`, `CtaSection`
- Updated Blocks Inventory to reference the new section-kit sources and to include the add-on marketing blocks (v1.1) without renumbering existing storefront block IDs.
- Added evidence links into curation notes for the three best net-new section-kit repos.
- Re-rendered catalog outputs so shortlist/backlog reflect the latest curation + tags.

## 🧠 What I learned (new information)

- “Section kits” are the best source type for blog/marketing components because they contain **full-section composition** patterns (layout + spacing + copy) rather than just primitive widgets.
- Destack is especially high-leverage because it includes TSX/HTML blocks plus preview PNGs, which makes picking canonical variants fast.

## 🧭 What changes because of this

- We can now build blog/marketing surfaces from stable contracts (FAQ/pricing/testimonials/newsletter + hero/cta/stats/feature grid) using concrete OSS file pointers, without more discovery loops.
- “Deeper” work is now a bounded mining exercise: pick 1–2 canonical variants per block and stop.

## ➡️ Next step

- Execute a 1-day “Blocks Kit marketing blocks” mini-POC:
  - select canonical variants (one per block)
  - record screenshots + file pointers + behavior deltas
  - translate into our design-system tokens + accessibility requirements

## 🔗 Links / references

- Deepen artifact: `docs/.blackbox/.plans/2025-12-31_2205_oss-sourcing-roadmap-audit-next-lanes/artifacts/deepen-section-kits-marketing-blocks.md`
- Sections/components lane: `docs/.blackbox/oss-catalog/lanes/sections-components.md`
- Blocks Kit contracts: `docs/.blackbox/oss-catalog/blocks-kit-contracts.md`
- Blocks inventory: `docs/.blackbox/oss-catalog/blocks-inventory.md`
- Curation: `docs/.blackbox/oss-catalog/curation.json`
