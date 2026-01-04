# Evidence Extract — Workato

- slug: `workato`
- category: workflow automation / iPaaS (SaaS)
- license: proprietary (SaaS)

## Tranche 2 — Evidence-backed primitives (iPaaS / operations hub)

### Notable features (3)

1) Environment separation (dev/test/prod) for automation lifecycle (“Environments”)  
Evidence: https://docs.workato.com/en/recipes/managing-recipes.html

2) Operations hub dashboard (monitoring recipes + connections with “actions so you can discover and resolve issues faster”)  
Evidence: https://docs.workato.com/en/recipes/managing-recipes.html  
Evidence: https://docs.workato.com/en/features/admin-dashboard.html

3) Activity audit log (track changes across account, connections, recipes, etc.)  
Evidence: https://docs.workato.com/en/recipes/managing-recipes.html  
Evidence: https://docs.workato.com/en/features/activity-audit-log.html

### Copyable workflows (2)

1) Safe release workflow for automation changes  
- Develop → test → deploy between environments  
Evidence: https://docs.workato.com/en/recipes/managing-recipes.html

2) Ops workflow for automation reliability  
- Monitor operations hub → investigate connection/recipe issues → fix fast  
Evidence: https://docs.workato.com/en/features/admin-dashboard.html

### 3 steal ideas (easy / medium / hard)

- Easy: “Operations hub” landing page that shows automation health + quick actions (retry, disable, notify).
- Medium: “Environments” for admin changes and automations (draft/test/prod) + promotion workflow.
- Hard: full iPaaS connector ecosystem + enterprise SLAs (Workato’s moat).

### Thin-slice implementation (1–3 days)

- Day 1: add `automation_environments` concept (e.g., `draft`, `staging`, `prod`) and show environment badge on rules.
- Day 2: add “Ops hub” page: failed runs, unhealthy connections, last run time, top error reasons.
- Day 3: add activity audit log for admin + automation changes (who/what/when) with export.

