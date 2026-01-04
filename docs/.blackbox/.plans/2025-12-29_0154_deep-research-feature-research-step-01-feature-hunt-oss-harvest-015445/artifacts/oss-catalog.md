---
status: draft
last_reviewed: 2025-12-28
owner: agent
---

# OSS Catalog (Mapped to Features)

Purpose: list OSS repos/tools we can adapt to ship features faster.

## Entry template (copy/paste per repo)

```md
### <Repo/tool name>

- Repo:
- License:
- What it covers (features):
- What it gives us (plain English):

Integration notes (vibe coding):
- Stack fit:
- Setup friction:
- Data model alignment:

Adoption path:
- 1 day POC:
- 1 week integration:
- 1 month hardening:

Risks:
- Maintenance:
- Security:
- Scope mismatch:
- License:
```

## Entries

- ### Returns / Exchanges / RMA — OSS pointers (Tranche #1 — 2025-12-29)

- Medusa (`medusajs/medusa`) — Repo: https://github.com/medusajs/medusa — Covers: orders, returns, refunds/exchanges primitives (verify exact modules)
- Saleor (`saleor/saleor`) — Repo: https://github.com/saleor/saleor — Covers: order management + refunds/returns primitives (verify return workflow depth)
- Vendure (`vendure-ecommerce/vendure`) — Repo: https://github.com/vendure-ecommerce/vendure — Covers: order/fulfillment/refund primitives (verify returns extensions)
- Sylius (`Sylius/Sylius`) — Repo: https://github.com/Sylius/Sylius — Covers: refunds/returns patterns in OSS commerce core (verify RMA workflow)
- Spree Commerce (`spree/spree`) — Repo: https://github.com/spree/spree — Covers: legacy RMA/returns patterns (flag license for review in Step-04)
- VTEX return app (`vtex-apps/return-app`) — Repo: https://github.com/vtex-apps/return-app — Covers: return request UI/service patterns for VTEX ecosystem
- Odoo/OCA RMA addons (`OCA/rma`) — Repo: https://github.com/OCA/rma — Covers: ERP-style RMA workflow patterns (receipt/inspection/disposition)
- WooCommerce RMA plugin (community) (`ChiliDevsTeam/woocommerce-return-warranty-management`) — Repo: https://github.com/ChiliDevsTeam/woocommerce-return-warranty-management — Covers: storefront return requests + admin processing patterns
- (building block) node-qrcode (`soldair/node-qrcode`) — Repo: https://github.com/soldair/node-qrcode — License: (verify; likely MIT) — Covers: QR code generation for printerless return handoff
- (building block) PDFKit (`foliojs/pdfkit`) — Repo: https://github.com/foliojs/pdfkit — License: (verify; commonly MIT) — Covers: PDF label generation for returns (label rendering)
- (building block) pdf-lib (`Hopding/pdf-lib`) — Repo: https://github.com/Hopding/pdf-lib — License: (verify; commonly MIT) — Covers: programmatic PDF manipulation (stamping/assembling labels, manifests)

- ### Returns analytics + fraud gating — OSS pointers (Tranche #24 — 2025-12-29)

- Evidently (`evidentlyai/evidently`) — Repo: https://github.com/evidentlyai/evidently — License: (verify; commonly Apache-2.0) — Covers: anomaly/monitoring patterns for risk scores and policy outcomes (drift-style dashboards)
- Feast (`feast-dev/feast`) — Repo: https://github.com/feast-dev/feast — License: (verify; commonly Apache-2.0) — Covers: feature store patterns for returner profiles and risk signals (shared features across models/rules)
- scikit-learn (`scikit-learn/scikit-learn`) — Repo: https://github.com/scikit-learn/scikit-learn — License: (verify; commonly BSD) — Covers: baseline risk scoring models (logistic regression/trees) if/when moving beyond heuristics
- PostHog (`PostHog/posthog`) — Repo: https://github.com/PostHog/posthog — License: **flag** (verify) — Covers: event analytics for returns funnels (drop-off, “refund at scan”, conversion to exchange/credit)
- Open Policy Agent (`open-policy-agent/opa`) — Repo: https://github.com/open-policy-agent/opa — License: (verify) — Covers: policy-as-code evaluation for gating rules (instant refund eligibility, high-risk overrides)

