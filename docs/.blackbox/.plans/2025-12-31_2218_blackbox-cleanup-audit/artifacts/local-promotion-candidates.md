# Promotion candidates from `docs/.blackbox/.local/` (report-only)

Evidence anchors:
- `.local/` is gitignored by `docs/.blackbox/.gitignore` (entry: `.local/`)

## 1) Quick counts

- local_md_files=3
- local_other_files=5

## 2) Candidate query-bank docs (present in .local but not in snippets/research)

These are `github-search-queries.<topic>.md` files that currently exist only in `.blackbox/.local/` (and therefore are not committed).

Promote (copy) any you want to keep into:
- `docs/.blackbox/snippets/research/`

- (none found)

## 3) Feature-map docs in .local

These were promoted out of `.blackbox/.local/` into a committed snippets location:
- `docs/.blackbox/snippets/research/feature-maps/`

Moved/renamed:
- `.blackbox/.local/feature-map-admin-bulk-edit.md` → `.blackbox/snippets/research/feature-maps/admin-bulk-edit.md`
- `.blackbox/.local/feature-map-clipboard-import.md` → `.blackbox/snippets/research/feature-maps/clipboard-import.md`
- `.blackbox/.local/feature-map-inventory-sync.md` → `.blackbox/snippets/research/feature-maps/inventory-sync.md`
- `.blackbox/.local/feature-map-returns.md` → `.blackbox/snippets/research/feature-maps/returns-exchanges.md`
- `.blackbox/.local/feature-map-webhooks-idempotency.md` → `.blackbox/snippets/research/feature-maps/webhooks-idempotency.md`

## 4) Non-doc artifacts in .local (usually safe to keep local)

- `oss-discovery-state.json` (state)
- `validate-loop.log`, `validate-status.*` (validation state)
- `tranche-*` random temp files
