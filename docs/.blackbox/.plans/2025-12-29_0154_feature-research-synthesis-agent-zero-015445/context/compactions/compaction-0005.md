---
compaction: 0005
created_at: "2025-12-29 20:52"
range: "0001-0045"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0005 (0001–0045)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0001_checkpoint-missing-snapshot-zero.md

---
step: 0001
created_at: "2025-12-29 20:17"
title: "Checkpoint: competitor missing_snapshot is now 0"
---

# Step 0001: Checkpoint: competitor missing_snapshot is now 0

## ✅ What I did (facts)

- Re-ran the gap generator so `artifacts/gaps-report.md` and `artifacts/next-actions.md` reflect the current state of `artifacts/competitor-master-table.csv`.
- Audited `artifacts/competitor-master-table.csv` directly to verify there are 0 `missing_snapshot` competitors and recorded the results as a standalone artifact.

## 🧠 What I learned (new information)

- The “competitor snapshot” tranche is effectively complete: remaining anomalies are tracked as `blocked` (unreachable), not `missing_snapshot` (incomplete work).

## 🧭 What changes because of this

- The research loop should now prioritize higher-leverage gaps:
  - map OSS accelerators for the top-ranked features (13 missing)
  - fill competitor proofs for Audit Log and RBAC
  - verify/resolve OSS licenses currently marked NOASSERTION

## ➡️ Next step

- Pick one feature from `artifacts/gaps-report.md` “Missing OSS accelerators” list and map 1–2 permissive OSS repos (or explicitly mark “none, build it”), then update the top-50 map and rerun the gap generator.

## 🔗 Links / references

- Audit: `artifacts/missing-snapshot-audit-cycle-08.txt`
- Current gaps report: `artifacts/gaps-report.md`
- Current next-actions queue: `artifacts/next-actions.md`
- Mechanism: `.blackbox/scripts/research/audit_intelligence_gaps.py`

---

### 0002_checkpoint-filled-auditlog-rbac-oss-proofs.md

---
step: 0002
created_at: "2025-12-29 20:25"
title: "Checkpoint: filled audit-log + RBAC OSS accelerators and competitor proofs"
---

# Step 0002: Checkpoint: filled audit-log + RBAC OSS accelerators and competitor proofs

## ✅ What I did (facts)

- Updated the top-50 map to fill missing `oss_accelerators` and `competitor_proofs` for:
  - `#3` Audit log (“who changed what”)
  - `#4` RBAC + granular permissions
  Evidence: `artifacts/top-50-market-features.csv`
- Regenerated the gap report and next-actions queue to reflect the updated top-50 map.
  Evidence: `artifacts/gaps-report.md`, `artifacts/next-actions.md`

## 🧠 What I learned (new information)

- The gap loop is very sensitive to `artifacts/top-50-market-features.csv`: adding 1–2 OSS pointers and 1–2 competitor proof links per row quickly reduces “unknowns” without needing any code changes.

## 🧭 What changes because of this