- ### Shipping / Delivery exceptions — OSS pointers (Tranche #2 — 2025-12-29)

- Karrio (`karrioapi/karrio`) — Repo: https://github.com/karrioapi/karrio — License: (flag for Step-04) — Covers: carrier integration layer for labels + tracking abstractions
- libpostal (`openvenues/libpostal`) — Repo: https://github.com/openvenues/libpostal — License: (flag for Step-04) — Covers: address parsing + normalization primitives (address correction loops)
- OpenAddresses (`openaddresses/openaddresses`) — Repo: https://github.com/openaddresses/openaddresses — License: (flag for Step-04) — Covers: address dataset pipeline/reference (autocomplete + validation adjacency)
- Nominatim (`osm-search/Nominatim`) — Repo: https://github.com/osm-search/Nominatim — License: **flag** (likely GPL; verify) — Covers: geocoding/address search for “fix my address” UX
- Geopy (`geopy/geopy`) — Repo: https://github.com/geopy/geopy — License: (flag for Step-04) — Covers: geocoding client utilities (routing addresses to locations; adjacently useful)
- Svix (`svix/svix-webhooks`) — Repo: https://github.com/svix/svix-webhooks — License: **flag** (verify) — Covers: webhook delivery + retry logs patterns (helps build webhook debug console)
- OpenTelemetry Collector (`open-telemetry/opentelemetry-collector`) — Repo: https://github.com/open-telemetry/opentelemetry-collector — License: (verify) — Covers: event pipeline observability for tracking ingestion (latency/error rate monitoring)
- PostHog (`PostHog/posthog`) — Repo: https://github.com/PostHog/posthog — License: **flag** (verify) — Covers: customer tracking page analytics (deflection funnel, issue intake conversion)

- ### Inventory / Fulfillment exceptions — OSS pointers (Tranche #3 — 2025-12-29)

- ERPNext (`frappe/erpnext`) — Repo: https://github.com/frappe/erpnext — License: (flag for Step-04) — Covers: inventory ledger, warehouses, transfers/receiving, replenishment patterns
- Odoo (`odoo/odoo`) — Repo: https://github.com/odoo/odoo — License: (flag for Step-04) — Covers: mature WMS ops (picking/waves, transfers, replenishment) as pattern reference
- OpenBoxes (`openboxes/openboxes`) — Repo: https://github.com/openboxes/openboxes — License: (flag for Step-04) — Covers: receiving, putaway, picking/shipping workflows + exception handling patterns
- InvenTree (`InvenTree/InvenTree`) — Repo: https://github.com/InvenTree/InvenTree — License: (flag for Step-04) — Covers: stock tracking + adjustments + traceability patterns (adjacent)
- Apache OFBiz (`apache/ofbiz-framework`) — Repo: https://github.com/apache/ofbiz-framework — License: (flag for Step-04) — Covers: order/inventory primitives + fulfillment flows (enterprise patterns)

- ### Support desk ops — OSS pointers (Tranche #4 — 2025-12-29)

- Chatwoot (`chatwoot/chatwoot`) — Repo: https://github.com/chatwoot/chatwoot — License: **flag** (verify in Step-04; commonly MIT) — Covers: omnichannel inbox, canned responses, automation patterns
- Zammad (`zammad/zammad`) — Repo: https://github.com/zammad/zammad — License: **flag** (verify in Step-04; likely AGPL) — Covers: ticketing, queues, triggers/automation, SLAs patterns
- FreeScout (`freescout-helpdesk/freescout`) — Repo: https://github.com/freescout-helpdesk/freescout — License: **flag** (verify) — Covers: shared inbox, threads, tags, workflows
- osTicket (`osTicket/osTicket`) — Repo: https://github.com/osTicket/osTicket — License: **flag** (verify) — Covers: classic ticket lifecycle + assignments + SLA patterns
- (optional) Zammad ecosystem — Repo: https://github.com/zammad/zammad — Covers: ticketing integrations and automation patterns (treat as reference)

