---
status: draft
last_reviewed: 2025-12-28
owner: agent
---

# Summary (Step 04 — OSS Harvesting “Cool Code”)

## ✅ 1-line headline

Built an initial **OSS top-20 longlist** (admin scaffolding + CMS + feature flags + analytics + search) and generated **GitHub metadata entries** to accelerate vetting.

## 🧭 Stage

Research (candidate pool built; tranche-1 deepening started)

## 🔎 Tranche 1 deep dives completed (N=5)

1) Unleash (Apache-2.0) — feature flags — Recommendation: integrate
2) Casbin (Apache-2.0) — RBAC/ABAC enforcement — Recommendation: integrate (library) + build policy UX
3) Temporal (MIT) — durable workflow engine — Recommendation: integrate if we have at least one “must be durable” workflow; consider buying ops (Temporal Cloud)
4) GrowthBook (MIXED: MIT + GrowthBook Enterprise License) — experiments + flags — Recommendation: treat as mixed-license; only adopt if required surfaces are MIT-licensed
5) Activepieces (MIXED: MIT + EE directories) — workflow automation — Recommendation: good for internal ops; mixed-license + secrets/governance risk if merchant-facing

## 🔎 Tranche 2 deep dives completed (N=5)

1) OPA (Apache-2.0) — policy engine (policy-as-code) — Recommendation: consider if we want complex ABAC/policy gates; heavier UX than Casbin
2) OpenFGA (Apache-2.0) — Zanzibar-style authz service — Recommendation: good if we anticipate complex sharing/delegation; adds service/ops overhead
3) OpenSearch (Apache-2.0) — index/query backend — Recommendation: strong option for audit/event querying if we accept ops cost
4) OpenSearch Dashboards (Apache-2.0) — event viewer UI — Recommendation: great internal ops viewer paired with OpenSearch; keep merchant UX separate
5) Nango (ELv2 restrictive) — OAuth connector platform — Recommendation: “flag only” for managed-service use; borrow patterns or buy

## 🔎 Tranche 3 deep dives completed (N=5)

1) Graphile Worker (MIT) — Postgres job queue — Recommendation: strong “integration runtime” primitive with minimal infra
2) pg-boss (MIT) — Postgres job queue — Recommendation: similar value; pick one to avoid duplication
3) pgaudit (PostgreSQL License) — DB auditing extension — Recommendation: optional compliance/forensics layer (not a product audit log replacement)
4) jsondiffpatch (MIT) — JSON diff/patch — Recommendation: high-leverage “diff view” primitive for audit history UI
5) ClickHouse (Apache-2.0) — OLAP analytics DB — Recommendation: great for event/audit analytics at scale; likely later-stage

## 🔎 Tranche 4 deep dives completed (N=5)

1) Svix Webhooks (MIT) — outbound webhook sending service — Recommendation: strong delivery component or reference patterns (signing/retries/logs)
2) Convoy (ELv2 restrictive) — webhook gateway — Recommendation: “flag only” for managed-service use; borrow patterns
3) go-playground/webhooks (MIT) — inbound webhook parsing/validation — Recommendation: useful for Go ingestion services; patterns for verification/adapters
4) adnanh/webhook (MIT) — webhook trigger server — Recommendation: internal-only ops tooling (dangerous if exposed)
5) smee-client (ISC) — webhook dev proxy client — Recommendation: adopt as dev tooling pattern + build replay UI in our system

## 🔎 Tranche 5 deep dives completed (N=5)

1) ntfy (Apache-2.0) — push notifications via HTTP topics — Recommendation: low-friction internal ops alerting
2) Apprise (BSD-2-Clause) — unified notification dispatch — Recommendation: cheap multi-channel alerting primitive
3) Gotify (MIT) — self-hosted notifications server + UI — Recommendation: internal notifications channel (ops/support)
4) Novu (MIT) — full notification platform + inbox — Recommendation: high leverage if merchant-facing inbox/prefs are core; heavier ops
5) Karrio (LGPL-3.0 + EE directory) — shipping APIs abstraction — Recommendation: patterns are valuable; production adoption requires license review + PII/ops diligence

