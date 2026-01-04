# License Verification — Tranche 009 (evidence-first)

- Goal: reduce `NOASSERTION` / unknown OSS licenses by verifying license files and updating step-04 OSS entry JSON `license.spdx_id` so the gap loop reflects reality.

- Proof artifacts (raw license file heads):
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-budibase-budibase.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-mautic-mautic.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-n8n-io-n8n.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-novuhq-novu.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-vendure-ecommerce-vendure.txt`

- Step-04 OSS entries updated (JSON + MD):
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/budibase-budibase.json` → `GPL-3.0` (repo notes per-package licensing; treat as copyleft)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/mautic-mautic.json` → `GPL-3.0` (copyleft; flag)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/n8n-io-n8n.json` → `SUL-1.0` (Sustainable Use License; EE paths under separate license)
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/novuhq-novu.json` → `MIT`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/vendure-ecommerce-vendure.json` → `GPL-3.0` (dual: GPLv3 or Vendure Commercial License; default GPL)

  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/budibase-budibase.md` — updated identity + license notes + sources
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/mautic-mautic.md` — updated identity + license notes + sources
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/n8n-io-n8n.md` — updated identity + license notes + sources
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/novuhq-novu.md` — updated identity + license notes + sources
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/vendure-ecommerce-vendure.md` — updated identity + license notes + sources

- License overrides adjusted (to match evidence):
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-overrides.json`: `novuhq/novu` → `MIT`; `mautic/mautic` → `GPL-3.0`

- Gap-loop impact:
  - Unknown/unclear licenses reduced `6 → 0` in `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md` (windmill-labs-windmill is no longer `NOASSERTION` in its step-04 entry: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/windmill-labs-windmill.json`).
