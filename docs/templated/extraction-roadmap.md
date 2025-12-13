# Extraction Roadmap (Hardening This Repo Into a Template)

This roadmap is focused on the “copy repo per client” model. The aim is to make new client spins predictable and fast without destroying the clean architecture.

---

## Guiding principles

1) Template architecture, not the brand.
2) Push variance into config + content.
3) Keep optional modules optional (admin tools, advanced sync, Stripe, etc.).
4) Minimize the number of files touched for a new client (excluding content).

---

## Phase 0 — Confirm template model

**Decision:** v1 template distribution is “copy this repo”.

Long-term we can evolve to:
- a generator, or
- shared packages,

but we design with that future in mind.

---

## Phase 1 — Define a single “config surface” (highest leverage)

Today, client-specific constants are scattered (brand names, storage keys, currency symbols, URLs).

Template goal:
- a single place to set client defaults such as:
  - `appSlug` (prefix for storage keys + events)
  - `brandName`
  - `currency` and formatting rules
  - `freeShippingThreshold` and shipping rules
  - key URLs (site URL, support URL, social URLs)

Why this matters:
- it turns client setup into a controlled checklist, not a full-text search adventure.

---

## Phase 2 — Standardize adapter boundaries (so the template stays flexible)

### Product data adapter
- input: product handle/ID
- output: product fields + content blocks (“sections”)
- implementations:
  - Shopify Storefront query
  - server proxy (private token, rate limits, instrumentation)
  - dev stub

### Blog adapter
- v1: typed content in repo
- later: MD/MDX or CMS

### Customer/order adapter
- auth: Clerk
- storage: Supabase
- parity: ensure Shopify customer exists
- order history:
  - Shopify order lookup
  - stored orders (if needed)

---

## Phase 3 — Template hardening (remove “Lumelle-isms”)

High priority fixes:
- Replace all `lumelle_*` storage keys with keys derived from `appSlug`.
- Centralize currency formatting (avoid hardcoded `£` across UI).
- Ensure blog is public and Clerk is only used for interactive features.

See `docs/templated/template-hardening-backlog.md` for the full list.

---

## Phase 4 — Operationalize “copy repo” into a repeatable process

Create a repeatable, documented flow:
- new client intake (what you need from them)
- new client setup steps (env vars + deploy)
- a short “clientization inventory” (where to rename/replace)

Start here:
- `docs/templated/new-client-intake.md`
- `docs/templated/new-client-setup-steps.md`
- `docs/templated/clientization-inventory.md`

