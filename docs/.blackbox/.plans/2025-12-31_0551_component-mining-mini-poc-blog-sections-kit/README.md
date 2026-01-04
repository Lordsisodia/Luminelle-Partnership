# Plan: Component mining mini-POC (blog + sections kit)

## Goal
Define a small, reusable “Lumelle Blocks Kit” spec + inventory, and a concrete 1‑day mini‑POC plan to validate:
- our blog/article renderer pipeline (MDX/Markdown → React)
- our page sections (FAQ, pricing, testimonials, newsletter)

This is **pattern mining**, not vendoring: we’ll record patterns + contracts, and only copy/adapt code from permissive licenses.

## Created
2025-12-31 05:51

## Target (optional)
1 working day (mini‑POC scope).

## Context
- Prompt: OSS discovery produced high-signal repos for blog rendering + reusable marketing sections; we need to turn that into an actionable kit.
- Constraints:
  - No token leaks; use GitHub CLI auth patterns.
  - No cloning/vendoring; metadata + notes only.
  - License gating: only copy from `license_bucket=safe`; treat `verify` as watch/reference until confirmed; never copy from `flagged`.
- “Done” definition:
  - We have a blocks inventory with acceptance criteria + sources.
  - We have a 1‑day mini‑POC plan that is executable by an engineer without further research.

## Docs To Read (and why)
- [ ] `docs/.blackbox/oss-catalog/component-mining-playbook.md` — guardrails + extraction checklist.
- [ ] `docs/.blackbox/oss-catalog/lanes/sections-components.md` — primary sources for FAQ/pricing/testimonials/newsletter blocks.
- [ ] `docs/.blackbox/oss-catalog/lanes/storefront-content.md` — blog/article rendering pipeline + storefront pattern mining.
- [ ] `docs/.blackbox/oss-catalog/shortlist.md` — confirm which repos are already POC/deepen.

## Plan Steps
- [ ] Step 1: Define block inventory + acceptance criteria
- [ ] Step 2: Map blocks to OSS sources (deepen vs watch)
- [ ] Step 3: Write a 1‑day “blog page kit” mini‑POC plan
- [ ] Step 4: Append mining notes into curation for key repos
- [ ] Step 5: Render + checkpoint

## Artifacts (created/updated)
- `docs/.blackbox/oss-catalog/blocks-inventory.md` — block list + acceptance criteria + source map.
- `docs/.blackbox/oss-catalog/component-mining-playbook.md` — extraction checklist + guardrails.
- `docs/.blackbox/oss-catalog/curation.json` — appended “what to mine” notes on key repos.

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- What is our target component stack (pure React components vs Tailwind utility classes vs shadcn/Radix primitives)?
- Licensing nuance for “component marketplaces” (need to confirm per-component licensing if a repo aggregates content).

## Notes / Revisions
- 2025-12-31: Plan created from post-discovery inventory; focused on extraction/mining rather than further scraping.
