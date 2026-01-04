---
status: draft
last_reviewed: 2025-12-28
owner: agent
---

# Features Catalog (Feature Hunt)

Purpose: build a **comprehensive feature universe** we can later rank for “vibe coding” (fast integration).

## ✅ How to use

- Keep this **broad** at first (capture everything).
- Later, the synthesis agent will dedupe and rank.

## 🧭 Taxonomy (use consistently)

- Admin / operations
- Merchandising / CRO
- Retention / lifecycle
- Analytics / experiments
- Content / SEO
- Customer / support
- Platform primitives (flags, jobs, audit logs, permissions)

## Feature list

### Admin / operations

- **Feature:** Unified order timeline + “single pane of glass”
  - Job to be done: see order status, customer context, and actions in one place.
  - Why high leverage: reduces support/ops time and mistakes.
  - Complexity guess: M (needs clean data model + integrations)
  - Dependencies (data/integrations): Shopify orders, shipping tracking, returns, support inbox
  - Competitors known for it: Shopify, Gorgias, AfterShip
  - OSS options (if any): React Admin / Refine (admin UI scaffolding)

- **Feature:** Role-based access control (RBAC) + granular permissions
  - Job to be done: safely give team members the right access.
  - Why high leverage: required for serious ops; reduces risk.
  - Complexity guess: M (but foundational)
  - Dependencies (data/integrations): auth + tenancy model + audit log
  - Competitors known for it: Shopify, BigCommerce, enterprise platforms
  - OSS options (if any): patterns from internal tools stacks; likely custom

- **Feature:** Audit log (“who changed what”)
  - Job to be done: trace changes, debug mistakes, satisfy compliance needs.
  - Why high leverage: massively reduces “mystery state” in ops.
  - Complexity guess: S/M (depends on event system)
  - Dependencies (data/integrations): event pipeline, admin actions
  - Competitors known for it: enterprise ops tooling
  - OSS options (if any): implement ourselves; borrow patterns

- **Feature:** Feature flags + staged rollouts (per-tenant)
  - Job to be done: ship safely, run betas, roll back instantly.
  - Why high leverage: makes “vibe coding” safer.
  - Complexity guess: S (if using OSS flag server)
  - Dependencies (data/integrations): tenant IDs, config distribution
  - Competitors known for it: LaunchDarkly, GrowthBook
  - OSS options (if any): Unleash, Flagsmith

#### Shipping / Delivery exceptions (Tranche #2 — 2025-12-29)

- **Feature:** Capture + edit tracking numbers & carrier mapping (admin)
  - What it is: ops can add or update tracking codes and carrier for a fulfillment/shipment.
  - Why merchant admin cares: reduces “WISMO” tickets; fixes carrier mismatches; unlocks event-driven notifications.
  - Stealable workflow (2–5 steps):
    - 1) Ops marks fulfillment as fulfilled and inputs tracking + carrier.
    - 2) System validates format + (optional) auto-detect carrier.
    - 3) Customer receives shipment notification with tracking link.
  - Thin slice (1–3 days): store tracking_code + carrier + public tracking URL + “resend shipping email”.
  - Evidence: Shopify fulfillments allow adding tracking number and selecting carrier. (S10)

- **Feature:** Bulk tracking import / bulk fulfillment updates
  - What it is: bulk mark orders fulfilled and then attach tracking numbers at scale.
  - Why merchant admin cares: reduces manual ops work for daily fulfillment batches.
  - Stealable workflow:
    - 1) Ops selects unfulfilled orders in admin.
    - 2) Bulk mark as fulfilled.
    - 3) Upload/enter tracking codes for those fulfillments.
  - Thin slice (1–3 days): CSV import (order_id, tracking_code, carrier) with validation errors report.
  - Evidence: Shopify supports bulk fulfillment and manual tracking updates. (S11, S10)

- **Feature:** Normalized shipment status model (carrier → canonical statuses)
  - What it is: map carrier-specific scan events into a small canonical state machine (in_transit, out_for_delivery, delivered, exception, etc.).
  - Why merchant admin cares: consistent dashboards + automation; reduces edge-case logic per carrier.
  - Stealable workflow:
    - 1) Ingest carrier checkpoints.
    - 2) Map to canonical status + substatus.
    - 3) Drive notifications and exception queues off canonical state.
  - Thin slice (1–3 days): store canonical_status + last_checkpoint + timestamp per shipment.
  - Evidence: AfterShip defines delivery status enums incl. Exception / AttemptFail. (S14) / 17TRACK defines main statuses and failure substatus patterns. (S19)

- **Feature:** Tracking event ingestion via webhooks (real-time updates)
  - What it is: receive tracking updates asynchronously (webhook push) rather than polling.
  - Why merchant admin cares: real-time exception detection + proactive comms; lower infra costs than polling.
  - Stealable workflow:
    - 1) Create a tracker for tracking_code (+ optional carrier).
    - 2) Receive webhook events when status changes.
    - 3) Update order/shipment timeline + trigger automations.
  - Thin slice (1–3 days): webhook endpoint + persist last status + show event log in admin.
  - Evidence: EasyPost tracking guide describes tracker.updated webhook events; trackers can be created via API. (S16, S18)

- **Feature:** Proactive shipping notifications triggered by tracking events (not fulfillment status)
  - What it is: send comms when tracking data is “real” (first scan), and at key milestones (out for delivery, exception, delivered).
  - Why merchant admin cares: reduces confusion and tickets; improves CX.
  - Stealable workflow:
    - 1) Subscribe to tracking status updates.
    - 2) On selected canonical statuses, send email/SMS with tracking link.
    - 3) Suppress notifications if shipment was already delivered before import.
  - Thin slice (1–3 days): email templates for in_transit/out_for_delivery/delivered + on/off toggles.
  - Evidence: AfterShip states notifications are based on tracking events and includes “Exception” in supported events. (S15, S14)

- **Feature:** Delivery exception queue (ops inbox for “exception”, “failed attempt”, “no scan”)
  - What it is: an internal queue of shipments that need attention, with reason codes and SLAs.
  - Why merchant admin cares: prevents silent failures; centralizes exception handling for the team.
  - Stealable workflow:
    - 1) Auto-tag shipments as exception/no_scan based on rules.
    - 2) Add to exception queue with due date + suggested playbook.
    - 3) Agent marks resolved with notes (reship/refund/contact carrier).
  - Thin slice (1–3 days): exception queue view + manual status override + internal notes.
  - Evidence: Exception is a first-class tracking status category (AfterShip). (S14)

- **Feature:** “No scan” / “stuck in transit” detection rules
  - What it is: detect lack of tracking movement after N hours/days based on last checkpoint.
  - Why merchant admin cares: catches lost/stalled packages early; reduces customer churn.
  - Stealable workflow:
    - 1) Evaluate last_checkpoint_age per shipment daily/hourly.
    - 2) If exceeds threshold, mark as “stalled” and open a task.
    - 3) Notify customer or wait for agent review based on policy.
  - Thin slice (1–3 days): scheduled job + “stalled” tag + email macro for customer update.
  - Evidence: AfterShip includes “Expired” for no tracking info for 30 days (pattern for staleness). (S14)

- **Feature:** Failed delivery attempt handling (NDR: notify, reschedule, hold for pickup)
  - What it is: workflows when carrier attempted delivery and failed (recipient unavailable, address issue, etc.).
  - Why merchant admin cares: prevents returns-to-sender; reduces refunds and reship costs.
  - Stealable workflow:
    - 1) Detect AttemptFail/DeliveryFailure status.
    - 2) Trigger customer comms with next steps.
    - 3) Create agent task if not resolved within SLA.
  - Thin slice (1–3 days): detect “attempt failed” canonical status + send “action required” email.
  - Evidence: AfterShip includes Failed Attempt status; 17TRACK includes DeliveryFailure category. (S14, S19)

- **Feature:** Address verification (pre-shipment) + correction loop
  - What it is: verify deliverability and correct minor address issues, optionally requiring customer confirmation.
  - Why merchant admin cares: reduces failed deliveries; lowers reship/refund costs.
  - Stealable workflow:
    - 1) Verify address when entered or before label purchase.
    - 2) If not deliverable, prompt correction/confirmation.
    - 3) Store verification result and proceed with shipment.
  - Thin slice (1–3 days): address verification endpoint + “needs confirmation” flag + email to customer with edit link.
  - Evidence: EasyPost address docs describe verification tools and deliverability checks. (S17)

- **Feature:** Fulfillment holds for exceptions (fraud/inventory/ops gating) + release
  - What it is: put fulfillments “on hold” with reasons and release when resolved.
  - Why merchant admin cares: keeps ops honest; prevents shipping wrong orders; supports exception gating.
  - Stealable workflow:
    - 1) Place hold with reason (inventory, fraud, address).
    - 2) Block fulfillment until released.
    - 3) Release hold and resume previous status.
  - Thin slice (1–3 days): hold/unhold state + reason + filter view for on-hold orders.
  - Evidence: Shopify supports placing and releasing fulfillment holds and describes on-hold behavior. (S12, S11)

- **Feature:** “Fulfillment service failed” alerting + recovery workflow
  - What it is: detect when a 3PL/fulfillment service can’t complete a fulfillment and route to ops with next steps.
  - Why merchant admin cares: stops silent fulfillment failures and SLA misses.
  - Stealable workflow:
    - 1) Receive event that fulfillment service failed.
    - 2) Create task with required follow-up (contact 3PL, re-request fulfillment, change location).
    - 3) Track resolution notes + outcome.
  - Thin slice (1–3 days): alert + task creation + “re-request fulfillment” button stub (manual action recorded).
  - Evidence: Shopify Flow has a trigger for “fulfillment service failed to complete fulfillment”. (S13)

- **Feature:** Shipment timeline (scan events + internal notes) in the order timeline
  - What it is: show shipping checkpoints alongside internal comments/actions to create a single audit trail.
  - Why merchant admin cares: reduces context switching; supports customer support quality.
  - Stealable workflow:
    - 1) Display scan events chronologically.
    - 2) Allow internal notes tagged by agent.
    - 3) Allow “copy timeline summary” for support replies.
  - Thin slice (1–3 days): timeline component + notes + “copy to clipboard” summary.
  - Evidence: Tracking event updates provide structured checkpoints (EasyPost tracker events). (S16)

- **Feature:** Customer self-serve tracking page (branded “where is my order”)
  - What it is: a customer-facing tracking portal with order status, latest scan, and help CTAs.
  - Why merchant admin cares: reduces tickets; increases trust; improves post-purchase experience.
  - Stealable workflow:
    - 1) Customer opens tracking link from email/SMS.
    - 2) Sees latest status + ETA messaging + exception guidance.
    - 3) If exception, provides next steps or contact options.
  - Thin slice (1–3 days): simple tracking page showing canonical status + latest checkpoint + support link.
  - Evidence: AfterShip’s tracking model supports customer notifications and tracking link usage. (S15, S14)

- **Feature:** Proactive “promise date / ETA” messaging based on scan patterns
  - What it is: show an estimated delivery window and update it with scan events and staleness detection.
  - Why merchant admin cares: reduces “where is it” volume; prevents chargebacks.
  - Stealable workflow:
    - 1) Initialize ETA from carrier/service level.
    - 2) Adjust ETA with checkpoint changes.
    - 3) If exception/stalled, change messaging and create task.
  - Thin slice (1–3 days): display ETA bucket (on track / delayed / exception) based on canonical status + last scan age.
  - Evidence: Tracking platforms define standard checkpoints and exception categories to drive messaging. (S14, S19)

- **Feature:** Lost package playbook (investigate → replace/refund → close)
  - What it is: standardized internal workflow for lost packages with policy gating.
  - Why merchant admin cares: reduces ad-hoc decisions; limits leakage; improves response time.
  - Stealable workflow:
    - 1) If stalled/exceptions persist beyond policy threshold, mark “potentially lost”.
    - 2) Agent chooses resolution (reship/refund/store credit).
    - 3) Notify customer and track costs.
  - Thin slice (1–3 days): “mark lost” action + resolution field + templated email.
  - Evidence: Exception/Expired statuses provide a baseline for staleness and loss detection. (S14)

- **Feature:** Return-to-sender (RTS) detection and auto-create return workflow
  - What it is: detect “returned to sender/exception” and create a return case linking shipping + returns.
  - Why merchant admin cares: prevents missed RTS events; bridges shipping exceptions into returns operations.
  - Stealable workflow:
    - 1) Detect “exception/return to sender” checkpoint.
    - 2) Create internal case (RTS) linked to order.
    - 3) Decide: reship vs refund vs contact customer for address correction.
  - Thin slice (1–3 days): “RTS case” entity + manual resolution + timeline link.
  - Evidence: AfterShip’s Exception description explicitly includes returned shipment to sender. (S14)

- **Feature:** Carrier claims / investigation tracker (attachments + reference IDs)
  - What it is: track carrier claims, reference IDs, and supporting docs per shipment.
  - Why merchant admin cares: improves recovery; avoids lost claims; builds operational discipline.
  - Stealable workflow:
    - 1) From an exception shipment, open “carrier claim”.
    - 2) Collect required details + upload attachments.
    - 3) Track status until resolved.
  - Thin slice (1–3 days): claim record with status + reference_id + file uploads (no carrier integration).
  - Evidence: Tracking providers expose structured shipment events and statuses that can trigger claims workflows. (S16, S14)

- **Feature:** Shipping exception analytics (exception rate by carrier/service/region)
  - What it is: report exception and delivery-failure rates and time-to-deliver by carrier and service.
  - Why merchant admin cares: choose carriers and service levels based on outcomes; reduce costs.
  - Stealable workflow:
    - 1) Aggregate shipments by canonical status outcomes.
    - 2) Break down by carrier/service/zip/warehouse.
    - 3) Export or dashboard trends.
  - Thin slice (1–3 days): CSV export of shipments with final status + exception flag + duration.
  - Evidence: Canonical delivery statuses (incl. exception) are well-defined and enumerable. (S14, S19)

#### Shipping exceptions refresh (missed scans, address corrections, proactive comms) (Tranche #25 — 2025-12-29)

- **Feature:** Missed-scan detector v2 (scan gap thresholds by carrier/service + timezone-aware cutoffs)
  - What it is: detect shipments with no tracking updates beyond expected scan windows, tuned per carrier/service and respecting time zones/quiet hours.
  - Why merchant admin cares: finds lost/stalled shipments sooner; reduces WISMO and reship costs.
  - Stealable workflow:
    - 1) Define scan-gap rules by carrier/service (e.g., ground vs air).
    - 2) Run hourly job; compute “hours since last update” and suppress during quiet hours.
    - 3) Create exception + suggested next action (wait/contact/reship).
  - Thin slice (1–3 days): add scan-gap thresholds table + “hours since last update” column on exception queue.
  - Evidence: Trackers expose “updates over time” model (EasyPost) and canonical statuses (AfterShip). (S179, S14)

- **Feature:** Tracking ingestion debug console (webhook delivery attempts + last error)
  - What it is: admin surface for tracking webhook deliveries (status, retry count, last error, last payload timestamp).
  - Why merchant admin cares: prevents silent tracking outages; speeds diagnosis when exception rates spike.
  - Stealable workflow:
    - 1) Store webhook delivery attempts/outcomes for tracking updates.
    - 2) Provide search by tracking_code/order_id.
    - 3) Show last error + last success time; (optional) replay.
  - Thin slice (1–3 days): “last 100 webhook deliveries” page + filters + error text; no replay.
  - Evidence: Tracking updates via webhooks are a standard integration pattern; Shippo documents webhook debugging explicitly. (S182, S185, S186)

- **Feature:** Branded tracking page v2 (exception messaging + self-serve issue intake)
  - What it is: customer tracking page that adapts messaging for exceptions and provides issue intake (“delivered not received”, “address issue”, “missing package”).
  - Why merchant admin cares: deflects support; collects structured data; routes to the right queue.
  - Stealable workflow:
    - 1) Render tracking status and timeline.
    - 2) If exception/no-scan, show tailored guidance + CTA.
    - 3) Create a case/exception from the customer intake.
  - Thin slice (1–3 days): 3-state tracking page (in transit/delivered/exception) + one “package missing” form.
  - Evidence: Branded tracking pages are a first-class feature (ShipEngine) and tracking pages are core in post-purchase tools (AfterShip). (S183, S47)

- **Feature:** Proactive comms policy v2 (suppression, escalation, and “don’t spam” rules)
  - What it is: notification rules with suppression (rate limits), escalation thresholds, and templates per exception reason.
  - Why merchant admin cares: reduces tickets without overwhelming customers; prevents contradictory updates.
  - Stealable workflow:
    - 1) Configure triggers (first scan, exception, delivery attempt, stalled).
    - 2) Apply rate limits and quiet hours.
    - 3) Escalate to human after N events/age; log comms.
  - Thin slice (1–3 days): exception notification + daily suppression rule + comms log on shipment timeline.
  - Evidence: Notifications are event-driven in tracking platforms; exception statuses are explicit. (S15, S14)

- **Feature:** Address issue playbook (customer confirmation + ops correction)
  - What it is: workflow to collect corrected addresses and decide on intercept/reship when “address issue” exceptions occur.
  - Why merchant admin cares: prevents RTS and reship costs; resolves deliverability issues faster.
  - Stealable workflow:
    - 1) Detect address-related exception and request customer confirmation via secure link.
    - 2) Validate/normalize corrected address.
    - 3) Apply policy: update carrier / reship / wait; record outcome.
  - Thin slice (1–3 days): address confirmation email + store corrected address + manual reship action with notes.
  - Evidence: Address verification/deliverability primitives exist (EasyPost) and exceptions include delivery failures. (S17, S14)

- **Feature:** “Missing package” case workflow (checklist + SLA + outcomes)
  - What it is: a structured case record for missing/lost shipments with checklist steps and outcomes (found/reship/refund/claim).
  - Why merchant admin cares: standardizes escalation; improves recovery; reduces inconsistent refunds/reships.
  - Stealable workflow:
    - 1) Auto-create case when scan-gap exceeds threshold.
    - 2) Follow checklist (contact carrier, verify address, customer outreach).
    - 3) Close with outcome + reason; export for reporting.
  - Thin slice (1–3 days): case record + checklist + outcome dropdown; manual links to carrier resources.
  - Evidence: USPS “Missing Mail” provides a concrete escalation workflow framing. (S180)

- **Feature:** Carrier tracking retrieval by internal label ID (ops lookup)
  - What it is: retrieve tracking status using internal label identifiers and show unified shipment status without carrier-specific portals.
  - Why merchant admin cares: reduces context switching; speeds agent work; supports auditability.
  - Stealable workflow:
    - 1) Store label_id/tracking_id on fulfillment.
    - 2) Fetch tracking details from provider.
    - 3) Display timeline and current status in admin.
  - Thin slice (1–3 days): lookup by tracking_code + show provider response fields in debug view.
  - Evidence: ShipEngine documents “track by label ID” patterns for tracking retrieval. (S181)

- **Feature:** Tracking webhook health monitors (latency, error rate, backlog)
  - What it is: monitor ingestion health (delivery latency, error rate, retry backlog) and alert ops on degradations.
  - Why merchant admin cares: prevents blind spots; ensures exception detection is reliable.
  - Stealable workflow:
    - 1) Record webhook receipt timestamps and processing times.
    - 2) Compute health metrics and thresholds.
    - 3) Alert + show dashboard tile; link to debug console.
  - Thin slice (1–3 days): error rate counter + alert when failures/hour exceed X; last-success timestamp widget.
  - Evidence: Webhook delivery and debugging patterns are explicitly documented (ShipEngine/Shippo). (S182, S186)

- **Feature:** Delivery attempt escalation rules (AttemptFail → steps + timeout)
  - What it is: policies for when a failed attempt becomes an escalation (e.g., 2 failed attempts triggers support outreach).
  - Why merchant admin cares: improves delivery success; prevents RTS and refunds.
  - Stealable workflow:
    - 1) Detect failed attempt status.
    - 2) Notify customer with next steps.
    - 3) If repeats or timeout, create case and route to agent.
  - Thin slice (1–3 days): escalation after 2 attempts + template + case link.
  - Evidence: Failed attempt is a canonical status in tracking enums. (S14)

- **Feature:** Exception reason codes v2 (map provider substatus → playbook)
  - What it is: map provider/courier reason details to a stable taxonomy used for routing, templates, and reporting.
  - Why merchant admin cares: consistent playbooks and measurement; reduces manual categorization.
  - Stealable workflow:
    - 1) Map provider reason strings to internal codes.
    - 2) Display in queue and auto-select playbook.
    - 3) Allow agent override and log changes.
  - Thin slice (1–3 days): 10 reason codes + mapping table + override dropdown.
  - Evidence: Tracking taxonomies (17TRACK) support main status + substatus patterns. (S19)

- **Feature:** “Delivered but not received” (POR) workflow + policy table
  - What it is: handle customers reporting non-receipt after a delivered scan with structured intake, investigation steps, and policy outcomes.
  - Why merchant admin cares: reduces fraud and chargebacks; standardizes outcomes; speeds resolution.
  - Stealable workflow:
    - 1) Customer submits POR issue from tracking page.
    - 2) System checks time window and basic signals (address, delivery age).
    - 3) Agent chooses outcome (refund/reship/investigate) from policy table and logs reason.
  - Thin slice (1–3 days): POR intake form + case record + policy table by order value and delivery age.
  - Evidence: Delivered status is modeled explicitly and branded tracking pages are a natural intake surface. (S14, S183)

- **Feature:** Reship decision engine (wait vs reship vs refund) with guardrails
  - What it is: guided recommendations based on shipment status, scan gap age, order value, and customer segment.
  - Why merchant admin cares: reduces inconsistent decisions and margin leakage; speeds agent work.
  - Stealable workflow:
    - 1) Compute “days since last scan” and status (exception vs in transit).
    - 2) Apply policy thresholds (VIP reship sooner; low-value wait longer).
    - 3) Execute selected action and record audit note.
  - Thin slice (1–3 days): 3-segment policy table + recommended action banner + manual override.
  - Evidence: Canonical statuses and scan-gap detection enable policy-driven decisions. (S14, S179)

- **Feature:** Customer address change cutoff (lock window + override)
  - What it is: enforce a cutoff after which address changes are blocked (or require approval) once shipment is in progress.
  - Why merchant admin cares: reduces misdeliveries and fraud; avoids warehouse/carrier confusion.
  - Stealable workflow:
    - 1) Define cutoff (e.g., after label created or first scan).
    - 2) If customer requests change after cutoff, require support approval.
    - 3) Log outcome and update comms.
  - Thin slice (1–3 days): cutoff rule + “request address change” form + approval toggle in admin.
  - Evidence: Address issues are a major source of delivery exceptions; address verification is a known primitive. (S17, S14)

- **Feature:** Exception-to-support handoff (auto-create ticket/task with full context)
  - What it is: create a support ticket/task with shipment context (status, last scan, customer comms) when an exception crosses an SLA threshold.
  - Why merchant admin cares: avoids missed follow-ups; reduces repeated context gathering; improves support quality.
  - Stealable workflow:
    - 1) Exception rule triggers escalation.
    - 2) Create task with structured fields and timeline.
    - 3) Assign owner and set due date; notify customer if needed.
  - Thin slice (1–3 days): create internal task record + assign + due date; no external helpdesk integration.
  - Evidence: Tracking webhooks provide triggers for automation; webhook delivery patterns are standard. (S182, S185)

- **Feature:** Customer comms audit trail (what was sent, when, and why)
  - What it is: show all notifications sent to the customer for a shipment/exception and the rule that triggered each.
  - Why merchant admin cares: prevents duplicate/conflicting messaging; improves trust and support handling.
  - Stealable workflow:
    - 1) On each comms send, store template + trigger + timestamp.
    - 2) Render in shipment timeline.
    - 3) Allow “snooze notifications” and note why.
  - Thin slice (1–3 days): store comms log entries and show in shipment detail; add “snooze 24h” button.
  - Evidence: Notification systems are event-driven and should be auditable; providers document event-based notifications. (S15, S186)

#### Inventory / Fulfillment exceptions (Tranche #3 — 2025-12-29)

- **Feature:** Location-aware inventory model (per-location on-hand + assignment to products)
  - What it is: treat each warehouse/store/app as a location with separate inventory quantities.
  - Why merchant admin cares: prevents oversell; enables split fulfillment; supports omnichannel ops.
  - Stealable workflow (2–5 steps):
    - 1) Create/manage locations.
    - 2) Assign products/variants to locations.
    - 3) Set/adjust on-hand quantities per location.
  - Thin slice (1–3 days): locations table + per-location inventory levels + simple assignment UI.
  - Evidence: Shopify locations + multi-location inventory model. (S20, S22)

- **Feature:** Order routing rules (location priority + “split if needed”)
  - What it is: rules to route fulfillments to a preferred location, or split across locations when required.
  - Why merchant admin cares: reduces fulfillment delays; improves cost control; avoids manual reassignment.
  - Stealable workflow:
    - 1) Set location priority + assign shipping zones to locations.
    - 2) When order placed, assign fulfillments to locations that can ship to destination.
    - 3) If no single location can fulfill, split into multiple fulfillments.
  - Thin slice (1–3 days): simple priority list + “auto-assign” engine + manual override.
  - Evidence: Shopify order fulfillment for locations + fulfillable inventory. (S21, S29)

- **Feature:** Manual location reassignment (move fulfillment to another location)
  - What it is: ops can reassign where an order is fulfilled from when inventory or capacity changes.
  - Why merchant admin cares: resolves stockouts and capacity issues without canceling orders.
  - Stealable workflow:
    - 1) Order is assigned to a location.
    - 2) Ops selects “change location”.
    - 3) System validates inventory availability and updates fulfillable quantities.
  - Thin slice (1–3 days): reassign action + validation errors + audit note.
  - Evidence: Shopify location-based fulfillment implies assignment and routing behavior. (S21, S22)

- **Feature:** Split fulfillment (partial fulfillments by line item/quantity)
  - What it is: split a fulfillment into multiple fulfillments by item/quantity to ship what’s ready.
  - Why merchant admin cares: reduces time-to-ship; handles backorders; avoids “all or nothing” delays.
  - Stealable workflow:
    - 1) In fulfillment view, choose items/qty to fulfill now.
    - 2) Create a fulfillment for those items with tracking.
    - 3) Remaining items stay open for later.
  - Thin slice (1–3 days): “fulfill partial” action + remainder tracking + timeline entries.
  - Evidence: Shopify describes split fulfillment flow. (S28)

- **Feature:** Merge fulfillments (combine items into one fulfillment)
  - What it is: combine multiple pending fulfillments into one when items can ship together.
  - Why merchant admin cares: reduces shipping cost; simplifies customer comms.
  - Stealable workflow:
    - 1) Select fulfillments eligible to merge.
    - 2) Confirm combined items/qty.
    - 3) Generate one tracking/label.
  - Thin slice (1–3 days): merge action for same destination + same location.
  - Evidence: Shopify describes merge fulfillment behavior. (S28)

- **Feature:** “Fulfilling from ship-to zones only” (fulfillable inventory gating)
  - What it is: customers can only buy inventory from locations that can ship to their zone; prevents “unfulfillable” orders.
  - Why merchant admin cares: reduces cancellations and manual rerouting; improves promise accuracy.
  - Stealable workflow:
    - 1) Configure shipping profiles/zones and assign locations.
    - 2) Determine fulfillable inventory for a customer address.
    - 3) Allow purchase only if fulfillable inventory exists.
  - Thin slice (1–3 days): gate checkout availability by zone/location mapping (coarse) + warning UI.
  - Evidence: Shopify fulfillable inventory concept. (S29)

- **Feature:** Low-stock alerts per location + “reorder now” task queue
  - What it is: alerts when on-hand drops below threshold, per location, creating tasks for replenishment/transfer.
  - Why merchant admin cares: prevents stockouts; keeps fulfillment performance stable.
  - Stealable workflow:
    - 1) Set reorder point per SKU/location.
    - 2) Daily job checks thresholds.
    - 3) Create replenishment tasks (transfer or PO).
  - Thin slice (1–3 days): threshold fields + scheduled check + email/slack notification.
  - Evidence: Multi-location inventory implies per-location quantities suitable for thresholding. (S22)

- **Feature:** Bulk inventory editing (CSV / bulk editor) + error reporting
  - What it is: bulk update inventory quantities and locations for many SKUs at once.
  - Why merchant admin cares: saves time; reduces mistakes; enables cycle counts and corrections.
  - Stealable workflow:
    - 1) Export inventory list.
    - 2) Edit quantities and upload/import.
    - 3) See validation errors and apply successful rows.
  - Thin slice (1–3 days): CSV import with row-level errors + “dry run” preview.
  - Evidence: Shopify bulk editing inventory workflow. (S25)

- **Feature:** Inventory adjustments with reason codes (damage, shrink, recount)
  - What it is: log changes to stock with reason codes and actor, producing an audit trail.
  - Why merchant admin cares: reconciles discrepancies; supports accountability; improves forecasting inputs.
  - Stealable workflow:
    - 1) Adjust quantity for SKU/location.
    - 2) Choose reason code and add note.
    - 3) Record adjustment event in inventory ledger.
  - Thin slice (1–3 days): adjustment form + reason codes + ledger table.
  - Evidence: Shopify inventory tracking implies on-hand updates and adjustment workflows. (S27, S22)

- **Feature:** Inventory transfers (request → ship → receive) with partial receipts
  - What it is: move stock between locations with a tracked transfer object and receiving workflow.
  - Why merchant admin cares: balances inventory; reduces stockouts; supports store/DC transfers.
  - Stealable workflow:
    - 1) Create transfer with items/qty (from → to).
    - 2) Mark as shipped/in transit.
    - 3) Receive transfer (partial receive allowed) and finalize.
  - Thin slice (1–3 days): transfer record + states + receive UI (manual qty).
  - Evidence: Shopify transfer list view + POS receiving transfers with barcode scanning. (S23, S24)

- **Feature:** Transfer dashboard (filters: draft/in transit/received; aging SLAs)
  - What it is: operational view of transfers with filters and “aging” indicators.
  - Why merchant admin cares: prevents lost transfers; improves replenishment reliability.
  - Stealable workflow:
    - 1) View transfers by status.
    - 2) Sort/filter by age and destination.
    - 3) Escalate overdue transfers to tasks.
  - Thin slice (1–3 days): transfers table with status + created_at + age badge + export CSV.
  - Evidence: Shopify provides transfer views and filtering primitives. (S23)

