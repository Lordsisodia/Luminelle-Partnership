# Next Step (Prompts 48–50)

Paste this into the Codex CLI session to run prompts 48–50 (final synthesis + handoff).

## Hard constraints (repeat)

- No code changes (read-only).
- Only write into: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`

## Goal for prompts 48–50

Produce the clean “decision-ready” deliverables:
- `final-report.md` as the canonical architecture doc for this run
- `artifacts/summary.md` as a 1-page skim
- a clear handoff section describing next steps once code changes are allowed

## Prompt 48 — Final report polish

Rewrite `final-report.md` to be:
- clean and non-redundant
- structured (layers → ports → capabilities → import rules → migration)
- backed by concrete repo paths (link to `artifact-map.md` + `artifacts/sources.md`)

## Prompt 49 — One-page summary

Write `artifacts/summary.md` as:
- 5–10 bullets max
- top 3 decisions needed
- top 5 next steps (ranked)
- key file paths for the first implementation sprint

## Prompt 50 — Handoff / next actions

Add a “Handoff” section to `final-report.md`:
- What to do in week 1 (once code changes are allowed)
- What to avoid (common failure modes: ports too Shopify-shaped, UI hardcodes vendor, etc.)
- How to add Stripe later without rewriting UI

## Final checkpoint

From `docs/` run:

```bash
./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters "Checkpoint: prompts 48–50 synthesis complete"
```

