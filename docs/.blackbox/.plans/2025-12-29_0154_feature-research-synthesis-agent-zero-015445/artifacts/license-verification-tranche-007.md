# License Verification — Tranche 007 (evidence-first)

- Goal: reduce `NOASSERTION` / unknown OSS licenses by verifying license files and updating step-04 OSS entry JSON `license.spdx_id` so the gap loop reflects reality.
- Proof artifacts (raw license file heads):
  - `artifacts/license-proof-chatwoot-chatwoot.txt`
  - `artifacts/license-proof-airbytehq-airbyte.txt`
  - `artifacts/license-proof-directus-directus.txt`
  - `artifacts/license-proof-meilisearch-meilisearch.txt`
  - `artifacts/license-proof-karrioapi-karrio.txt`
  - `artifacts/license-proof-gotify-server.txt`
- Step-04 OSS entries updated (JSON + MD):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/chatwoot-chatwoot.json` → `MIT`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/airbytehq-airbyte.json` → `ELv2`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/directus-directus.json` → `BUSL-1.1`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/meilisearch-meilisearch.json` → `MIT AND BUSL-1.1`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/karrioapi-karrio.json` → `LGPL-3.0`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/gotify-server.json` → `MIT`
- Gap-loop impact:
  - Unknown/unclear licenses reduced `17 → 11` in `artifacts/gaps-report.md` after updating the step-04 JSON entries.
