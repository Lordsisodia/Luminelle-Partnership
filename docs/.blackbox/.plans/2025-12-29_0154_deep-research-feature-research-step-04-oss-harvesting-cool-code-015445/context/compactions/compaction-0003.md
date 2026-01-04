---
compaction: 0003
created_at: "2025-12-30 19:09"
range: "0021-0030"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0003 (0021–0030)

## ✅ Summary (fill this after compaction)

- Built a coherent “managed storefront upgrades” toolchain from permissive OSS primitives: templates → quality gates → diffs → evidence → access control.
- Audit/Event Viewer UX can be assembled from small MIT UI primitives (table + virtualization + query builder + JSON inspector) without adopting a full BI platform.
- Shopify-first storefront generation splits into two tracks: Liquid theme generation (Dawn/Theme tools) vs custom storefronts (Hydrogen/Next.js templates), each with different customization boundaries and upgrade problems.
- Upgrade safety requires layered gating: lint/validation (Theme Check) + functional smoke tests (Playwright) + visual diffs (Lost Pixel/reg-suit) + performance budgets (Lighthouse CI/sitespeed.io).
- “No-forks” customization and upgrades benefit from base+overlay concepts (Kustomize/ytt) plus best-effort patching and automated upgrade PR workflows (diff-match-patch + create-pull-request).
- Evidence sharing is only safe with governance: protect viewers (oauth2-proxy/Pomerium), prevent secrets (Gitleaks/Pino redaction), and log access (OTel Collector) with early redaction.

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
  - Always specify the tranche theme and cap `N=5` explicitly to prevent scope creep.
  - Prefer “primitives first” (libraries + workflows) over “platforms” unless we explicitly want to operate them.
- Checklist improvements:
  - For every repo: add a license proof link (LICENSE file; if absent, note alternate evidence like package.json).
  - For “managed service” surfaces: explicitly call out PII/secrets risks and “must happen before upload” constraints (masking/redaction).
  - Always attach “how this fits into the pipeline” (generate → gate → evidence → approve → promote → rollback).
- Better stop conditions:
  - Stop adding more repos once the tranche fills `N`; append additional finds to the next tranche queue.
  - If GitHub API returns 403/rate limits: switch to raw LICENSE proof + manual JSON metadata and continue.

## Steps compacted (trimmed)

### 0021_checkpoint-tranche-9-ui-primitives-wired-into-artifacts-tranche-10-commerce-builders-deepened-medusa-saleor-sylius-bagisto-solidus-with-license-notes-adoption-plans.md

---
step: 0021
created_at: "2025-12-30 18:18"
title: "Checkpoint: Tranche 9 UI primitives wired into artifacts; Tranche 10 commerce builders deepened (Medusa/Saleor/Sylius/Bagisto/Solidus) with license notes + adoption plans"
---

# Step 0021: Checkpoint: Tranche 9 UI primitives wired into artifacts; Tranche 10 commerce builders deepened (Medusa/Saleor/Sylius/Bagisto/Solidus) with license notes + adoption plans

## ✅ What I did (facts)

- Completed Tranche 9 (N=5) “audit/event viewer UI primitives” by wiring the already-created OSS entry files into the main artifacts:
  - Updated `artifacts/oss-candidates.md`, `artifacts/build-vs-buy.md`, `artifacts/summary.md`, `artifacts/sources.md`
  - Repos/packages: TanStack Table, TanStack Virtual, react-virtuoso, React Query Builder, React JSON View (all MIT)
- Completed Tranche 10 (N=5) “commerce builders/headless commerce” by writing adoption plans + license notes for:
  - Medusa (MIT), Saleor (BSD-3-Clause), Sylius (MIT + trademark/logo terms), Bagisto (MIT), Solidus (BSD-3-Clause-like “Spree License” text)
- Updated `progress-log.md` to record Tranche 9 + Tranche 10 completion.

## 🧠 What I learned (new information)

- UI primitives are a low-risk/high-leverage way to get “product-grade” audit/event viewer UX without adopting a full BI platform.
- Some ecommerce ecosystems have shifted to copyleft for “modern versions” (e.g., Spree → AGPL), so “shop builder” repos need careful license verification even when they look legacy/permissive.
- Sylius is MIT for code but explicitly separates trademark/logo usage into a separate license file (important for any “white-label” posture).

