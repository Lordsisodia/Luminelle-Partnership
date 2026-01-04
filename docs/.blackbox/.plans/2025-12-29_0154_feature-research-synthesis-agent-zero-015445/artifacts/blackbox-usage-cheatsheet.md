---
status: active
last_reviewed: 2025-12-29
owner: agent
---

# `.blackbox` usage cheat sheet (for this repo)

- Scope: this repo uses `docs/.blackbox/` as a repeatable research runtime (evidence: `.blackbox/README.md`).
- Rule of thumb: keep “work output” in normal `docs/` paths, and keep “run artifacts + logs” inside a `.blackbox/.plans/<run>/` folder (evidence: `.blackbox/README.md`, `.blackbox/scripts/README.md`).

## Read-first (to avoid drift)

- Protocol and ops: `.blackbox/protocol.md`
- Current constraints/state: `.blackbox/context.md`
- Backlog: `.blackbox/tasks.md`
- Long-run notes: `.blackbox/journal.md`

## Start a new plan (manual / ad-hoc work)

- Create a timestamped plan folder (copies `.blackbox/.plans/_template/`):
  - `./.blackbox/scripts/new-plan.sh "my-goal-slug"` (evidence: `.blackbox/README.md`)
- Work “normally” in `docs/` folders, but save intermediate artifacts into:
  - `.blackbox/.plans/<your-plan>/artifacts/` (evidence: `.blackbox/README.md`)

## Start a new run (repeatable prompt-driven work)

- Create a “run” (plan + artifacts + run metadata):
  - `./.blackbox/scripts/new-run.sh deep-research "competitor matrix" --prompt .blackbox/agents/deep-research/prompts/library/01-competitor-matrix.md` (evidence: `.blackbox/README.md`)
- Feature research (4-agent scaffold + synthesis):
  - `./docs/.blackbox/scripts/start-feature-research.sh` (evidence: `.blackbox/.prompts/feature-research-orchestrator.md`, `.blackbox/scripts/README.md`)

## Checkpoints + memory (required for long runs)

- Create a checkpoint step file (one file per step):
  - `./.blackbox/scripts/new-step.sh --plan .blackbox/.plans/<plan> "Checkpoint: <what changed>"` (evidence: `.blackbox/scripts/new-step.sh`)
- Fill the step file with real bullets (no placeholders):
  - `.blackbox/.plans/<plan>/context/steps/<NNNN>_checkpoint-*.md`
- Compact context when it grows:
  - `./.blackbox/scripts/compact-context.sh --plan .blackbox/.plans/<plan>` (evidence: `.blackbox/README.md`)

## Validation / hygiene (optional but recommended)

- Validate `.blackbox` structure and run outputs:
  - `./.blackbox/scripts/validate-all.sh`
  - `./.blackbox/scripts/validate-loop.sh --auto-sync --interval-min 15` (evidence: `.blackbox/scripts/README.md`)

## How this ties to women’s fashion e-commerce benchmarking

- The compiled women’s fashion benchmark outputs live in normal docs paths:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.csv`
- The related `.blackbox` plan run folder (snapshots + scans) is:
  - `.blackbox/.plans/2025-12-29_0523_deep-research-ecommerce-benchmark-womens-fashion/` (evidence: `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md`)
- Manual funnel audits (PDP/cart/checkout) are tracked here:
  - `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-shortlist-15/DASHBOARD.md`
