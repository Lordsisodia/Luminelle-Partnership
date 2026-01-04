# Evidence Extract — SpiceDB

- slug: `spicedb`
- category: fine-grained authorization (Zanzibar-inspired; schema + relationships + permission checks)
- license: Apache-2.0

## Cycle 11 — Evidence-backed primitives (schema + relationships authorization)

### Notable features (3)

1) Zanzibar-inspired positioning + “schema + relationships + permission checks” mental model  
Evidence: https://raw.githubusercontent.com/authzed/spicedb/main/README.md

2) Schema-driven authorization: define a schema, write relationships, then issue permission checks (and other queries like “who can access resource?”)  
Evidence: https://raw.githubusercontent.com/authzed/spicedb/main/README.md

3) Tooling emphasis: schema validation / CI/CD validation is explicitly referenced  
Evidence: README references tooling and schema validation: https://raw.githubusercontent.com/authzed/spicedb/main/README.md

### Copyable workflows (2)

1) Relationship-based permission checks: write schema → write relationships → call permission check API to decide actions  
Evidence: README includes schema/relationship write examples: https://raw.githubusercontent.com/authzed/spicedb/main/README.md

2) Policy iteration loop: develop schema → validate with tooling → ship → audit changes and roll out incrementally  
Evidence: schema guide reference: https://docs.authzed.com/guides/schema and schema language reference: https://docs.authzed.com/reference/schema-lang

### 3 steal ideas (easy / medium / hard)

- Easy: build a “protected resources registry” UI that maps cleanly to schema concepts (resource types + relations).
- Medium: treat approvals as “stateful overlays” on authorization: `authorize` can return `needs_approval` based on action risk + relations.
- Hard: provide a schema playground/testing UI like a “permission simulator” for admins.

### Thin-slice implementation (1–3 days)

- Day 1: define minimal schema-like model in our DB for `resource_type`, `resource_id`, `relation`, `subject` tuples.
- Day 2: implement `check(subject, relation, resource)` and use it for 1–2 protected actions.
- Day 3: add a “permission simulator” endpoint for internal debugging + audit log reasons.

## License evidence

- Apache-2.0: https://raw.githubusercontent.com/authzed/spicedb/main/LICENSE

