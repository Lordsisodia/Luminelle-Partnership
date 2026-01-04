# Next Step (Prompts 36–47)

Paste this into the Codex CLI session to run prompts 36–47 (migration plan: incremental + reversible).

## Hard constraints (repeat)

- No code changes (read-only).
- Only write into: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`

## Goal for prompts 36–47

Convert the contracts into a migration plan you can execute later:
- Small, reversible steps
- Each step names exact files to touch (later) + “done” definition
- Ranked by leverage vs risk

Primary files to update:
- `rankings.md`
- `final-report.md` (migration section)
- `artifact-map.md` (add per-step file lists)

Optional:
- create `migration-checklist.md` in this plan folder for a very operational plan

## Prompt 36 — Migration principles

Write “migration rules” (5–10), e.g.:
- introduce ports first, adapters second
- do not change UI behavior while moving imports
- keep old entrypoints temporarily (deprecated) if needed

Add to `final-report.md`.

## Prompt 37 — Steps 1–3 (fastest leverage)

Define the first 3 steps that reduce coupling the most with minimal risk.
Each step must include:
- Files to touch (paths)
- What changes (in words)
- “Done” checks
- Rollback plan

Add to `rankings.md` and `artifact-map.md`.

## Prompt 38 — Steps 4–6 (shared lib + content abstraction)

Plan how to move:
- `src/lib/product.ts` behind `CatalogPort`
- `src/lib/sections.ts` behind `ContentPort`

Include file paths for the new port surfaces (proposed).

## Prompt 39 — Steps 7–9 (checkout + capabilities)

Plan how to remove vendor-specific copy/IDs from UI:
- `DrawerProvider` checkout copy
- GID usage in UI/config

Define capability-driven UI rendering changes (design only).

## Prompt 40 — Risks + mitigations per step

For each proposed step, list:
- risk
- mitigation
- how to validate safely

## Prompt 41 — Safe intermediate states (“stop points”)

Define 3–6 “stop points” where the codebase is stable and shippable even mid-migration.

## Prompt 42 — Stripe later: adapter plan

Define an explicit plan for adding Stripe later:
- new adapter folder
- which ports it implements first
- how to keep Shopify as system of record while payments shift (if needed)

## Prompt 43 — Documentation plan

Propose what docs should be created once implementation begins:
- where to put them under `docs/02-engineering/` and/or `docs/05-planning/`
- what to include (contract catalog, import rules, migration logs)

## Prompt 44 — Rank every step (0–100)

Update `rankings.md` so every migration step has:
- score + breakdown
- evidence paths
- “done” definition

## Prompt 45 — Week 1 execution checklist

Write a concrete “Week 1” plan (what to implement first once you allow code changes).

If helpful, create `migration-checklist.md`.

## Prompt 46 — Future extensibility checklist

Write a checklist of “do this later” items that preserve interchangeability:
- contract tests
- mock adapters
- capability flags expansion
- documentation automation

## Prompt 47 — Update artifact map

Update `artifact-map.md` with:
- the final migration plan index (step list)
- the key files each step touches

## After prompt 47 (checkpoint)

From `docs/` run:

```bash
./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters "Checkpoint: prompts 36–47 migration plan drafted"
```

