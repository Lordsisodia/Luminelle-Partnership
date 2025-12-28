# Deep Research Context Pack (Lumelle)

Date: 2025-12-28

This file is meant to be copy/pasted or referenced as shared context for multi-hour research runs (Deep Research or other agents).

It captures:
- product positioning + business model
- current client profile
- architecture constraints (repo conventions)
- existing internal research seed docs

---

## 1) Product / Positioning (what we’re building)

### One-line
Shopify-connected ecommerce experiences with a custom admin + Supabase-backed data layer, differentiated by **AI-driven workflows** that make ops faster and safer.

### What it is (today)
- Delivered as **custom builds per client**
- Internally structured like a **SaaS**: ~95% repeatable functionality and code structure; UI and selected options vary per client.
- Shopify is the **system of record** for commerce (orders/products/checkout).
- Supabase is the **data/ops layer** (sync, analytics, workflow state, admin surfaces).
- Future direction: transition into a configurable SaaS where merchants can self-select modules/options.

### What it is *not*
- Not trying to replace Shopify checkout/core primitives right now.
- Not “just a theme”: includes admin, workflows, and backend services.

---

## 2) Current Client Snapshot (research target)

Vertical: women’s beauty products (e.g., shower caps, heatless curlers)

Order volume: ~10,000 orders/month (approx; directionally relevant for ops tooling)

Near-term integrations:
- Shopify (permanent for now)
- Stripe and others later, as other clients come in (multi-integration platform direction)

Key differentiator goal:
- AI-driven workflows embedded in the product (not just “AI copywriting”)

---

## 3) What we want from Deep Research (deliverables)

We want outputs that can be turned into:
- a **feature matrix** (what competitors offer)
- a **module checklist** (Catalog Ops, Returns Ops, CX Ops, etc.)
- a **prioritized build roadmap** (what to build next for the platform)
- a shortlist of **open-source frameworks** that accelerate delivery

Preferred output formats:
- Markdown tables
- CSV-like tables in Markdown
- Clear “top 10 recommendations” with rationale
- Citations/links for every non-obvious claim (pricing, features, limits)

---

## 4) Repo Architecture / Constraints (important for build planning)

### Repo overview (from README.md)
````md
# Lumelle App (Domain-first Vite/React)

Modernized, AI-friendly layout with domain isolation and UI/logic/data separation.

## Quick start
```bash
npm install
npm run dev      # start Vite dev server
npm run typecheck
npm run build
```

## Key paths
- `src/domains/` – bounded contexts:
  - `landing`, `blog`, `shop` (products/cart/checkout/shared), `account`, `auth`, `admin`, `shopify`.
  - Each domain uses `ui/{pages,sections,components,layouts}`, plus `logic/`, `data/`, `hooks/`, `providers/` as needed.
- `src/lib/` – shared helpers (`lib/utils/*`, `lib/ui.ts`).
- `functions/api/**` – **Cloudflare Pages Functions** API implementation (`/api/*` on Cloudflare Pages).
- `api/**` – legacy **Vercel** serverless snapshot (kept for reference; not used on Cloudflare).
- `docs/` – project knowledge base; see `docs/ARCHITECTURE-HOWTO.md` and `docs/domains-README.md`.
- Automated PR reviews (optional): see `docs/ai-code-review.md`.

## Conventions
- If it renders, it lives in `ui/`.  
- Behavior belongs in `logic/`; data fetching in `data/`; co-locate types with their code.  
- Use domain aliases: `@landing`, `@shop`, `@blog`, `@admin`, `@auth`, `@account`, `@shopify`, `@/lib/*`.
- Shared UI helpers live in `src/lib/ui.ts`.

## Environment
Copy `.env.example` to `.env` and fill Shopify/Supabase/Clerk keys as needed. See `docs/ARCHITECTURE-HOWTO.md` for details.

## Shopify webhooks (orders → Supabase)
- Shopify signs Admin API webhooks with your app **API secret / client secret** (`SHOPIFY_API_SECRET`).
- Some older deployments also use `SHOPIFY_WEBHOOK_SECRET`; keep it set to the **same value** as `SHOPIFY_API_SECRET` (or omit it if unused).
- Webhook callback URLs can’t be on your shop’s own domains; use a separate receiver domain (e.g. your Cloudflare Pages `*.pages.dev` URL).
- Quick sanity check: `node scripts/check-orders-webhook.mjs --url=https://<your-app-url>` should return `200 OK` for `SHOPIFY_API_SECRET`.
````

