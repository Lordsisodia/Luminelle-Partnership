# Next Step (Prompts 6–10)

Paste this into the Codex CLI session to run prompts 6–10 (inventory expansion).

## Hard constraints (repeat)

- No code changes (read-only).
- Only write into: `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`

## Goal for prompts 6–10

Expand the coupling inventory with **concrete file paths + specific examples** and update:
- `artifact-map.md`
- `artifacts/sources.md`
- (optional) `final-report.md` if you discover a missing port/capability

## Repo scan commands (run and paste results)

Run these and paste the key hits into `artifact-map.md` (don’t dump everything):

```bash
rg -n "@platform/commerce/shopify|runStorefront|shopifyEnabled|gid://shopify|checkoutUrl" src -S
rg -n "Shopify checkout|Secure checkout \\(Shopify\\)|Preparing Shopify checkout" src -S
rg -n "metaobject\\(" src -S
```

## Prompt 6

Inventory the **top 20 Shopify touchpoints** (paths + 1-line note each). Categorize as:
- UI leak
- domain leak
- proper platform adapter

## Prompt 7

For each category above, list the top 3 “worst offenders” and explain:
- why it blocks UI interchangeability
- what port boundary would remove the coupling

## Prompt 8

Update `artifacts/sources.md` with the specific file paths you actually inspected (with “Supports:” notes).

## Prompt 9

Update `final-report.md` with any missing items in:
- Port catalog (ports/DTOs you now realize are needed)
- Capability model (checkout modes, provider labels, etc.)

## Prompt 10

Update `rankings.md` with 2–3 additional ranked items (0–100) if the inventory revealed new high-leverage steps.

## After prompt 10 (checkpoint)

From `docs/` run:

```bash
./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters "Checkpoint: prompts 6–10 coupling inventory expanded"
```

