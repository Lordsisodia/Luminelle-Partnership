---
step: 0022
created_at: "2026-01-01 00:42"
title: "Blocks Kit: canonical variant picks for marketing blocks"
---

# Step 0022: Blocks Kit: canonical variant picks for marketing blocks

## ✅ What I did (facts)

- Created a single “canonical variant picks” doc for blog/marketing blocks so we can mine 1–2 variants per block and stop searching.
- Linked the picks doc from the Blocks Inventory and the sections/components lane.
- Re-rendered OSS catalog outputs after the updates.

## 🧠 What I learned (new information)

- We already have enough section libraries; the bottleneck is no longer discovery, it’s choosing a minimal set of canonical variants and implementing them consistently.

## 🧭 What changes because of this

- “Marketing/blog blocks” mining is now bounded and reproducible: we have a short list of sources + exact file pointers per block type.

## ➡️ Next step

- Execute the mining pass: for each picked variant, capture:
  - a screenshot (if present) + link
  - behavior deltas vs our contract
  - any token/theming decisions we should standardize
  Then stop and only add variants on demand.

## 🔗 Links / references

- Canonical picks: `docs/.blackbox/oss-catalog/blocks-kit-marketing-variant-picks.md`
- Sections lane: `docs/.blackbox/oss-catalog/lanes/sections-components.md`
- Inventory: `docs/.blackbox/oss-catalog/blocks-inventory.md`
- Contracts: `docs/.blackbox/oss-catalog/blocks-kit-contracts.md`
