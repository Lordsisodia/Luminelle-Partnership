# Run Now (key-mapping migration plan)

From `docs/`:

1) Sanity check + drift fix:

```bash
./.blackbox/scripts/validate-all.sh --auto-sync --check-vendor-leaks
```

2) Run this plan’s cycle:
- `agent-cycle.md`

3) Capture the baseline scan output:
- `artifacts/baseline-vendor-leaks.txt`

