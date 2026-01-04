# Next actions (from Step-03 adjacent competitors) — build-ready backlog

## Immediate (this week)

- Define approval request object schema (status, outcomes, assigned approver(s), instructions, timestamps)
- Define inbox state machine (pending/snoozed/done) + bulk actions UX requirements
- Define SLA model (due_at, overdue, reminders) + escalation chain (fallback approver after timeout)
- Define audit event taxonomy for approvals (requested, reassigned, approved/declined, comments, resolved, escalated)

## 1–3 day thin slices (ship in order)

1) Approvals MVP (single action type)
   - Approve/deny + decision reason + audit event emission

2) Approval inbox
   - List view + filters + sort + per-item decision

3) Inbox productivity
   - Snooze presets + snoozed tab + bulk actions (mark done/snooze/restore)

4) SLA + escalation
   - due_at + overdue filters + reminder + fallback approver chain

5) Delegation + email approval portal
   - Reassign action + email deep link + completion update messaging (anti-stale)

6) Protected resources + step-up session
   - step-up prompt for sensitive actions + protected targets registry + required approver rule

7) Audit export sinks
   - sink config wizard + minimal pipeline (transform/redact + export)

## Integration/automation follow-ons (next)

- Integration control plane MVP (connection state + link flow + logs)
- Automation rules MVP (trigger → action, with run history + retries)

## Evidence pointers (for build justification)

- Inbox tabs/snooze/bulk: https://docs.gitlab.com/user/todos/
- Review outcomes + resolved threads: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews
- SLAs as timers: https://support.atlassian.com/jira-service-management-cloud/docs/what-are-slas/
- Escalation policies: https://support.pagerduty.com/main/docs/escalation-policies
- Reassign approvals + email approvals: https://learn.microsoft.com/en-us/power-automate/approvals-howto and https://learn.microsoft.com/en-us/power-automate/modern-approvals
- Deferred approvals + instructions/timeouts: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops
- Audit export pipeline mental model: https://opentelemetry.io/docs/collector/

