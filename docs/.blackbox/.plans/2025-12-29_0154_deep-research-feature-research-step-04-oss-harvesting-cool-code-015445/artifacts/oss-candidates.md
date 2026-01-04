---
status: draft
last_reviewed: 2025-12-28
owner: agent
---

# OSS Candidates (Longlist → Winners)

Purpose: build a large OSS pool quickly, then deepen only winners.

## 1) Longlist (50–150)

Format:
- Repo — License — What it gives us (1 line) — Feature bucket(s) — Notes

- https://github.com/marmelab/react-admin — MIT — React admin UI framework — Admin / operations — Fast to scaffold internal admin panels
- https://github.com/refinedev/refine — MIT — React framework for admin apps (data providers, auth, routing) — Admin / operations — Good “vibe coding” scaffolding
- https://github.com/appsmithorg/appsmith — Apache-2.0 — Low-code internal tools builder — Admin / operations — Consider for internal ops tooling; self-hostable
- https://github.com/Budibase/budibase — NOASSERTION — Low-code internal tools builder — Admin / operations — Verify license before adopting
- https://github.com/ToolJet/ToolJet — AGPL-3.0 — Low-code internal tools builder — Admin / operations — License is restrictive; likely “flag, don’t adopt” unless approved

- https://github.com/payloadcms/payload — MIT — Node/TS CMS + admin panel — Content / SEO — Great fit if we need content ops UI
- https://github.com/strapi/strapi — NOASSERTION — Headless CMS + admin panel — Content / SEO — Verify licensing model; very common
- https://github.com/directus/directus — NOASSERTION — Data platform + admin UI — Content / SEO + Admin / ops — Verify license; powerful “admin for your DB”

- https://github.com/Unleash/unleash — Apache-2.0 — Feature flags server — Platform primitives — Strong OSS primitive (server required)
- https://github.com/Flagsmith/flagsmith — BSD-3-Clause — Feature flags + remote config — Platform primitives — OSS + hosted options
- https://github.com/growthbook/growthbook — MIXED (MIT + GrowthBook Enterprise License) — Experimentation + feature flags — Analytics / experiments — Mixed-license repo; verify the exact surfaces we’d run/modify are MIT-licensed

- https://github.com/casbin/casbin — Apache-2.0 — Authorization library (RBAC/ABAC) — RBAC / permissions — Strong “primitive”; we still build the policy UX
- https://github.com/openfga/openfga — Apache-2.0 — Zanzibar-style authorization service — RBAC / permissions — Great for complex sharing/delegation; heavier than a library
- https://github.com/open-policy-agent/opa — Apache-2.0 — Policy-as-code engine (Rego) — RBAC / permissions + governance — Powerful; harder “admin UX” story than Casbin
- https://github.com/temporalio/temporal — MIT — Durable workflow engine — Workflow engine — High leverage for reliable async business processes (ops cost)
- https://github.com/activepieces/activepieces — MIXED (MIT + EE directories) — Workflow automation (Zapier/n8n-like) — Admin / operations + connectors — Great for internal ops tooling; mixed license + secrets/governance risk
- https://github.com/NangoHQ/nango — ELv2 (restrictive) — OAuth integration connector platform — Integration connectors — Likely “flag only” for managed-service use; still great for patterns

- https://github.com/opensearch-project/OpenSearch — Apache-2.0 — Search + indexing engine — Audit logs / event viewer + search — Useful for fast event queries; ops-heavy
- https://github.com/opensearch-project/OpenSearch-Dashboards — Apache-2.0 — OpenSearch visualization UI — Audit logs / event viewer — Great internal ops viewer if we adopt OpenSearch

- https://github.com/graphile/worker — MIT — Postgres-backed job queue — Integration runtime — Great “managed app” primitive without extra infra
- https://github.com/timgit/pg-boss — MIT — Postgres-backed job queue — Integration runtime — Similar value; pick one to avoid duplication
- https://github.com/pgaudit/pgaudit — PostgreSQL License — Postgres audit extension — Audit logs — DB-level auditing/compliance layer (not a product audit log replacement)
- https://github.com/benjamine/jsondiffpatch — MIT — JSON diff/patch + HTML formatting — Audit logs — Strong “diff view” primitive for “what changed?”
- https://github.com/ClickHouse/ClickHouse — Apache-2.0 — OLAP/event analytics DB — Audit/event analytics — Great at scale; probably later-stage

