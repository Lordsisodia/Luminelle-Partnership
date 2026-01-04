---
status: active
last_reviewed: 2025-12-29
owner: agent-zero
---

# Domain Glossary (vibe-coding defaults)

Purpose: keep naming consistent across specs so engineers + agents don’t invent new nouns per feature.

## 🧑‍🤝‍🧑 People / identity

- **tenant**: the merchant/org boundary (top-level isolation unit)
- **actor**: an authenticated user taking actions in the admin
- **role**: a named set of scopes (permissions)
- **scope**: `resource:action` (e.g. `returns:approve`)

## 🧾 Core commerce nouns

- **order**: a purchase entity; primary “timeline” surface
- **return**: a post-purchase reversal workflow tied to an order
- **return_item**: a per-line return (optional for MVP)
- **shipment**: fulfillment/shipping representation (optional for MVP)
- **refund**: money-moving action (always approval + audit)

## 🧰 Ops / workflow nouns

- **workflow**: a configured automation (trigger → steps/actions)
- **workflow_run**: one execution of a workflow (status + error + timestamps)
- **run**: generic async execution record (if you unify all async into one table)
- **approval**: a gating decision for risky actions (requested/approved/rejected)

## 🧾 Admin primitives

- **audit_log**: immutable record of write actions (“who did what, when, to what”)
- **feature_flag**: a per-tenant toggle (optionally rules-based rollout)
- **feature_flag_rule**: rollout configuration (percent/segment/tenant list)

## 🎫 Support nouns

- **support_task**: internal queue item/case linked to an order/customer
- **support_task_event**: timeline/history record for support tasks

## 📊 Analytics nouns

- **admin_event**: event captured from admin UI usage