## 🧭 What changes because of this

- We now have a coherent “Audit/Event Viewer v1” frontend stack that is permissive and composable:
  - table + virtualization + query builder + JSON inspector
- Commerce builder OSS is best treated as “patterns/reference + feature checklist” for a Shopify-first business, unless we explicitly decide to support non-Shopify builds.
- License verification is now a gating step for commerce platforms (not just “check GitHub metadata”).

## ➡️ Next step

- Next tranche: broaden e-commerce builder research into:
  - storefront frameworks (Shopify Hydrogen/Remix patterns, Next.js commerce starters)
  - multi-tenant “site generator” patterns (themes/templates, content ops, safe extension points)
  - merchant admin/support admin feature checklists (compare against our roadmap)
- Continue timeboxed harvesting (N=3–10) with verified license notes before recommending adoption.

## 🔗 Links / references

- `artifacts/summary.md`
- `artifacts/oss-candidates.md`
- `artifacts/build-vs-buy.md`
- `artifacts/sources.md`
- `oss/entries/tanstack-table.md`
- `oss/entries/medusajs-medusa.md`

---

### 0022_checkpoint-tranche-11-storefront-generation-deep-dive-hydrogen-dawn-vercel-commerce-saleor-storefront-shopify-cli-artifacts-updated.md

---
step: 0022
created_at: "2025-12-30 18:26"
title: "Checkpoint: Tranche 11 storefront generation deep dive (Hydrogen/Dawn/Vercel Commerce/Saleor Storefront/Shopify CLI) + artifacts updated"
---

# Step 0022: Checkpoint: Tranche 11 storefront generation deep dive (Hydrogen/Dawn/Vercel Commerce/Saleor Storefront/Shopify CLI) + artifacts updated

## ✅ What I did (facts)

- Deepened Tranche 11 (N=5) storefront generation repos with concrete adoption plans and license notes:
  - `oss/entries/shopify-hydrogen.md` (MIT)
  - `oss/entries/shopify-dawn.md` (MIT per LICENSE.md; GitHub metadata may show NOASSERTION)
  - `oss/entries/vercel-commerce.md` (MIT)
  - `oss/entries/saleor-storefront.md` (BSD-3-Clause)
  - `oss/entries/shopify-cli.md` (MIT)
- Added GitHub API metadata JSON entries for all 5 repos in `oss/entries/*.json`.
- Updated core artifacts to include the tranche:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added storefront scaffolding row)
  - `artifacts/summary.md` (added Tranche 11 summary)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- “Storefront generation” splits cleanly into two productized paths:
  - Shopify theme generation (Liquid + sections/blocks) where merchant customization is native
  - Custom storefront generation (Hydrogen/Next.js) where we must explicitly design customization boundaries
- Dawn is a strong “merchant-safe customization” reference: sections/blocks schema is the core contract, not code edits.
- Shopify CLI is a high-signal source for the intended operational workflow (scaffold → preview → deploy) and is a good target for wrappers/automation.
- Vercel Commerce is best treated as an architecture/template reference: it demonstrates provider abstraction, SEO defaults, and modern storefront structure under MIT.

## 🧭 What changes because of this

- We now have a concrete “Shopify-first storefront generator” design direction:
  - Prefer Dawn-style schema-driven customization for speed + safety
  - Use Hydrogen/Next.js templates when the client needs custom storefront capabilities (and treat upgrades as a first-class problem)
- The “managed service” posture requires us to add:
  - preview environments, rollback, and auditability of deployments (theme/storefront)
  - strict secrets handling and log redaction
- License posture is clear/permissive across this tranche, with the only nuance being Dawn’s GitHub metadata mismatch (handled with LICENSE.md proof).

## ➡️ Next step

- Next tranche: harvest “storefront generator primitives” (N=5) that support our pipeline:
  - theme/schema validation + linting tools
  - visual regression + storefront smoke testing frameworks
  - content preview/staging patterns (drafts, shareable previews)
  - multi-tenant configuration + release channels (per merchant)

## 🔗 Links / references