- https://github.com/TanStack/table — MIT — Headless table (sorting/filtering/pagination/selection) — Audit viewer UI / Admin UX — Great “data grid” primitive without lock-in (`@tanstack/react-table`)
- https://github.com/TanStack/virtual — MIT — Virtualization for large lists/grids — Audit viewer UI / Admin UX — Pair with TanStack Table for large audit/event datasets (`@tanstack/react-virtual`)
- https://github.com/petyosi/react-virtuoso — MIT — Virtualized list/table w/ good defaults — Audit viewer UI / Admin UX — Strong alternative to hand-rolled virtualization (`react-virtuoso`)
- https://github.com/react-querybuilder/react-querybuilder — MIT — Query builder UI (filters) — Audit viewer UI / Admin UX — Fast “advanced filters” for audit/event viewer (`react-querybuilder`)
- https://github.com/uiwjs/react-json-view — MIT — JSON viewer + collapsible inspector — Audit viewer UI / Admin UX — Great for “event payload” inspection w/ redaction (`@uiw/react-json-view`)

- https://github.com/svix/svix-webhooks — MIT — Webhook sending service — Webhooks / integrations — Solid reference + potential delivery component
- https://github.com/frain-dev/convoy — ELv2 (restrictive) — Webhook gateway — Webhooks / integrations — “Flag only” for managed-service use; good patterns
- https://github.com/go-playground/webhooks — MIT — Inbound webhook parsing/validation library — Webhooks / integrations — Useful for Go ingestion services; patterns for verification/adapters
- https://github.com/adnanh/webhook — MIT — Lightweight webhook trigger server — Ops tooling — Internal-only utility; dangerous if exposed
- https://github.com/probot/smee-client — ISC — Webhook dev proxy client — Dev tooling — Useful “webhook debugging kit” pattern

- https://github.com/binwiederhier/ntfy — Apache-2.0 — Simple push notifications via HTTP — Ops alerting — Great for internal alert routing (webhook failures, DLQs)
- https://github.com/caronc/apprise — BSD-2-Clause — Unified notifications library — Ops alerting — Fast multi-channel alerting without a heavy platform
- https://github.com/gotify/server — MIT — Self-hosted notifications server + UI — Ops alerting — Strong internal notification channel
- https://github.com/novuhq/novu — MIT — Notifications platform + inbox — Notifications — Heavy but high leverage if we need merchant-facing inbox/prefs
- https://github.com/karrioapi/karrio — LGPL-3.0 — Shipping APIs abstraction — Integration connectors — Useful patterns; license/ops/PII risk

- https://github.com/marmelab/react-admin — MIT — React admin UI framework — Admin scaffolding — Strong CRUD scaffolding; fastest path to a custom admin
- https://github.com/refinedev/refine — MIT — React framework for admin apps — Admin scaffolding — Flexible “headless” architecture; strong DX
- https://github.com/appsmithorg/appsmith — Apache-2.0 — Low-code internal tools builder — Admin / operations — Great for internal ops consoles (guardrails needed)
- https://github.com/payloadcms/payload — MIT — TS-first CMS + admin panel — Content ops — Strong fit for storefront content/template management
- https://github.com/strapi/strapi — MIXED (MIT + `ee/` paths) — Headless CMS + admin — Content ops — Scope to MIT-only surfaces; license confirm up front

- https://github.com/Shopify/hydrogen — MIT — Shopify-first custom storefront framework — Storefront generation — Strong backbone for a “generated storefront template” system
- https://github.com/Shopify/dawn — MIT (see LICENSE.md) — Shopify reference theme (OS 2.0) — Storefront generation — Best place to mine “sections/blocks schema” patterns
- https://github.com/vercel/commerce — MIT — Next.js commerce storefront starter — Storefront generation — Great template/pattern repo; includes Shopify provider patterns
- https://github.com/saleor/storefront — BSD-3-Clause — Next.js + GraphQL storefront — Storefront generation — Strong GraphQL-first patterns; useful even if Shopify-first
- https://github.com/Shopify/cli — MIT — Official Shopify dev CLI (apps/themes/Hydrogen) — Storefront/app ops — Critical source for “scaffold → preview → deploy” automation patterns

