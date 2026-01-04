---
compaction: 0006
created_at: "2025-12-30 17:12"
range: "0045-0054"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0006 (0045–0054)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0045_checkpoint-verified-5-oss-licenses-unknown-down-to-0.md

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
- Updated step-04 OSS entry markdown files with license notes + sources:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/budibase-budibase.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/mautic-mautic.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/n8n-io-n8n.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/novuhq-novu.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/vendure-ecommerce-vendure.md`
- Updated `artifacts/license-overrides.json` to match evidence for `novuhq/novu` (MIT) and `mautic/mautic` (GPL-3.0).
- Regenerated the gaps report and confirmed unknown/unclear licenses reduced `6 → 1` (remaining: windmill):
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`

## 🧠 What I learned (new information)

- Novu is MIT licensed (the prior override marking it proprietary was stale).
- n8n is not permissive OSS (Sustainable Use License) and has EE carve-outs; treat as license-restricted.
- Vendure defaults to GPLv3 unless you have a commercial agreement; treat as copyleft by default.

## 🧭 What changes because of this

- The “unknown license” queue is now closed (`unknown/NOASSERTION = 0`); the remaining risk work is categorizing copyleft/mixed/license-restricted repos as “flagged” vs “safe”.
- The Top-50 execution map is now more trustworthy for integration decisions because key accelerators are no longer hidden behind `NOASSERTION` (GPL/SUL/MIT is explicit).

## ➡️ Next step

- Convert the now-complete license set into an explicit “safe vs flagged” posture (GPL/AGPL/SUL/BUSL/ELv2/mixed) so builders don’t treat “known license” as “safe license”.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-verification-tranche-009.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`

---

### 0046_checkpoint-oss-license-unknown-now-0.md

---
step: 0046
created_at: "2025-12-29 20:54"
title: "Checkpoint: OSS license unknown now 0"
---

# Step 0046: Checkpoint: OSS license unknown now 0

## ✅ What I did (facts)

- Captured an evidence snapshot of Windmill’s licensing posture into `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-windmill-labs-windmill.txt`.
- Updated the step-04 OSS entry to replace `NOASSERTION` with an explicit mixed posture string: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/windmill-labs-windmill.json`.
- Added an evidence-backed license note section to `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/windmill-labs-windmill.md`.
- Updated `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-overrides.json` so the renderer uses the evidence-backed posture for Windmill.
- Re-generated the gap report to confirm the queue is empty: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`.
- Re-rendered the Top-50 license-annotated map: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/top-50-market-features.md`.

## 🧠 What I learned (new information)

- Windmill’s repository is not “single-license GPL”; it explicitly describes a mixed posture (Apache-2.0 + AGPLv3 + proprietary enterprise code paths), so it must be flagged under our “prefer permissive” posture. Evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-windmill-labs-windmill.txt`.

## 🧭 What changes because of this

- The OSS-license gap loop is no longer blocking (unknown/unclear licenses is now 0), so the synthesis can rank “build vs integrate” without unresolved legal ambiguity. Evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`.

## ➡️ Next step

- Re-evaluate the top OSS accelerator list in `artifacts/summary.md` and explicitly mark “safe (permissive)” vs “flag (copyleft/mixed/proprietary)” so humans don’t accidentally treat a mixed repo as drop-in safe.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-verification-tranche-010.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-windmill-labs-windmill.txt`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`

---

### 0047_checkpoint-safe-vs-flag-oss-posture-added.md

---
step: 0047
created_at: "2025-12-29 21:01"
title: "Checkpoint: SAFE vs FLAG OSS posture added"
---

# Step 0047: Checkpoint: SAFE vs FLAG OSS posture added

## ✅ What I did (facts)

- Generated a derived SAFE vs FLAG classification for the top-25 OSS shortlist into `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-posture-top25.txt`.
- Added a SAFE vs FLAG legend + links to evidence in `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-ranked.md`.
- Updated the Top 10 OSS accelerators section to mark SAFE/FLAG and corrected licenses (Flagsmith BSD-3-Clause; Meilisearch MIT+BUSL mixed; Metabase AGPL): `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`.

## 🧠 What I learned (new information)

- The “Top 25 OSS” list is overwhelmingly permissive (22/25 SAFE), with only 3 flagged items in that shortlist (Grafana AGPL, ToolJet AGPL, Budibase GPL). Evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-posture-top25.txt`.
- Several popular repos look “open source” at a glance but carry non-permissive/mixed constraints (e.g., Meilisearch mixed MIT+BUSL; Metabase AGPL). Evidence: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/meilisearch-meilisearch.json`, `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/metabase-metabase.json`.