- ### Analytics & QA — OSS pointers (Tranche #5 — 2025-12-29)

- Apache Superset (`apache/superset`) — Repo: https://github.com/apache/superset — License: (verify; typically Apache-2.0) — Covers: BI dashboards for support KPIs and QA rollups
- Metabase (`metabase/metabase`) — Repo: https://github.com/metabase/metabase — License: **flag** (verify; often AGPL) — Covers: internal dashboards + ad-hoc analytics for ops
- PostHog (`posthog/posthog`) — Repo: https://github.com/posthog/posthog — License: (verify) — Covers: event analytics + funnels (deflection flows, admin usage) + session replay patterns
- Grafana (`grafana/grafana`) — Repo: https://github.com/grafana/grafana — License: **flag** (verify) — Covers: dashboards/alerts for queue health and SLA breach monitoring
- OpenTelemetry Collector (`open-telemetry/opentelemetry-collector`) — Repo: https://github.com/open-telemetry/opentelemetry-collector — License: (verify; typically Apache-2.0) — Covers: telemetry pipeline for ticket events, rule executions, and SLA timers

- ### Customer self-serve / deflection — OSS pointers (Tranche #6 — 2025-12-29)

- Docusaurus (`facebook/docusaurus`) — Repo: https://github.com/facebook/docusaurus — License: (verify) — Covers: help center/KB site generation + versioning + IA
- Algolia DocSearch (`algolia/docsearch`) — Repo: https://github.com/algolia/docsearch — License: (verify) — Covers: documentation search UX patterns (crawler + UI)
- Meilisearch (`meilisearch/meilisearch`) — Repo: https://github.com/meilisearch/meilisearch — License: (verify) — Covers: search engine for help center/store search
- Typesense (`typesense/typesense`) — Repo: https://github.com/typesense/typesense — License: **flag** (verify; often GPL) — Covers: search engine alternative (help center/store search)
- OpenSearch (`opensearch-project/OpenSearch`) — Repo: https://github.com/opensearch-project/OpenSearch — License: (verify) — Covers: search platform for help center search (heavier option)

- ### Workflow builder / automation — OSS pointers (Tranche #7 — 2025-12-29)

- n8n (`n8n-io/n8n`) — Repo: https://github.com/n8n-io/n8n — License: **flag** (verify; historically source-available) — Covers: workflow builder UI + connectors + execution logs patterns
- Node-RED (`node-red/node-red`) — Repo: https://github.com/node-red/node-red — License: (verify; often Apache-2.0) — Covers: node-based flow editor + runtime patterns
- Activepieces (`activepieces/activepieces`) — Repo: https://github.com/activepieces/activepieces — License: (verify) — Covers: “pieces” model for triggers/actions/connectors
- Temporal (`temporalio/temporal`) — Repo: https://github.com/temporalio/temporal — License: (verify) — Covers: durable workflow execution patterns (retries/timers/idempotency)
- (optional) Kestra (`kestra-io/kestra`) — Repo: https://github.com/kestra-io/kestra — License: **flag** (verify) — Covers: orchestration + schedules + retries (heavier)

- ### Security & compliance — OSS pointers (Tranche #8 — 2025-12-29)

- Keycloak (`keycloak/keycloak`) — Repo: https://github.com/keycloak/keycloak — License: (verify) — Covers: SSO (OIDC/SAML), MFA, sessions, admin flows
- Ory (Kratos/Hydra/Keto) (`ory/*`) — Repo: https://github.com/ory — License: **flag** (verify per repo) — Covers: authn/authz building blocks and admin patterns
- OpenFGA (`openfga/openfga`) — Repo: https://github.com/openfga/openfga — License: (verify) — Covers: fine-grained authorization model and permission checks
- OPA (`open-policy-agent/opa`) — Repo: https://github.com/open-policy-agent/opa — License: (verify) — Covers: policy-as-code authorization decisions (RBAC/ABAC)
- Casbin (`casbin/casbin`) — Repo: https://github.com/casbin/casbin — License: (verify) — Covers: RBAC/ABAC enforcement library patterns