- https://github.com/Shopify/theme-check — MIT (see LICENSE.md) — Shopify theme linter — Storefront generator primitives — CI quality gate for generated themes
- https://github.com/Shopify/theme-tools — MIT — Shopify Liquid/theme tooling (parser/LSP/lint/format) — Storefront generator primitives — Good source for editor + CI validation patterns
- https://github.com/Shopify/liquid — MIT — Liquid template engine — Storefront generator primitives — Ground-truth semantics for template validation
- https://github.com/microsoft/playwright — Apache-2.0 — E2E browser testing — Storefront generator primitives — Smoke tests + visual snapshots for preview gating
- https://github.com/lost-pixel/lost-pixel — MIT — Visual regression testing — Storefront generator primitives — Template upgrade safety via screenshot diffs

- https://github.com/changesets/changesets — MIT — Versioning + changelogs for templates — Storefront generator primitives — Makes template upgrades auditable and reviewable
- https://github.com/googleapis/release-please — Apache-2.0 — Release automation (release PRs) — Storefront generator primitives — Automates template/tooling releases + changelogs
- https://github.com/argoproj/argo-rollouts — Apache-2.0 — Progressive delivery for K8s — Release channels / rollout ops — Use if storefront hosting is Kubernetes-based; otherwise patterns-only
- https://github.com/GoogleChrome/lighthouse-ci — Apache-2.0 — Lighthouse budgets in CI — Storefront generator primitives — Performance/SEO gating for template changes
- https://github.com/sitespeedio/sitespeed.io — MIT — Web performance testing — Storefront generator primitives — Repeatable perf regression detection for previews and upgrades

- https://github.com/kubernetes-sigs/kustomize — Apache-2.0 — Overlay/patch customization model — Upgrade/migration primitives — “No forks” customization + safer base template upgrades
- https://github.com/carvel-dev/ytt — Apache-2.0 — Templating + overlays + validation — Upgrade/migration primitives — Config-driven overrides with predictable merge semantics
- https://github.com/twpayne/chezmoi — MIT — Apply-template-to-customized-target patterns — Upgrade/migration primitives — Great inspiration for upgrade workflows and conflict UX
- https://github.com/google/diff-match-patch — Apache-2.0 — Diff/patch algorithms — Upgrade/migration primitives — Best-effort patch application when repos drift
- https://github.com/peter-evans/create-pull-request — MIT — Automated PR creation — Upgrade/migration primitives — Core building block for “template upgrade PRs” at scale

- https://github.com/rtfpessoa/diff2html — MIT — Render git/unified diffs to HTML — Diff review UX — Core primitive for an internal “Upgrade Review UI”
- https://github.com/kpdecker/jsdiff — BSD-3-Clause — Text diff library — Diff review UX — Good for diff summaries and snippet comparisons
- https://github.com/praneshr/react-diff-viewer — MIT — React diff component — Diff review UX — Fast inline “before/after” diffs for key files
- https://github.com/codemirror/merge — MIT — Merge/diff editor UI — Diff review UX — Useful for guided conflict resolution flows
- https://github.com/microsoft/monaco-editor — MIT — In-browser editor + diff editor — Diff review UX — Foundation for advanced in-product diff/merge tooling

- https://github.com/allure-framework/allure2 — Apache-2.0 — Test report viewer + artifacts — Artifact/report viewers — Linkable evidence for upgrade PRs (screenshots/traces/logs)
- https://github.com/reportportal/reportportal — Apache-2.0 — Test results analytics platform — Artifact/report viewers — Fleet-wide quality/trends (heavier ops)
- https://github.com/harlan-zw/unlighthouse — MIT — Lighthouse runner + results UI — Artifact/report viewers — Multi-page perf exploration for template upgrades
- https://github.com/mapbox/pixelmatch — ISC — Image diff primitive — Artifact/report viewers — Build/own screenshot diff generation and thresholds
- https://github.com/reg-viz/reg-suit — MIT — Visual regression workflow — Artifact/report viewers — Alternative/complement to Lost Pixel for screenshot diffs + reporting

