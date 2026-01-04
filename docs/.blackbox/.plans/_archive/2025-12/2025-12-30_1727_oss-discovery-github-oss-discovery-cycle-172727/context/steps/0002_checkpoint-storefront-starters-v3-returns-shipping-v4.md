---
step: 0002
created_at: "2025-12-30 17:29"
title: "Checkpoint: storefront starters v3 + returns/shipping v4"
---

# Step 0002: Checkpoint: storefront starters v3 + returns/shipping v4

## ✅ What I did (facts)

- Ran two targeted discovery cycles:
  - Returns/shipping v4 (ecommerce-qualified queries to reduce false positives)
  - Storefront starters v3 (Medusa/Vendure/Saleor/Shopify storefront starters)
- Seeded the resulting candidates into `.blackbox/oss-catalog/curation.json` as `status=triage` and re-rendered catalog artifacts.
- Promoted 2 high-signal storefront repos to 1-day POCs for “component mining”.

## 🧠 What I learned (new information)

- Returns/shipping v4 reduced false positives but also reduced recall (few candidates). It’s good as a “precision” pass, not a broad discovery pass.
- Storefront starters continue to be the best source of reusable patterns (cart, PDP, product grid, filters) across ecosystems.

## 🧭 What changes because of this

- We keep running storefront starter passes to collect UI patterns, and run returns/shipping as a lower-star, more keyword-rich pass when we want volume.

## ➡️ Next step

- Run a returns/shipping “volume” pass (min-stars 10–20) but keep strict exclude keywords to avoid non-ecommerce hits; then promote 1 returns/shipping repo to a 1-day POC if we find a real primitive.

## 🔗 Links / references

- Returns/shipping query pack: `.blackbox/.local/github-search-queries.returns-shipping-v4.md`
- Storefront query pack: `.blackbox/.local/github-search-queries.storefront-starters-v3.md`
- Returns/shipping run: `.blackbox/.plans/2025-12-30_1726_oss-discovery-github-oss-discovery-cycle-172609`
- Storefront run: `.blackbox/.plans/2025-12-30_1727_oss-discovery-github-oss-discovery-cycle-172727`
- Updated POC backlog: `.blackbox/oss-catalog/poc-backlog.md`
