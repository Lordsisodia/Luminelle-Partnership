# Black Box Maintenance (docs)

This file is the “how do we keep `docs/.blackbox/` clean?” guide.

## What’s canonical vs “compat pointers”

- ✅ Canonical docs-wide ledger: `docs/08-meta/repo/docs-ledger.md`
- ✅ Canonical docs-wide routing rules: `docs/08-meta/repo/information-routing.md`
- ℹ️ Compatibility pointers (kept to avoid breaking older links):
  - `docs/.blackbox/docs-ledger.md`
  - `docs/.blackbox/information-routing.md`

If you’re writing automation that appends entries, **write to the canonical files**, not the pointers.

## Regular cleanup loop

From `docs/`:

1) Validate structure + template drift

```bash
./.blackbox/scripts/check-blackbox.sh
```

If this fails due to template drift:

```bash
./.blackbox/scripts/sync-template.sh
./.blackbox/scripts/check-blackbox.sh
```

Optional sync flags:
- Preview: `./.blackbox/scripts/sync-template.sh --dry-run`
- Prune template extras: `./.blackbox/scripts/sync-template.sh --prune`

If you see “permission denied” when running blackbox scripts:

```bash
./.blackbox/scripts/fix-perms.sh
```

Optional (recommended during UI↔infra refactors): scan for vendor leaks above adapters:

```bash
./.blackbox/scripts/check-vendor-leaks.sh
```

2) (Optional) Archive old plan folders to keep `.plans/` readable

```bash
python3 ./.blackbox/scripts/archive-plans.py --older-than-days 14 --dry-run
python3 ./.blackbox/scripts/archive-plans.py --older-than-days 14
```

### High-frequency OSS runs (archive by count, not age)

OSS discovery can generate many plans quickly. If `.blackbox/.plans/` becomes noisy, archive OSS runs by keeping only the newest N and protecting:
- plans referenced in `docs/08-meta/repo/docs-ledger.md`
- plans pinned by a `.keep` file

```bash
python3 ./.blackbox/scripts/archive-oss-plans.py --dry-run
python3 ./.blackbox/scripts/archive-oss-plans.py --keep-latest 12
```

Pin important runs (never archive):

- Create a `.keep` file inside the plan folder:
  - `touch docs/.blackbox/.plans/<run>/.keep`
- Or use `--pin` patterns:
  - `python3 ./.blackbox/scripts/archive-plans.py --older-than-days 14 --pin "2025-12-28_*" --dry-run`

Safety default:
- `archive-plans.py` will skip plans modified in the last 3 days by default.
- To disable that: `--keep-modified-within-days 0`
- It will also keep the newest 5 plans visible by default.
- To disable that: `--keep-latest 0`

## What goes where (rule of thumb)

- Active execution / audit trail → `docs/.blackbox/.plans/<run>/`
- Reusable prompt packs → `docs/.blackbox/.prompts/` or `docs/.blackbox/agents/<agent>/prompts/`
- Reusable playbooks → `docs/.blackbox/.skills/`
- Reusable research “seed inputs” (query banks, feature maps) → `docs/.blackbox/snippets/research/`
- Legacy / historical docs → `docs/.blackbox/experiments/legacy/`
- Human-facing docs/research → `docs/0X-*/...` (and record in the ledger)
