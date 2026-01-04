# Schemas

Optional: JSON Schemas for agent outputs.

Why:
- makes outputs machine-readable
- enables validation
- helps agents stay consistent across runs

Suggested structure:

```text
schemas/
  <agent-id>/
    output.schema.json
```

Current schemas:

```text
schemas/
  deep-research/
    competitor-matrix.schema.json
    pricing-packaging.schema.json
```