- https://github.com/chrislusf/seaweedfs — Apache-2.0 — Distributed object/file store — Artifact storage + retention — Own/scale artifact storage for upgrade evidence bundles (infra-heavy)
- https://github.com/treeverse/lakeFS — Apache-2.0 — Versioned object storage (“git for data”) — Artifact provenance — Strong provenance model for evidence bundles; heavy platform
- https://github.com/oauth2-proxy/oauth2-proxy — MIT — Auth proxy for internal UIs — Access control — Protect artifact viewers and deep links behind OAuth/OIDC
- https://github.com/zricethezav/gitleaks — MIT — Secret scanning — Redaction prevention — Prevent secrets from entering repos/diffs/reports/artifacts
- https://github.com/imgproxy/imgproxy — MIT — Image proxy w/ signed URLs — Artifact serving — Thumbnails + signed access for screenshot diff artifacts

- https://github.com/open-telemetry/opentelemetry-collector — Apache-2.0 — Telemetry pipeline — Policy/auditability — Normalize and export artifact access logs as an auditable event stream
- https://github.com/open-telemetry/opentelemetry-collector-contrib — Apache-2.0 — Extra receivers/processors/exporters — Policy/auditability — Practical ingestion + redaction processors for proxy/app logs
- https://github.com/pomerium/pomerium — Apache-2.0 — Identity-aware proxy — Policy/auditability — Fine-grained internal tool access control + access logs
- https://github.com/ory/oathkeeper — Apache-2.0 — Auth gateway/proxy — Policy/auditability — Standardized authn/authz gateway in front of artifact viewers
- https://github.com/ory/keto — Apache-2.0 — Zanzibar-style authz service — Policy/auditability — Escalation path for complex per-merchant access/delegation rules

- https://github.com/microsoft/presidio — MIT — PII detection + anonymization — Redaction/masking — Scrub text logs and report attachments before storage
- https://github.com/pinojs/pino — MIT — Structured logging with redaction — Redaction/masking — Prevent secrets/PII from entering logs at source (Node services)
- https://github.com/lovell/sharp — Apache-2.0 — High-perf image processing — Redaction/masking — Mask screenshot regions before upload (reduce PII + noise)
- https://github.com/Automattic/node-canvas — MIT (package.json) — Canvas image processing — Redaction/masking — Advanced masking (blur/mosaic/labels) if needed
- https://github.com/jimp-dev/jimp — MIT — Pure-JS image processing — Redaction/masking — CI-friendly masking without native deps

- https://github.com/open-policy-agent/conftest — Apache-2.0 — Policy tests for configs/artifacts — Mask drift + policy enforcement — Enforce evidence bundle allowlists/denylists and “no unmasked screenshots” gates
- https://github.com/awslabs/git-secrets — Apache-2.0 — Secret scanning via git hooks — Mask drift + policy enforcement — Lightweight secret prevention complement to Gitleaks for templates/client repos
- https://github.com/puppeteer/puppeteer — Apache-2.0 — Browser automation — Mask drift + policy enforcement — Selector→bounding-box extraction to regenerate mask coords
- https://github.com/cypress-io/cypress — MIT — E2E testing + artifacts — Mask drift + policy enforcement — Alternative harness for selector stability + evidence artifacts
- https://github.com/kyverno/kyverno — Apache-2.0 — Policy reporting patterns (K8s) — Mask drift + policy enforcement — Patterns for human-friendly violation reports/exemptions

- https://github.com/cue-lang/cue — Apache-2.0 — Constraint language (schema + generation) — Schema/policy primitives — Define and validate evidence bundles/mask rules/template manifests schema-first
- https://github.com/ajv-validator/ajv — MIT — JSON Schema validator — Schema/policy primitives — Fast schema validation for evidence bundles and mask rules in TS pipelines
- https://github.com/stoplightio/spectral — Apache-2.0 — JSON/YAML linter — Schema/policy primitives — Human-friendly lint rules for evidence manifests and policy conventions
- https://github.com/mikefarah/yq — MIT — YAML/JSON CLI transforms — Schema/policy primitives — Normalize/transform evidence manifests and configs in CI
- https://github.com/tidwall/gjson — MIT — Fast JSON query (Go) — Schema/policy primitives — Lightweight manifest checks/enrichment in Go tooling