- ### Inventory forecasting + replenishment — OSS pointers (Tranche #9 — 2025-12-29)

- ERPNext (`frappe/erpnext`) — Repo: https://github.com/frappe/erpnext — License: (verify) — Covers: reorder levels, purchasing, material requests, PO flows
- Odoo (`odoo/odoo`) — Repo: https://github.com/odoo/odoo — License: (verify) — Covers: procurement/reordering rules, lead times, replenishment workflows
- InvenTree (`inventree/InvenTree`) — Repo: https://github.com/inventree/InvenTree — License: (verify) — Covers: stock control + reordering patterns (adjacent)
- Prophet (`facebook/prophet`) — Repo: https://github.com/facebook/prophet — License: (verify) — Covers: time-series forecasting (demand prediction baseline)
- Darts (`darts/darts`) — Repo: https://github.com/unit8co/darts — License: (verify) — Covers: forecasting library + backtesting across multiple models

- ### Pricing & billing admin — OSS pointers (Tranche #10 — 2025-12-29)

- Kill Bill (`killbill/killbill`) — Repo: https://github.com/killbill/killbill — License: (verify) — Covers: subscription billing engine, catalog, invoicing, proration patterns
- Stripe CLI (`stripe/stripe-cli`) — Repo: https://github.com/stripe/stripe-cli — License: (verify) — Covers: webhook testing + billing integration workflows
- stripe-mock (`stripe/stripe-mock`) — Repo: https://github.com/stripe/stripe-mock — License: (verify) — Covers: API mocking for billing flows/testing
- Lago (`getlago/lago`) — Repo: https://github.com/getlago/lago — License: **flag** (verify) — Covers: usage-based billing patterns and invoicing (may be more metering than plans)
- Svix (`svix/svix-webhooks`) — Repo: https://github.com/svix/svix-webhooks — License: **flag** (verify) — Covers: webhook sending/receiving infrastructure for billing events (invoices paid, subscription updated)

- ### Subscription ops (swap/skip/pause, renewals, retries) — OSS pointers (Tranche #23 — 2025-12-29)

- Temporal (`temporalio/temporal`) — Repo: https://github.com/temporalio/temporal — License: (verify) — Covers: durable timers/retries for renewals, cutoffs, dunning schedules, and batch migrations
- BullMQ (`taskforcesh/bullmq`) — Repo: https://github.com/taskforcesh/bullmq — License: (verify; commonly MIT) — Covers: job queue primitives for renewal runs, reminder sends, and batch subscription migrations
- Quartz (`quartz-scheduler/quartz`) — Repo: https://github.com/quartz-scheduler/quartz — License: (verify; commonly Apache-2.0) — Covers: scheduling primitives (cron-like) for renewals/notifications (heavier JVM option)
- Kill Bill (`killbill/killbill`) — Repo: https://github.com/killbill/killbill — License: (verify) — Covers: subscription lifecycle, invoicing, proration patterns and edge cases (deep mapping deferred to Step-04)
- Lago (`getlago/lago`) — Repo: https://github.com/getlago/lago — License: **flag** (verify) — Covers: invoice generation + billing concepts; useful pattern reference for subscription ops reporting (deep mapping deferred to Step-04)

- ### B2B subscription ops (seat-based, invoicing, tax IDs, approvals) — OSS pointers (Tranche #26 — 2025-12-29)

- Kill Bill (`killbill/killbill`) — Repo: https://github.com/killbill/killbill — License: (verify) — Covers: invoices, accounts, subscription changes; useful reference for B2B invoice workflows (deep mapping deferred to Step-04)
- Invoice Ninja (`invoiceninja/invoiceninja`) — Repo: https://github.com/invoiceninja/invoiceninja — License: **flag** (verify) — Covers: invoices, quotes, contacts, templates (useful patterns for quote→invoice workflows)
- ERPNext (`frappe/erpnext`) — Repo: https://github.com/frappe/erpnext — License: (verify) — Covers: invoicing, customers, tax fields, approvals patterns (heavy, but rich B2B workflows reference)
- OpenFGA (`openfga/openfga`) — Repo: https://github.com/openfga/openfga — License: (verify) — Covers: fine-grained authorization (seat admin roles, approval permissions) patterns
- OPA (`open-policy-agent/opa`) — Repo: https://github.com/open-policy-agent/opa — License: (verify) — Covers: policy-as-code evaluation for B2B governance (approval rules, export permissions)