## 🔎 Tranche 6 deep dives completed (N=5)

1) React Admin (MIT) — admin UI scaffolding — Recommendation: fast custom admin for CRUD-heavy surfaces
2) Refine (MIT) — admin UI scaffolding — Recommendation: flexible admin “frontend platform” for internal tools and dashboards
3) Appsmith (Apache-2.0) — low-code internal tools builder — Recommendation: great internal ops consoles (strict governance required)
4) Payload (MIT) — CMS + admin panel — Recommendation: content ops for storefront generation/templates
5) Strapi (MIXED) — CMS + admin panel — Recommendation: content ops option if we can scope away from `ee/` and confirm licensing

## 🔎 Tranche 7 deep dives completed (N=5)

1) Superset (Apache-2.0) — BI dashboards/exploration — Recommendation: strong internal audit/event analytics tool (service to operate)
2) Redash (BSD-2) — SQL dashboards — Recommendation: internal “query library” for support investigations
3) Grafana (AGPL-3.0) — observability dashboards — Recommendation: flag for license; still valuable internal ops patterns
4) Metabase (AGPL-3.0) — BI exploration — Recommendation: flag for license; useful for prototyping internal investigations
5) Matomo (GPL-3.0) — web analytics — Recommendation: flag for license + scope mismatch; patterns only unless analytics is core

## 🔎 Tranche 8 deep dives completed (N=5)

1) PostHog (MIXED) — events explorer UX — Recommendation: borrow UX/event modeling patterns; mixed-license + heavy platform footprint
2) Supabase (Apache-2.0) — control-plane dashboard UX — Recommendation: borrow patterns for logs/settings and multi-project admin
3) Directus (BUSL-1.1) — activity log + revisions UX — Recommendation: flag (source-available); patterns only unless approved
4) Appwrite (BSD-3) — console UX patterns — Recommendation: borrow patterns for projects/keys/logs with safe defaults
5) Umami (MIT) — analytics dashboards UX — Recommendation: lightweight internal admin telemetry option + useful reporting patterns

## 🔎 Tranche 9 deep dives completed (N=5)

Note: these are UI primitives (not “platform repos”). Metadata came from npm registry + license files due to GitHub API rate limits.

1) TanStack Table (MIT) — data grid primitive — Recommendation: integrate for “audit/event viewer” tables
2) TanStack Virtual (MIT) — virtualization primitive — Recommendation: integrate to keep event/audit pages snappy at large scale
3) react-virtuoso (MIT) — virtualized list/table components — Recommendation: consider as an alternative to TanStack Virtual for faster MVP
4) React Query Builder (MIT) — filter/query builder UI — Recommendation: integrate for “advanced filters” UX (saved views, shareable filters)
5) React JSON View (MIT) — JSON inspector — Recommendation: integrate for payload inspection (with strict redaction rules)

## 🔎 Tranche 10 deep dives completed (N=5)

Focus: OSS commerce builders/headless commerce platforms to mine feature checklists + architecture patterns for “we generate storefronts for merchant clients and manage the app”.

1) Medusa (MIT) — Node/TS headless commerce platform — Recommendation: patterns/reference (TS-native); only adopt as core if we expand beyond Shopify
2) Saleor (BSD-3) — GraphQL-first commerce API + admin — Recommendation: patterns/reference + feature checklist; adoption implies Python/Django ops
3) Sylius (MIT) — Symfony/PHP ecommerce framework — Recommendation: patterns/reference; note trademark/logo terms
4) Bagisto (MIT) — Laravel/PHP ecommerce platform — Recommendation: patterns/reference for “store builder” feature surface
5) Solidus (BSD-3-Clause-like) — Rails ecommerce framework — Recommendation: patterns/reference for mature ops flows; license text should be confirmed as BSD-3-Clause equivalent

## 🔎 Tranche 11 deep dives completed (N=5)