- **Feature:** Barcode scanning for receiving / picking (mobile-friendly)
  - What it is: scan items during receiving (and optionally picking) to reduce errors and speed ops.
  - Why merchant admin cares: fewer wrong shipments; faster warehouse throughput.
  - Stealable workflow:
    - 1) Open receiving task on mobile.
    - 2) Scan barcode to increment received qty.
    - 3) Resolve mismatches and finalize.
  - Thin slice (1–3 days): camera barcode scan + match to SKU + increment counts (no hardware integration).
  - Evidence: Shopify POS transfer receiving supports barcode scanner flow. (S24)

- **Feature:** Oversell / backorder policy (“continue selling when out of stock”) with guardrails
  - What it is: allow sales beyond on-hand with messaging and operational follow-ups (preorder/backorder).
  - Why merchant admin cares: avoids lost revenue; but needs controls to prevent unbounded backlog.
  - Stealable workflow:
    - 1) Enable continue selling for selected SKUs.
    - 2) Tag resulting orders as “backorder”.
    - 3) Fulfill when replenished; notify customers on delay.
  - Thin slice (1–3 days): per-SKU oversell toggle + “backorder queue” filter + templated delay email.
  - Evidence: Shopify selling when out of stock + track inventory settings. (S26, S27)

- **Feature:** Partial fulfillment comms (“shipped items” + “remaining items”)
  - What it is: customer notifications that clearly show what shipped and what’s pending.
  - Why merchant admin cares: reduces confusion and tickets; increases trust during partial/backorder scenarios.
  - Stealable workflow:
    - 1) When partial fulfillment created, send “partial shipped” email.
    - 2) Show remaining items and expected timeline.
    - 3) Send follow-up when remainder ships.
  - Thin slice (1–3 days): email template with shipped vs pending sections + order status page messaging.
  - Evidence: Shopify split fulfillment implies partial shipments and separate fulfillments. (S28)

- **Feature:** Inventory reservations / “committed vs available” visibility
  - What it is: show how much stock is on-hand vs committed to open orders/fulfillments.
  - Why merchant admin cares: prevents double-selling; improves allocation decisions.
  - Stealable workflow:
    - 1) When order placed, reserve inventory at assigned location.
    - 2) Display available = on_hand - committed.
    - 3) Release reservation on cancel/refund/timeout.
  - Thin slice (1–3 days): committed quantity field + reservation events + simple report per SKU/location.
  - Evidence: Multi-location inventory and fulfillable inventory concepts imply allocation constraints and location-based availability. (S22, S29)

#### Support desk ops (Tranche #4 — 2025-12-29)

- **Feature:** Shared inbox / ticket object (threaded conversation with statuses)
  - What it is: a ticket model that stores customer messages, agent replies, internal notes, and status transitions.
  - Why merchant admin cares: reduces chaos; creates a single source of truth for customer comms and ops handoffs.
  - Stealable workflow (2–5 steps):
    - 1) Ingest message from email/chat/social into a ticket.
    - 2) Agent replies; ticket moves through statuses (open/pending/solved).
    - 3) Close loop with customer and archive.
  - Thin slice (1–3 days): ticket table + statuses + threaded messages + agent reply UI (single channel first).
  - Evidence: Views/queues and ticketing primitives in Zendesk docs. (S36)

- **Feature:** Views / queues (saved filters for agents)
  - What it is: saved lists of tickets based on filters (status, tags, assignee, channel, priority).
  - Why merchant admin cares: enables triage; supports specialized queues (returns, shipping issues, VIP).
  - Stealable workflow:
    - 1) Define view filters.
    - 2) Agents work “next ticket” from a view.
    - 3) Managers monitor queue health.
  - Thin slice (1–3 days): 3 default views (Unassigned, My tickets, Urgent) + saved filter builder.
  - Evidence: Zendesk “Views” as first-class workflow primitive. (S36)

- **Feature:** Tags / labels + quick categorization
  - What it is: apply tags to tickets (e.g., return_request, late_delivery, damaged_item) for routing/reporting.
  - Why merchant admin cares: improves reporting and automation; reduces misrouting.
  - Stealable workflow:
    - 1) Agent applies tags or system auto-tags.
    - 2) Tags influence views and routing.
    - 3) Tags drive analytics and macros.
  - Thin slice (1–3 days): tagging UI + tag autocomplete + tag-based filter/view.
  - Evidence: Automation rules often key off tags and conditions (Chatwoot automation rules). (S34)

- **Feature:** Canned responses / saved replies
  - What it is: prewritten reply snippets inserted into responses (optionally with variables).
  - Why merchant admin cares: faster responses; consistent tone; fewer errors.
  - Stealable workflow:
    - 1) Create canned response templates.
    - 2) Agent inserts into reply and edits.
    - 3) Send response and track usage.
  - Thin slice (1–3 days): saved replies + slash-command picker + variables for customer name/order id.
  - Evidence: Chatwoot canned responses. (S33)

- **Feature:** Macros (bundle: canned reply + actions)
  - What it is: a one-click macro that applies multiple actions (set status, add tags, send template, assign).
  - Why merchant admin cares: standardizes workflows; reduces time per ticket; fewer missed steps.
  - Stealable workflow:
    - 1) Create macro with actions + message template.
    - 2) Agent runs macro on ticket.
    - 3) Ticket state/tags/assignee updated and reply drafted/sent.
  - Thin slice (1–3 days): macro runs actions + inserts reply (no branching).
  - Evidence: Gorgias macros as a first-class feature. (S30)

- **Feature:** Rules engine (automation: event + conditions + actions)
  - What it is: configurable automation that triggers on events (ticket created, tag added, message received).
  - Why merchant admin cares: auto-triage, auto-replies, routing, spam handling; fewer manual touches.
  - Stealable workflow:
    - 1) Configure rule: trigger + conditions.
    - 2) Define actions: tag, assign, set priority, send reply.
    - 3) Log automations to audit trail.
  - Thin slice (1–3 days): 5 core triggers + condition builder + action runner (tag/assign/status).
  - Evidence: Gorgias rules + Chatwoot automation rules describe this model. (S31, S34)

- **Feature:** Auto-assign tickets (round-robin, skill-based, by view)
  - What it is: assignment logic to ensure tickets always have an owner (or route to the right team).
  - Why merchant admin cares: faster first response; less “unassigned” backlog; supports specialization.
  - Stealable workflow:
    - 1) Set auto-assign policy (round robin by team).
    - 2) On ticket create, assign to agent.
    - 3) Reassign on SLA breach or out-of-office.
  - Thin slice (1–3 days): round-robin assignment + “unassigned fallback” queue.
  - Evidence: Gorgias auto-assign tickets. (S32)

- **Feature:** SLA policies (first response + next response + resolution time)
  - What it is: timers and targets per priority/channel/customer segment with breach alerts.
  - Why merchant admin cares: prevents missed obligations; improves CSAT; enforces operational discipline.
  - Stealable workflow:
    - 1) Define SLA targets by priority (e.g., urgent 1h).
    - 2) Start timers on ticket creation/update.
    - 3) Alert/escalate when breached.
  - Thin slice (1–3 days): first-response SLA + overdue badge + view filter “SLA breached”.
  - Evidence: Zendesk SLA policy concepts. (S35)

- **Feature:** Collision avoidance (“someone is replying” indicator) + optional lock
  - What it is: prevent two agents from responding simultaneously; show presence indicator.
  - Why merchant admin cares: avoids duplicate/conflicting replies; improves professionalism.
  - Stealable workflow:
    - 1) When agent opens ticket, set “active agent” presence.
    - 2) Show indicator to other agents.
    - 3) Optionally lock replies unless you take over.
  - Thin slice (1–3 days): presence indicator only (no hard lock) + “take over” button.
  - Evidence: Shared inboxes rely on views/queues and assignment discipline; implement as standard shared-inbox pattern. (S36)

- **Feature:** Internal notes + @mentions (private collaboration)
  - What it is: private notes on a ticket and @mention teammates for help or approvals.
  - Why merchant admin cares: speeds complex issue resolution; keeps context inside the ticket.
  - Stealable workflow:
    - 1) Agent leaves internal note with @mention.
    - 2) Mentioned agent is notified.
    - 3) Resolution recorded in thread.
  - Thin slice (1–3 days): internal note message type + mentions + notifications.
  - Evidence: Helpdesk automation models include actions/notes and internal workflows; implement as standard pattern. (S34)

- **Feature:** Ecommerce context panel (order lookup + shipment/return status shown to agent)
  - What it is: embed an order timeline view inside the ticket, keyed by customer email/order #.
  - Why merchant admin cares: fewer context switches; faster resolution for returns/shipping/inventory issues.
  - Stealable workflow:
    - 1) Ticket links to customer and recent orders.
    - 2) Agent sees order status + tracking + return eligibility.
    - 3) Agent triggers macros (refund, resend tracking, create return).
  - Thin slice (1–3 days): order lookup by email/order number + show 5 key fields (status, items, tracking, address).
  - Evidence: Support tooling in ecommerce typically centers on macros + rules; integrate with ops timelines built in earlier tranches. (S30, S31)

- **Feature:** Templates with variables (customer name, order id, tracking link)
  - What it is: message templates with placeholders that are auto-filled from customer/order context.
  - Why merchant admin cares: reduces mistakes; improves speed; keeps brand voice consistent.
  - Stealable workflow:
    - 1) Define template with variables.
    - 2) On insert, variables render from ticket context.
    - 3) Agent edits and sends.
  - Thin slice (1–3 days): variable substitution for customer_name + order_id + tracking_url.
  - Evidence: Canned responses and macros are the surfaces where variables are most impactful. (S33, S30)

- **Feature:** Auto-reply / autoresponder for “we got your message”
  - What it is: immediate acknowledgment response with expected SLA and help links.
  - Why merchant admin cares: reduces anxiety and duplicates; improves perceived responsiveness.
  - Stealable workflow:
    - 1) Ticket created event triggers auto-reply.
    - 2) Auto-reply includes SLA expectations and self-serve links.
    - 3) Suppress duplicates within N minutes.
  - Thin slice (1–3 days): single auto-reply rule + dedupe window + toggle per inbox.
  - Evidence: Rules engines support event-driven auto-actions. (S31, S34)

- **Feature:** Spam / out-of-office auto-close and triage
  - What it is: detect spam and auto-close or auto-tag; detect OOO patterns for follow-up.
  - Why merchant admin cares: keeps queues clean; reduces agent time waste.
  - Stealable workflow:
    - 1) Detect spam/OOO via rules (subject/body patterns, sender domains).
    - 2) Tag and close or set pending.
    - 3) Keep audit trail.
  - Thin slice (1–3 days): regex-based rule conditions + actions (tag/close).
  - Evidence: Automation rules are intended for these routing and hygiene cases. (S34, S31)

- **Feature:** Ticket audit trail (who did what, when)
  - What it is: event log for changes (status, tags, assignment, automations applied).
  - Why merchant admin cares: debugging and accountability; reduces “mystery handling”.
  - Stealable workflow:
    - 1) Every ticket mutation writes an audit event.
    - 2) Audit events displayed in ticket timeline.
    - 3) Export for compliance if needed.
  - Thin slice (1–3 days): append-only ticket_events table + UI timeline.
  - Evidence: SLAs/views/automation require visibility into actions; implement as core platform primitive. (S35, S36)

- **Feature:** Basic reporting (volume, backlog, SLA breach rate, macro usage)
  - What it is: simple operational metrics dashboards and exports.
  - Why merchant admin cares: staffing and performance; identify bottlenecks; measure automation impact.
  - Stealable workflow:
    - 1) Aggregate ticket events daily.
    - 2) Show backlog by view + SLA breaches.
    - 3) Export CSV for deeper analysis.
  - Thin slice (1–3 days): daily metrics table + CSV export.
  - Evidence: Views and SLAs create measurable queue metrics. (S36, S35)

#### Analytics & QA (Tranche #5 — 2025-12-29)

- **Feature:** Metrics dictionary (definitions + formulas for support KPIs)
  - What it is: a canonical glossary for metrics (first response time, resolution time, backlog, etc.) including calculation details.
  - Why merchant admin cares: avoids metric disputes; aligns ops and leadership; enables consistent reporting.
  - Stealable workflow (2–5 steps):
    - 1) Define KPI list and formulas.
    - 2) Show “how calculated” tooltip on dashboards.
    - 3) Version changes to definitions.
  - Thin slice (1–3 days): metrics dictionary page for 5 KPIs + links from dashboards.
  - Evidence: Support platforms document calculated metrics and definitions. (S37, S40)

- **Feature:** Agent performance dashboard (volume, response times, resolution times)
  - What it is: per-agent and per-team dashboards for throughput and speed.
  - Why merchant admin cares: staffing, coaching, and accountability; improves response quality and speed.
  - Stealable workflow:
    - 1) Choose date range and segment (team/channel).
    - 2) View metrics per agent + trend over time.
    - 3) Drill into tickets driving outliers.
  - Thin slice (1–3 days): dashboard for 3 KPIs (first reply time, resolution time, tickets solved) + drill-down list.
  - Evidence: Support tools provide teammate performance reporting. (S38, S40)

- **Feature:** Queue health dashboard (backlog, aging buckets, SLA risk)
  - What it is: view backlog size and ticket aging by queue/view, with SLA risk indicators.
  - Why merchant admin cares: prevents runaway queues; focuses staffing on what’s urgent.
  - Stealable workflow:
    - 1) Show backlog by view.
    - 2) Split into age buckets (0–4h, 4–24h, 24h+).
    - 3) Highlight SLA-breached and SLA-at-risk tickets.
  - Thin slice (1–3 days): backlog + aging buckets + “SLA breached” count per view.
  - Evidence: Views/queues + SLAs are core support primitives. (S36, S35)

- **Feature:** CSAT collection workflow (request + capture rating)
  - What it is: request a satisfaction rating after ticket resolution and store the rating.
  - Why merchant admin cares: measures customer happiness; detects support quality issues; enables agent coaching.
  - Stealable workflow:
    - 1) On ticket solved, send CSAT request.
    - 2) Capture rating (good/bad) and optional comment.
    - 3) Link rating to ticket and agent.
  - Thin slice (1–3 days): 2-choice rating + optional comment + store on ticket record.
  - Evidence: Satisfaction ratings are modeled as ticket-linked objects in Zendesk’s API. (S39)

- **Feature:** DSAT escalation rules (auto-task when unhappy)
  - What it is: automatically create a follow-up task when CSAT is negative.
  - Why merchant admin cares: reduces churn; creates a recovery loop; surfaces systemic issues faster.
  - Stealable workflow:
    - 1) Detect “bad” rating.
    - 2) Create follow-up ticket/task assigned to lead.
    - 3) Track outcome and tag root cause.
  - Thin slice (1–3 days): DSAT alert + create internal task + required “root cause” tag before close.
  - Evidence: CSAT is a first-class rating object, enabling automation triggers. (S39)

- **Feature:** SLA compliance reporting (by priority, queue, agent)
  - What it is: breakdowns of SLA performance (met/breached) by segment.
  - Why merchant admin cares: ensures commitments are met; informs staffing; reduces refunds/chargebacks from slow responses.
  - Stealable workflow:
    - 1) Define SLA targets.
    - 2) Compute compliance for tickets in range.
    - 3) Show breakdown by agent/queue/priority.
  - Thin slice (1–3 days): report table “% met” + “breaches” by queue and agent.
  - Evidence: SLA policies are a formal concept with targets and reporting. (S35)

- **Feature:** Contact reason taxonomy analytics (top issues driving tickets)
  - What it is: report on ticket categories/tags to find top drivers (returns, shipping, damaged, size).
  - Why merchant admin cares: reduces tickets by fixing root causes; improves product and ops.
  - Stealable workflow:
    - 1) Standardize tag list (contact reasons).
    - 2) Require tag before closing.
    - 3) Report ticket volume by tag over time.
  - Thin slice (1–3 days): “required primary tag” + tag leaderboard report.
  - Evidence: Tagging is commonly used with automation rules and views in inbox tools. (S34, S36)

- **Feature:** Macro usage analytics (which macros drive speed/quality)
  - What it is: track how often macros are used and the outcomes (time to solve, CSAT).
  - Why merchant admin cares: identifies high leverage playbooks; removes bad macros; standardizes best practices.
  - Stealable workflow:
    - 1) Log macro executions on tickets.
    - 2) Aggregate usage per macro and agent.
    - 3) Compare outcomes (CSAT, resolution time).
  - Thin slice (1–3 days): count macro runs + top macros leaderboard + per-macro drilldown.
  - Evidence: Macros are explicitly modeled as a core workflow feature. (S30)

- **Feature:** QA rubric builder (criteria + weights + scoring)
  - What it is: define a scorecard/rubric with categories and criteria to evaluate ticket handling quality.
  - Why merchant admin cares: improves training and consistency; reduces risk; increases CSAT.
  - Stealable workflow:
    - 1) Create rubric with criteria (tone, accuracy, policy compliance).
    - 2) Assign weights and score ranges.
    - 3) Publish rubric version.
  - Thin slice (1–3 days): one rubric with 5 criteria + 0–2 scoring scale + notes.
  - Evidence: MaestroQA documents rubric structure for QA evaluation. (S41)

- **Feature:** QA sampling rules (who gets reviewed, how many, when)
  - What it is: choose which tickets to review (random, by tag, by priority, by new agent) and how many per period.
  - Why merchant admin cares: focuses QA on risk areas; ensures coverage; controls reviewer workload.
  - Stealable workflow:
    - 1) Configure sampling rule (e.g., 5 random tickets per agent/week).
    - 2) Generate review queue.
    - 3) Track completion rate.
  - Thin slice (1–3 days): random sample generator + “QA review queue”.
  - Evidence: QA rubrics/scorecards imply a sampling and evaluation workflow around them. (S41)

- **Feature:** QA evaluation workflow (grade ticket + feedback + status)
  - What it is: reviewer scores a ticket against rubric and leaves feedback; ticket gets “reviewed” status.
  - Why merchant admin cares: systematic coaching; spot-check compliance; improves consistency.
  - Stealable workflow:
    - 1) Reviewer opens ticket from QA queue.
    - 2) Scores rubric + writes feedback.
    - 3) Sends feedback to agent; mark review complete.
  - Thin slice (1–3 days): QA evaluation form + saved evaluation record linked to ticket + agent notification.
  - Evidence: QA rubric-based evaluation is a documented workflow concept. (S41)

- **Feature:** Calibration sessions (align graders with rubric)
  - What it is: periodic calibration where multiple reviewers score the same ticket and compare results.
  - Why merchant admin cares: reduces reviewer drift; improves fairness; builds trust in QA scores.
  - Stealable workflow:
    - 1) Select calibration ticket set.
    - 2) Reviewers score independently.
    - 3) Compare scores and update rubric guidance.
  - Thin slice (1–3 days): “calibration set” feature + compare score variance report.
  - Evidence: QA programs built around rubrics typically require calibration to keep scoring consistent. (S41)

- **Feature:** Coaching plan (action items linked to QA findings)
  - What it is: turn QA feedback into coaching tasks and track completion (training modules, shadowing, macro usage).
  - Why merchant admin cares: ensures QA turns into behavior change; helps new hires ramp faster.
  - Stealable workflow:
    - 1) QA review generates coaching items.
    - 2) Assign to agent with due date.
    - 3) Mark done and track improvements over time.
  - Thin slice (1–3 days): coaching task list per agent + due dates + notes.
  - Evidence: QA rubric workflows exist to enable structured feedback and improvement loops. (S41)

- **Feature:** Performance + QA combined scorecard (speed + quality)
  - What it is: a single view that pairs speed metrics (first reply) with quality metrics (QA score, CSAT).
  - Why merchant admin cares: prevents “speed at all costs”; balances throughput with customer experience.
  - Stealable workflow:
    - 1) Compute speed KPIs per agent.
    - 2) Compute QA scores per agent.
    - 3) Show combined view with trend.
  - Thin slice (1–3 days): combined scorecard table for 10 agents (first reply time, QA score, CSAT).
  - Evidence: Support tools expose performance metrics and QA programs use rubric scoring; combining is a natural ops reporting step. (S38, S41)

#### Customer self-serve / deflection (Tranche #6 — 2025-12-29)

- **Feature:** Customer order lookup (email + order number) → order status view
  - What it is: customer can look up an order without logging in and see order status and tracking.
  - Why merchant admin cares: reduces “where is my order” tickets; improves trust.
  - Stealable workflow (2–5 steps):
    - 1) Customer enters order number + email.
    - 2) System shows order status + fulfillment/tracking info.
    - 3) Customer follows tracking link or next-step instructions.
  - Thin slice (1–3 days): order lookup page + minimal order summary + tracking link.
  - Evidence: Shopify’s order status tracking and order status page concepts. (S44, S45)

- **Feature:** Branded order status page customization (FAQ links, returns link, contact CTA)
  - What it is: customize the order status page content to deflect tickets (shipping FAQ, returns portal, address changes).
  - Why merchant admin cares: reduces inbound volume; drives self-serve behaviors; consistent branding.
  - Stealable workflow:
    - 1) Merchant configures modules/links on status page.
    - 2) Customer sees guidance by status (in transit/delayed/delivered).
    - 3) If unresolved, customer contacts support with context included.
  - Thin slice (1–3 days): configurable “links + banner message” per status state + preview.
  - Evidence: Shopify supports customizing order status page. (S45)

- **Feature:** Customer accounts portal (order history + addresses + profile)
  - What it is: authenticated portal where customers manage account details and see order history.
  - Why merchant admin cares: reduces support requests for addresses/orders; increases repeat purchase likelihood.
  - Stealable workflow:
    - 1) Customer signs in to account.
    - 2) Views order history and order details.
    - 3) Updates addresses and profile info.
  - Thin slice (1–3 days): order history list + order detail page (read-only) + address CRUD.
  - Evidence: Shopify customer accounts are a self-serve surface. (S46)

- **Feature:** Self-serve tracking page (carrier-agnostic “track shipment”)
  - What it is: a branded tracking page that shows the latest tracking state and history; works even outside account.
  - Why merchant admin cares: deflects WISMO; reduces manual status checks by support.
  - Stealable workflow:
    - 1) Customer enters tracking number (or order lookup).
    - 2) System shows canonical status + latest checkpoint.
    - 3) Provide exception guidance and contact options if needed.
  - Thin slice (1–3 days): tracking number lookup → status display + timeline.
  - Evidence: AfterShip’s customer tracking page positioning. (S47)

- **Feature:** Proactive exception guidance modules (delayed/exception playbooks)
  - What it is: when shipment is delayed/exception, show actionable guidance (“wait X days”, “contact carrier”, “we’ll reship”).
  - Why merchant admin cares: prevents panic contacts; reduces refunds/chargebacks; improves experience.
  - Stealable workflow:
    - 1) Detect exception/delay status.
    - 2) Show relevant guidance module and time expectations.
    - 3) Offer structured contact form if still needed.
  - Thin slice (1–3 days): exception banner + templated guidance text per status category.
  - Evidence: Order status pages are designed for tracking + guidance; tracking pages marketed for deflection. (S44, S47)

- **Feature:** Returns initiation link embedded in order status and account pages
  - What it is: contextual “start a return” CTA from order details surfaces.
  - Why merchant admin cares: reduces returns emails; improves returns data quality; speeds processing.
  - Stealable workflow:
    - 1) Customer opens order details.
    - 2) Clicks “start return”.
    - 3) Enters return portal flow (items/reason/resolution).
  - Thin slice (1–3 days): “start return” button deep-linking to returns portal with prefilled order context.
  - Evidence: Shopify order status + returns processing workflows exist as separate primitives; linking them is a standard deflection pattern. (S44, S1)

- **Feature:** Help center / knowledge base (FAQ, policies, how-tos)
  - What it is: searchable, categorized help content for customers.
  - Why merchant admin cares: deflects repetitive questions; reduces agent load; improves onboarding.
  - Stealable workflow:
    - 1) Author articles in categories (shipping, returns, sizing).
    - 2) Publish and link from order status / footer.
    - 3) Track article views and deflection.
  - Thin slice (1–3 days): 10 articles + category pages + basic search.
  - Evidence: Self-serve surfaces are key for deflection; docs platforms like Docusaurus provide help center primitives. (S49)

- **Feature:** Help center search (typeahead, synonyms, “no results” fallback)
  - What it is: fast search across help articles with suggestions and fallback to contact.
  - Why merchant admin cares: reduces tickets when customers can find answers quickly.
  - Stealable workflow:
    - 1) Index help content.
    - 2) Provide typeahead search.
    - 3) If no results, show suggested contact reasons and collect structured ticket.
  - Thin slice (1–3 days): search box + results page + “no results” contact CTA.
  - Evidence: Search setup and search customization are explicit merchant features. (S42, S43)

- **Feature:** Store search improvements for product discovery (deflect “can’t find item” contacts)
  - What it is: tune storefront search and customize results to improve product findability.
  - Why merchant admin cares: improves conversion and reduces support volume from discovery failures.
  - Stealable workflow:
    - 1) Enable/configure search.
    - 2) Customize search results layout/rules.
    - 3) Monitor “no results” queries and update synonyms.
  - Thin slice (1–3 days): capture “no results” queries + admin list + add synonyms (manual).
  - Evidence: Shopify provides store search setup + customization guidance. (S42, S43)

- **Feature:** Contact form with structured reasons + prefilled order context
  - What it is: structured intake form that captures contact reason and auto-attaches order/tracking context.
  - Why merchant admin cares: reduces back-and-forth; improves routing and macro effectiveness.
  - Stealable workflow:
    - 1) Customer chooses reason (returns, shipping, product issue).
    - 2) Form asks for relevant fields (order #, photos).
    - 3) Creates ticket with tags and context.
  - Thin slice (1–3 days): reason-based form fields + auto-tagging + ticket create.
  - Evidence: Rules and routing depend on structured tags/fields; status pages and accounts can provide prefill context. (S31, S44)

- **Feature:** Deflection analytics (search queries, article views → “contact anyway” rate)
  - What it is: measure whether customers found answers vs still contacted support.
  - Why merchant admin cares: ties content investment to ticket reduction and revenue outcomes.
  - Stealable workflow:
    - 1) Track help center searches and article views.
    - 2) Track subsequent contact submissions within a session window.
    - 3) Report deflection rate and top failed queries.
  - Thin slice (1–3 days): log search queries + contact submits + basic dashboard table.
  - Evidence: Tracking APIs and help center search provide measurable events; analytics layer can measure outcomes. (S48, S37)

- **Feature:** “Recommended articles” on contact page (based on reason/search)
  - What it is: show suggested help articles before contact submission, based on selected reason or typed query.
  - Why merchant admin cares: reduces tickets at the last moment; improves self-serve success.
  - Stealable workflow:
    - 1) Customer selects reason or types question.
    - 2) Show top 3 relevant articles.
    - 3) If still needed, submit ticket with context.
  - Thin slice (1–3 days): keyword match to article titles + click tracking.
  - Evidence: Search and customization patterns exist and support deflection flows. (S43, S42)

- **Feature:** Status-page-driven support nudges (contextual CTAs by shipment state)
  - What it is: show context-specific CTAs (e.g., “file claim” vs “wait 48h”) based on the shipment/order state.
  - Why merchant admin cares: reduces low-signal contacts; improves resolution speed.
  - Stealable workflow:
    - 1) Detect current shipment/order status.
    - 2) Render module with next best action.
    - 3) If contact, prefill form with status and timeline.
  - Thin slice (1–3 days): 3 status modules (in transit/delayed/delivered) + prefilled contact form.
  - Evidence: Order status tracking pages are designed to communicate status and can be customized. (S44, S45)

#### Workflow builder / automation (Tranche #7 — 2025-12-29)

- **Feature:** Trigger catalog (events that can start an automation)
  - What it is: list of supported triggers (order created, return requested, shipment exception, ticket breached SLA).
  - Why merchant admin cares: lets ops automate repetitive work and reduce manual tickets/tasks.
  - Stealable workflow (2–5 steps):
    - 1) Merchant selects a trigger.
    - 2) Configures filters (conditions) and actions.
    - 3) Saves and enables automation.
  - Thin slice (1–3 days): 10 triggers sourced from existing tranches (returns/shipping/support) + enable/disable toggle.
  - Evidence: Trigger/action model is a canonical automation pattern. (S51, S50)

- **Feature:** Action catalog (things an automation can do)
  - What it is: list of supported actions (tag ticket, send email, create return case, create task, set hold).
  - Why merchant admin cares: determines actual operational impact; turns insights into automation.
  - Stealable workflow:
    - 1) Merchant picks action(s).
    - 2) Maps required fields (template variables).
    - 3) Tests action on sample data.
  - Thin slice (1–3 days): 10 actions (tag/assign/status, send email, create task, webhook call) + dry-run mode.
  - Evidence: n8n nodes and Zapier actions reflect this pattern. (S50, S51)

- **Feature:** Condition builder (if/else filters) for automation rules
  - What it is: configure conditions on event payload (status=exception, order_total>100, customer_tag=VIP).
  - Why merchant admin cares: prevents noisy automations; enables targeted workflows (VIP exceptions).
  - Stealable workflow:
    - 1) Choose fields from event payload.
    - 2) Add comparisons (equals, contains, greater-than).
    - 3) Preview which past events match.
  - Thin slice (1–3 days): AND-only rules + 8 operators + preview count.
  - Evidence: Rules builders are commonly modeled as trigger + conditions + actions. (S31, S34, S51)

- **Feature:** Visual flow editor (nodes + connections)
  - What it is: drag-and-drop editor for building workflows as nodes connected by edges.
  - Why merchant admin cares: approachable for non-dev ops; makes complex workflows legible.
  - Stealable workflow:
    - 1) Add trigger node.
    - 2) Add action nodes in sequence.
    - 3) Validate and publish.
  - Thin slice (1–3 days): linear flows only (no branching) with 5 node types.
  - Evidence: Node-based workflow concept is documented in n8n and Node-RED. (S50, S53)

