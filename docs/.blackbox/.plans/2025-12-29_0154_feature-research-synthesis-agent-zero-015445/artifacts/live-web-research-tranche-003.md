---
status: draft
last_reviewed: 2025-12-29
owner: agent-zero
---

# Live Research — Tranche 003 (Action Center + Exceptions Queues)

Purpose: turn the competitor evidence corpus into **copyable UX + workflow patterns** for a merchant-admin-first product.

This tranche focuses on:
- 🎫 Support “Action Center” (ticket/inbox + embedded order context + safe actions)
- 🚨 Exceptions queues (shipping/returns/automation failures)
- 🧾 Auditability (logs, approvals, diff)

This is not theory — each section includes **evidence file pointers** inside our research corpus.

## 🎫 1) Support “Action Center” (best patterns)

Core idea: agents/ops should resolve issues **without context switching**.

### Patterns to copy (10)

1) **Unified customer timeline**
   - What it is: a single scrollable timeline (orders, messages, deliveries, returns, refunds).
   - Why it wins: reduces “what happened?” time to near-zero.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/kustomer.md`

2) **Ticket → embedded order context panel**
   - What it is: ticket view with side panel (order status, tracking, items, payments).
   - Safe actions: refund, reship, hold, cancel, replace (with guardrails).
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/zendesk.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/intercom.md`

3) **AI agent escalation states**
   - What it is: AI tries first → shows confidence → handoff to human with full context.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/intercom.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/zendesk.md`

4) **Macros / saved replies + action macros**
   - What it is: templates for responses + button-driven “do X and reply Y”.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/zendesk.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/re-amaze.md`

5) **Queue triage with clear status semantics**
   - What it is: “needs attention”, “waiting on customer”, “resolved”, “snoozed”.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/help-scout.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/re-amaze.md`

6) **Assignment + ownership**
   - What it is: clear “assignee”, “team”, “follow”, “handoff”.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/help-scout.md`

7) **Customer identity resolution (lightweight)**
   - What it is: “this person = these orders = these devices = these messages”.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/segment.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/rudderstack.md`

8) **Approval gating for risky actions**
   - What it is: refunds/cancellations require approval when above threshold.
   - Evidence (governance patterns):
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/webflow.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/contentful.md`

9) **Audit trail attached to actions**
   - What it is: “who did what” for each action taken from the support view.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shopify.md`

10) **“Next best action” suggestions (non-AI first)**
   - What it is: rules-first suggestions (“shipment delayed → offer refund or reship”).
   - Evidence (automation primitives):
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/zapier.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/make-integromat.md`

## 🚨 2) Exceptions queues (shipping/returns/automation)

Core idea: every async system needs a **single place to see failures** and a **button to fix/retry**.

### Patterns to copy (10)

1) **Shipping exception queue**
   - Examples: label failed, address issue, carrier delay, delivery exception.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md`

2) **Carrier rules engine + deterministic fallback**
   - If rule fails → fallback carrier/service; record why.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shippo.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/easypost.md`

3) **Fulfillment ops dashboard**
   - Inventory visibility + shipments + exceptions.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipbob.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipmonk.md`

4) **Warehouse state machine**
   - Receive → putaway → pick → pack → ship → reconcile.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shiphero.md`

5) **Returns exception queue**
   - Stuck states: label not used, package not received, refund pending.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/aftership-returns.md`

6) **Run history for automations**
   - Filterable run list: status, duration, payload, error.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/n8n.md`
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/pipedream.md`

7) **Retries with idempotency**
   - Retry button that does not double-charge/double-refund.
   - Evidence (workflow engines and run patterns):
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/temporal.md`

8) **Connector setup wizard + validation**
   - “Test connection” + permissions explanation + scopes.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/airbyte.md`

9) **Event pipeline health panel**
   - Drops, schema errors, backfills.
   - Evidence:
     - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-03-competitors-adjacent-015445/competitors/evidence/segment.md`

10) **Single “needs attention” inbox across systems**
   - Returns + shipping + automation + support all feed one queue.
   - Evidence anchor points:
     - support: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/zendesk.md`
     - shipping: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md`

## ✅ 3) Immediate build-ready “thin slice” spec (1 week)

If we ship one thing next week, ship:

### “Support Action Center + Exceptions Queue” MVP

- Screens:
  1) Ticket list + filters + assignment
  2) Ticket detail with **Order Context Panel**
  3) Exceptions queue (shipping/returns/automation) with **retry + resolution**
- Required primitives:
  - RBAC + audit log
  - async run history table
  - safe action guardrails (approvals thresholds)
- Why this is the best “vibe coding” investment:
  - It makes every future feature easier to ship and safer to operate.