- `oss/entries/shopify-hydrogen.md`
- `oss/entries/shopify-dawn.md`
- `oss/entries/vercel-commerce.md`
- `oss/entries/saleor-storefront.md`
- `oss/entries/shopify-cli.md`
- `artifacts/summary.md`
- `artifacts/oss-candidates.md`
- `artifacts/build-vs-buy.md`
- `artifacts/sources.md`

---

### 0023_checkpoint-tranche-12-storefront-generator-primitives-theme-check-theme-tools-liquid-playwright-lost-pixel-artifacts-sources-updated.md

---
step: 0023
created_at: "2025-12-30 18:32"
title: "Checkpoint: Tranche 12 storefront generator primitives (Theme Check/Theme Tools/Liquid/Playwright/Lost Pixel) + artifacts/sources updated"
---

# Step 0023: Checkpoint: Tranche 12 storefront generator primitives (Theme Check/Theme Tools/Liquid/Playwright/Lost Pixel) + artifacts/sources updated

## ✅ What I did (facts)

- Deepened Tranche 12 (N=5) “storefront generator primitives” with concrete adoption plans + license notes:
  - `oss/entries/shopify-theme-check.md` (MIT per LICENSE.md; GitHub metadata may show NOASSERTION)
  - `oss/entries/shopify-theme-tools.md` (MIT)
  - `oss/entries/shopify-liquid.md` (MIT)
  - `oss/entries/microsoft-playwright.md` (Apache-2.0)
  - `oss/entries/lost-pixel-lost-pixel.md` (MIT)
- Added GitHub API metadata JSON entries for all 5 repos:
  - `oss/entries/shopify-theme-check.json`, `oss/entries/shopify-theme-tools.json`, `oss/entries/shopify-liquid.json`, `oss/entries/microsoft-playwright.json`, `oss/entries/lost-pixel-lost-pixel.json`
- Updated artifacts:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added quality-gates row)
  - `artifacts/summary.md` (added Tranche 12 section)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- The “managed storefront” posture needs a *three-layer* safety net:
  - lint/validation (Theme Check + theme tooling)
  - functional smoke tests (Playwright)
  - visual diffs for upgrades (Lost Pixel)
- Shopify-maintained tooling frequently has “license metadata mismatches” on GitHub (NOASSERTION) even when LICENSE files are permissive; proof links are essential.
- Visual regression testing adds major upgrade confidence, but only if we enforce deterministic fixtures (no PII, stable data, stable fonts/viewports).

## 🧭 What changes because of this

- We can define a concrete “preview gating” pipeline for storefront generation:
  - generate → lint/validate → deploy preview → run smoke tests → run visual diffs → promote
- Template upgrades become safer and more repeatable (diff-driven approvals instead of “trust me” deploys).
- We have permissive-license primitives for all three layers without needing a commercial visual testing vendor.

## ➡️ Next step

- Next tranche: harvest “template/versioning + release channel” primitives (N=5) for generated storefronts:
  - template versioning/migrations
  - preview environments and promotion flows
  - artifact storage + diff review UX
  - optional: accessibility/performance budgets in CI

## 🔗 Links / references

- `oss/entries/shopify-theme-check.md`
- `oss/entries/microsoft-playwright.md`
- `oss/entries/lost-pixel-lost-pixel.md`
- `artifacts/summary.md`
- `artifacts/sources.md`

---

### 0024_checkpoint-tranche-13-template-versioning-promotion-primitives-changesets-release-please-argo-rollouts-lighthouse-ci-sitespeed-io-artifacts-updated.md

---
step: 0024
created_at: "2025-12-30 18:37"
title: "Checkpoint: Tranche 13 template versioning/promotion primitives (Changesets/release-please/Argo Rollouts/Lighthouse CI/sitespeed.io) + artifacts updated"
---

# Step 0024: Checkpoint: Tranche 13 template versioning/promotion primitives (Changesets/release-please/Argo Rollouts/Lighthouse CI/sitespeed.io) + artifacts updated

## ✅ What I did (facts)

- Deepened Tranche 13 (N=5) “template versioning + promotion primitives” with concrete adoption plans + license notes:
  - `oss/entries/changesets-changesets.md` (MIT)
  - `oss/entries/googleapis-release-please.md` (Apache-2.0)
  - `oss/entries/argoproj-argo-rollouts.md` (Apache-2.0)
  - `oss/entries/googlechrome-lighthouse-ci.md` (Apache-2.0)
  - `oss/entries/sitespeedio-sitespeed.io.md` (MIT)