Focus: Shopify-first storefront generation + scaffolding patterns (templates, sections/blocks, deploy workflows).

1) Hydrogen (MIT) — Shopify-first custom storefront framework — Recommendation: strong foundation for “generated storefronts” (template + deploy pipeline)
2) Dawn (MIT per LICENSE.md) — Shopify reference theme (OS 2.0) — Recommendation: mine theme/sections schema patterns for merchant-safe customization
3) Vercel Commerce (MIT) — Next.js commerce storefront starter — Recommendation: use as template/pattern repo; Shopify provider patterns are especially relevant
4) Saleor Storefront (BSD-3) — Next.js + GraphQL storefront — Recommendation: patterns/reference for GraphQL storefront structure and commerce UX
5) Shopify CLI (MIT) — official scaffolding + dev/deploy workflows — Recommendation: use as the operational backbone/pattern source for “scaffold → preview → deploy”

## 🔎 Tranche 12 deep dives completed (N=5)

Focus: storefront generator primitives to keep generated storefronts safe to ship and safe to upgrade (validation, CI quality gates, smoke tests, visual diffs).

1) Theme Check (MIT per LICENSE.md) — theme linter — Recommendation: add as a required CI/deploy gate for generated Shopify themes
2) Shopify Theme Tools (MIT) — Liquid/theme tooling — Recommendation: use for editor/CI validation patterns; optionally reuse as libraries
3) Liquid (MIT) — template engine semantics — Recommendation: treat as ground truth for validation and edge-case correctness
4) Playwright (Apache-2.0) — E2E testing + screenshots — Recommendation: standardize storefront smoke tests + preview gating
5) Lost Pixel (MIT) — visual regression — Recommendation: add screenshot diffs for template upgrades and prevent accidental UI regressions

## 🔎 Tranche 13 deep dives completed (N=5)

Focus: template versioning + release channel/promotion primitives for generated storefronts (release notes, upgrade safety, rollback discipline, performance budgets).

1) Changesets (MIT) — template versioning + changelogs — Recommendation: use as the backbone for versioned storefront templates and upgrade notes
2) release-please (Apache-2.0) — automated release PRs — Recommendation: automate template/tooling releases and keep them auditable
3) Argo Rollouts (Apache-2.0) — progressive delivery (K8s) — Recommendation: adopt only if storefront hosting is Kubernetes-based; otherwise use as patterns for promotion/rollback modeling
4) Lighthouse CI (Apache-2.0) — performance budgets in CI — Recommendation: gate template upgrades on LCP/CLS/perf/SEO regressions
5) sitespeed.io (MIT) — repeatable performance testing — Recommendation: expand perf gating beyond Lighthouse with more customizable runs and trend tracking

## 🔎 Tranche 14 deep dives completed (N=5)

Focus: upgrade/migration primitives so we can apply template updates to merchant storefront repos without clobbering local edits (no-forks customization, patching, automated upgrade PRs).

1) Kustomize (Apache-2.0) — overlays/patch model — Recommendation: borrow the “base + overlays” model for template upgrades; use directly for config-like assets if needed
2) ytt (Apache-2.0) — templating + overlays + validation — Recommendation: use for config-driven overrides and safe customization boundaries (avoid forks)
3) chezmoi (MIT) — apply-template-to-customized-target patterns — Recommendation: mine upgrade/conflict UX patterns for our own upgrade engine
4) diff-match-patch (Apache-2.0) — diff/patch algorithms — Recommendation: use as a core primitive for best-effort patch application in upgrade tooling
5) create-pull-request (MIT) — automated PRs — Recommendation: operationalize template upgrades via repeatable PR creation + CI gating + audit trail

## 🔎 Tranche 15 deep dives completed (N=5)

Focus: diff review UX + conflict summarization primitives for an internal “Upgrade Review UI” (show diffs, attach artifacts, and optionally support guided resolution).

