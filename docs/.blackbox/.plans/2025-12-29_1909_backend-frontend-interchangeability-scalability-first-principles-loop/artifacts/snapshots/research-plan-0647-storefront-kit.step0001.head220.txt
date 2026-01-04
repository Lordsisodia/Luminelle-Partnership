---
step: 0001
created_at: "2025-12-31 06:48"
title: "1-day storefront kit mini-POC checklist"
---

# Step 0001: 1-day storefront kit mini-POC checklist

## ✅ What I did (facts)

- Wrote a concrete, engineer-executable 1‑day mini‑POC checklist for a “Storefront Primitives Kit” that exercises:
  - PLP: product card + product grid + URL-synced filters
  - PDP: variant selector + price display + add-to-cart states
  - Cart: cart lines editor (qty/update/remove) + empty/loading/error states
- Anchored the POC scope + acceptance criteria to:
  - `docs/.blackbox/oss-catalog/blocks-inventory.md`
  - `docs/.blackbox/oss-catalog/storefront-reference-set.md`
- Included stop rules to keep this to ~6–8 hours and avoid “build a whole storefront” scope creep.

## 🧠 What I learned (new information)

- Storefront discovery is less valuable than **contract normalization**: we already have enough reference repos; the hard part is defining stable product/variant/cart DTOs and UI state semantics.
- URL-synced state is a cross-cutting primitive (filters + pagination + saved views) and should be treated as a first-class kit component, not “page glue”.
- For storefront components, separating **UI primitives** from **backend adapters** early prevents lock-in (Shopify now, but ports/adapters later).

## 🧭 What changes because of this

- We can pause further “storefront scraping” unless we’re missing a specific primitive (e.g. a high-quality variant selector pattern).
- The next incremental work should be implementing (or prototyping) these primitives in a scratch app and recording file-level references and contracts.

## ✅ 1‑day mini‑POC checklist (Storefront Primitives Kit)

Timebox: 6–8 hours total. Target: a small demo that proves the primitives can compose together (PLP → PDP → cart).

### 0) Setup + minimal DTOs (30–60 min)
- Create a scratch app surface (preferred: product repo sandbox; otherwise a minimal standalone app).
- Define the minimal DTOs used by the UI blocks:
  - `ProductSummary` (for ProductCard/Grid)
  - `ProductDetail` + `Variant` (for VariantSelector)
  - `Cart` + `CartLine` (for CartLines editor)
- Seed data with either:
  - static JSON fixtures, or
  - a thin adapter that reads Shopify Storefront API (optional; stop-rule below).

Stop rule:
- If Shopify integration slows you down, use fixtures for the 1‑day POC and record the adapter boundary in notes.

### 1) PLP: Product card + grid (60–90 min)
- Implement:
  - `ProductCard` + `ProductGrid`
  - skeleton/loading state
- Acceptance criteria:
  - responsive (1-col mobile; 2–4 cols desktop)
  - handles missing images + long titles
  - accessible focus and link target

### 2) PLP: Filters/facets (URL-synced) (60–120 min)
- Implement a minimal filters surface:
  - sidebar filters (desktop) + sheet/drawer (mobile)
  - selected filters chips + “clear all”
- Use URL as the source of truth:
  - recommended reference: `pbeshai/use-query-params` patterns
- Optional: implement local filtering using `itemsapi/itemsjs` for prototype mode.

Stop rule:
- If full facets logic is too slow, implement UI + URL state only and document filtering as “backend-driven later”.

### 3) PDP: Variant selector (60–90 min)
- Implement variant selection with disabled/unavailable combinations.
- Acceptance criteria:
  - disabled states are not color-only
  - deterministic selected variant resolution
  - keyboard navigable (tab + clear focus order)

### 4) PDP: Price display (“Money”) (30–60 min)
- Implement price display with optional compare-at and discount label.
- Acceptance criteria:
  - correct formatting + stable layout
  - compare-at is accessible (not just visual strikethrough)

### 5) Cart: Cart lines editor (60–120 min)
- Implement cart UI primitives:
  - cart line row (title, variant summary, qty controls, remove)
  - totals section
  - empty state + loading state + error state
- Acceptance criteria:
  - qty updates do not spam actions (debounce or “update” button)
  - empty state has recovery CTA
  - keyboard accessible controls

### 6) QA sweep (30–60 min)
- Responsive check: 360px / 768px / 1024px.
- Keyboard nav: filters drawer, option pickers, cart controls.
- Torture test:
  - long product titles
  - missing image
  - out-of-stock variants
  - empty cart

### 7) Record artifacts (15–30 min)
- Fill `docs/.blackbox/.plans/2025-12-31_0647_component-mining-mini-poc-storefront-primitives-kit/artifacts/run-meta.yaml` with:
  - runtime/framework chosen
  - which primitives were completed vs deferred
- Update sources:
  - `docs/.blackbox/.plans/2025-12-31_0647_component-mining-mini-poc-storefront-primitives-kit/artifacts/sources.md`
- Write a short synthesis/decision note:
  - `docs/.blackbox/.plans/2025-12-31_0647_component-mining-mini-poc-storefront-primitives-kit/artifacts/summary.md`

### Stop rules (keep it to 1 day)
- No full checkout implementation.
- No deep SEO/perf work (record patterns only).
- No full backend integration unless it’s a thin adapter; prefer fixtures for speed.

## ➡️ Next step

- Render the OSS catalog and create a checkpoint step file summarizing the storefront kit primitives + which repos are the canonical sources per primitive.

## 🔗 Links / references

- `docs/.blackbox/oss-catalog/blocks-inventory.md`
- `docs/.blackbox/oss-catalog/storefront-reference-set.md`
- `docs/.blackbox/oss-catalog/lanes/storefront-content.md`
- `docs/.blackbox/oss-catalog/curation.json`
