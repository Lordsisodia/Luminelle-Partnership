---
step: 0002
created_at: "2025-12-30 17:12"
title: "Checkpoint: Storefront/blog component sourcing pass"
---

# Step 0002: Checkpoint: Storefront/blog component sourcing pass

## ✅ What I did (facts)

- Ran a targeted discovery cycle using a storefront + blog/UI component query pack.
- Seeded the newest run into curation as `status=triage` for review.
- Rendered the catalog artifacts after seeding.

## 🧠 What I learned (new information)

- We can reliably source Shopify/Hydrogen and “storefront starter” repos with a dedicated query pack, but many blog-component hits still arrive via `cms`-adjacent repos (MDX/blog templates, digital gardens, docs/blog starters).
- These are still useful for *component patterns*, but need tighter curation (we want “UI patterns” not full CMS platforms).

## 🧭 What changes because of this

- We should keep two separate UI sourcing tracks:
  - Storefront codebases (cart/product grid/collection/product page patterns)
  - Blog/article component patterns (MDX/markdown rendering, article layout, section components)
- For blog components, we should bias toward repos that are explicitly “template/starter/components” and avoid heavyweight CMS platforms unless we want them as reference only.

## ➡️ Next step

- Promote 2–3 storefront repos to `status=poc` specifically for “component mining” (product card/grid, cart drawer, article page layout) with 1-day timeboxes.

## 🔗 Links / references

- Query pack: `.blackbox/.local/github-search-queries.storefront-blog-components.md`
- Latest plan: `.blackbox/.plans/2025-12-30_1709_oss-discovery-github-oss-discovery-cycle-170940`
- Seeded curation items: filter `curation.json` by note prefix `Seeded (storefront/blog/components pass):`
