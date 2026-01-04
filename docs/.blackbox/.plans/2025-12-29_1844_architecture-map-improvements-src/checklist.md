# Checklist

- [x] Step 1: Inventory entrypoints + domain structure (map what exists)
- [x] Step 2: Map platform ports/adapters + runtime selection pattern
- [x] Step 3: Identify coupling/leaks above adapters
- [x] Step 4: Write improvement roadmap (incremental + measurable)

## Artifacts (required)
- [ ] Fill `artifacts/run-meta.yaml` (inputs + model + outputs pointers)
- [ ] Capture sources in `artifacts/sources.md`
- [ ] Write a short synthesis in `artifacts/summary.md`

## Promotion (required when reusable)
- [ ] Promote to `.blackbox/deepresearch/YYYY-MM-DD_<topic>.md`
- [ ] Link the run folder from the evergreen note
- [ ] Update `.blackbox/journal.md` with what changed + why

## Docs routing (required when creating/updating docs outside `.blackbox`)
- [ ] Put docs in the correct `docs/0X-*/` section (see `docs/README.md`)
- [ ] Update the nearest folder `README.md` or `INDEX.md` with a link (so it’s discoverable)
- [ ] Add an entry to `docs/08-meta/repo/docs-ledger.md` (canonical) so we can always find it
