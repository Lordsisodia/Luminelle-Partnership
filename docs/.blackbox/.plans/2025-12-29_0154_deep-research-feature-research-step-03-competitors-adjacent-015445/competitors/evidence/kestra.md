# Evidence Extract — Kestra

- slug: `kestra`
- category: workflow orchestration (OSS + enterprise)
- license: Apache-2.0 (verify from repo LICENSE)

## Tranche 2 — Evidence-backed primitives (OSS orchestration UI + executions + approvals)

### Notable features (3)

1) Documented web UI (first-class admin surface)  
Evidence: https://kestra.io/docs/ui

2) Executions as a first-class UI surface (run history)  
Evidence: https://kestra.io/docs/ui/executions

3) “Manual approval processes” called out as a dedicated use case  
Evidence: https://kestra.io/docs/use-cases/approval-processes

### Copyable workflows (2)

1) Operate: inspect execution history → drill into run details → debug failures  
Evidence: https://kestra.io/docs/ui/executions

2) Human-in-the-loop: pause a workflow pending approval → continue/deny  
Evidence: https://kestra.io/docs/use-cases/approval-processes

### 3 steal ideas (easy / medium / hard)

- Easy: unify run history UX into a consistent “Executions” view (filters, drilldowns, timelines).
- Medium: add an “approval gate” step type for high-risk actions; show pending approvals as a queue.
- Hard: adopt a full orchestration runtime and plugin ecosystem (bigger architectural commitment).

### Thin-slice implementation (1–3 days)

- Day 1: add “Executions” table for admin background jobs/automations (status, started/ended, input/output preview).
- Day 2: add “Approval gate” step type for automations (approve/deny + comment).
- Day 3: add “Execution detail” view with structured tabs (inputs, outputs, logs, timeline) inspired by orchestration UIs.

## License evidence

- Repo license text indicates Apache License 2.0: https://raw.githubusercontent.com/kestra-io/kestra/develop/LICENSE

