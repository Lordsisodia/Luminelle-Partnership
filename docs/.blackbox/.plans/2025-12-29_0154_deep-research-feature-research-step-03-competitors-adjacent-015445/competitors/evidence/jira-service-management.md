# Evidence Extract — Jira Service Management

- slug: `jira-service-management`
- category: approvals + SLAs (adjacent: approval inbox, timers, escalation primitives)
- license: SaaS / proprietary

## Cycle 7 — Evidence-backed primitives (approval steps + SLAs)

### Notable features (3)

1) Approval steps can be inserted into workflows; approvers can be individuals, groups, request type-based, or CAB-related  
Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-approvals/

2) SLAs act as configurable goals/timers for request handling (start/pause/stop conditions, calendars)  
Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/what-are-slas/

3) Approval step UX is explicitly “status-driven”: work item moves to an approval stage before progressing  
Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-approvals/

### Copyable workflows (2)

1) Request approval flow: requester submits → item enters approval status → approvers review → approve/deny → item progresses  
Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-approvals/

2) SLA-driven prioritization: define SLA goals → agents see countdown/timeframes → work is prioritized to avoid breaches  
Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/what-are-slas/

### 3 steal ideas (easy / medium / hard)

- Easy: show approval requests with explicit states (pending/approved/declined) and a clear “who is next approver” field.
- Medium: add SLA timers to approvals (due_at + overdue states) and show breach risk in list views.
- Hard: full ITSM change/CAB modeling; start with “approver groups” and basic approval stages.

### Thin-slice implementation (1–3 days)

- Day 1: approvals primitive (request → approve/deny) + approval inbox page.
- Day 2: SLA/timer fields (requested_at, due_at, overdue) + list filters for “overdue approvals”.
- Day 3: reminders/escalation rule (notify backup approver when overdue) + audit events for each decision.

