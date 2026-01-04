# POC notes — OPA policy/approvals primitives (policy-as-code)

Repo: `open-policy-agent/opa` (Apache-2.0)

Goal (2 days): treat OPA as a **policy decision point** for Lumelle workflows (refund approval, exchange eligibility, store credit caps), and extract:
- the minimum “decision API” contract we should standardize (`input` → `allow/deny` + `reason` + `metadata`)
- how to manage policy distribution (bundles)
- how to record decisions (decision logs) for auditability
- how to test policies (unit tests + coverage)

Guardrails:
- We are not adopting OPA “everywhere”. We use it for a small set of **explicit approval/policy checks**.
- Never call OPA synchronously from storefront paths; keep it in ops/workflow paths.

---

## Concrete file pointers (docs + API surface)

### Decision API (evaluate policies)
- `docs/docs/rest-api.md`
  - Data API:
    - `GET /v1/data/{path:.+}`
    - `POST /v1/data/{path:.+}` (evaluate with input)
  - Policy API (manage modules):
    - `GET /v1/policies`
    - `GET /v1/policies/<id>`
    - `PUT /v1/policies/<id>`
    - `DELETE /v1/policies/<id>`
  - Compile API (partial eval for filters):
    - `POST /v1/compile`

### Decision logs (audit “why”)
- `docs/docs/management-decision-logs.md`
  - Decision logs can be reported to:
    - remote HTTP service endpoint
    - console
    - custom plugins
  - Includes guidance on routing logs to endpoints and configuring which headers/context are captured.

### Policy distribution (bundles)
- `docs/docs/management-bundles/index.md`
  - Snapshot vs delta bundles
  - ETag / `If-None-Match` behavior for caching/polling
  - Bundle scoping via `.manifest` roots

### Policy testing (unit tests + coverage)
- `docs/docs/policy-testing.md`
  - `opa test` supports:
    - running suites
    - `--fail-on-empty` guard
    - coverage reporting (`--coverage --format=json`)

---

## Minimal Lumelle policy contract (what we should standardize)

### 1) Decision endpoint (OPA)

We should define one stable policy path per “ops action”, e.g.:
- `POST /v1/data/lumelle/returns/refund/allow`
- `POST /v1/data/lumelle/returns/exchange/allow`
- `POST /v1/data/lumelle/store_credit/issue/allow`

### 2) Input schema (example: refund approval)

Conceptual payload (what our workflow passes to OPA):
```json
{
  "tenant_id": "shop_123",
  "actor": { "id": "user_456", "role": "ops_agent" },
  "order": { "id": "order_789", "value": 120.50, "currency": "USD" },
  "refund": { "amount": 35.00, "reason": "damaged", "method": "original_payment" },
  "risk": { "flags": ["repeat_refunder"], "score": 0.72 },
  "timestamp": "2025-12-31T23:00:00Z"
}
```

### 3) Output schema (what Lumelle expects)

We should normalize OPA output into:
- `allow: boolean`
- `reason: string` (human-readable)
- `policy_version: string` (bundle revision or policy hash)
- `explanations?: string[]` (optional)

OPA can return rich documents; we should keep our runtime surface stable.

---

## Decision logs → Audit log integration (why this matters)

We want every “allow/deny” to be traceable in:
- our audit log UI (e.g., Retraced)
- our order/customer timeline

Strategy:
- enable OPA decision logs to an HTTP receiver we control (or a log pipeline)
- log `input` (minimized / PII-safe), the decision, and the policy version
- store the linkable ids (`order_id`, `customer_id`, `return_id`)

---

## POC plan (2 days)

Day 1:
- Write 2–3 small Rego rules:
  - allow refunds under threshold for low risk
  - require manager approval over threshold or when risk flags present
- Build a “policy decision call” wrapper in our workflow runtime:
  - input JSON → OPA decision → normalized response
- Add policy tests + coverage output (`opa test --coverage`)

Day 2:
- Configure bundles (even locally) so policies are versioned and reloadable without app deploy.
- Turn on decision logs and validate we can ship them to an HTTP receiver.
- Produce the “policy checklist” we’ll use for every new ops action:
  - input schema, tests, decision log fields, failure mode behavior

---

## Risks + mitigations

- Risk: policy complexity becomes untestable.
  - Mitigation: small rules, golden JSON test cases, require coverage threshold.
- Risk: latency in synchronous paths.
  - Mitigation: only use in workflow/ops actions; cache where safe.
- Risk: leaking PII into decision logs.
  - Mitigation: sanitize inputs; configure decision logs to mask/limit context.

