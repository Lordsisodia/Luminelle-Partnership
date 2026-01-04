# Plan: architecture map + improvements (src)

## Goal
Produce a **complete, readable architecture map** of `src/` (how it’s organized and wired) and a **concrete improvement plan** for making components interchangeable (UI plug-in; Shopify today, Stripe/others tomorrow) — **without changing app code yet**.

## Created
2025-12-29 18:44

## Target (optional)
No deadline; optimize for accuracy and reusability.

## Context
- Prompt: map the whole architecture, then suggest improvements.
- Constraints:
  - No code changes to `src/` yet (docs/plans only).
  - CLI-only workflow (Codex CLI).
- “Done” definition:
  - We have a set of markdown docs that let someone new to the repo understand:
    - where UI lives vs domain vs platform ports/adapters
    - how providers are selected (mock/disabled/real)
    - where coupling currently leaks above adapters
    - the next 3–10 changes to improve modularity (incremental + reversible)

## Docs To Read (and why)
- [ ] `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/final-report.md` — prior architecture research baseline and terminology.
- [ ] `docs/05-planning/research/ui-infra-key-mapping-strategy.md` — “no vendor IDs above adapters” strategy.
- [ ] `docs/.blackbox/scripts/check-vendor-leaks.sh` — the measurable coupling scan we can use for enforcement later.

## Plan Steps
- [ ] Step 1: Inventory the codebase structure + runtime wiring (entrypoints, routes, providers).
- [ ] Step 2: Map platform ports/adapters and where they are consumed (client/admin/ui/lib).
- [ ] Step 3: Record coupling “leaks” (vendor IDs, vendor copy, vendor-specific assumptions) above adapters.
- [ ] Step 4: Propose improvements (rules + roadmap + acceptance checks).
- [ ] Step 5: Publish evergreen docs and log them in the canonical ledger.

## Artifacts (created/updated)
- `architecture-map.md` — the current architecture: layers, directories, key flows.
- `dependency-rules.md` — import boundaries + “what can depend on what”.
- `coupling-report.md` — where provider assumptions leak above adapters.
- `improvement-roadmap.md` — recommended improvements, phased and measurable.
- `final-report.md` — executive summary + pointers to the above.

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- There are two “content” layers (`platform/cms` and `platform/content`) which currently alias each other; decide the canonical name.
- Some vendor coupling is in UI copy (not just IDs); we should decide what belongs in capabilities vs UI strings.
- Type safety: key types are plain `string` aliases today; improvements may require branded types or zod decoding.

## Notes / Revisions
- 2025-12-29: Created the run folder and began inventory of entrypoints, platform runtimes, ports/adapters.