- Added GitHub API metadata JSON entries for all 5 repos:
  - `oss/entries/changesets-changesets.json`
  - `oss/entries/googleapis-release-please.json`
  - `oss/entries/argoproj-argo-rollouts.json`
  - `oss/entries/googlechrome-lighthouse-ci.json`
  - `oss/entries/sitespeedio-sitespeed.io.json`
- Updated artifacts:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added versioning/promotion + performance budgets rows)
  - `artifacts/summary.md` (added Tranche 13 section)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- To make “generated storefronts” safe to operate at scale, we need two parallel tracks:
  - code/template versioning with human-readable release notes (Changesets / release-please)
  - operational promotion/rollback discipline (K8s-grade via Argo Rollouts, or modeled similarly in non-K8s deploy stacks)
- Performance budgets need to be treated like test failures (Lighthouse CI / sitespeed.io) and attached to promotion approvals.
- This tranche stays permissive (MIT/Apache) while covering the key missing gaps: release notes, promotion gates, rollback posture, and perf regression prevention.

## 🧭 What changes because of this

- We now have an end-to-end operating model for managed storefront upgrades:
  - version templates → generate preview → run quality gates → attach perf reports → approve promotion → support rollback
- Template upgrades become “product releases” (with changelogs) rather than ad hoc diffs.
- We can make “what version is merchant X on?” a first-class platform concept backed by release metadata.

## ➡️ Next step

- Next tranche: harvest “upgrade/migration primitives” (N=5) that help merge template updates into merchant-customized storefronts safely:
  - file-ownership manifests + patch application strategies
  - diff review UX primitives
  - config-driven overrides (avoid forks)
  - automated PR generation + approval workflows

## 🔗 Links / references

- `oss/entries/changesets-changesets.md`
- `oss/entries/googleapis-release-please.md`
- `oss/entries/googlechrome-lighthouse-ci.md`
- `artifacts/summary.md`
- `artifacts/sources.md`

---

### 0025_checkpoint-tranche-14-upgrade-migration-primitives-kustomize-ytt-chezmoi-diff-match-patch-create-pull-request-artifacts-updated.md

---
step: 0025
created_at: "2025-12-30 18:43"
title: "Checkpoint: Tranche 14 upgrade/migration primitives (Kustomize/ytt/chezmoi/diff-match-patch/create-pull-request) + artifacts updated"
---

# Step 0025: Checkpoint: Tranche 14 upgrade/migration primitives (Kustomize/ytt/chezmoi/diff-match-patch/create-pull-request) + artifacts updated

## ✅ What I did (facts)

- Deepened Tranche 14 (N=5) “upgrade/migration primitives” with concrete adoption plans + license notes:
  - `oss/entries/kubernetes-sigs-kustomize.md` (Apache-2.0)
  - `oss/entries/carvel-dev-ytt.md` (Apache-2.0)
  - `oss/entries/twpayne-chezmoi.md` (MIT)
  - `oss/entries/google-diff-match-patch.md` (Apache-2.0)
  - `oss/entries/peter-evans-create-pull-request.md` (MIT)
- Added GitHub API metadata JSON entries for all 5 repos:
  - `oss/entries/kubernetes-sigs-kustomize.json`
  - `oss/entries/carvel-dev-ytt.json`
  - `oss/entries/twpayne-chezmoi.json`
  - `oss/entries/google-diff-match-patch.json`
  - `oss/entries/peter-evans-create-pull-request.json`
- Updated artifacts:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added upgrade/migration row)
  - `artifacts/summary.md` (added Tranche 14 section)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- The “upgrade problem” is structurally identical to dotfiles and config package management:
  - keep a base source-of-truth
  - allow local overrides
  - apply upgrades safely with conflict detection
- A scalable approach likely needs a hybrid:
  - overlay model (Kustomize/ytt concepts) for controlled customization
  - patch engine (diff-match-patch) for best-effort upgrades on drifted repos
  - automated PR workflow (create-pull-request) to make changes auditable and reviewable
