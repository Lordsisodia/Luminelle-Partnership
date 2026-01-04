# Evidence Extract — Jira Service Management (approval stages + external approvers)

- slug: `jira-service-management-approval-stage`
- category: workflow stages + approvals UX (including customer approvers without agent license)
- license: SaaS / proprietary

## Cycle 8 — Evidence-backed primitives (approval stage + “external approver” model)

### Notable features (3)

1) Approvals are modeled as a workflow “approval stage” (work item cannot progress until approved/declined)  
Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/

2) “Approver doesn’t need a JSM license” (approvers can be customers of the service space)  
Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/

3) Approvals are described as a reusable workflow mechanism (inserted into workflows for gating)  
Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/

### Copyable workflows (2)

1) External approval workflow: internal operator submits request → request enters approval stage → external/customer approver approves/declines → request progresses  
Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/

2) “Gate before next status” workflow: insert approval stage anywhere → stage blocks progression → downstream work only starts after decision  
Evidence: https://support.atlassian.com/jira-service-management-cloud/docs/set-up-an-approval-stage-for-a-request/

### 3 steal ideas (easy / medium / hard)

- Easy: allow “approver seats” that are not full admin users (e.g., finance approver, store manager approver) with minimal access.
- Medium: model approvals as explicit workflow stages with status transitions (Pending → Approved/Declined) and stage-level SLAs.
- Hard: multi-stage workflows with dynamic approver sets and conditional branching.

### Thin-slice implementation (1–3 days)

- Day 1: add an “approver role” (limited UI) + allow assigning as approver without full admin privileges.
- Day 2: implement approval stage states in a workflow: block progression until decision; show stage in UI timeline.
- Day 3: add approval decision links + minimal approval portal view (email → view → approve/decline) + audit event emission.

