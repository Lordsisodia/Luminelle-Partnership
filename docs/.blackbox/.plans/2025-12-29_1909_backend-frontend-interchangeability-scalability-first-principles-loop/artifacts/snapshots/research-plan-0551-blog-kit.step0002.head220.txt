---
step: 0002
created_at: "2025-12-31 06:05"
title: "1-day blog page kit mini-POC checklist"
---

# Step 0002: 1-day blog page kit mini-POC checklist

## ✅ What I did (facts)

- Wrote a concrete, engineer-executable 1‑day mini‑POC checklist for a “Blog Page Kit” that exercises:
  - Markdown/MDX rendering (remark → rehype → React)
  - heading IDs + copy-link anchors
  - table of contents (responsive + active section)
  - code blocks (syntax highlight + copy)
  - 3 marketing blocks on the same page (FAQ, pricing, testimonials, newsletter)
- Grounded acceptance criteria in `docs/.blackbox/oss-catalog/blocks-inventory.md` so the POC has a measurable “done”.
- Added stop-rules to prevent scope creep and keep this to ~1 working day.

## 🧠 What I learned (new information)

- We have enough high-signal sources (blog pipeline + Tailwind blocks libraries) to stop searching and start extracting a coherent internal kit.
- The highest risk isn’t “finding more repos”; it’s consistency: normalizing spacing/typography/a11y across blocks mined from different libraries.
- For interactive UI (accordion, tabs, modal-like patterns), separating *markup* from *behavior* early avoids accidental lock-in to a library’s JS runtime.

## 🧭 What changes because of this

- The component-mining workflow can switch from discovery → execution: build a minimal kit and only return to discovery when a specific block has no viable sources.
- We now have a single checklist that an engineer can run without additional research, and a clear artifact trail for decisions.

## ✅ 1‑day mini‑POC checklist (Blog Page Kit)

Timebox: 6–8 hours total. Target outcome: a single demo page that proves the “Blocks Kit v1” can be assembled end‑to‑end.

### 0) Setup (15–30 min)
- Choose a scratch surface in the main product repo (preferred) or a throwaway sandbox app.
- Add a single sample post (Markdown or MDX) with: headings (h2/h3), lists, images, a table, links, and 2 code blocks (different languages).

### 1) Markdown/MDX → React rendering pipeline (60–90 min)
- Implement the pipeline using:
  - `remark` + `remark-rehype`
  - `rehype-slug` + `rehype-autolink-headings`
  - `rehype-react` (component overrides)
- Guardrail: do not allow unsafe raw HTML execution (avoid raw HTML or add a sanitization step).
- Verify acceptance criteria from the inventory:
  - headings, lists, images, tables, links render correctly
  - deterministic output (same input → same output)

### 2) Heading anchors + “copy link” (45–60 min)
- For every `h2/h3/h4`:
  - stable `id`
  - visible “copy link” affordance
- A11y acceptance criteria:
  - keyboard reachable
  - visible focus
  - ARIA label (“Copy link to heading”)

### 3) Table of contents (TOC) (60–90 min)
- Build a heading tree (text, id, depth).
- Render TOC:
  - desktop: sticky
  - mobile: collapsible (or inline at top if timeboxed)
- Active section highlighting:
  - use IntersectionObserver if feasible; stop-rule: if jank appears, ship without active highlighting for the 1‑day POC.

### 4) Code blocks (syntax highlight + copy) (60–90 min)
- Use one path (pick one and timebox):
  - `rehype-pretty-code` OR `shiki` (both already in catalog)
- Acceptance criteria:
  - copy button copies raw code
  - horizontal scroll works; long lines don’t break layout

### 5) Callouts / admonitions (30–60 min)
- Implement a `Callout` component with `kind=info|warning|danger`.
- Wire it into MDX/Markdown (MDX component preferred; stop-rule: if Markdown-only is hard, keep as MDX for the POC).
- Acceptance criteria:
  - accessible semantics; consistent spacing/typography

### 6) Add 3 marketing blocks to the same page (90–150 min)

Goal: validate the sections kit is compatible with the blog page layout and doesn’t fight the content renderer.

- FAQ accordion section
  - Must support keyboard nav and rich content in answers.
- Pricing table (tiers + monthly/yearly toggle)
  - Toggle should not cause layout shift; “most popular” highlight not color-only.
- Testimonials / reviews section
  - Include 0–5 star rating display (read-only) and quote cards; avoid layout shift on avatar load.
- Newsletter/waitlist signup section (if time permits, otherwise defer)
  - Validation + loading + success/error states.

### 7) POC QA sweep (30–60 min)
- Responsive check: 360px / 768px / 1024px.
- Keyboard nav: TOC, headings, accordion, copy buttons.
- Quick content torture test: long headings, missing images, many FAQ items.

### 8) Record artifacts (15–30 min)
- Update `docs/.blackbox/.plans/2025-12-31_0551_component-mining-mini-poc-blog-sections-kit/artifacts/run-meta.yaml` with:
  - runtime/framework chosen
  - pipeline libs used
  - blocks completed vs deferred
- Update `docs/.blackbox/.plans/2025-12-31_0551_component-mining-mini-poc-blog-sections-kit/artifacts/sources.md` with:
  - which OSS repos informed which blocks (safe-only for any copied snippets)
- Write a short decision summary in:
  - `docs/.blackbox/.plans/2025-12-31_0551_component-mining-mini-poc-blog-sections-kit/artifacts/summary.md`

### Stop rules (keep it to 1 day)
- If TOC active highlighting adds complexity: ship TOC without active state.
- If interactive behavior is a time sink: ship markup + minimal behavior and document the gap.
- If a block needs heavy theming: choose 1 canonical variant and defer alternate styles.

## ➡️ Next step

- Render the OSS catalog to ensure curation notes + lane docs still reconcile, then create a plan checkpoint step that points engineers at this checklist + the Blocks Inventory.

## 🔗 Links / references

- `docs/.blackbox/oss-catalog/blocks-inventory.md`
- `docs/.blackbox/oss-catalog/component-mining-playbook.md`
- `docs/.blackbox/oss-catalog/lanes/storefront-content.md`
- `docs/.blackbox/oss-catalog/lanes/sections-components.md`
- `docs/.blackbox/oss-catalog/curation.json`
