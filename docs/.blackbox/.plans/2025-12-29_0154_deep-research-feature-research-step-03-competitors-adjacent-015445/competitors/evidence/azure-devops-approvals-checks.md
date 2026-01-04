# Evidence Extract — Azure DevOps (Approvals and checks)

- slug: `azure-devops-approvals-checks`
- category: workflow gating / deployment approvals + checks (adjacent: approval deferral + timeout semantics)
- license: SaaS / proprietary (docs are public)

## Cycle 9 — Evidence-backed primitives (deferral + instructions + timeout)

### Notable features (3)

1) Approvals can include approvers (users/groups), instructions, self-approval restriction, and timeouts  
Evidence: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops

2) Deferred approvals: approve now but set a time when the approval becomes effective  
Evidence: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops

3) Timeout behavior is explicit: if approvals/checks don’t complete in time, the stage is skipped/failed depending on check type  
Evidence: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops

### Copyable workflows (2)

1) Production gate: stage waits for manual approval → approver reviews instructions → approve/reject → stage proceeds or stops  
Evidence: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops

2) “Approved now, run later” workflow: approval granted → defer approval until a low-traffic window → stage becomes eligible at set time  
Evidence: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops

### 3 steal ideas (easy / medium / hard)

- Easy: allow requesters to attach “instructions for approvers” (checklist + links + rationale) on any approval request.
- Medium: add “defer approval until” as a first-class control for launches/refunds/payout changes (approve now, execute at set time).
- Hard: unify multiple checks with distinct evaluation cycles/timeouts (approvals + business hours + external checks) into one coherent UX.

### Thin-slice implementation (1–3 days)

- Day 1: approval request supports `instructions` + `timeout_at` + `approve/reject`.
- Day 2: add `deferred_until` (approve now; effective later) + show as “pre-approved; effective at …”.
- Day 3: add timeout handling semantics (auto-expire approvals; notify requester; allow retry/re-request).