1) diff2html (MIT) — unified diff → HTML renderer — Recommendation: best default for rendering upgrade PR diffs in our admin
2) jsdiff (BSD-3-Clause) — text diff engine — Recommendation: use for per-file summaries and inline snippet diffs
3) react-diff-viewer (MIT) — React diff component — Recommendation: use for inline “before/after” diffs of key files
4) CodeMirror Merge (MIT) — merge/diff editor UI — Recommendation: optional for guided conflict resolution (support/engineers)
5) Monaco Editor (MIT) — diff editor foundation — Recommendation: heavier but powerful base if we commit to in-product editing/merge tooling

## 🔎 Tranche 16 deep dives completed (N=5)

Focus: artifact/report viewers so upgrade PRs and internal admin can attach “evidence” (tests, perf reports, visual diffs) for promotion approvals.

1) Allure 2 (Apache-2.0) — test report viewer — Recommendation: standardize test report bundles and link them from upgrade PRs/audit events (strict PII rules)
2) ReportPortal (Apache-2.0) — test results analytics platform — Recommendation: consider only if we want fleet-wide test analytics; heavy ops vs static reports
3) Unlighthouse (MIT) — Lighthouse runner + results UI — Recommendation: multi-page perf exploration for template upgrades (route allowlists)
4) pixelmatch (ISC) — image diff primitive — Recommendation: use as a low-level engine if we want to own screenshot diff generation and thresholds
5) reg-suit (MIT) — visual regression workflow — Recommendation: optional alternative/complement to Lost Pixel for screenshot diff artifacts and reporting

## 🔎 Tranche 17 deep dives completed (N=5)

Focus: artifact storage + access control + redaction prevention so upgrade evidence links can be safely shared to support/ops without leaking secrets or PII.

1) SeaweedFS (Apache-2.0) — distributed object/file storage — Recommendation: consider if artifact volume/cost requires owning storage; otherwise stick with S3
2) lakeFS (Apache-2.0) — versioned object storage semantics — Recommendation: patterns/reference unless we explicitly want “provenance” and branching for evidence bundles
3) oauth2-proxy (MIT) — auth proxy for internal UIs — Recommendation: integrate as default protection layer for artifact/report viewers and internal tools
4) Gitleaks (MIT) — secret scanning — Recommendation: integrate in template + client repo upgrade pipeline to prevent secrets reaching diffs/artifacts
5) imgproxy (MIT) — signed image proxy — Recommendation: optional service to serve screenshot artifacts safely (thumbnails + signed URLs) if raw signed S3 URLs aren’t enough

## 🔎 Tranche 18 deep dives completed (N=5)

Focus: policy + auditability of access (who can view which evidence) and a path to fine-grained authorization and access logs for artifacts and internal tools.

1) OpenTelemetry Collector (Apache-2.0) — telemetry/log pipeline — Recommendation: use to normalize/export artifact access logs and enforce early redaction
2) OTel Collector Contrib (Apache-2.0) — receivers/processors/exporters — Recommendation: use for practical log ingestion + redaction + exports
3) Pomerium (Apache-2.0) — identity-aware proxy — Recommendation: adopt when oauth2-proxy isn’t enough and we need policy-rich internal access control
4) Ory Oathkeeper (Apache-2.0) — auth gateway — Recommendation: optional standardized authn/authz gateway pattern in front of viewers
5) Ory Keto (Apache-2.0) — Zanzibar-style authz — Recommendation: escalation path for complex per-merchant access/delegation rules

## 🔎 Tranche 19 deep dives completed (N=5)

Focus: redaction/masking so evidence artifacts (logs, screenshots, reports) are safe to store and safe to share to support/ops.

1) Presidio (MIT) — PII detection + anonymization — Recommendation: scrub text logs/attachments as a safety net; pair with “no PII in fixtures” policy
2) Pino (MIT) — structured logging with redaction — Recommendation: redact secrets/PII at source in Node services before logs ever reach artifacts
3) sharp (Apache-2.0) — image processing — Recommendation: mask screenshot regions before upload and before visual diffs
4) node-canvas (MIT via package.json) — canvas processing — Recommendation: optional for advanced masking (blur/mosaic/labels) if sharp overlays are insufficient
5) Jimp (MIT) — pure-JS image processing — Recommendation: CI-friendly masking fallback when native deps are painful