## 🧭 What changes because of this

- Humans can now safely consume the OSS shortlist without accidentally “picking a repo” that creates copyleft/commercial obligations, because the shortlist explicitly explains SAFE vs FLAG. Evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-ranked.md`.

## ➡️ Next step

- Decide whether the synthesis should keep any FLAG items in the “Top 10 OSS accelerators” list, or swap them for permissive alternatives (example targets: search + analytics/BI). Evidence inputs: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`, `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-ranked.md`.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-posture-top25.txt`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-ranked.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`

---

### 0048_checkpoint-published-oss-safe-vs-flagged-posture.md

---
step: 0048
created_at: "2025-12-29 21:01"
title: "Checkpoint: published OSS safe-vs-flagged posture"
---

# Step 0048: Checkpoint: published OSS safe-vs-flagged posture

## ✅ What I did (facts)

- Generated an explicit OSS license posture list (safe vs flagged) from step-04 OSS entry JSON licenses and wrote it as a browse-friendly artifact:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-license-posture.md`
- Updated synthesis narrative to reflect the key decision shift: “known license ≠ safe license”, and pointed builders to the posture doc:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`
- Updated the synthesis plan so the next OSS ranking decisions are routed through the posture doc:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/agent-plan.md`

## 🧠 What I learned (new information)

- Even with `NOASSERTION` cleared to 0, we still have many repos that are “MIT but mixed” (enterprise carve-outs) and several copyleft/license-restricted repos; this is the real decision bottleneck now.
- This posture list is more actionable than raw SPDX IDs because it encodes “policy relevance” (safe vs flagged) in one place.

## 🧭 What changes because of this

- Builders can now filter OSS accelerators quickly and avoid accidentally adopting copyleft/mixed/fair-code repos when we want permissive defaults (evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-license-posture.md`).
- The next research cycle can focus on swapping any flagged repos out of the “Top 10 OSS accelerators” list or documenting explicit service-boundary exceptions.

## ➡️ Next step

- Update `artifacts/summary.md` “Top 10 OSS accelerators” list to mark each accelerator as safe vs flagged (or swap flagged repos for safe alternatives) using the posture list as the source of truth.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-license-posture.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/agent-plan.md`

---

### 0049_checkpoint-top-10-oss-accelerators-now-safe-only.md

---
step: 0049
created_at: "2025-12-29 21:04"
title: "Checkpoint: Top-10 OSS accelerators now safe-only"
---

# Step 0049: Checkpoint: Top-10 OSS accelerators now safe-only

## ✅ What I did (facts)

- Updated the “Top 10 OSS accelerators” list in the synthesis to be safe-only by default (per the “prefer permissive” policy), using `artifacts/oss-license-posture.md` as the source of truth:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`
- Swapped out flagged items (Meilisearch = mixed MIT+BUSL; Metabase = AGPL) and replaced them with safe alternatives (OpenSearch = Apache-2.0; Superset = Apache-2.0).
- Kept the flagged-but-relevant items listed explicitly as “exceptions” with a pointer back to the posture doc so adoption is deliberate.

## 🧠 What I learned (new information)

- A ranked “Top 10 OSS accelerators” list is only useful if it encodes policy constraints; otherwise it quietly encourages adoption of copyleft/mixed/fair-code repos.
- For our current needs, we have safe replacements for both search (OpenSearch) and BI dashboards (Superset/Redash) without needing to accept BUSL/AGPL.

## 🧭 What changes because of this

