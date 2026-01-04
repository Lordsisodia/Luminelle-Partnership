# Kickoff (paste into Codex CLI)

Paste this entire message into the Codex CLI session to begin the 6–10 hour agent cycle.

---

## Hard constraints (non-negotiable)

1) **No code changes.** Do not modify anything under `src/`, `functions/`, `api/`, etc.
2) **Write outputs only into this run folder:**
   - `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`
3) Maintain long-run memory:
   - Every 3–5 prompts (or ~30–45 minutes): create a checkpoint step file:
     - `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters "Checkpoint: <what changed>"`
   - Compact context when needed:
     - `./.blackbox/scripts/compact-context.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters`

## Inputs to read (in order)

1) `docs/.blackbox/agents/deep-research/prompts/context-pack.md`
2) `docs/.blackbox/agents/deep-research/prompts/library/12-ui-infra-plugin-architecture.md`

## Required outputs (must exist by the end)

- `final-report.md`
- `artifact-map.md`
- `rankings.md`
- `artifacts/sources.md`
- `artifacts/summary.md`

## Prompt cycle start (Prompts 1–5)

Prompt 1:
Restate the goal in one sentence (Shopify now; Stripe later; UI plug‑in) and list the non-negotiables you will obey.

Prompt 2:
List the must-read files (paths only) you will audit first, with a one-line reason each. Keep it to 10–15 files max.

Prompt 3:
Run a quick repo scan (commands + results) to identify all Shopify touchpoints. Categorize into: UI leak / domain leak / proper adapter. Write the first draft of `artifact-map.md` populated with paths.

Prompt 4:
Draft the target layering model and import rules (UI → domain → platform ports → vendor adapters). Write the first draft of `final-report.md` sections “Target Layers” + “Import Rules”.

Prompt 5:
Draft a first-pass port catalog (names only) and capability model (checkout modes, provider labels). Add it to `final-report.md` and add “open questions” that need decisions.

## Process note

Work in phases (setup → inventory → contracts → migration → synthesize). Keep output terse and path-driven. If uncertain, write an explicit open question and proceed.

