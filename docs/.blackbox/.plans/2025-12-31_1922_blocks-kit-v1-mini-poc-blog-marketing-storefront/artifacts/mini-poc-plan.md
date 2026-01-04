# Blocks Kit v1 — 1-day mini‑POC plan (execution checklist)

Date: `2025-12-31`

Goal: prove we can assemble a high-quality “content + commerce” UI kit from stable contracts:
- blog/article rendering primitives,
- marketing sections,
- storefront primitives (without committing to an architecture).

Non-goals:
- No full storefront checkout build.
- No copying code from `license_bucket=verify` repos.

---

## POC environment (assumptions)

Keep the POC as a small, throwaway app (outside this docs repo) using:
- React + Tailwind (or the current Lumelle frontend stack),
- static JSON fixtures for products/cart/facets,
- no real Shopify credentials required.

---

## Phase 1 (morning): Blog/article kit

### Build
- `RichContent` pipeline (Markdown/MDX) with a component map:
  - headings, links, images, tables
- `TableOfContents`:
  - nested heading tree
  - active section tracking on scroll
- `CodeBlock`:
  - syntax highlight + copy button
- `Callout`:
  - info/warning/danger/success variants

### Acceptance checks (measurable)
- TOC:
  - clicking a TOC item scrolls to the correct heading
  - active heading updates correctly while scrolling
- Code blocks:
  - copy button copies raw code exactly
  - long lines scroll horizontally without breaking layout
- A11y:
  - keyboard navigation works for TOC links + copy button
  - focus ring visible across all interactive elements

Pointers for mining:
- Contracts: `docs/.blackbox/oss-catalog/blocks-kit-contracts.md`
- File pointers: `docs/.blackbox/oss-catalog/component-source-map.md`

---

## Phase 2 (midday): Marketing sections

### Build
- `FaqSection`:
  - `mode=single` default
  - optional deep-link open (`#faq-...`)
- `PricingSection`:
  - 3 tiers
  - monthly/yearly toggle
  - “most popular” highlight
- `NewsletterSignup`:
  - email validation
  - loading / success / error states

### Acceptance checks (measurable)
- FAQ:
  - keyboard open/close works
  - aria-expanded updates correctly
- Pricing toggle:
  - switching mode updates prices without layout shift
  - highlighted tier is not only color-based
- Newsletter:
  - invalid email shows helpful message
  - success state visible after submit resolves

Pointers for mining:
- Marketing file pointers live in `docs/.blackbox/oss-catalog/component-source-map.md` under “Marketing / page sections”.

---

## Phase 3 (afternoon): Storefront primitives (slice)

### Build
- `ProductCard`:
  - handles missing image
  - sold out + sale states
- `CartDrawer` shell:
  - drawer open/close
  - line list rendering
  - empty state
- `FacetFilters` shell:
  - desktop sidebar + mobile drawer
  - chips + clear all
  - URL-sync simulated (or state modelled as URL params)

### Acceptance checks (measurable)
- Product card:
  - the whole card is a single accessible link target (no nested click traps)
  - badges + price states don’t shift layout noticeably
- Cart:
  - quantity change is debounced (or otherwise doesn’t spam updates)
  - empty state has clear CTA
- Filters:
  - selected state renders as chips
  - clear all resets state deterministically

Pointers for mining:
- Storefront file pointers live in `docs/.blackbox/oss-catalog/component-source-map.md` under “Storefront primitives”.

---

## End-of-day output (what to decide)

At the end of this POC, we should be able to answer:
1) Which primitives are “easy wins” to ship first in Lumelle (blog + marketing blocks)?
2) Which storefront primitives require more product/UX decisions before implementation (variants, cart rules, facets)?
3) Which OSS sources are worth copying from (safe license) vs mining patterns only?