- ### Promotions measurement (ROI, cohorts, LTV impact) — OSS pointers (Tranche #27 — 2025-12-29)

- GrowthBook (`growthbook/growthbook`) — Repo: https://github.com/growthbook/growthbook — License: **flag** (verify) — Covers: experimentation + holdouts + feature flags for incremental lift measurement
- PostHog (`PostHog/posthog`) — Repo: https://github.com/PostHog/posthog — License: **flag** (verify) — Covers: funnels/cohorts/insights for promo conversion + retention analysis
- Cube (`cube-js/cube`) — Repo: https://github.com/cube-js/cube — License: **flag** (verify) — Covers: semantic layer + metrics definitions for ROI dashboards
- dbt Core (`dbt-labs/dbt-core`) — Repo: https://github.com/dbt-labs/dbt-core — License: (verify) — Covers: transformations to build promo metric tables/cohorts and data quality tests
- Apache Superset (`apache/superset`) — Repo: https://github.com/apache/superset — License: (verify) — Covers: dashboards and reporting surfaces for promo KPIs (alternative: Metabase; license varies)

- ### Fraud & risk — OSS pointers (Tranche #11 — 2025-12-29)

- MaxMind GeoIP2 (`maxmind/GeoIP2-python`) — Repo: https://github.com/maxmind/GeoIP2-python — License: (verify) — Covers: IP geolocation primitives for risk signals
- SHAP (`shap/shap`) — Repo: https://github.com/shap/shap — License: (verify) — Covers: model explainability (“why flagged”) patterns for risk scoring
- TensorFlow Decision Forests (`tensorflow/decision-forests`) — Repo: https://github.com/tensorflow/decision-forests — License: (verify) — Covers: tabular classification models for fraud scoring experiments
- Svix (`svix/svix-webhooks`) — Repo: https://github.com/svix/svix-webhooks — License: **flag** (verify) — Covers: webhook pipeline for disputes/events ingestion (shared infra)
- (optional) SigNoz (`SigNoz/signoz`) — Repo: https://github.com/SigNoz/signoz — License: **flag** (verify) — Covers: alerting and monitoring for fraud/risk event spikes (heavier)

- ### Analytics for finance — OSS pointers (Tranche #12 — 2025-12-29)

- Cube (`cube-js/cube`) — Repo: https://github.com/cube-js/cube — License: **flag** (verify) — Covers: semantic layer / metrics modeling for finance analytics
- Metabase (`metabase/metabase`) — Repo: https://github.com/metabase/metabase — License: **flag** (verify; often AGPL) — Covers: dashboards for finance KPIs
- Apache Superset (`apache/superset`) — Repo: https://github.com/apache/superset — License: (verify) — Covers: BI dashboards + reporting
- Prometheus (`prometheus/prometheus`) — Repo: https://github.com/prometheus/prometheus — License: (verify) — Covers: metrics storage + alerting inputs
- Grafana (`grafana/grafana`) — Repo: https://github.com/grafana/grafana — License: **flag** (verify) — Covers: dashboards and alerting for KPI monitoring

- ### Data import/export + integrations admin — OSS pointers (Tranche #13 — 2025-12-29)

- Airbyte (`airbytehq/airbyte`) — Repo: https://github.com/airbytehq/airbyte — License: **flag** (verify) — Covers: connector catalog + sync jobs + run history patterns
- Meltano (`meltano/meltano`) — Repo: https://github.com/meltano/meltano — License: (verify) — Covers: ELT orchestration + plugin model (Singer)
- Singer ecosystem (`singer-io/*`) — Repo: https://github.com/singer-io — License: **flag** (varies) — Covers: connector packaging (taps/targets)
- Svix (`svix/svix-webhooks`) — Repo: https://github.com/svix/svix-webhooks — License: **flag** (verify) — Covers: webhook delivery/retries/attempt logs (integration observability)
- n8n (`n8n-io/n8n`) — Repo: https://github.com/n8n-io/n8n — License: **flag** (verify) — Covers: integration nodes and trigger/action packaging patterns

