# OSS Platform Primitives Map (optional accelerators for modular domains)

Purpose:
- Connect the **platform expansion domains** in this plan (authz/audit/flags/automation) to concrete OSS “primitives” already tracked in the repo’s OSS catalog.
- Keep this optional: the core backend/frontend swap boundary does *not* require adopting any OSS.

Evidence rule:
- Any claim about “what the OSS catalog says” must cite a local snapshot under:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

Source inputs (snapshotted excerpts from `docs/.blackbox/oss-catalog/shortlist.md`):
- Policy/auth primitives:
  - `artifacts/snapshots/oss-catalog-shortlist.policy.1-120.txt`
  - `artifacts/snapshots/oss-catalog-shortlist.policy.300-340.txt`
- Audit primitives:
  - `artifacts/snapshots/oss-catalog-shortlist.audit.45-105.txt`
- Workflow primitives:
  - `artifacts/snapshots/oss-catalog-shortlist.workflows.250-340.txt`
- Feature flags primitives:
  - `artifacts/snapshots/oss-catalog-shortlist.flags.1318-1345.txt`

Related architecture docs (this plan):
- Platform expansion domains: `architecture-expansion-from-research.md`
- Platform domain recipe: `platform-domain-template.md`
- Event vocabulary (for audit/workflow): `platform-events-catalog-v0.1.md`

---

## 0) How to interpret this doc (important)

- This is not “pick these repos now”.
- It’s a **menu** of build accelerators that match our modular domain shape:
  - `ports/` define the stable contract
  - `functions/api/**` exposes `/api/*` for any frontend
  - adapters/providers can be swapped later

---

## 1) `platform/authz` and “policy decisions” (approvals as code)

Primary candidate: **OPA** (policy engine)
- `open-policy-agent/opa` is tagged as `license=safe` in the OSS shortlist and explicitly framed as a “policy/approval decision point” POC.  
  Evidence: `artifacts/snapshots/oss-catalog-shortlist.policy.1-120.txt`

Secondary candidate: **Athenz** (service auth/policy control plane)
- `AthenZ/athenz` is tagged as `license=safe` and framed as “policy/auth service for service-to-service and ops authorization”.  
  Evidence: `artifacts/snapshots/oss-catalog-shortlist.policy.300-340.txt`

How this maps to our architecture:
- Domain shape:
  - `src/domains/platform/authz/ports/*` defines a `PolicyDecisionPort` (or similar).
  - `functions/api/admin/**` uses it for privileged actions (refund approvals, overrides, etc.).
- The UI should consume only **capabilities** (allowed actions) + decision reasons, never raw policy internals.

---

## 2) `platform/audit` (immutable audit stream + embeddable UI)

Primary candidate: **Retraced**
- `retracedhq/retraced` is tagged `license=safe` and described as an “audit log stream + embeddable UI” POC (search/filter by order/customer).  
  Evidence: `artifacts/snapshots/oss-catalog-shortlist.policy.1-120.txt`

Secondary candidate (library-level): **AuditTrailJS** (license bucket requires verification)
- `Mario-Coxe/audittrailjs` appears as an “audit primitive” but is marked `license=verify` in the shortlist snapshot.  
  Evidence: `artifacts/snapshots/oss-catalog-shortlist.workflows.250-340.txt`

How this maps to our architecture:
- Domain shape:
  - `src/domains/platform/audit/ports/*` defines `AuditPort.emit(event)` with a stable event schema.
  - `functions/api/**` emits audit events for every privileged action (admin writes, overrides, workflow runs).
- Event vocabulary source-of-truth:
  - `platform-events-catalog-v0.1.md`

---

## 3) `platform/automation` (workflow orchestration + run logs)

Candidate: **Kestra** (workflow orchestration)
- `kestra-io/kestra` is tagged `license=safe` and described as a “workflow orchestration primitive” for webhook-driven ops workflows with retries/visibility.  
  Evidence: `artifacts/snapshots/oss-catalog-shortlist.policy.300-340.txt`

Candidates: BPMN-style engines (process modeling)
- `Activiti/Activiti` is tagged `license=safe` and described as a BPM/workflow engine candidate.  
  Evidence: `artifacts/snapshots/oss-catalog-shortlist.workflows.250-340.txt`
- `paed01/bpmn-engine` is tagged `license=safe` and described as a BPMN 2.0 workflow engine candidate.  
  Evidence: `artifacts/snapshots/oss-catalog-shortlist.policy.300-340.txt`

How this maps to our architecture:
- Workflow engine is an **adapter** behind a `WorkflowPort`:
  - `src/domains/platform/automation/ports/*` defines trigger/action/run-log contracts.
  - Adapters can be `kestra`, `bpmn`, or “in-house” without changing the UI contract.

---

## 4) `platform/flags` (feature flags + experiments)

Candidate: **Featurevisor**
- `featurevisor/featurevisor` is tagged `license=safe` and described as “feature flags, experiments, and remote config”.  
  Evidence: `artifacts/snapshots/oss-catalog-shortlist.flags.1318-1345.txt`

How this maps to our architecture:
- Flags should be tenant-scoped and evaluated server-side by default:
  - `functions/api/**` returns allowlisted “public flags” for a tenant.
  - UI consumes flags as capabilities; it does not hardcode tenant/provider branching.

---

## 5) Practical adoption posture (recommended)

To avoid vendor lock-in *while adopting OSS*:
- Treat OSS components as adapters behind ports (same as Shopify/Stripe).
- Keep migration/exit paths explicit:
  - event export for audit
  - workflow run export for automation
  - flag state export for feature flags