- “Missing competitor proofs” is now 0 and the research loop can focus on the remaining 9 “missing OSS accelerators” items (features #11, #12, #13, #14, #15, #16, #18, #20, #21).
  Evidence: `artifacts/gaps-report.md`, `artifacts/next-actions.md`

## ➡️ Next step

- Pick N=3 of the remaining 9 “missing OSS accelerators” features and map at least one permissive OSS accelerator each, then regenerate the gap report.

## 🔗 Links / references

- Updated top-50 map: `artifacts/top-50-market-features.csv`
- Current gaps report: `artifacts/gaps-report.md`
- Current queue: `artifacts/next-actions.md`
- Competitor proofs used:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/flagsmith.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/workato.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/directus.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/prismatic.md`

---

### 0003_checkpoint-filled-oss-accelerators-support-shipping-connectors.md

---
step: 0003
created_at: "2025-12-29 20:30"
title: "Checkpoint: filled OSS accelerators for support/shipping/connectors"
---

# Step 0003: Checkpoint: filled OSS accelerators for support/shipping/connectors

## ✅ What I did (facts)

- Updated `artifacts/top-50-market-features.csv` to add OSS accelerators for:
  - `#11` Customer support actions from the inbox
  - `#13` Shipping ops batch labels/rules/exceptions
  - `#21` Connector setup wizard + run logs + retries
- Regenerated the gap report + queue so the remaining “missing OSS accelerators” list is accurate.

## 🧠 What I learned (new information)

- The step-04 OSS entries already contain several permissive building blocks (e.g., Medusa MIT, Saleor BSD, Temporal MIT), but many “tooling-like” repos still need license verification (NOASSERTION/mixed).

## 🧭 What changes because of this

- The OSS accelerator backlog is now smaller (6 remaining features), so the next cycles can move faster and focus on higher-confidence permissive candidates.

## ➡️ Next step

- Pick N=3 from the remaining 6 OSS gaps and map a permissive OSS accelerator for each:
  - `#12` subscriptions portal
  - `#14` reviews/UGC moderation + incentives workflow
  - `#15` lifecycle journeys (email/SMS) + segmentation
  - `#16` CDP-lite customer profile + destinations
  - `#18` draft/preview/publish approvals
  - `#20` personalization/recommendations (rules-first)

## 🔗 Links / references

- Updated top-50 map: `artifacts/top-50-market-features.csv`
- Current gaps report: `artifacts/gaps-report.md`
- Current queue: `artifacts/next-actions.md`
- OSS accelerators used:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/chatwoot-chatwoot.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/open-policy-agent-opa.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/karrioapi-karrio.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/medusajs-medusa.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/saleor-saleor.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/temporalio-temporal.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/activepieces-activepieces.md`

---

### 0004_checkpoint-missing-oss-accelerators-down-to-5.md

---
step: 0004
created_at: "2025-12-29 20:34"
title: "Checkpoint: missing OSS accelerators down to 5"
---

# Step 0004: Checkpoint: missing OSS accelerators down to 5

## ✅ What I did (facts)

- Regenerated the gap report and next-actions queue from the current synthesis artifacts so the “missing OSS accelerators” list is accurate and stable.

## 🧠 What I learned (new information)

- The remaining missing OSS set is now clean and small enough to handle in two quick tranches (N=3 then N=2) without needing additional competitor evidence work.

## 🧭 What changes because of this

- The research loop’s bottleneck is now primarily license posture (many OSS candidates still flagged NOASSERTION/mixed), not missing competitor evidence.

## ➡️ Next step

- Fill OSS accelerators for N=3 of the remaining features and re-run the gap generator:
  - `#12` subscriptions portal
  - `#16` CDP-lite profile + destinations
  - `#18` draft/preview/publish approvals

## 🔗 Links / references

- Current gaps report: `artifacts/gaps-report.md`
- Current next-actions queue: `artifacts/next-actions.md`
- Remaining missing OSS set: `artifacts/next-actions.md` (OSS accelerators section)
- Mechanism: `.blackbox/scripts/research/audit_intelligence_gaps.py`

---

### 0005_checkpoint-missing-oss-accelerators-now-0.md

---
step: 0005
created_at: "2025-12-29 20:41"
title: "Checkpoint: missing OSS accelerators now 0"
---

# Step 0005: Checkpoint: missing OSS accelerators now 0

## ✅ What I did (facts)

- Regenerated the gap report and queue from the current synthesis artifacts to verify the top-50 map has complete OSS accelerator coverage and complete competitor proof coverage.

## 🧠 What I learned (new information)

- The remaining “unknowns” are now primarily *license posture* (17 OSS entries still show NOASSERTION/unknown via GitHub metadata), not missing competitor evidence or missing feature mapping.

## 🧭 What changes because of this

- The next research tranche should switch to license verification and pruning/flagging accelerators that cannot be used safely (GPL/AGPL/BUSL/unknown) rather than collecting more competitor or feature coverage.

## ➡️ Next step

- Run a license verification tranche (N=5–8 repos) and update:
  - `artifacts/license-verification-sweep-002.json` / `artifacts/license-overrides.json` as needed
  - `artifacts/oss-ranked.md` / `artifacts/summary.md` to mark which accelerators are “safe to use” vs “blocked by license”

## 🔗 Links / references

- Current gaps report: `artifacts/gaps-report.md`
- Current next-actions queue: `artifacts/next-actions.md`
- License gap list: `artifacts/gaps-report.md` (OSS license verification gaps section)
- Mechanism: `.blackbox/scripts/research/audit_intelligence_gaps.py`

---

### 0041_checkpoint-mapped-oss-accelerators-for-5-6-missing-oss-gaps-reduced.md

---
step: 0041
created_at: "2025-12-29 20:20"
title: "Checkpoint: mapped OSS accelerators for #5/#6; missing OSS gaps reduced"
---

# Step 0041: Checkpoint: mapped OSS accelerators for #5/#6; missing OSS gaps reduced

## ✅ What I did (facts)

- Pivoted the gap loop from “missing snapshots” (now cleared) to “missing OSS accelerators” for ranked features (source: `artifacts/next-actions.md`, `artifacts/gaps-report.md`).
- Updated the Top-50 feature map source CSV to add license-aware OSS accelerator pointers for:
  - Rank #5 Returns portal + exchange-first flow
  - Rank #6 Unified order timeline (“single pane of glass”)
  (file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.csv`)
- Used the license-annotation generator to regenerate the Top-50 Markdown table (overwrites in-place) so the OSS column shows ✅/🧨/⚠️ license posture:
  - script: `.blackbox/scripts/research/annotate_top50_oss_licenses.py`
  - output: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`
- Updated the top-10 evidence crosswalk to reflect the new OSS accelerators for rows 5 and 6 (file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/evidence-index.md`).
- Regenerated the gap loop outputs so the dashboards reflect the new OSS mappings:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/next-actions.md`

## 🧠 What I learned (new information)

- The gap audit reads the Top-50 OSS mapping from `artifacts/top-50-market-features.csv` (not the Markdown), so updates must land in the CSV to reduce “missing OSS accelerators” counts (evidence: `.blackbox/scripts/research/audit_intelligence_gaps.py`).
- The license-aware table rendering can be kept consistent by always regenerating `artifacts/top-50-market-features.md` via `.blackbox/scripts/research/annotate_top50_oss_licenses.py` after CSV edits (evidence: `.blackbox/scripts/research/annotate_top50_oss_licenses.py`).

## 🧭 What changes because of this

- “Missing OSS accelerators” dropped from 13 → 9 after filling OSS candidates for #5 and #6 (evidence: `artifacts/gaps-report.md`).
- The next-actions queue is now correctly focused on the remaining 9 OSS-missing features and the 2 “missing competitor proofs” items (evidence: `artifacts/next-actions.md`).

## ➡️ Next step

- Continue OSS mapping for the next 3–5 “missing OSS accelerators” features (e.g., #11 support actions, #13 shipping ops, #15 lifecycle journeys), keeping license posture permissive by default (policy: `artifacts/feature-research-config.yaml`).
- Fill competitor proofs for #3 Audit log and #4 RBAC by adding at least 1 competitor evidence file per feature in `artifacts/top-50-market-features.csv`.

## 🔗 Links / references

- Top-50 map source: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.csv`
- Top-50 map rendered: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`
- Evidence crosswalk: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/evidence-index.md`
- License-aware renderer: `.blackbox/scripts/research/annotate_top50_oss_licenses.py`
- Gap loop generator: `.blackbox/scripts/research/audit_intelligence_gaps.py`

---

### 0042_checkpoint-filled-oss-accelerators-for-11-13-15-missing-oss-gaps-reduced.md

---
step: 0042
created_at: "2025-12-29 20:26"
title: "Checkpoint: filled OSS accelerators for #11/#13/#15; missing OSS gaps reduced"
---

# Step 0042: Checkpoint: filled OSS accelerators for #11/#13/#15; missing OSS gaps reduced

## ✅ What I did (facts)

- Added OSS accelerators for three previously “missing OSS accelerators” rows in the Top-50 feature map source CSV:
  - Rank #11 Customer support actions: Chatwoot + react-admin
  - Rank #13 Shipping ops: karrio + Medusa
  - Rank #15 Lifecycle journeys: PostHog + Activepieces
  (file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.csv`)
- Regenerated the license-aware Top-50 Markdown rendering so the OSS column shows ✅/🧨/⚠️:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`
  - (generator: `.blackbox/scripts/research/annotate_top50_oss_licenses.py`)
- Updated the browse-friendly evidence crosswalk for related rows (shipping ops + lifecycle journeys):
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/evidence-index.md`
- Re-ran the gap audit to refresh `gaps-report.md` + `next-actions.md` (evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`).

## 🧠 What I learned (new information)

- The license overrides file is the source of truth for resolving NOASSERTION OSS entries during table annotation; e.g., Chatwoot is treated as MIT via override, while karrio is LGPL (flagged) and Novu is marked proprietary (evidence: `artifacts/license-overrides.json`).

## 🧭 What changes because of this

- “Missing OSS accelerators” dropped further after filling #11/#13/#15 (evidence: `artifacts/gaps-report.md` now reports `Missing OSS accelerators: 5`).
- The remaining gap queue is now small and focused on a handful of feature rows (#12, #14, #16, #18, #20, #21 depending on what’s already filled) (evidence: `artifacts/next-actions.md`).

## ➡️ Next step

- Fill OSS accelerators for the remaining 5 missing rows (suggested next: #16 CDP-lite, #21 integration wizard/run logs).
- Optionally tighten “license posture” by verifying the 17 NOASSERTION/unknown OSS licenses and updating `artifacts/license-overrides.json` where appropriate.

## 🔗 Links / references

- Top-50 map source: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.csv`
- Top-50 map rendered: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`
- Evidence crosswalk: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/evidence-index.md`
- License overrides: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-overrides.json`
- Gap audit tool: `.blackbox/scripts/research/audit_intelligence_gaps.py`

---

### 0043_checkpoint-refreshed-top-50-license-map-evidence-index-oss.md

---
step: 0043
created_at: "2025-12-29 20:36"
title: "Checkpoint: refreshed Top-50 license map + evidence index OSS"
---

# Step 0043: Checkpoint: refreshed Top-50 license map + evidence index OSS

## ✅ What I did (facts)

- Regenerated the license-annotated Top-50 feature map markdown from the current CSV using `.blackbox/scripts/research/annotate_top50_oss_licenses.py` (output: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`).
- Re-ran the gap audit generator to ensure the gap queue reflects the current Top-50 OSS mappings (output: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md` and `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/next-actions.md`).
- Updated the browse-friendly crosswalk to include OSS accelerators + evidence pointers for subscription portal, UGC moderation, CDP-lite, draft/publish approvals, and rules-first personalization (file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/evidence-index.md`).
- Cleaned up the synthesis narrative to remove an outdated “missing OSS accelerators = 5” claim and keep the summary aligned with the regenerated gaps report (file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`).

## 🧠 What I learned (new information)

- The gap generator is sensitive to whether `oss_accelerators` is populated in `artifacts/top-50-market-features.csv`; once populated, `missing OSS accelerators` drops to `0` immediately after audit regeneration (evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`).
- The “remaining work” has now shifted almost entirely from “coverage” (snapshots/OSS mappings/proofs) to “risk posture” (17 OSS entries still report unknown/NOASSERTION licenses and need verification) (evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`).

## 🧭 What changes because of this

- We can stop spending cycles on “find any OSS for feature X” and instead prioritize a license verification sweep + a decision on how to treat the 4 `blocked` competitors (evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`).
- The evidence crosswalk now points to concrete OSS entry markdown files for key mid-rank primitives, making it easier for builders to pick “integrate/build hybrid” paths without re-searching (evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/evidence-index.md`).

## ➡️ Next step

- Run a targeted OSS license verification tranche for the 17 NOASSERTION/unknown repos listed in `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`, updating `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-overrides.json` only when we have primary-source proof.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.csv`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/next-actions.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/evidence-index.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`

---

### 0044_checkpoint-verified-5-oss-licenses-unknown-down-to-6.md

---
step: 0044
created_at: "2025-12-29 20:46"
title: "Checkpoint: verified 5 OSS licenses; unknown down to 6"
---

# Step 0044: Checkpoint: verified 5 OSS licenses; unknown down to 6

## ✅ What I did (facts)

- Verified licenses for 5 `NOASSERTION` OSS repos by fetching their primary LICENSE files from raw GitHub URLs and storing proof heads in the synthesis plan:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-activepieces-activepieces.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-growthbook-growthbook.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-posthog-posthog.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-strapi-strapi.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-metabase-metabase.txt`
- Updated step-04 OSS entry JSON `license.*` fields so the gap loop uses evidence-backed SPDX values (files in `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/`):
  - `activepieces-activepieces.json` → `MIT` (with `packages/ee` note)
  - `growthbook-growthbook.json` → `MIT` (with enterprise directory note)
  - `posthog-posthog.json` → `MIT` (with `ee/` directory note)
  - `strapi-strapi.json` → `MIT` (with `ee/` directory note)
  - `metabase-metabase.json` → `AGPL-3.0` (copyleft; flagged)
- Regenerated the synthesis gaps report after updates so counts reflect reality (file: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`).

## 🧠 What I learned (new information)

- Several high-signal OSS candidates are “MIT Expat” but explicitly carve out enterprise directories under separate licenses; we must treat these as “mixed repo” and avoid accidentally depending on EE code paths.
- Metabase is AGPL-3.0 (copyleft), which is incompatible with our “prefer permissive” posture unless we isolate it as a separate service boundary with careful legal review.

## 🧭 What changes because of this

- The license-uncertainty queue dropped from 11 → 6, so the remaining unknown list is now small enough to close in a single tranche (evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`).
- The Top-50 map can now be interpreted with more confidence because “MIT vs AGPL vs mixed” is no longer hidden behind `NOASSERTION` for these key repos (evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`).

## ➡️ Next step

- Verify the remaining 6 unknown-license repos: Budibase, Mautic, n8n, Novu, Vendure, Windmill (evidence list source: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`).

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-verification-tranche-008.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`

---

### 0045_checkpoint-verified-5-oss-licenses-unknown-down-to-1.md

---
step: 0045
created_at: "2025-12-29 20:52"
title: "Checkpoint: verified 5 OSS licenses; unknown down to 0"
---

# Step 0045: Checkpoint: verified 5 OSS licenses; unknown down to 0

## ✅ What I did (facts)

- Verified licenses for 5 `NOASSERTION` OSS repos by fetching primary LICENSE files from raw GitHub URLs and storing proof heads:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-budibase-budibase.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-mautic-mautic.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-n8n-io-n8n.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-novuhq-novu.txt`
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-vendure-ecommerce-vendure.txt`
- Updated step-04 OSS entry JSON `license.*` fields to remove `NOASSERTION` and reflect evidence-backed licenses:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/budibase-budibase.json` → `GPL-3.0`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/mautic-mautic.json` → `GPL-3.0`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/n8n-io-n8n.json` → `SUL-1.0`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/novuhq-novu.json` → `MIT`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/vendure-ecommerce-vendure.json` → `GPL-3.0` (default without commercial agreement)
- Updated `artifacts/license-overrides.json` to match evidence for Novu (MIT) and Mautic (GPL-3.0).
- Regenerated the synthesis gaps report and confirmed unknown/unclear OSS licenses reduced `6 → 0`.

## 🧠 What I learned (new information)

- Novu is MIT licensed (prior “PROPRIETARY” posture was stale).
- n8n uses the Sustainable Use License (not OSI-approved) and has EE carve-outs; treat as license-restricted.
- Vendure defaults to GPLv3 unless you have a commercial agreement; treat as copyleft by default.

## 🧭 What changes because of this

- The license-uncertainty queue is now closed (`unknown/NOASSERTION = 0`) (evidence: `artifacts/gaps-report.md`).
- The Top-50 execution map is now more reliable to interpret because key OSS entries are no longer hidden behind `NOASSERTION` (GPL/SUL/MIT is explicit) (evidence: `artifacts/top-50-market-features.md`).

## ➡️ Next step

- Convert the now-complete license set into an explicit “safe vs flagged” posture (GPL/AGPL/SUL/BUSL/ELv2/mixed) so builders don’t treat “known license” as “safe license”.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-verification-tranche-009.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
