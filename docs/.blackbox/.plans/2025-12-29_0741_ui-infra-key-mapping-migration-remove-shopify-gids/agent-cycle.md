# Agent Cycle (≈20–30 prompts / 2–4 hours)

Goal: remove `gid://shopify/...` strings from UI/providers and client config by standardizing on internal keys and resolving vendor IDs only inside adapters.

Run safety (recommended in a second terminal, from `docs/`):

```bash
./.blackbox/scripts/validate-loop.sh --auto-sync --interval-min 15 --max-failures 3 --check-vendor-leaks
```

Rules:
- Keep prompts small and verifiable.
- After every 3–5 prompts: write a checkpoint via `./.blackbox/scripts/new-step.sh`.
- Do not touch unrelated code.

## Prompts

1) Run `./.blackbox/scripts/check-vendor-leaks.sh` and capture the output into `artifacts/baseline-vendor-leaks.txt`.
2) List the exact files/lines that contain `gid://shopify/` (from baseline) and classify: UI/provider vs client config vs legacy migration.
3) Define the minimal internal `VariantKey` scheme for the affected variants (2–10 keys) and write it into `final-report.md`.
4) Decide the mapping location (one module) and document the “single source of truth” rule.
5) Draft the file-by-file edit sequence (no code yet): which files change, what fields rename, what compatibility shims are needed.
6) Identify which matches are allowed temporarily (e.g. legacy cleanup only) and how we’ll sunset them.
7) Define the acceptance criteria in measurable terms (what `check-vendor-leaks` must output, what is allowed).
8) Update `rankings.md` to reflect the new top priority (vendor IDs removal) and why.
9) Update `status.md` with phase + next action.

Optional (if you later allow code edits):
10) Execute the smallest change first (e.g. config key rename + adapter resolver), re-run vendor leak checker.
11) Continue until `check-vendor-leaks` is clean for UI/providers + client config.

