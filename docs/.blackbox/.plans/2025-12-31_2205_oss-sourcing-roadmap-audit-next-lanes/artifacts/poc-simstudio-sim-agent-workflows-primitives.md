# POC Evidence: `simstudioai/sim` — agent workflow studio + execution engine primitives

Repo: `simstudioai/sim`  
URL: https://github.com/simstudioai/sim  
License: Apache-2.0 (safe)  
Primary language: TypeScript  
Relevance tags: `workflows`, `support`, `webhooks`, `automation`, `observability`

## Why this matters for Lumelle
SIM is a concrete, modern example of:
- a **visual workflow builder** (graph canvas + blocks/tools/triggers registry)
- an **execution engine** that runs workflows as a DAG with **loops + parallel branches**
- **execution logs + snapshots + pause/resume** primitives (useful for approvals, human-in-the-loop, and “support timeline” style orchestration)

Even if we never “embed SIM”, the repo is a high-signal reference implementation for how to structure:
- workflow graphs + serialization
- block/tool registries
- execution logging/audit trail
- pause/resume and state snapshots

## Repo snapshot (things to note)
High-signal readme claims and infra:
- Self-host paths include `npx simstudio` + Docker Compose (`docker-compose.prod.yml`) + manual setup.
- Data layer expects Postgres + `pgvector`.
- Dev uses Bun + a separate realtime socket server (“dev:full” mentions main app + socket server).

Pointers:
- Root `README.md` (setup + deployment options)
- `docker-compose.prod.yml`, `docker-compose.ollama.yml`, `helm/` (deployment options)
- `apps/sim/trigger.config.ts` (uses Trigger.dev for background jobs)

## The primitives we should mine (with file pointers)

### 1) Workflow serialization schema (portable workflow format)
SIM’s serialized workflow format is clear and small: blocks + connections + loops + parallels.

Pointers:
- `apps/sim/serializer/types.ts`
  - `SerializedWorkflow { version, blocks, connections, loops, parallels? }`
  - `SerializedConnection` supports `condition` blocks (if/else/else-if) as JS expression strings
  - loop + parallel configs are explicit (`loopType`, `parallelType`, `distribution`)
- UI/editor workflow types:
  - `apps/sim/stores/workflows/workflow/types.ts` (Loop/Parallel/WorkflowState types, ReactFlow edges)

### 2) DAG build + orchestration model (runtime semantics)
SIM builds a DAG, expands loops/parallels using sentinel nodes, then schedules execution.

Pointers:
- DAG build:
  - `apps/sim/executor/dag/builder.ts` (Path/Loop/Parallel/Node/Edge constructors; sentinel validation)
  - `apps/sim/executor/dag/construction/*` (where loop/parallel/edge/node construction is implemented)
- Execution scheduling:
  - `apps/sim/executor/execution/engine.ts` (ready queue, concurrency, cancellation checks, paused result)
  - `apps/sim/executor/orchestrators/node.ts` (node execution, loop/parallel sentinel logic)
- Execution model + logs + pause/resume payload:
  - `apps/sim/executor/types.ts` (`ExecutionContext`, `BlockLog`, `PausePoint`, `ExecutionMetadata`)

### 3) Execution logs + snapshots (audit trail building blocks)
SIM persists snapshots and execution logs; this is directly relevant to Lumelle’s:
- support timeline
- audit logs
- “workflow run history” UX

Pointers:
- DB schema (Drizzle):
  - `packages/db/schema.ts`
    - `workflow`, `workflow_blocks`, `workflow_edges`, `workflow_subflows`
    - `workflow_execution_snapshots` (`stateHash`, `stateData`)
    - `workflow_execution_logs` (`trigger`, `status`, `executionData`, `cost`, timestamps)
    - `paused_executions` (pause points + snapshots)
- Snapshot tooling:
  - `apps/sim/executor/execution/snapshot.ts`
  - `apps/sim/executor/execution/snapshot-serializer.ts`

### 4) Trigger/tool registry pattern (integration surface)
SIM has an explicit registry for:
- triggers (webhook/pollers for many SaaS + Stripe)
- tools (action APIs, including Shopify)
- blocks (canvas node types)

Pointers:
- Trigger registry:
  - `apps/sim/triggers/registry.ts` (maps `stripe_webhook`, `generic_webhook`, etc → trigger impl)
- Tools registry:
  - `apps/sim/tools/registry.ts` (large; includes `shopify`, `stripe`, `zendesk`, etc)
- Blocks registry:
  - `apps/sim/blocks/registry.ts` (canvas blocks; includes `webhook`, `generic_webhook`, `shopify`, `stripe`, `human_in_the_loop`)

### 5) Realtime execution updates (admin UX)
If we want “live run” views, SIM’s separate socket service is a reference.

Pointers:
- `apps/sim/socket/*` (server + rooms + handlers)

## Lumelle POC framing (2 days, evidence-driven)
Goal: decide whether SIM is:
1) a **reference** we mine for patterns (most likely), or
2) an **embedded workflow subsystem** (higher risk).

### POC scenario: “Support timeline workflow”
Workflow:
1) Webhook ingest (Shopify or generic webhook)
2) Enrich (call internal APIs)
3) Emit timeline event (our canonical “support timeline” log)
4) Optionally pause for human review (approval node)

Concrete touchpoints if we ever integrate:
- Inbound: Lumelle webhook inbox → “trigger” event → workflow run
- Actions: internal Admin API calls (create timeline events, tag customer, open ticket, issue store credit)
- Outbound: audit log event emission (Retraced candidate) + metrics/logs

## Risks / tradeoffs
- **Security:** workflow engines often drift into “arbitrary code execution” via function nodes / scripting.
  - Mitigation: sandbox / disallow script blocks; strict allowlist of tools; isolate runtime.
- **Operational complexity:** a full workflow studio adds DB + realtime + job runner + secrets surface.
  - Mitigation: treat as reference first; only integrate if it replaces a real pain.
- **Maturity risk:** repo is new (2025) and iterating quickly.
  - Mitigation: timebox to 2 days; decide quickly; avoid deep coupling.

## Decision checkpoints (what “good” looks like)
We should keep SIM “in play” if, within the timebox, we can confirm:
- The workflow schema + DAG execution semantics are understandable and portable.
- Execution logs/snapshots produce an audit trail we could replicate.
- The trigger/tool registry pattern maps cleanly to our domain actions (Shopify/webhooks/returns/support).

If not, keep it as a reference-only repo and stop spending time here.