- Kustomize/ytt are best treated as conceptual primitives unless we already have a config/package layer that matches them.

## 🧭 What changes because of this

- We now have a concrete blueprint for “template upgrades without clobbering merchant edits”:
  - define ownership boundaries and overlays
  - generate upgrade PRs automatically
  - run CI quality gates (Theme Check / Playwright / Lost Pixel / Lighthouse CI)
  - require explicit approval on conflicts or large diffs
- This makes “managed upgrades” a realistic operational loop rather than a manual project.

## ➡️ Next step

- Next tranche: harvest “diff review + conflict UX + file ownership manifest” repos (N=5) that can power an internal Upgrade Review UI:
  - high-quality diff viewers (text + structured)
  - conflict summarizers
  - patch application tooling in JS/TS contexts
  - artifact storage/report viewers

## 🔗 Links / references

- `oss/entries/kubernetes-sigs-kustomize.md`
- `oss/entries/google-diff-match-patch.md`
- `oss/entries/peter-evans-create-pull-request.md`
- `artifacts/summary.md`
- `artifacts/sources.md`

---

### 0026_checkpoint-tranche-15-diff-review-ux-primitives-diff2html-jsdiff-react-diff-viewer-codemirror-merge-monaco-artifacts-updated.md

---
step: 0026
created_at: "2025-12-30 18:48"
title: "Checkpoint: Tranche 15 diff review UX primitives (diff2html/jsdiff/react-diff-viewer/CodeMirror Merge/Monaco) + artifacts updated"
---

# Step 0026: Checkpoint: Tranche 15 diff review UX primitives (diff2html/jsdiff/react-diff-viewer/CodeMirror Merge/Monaco) + artifacts updated

## ✅ What I did (facts)

- Deepened Tranche 15 (N=5) “diff review UX primitives” with concrete adoption plans + license notes:
  - `oss/entries/rtfpessoa-diff2html.md` (MIT)
  - `oss/entries/kpdecker-jsdiff.md` (BSD-3-Clause)
  - `oss/entries/praneshr-react-diff-viewer.md` (MIT)
  - `oss/entries/codemirror-merge.md` (MIT)
  - `oss/entries/microsoft-monaco-editor.md` (MIT)
- Created `oss/entries/*.json` metadata files for the tranche (manual source due to GitHub API 403):
  - `oss/entries/rtfpessoa-diff2html.json`
  - `oss/entries/kpdecker-jsdiff.json`
  - `oss/entries/praneshr-react-diff-viewer.json`
  - `oss/entries/codemirror-merge.json`
  - `oss/entries/microsoft-monaco-editor.json`
- Updated artifacts:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added Upgrade Review UI row)
  - `artifacts/summary.md` (added Tranche 15 section)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- The diff UX stack should be layered:
  - unified diffs → diff2html for “PR-like” review
  - snippet diffs → react-diff-viewer/jsdiff for quick summaries
  - conflict resolution → CodeMirror Merge or Monaco only if we truly want in-product edits
- Security/redaction is the biggest risk: diffs can leak secrets/PII unless we enforce strict file allowlists and scrub sensitive values.
- GitHub API access can be intermittent (403); using raw LICENSE files + manual JSON keeps the run auditable without blocking progress.

## 🧭 What changes because of this

- We now have all building blocks for an internal Upgrade Review UI:
  - render diffs
  - show per-file summaries
  - optionally support guided conflict resolution
- This makes “managed template upgrades” support-friendly:
  - support can see exactly what changed and what tests/perf artifacts say
  - engineering only steps in when conflicts are real
- The next step can shift from harvesting to designing the v1 Upgrade Review UI spec and wiring it to the upgrade PR pipeline.

## ➡️ Next step

- Next tranche: harvest “artifact/report viewers + test result UIs” (N=5) so upgrade reviews can attach:
  - visual diffs (screenshots)
  - performance reports
  - E2E traces
  - lint output

  (Alternatively: draft a concrete Upgrade Review UI v1 spec with data model, redaction rules, and RBAC.)

## 🔗 Links / references

- `oss/entries/rtfpessoa-diff2html.md`
- `oss/entries/codemirror-merge.md`
- `oss/entries/microsoft-monaco-editor.md`
- `artifacts/build-vs-buy.md`
- `artifacts/sources.md`

