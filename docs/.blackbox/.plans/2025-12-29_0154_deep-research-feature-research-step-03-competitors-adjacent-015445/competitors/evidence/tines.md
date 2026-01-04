# Evidence Extract — Tines

- slug: `tines`
- category: workflow automation (SaaS; security-flavored) + case management
- license: proprietary (SaaS)

## Tranche 2 — Evidence-backed primitives (cases + tasks + run history + audit)

### Notable features (3)

1) Story runs (run history) as a first-class operational surface  
Evidence: https://www.tines.com/docs/stories/story-runs/

2) Cases as a first-class object (case-based work for the “unknown/edge” scenarios)  
Evidence: https://www.tines.com/docs/cases/overview/

3) Audit logs in admin  
Evidence: https://www.tines.com/docs/admin/audit-logs/

### Copyable workflows (2)

1) “Automation → case” escalation workflow  
- Automation detects event → create a case → attach context → assign tasks  
Evidence: https://www.tines.com/docs/cases/creating-a-case/  
Evidence: https://www.tines.com/docs/cases/tasks/

2) Operate automation via run history  
- Inspect story runs → filter failures → iterate fixes  
Evidence: https://www.tines.com/docs/stories/story-runs/

### 3 steal ideas (easy / medium / hard)

- Easy: embed “Runs” page (global + per-rule runs) that links to payloads, errors, and “re-run”.
- Medium: add “Cases” as an operational primitive for exceptions (human review queue) that automations can create.
- Hard: build a full “SOAR-style” ecosystem and template library breadth (Tines’ maturity).

### Thin-slice implementation (1–3 days)

- Day 1: add `cases` table + “Create case from event” button on any failed automation run.
- Day 2: add `case_tasks` with statuses (todo/in progress/done) and assignment to team members.
- Day 3: add “Audit log” stream for case/task/run changes (who/what/when) and link it to the case detail page.

