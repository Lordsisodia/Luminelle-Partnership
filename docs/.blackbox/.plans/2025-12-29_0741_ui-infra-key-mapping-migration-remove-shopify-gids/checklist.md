# Checklist

- [x] Step 1: Capture baseline `check-vendor-leaks` output to `artifacts/baseline-vendor-leaks.txt`
- [x] Step 2: Define `VariantKey` naming scheme for affected SKUs
- [x] Step 3: Decide mapping registry location (single source of truth)
- [x] Step 4: Write the exact file-by-file edit plan + acceptance checks in `final-report.md`

## Artifacts (required)
- [x] Fill `artifacts/run-meta.yaml` (inputs + model + outputs pointers)
- [x] Capture sources in `artifacts/sources.md`
- [x] Write a short synthesis in `artifacts/summary.md`

## Promotion (required when reusable)
- [ ] Promote to `.blackbox/deepresearch/YYYY-MM-DD_<topic>.md`
- [ ] Link the run folder from the evergreen note
- [ ] Update `.blackbox/journal.md` with what changed + why

## Docs routing (required when creating/updating docs outside `.blackbox`)
- [ ] Put docs in the correct `docs/0X-*/` section (see `docs/README.md`)
- [ ] Update the nearest folder `README.md` or `INDEX.md` with a link (so it’s discoverable)
- [ ] Add an entry to `docs/08-meta/repo/docs-ledger.md` (canonical) so we can always find it