- https://github.com/apache/superset — Apache-2.0 — BI dashboards/exploration — Audit/event investigations — Strong internal analytics tool for event/audit tables
- https://github.com/getredash/redash — BSD-2-Clause — SQL dashboards — Audit/event investigations — Great internal “query library” for support/ops
- https://github.com/grafana/grafana — AGPL-3.0 — Observability dashboards/alerts — Ops dashboards — Flag (copyleft); still valuable patterns
- https://github.com/metabase/metabase — AGPL-3.0 — BI exploration dashboards — Audit/event investigations — Flag (copyleft); useful for prototyping patterns
- https://github.com/matomo-org/matomo — GPL-3.0 — Web analytics platform — Admin analytics — Flag (copyleft); scope mismatch for audit viewer

- https://github.com/PostHog/posthog — MIXED (MIT + `ee/` paths) — Product analytics/events explorer — Audit/event viewer UX patterns — Great patterns; mixed-license + heavy footprint
- https://github.com/supabase/supabase — Apache-2.0 — Platform dashboard UX — Admin/log viewer patterns — Strong “control-plane UI” reference
- https://github.com/directus/directus — BUSL-1.1 — Data platform + admin UI — Audit/activity log patterns — Flag (source-available); patterns only unless approved
- https://github.com/appwrite/appwrite — BSD-3-Clause — Platform + console UI — Control-plane UX patterns — Good inspiration for keys/logs/project modeling
- https://github.com/umami-software/umami — MIT — Analytics dashboards — Admin telemetry UX patterns — Lightweight internal analytics option

- https://github.com/PostHog/posthog — NOASSERTION — Product analytics + session replay + flags — Analytics / experiments — Huge surface area; check license + hosting cost
- https://github.com/metabase/metabase — NOASSERTION — BI dashboards — Analytics / experiments — Great internal analytics; verify license terms

- https://github.com/meilisearch/meilisearch — NOASSERTION — Fast search engine — Merchandising / CRO — Great for onsite search; verify license
- https://github.com/typesense/typesense — GPL-3.0 — Search engine — Merchandising / CRO — GPL may be a blocker; “flag only”

- https://github.com/n8n-io/n8n — NOASSERTION — Workflow automation — Admin / operations — Great for integrations; verify license + self-host footprint
- https://github.com/airbytehq/airbyte — NOASSERTION — ELT connector library — Platform primitives — Heavy, but huge leverage if we need pipelines; verify license

- https://github.com/supabase/supabase — Apache-2.0 — Backend primitives (Postgres, auth, storage) — Platform primitives — Relevant patterns, even if we already use Supabase
- https://github.com/appwrite/appwrite — BSD-3-Clause — OSS backend platform primitives — Platform primitives — Alternative patterns; possibly for specific modules
- https://github.com/pocketbase/pocketbase — MIT — Lightweight backend-in-a-binary — Platform primitives — Good for prototypes / sidecar services

- https://github.com/medusajs/medusa — MIT — Headless commerce platform (Node/TS) — Commerce / storefront generation — Strong competitor/reference; TS-native; heavy if adopted as core
- https://github.com/saleor/saleor — BSD-3-Clause — Headless commerce API (GraphQL, Python/Django) — Commerce / storefront generation — Great feature surface + admin reference; stack mismatch if adopted
- https://github.com/Sylius/Sylius — MIT — Ecommerce framework (PHP/Symfony) — Commerce / storefront generation — Great domain reference; stack mismatch
- https://github.com/bagisto/bagisto — MIT — Ecommerce platform (PHP/Laravel) — Commerce / storefront generation — “Batteries included” store builder reference
- https://github.com/solidusio/solidus — BSD-3-Clause-like — Ecommerce framework (Ruby/Rails) — Commerce / storefront generation — Mature ops patterns; stack mismatch

## 2) Winners deepened (top ~20)

Use `docs/07-templates/library/templated/oss-research-step.md` as the deepening structure.

