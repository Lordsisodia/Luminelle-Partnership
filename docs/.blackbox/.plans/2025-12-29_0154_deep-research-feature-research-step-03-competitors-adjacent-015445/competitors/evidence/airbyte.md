# Evidence Extract — Airbyte

- slug: `airbyte`
- category: connectors + connection wizard + job history (OSS, but with license constraints)
- license: Elastic License 2.0 (ELv2) — restrictive (not permissive)

## Cycle 2 — Evidence-backed primitives (connection setup + connection timeline + jobs model)

### Notable features (3)

1) “Set up a connection” as an explicit step-by-step workflow (wizard mental model)  
Evidence: https://docs.airbyte.com/platform/using-airbyte/getting-started/set-up-a-connection

2) Connection timeline/history as a first-class operational surface (observability for integrations)  
Evidence: https://docs.airbyte.com/platform/cloud/managing-airbyte-cloud/review-connection-timeline

3) Jobs model documented (run types + job history mental model)  
Evidence: https://docs.airbyte.com/platform/understanding-airbyte/jobs

### Copyable workflows (2)

1) Create an integration via connection wizard  
- Configure a connection end-to-end: https://docs.airbyte.com/platform/using-airbyte/getting-started/set-up-a-connection

2) Operate integrations  
- Review connection timeline (history/debug): https://docs.airbyte.com/platform/cloud/managing-airbyte-cloud/review-connection-timeline  
- Understand job types and failures: https://docs.airbyte.com/platform/understanding-airbyte/jobs

### 3 steal ideas (easy / medium / hard)

- Easy: “Set up a connection” wizard with validation steps and clear prerequisites.
- Medium: “Connection timeline” UI for every integration (state changes, errors, retries).
- Hard: adopt Airbyte directly for embedded SaaS given ELv2 restrictions (hosted/managed service limitations).

### Thin-slice implementation (1–3 days)

- Day 1: build integration setup wizard for 1 connector (Shopify) + 1 destination (warehouse/webhook).
- Day 2: add “connection timeline” audit view: auth events, sync runs, failures, retries.
- Day 3: standardize “job types” for our integration engine (sync, backfill, webhook delivery) and surface job history.

## License evidence

- ELv2 text: https://raw.githubusercontent.com/airbytehq/airbyte/master/LICENSE

