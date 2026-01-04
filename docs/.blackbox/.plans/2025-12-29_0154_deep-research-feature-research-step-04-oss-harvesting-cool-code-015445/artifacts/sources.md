---
status: draft
last_reviewed: 2025-12-28
owner: agent
---

# Sources (Step 04 — OSS “Cool Code”)

Format per source:
- URL
  - Supports: what claim/data this backs
  - Accessed: YYYY-MM-DD
  - Confidence: High | Medium | Low

## Repos (primary)

- https://github.com/Unleash/unleash
  - Supports: feature flags capabilities, self-host posture, license (Apache-2.0)
  - Accessed: 2025-12-29
  - Confidence: High

- https://github.com/casbin/casbin
  - Supports: RBAC/ABAC authorization primitive, license (Apache-2.0)
  - Accessed: 2025-12-29
  - Confidence: High

- https://github.com/temporalio/temporal
  - Supports: durable workflow engine capabilities, license (MIT)
  - Accessed: 2025-12-29
  - Confidence: High

- https://github.com/growthbook/growthbook
  - Supports: flags + experimentation capabilities; confirms repo is mixed-license via LICENSE
  - Accessed: 2025-12-29
  - Confidence: High

- https://github.com/activepieces/activepieces
  - Supports: workflow automation capabilities; confirms repo is mixed-license via LICENSE
  - Accessed: 2025-12-29
  - Confidence: High

