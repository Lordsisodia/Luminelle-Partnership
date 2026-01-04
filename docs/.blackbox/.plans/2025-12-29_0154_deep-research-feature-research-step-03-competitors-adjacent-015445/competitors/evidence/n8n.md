# Evidence Extract — n8n

- slug: `n8n`
- category: workflow automation (self-hosted + cloud; connector/node ecosystem)
- license posture: Sustainable Use License (restrictive; treat as pattern reference, not drop-in OSS)  
  Evidence: https://raw.githubusercontent.com/n8n-io/n8n/master/LICENSE.md

## Notable features (3)

1) Executions are a first-class ops surface (all executions list + debugging tools)  
Evidence: https://docs.n8n.io/workflows/executions/all-executions/  
Evidence: https://docs.n8n.io/workflows/executions/debug/

2) Error handling is a first-class workflow design topic (flow logic patterns for failures)  
Evidence: https://docs.n8n.io/flow-logic/error-handling/

3) RBAC + projects exist as admin primitives for scoping ownership/access  
Evidence: https://docs.n8n.io/user-management/rbac/  
Evidence: https://docs.n8n.io/user-management/rbac/projects/

## Copyable workflows (2)

1) Build → test → operate loop
- Create workflow → run a manual execution → observe outputs → deploy/enable → review executions in “All executions”  
Evidence: https://docs.n8n.io/workflows/executions/manual-partial-and-production-executions/  
Evidence: https://docs.n8n.io/workflows/executions/all-executions/

2) Failure loop with explicit debugging
- When a run fails, use “Debug executions” to inspect what happened and iterate the workflow design (error-handling patterns)  
Evidence: https://docs.n8n.io/workflows/executions/debug/  
Evidence: https://docs.n8n.io/flow-logic/error-handling/

## 3 steal ideas (easy / medium / hard)

- Easy: “All executions” list view for automations with filters and per-run inspection (make ops visible by default).  
- Medium: RBAC + projects for automation ownership (team scoping + least privilege) and a clear mental model for “who owns this workflow?”  
- Hard: large connector/node catalog and compatibility management across versions.

## Thin-slice implementation (1–3 days)

- Day 1: add an `automation_runs` table + “All runs” page (filters by status, trigger, actor, time).
- Day 2: add “run detail” view: inputs, step outputs, error stack, and “re-run with same inputs”.
- Day 3: add project scoping for automation rules + basic roles (viewer/editor/admin) and show ownership clearly in UI.