- **Feature:** Step test runner (simulate with sample payload)
  - What it is: run the automation against a sample event to see what would happen.
  - Why merchant admin cares: reduces fear of enabling automation; catches misconfig before it affects customers.
  - Stealable workflow:
    - 1) Select sample event (past order/return/ticket).
    - 2) Run workflow in “test mode”.
    - 3) View step-by-step outputs and errors.
  - Thin slice (1–3 days): run with 1 sample payload + show per-step logs.
  - Evidence: Automation platforms emphasize testability and step execution visibility. (S50, S51)

- **Feature:** Automation audit log (run history + success/fail)
  - What it is: log every automation run with timestamps, inputs, outputs, and errors.
  - Why merchant admin cares: debugging and trust; necessary for safe ops automation.
  - Stealable workflow:
    - 1) Store run record for each trigger.
    - 2) Display list by workflow with status.
    - 3) Click into run details.
  - Thin slice (1–3 days): last 100 runs per workflow + error summaries.
  - Evidence: Durable workflow systems and automation builders rely on run history for debugging. (S55, S50)

- **Feature:** Rate limiting + dedupe (avoid automation storms)
  - What it is: prevent repeated triggers causing spam or repeated actions (e.g., multiple “exception” scans).
  - Why merchant admin cares: avoids customer spam and duplicate work; keeps automation safe.
  - Stealable workflow:
    - 1) Dedupe events by key within time window.
    - 2) Apply per-workflow rate limit.
    - 3) Log suppressed runs.
  - Thin slice (1–3 days): dedupe by (order_id, trigger_type) for 15 minutes + show suppressed count.
  - Evidence: Durable workflow patterns include timers and idempotency considerations. (S55)

- **Feature:** Scheduling (time-based triggers) for ops routines
  - What it is: run automations on a schedule (daily “stalled shipments”, weekly “low stock” digest).
  - Why merchant admin cares: supports recurring operational tasks without manual checks.
  - Stealable workflow:
    - 1) Choose schedule (cron-like or daily).
    - 2) Run query to select targets.
    - 3) Execute actions (create tasks/send digest).
  - Thin slice (1–3 days): daily schedule + one query + one action (send report).
  - Evidence: Workflow engines support timers/schedules as core concepts. (S55)

- **Feature:** Human approval step (pause until approved)
  - What it is: insert an approval gate before irreversible actions (refund, reship, store credit issuance).
  - Why merchant admin cares: reduces risk; enables safe partial automation with human oversight.
  - Stealable workflow:
    - 1) Workflow pauses at approval node.
    - 2) Approver gets notification with context.
    - 3) Approve/deny resumes workflow and logs outcome.
  - Thin slice (1–3 days): approval node + notifications + approve/deny buttons + audit log entry.
  - Evidence: Ops automation surfaces like Shopify Flow validate demand; approval gates are standard safety patterns. (S52)

- **Feature:** Webhook action (connectors without building a full integration)
  - What it is: call an external endpoint with a payload (e.g., create Slack alert, create Jira ticket).
  - Why merchant admin cares: instant extensibility; enables “thin slice” integrations quickly.
  - Stealable workflow:
    - 1) Configure URL + headers.
    - 2) Map payload fields.
    - 3) Test webhook and inspect response.
  - Thin slice (1–3 days): POST webhook action with retries (3 attempts) and failure logging.
  - Evidence: Automation systems commonly use modular “nodes/pieces” for connectors. (S54, S50)

- **Feature:** Connector packaging (“pieces”/nodes) for integrations
  - What it is: a way to package triggers/actions for third-party services (Slack, email, carriers) into reusable modules.
  - Why merchant admin cares: accelerates expansion of automation surface without rewriting patterns.
  - Stealable workflow:
    - 1) Define a connector schema (auth + actions + triggers).
    - 2) Install/enable connector.
    - 3) Use connector in workflows.
  - Thin slice (1–3 days): internal connector schema + 2 connectors (email + Slack/webhook).
  - Evidence: Activepieces “pieces” and n8n “nodes” are explicit modular connector concepts. (S54, S50)

- **Feature:** Error handling strategy (retry, fallback, notify)
  - What it is: per-step policies for failures (retry with backoff, send alert, mark ticket/tag for manual).
  - Why merchant admin cares: keeps automations reliable; prevents silent failures.
  - Stealable workflow:
    - 1) Define retry policy for actions.
    - 2) On failure, execute fallback action (create task) and notify.
    - 3) Log and surface errors in run history.
  - Thin slice (1–3 days): retries + “create manual task” fallback + email/slack notify.
  - Evidence: Durable workflow concepts emphasize retries and error handling for long-running processes. (S55)

#### Security & compliance (Tranche #8 — 2025-12-29)

- **Feature:** RBAC roles and permissions (per-tenant)
  - What it is: define roles (Admin, Ops, Support, Viewer) with granular permissions for features/actions.
  - Why merchant admin cares: safe delegation; least privilege; required for serious ops and multi-user teams.
  - Stealable workflow (2–5 steps):
    - 1) Admin creates/edits roles with permissions.
    - 2) Assign roles to users.
    - 3) Permissions enforced across UI + APIs; “why denied” shown.
  - Thin slice (1–3 days): 4 fixed roles + permission checks on 10 high-risk actions + “denied” message.
  - Evidence: Shopify exposes staff permissions surfaces; policy-as-code libraries provide enforcement patterns. (S56, S61)

- **Feature:** Fine-grained authorization (resource-level access)
  - What it is: permissions that depend on resource relationships (e.g., user can manage tickets for a specific brand/store/location).
  - Why merchant admin cares: enables multi-brand orgs and franchises; reduces over-permissioning.
  - Stealable workflow:
    - 1) Model relationships (user→team, team→resource).
    - 2) Check permission at request time.
    - 3) Record authorization decision in audit.
  - Thin slice (1–3 days): resource scoping for 1 entity type (tickets or locations) + permission check API.
  - Evidence: Relationship-based access control models and docs exist. (S62)

- **Feature:** Staff accounts management (invite, deactivate, role change)
  - What it is: admin UI to manage staff users: invite, resend invite, deactivate/reactivate, change roles.
  - Why merchant admin cares: operational hygiene and safety; required for team changes and contractors.
  - Stealable workflow:
    - 1) Admin invites user via email.
    - 2) User accepts and sets password / SSO flow.
    - 3) Admin can deactivate immediately; changes reflected everywhere.
  - Thin slice (1–3 days): invite + deactivate + role assignment + list view.
  - Evidence: Staff permissions and staff security are documented patterns in ecommerce admin tooling. (S56)

- **Feature:** Enforce MFA / 2FA for staff
  - What it is: require two-factor authentication for staff accounts; optionally enforce for certain roles.
  - Why merchant admin cares: reduces account takeover risk; baseline compliance expectation.
  - Stealable workflow:
    - 1) Admin toggles “require 2FA”.
    - 2) Staff enrolls authenticator/SMS.
    - 3) Block access until enrolled; allow recovery codes.
  - Thin slice (1–3 days): “require 2FA” org setting + enrollment gate + recovery codes download.
  - Evidence: Shopify documents two-step authentication for staff. (S57)

- **Feature:** Session management (active sessions, revoke, device trust)
  - What it is: view active sessions, revoke tokens, and optionally require re-auth for sensitive actions.
  - Why merchant admin cares: incident response; offboarding contractors; reduces persistent compromise risk.
  - Stealable workflow:
    - 1) Admin views active sessions for a user.
    - 2) Clicks “revoke all sessions”.
    - 3) User must re-login; log event in audit.
  - Thin slice (1–3 days): session list + revoke-all + “recent activity” panel.
  - Evidence: SSO and identity platforms implement session controls; audit logs show actions taken. (S60, S65)

- **Feature:** SSO (SAML/OIDC) for enterprise accounts
  - What it is: allow organizations to use IdP (Okta/Entra) for login; support SAML metadata or OIDC config.
  - Why merchant admin cares: required for enterprise; reduces password risk; centralizes access control.
  - Stealable workflow:
    - 1) Admin enables SSO and configures IdP.
    - 2) Test login as a staff user.
    - 3) Enforce SSO-only for selected domains/users.
  - Thin slice (1–3 days): SAML SSO setup screen + test button + fallback admin account.
  - Evidence: SAML is a standard SSO concept documented by identity providers. (S58)

- **Feature:** SCIM provisioning (automated user lifecycle)
  - What it is: automatic create/update/deactivate users from IdP, mapping groups to roles.
  - Why merchant admin cares: prevents orphan accounts; supports enterprise IT workflows; speeds onboarding/offboarding.
  - Stealable workflow:
    - 1) Admin generates SCIM token and endpoint URL.
    - 2) IT configures SCIM in IdP.
    - 3) Users and group membership sync to roles; deprovision disables immediately.
  - Thin slice (1–3 days): SCIM endpoint + API token + group→role mapping table (single mapping).
  - Evidence: Entra provisioning docs describe automated user provisioning lifecycle. (S59)

- **Feature:** Audit log (who did what, when, from where)
  - What it is: append-only log of admin actions (actor, action, target, IP, user agent, timestamp).
  - Why merchant admin cares: debugging, compliance, incident response, internal accountability.
  - Stealable workflow:
    - 1) Every sensitive action emits audit event.
    - 2) Admin searches/filters audit log.
    - 3) Export events for compliance.
  - Thin slice (1–3 days): log 20 action types + filter by actor/action/time + CSV export.
  - Evidence: Enterprise platforms document audit log event models and filtering. (S65)

- **Feature:** Change approvals (two-person rule) for risky actions
  - What it is: require approval before high-impact actions (refunds, reships, role changes, key rotation).
  - Why merchant admin cares: reduces fraud and mistakes; supports compliance controls.
  - Stealable workflow:
    - 1) Action request created in “pending approval”.
    - 2) Approver approves/denies with reason.
    - 3) Action executes; audit log records both request and approval.
  - Thin slice (1–3 days): approvals for 3 actions + notifications + audit.
  - Evidence: Approval gates are a standard safety pattern in automation/ops systems. (S52, S65)

- **Feature:** API keys management (scopes, rotation, expiration)
  - What it is: create API keys with scoped access and rotate/revoke keys with expiration and last-used tracking.
  - Why merchant admin cares: secure integrations; incident response; least privilege.
  - Stealable workflow:
    - 1) Create key with scopes.
    - 2) Use key; log last-used metadata.
    - 3) Rotate or revoke; update downstream systems.
  - Thin slice (1–3 days): scoped API keys for 5 scope groups + revoke + last_used_at display.
  - Evidence: Security standards emphasize access controls and credential hygiene. (S63)

- **Feature:** Webhook security (signatures + replay protection + secret rotation)
  - What it is: sign outgoing webhooks, verify incoming signatures, and rotate shared secrets; guard against replay attacks.
  - Why merchant admin cares: prevents spoofed events and data leaks; protects integrations.
  - Stealable workflow:
    - 1) Generate webhook secret per integration.
    - 2) Sign each webhook payload.
    - 3) Verify signature + timestamp on receipt; rotate secrets safely.
  - Thin slice (1–3 days): HMAC signature + timestamp header + rotation UI + verification example snippet.
  - Evidence: Stripe documents webhook signature verification patterns. (S64)

- **Feature:** Data retention + export controls (logs, PII)
  - What it is: configure retention windows for audit logs and PII exports; allow scoped exports.
  - Why merchant admin cares: compliance (privacy) and cost control; reduces breach blast radius.
  - Stealable workflow:
    - 1) Set retention window per data type (audit, tickets).
    - 2) Allow authorized users to export data.
    - 3) Record exports in audit log.
  - Thin slice (1–3 days): retention settings (audit log only) + export action + audit event.
  - Evidence: ASVS provides baseline security and data handling expectations. (S63)

- **Feature:** Security posture checklist (self-audit)
  - What it is: checklist that highlights missing controls (MFA not enforced, stale API keys, no audit exports).
  - Why merchant admin cares: reduces risk; operationalizes security for non-experts; helps prep for compliance audits.
  - Stealable workflow:
    - 1) Compute posture checks from current settings.
    - 2) Show prioritized recommendations.
    - 3) Track completion and owners.
  - Thin slice (1–3 days): 10 checks + “fix it” deep links + completion tracking.
  - Evidence: ASVS provides a structured baseline checklist for application security controls. (S63)

#### Inventory forecasting + replenishment (Tranche #9 — 2025-12-29)

- **Feature:** Purchase order lifecycle (draft → sent → received → closed)
  - What it is: manage purchase orders with vendors and receiving inventory into locations.
  - Why merchant admin cares: core replenishment workflow; prevents stockouts; supports accounting ops.
  - Stealable workflow (2–5 steps):
    - 1) Create PO with vendor, items, expected dates.
    - 2) Send PO to vendor (email/PDF).
    - 3) Receive PO partially or fully; update on-hand inventory.
  - Thin slice (1–3 days): PO create + receive (manual qty) + inventory adjustment on receipt.
  - Evidence: Stocky purchase order workflows exist in Shopify’s ecosystem. (S66)

- **Feature:** Vendor management (lead time, MOQ, pack sizes, terms)
  - What it is: store vendor attributes that influence replenishment (lead time, minimum order quantity, case pack).
  - Why merchant admin cares: makes suggestions realistic; reduces manual spreadsheet work; avoids invalid POs.
  - Stealable workflow:
    - 1) Create/edit vendor profile.
    - 2) Attach vendor to SKUs with purchasing constraints.
    - 3) Use constraints when generating reorder suggestions/POs.
  - Thin slice (1–3 days): vendor table + lead time + MOQ + link vendor to SKU.
  - Evidence: Replenishment tooling relies on lead times and settings. (S67, S68)

- **Feature:** Reorder point rules (min/max or reorder level per SKU/location)
  - What it is: set reorder rules so system suggests replenishment when stock drops below threshold.
  - Why merchant admin cares: prevents stockouts; reduces firefighting; standard replenishment pattern.
  - Stealable workflow:
    - 1) Set min/max (or reorder level) per SKU and location.
    - 2) Daily job checks available stock.
    - 3) Create suggested reorder quantities.
  - Thin slice (1–3 days): min + max per SKU/location + suggestion table + export CSV.
  - Evidence: Odoo documents reordering rules; ERPNext documents reorder levels. (S68, S69)

- **Feature:** Suggested reorder quantity (target stock calculation)
  - What it is: compute suggested quantity based on max level, current available, and open POs/transfers.
  - Why merchant admin cares: reduces manual math and mistakes; standardizes ordering.
  - Stealable workflow:
    - 1) Calculate available = on_hand - committed + incoming (POs/transfers).
    - 2) Suggest qty to reach target.
    - 3) Allow manual edits before creating PO.
  - Thin slice (1–3 days): suggestion formula excluding transfers initially + manual override + “create draft PO”.
  - Evidence: Replenishment tools present reorder suggestions based on inventory levels and rules. (S67, S68)

- **Feature:** Incoming inventory visibility (open POs + ETAs)
  - What it is: show inbound stock and expected arrival dates per SKU/location.
  - Why merchant admin cares: avoids duplicate ordering; improves customer promise dates and ops planning.
  - Stealable workflow:
    - 1) List open POs and quantities.
    - 2) Show ETA per PO line.
    - 3) Combine into “incoming” per SKU.
  - Thin slice (1–3 days): incoming quantities + earliest ETA per SKU.
  - Evidence: PO workflows and lead times underpin inbound visibility. (S66, S67)

- **Feature:** Partial receiving + discrepancy handling (short/over shipments)
  - What it is: support partial receipts and log discrepancies (short shipped, damaged).
  - Why merchant admin cares: inventory accuracy; vendor accountability; prevents phantom stock.
  - Stealable workflow:
    - 1) Receive PO lines with actual qty.
    - 2) Record discrepancy reason.
    - 3) Leave PO open for remaining items or close with shortfall.
  - Thin slice (1–3 days): partial receive + discrepancy reason codes + audit log entry.
  - Evidence: Receiving flows in purchasing tools typically support partial receipts. (S66)

- **Feature:** Transfer vs purchase suggestion (move stock between locations before buying)
  - What it is: suggest transfers from overstocked locations to understocked locations as an alternative to purchase.
  - Why merchant admin cares: reduces spend and lead-time delays; improves utilization of existing stock.
  - Stealable workflow:
    - 1) Detect understock at location A.
    - 2) Detect overstock at location B.
    - 3) Suggest transfer quantity and create draft transfer.
  - Thin slice (1–3 days): simple “suggest transfer” rule (if another location has > max) + create transfer draft.
  - Evidence: Multi-location inventory and transfers exist; replenishment tools often combine purchase and transfer decisions. (S22, S23, S67)

- **Feature:** Demand signals (sales velocity over last N days)
  - What it is: compute sales velocity and use it to inform reorder points or suggestions.
  - Why merchant admin cares: adapts to seasonality and growth; reduces stockouts on fast movers.
  - Stealable workflow:
    - 1) Compute units sold per day per SKU.
    - 2) Estimate days of cover = available / velocity.
    - 3) Flag SKUs below threshold days of cover.
  - Thin slice (1–3 days): velocity and days-of-cover columns in inventory table + “risk” badge.
  - Evidence: Replenishment and forecasting concepts rely on demand measurement. (S67, S70)

- **Feature:** Forecasting layer (optional) for reorder suggestions
  - What it is: time-series forecast that predicts demand and drives reorder quantities/safety stock.
  - Why merchant admin cares: improves accuracy vs static reorder points; reduces overstock and stockouts.
  - Stealable workflow:
    - 1) Train predictor on historical demand.
    - 2) Generate forecast per SKU for next X days.
    - 3) Use forecast to recommend reorder and safety stock.
  - Thin slice (1–3 days): forecasting “POC” report for top 20 SKUs (no auto-ordering).
  - Evidence: Forecasting services define predictors and forecasts as a layer on top of time series data. (S70)

- **Feature:** Safety stock and service level knobs
  - What it is: allow merchants to set desired service level and compute safety stock (buffer).
  - Why merchant admin cares: balances stockout risk vs cash tied in inventory.
  - Stealable workflow:
    - 1) Choose service level per SKU class.
    - 2) Compute safety stock (simple heuristic).
    - 3) Include safety stock in target inventory.
  - Thin slice (1–3 days): fixed safety stock rule per ABC class + display-only.
  - Evidence: Forecasting and replenishment patterns typically include buffer stock assumptions. (S70)

- **Feature:** ABC classification (A/B/C SKUs) for inventory policy
  - What it is: classify SKUs by revenue/velocity to set different policies (review cadence, service levels).
  - Why merchant admin cares: focuses effort on high-impact SKUs; reduces ops load.
  - Stealable workflow:
    - 1) Compute SKU contribution over period.
    - 2) Assign A/B/C based on thresholds.
    - 3) Apply default reorder/safety settings by class.
  - Thin slice (1–3 days): compute A/B/C with editable overrides + filters.
  - Evidence: Replenishment tools commonly depend on policy settings and prioritization; classing is a standard ops pattern. (S67)

- **Feature:** Replenishment dashboard (top risk SKUs + actions)
  - What it is: dashboard of SKUs at risk (low days-of-cover, out-of-stock) with actions (create PO, transfer).
  - Why merchant admin cares: “single pane” for inventory risk; reduces surprise stockouts.
  - Stealable workflow:
    - 1) Show risk list with key columns (available, days of cover, incoming).
    - 2) Provide quick action buttons.
    - 3) Track which actions were taken.
  - Thin slice (1–3 days): risk table + “create draft PO” for selected SKUs.
  - Evidence: Replenishment tooling is presented as actionable dashboards/suggestions. (S67)

- **Feature:** Approval workflow for PO creation
  - What it is: require approval before sending large POs or POs for restricted vendors.
  - Why merchant admin cares: financial control; reduces mistakes; compliance.
  - Stealable workflow:
    - 1) Draft PO created from suggestions.
    - 2) Approver approves/denies.
    - 3) Only approved POs can be sent.
  - Thin slice (1–3 days): approval gate for POs over $X + audit log entry.
  - Evidence: Approvals are a common safety pattern, especially for financial actions. (S65, S63)

#### Pricing & billing admin (Tranche #10 — 2025-12-29)

- **Feature:** Plan/catalog management (products, prices, billing intervals)
  - What it is: define subscription plans (monthly/annual), pricing tiers, and entitlements mapped to product features.
  - Why merchant admin cares: ability to launch pricing changes without engineering; supports upsells and packaging.
  - Stealable workflow (2–5 steps):
    - 1) Create plan with price and interval.
    - 2) Define included features/limits.
    - 3) Publish plan and expose in upgrade UI.
  - Thin slice (1–3 days): 3 plans (Free/Pro/Enterprise) + feature flags/limits stored in DB (no checkout yet).
  - Evidence: Billing platforms are built around subscription products/prices. (S71)

- **Feature:** Subscription lifecycle management (create, upgrade/downgrade, cancel)
  - What it is: admin controls and customer-facing upgrade flows that change a subscription over time.
  - Why merchant admin cares: reduces churn and support; enables self-serve upgrades and clean cancellations.
  - Stealable workflow:
    - 1) Customer upgrades plan from billing page.
    - 2) System applies proration rules and updates entitlements.
    - 3) Customer cancels; access changes per policy (immediate vs end of period).
  - Thin slice (1–3 days): upgrade/downgrade/cancel UI + entitlement update (no proration math initially; “end of period” only).
  - Evidence: Subscription billing centers on lifecycle changes. (S71)

- **Feature:** Proration settings and preview (plan changes mid-cycle)
  - What it is: define proration policy and show a preview before applying a plan change.
  - Why merchant admin cares: avoids billing surprises; reduces refund tickets; improves trust.
  - Stealable workflow:
    - 1) Customer selects new plan.
    - 2) System computes proration and shows invoice preview.
    - 3) Customer confirms change.
  - Thin slice (1–3 days): show “proration preview” (read-only) from provider API + confirm flow.
  - Evidence: Stripe documents proration behavior for subscription updates. (S73)

- **Feature:** Invoice list + invoice detail (status, line items, payments)
  - What it is: admin UI and customer portal views for invoices, including line items and payment status.
  - Why merchant admin cares: reduces “can I get an invoice” tickets; supports accounting workflows.
  - Stealable workflow:
    - 1) Customer views invoices list.
    - 2) Opens invoice detail and downloads PDF.
    - 3) Pays outstanding invoice (if applicable).
  - Thin slice (1–3 days): invoice list + invoice detail + PDF link (from provider).
  - Evidence: Invoice lifecycle and surfaces are core billing concepts. (S72)

- **Feature:** Payment method management (update card, retry payments)
  - What it is: let customers update payment methods and retry failed invoices.
  - Why merchant admin cares: reduces involuntary churn; reduces support burden.
  - Stealable workflow:
    - 1) Customer adds/updates payment method.
    - 2) System attaches to customer and sets default.
    - 3) Retry latest failed invoice.
  - Thin slice (1–3 days): “update payment method” link to hosted provider UI + “retry invoice” action.
  - Evidence: Billing platforms treat payment methods and invoice payment as key workflows. (S71, S72)

- **Feature:** Dunning settings (retry schedule, emails, grace period)
  - What it is: configure retry attempts and messaging when payments fail.
  - Why merchant admin cares: reduces churn; sets customer expectations; protects revenue.
  - Stealable workflow:
    - 1) Configure retry schedule and grace period.
    - 2) On payment failure, send dunning emails.
    - 3) Suspend/cancel access after final failure.
  - Thin slice (1–3 days): 3-step retry schedule + “past due” state + email template.
  - Evidence: Billing docs include handling invoices and subscription states; dunning is a standard billing ops concept. (S71, S72)

- **Feature:** Taxes configuration (automatic tax, inclusive/exclusive, jurisdictions)
  - What it is: configure tax settings per region (VAT/GST) and whether prices include tax.
  - Why merchant admin cares: compliance; correct invoicing; reduces finance overhead.
  - Stealable workflow:
    - 1) Select tax mode (automatic vs manual).
    - 2) Configure jurisdictions.
    - 3) Apply taxes to invoices and show on PDF.
  - Thin slice (1–3 days): toggle “tax enabled” + store country + show tax line item (provider-managed).
  - Evidence: Billing providers include tax features and customer tax ID handling. (S74, S71)

- **Feature:** Customer tax IDs capture + validation (VAT ID)
  - What it is: collect tax IDs for customers and apply them to invoices.
  - Why merchant admin cares: B2B compliance; correct tax treatment; accounting workflows.
  - Stealable workflow:
    - 1) Customer enters tax ID.
    - 2) System validates (basic format) and saves.
    - 3) Tax ID appears on invoices.
  - Thin slice (1–3 days): store tax ID + show on invoice template (provider output).
  - Evidence: Stripe documents customer tax IDs. (S74)

- **Feature:** Coupons/discounts for subscriptions (promo codes)
  - What it is: apply discounts to subscriptions for acquisition and retention.
  - Why merchant admin cares: flexibility in sales; churn prevention; supports campaigns.
  - Stealable workflow:
    - 1) Create coupon code and duration.
    - 2) Customer applies coupon at checkout/upgrade.
    - 3) Coupon reflected on invoices.
  - Thin slice (1–3 days): one-time % off coupon applied at checkout (provider-managed).
  - Evidence: Subscription billing ecosystems commonly include discounts and invoices. (S71, S72)

- **Feature:** Billing portal (self-serve: plan, payment method, invoices)
  - What it is: centralized self-serve billing settings page.
  - Why merchant admin cares: reduces support; improves experience; increases upgrade conversion.
  - Stealable workflow:
    - 1) Customer opens billing portal.
    - 2) Manages plan and payment method.
    - 3) Downloads invoices.
  - Thin slice (1–3 days): link out to hosted billing portal + return URL + audit event on access.
  - Evidence: Billing docs emphasize invoices and subscription lifecycle surfaces. (S71, S72)

- **Feature:** Refunds/credits for billing disputes (admin tool)
  - What it is: issue refunds or credits against invoices/subscriptions with reason codes.
  - Why merchant admin cares: resolves disputes quickly; prevents chargebacks; keeps audit trail.
  - Stealable workflow:
    - 1) Admin selects invoice/payment.
    - 2) Issues refund or credit note with reason.
    - 3) Customer notified; audit log records action.
  - Thin slice (1–3 days): manual refund record + provider refund call + audit event.
  - Evidence: Invoice/payment lifecycle supports refund/adjustment workflows. (S72)

#### Subscription ops (swap/skip/pause, renewals, retries) (Tranche #23 — 2025-12-29)

- **Feature:** Subscriber portal: upcoming order preview (date, items, price, shipping)
  - What it is: self-serve portal page showing next scheduled shipment/charge with full details.
  - Why merchant admin cares: reduces “what am I getting / when?” tickets; increases retention via transparency.
  - Stealable workflow:
    - 1) Subscriber opens portal and sees “Next order” card.
    - 2) Views items + shipment date + estimated total.
    - 3) Confirms or edits (skip/swap) before cutoff.
  - Thin slice (1–3 days): “Next order” read-only view backed by subscription schedule table (no edits yet).
  - Evidence: Subscription platforms emphasize self-serve portal experiences and subscriber controls. (S172, S174)

- **Feature:** Skip next charge/shipment (one-click)
  - What it is: allow subscriber to skip the next renewal/order while keeping the subscription active.
  - Why merchant admin cares: prevents churn vs cancel; reduces support workload for “pause me this month”.
  - Stealable workflow:
    - 1) Subscriber clicks “Skip next”.
    - 2) System moves next charge date forward by 1 cycle.
    - 3) Portal confirms updated next order date; audit event recorded.
  - Thin slice (1–3 days): skip next cycle for 1 subscription with a single cutoff window (e.g., 24h).
  - Evidence: Market subscription tooling positions subscriber self-serve actions such as skip/pause. (S172, S173)

- **Feature:** Pause subscription (N cycles or until date)
  - What it is: pause billing/order generation for a subscription for a duration; resume later.
  - Why merchant admin cares: retains customer during lifecycle events; avoids manual “hold” work and disputes.
  - Stealable workflow:
    - 1) Subscriber selects pause duration (1–3 cycles) or resume date.
    - 2) System sets status to paused and freezes schedule.
    - 3) Auto-resume on date; notify subscriber.
  - Thin slice (1–3 days): pause for N cycles (1/2/3) + manual resume button for admins.
  - Evidence: Chargebee documents pause subscription concepts/workflows; subscription ops often support pause/resume. (S168, S167)

- **Feature:** Reactivation / resume after cancellation or pause
  - What it is: allow customer (or admin) to reactivate a paused/canceled subscription, with plan selection constraints.
  - Why merchant admin cares: winback lever; reduces support work; enables “restore access” quickly.
  - Stealable workflow:
    - 1) Admin or subscriber initiates reactivation from portal.
    - 2) System restores schedule and billing settings.
    - 3) Confirmation email + timeline updated.
  - Thin slice (1–3 days): admin-only reactivation for paused subscriptions with a single “resume now” action.
  - Evidence: Chargebee documents reactivation workflows and constraints. (S169)

- **Feature:** Swap product / variant in upcoming order (edit-next)
  - What it is: subscriber swaps an item variant (e.g., flavor/size) for the next shipment without changing cadence.
  - Why merchant admin cares: reduces churn and returns; reduces support changes and manual edits.
  - Stealable workflow:
    - 1) Subscriber clicks “Swap” on an item.
    - 2) Selects replacement variant from allowed set.
    - 3) System updates “next order items” and confirms.
  - Thin slice (1–3 days): swap within same product (variant change) for next order only; no price delta handling.
  - Evidence: Subscription platforms position swap/edit capabilities in subscriber portals; subscription item update primitives exist at API level. (S172, S170)

- **Feature:** One-time add-on to next order (upsell without changing cadence)
  - What it is: allow adding a one-time item to the next shipment/charge.
  - Why merchant admin cares: increases AOV; provides retention-friendly “try this once” upsell.
  - Stealable workflow:
    - 1) Subscriber browses add-ons list.
    - 2) Adds item to “next order”.
    - 3) Portal updates total and confirms.
  - Thin slice (1–3 days): allow one add-on SKU to be appended to next order with a fixed price.
  - Evidence: Subscription tools commonly expose “add-on” patterns in the portal as revenue levers. (S172, S174)

- **Feature:** Change delivery cadence (every 2 weeks / monthly / every N)
  - What it is: change frequency while keeping subscription active.
  - Why merchant admin cares: reduces churn when usage changes; reduces refund/chargeback risk from unwanted renewals.
  - Stealable workflow:
    - 1) Subscriber selects new cadence.
    - 2) System recalculates next charge date.
    - 3) Notify customer; audit log records change.
  - Thin slice (1–3 days): support monthly vs every-2-months only; no proration.
  - Evidence: Subscription lifecycle tools support plan/cadence changes as core retention workflows. (S167, S172)