- ### Mobile ops — OSS pointers (Tranche #14 — 2025-12-29)

- Expo (`expo/expo`) — Repo: https://github.com/expo/expo — License: (verify) — Covers: React Native tooling, offline/push patterns
- React Native AsyncStorage (`react-native-async-storage/async-storage`) — Repo: https://github.com/react-native-async-storage/async-storage — License: (verify) — Covers: offline persistence primitive
- ZXing (`zxing/zxing`) — Repo: https://github.com/zxing/zxing — License: (verify) — Covers: barcode decoding/scanning primitives
- Firebase JS SDK (`firebase/firebase-js-sdk`) — Repo: https://github.com/firebase/firebase-js-sdk — License: (verify) — Covers: client push/persistence patterns (FCM adjacency)
- (optional) ML Kit barcode scanning (Android/iOS SDKs) — Evidence: https://developers.google.com/ml-kit/vision/barcode-scanning — Covers: barcode scanning primitives (not OSS)

- ### Approvals & tasks — OSS pointers (Tranche #15 — 2025-12-29)

- Focalboard (`focalboard/focalboard`) — Repo: https://github.com/focalboard/focalboard — License: **flag** (verify) — Covers: kanban/task board patterns (tasks, columns, filters)
- Mattermost (`mattermost/mattermost`) — Repo: https://github.com/mattermost/mattermost — License: (verify) — Covers: notifications and workflow routing via messaging (approvals in chat)
- Outline (`outline/outline`) — Repo: https://github.com/outline/outline — License: **flag** (verify) — Covers: playbooks/KB patterns linked to tasks (docs + templates)
- OpenProject (`opf/openproject`) — Repo: https://github.com/opf/openproject — License: **flag** (verify) — Covers: work packages, workflows, and project boards (enterprise tasking patterns)
- (optional) Plane (`makeplane/plane`) — Repo: https://github.com/makeplane/plane — License: **flag** (verify) — Covers: issue tracking and workflow patterns

- ### Localization (multi-currency, translations, time zones) — OSS pointers (Tranche #16 — 2025-12-29)

- FormatJS (`formatjs/formatjs`) — Repo: https://github.com/formatjs/formatjs — License: (verify) — Covers: ICU message formatting, pluralization, locale formatting patterns (React Intl adjacency)
- i18next (`i18next/i18next`) — Repo: https://github.com/i18next/i18next — License: (verify) — Covers: translation runtime (namespaces, language detection, fallbacks, missing keys)
- Dinero.js (`dinerojs/dinero.js`) — Repo: https://github.com/dinerojs/dinero.js — License: (verify) — Covers: money primitives for integer-based currency math + rounding (multi-currency correctness)
- Unicode CLDR (`unicode-org/cldr`) — Repo: https://github.com/unicode-org/cldr — License: (verify) — Covers: locale datasets for currency symbols, number/date formats, language names
- ICU (`unicode-org/icu`) — Repo: https://github.com/unicode-org/icu — License: (verify) — Covers: foundational i18n components used for locale-aware formatting
- (optional) Globalize (`globalizejs/globalize`) — Repo: https://github.com/globalizejs/globalize — License: (verify) — Covers: CLDR-based localization utilities (alternate approach)

- ### Observability (logs, tracing, alerts, SLOs) — OSS pointers (Tranche #17 — 2025-12-29)