### Architecture conventions (from docs/ARCHITECTURE-HOWTO.md)
````md
# Architecture How-To

Date: December 10, 2025

## When adding a new feature
1) Pick the domain first (landing, shop/products, shop/cart, shop/checkout, blog, auth, account, admin, shopify).
2) Place UI under `src/domains/<domain>/ui/`:
   - pages/ – route entry components
   - sections/ – reusable page sections
   - components/ – small domain-only UI
   - layouts/ – shell wrappers
3) Put behavior in `logic/` and data fetching in `data/` inside the same domain; keep React out of `logic/`.
4) Types live beside the code that uses them (same folder), not in a global types folder.
5) Shared helpers belong in `src/lib/` (see `lib/utils/*`, `lib/ui.ts`). Avoid creating new shared directories.
6) Cart/Checkout specifics:
   - Cart state/providers → `shop/cart/providers/`
   - Cart mutations → `shop/cart/logic/`
   - Checkout flows → `shop/checkout/ui/` (UI) and `shop/checkout/logic/` (behavior)
7) Shopify Admin (embedded) lives in `shopify/ui/` and never imports storefront code.

## Commands
- `npm run typecheck` – TypeScript check
- `npm run lint` – (if configured) linting
- `npm run dev` – dev server

## Naming tips
- Sections: one folder per feature, PascalCase file inside (e.g., `hero-shop/HeroShop.tsx`).
- Keep imports using domain aliases: `@landing/...`, `@shop/...`, `@blog/...`, etc.

## Safety checklist
- Never import server code into UI; server lives under `api/_lib/`.
- If sharing a helper, ask: is it truly cross-domain? If not, keep it in the domain.
````

### Domain layout (from docs/domains-README.md)
````md
# Domains Overview (2025-12-20)

Domain-first layout under `src/domains/`:
- `client/` – marketing, shop (`products/`, `cart/`, `checkout/`), `account/`, `rewards/`
- `admin/` – `catalog/`, `pages/`, `media/`, `blog/`, `analytics/` (orders/settings scaffolded)
- `creator/`
- `blog/`
- `platform/` – `auth/`, `commerce/` (Shopify), `storage/` (Supabase), plus `cms/`, `feature-flags/`, `observability/`, `design-tokens/`
- `ui-kit/` – domain-agnostic primitives (small, optional)

Each slice keeps the layered shape:
- `ui/` (pages, sections, components, layouts)
- `logic/` (behavior/services, no JSX)
- `data/` (fetchers, mappers, content)
- `hooks/`, `providers/`, `state/` as needed
- Types colocated.

Aliases:
- `@client`, `@admin`, `@creator`, `@blog`, `@platform`, `@ui-kit`, `@` (root)
- Cross-domain access should go through `@platform/*` or the owning domain’s surface exports. No deep imports across domains.

How to add a feature (quick):
1) Pick the domain and, if applicable, the flow (e.g., `client/shop/products/pdp`).
2) UI → `ui/{pages,sections,components,layouts}`; logic → `logic/`; data → `data/`; state/providers/hooks alongside.
3) Keep vendor clients in platform; domains consume `@platform/*`.
4) Avoid new “shared” folders—use platform or domain-owned code.
5) No server code in `src/`; backend lives in `api/`.

Commands
- `npm run typecheck`
- `npm run lint`
- `npm run dev`
````

Notes for planners:
- UI code lives under `src/domains/**/ui/`.
- Behavior in `logic/`, data access in `data/`.
- Vendor clients belong in `@platform/*`.
- Backend/serverless: Cloudflare Pages Functions in `functions/api/**`.

---

## 5) Internal Research Seed Docs (already created)

### Competitor feature universe (master checklist)
````md
# Competitor Feature Map (Lumelle / Shopify-connected AI Ops)

Date: 2025-12-28