- **Feature:** Address + shipping method update with cutoff enforcement
  - What it is: allow subscriber to update shipping address/method for upcoming orders before a cutoff.
  - Why merchant admin cares: reduces delivery issues, reships, and support tickets; avoids warehouse exceptions.
  - Stealable workflow:
    - 1) Subscriber edits address.
    - 2) System validates cutoff; accepts change or blocks with reason.
    - 3) Updated address applies to next order generation.
  - Thin slice (1–3 days): address edit with “lock after cutoff” rule and audit event.
  - Evidence: Subscriber portals are positioned as the place to manage delivery details; cutoff rules are standard ops guardrails. (S172, S174)

- **Feature:** Subscription status model + timeline (active, paused, canceled, past due)
  - What it is: canonical subscription states and a timeline of events (skip, swap, payment failed, resumed).
  - Why merchant admin cares: creates a shared language for support and ops; enables queueing and automation.
  - Stealable workflow:
    - 1) System emits events on each subscription action.
    - 2) Store events in timeline table.
    - 3) Render timeline in admin + portal.
  - Thin slice (1–3 days): 5 statuses + append-only timeline entries; no integrations.
  - Evidence: Subscription systems document lifecycle states and common operations; chargebee subscription docs provide reference framing. (S167)

- **Feature:** Renewal notification policy (upcoming charge / shipping soon)
  - What it is: configurable notifications before renewals and shipments (email/SMS).
  - Why merchant admin cares: reduces chargebacks and negative sentiment; lowers “surprise charge” tickets.
  - Stealable workflow:
    - 1) Configure notice window (e.g., 3 days before charge).
    - 2) System sends notification with portal link.
    - 3) Subscriber can skip/swap before cutoff.
  - Thin slice (1–3 days): one “upcoming charge” email template + 72h notice rule.
  - Evidence: Subscription platforms emphasize self-serve portals and proactive comms to reduce churn and tickets. (S172, S175)

- **Feature:** Payment failure queue + status (past due) for subscription ops
  - What it is: a queue of subscriptions with failed payments/invoices, with next action and attempts count.
  - Why merchant admin cares: reduces involuntary churn; standardizes recovery work; improves revenue retention.
  - Stealable workflow:
    - 1) Detect payment failure → mark subscription “past due”.
    - 2) Add to recovery queue.
    - 3) Notify subscriber to update payment method.
  - Thin slice (1–3 days): manual “mark past due” + queue view + email template; no automated retries yet.
  - Evidence: Billing ops centers on invoice/payment states and dunning/retry loops. (S71, S72)

- **Feature:** Dunning + retry schedule (grace period + suspend/cancel)
  - What it is: configurable retry steps and what happens after final failure (suspend access vs cancel).
  - Why merchant admin cares: prevents revenue leakage; ensures consistent policy; reduces manual follow-up.
  - Stealable workflow:
    - 1) Configure retry schedule and grace period.
    - 2) Run retries and send emails at each stage.
    - 3) Apply final action (suspend/cancel) and log outcome.
  - Thin slice (1–3 days): 3-step retry schedule + “suspended” state + admin override.
  - Evidence: Chargebee provides dunning guidance and workflow; billing platforms treat dunning as core ops. (S171, S76)

- **Feature:** Cancellation flow with reason codes + save offers (“pause instead”)
  - What it is: cancellation UX that captures reasons and offers alternatives (skip/pause/downgrade).
  - Why merchant admin cares: churn insights + save rate; reduces permanent churn; informs merchandising.
  - Stealable workflow:
    - 1) Subscriber selects cancel → choose reason.
    - 2) Show save offers based on reason (pause/skip/swap).
    - 3) Confirm cancel; update access policy.
  - Thin slice (1–3 days): cancel reason required + show “pause for 2 cycles” offer before confirmation.
  - Evidence: Subscription platforms emphasize retention workflows and subscriber self-serve controls. (S175, S172)

- **Feature:** Price change + renewal policy (grandfathering vs immediate)
  - What it is: manage subscription price increases, optionally grandfathering existing subscribers until renewal.
  - Why merchant admin cares: avoids backlash; enables controlled price strategy; reduces support volume.
  - Stealable workflow:
    - 1) Create new price effective date.
    - 2) Choose scope (new subs only vs existing at renewal).
    - 3) Notify affected subscribers; track acknowledgement.
  - Thin slice (1–3 days): “effective on next renewal” flag + email notification list export.
  - Evidence: Subscription catalog and lifecycle systems include plan/price change mechanisms and policy decisions. (S167, S71)

- **Feature:** Bulk subscription migration (plan, cadence, price) with dry-run
  - What it is: apply a batch change to many subscriptions (migrations, contract updates) with preview and rollback plan.
  - Why merchant admin cares: reduces manual risk; enables large-scale policy shifts; supports replatforming.
  - Stealable workflow:
    - 1) Upload segment/list of subscriptions.
    - 2) Preview effects (counts, revenue impact, schedule changes).
    - 3) Execute batch; export results/errors.
  - Thin slice (1–3 days): CSV-based bulk change tool with dry-run validation and “execute batch” job.
  - Evidence: Chargebee documents bulk operations as a first-class mechanism for batch changes. (S171)

- **Feature:** Subscription segmentation + saved views (at-risk, paused, VIP)
  - What it is: filterable segments of subscribers with saved views to run ops playbooks.
  - Why merchant admin cares: operationalizes retention; makes work manageable; enables targeted campaigns.
  - Stealable workflow:
    - 1) Filter subs by status/next charge date/attempts.
    - 2) Save view and share deep link.
    - 3) Run bulk actions (email, pause, tag).
  - Thin slice (1–3 days): filters + saved views + CSV export for a segment.
  - Evidence: Subscription ops requires queue-based handling and batch actions; bulk operations patterns exist. (S171, S167)

- **Feature:** Admin override tools (edit next date, comp/refund, notes)
  - What it is: privileged tools for support to override schedule dates, issue goodwill credits, and leave internal notes.
  - Why merchant admin cares: resolves edge cases fast; reduces churn; keeps an audit trail for policy exceptions.
  - Stealable workflow:
    - 1) Agent opens subscription detail.
    - 2) Applies override (move next date / credit).
    - 3) Logs reason and notifies subscriber.
  - Thin slice (1–3 days): “move next date by X days” + internal note + audit log entry.
  - Evidence: Subscription management systems document admin workflows for subscription changes; APIs support updating subscription items. (S167, S170)

#### B2B subscription ops (seat-based, invoicing, tax IDs, approvals) (Tranche #26 — 2025-12-29)

- **Feature:** Company account model (organization record + billing contacts)
  - What it is: represent a B2B customer as a company account with contacts and billing metadata.
  - Why merchant admin cares: B2B buyers are accounts, not individuals; billing, tax, and approvals flow from the account.
  - Stealable workflow:
    - 1) Create account with primary billing contact.
    - 2) Add additional contacts (invoice recipients).
    - 3) Attach subscriptions/invoices to the account.
  - Thin slice (1–3 days): account table + contacts table + “invoice recipients” list; no permissions yet.
  - Evidence: Billing docs treat “accounts” as a core model for subscriptions and invoicing. (S191, S167)

- **Feature:** Account hierarchy (parent/child accounts) + consolidated billing view
  - What it is: parent-child relationships for subsidiaries and consolidated invoicing/reporting.
  - Why merchant admin cares: enterprise customers often have multiple departments; reduces invoicing chaos.
  - Stealable workflow:
    - 1) Create child accounts under a parent.
    - 2) Configure billing owner (child vs parent).
    - 3) View consolidated invoices and subscription totals.
  - Thin slice (1–3 days): parent/child linking + consolidated “invoices across children” list.
  - Evidence: Chargebee documents account hierarchy as a first-class billing concept. (S187)

- **Feature:** Seat-based pricing model (seat quantity + role types)
  - What it is: subscriptions priced by seats, optionally with role types (admin vs member) and included seats.
  - Why merchant admin cares: B2B packaging is often seat-driven; needs clean “seat count” admin controls.
  - Stealable workflow:
    - 1) Define subscription plan with per-seat price.
    - 2) Track seat assignments and total seats.
    - 3) Bill based on seat quantity (prorated or next-cycle).
  - Thin slice (1–3 days): seat quantity field on subscription + “seats used” counter; bill changes next cycle (no proration).
  - Evidence: Subscriptions + entitlements are standard patterns for feature/seat gating. (S167, S193)

- **Feature:** Seat assignment roster (invite/remove users) + audit trail
  - What it is: manage which users consume seats, with join/leave history.
  - Why merchant admin cares: prevents overbilling disputes; supports compliance and offboarding.
  - Stealable workflow:
    - 1) Admin invites user; assign seat.
    - 2) Remove user; free seat.
    - 3) Export seat assignment history.
  - Thin slice (1–3 days): seat roster CRUD + audit log entries on add/remove.
  - Evidence: Seat-based subscriptions require operational controls and auditability for billing correctness. (S193, S65)

- **Feature:** Entitlements mapping (features/limits per plan) + enforcement hooks
  - What it is: define which features/limits each plan includes and enforce them in product.
  - Why merchant admin cares: reduces custom code; makes packaging changes manageable; supports upsells.
  - Stealable workflow:
    - 1) Define entitlements per plan (feature flags/limits).
    - 2) Evaluate entitlements at runtime.
    - 3) Show upgrade CTA when over limit.
  - Thin slice (1–3 days): entitlements table + simple runtime check for 3 limits.
  - Evidence: Chargebee documents entitlements/feature management concepts. (S193)

- **Feature:** Quotes (sales-assisted pricing) + approval workflow
  - What it is: generate a quote for procurement review, then convert it into a subscription/invoice.
  - Why merchant admin cares: B2B deals require procurement-friendly flows and approvals; reduces manual contracting work.
  - Stealable workflow:
    - 1) Sales creates quote with plan, seats, term, and price.
    - 2) Customer reviews/approves quote.
    - 3) Convert to subscription and generate invoice.
  - Thin slice (1–3 days): quote object + PDF download + “approved” status; conversion is manual for now.
  - Evidence: Chargebee documents quotes as a first-class billing workflow. (S188)

- **Feature:** Invoice-based billing (net terms) + invoice status tracking
  - What it is: support invoicing with due dates (Net 30/60) and track statuses (draft, issued, paid, overdue).
  - Why merchant admin cares: core B2B payment mode; reduces churn from “we can’t pay by card”.
  - Stealable workflow:
    - 1) Issue invoice with due date.
    - 2) Send invoice to billing contacts.
    - 3) Mark paid and record payment reference.
  - Thin slice (1–3 days): invoice record + due date + manual “mark paid” + PDF link.
  - Evidence: Billing platforms model invoice lifecycle and statuses explicitly. (S189, S192)

- **Feature:** Advance invoices (invoice at start of term / upfront) for contracts
  - What it is: invoice for an upcoming service period (annual upfront billing) and manage service start/end dates.
  - Why merchant admin cares: enterprise procurement requires upfront invoices and contract alignment.
  - Stealable workflow:
    - 1) Configure term and invoice timing (advance).
    - 2) Generate invoice and send to customer.
    - 3) Track payment and activate access.
  - Thin slice (1–3 days): “annual upfront invoice” toggle + generate invoice record + manual activation.
  - Evidence: Advance invoices are explicitly documented as a billing pattern. (S190)

- **Feature:** Purchase order (PO) number capture + required metadata on invoices
  - What it is: require PO number and billing references on invoices/quotes.
  - Why merchant admin cares: procurement requirement; prevents payment delays.
  - Stealable workflow:
    - 1) Configure “PO required” for B2B segment.
    - 2) Capture PO on quote or invoice creation.
    - 3) Show PO on invoice PDF and in admin.
  - Thin slice (1–3 days): PO field + validation + display on invoice detail (no PDF rendering).
  - Evidence: Quotes/invoices workflows imply supporting procurement metadata fields. (S188, S189)

- **Feature:** Tax IDs and billing address governance for B2B
  - What it is: capture VAT/tax IDs and validated billing addresses, with country/jurisdiction awareness.
  - Why merchant admin cares: compliance and correct invoicing; reduces finance back-and-forth.
  - Stealable workflow:
    - 1) Capture tax ID and billing address on account.
    - 2) Validate format (basic rules) and store evidence.
    - 3) Include on invoice/quote outputs.
  - Thin slice (1–3 days): tax_id field + country + basic format validation + “verified by agent” checkbox.
  - Evidence: Account and invoice models include B2B billing context and required fields. (S191, S189)

- **Feature:** Multi-subsidiary billing contacts and notification rules
  - What it is: route invoices and dunning emails to correct contacts per account or subsidiary.
  - Why merchant admin cares: reduces payment delays and support escalations; supports enterprise org charts.
  - Stealable workflow:
    - 1) Configure contact roles (billing, procurement, admin).
    - 2) Select recipients per invoice.
    - 3) Track delivery and bounces.
  - Thin slice (1–3 days): billing contact list + “send invoice to” selection + delivery log.
  - Evidence: Account hierarchy and invoicing workflows require contact routing controls. (S187, S189)

- **Feature:** Manual approvals for plan/seat changes (sales ops safety)
  - What it is: require approval before applying plan/seat changes for contract accounts (e.g., enterprise deals).
  - Why merchant admin cares: prevents accidental revenue-impacting changes; supports sales/CS governance.
  - Stealable workflow:
    - 1) Agent proposes change (plan/seats/term).
    - 2) Approver approves/denies with notes.
    - 3) Apply change and log approval record.
  - Thin slice (1–3 days): approval gate for “enterprise segment” + approve/deny + audit log.
  - Evidence: B2B billing workflows include approvals via quotes and governance patterns. (S188, S65)

- **Feature:** Bulk contract updates (seat price increase, plan migration) with dry-run
  - What it is: batch-update enterprise subscriptions with preview and error reporting (migrations, price uplifts).
  - Why merchant admin cares: reduces manual risk and enables programmatic policy rollouts.
  - Stealable workflow:
    - 1) Select segment or upload CSV of accounts/subscriptions.
    - 2) Run dry-run preview (counts, revenue impact).
    - 3) Execute batch; export per-row results.
  - Thin slice (1–3 days): CSV-driven batch update job with dry-run summary + results CSV.
  - Evidence: Bulk operations are a first-class admin surface in billing platforms. (S171)

- **Feature:** Billing dispute workflow (invoice adjustments + credit notes) for B2B
  - What it is: handle invoicing disputes with adjustments/credits and a clear audit trail.
  - Why merchant admin cares: reduces churn and payment delays; keeps finance ops clean.
  - Stealable workflow:
    - 1) Open invoice; add dispute note.
    - 2) Issue adjustment/credit.
    - 3) Re-issue invoice and notify contacts.
  - Thin slice (1–3 days): dispute note + “adjustment” record + updated invoice total (no credit note PDF).
  - Evidence: Invoice workflows and related credit/adjustment concepts are part of billing admin surfaces. (S189, S192)

- **Feature:** Account-level billing export pack (invoice history + subscriptions + contacts)
  - What it is: generate a “billing pack” export for finance/procurement (invoices, subscriptions, contacts, tax fields).
  - Why merchant admin cares: reduces ad-hoc reporting requests; speeds procurement and finance reconciliation.
  - Stealable workflow:
    - 1) Admin selects account and export scope/date range.
    - 2) System generates zip (CSV + PDFs links).
    - 3) Track export runs and downloads for auditability.
  - Thin slice (1–3 days): CSV exports for invoices + subscriptions + contacts (no zip) with a download log.
  - Evidence: Account and invoice models define the core dataset needed for exports. (S191, S189)

#### Fraud & risk (Tranche #11 — 2025-12-29)

- **Feature:** Order risk panel (signals + recommended action)
  - What it is: show risk signals on an order (risk level, mismatches, prior history) and suggested actions (hold, cancel, verify).
  - Why merchant admin cares: reduces fraud losses and manual guesswork; standardizes decision-making.
  - Stealable workflow (2–5 steps):
    - 1) Order created → compute risk score and signals.
    - 2) Display risk panel in order view.
    - 3) Agent chooses action (hold/cancel/fulfill) with reason.
  - Thin slice (1–3 days): show “risk level” + 5 simple signals + “hold order” action + audit log.
  - Evidence: Shopify exposes fraud analysis indicators and recommended actions. (S80)

- **Feature:** Risk scoring (heuristics-first) + explainability
  - What it is: compute a risk score from heuristics (velocity, address mismatch, high value) and show “why flagged”.
  - Why merchant admin cares: enables fast triage; builds trust in the system; reduces false positives.
  - Stealable workflow:
    - 1) Compute score from configured heuristics.
    - 2) Store top contributing reasons.
    - 3) Show “why flagged” explanation and allow overrides.
  - Thin slice (1–3 days): 10 heuristics + top 3 reasons surfaced; no ML.
  - Evidence: Fraud systems emphasize risk evaluation and rule surfaces; explainability is needed for ops adoption. (S77)

- **Feature:** Manual review queue (high-risk orders)
  - What it is: a queue of orders awaiting review, with SLA targets and standardized actions.
  - Why merchant admin cares: prevents shipping fraudulent orders; gives team a single place to work risk.
  - Stealable workflow:
    - 1) High-risk orders auto-enter queue.
    - 2) Reviewer checks signals and chooses outcome.
    - 3) Outcome logged and affects future scoring.
  - Thin slice (1–3 days): queue view + assign reviewer + approve/deny/hold actions.
  - Evidence: Risk evaluation plus workflow surfaces imply review queues as a standard pattern. (S77, S80)

- **Feature:** Rules engine for risk decisions (if X then hold/cancel)
  - What it is: configure rule-based automation for risk (block high-risk countries, require review above $X).
  - Why merchant admin cares: reduces manual work; enforces policy consistently.
  - Stealable workflow:
    - 1) Define rule triggers/conditions.
    - 2) Set action (hold/cancel/require verification).
    - 3) Log rule hits and allow overrides with reason.
  - Thin slice (1–3 days): 10 rules + action “hold order” + rule hit log.
  - Evidence: Fraud prevention tools expose rules and risk evaluation surfaces. (S77)

- **Feature:** Verification step (customer identity / address confirmation)
  - What it is: request customer confirmation for suspicious orders (confirm address, ID check, phone verification).
  - Why merchant admin cares: reduces chargebacks; increases confidence before fulfillment.
  - Stealable workflow:
    - 1) Order flagged → send verification request.
    - 2) Customer completes verification.
    - 3) Order released or canceled.
  - Thin slice (1–3 days): email-based address confirmation link + “verified” flag + manual release.
  - Evidence: Fraud analysis recommended actions often include verify/hold patterns. (S80)

- **Feature:** Velocity controls (order bursts, repeated attempts)
  - What it is: detect high-velocity patterns (many orders from same email/IP/card fingerprint).
  - Why merchant admin cares: blocks card testing and bot attacks early; reduces processor risk.
  - Stealable workflow:
    - 1) Track counts per key (IP/email/bin) in rolling window.
    - 2) If threshold exceeded, hold or block.
    - 3) Log event and notify risk team.
  - Thin slice (1–3 days): rolling window counter for IP/email + auto-hold + alert.
  - Evidence: Fraud prevention systems depend on velocity/rules layers. (S77)

- **Feature:** Payment risk signals intake (3DS status, AVS/CVC results, processor risk)
  - What it is: ingest payment processor results (3DS, AVS, CVC, risk scores) into the order timeline.
  - Why merchant admin cares: reduces uncertainty; improves review accuracy; supports dispute evidence later.
  - Stealable workflow:
    - 1) Receive payment intent results.
    - 2) Store signals on payment record.
    - 3) Display in risk panel and include in evidence packet.
  - Thin slice (1–3 days): store and display 5 payment signals (3DS, AVS, CVC, risk level, funding type).
  - Evidence: Fraud tools integrate with payment risk evaluation surfaces. (S77)

- **Feature:** Chargeback/dispute inbox (open disputes + deadlines)
  - What it is: list of disputes/chargebacks with status, deadlines, and required next steps.
  - Why merchant admin cares: avoids missed deadlines; reduces losses; standardizes handling.
  - Stealable workflow:
    - 1) Dispute created → create dispute record.
    - 2) Show in inbox with due date and checklist.
    - 3) Submit evidence and track outcome.
  - Thin slice (1–3 days): dispute list + due date reminders + status updates (manual).
  - Evidence: Disputes are a lifecycle with deadlines and actions. (S78)

- **Feature:** Evidence packet builder (order, tracking, comms, refund policy)
  - What it is: gather evidence for disputes (order details, shipping proof, customer comms, refund/return policy).
  - Why merchant admin cares: improves win rate; reduces time per dispute; consistency.
  - Stealable workflow:
    - 1) Select dispute.
    - 2) Auto-attach standard evidence (order timeline, tracking, delivery proof).
    - 3) Allow upload and submit.
  - Thin slice (1–3 days): generate a PDF/ZIP “evidence packet” + upload attachments.
  - Evidence: Dispute categories and evidence guidance are documented. (S79)

- **Feature:** Dispute playbooks by category (fraud vs service vs not received)
  - What it is: recommended actions and evidence templates based on dispute category/reason code.
  - Why merchant admin cares: faster handling; higher win rates; onboarding for new agents.
  - Stealable workflow:
    - 1) Map dispute category to playbook.
    - 2) Pre-fill evidence checklist and message template.
    - 3) Track completion and outcome.
  - Thin slice (1–3 days): 3 categories with checklists + template notes.
  - Evidence: Dispute categories are explicitly enumerated and require different evidence. (S79, S81)

- **Feature:** Return fraud gating (link return history to risk)
  - What it is: detect abusive returners and gate options (store credit only, receive-first, manual review).
  - Why merchant admin cares: protects margin; reduces fraudulent refund losses.
  - Stealable workflow:
    - 1) Compute returner risk from history.
    - 2) Restrict return resolutions and triggers.
    - 3) Route to review queue for edge cases.
  - Thin slice (1–3 days): heuristic risk level + policy gating in returns portal.
  - Evidence: Return fraud pressure is a documented trend driver for gating and risk scoring. (S9)

- **Feature:** Audit trail for fraud decisions (who held/canceled and why)
  - What it is: record each risk decision, override, and evidence submission with actor and timestamp.
  - Why merchant admin cares: compliance; internal accountability; improves future policy tuning.
  - Stealable workflow:
    - 1) Every fraud-related action emits an audit event.
    - 2) Audit log searchable by order/dispute.
    - 3) Export for compliance or processor reviews.
  - Thin slice (1–3 days): audit events for 15 risk actions + order-level timeline.
  - Evidence: Audit logs are standard for admin actions and investigations. (S65)

#### Analytics for finance (Tranche #12 — 2025-12-29)

- **Feature:** Finance metrics dictionary (MRR, ARR, churn, expansion, contraction)
  - What it is: canonical definitions and formulas for subscription finance metrics (gross MRR, net MRR, ARR, churn).
  - Why merchant admin cares: prevents “metric disagreements”; ensures dashboards match finance definitions.
  - Stealable workflow (2–5 steps):
    - 1) Define metrics and formulas in admin.
    - 2) Attach definition tooltips to dashboards.
    - 3) Version and audit changes.
  - Thin slice (1–3 days): dictionary for 8 metrics + tooltips + changelog.
  - Evidence: Stripe documents MRR and subscription metrics definitions. (S82, S83)

- **Feature:** MRR dashboard (current MRR + trend)
  - What it is: dashboard showing MRR over time with breakdowns (plan, segment, region).
  - Why merchant admin cares: primary revenue health signal; supports planning and staffing.
  - Stealable workflow:
    - 1) Compute daily/monthly MRR snapshots.
    - 2) Show trend line and key breakdowns.
    - 3) Drill into customer list driving changes.
  - Thin slice (1–3 days): MRR time series + breakdown by plan + top movers list.
  - Evidence: MRR is a standard metric in billing contexts. (S82, S84)

- **Feature:** ARR view (derived) + forecasting knobs (simple)
  - What it is: show ARR derived from MRR and allow a simple “growth rate” projection.
  - Why merchant admin cares: board/finance planning; longer-term view than MRR.
  - Stealable workflow:
    - 1) Derive ARR = MRR * 12 (with caveats).
    - 2) Show simple projection.
    - 3) Annotate assumptions.
  - Thin slice (1–3 days): ARR card + projection slider (display-only).
  - Evidence: SaaS metrics definitions typically include ARR as derived metric. (S84, S85)

- **Feature:** Churn dashboard (logo churn + revenue churn)
  - What it is: track churn in customers (logo churn) and in revenue (revenue churn), with cohort breakdowns.
  - Why merchant admin cares: retention health; identifies plan/segment problems.
  - Stealable workflow:
    - 1) Define churn events (cancel, non-payment).
    - 2) Compute churn rates per period.
    - 3) Break down by plan/cohort.
  - Thin slice (1–3 days): churn rate table + chart + breakdown by plan.
  - Evidence: Stripe and SaaS metric sources define churn/retention concepts. (S83, S84)

- **Feature:** Net Revenue Retention (NRR) bridge (starting MRR → ending MRR)
  - What it is: bridge showing expansion, contraction, churn and new revenue contributions.
  - Why merchant admin cares: highlights growth levers; measures account expansion success.
  - Stealable workflow:
    - 1) Compute starting MRR by cohort.
    - 2) Attribute changes to expansion/contraction/churn.
    - 3) Compute NRR/GRR.
  - Thin slice (1–3 days): NRR/GRR for one cohort (monthly) + bridge bars.
  - Evidence: SaaS metrics definitions describe retention/expansion structure. (S84, S85)

- **Feature:** Cohort analysis (signup month → retention curve)
  - What it is: cohort tables for retention and revenue retention.
  - Why merchant admin cares: identifies product-market fit and pricing changes impact over time.
  - Stealable workflow:
    - 1) Cohort users by start month.
    - 2) Compute active and paying in subsequent months.
    - 3) Visualize cohort curves.
  - Thin slice (1–3 days): retention cohort table + export CSV.
  - Evidence: Standard SaaS metrics analytics uses cohort tables. (S84, S85)

- **Feature:** LTV calculation (simple, transparent)
  - What it is: estimate lifetime value using ARPA and churn rate (or cohort lifetime).
  - Why merchant admin cares: acquisition spend and ROI decisions; pricing decisions.
  - Stealable workflow:
    - 1) Compute ARPA (avg revenue per account).
    - 2) Compute churn rate.
    - 3) Estimate LTV with formula and caveats.
  - Thin slice (1–3 days): LTV estimate card with formula display + confidence note.
  - Evidence: SaaS metrics sources cover LTV and its relationship to churn. (S84, S85)

- **Feature:** Revenue waterfall / invoice revenue vs recognized revenue
  - What it is: compare billed revenue (invoices) with recognized revenue (MRR), and show adjustments.
  - Why merchant admin cares: finance reconciliation; prevents confusion between cash and revenue.
  - Stealable workflow:
    - 1) Pull invoice totals per month.
    - 2) Compute MRR-based revenue.
    - 3) Show differences and reasons (timing).
  - Thin slice (1–3 days): invoice totals chart vs MRR chart (no complex rev rec).
  - Evidence: Stripe revenue recognition metrics exist and clarify framing. (S82)

- **Feature:** Refunds/chargebacks impact report (losses over time)
  - What it is: track refunds and disputes as negative revenue and measure their impact.
  - Why merchant admin cares: revenue protection; identifies risky segments and policy issues.
  - Stealable workflow:
    - 1) Pull refunds and disputes events.
    - 2) Aggregate losses by period.
    - 3) Break down by plan/segment/country.
  - Thin slice (1–3 days): monthly losses chart + top reasons list.
  - Evidence: Disputes are a lifecycle and can be measured as losses. (S78)

- **Feature:** “Explain this metric” drilldowns (from dashboard → underlying customers)
  - What it is: ability to click a metric and see which customers/invoices contributed to it.
  - Why merchant admin cares: trust and debugging; enables action (reach out to churned accounts).
  - Stealable workflow:
    - 1) Click metric segment.
    - 2) See list of contributing accounts/invoices.
    - 3) Export or create tasks for follow-up.
  - Thin slice (1–3 days): drilldown for churned accounts and expansions list.
  - Evidence: Metrics need transparency to be trusted; definitions and dashboards are part of SaaS metrics best practices. (S84)

- **Feature:** Instrumentation standards (metrics naming + dimensions)
  - What it is: define metric naming conventions and core dimensions (plan, region, channel) to avoid analytics drift.
  - Why merchant admin cares: consistent dashboards; easier integration with BI tools.
  - Stealable workflow:
    - 1) Define standard metric names and labels.
    - 2) Enforce in code/instrumentation.
    - 3) Document in metrics dictionary.
  - Thin slice (1–3 days): naming guidelines + 20 metric names + 10 dimensions.
  - Evidence: OpenMetrics provides conventions for metric exposition and naming. (S86)

#### Data import/export + integrations admin (Tranche #13 — 2025-12-29)

- **Feature:** Connector catalog (integrations marketplace inside admin)
  - What it is: browse and install connectors (Shopify, Stripe, carriers, Slack) with status and configuration.
  - Why merchant admin cares: faster integrations; reduces engineering dependency; operational transparency.
  - Stealable workflow (2–5 steps):
    - 1) Admin selects connector.
    - 2) Completes auth/config.
    - 3) Connector becomes “active” and starts syncing/events.
  - Thin slice (1–3 days): 6 connectors listed + “connect/disconnect” + connection status (no deep sync).
  - Evidence: “Sources → Destinations” is a standard integration hub framing. (S88)

- **Feature:** Connection setup (OAuth/API key) + permissions/scopes
  - What it is: configure integration credentials and scopes; store securely; show “last validated” timestamp.
  - Why merchant admin cares: reduces misconfig; ensures least privilege; supports rotation.
  - Stealable workflow:
    - 1) Start connection wizard.
    - 2) Authorize and save credentials.
    - 3) Validate and show connection health.
  - Thin slice (1–3 days): API key auth for 2 integrations + validation test + revoke/rotate button.
  - Evidence: Webhook and API integrations typically require secure credential management and verification. (S87)