- https://github.com/open-policy-agent/opa
  - Supports: policy engine capabilities, license (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/openfga/openfga
  - Supports: Zanzibar-style authorization service capabilities, license (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/opensearch-project/OpenSearch
  - Supports: search/index engine capabilities for event/audit queries, license (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/opensearch-project/OpenSearch-Dashboards
  - Supports: OpenSearch visualization UI capabilities for event/audit viewer, license (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/NangoHQ/nango
  - Supports: integration connector platform capabilities; confirms ELv2 posture via LICENSE
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/graphile/worker
  - Supports: Postgres-backed job queue primitive, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/timgit/pg-boss
  - Supports: Postgres-backed job queue primitive, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/pgaudit/pgaudit
  - Supports: DB-level auditing primitive (Postgres extension), license posture via LICENSE
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/benjamine/jsondiffpatch
  - Supports: JSON diff/patch primitive for audit diffs, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/ClickHouse/ClickHouse
  - Supports: OLAP/event analytics DB candidate, license (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/svix/svix-webhooks
  - Supports: outbound webhook delivery component patterns, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/frain-dev/convoy
  - Supports: webhook gateway patterns; confirms ELv2 posture via LICENSE
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/go-playground/webhooks
  - Supports: inbound webhook parsing/validation patterns, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/adnanh/webhook
  - Supports: internal ops webhook trigger server patterns, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/probot/smee-client
  - Supports: webhook dev proxy patterns, license (ISC)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/binwiederhier/ntfy
  - Supports: simple ops alerting via HTTP topics, license (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/caronc/apprise
  - Supports: unified notifications dispatch patterns, license (BSD-2-Clause)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/gotify/server
  - Supports: self-hosted notifications server + UI, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/novuhq/novu
  - Supports: full notification platform + inbox patterns, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/karrioapi/karrio
  - Supports: shipping connector patterns; license risk (LGPL-3.0 + EE directory)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://github.com/marmelab/react-admin
  - Supports: admin UI scaffolding framework capabilities, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/refinedev/refine
  - Supports: admin UI scaffolding framework capabilities, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/appsmithorg/appsmith
  - Supports: low-code internal tools platform capabilities, license (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/payloadcms/payload
  - Supports: CMS + admin panel capabilities, license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/strapi/strapi
  - Supports: CMS + admin platform capabilities; mixed-license posture via LICENSE and `ee/` notes
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://github.com/apache/superset
  - Supports: internal BI dashboarding for event/audit tables, license (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/getredash/redash
  - Supports: internal SQL dashboards and query library patterns, license (BSD-2-Clause)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/grafana/grafana
  - Supports: ops dashboards/alerting patterns; license is copyleft (AGPL-3.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/metabase/metabase
  - Supports: internal BI exploration patterns; license is copyleft (AGPL-3.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/matomo-org/matomo
  - Supports: web analytics and admin telemetry patterns; license is copyleft (GPL-3.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/PostHog/posthog
  - Supports: event explorer UX patterns; mixed-license posture via LICENSE and `ee/` notes
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://github.com/supabase/supabase
  - Supports: control-plane/dashboard UX patterns for logs/settings; license (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/directus/directus
  - Supports: activity log + revisions UX patterns; license is source-available (BUSL-1.1)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://github.com/appwrite/appwrite
  - Supports: console/control-plane UX patterns; license (BSD-3-Clause)
  - Accessed: 2025-12-30
  - Confidence: High

- https://github.com/umami-software/umami
  - Supports: lightweight analytics dashboards UX patterns; license (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

## License references (if needed)

- https://raw.githubusercontent.com/growthbook/growthbook/main/LICENSE
  - Supports: confirms “MIT Expat” applies to most code but enterprise directories are separately licensed
  - Accessed: 2025-12-29
  - Confidence: High

- https://raw.githubusercontent.com/activepieces/activepieces/main/LICENSE
  - Supports: confirms “MIT Expat” applies to most code but `packages/ee/` and related paths are separately licensed
  - Accessed: 2025-12-29
  - Confidence: High

- https://raw.githubusercontent.com/NangoHQ/nango/master/LICENSE
  - Supports: confirms Elastic License 2.0 (ELv2) restrictions (not permissive; managed-service limitations)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/pgaudit/pgaudit/main/LICENSE
  - Supports: confirms PostgreSQL License statement for pgaudit (GitHub API may show NOASSERTION)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/graphile/worker/main/LICENSE.md
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/timgit/pg-boss/master/LICENSE
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/benjamine/jsondiffpatch/master/MIT-LICENSE.txt
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/ClickHouse/ClickHouse/master/LICENSE
  - Supports: license confirmation (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/svix/svix-webhooks/main/LICENSE
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/frain-dev/convoy/main/LICENSE
  - Supports: confirms Elastic License 2.0 (ELv2) restrictions for Convoy
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/go-playground/webhooks/master/LICENSE
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/adnanh/webhook/master/LICENSE
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/probot/smee-client/master/LICENSE
  - Supports: license confirmation (ISC)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/binwiederhier/ntfy/main/LICENSE
  - Supports: license confirmation (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/caronc/apprise/master/LICENSE
  - Supports: license confirmation (BSD-2-Clause)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/gotify/server/master/LICENSE
  - Supports: license confirmation (MIT) (note: logo assets may have separate CC terms)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/novuhq/novu/main/LICENSE
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/marmelab/react-admin/master/LICENSE.md
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/refinedev/refine/master/LICENSE
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/appsmithorg/appsmith/release/LICENSE
  - Supports: license confirmation (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/payloadcms/payload/main/LICENSE
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/strapi/strapi/main/LICENSE
  - Supports: license confirmation and mixed-license scoping guidance for Strapi
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/apache/superset/master/LICENSE.txt
  - Supports: license confirmation (Apache-2.0)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/getredash/redash/master/LICENSE
  - Supports: license confirmation (BSD-2-Clause)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/grafana/grafana/main/LICENSE
  - Supports: license confirmation (AGPL-3.0)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/metabase/metabase/master/LICENSE-AGPL.txt
  - Supports: license confirmation (AGPL-3.0)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/PostHog/posthog/master/LICENSE
  - Supports: license confirmation and mixed-license scoping guidance for PostHog
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/directus/directus/main/LICENSE
  - Supports: license confirmation (BUSL-1.1)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/appwrite/appwrite/master/LICENSE
  - Supports: license confirmation (BSD-3-Clause)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/umami-software/umami/master/LICENSE
  - Supports: license confirmation (MIT)
  - Accessed: 2025-12-30
  - Confidence: Medium

## UI primitives (audit/event viewer building blocks)

- https://raw.githubusercontent.com/TanStack/table/main/LICENSE
  - Supports: license confirmation (MIT) for TanStack Table
  - Accessed: 2025-12-30
  - Confidence: High

- https://registry.npmjs.org/@tanstack/react-table
  - Supports: package metadata (repo link, versions) for TanStack Table
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/TanStack/virtual/main/LICENSE
  - Supports: license confirmation (MIT) for TanStack Virtual
  - Accessed: 2025-12-30
  - Confidence: High

- https://registry.npmjs.org/@tanstack/react-virtual
  - Supports: package metadata (repo link, versions) for TanStack Virtual
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/petyosi/react-virtuoso/master/LICENSE.md
  - Supports: license confirmation (MIT) for react-virtuoso
  - Accessed: 2025-12-30
  - Confidence: High

- https://registry.npmjs.org/react-virtuoso
  - Supports: package metadata (repo link, versions) for react-virtuoso
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/react-querybuilder/react-querybuilder/main/LICENSE.md
  - Supports: license confirmation (MIT) for React Query Builder
  - Accessed: 2025-12-30
  - Confidence: High

- https://registry.npmjs.org/react-querybuilder
  - Supports: package metadata (repo link, versions) for React Query Builder
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/uiwjs/react-json-view/master/LICENSE
  - Supports: license confirmation (MIT) for React JSON View
  - Accessed: 2025-12-30
  - Confidence: High

- https://registry.npmjs.org/@uiw/react-json-view
  - Supports: package metadata (repo link, versions) for React JSON View
  - Accessed: 2025-12-30
  - Confidence: High

## Commerce builders (feature checklist + architecture references)

- https://raw.githubusercontent.com/medusajs/medusa/master/LICENSE
  - Supports: license confirmation (MIT) for Medusa
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/saleor/saleor/main/LICENSE
  - Supports: license confirmation (BSD-3-Clause) for Saleor
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/Sylius/Sylius/2.2/LICENSE
  - Supports: license confirmation (MIT) for Sylius code
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/Sylius/Sylius/2.2/LICENSE_OF_TRADEMARK_AND_LOGO
  - Supports: trademark/logo licensing restrictions for Sylius
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/bagisto/bagisto/2.3/LICENSE
  - Supports: license confirmation (MIT) for Bagisto
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/solidusio/solidus/main/LICENSE.md
  - Supports: license text (“Spree License”) used by Solidus (BSD-3-Clause-like wording)
  - Accessed: 2025-12-30
  - Confidence: High

## Storefront generation (Shopify-first templates + scaffolding)

- https://raw.githubusercontent.com/Shopify/hydrogen/main/LICENSE.md
  - Supports: license confirmation (MIT) for Hydrogen
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/Shopify/dawn/main/LICENSE.md
  - Supports: license confirmation (MIT text) for Dawn
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/vercel/commerce/main/license.md
  - Supports: license confirmation (MIT) for Vercel Commerce
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/saleor/storefront/main/LICENSE
  - Supports: license confirmation (BSD-3-Clause) for Saleor Storefront
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/Shopify/cli/main/LICENSE
  - Supports: license confirmation (MIT) for Shopify CLI
  - Accessed: 2025-12-30
  - Confidence: High

## Storefront generator primitives (validation + tests + visual diffs)

- https://raw.githubusercontent.com/Shopify/theme-check/main/LICENSE.md
  - Supports: license confirmation (MIT text) for Theme Check
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/Shopify/theme-tools/main/LICENSE.md
  - Supports: license confirmation (MIT) for Shopify Theme Tools
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/Shopify/liquid/main/LICENSE
  - Supports: license confirmation (MIT) for Liquid
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/microsoft/playwright/main/LICENSE
  - Supports: license confirmation (Apache-2.0) for Playwright
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/lost-pixel/lost-pixel/main/LICENSE
  - Supports: license confirmation (MIT) for Lost Pixel
  - Accessed: 2025-12-30
  - Confidence: High

## Template versioning + promotion primitives

- https://raw.githubusercontent.com/changesets/changesets/main/LICENSE
  - Supports: license confirmation (MIT) for Changesets
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/googleapis/release-please/main/LICENSE
  - Supports: license confirmation (Apache-2.0) for release-please
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/argoproj/argo-rollouts/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for Argo Rollouts
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/GoogleChrome/lighthouse-ci/main/LICENSE
  - Supports: license confirmation (Apache-2.0) for Lighthouse CI
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/sitespeedio/sitespeed.io/main/LICENSE
  - Supports: license confirmation (MIT) for sitespeed.io
  - Accessed: 2025-12-30
  - Confidence: High

## Upgrade/migration primitives (safe template upgrades)

- https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for Kustomize
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/carvel-dev/ytt/develop/LICENSE
  - Supports: license confirmation (Apache-2.0) for ytt
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/twpayne/chezmoi/master/LICENSE
  - Supports: license confirmation (MIT) for chezmoi
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/google/diff-match-patch/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for diff-match-patch
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/peter-evans/create-pull-request/main/LICENSE
  - Supports: license confirmation (MIT) for create-pull-request
  - Accessed: 2025-12-30
  - Confidence: High

## Diff review UX (Upgrade Review UI primitives)

- https://raw.githubusercontent.com/rtfpessoa/diff2html/master/LICENSE.md
  - Supports: license confirmation (MIT) for diff2html
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/kpdecker/jsdiff/master/LICENSE
  - Supports: license confirmation (BSD-3-Clause) for jsdiff
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/praneshr/react-diff-viewer/master/LICENSE
  - Supports: license confirmation (MIT) for react-diff-viewer
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/codemirror/merge/master/LICENSE
  - Supports: license confirmation (MIT) for CodeMirror Merge
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/microsoft/monaco-editor/master/LICENSE.txt
  - Supports: license confirmation (MIT) for Monaco Editor
  - Accessed: 2025-12-30
  - Confidence: High

## Artifact/report viewers (upgrade evidence)

- https://raw.githubusercontent.com/allure-framework/allure2/main/LICENSE
  - Supports: license confirmation (Apache-2.0) for Allure 2
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/reportportal/reportportal/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for ReportPortal
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/harlan-zw/unlighthouse/main/LICENSE.md
  - Supports: license confirmation (MIT) for Unlighthouse
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/mapbox/pixelmatch/main/LICENSE
  - Supports: license confirmation (ISC) for pixelmatch
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/reg-viz/reg-suit/master/LICENSE.txt
  - Supports: license confirmation (MIT) for reg-suit
  - Accessed: 2025-12-30
  - Confidence: High

## Artifact storage + access control + redaction prevention

- https://raw.githubusercontent.com/chrislusf/seaweedfs/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for SeaweedFS
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/treeverse/lakeFS/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for lakeFS
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/oauth2-proxy/oauth2-proxy/master/LICENSE
  - Supports: license confirmation (MIT text) for oauth2-proxy
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/zricethezav/gitleaks/master/LICENSE
  - Supports: license confirmation (MIT) for Gitleaks
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/imgproxy/imgproxy/master/LICENSE
  - Supports: license confirmation (MIT) for imgproxy
  - Accessed: 2025-12-30
  - Confidence: High

## Policy + auditability (access logs and fine-grained auth)

- https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector/main/LICENSE
  - Supports: license confirmation (Apache-2.0) for OpenTelemetry Collector
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/open-telemetry/opentelemetry-collector-contrib/main/LICENSE
  - Supports: license confirmation (Apache-2.0) for OpenTelemetry Collector Contrib
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/pomerium/pomerium/main/LICENSE
  - Supports: license confirmation (Apache-2.0) for Pomerium
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/ory/oathkeeper/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for Ory Oathkeeper
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/ory/keto/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for Ory Keto
  - Accessed: 2025-12-30
  - Confidence: High

## Redaction/masking (logs + screenshots)

- https://raw.githubusercontent.com/microsoft/presidio/main/LICENSE
  - Supports: license confirmation (MIT) for Presidio
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/pinojs/pino/main/LICENSE
  - Supports: license confirmation (MIT) for Pino
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/lovell/sharp/main/LICENSE
  - Supports: license confirmation (Apache-2.0) for sharp
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/automattic/node-canvas/master/package.json
  - Supports: package license metadata (MIT) for node-canvas (LICENSE file not found at common paths)
  - Accessed: 2025-12-30
  - Confidence: Medium

- https://raw.githubusercontent.com/jimp-dev/jimp/main/LICENSE
  - Supports: license confirmation (MIT) for Jimp
  - Accessed: 2025-12-30
  - Confidence: High

## Mask drift + evidence policy enforcement

- https://raw.githubusercontent.com/open-policy-agent/conftest/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for Conftest
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/awslabs/git-secrets/master/LICENSE.txt
  - Supports: license confirmation (Apache-2.0) for git-secrets
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/puppeteer/puppeteer/main/LICENSE
  - Supports: license confirmation (Apache-2.0) for Puppeteer
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/cypress-io/cypress/master/LICENSE
  - Supports: license confirmation (MIT) for Cypress
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/kyverno/kyverno/main/LICENSE
  - Supports: license confirmation (Apache-2.0) for Kyverno
  - Accessed: 2025-12-30
  - Confidence: High

## Schema/policy primitives (evidence manifests and mask rules)

- https://raw.githubusercontent.com/cue-lang/cue/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for CUE
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/ajv-validator/ajv/master/LICENSE
  - Supports: license confirmation (MIT) for Ajv
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/stoplightio/spectral/master/LICENSE
  - Supports: license confirmation (Apache-2.0) for Spectral
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/mikefarah/yq/master/LICENSE
  - Supports: license confirmation (MIT) for yq
  - Accessed: 2025-12-30
  - Confidence: High

- https://raw.githubusercontent.com/tidwall/gjson/master/LICENSE
  - Supports: license confirmation (MIT) for gjson
  - Accessed: 2025-12-30
  - Confidence: High
