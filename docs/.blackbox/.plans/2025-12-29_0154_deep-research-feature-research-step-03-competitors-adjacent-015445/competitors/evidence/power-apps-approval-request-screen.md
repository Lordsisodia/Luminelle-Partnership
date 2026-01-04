# Evidence Extract — Power Apps (Approval request screen template)

- slug: `power-apps-approval-request-screen`
- category: approval portal UI building blocks (approval stages timeline)
- license: SaaS / proprietary

## Cycle 9 — Evidence-backed primitives (approval stages UI)

### Notable features (3)

1) “Approval request screen” is a first-class screen template (UI pattern ready to reuse)  
Evidence: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables

2) Approval stages are modeled as a list (reviewers gallery) with stage/approver metadata (name/title/status)  
Evidence: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables

3) Explicitly designed to pair with Power Automate approval workflows (UI + workflow split)  
Evidence: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables and https://learn.microsoft.com/en-us/power-automate/modern-approvals

### Copyable workflows (2)

1) Approval portal workflow: user opens approval request screen → sees approval stages + current approver → takes action → timeline updates  
Evidence: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables

2) Multi-stage approval workflow: approval request has multiple stages → UI renders stages sequentially/visibly → audit trail preserved  
Evidence: approval stages template: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/add-screen-context-variables

### 3 steal ideas (easy / medium / hard)

- Easy: show an “approval stages timeline” on every approval request (who’s up next, who already approved, timestamps).
- Medium: separate “approval portal UI” (minimal surface) from “full admin UI” (full permissions), using the same underlying approval primitive.
- Hard: configurable stage templates (finance approval → manager approval → security approval) with per-stage SLAs and delegation.

### Thin-slice implementation (1–3 days)

- Day 1: build an approval request detail page with a “stages timeline” component.
- Day 2: add stage statuses + timestamps + “current approver” highlight.
- Day 3: allow external/limited approvers to access the page via signed link (scope-limited) + full audit events.