- **Feature:** Webhook endpoint manager (create endpoints + signing secrets)
  - What it is: manage outbound webhook endpoints and signing secrets; generate sample verification snippet.
  - Why merchant admin cares: secure integrations; reduces support debugging; enables safe partner integrations.
  - Stealable workflow:
    - 1) Create endpoint URL with enabled events.
    - 2) Generate signing secret.
    - 3) Show deliveries and allow replay.
  - Thin slice (1–3 days): add endpoint + secret + “send test event” + view last 20 deliveries.
  - Evidence: Stripe documents webhook event delivery and signing patterns. (S87)

- **Feature:** Webhook delivery log (attempts, status codes, retries)
  - What it is: per-endpoint delivery logs with request/response metadata and retry status.
  - Why merchant admin cares: reduces “it didn’t work” debugging time; improves partner reliability.
  - Stealable workflow:
    - 1) View delivery attempts and errors.
    - 2) Filter by endpoint/event/time/status code.
    - 3) Replay failed deliveries after fix.
  - Thin slice (1–3 days): delivery list + filters + manual replay.
  - Evidence: Webhook delivery attempts and endpoint health are explicit productized surfaces (Svix). (S93)

- **Feature:** Event subscription manager (choose which events to emit/receive)
  - What it is: configure event topics (order created, dispute opened, shipment exception) per integration.
  - Why merchant admin cares: prevents noise; reduces costs; keeps integrations targeted.
  - Stealable workflow:
    - 1) Select events per endpoint/connector.
    - 2) Save subscriptions.
    - 3) Show sample payloads.
  - Thin slice (1–3 days): 20 event types + checkbox UI + sample payload viewer.
  - Evidence: Shopify provides webhook subscription resources and event topics. (S89)

- **Feature:** Import/export center (CSV uploads, bulk exports)
  - What it is: a single place for importing and exporting data (products, customers, returns, tickets).
  - Why merchant admin cares: migrations, audits, operational workflows; reduces engineering time.
  - Stealable workflow:
    - 1) Choose dataset (e.g., returns).
    - 2) Export to CSV or upload import CSV.
    - 3) Validate and show errors before applying.
  - Thin slice (1–3 days): CSV export for 2 datasets + CSV import with dry-run validation.
  - Evidence: Bulk operations exist to handle large exports and syncs. (S90)

- **Feature:** Bulk export jobs (async, large datasets) + download links
  - What it is: run exports as background jobs; show status and downloadable results.
  - Why merchant admin cares: avoids timeouts; supports large merchant data.
  - Stealable workflow:
    - 1) Start export job.
    - 2) Job runs asynchronously and shows progress.
    - 3) Download results when complete.
  - Thin slice (1–3 days): async job record + progress + signed download link.
  - Evidence: Bulk operations are a documented API pattern for large data. (S90)

- **Feature:** Sync schedules (hourly/daily) + manual sync now
  - What it is: control when connectors sync; allow immediate manual sync for urgent updates.
  - Why merchant admin cares: predictability and control; reduces stale data issues.
  - Stealable workflow:
    - 1) Set schedule per connector.
    - 2) Run sync job at schedule.
    - 3) “Sync now” triggers an immediate run.
  - Thin slice (1–3 days): daily schedule + “run now” for 2 connectors.
  - Evidence: ELT platforms model connectors with scheduled sync jobs and runs. (S91)

- **Feature:** Sync run history (success/failure, rows processed)
  - What it is: list past runs with counts and error details for each connector.
  - Why merchant admin cares: observability; reduces debugging effort; supports compliance.
  - Stealable workflow:
    - 1) View run list.
    - 2) Click a run to see logs and errors.
    - 3) Retry failed run.
  - Thin slice (1–3 days): run list + per-run status + retry button.
  - Evidence: Connector platforms expose job runs and failures as core surfaces. (S91)

- **Feature:** Error handling + retries (with backoff) + alerting
  - What it is: auto-retry transient failures, alert on repeated failures, and allow manual retries.
  - Why merchant admin cares: reliability; fewer silent data gaps; predictable ops.
  - Stealable workflow:
    - 1) On failure, auto-retry with backoff.
    - 2) After N failures, alert and pause connector.
    - 3) Admin fixes and resumes.
  - Thin slice (1–3 days): retries (3) + pause-on-fail + email/slack alert.
  - Evidence: Webhook and sync systems require retries and delivery observability to be robust. (S93, S91)

- **Feature:** Field mapping/transforms (minimal) for imports
  - What it is: map CSV columns to internal fields; apply simple transforms (trim, uppercase).
  - Why merchant admin cares: supports migrations from other tools; reduces manual cleanup.
  - Stealable workflow:
    - 1) Upload CSV and detect columns.
    - 2) Map columns to target fields.
    - 3) Preview transformed rows and import.
  - Thin slice (1–3 days): mapping UI for 10 fields + preview 20 rows.
  - Evidence: ELT/connector tools emphasize mapping/config to align schemas. (S92, S91)

#### Mobile ops (Tranche #14 — 2025-12-29)

- **Feature:** Scan-to-receive (inventory transfers) mobile flow
  - What it is: mobile workflow to receive inventory transfers using barcode scanning, supporting partial receipts.
  - Why merchant admin cares: faster receiving, fewer errors, real-time inventory accuracy.
  - Stealable workflow (2–5 steps):
    - 1) Open transfer receiving task on mobile.
    - 2) Scan barcode to increment received qty.
    - 3) Resolve mismatches and finalize receipt.
  - Thin slice (1–3 days): camera barcode scan + match SKU + increment counts + finalize transfer (online only).
  - Evidence: Shopify POS receiving transfers is scan-driven and supports partial receiving. (S95, S94)

- **Feature:** Offline-first scanning (queue scans and sync later)
  - What it is: allow scanning and capturing actions offline, queueing changes for sync when connectivity returns.
  - Why merchant admin cares: warehouses often have dead zones; prevents lost work and delays.
  - Stealable workflow:
    - 1) Cache transfer items and expected quantities locally.
    - 2) Store scan events and local counts.
    - 3) Sync to server when online; reconcile conflicts.
  - Thin slice (1–3 days): local queue + “sync now” button + simple conflict rule (server wins).
  - Evidence: Expo offline support and local storage patterns exist for offline persistence. (S98, S99)

- **Feature:** Inventory cycle count (scan and count) workflow
  - What it is: scan items in a location and record counted quantities to reconcile inventory.
  - Why merchant admin cares: improves inventory accuracy; reduces stockouts and oversell.
  - Stealable workflow:
    - 1) Start cycle count session for a location.
    - 2) Scan SKUs and enter counts.
    - 3) Submit adjustments and log reason codes.
  - Thin slice (1–3 days): cycle count session + scan-to-add SKU + count entry + submit adjustments.
  - Evidence: Mobile scanning workflows are foundational in POS/warehouse operations. (S94, S95)

- **Feature:** Pick/pack checklist (mobile picking)
  - What it is: mobile picking UI for fulfillment: list items, scan to confirm, mark packed.
  - Why merchant admin cares: reduces wrong shipments; increases throughput; supports new hires.
  - Stealable workflow:
    - 1) Assign pick list to worker.
    - 2) Scan items to confirm.
    - 3) Mark packed and ready to ship.
  - Thin slice (1–3 days): pick list view + scan-to-confirm + packed toggle + basic error prompt.
  - Evidence: Barcode scanning hardware and workflows are common in retail ops. (S94)

- **Feature:** Push alerts for exceptions (shipping exception, SLA breach, low stock)
  - What it is: notify staff via push when key events happen; includes deep links to tasks.
  - Why merchant admin cares: reduces response times; prevents missed SLAs and operational issues.
  - Stealable workflow:
    - 1) Server detects event (exception/breach).
    - 2) Sends push notification to assigned role/team.
    - 3) User taps to open ticket/order/task.
  - Thin slice (1–3 days): push for 2 events + role-based targeting + deep link.
  - Evidence: Push notification delivery patterns exist (FCM) and OS notification frameworks support alerting. (S97, S96)

- **Feature:** Mobile task inbox (assignments + due dates + filters)
  - What it is: a mobile queue of tasks for warehouse/support ops with due dates and status.
  - Why merchant admin cares: keeps frontline execution organized; reduces missed work.
  - Stealable workflow:
    - 1) User opens “My tasks”.
    - 2) Filters by type (receive, pick, exception).
    - 3) Completes task with notes/photo.
  - Thin slice (1–3 days): task list + status transitions + notes; no complex assignment.
  - Evidence: Queue-based ops patterns exist; mobile UI makes them executable on the floor. (S36, S95)

- **Feature:** Photo capture for receiving/damage evidence
  - What it is: capture photos for damaged items or discrepancies during receiving.
  - Why merchant admin cares: supports vendor claims and internal accountability; reduces disputes.
  - Stealable workflow:
    - 1) Mark discrepancy/damage.
    - 2) Capture photo and attach to record.
    - 3) Sync photo and show in admin.
  - Thin slice (1–3 days): photo capture + upload + attachment viewer.
  - Evidence: Discrepancy handling and evidence capture are common ops needs; mobile enables capture at source. (S66, S95)

- **Feature:** Offline attachment queue (upload photos later)
  - What it is: store photos locally and upload when back online.
  - Why merchant admin cares: warehouses with poor connectivity still need evidence capture.
  - Stealable workflow:
    - 1) Capture photo offline.
    - 2) Store locally with task reference.
    - 3) Upload when connectivity returns and confirm success.
  - Thin slice (1–3 days): local storage queue + upload retries + failure indicator.
  - Evidence: Offline support patterns recommend local persistence and queued uploads. (S98, S99)

- **Feature:** Device and scanner compatibility matrix
  - What it is: list supported devices/scanners and recommended configurations for operations.
  - Why merchant admin cares: reduces rollout friction; fewer support issues during deployment.
  - Stealable workflow:
    - 1) Admin views supported devices.
    - 2) Choose scanning mode (camera vs external scanner).
    - 3) Test scan in-app.
  - Thin slice (1–3 days): “test scanner” screen + supported devices list (doc-only).
  - Evidence: Shopify documents barcode scanner hardware requirements. (S94)

#### Approvals & tasks (Tranche #15 — 2025-12-29)

- **Feature:** Unified task object (assignee, due date, status, priority)
  - What it is: a task/work item record with owner, due date, status transitions, and comments.
  - Why merchant admin cares: centralizes ops work; prevents “lost in Slack” tasks; supports accountability.
  - Stealable workflow (2–5 steps):
    - 1) Create task from an order/return/ticket.
    - 2) Assign owner and due date.
    - 3) Track progress until done with notes.
  - Thin slice (1–3 days): task CRUD + 4 statuses (open/in_progress/blocked/done) + assignee + due date.
  - Evidence: Task models consistently include assignee, due date, and status. (S101, S104)

- **Feature:** Task views (My tasks, Unassigned, Due today, Overdue)
  - What it is: saved task lists that drive daily execution.
  - Why merchant admin cares: helps teams focus; reduces missed SLAs; supports managers.
  - Stealable workflow:
    - 1) Open task view.
    - 2) Sort by due date/priority.
    - 3) Work tasks in order.
  - Thin slice (1–3 days): 4 default views + filters + search.
  - Evidence: Work item systems and inbox patterns rely on views/filters. (S104, S36)

- **Feature:** Task templates (playbook steps)
  - What it is: reusable templates for common workflows (lost shipment, partial receiving discrepancy, chargeback evidence).
  - Why merchant admin cares: standardizes ops; faster onboarding; fewer mistakes.
  - Stealable workflow:
    - 1) Create template with step checklist.
    - 2) Instantiate template into tasks.
    - 3) Track checklist completion.
  - Thin slice (1–3 days): checklist steps + template library + “create from template”.
  - Evidence: Workflows are state machines with steps and transitions; playbooks benefit from templates. (S102)

- **Feature:** Contextual task creation (from order/return/shipment/dispute)
  - What it is: create tasks prefilled with context from the object that triggered it.
  - Why merchant admin cares: reduces context switching; ensures correct data captured for follow-up.
  - Stealable workflow:
    - 1) Click “create task” on an order/dispute.
    - 2) Auto-fill title, links, and key fields.
    - 3) Assign and set due date.
  - Thin slice (1–3 days): “create task” button on 2 entities + deep link back + auto-tags.
  - Evidence: Issue/work item models attach labels and link back to context. (S104)

- **Feature:** Approval request object (pending approval with approver + reason)
  - What it is: a record representing a request that requires approval (refund, reship, PO > $X, role change).
  - Why merchant admin cares: reduces mistakes and fraud; supports compliance; enables two-person control.
  - Stealable workflow:
    - 1) Create approval request from action.
    - 2) Approver reviews context and approves/denies.
    - 3) Action executes and is logged.
  - Thin slice (1–3 days): approvals for 3 actions + approve/deny with reason + audit log.
  - Evidence: Workflow builders often include approval routing; workflows as state machines support approval transitions. (S105, S102)

- **Feature:** Approval inbox (pending approvals queue)
  - What it is: list of approvals awaiting action, with due dates and reminders.
  - Why merchant admin cares: prevents bottlenecks; ensures urgent actions get approved quickly.
  - Stealable workflow:
    - 1) Approver opens “Pending approvals”.
    - 2) Reviews top items.
    - 3) Approves/denies and adds note.
  - Thin slice (1–3 days): approval queue + filters + reminders (email/push).
  - Evidence: Queue-driven workflows and SLAs apply to approvals as well. (S36, S35)

- **Feature:** Approve/deny from notifications (email or chat)
  - What it is: allow approvals via deep links in email or messaging tools.
  - Why merchant admin cares: speeds decisions; reduces context switching.
  - Stealable workflow:
    - 1) Approval request triggers notification.
    - 2) Approver clicks approve/deny link.
    - 3) System records decision and executes action.
  - Thin slice (1–3 days): email approve/deny deep links with authentication gate.
  - Evidence: Workflow builders route approvals via messaging and links. (S105)

- **Feature:** Escalations and reminders (overdue tasks/approvals)
  - What it is: notify managers when tasks/approvals are overdue or blocked.
  - Why merchant admin cares: keeps ops moving; prevents missed SLAs and customer churn.
  - Stealable workflow:
    - 1) Detect overdue items.
    - 2) Notify owner and manager.
    - 3) Escalate priority and reassign if needed.
  - Thin slice (1–3 days): overdue badge + reminder email + manager notification after N hours.
  - Evidence: SLA and workflow concepts include time-based escalation mechanics. (S35, S102)

- **Feature:** Audit trail for tasks and approvals
  - What it is: record who created/changed/completed tasks and approvals, with timestamps.
  - Why merchant admin cares: accountability; debugging; compliance for sensitive actions.
  - Stealable workflow:
    - 1) Log task/approval state changes.
    - 2) Show history on the record.
    - 3) Export for audits.
  - Thin slice (1–3 days): append-only event list per task/approval + basic filters.
  - Evidence: Audit log event modeling patterns exist and are standard. (S65, S104)

- **Feature:** Kanban board (optional) for ops teams
  - What it is: visual board for task statuses (To do / Doing / Done), optionally by team.
  - Why merchant admin cares: simple at-a-glance progress; supports daily standups.
  - Stealable workflow:
    - 1) Drag task between columns.
    - 2) Update status automatically.
    - 3) Filter by team/priority.
  - Thin slice (1–3 days): 3-column board + drag/drop + persistence.
  - Evidence: Project boards are a common task management surface in OSS (Focalboard) and issue trackers. (S104)

#### Localization (multi-currency, translations, time zones) (Tranche #16 — 2025-12-29)

- **Feature:** Locale preferences (language, currency, time zone) per tenant
  - What it is: store default locale settings per merchant/tenant (e.g., en-US, USD, America/New_York).
  - Why merchant admin cares: consistent customer comms and admin UX; reduces manual conversions.
  - Stealable workflow (2–5 steps):
    - 1) Admin sets default language, currency, time zone.
    - 2) UI formats dates/numbers using defaults.
    - 3) Exports and emails use consistent formats.
  - Thin slice (1–3 days): settings screen + apply to date/time formatting in 3 screens.
  - Evidence: Locale formats are standardized (CLDR/ICU). (S108, S109)

- **Feature:** Multi-currency display (show customer currency vs base currency)
  - What it is: display amounts in shopper currency and optionally show base currency for ops.
  - Why merchant admin cares: international selling; reduces confusion in support and finance reconciliation.
  - Stealable workflow:
    - 1) Choose base currency.
    - 2) Enable customer-facing currency selection.
    - 3) Show “converted amount” with rate source and timestamp.
  - Thin slice (1–3 days): display-only currency conversion with one FX rate source and “last updated” label.
  - Evidence: Multi-currency is a productized ecommerce feature (Shopify Payments). (S106)

- **Feature:** Market/region configuration (currency + language per market)
  - What it is: configure “markets” with specific currencies, languages, and content rules (US vs EU store).
  - Why merchant admin cares: reduces operational overhead for internationalization; consistent storefront behavior.
  - Stealable workflow:
    - 1) Define markets (regions/countries).
    - 2) Set currency and languages per market.
    - 3) Preview storefront behavior by market.
  - Thin slice (1–3 days): 2 markets + currency + language selection + preview banner.
  - Evidence: Markets/international selling is a common ecommerce admin concept. (S107)

- **Feature:** Currency formatting and rounding rules (per currency)
  - What it is: ensure correct decimals and rounding per currency (JPY 0 decimals, etc.).
  - Why merchant admin cares: prevents rounding disputes; correct invoicing; avoids support tickets.
  - Stealable workflow:
    - 1) Store currency metadata (minor units).
    - 2) Format with locale rules.
    - 3) Apply rounding strategy consistently.
  - Thin slice (1–3 days): integer money model + rounding strategy + format function used across UI.
  - Evidence: CLDR/ICU define locale/currency formatting; money libs emphasize rounding correctness. (S108, S109, S112)

- **Feature:** FX rate management (source, refresh schedule, manual override)
  - What it is: choose FX rate provider, refresh schedule, and allow manual override in emergencies.
  - Why merchant admin cares: reduces financial risk; explains pricing differences; supports audits.
  - Stealable workflow:
    - 1) Configure FX provider and refresh cadence.
    - 2) Store rates with timestamps.
    - 3) Allow manual override with audit log.
  - Thin slice (1–3 days): daily refresh + manual override + audit log entry.
  - Evidence: Multi-currency requires conversion and transparent display policies. (S106)

- **Feature:** Price lists (per market pricing overrides)
  - What it is: allow per-market price overrides rather than pure conversion (EU price ≠ USD price * FX).
  - Why merchant admin cares: localized pricing strategy; margin control; competitive pricing.
  - Stealable workflow:
    - 1) Set base price.
    - 2) Override per market/currency.
    - 3) Preview and publish.
  - Thin slice (1–3 days): price override table for top 50 SKUs in one market.
  - Evidence: Market-specific selling implies market-specific pricing configuration surfaces. (S107, S106)

- **Feature:** Translation management (UI strings and content)
  - What it is: manage translations for customer-facing messages and admin UI copy (where applicable).
  - Why merchant admin cares: reduces support issues for non-English customers; expands market reach.
  - Stealable workflow:
    - 1) Add supported languages.
    - 2) Translate key strings (emails, status pages).
    - 3) Preview by language.
  - Thin slice (1–3 days): translate 20 strings for one additional language + preview switcher.
  - Evidence: Translation runtimes and message formatting systems exist. (S110, S111)

- **Feature:** Pluralization and grammar-safe messaging
  - What it is: ensure messages handle plural rules correctly per language (1 item vs 2 items).
  - Why merchant admin cares: avoids unprofessional comms; reduces confusion and improves trust.
  - Stealable workflow:
    - 1) Use ICU message format for strings.
    - 2) Provide translation editor for plural forms.
    - 3) Validate at build-time/runtime.
  - Thin slice (1–3 days): pluralization for 10 strings + validation errors list.
  - Evidence: ICU/FormatJS support plural rules and message formatting. (S109, S110)

- **Feature:** Language detection and fallback chain
  - What it is: detect language from browser/account settings and fall back predictably (fr-CA → fr → en).
  - Why merchant admin cares: improves customer experience; reduces partial translations and weird mixed-language UIs.
  - Stealable workflow:
    - 1) Detect preferred language.
    - 2) Select best available translation.
    - 3) Log missing keys for follow-up.
  - Thin slice (1–3 days): browser language detection + fallback chain + missing keys report.
  - Evidence: i18next documents language detection and namespaces as core concepts. (S111)

- **Feature:** Time zone aware scheduling (jobs and notifications)
  - What it is: schedule tasks/emails at local business hours per tenant and display times correctly.
  - Why merchant admin cares: prevents “sent at 3am” incidents; reduces confusion across global teams.
  - Stealable workflow:
    - 1) Tenant sets default time zone.
    - 2) Scheduler runs jobs in tenant local time.
    - 3) UI displays timestamps localized.
  - Thin slice (1–3 days): show all timestamps in tenant TZ + schedule one daily digest at 9am local.
  - Evidence: ICU provides locale-aware date/time formatting concepts. (S109)

- **Feature:** Localized exports (CSV date/number formats, separators)
  - What it is: export CSVs with locale-specific formats (decimal separators, date formats) or allow choosing a stable export format.
  - Why merchant admin cares: reduces spreadsheet errors; supports regional finance workflows.
  - Stealable workflow:
    - 1) Choose export locale (or default).
    - 2) Generate CSV with chosen formatting.
    - 3) Provide “raw ISO” option for interoperability.
  - Thin slice (1–3 days): export with ISO dates + optional locale formatting toggle.
  - Evidence: Locale formatting should follow CLDR/ICU rather than custom formatting. (S108, S109)

- **Feature:** FX rate snapshot per order/refund (auditability)
  - What it is: store the FX rate and conversion metadata used at the time of purchase/refund (so the numbers don’t drift later).
  - Why merchant admin cares: finance reconciliation; reduces disputes (“why is it different now?”); supports audit trails.
  - Stealable workflow:
    - 1) On checkout/payment capture, store (base_amount, charged_amount, fx_rate, fx_timestamp, provider).
    - 2) On refunds, store refund currency + FX snapshot used (or link to original).
    - 3) Display “rate used” in admin order timeline.
  - Thin slice (1–3 days): persist FX snapshot + show in order detail panel.
  - Evidence: Multi-currency selling requires explicit conversion and presentation rules; money libs emphasize correctness. (S106, S112)

- **Feature:** Currency conversion policy (rate lock window + rounding strategy)
  - What it is: configurable policy for when you lock rates (cart vs checkout vs capture), and how to round across currencies.
  - Why merchant admin cares: prevents margin leakage; avoids customer confusion; reduces reconciliation support load.
  - Stealable workflow:
    - 1) Admin picks rate lock timing (e.g., lock at checkout for 15 minutes).
    - 2) Admin picks rounding mode (bankers/up/down) per currency.
    - 3) Admin sees preview examples for a few amounts.
  - Thin slice (1–3 days): “rate lock at checkout” + default rounding per currency + preview calculator.
  - Evidence: Multi-currency conversion is a first-class ecommerce capability and requires transparent rules. (S106, S108, S112)

- **Feature:** Locale-aware numeric input parsing (decimal separators)
  - What it is: accept and correctly parse numeric input using locale rules (e.g., `1.234,56` vs `1,234.56`) for admin price/quantity fields.
  - Why merchant admin cares: prevents pricing mistakes; reduces ops errors in international teams.
  - Stealable workflow:
    - 1) Detect admin locale (or allow override).
    - 2) Parse typed input according to locale separators.
    - 3) Store as canonical numeric/money type and re-render formatted.
  - Thin slice (1–3 days): locale-aware parsing for 3 numeric inputs (price, discount amount, tax rate) with validation errors.
  - Evidence: Locale formats and number/currency rules come from CLDR/ICU standards. (S108, S109)

- **Feature:** Translation key QA (missing keys dashboard + extraction pipeline)
  - What it is: detect missing translations at runtime and provide a workflow to fix them (plus optional extraction of messages for translation).
  - Why merchant admin cares: prevents broken/mixed-language UX; keeps localization complete as the product evolves.
  - Stealable workflow:
    - 1) Runtime logs missing translation keys + locale + screen.
    - 2) Admin/dev views “missing keys” table and exports it.
    - 3) Upload completed translations and deploy (or import into translation store).
  - Thin slice (1–3 days): missing keys report + CSV export + manual JSON import for one locale.
  - Evidence: Translation runtimes support missing-key handling, namespaces, and message formatting patterns. (S110, S111)

- **Feature:** Timezone-aware reporting windows (day/week boundaries)
  - What it is: reports and aggregations respect tenant time zones (e.g., “today” in Sydney is not “today” in UTC).
  - Why merchant admin cares: correct daily revenue/ops metrics; fewer “numbers don’t match” escalations.
  - Stealable workflow:
    - 1) Tenant sets default time zone.
    - 2) Reports group events by tenant-local day/week.
    - 3) UI clearly labels timezone and provides UTC toggle.
  - Thin slice (1–3 days): apply tenant TZ grouping to 2 reports (orders per day, refunds per day).
  - Evidence: ICU provides locale-aware date/time formatting concepts used by localization systems. (S109)

#### Observability (logs, tracing, alerts, SLOs) (Tranche #17 — 2025-12-29)

- **Feature:** Standardized observability event context (trace_id, request_id, user_id, order_id)
  - What it is: a consistent “context envelope” attached to logs/traces/metrics so operators can correlate across systems.
  - Why merchant admin cares: faster root-cause analysis for checkout failures, webhook issues, and ops automation regressions.
  - Stealable workflow:
    - 1) Define required context fields (trace_id/request_id + tenant + entity IDs).
    - 2) Instrument API gateway / middleware to populate context.
    - 3) Ensure downstream services propagate context.
  - Thin slice (1–3 days): add request_id + tenant_id + order_id to logs in 2 services and ensure they show up in search.
  - Evidence: OpenTelemetry standardizes telemetry and correlation concepts. (S113)

- **Feature:** Log ingestion + retention policy controls
  - What it is: ship application logs into a central store with retention and size controls per environment.
  - Why merchant admin cares: debugging without SSH; cost control; compliance alignment for ops data.
  - Stealable workflow:
    - 1) Configure log receiver/collector.
    - 2) Set retention window and size limits.
    - 3) Provide export for investigations.
  - Thin slice (1–3 days): ingest JSON logs from one service and retain 7 days.
  - Evidence: Log aggregation systems define ingestion/query patterns for ops workflows. (S117, S113)

- **Feature:** Structured log search (filters + labels) with saved queries
  - What it is: log explorer UI that supports label filters, free-text search, and saved searches for recurring investigations.
  - Why merchant admin cares: reduces time-to-diagnose; creates shareable “playbook queries” for on-call.
  - Stealable workflow:
    - 1) Filter logs by service, env, severity, tenant.
    - 2) Search for keywords/error codes.
    - 3) Save query and share link.
  - Thin slice (1–3 days): saved searches + pinned filters for `service`, `env`, `severity`.
  - Evidence: Loki docs emphasize label-based log querying and exploration. (S117)

- **Feature:** Trace explorer (search by trace_id / request_id)
  - What it is: UI to look up a distributed trace and see span tree + timing breakdown.
  - Why merchant admin cares: pinpoint slowdowns and failures across payment/shipping/returns integrations.
  - Stealable workflow:
    - 1) Paste trace_id/request_id into search.
    - 2) View span waterfall + critical path.
    - 3) Jump from error span to related logs.
  - Thin slice (1–3 days): trace lookup + span list + duration chart for a single service.
  - Evidence: Tracing UIs standardize on trace/spans as core interaction. (S119, S113)

- **Feature:** Service dependency map (edges derived from traces)
  - What it is: graph of services and call relationships, with latency/error overlays.
  - Why merchant admin cares: fast impact analysis during incidents; helps new operators understand system topology.
  - Stealable workflow:
    - 1) Build service graph from span parent/child relationships.
    - 2) Compute p95 latency + error rate per edge.
    - 3) Click edge to open traces/logs.
  - Thin slice (1–3 days): generate a static dependency list + click-through to service view.
  - Evidence: Tracing systems describe service dependencies and trace visualization. (S119, S113)

- **Feature:** Semantic attributes standard (consistent naming for queryability)
  - What it is: a schema/registry for telemetry fields so filters work reliably (e.g., `http.method`, `http.route`, `tenant.id`).
  - Why merchant admin cares: prevents “every team logs differently”; makes saved searches portable.
  - Stealable workflow:
    - 1) Define required attributes and types.
    - 2) Validate instrumentation emits required attributes.
    - 3) Publish docs and lint checks.
  - Thin slice (1–3 days): define 20 required attributes + add a lint check for one service.
  - Evidence: OpenTelemetry publishes semantic conventions for attribute naming. (S114)

- **Feature:** Golden-signal dashboards (latency, traffic, errors, saturation)
  - What it is: standardized metrics dashboards per service (and per critical workflow).
  - Why merchant admin cares: faster detection and triage; makes ops health legible for non-engineers.
  - Stealable workflow:
    - 1) Define key metrics per service.
    - 2) Publish a default dashboard template.
    - 3) Allow per-tenant or per-env filters.
  - Thin slice (1–3 days): dashboard for one API (requests/min, error rate, p95 latency).
  - Evidence: Prometheus establishes the dominant metrics + querying mental model. (S115)

- **Feature:** Alert rules builder (threshold + rate-of-change)
  - What it is: alert configuration UI for defining conditions on metrics (e.g., error rate > 2% for 5 min).
  - Why merchant admin cares: catch failures before customers do; codifies operational guardrails.
  - Stealable workflow:
    - 1) Pick metric and scope (service/env).
    - 2) Choose condition + window.
    - 3) Test against recent data and save.
  - Thin slice (1–3 days): threshold alerts on 3 metrics with a “preview last 24h” chart.
  - Evidence: Metrics alerting is a first-class workflow in Prometheus ecosystem. (S115, S116)

- **Feature:** Alert routing policies (team ownership + severity)
  - What it is: route alerts to teams/channels based on labels (service, env, severity) and group related alerts.
  - Why merchant admin cares: reduces alert fatigue; ensures the right operator sees the right alert.
  - Stealable workflow:
    - 1) Define routing rules (matchers on labels).
    - 2) Group by keys (service/env).
    - 3) Send to email/Slack/Pager integration.
  - Thin slice (1–3 days): route `severity=critical` to on-call channel; others to email digest.
  - Evidence: Alertmanager documents routing and grouping as core features. (S116)