---

### 0027_checkpoint-tranche-16-artifact-report-viewers-allure2-reportportal-unlighthouse-pixelmatch-reg-suit-artifacts-updated.md

---
step: 0027
created_at: "2025-12-30 18:53"
title: "Checkpoint: Tranche 16 artifact/report viewers (Allure2/ReportPortal/Unlighthouse/pixelmatch/reg-suit) + artifacts updated"
---

# Step 0027: Checkpoint: Tranche 16 artifact/report viewers (Allure2/ReportPortal/Unlighthouse/pixelmatch/reg-suit) + artifacts updated

## ✅ What I did (facts)

- Deepened Tranche 16 (N=5) “artifact/report viewers” with concrete adoption plans + license notes:
  - `oss/entries/allure-framework-allure2.md` (Apache-2.0)
  - `oss/entries/reportportal-reportportal.md` (Apache-2.0)
  - `oss/entries/harlan-zw-unlighthouse.md` (MIT)
  - `oss/entries/mapbox-pixelmatch.md` (ISC)
  - `oss/entries/reg-viz-reg-suit.md` (MIT)
- Created manual `oss/entries/*.json` metadata files for the tranche (GitHub API was returning 403):
  - `oss/entries/allure-framework-allure2.json`
  - `oss/entries/reportportal-reportportal.json`
  - `oss/entries/harlan-zw-unlighthouse.json`
  - `oss/entries/mapbox-pixelmatch.json`
  - `oss/entries/reg-viz-reg-suit.json`
- Updated artifacts:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added artifact/report viewer row)
  - `artifacts/summary.md` (added Tranche 16 section)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- “Upgrade evidence” needs to be linkable and durable:
  - PR checks alone aren’t enough for support/ops unless we store and surface artifacts (screenshots, traces, perf reports).
- There’s a clear split between:
  - lightweight/static report bundles (Allure) — lower ops, easier linking
  - heavy centralized platforms (ReportPortal) — higher ops, better analytics at scale
- Performance tooling only works well when we lock down determinism:
  - route allowlists, stable fixtures, and strict “no PII in artifacts” rules are mandatory.

## 🧭 What changes because of this

- We can now design an “Upgrade Evidence” bundle schema:
  - test report URL(s)
  - visual diff artifacts
  - perf report artifacts
  - links attached to upgrade PRs and internal audit events
- This supports a support-friendly, auditable promotion workflow (“why was this upgrade approved?”).

## ➡️ Next step

- Next tranche: define and harvest “artifact storage + access control patterns” (N=3–5):
  - how we store artifacts (paths, retention)
  - how we redact and authorize access
  - how we expose them in admin UI (signed URLs, expiry, role-based access)

  (Optional alternative: write a concrete “Upgrade Evidence v1” spec and data model.)

## 🔗 Links / references

- `oss/entries/allure-framework-allure2.md`
- `oss/entries/harlan-zw-unlighthouse.md`
- `oss/entries/mapbox-pixelmatch.md`
- `artifacts/build-vs-buy.md`
- `artifacts/sources.md`

---

### 0028_checkpoint-tranche-17-artifact-storage-access-control-redaction-seaweedfs-lakefs-oauth2-proxy-gitleaks-imgproxy-artifacts-updated.md

---
step: 0028
created_at: "2025-12-30 18:58"
title: "Checkpoint: Tranche 17 artifact storage/access control/redaction (SeaweedFS/lakeFS/oauth2-proxy/Gitleaks/imgproxy) + artifacts updated"
---

# Step 0028: Checkpoint: Tranche 17 artifact storage/access control/redaction (SeaweedFS/lakeFS/oauth2-proxy/Gitleaks/imgproxy) + artifacts updated

## ✅ What I did (facts)

- Deepened Tranche 17 (N=5) “artifact storage + access control + redaction prevention” with concrete adoption plans + verified license notes:
  - `oss/entries/chrislusf-seaweedfs.md` (Apache-2.0)
  - `oss/entries/treeverse-lakefs.md` (Apache-2.0)
  - `oss/entries/oauth2-proxy-oauth2-proxy.md` (MIT text in LICENSE)
  - `oss/entries/zricethezav-gitleaks.md` (MIT)
  - `oss/entries/imgproxy-imgproxy.md` (MIT)