This doc is a practical “feature universe” aggregated from the kinds of products that compete with a Shopify-connected, custom-built (but repeatable) commerce + admin + workflow stack.

The goal is not to copy any one competitor. The goal is to:
- Know what buyers expect as “table stakes”
- Identify the few areas where we can be meaningfully better
- Convert that into a repeatable build checklist (SaaS-shaped, even if delivered as custom builds)

---

## 1) Competitive Set (how buyers will compare you)

### A. Hosted commerce platforms (direct)
They solve “store + checkout + admin” end-to-end.

Examples: Shopify, BigCommerce, Adobe Commerce (managed), Shopware (SaaS).

### B. Composable / enterprise commerce (direct for larger clients)
They win on control + scale + multi-system integration and tend to have strong B2B/OMS needs.

Examples: commercetools, Spryker, Elastic Path, Salesforce Commerce Cloud.

### C. Open-source / self-host commerce (direct for cost/control buyers)
They win on “own the stack”, customization, and no platform tax (but require ops).

Examples: WooCommerce, Magento Open Source, Saleor, Medusa, Sylius, Vendure.

### D. “Ops layer” on top of Shopify (functional competitors)
These tools can replace big chunks of your differentiation if you don’t go deeper than “workflow automation + UI”.

Examples:
- automation: Shopify Flow, Zapier, Make, n8n, Workato
- retention: Klaviyo, Attentive, Postscript
- support: Gorgias, Zendesk
- subscriptions: Recharge, Skio
- shipping/returns: ShipStation, AfterShip, Loop Returns
- personalization/upsells: Rebuy, Nosto
- analytics attribution: Triple Whale, Northbeam

---

## 2) Feature Universe (what competitors collectively offer)

Use this as a master checklist. For each client, mark:
- **Needed now**
- **Needed later**
- **Not needed**

### 2.1 Storefront & Merchandising
- Theme / page builder
- Landing page sections, CMS blocks
- PDP templates by product type
- Variant and option management
- Bundles / kits / sets
- Gift cards
- Subscriptions (membership + subscribe-and-save)
- Preorder / backorder
- Back-in-stock alerts
- Size guides / ingredient guides
- UGC on PDP (reviews, photos, video)
- Cross-sell / upsell (PDP, cart, post-purchase)
- Personalization rules (segments → content)
- Multi-currency / multi-language (i18n)
- SEO controls (meta, structured data, canonical, redirects)
- Search (synonyms, typo tolerance, merch rules)
- Recommendations (“frequently bought together”, “you may also like”)

### 2.2 Checkout, Payments, Taxes
- Checkout customization (limited in Shopify; deeper elsewhere)
- Multiple payment methods (cards, wallets, BNPL)
- Fraud checks / risk rules
- Tax calculation + nexus support
- Address validation
- Shipping rate logic + carrier integrations
- Discount rules and stacking controls
- Free shipping thresholds and promos

### 2.3 Orders & Fulfillment Ops
- Order routing rules (by location, inventory, SLA)
- Partial fulfillment and split shipments
- Backorder handling workflows
- Cancellations and refunds with policy rules
- Exchanges
- Warehouse pick/pack queues
- Batch label printing
- Carrier selection optimization
- Shipment tracking communications
- Delivery exceptions handling
- “Where is my order” self-serve portal

### 2.4 Returns & Exchanges (a major buyer pain)
- Return portal
- Return reasons taxonomy
- Refund vs store credit rules
- Exchange flows (variant selection)
- RMA labels and drop-off options
- Fraud/abuse signals (return rate, wardrobing)
- Warehouse receiving workflows
- Inventory reconciliation on return
- Customer notifications + support deflection
- Reporting (cost of returns, return drivers)

### 2.5 Customer Support & CX
- Unified customer timeline (orders, tickets, returns, shipments, emails, SMS)
- Macros + suggested replies
- Policy enforcement (warranty, returns, shipping)
- Identity verification for high-risk actions
- Escalation and SLA routing
- Agent assist AI (grounded suggestions)
- Knowledge base + self-serve flows

### 2.6 Growth & Retention
- Email/SMS campaigns + flows
- Segmentation (RFM, cohorts, tags, events)
- Loyalty points and tiers
- Referral programs
- Post-purchase sequences
- Winback flows
- Review request flows
- A/B testing and experimentation
- Influencer/affiliate tracking