- **Feature:** Silences + maintenance windows
  - What it is: temporary suppression of alert notifications during deployments or planned maintenance.
  - Why merchant admin cares: prevents noise; avoids missed real issues due to alert fatigue.
  - Stealable workflow:
    - 1) Create silence (match service/env).
    - 2) Set duration and reason.
    - 3) Show active silences on alerts list.
  - Thin slice (1–3 days): silence CRUD + “mute for 1h” button on alert detail.
  - Evidence: Alertmanager includes silencing as a core operational control. (S116)

- **Feature:** Incident object (status + timeline + impacted services)
  - What it is: a structured incident record that aggregates alerts, notes, and impacted workflows.
  - Why merchant admin cares: makes response coordinated; supports post-incident analysis; reduces repeated work.
  - Stealable workflow:
    - 1) Create incident from an alert.
    - 2) Add timeline updates and impacted services.
    - 3) Close incident with resolution summary.
  - Thin slice (1–3 days): incident CRUD + timeline notes + link to top 3 related dashboards.
  - Evidence: Incident management lifecycle is standardized across ops tooling. (S122)

- **Feature:** Incident comms templates (status updates + internal notes)
  - What it is: pre-baked updates for internal stakeholders and customer support (what’s impacted, ETA, workaround).
  - Why merchant admin cares: reduces chaos; keeps support aligned; improves customer trust.
  - Stealable workflow:
    - 1) Choose incident type template.
    - 2) Fill impact + ETA fields.
    - 3) Post to internal channel and store in incident.
  - Thin slice (1–3 days): 3 templates + “copy to clipboard” + auto-link to incident.
  - Evidence: Incident workflows emphasize consistent communication and timeline. (S122)

- **Feature:** Postmortem template + action items
  - What it is: guided write-up format with root cause, contributing factors, and tracked follow-ups.
  - Why merchant admin cares: prevents repeat incidents; creates durable improvements; makes ops learning systematic.
  - Stealable workflow:
    - 1) Generate postmortem doc from incident.
    - 2) Fill sections and attach graphs/log links.
    - 3) Create action items and assign owners.
  - Thin slice (1–3 days): postmortem markdown template + action item list (links to tasks).
  - Evidence: Incident lifecycle includes post-incident review as a core phase. (S122)

- **Feature:** SLO builder (target + window + indicator)
  - What it is: define SLOs like “99.9% successful checkouts over 30 days” and compute compliance.
  - Why merchant admin cares: aligns ops priorities; prevents over-reacting to noise; makes reliability measurable.
  - Stealable workflow:
    - 1) Define indicator (success rate/latency threshold).
    - 2) Choose target and rolling window.
    - 3) Display current compliance and history.
  - Thin slice (1–3 days): 1 SLO definition + compliance widget on dashboard.
  - Evidence: SLOs are formalized as targets and tracked over windows. (S121)

- **Feature:** Error budget + burn-rate alerts (SLO-driven alerting)
  - What it is: translate SLO compliance into an error budget and alert when you’re burning it too fast.
  - Why merchant admin cares: ties alerts to business goals; reduces noise from non-impactful spikes.
  - Stealable workflow:
    - 1) Compute remaining error budget.
    - 2) Calculate burn rate over short + long windows.
    - 3) Alert on sustained budget burn.
  - Thin slice (1–3 days): burn-rate computation for one SLO + alert threshold UI.
  - Evidence: SLO tooling commonly uses error budgets and burn-rate framing. (S121)

- **Feature:** Release markers (deploy annotations) on charts and incidents
  - What it is: annotate dashboards and incident timeline with deployments/releases so operators can correlate regressions.
  - Why merchant admin cares: faster “did we break it?” answer; reduces time spent bisecting changes.
  - Stealable workflow:
    - 1) Ingest deploy events (manual or webhook).
    - 2) Overlay releases on charts.
    - 3) Link release to traces/log spikes.
  - Thin slice (1–3 days): manual “create release marker” + overlay on one dashboard.
  - Evidence: Error tracking and observability tools commonly tie issues to releases. (S120)

- **Feature:** Error tracking inbox (grouping + assignment)
  - What it is: aggregated exception/issues list with grouping, frequency, and ownership.
  - Why merchant admin cares: turns raw crashes into an actionable queue; supports triage discipline.
  - Stealable workflow:
    - 1) Group errors by fingerprint (stack trace signature).
    - 2) Assign owner and severity.
    - 3) Link to related traces/logs.
  - Thin slice (1–3 days): error list + group-by stack trace + assign to teammate.
  - Evidence: Sentry docs cover error tracking workflows and issue grouping patterns. (S120)

- **Feature:** PII redaction and allowlist for telemetry
  - What it is: prevent sensitive fields (emails, addresses, tokens) from landing in logs/traces by default.
  - Why merchant admin cares: compliance risk reduction; safer debugging; less need for emergency log purges.
  - Stealable workflow:
    - 1) Define redaction rules (field names + regex).
    - 2) Apply at collector/ingest layer.
    - 3) Provide audit/preview of redactions.
  - Thin slice (1–3 days): redact 5 common fields (email, phone, auth token, address, card last4) in logs.
  - Evidence: Centralized collection pipelines support processing and standardization of telemetry. (S113, S117)

- **Feature:** Sampling controls for logs/traces (cost + noise control)
  - What it is: configure sampling rates by service/endpoint or only sample errors/slow requests.
  - Why merchant admin cares: manages storage costs; keeps signal-to-noise high; avoids overwhelming operators.
  - Stealable workflow:
    - 1) Define sampling policy (head/tail, errors-only, latency-based).
    - 2) Apply policy in collector/SDK.
    - 3) Show “effective sample rate” in UI.
  - Thin slice (1–3 days): sample 10% of non-error traces; 100% of error traces.
  - Evidence: OpenTelemetry supports configurable pipelines and tracing stores emphasize cost controls. (S113, S118)

- **Feature:** Operational runbooks linked to alerts/incidents
  - What it is: attach a “what to do” checklist and links to dashboards/log queries per alert type.
  - Why merchant admin cares: reduces tribal knowledge; speeds up new on-call; standardizes response quality.
  - Stealable workflow:
    - 1) Add runbook URL + steps to alert definition.
    - 2) Surface runbook on alert and incident views.
    - 3) Track which runbook steps were used.
  - Thin slice (1–3 days): runbook URL field + “open runbook” button + notes section.
  - Evidence: Incident workflows and alert routing emphasize repeatable response playbooks. (S122, S116)

- **Feature:** Synthetic uptime checks for critical endpoints (optional)
  - What it is: periodic checks of critical APIs (checkout, admin login, webhook endpoint) with latency tracking.
  - Why merchant admin cares: detects outages even when internal metrics are stale; validates the “customer view”.
  - Stealable workflow:
    - 1) Configure endpoint + expected status.
    - 2) Run check on schedule.
    - 3) Alert on failures and attach to incident.
  - Thin slice (1–3 days): 1 uptime check + alert + chart of last 24h latency.
  - Evidence: Monitoring stacks center on measuring availability/latency and alerting. (S115, S121)

#### Admin IA (navigation, search, saved views, shortcuts) (Tranche #18 — 2025-12-29)

- **Feature:** Global admin search (products/orders/customers/returns)
  - What it is: one search box that spans the core entities and returns ranked results with type grouping.
  - Why merchant admin cares: reduces navigation time; makes ops work “lookup-first” instead of click-through.
  - Stealable workflow:
    - 1) Type query in global search.
    - 2) Scope to entity type (Orders, Customers, Products).
    - 3) Open result in new tab or detail drawer.
  - Thin slice (1–3 days): search across 2 entities (orders + customers) with a single “type” filter.
  - Evidence: Global search is a standard workspace pattern; ecommerce admin search exists but may block automated access. (S124, S128)

- **Feature:** Command palette (⌘K) for navigation + actions
  - What it is: keyboard-first launcher for “go to X” and “do X” (e.g., create return, refund order, open settings).
  - Why merchant admin cares: power users move faster; reduces reliance on deep navigation trees.
  - Stealable workflow:
    - 1) Press ⌘K.
    - 2) Type “refund” or “orders” and pick result.
    - 3) Execute action or navigate.
  - Thin slice (1–3 days): command palette that supports navigation to 10 routes + fuzzy matching.
  - Evidence: Modern tools treat shortcuts and fast navigation as first-class UX. (S125, S129)

- **Feature:** Advanced search syntax (qualifiers / query language)
  - What it is: power-user search with query operators (e.g., `status:open`, `total>100`, `created:>=2025-12-01`).
  - Why merchant admin cares: eliminates dozens of UI filters; enables repeatable “saved filters” for ops.
  - Stealable workflow:
    - 1) Enter query in search bar.
    - 2) Validate and show parse errors.
    - 3) Convert to filters and run.
  - Thin slice (1–3 days): support 5 qualifiers on one list (orders) + inline query validation errors.
  - Evidence: JQL and GitHub search qualifiers illustrate scalable “power search” patterns. (S127, S128)

- **Feature:** Filter builder UI (for non-power users)
  - What it is: UI to build queries using dropdown fields/operators/values, backed by the same query engine.
  - Why merchant admin cares: accessible to non-technical staff; reduces mistakes vs free-text.
  - Stealable workflow:
    - 1) Add filter row (field/operator/value).
    - 2) Add second row and choose AND/OR.
    - 3) Run and save as view.
  - Thin slice (1–3 days): single “AND” filter builder for one resource list (orders).
  - Evidence: Saved views with filters/sorts are a common pattern for scalable admin UIs. (S123)

- **Feature:** Saved views (filters + sort + columns)
  - What it is: save list configuration (filters, sort, visible columns, density) as a named view for reuse.
  - Why merchant admin cares: reduces repeated setup work; enables team workflows (“Returns queue view”).
  - Stealable workflow:
    - 1) Configure filters/sort/columns.
    - 2) Click “Save view” and name it.
    - 3) Share or set as default.
  - Thin slice (1–3 days): save filters + sort only (no columns) for one list.
  - Evidence: Views + filters + sorts are productized in popular admin/workspace tools. (S123)

- **Feature:** Default view per user/team
  - What it is: users can set their default landing view (e.g., “My open tasks”, “Orders needing review”).
  - Why merchant admin cares: reduces clicks at start of shift; supports role-specific ops.
  - Stealable workflow:
    - 1) User selects a view.
    - 2) Click “Set as default”.
    - 3) App opens to that view next time.
  - Thin slice (1–3 days): default view preference per user for one page.
  - Evidence: Saved views enable personalized “starting points” in admin tools. (S123)

- **Feature:** Shareable deep links for views and searches
  - What it is: encode filters/sorts into URL so teams can share a link to the exact queue state.
  - Why merchant admin cares: faster collaboration; consistent triage during incidents or spikes.
  - Stealable workflow:
    - 1) Configure filters.
    - 2) Copy URL.
    - 3) Recipient opens same filtered list.
  - Thin slice (1–3 days): URL-encoded filters for one list + “copy link” button.
  - Evidence: Search and view state commonly supports scoping/sharing in large workspaces. (S124, S123)

- **Feature:** Recent items (history) + jump back
  - What it is: show “recently viewed” entities and allow quick return to last 10 items.
  - Why merchant admin cares: reduces re-searching; helps multitasking across tickets/orders/returns.
  - Stealable workflow:
    - 1) View an order.
    - 2) It appears in recent list.
    - 3) Reopen from recent items menu.
  - Thin slice (1–3 days): recent list for 2 entity types (orders + customers).
  - Evidence: Global search/navigation patterns are designed for large workspaces and frequent context switching. (S124, S126)

- **Feature:** Favorites / pinning (entities + pages)
  - What it is: pin frequently used pages or specific records (e.g., a VIP customer, a carrier dashboard link).
  - Why merchant admin cares: reduces navigation time; supports “operator quick access”.
  - Stealable workflow:
    - 1) Click star/pin on a page or record.
    - 2) It appears in a pinned list.
    - 3) Reorder pins.
  - Thin slice (1–3 days): pin pages (routes) only; no record pinning.
  - Evidence: Workspace navigation often supports quick-access surfaces alongside search. (S126, S124)

- **Feature:** Customizable sidebar nav (hide/reorder sections)
  - What it is: allow users/teams to hide unused modules and reorder nav sections.
  - Why merchant admin cares: reduces cognitive load; makes the admin feel tailored to the merchant’s ops.
  - Stealable workflow:
    - 1) Enter “Customize nav”.
    - 2) Toggle modules and reorder.
    - 3) Save preferences.
  - Thin slice (1–3 days): per-user nav reorder for 1 sidebar group.
  - Evidence: Large workspaces depend on navigation and scoping primitives to stay usable. (S124)

- **Feature:** Keyboard shortcuts for common ops actions (and a shortcuts modal)
  - What it is: shortcuts for create/search/navigate and a built-in “?” overlay listing them.
  - Why merchant admin cares: consistent speed-ups for daily work; reduces wrist/trackpad fatigue in ops roles.
  - Stealable workflow:
    - 1) Press “?” to open shortcuts overlay.
    - 2) Learn shortcut.
    - 3) Use it (e.g., `/` focuses search).
  - Thin slice (1–3 days): 8 shortcuts + modal overlay + focus search.
  - Evidence: Notion documents keyboard shortcuts as a first-class surface. (S125)

- **Feature:** Table personalization (columns, density, sticky columns)
  - What it is: per-list table settings like show/hide columns, compact density, and sticky key columns.
  - Why merchant admin cares: operators need “queue-specific” columns; reduces horizontal scrolling and mistakes.
  - Stealable workflow:
    - 1) Open “Columns” menu.
    - 2) Toggle columns + reorder.
    - 3) Persist per view.
  - Thin slice (1–3 days): column visibility toggles + persistence for one list.
  - Evidence: Views/filters/sorts patterns imply persistent configuration of how lists are displayed. (S123)

- **Feature:** Bulk actions with selection persistence
  - What it is: select multiple rows and run actions (tag, assign, export, hold/unhold), preserving selection across pagination.
  - Why merchant admin cares: reduces repetitive work; makes queue triage efficient.
  - Stealable workflow:
    - 1) Select rows with checkboxes.
    - 2) Bulk action bar appears.
    - 3) Execute action and show per-row results.
  - Thin slice (1–3 days): bulk “tag” action with success/error summary.
  - Evidence: Operator workflows rely on list views as the core execution surface (filters/sorts + repeated actions). (S123)

- **Feature:** Inline entity preview drawer (open without leaving list)
  - What it is: open a side panel to preview an order/customer without navigating away from the queue.
  - Why merchant admin cares: faster triage; reduces loss of context; supports “scan the queue”.
  - Stealable workflow:
    - 1) Click row.
    - 2) Drawer opens with key fields.
    - 3) Take action or open full page.
  - Thin slice (1–3 days): drawer for one entity (order) with 8 fields + “open full” link.
  - Evidence: Search/navigation patterns emphasize quick context switching without losing state. (S124, S126)

- **Feature:** Universal “jump to” breadcrumbs + back stack
  - What it is: consistent breadcrumbs and a back-stack that respects “from list → detail → related detail”.
  - Why merchant admin cares: reduces getting lost; speeds up bouncing between related records.
  - Stealable workflow:
    - 1) Navigate from list to detail.
    - 2) Click related entity (customer).
    - 3) Use breadcrumbs/back-stack to return.
  - Thin slice (1–3 days): breadcrumbs for 2-level hierarchy + “back to results” link.
  - Evidence: Global search and navigation scaling patterns require clear wayfinding. (S124)

- **Feature:** Workspace switcher (multi-store / multi-tenant)
  - What it is: quick switch between stores/tenants with clear “you are in X store” context.
  - Why merchant admin cares: agencies and operators manage multiple stores; reduces cross-tenant mistakes.
  - Stealable workflow:
    - 1) Open switcher.
    - 2) Search tenant name.
    - 3) Switch and retain last visited page if allowed.
  - Thin slice (1–3 days): tenant switcher + persistent “current tenant” badge.
  - Evidence: Large workspaces use global search/scoping concepts to manage scale and context. (S124, S126)

- **Feature:** Permission-aware navigation (hide/disable inaccessible modules)
  - What it is: nav items and actions adapt to RBAC (hidden or disabled with “request access”).
  - Why merchant admin cares: reduces confusion; prevents support tickets; improves security posture.
  - Stealable workflow:
    - 1) User logs in.
    - 2) Nav items are filtered by role permissions.
    - 3) Disabled actions show reason/next step.
  - Thin slice (1–3 days): hide 3 modules based on role + show tooltip on disabled button.
  - Evidence: Saved views and navigation personalization are core admin IA primitives; permissions are a common constraint. (S123)

- **Feature:** Auditability for saved views and shared queues
  - What it is: track who created/edited shared views and when; record changes to avoid “mystery filter” incidents.
  - Why merchant admin cares: stable ops workflows; reduces accidental changes that break team queues.
  - Stealable workflow:
    - 1) Edit shared view.
    - 2) System records change summary.
    - 3) View “history” and revert.
  - Thin slice (1–3 days): view edit history list (no revert) for shared views.
  - Evidence: Shared views are a collaborative admin pattern and need governance as teams scale. (S123)

#### Data governance (data retention, exports, privacy requests) (Tranche #19 — 2025-12-29)

- **Feature:** Data retention policy registry (by data category)
  - What it is: define retention windows per data category (orders, tickets, logs, audit events, PII fields).
  - Why merchant admin cares: reduces legal risk; prevents runaway data storage; makes policies explicit.
  - Stealable workflow:
    - 1) Choose data category.
    - 2) Set retention duration and disposition (delete/anonymize/archive).
    - 3) Save and audit log change.
  - Thin slice (1–3 days): retention table for 5 categories + edit form + change history.
  - Evidence: Data governance is driven by legal/regulatory requirements and privacy frameworks. (S130, S134)

- **Feature:** Retention enforcement job (schedule + preview)
  - What it is: a scheduled job that applies retention rules, with a preview mode and run history.
  - Why merchant admin cares: automation reduces manual cleanup; prevents “we forgot” failures.
  - Stealable workflow:
    - 1) Run “preview” to see what would be deleted.
    - 2) Approve and execute.
    - 3) Review run results (counts, failures).
  - Thin slice (1–3 days): nightly run + run history table + basic error reporting.
  - Evidence: Lifecycle policies are a common retention mechanism pattern. (S135)

- **Feature:** Legal hold (preserve specific records)
  - What it is: mark a customer/order/case as “on legal hold” to prevent deletion/anonymization by retention jobs.
  - Why merchant admin cares: supports investigations and legal requirements; prevents accidental data loss.
  - Stealable workflow:
    - 1) Create legal hold with reason + scope.
    - 2) Hold blocks retention actions.
    - 3) Release hold and record audit.
  - Thin slice (1–3 days): legal hold flag + “blocked by hold” messaging in retention preview.
  - Evidence: Immutability / legal hold concepts exist in storage governance patterns. (S136)

- **Feature:** Privacy request inbox (DSAR intake: access/delete/opt-out)
  - What it is: a queue for privacy requests with status, SLA, and required steps.
  - Why merchant admin cares: timely compliance response; centralized tracking; reduces missed requests.
  - Stealable workflow:
    - 1) Request is created (API/form/email manually logged).
    - 2) Assign owner and due date.
    - 3) Complete steps and mark fulfilled.
  - Thin slice (1–3 days): request record + statuses (new/in-progress/fulfilled/denied) + due date.
  - Evidence: Access and erasure rights are core drivers for DSAR workflows. (S131, S132, S130)

- **Feature:** Identity verification checklist for privacy requests
  - What it is: a structured checklist to verify requester identity (to prevent data leaks).
  - Why merchant admin cares: avoids disclosure to the wrong person; reduces fraud risk.
  - Stealable workflow:
    - 1) Select verification method (email link, order number, ID upload).
    - 2) Mark verification status.
    - 3) Block export until verified.
  - Thin slice (1–3 days): “verified” gate + notes + attachment field (no automation).
  - Evidence: DSAR guidance emphasizes careful handling of personal data disclosures. (S131, S134)

- **Feature:** Data export pack generator (customer data portability)
  - What it is: generate a ZIP/JSON bundle of all data linked to a customer (orders, returns, tickets, addresses).
  - Why merchant admin cares: compliance; reduces ad-hoc engineering requests; improves customer trust.
  - Stealable workflow:
    - 1) Select subject (customer ID/email).
    - 2) Generate export pack asynchronously.
    - 3) Provide secure download link with expiry.
  - Thin slice (1–3 days): export 3 tables (customer + orders + returns) to JSON + download link.
  - Evidence: Access rights and governance frameworks motivate systematic export workflows. (S130, S131, S134)

- **Feature:** Secure delivery (expiring links + access logging)
  - What it is: DSAR exports are delivered via expiring links and download events are logged.
  - Why merchant admin cares: reduces leakage; provides proof of fulfillment.
  - Stealable workflow:
    - 1) Generate signed URL with TTL.
    - 2) Log download event.
    - 3) Allow regeneration if expired.
  - Thin slice (1–3 days): expiring link + download log list.
  - Evidence: Audit logging (“who did what, when”) supports governance and investigations. (S137)

- **Feature:** Erasure mode selection (delete vs anonymize)
  - What it is: choose how to satisfy deletion requests depending on legal/accounting constraints (anonymize vs delete).
  - Why merchant admin cares: preserves required business records while reducing personal data footprint.
  - Stealable workflow:
    - 1) Choose erasure request.
    - 2) Select disposition (delete/anonymize) by category.
    - 3) Execute and record audit.
  - Thin slice (1–3 days): anonymize 5 PII fields on customer record + keep order totals.
  - Evidence: Erasure is a core privacy right and often requires nuanced handling. (S132, S130)

- **Feature:** Denial/restriction reason codes (when request cannot be fulfilled)
  - What it is: record structured reasons for denying or restricting a DSAR (with templated responses).
  - Why merchant admin cares: consistent compliance; reduces legal review time; improves audit readiness.
  - Stealable workflow:
    - 1) Select request.
    - 2) Choose reason code (fraud, legal obligation, unable to verify).
    - 3) Generate response template.
  - Thin slice (1–3 days): reason codes + templated response text + status “denied”.
  - Evidence: DSAR workflows require policy-driven handling and documentation. (S131, S134)

- **Feature:** Data inventory (where PII lives) + classification tags
  - What it is: maintain a catalog of data fields and classify which fields are PII/sensitive.
  - Why merchant admin cares: enables consistent redaction, export, and deletion; reduces unknown risk.
  - Stealable workflow:
    - 1) List data entities and fields.
    - 2) Tag fields (PII/sensitive).
    - 3) Use tags to drive export/redaction behavior.
  - Thin slice (1–3 days): field registry for 3 entities with PII flags and notes.
  - Evidence: Privacy frameworks emphasize inventories and governance as first-class controls. (S134, S130)

- **Feature:** PII redaction rules for exports and logs
  - What it is: centralized rules to redact or exclude fields from exports/logs by default.
  - Why merchant admin cares: reduces accidental leakage; supports least-privilege disclosures.
  - Stealable workflow:
    - 1) Define redaction rule (field name/regex).
    - 2) Apply in export pipeline.
    - 3) Preview redacted output.
  - Thin slice (1–3 days): redact 3 fields in export pack + show preview diff.
  - Evidence: Governance requires controlling what data is disclosed and logged. (S130, S134)

- **Feature:** Audit log for governance actions (policy changes + exports + erasures)
  - What it is: record every governance action with actor, timestamp, scope, and outcome.
  - Why merchant admin cares: audit readiness; incident response; reduces “who did this?” confusion.
  - Stealable workflow:
    - 1) Write audit event on each action.
    - 2) Provide filter/search in audit UI.
    - 3) Export audit events.
  - Thin slice (1–3 days): audit event table + filters (actor/action/date) + CSV export.
  - Evidence: Audit logging patterns are standardized in governance systems. (S137)

- **Feature:** Data export center (operational exports, not just DSAR)
  - What it is: admin UI for exporting operational datasets (orders, refunds, returns) with scoping and run history.
  - Why merchant admin cares: reduces ad-hoc data pulls; supports ops/finance workflows.
  - Stealable workflow:
    - 1) Choose dataset and filters.
    - 2) Start export job.
    - 3) Download result and view history.
  - Thin slice (1–3 days): one export job type (orders) with status + download link.
  - Evidence: Governance includes safe access and controlled exports. (S134, S130)

- **Feature:** Data deletion / purge jobs with dry-run
  - What it is: admin-controlled purge operations with dry-run and safety checks (role required).
  - Why merchant admin cares: prevents catastrophic deletes; supports retention enforcement safely.
  - Stealable workflow:
    - 1) Select scope and filters.
    - 2) Dry-run shows counts.
    - 3) Execute with confirmation and audit log.
  - Thin slice (1–3 days): dry-run + confirm for deleting a batch of test data.
  - Evidence: Lifecycle-based retention and auditability are core governance patterns. (S135, S137)

- **Feature:** Backup retention + restore access controls (high-level)
  - What it is: document and enforce backup retention windows and limit restore actions to privileged roles.
  - Why merchant admin cares: resilience without governance leakage; reduces abuse of “restore to get deleted data”.
  - Stealable workflow:
    - 1) Define backup retention window.
    - 2) Gate restore action behind admin approval.
    - 3) Log restore requests and outcomes.
  - Thin slice (1–3 days): “restore request” record + approval + audit log entry (no actual restore automation).
  - Evidence: Governance includes preservation controls and auditability. (S134, S137)

- **Feature:** Privacy request reporting dashboard (volume, time-to-close, outcomes)
  - What it is: dashboard for privacy request throughput and SLA compliance (for compliance readiness).
  - Why merchant admin cares: proves process exists; identifies bottlenecks; reduces “scramble before audit”.
  - Stealable workflow:
    - 1) Track request states and timestamps.
    - 2) Compute time-to-close and overdue.
    - 3) Export metrics.
  - Thin slice (1–3 days): simple report table (counts by status + avg close time) and CSV export.
  - Evidence: Governance frameworks emphasize measurable processes and accountability. (S134, S133)

#### Catalog governance (product QA, bulk edits, versioning) (Tranche #21 — 2025-12-29)

- **Feature:** Product lifecycle statuses (draft → active → archived)
  - What it is: explicit catalog status states that control whether products are sellable and visible.
  - Why merchant admin cares: prevents half-finished products from going live; supports seasonal archival and auditing.
  - Stealable workflow:
    - 1) Create/edit product in draft.
    - 2) Run QA checks (required fields).
    - 3) Publish to active (or archive).
  - Thin slice (1–3 days): status field + status filter in product list + “publish” action.
  - Evidence: Product status is a first-class concept (Shopify docs + GraphQL enum). (S148)

- **Feature:** Bulk editor (spreadsheet-style) for products and variants
  - What it is: spreadsheet UI for batch edits across many products/variants (price, SKU, barcode, tags).
  - Why merchant admin cares: fastest way to make large catalog changes; avoids CSV round-trips.
  - Stealable workflow:
    - 1) Select products/variants.
    - 2) Edit in grid (multi-cell paste).
    - 3) Save and show per-row validation errors.
  - Thin slice (1–3 days): bulk editor for 20 products with 5 editable fields + row-level errors.
  - Evidence: Bulk editing is productized as a core admin workflow (Shopify bulk edit URL; may be blocked for automated access). (S147)

- **Feature:** CSV import with dry-run validation and row-level errors
  - What it is: import products/variants via CSV with a preflight that catches errors before applying.
  - Why merchant admin cares: reduces broken catalogs; safer vendor/agency workflows; supports mass updates.
  - Stealable workflow:
    - 1) Upload CSV.
    - 2) Run validation and show errors by row/column.
    - 3) Apply changes and generate import report.
  - Thin slice (1–3 days): CSV validator + “apply import” for one entity (products) + error download.
  - Evidence: Import is treated as an operational workflow in mature commerce admins. (S149)

- **Feature:** CSV export center (scoped exports + history)
  - What it is: export products/variants with filters and a history of prior exports.
  - Why merchant admin cares: supports audits, marketplaces, and downstream systems; reduces ad-hoc pulls.
  - Stealable workflow:
    - 1) Choose dataset (products/variants) and filters.
    - 2) Generate export asynchronously.
    - 3) Download and track history.
  - Thin slice (1–3 days): export products to CSV + “exports history” table.
  - Evidence: Product export workflows are a baseline commerce admin capability. (S150)

- **Feature:** Required fields & completeness rules (by product type)
  - What it is: define which fields are required for a product to be “publishable” (images, description, price, GTIN).
  - Why merchant admin cares: improves conversion; reduces listing errors; supports channel readiness.
  - Stealable workflow:
    - 1) Define required fields for a product type.
    - 2) Show completeness badge per product.
    - 3) Block publish (or warn) if incomplete.
  - Thin slice (1–3 days): require 5 fields for one product type + completeness badge.
  - Evidence: Product schemas enumerate key attributes used in commerce/SEO contexts. (S151, S147)

- **Feature:** Field-level validation (SKU format, price > 0, barcode length)
  - What it is: validation rules on fields with inline errors and consistent error codes.
  - Why merchant admin cares: prevents downstream integration failures; reduces data cleanup.
  - Stealable workflow:
    - 1) Validate on edit and on save.
    - 2) Show inline errors and summary.
    - 3) Export error report for bulk ops.
  - Thin slice (1–3 days): 6 validation rules + inline errors + error summary bar.
  - Evidence: Import and data model workflows depend on schema-driven validation. (S149, S147)

- **Feature:** Attribute governance (locked fields + role-based editability)
  - What it is: restrict edits for sensitive fields (price, cost, SKU) to specific roles or workflows.
  - Why merchant admin cares: reduces accidental revenue-impacting changes; supports separation of duties.
  - Stealable workflow:
    - 1) Mark a field as “restricted”.
    - 2) Only allowed roles can edit.
    - 3) Log changes for audit.
  - Thin slice (1–3 days): restrict 3 fields + show disabled state + audit log record.
  - Evidence: Catalog systems have many critical fields; governance depends on controlling edits across a schema. (S147)

- **Feature:** Variant governance (option consistency + SKU uniqueness checks)
  - What it is: enforce that variants have consistent option sets and unique SKUs across the catalog.
  - Why merchant admin cares: prevents fulfillment mistakes; avoids duplicate SKUs and channel feed errors.
  - Stealable workflow:
    - 1) Validate variant option combinations.
    - 2) Enforce SKU uniqueness constraint.
    - 3) Provide “fix suggestions” (e.g., generate SKUs).
  - Thin slice (1–3 days): SKU uniqueness validation + “generate SKU” helper for one product.
  - Evidence: Product schemas include variant-like fields and identifiers; governance requires stable identifiers. (S147, S151)