- Created manual `oss/entries/*.json` metadata files for the tranche (GitHub API returning 403):
  - `oss/entries/chrislusf-seaweedfs.json`
  - `oss/entries/treeverse-lakefs.json`
  - `oss/entries/oauth2-proxy-oauth2-proxy.json`
  - `oss/entries/zricethezav-gitleaks.json`
  - `oss/entries/imgproxy-imgproxy.json`
- Updated artifacts:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added access control + redaction prevention row)
  - `artifacts/summary.md` (added Tranche 17 section)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- The “evidence” problem needs three independent controls:
  - access control for viewers (oauth2-proxy)
  - prevention gates (Gitleaks before diffs/artifacts exist)
  - careful artifact serving (signed URLs, thumbnails, and indexing controls)
- Artifact storage itself is usually not the first bottleneck (S3 is fine early); the first bottleneck is privacy and access governance.
- “Own storage” options (SeaweedFS) and “versioned object storage” options (lakeFS) are powerful but introduce meaningful ops overhead; best adopted only when scale or compliance requires it.

## 🧭 What changes because of this

- We have a concrete blueprint for safely linking upgrade evidence to support/ops:
  - protect viewers via oauth2-proxy (IdP-backed auth)
  - scan template + client repos for secrets pre-PR (Gitleaks)
  - serve screenshot artifacts via signed URLs/thumbnails (imgproxy optional)
- This closes a key operational gap: upgrades become auditable and shareable without relying on “trust the engineer” or public CI links.

## ➡️ Next step

- Next tranche: harvest “policy + audit for access” primitives (N=3–5) to make artifact access auditable:
  - access logs and event timeline modeling
  - policy engines for fine-grained authorization
  - redaction/masking tooling for screenshots and logs

## 🔗 Links / references

- `oss/entries/oauth2-proxy-oauth2-proxy.md`
- `oss/entries/zricethezav-gitleaks.md`
- `oss/entries/imgproxy-imgproxy.md`
- `artifacts/build-vs-buy.md`
- `artifacts/sources.md`

---

### 0029_checkpoint-tranche-18-policy-auditability-stack-otel-collector-contrib-pomerium-ory-oathkeeper-keto-artifacts-updated.md

---
step: 0029
created_at: "2025-12-30 19:03"
title: "Checkpoint: Tranche 18 policy + auditability stack (OTel Collector/Contrib, Pomerium, Ory Oathkeeper/Keto) + artifacts updated"
---

# Step 0029: Checkpoint: Tranche 18 policy + auditability stack (OTel Collector/Contrib, Pomerium, Ory Oathkeeper/Keto) + artifacts updated

## ✅ What I did (facts)

- Deepened Tranche 18 (N=5) “policy + auditability” repos with adoption plans + verified license notes:
  - `oss/entries/open-telemetry-opentelemetry-collector.md` (Apache-2.0)
  - `oss/entries/open-telemetry-opentelemetry-collector-contrib.md` (Apache-2.0)
  - `oss/entries/pomerium-pomerium.md` (Apache-2.0)
  - `oss/entries/ory-oathkeeper.md` (Apache-2.0)
  - `oss/entries/ory-keto.md` (Apache-2.0)
- Created manual `oss/entries/*.json` metadata for the tranche (GitHub API returning 403):
  - `oss/entries/open-telemetry-opentelemetry-collector.json`
  - `oss/entries/open-telemetry-opentelemetry-collector-contrib.json`
  - `oss/entries/pomerium-pomerium.json`
  - `oss/entries/ory-oathkeeper.json`
  - `oss/entries/ory-keto.json`
- Updated artifacts:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added access policy + auditability row)
  - `artifacts/summary.md` (added Tranche 18 section)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- “Artifact evidence” isn’t safe unless access is:
  - authenticated (who are you?)
  - authorized (should you see this merchant’s evidence?)
  - logged (did you access it?)
- The clean architecture is layered:
  - edge/gateway policy (Pomerium or Oathkeeper) for viewer access
  - app-level authorization (Casbin/OPA/OpenFGA/Keto) if per-merchant rules are complex
  - centralized access logs (OTel Collector) with early redaction before persistence
