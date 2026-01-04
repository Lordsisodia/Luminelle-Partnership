---
status: draft
last_reviewed: 2025-12-28
owner: agent
---

# Build vs Integrate vs Buy (Top 10 Needs)

Purpose: prevent premature building when a cheap integration exists.

## Table

| Need | Best OSS options (1–3) | Cheapest buy alternative | Recommendation | Why (1 line) |
| --- | --- | --- | --- | --- |
| Feature flags + staged rollouts | Unleash (Apache-2.0), Flagsmith (BSD-3) | LaunchDarkly / ConfigCat | integrate | High leverage + low integration complexity; permissive OSS exists |
| RBAC / permissions enforcement | Casbin (Apache-2.0), OPA (Apache-2.0) | Auth0 FGA / Oso Cloud | integrate | Authorization evaluation is a solved primitive; we still build the admin UX |
| Fine-grained / relationship-based permissions | OpenFGA (Apache-2.0) | Auth0 FGA | integrate (if needed) | Best if we anticipate complex sharing/delegation; heavier than Casbin |
| Durable workflow engine (long-running processes) | Temporal (MIT) | Temporal Cloud / AWS Step Functions | integrate (or buy ops) | Reliability gains are huge; biggest cost is operating it |
| Workflow automation for internal ops (Zapier-like) | Activepieces (mixed), n8n (SUL), Windmill (GPL) | Zapier / Make / Pipedream | buy or “internal-only integrate” | OSS options often have restrictive/mixed licenses; security/governance is the real cost |
| Experimentation (A/B testing + analysis) | GrowthBook (mixed), PostHog (license verify) | Statsig / Optimizely | defer or buy | Experimentation requires analytics pipeline + governance; mixed licensing complicates OSS adoption |
| Audit log storage + event viewer | OpenSearch + Dashboards (Apache-2.0) | Datadog / Honeycomb + custom viewer | build + integrate | We likely build the canonical audit log UX/API; OpenSearch can power fast queries and internal dashboards |
| OAuth integration connector platform | Nango (ELv2) | Merge.dev / Apideck | flag (license) | Very useful capability, but ELv2 is likely incompatible with offering as a managed service; copy patterns or buy |
| Background jobs / connector runtime (Postgres-first) | Graphile Worker (MIT), pg-boss (MIT) | Cloud task queues (SQS/Cloud Tasks) | integrate | Great for managed-app integrations; simplest “no new infra” path if we already use Postgres |
| Audit log “diff view” (what changed) | jsondiffpatch (MIT) | Build custom | integrate | Small library with huge UX leverage; must add redaction rules |
| Audit/event viewer UI primitives (table + virtualization + filters + JSON) | TanStack Table + Virtual (MIT), react-virtuoso (MIT), React Query Builder (MIT) | Retool / Datadog notebooks | integrate | Fastest path to a “product-grade” audit/event viewer UX without adopting a full BI platform |
| DB-level auditing (compliance/forensics) | pgaudit (PostgreSQL License) | Cloud provider audit logs | integrate (optional) | Good forensic safety net; not a replacement for business audit events |
| Event/audit analytics at scale | ClickHouse (Apache-2.0) | BigQuery/Snowflake | defer / integrate later | High leverage for long retention + aggregations, but ops-heavy for early stage |
| Outbound webhook delivery platform | Svix Webhooks (MIT) | Hookdeck / Zapier / custom | integrate or build | If webhook delivery is core, a dedicated component can provide retries, signing, logs, replay; otherwise build minimal via job queue |
| Webhook gateway (managed-service) | Convoy (ELv2) | Hookdeck | flag (license) | ELv2 likely conflicts with offering as a managed service; borrow patterns if not adoptable |
| Inbound webhook dev proxy + replay | smee-client (ISC) | ngrok + custom scripts | integrate | Speeds local integration development; pair with secure payload storage + replay in staging |
| Ops alerting (simple, self-hosted) | ntfy (Apache-2.0), Gotify (MIT) | PagerDuty/Slack | integrate | Fast internal alerts for webhook failures/DLQs; don’t send PII |
| Unified notification dispatch (multi-channel) | Apprise (BSD-2) | Courier/Knock | integrate | Cheap “one interface to many channels” for ops messaging |
| Full notifications + in-app inbox | Novu (MIT) | Courier/Knock/Customer.io | integrate or buy | High leverage if merchant-facing notifications/prefs are core; heavier ops footprint |
| Admin UI scaffolding (custom admin apps) | Refine (MIT), React Admin (MIT) | Retool (buy) / internal build | integrate | Fastest path to a custom admin UI if we have a stable API contract; still requires server-side authz + audit |
| Storefront scaffolding / generated storefront templates (Shopify-first) | Hydrogen (MIT), Dawn (MIT), Vercel Commerce (MIT) | Shopify theme ecosystem / agency builds | integrate (templates) | Treat these as template/pattern sources to standardize our storefront generation pipeline (preview, deploy, upgrades) |
| Storefront generator quality gates (lint + E2E + visual diffs) | Theme Check (MIT), Playwright (Apache-2.0), Lost Pixel (MIT) | Percy/Chromatic (buy) | integrate | Managed storefronts need automated correctness and upgrade safety; these primitives enable “preview gating” and regression protection |
| Template versioning + promotion/rollback discipline | Changesets (MIT), release-please (Apache-2.0), Argo Rollouts (Apache-2.0) | LaunchDarkly releases / paid CD platforms | integrate (selectively) | Versioned templates + auditable release notes + controlled promotion/rollback are required for managed storefront upgrades at scale |
| Performance budgets (CI gate) | Lighthouse CI (Apache-2.0), sitespeed.io (MIT) | SpeedCurve (buy) | integrate | Prevent template upgrades from regressing LCP/CLS/SEO; attach reports to approvals and deployments |
| Upgrade/migration tooling (preserve merchant customization) | Kustomize (Apache-2.0), ytt (Apache-2.0), create-pull-request (MIT) | Manual upgrades + agency time | build + integrate | The hard part is applying template updates without overwriting merchant edits; use overlays + automated PRs + conflict reporting |
| Upgrade review UI (diffs + conflict resolution) | diff2html (MIT), Monaco Editor (MIT), CodeMirror Merge (MIT) | GitHub PR UI only | integrate | Having an internal diff/conflict review surface reduces support time and makes upgrades auditable in our admin (especially when paired with test/perf artifacts) |
| Artifact/report viewer (tests + perf + screenshot diffs) | Allure 2 (Apache-2.0), Unlighthouse (MIT), reg-suit (MIT) | Datadog CI / Percy / proprietary QA suites | integrate (selectively) | Upgrade approvals need evidence: test traces, perf reports, and visual diffs; keep artifacts linkable from PRs and internal admin with strict redaction |
| Artifact access control + redaction prevention | oauth2-proxy (MIT), Gitleaks (MIT), imgproxy (MIT) | Ad-hoc sharing | integrate | Protect internal report viewers, prevent secrets from entering repos/artifacts, and serve screenshot artifacts safely via signed URLs/thumbnails |
| Access policy + auditability for artifact viewers | Pomerium (Apache-2.0), OTel Collector (Apache-2.0), Casbin (Apache-2.0) | “Trust-based” access | integrate | Artifact access should be authenticated, authorized, and logged (who/what/when) so upgrades remain auditable and support-safe |
| Redaction/masking (logs + screenshots) | Pino (MIT), Presidio (MIT), sharp (Apache-2.0) | “Don’t store artifacts” | integrate | Evidence can’t be shared safely unless we prevent secrets/PII in logs and mask screenshots before upload; enforce as a required pipeline step |
| Evidence policy enforcement (allowlist/denylist + masking required) | Conftest (Apache-2.0), OPA (Apache-2.0) | Manual review | integrate | Make “no unmasked screenshots / no forbidden files / required artifacts present” a testable CI gate before upload/promotion |
| Evidence schema validation + linting | Ajv (MIT), Spectral (Apache-2.0), CUE (Apache-2.0) | “Best effort” JSON | integrate | Keep evidence bundles and mask rules structurally correct and readable; schemas reduce flake and make automation reliable |
| CMS/content ops for storefront generation | Payload (MIT), Strapi (mixed) | Contentful/Sanity | integrate or buy | CMS reduces content/admin work; license and ops footprint drive the decision (Strapi requires license scoping) |
| Full commerce engine (non-Shopify) | Medusa (MIT), Saleor (BSD-3), Sylius (MIT) | Shopify / BigCommerce | defer (patterns only) | These are full commerce platforms; valuable for feature checklists + architecture patterns, but likely scope-mismatched if we’re Shopify-first |
| Internal “audit/event investigations” dashboards | Superset (Apache-2.0), Redash (BSD-2) | Metabase/Grafana (copyleft) or Datadog | integrate | Best when we model events into queryable tables/views and keep it internal-only |
| Admin telemetry / lightweight analytics | Umami (MIT) | GA4/Amplitude | integrate or buy | Useful for understanding admin usage; keep strict “no PII” rules and internal access controls |
| Control-plane UI patterns (projects/keys/logs) | Supabase (Apache-2.0), Appwrite (BSD-3) | Build custom | borrow patterns | High-quality reference UX for settings/logs/keys; we still implement domain-specific admin and server-side authz |
| Activity log + revisions UX inspiration | Directus (BUSL) | Build custom | flag (license) | Excellent patterns but BUSL is not permissive; treat as inspiration unless explicitly approved |
