# Evidence Extract — PagerDuty

- slug: `pagerduty`
- category: incident response escalation (adjacent: escalation + notification patterns for approvals)
- license: SaaS / proprietary

## Cycle 7 — Evidence-backed primitives (escalation policies + timeouts)

### Notable features (3)

1) Escalation policies are composed of escalation rules that notify targets until an incident is acknowledged  
Evidence: https://support.pagerduty.com/main/docs/escalation-policies

2) Escalation timeout concept (“if not acknowledged within X, escalate”) is explicit and configurable  
Evidence: https://support.pagerduty.com/main/docs/escalation-policies

3) Multi-user notifications and schedule-aware escalation patterns exist (notify backups, different rules by time)  
Evidence: https://support.pagerduty.com/main/docs/escalation-policies

### Copyable workflows (2)

1) Escalate on inaction: create event → notify primary → if not acknowledged in timeout → notify backup → repeat/escalate  
Evidence: https://support.pagerduty.com/main/docs/escalation-policies

2) Configure escalation rules: define policy → add/edit rules → test incident routing behavior  
Evidence: https://support.pagerduty.com/main/docs/escalation-policies

### 3 steal ideas (easy / medium / hard)

- Easy: “approval escalation timeout” setting (if not decided by due_at, notify next approver).
- Medium: escalation policies reusable across approval types (refund approvals vs payouts vs integration disconnect).
- Hard: schedule/timezone-aware escalations with on-call rotations; start with simple fallback chain.

### Thin-slice implementation (1–3 days)

- Day 1: add reminder notifications for pending approvals (email + in-app).
- Day 2: add escalation chain (primary approver → backup approver) triggered by overdue state.
- Day 3: show “escalation history” in approval detail + audit events for notifications sent.