- Zanzibar-style authz (Keto/OpenFGA) is likely overkill until we truly need delegation/sharing semantics; Casbin-style RBAC remains the “fast start”.

## 🧭 What changes because of this

- We now have an end-to-end “access is auditable” blueprint for evidence links:
  - protect viewers with an IAP/gateway
  - standardize access log schema and export it through OTel
  - store and review access logs in an internal timeline for compliance/support
- This makes upgrade evidence safe to share inside the org (support/ops) without creating an uncontrolled PII surface.

## ➡️ Next step

- Next tranche: harvest “redaction/masking for screenshots and logs” primitives (N=3–5):
  - image masking (dynamic regions)
  - log scrubbing/redaction libs and processors
  - policies for what is allowed to be stored as an artifact

## 🔗 Links / references

- `oss/entries/pomerium-pomerium.md`
- `oss/entries/open-telemetry-opentelemetry-collector.md`
- `oss/entries/ory-keto.md`
- `artifacts/build-vs-buy.md`
- `artifacts/sources.md`

---

### 0030_checkpoint-tranche-19-redaction-masking-presidio-pino-sharp-node-canvas-jimp-artifacts-updated.md

---
step: 0030
created_at: "2025-12-30 19:09"
title: "Checkpoint: Tranche 19 redaction/masking (Presidio/Pino/sharp/node-canvas/Jimp) + artifacts updated"
---

# Step 0030: Checkpoint: Tranche 19 redaction/masking (Presidio/Pino/sharp/node-canvas/Jimp) + artifacts updated

## ✅ What I did (facts)

- Deepened Tranche 19 (N=5) “redaction/masking” primitives with concrete adoption plans + license notes:
  - `oss/entries/microsoft-presidio.md` (MIT)
  - `oss/entries/pinojs-pino.md` (MIT)
  - `oss/entries/lovell-sharp.md` (Apache-2.0)
  - `oss/entries/automattic-node-canvas.md` (MIT via package.json)
  - `oss/entries/jimp-dev-jimp.md` (MIT)
- Created manual `oss/entries/*.json` metadata (GitHub API was returning 403):
  - `oss/entries/microsoft-presidio.json`
  - `oss/entries/pinojs-pino.json`
  - `oss/entries/lovell-sharp.json`
  - `oss/entries/automattic-node-canvas.json`
  - `oss/entries/jimp-dev-jimp.json`
- Updated artifacts:
  - `artifacts/oss-candidates.md` (added repos + deepened pointers)
  - `artifacts/build-vs-buy.md` (added redaction/masking row)
  - `artifacts/summary.md` (added Tranche 19 section)
  - `artifacts/sources.md` (added license proof links)
  - `progress-log.md` (logged tranche completion)

## 🧠 What I learned (new information)

- The safest “evidence privacy” posture is prevention-first:
  - redact at the source (Pino) and keep fixtures PII-free, then use detectors/scrubbers (Presidio) as a safety net.
- Screenshot artifacts require a “mask before upload” rule; if you store unmasked originals, you already lost (PII leakage).
- Masking needs a stable contract:
  - fixed viewports + known page templates + mask region configs (and a workflow for mask drift when templates change).
- node-canvas enables advanced masking (blur/mosaic/labels) but adds native dependency friction; sharp/Jimp cover most needs with less cost.

## 🧭 What changes because of this

- “Upgrade Evidence v1” is now realistically shareable to support/ops if we enforce:
  - redacted logs + masked screenshots + strict access controls
  - evidence bundle metadata that records what masking/redaction rules were applied.
- Redaction/masking becomes a mandatory pipeline stage (not optional) before artifact storage and before diff/report viewers.

## ➡️ Next step

- Next tranche: harvest additional “mask drift + redaction policy” primitives (N=3–5):
  - DOM-selector driven mask extraction (Playwright → coordinates)
  - masking ruleset formats and enforcement tooling
  - artifact allowlist/denylist policies (what is allowed to be stored)

## 🔗 Links / references

- `oss/entries/pinojs-pino.md`
- `oss/entries/lovell-sharp.md`
- `oss/entries/microsoft-presidio.md`
- `artifacts/build-vs-buy.md`
- `artifacts/sources.md`

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
