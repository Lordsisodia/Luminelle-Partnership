# License Verification — Tranche 008 (evidence-first)

- Goal: reduce `NOASSERTION` / unknown OSS licenses by verifying license files and updating step-04 OSS entry JSON `license.spdx_id` so the gap loop reflects reality.
- Proof artifacts (raw license file heads):
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-activepieces-activepieces.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-growthbook-growthbook.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-posthog-posthog.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-strapi-strapi.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-metabase-metabase.txt`

- Step-04 OSS entries updated (JSON + MD):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/activepieces-activepieces.json` → `MIT` (MIT Expat, with `packages/ee` under separate license)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/growthbook-growthbook.json` → `MIT` (MIT Expat, with enterprise directories under separate license)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/posthog-posthog.json` → `MIT` (MIT Expat, with `ee/` under separate license)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/strapi-strapi.json` → `MIT` (MIT Expat, with `ee/` under separate license)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/metabase-metabase.json` → `AGPL-3.0` (copyleft; flag)

  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/posthog-posthog.md` — updated identity + license notes + sources
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/strapi-strapi.md` — updated identity + license notes + sources
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/metabase-metabase.md` — updated identity + license notes + sources

- Gap-loop impact:
  - Unknown/unclear licenses reduced `11 → 6` in `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`.

