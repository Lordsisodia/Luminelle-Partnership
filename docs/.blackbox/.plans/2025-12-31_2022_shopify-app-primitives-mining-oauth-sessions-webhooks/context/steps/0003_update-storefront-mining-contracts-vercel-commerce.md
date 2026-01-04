---
step: 0003
created_at: "2025-12-31 20:30"
title: "Update storefront mining contracts (Vercel Commerce)"
---

# Step 0003: Update storefront mining contracts (Vercel Commerce)

## ✅ What I did (facts)

- Updated the storefront mining “source of truth” to explicitly treat `vercel/commerce` as a canonical reference implementation for PLP/PDP/cart/search patterns and Storefront API boundaries.
- Centralized “where to look” guidance so we can mine UI primitives without running more low-signal repo searches.
- Ensured the reference set + source map remain metadata-only (no cloning); only exact file pointers + pattern notes.

## 🧠 What I learned (new information)

- For storefront UX, the highest leverage is a small set of reference repos that are:
  - actively maintained
  - structurally clear (route layout mirrors storefront primitives)
  - explicit about backend boundaries (e.g. Storefront API/cart endpoints)
- Once those exist, incremental discovery runs tend to find duplicates or low-signal templates that don’t add new patterns.

## 🧭 What changes because of this

- Storefront discovery can be rate-limited aggressively; we can spend time mining concrete components (cart drawer, filters, search, PDP) instead.
- Blocks/contracts docs can point to a stable “mining index” rather than ad-hoc repo references.

## ➡️ Next step

- Mine 1–2 primitives end-to-end from `vercel/commerce` into our blocks kit contracts + source map:
  - search filters + URL state
  - cart drawer/line item editing + error states

## 🔗 Links / references

- Storefront reference set: `docs/.blackbox/oss-catalog/storefront-reference-set.md`
- File pointers: `docs/.blackbox/oss-catalog/component-source-map.md`
- Lane overview: `docs/.blackbox/oss-catalog/lanes/storefront-content.md`
- Curation entry: `docs/.blackbox/oss-catalog/curation.json`
