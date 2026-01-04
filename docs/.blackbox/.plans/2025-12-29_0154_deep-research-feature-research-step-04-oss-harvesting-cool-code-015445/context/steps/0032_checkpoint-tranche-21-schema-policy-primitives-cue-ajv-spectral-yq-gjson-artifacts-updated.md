---
step: 0032
created_at: "2025-12-30 19:20"
title: "Checkpoint: Tranche 21 schema/policy primitives (CUE/Ajv/Spectral/yq/gjson) + artifacts updated"
---

# Step 0032: Checkpoint: Tranche 21 schema/policy primitives (CUE/Ajv/Spectral/yq/gjson) + artifacts updated

## ✅ What I did (facts)

- Deepened Tranche 21 (N=5) “schema/policy primitives” repos with concrete adoption plans + verified license notes:
  - `oss/entries/cue-lang-cue.md` (Apache-2.0)
  - `oss/entries/ajv-validator-ajv.md` (MIT)
  - `oss/entries/stoplightio-spectral.md` (Apache-2.0)
  - `oss/entries/mikefarah-yq.md` (MIT)
  - `oss/entries/tidwall-gjson.md` (MIT)
- Created manual `oss/entries/*.json` metadata for the tranche:
  - `oss/entries/cue-lang-cue.json`
  - `oss/entries/ajv-validator-ajv.json`
  - `oss/entries/stoplightio-spectral.json`
  - `oss/entries/mikefarah-yq.json`
  - `oss/entries/tidwall-gjson.json`
- Updated artifacts:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added evidence schema validation + linting row)
  - `artifacts/summary.md` (added Tranche 21 section)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- “Policy enforcement” is much easier when manifests are deterministic and versioned:
  - schema validation (Ajv/CUE) prevents structural drift
  - linting (Spectral) improves readability and catches convention violations
- The best layering is:
  - schema gate (Ajv/CUE) → lint (Spectral) → semantic policy gate (Conftest/OPA)
- Small CLI glue tools (yq) reduce fragile scripts in upgrade automation and make evidence manifests easier to normalize.

## 🧭 What changes because of this

- We can define a stable “Evidence Bundle v1” contract:
  - schema validation + linting become required before policy gates and before upload/promotion
- This reduces false positives and flake in the upgrade pipeline by keeping evidence manifests consistent across templates and runners.

## ➡️ Next step

- Next tranche: implement or template an actual `evidence-bundle.schema.json` + `mask-rules.schema.json` in the plan folder (plus example manifests),
  then wire them into the pipeline via Ajv + Conftest.

  (Alternative: harvest more repos for “schema diff/migrations” and “manifest version bump automation”.)

## 🔗 Links / references

- `oss/entries/ajv-validator-ajv.md`
- `oss/entries/stoplightio-spectral.md`
- `oss/entries/cue-lang-cue.md`
- `artifacts/build-vs-buy.md`
- `artifacts/sources.md`