## 🔎 Tranche 20 deep dives completed (N=5)

Focus: mask drift + evidence policy enforcement (make “safe evidence” testable and automatic, and detect when template changes break masking rules).

1) Conftest (Apache-2.0) — policy tests for configs/artifacts — Recommendation: enforce evidence bundle allowlists/denylists and “no unmasked screenshots” as a CI gate
2) git-secrets (Apache-2.0) — git hook secret scanning — Recommendation: lightweight extra guardrail to prevent secrets from entering diffs during upgrades
3) Puppeteer (Apache-2.0) — browser automation — Recommendation: generate selector→bounding-box mask coords and detect mask drift automatically
4) Cypress (MIT) — E2E + artifacts — Recommendation: optional alternative harness for selector stability checks and evidence artifact generation
5) Kyverno (Apache-2.0) — policy violation report patterns — Recommendation: patterns/reference unless we are K8s-heavy; borrow UX for exemption/violation reporting

## 🔎 Tranche 21 deep dives completed (N=5)

Focus: schema validation + linting primitives for evidence manifests and mask rules (reduce drift and make policy enforcement deterministic).

1) CUE (Apache-2.0) — schema + generation constraints — Recommendation: adopt if we want schema-first contracts for evidence bundles/mask rules/template manifests
2) Ajv (MIT) — JSON Schema validation — Recommendation: fastest TS-native schema gate for evidence bundle correctness
3) Spectral (Apache-2.0) — JSON/YAML lint rules — Recommendation: add readable lint feedback for evidence/mask manifests in PRs
4) yq (MIT) — YAML/JSON transforms — Recommendation: use to normalize evidence manifests/config in CI without brittle scripts
5) gjson (MIT) — fast JSON query (Go) — Recommendation: optional helper for fast manifest checks in Go tooling/services

## 🧩 Top 20 OSS candidates (ranked; include license notes)

1) https://github.com/marmelab/react-admin — License: MIT — Covers: admin scaffolding — Thin-slice: scaffold a “Orders + Customers” admin in 1 day
2) https://github.com/refinedev/refine — License: MIT — Covers: admin scaffolding — Thin-slice: wire to Supabase + generate CRUD for 2–3 entities
3) https://github.com/Unleash/unleash — License: Apache-2.0 — Covers: feature flags — Thin-slice: flags for “new checkout flow” + rollout rules
4) https://github.com/Flagsmith/flagsmith — License: BSD-3-Clause — Covers: feature flags/remote config — Thin-slice: per-tenant flag sets + audit log
5) https://github.com/payloadcms/payload — License: MIT — Covers: content ops — Thin-slice: content blocks + media library slice
6) https://github.com/appsmithorg/appsmith — License: Apache-2.0 — Covers: internal tools — Thin-slice: internal ops dashboard for support triage
7) https://github.com/pocketbase/pocketbase — License: MIT — Covers: lightweight backend sidecar — Thin-slice: prototype a small internal service
8) https://github.com/appwrite/appwrite — License: BSD-3-Clause — Covers: backend primitives — Thin-slice: borrow patterns for auth/files/permissions
9) https://github.com/growthbook/growthbook — License: MIXED (MIT + GrowthBook Enterprise License) — Covers: experimentation/flags — Thin-slice: confirm desired surfaces are MIT-licensed, then run 1 experiment end-to-end
10) https://github.com/PostHog/posthog — License: verify — Covers: analytics/replay/flags — Thin-slice: event capture + session replay for admin usage
11) https://github.com/n8n-io/n8n — License: verify — Covers: automation/workflows — Thin-slice: 1 integration workflow (Shopify → Slack/Notion)
12) https://github.com/meilisearch/meilisearch — License: verify — Covers: search — Thin-slice: product search index + typo-tolerant search
13) https://github.com/metabase/metabase — License: verify — Covers: BI dashboards — Thin-slice: internal “KPIs” dashboard from Postgres
14) https://github.com/airbytehq/airbyte — License: verify — Covers: ELT connectors — Thin-slice: 1 connector pipeline (Shopify → warehouse)
15) https://github.com/supabase/supabase — License: Apache-2.0 — Covers: backend primitives — Thin-slice: reuse patterns/tools, not necessarily product
16) https://github.com/ToolJet/ToolJet — License: AGPL-3.0 — Covers: internal tools — Thin-slice: likely “flag only” due to license
17) https://github.com/typesense/typesense — License: GPL-3.0 — Covers: search — Thin-slice: likely “flag only” due to license
18) https://github.com/Budibase/budibase — License: verify — Covers: internal tools — Thin-slice: license check first
19) https://github.com/strapi/strapi — License: verify — Covers: CMS — Thin-slice: license check first
20) https://github.com/directus/directus — License: verify — Covers: data+admin UI — Thin-slice: license check first

