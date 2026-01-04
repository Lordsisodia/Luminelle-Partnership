# `.timeline` — Activity Feed for Agents

Purpose: keep a single, append-only feed of what changed in the product/docs, so any agent can see the recent history without digging through plans or PRs.

## Directory & files
- Location: `docs/.blackbox/.timeline/`
- One file per month, named `YYYY-MM.md` (e.g., `2026-01.md`).
- Entries are append-only; edit only to fix typos/links.

## Entry format (add to the current month file)
- Group entries under a date heading `## YYYY-MM-DD` (UTC).
- Add bullet lines newest-to-oldest under each date.
- Preferred line schema:
  - `- HH:MM UTC · agent <name/handle> · scope <app|docs|ops> · summary … · refs: <links or file paths>`
- Keep summaries short; add follow-up bullets if needed.

### Minimal template
```
## 2026-01-02
- 15:42 UTC · agent codex · scope docs · Created `.timeline` structure and seeded 2026-01 log · refs: docs/.blackbox/.timeline/README.md
```

### Tips
- Use UTC times for consistency.
- For related assets (plans, PRs, files), include paths/links in `refs`.
- If multiple agents touch the same day, keep order newest→oldest to reduce merge conflicts.
- For larger efforts, link to the plan folder in `.blackbox/.plans/` plus the artifact path.
