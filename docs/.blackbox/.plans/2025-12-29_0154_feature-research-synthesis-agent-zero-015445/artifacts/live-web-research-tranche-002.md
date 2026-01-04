---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
---

# Live Web Research — Tranche 002 (Returns + Shipping + Helpdesk OSS)

Purpose: produce a **fresh, web-sourced** list of open-source competitors and “cool code” that maps directly to:
- returns/exchanges/RMA
- shipping labels/rates/tracking
- helpdesk/shared inbox + “action center” patterns

Notes:
- Licenses are best-effort from repo pages; confirm in each repo before adoption.
- “<1 week integration” assumes **service boundaries** + “read-only first” + keep scope tight.

## 🔁 Returns / Exchanges / RMA (OSS + code we can leverage)

### Bagisto RMA (MIT) — ecommerce RMA module

- Repo: `https://github.com/bagisto/bagisto-rma`
- Why it’s useful:
  - A concrete, permissive-licensed **RMA workflow**: return / cancel / exchange.
  - Good reference for **admin decision loop**: request → review reason → approve → resolve.
- Vibe-coding path:
  - Copy workflow states + UI patterns; integrate with Shopify data model rather than adopting Bagisto wholesale.

## 🚚 Shipping labels / rates / tracking (OSS platforms)

### Karrio — programmable shipping APIs (license: verify)

- Repo: `https://github.com/karrioapi/karrio`
- What it gives:
  - Multi-carrier rates, label purchase, tracking objects, and a dashboard.
  - Clear “shipping integration is painful” framing + APIs-as-product posture.
- Integration style:
  - Service boundary (Docker) + our admin as UI; sync “runs” and “exceptions” into our DB.

### Purplship — multi-carrier shipping API (license: verify)

- Repo: `https://github.com/EzeeSpace/purplship`
- What it gives:
  - Rating API + tracking API + shipping API; OSS edition described as “core functionality”.
- Integration style:
  - Service boundary; adopt pieces, not the full “shipping software”.

### PackageMate (MIT) — self-hosted package tracking

- Repo: `https://github.com/jat255/PackageMate`
- What it gives:
  - A small full-stack reference for “tracking entries → carrier status → dashboard”.
- Integration style:
  - Inspiration + optionally reuse patterns for a “tracking dashboard” inside our admin.

### Fleetbase — logistics OS (license: verify)

- Website: `https://fleetbase.io/`
- Why it’s useful:
  - Great source of “logistics admin primitives” patterns: dispatch, tracking, extensions marketplace.
- Integration style:
  - Inspiration only unless license + integration approach are clarified.

### Shopify shipping/fulfillment sample app (official sample; license: verify)

- Docs + repo link: `https://shopify.github.io/shipping-fulfillment-app/`
- Why it’s useful:
  - Concrete patterns for being a fulfillment partner: carrier rates, fulfillments, tracking updates.
- Integration style:
  - Reference implementation for Shopify APIs; helps us not reinvent basic flows.

## 🎫 Helpdesk / Shared inbox / Ticketing (OSS alternatives)

### Zammad (AGPL-3.0 — FLAG)

- Repo: `https://github.com/zammad/zammad`
- Why it’s useful:
  - Mature helpdesk patterns: tickets, triage, knowledge, API.
- License note:
  - AGPL is restrictive for embedding; treat as **flagged**, but still valuable for UI/workflow ideas.

### osTicket (GPL-2.0 — FLAG)

- Repo: `https://github.com/osTicket/osTicket`
- Why it’s useful:
  - Classic ticketing system; clean “how tickets work” workflow baseline.
- License note:
  - GPL-2.0 is restrictive; treat as **flagged** for direct integration.

### UVdesk community helpdesk (OSL-3.0 — FLAG/VERIFY)

- Org: `https://github.com/uvdesk`
- Main community repo: `https://github.com/uvdesk/community-skeleton`
- Why it’s useful:
  - Strong feature list: mailbox integrations, saved replies, workflows, KB/FAQ, API.
- License note:
  - OSL-3.0 is copyleft-ish; treat as **verify/flag** before using code.

### FreeScout (AGPL-3.0 — FLAG)

- Repo: `https://github.com/freescout-help-desk/freescout`
- Why it’s useful:
  - “Shared inbox” competitor to Help Scout / Zendesk; lightweight hosting requirements.
- License note:
  - AGPL is restrictive; use as workflow inspiration rather than embed.

## ⚡ Top 20 “<1 week integration” candidates (web-sourced shortlist)

This list favors:
- permissive licenses OR “verify” but small scope
- clear service boundary
- obvious admin value quickly

1) Bagisto RMA (MIT) — `https://github.com/bagisto/bagisto-rma`
2) PackageMate (MIT) — `https://github.com/jat255/PackageMate`
3) Shopify shipping/fulfillment sample (reference) — `https://shopify.github.io/shipping-fulfillment-app/`
4) Karrio (verify) — `https://github.com/karrioapi/karrio`
5) Purplship (verify) — `https://github.com/EzeeSpace/purplship`
6) UVdesk community skeleton (OSL-3.0 verify/flag) — `https://github.com/uvdesk/community-skeleton`
7) Zammad (AGPL flagged) — `https://github.com/zammad/zammad`
8) FreeScout (AGPL flagged) — `https://github.com/freescout-help-desk/freescout`
9) osTicket (GPL flagged) — `https://github.com/osTicket/osTicket`
10) Fleetbase (verify) — `https://fleetbase.io/`

## ➡️ Next tranche (planned)

- “Action center” patterns: support inbox + embedded order context + safe actions (refund/replace/hold).
- “Shipping exceptions” patterns: retries + auto-recover + “needs attention” queues.
- OSS target: find 10 more permissive-licensed projects in returns/shipping/support via GitHub search (requires token due to rate limiting).

