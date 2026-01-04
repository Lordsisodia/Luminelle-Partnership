# Plan: deep-research returns domain model mining (Saleor)

## Goal
Extract a **reference-quality returns/refunds/store-credit domain model** from Saleor (and related OSS artifacts) so we can:
- build our own returns lifecycle (on workflow + policy + audit primitives)
- map Shopify events/objects into a consistent internal model
- stop relying on low-signal GitHub repo search for returns/RMA (now saturated)

## Created
2025-12-31 06:55

## Target (optional)
1 working day for a first pass (file-level references + mapping + decision notes).

## Context
- Prompt: returns/RMA repo search is yielding diminishing returns even at low stars. We already curate `saleor/saleor` and should mine the domain model from a mature commerce stack instead.
- Constraints:
  - No cloning/vendoring into this docs repo; use metadata + file path references + notes.
  - Do not print tokens; use `gh` auth for GitHub API access.
  - License gate: we only copy snippets from permissive licenses (but this work is primarily “patterns + file references”).
- “Done” definition:
  - We identify where Saleor models returns/refunds/exchanges (and store credit if applicable) in code/schema.
  - We write a short mapping: Shopify → internal returns objects (fields + state transitions).
  - We update curation notes for `saleor/saleor` with “what to mine” pointers and stop rules.

## Docs To Read (and why)
- [ ] `docs/.blackbox/oss-catalog/lanes/returns-store-credit.md` — current returns lane scope + stop rules.
- [ ] `docs/.blackbox/oss-catalog/next-plan.md` — gaps + preferred next tactics (mine platforms vs search).
- [ ] `docs/.blackbox/oss-catalog/curation.json` — current status/POC fields for `saleor/saleor`.
- [ ] `docs/.blackbox/oss-catalog/component-mining-playbook.md` — guardrails for mining without vendoring.

## Plan Steps
- [ ] Step 1: Locate Saleor returns/refunds artifacts (files + schema)
- [ ] Step 2: Write Shopify → returns mapping + state model notes
- [ ] Step 3: Update curation notes + promote evergreen deepresearch
- [ ] Step 4: Checkpoint (ledger + render + validate)

## Artifacts (created/updated)
- `docs/.blackbox/.plans/2025-12-31_0655_deep-research-returns-domain-model-mining-saleor/artifacts/` — sources + extracted references + summary.
- `docs/.blackbox/oss-catalog/curation.json` — append “what to mine” notes for Saleor.
- `docs/.blackbox/deepresearch/` — promoted evergreen synthesis note (after we have stable mapping).

## Information Routing (where outputs should live)
- Run artifacts (raw/sources/extractions): keep inside this plan folder under `artifacts/`
- Reusable knowledge: promote into `docs/.blackbox/deepresearch/`
- Docs-wide deliverables: place under the correct `docs/0X-*/` category and add a link in the nearest folder `README.md` or `INDEX.md`

## Open Questions / Risks
- Store credit in Saleor may be implemented via gift cards / vouchers rather than a dedicated store-credit ledger; need to confirm.
- Returns in headless commerce stacks can be split across “refunds”, “fulfillments”, and “warehouse” concerns; we need to isolate only what’s reusable for our Shopify-connected ops.

## Notes / Revisions
- 2025-12-31: Plan created after returns repo search saturation; pivot to mining mature platform domain models.