## 🧭 Updated guidance (what’s shaping up)

- Feature flags: integrate (Unleash/Flagsmith) and keep a wrapper boundary.
- Authz: Casbin is the best “vibe-coding friendly” start; OPA/OpenFGA are the escalation paths if requirements outgrow it.
- Audit logs: we likely build the canonical UX/API, but OpenSearch(+Dashboards) is a viable engine/viewer for internal ops and fast querying.
- Integration connectors: the best “pattern repo” (Nango) is license-restrictive (ELv2); treat as ideas/patterns or buy a managed vendor.
- Integration runtime: prefer Postgres-backed job queues (Graphile Worker / pg-boss) before adopting a full workflow engine, then graduate to Temporal for durability when needed.
- Audit UX: jsondiffpatch enables field-level change diffs; pair with strict redaction and an audit event schema to avoid leaking secrets/PII.
- Webhooks: the missing “must-have” capabilities are signing, retries, delivery logs, and replay; Svix is a good component/pattern source, while ELv2 webhook gateways (Convoy) are likely not adoptable in a managed-service context.
- Notifications: ops alerting can be solved cheaply (ntfy/Gotify/Apprise). Merchant-facing notifications/inbox likely needs a full platform (Novu) or a buy option; treat licensing and ops footprint as first-class constraints.
- Admin scaffolding: React Admin/Refine are the “permissive + fast” options for building our own merchant/support admin. Appsmith is best for internal ops dashboards when we want speed and can enforce strict access controls.

## ⚡ Top 5 quick wins (integration-ready)

- React Admin → ship a basic admin shell (orders/customers/products) — fastest integration path
- Refine → ship CRUD + auth wiring for multi-tenant admin — strong DX
- Unleash/Flagsmith → ship feature flags + staged rollouts — low effort, high leverage
- Payload CMS → ship content ops for marketing pages and admin content — avoids reinventing CMS
- Meilisearch (if license ok) → ship fast on-site search — immediate CRO leverage

## 🧱 Top 5 platform primitives we likely must build

- Tenant model + permissions/RBAC — must match our exact data model
- Audit log + “who changed what” — must be ubiquitous and consistent
- Domain event pipeline (jobs/queues) — needs tight coupling to our workflows
- Integration connectors (Shopify/webhooks) — we need our exact connector set + reliability
- Admin “workflow engine” (human steps + approvals) — likely custom even if we borrow patterns

## ❓ Open questions (licensing/hosting)

1) Are GPL/AGPL repos allowed, or should they be “flag only”?
2) Are we willing to self-host heavier systems (Airbyte/PostHog), or do we prefer lighter primitives?

## 📍 Where outputs live

- OSS candidates: `artifacts/oss-candidates.md`
- Build vs buy: `artifacts/build-vs-buy.md`
- Sources: `artifacts/sources.md`
 - GitHub repo list: `artifacts/github-repos.txt`
 - Generated repo entries: `oss/entries/`