### 2.7 Content & Brand Ops
- Headless CMS integration
- Media library + image transformation
- Asset QA (resolution, compression, alt text)
- Blog publishing + SEO workflows
- Social content planning (optional)

### 2.8 Analytics & Finance
- Core commerce metrics (AOV, conversion, LTV, CAC)
- Attribution (first/last, modeled, blended)
- Funnel analytics (PDP → ATC → checkout)
- Cohorts and retention curves
- Profit & margin analytics (COGS, shipping, returns)
- Inventory analytics (stockouts, aging)
- Anomaly detection (refund spikes, chargebacks)

### 2.9 Admin UX (where you can be “best”)
- Bulk actions with preview/dry-run
- Filter + saved views
- Powerful search across admin objects
- Inline editing with validation
- CSV import/export with mapping
- Audit log for every change
- Role-based access control (RBAC)
- Approval workflows for high-impact changes
- Change requests / tickets inside admin

### 2.10 Automation & Workflows (core differentiator)
- Triggers: Shopify webhooks, schedules, manual, “threshold crossed”
- Conditions: data-based rules, segments, inventory, fraud signals
- Actions: mutate Shopify, notify, create tasks, call APIs, write to DB
- Human-in-the-loop approvals
- Retries, idempotency, deduping
- Versioned workflow definitions
- Replay/simulate on historical events
- Run logs + debugging UI
- Alerting (Slack/email) on failures
- Per-client “playbooks” as templates

### 2.11 Platform / DevOps Capabilities (SaaS-shaped)
- Multi-tenant separation (data + auth)
- Secrets management
- Environment separation (dev/stage/prod)
- Feature flags and staged rollouts
- Observability (logs/metrics/traces)
- Background jobs and queues
- Webhook ingestion at scale
- Rate limit protection and backpressure
- Data backfills and reconciliations

---

## 3) “Must Beat” for Beauty DTC (10k orders/month)

The fastest way to stand out is to crush painful, repetitive ops:

### Must Beat #1: Returns + Exchange economics
- Faster, policy-driven decisions
- Lower support load
- Better exchange conversion (keep revenue)

### Must Beat #2: Support timeline + AI grounded in customer data
- One page: customer → orders → shipments → returns → tickets
- AI suggests the next best action (refund? replacement? store credit?) with explanation

### Must Beat #3: Catalog ops speed (especially variants)
- Bulk edits with safe previews
- QA for titles/ingredients/images/SEO

### Must Beat #4: Workflow reliability and auditability
- Buyers will trust automation only if it’s observable and reversible

---

## 4) Packaging Idea (so custom builds “feel like SaaS”)

Offer modules that map to budgets/outcomes:
- **Catalog Ops**
- **Order Ops**
- **Returns Ops**
- **CX Ops**
- **Growth Ops**
- **Analytics Ops**
- **Platform Ops** (RBAC/audit/observability)

Each module should have:
- a default workflow set (playbooks)
- a UI surface (admin pages)
- an integration checklist (Shopify + others)
````

### OSS shortlist (framework categories + integration patterns)
````md
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
````

---

## 6) Research framing (what “competitor” means here)

We consider “competitors” to include:
- direct commerce platforms (Shopify, BigCommerce, etc.)
- composable enterprise commerce (commercetools, Spryker, etc.)
- open-source headless/self-host (Medusa, Saleor, etc.)
- functional competitors: tools that replace key parts of our differentiation on top of Shopify
  (automation/workflows, returns, support, retention, analytics attribution)

---

## 7) Instructions for other agents (recommended)

When running research:
1) Optimize for **high-signal** competitors (top 10–20 per research question), not exhaustive lists.
2) Always extract:
   - packaging/pricing model
   - integration story (Shopify-first? platform-agnostic? enterprise?)
   - operational depth (approvals, audit logs, replay/debuggability)
   - AI claims: what is real vs marketing
3) Output should map findings into the module vocabulary:
   - Catalog Ops / Order Ops / Returns Ops / CX Ops / Growth Ops / Analytics Ops / Platform Ops
