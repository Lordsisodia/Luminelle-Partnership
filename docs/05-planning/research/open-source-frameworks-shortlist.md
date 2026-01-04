# Open-Source Frameworks Shortlist (for Lumelle)

Date: 2025-12-28

Goal: identify “cool” open-source building blocks that are realistic to integrate into a Shopify-connected, Supabase-backed, workflow-heavy commerce/admin product.

This list is organized by what it would replace or accelerate.

---

## 0) Selection criteria (don’t skip)

For each framework, evaluate:
- **License** (MIT/Apache vs GPL/AGPL vs “fair-code”)
- **TypeScript friendliness** (first-class TS is a big accelerant)
- **Embedding model** (SDK/components vs separate app)
- **Multi-tenant viability** (config, auth, data boundaries)
- **Extensibility** (plugin system, webhooks, event hooks)
- **Operational burden** (self-hosting, upgrades, migrations)

---

## 1) Workflow automation / orchestration

These are closest to your “AI workflows built into code” positioning.

- **n8n**: workflow automation with a huge connector ecosystem; strong for rapid workflows but watch licensing/embedding constraints.
- **Windmill**: open-source developer platform for building internal tools + scripts/workflows; good for ops consoles.
- **Kestra**: event-driven orchestration with strong scheduling and execution semantics; can underpin workflow runs/logging.
- **Temporal** (core is open-source): best-in-class durable workflows; more complex, but the reliability story is unmatched.
- **Inngest** (depending on licensing/hosting model): event-driven function orchestration (often “serverless jobs” oriented).

Integration pattern:
- Use your UI/admin for workflow authoring and run introspection
- Use the framework for execution, retries, scheduling, and durable state

---

## 2) Admin / internal tooling UI frameworks (React)

Use these to speed up “admin” surfaces, tables, filters, CRUD, RBAC gating, etc.

- **refine**: React framework for building data-heavy admin apps; supports table/list/detail patterns.
- **react-admin**: mature React admin framework; huge ecosystem for CRUD and data providers.
- **ToolJet**: OSS internal tools platform (low-code); best when you want quick back-office pages.
- **Appsmith**: OSS internal tools; good for rapid internal dashboards.

Integration pattern:
- Keep your domain-driven layout, but use one of these for scaffolding list/detail screens fast.
- Ensure your design system + auth model can be integrated cleanly (avoid “two apps” if possible).

---

## 3) Headless CMS (content + schemas + media)

If you need blogs/landing pages and marketing ops to be fast:

- **Payload CMS**: TypeScript-first CMS, strong developer ergonomics.
- **Strapi**: widely used OSS headless CMS with plugin ecosystem.
- **Directus**: “data-first” headless CMS that sits on top of a SQL DB.

Integration pattern:
- Use CMS for marketing content only; do not let it become a second product database.
- Use webhooks to mirror published content into your own cache tables if needed.

---

## 4) Search (fast wins for ecommerce UX)

- **Meilisearch**: easy-to-run full-text search with typo tolerance; great for “instant search”.
- **Typesense**: fast search with good developer experience; strong for product search.

Integration pattern:
- ETL products/collections into search index
- Expose merch rules + synonyms in admin

---

## 5) Analytics (product + event analytics)

- **PostHog**: open-source product analytics (events, funnels, feature flags depending on plan).
- **Metabase**: BI dashboards for internal reporting on Supabase/Postgres.
- **Apache Superset**: BI tool (heavier than Metabase, powerful).

Integration pattern:
- Use PostHog for “product usage” analytics (admin usage, workflow usage).
- Use Metabase/Superset for commerce reporting on Supabase tables.

---

## 6) Feature flags (safe rollouts per client)

- **Unleash**: open-source feature flag platform (multi-environment, strategies).

Integration pattern:
- Your “SaaS options” become flags/entitlements.
- Roll new features gradually across clients.

---

## 7) Observability (don’t reinvent)

- **OpenTelemetry**: instrumentation standard (traces/metrics/logs).
- **Prometheus + Grafana**: metrics collection + dashboards.

Integration pattern:
- Instrument workflow runs, webhook ingestion, Shopify API calls, and background jobs.

---

## 8) Background jobs / queues (if you don’t use a workflow engine)

- **BullMQ**: Node job queue (Redis) for retries/scheduling.
- **Graphile Worker**: Postgres-backed jobs (nice if you want to stay inside Postgres).

Integration pattern:
- Webhooks enqueue jobs, jobs mutate Shopify + write to Supabase.

---

## 9) Recommendations for your situation (pragmatic)

If your main goal is to ship repeatable client builds fast:
- Start with **react-admin** or **refine** patterns for admin CRUD and list/detail speed.
- Pick **one** execution layer: either **Temporal/Kestra** (durable workflows) or a lighter queue like **BullMQ**.
- Add **Meilisearch/Typesense** early if product discovery matters.
- Add **Unleash** when you start offering “options” and staged rollouts.

If you want, we can turn this into a scored spreadsheet with:
- license risk
- time-to-integrate
- value per client
- ops burden