- Unleash — deepened: `oss/entries/unleash-unleash.md`
- Casbin — deepened: `oss/entries/casbin-casbin.md`
- Temporal — deepened: `oss/entries/temporalio-temporal.md`
- GrowthBook — deepened (mixed license): `oss/entries/growthbook-growthbook.md`
- Activepieces — deepened (mixed license): `oss/entries/activepieces-activepieces.md`
- OPA — deepened: `oss/entries/open-policy-agent-opa.md`
- OpenFGA — deepened: `oss/entries/openfga-openfga.md`
- OpenSearch — deepened: `oss/entries/opensearch-project-opensearch.md`
- OpenSearch Dashboards — deepened: `oss/entries/opensearch-project-opensearch-dashboards.md`
- Nango — deepened (ELv2 restrictive): `oss/entries/nangohq-nango.md`
- Graphile Worker — deepened: `oss/entries/graphile-worker.md`
- pg-boss — deepened: `oss/entries/timgit-pg-boss.md`
- pgaudit — deepened: `oss/entries/pgaudit-pgaudit.md`
- jsondiffpatch — deepened: `oss/entries/benjamine-jsondiffpatch.md`
- ClickHouse — deepened: `oss/entries/clickhouse-clickhouse.md`
- Svix Webhooks — deepened: `oss/entries/svix-svix-webhooks.md`
- Convoy — deepened (ELv2 restrictive): `oss/entries/frain-dev-convoy.md`
- go-playground/webhooks — deepened: `oss/entries/go-playground-webhooks.md`
- adnanh/webhook — deepened: `oss/entries/adnanh-webhook.md`
- smee-client — deepened: `oss/entries/probot-smee-client.md`
- ntfy — deepened: `oss/entries/binwiederhier-ntfy.md`
- Apprise — deepened: `oss/entries/caronc-apprise.md`
- Gotify — deepened: `oss/entries/gotify-server.md`
- Novu — deepened: `oss/entries/novuhq-novu.md`
- Karrio — deepened (LGPL): `oss/entries/karrioapi-karrio.md`
- React Admin — deepened: `oss/entries/marmelab-react-admin.md`
- Refine — deepened: `oss/entries/refinedev-refine.md`
- Appsmith — deepened: `oss/entries/appsmithorg-appsmith.md`
- Payload — deepened: `oss/entries/payloadcms-payload.md`
- Strapi — deepened (mixed license): `oss/entries/strapi-strapi.md`
- Superset — deepened: `oss/entries/apache-superset.md`
- Redash — deepened: `oss/entries/getredash-redash.md`
- Grafana — deepened (AGPL flag): `oss/entries/grafana-grafana.md`
- Metabase — deepened (AGPL flag): `oss/entries/metabase-metabase.md`
- Matomo — deepened (GPL flag): `oss/entries/matomo-org-matomo.md`
- PostHog — deepened (mixed license): `oss/entries/posthog-posthog.md`
- Supabase — deepened: `oss/entries/supabase-supabase.md`
- Directus — deepened (BUSL flag): `oss/entries/directus-directus.md`
- Appwrite — deepened: `oss/entries/appwrite-appwrite.md`
- Umami — deepened: `oss/entries/umami-software-umami.md`
- Medusa — deepened: `oss/entries/medusajs-medusa.md`
- Saleor — deepened: `oss/entries/saleor-saleor.md`
- Sylius — deepened: `oss/entries/sylius-sylius.md`
- Bagisto — deepened: `oss/entries/bagisto-bagisto.md`
- Solidus — deepened: `oss/entries/solidusio-solidus.md`
- TanStack Table — deepened: `oss/entries/tanstack-table.md`
- TanStack Virtual — deepened: `oss/entries/tanstack-virtual.md`
- react-virtuoso — deepened: `oss/entries/petyosi-react-virtuoso.md`
- React Query Builder — deepened: `oss/entries/react-querybuilder-react-querybuilder.md`
- React JSON View — deepened: `oss/entries/uiwjs-react-json-view.md`
- Hydrogen — deepened: `oss/entries/shopify-hydrogen.md`
- Dawn — deepened: `oss/entries/shopify-dawn.md`
- Vercel Commerce — deepened: `oss/entries/vercel-commerce.md`
- Saleor Storefront — deepened: `oss/entries/saleor-storefront.md`
- Shopify CLI — deepened: `oss/entries/shopify-cli.md`
- Theme Check — deepened: `oss/entries/shopify-theme-check.md`
- Theme Tools — deepened: `oss/entries/shopify-theme-tools.md`
- Liquid — deepened: `oss/entries/shopify-liquid.md`
- Playwright — deepened: `oss/entries/microsoft-playwright.md`
- Lost Pixel — deepened: `oss/entries/lost-pixel-lost-pixel.md`
- Changesets — deepened: `oss/entries/changesets-changesets.md`
- release-please — deepened: `oss/entries/googleapis-release-please.md`
- Argo Rollouts — deepened: `oss/entries/argoproj-argo-rollouts.md`
- Lighthouse CI — deepened: `oss/entries/googlechrome-lighthouse-ci.md`
- sitespeed.io — deepened: `oss/entries/sitespeedio-sitespeed.io.md`
- Kustomize — deepened: `oss/entries/kubernetes-sigs-kustomize.md`
- ytt — deepened: `oss/entries/carvel-dev-ytt.md`
- chezmoi — deepened: `oss/entries/twpayne-chezmoi.md`
- diff-match-patch — deepened: `oss/entries/google-diff-match-patch.md`
- create-pull-request — deepened: `oss/entries/peter-evans-create-pull-request.md`
- diff2html — deepened: `oss/entries/rtfpessoa-diff2html.md`
- jsdiff — deepened: `oss/entries/kpdecker-jsdiff.md`
- react-diff-viewer — deepened: `oss/entries/praneshr-react-diff-viewer.md`
- CodeMirror Merge — deepened: `oss/entries/codemirror-merge.md`
- Monaco Editor — deepened: `oss/entries/microsoft-monaco-editor.md`
- Allure 2 — deepened: `oss/entries/allure-framework-allure2.md`
- ReportPortal — deepened: `oss/entries/reportportal-reportportal.md`
- Unlighthouse — deepened: `oss/entries/harlan-zw-unlighthouse.md`
- pixelmatch — deepened: `oss/entries/mapbox-pixelmatch.md`
- reg-suit — deepened: `oss/entries/reg-viz-reg-suit.md`
- SeaweedFS — deepened: `oss/entries/chrislusf-seaweedfs.md`
- lakeFS — deepened: `oss/entries/treeverse-lakefs.md`
- oauth2-proxy — deepened: `oss/entries/oauth2-proxy-oauth2-proxy.md`
- Gitleaks — deepened: `oss/entries/zricethezav-gitleaks.md`
- imgproxy — deepened: `oss/entries/imgproxy-imgproxy.md`
- OpenTelemetry Collector — deepened: `oss/entries/open-telemetry-opentelemetry-collector.md`
- OTel Collector Contrib — deepened: `oss/entries/open-telemetry-opentelemetry-collector-contrib.md`
- Pomerium — deepened: `oss/entries/pomerium-pomerium.md`
- Ory Oathkeeper — deepened: `oss/entries/ory-oathkeeper.md`
- Ory Keto — deepened: `oss/entries/ory-keto.md`
- Presidio — deepened: `oss/entries/microsoft-presidio.md`
- Pino — deepened: `oss/entries/pinojs-pino.md`
- sharp — deepened: `oss/entries/lovell-sharp.md`
- node-canvas — deepened: `oss/entries/automattic-node-canvas.md`
- Jimp — deepened: `oss/entries/jimp-dev-jimp.md`
- Conftest — deepened: `oss/entries/open-policy-agent-conftest.md`
- git-secrets — deepened: `oss/entries/awslabs-git-secrets.md`
- Puppeteer — deepened: `oss/entries/puppeteer-puppeteer.md`
- Cypress — deepened: `oss/entries/cypress-io-cypress.md`
- Kyverno — deepened: `oss/entries/kyverno-kyverno.md`
- CUE — deepened: `oss/entries/cue-lang-cue.md`
- Ajv — deepened: `oss/entries/ajv-validator-ajv.md`
- Spectral — deepened: `oss/entries/stoplightio-spectral.md`
- yq — deepened: `oss/entries/mikefarah-yq.md`
- gjson — deepened: `oss/entries/tidwall-gjson.md`