- OpenTelemetry Collector (`open-telemetry/opentelemetry-collector`) — Repo: https://github.com/open-telemetry/opentelemetry-collector — License: (verify) — Covers: telemetry pipeline (receivers/processors/exporters) for logs/metrics/traces
- Prometheus (`prometheus/prometheus`) — Repo: https://github.com/prometheus/prometheus — License: (verify) — Covers: metrics storage/query + alert rule patterns
- Alertmanager (`prometheus/alertmanager`) — Repo: https://github.com/prometheus/alertmanager — License: (verify) — Covers: alert routing/grouping/silences as admin surface patterns
- Grafana Loki (`grafana/loki`) — Repo: https://github.com/grafana/loki — License: **flag** (verify) — Covers: log aggregation/query patterns (labels, retention, multi-tenant)
- Jaeger (`jaegertracing/jaeger`) — Repo: https://github.com/jaegertracing/jaeger — License: (verify) — Covers: tracing storage/UI patterns and service dependency views
- Grafana Tempo (`grafana/tempo`) — Repo: https://github.com/grafana/tempo — License: **flag** (verify) — Covers: distributed tracing backend patterns
- SigNoz (`SigNoz/signoz`) — Repo: https://github.com/SigNoz/signoz — License: **flag** (verify) — Covers: “all-in-one” observability UX patterns (alerts/dashboards/traces)
- Sentry (`getsentry/sentry`) — Repo: https://github.com/getsentry/sentry — License: **flag** (verify) — Covers: error tracking/issue grouping workflows (triage inbox patterns)

- ### Admin IA (navigation, search, saved views, shortcuts) — OSS pointers (Tranche #18 — 2025-12-29)

- cmdk (`pacocoursey/cmdk`) — Repo: https://github.com/pacocoursey/cmdk — License: (verify) — Covers: command palette UI patterns (⌘K) for search/navigation/actions
- kbar (`timc1/kbar`) — Repo: https://github.com/timc1/kbar — License: (verify) — Covers: command palette/omnibox patterns (React)
- Fuse.js (`krisk/Fuse`) — Repo: https://github.com/krisk/Fuse — License: (verify) — Covers: fuzzy search primitives for local quick-find and command palette search
- FlexSearch (`nextapps-de/flexsearch`) — Repo: https://github.com/nextapps-de/flexsearch — License: (verify) — Covers: client-side full-text search indexing (fast local search)
- React Hotkeys Hook (`JohannesKlauss/react-hotkeys-hook`) — Repo: https://github.com/JohannesKlauss/react-hotkeys-hook — License: (verify) — Covers: keyboard shortcut binding patterns for admin UIs
- TanStack Table (`TanStack/table`) — Repo: https://github.com/TanStack/table — License: (verify) — Covers: table state patterns (sorting/filtering/pagination/columns) for admin list views
- react-window (`bvaughn/react-window`) — Repo: https://github.com/bvaughn/react-window — License: (verify) — Covers: list virtualization patterns for large tables/lists
- (optional) TinyKeys (`jamiebuilds/tinykeys`) — Repo: https://github.com/jamiebuilds/tinykeys — License: (verify) — Covers: small keyboard shortcut library (useful for web command palettes)

- ### Data governance (data retention, exports, privacy requests) — OSS pointers (Tranche #19 — 2025-12-29)

- Presidio (`microsoft/presidio`) — Repo: https://github.com/microsoft/presidio — License: (verify) — Covers: PII detection/anonymization primitives (useful for redaction and export safety)
- DataHub (`datahub-project/datahub`) — Repo: https://github.com/datahub-project/datahub — License: (verify) — Covers: data catalog/lineage patterns and governance UI concepts (reference)
- OpenMetadata (`open-metadata/OpenMetadata`) — Repo: https://github.com/open-metadata/OpenMetadata — License: (verify) — Covers: metadata catalog and governance workflows (reference)
- Apache Atlas (`apache/atlas`) — Repo: https://github.com/apache/atlas — License: (verify) — Covers: data governance and metadata management patterns (reference)
- OpenLineage + Marquez (`OpenLineage/marquez`) — Repo: https://github.com/OpenLineage/marquez — License: (verify) — Covers: lineage tracking patterns (helps “where does data flow?” questions)
- Gitleaks (`gitleaks/gitleaks`) — Repo: https://github.com/gitleaks/gitleaks — License: (verify) — Covers: secret scanning to reduce accidental PII/secret exposure in repos (adjacent governance)
- TruffleHog (`trufflesecurity/trufflehog`) — Repo: https://github.com/trufflesecurity/trufflehog — License: (verify) — Covers: secret scanning patterns (adjacent to governance posture)
- (optional) Open Policy Agent (`open-policy-agent/opa`) — Repo: https://github.com/open-policy-agent/opa — License: (verify) — Covers: policy-as-code enforcement (retention/access rules) (already listed in security tranche; referenced here)

