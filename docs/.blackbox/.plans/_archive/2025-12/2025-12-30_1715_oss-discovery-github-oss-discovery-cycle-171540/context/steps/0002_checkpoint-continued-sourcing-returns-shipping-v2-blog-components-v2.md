---
step: 0002
created_at: "2025-12-30 17:17"
title: "Checkpoint: continued sourcing (returns/shipping v2 + blog/components v2)"
---

# Step 0002: Checkpoint: continued sourcing (returns/shipping v2 + blog/components v2)

## ✅ What I did (facts)

- Ran 2 additional targeted discovery cycles:
  - Returns/shipping v2 query pack (tight domain keywords + CMS/portfolio excludes)
  - Blog/components v2 query pack (MDX/markdown/article components + portfolio excludes)
- Seeded curation from both newest runs and rendered the catalog.

## 🧠 What I learned (new information)

- Returns/shipping is still a “low recall” area unless we keep `--min-stars` low and use domain keywords like `rma`, `return label`, `wms`, `3pl`.
- Blog/components sourcing produced many small but useful renderer/component repos (MDX/markdown renderers, rich diff components) that are good for *component mining*.

## 🧭 What changes because of this

- We now have a sustainable way to keep collecting storefront + blog component patterns without mixing them into the core ops discovery loop.

## ➡️ Next step

- Promote 1–2 of the strongest “blog/article component” repos to 1-day POCs for component extraction (TOC, markdown/MDX renderer, article layout, code blocks).
- Continue returns/shipping runs with low stars until we have at least ~15+ candidates with real `returns`/`shipping` tags.

## 🔗 Links / references

- Query packs:
  - `.blackbox/.local/github-search-queries.returns-shipping-v2.md`
  - `.blackbox/.local/github-search-queries.blog-components-v2.md`
- Run plans:
  - `.blackbox/.plans/2025-12-30_1714_oss-discovery-github-oss-discovery-cycle-171440`
  - `.blackbox/.plans/2025-12-30_1715_oss-discovery-github-oss-discovery-cycle-171540`
