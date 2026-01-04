---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
---

# Web + GitHub OSS Competitors (Supplement)

Purpose: capture **additional open-source competitors + “cool code” repos** found via live web/GitHub research, beyond the initial OSS shortlist.

Policy reminders:
- Prefer permissive licenses; **flag GPL/AGPL** for review.
- Treat “NOASSERTION / unclear license” as **verify before use**.

## ✅ Open-source commerce platforms (competitors / reference implementations)

These are “real competitors” in the sense that they ship commerce primitives + have an admin surface you can learn from.

### Saleor (BSD-3-Clause)

- Core repo: `https://github.com/saleor/saleor`
- Admin dashboard repo (separate): `https://github.com/saleor/saleor-dashboard`
- Dev platform (docker-compose runner): `https://github.com/saleor/saleor-platform`
- Why it matters:
  - Strong reference for **GraphQL-first commerce + decoupled dashboard** architecture.
  - Dashboard is a real-world, production-grade “admin app” codebase (React/TS).
- “Cool code we can steal”:
  - Dashboard navigation IA, list/detail patterns, bulk actions, permission gating, table filtering.

### Bagisto (MIT)

- Core repo: `https://github.com/bagisto/bagisto`
- Headless GraphQL APIs: `https://github.com/bagisto/headless-ecommerce` (MIT)
- Next.js storefront: `https://github.com/bagisto/nextjs-commerce` (MIT)
- Why it matters:
  - Permissive license and extremely broad scope (marketplace, multi-tenant, POS, headless).
  - Valuable for **admin UX breadth** (channels, locales, currencies, access control).
- “Cool code we can steal”:
  - Admin panel IA and role/access-control surfaces (as product patterns).
  - Headless GraphQL API patterns + Next.js storefront structure.

### Solidus (license: verify)

- Core repo: `https://github.com/solidusio/solidus`
- Why it matters:
  - Mature Rails commerce framework (fork lineage from Spree).
  - Strong reference for **order/fulfillment/admin area** patterns.
- “Cool code we can steal”:
  - Admin area flows (pick/pack, refunds, adjustments) and operational state machines.

### Vendure (GPLv3 – FLAG)

- Core org: `https://github.com/vendure-ecommerce`
- Core repo: `https://github.com/vendure-ecommerce/vendure`
- Why it matters:
  - Modern TS/NestJS/GraphQL architecture with explicit **Admin API + Admin UI**.
- License note:
  - Repo indicates GPLv3 with commercial licensing available — treat as **flagged**.
- “Cool code we can steal”:
  - Plugin architecture patterns and admin extension points (conceptual inspiration).

### Medusa (MIT)

- Core repo: `https://github.com/medusajs/medusa`
- Why it matters:
  - Modern OSS commerce primitives + integrations ecosystem.
- “Cool code we can steal”:
  - Modular primitives and integration boundary patterns.

## 🧰 Open-source “admin dashboard” accelerators

These are less “competitors” and more “we can build faster” tools.

- Saleor Dashboard (React/TS) — `https://github.com/saleor/saleor-dashboard`
  - Use as a reference codebase for a serious, shipping admin UX.

- React Admin — `https://github.com/marmelab/react-admin`
  - Fast CRUD + list/detail + filters patterns.

- Refine — `https://github.com/refinedev/refine`
  - Admin app framework patterns (auth, routing, data providers).

## 🧩 Platform primitives (OSS we can use or imitate)

- Feature flags:
  - Unleash — `https://github.com/Unleash/unleash` (Apache-2.0)
  - Flagsmith — `https://github.com/Flagsmith/flagsmith` (BSD-3-Clause)
  - GrowthBook — `https://github.com/growthbook/growthbook` (verify license)
  - Flipt — `https://github.com/flipt-io/flipt` (GPL – FLAG)
  - GO Feature Flag — `https://github.com/thomaspoignant/go-feature-flag` (MIT)
  - Flipper — `https://github.com/flippercloud/flipper` (MIT; Ruby/Rails focused)

- Automation:
  - n8n — `https://github.com/n8n-io/n8n` (verify license)

- Analytics/BI:
  - Metabase — `https://github.com/metabase/metabase` (verify license)
  - Superset — `https://github.com/apache/superset` (verify license)

## 📈 Shopify analytics / tracking (OSS-adjacent)

These are valuable for “what features matter” and/or “cool code” (tracking, data layer, server-side events).

- Analyzify (Shopify analytics / tracking) — `https://github.com/analyzify`
  - Notes: strong “data layer + server-side tracking + privacy-first” surface area; useful for ideas even if not embedded.

## 🎯 Next “real research” slice (recommended)

If you want the **most leverage for our admin dashboard** with minimal time waste:

1) Deep-read `saleor/saleor-dashboard` as the primary “admin UX reference codebase”
2) Decide our admin scaffolding direction:
   - React Admin vs Refine vs “custom but borrow patterns”
3) Treat feature flags + auditability as immediate primitives (Unleash/Flagsmith)

## 🔗 Notes

- This file is intentionally “web sourced” and separate from the snapshot-based competitor evidence corpus.
- Each repo above should be run through:
  - license confirmation (LICENSE file)
  - maintenance signals (release cadence)
  - integration mode decision (embed vs service boundary vs inspiration only)
