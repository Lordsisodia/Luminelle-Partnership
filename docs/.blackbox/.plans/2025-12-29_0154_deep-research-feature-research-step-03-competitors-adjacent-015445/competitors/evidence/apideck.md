# Evidence Extract — Apideck

- slug: `apideck`
- category: embedded integrations / unified APIs + connection management (SaaS)
- license: proprietary (SaaS)

## Cycle 2 — Evidence-backed primitives (Vault / connections / token edge cases)

### Notable features (3)

1) “Vault” as an embedded authorization surface for customer connections (embedded UX patterns)  
Evidence: https://developers.apideck.com/guides/vault

2) Explicit “connection states” taxonomy (great for UI and automation guardrails)  
Evidence: https://developers.apideck.com/guides/connection-states

3) OAuth edge-case guidance (refresh token race condition) — indicates operational maturity  
Evidence: https://developers.apideck.com/guides/refresh-token-race-condition

### Copyable workflows (2)

1) “Connect an app” flow using an embedded portal or hosted flow  
- Vault guide (embedded approaches): https://developers.apideck.com/guides/vault  
- Authorization guide: https://developers.apideck.com/guides/authorize-connections

2) Operate connections reliably  
- Model connection states and block risky actions when disconnected: https://developers.apideck.com/guides/connection-states  
- Handle refresh token concurrency pitfalls: https://developers.apideck.com/guides/refresh-token-race-condition

### 3 steal ideas (easy / medium / hard)

- Easy: add a first-class “Connections” table with explicit state badges and recommended actions by state.
- Medium: embed a “Connect app” portal component so merchants can self-serve integrations without engineering.
- Hard: build an integration auth layer that handles OAuth refresh concurrency correctly across many connectors.

### Thin-slice implementation (1–3 days)

- Day 1: `connections` model + UI: list connections, state, last sync/run, “reconnect” CTA.
- Day 2: introduce connection state machine (connected/disconnected/expired/etc) and gate actions based on state.
- Day 3: add “token refresh lock” strategy + telemetry counters for refresh failures (avoid race-condition class bugs).

