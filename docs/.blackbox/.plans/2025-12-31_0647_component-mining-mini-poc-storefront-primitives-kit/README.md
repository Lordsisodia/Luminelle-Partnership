# Plan: component-mining mini-POC storefront primitives kit

## Goal
Turn the existing storefront OSS catalog into an **engineer-executable storefront primitives kit** by:
- standardizing contracts + acceptance criteria for core storefront UI blocks (PLP/PDP/cart)
- mapping each block to 2–3 OSS reference sources
- producing a tight 1‑day mini‑POC checklist to validate the kit in a scratch app (no vendoring)

## Created
2025-12-31 06:47

## Target (optional)
1 working day (mini‑POC scope), plus ongoing “pattern mining” notes as we learn.

## Context
- Prompt: we now have multiple real storefront repos in curation (Hydrogen, Next.js starters, Medusa/Remix starter, storefront UI libs), but we need a coherent internal kit rather than more scraping.
- Constraints:
  - No token leaks: use GitHub CLI auth patterns (see `.blackbox/.skills/github-cli.md`).
  - No cloning/vendoring into this docs repo; record patterns + contracts only.
  - License gate: only copy/adapt from `license_bucket=safe` (with attribution).
  - Timebox: keep the POC to ~6–8 hours; stop rules to avoid scope creep.
- “Done” definition:
  - Blocks inventory includes storefront primitives + acceptance criteria.
  - A storefront reference set maps patterns → best repos.
  - This plan contains a 1‑day mini‑POC checklist that an engineer can run without additional research.

## Docs To Read (and why)
- [ ] `docs/.blackbox/oss-catalog/blocks-inventory.md` — storefront v1.5 primitives + acceptance criteria.
- [ ] `docs/.blackbox/oss-catalog/storefront-reference-set.md` — pattern → best repos map.
- [ ] `docs/.blackbox/oss-catalog/lanes/storefront-content.md` — storefront lane rationale + run commands.
- [ ] `docs/.blackbox/oss-catalog/component-mining-playbook.md` — mining checklist + license guardrails.

## Plan Steps
- [x] Step 1: Add storefront primitives to blocks inventory (PLP/PDP/cart)
- [x] Step 2: Annotate key storefront repos in curation (mining notes + tags)
- [x] Step 3: Write 1‑day storefront kit mini‑POC checklist (PLP/PDP/cart)
- [ ] Step 4: Render + checkpoint (catalog + ledger) and validate blackbox

## Artifacts (created/updated)
- `docs/.blackbox/oss-catalog/blocks-inventory.md` — storefront primitives contracts + acceptance criteria.
- `docs/.blackbox/oss-catalog/storefront-reference-set.md` — pattern mining index for storefront repos.
- `docs/.blackbox/oss-catalog/curation.json` — appended storefront mining notes + storefront tags.
- `docs/.blackbox/.plans/2025-12-31_0647_component-mining-mini-poc-storefront-primitives-kit/context/steps/0001_1-day-storefront-kit-mini-poc-checklist.md` — executable POC checklist.

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- What is the target frontend stack for the POC (Hydrogen/Next/Remix/Astro)? This plan is stack-agnostic, but implementation details will vary.
- How do we normalize the product/variant/cart DTOs across Shopify and potential future commerce backends (ports/adapters)?
- “Full starter” repos can hide licensing nuance (themes/components); confirm file-level license headers before copying any snippet.

## Notes / Revisions
- 2025-12-31: Plan created to shift from discovery → storefront primitives kit execution.
