# Blocks Kit v1 — Blog/article + sections (component mining synthesis)

Created: `2025-12-31`

This is an evergreen synthesis note for the “Blocks Kit v1” work: a small, reusable set of UI/content primitives we can build once and reuse across:
- blog/article pages
- marketing/content-heavy pages
- storefront-adjacent content surfaces

This note is **pattern mining**, not vendoring:
- we record contracts + a11y/responsive rules + implementation touchpoints
- we only copy/adapt code from permissive licenses (`license_bucket=safe`) with attribution

Artifacts / execution plan:
- `docs/.blackbox/.plans/2025-12-31_0551_component-mining-mini-poc-blog-sections-kit/`

Related inventory + playbook:
- `docs/.blackbox/oss-catalog/blocks-inventory.md`
- `docs/.blackbox/oss-catalog/component-mining-playbook.md`

---

## v1 scope (what we’re building first)

Reference: `docs/.blackbox/oss-catalog/blocks-inventory.md`

### Blog / article primitives
- Markdown/MDX → React pipeline (remark/rehype)
- Heading IDs + copy-link anchors
- Table of contents (responsive)
- Code blocks (highlight + copy)
- Callouts/admonitions
- Related posts + tags/categories (simple deterministic scoring)

### Marketing/content sections (reusable blocks)
- FAQ accordion section
- Pricing table (tiers + toggle)
- Testimonials/reviews section (stars + quotes)
- Newsletter/waitlist signup section

---

## Primary OSS sources (mine first)

These are the current “deepen” sources we treat as primary references for patterns, APIs, and block layout conventions.

Blog pipeline (AST → React):
- `remarkjs/remark-rehype`
- `rehypejs/rehype-react`
- `rehypejs/rehype-slug`
- `rehypejs/rehype-autolink-headings`

Sections/components:
- `saadeghi/daisyui` — Tailwind component system; strong token/variant model
- `themesberg/flowbite` — Tailwind component library; interactive primitives + forms patterns
- `markmead/hyperui` — copy/paste blocks; fast canonical variants for sections
- `mertJF/tailblocks` — block library; pricing/testimonials/FAQ/newsletter coverage
- `merakiuilabs/merakiui` — blocks with RTL/dark-mode patterns (important acceptance criteria)
- `ephraimduncan/blocks` — shadcn-based blocks; component composition patterns
- `lmsqueezy/wedges` — React + Radix + Tailwind primitives; “real library” APIs

Notes live in curation (append-only):
- `docs/.blackbox/oss-catalog/curation.json`

---

## Mini-POC definition (“Blog Page Kit”)

Goal: prove we can assemble a **single high-quality page** from these primitives within ~1 working day.

Checklist (engineer-executable):
- `docs/.blackbox/.plans/2025-12-31_0551_component-mining-mini-poc-blog-sections-kit/context/steps/0002_1-day-blog-page-kit-mini-poc-checklist.md`

Stop rules (timebox protection):
- ship TOC without active highlighting if it adds complexity
- ship markup + minimal behavior for interactive blocks; document gaps
- pick 1 canonical style per block; defer style variants

---

## License + attribution guardrails

We treat licensing as a hard gate:
- `license_bucket=safe` → OK to adapt/copy **with attribution** and keeping license notices
- `license_bucket=verify` → reference-only until confirmed
- `license_bucket=flagged` → patterns-only; do not copy code

If a repo aggregates third-party components (marketplace style), confirm component-level licensing before copying anything.

---

## Next actions (how this compounds)

1) Execute the Blog Page Kit mini‑POC and capture artifacts in the plan folder.
2) Promote any stable contracts into:
   - `docs/.blackbox/oss-catalog/blocks-inventory.md` (acceptance criteria + source map)
   - optionally a product-facing doc under `docs/01-product/` or engineering note under `docs/02-engineering/`
3) Only return to discovery when a specific block has no viable primary sources.

