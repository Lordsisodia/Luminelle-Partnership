# Evidence Extract — Camunda (Platform 7)

- slug: `camunda`
- category: BPM/workflow engine + operations webapps
- license: Apache-2.0 (for `camunda-bpm-platform` repo; verify per product line if mixing versions)

## Tranche 2 — Evidence-backed primitives (human tasks + operations cockpit)

### Notable features (3)

1) Tasklist webapp for human tasks (approvals/work queue primitive)  
Evidence: https://docs.camunda.org/manual/latest/user-guide/tasklist/

2) Cockpit webapp for monitoring/operations of running processes  
Evidence: https://docs.camunda.org/manual/latest/webapps/cockpit/

3) Apache 2.0 OSS license for the Camunda 7 platform repo  
Evidence: https://raw.githubusercontent.com/camunda/camunda-bpm-platform/master/LICENSE

### Copyable workflows (2)

1) Human approval workflow  
- Automation creates a human task → reviewer completes/denies → process continues  
Evidence: https://docs.camunda.org/manual/latest/user-guide/tasklist/

2) Ops workflow for long-running processes  
- Operators inspect running instances + incidents via a cockpit/operations UI  
Evidence: https://docs.camunda.org/manual/latest/webapps/cockpit/

### 3 steal ideas (easy / medium / hard)

- Easy: implement “Tasklist” patterns for approvals (queue view + task detail + completion actions).
- Medium: implement “process run” visibility view (instances, state, incidents) for admin automations and background jobs.
- Hard: BPMN/workflow engine adoption (bigger conceptual/modeling commitment).

### Thin-slice implementation (1–3 days)

- Day 1: ship an “Approvals inbox” (task list) for 1–2 high-risk admin actions (refund, price change).
- Day 2: add a task detail view with required fields, comments, and audit trail entry on completion.
- Day 3: add “Automation instance” detail view for long-running ops (status + events timeline + incident reason).

