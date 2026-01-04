# Platform Events Catalog (v0.1, tenant-scoped)

Purpose:
- Establish a stable “event currency” for the platform so:
  - workflow automation triggers are provider-agnostic
  - audit logging can reference consistent action/resource names
  - analytics can use consistent event names
  - future UIs can be swapped without changing event semantics

Evidence rule:
- “Current repo state” claims cite snapshots/reports under this plan folder.
- Research claims cite the feature research snapshot excerpt.

Research evidence:
- Workflow hooks + run log are explicitly recommended, which implies a stable trigger vocabulary.  
  - `artifacts/snapshots/feature-research-summary.head220.txt`

Repo evidence anchors:
- Shopify webhooks exist server-side (translation point exists):  
  - `artifacts/snapshots/functions-_lib-shopifyWebhooks.ts.head160.txt`
- `/api/*` is the stable boundary where events should be emitted/translated:  
  - `artifacts/snapshots/functions-api-handlers.clean.rg.txt`

Related specs:
- Workflow automation: `workflow-automation-hooks-design-v0.1.md`
- Audit log: `audit-log-design-v0.1.md`
- Admin usage analytics: `admin-usage-analytics-design-v0.1.md`

---

## 0) Invariants

- Every event includes `tenant_id` (resolved host-first).
  - Tenancy rules: `tenancy-context-rules.md`
- Vendor-specific events (e.g., Shopify webhook types) are never the public event names.
- Event payloads only contain allowlisted, non-sensitive data.

---

## 1) Event envelope (recommended)

Fields:
- `event_id` (uuid or ULID)
- `tenant_id` (uuid)
- `occurred_at` (ISO timestamp)
- `event_name` (string)
- `source` (string; e.g. `api`, `webhook`, `system`)
- `actor` (optional)
  - `user_id` (auth provider id) or `system`
  - `role` (optional)
- `payload` (json object; allowlisted)
- `request_id` (string; correlation id when applicable)

DTO conventions:
- `dto-and-capabilities-spec-v0.1.md`

---

## 2) Core event names (v0.1)

### 2.1 Commerce events

- `commerce.order.created`
- `commerce.order.updated`
- `commerce.order.refunded`
- `commerce.customer.created`
- `commerce.cart.updated` (optional; high-volume, use sparingly)

### 2.2 Content/CMS events

- `content.sections.updated`
- `content.sections.published`
- `content.sections.unpublished`

### 2.3 AuthZ events

- `authz.denied`
- `authz.role.changed`

### 2.4 Flags events

- `flags.changed`

### 2.5 Workflow automation events

- `automation.workflow.enabled`
- `automation.workflow.disabled`
- `automation.run.created`
- `automation.run.approved`
- `automation.run.denied`
- `automation.run.completed`

### 2.6 Analytics events (admin UI)

- `analytics.admin.track` (raw ingest event name)

---

## 3) Translation rules (vendor → platform)

Rule:
- Webhook handlers map vendor webhook types to platform events.
- Mapping lives server-side in `functions/api/**` or `functions/_lib/**` helper modules.

Evidence that webhook handling helpers exist:
- `artifacts/snapshots/functions-_lib-shopifyWebhooks.ts.head160.txt`

---

## 4) Where events are produced

Preferred sources:
- `/api/*` endpoints:
  - easiest place to attach tenant context and requestId
  - easiest place to enforce auth tiers and audit requirements

Evidence that `/api/*` exists and is inventoried:
- `artifacts/snapshots/functions-api-files.clean.find.txt`

---

## 5) Acceptance checks (implementation phase)

- Every emitted event has tenant_id.
- Automation triggers refer only to platform event names.
- Audit log and analytics align to this vocabulary (no divergent naming).

