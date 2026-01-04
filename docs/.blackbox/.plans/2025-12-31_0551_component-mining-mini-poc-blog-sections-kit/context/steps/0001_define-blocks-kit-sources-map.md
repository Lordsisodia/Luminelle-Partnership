---
step: 0001
created_at: "2025-12-31 05:52"
title: "Define blocks kit + sources map"
---

# Step 0001: Define blocks kit + sources map

## ✅ What I did (facts)

- Created the first “Blocks Kit” inventory document:
  - `docs/.blackbox/oss-catalog/blocks-inventory.md`
- Defined v1 scope blocks (blog/article + FAQ/pricing/testimonials/newsletter) with:
  - contracts (inputs/outputs)
  - measurable acceptance criteria
  - primary OSS sources to mine first (`deepen`) vs reference sources (`watch`)
- Linked the inventory from the living next-plan doc:
  - `docs/.blackbox/oss-catalog/next-plan.md`

## 🧠 What I learned (new information)

- The sections/components tranche gives us immediate coverage for marketing blocks; the missing piece is now execution: extracting a consistent contract + a11y/responsive rules across different libraries.
- The blog/article pipeline work is a clean “composition stack” (remark→rehype→React) and can serve as the backbone for all content pages.

## 🧭 What changes because of this

- We can stop searching for “random blocks repos” and instead mine a small primary set to produce a coherent internal kit.
- The blocks inventory becomes the single reference for what to implement in the 1‑day mini‑POC.

## ➡️ Next step

- Append “what to mine” notes to the key `deepen` repos in `docs/.blackbox/oss-catalog/curation.json`, then write the 1‑day mini‑POC checklist (blog page kit) as a plan step.

## 🔗 Links / references

- `.blackbox/oss-catalog/blocks-inventory.md`
- `.blackbox/oss-catalog/component-mining-playbook.md`
- `.blackbox/oss-catalog/lanes/sections-components.md`
