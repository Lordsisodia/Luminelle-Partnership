# Evidence Extract — OPA (HTTP API authorization)

- slug: `opa-http-api-authorization`
- category: API-edge policy enforcement pattern (allow/deny policies + inputs + optional JWT transport)
- license: Apache-2.0 (OPA OSS)

## Cycle 12 — Evidence-backed primitives (API authorization tutorial patterns)

### Notable features (3)

1) OPA positions itself as a way to implement fine-grained, context-aware API authorization for HTTP APIs  
Evidence: https://openpolicyagent.org/docs/latest/http-api-authorization/

2) Tutorial-style workflow: write allow/deny policies, run OPA server, and have API server ask OPA for decisions  
Evidence: https://openpolicyagent.org/docs/latest/http-api-authorization/

3) Optional JWT transport pattern (communicate policy data via JSON Web Tokens)  
Evidence: https://openpolicyagent.org/docs/latest/http-api-authorization/

### Copyable workflows (2)

1) Sidecar decision workflow: API receives request → sends structured input to OPA → receives allow/deny decision → enforces at API layer  
Evidence: https://openpolicyagent.org/docs/latest/http-api-authorization/

2) Policy update workflow: change policy bundle → re-run checks → confirm new policy works  
Evidence: https://openpolicyagent.org/docs/latest/http-api-authorization/

### 3 steal ideas (easy / medium / hard)

- Easy: treat “policy decision endpoint” as a stable internal contract (`input` → `decision + reason`) for protected actions.
- Medium: allow passing compact auth context via JWT for cross-service decisions (careful with privacy/PII).
- Hard: unify with audit export pipeline so every decision produces an immutable, exportable event.

### Thin-slice implementation (1–3 days)

- Day 1: build a decision endpoint + policy stub for 1 high-risk action.
- Day 2: integrate decision check into the action execution path and block/queue for approval when denied.
- Day 3: emit decision audit events with reasons and policy versions.

## License evidence

- Apache-2.0 (OPA): https://raw.githubusercontent.com/open-policy-agent/opa/main/LICENSE