- **Feature:** Media QA (image requirements + missing alt text)
  - What it is: checks for image count, resolution, and missing alt text; highlights products needing media work.
  - Why merchant admin cares: improves conversion and accessibility; reduces channel rejection risk.
  - Stealable workflow:
    - 1) Validate media presence/metadata.
    - 2) Show media QA queue.
    - 3) Fix inline in media editor.
  - Thin slice (1–3 days): “missing images” and “missing alt text” queues + inline editor.
  - Evidence: Product schema includes images and descriptive fields, enabling QA checks. (S151)

- **Feature:** Taxonomy governance (vendor/product type/tag hygiene)
  - What it is: controlled vocabularies for vendor/type/tags with merge/rename and usage counts.
  - Why merchant admin cares: keeps filters consistent; avoids “Nike” vs “NIKE” duplicates; improves reporting.
  - Stealable workflow:
    - 1) Create taxonomy term.
    - 2) See usage across products.
    - 3) Merge/rename and update references.
  - Thin slice (1–3 days): vendor list + merge duplicate vendors + usage counts.
  - Evidence: Product models include taxonomy/organization fields used for navigation and filtering. (S147)

- **Feature:** Duplicate detection (near-duplicate title/SKU/barcode)
  - What it is: detect duplicate or near-duplicate products that cause confusion and channel issues.
  - Why merchant admin cares: reduces operational mistakes; improves search quality; prevents duplicated SKUs.
  - Stealable workflow:
    - 1) Run duplicate scan nightly.
    - 2) Review duplicates queue.
    - 3) Merge/archive duplicates with audit note.
  - Thin slice (1–3 days): duplicate scan by exact SKU + “mark duplicate” queue.
  - Evidence: Exports and schema-based identifiers enable dedupe checks. (S150, S147)

- **Feature:** Catalog QA queue (“needs review” products)
  - What it is: a queue view for products failing completeness/validation rules, assignable to teams.
  - Why merchant admin cares: turns messy data cleanup into an operational process.
  - Stealable workflow:
    - 1) Rules generate failures.
    - 2) Products appear in QA queue.
    - 3) Operators fix and mark resolved.
  - Thin slice (1–3 days): queue for “missing 1+ required fields” + assign + resolved state.
  - Evidence: Governance and import workflows imply structured review processes. (S149, S150)

- **Feature:** Change log for product edits (field diffs + actor + timestamp)
  - What it is: show a history of edits per product (who changed price/SKU/status and when).
  - Why merchant admin cares: auditability; faster debugging (“who changed this?”); supports rollback decisions.
  - Stealable workflow:
    - 1) Record edit events with field diffs.
    - 2) Display on product detail timeline.
    - 3) Allow export of change history.
  - Thin slice (1–3 days): change events list (no diffs) + actor + timestamp for one entity.
  - Evidence: Governance depends on tracking lifecycle/status and changes over time. (S148, S149)

- **Feature:** Draft changes / publish approval (optional)
  - What it is: stage catalog changes as drafts that require approval before publishing.
  - Why merchant admin cares: reduces mistakes; supports separation of duties for pricing/publishing.
  - Stealable workflow:
    - 1) Create draft change set.
    - 2) Request approval.
    - 3) Apply/publish and audit.
  - Thin slice (1–3 days): “request approval” for status change (draft→active) with notes.
  - Evidence: Product status and governance workflows support gated publishing. (S148, S149)

- **Feature:** Rollback for bulk operations (undo last import/bulk edit)
  - What it is: ability to undo changes from a bulk edit/import by reverting affected fields.
  - Why merchant admin cares: safety net for large updates; reduces fear of bulk operations.
  - Stealable workflow:
    - 1) Store “before snapshot” for affected fields.
    - 2) Show import/bulk edit run.
    - 3) Click “rollback” and record audit.
  - Thin slice (1–3 days): rollback single field (price) for last import batch.
  - Evidence: Bulk import/export workflows are common; safe rollback improves operator confidence. (S149, S150)

- **Feature:** Channel readiness checklist (feed/export requirements)
  - What it is: readiness checks for publishing to channels (e.g., required attributes, identifiers, images).
  - Why merchant admin cares: prevents channel rejections and “silent failures” in shopping feeds.
  - Stealable workflow:
    - 1) Choose channel profile.
    - 2) Run readiness check.
    - 3) Fix missing fields and retry.
  - Thin slice (1–3 days): readiness check for 1 channel profile using 6 rules.
  - Evidence: Schema-based attribute completeness enables channel readiness logic. (S151, S147)


### Merchandising / CRO

- **Feature:** Search + merchandising rules (boost/bury, synonyms)
  - Job to be done: improve on-site discovery and conversion.
  - Why high leverage: direct CRO wins.
  - Complexity guess: M (search index + tuning UI)
  - Dependencies (data/integrations): product catalog sync, indexing jobs
  - Competitors known for it: Algolia, Klevu
  - OSS options (if any): Meilisearch (license verify), Typesense (GPL – likely flag)

#### Merchandising rules (search tuning, boosts, synonyms) (Tranche #20 — 2025-12-29)

- **Feature:** Synonyms manager (equivalents, one-way, “alternatives”)
  - What it is: CRUD UI for synonyms that affect search matching (e.g., “hoodie ↔ sweatshirt”, “tv → television”).
  - Why merchant admin cares: increases findability; reduces “no results”; matches real shopper language.
  - Stealable workflow:
    - 1) Add synonym set.
    - 2) Choose type (one-way vs bidirectional).
    - 3) Save and publish.
  - Thin slice (1–3 days): synonyms CRUD for 20 terms + “publish changes” button.
  - Evidence: Synonyms are a first-class configuration surface in multiple search stacks. (S139, S142, S144)

- **Feature:** Search rules / curation (pin, promote, hide)
  - What it is: define rules that override ranking for specific queries or segments (pin SKUs, hide out-of-stock).
  - Why merchant admin cares: campaign merchandising; control over key queries; prevents bad results.
  - Stealable workflow:
    - 1) Define trigger (query contains “gift”).
    - 2) Choose action (pin products, boost collection, hide items).
    - 3) Set validity window and publish.
  - Thin slice (1–3 days): pin top 3 products for 5 queries with start/end dates.
  - Evidence: Search platforms expose rule/curation primitives for pinning and overrides. (S138, S143)

- **Feature:** Boost/bury rules by attributes (margin, inventory, freshness)
  - What it is: ranking adjustments based on product attributes (boost high margin, bury low stock).
  - Why merchant admin cares: drives revenue and reduces frustration from unavailable items.
  - Stealable workflow:
    - 1) Choose attribute and condition.
    - 2) Choose boost strength.
    - 3) Apply to a query scope or global.
  - Thin slice (1–3 days): one boost rule (“in_stock desc, then margin desc”) for a single collection.
  - Evidence: Ranking is a tuning surface and attribute-driven relevance is common in search systems. (S140, S141)

- **Feature:** Out-of-stock demotion (and optional “show only in stock” toggle)
  - What it is: demote or hide out-of-stock products in search results, with optional user toggle.
  - Why merchant admin cares: avoids conversion-killing clicks; reduces support complaints.
  - Stealable workflow:
    - 1) Choose demote vs hide.
    - 2) Configure thresholds (inventory=0 or low-stock).
    - 3) Preview and publish.
  - Thin slice (1–3 days): demote out-of-stock items in one results page (search + collection listing).
  - Evidence: Search stacks support sorting and filtering based on attributes like inventory state. (S141, S145)

- **Feature:** Facets configuration (which filters show, order, and display names)
  - What it is: configure which facets appear (size/color/brand/price) and how they’re ordered.
  - Why merchant admin cares: improves discovery and reduces bounce; aligns filters with merchandising strategy.
  - Stealable workflow:
    - 1) Select facet fields.
    - 2) Set order and display labels.
    - 3) Publish to storefront.
  - Thin slice (1–3 days): facet editor for 6 facets + reorder via drag/drop.
  - Evidence: Search APIs include facets and filters as core primitives. (S141, S145)

- **Feature:** Query suggestions / autocomplete dictionary
  - What it is: tune typeahead suggestions (popular queries, category suggestions, brand suggestions).
  - Why merchant admin cares: faster findability; avoids misspellings; increases conversion.
  - Stealable workflow:
    - 1) Ingest top queries.
    - 2) Add manual suggestions.
    - 3) Publish typeahead list.
  - Thin slice (1–3 days): manual suggestion list for top 50 queries with import/export CSV.
  - Evidence: Suggesters and autocomplete are distinct primitives in search systems. (S146)

- **Feature:** “No results” playbook (fallback suggestions + curated collections)
  - What it is: define what to show when queries return no results (synonym suggestion, popular categories).
  - Why merchant admin cares: reduces dead ends; recovers otherwise lost sessions.
  - Stealable workflow:
    - 1) Detect zero-results query.
    - 2) Show suggested query/facet.
    - 3) Redirect to curated collection if configured.
  - Thin slice (1–3 days): zero-results page with “did you mean” + 3 popular collections.
  - Evidence: Search tuning and suggestions are core relevance features across engines. (S146, S140)

- **Feature:** Search analytics dashboard (top queries, zero-results, CTR)
  - What it is: report of search performance with key metrics and drilldowns (by query, by filter usage).
  - Why merchant admin cares: tells you what shoppers want; prioritizes synonym/rule work.
  - Stealable workflow:
    - 1) Aggregate query logs.
    - 2) Compute top queries and zero-results rate.
    - 3) Provide a “fix this query” shortcut.
  - Thin slice (1–3 days): top queries + zero-results table + CSV export.
  - Evidence: Ranking and synonyms are typically tuned using feedback loops and metrics. (S140, S139)

- **Feature:** Preview mode / sandbox for merchandising changes
  - What it is: preview how search results change before publishing rules/synonyms.
  - Why merchant admin cares: prevents accidental revenue loss; enables safer experimentation.
  - Stealable workflow:
    - 1) Make changes in draft.
    - 2) Run preview search for 10 queries.
    - 3) Compare before/after and publish.
  - Thin slice (1–3 days): “draft synonyms” + preview for 10 queries with side-by-side results.
  - Evidence: Merchandising and ranking changes should be safe and testable. (S140, S143)

- **Feature:** Scheduled campaigns (rules active window + auto-expire)
  - What it is: schedule merchandising rules to activate and deactivate automatically (holiday campaign).
  - Why merchant admin cares: less manual work; reduces “forgot to turn off promo” incidents.
  - Stealable workflow:
    - 1) Create rule.
    - 2) Set start/end time.
    - 3) System activates/deactivates automatically.
  - Thin slice (1–3 days): schedule 1 rule with auto-expiry + audit log.
  - Evidence: Rules/curation primitives commonly support time windows. (S138, S143)

- **Feature:** Segment-specific merchandising (market, device, customer group)
  - What it is: apply different rules for different segments (US vs EU, logged-in vs guest).
  - Why merchant admin cares: localized merchandising; different availability/pricing; personalized experiences.
  - Stealable workflow:
    - 1) Define segment (market/country).
    - 2) Attach merchandising rules to segment.
    - 3) Preview in segment context.
  - Thin slice (1–3 days): segment = market; allow 2 sets of rules (US/EU) for one query set.
  - Evidence: Search systems support filtering/sorting and can apply rules scoped by context. (S141, S145)

- **Feature:** Misspelling tolerance / typo tuning
  - What it is: controls for typo tolerance (distance thresholds, prefix matching) and excluded terms.
  - Why merchant admin cares: recovers searches; prevents weird matches (brand precision).
  - Stealable workflow:
    - 1) Enable typo tolerance.
    - 2) Set strict mode for specific fields (SKU/brand).
    - 3) Test common typos.
  - Thin slice (1–3 days): toggle typo tolerance + a “strict fields” list for SKU/brand.
  - Evidence: Search relevance tuning includes matching strategies beyond exact terms. (S140, S141)

- **Feature:** Stop words and normalization rules (case, stemming) (optional)
  - What it is: define normalization rules that affect indexing and matching (case-folding, stemming, stop words).
  - Why merchant admin cares: improves recall and relevance; prevents “noise” results.
  - Stealable workflow:
    - 1) Choose language profile.
    - 2) Configure stop-word list.
    - 3) Reindex and validate top queries.
  - Thin slice (1–3 days): stop-word list for one language + reindex button + top-query smoke test.
  - Evidence: Search stacks have language/analyzer concepts and tuning surfaces. (S145, S140)

- **Feature:** Rules change log + rollback
  - What it is: track every change to synonyms/rules and allow reverting a specific change set.
  - Why merchant admin cares: safety and accountability; easy recovery from bad tuning.
  - Stealable workflow:
    - 1) Save change with message.
    - 2) View change history.
    - 3) Roll back to prior version.
  - Thin slice (1–3 days): change history + “restore previous” (single undo) for synonyms list.
  - Evidence: Synonyms and rules are configuration objects and benefit from versioning and governance. (S142, S139)

- **Feature:** Import/export synonyms and rules (CSV/JSON)
  - What it is: bulk manage merchandising config via CSV/JSON import/export.
  - Why merchant admin cares: faster updates; agency workflows; version control outside the UI.
  - Stealable workflow:
    - 1) Export current config.
    - 2) Edit CSV/JSON.
    - 3) Import with validation and publish.
  - Thin slice (1–3 days): export synonyms to CSV + import with row-level errors.
  - Evidence: Search configurations are often managed as structured objects. (S142, S144)

- **Feature:** Merchandising “tasks” (suggestions from analytics)
  - What it is: automatically create suggestions like “add synonym for X” based on zero-results and high-volume queries.
  - Why merchant admin cares: closes the loop; reduces manual detective work.
  - Stealable workflow:
    - 1) Detect query pattern (high volume + zero results).
    - 2) Create task suggestion.
    - 3) Admin applies fix (synonym/rule) and resolves task.
  - Thin slice (1–3 days): suggestion list with “create synonym” quick action for top 10 zero-result queries.
  - Evidence: Search analytics creates the feedback loop that powers tuning work. (S140)

- **Feature:** Safeguards for promotions (pin limits + conflict detection)
  - What it is: detect conflicting rules (two rules pin different products for same query) and enforce limits.
  - Why merchant admin cares: prevents chaotic results; maintains predictable storefront behavior.
  - Stealable workflow:
    - 1) Validate new rule against existing.
    - 2) Show conflicts and ask for resolution.
    - 3) Publish only if conflicts resolved.
  - Thin slice (1–3 days): detect duplicate query triggers and show a warning banner.
  - Evidence: Curation/rules systems tend to grow and require governance to stay safe. (S138, S143)

#### Promotions admin (coupons, discounts, eligibility) (Tranche #22 — 2025-12-29)

- **Feature:** Discount types (percent off, amount off, free shipping)
  - What it is: support common discount primitives with clear configuration (percentage, fixed amount, shipping override).
  - Why merchant admin cares: matches common promotion patterns; avoids one-off engineering for campaigns.
  - Stealable workflow:
    - 1) Choose discount type.
    - 2) Configure value and scope.
    - 3) Save as draft or active.
  - Thin slice (1–3 days): percent-off and fixed-amount discounts for cart subtotal.
  - Evidence: Discount primitives are modeled explicitly (coupon amount/percent) in billing and commerce systems. (S157, S152)

- **Feature:** Discount code creation (single code)
  - What it is: create a single code (e.g., WELCOME10) with rules and a validity window.
  - Why merchant admin cares: fastest launch path; supports influencer/partner codes.
  - Stealable workflow:
    - 1) Enter code + description.
    - 2) Set discount value + start/end date.
    - 3) Activate and share code.
  - Thin slice (1–3 days): create basic code discount + status toggle (active/disabled).
  - Evidence: Discount code objects and create mutations exist as first-class admin primitives. (S152, S154)

- **Feature:** Bulk code generation (codes list + export)
  - What it is: generate many unique codes for affiliates, email campaigns, or one-time promotions.
  - Why merchant admin cares: operationally required for large promos; enables unique tracking.
  - Stealable workflow:
    - 1) Choose prefix/pattern and quantity.
    - 2) Generate codes in background.
    - 3) Export CSV and track usage.
  - Thin slice (1–3 days): generate 100 codes + CSV export + “used” flag.
  - Evidence: Promotion code models support multiple codes tied to discount primitives. (S158, S152)

- **Feature:** Automatic discounts (no code required)
  - What it is: rules-based discounts that apply automatically when conditions are met.
  - Why merchant admin cares: reduces shopper friction; improves conversion for broad promos.
  - Stealable workflow:
    - 1) Define eligibility conditions.
    - 2) Define discount action.
    - 3) Activate with schedule.
  - Thin slice (1–3 days): automatic percent-off on minimum cart subtotal.
  - Evidence: Automatic discount objects and create mutations exist as distinct primitives. (S153, S155)

- **Feature:** Eligibility rules (min spend, min quantity, customer segment)
  - What it is: configure who/when gets a discount (minimum thresholds, segment membership).
  - Why merchant admin cares: controls margin; targets promos; reduces abuse.
  - Stealable workflow:
    - 1) Add eligibility rule(s).
    - 2) Validate rule logic.
    - 3) Preview eligible carts/customers.
  - Thin slice (1–3 days): min subtotal + min quantity rules for one discount.
  - Evidence: Coupon systems typically expose restrictions and eligibility controls. (S156, S157)

- **Feature:** Scope rules (products/collections/categories, excluded items)
  - What it is: apply discount only to certain products/categories and optionally exclude others.
  - Why merchant admin cares: targeted promos; avoids discounting restricted items; protects margin.
  - Stealable workflow:
    - 1) Select include scope (collection/category).
    - 2) Select exclusions.
    - 3) Save and preview.
  - Thin slice (1–3 days): include collection + exclude 5 SKUs.
  - Evidence: Coupon management commonly supports product/category restrictions. (S156)

- **Feature:** Usage limits (total uses, per-customer limit)
  - What it is: cap redemptions globally and per customer; optionally require login.
  - Why merchant admin cares: prevents promo leakage; ensures fairness; protects budget.
  - Stealable workflow:
    - 1) Set max redemptions.
    - 2) Set per-customer cap.
    - 3) Enforce at checkout and log rejections.
  - Thin slice (1–3 days): max redemptions + per-customer limit with a simple “limit reached” message.
  - Evidence: Coupon primitives include redemption limits and usage constraints. (S157, S156)

- **Feature:** Schedule (start/end date) + auto-disable
  - What it is: schedule promotions to activate and expire automatically.
  - Why merchant admin cares: reduces operational mistakes; supports campaign calendars.
  - Stealable workflow:
    - 1) Set start and end timestamps.
    - 2) System activates/deactivates.
    - 3) Record audit event.
  - Thin slice (1–3 days): scheduled start/end + status label in list.
  - Evidence: Discount objects typically include lifecycle and time constraints. (S152, S157)

- **Feature:** Stacking/compatibility rules (priority + mutual exclusions)
  - What it is: define whether discounts can stack and set precedence (e.g., automatic discount vs code).
  - Why merchant admin cares: prevents margin blowouts; reduces customer confusion.
  - Stealable workflow:
    - 1) Set stacking policy (stackable/non-stackable).
    - 2) Set priority order.
    - 3) Validate conflicts at publish time.
  - Thin slice (1–3 days): “only one discount applies” + priority ordering between 2 discounts.
  - Evidence: Discount models separate codes and automatic discounts, implying compatibility rules at application time. (S152, S153)

- **Feature:** Promo list view + filters (status, type, date range)
  - What it is: admin list of promotions with quick filters and status badges.
  - Why merchant admin cares: operators need visibility and fast edits; prevents “forgotten discounts”.
  - Stealable workflow:
    - 1) Filter by active/expired.
    - 2) Sort by start date.
    - 3) Open promo detail for edits.
  - Thin slice (1–3 days): list page with status filter + search by code.
  - Evidence: Discounts are modeled as objects with status and management surfaces. (S152, S153)

- **Feature:** Promo detail page (edit rules + audit history)
  - What it is: single place to edit and review a promotion, including change history and who changed what.
  - Why merchant admin cares: auditability; safer collaboration; faster debugging when margins drop.
  - Stealable workflow:
    - 1) Edit promo fields.
    - 2) Save and create audit event.
    - 3) View history list.
  - Thin slice (1–3 days): change history list (no diff) + actor + timestamp.
  - Evidence: Governance of discount objects benefits from explicit models and lifecycle. (S152, S159)

- **Feature:** Redemption analytics (uses, revenue impact, AOV lift)
  - What it is: track redemption counts and basic impact metrics (orders with discount, discount amount).
  - Why merchant admin cares: evaluate promo ROI; stop bad promos; plan future campaigns.
  - Stealable workflow:
    - 1) Aggregate orders with promo.
    - 2) Compute usage and discount totals.
    - 3) Export report.
  - Thin slice (1–3 days): usage count + discount total + CSV export.
  - Evidence: Coupon and promotion code objects include redemption concepts and limits. (S157, S158)

- **Feature:** Fraud/abuse signals for promos (suspicious redemptions)
  - What it is: detect suspicious patterns (many redemptions from same IP, new accounts, repeated attempts).
  - Why merchant admin cares: prevents leakage; protects marketing budget.
  - Stealable workflow:
    - 1) Monitor redemption events.
    - 2) Flag suspicious patterns.
    - 3) Disable code or require verification.
  - Thin slice (1–3 days): flag “too many redemptions per customer” + one-click disable.
  - Evidence: Redemption limits and object models enable enforcement and monitoring. (S157, S158)

- **Feature:** Free shipping thresholds (min spend + eligible regions)
  - What it is: free shipping when cart meets threshold and ship-to region is eligible.
  - Why merchant admin cares: common promo pattern; reduces margin surprises by scoping.
  - Stealable workflow:
    - 1) Set min subtotal.
    - 2) Select eligible shipping zones.
    - 3) Activate schedule.
  - Thin slice (1–3 days): free shipping for one shipping zone + threshold.
  - Evidence: Discount primitives commonly include shipping discounts and conditions. (S156)

- **Feature:** “Promotion preview” (test cart) and conflict warnings
  - What it is: a safe way to test how the promo applies to example carts before publishing.
  - Why merchant admin cares: prevents silent conflicts; avoids broken campaigns.
  - Stealable workflow:
    - 1) Build a test cart (items, quantities, customer).
    - 2) Apply promo rules.
    - 3) Show applied discount or conflict reason.
  - Thin slice (1–3 days): test cart builder for 3 items + “apply promo” simulator.
  - Evidence: Discount configuration is complex; safe application requires preview/validation loops. (S156, S152)

- **Feature:** Import/export promotions (bulk ops)
  - What it is: export promo list and import codes/limits for agencies and large campaigns.
  - Why merchant admin cares: speeds up campaign ops; supports external tooling.
  - Stealable workflow:
    - 1) Export promos or codes.
    - 2) Edit CSV/JSON.
    - 3) Import with validation.
  - Thin slice (1–3 days): export codes CSV + import with row-level errors (no auto-create of complex rules).
  - Evidence: Promotions have structured object models and restrictions that lend themselves to bulk operations. (S158, S156)

- **Feature:** Personalized recommendations (basic)
  - Job to be done: increase AOV and conversion.
  - Why high leverage: common winning pattern.
  - Complexity guess: M/L (depends on data)
  - Dependencies (data/integrations): events, catalog, identity stitching
  - Competitors known for it: Nosto
  - OSS options (if any): start simple; build gradually

### Retention / lifecycle

- **Feature:** Lifecycle segmentation + automated journeys (email/SMS)
  - Job to be done: retain customers without manual work.
  - Why high leverage: measurable revenue lift.
  - Complexity guess: M/L (data + messaging infra)
  - Dependencies (data/integrations): events, customer identity, email/SMS providers
  - Competitors known for it: Klaviyo, Attentive, Postscript
  - OSS options (if any): integrate providers first; keep orchestration internal

- **Feature:** Subscription management portal
  - Job to be done: reduce churn and support load for subscriptions.
  - Why high leverage: high-impact for subscription brands.
  - Complexity guess: M
  - Dependencies (data/integrations): billing/subscription provider, customer auth
  - Competitors known for it: Recharge, Skio
  - OSS options (if any): integrate first, then custom UI

### Analytics / experiments

#### Promotions measurement (ROI, cohorts, LTV impact) (Tranche #27 — 2025-12-29)

- **Feature:** Promotion attribution event taxonomy (view/select/apply/redeem)
  - What it is: define a canonical event model for promo exposure and usage (viewed/selected/applied/redeemed) joined to orders.
  - Why merchant admin cares: enables consistent promo funnel reporting and attribution beyond “discount used”.
  - Stealable workflow:
    - 1) Emit events for promo view/select/apply and purchase.
    - 2) Join events to order/promo IDs.
    - 3) Build promo funnel dashboard + export.
  - Thin slice (1–3 days): event table + join to orders + basic “applied → purchased” funnel.
  - Evidence: GA4 documents an events reference that includes promotion-related events and supports funnel measurement patterns. (S194)

- **Feature:** Promo KPI dashboard (redemptions, revenue, customers, AOV)
  - What it is: core KPI panel per promo showing redemptions, orders, unique customers, AOV, and time series.
  - Why merchant admin cares: answers “did this promo work?” quickly and supports weekly campaign reviews.
  - Stealable workflow:
    - 1) Select promo and date range.
    - 2) View KPIs + time series.
    - 3) Export CSV for finance/marketing.
  - Thin slice (1–3 days): promo list with KPI columns + detail page + CSV export.
  - Evidence: Discount primitives support redemption and lifecycle reporting; consistent metrics benefit from a semantic layer. (S152, S157, S196)

- **Feature:** Discount spend report (“cost of promotion”) + net revenue
  - What it is: compute discount amount (spend) and net revenue per promo and segment.
  - Why merchant admin cares: prevents optimizing only for top-line; supports margin-aware decisions.
  - Stealable workflow:
    - 1) Sum discount amounts per order line.
    - 2) Aggregate spend and net revenue per promo.
    - 3) Highlight top “high cost / low return” promos.
  - Thin slice (1–3 days): discount spend totals + net revenue (revenue - discount) without COGS.
  - Evidence: Coupon primitives include amount/percent off; semantic layers help standardize ROI definitions. (S157, S196)

- **Feature:** New vs returning customer breakdown (acquisition vs retention)
  - What it is: split promo performance by new vs returning customers and first-order acquisition.
  - Why merchant admin cares: prevents discounting existing demand; aligns promo strategy to goals.
  - Stealable workflow:
    - 1) Classify customers at order time (new/returning).
    - 2) Aggregate redemptions by type.
    - 3) Track repeat purchase at 30/60 days.
  - Thin slice (1–3 days): new/returning breakdown + 30-day repeat purchase rate.
  - Evidence: Cohort tooling is a standard primitive for retention/LTV measurement. (S198)

- **Feature:** Cohort retention + LTV by promo (exposure and redemption)
  - What it is: create cohorts based on promo exposure/redemption and measure retention and cumulative spend.
  - Why merchant admin cares: avoids short-term conversion traps; informs “which promos bring quality customers”.
  - Stealable workflow:
    - 1) Define cohorts from promo events and orders.
    - 2) Compute retention and cumulative revenue.
    - 3) Compare against “no promo” cohorts.
  - Thin slice (1–3 days): 30/60/90-day cohort table for revenue and repeat rate.
  - Evidence: Cohorts are explicitly supported as a measurement primitive in analytics tools. (S198)

- **Feature:** Channel attribution for promo performance (UTM/source breakdown)
  - What it is: attribute redemptions and revenue by channel (email/SMS/ads/affiliate) using UTM and source fields.
  - Why merchant admin cares: allocates spend and avoids duplicated discounting across channels.
  - Stealable workflow:
    - 1) Capture UTM/source per session/order.
    - 2) Join promo redemptions to channel fields.
    - 3) Report channel ROI and overlaps.
  - Thin slice (1–3 days): UTM source/medium breakdown for promo redemptions and revenue.
  - Evidence: Event pipelines and structured events enable attribution joins and reporting. (S199, S194)

- **Feature:** Stacking overlap report (double-discounting detection)
  - What it is: identify orders where multiple discounts applied and quantify overlap patterns.
  - Why merchant admin cares: reduces margin leakage and helps refine stacking policies.
  - Stealable workflow:
    - 1) Identify orders with >1 discount.
    - 2) Compute combined discount spend.
    - 3) Flag top overlapping promo pairs.
  - Thin slice (1–3 days): report top promo pairs by overlap count and discount spend.
  - Evidence: Promotions are rules engines with stacking/compatibility; reporting needs to surface overlap. (S156, S152)

- **Feature:** Holdout/control group measurement (incremental lift)
  - What it is: compare outcomes for eligible customers receiving promo vs holdout group not receiving it.
  - Why merchant admin cares: measures incremental value vs cannibalization; supports smarter discounting.
  - Stealable workflow:
    - 1) Define eligibility segment.
    - 2) Assign random holdout group.
    - 3) Compare conversion/revenue and discount spend.
  - Thin slice (1–3 days): holdout flag + simple results table (conversion, revenue).
  - Evidence: Experimentation platforms provide holdout/variant analysis patterns (OSS available). (S195)

- **Feature:** Promo experiment manager (offer A/B: 10% vs $10 vs free shipping)
  - What it is: manage multiple offer variants with consistent measurement and guardrails.
  - Why merchant admin cares: finds best offer while controlling discount cost.
  - Stealable workflow:
    - 1) Define experiment and variants (offer definitions).
    - 2) Assign customers to variants.
    - 3) Read results dashboard; select winner.
  - Thin slice (1–3 days): 2 variants + assignment + result table (conversion + spend).
  - Evidence: Experimentation tooling + discount primitives enable offer variants and measurement. (S195, S157)

- **Feature:** Promo abuse monitoring (spikes, repeated customers, anomaly alerts)
  - What it is: detect unusual redemption patterns and trigger alerts/actions (pause, tighten limits).
  - Why merchant admin cares: prevents promo leakage and bot/coupon scraping abuse.
  - Stealable workflow:
    - 1) Monitor redemption velocity and unique customer counts.
    - 2) Detect anomalies (spikes, repeated identities).
    - 3) Auto-pause promo and notify ops.
  - Thin slice (1–3 days): spike alert + “pause promo” action + audit log entry.
  - Evidence: Promo lifecycle includes pause and usage limits; measurement should include abuse signals. (S156, S152)