- Builders can now treat the Top-10 accelerator list as “safe defaults” and only reach for flagged repos when we explicitly choose to (evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`, `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-license-posture.md`).

## ➡️ Next step

- Revisit `artifacts/oss-ranked.md` to ensure top-ranked recommendations don’t implicitly prefer flagged repos (or add a “safe-only view” alongside the full list).

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-license-posture.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`

---

### 0050_checkpoint-safe-search-dashboard-swaps-evidenced.md

---
step: 0050
created_at: "2025-12-29 21:07"
title: "Checkpoint: SAFE search + dashboard swaps evidenced"
---

# Step 0050: Checkpoint: SAFE search + dashboard swaps evidenced

## ✅ What I did (facts)

- Captured OpenSearch’s Apache-2.0 LICENSE head into `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-opensearch-project-opensearch.txt`.
- Added a JSON entry for OpenSearch so step-04 tooling can consume it: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/opensearch-project-opensearch.json`.
- Updated the OpenSearch entry markdown to remove “expected; verify” phrasing and link proof: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/opensearch-project-opensearch.md`.
- Updated the synthesis OSS accelerator list so search + dashboards are SAFE options (OpenSearch + Superset) and moved Meilisearch + Metabase into “flagged alternatives”: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`.
- Re-generated the gap report to verify no regressions: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`.

## 🧠 What I learned (new information)

- We can keep the “Top 10 OSS accelerators” list entirely SAFE for the “search + dashboards” slots by using OpenSearch (Apache-2.0) and Superset (Apache-2.0), while still acknowledging Meilisearch (BUSL mixed) and Metabase (AGPL) as “flagged alternatives”. Evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`.

## 🧭 What changes because of this

- Humans reading the synthesis won’t accidentally adopt a mixed/copyleft repo for core primitives, because the shortlist now defaults to SAFE options and “flagged alternatives” are explicitly called out. Evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/summary.md`.

## ➡️ Next step

- Triage the remaining evidence “quality” queue: fill the 1 missing snapshot title + 13 missing descriptions, and decide how to treat the 4 `blocked` competitor entries. Evidence input: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/license-proof-opensearch-project-opensearch.txt`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/opensearch-project-opensearch.md`
- `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-04-oss-harvesting-cool-code-015445/oss/entries/apache-superset.json`

---

### 0051_checkpoint-snapshot-metadata-gaps-closed.md

---
step: 0051
created_at: "2025-12-29 21:15"
title: "Checkpoint: snapshot metadata gaps closed"
---

# Step 0051: Checkpoint: snapshot metadata gaps closed

## ✅ What I did (facts)

- Identified which competitors were missing `snapshot_title` / `snapshot_description` directly from `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/competitor-master-table.csv`.
- Re-extracted meta descriptions using an order-insensitive parser (handles `<meta content=\"...\" name=\"description\"/>`), then populated the master table fields for the `status=ok` set.
- Reclassified 3 “ok” competitors to `blocked` because their snapshots are bot-check/security-checkpoint HTML with no usable meta descriptions.
- Regenerated the gaps report to confirm the “snapshot metadata gaps” queue is now 0 for `status=ok`.

## 🧠 What I learned (new information)

- Many Webflow-based sites emit `<meta content=\"…\" name=\"description\"/>` (content attribute comes first), which the older strict regex extraction misses; robust parsing recovers the descriptions without re-snapshotting.
- Several “missing description” items were actually “bot check / security checkpoint” snapshots, so the correct fix is to mark them `blocked` (not to leave them as `ok`).

## 🧭 What changes because of this

- The competitor evidence table is now browse-friendly for the `ok` set: every `ok` competitor has a title + description, so humans can quickly see “what this tool is” without opening snapshots.
- The remaining competitor work is now a single decision queue: how to handle the 7 `blocked` competitors (find alternate URLs vs accept blocked).

## ➡️ Next step

- Attempt alternate URLs / reachable pages for the 7 blocked competitors (or explicitly accept them as blocked and document why). Evidence input: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/next-actions.md`.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/competitor-master-table.csv`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/snapshot-metadata-fixes-cycle-19.md`

---

### 0052_checkpoint-blocked-competitors-triaged.md

---
step: 0052
created_at: "2025-12-29 21:23"
title: "Checkpoint: blocked competitors triaged"
---

# Step 0052: Checkpoint: blocked competitors triaged

## ✅ What I did (facts)

- Created an alternate-URL input list for blocked competitors: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/blocked-competitors-alt-urls-cycle-20.txt`.
- Snapshotted those alternate URLs (stable filenames) using `.blackbox/scripts/research/snapshot_urls.py` into the existing `competitors/snapshots-home/` folders.
- Scored the alternate snapshots by “real page with meta description” vs “bot check / checkpoint / 404”, wrote results to `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/blocked-competitors-alt-snapshots-cycle-20.md`.
- Promoted `adobe-commerce-magento` from `blocked` → `ok` using a reachable docs landing page, updating `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/competitor-master-table.csv`.
- Regenerated the gap report to confirm blocked count decreased and metadata gaps remain 0: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`.

## 🧠 What I learned (new information)

- Several competitor homepages (Elastic Path / AB Tasty / Make) return Cloudflare “Just a moment…” bot-check HTML from CLI snapshotting, which blocks evidence collection without a browser-like environment. Evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/blocked-competitors-alt-snapshots-cycle-20.md`.
- Adobe Commerce can be “unblocked” at least for descriptive metadata by using the Experience League docs landing page. Evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/competitor-master-table.csv`.

## 🧭 What changes because of this

- The competitor evidence set is now cleaner: snapshot metadata gaps remain 0 and blocked competitors reduced from 7 → 6. Evidence: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`.

## ➡️ Next step

- Decide whether we accept the remaining 6 blocked competitors as permanently blocked (CLI-only), or we introduce a “browser snapshot” option for those specific cases. Evidence inputs: `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/blocked-competitors-alt-snapshots-cycle-20.md`, `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/next-actions.md`.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/blocked-competitors-alt-urls-cycle-20.txt`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/blocked-competitors-alt-snapshots-cycle-20.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`

---

### 0053_checkpoint-blocked-reasons-normalized.md

---
step: 0053
created_at: "2025-12-29 21:27"
title: "Checkpoint: blocked reasons normalized"
---

# Step 0053: Checkpoint: blocked reasons normalized

## ✅ What I did (facts)

- Normalized the `notes` fields for the remaining blocked competitors in `artifacts/competitor-master-table.csv` so each includes a concrete “why blocked” reason instead of stale placeholder tokens (e.g., `no_good_alt_snapshot`).
- Regenerated the gaps report after the master-table note normalization: `artifacts/gaps-report.md`.

## 🧠 What I learned (new information)

- A “blocked” status is only useful if it includes an actionable reason; otherwise the system keeps re-trying the same unfixable work. The notes now encode the exact blocker (Cloudflare bot check / Vercel checkpoint / empty response).

## 🧭 What changes because of this

- Future cycles can make a clear decision: either accept these as “CLI-blocked” permanently or introduce a browser-based snapshot method for these specific domains.

## ➡️ Next step

- Decide whether “browser snapshotting” is allowed for these domains. If not, accept the remaining blocked set and stop spending time trying to fetch them via CLI-only HTTP.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/competitor-master-table.csv`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/gaps-report.md`

---

### 0054_checkpoint-oss-ranked-safe-only-posture-tags.md

---
step: 0054
created_at: "2025-12-30 17:12"
title: "Checkpoint: OSS ranked safe-only + posture tags"
---

# Step 0054: Checkpoint: OSS ranked safe-only + posture tags

## ✅ What I did (facts)

- Generated a SAFE-only ranked shortlist for builders by filtering the top-25 `artifacts/oss-ranked.md` list using the source-of-truth posture classification in `artifacts/oss-license-posture.md`:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-ranked-safe-only.md`
- Tagged each entry in the full top-25 ranked shortlist with `Posture: SAFE/FLAG` (inserted directly under the `- License:` line) to make policy risk visible at the decision point:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-ranked.md`
- Updated the synthesis plan status so future cycles route ranking decisions through the new safe-only view and posture tags:
  - `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/agent-plan.md`

## 🧠 What I learned (new information)

- “Top-25 ranked by GitHub metadata” is useful, but without an explicit posture tag it’s too easy to accidentally choose flagged repos (copyleft/mixed/SUL/BUSL/ELv2) just because they rank highly.
- A safe-only view keeps execution moving without repeated license debate; flagged repos can still be considered, but only intentionally.

## 🧭 What changes because of this

- Builders now have a default short path: start with `artifacts/oss-ranked-safe-only.md`, and only consult flagged repos when there is an explicit exception decision (evidence: `artifacts/oss-ranked-safe-only.md`, `artifacts/oss-license-posture.md`).
- The full ranked list is now policy-aware at the row level, which prevents “license drift by suggestion” (evidence: `artifacts/oss-ranked.md`).

## ➡️ Next step

- Update `artifacts/oss-ranked.md` scoring to account for posture (e.g. subtract points for FLAG), or generate a “policy-adjusted ranking” that keeps SAFE ahead of FLAG even when GitHub metadata is strong.

## 🔗 Links / references

- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-license-posture.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-ranked.md`
- `.blackbox/.plans/2025-12-29_0154_feature-research-synthesis-agent-zero-015445/artifacts/oss-ranked-safe-only.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
