# Checklist

- [ ] Step 1: Inventory infra leaks (Shopify touching UI/domain) with paths
- [ ] Step 2: Propose target layers + import rules (ports/adapters)
- [ ] Step 3: Draft port contracts + DTOs + capability flags
- [ ] Step 4: Write ranked migration plan (incremental, reversible)

## Artifacts (required)
- [ ] Fill `artifacts/run-meta.yaml` (model name + temperature; inputs already set)
- [ ] Capture sources in `artifacts/sources.md`
- [ ] Write a short synthesis in `artifacts/summary.md`
- [ ] Write `final-report.md` (architecture + contracts)
- [ ] Write `artifact-map.md` (violations + candidates)
- [ ] Write `rankings.md` (0–100 ranked steps)

## Prompt cycle (6–10 hours / ~50 prompts)
- [ ] Follow `agent-cycle.md` prompts 1–10
- [ ] Follow `agent-cycle.md` prompts 11–20
- [ ] Follow `agent-cycle.md` prompts 21–35
- [ ] Follow `agent-cycle.md` prompts 36–47
- [ ] Follow `agent-cycle.md` prompts 48–50
- [ ] Create checkpoint steps every 3–5 prompts (`context/steps/`)
- [ ] Compact context as needed (`context/compactions/`)

## Promotion (required when reusable)
- [ ] Promote any reusable outputs into `docs/05-planning/research/`
- [ ] Link back to this run folder from the evergreen note
- [ ] Append a short entry to `docs/.blackbox/journal.md` with what changed + why

## Docs routing (required when creating/updating docs outside `.blackbox`)
- [ ] Put docs in the correct `docs/0X-*/` section (see `docs/README.md`)
- [ ] Update the nearest folder `README.md` or `INDEX.md` with a link (so it’s discoverable)
- [ ] Add an entry to `docs/08-meta/repo/docs-ledger.md` (so we can always find it)