- **Feature:** Scheduled promo performance report (weekly email + CSV)
  - What it is: deliver weekly promo KPIs to stakeholders with CSV attachments and delivery logs.
  - Why merchant admin cares: reduces ad-hoc reporting; creates consistent review cadence.
  - Stealable workflow:
    - 1) Configure recipients + schedule.
    - 2) Generate KPI summary + CSV.
    - 3) Send and record delivery outcome.
  - Thin slice (1–3 days): weekly email with top promos and CSV; no BI integration.
  - Evidence: Analytics stacks rely on curated metric tables; dbt-style workflows support scheduled reporting inputs. (S197, S196)

- **Feature:** Metric definitions registry (ROI, spend, net revenue, lift) + versioning
  - What it is: define formulas and inputs for key promo metrics and version changes with audit trail.
  - Why merchant admin cares: prevents metric drift and decision disputes across teams.
  - Stealable workflow:
    - 1) Define metric formulas.
    - 2) Use definitions across dashboards/exports.
    - 3) Version and track changes.
  - Thin slice (1–3 days): metric definition table + “used by” list + change log.
  - Evidence: Semantic layers are designed to standardize metrics across dashboards. (S196)

- **Feature:** Instrumentation/data-quality checks (missing events, missing UTMs, join failures)
  - What it is: detect measurement gaps that bias promo dashboards and route issues to a “data quality” queue.
  - Why merchant admin cares: avoids making decisions on broken data; speeds instrumentation fixes.
  - Stealable workflow:
    - 1) Run daily checks on event coverage and field completeness.
    - 2) Create issues (missing UTMs, missing applied events).
    - 3) Track fixes and re-run validation.
  - Thin slice (1–3 days): 3 checks + dashboard tile + CSV export of bad rows.
  - Evidence: Analytics requires curated pipelines and consistent event models; dbt and event pipelines reinforce governance. (S197, S199)

- **Feature:** Admin usage analytics (what merchants actually use)
  - Job to be done: decide what to build next based on real usage.
  - Why high leverage: eliminates guesswork.
  - Complexity guess: S/M
  - Dependencies (data/integrations): event capture, dashboarding
  - Competitors known for it: PostHog, Amplitude
  - OSS options (if any): PostHog (license verify), Metabase/Superset

- **Feature:** Experimentation framework (A/B tests)
  - Job to be done: test changes safely and measure impact.
  - Why high leverage: compounds CRO improvements.
  - Complexity guess: M
  - Dependencies (data/integrations): event analytics, flagging
  - Competitors known for it: Optimizely, VWO
  - OSS options (if any): GrowthBook (license verify), Unleash + custom metrics

### Content / SEO

- **Feature:** Content ops / CMS for marketing + admin content
  - Job to be done: publish content without engineers.
  - Why high leverage: speed + consistency.
  - Complexity guess: S/M (if integrating)
  - Dependencies (data/integrations): auth, media, content models
  - Competitors known for it: Contentful, Sanity
  - OSS options (if any): Payload CMS (MIT), Strapi/Directus (verify)

### Customer / support

- **Feature:** Returns portal + exchange flow
  - Job to be done: automate returns/exchanges and reduce tickets.
  - Why high leverage: big ops cost saver; improves CX.
  - Complexity guess: M
  - Dependencies (data/integrations): orders, inventory, shipping labels, refunds
  - Competitors known for it: Loop Returns, AfterShip Returns, Narvar
  - OSS options (if any): build workflow UI; integrate carriers/providers

#### Returns / Exchanges / RMA automation (Tranche #1 — 2025-12-29)

- **Feature:** Self-serve return initiation (portal: lookup → select items → choose resolution)
  - What it is: customer-facing flow to initiate a return/exchange using order lookup and item selection.
  - Why merchant admin cares: reduces “where is my refund / can I exchange?” tickets; standardizes return intake data.
  - Stealable workflow (2–5 steps):
    - 1) Customer enters order lookup (order # + email/zip).
    - 2) Selects items/qty + return reason.
    - 3) Chooses resolution (refund / exchange / store credit).
    - 4) Gets next steps + label / drop-off instructions.
  - Thin slice (1–3 days): hosted return initiation page + internal “Return request” record + email confirmation.
  - Evidence: Shopify returns admin flow + AfterShip/Narvar/Happy Returns product positioning. (S1, S4, S7, S8)

- **Feature:** Eligibility rules engine (window, product tags, final sale, condition gates)
  - What it is: policy enforcement at initiation (e.g., return window, exclusions, category-specific rules).
  - Why merchant admin cares: prevents invalid returns; avoids manual declinations; protects margin.
  - Stealable workflow:
    - 1) Define rules (days since delivery/fulfillment, tags, collections, “final sale”).
    - 2) Portal checks eligibility per line item.
    - 3) If ineligible, show reason + alternative (support/contact/exception request).
  - Thin slice (1–3 days): return window + product tag exclusion + “ineligible reason” UI.
  - Evidence: Shopify return eligibility/processing requirements; AfterShip policy-driven automation. (S1, S4)

- **Feature:** Structured return reasons + reason analytics
  - What it is: standardized reason taxonomy with optional notes/photos; supports downstream reporting.
  - Why merchant admin cares: pinpoints quality/fit issues; supports vendor chargebacks; improves CX.
  - Stealable workflow:
    - 1) Configure reason list + subreasons.
    - 2) Customer selects reason per item; add note.
    - 3) Ops reviews reason dashboard by SKU/vendor.
  - Thin slice (1–3 days): reason picklist + exportable report (CSV) by reason/SKU.
  - Evidence: Shopify return processing includes item selection and reasons; returns platforms emphasize return insights. (S1, S4, S7)

- **Feature:** Resolution chooser (refund / exchange / store credit / replacement / keep item)
  - What it is: portal offers allowed resolutions per item/order based on policy and inventory.
  - Why merchant admin cares: converts refunds into exchanges/credit; reduces churn; enables “keep it” for low-value items.
  - Stealable workflow:
    - 1) Evaluate eligible resolutions by policy + inventory.
    - 2) Present options with incentives (e.g., bonus store credit).
    - 3) Create refund/exchange workflow automatically.
  - Thin slice (1–3 days): refund vs store-credit choice + configurable credit bonus.
  - Evidence: AfterShip markets multiple resolutions; ReturnGO markets exchange variants; Narvar markets exchanges. (S4, S6, S7)

- **Feature:** Any-to-any exchange (swap to different SKU) with “pay difference / refund difference”
  - What it is: exchange to any other product/variant (not just like-for-like), handling price differences.
  - Why merchant admin cares: saves the sale; reduces refund volume; better fit for apparel/size exchanges.
  - Stealable workflow:
    - 1) Customer selects exchange; browses catalog.
    - 2) System calculates price delta.
    - 3) Collects payment (if higher) or issues credit/refund (if lower) then creates fulfillment.
  - Thin slice (1–3 days): exchange-to-any SKU + “credit-only” delta handling (no split tender).
  - Evidence: ReturnGO “any-to-any exchange”; AfterShip exchange flows; Shopify supports exchange processing concepts. (S6, S4, S1)

- **Feature:** Instant exchange authorization (ship replacement immediately with card hold / chargeback if no return)
  - What it is: ship exchange item immediately and place an authorization/hold (or charge) that is released when the return is scanned/received.
  - Why merchant admin cares: boosts exchange conversion and reduces refund churn while controlling “didn’t return” loss.
  - Stealable workflow:
    - 1) Customer selects exchange; confirms payment method for hold.
    - 2) System authorizes/holds deposit (configurable amount).
    - 3) Fulfill replacement immediately; release hold on scan/receive; capture if timeout/no-return.
  - Thin slice (1–3 days): “ship-first exchange” with a single configurable deposit amount and manual “release/capture” admin buttons.
  - Evidence: Loop instant exchange patterns; AfterShip “instant exchanges” setup docs. (S3, S165)

- **Feature:** Instant refunds (financed) / “instant returns” programs
  - What it is: allow eligible customers to receive a refund instantly (before warehouse receipt) via a financing layer; often tied to drop-off/scan milestones.
  - Why merchant admin cares: improves CX and reduces WISMR tickets; differentiates brand while keeping controls via eligibility/risk.
  - Stealable workflow:
    - 1) Eligibility decision (customer segment/risk + order value).
    - 2) Customer initiates return; accept instant refund terms.
    - 3) Refund is issued instantly; reconcile when return is scanned/received.
  - Thin slice (1–3 days): “instant refund eligible” flag + manual ops approval + instant payout simulation (no financing integration yet).
  - Evidence: Reshop “Instant Refunds” positioning; Loop “Instant Returns” positioning. (S163, S164)

- **Feature:** Exchange inventory reservation + “ship-first” vs “receive-first” controls
  - What it is: reserve replacement inventory and choose whether to fulfill exchange before receiving the return.
  - Why merchant admin cares: prevents oversell; controls fraud exposure; improves replacement speed.
  - Stealable workflow:
    - 1) When exchange initiated, reserve stock.
    - 2) Choose policy: ship-first (immediate) vs receive-first (after scan/received).
    - 3) Release reservation on cancellation/timeout.
  - Thin slice (1–3 days): reserve stock on exchange + auto-release after N days.
  - Evidence: AfterShip condition-based resolutions + operational controls; returns platforms commonly support exchange gating. (S4)

- **Feature:** Refund processing controls (method priority, partial refunds, manual overrides)
  - What it is: rules and tools to process refunds (original payment, gift card/store credit) with partial line-item refunds.
  - Why merchant admin cares: avoids over-refunds; speeds refunds; supports exceptions.
  - Stealable workflow:
    - 1) Approve return (auto/manual).
    - 2) Choose refund method + amount per item.
    - 3) Push refund to platform and notify customer.
  - Thin slice (1–3 days): manual “approve + refund” action with partial line refunds and note capture.
  - Evidence: Shopify return + refund actions; AfterShip supports multiple resolutions. (S1, S4)

- **Feature:** Store credit issuance (bonus credit, expirations, restricted categories)
  - What it is: issue credit with optional bonus, expiry, and restrictions.
  - Why merchant admin cares: converts refunds into future spend; maintains margin; reduces churn.
  - Stealable workflow:
    - 1) Offer credit option with bonus.
    - 2) Issue credit instrument tied to customer.
    - 3) Track redemption + outstanding liability.
  - Thin slice (1–3 days): issue store-credit balance + apply at checkout via discount code/gift-card primitive.
  - Evidence: AfterShip marketing and returns platforms emphasize store credit/exchanges. (S4, S7)

- **Feature:** Return shipping labels (auto-generate, upload, or “bring your own label”)
  - What it is: create/attach return label and tracking to the return request; optionally let customer provide tracking.
  - Why merchant admin cares: reduces friction; enables tracking; standardizes returns logistics.
  - Stealable workflow:
    - 1) Select carrier/service based on rules.
    - 2) Generate label + attach tracking.
    - 3) Send label or drop-off QR to customer.
  - Thin slice (1–3 days): attach tracking number + “label upload” (no carrier API initially).
  - Evidence: Shopify return label instructions; Narvar/Happy Returns emphasize drop-off and return methods. (S2, S7, S8)

- **Feature:** Printerless returns (QR code / no-print label handoff)
  - What it is: provide a QR code that a carrier/drop-off partner scans to print the label at drop-off (or accept as “paperless” handoff).
  - Why merchant admin cares: reduces friction and abandonment; increases return completion; supports “refund on first scan” milestones.
  - Stealable workflow:
    - 1) Generate return label + printerless token (QR code).
    - 2) Show QR in portal + email/SMS.
    - 3) Record “drop-off scanned” event from partner.
  - Thin slice (1–3 days): QR code display + manual “drop-off scanned” event (no partner API) + store in return timeline.
  - Evidence: AfterShip docs explicitly describe printerless return labels with QR code; Happy Returns positions QR-based flows. (S160, S161)

- **Feature:** Boxless / label-free drop-off returns with consolidated shipping
  - What it is: customer drops item off without printing or packaging; partner consolidates multiple returns into bulk shipments to merchant.
  - Why merchant admin cares: lowers shipping/handling cost; improves speed; changes warehouse receiving flow (scan + manifest vs individual parcels).
  - Stealable workflow:
    - 1) Offer “boxless drop-off” method for eligible items/regions.
    - 2) Capture drop-off event + expected consolidation window.
    - 3) Receive consolidated shipment manifest at DC; match items to RMAs.
  - Thin slice (1–3 days): “drop-off method” option + manual manifest import (CSV) to mark multiple RMAs as “in transit”.
  - Evidence: Happy Returns drop-off model and “ship faster” FAQs describe boxless and QR-based returns; Happy Returns Return Bar positioning. (S161, S8)

- **Feature:** Return methods: mail, in-store, drop-off network, pickup
  - What it is: multiple return options (ship back, store drop-off, carrier pickup, return bars).
  - Why merchant admin cares: improves CX and conversion; supports omnichannel; reduces cost via consolidation.
  - Stealable workflow:
    - 1) Offer eligible methods by address/region and item type.
    - 2) Provide instructions/QR/label.
    - 3) Track handoff event (scan/drop-off/pickup).
  - Thin slice (1–3 days): mail + in-store drop-off option with manual confirmation.
  - Evidence: Happy Returns “Return Bar” drop-off; Narvar returns options; Shopify docs. (S8, S7, S1)

- **Feature:** “Refund at first scan” / event-driven refunds (scan → refund triggered)
  - What it is: trigger refund when item hits a milestone (carrier scan, drop-off scan, received).
  - Why merchant admin cares: faster CX; reduces tickets; controllable risk via policy.
  - Stealable workflow:
    - 1) Configure refund trigger milestone by customer segment/risk.
    - 2) Receive tracking event.
    - 3) Auto-refund + notify.
  - Thin slice (1–3 days): refund-on-received with manual “mark received” button.
  - Evidence: Happy Returns network emphasizes scan/drop-off and consolidated processing; Narvar supports returns event handling. (S8, S7)

- **Feature:** Auto-refunds rules (conditions, safeguards, audit trail)
  - What it is: a rules engine to automatically trigger refunds based on events (scan/received), thresholds, and eligibility conditions, with logs/auditability.
  - Why merchant admin cares: cuts manual workload; makes refunds consistent; reduces SLA misses; still enables guardrails (risk, order value, exceptions).
  - Stealable workflow:
    - 1) Configure auto-refund rules (event trigger + conditions + amount limits).
    - 2) On event, evaluate rules and execute refund action.
    - 3) Log decision + allow agent override/rollback.
  - Thin slice (1–3 days): single rule “refund on received” with amount threshold + audit log entry per execution.
  - Evidence: AfterShip provides explicit “set up auto refunds” guidance; ties to event-driven refunds. (S166, S4)

- **Feature:** Return routing rules (warehouse selection, regional hubs, consolidation)
  - What it is: route returns to the best location (closest DC, refurb partner, store) and consolidate where possible.
  - Why merchant admin cares: lowers shipping cost; speeds processing; improves recovery value.
  - Stealable workflow:
    - 1) Define routing by SKU/category/condition/geo.
    - 2) Assign return destination on initiation.
    - 3) Generate label/drop-off instructions accordingly.
  - Thin slice (1–3 days): route by country/state to one of N warehouses + destination shown in ops UI.
  - Evidence: Happy Returns consolidation model; Narvar enterprise returns routing. (S8, S7)

- **Feature:** Approval workflow (auto-approve vs manual review; approve/deny with reasons)
  - What it is: configurable approvals with agent actions; supports deny/exception and auditability.
  - Why merchant admin cares: reduces fraud; handles edge cases; maintains compliance for restricted items.
  - Stealable workflow:
    - 1) Auto-approve low-risk, eligible returns.
    - 2) Queue high-risk returns for review.
    - 3) Approve/deny with templated comms.
  - Thin slice (1–3 days): manual review queue + approve/deny + templated email.
  - Evidence: Shopify admin return workflow; AfterShip automation & conditions. (S1, S4)

- **Feature:** Inspection & disposition (restock, refurb, destroy, keep-inventory-out)
  - What it is: record condition upon receipt and decide disposition; sync inventory updates.
  - Why merchant admin cares: increases recovery value; improves inventory accuracy; enables vendor accountability.
  - Stealable workflow:
    - 1) Mark return received + condition.
    - 2) Choose disposition (restock/refurb/destroy).
    - 3) Trigger refund/exchange completion.
  - Thin slice (1–3 days): received + condition flag + restock location selection.
  - Evidence: Shopify “process return” steps include handling returned items; enterprise returns flows commonly include inspection. (S1)

- **Feature:** Fees: restocking fee + return shipping fee + exceptions
  - What it is: apply fees by policy (category, reason, method) with override capability.
  - Why merchant admin cares: protects margin; discourages abuse; keeps policies consistent.
  - Stealable workflow:
    - 1) Configure fee rules.
    - 2) Show fee impact at portal before submit.
    - 3) Allow agent override per return.
  - Thin slice (1–3 days): restocking fee as percentage + admin override field.
  - Evidence: Returns platforms commonly support policy-driven fees; Shopify supports return/refund accounting primitives. (S1, S4)

- **Feature:** Notifications & comms (status updates, SLA expectations, self-serve tracking)
  - What it is: customer notifications across key milestones; merchant-facing dashboards for WISMR reduction.
  - Why merchant admin cares: fewer tickets; higher trust; lower dispute rate.
  - Stealable workflow:
    - 1) Trigger comms at “requested/approved/label issued/in transit/received/refunded”.
    - 2) Provide portal link for status.
    - 3) Escalate exceptions to support queue.
  - Thin slice (1–3 days): email updates on “requested” + “refunded” + portal status page.
  - Evidence: AfterShip markets branded returns pages + notifications; Shopify provides return processing steps. (S4, S1)

- **Feature:** Returns exceptions handling (lost-in-transit, partial receipt, damaged, late)
  - What it is: workflows to resolve exceptions (missing item, late beyond window, carrier claims).
  - Why merchant admin cares: prevents leakage; reduces manual chaos; supports carrier dispute workflows.
  - Stealable workflow:
    - 1) Detect exception (no scan after N days / mismatch on receipt).
    - 2) Auto-create task for agent + customer comms.
    - 3) Resolve with partial refund / deny / claim.
  - Thin slice (1–3 days): “no scan after N days” alert + manual resolution status.
  - Evidence: Returns platforms position operational control and tracking; enterprise solutions include exception management. (S4, S7)

- **Feature:** Fraud & abuse controls (risk scoring, gating, identity checks)
  - What it is: detect abusive returners and gate options (receive-first, restocking fees, deny).
  - Why merchant admin cares: reduces return fraud, which is growing and costly; protects revenue.
  - Stealable workflow:
    - 1) Score return risk (history, value, geography, reason patterns).
    - 2) Restrict fast refunds/ship-first for high risk.
    - 3) Route to manual review with notes.
  - Thin slice (1–3 days): simple heuristic risk score + “manual review required” flag + policy gating.
  - Evidence: Reuters report on retailers using AI to detect return fraud; enterprise returns positioning. (S9, S7)

- **Feature:** Returns analytics (reason mix, exchange conversion, cost-to-serve, time-to-refund)
  - What it is: dashboards and exports for returns KPIs.
  - Why merchant admin cares: identifies product issues; improves margin; measures workflow performance.
  - Stealable workflow:
    - 1) Aggregate returns by SKU/reason/channel/geo.
    - 2) Track conversion to exchange/store credit.
    - 3) Monitor cycle times and exceptions.
  - Thin slice (1–3 days): weekly KPI table (CSV) + top return reasons by SKU.
  - Evidence: AfterShip and Narvar market returns insights and operational tooling. (S4, S7)

#### Returns analytics + fraud gating (risk, policies, abuse adjacency) (Tranche #24 — 2025-12-29)

- **Feature:** Returns performance dashboard (cycle times + SLA compliance)
  - What it is: operational dashboard showing time-to-label, time-to-first-scan, time-to-received, time-to-refund, and SLA breach counts.
  - Why merchant admin cares: makes return ops measurable; reduces backlog and “where’s my refund” tickets.
  - Stealable workflow:
    - 1) Define SLA targets (e.g., refund within 5 business days of receipt).
    - 2) Compute cycle-time metrics per return state transition.
    - 3) Show breaches list and drilldown to the return timeline.
  - Thin slice (1–3 days): simple “time-to-received” + “time-to-refund” metrics with a breached-SLA queue.
  - Evidence: Shopify return processing milestones; returns platforms emphasize operational tooling; cycle-time framing aligns to ops control. (S1, S4)

- **Feature:** Reason → SKU/vendor analytics (returns heatmap)
  - What it is: analyze return reasons by SKU/vendor/category, including trends over time and “top offenders.”
  - Why merchant admin cares: identifies product/fit/quality issues and supplier accountability; reduces future returns.
  - Stealable workflow:
    - 1) Aggregate reasons by SKU/vendor.
    - 2) Show top SKUs and trend deltas.
    - 3) Export for merchandising/vendor review.
  - Thin slice (1–3 days): CSV export “returns by SKU + reason” and a top-10 table in admin.
  - Evidence: Returns intake collects reasons; returns tools position insights/analytics. (S1, S4)

- **Feature:** Return method mix + cost-to-serve (mail vs drop-off vs boxless)
  - What it is: compare cost and outcomes by return method (shipping label vs QR drop-off vs boxless consolidation).
  - Why merchant admin cares: optimizes return method offers to reduce cost while preserving CX.
  - Stealable workflow:
    - 1) Tag each return with method and channel.
    - 2) Record cost proxies (label cost, consolidation fees, handling time).
    - 3) Report method mix + unit economics.
  - Thin slice (1–3 days): method mix report + average cycle time by method (no cost modeling).
  - Evidence: Printerless/boxless methods create distinct operational flows; returns platforms explicitly support method variants. (S160, S161, S4)

- **Feature:** Returns exception rate dashboard (no-scan, partial receipt, mismatch)
  - What it is: a dashboard showing exceptions by type and their resolution outcomes (refund/deny/claim).
  - Why merchant admin cares: reduces leakage and manual chaos; surfaces carrier/vendor issues.
  - Stealable workflow:
    - 1) Detect exceptions (e.g., no scan after N days).
    - 2) Track resolution type and time.
    - 3) Report exception rate by carrier/method.
  - Thin slice (1–3 days): one exception type (“no scan after N days”) + queue + export.
  - Evidence: Return tracking and exception management are core returns ops; event-driven refunds depend on scan milestones. (S4, S166)

- **Feature:** Returner profile (history + risk signals + outcomes)
  - What it is: a customer-level profile showing return rate, high-value returns, prior denials, and abuse flags.
  - Why merchant admin cares: speeds manual review; enables consistent policy decisions across agents.
  - Stealable workflow:
    - 1) Aggregate customer return history.
    - 2) Compute simple signals (return frequency, high value, repeated reasons).
    - 3) Show in review queue and allow adding notes/tags.
  - Thin slice (1–3 days): “return count last 90 days” + “total refunded” + internal notes on customer.
  - Evidence: Retailers are investing in return fraud detection/AI; customer history is a standard gating primitive. (S176, S9)

- **Feature:** Return risk score (heuristics-first) + explainability
  - What it is: compute a return-risk score from heuristics (value, frequency, mismatch patterns) and show “why flagged.”
  - Why merchant admin cares: reduces return fraud and speeds review; improves trust by explaining decisions.
  - Stealable workflow:
    - 1) Compute score from configurable heuristics.
    - 2) Store top 3 reasons.
    - 3) Apply gating rules based on score tiers.
  - Thin slice (1–3 days): 8 heuristics + tiered score (low/med/high) + 3 “why” reasons on the return record.
  - Evidence: Return fraud/abuse magnitude supports gating; “AI return fraud” trend supports scoring. (S176, S162)

- **Feature:** Policy gating for “instant” features (refund-at-scan, ship-first exchange)
  - What it is: gate faster resolutions based on risk score, customer segment, order value, and verification status.
  - Why merchant admin cares: protects margin while still delivering high-CX “instant” outcomes for trusted segments.
  - Stealable workflow:
    - 1) Configure eligibility rules (segment + risk + order value).
    - 2) If eligible, enable instant refund/exchange.
    - 3) If not, fall back to receive-first/manual review.
  - Thin slice (1–3 days): one rule “refund at received only if risk != high” + override toggle.
  - Evidence: Auto-refunds and instant programs require safeguards; risk trends justify gating. (S166, S176)

- **Feature:** Identity verification (IDV) as a return gating step
  - What it is: require identity verification for suspicious/high-risk returns or high-value instant refunds.
  - Why merchant admin cares: reduces abuse (stolen accounts, serial returners) without blocking low-risk customers.
  - Stealable workflow:
    - 1) Return is flagged for verification.
    - 2) Customer completes ID verification flow.
    - 3) Verification result gates approval/instant refund.
  - Thin slice (1–3 days): “verification required” state + manual upload/approval (no vendor integration yet).
  - Evidence: ID verification products exist as workflow-style checks; can be used as gating for high-risk flows. (S177, S178)

- **Feature:** Evidence capture (photos / notes) for high-risk returns
  - What it is: collect photos/notes at initiation or at receipt (e.g., damaged claims, wrong item) to support decisions.
  - Why merchant admin cares: reduces false claims; improves dispute handling and vendor/carrier claims.
  - Stealable workflow:
    - 1) If reason requires, prompt for photo upload.
    - 2) Store evidence with the return.
    - 3) Use in approve/deny and disputes/claims workflows.
  - Thin slice (1–3 days): 1 photo upload + agent review field + “evidence present” badge.
  - Evidence: Return reasons and exceptions require proof to resolve consistently; returns ops is policy + proof. (S1, S4)

- **Feature:** Item identity capture (serial/IMEI) + mismatch detection
  - What it is: capture serial/IMEI at shipment and validate on return to prevent “different item returned” fraud.
  - Why merchant admin cares: high impact for electronics; reduces loss and prevents inventory contamination.
  - Stealable workflow:
    - 1) Capture serial on fulfillment (or in product record).
    - 2) On return receipt, scan/enter serial.
    - 3) Flag mismatch and route to review/deny.
  - Thin slice (1–3 days): serial field on return intake + manual mismatch flag; no scanning integration.
  - Evidence: Return/claims abuse includes “wrong item returned” patterns; gating and proof capture are standard controls. (S176)

- **Feature:** Denial + exception outcomes taxonomy (deny reasons + customer messaging)
  - What it is: standardize denial reasons and exception outcomes (late, used, missing items) with templated comms.
  - Why merchant admin cares: consistency, defensibility, and lower agent training burden; reduces escalations.
  - Stealable workflow:
    - 1) Configure deny reason codes.
    - 2) Agent selects reason and adds note.
    - 3) Customer receives templated message + appeal path.
  - Thin slice (1–3 days): deny reason picklist + one email template + audit log entry.
  - Evidence: Returns workflows include approval/deny and exception handling; governance requires reason codes + auditability. (S1, S166)

- **Feature:** Refund leakage audit (over-refunds, duplicate refunds, refunds without receipt)
  - What it is: detect suspicious refund patterns (refund before scan for high risk, duplicate refunds) and report them.
  - Why merchant admin cares: stops margin leakage; catches process bugs and abuse.
  - Stealable workflow:
    - 1) Define anomaly rules.
    - 2) Run daily audit job.
    - 3) Create investigation queue + export.
  - Thin slice (1–3 days): report “refund issued but return not received after N days” with manual resolution status.
  - Evidence: Auto-refunds and instant refunds require safeguards and audit logs. (S166, S176)

- **Feature:** Returns vs chargebacks linkage (risk feedback loop)
  - What it is: link returns outcomes with payment disputes/chargebacks to improve gating policies and training.
  - Why merchant admin cares: reduces future disputes; aligns returns policies with payment risk.
  - Stealable workflow:
    - 1) Associate orders/returns with dispute records.
    - 2) Track whether returns were offered/used before dispute.
    - 3) Use insights to adjust notice windows and gating rules.
  - Thin slice (1–3 days): manual tag “chargeback related” + weekly report on tagged returns.
  - Evidence: Chargeback lifecycles and reason codes exist; disputes are a relevant feedback signal for returns policy. (S78, S81)

- **Feature:** Controlled refunds policy (thresholds, max value, “fast refund” caps)
  - What it is: set limits for auto/instant refunds by amount, category, or customer segment.
  - Why merchant admin cares: prevents outsized losses from abuse; makes policies explicit and auditable.
  - Stealable workflow:
    - 1) Configure thresholds and eligible categories.
    - 2) Apply caps at decision time.
    - 3) Route exceeded cases to manual review.
  - Thin slice (1–3 days): single global cap ($X) for auto-refunds + “manual review required” fallback.
  - Evidence: Returns abuse magnitude supports thresholds; auto-refunds require rule-based safeguards. (S176, S166)

- **Feature:** Analyst workbench (saved views + bulk actions for risk ops)
  - What it is: a queue/workbench for return-fraud analysts with filters, saved views, and bulk actions (require IDV, deny, switch to receive-first).
  - Why merchant admin cares: enables program-level operations (not one-off casework); scales policy enforcement.
  - Stealable workflow:
    - 1) Filter returns by risk tier and value.
    - 2) Save view and share deep link.
    - 3) Apply bulk action with audit log.
  - Thin slice (1–3 days): one “high risk returns” saved view + bulk action “require manual review” (no other bulk ops).
  - Evidence: Bulk operations and queue-based work are necessary in ops domains; audit logs and saved views reduce repeated work. (S171, S65)

### Platform primitives

- **Feature:** Workflow automation hooks (triggers + actions)
  - Job to be done: automate ops actions (“when X happens, do Y”).
  - Why high leverage: unlocks lots of value without bespoke coding.
  - Complexity guess: M
  - Dependencies (data/integrations): events, job runner, connectors
  - Competitors known for it: Zapier, Make, n8n
  - OSS options (if any): n8n (license verify)

- **Feature:** Search indexing pipeline (reliable + incremental)
  - Job to be done: keep search/personalization data fresh.
  - Why high leverage: powers CRO features.
  - Complexity guess: M
  - Dependencies (data/integrations): jobs, DB triggers, search engine
  - Competitors known for it: Algolia stacks
  - OSS options (if any): Meilisearch/Typesense + custom pipeline
