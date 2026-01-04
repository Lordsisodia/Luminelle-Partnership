---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
---

# Live Web Research — Tranche 004 (Verified OSS Competitors + Licenses)

Purpose: add a **verified, linkable** set of OSS competitors and OSS building blocks that we can realistically leverage for:
- helpdesk / shared inbox (“action center” inspiration)
- shipping labels/rates/tracking primitives
- returns / RMA workflows
- commerce platform reference implementations (admin UX patterns)

This tranche is “verified” in the sense that each item is anchored to an authoritative page (usually GitHub) that states what it is and (when available) the license.

## 🎫 Helpdesk / Shared Inbox (OSS competitors)

### Chatwoot — open-source omnichannel support desk (license: verify in repo)

- Website: https://www.chatwoot.com/  (open-source, self-hosted positioning) citeturn1search1
- Repo: https://github.com/chatwoot/chatwoot citeturn1search3
- Why it’s relevant:
  - The best “action center” reference: inbox, assignment, notes, KB, AI agent/coprocess patterns.
- License bucket: verify (confirm in repo license file).

### Zammad — open-source helpdesk (AGPL-3.0 — FLAG)

- Repo: https://github.com/zammad/zammad (license AGPL-3.0) citeturn1search2
- Why it’s relevant:
  - Mature ticketing workflows, triage UX, and integrations patterns.
- License bucket: flagged (AGPL).

### FreeScout — self-hosted help desk & shared mailbox (AGPL-3.0 — FLAG)

- Repo: https://github.com/freescout-help-desk/freescout (license AGPL-3.0) citeturn0search1
- Why it’s relevant:
  - Lightweight “shared inbox” patterns; fast to run in a service boundary.
- License bucket: flagged (AGPL).

### osTicket — open-source ticketing system (GPL-2.0 — FLAG)

- Repo: https://github.com/osTicket/osTicket (license GPL-2.0) citeturn2search0
- Why it’s relevant:
  - Classic ticket workflow baseline and “how tickets should work” reference patterns.
- License bucket: flagged (GPL).

### UVDesk Community — helpdesk skeleton (OSL-3.0 — VERIFY/FLAG)

- Repo: https://github.com/uvdesk/community-skeleton (license OSL-3.0) citeturn2search2
- Why it’s relevant:
  - Feature-complete helpdesk patterns (workflows, mailbox integration, KB/FAQ).
- License bucket: verify/flag (OSL-3.0).

## 🚚 Shipping / Labels / Tracking (OSS primitives)

### Karrio — programmable shipping APIs (license: verify in repo)

- Repo: https://github.com/karrioapi/karrio citeturn0search0
- Why it’s relevant:
  - Service-boundary shipping primitives (rates, labels, tracking) + dashboard.
- License bucket: verify (confirm SPDX in repo).

### Purplship — open source multi-carrier shipping API (license: verify in repo)

- Repo: https://github.com/EzeeSpace/purplship citeturn0search2
- Why it’s relevant:
  - Shipping/rating/tracking API surface; good “shipping abstractions” reference.
- License bucket: verify.

## 🔁 Returns / RMA (OSS workflows)

### OCA RMA (Odoo addons) (AGPL-3.0 — FLAG)

- Repo: https://github.com/OCA/rma (license AGPL-3.0) citeturn0search3
- Why it’s relevant:
  - Concrete RMA states + reason codes + warranty + sale order integration (workflow reference).
- License bucket: flagged (AGPL).

## 🛒 Commerce Platforms (OSS competitors / admin UX references)

### Bagisto — Laravel ecommerce platform (MIT)

- Repo: https://github.com/bagisto/bagisto (MIT) citeturn1search0
- Why it’s relevant:
  - Broad admin IA: B2B, marketplace, multi-tenant, POS, headless; strong source of feature ideas.
- License bucket: safe (MIT).

### Shopizer — Java ecommerce software (Apache-2.0)

- Repo: https://github.com/shopizer-ecommerce/shopizer (Apache-2.0) citeturn2search4
- Why it’s relevant:
  - Java/Spring-style commerce + admin patterns; useful for workflows and domain state machines.
- License bucket: safe (Apache-2.0).

### Broadleaf Commerce CE — source-available (Fair Use — FLAG)

- Repo: https://github.com/BroadleafCommerce/BroadleafCommerce (Fair Use license; not Apache-2 OSS) citeturn2search1
- Why it’s relevant:
  - Enterprise-grade admin + domain model patterns; strong inspiration, but not “drop-in OSS.”
- License bucket: flagged (source-available / fair use).

## ✅ “< 1 week integration” shortlist (practical, vibe-coding friendly)

These are the best immediate candidates to *integrate or borrow patterns from quickly*:

1) Bagisto (MIT) — broad admin patterns + workflows citeturn1search0
2) Shopizer (Apache-2.0) — commerce domain workflows citeturn2search4
3) Chatwoot (verify) — best-in-class action-center patterns citeturn1search3turn1search1
4) Karrio (verify) — shipping primitives via service boundary citeturn0search0
5) Purplship (verify) — shipping API primitives citeturn0search2

Flagged but still valuable as pattern references:
- Zammad (AGPL) citeturn1search2
- FreeScout (AGPL) citeturn0search1
- osTicket (GPL) citeturn2search0
- UVDesk (OSL-3.0) citeturn2search2
- OCA/rma (AGPL) citeturn0search3
- Broadleaf (fair-use) citeturn2search1

## ➡️ Next tranche (planned)

- Build a “Repo deepening queue” for the safe/verify items above:
  - exact modules/files to read
  - 10–20 specific UI/workflow patterns to extract
  - 1-day POC slice + 1-week integration slice
