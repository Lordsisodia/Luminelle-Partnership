# Plan: deep-research-oss-competitors-admin

## Goal
Build a competitor landscape and extract a ranked list of OSS code we can realistically integrate into our admin dashboard + core platform, prioritizing low-cost setups and fast time-to-value.

## Created
2025-12-28 19:11

## Target (optional)
First usable shortlist + plan by end of this run (12–20 hours).

## Context
- We want to accelerate product execution by learning from competitors and reusing high-quality open-source code.
- This is a long-run deep research effort; outputs should be structured and auditable.
- “Done” definition:
  - A competitor matrix (including adjacent spaces)
  - A shortlist of OSS repos/components with licenses + integration notes
  - A build-vs-buy table for top needs
  - Ranked recommendations + 3 quick wins

## Docs To Read (and why)
- [ ] `docs/.blackbox/agents/_core/prompt.md` — staged workflow + communication expectations
- [ ] `docs/.blackbox/agents/deep-research/prompt.md` — long-run safe run protocol
- [ ] `docs/.blackbox/agents/deep-research/rubric.md` — scoring for rankings
- [ ] `docs/.blackbox/deepresearch/competitor-feature-map.md` — existing competitor notes (seed)
- [ ] `docs/.blackbox/deepresearch/open-source-frameworks-shortlist.md` — existing OSS shortlist (seed)
- [ ] `docs/01-product/admin/` — current admin docs for feature needs
- [ ] `docs/06-quality/feedback/` — feedback signals that imply missing admin/core functionality

## Plan Steps
- [ ] Step 1: Define needs map (admin + core) in `artifacts/needs-map.md`
- [ ] Step 2: Build competitor matrix (including adjacent categories)
- [ ] Step 3: Harvest OSS candidates + licenses + integration notes
- [ ] Step 4: Build vs buy table for top needs
- [ ] Step 5: Produce ranked recommendations + quick wins

## Artifacts (created/updated)
- `artifacts/needs-map.md` — feature needs list + “done” definitions
- `artifacts/competitor-matrix.md` — competitor landscape + offerings
- `artifacts/oss-candidates.md` — OSS repos + licenses + integration notes
- `artifacts/build-vs-buy.md` — decision table for what to build vs adapt vs buy
- `artifacts/recommendations.md` — ranked short list + quick wins
- `artifacts/sources.md` — links/citations used
- `artifacts/run-meta.yaml` — run configuration + scope

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- What exact admin surface is the priority for “cool code” (content editor, media, analytics, experiments, etc.)?
- Licensing: some repos are unclear or restrictive; we must confirm before adopting.
- Integration risk: “cool code” might not fit our stack cleanly; prefer pragmatic wins.

## Notes / Revisions
- <short log of changes to the plan, if needed>
