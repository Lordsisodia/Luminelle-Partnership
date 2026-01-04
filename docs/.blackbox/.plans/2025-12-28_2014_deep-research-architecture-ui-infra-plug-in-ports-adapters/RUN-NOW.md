# Run Now (this plan)

Goal: UI ↔ Infra plug-in architecture (Shopify now, Stripe later), CLI-only.

## 1) Keep the repo healthy (second terminal, recommended)

From `docs/`:

```bash
./.blackbox/scripts/validate-loop.sh --auto-sync --interval-min 15 --max-failures 3
```

## 2) Run the 6–10 hour cycle (main terminal)

Open and follow:
- `agent-cycle.md`

Optional: use the prompt pack as your “copy/paste launcher”:
- `docs/.blackbox/.prompts/ui-infra-architecture-cycle.md`

Starting point (if you want to skip rediscovery):
- `artifacts/current-state-inventory.md`

## 3) Checkpoints (keep long-run memory stable)

```bash
./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters "Checkpoint: <what changed>"
./.blackbox/scripts/compact-context.sh --plan .blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters
```

Optional: keep a per-prompt log (recommended for 50-prompt runs):
- `prompt-log.md`
