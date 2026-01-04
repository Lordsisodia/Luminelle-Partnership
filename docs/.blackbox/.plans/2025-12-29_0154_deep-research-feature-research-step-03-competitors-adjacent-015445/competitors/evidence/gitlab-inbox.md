# Evidence Extract — GitLab (To-Do inbox + review inbox primitives)

- slug: `gitlab-inbox`
- category: inbox UX primitives (to-do queue) + review workflow (pending/unpublished reviews)
- license: MIT outside `ee/` (per repository LICENSE) (reference only; this note focuses on UX patterns)

## Cycle 8 — Evidence-backed primitives (inbox UX: tabs, snooze, bulk actions)

### Notable features (3)

1) To-Do List has explicit tabs + sorting semantics, including special handling for snoozed items  
Evidence: https://docs.gitlab.com/user/todos/

2) Snooze items with presets and explicit “Snoozed” tab; items return automatically after snooze window  
Evidence: https://docs.gitlab.com/user/todos/

3) Bulk edit to-do items (mark done / snooze / remove snooze / restore), including “select all” behaviors  
Evidence: https://docs.gitlab.com/user/todos/

### Copyable workflows (2)

1) Approval inbox workflow (generic): approval request arrives → appears in inbox → snooze if blocked → bulk-clear when resolved  
Evidence: GitLab To-Do list (snooze + bulk edit + tabs): https://docs.gitlab.com/user/todos/

2) Review-in-progress workflow: reviewer starts a review → comments remain pending/unpublished → submit review publishes and sends a single notification email  
Evidence: https://docs.gitlab.com/user/project/merge_requests/reviews/

### 3 steal ideas (easy / medium / hard)

- Easy: approval inbox “tabs” + “snooze” + “bulk actions” (mark done, snooze, restore) for merchant-admin approvals.
- Medium: “pending/unpublished decision” state (collect multiple comments/decisions then submit once) for approvals with rationale.
- Hard: inbox ranking (“Recommended”) that mixes created_at + snooze history + urgency scoring.

### Thin-slice implementation (1–3 days)

- Day 1: Approvals inbox list with tabs: `Pending`, `Snoozed`, `Done` + per-item `Mark done` and `Snooze`.
- Day 2: Snooze presets (1h, later today, tomorrow) + `unsnooze_at` behavior + automatic return to `Pending`.
- Day 3: Bulk actions UI (select rows, select all on page) for `Mark done`, `Snooze`, `Remove snooze`, `Restore`.

## License evidence (reference)

- MIT outside `ee/`: https://gitlab.com/gitlab-org/gitlab/-/raw/master/LICENSE