- ### Merchandising rules (search tuning, boosts, synonyms) — OSS pointers (Tranche #20 — 2025-12-29)

- Typesense (`typesense/typesense`) — Repo: https://github.com/typesense/typesense — License: **flag** (verify; often GPL) — Covers: OSS search engine with synonyms and curation primitives
- Meilisearch (`meilisearch/meilisearch`) — Repo: https://github.com/meilisearch/meilisearch — License: (verify) — Covers: OSS search engine with synonym configuration and relevance tuning primitives
- OpenSearch (`opensearch-project/OpenSearch`) — Repo: https://github.com/opensearch-project/OpenSearch — License: (verify) — Covers: search engine stack with relevance tuning and plugin ecosystem
- (optional) Elasticsearch clients — Evidence: https://www.elastic.co/docs/reference/elasticsearch/rest-apis/search-suggesters — Covers: suggesters/autocomplete concepts (not OSS itself; engine license posture varies)
- Query parser / DSL — (treat as in-app): implement “rule conditions” and “query qualifiers” similar to admin IA search

- ### Catalog governance (product QA, bulk edits, versioning) — OSS pointers (Tranche #21 — 2025-12-29)

- Akeneo PIM Community (`akeneo/pim-community-standard`) — Repo: https://github.com/akeneo/pim-community-standard — License: **flag** (verify) — Covers: PIM workflows, attribute models, product enrichment patterns
- Pimcore (`pimcore/pimcore`) — Repo: https://github.com/pimcore/pimcore — License: **flag** (verify) — Covers: PIM/MDM patterns, data modeling, workflows (docs may block automated access)
- OpenRefine (`OpenRefine/OpenRefine`) — Repo: https://github.com/OpenRefine/OpenRefine — License: (verify) — Covers: data cleanup and reconciliation patterns (useful for “taxonomy hygiene”)
- Great Expectations (`great-expectations/great_expectations`) — Repo: https://github.com/great-expectations/great_expectations — License: (verify) — Covers: data quality checks and validation patterns (can inform catalog QA rules)
- frictionless (`frictionlessdata/frictionless-py`) — Repo: https://github.com/frictionlessdata/frictionless-py — License: (verify) — Covers: table schema + CSV validation patterns (row/column errors)
- csvkit (`wireservice/csvkit`) — Repo: https://github.com/wireservice/csvkit — License: (verify) — Covers: CSV tooling for transforms/validation (adjacent)
- pandera (`unionai-oss/pandera`) — Repo: https://github.com/unionai-oss/pandera — License: (verify) — Covers: dataframe schema validation patterns (adjacent)

- ### Promotions admin (coupons, discounts, eligibility) — OSS pointers (Tranche #22 — 2025-12-29)

- Saleor (`saleor/saleor`) — Repo: https://github.com/saleor/saleor — License: (verify) — Covers: discount and promotion primitives in an OSS commerce core (useful for patterns)
- Medusa (`medusajs/medusa`) — Repo: https://github.com/medusajs/medusa — License: (verify) — Covers: promotions/discounts primitives in OSS commerce core (patterns; verify modules)
- Vendure (`vendure-ecommerce/vendure`) — Repo: https://github.com/vendure-ecommerce/vendure — License: (verify) — Covers: promotions/discount rules patterns (verify plugin depth)
- Sylius (`Sylius/Sylius`) — Repo: https://github.com/Sylius/Sylius — License: (verify) — Covers: promotions and coupon workflows (patterns; verify)
- (optional) Stripe CLI (`stripe/stripe-cli`) — Repo: https://github.com/stripe/stripe-cli — License: (verify) — Covers: testing promotion/checkout flows (already in billing tranche; relevant for promo QA)
