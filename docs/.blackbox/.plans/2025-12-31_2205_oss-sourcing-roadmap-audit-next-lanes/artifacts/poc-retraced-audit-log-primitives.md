# POC notes — Retraced audit logs + embeddable UI primitives

Repo: `retracedhq/retraced` (Apache-2.0)

Goal (2 days): validate Retraced as an **audit log sink + viewer** for Lumelle ops actions (refund approvals, overrides, workflow runs), and extract:
- minimal event schema (actor/action/target + metadata)
- ingestion API contract + auth mechanism
- viewer token flow for embedding into admin surfaces
- query/filter patterns (GraphQL endpoints)
- deployment posture (docker-compose / helm)

Guardrails:
- Retraced is an *audit log system*, not the unified customer timeline. We may still build timeline aggregation separately.
- Keep payloads PII-minimal; store identifiers and references.

---

## Concrete file pointers (API + implementation)

### API definition (source of truth)
- `swagger.json`
  - OpenAPI `servers[0].url` is `http://localhost:3000/auditlog`
  - Key publisher/admin/enterprise endpoints are defined here.

### Publisher ingestion + tokens (code)
- `src/controllers/PublisherController.ts`
  - `@Route(\"publisher/v1\")`
  - `POST project/{projectId}/event`
  - `POST project/{projectId}/event/bulk`
  - `GET project/{projectId}/viewertoken`
  - `POST project/{projectId}/graphql` (query events via GraphQL)

### Routing
- `src/routes.ts` + `src/router.ts` (wires `/publisher/v1/*`, `/admin/v1/*`, `/enterprise/v1/*`)

### Local/dev setup
- `docker-compose.yaml` (local services)
- `helm/` and `kustomize/` (k8s deploy options)

---

## Minimal event schema (what Lumelle should emit)

From `swagger.json` schema `CreateEventRequest`:
- required:
  - `action` (string, e.g. `returns.refund.approved`)
  - `crud` (`Create|Read|Update|Delete`)
- optional but high value:
  - `actor` (id, name, href, fields)
  - `target` (type, id, name, href, fields)
  - `group` (id, name) — useful for “shop/team/workspace”
  - `description` (human-readable)
  - `created` (ISO8601 timestamp of occurrence)
  - `source_ip`
  - `fields` (arbitrary event fields)
  - `metadata` (arbitrary metadata)
  - `is_failure` (bool)
  - `is_anonymous` (bool; required if `actor` absent)

Lumelle mapping recommendation:
- `action`: stable, namespaced string (e.g. `workflow.run.started`, `returns.refund.denied`)
- `crud`: treat as compliance-friendly dimension, not business logic
- `actor.id`: our internal user id
- `group.id`: tenant/shop id
- `target.type/id`: order/return/customer/workflow_run ids
- `metadata`: policy version, decision reason, idempotency key, trace id

---

## Ingestion + viewer flows (contracts)

### 1) Ingest one event

Endpoint:
- `POST /publisher/v1/project/{projectId}/event` (base URL includes `/auditlog`)

Auth:
- README shows `Authorization: token=<...>` header for publisher calls.

### 2) Ingest bulk events
- `POST /publisher/v1/project/{projectId}/event/bulk`

### 3) Create viewer token (embed UI)
- `GET /publisher/v1/project/{projectId}/viewertoken`
  - requires at least one of `group_id` or `team_id` (per OpenAPI description)
  - returns `ViewerToken { token }`

### 4) Query events
- `POST /publisher/v1/project/{projectId}/graphql`
- `POST /enterprise/v1/graphql` (enterprise scope)

---

## Deployment posture (what to validate in POC)

Local:
- `docker-compose up -d` (from README)

Kubernetes:
- `helm/` charts and `kustomize/` configs exist; verify:
  - storage/backups assumptions
  - search backend (Elasticsearch/OpenSearch) configuration

---

## POC plan (2 days)

Day 1:
- Run Retraced locally with docker-compose.
- Define an internal “audit event envelope” for 3 Lumelle actions:
  - `returns.refund.approved`
  - `returns.refund.denied`
  - `workflow.run.completed`
- Emit 20 sample events (including failures) and confirm they appear and are filterable by:
  - order id / return id
  - actor id
  - action

Day 2:
- Validate viewer token flow and define the embedding boundary:
  - how we will scope a viewer to tenant/shop/group
  - how we will deep-link to an order/customer view
- Produce an “audit log integration checklist”:
  - schema conventions
  - PII rules
  - retention/cleanup
  - export strategy

---

## Risks + mitigations

- Risk: operational overhead (search backend, storage, upgrades).
  - Mitigation: POC should explicitly timebox deployment complexity; decide quickly if this is acceptable.
- Risk: data volume + PII.
  - Mitigation: identifiers only; sanitize metadata; keep raw PII out of payload.
- Risk: split-brain with our internal timeline.
  - Mitigation: treat Retraced as immutable audit trail; timeline is a separate projection that can reference audit ids.

