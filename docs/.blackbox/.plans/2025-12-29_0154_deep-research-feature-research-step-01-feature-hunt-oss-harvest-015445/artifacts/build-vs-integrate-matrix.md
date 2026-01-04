---
status: active
last_reviewed: 2025-12-30
owner: agent
---

# Build vs Integrate Matrix (Shopify API vs OSS vs Custom)

Legend:

- **🛍️ Shopify API:** use Shopify Admin API primitives as source-of-truth
- **🔌 3P API:** specialist API (tracking/labels/SMS/IDV/etc.)
- **🧰 OSS:** self-host / embed generic primitives
- **🧑‍💻 Build:** custom UX + policies + derived state

## Tranche #1 — Returns / Exchanges / RMA automation

Assumption: Shopify is connected; we should avoid duplicating commerce truth.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Return initiation portal (lookup → item selection → resolution) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: Shopify Order/Return; Derived: “portal session”, reason metadata, ops notes | Build hosted portal + call Shopify `returnCreate` when submitted | S1, S4, S7, S8, S202 |
| Eligibility rules (window, tags, final sale) | 🧑‍💻 Build | Derived: eligibility decision + rule version | Hardcode 2–3 rules + show ineligible reason UI | S1 |
| Structured reasons taxonomy + exports | 🧑‍💻 Build | Derived: reason/subreason + notes/photos | Configurable reasons + CSV export by SKU/reason | S1, S4 |
| Resolution chooser (refund vs exchange vs store credit) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: refund/return in Shopify; Derived: “recommended resolution” | Offer refund vs store credit; on selection call refund/gift card primitives | S4, S7, S200, S201 |
| Refund execution (partial/line item) | 🛍️ Shopify API | Truth: Refund in Shopify; Derived: internal “refund request” + audit notes | Admin button “Issue refund” that executes `refundCreate` | S200 |
| Store credit issuance (bonus/expiry) | 🛍️ Shopify API (gift cards) + 🧑‍💻 Build | Truth: GiftCard in Shopify; Derived: “credit program rules” | Issue a gift card as store credit; track bonus logic in app | S201 |
| Any-to-any exchange (swap to different SKU + delta) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: order/return; Derived: “exchange cart” + delta settlement | Support exchange selection + “credit-only delta” (no split tender) | S6, S4, S1, S202 |
| Ship-first exchanges (deposit/hold, release on scan) | 🔌 3P API (payments/hold) + 🧑‍💻 Build | Truth: return + refund; Derived: deposit state machine | Manual “deposit required” flag + ops capture/release buttons | S165 |
| Return labels (generate + tracking) | 🔌 3P API (labels) + 🧑‍💻 Build | Truth: label/tracking in 3P; Derived: label URL + tracking stored on return record | Generate PDF label via EasyPost (or similar) + show download link | S2, S16, S18 |
| Printerless / QR code drop-off returns | 🔌 3P API (network) + 🧑‍💻 Build | Truth: drop-off events in 3P; Derived: “drop-off token” | Pilot QR generation + store token + show “drop-off instructions” | S160, S161 |
| Instant refunds / financed returns | 🔌 3P API (financing) + 🧑‍💻 Build | Truth: refund in Shopify; Derived: eligibility + financing settlement | Implement eligibility flag + manual approval (no financing integration yet) | S163, S164 |
| Returns status timeline (requested → label → in transit → received → refunded) | 🧑‍💻 Build + 🛍️ Shopify API + 🔌 3P API | Truth: Return in Shopify; Derived: event timeline (carrier scans) | Event timeline UI fed by tracking webhooks + Shopify return state | S202, S179, S182 |
| Returns analytics (reason rates, refund leakage) | 🧑‍💻 Build + 🧰 OSS (analytics stack) | Derived: metric tables + dashboards | Start with daily rollups: return rate, reasons, refund $; store in DB | S176, S196, S197, S198 |

Notes:

- “Returns portal” is mostly **our UX + policy**, but execution should land in Shopify primitives whenever possible (Return/Refund/GiftCard). (S200–S202)
- Logistics edges (labels, tracking, QR drop-off) are best treated as **3P network APIs** (carrier coverage + events) rather than reinventing. (S16–S19, S179–S186)

## Tranche #2 — Shipping / Delivery exceptions

Assumption: Shopify is connected; Shopify is truth for fulfillment + tracking numbers, but carrier scan events usually require 3P tracking APIs/webhooks.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Tracking capture/edit (tracking code + carrier) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: Shopify Fulfillment/tracking; Derived: validation errors + audit notes | Admin form that calls `fulfillmentCreateV2`/update path; store “last editor” | S203, S205 |
| Bulk tracking import (CSV) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: Shopify Fulfillment; Derived: import job + row errors | CSV upload → validate → call Shopify mutations; produce error report | S205, S203 |
| Canonical shipment status model (carrier → in_transit/out_for_delivery/delivered/exception) | 🧑‍💻 Build | Derived: canonical_status + substatus + timestamps | Implement 6–8 canonical statuses + mapping table | S14, S19 |
| Tracking event ingestion via webhooks | 🔌 3P API + 🧑‍💻 Build | Truth: carrier scans in 3P; Derived: internal event log + last status | Webhook endpoint + store last status + “raw payload” view | S18, S182, S185 |
| Webhook delivery visibility (debugging console) | 🧑‍💻 Build + 🛍️ Shopify API (webhook config) | Derived: delivery attempts, last error, last success | “Webhook deliveries” page + filters; show Shopify webhook subscriptions list | S186, S206 |
| Proactive shipping notifications (first scan, out-for-delivery, exception, delivered) | 🧑‍💻 Build | Derived: notification send log + suppression state | Send 3 templates driven by canonical statuses + per-order opt-out toggle | S15, S14 |
| Delivery exception inbox (exception / failed attempt / no scan) | 🧑‍💻 Build | Derived: exception cases + SLA + assignments | Queue view + manual resolve + notes + “next step” picklist | S14, S19 |
| “No scan / stalled” detection rules | 🧑‍💻 Build | Derived: scan_gap_hours + stalled flag + policy version | Daily job computes “hours since last checkpoint” + escalates to queue | S14, S179 |
| Failed delivery attempt handling (NDR) | 🧑‍💻 Build | Derived: attempt_fail case + next-action + reminders | Detect AttemptFail → create case → send customer “action required” email | S14, S19 |
| Address verification + correction loop | 🔌 3P API + 🧑‍💻 Build | Truth: verified address result; Derived: “needs confirmation” case | Verify address + email secure correction link + manual reship button | S17 |
| Fulfillment holds for exceptions (fraud/inventory/address) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: FulfillmentHold in Shopify; Derived: hold reason mapping + queue | “Hold fulfillment” / “Release hold” buttons + filter view | S207, S208, S209 |
| Shipment timeline (scan events + internal notes) | 🧑‍💻 Build | Derived: combined timeline + “copy summary” output | Timeline UI + notes + copy-to-clipboard summary | S16, S18 |
| Branded tracking page / self-serve WISMO | 🧑‍💻 Build (optionally 🔌 3P) | Derived: public tracking view model | Simple branded page with latest status + “report issue” CTA | S183, S47 |
| ETA / “promise date” messaging based on scans | 🧑‍💻 Build | Derived: ETA bucket + confidence | Display ETA bucket (on-track/delayed/exception) from canonical status + last scan age | S14, S19 |
| Lost package playbook (investigate → reship/refund) | 🧑‍💻 Build + 🛍️ Shopify API (refund) | Truth: refund in Shopify if issued; Derived: investigation case + cost attribution | “Mark lost” → choose resolution → execute `refundCreate` if refund | S14, S200 |
| Return-to-sender detection and bridge to returns | 🧑‍💻 Build + 🛍️ Shopify API | Truth: Return in Shopify (if created); Derived: RTS case linking shipment+order | Detect RTS checkpoint → create case → optional Shopify return flow | S14, S202 |
| Carrier claim tracker (attachments + reference IDs) | 🧑‍💻 Build | Derived: claim record + status + docs | Claim record with uploads + reference ID (no carrier API integration) | S16 |
| Shipping exception analytics (rates by carrier/service/region) | 🧑‍💻 Build + 🧰 OSS (analytics stack) | Derived: metric tables + dashboards | Daily rollup table: exception rate + time-to-deliver + export | S14, S196, S197 |

Notes:

- Shopify gives you fulfillment primitives; the “hard part” is **carrier event coverage + ops UX** (exceptions, playbooks, comms, analytics). (S203–S205, S14, S19)
- Use 3P tracking webhooks for scan events (then store a derived canonical status) to avoid polling and to make exception rules reliable. (S18, S182, S185)
- Consolidation note: Tranche #25 contains the “v2 refresh” extensions (scan-gap timers, claims playbooks, tracking page v2, and deeper delivery diagnostics). Treat Tranche #2 as the foundation and Tranche #25 as extensions. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #5 — Analytics & QA (foundation: support ops + QA program)

Assumption: merchants often use support platforms (Zendesk/Gorgias/Intercom); Shopify is an input (orders/customers) but not the system-of-record for tickets.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Metrics dictionary (definitions + formulas) | 🧑‍💻 Build | Derived: metric definitions + versions | Dictionary page for 5 KPIs + “how calculated” tooltips | S37, S40 |
| Agent performance dashboard (volume, reply/resolution times) | 🧑‍💻 Build + 🔌 3P API | Truth: tickets + events in support platform; Derived: computed KPIs | Pull 1 platform feed → compute 3 KPIs → dashboard + drilldown list | S38, S40 |
| Queue health (backlog + aging + SLA risk) | 🧑‍💻 Build + 🔌 3P API | Truth: ticket queue/view; Derived: aging buckets + SLA risk flags | Backlog + aging buckets per queue + “at risk” count | S36, S35 |
| CSAT collection + storage | 🔌 3P API (if using Zendesk/etc.) OR 🧑‍💻 Build (if first-party inbox) | Truth: rating object; Derived: DSAT reason tags + recovery outcomes | 2-choice rating + comment → attach to ticket and agent | S39 |
| DSAT escalation rules | 🧑‍💻 Build | Derived: escalation task + root-cause tag | DSAT triggers internal task + required root-cause tag | S39 |
| SLA compliance reporting | 🧑‍💻 Build + 🔌 3P API | Truth: SLA policy + ticket timestamps; Derived: met/breached rollups | “% met” table by queue + agent | S35 |
| Contact reason taxonomy analytics | 🧑‍💻 Build | Derived: tag taxonomy + reporting tables | Require “primary reason tag” at close + top tags leaderboard | S34, S36 |
| Macro usage analytics | 🧑‍💻 Build + 🔌 3P API (if macros live in support platform) | Derived: macro execution events + outcome joins | Log macro usage + compute top macros + outcome deltas | S30 |
| QA rubric builder | 🧑‍💻 Build | Derived: rubric versions + criteria weights | 1 rubric with 5 criteria + scoring scale + notes | S41 |
| QA sampling rules | 🧑‍💻 Build | Derived: sampling rule + generated review queue | Weekly random sampler + QA review queue | S41 |
| QA evaluation workflow (score + feedback) | 🧑‍💻 Build | Derived: evaluation records linked to ticket + agent | QA evaluation form + notify agent + mark complete | S41 |
| Calibration sessions (grader alignment) | 🧑‍💻 Build | Derived: calibration set + score variance report | Create calibration set + compare variance report | S41 |
| Coaching plans (actions from QA findings) | 🧑‍💻 Build | Derived: coaching tasks + completion status | Coaching task list per agent + due dates | S41 |
| Combined speed + quality scorecard | 🧑‍💻 Build | Derived: merged KPI tables | Combined table: first reply + QA score + CSAT | S38, S41 |
| “Single pane of glass” joins (support ↔ orders ↔ shipments) | 🧑‍💻 Build + 🛍️ Shopify API + 🔌 3P APIs | Truth: Shopify orders/fulfillments; Truth: support tickets; Derived: joined views | Join support ticket → Shopify order → shipment status for drilldowns | S203, S205, S14, S38 |
| Analytics infra (metric tables, semantic layer, BI dashboards) | 🧑‍💻 Build + 🧰 OSS | Derived: warehouse tables + metrics definitions + dashboards | Start with one rollup table + one dashboard + scheduled refresh | S196, S197 |

Notes:

- Treat analytics as “webhooks/APIs → our DB → dashboards”: keep upstream truth in Shopify/support tools, and store **derived metrics** internally for speed and customization.
- OSS is most valuable for horizontal analytics plumbing (semantic layer, transformations, dashboards), not for domain QA workflows.

## Tranche #8 — Security & compliance

Assumption: this is our app’s control plane (multi-tenant). Shopify is not an identity provider for our app users; Shopify is a data source. Prefer “buy/OSS identity primitives” and “build the product surfaces”.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| RBAC roles + permissions (tenant-level) | 🧰 OSS (authz) + 🧑‍💻 Build | Truth: roles/assignments; Derived: permission evaluation logs | 4 fixed roles + enforce 10 actions using OPA/OpenFGA checks | S61, S62 |
| Fine-grained authorization (resource scoping) | 🧰 OSS (OpenFGA) + 🧑‍💻 Build | Truth: relationship tuples; Derived: “why denied” messages | Scope 1 resource type (e.g., locations) + check API + UI gating | S62 |
| Staff/user management (invite, deactivate, role change) | 🧑‍💻 Build + (identity system) | Truth: users + membership; Derived: invitation events | Minimal staff list + invite + deactivate + role assignment | S60 |
| Enforce MFA / 2FA | 🔌 3P IdP (Okta/Entra/Auth0) OR 🧰 OSS IdP (Keycloak) | Truth: MFA enrollment in IdP; Derived: enforcement policy flags | “Require MFA” setting + block login until satisfied (IdP-enforced) | S60, S58 |
| Session management (active sessions, revoke) | 🔌 3P IdP OR 🧰 OSS IdP | Truth: sessions in IdP; Derived: recent activity | “Revoke all sessions” button integrated with IdP | S60 |
| SSO (SAML/OIDC) | 🔌 3P IdP OR 🧰 OSS IdP (Keycloak) | Truth: IdP config; Derived: mapping to tenant | SAML setup screen + test flow + “SSO required” toggle | S58, S60 |
| SCIM provisioning | 🔌 3P IdP (Entra/Okta) OR 🧰 OSS IdP | Truth: provisioning events; Derived: group→role mapping | SCIM endpoint + token + single group→role mapping | S59 |
| Audit log (who did what, when, from where) | 🧑‍💻 Build | Truth: append-only audit events | Log 20 action types + filters + CSV export | S65 |
| Approvals (two-person rule) for risky actions | 🧑‍💻 Build | Truth: approval requests + decisions | Approvals for 3 actions + notifications + audit events | S65 |
| API keys management (scopes, rotation, expiry) | 🧑‍💻 Build | Truth: keys (hashed) + scopes; Derived: last_used_at | Create/revoke keys + show last used + 5 scope groups | S63 |
| Webhook security (signatures, replay protection, rotation) | 🧑‍💻 Build | Truth: webhook secret versions; Derived: verification failures log | HMAC signature + timestamp header + rotate secrets + verification snippet | S64 |
| Data retention + export controls (logs/PII) | 🧑‍💻 Build | Truth: retention policies; Derived: export audit trail | Retention setting for audit log + “export” action logged | S63 |
| Security posture checklist | 🧑‍💻 Build | Derived: computed checks | 10 posture checks + deep links + completion tracking | S63 |

Notes:

- Don’t build an IdP from scratch: use an IdP (hosted or OSS) for SSO/MFA/session lifecycle, and focus custom build on RBAC UI, audit log UX, approvals, and posture reporting.
- Authorization policy evaluation is a strong OSS leverage point (OPA/OpenFGA) because it reduces “homegrown authz” risk.

## Tranche #17 — Observability (logs, traces, alerts, SLOs)

Assumption: this is horizontal infrastructure; leverage OSS standards (OpenTelemetry/Prometheus/Grafana) and build only the minimal internal “ops surfaces” that are product-relevant (webhook deliveries, integration health, runbooks).

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Standardized telemetry context (trace_id/request_id/tenant/entity IDs) | 🧰 OSS (OpenTelemetry) + 🧑‍💻 Build | Derived: correlation fields in logs/spans | Add request_id + tenant_id + order_id fields in logs for 1–2 services | S113, S114 |
| Log ingestion + retention controls | 🧰 OSS (OTel Collector + log store) | Truth: logs in log backend; Derived: retention config | Ingest JSON logs from one service + retain 7 days | S113, S117 |
| Log search + saved queries | 🧰 OSS (Loki/Grafana) OR hosted + 🧑‍💻 Build (saved “playbooks”) | Derived: saved searches + runbook links | 5 saved searches pinned (service/env/severity) + shareable links | S117 |
| Trace explorer (trace_id lookup) | 🧰 OSS (Tempo/Jaeger) OR hosted | Truth: traces in tracing backend | Enable trace collection + simple lookup flow via trace_id | S119, S113 |
| Service dependency map | 🧰 OSS (trace backend UI) OR hosted | Derived: dependency graph from traces | Static dependency list + link to trace search | S119 |
| Semantic attributes standard + linting | 🧰 OSS (OTel conventions) + 🧑‍💻 Build | Derived: attribute registry + lint results | Define 20 required attributes + simple lint check in CI | S114 |
| Golden-signal dashboards | 🧰 OSS (Prometheus/Grafana) OR hosted | Derived: dashboard definitions | One dashboard for one API: rps, p95, error rate | S115, S86 |
| Alert rules + routing (silences, grouping) | 🧰 OSS (Alertmanager) OR hosted | Derived: alert definitions + routing rules | One alert (error rate) + route to Slack/email + silence UI link | S116, S115 |
| Incident intake + timeline | 🧑‍💻 Build (light) + 🧰 OSS/hosted | Truth: incidents in incident tool; Derived: internal incident notes | Minimal incident record + link out to on-call tool + runbook link | S122 |
| SLO definitions + compliance widgets | 🧰 OSS (SLO tooling) OR custom light | Derived: SLO config + compliance time series | 1 SLO + compliance widget on dashboard | S121 |
| Error budget + burn-rate alerts | 🧰 OSS/hosted (SLO tooling) | Derived: burn rate calculations | Burn-rate alert for 1 SLO | S121 |
| Release markers / deploy annotations | 🧑‍💻 Build (light) + 🧰 OSS dashboards | Derived: deploy events table | Manual “release marker” creation + overlay via dashboard annotation | S120 |
| Error tracking inbox (grouping + assignment) | 🔌 Hosted (Sentry) OR 🧰 OSS | Truth: issues in error tracker | Enable SDK + triage inbox + assign owner | S120 |
| PII redaction + allowlist | 🧰 OSS (collector pipeline) + 🧑‍💻 Build (policy UI) | Derived: redaction rules | Redact 5 fields at collector/ingest layer | S113, S117 |
| Sampling controls (logs/traces) | 🧰 OSS (OTel pipeline) | Derived: sampling policy + effective rate | Sample 10% of non-error traces; 100% error traces | S113, S118 |
| Runbooks linked to alerts | 🧑‍💻 Build | Derived: runbook links + steps | Add runbook URL + steps to 5 alert types | S122, S116 |
| Synthetic uptime checks | 🧰 OSS/hosted | Derived: check config + results | 1 uptime check for webhook endpoint + alert | S115, S121 |

Notes:

- Prefer OSS standards for instrumentation/collection; product differentiation is “operational UX” around integrations (webhook delivery logs, retries, policy gates) rather than reinventing observability stacks.
- If we need a fast thin slice, start by emitting consistent request/tenant IDs and wiring dashboards/alerts from a minimal metrics set.

## Tranche #23 — Subscription ops (swap/skip/pause, renewals, retries)

Assumption: Shopify is connected. Subscriptions may be:

- **Shopify-native (contracts)** → Shopify subscription contracts + billing attempts are truth. (S221–S227)
- **Subscription app/provider-managed (Recharge/Appstle/Skio/etc.)** → provider contracts are truth; build the same UX patterns against provider APIs. (S172–S175)
- **B2B billing-provider-led** (quotes/invoices/account hierarchy/entitlements) → treat billing provider as truth; see **Tranche #26** for the B2B-specific workflow slices. (S187–S193)

This tranche focuses on **consumer subscription portal + retention ops** (skip/pause/swap, cutoffs, dunning, cancellation offers) and the joined admin UX, not invoicing.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Upcoming order preview (read-only portal) | 🧑‍💻 Build + 🛍️ Shopify API OR 🔌 subscription provider | Truth: contract upstream (Shopify or provider); Derived: portal session + cached view model | “Next order” read-only view for Shopify contracts first | S221, S222, S172 |
| Skip next cycle (with cutoff) | 🧑‍💻 Build + 🛍️ Shopify API OR 🔌 subscription provider | Truth: contract schedule upstream; Derived: cutoff enforcement + audit notes | “Skip next” action with 24h cutoff + audit event | S223, S172 |
| Pause subscription (N cycles / until date) | 🧑‍💻 Build + 🛍️ Shopify API OR 🔌 subscription provider | Truth: contract state/schedule upstream; Derived: pause policy + resume reminders | Pause for 1/2/3 cycles + admin “resume now” | S223, S168, S172 |
| Reactivation / resume | 🧑‍💻 Build + 🛍️ Shopify API OR 🔌 subscription provider | Truth: contract state upstream; Derived: reason codes + winback notes | Admin-only “resume now” for paused subscriptions | S223, S169, S172 |
| Swap product/variant in next order | 🧑‍💻 Build + 🛍️ Shopify API (draft) OR 🔌 provider API | Truth: contract items upstream; Derived: allowed swap sets | Variant swap for next order only (no price delta) | S227, S170, S172 |
| One-time add-on to next order | 🧑‍💻 Build + 🛍️ Shopify API (draft) OR 🔌 provider API | Truth: draft/commit upstream; Derived: add-on catalog | Add 1 add-on SKU to next order via draft update/commit | S227, S172 |
| Change cadence (monthly vs every-2-months) | 🧑‍💻 Build + 🛍️ Shopify API OR 🔌 provider | Truth: contract billing policy/schedule upstream; Derived: policy constraints | Two cadence options + update + confirmation | S223, S167, S172 |
| Address + shipping method update w/ cutoff | 🧑‍💻 Build + 🛍️ Shopify API | Truth: shipping address on contract; Derived: cutoff logic | Address edit with cutoff + audit log entry | S223, S60 |
| Payment failure queue (“past due”) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: billing attempts in Shopify; Derived: recovery case + status | List failed billing attempts + “contact customer” macro | S225, S226 |
| Dunning + retry schedule | 🧑‍💻 Build + 🛍️ Shopify API + 🧰 OSS (queues) | Truth: attempt outcomes in Shopify; Derived: retry policy + timers + outreach log | 3-step retry schedule + “suspended” state + admin override | S225, S226, S229 |
| Cancellation flow with save offers | 🧑‍💻 Build + 🛍️ Shopify API | Truth: cancellation in Shopify; Derived: reason codes + offer variants | Reason required + offer “pause for 2 cycles” before cancel | S224, S175, S172 |
| Price change policy (grandfathering vs renewal) | 🧑‍💻 Build | Derived: policy + cohort list + notification log | “effective on next renewal” flag + export of impacted subscribers | S167, S76 |
| Bulk subscription migration (plan/cadence/price) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: contracts in Shopify; Derived: batch job + dry-run results | CSV dry-run + execute job to update contracts | S222, S223, S171 |
| Subscription segmentation + saved views | 🧑‍💻 Build | Derived: saved filters/segments | Filters + saved views + CSV export | S171, S167 |
| Admin override tools (move next date, goodwill credit, notes) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: contract updates; Derived: override reason/audit | “Move next date by X days” + internal note + audit entry | S223, S65 |
| Merchant “mode” configuration (Shopify contracts vs provider) | 🧑‍💻 Build | Truth: selected mode per merchant; Derived: health/status | Toggle mode + show “source of truth” badge in UI | S228, S172 |
| Backfills + run history for subscription ingestion | 🧑‍💻 Build + 🛍️ Shopify API + 🧰 OSS jobs | Truth: contracts upstream; Derived: ingestion cursor + run logs | One backfill job + run history table with last error | S211, S229, S222 |

Notes:

- If the merchant’s subscriptions are managed by a subscription app/provider, treat that provider as truth and mirror the same UX patterns; don’t create a second subscription system-of-record. (S228, S172–S175)
- For B2B billing (quotes/invoices/account hierarchy/entitlements), avoid “bolting invoicing onto subscription ops”; treat billing provider as truth and implement those slices under **Tranche #26**. (S187–S193)
- The “hard part” is cutoff enforcement + safe scheduling + audit; use OSS queue/workflow primitives for reminders/retries, but keep subscription truth in the upstream contract system. (S229, S65, S221–S227)

## Tranche #15 — Approvals & tasks

Assumption: this is our internal ops execution backbone. Build the product UX and data model; use OSS for durable execution (jobs/queues/workflows) and use 3P comms APIs where necessary.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Unified task object (assignee, due date, status, priority) | 🧑‍💻 Build | Truth: tasks + comments; Derived: computed SLA/overdue flags | CRUD tasks + 4 statuses + due date + assignee | S101, S104 |
| Task views (My tasks, Unassigned, Due today, Overdue) | 🧑‍💻 Build | Derived: saved filters/views | 4 default views + filters + search | S36, S104 |
| Task templates / playbook checklists | 🧑‍💻 Build | Truth: templates + checklist steps | Checklist steps + template library + “create from template” | S102 |
| Contextual task creation (from order/return/shipment/etc.) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: tasks; Truth: Shopify objects; Derived: tags + deep links | “Create task” button on 2 entities + auto-tags + deep links | S104, S210 |
| Approval request object (approver + reason + state) | 🧑‍💻 Build | Truth: approval requests + decisions | Approvals for 3 actions + approve/deny with reason + audit events | S65, S102 |
| Approval inbox (pending approvals queue) | 🧑‍💻 Build | Derived: queue filters + reminders | Pending approvals view + due dates + reminders | S35, S36 |
| Approve/deny from notifications | 🧑‍💻 Build + 🔌 3P comms | Truth: approval decision; Derived: signed deep links | Email approve/deny links with auth gate | S105 |
| Escalations and reminders (overdue) | 🧰 OSS (scheduler/queues) + 🧑‍💻 Build | Derived: escalation timers + notifications log | Daily job marks overdue + sends reminder + escalates after N hours | S35, S55 |
| Audit trail for tasks/approvals | 🧑‍💻 Build | Truth: append-only events | Event log per record + filters + CSV export | S65 |
| Kanban board (optional) | 🧑‍💻 Build | Derived: board UI over task statuses | 3-column board + drag/drop status update | S104 |
| Durable execution for automations (timers/retries) | 🧰 OSS | Derived: job state + retries | Use Temporal/BullMQ for 1 scheduled reminder + retries | S55, S229 |

Notes:

- Build the “what operators touch” (tasks, approvals, audit, views). Use OSS for “what runs reliably in the background” (timers, retries, scheduled escalations).
- For approvals via notifications, deep links must be signed and gated; treat comms delivery as 3P. (S105)

## Tranche #24 — Returns analytics + fraud gating

Assumption: Shopify is connected; Shopify is truth for returns/refunds. We build a risk/policy layer + analyst workbench, and optionally integrate 3P IDV.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Returns performance dashboard (cycle times + SLA) | 🧑‍💻 Build + 🧰 OSS analytics | Derived: cycle time rollups + SLA breach queue | Compute time-to-received + time-to-refund + breached queue | S1, S4, S196 |
| Reason → SKU/vendor analytics | 🧑‍💻 Build + 🧰 OSS analytics | Derived: reason/SKU rollups | CSV export returns by SKU + reason + top-10 table | S1, S4 |
| Method mix reporting (mail vs drop-off vs boxless) | 🧑‍💻 Build | Derived: return method tags + cycle times | Method mix report + avg cycle time by method | S160, S161, S4 |
| Returns exception detection (no-scan, mismatch) | 🧑‍💻 Build + 🔌 3P tracking | Derived: exception cases + resolution outcomes | “No scan after N days” detector + queue + export | S166, S179 |
| Returner profile (history + outcomes) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: customer/orders in Shopify; Derived: return history metrics | Return count last 90 days + total refunded + internal notes | S176, S210 |
| Return risk score (heuristics-first) + explainability | 🧑‍💻 Build | Derived: score + top reasons | 8 heuristics → low/med/high + “why” reasons on return record | S176, S65 |
| Policy gating for instant features (refund-at-scan/ship-first) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: return/refund in Shopify; Derived: eligibility decisions | One rule: “fast refund disabled if risk=high” + override toggle | S166, S202, S200 |
| ID verification gating (IDV) | 🔌 3P API + 🧑‍💻 Build | Truth: verification outcome in IDV provider; Derived: gating state | “verification required” state + manual approve (then integrate vendor) | S177, S178 |
| Evidence capture (photos/notes) | 🧑‍💻 Build | Truth: evidence attachments | Require 1 photo for select reasons + “evidence present” badge | S1, S4 |
| Item identity capture (serial/IMEI) + mismatch | 🧑‍💻 Build | Derived: serial fields + mismatch flags | Serial field + manual mismatch flag + route to review | S176 |
| Denial + outcomes taxonomy (deny reasons + customer messaging) | 🧑‍💻 Build | Truth: deny reason codes + comms log | Deny reason picklist + one template + audit entry | S1, S166, S65 |
| Refund leakage audit (refund w/o receipt, duplicates) | 🧑‍💻 Build + 🧰 OSS analytics | Derived: anomaly detections + investigation queue | Report: refunded but not received after N days + resolution status | S166, S176 |
| Returns ↔ chargebacks linkage (feedback loop) | 🧑‍💻 Build | Derived: linkage tags + weekly report | Manual tag “chargeback related” + weekly report | S78, S81 |
| Controlled refunds policy (caps/thresholds) | 🧑‍💻 Build | Derived: caps + enforcement logs | Global cap for auto-refunds + manual review fallback | S176, S166 |
| Analyst workbench (saved views + bulk actions) | 🧑‍💻 Build + 🧰 OSS jobs | Derived: saved views + bulk action jobs | “High risk returns” saved view + bulk action “require manual review” | S171, S65, S229 |
| Use Shopify order risk signals as an input | 🛍️ Shopify API + 🧑‍💻 Build | Truth: Shopify OrderRisk; Derived: blended risk tier | Display Shopify risk alongside our heuristics in return review UI | S231 |

Notes:

- Keep refunds/returns as Shopify truth (Return/Refund) and treat risk scoring as a derived “policy layer” with strong auditability. (S200, S202, S65)
- Prefer heuristics-first scoring and explicit caps before ML. OSS policy engines (OPA) can help with versioned, explainable decisions. (S61, S176)

## Tranche #18 — Admin IA (navigation, search, saved views, shortcuts)

Assumption: this is primarily **UX + productivity**. Use OSS building blocks (admin scaffolding, tables, command palette, search engine) but keep the “information architecture” and permission-aware behavior custom.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Global admin search (orders/customers/returns) | 🧑‍💻 Build + 🧰 OSS (search engine) | Derived: search index over our DB/warehouse | Search across 2 entities (orders+customers) + type filter | S124, S237, S238 |
| Command palette (⌘K) navigation/actions | 🧑‍💻 Build + 🧰 OSS (UI lib) | Derived: commands registry + shortcuts config | Command palette for 10 routes + fuzzy matching | S125, S235, S236 |
| Advanced search syntax (qualifiers) | 🧑‍💻 Build | Derived: query parser + validation errors | 5 qualifiers for orders + inline parse errors | S127, S128 |
| Filter builder UI (non-power users) | 🧑‍💻 Build | Derived: filter AST + serialization | AND-only filter builder for one list | S123 |
| Saved views (filters/sort/columns) | 🧑‍💻 Build | Truth: saved view records; Derived: URL state | Save filters+sort for one list + share link | S123 |
| Default view per user/team | 🧑‍💻 Build | Truth: user preferences | Per-user default view for one page | S123 |
| Shareable deep links (encoded filters) | 🧑‍💻 Build | Derived: URL encoding scheme | URL-encoded filters + “copy link” button | S123, S124 |
| Recent items + jump back | 🧑‍💻 Build | Derived: per-user recent history | Recent list for 2 entity types | S124, S126 |
| Favorites / pinning | 🧑‍💻 Build | Truth: pinned IDs list | Pin 10 items + “favorites” menu | S124 |
| Keyboard shortcuts + shortcuts modal | 🧑‍💻 Build | Derived: shortcut mappings | 8 shortcuts + “?” modal overlay | S125 |
| Table personalization (columns, density) | 🧰 OSS (table lib) + 🧑‍💻 Build | Derived: per-view column config | Column visibility toggles + persistence for one list | S234, S123 |
| Bulk actions with selection persistence | 🧰 OSS (table lib) + 🧑‍💻 Build | Derived: selection model + job results | Bulk tag action + success/error summary | S234, S123 |
| Inline preview drawer | 🧑‍💻 Build | Derived: preview view model | Drawer with 8 fields + open full link | S124, S126 |
| Breadcrumbs + back stack | 🧑‍💻 Build | Derived: navigation history | “Back to results” link + 2-level breadcrumbs | S124 |
| Workspace switcher (multi-tenant) | 🧑‍💻 Build | Truth: tenant membership; Derived: last tenant | Tenant switcher + “current tenant” badge | S126 |
| Permission-aware navigation/actions | 🧑‍💻 Build + 🧰 OSS (authz engine) | Truth: role/relationship model; Derived: “why disabled” | Hide 3 modules by role + tooltip on disabled button | S61, S62 |
| Auditability for shared views | 🧑‍💻 Build | Truth: append-only view change events | View edit history list (no revert) | S65 |

Notes:

- Admin scaffolding frameworks (React Admin / Refine) can accelerate list/detail CRUD, but the differentiated value is the “ops-native” IA: queues, saved views, deep links, bulk actions, and permission-aware UX. (S232, S233)
- Global search should query a derived index (warehouse/search engine), not live Shopify Admin queries, to stay fast and cross-entity. (S211, S237)

## Tranche #20 — Merchandising rules (search tuning, boosts, synonyms)

Assumption: Shopify is connected for catalog truth, but merchandising/search tuning is best implemented in **our own search layer** (OSS/hosted search engine) with a custom rules UI. Shopify provides the catalog feed; the search index is the system we tune.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Catalog sync for search indexing | 🛍️ Shopify API + 🧑‍💻 Build | Truth: products/collections in Shopify; Derived: search index docs | Index products into search engine daily + incremental updates later | S239, S240, S211 |
| Synonyms manager | 🧑‍💻 Build + 🧰 OSS/hosted search | Derived: synonym sets + publish versions | Synonyms CRUD for 20 terms + “publish” button | S139, S142, S144, S242 |
| Search rules / curation (pin/promote/hide) | 🧑‍💻 Build + 🧰 OSS/hosted search | Derived: rule definitions + schedule | Pin top 3 products for 5 queries with start/end dates | S138, S143, S242 |
| Boost/bury rules by attributes (margin, freshness, inventory) | 🧑‍💻 Build + 🧰 OSS/hosted search | Derived: ranking policy + weights | One boost rule for one collection (inventory desc, then margin desc) | S140, S141, S241 |
| Out-of-stock demotion/hide | 🧑‍💻 Build + 🧰 OSS/hosted search | Derived: OOS policy + thresholds | Demote OOS items in one results page (search + collection) | S141, S145, S241 |
| Facets configuration (fields, order, labels) | 🧑‍💻 Build + 🧰 OSS/hosted search | Derived: facet config per index | Editor for 6 facets + reorder + publish | S141, S145 |
| Query suggestions / autocomplete dictionary | 🧑‍💻 Build + 🧰 OSS/hosted search | Derived: suggestions list + source attribution | Manual suggestions list for top 50 queries + CSV import/export | S146, S242 |
| “No results” playbook | 🧑‍💻 Build | Derived: fallback mappings + curated collections | Zero-results rule: show popular categories + curated collection redirect | S138, S142 |
| Preview + QA simulator for merch rules | 🧑‍💻 Build | Derived: preview snapshots per query | “Preview results” for one query + before/after diff | S242 |
| Governance (rule history, approvals, rollbacks) | 🧑‍💻 Build + 🧰 OSS jobs | Derived: rule change audit events | Change history + revert last change (single step) | S65, S229 |

Notes:

- Merch rules should be treated like code/config: versioned, schedulable, previewable, and auditable.
- The key decision is “where the ranking happens”: if you use Shopify storefront search only, tuning options are limited; external search stacks exist specifically to provide these knobs. (S242, S243)

## Tranche #21 — Catalog governance (product QA, bulk edits, versioning)

Assumption: Shopify remains the catalog source-of-truth. Build governance UX (QA, completeness, batch safety, history), and use Shopify Admin API + bulk exports/jobs for scale.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Product lifecycle status (draft/active/archived) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: product status in Shopify; Derived: QA status flags | List filter by status + “publish” action with checks | S148, S244 |
| Bulk editor (spreadsheet UI) | 🧑‍💻 Build + 🧰 OSS table | Derived: edit grid state + validation errors | Grid edit for 5 fields + row-level errors | S147, S234 |
| CSV import with dry-run validation | 🧑‍💻 Build | Derived: import job + validation report | CSV validator + apply changes via Shopify mutations | S149, S244 |
| CSV export center + history | 🧑‍💻 Build + 🛍️ Shopify API | Derived: export jobs + history | Export products CSV + exports history table | S150, S211 |
| Required fields / completeness rules (by type) | 🧑‍💻 Build | Derived: completeness rule sets + badges | 5 required fields for one product type + completeness badge | S151, S246 |
| Field-level validation (SKU format, price > 0) | 🧑‍💻 Build | Derived: validation rule results | 6 validation rules + inline errors + summary bar | S149, S147 |
| Attribute governance (locked fields, role-based editability) | 🧑‍💻 Build + 🧰 OSS authz | Derived: lock policies + enforcement logs | Lock 2 fields (price/SKU) to Admin role only | S61, S62 |
| Versioning / change log for catalog edits | 🧑‍💻 Build | Derived: change events + diffs | Change history for product edits (who/when/fields) | S65, S244 |
| Bulk operations for variants/metafields | 🛍️ Shopify API + 🧑‍💻 Build | Truth: variants/metafields in Shopify; Derived: batch job state | Bulk create variants for one product + bulk set 5 metafields | S245, S246 |
| Channel readiness checks (optional) | 🧑‍💻 Build | Derived: readiness rules per channel | 6 readiness checks for one “channel profile” | S151 |

Notes:

- Treat catalog edits like “safe ops”: preflight validation, row-level errors, and audit trails matter more than raw CRUD speed.
- For scale, rely on Shopify mutations/bulk mechanisms and store only the governance layer (rules, histories, job runs) in our DB.

## Tranche #22 — Promotions admin (coupons, discounts, eligibility)

Assumption: Shopify is connected and controls discount application at checkout. Use Shopify discount primitives as source-of-truth; build a better ops UX around creation, bulk ops, preview/testing, measurement hooks, and abuse monitoring.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Discount code creation (single code) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: discount in Shopify; Derived: internal notes + approvals | Create basic code discount + status toggle | S154, S152 |
| Automatic discounts | 🛍️ Shopify API + 🧑‍💻 Build | Truth: discount in Shopify | Automatic percent-off on min subtotal | S155, S153 |
| Eligibility/scope rules UX (min spend, collections, exclusions) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: discount rules in Shopify; Derived: validation/preview warnings | UI for min subtotal + include collection + exclude 5 SKUs | S156, S152 |
| Schedule start/end + auto-disable | 🛍️ Shopify API + 🧑‍💻 Build | Truth: discount lifecycle in Shopify | Scheduled start/end + status label in list | S152, S157 |
| Promo list view + filters (status, type, date range) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: discount nodes in Shopify; Derived: saved views | List page with status filter + search by code | S247, S152 |
| Promo detail page + audit history | 🧑‍💻 Build | Derived: change history events | Change history list (no diff) + actor + timestamp | S65, S159 |
| Bulk code generation + export | 🧑‍💻 Build + 🛍️ Shopify API | Truth: codes in Shopify; Derived: generation job + CSV export | Generate 100 codes + CSV export + “used” flag | S158, S247 |
| Import/export promotions (bulk ops) | 🧑‍💻 Build | Derived: import jobs + validation errors | Export codes CSV + import with row-level errors | S158, S156 |
| Promotion preview / test cart simulator | 🧑‍💻 Build | Derived: simulated cart inputs + results | Test cart builder (3 items) + apply promo simulator + conflict reason | S156, S152 |
| Redemption analytics (uses, discount spend, basic AOV lift) | 🧑‍💻 Build + 🧰 OSS analytics | Derived: promo metrics tables | Usage count + discount total + CSV export | S157, S158, S196 |
| Abuse monitoring (spikes, repeated identities) | 🧑‍💻 Build + 🧰 OSS jobs | Derived: anomaly alerts + actions log | Spike alert + one-click disable + audit event | S156, S65, S229 |
| Promo experiment manager (offer variants) | 🧑‍💻 Build + 🧰 OSS (experimentation) | Derived: assignments + lift metrics | 2 variants + assignment + result table (conv + spend) | S195, S157 |
| Scheduled promo performance report | 🧑‍💻 Build + 🧰 OSS jobs | Derived: scheduled report config + delivery log | Weekly email with top promos + CSV + delivery log | S197, S229 |
| Metric definitions registry (ROI/spend/net revenue) | 🧑‍💻 Build + 🧰 OSS semantic layer | Derived: metric definitions + versions | Metric definition table + change log | S196 |
| Instrumentation + data-quality checks | 🧑‍💻 Build + 🧰 OSS transformations | Derived: DQ checks + issues | 3 checks + dashboard tile + CSV of bad rows | S197, S199 |

Notes:

- Don’t reimplement discount application logic; Shopify controls checkout application. The product value is “ops-safe promo management” + measurement + governance.
- Measurement should be built on event taxonomy + metric definitions (registry) rather than ad-hoc reports.

## Tranche #19 — Data governance (data retention, exports, privacy requests)

Assumption: this is largely **custom governance UX + policy + auditability**. Shopify and other sources provide underlying data; we implement DSAR workflows, retention policies, and safe export/deletion tooling.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Data retention policy registry (by category) | 🧑‍💻 Build | Truth: retention policies + versions | Retention table for 5 categories + edit form + change history | S130, S134 |
| Retention enforcement job (schedule + preview + run history) | 🧑‍💻 Build + 🧰 OSS jobs | Derived: run results + failures + counts | Nightly run + run history table + basic error reporting | S135, S229 |
| Legal hold (preserve records) | 🧑‍💻 Build | Truth: legal hold records | Legal hold flag + “blocked by hold” in retention preview | S136 |
| Privacy request inbox (DSAR intake) | 🧑‍💻 Build | Truth: DSAR requests + statuses | Request record + statuses + due date + assignment | S131, S132, S133 |
| Identity verification checklist for DSAR | 🧑‍💻 Build | Derived: verification status + notes | “verified” gate + notes + attachment field | S131, S134 |
| Data export pack generator (portability) | 🧑‍💻 Build + 🛍️ Shopify API + 🧰 OSS jobs | Truth: source data in Shopify; Derived: export bundle + delivery log | Export customer+orders+returns JSON bundle + expiring download link | S210, S202, S211 |
| Secure delivery (expiring links + access logging) | 🧑‍💻 Build | Derived: signed URLs + download events | Expiring link + download log list | S137 |
| Erasure mode selection (delete vs anonymize) | 🧑‍💻 Build | Derived: erasure disposition per category | Anonymize 5 PII fields on customer record + keep order totals | S132, S130 |
| Denial/restriction reason codes + templated response | 🧑‍💻 Build | Derived: reason codes + responses | Reason codes + templated response + “denied” status | S131, S134 |
| Data inventory (where PII lives) + classification tags | 🧑‍💻 Build | Truth: field registry + PII flags | Field registry for 3 entities + PII flags + notes | S134, S130 |
| PII redaction rules for exports/logs | 🧑‍💻 Build + 🧰 OSS pipeline | Derived: redaction rule set + preview | Redact 3 fields in export pack + preview diff | S134, S215 |
| Audit log for governance actions | 🧑‍💻 Build | Truth: audit events | Audit events filters (actor/action/date) + CSV export | S137 |
| Operational export center (non-DSAR exports) | 🧑‍💻 Build + 🛍️ Shopify API | Derived: export job history | One export job type (orders) with status + download link | S211, S90 |
| Data deletion / purge jobs with dry-run | 🧑‍💻 Build + 🧰 OSS jobs | Derived: dry-run counts + confirmation events | Dry-run + confirm for deleting a batch of test data | S135, S229 |

Notes:

- Keep source systems (Shopify/support tools) as truth; governance tooling orchestrates safe exports/deletions and records audit trails.
- Prioritize DSAR safety: identity verification gating + expiring links + access logs before scaling “one-click export everything”.

## Tranche #14 — Mobile ops

Assumption: mobile ops is “frontline execution”. Build native/React Native UX; leverage OSS/offline primitives and optionally integrate with Shopify POS surfaces or use Shopify Admin API for inventory/transfer primitives.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Scan-to-receive (inventory transfers) | 🧑‍💻 Build (mobile) + 🛍️ Shopify API | Truth: transfer/inventory in Shopify; Derived: scan events + session state | Camera scan + match SKU + increment counts + finalize transfer (online) | S95, S100 |
| Offline-first scanning (queue scans, sync later) | 🧑‍💻 Build + 🧰 OSS/offline primitives | Derived: local scan queue + conflict resolution | Local queue + “sync now” + simple conflict rule | S98, S99 |
| Inventory cycle count workflow | 🧑‍💻 Build (mobile) + 🛍️ Shopify API | Truth: inventory adjustments in Shopify; Derived: count sessions | Cycle count session + scan-to-add + submit adjustments | S94, S95 |
| Pick/pack checklist (mobile picking) | 🧑‍💻 Build (mobile) | Derived: pick sessions + confirmations | Pick list view + scan-to-confirm + packed toggle | S94, S100 |
| Push alerts for exceptions | 🧑‍💻 Build + 🔌 push infra | Derived: notification targets + delivery log | Push for 2 events + role targeting + deep links | S97, S96, S248 |
| Mobile task inbox | 🧑‍💻 Build | Truth: tasks in our system; Derived: mobile filters | Task list + status transitions + notes | S36, S101 |
| Photo capture for damage evidence | 🧑‍💻 Build | Derived: attachments + metadata | Photo capture + upload + attachment viewer | S95, S98 |
| Offline attachment queue | 🧑‍💻 Build + 🧰 OSS/offline primitives | Derived: local blob queue + retry state | Local storage queue + upload retries + failure indicator | S98, S99 |
| Device/scanner compatibility matrix | 🧑‍💻 Build (docs/UX) | Derived: documentation + tests | “test scanner” screen + supported devices list | S94 |
| Extend Shopify POS instead of standalone app (optional path) | 🛍️ Shopify POS extensions | Truth: POS context; Derived: extension UI state | POS UI extension that displays tasks/receiving steps | S249 |

Notes:

- The core leverage decision is “standalone warehouse app vs POS extension”: standalone app gives more control offline; POS extension leverages Shopify’s hardware ecosystem but may limit offline and scanning flows.
- Offline sync is the “hard part”: start online-first thin slice, then add queued scans/uploads with explicit conflict rules.

## Tranche #12 — Finance analytics (payouts, fees, disputes, reconciliation)

Assumption: Shopify is connected; Shopify remains the source-of-truth for orders/refunds and (if enabled) Shopify Payments provides payout + balance transaction primitives. We store **derived** tables for reconciliation, reporting, and alerts. Non-Shopify processors (Stripe/PayPal/Adyen) require separate 3P APIs if needed.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Gross sales / net sales dashboard (GMV, refunds, discounts) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: orders/refunds in Shopify; Derived: daily rollups | One daily rollup table + 3 KPI cards + drilldown to orders | S210, S200 |
| Transaction ledger (payments, captures, refunds) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: transactions in Shopify; Derived: normalized ledger rows | Ingest last 30 days transactions → ledger table (filter by type/status) | S253, S210 |
| Shopify Payments balance transactions (fees + adjustments feed) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: Shopify Payments balance transactions; Derived: fee breakdown rollups | Ingest balance transactions → compute fees by day + by type | S252, S250 |
| Payout timeline (expected vs paid) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: payouts/balance in Shopify Payments; Derived: payout status timeline | Payout list view + “unreconciled” badge + CSV export | S250, S251 |
| Payout reconciliation (payout → orders/transactions) | 🧑‍💻 Build + 🛍️ Shopify API | Derived: reconciliation links + variance reasons | Match payout to transaction set (simple “sum by date window”) + variance report | S252, S253 |
| Disputes / chargebacks inbox (status, due dates, outcomes) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: disputes in Shopify Payments; Derived: tasks + reminders | Dispute list view + status + assigned owner + due date reminders | S254, S229 |
| Refund vs dispute leakage report (double-loss detection) | 🧑‍💻 Build | Derived: joined flags + counts | Report: “refunded + disputed” per order + total $ at risk | S200, S254 |
| Tax/VAT reporting baseline (export-first) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: orders/taxes in Shopify; Derived: tax rollups | Export orders + compute tax totals by region for 1 period | S210, S211 |
| Finance alerts (payout drop, dispute spike, refund spike) | 🧑‍💻 Build + 🧰 OSS jobs | Derived: alert rules + deliveries | 3 alert rules + notification delivery log | S229, S248 |
| Scheduled finance reports (weekly/monthly email/Slack) | 🧑‍💻 Build + 🧰 OSS jobs | Derived: report runs + delivery log | One weekly report job + delivery history | S229 |
| Metric definitions registry (finance KPIs, versioned) | 🧑‍💻 Build | Truth: metric definitions + versions | 10 KPIs with owner + SQL snippet + change history | S196, S197 |

Notes:

- Use Shopify primitives for commerce + payments truth; store **derived reconciliation/reporting tables** internally to stay customizable and fast.
- Avoid relying on Shopify admin “Reports” pages for automation; prefer API primitives and our own warehouse/reporting layer.

## Tranche #10 — Pricing & billing admin (app billing / monetization)

Assumption: we’re building an embedded Shopify app. Default to **Shopify Billing API** primitives for public apps (merchant billing inside Shopify) and build custom entitlement + billing admin UX on top. If not eligible for Shopify billing (e.g., off-platform product), use a 3P billing provider (Stripe/Chargebee) and treat Shopify only as an identity/installation context.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Plan catalog (tiers, limits, feature flags) | 🧑‍💻 Build | Truth: plan definitions + entitlements | 3 tiers + 10 entitlements + gating middleware | S196 |
| Upgrade flow (start paid plan) | 🛍️ Shopify Billing API + 🧑‍💻 Build | Truth: subscription charge in Shopify; Derived: “selected plan” + confirmation logs | Create subscription with `appSubscriptionCreate` + redirect to confirmation URL | S255, S256 |
| Cancel flow | 🛍️ Shopify Billing API + 🧑‍💻 Build | Truth: cancellation in Shopify; Derived: cancel reason + retention notes | “Cancel plan” button → `appSubscriptionCancel` + capture reason | S257 |
| One-time purchase (setup fee / add-on) | 🛍️ Shopify Billing API + 🧑‍💻 Build | Truth: one-time charge in Shopify; Derived: SKU/add-on mapping | Create one-time purchase + attach to entitlement grant | S258 |
| Usage-based billing (metered events) | 🛍️ Shopify Billing API + 🧑‍💻 Build | Truth: usage records in Shopify; Derived: usage meter rollups + audit | Track one usage meter + send `appUsageRecordCreate` daily | S259 |
| Usage audit log (what was billed and why) | 🧑‍💻 Build | Derived: usage events + aggregation trace | Usage events table + “why billed” drilldown for one invoice period | S259, S65 |
| Proration / plan change policy | 🧑‍💻 Build | Derived: plan change policy + effective date | One policy: “next cycle” upgrades/downgrades + effective date UI | S255 |
| Trial + onboarding conversion | 🧑‍💻 Build + 🛍️ Shopify Billing API | Derived: trial state + conversion events | 7-day trial + 3-step checklist + “start plan” CTA | S255, S256 |
| Billing status sync (active plan, delinquent) | 🛍️ Shopify Billing API + 🧑‍💻 Build | Truth: active charges in Shopify; Derived: last_sync_at + access state | Nightly sync + show active plan + lock features if no active plan | S255 |
| Invoice / receipt export for merchants | 🧑‍💻 Build + 🛍️ Shopify Billing API | Derived: invoice list cache + links | “Billing history” page with 10 entries + download links | S255 |
| Alternative path: external billing provider (if not Shopify-billed) | 🔌 3P API (Stripe/Chargebee) + 🧑‍💻 Build | Truth: billing provider; Derived: Shopify install mapping | Gate: “Shopify-billed only” vs “external billed” capability flag | S255 |

Notes:

- The key leverage decision is **eligibility/requirements**: public Shopify apps are typically expected to use Shopify’s billing primitives; if we need off-platform billing, treat it as a separate product line with its own billing provider.
- Keep billing truth in the billing system (Shopify billing or Stripe), and store only derived entitlements + audit trails internally.
- Default architecture alignment: billing creates a second source of truth if we mirror invoices internally; instead store derived entitlements + audit events and link to upstream billing objects. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #13 — Integrations admin (connectors, webhooks, import/export, retries, health)

Assumption: Shopify is connected; Shopify Admin API is truth for the Shopify side (webhook subscriptions, bulk export primitives). Our product differentiates on **operability**: setup flows, delivery logs, retries, alerting, and safe bulk sync tooling. OSS/3P is most valuable for generic connector frameworks and webhook delivery infrastructure.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Integration catalog (list of connectors + status) | 🧑‍💻 Build | Truth: enabled connectors per tenant | Catalog page with enable/disable + “last sync” badge | S88 |
| Connector setup wizard (credentials + scopes) | 🧑‍💻 Build | Truth: connector config (encrypted) | 1 connector wizard with “test connection” + save | S88, S63 |
| Shopify webhook subscription inventory (what topics are installed) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: webhook subscriptions in Shopify; Derived: “expected vs actual” diff | List webhooks + diff view + “fix” action | S206, S89 |
| Webhook ingestion health (errors, latency, signature failures) | 🧑‍💻 Build + 🧰 OSS observability | Derived: delivery events + error buckets | Ingest log table + 3 error buckets + trend sparkline | S216, S220 |
| Outgoing webhook delivery to 3P systems (retries + endpoint health) | 🔌 3P webhook infra (Svix-like) OR 🧑‍💻 Build | Truth: delivery attempts in delivery system; Derived: our audit links | Add one outgoing webhook + delivery log + retry button | S93 |
| Retry / dead-letter queue for connector jobs | 🧰 OSS jobs + 🧑‍💻 Build | Derived: job state + retries + DLQ reason | One job type + DLQ view + “replay” button | S229 |
| Bulk export from Shopify for initial sync/backfills | 🛍️ Shopify API + 🧑‍💻 Build | Truth: bulk op in Shopify; Derived: export job history | Run one bulk export (orders) + status UI + download URL | S90, S211 |
| Incremental sync scheduler (nightly/hourly) | 🧰 OSS jobs + 🧑‍💻 Build | Derived: sync schedule + run history | One scheduled sync + run history table | S229 |
| Transform/mapping rules (field mapping, constants) | 🧑‍💻 Build | Truth: mapping config versions | Map 5 fields from Shopify → destination payload + version history | S88, S65 |
| Import tool (CSV/JSON) with dry-run validation | 🧑‍💻 Build + 🧰 OSS jobs | Derived: import jobs + row errors | Upload CSV + validate + show first 20 row errors | S211, S229 |
| Integration audit log (who changed config + what) | 🧑‍💻 Build | Truth: audit events | Audit events filters for connector changes + export | S65 |
| Alerting on connector failures (SLA breach) | 🧑‍💻 Build + 🧰 OSS jobs | Derived: alert rules + deliveries | 2 alert rules + delivery log + mute toggle | S229, S248 |
| Optional: ELT connector framework (data warehouse syncs) | 🧰 OSS (Airbyte/Meltano) + 🧑‍💻 Build | Truth: connector state in ELT; Derived: our references/links | Link out to one ELT job + show status in our catalog | S91, S92 |

Notes:

- “Integrations admin” is mostly **custom operability UX**; Shopify provides specific primitives (webhook subscriptions + bulk exports), but reliability lives in our job system and delivery logs.
- If we need to deliver webhooks to many downstream endpoints, a dedicated delivery system (Svix-like) can reduce operational burden; keep only references + audit trails in our DB.
- Default architecture alignment: use webhooks + bulk backfills for ingestion, store derived run history/health and keep Shopify-side subscriptions as truth. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #3 — Inventory / fulfillment exceptions (multi-location, cycle counts, backorders)

Assumption: Shopify is connected; Shopify should remain the source-of-truth for inventory items/levels and fulfillment orders. We build derived **exception signals** (mismatches, negative available, stuck fulfillment orders) plus safe ops UX (queues, approvals, bulk fixes).

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Locations directory (warehouses/stores) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: locations in Shopify; Derived: tags/notes | List locations + basic tags + “last sync” | S261, S260 |
| Inventory “current state” snapshot per SKU/location | 🛍️ Shopify API + 🧑‍💻 Build | Truth: inventory levels; Derived: cached snapshot + deltas | Ingest inventory levels nightly + show 1 SKU drilldown | S263, S262 |
| Negative/low inventory detector | 🧑‍💻 Build + 🧰 OSS jobs | Derived: anomaly flags + alert events | Flag 2 conditions (negative, below threshold) + alert banner | S263, S229 |
| Cycle count session (scan/enter counts) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: inventory levels; Derived: count session + audit | One count session → submit via `inventorySetOnHandQuantities` | S265, S263 |
| Inventory adjustment tool (small fixes) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: adjustments in Shopify; Derived: internal approval/audit | Adjust quantity via `inventoryAdjustQuantity` + reason capture | S264, S65 |
| “Activate inventory at location” (routability readiness) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: activation state in Shopify; Derived: readiness checklist | Activate 1 SKU at 1 location + show status | S266, S260 |
| Fulfillment order exceptions queue (stuck/can’t fulfill) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: fulfillment orders; Derived: exception reason + owner | Queue view for 2 exception types + assignment | S204, S35 |
| Split/merge fulfillment playbook (ops guidance) | 🧑‍💻 Build | Derived: playbook steps + completion | “Playbook” panel with 5 steps + completion state | S28, S204 |
| Backorder/oversell policy flags (“continue selling”) | 🧑‍💻 Build + 🛍️ Shopify API (catalog truth) | Derived: policy config + SKU segments | Segment SKUs by backorder policy + report counts | S26, S27 |
| Bulk inventory update (CSV dry-run) | 🧑‍💻 Build + 🛍️ Shopify API + 🧰 OSS jobs | Derived: import jobs + row errors | Upload CSV + dry-run + apply via adjustments | S25, S264, S229 |
| Inventory mismatch reconciliation report | 🧑‍💻 Build | Derived: variance report | Report: “expected vs counted vs on-hand” for 1 location | S263, S265 |
| Alerts for fulfillment aging / SLA risk | 🧑‍💻 Build + 🧰 OSS jobs | Derived: aging buckets + notifications | Aging buckets + one alert rule + delivery log | S35, S229, S248 |

Notes:

- For a Shopify-connected product: build **exception UX** and keep inventory truth upstream; store only derived flags, sessions, and audit trails.
- Use jobs/queues for safe bulk operations and for periodic anomaly detection; avoid real-time sync complexity in the thin slice.
- Default architecture alignment: inventory levels/adjustments are Shopify truth; our app owns sessions, queues, approvals, and audit events. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #4 — Support desk ops (queues, SLAs, macros, join-to-order)

Assumption: merchants often already run a support platform (Zendesk/Gorgias/Intercom). Best leverage is usually: integrate with the existing ticket system APIs, and build a custom “ops control plane” that joins tickets ↔ orders ↔ shipments + automation, rather than rebuilding a full ticketing system. OSS value is mostly in analytics/workflow plumbing, not in agent UI.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Ticket list / queue views | 🔌 3P API (support platform) + 🧑‍💻 Build | Truth: tickets in support platform; Derived: cached queue summaries | Show 2 queues (open, urgent) + deep links to ticket | S36 |
| SLA policies (response/resolution targets) | 🧑‍💻 Build + 🔌 3P (if platform owns SLA) | Derived: SLA rules + breach flags | 2 SLA rules + breach badge + breach list | S35 |
| Auto-assignment routing | 🔌 3P API (platform routing) OR 🧑‍💻 Build | Derived: routing rules + audit | 1 rule: assign “returns” tag to team A | S32, S31 |
| Macros / canned actions | 🔌 3P API (macros) + 🧑‍💻 Build | Truth: macros in platform; Derived: macro usage logs | Macro picker + run macro + log usage | S30 |
| Automation rules (events/conditions/actions) | 🧑‍💻 Build (ops) + 🧰 OSS workflows (optional) | Truth: our ops rules; Derived: rule runs | 3 rule types (tag, notify, create task) + run history | S31, S55 |
| CSAT capture and reporting | 🔌 3P API + 🧑‍💻 Build | Truth: CSAT in platform; Derived: rollups | Pull last 30 days CSAT + 2 charts | S39 |
| First reply time / agent KPIs | 🔌 3P API + 🧑‍💻 Build + 🧰 OSS analytics | Truth: platform metrics; Derived: KPI tables | One KPI table: first reply time by agent | S40, S37 |
| “Single pane of glass” (ticket ↔ order ↔ shipment join) | 🧑‍💻 Build + 🛍️ Shopify API + 🔌 3P API | Truth: orders/fulfillments in Shopify + tickets in platform; Derived: joined views | Ticket detail panel shows order summary + shipment status | S210, S203, S37 |
| Customer identity resolution (email/phone → customer/order) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: customers/orders in Shopify; Derived: matching confidence + links | 1 matcher: email → last order + confidence badge | S210 |
| Escalation tasks from tickets | 🧑‍💻 Build + 🧰 OSS jobs | Truth: tasks in our system; Derived: timers | Create task from ticket + overdue reminder | S101, S229 |
| Audit log for support automation changes | 🧑‍💻 Build | Truth: audit events | Audit events for rule/macro config changes | S65 |
| Error/integration health inbox (support tooling) | 🧰 OSS/hosted (Sentry) + 🧑‍💻 Build | Truth: errors in tool; Derived: ownership metadata | Link Sentry issues + assign owner + add runbook link | S220 |

Notes:

- Don’t rebuild ticketing unless required; most leverage comes from joining Shopify commerce truth to the existing ticket workflow and adding automation/auditability.
- If merchants don’t have a support platform, the thin slice can still be a “case inbox” (minimal tickets) — but default assumption should be “integrate first”.
- Default architecture alignment: treat tickets as 3P truth; store derived joins, playbooks, and tasks; execute commerce side-effects via Shopify primitives. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #7 — Workflow builder / automation (triggers, actions, playbooks)

Assumption: Shopify is connected. We should **not** try to recreate Shopify Flow or Zapier as a full platform. Best leverage is: use OSS workflow engines for durable execution, build a focused ops-oriented “playbook builder” UX, and use Shopify + 3P APIs as action targets. Store workflow definitions + run history as truth in our system.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Trigger catalog (events we support) | 🧑‍💻 Build | Truth: supported triggers list + config schemas | 5 triggers with config forms | S51, S52 |
| Event ingestion (webhooks → internal events) | 🧑‍💻 Build + 🧰 OSS observability | Truth: internal event stream; Derived: delivery metrics | Ingest 2 events + show delivery counters | S89, S206, S216 |
| Playbook definition model (if/then + steps) | 🧑‍💻 Build | Truth: workflow definitions + versions | JSON schema for 5 step types + versioning | S50, S53 |
| Action catalog (Shopify + 3P actions) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: supported actions list | 5 actions: tag order, create return, create task, notify, hold fulfillment | S200, S202, S208 |
| Durable execution (retries, timers, idempotency) | 🧰 OSS workflow engine (Temporal) | Truth: workflow runs; Derived: retry/timeout metrics | Execute one workflow with retries + timeout | S55 |
| Simple rule engine (“if X then Y”) | 🧑‍💻 Build | Derived: evaluation traces | One condition type + one action type + run log | S31, S55 |
| Run history + replay (auditability) | 🧑‍💻 Build | Truth: run records + step results | Run list + step timeline + “replay” | S55, S65 |
| Approval gates inside workflows | 🧑‍💻 Build | Truth: approvals + decisions | One approval step that blocks execution until approved | S65, S105 |
| “Dry-run / preview” mode | 🧑‍💻 Build | Derived: preview results | Preview a workflow against 10 historical events | S196 |
| Connectors as step types (call 3P APIs) | 🔌 3P APIs + 🧑‍💻 Build | Truth: connector configs; Derived: call logs | One connector: send Slack message + store call logs | S88 |
| Scheduling (cron / delayed steps) | 🧰 OSS jobs (BullMQ) + 🧰 OSS engine | Derived: schedules + next run | Schedule one workflow daily + show next run | S229, S55 |
| Error handling UX (DLQ, retries, ownership) | 🧑‍💻 Build | Truth: run failures + owner | Failures inbox + retry + assign owner | S220, S55 |

Notes:

- Use OSS engines for durable execution; build the ops UX and keep “workflow definition + run history” in our DB.
- Shopify Flow is a useful reference model for triggers/actions, but our workflows should be tenant-safe, auditable, and oriented around ops playbooks (returns/shipping/inventory/support).
- Default architecture alignment: workflow engine + job queue provide reliability; our app stores definitions and run history; Shopify/3P APIs are action targets. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #11 — Fraud & risk (risk scoring, review queues, disputes)

Assumption: Shopify is connected, but payment processors vary. Treat “risk decisions” as **derived state with auditability**. Use Shopify primitives (OrderRisk, refunds, disputes objects when Shopify Payments is enabled) as inputs; use processor APIs (Stripe Radar/disputes) where the merchant’s payment stack requires it. Build the risk analyst UX + policies + queues; use OSS for policy evaluation and jobs.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Risk signal ingestion (risk scores, flags) | 🛍️ Shopify API + 🔌 3P APIs + 🧑‍💻 Build | Truth: upstream signals; Derived: normalized risk events | Ingest Shopify OrderRisk for last 7 days + store in DB | S231 |
| Risk policy registry (versioned rules) | 🧑‍💻 Build + 🧰 OSS policy (OPA optional) | Truth: policy versions; Derived: evaluation traces | 5 rules with version history + “why blocked” display | S61, S65 |
| Manual review queue (triage + assign + resolve) | 🧑‍💻 Build | Truth: review decisions; Derived: queue filters | Queue with 2 filters + assignment + outcome reasons | S36, S65 |
| Velocity checks (repeat orders, high frequency) | 🧑‍💻 Build | Derived: velocity aggregates | Simple rule: >N orders per email/day → flag | S210 |
| Address mismatch / deliverability checks | 🔌 3P API (address verification) + 🧑‍💻 Build | Truth: verification results; Derived: per-order flags | Verify address on intake + flag “needs confirmation” | S17 |
| Fraud hold workflow (“don’t fulfill yet”) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: fulfillment hold in Shopify; Derived: hold reason + audit | Place/release hold from risk queue with notes | S208, S209, S65 |
| Refund gating (block instant refunds for high risk) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: refunds in Shopify; Derived: gating decisions | Disable “instant refund” button when risk=high | S200, S231 |
| Disputes inbox (chargebacks list + status + owner) | 🛍️ Shopify API (if Shopify Payments) + 🔌 3P API | Truth: dispute object upstream; Derived: tasks + reminders | List disputes + due dates + owner + notes | S254, S78 |
| Dispute evidence workflow (collect docs, submit) | 🔌 3P API (processor) + 🧑‍💻 Build | Truth: submitted evidence upstream; Derived: evidence checklist | Evidence checklist + attach docs + “submitted” status | S79 |
| Chargeback reason code mapping (playbooks) | 🧑‍💻 Build | Derived: reason mapping + recommended actions | Map 5 reasons → recommended next steps | S81 |
| Risk outcome analytics (approval rate, dispute rate) | 🧑‍💻 Build + 🧰 OSS analytics | Derived: KPI tables | Daily rollups: flagged %, dispute %, false positive rate | S196, S197 |
| Audit log for risk decisions | 🧑‍💻 Build | Truth: audit events | Audit events for “flag/approve/hold/refund blocked” | S65 |
| Optional: KYC/ID verification gating | 🔌 3P API (IDV) + 🧑‍💻 Build | Truth: verification results upstream; Derived: gating status | Gate one flow behind “verified” requirement | S267 |

Notes:

- Keep “financial side-effects” (refunds) in Shopify primitives; keep “risk decisions” internal and auditable.
- Don’t assume disputes primitives exist unless the merchant uses Shopify Payments; treat dispute support as multi-processor with a provider boundary.
- Default architecture alignment: risk tiers/policies are derived; holds/refunds/disputes remain upstream truth and are invoked through primitives. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #9 — Inventory forecasting / replenishment (planning + purchasing)

Assumption: Shopify inventory primitives (locations + inventory levels) remain the source-of-truth for “current stock.” Forecasts and reorder suggestions are **derived** and can be powered by simple rules first; advanced forecasting can use OSS/3P services later. Purchasing/PO workflows are primarily custom ops UX (unless merchant uses Stocky/ERP).

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Inventory baseline feed (by SKU/location) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: inventory levels in Shopify; Derived: nightly snapshot | Nightly snapshot table + “by SKU” drilldown | S263, S260 |
| Reorder point rules (min/max, safety stock) | 🧑‍💻 Build (rules) | Truth: reorder rules + versions | Min/max rules for 20 SKUs + version history | S68 |
| “Needs reorder” suggestions list | 🧑‍💻 Build | Derived: suggestions + reasons | Suggestions list with reason (“below min”) + export CSV | S68, S263 |
| Lead time + reorder cadence fields | 🧑‍💻 Build | Truth: lead time config | Add lead time to rule + “expected stockout date” calc | S67 |
| Purchase order (PO) creation workflow | 🧑‍💻 Build + (optional Shopify/Stocky surfaces) | Truth: PO records in our system; Derived: receiving status | Create PO with 5 lines + status + notes | S66 |
| Receiving workflow (PO → stock update) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: stock in Shopify; Derived: receiving session + audit | Receive 5 items and update on-hand via inventory set/adjust | S265, S264 |
| Vendor directory + SKU→vendor mapping | 🧑‍💻 Build | Truth: vendors + mappings | Vendor list + map 20 SKUs to vendor | S66 |
| Backorder policy awareness (“continue selling”) | 🧑‍💻 Build + 🛍️ Shopify catalog truth | Derived: policy segments | Segment SKUs where backorders allowed + caution badges | S27, S26 |
| Forecasting v0 (moving average demand) | 🧑‍💻 Build | Derived: demand forecast table | 7/30-day moving average demand per SKU | S70 |
| Forecasting v1 (external forecasting service) | 🔌 3P API (forecasting) OR 🧰 OSS | Truth: forecast outputs upstream; Derived: our stored forecast | Plug in a forecast feed + compare vs moving average | S70 |
| Stockout risk alerts | 🧑‍💻 Build + 🧰 OSS jobs | Derived: alert rules + deliveries | Alert if “days of cover < X” + delivery log | S229, S248 |
| Replenishment analytics (fill rate, stockouts, overstock) | 🧑‍💻 Build + 🧰 OSS analytics | Derived: KPI tables | Daily KPIs: stockouts count + overstock value | S196, S197 |

Notes:

- Start with deterministic rules (min/max + lead time) before forecasting; forecasts are optional and should be treated as derived.
- Keep “receiving updates” as Shopify inventory writes; keep “planning artifacts” (POs, suggestions, vendor mapping) internal.
- Default architecture alignment: forecasts and suggestions are derived; inventory truth stays in Shopify; PO/receiving artifacts live in our ops control plane. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #16 — Localization (multi-currency, languages, formats)

Assumption: Shopify is connected. Treat “commerce localization” (markets, currencies, pricing presentation rules) as primarily **Shopify truth** and build our admin UX to respect those settings. Use OSS i18n libraries for our own UI localization, and use established locale data/formatting libs to avoid mistakes.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Market/currency awareness (what currencies are active) | 🛍️ Shopify (truth) + 🧑‍💻 Build | Truth: markets/currency settings in Shopify; Derived: cached display | Display active currencies + primary currency badge | S106, S107 |
| Money formatting (symbol, rounding, minor units) | 🧰 OSS (money libs) + 🧑‍💻 Build | Derived: formatted values | Implement currency formatting for 3 locales + rounding tests | S112, S108 |
| Locale-aware date/time formatting | 🧰 OSS (Intl/ICU) + 🧑‍💻 Build | Derived: formatted timestamps | Format dates in 3 locales + timezone preference | S109, S108 |
| UI translation runtime (our app UI) | 🧰 OSS (i18next) + 🧑‍💻 Build | Truth: translation keys; Derived: runtime language selection | Add 2 languages for 10 strings + language toggle | S111 |
| Message formatting (plurals, gender, rich text) | 🧰 OSS (FormatJS) + 🧑‍💻 Build | Derived: rendered strings | Pluralization for 2 messages + interpolation | S110 |
| Admin user language preference (per staff) | 🧑‍💻 Build | Truth: user preference | Save language preference per user and apply | S111, S60 |
| Export formatting (CSV decimals, separators) | 🧑‍💻 Build | Derived: export format configs | Export one report in 2 locale formats | S108, S109 |
| Multi-currency analytics normalization | 🧑‍💻 Build | Derived: normalized currency values | Store amounts with currency + normalized base currency columns | S112, S106 |
| Localization QA checklist (missing translations, RTL) | 🧑‍💻 Build | Derived: checklist + status | Checklist for 10 items + “missing keys” report | S110, S111 |

Notes:

- Don’t implement currency logic by hand; use established money/locale libraries and treat Shopify currency/market settings as truth for commerce context.
- Keep localization as “two layers”: (1) our UI i18n, (2) commerce currency/market context coming from Shopify.
- Default architecture alignment: Shopify provides commerce context truth (markets/currencies); our app stores user preferences and derived formatting/QA outputs. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #6 — Customer self-serve / deflection (order status, tracking, help center)

Assumption: Shopify is connected. Shopify provides canonical order/customer/account surfaces; shipping status events often require a tracking provider. Best leverage: build lightweight self-serve pages and structured intake that reduces “WISMO” tickets, and integrate a tracking API for reliable scan-event timelines.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Order status deep link (customer view) | 🛍️ Shopify (truth) + 🧑‍💻 Build | Truth: order status in Shopify; Derived: deflection clicks | Link to order status page + track clicks | S45, S44 |
| Customer accounts entrypoint (orders, addresses) | 🛍️ Shopify (truth) + 🧑‍💻 Build | Truth: account/order data in Shopify; Derived: usage analytics | “My account” links + basic analytics events | S46 |
| Branded tracking page (customer-facing) | 🔌 3P tracking + 🧑‍💻 Build | Truth: tracking events in provider; Derived: view analytics | One tracking page consuming tracking API | S47, S48 |
| WISMO deflection widget (where is my order) | 🧑‍💻 Build + 🛍️ Shopify + 🔌 tracking | Truth: order/tracking upstream; Derived: deflection outcome | Order lookup (email+zip) → status card | S44, S48 |
| Delivery issue intake (lost/damaged/late) | 🧑‍💻 Build | Truth: intake records; Derived: routing tags | Issue form with 3 issue types + create task | S36, S101 |
| Help center / docs search | 🧰 OSS docs platform + 🧑‍💻 Build | Truth: articles in docs system; Derived: search logs | Publish 10 articles + add search UI | S49, S42 |
| Search results tuning (deflection) | 🛍️ Shopify (surface) + 🧑‍💻 Build | Truth: store search config; Derived: top queries | Track top queries + add “best result” pin | S43, S42 |
| Returns portal entrypoint (self-serve) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: return/refund in Shopify; Derived: portal session | Link “Start a return” → call Shopify returnCreate | S202, S1 |
| Proactive notifications (shipping updates) | 🧑‍💻 Build + 🔌 push/SMS | Truth: notifications in provider; Derived: delivery logs | Send 2 notifications on scan events + logs | S15, S248 |
| Contact deflection rules (gate support form) | 🧑‍💻 Build | Truth: deflection rules; Derived: form completion | Require “lookup order” before contact form | S44, S36 |

Notes:

- Treat tracking timelines as 3P truth if you need carrier coverage and scan events; Shopify pages are great self-serve surfaces but don’t replace event coverage.
- Default architecture alignment: Shopify remains truth for orders/customers/returns; our app stores derived deflection analytics, intakes, tasks, and notification delivery logs. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #5 — Analytics & QA (extensions: warehouse + semantic layer)

Assumption: analytics should be “upstream truth → derived warehouse tables → dashboards.” This section is intentionally an **extensions layer** on top of Tranche #5 foundation (support KPIs + QA program workflows). The goal here is to standardize the data plumbing without turning the product into a BI tool.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Warehouse backfill (Shopify bulk exports) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: Shopify data; Derived: export job history | Run one bulk export (orders) + store job history | S211 |
| Daily incremental ingestion (webhooks + cursoring) | 🛍️ Shopify webhooks + 🧑‍💻 Build + 🧰 OSS jobs | Truth: Shopify events; Derived: ingestion cursor + run logs | 2 topics ingested + retry on failure + run history | S206, S89, S229 |
| Transformations (curated rollups/cohorts) | 🧰 OSS (dbt) + 🧑‍💻 Build | Derived: curated tables | One dbt model: daily support rollups | S197 |
| Semantic layer (metrics API / consistent definitions) | 🧰 OSS (Cube) + 🧑‍💻 Build | Derived: metrics API + definitions | Expose 3 metrics via semantic layer | S196 |
| Metric registry (versioned definitions + owners) | 🧑‍💻 Build | Truth: metric definitions + versions | 10 metrics with owner + change history | S196, S197 |
| Scheduled anomaly checks (KPI spikes, missing data) | 🧑‍💻 Build + 🧰 OSS jobs | Derived: anomaly flags + alerts | 2 checks (missing data, spike) + alert delivery log | S229, S219 |

Notes:

- Default architecture alignment: upstream systems remain truth; we store derived rollups and registry metadata internally. (`artifacts/build-vs-integrate-agent.md`)
- Keep Tranche #5 foundation as the canonical place for QA rubrics/evaluations/coaching workflows; this tranche is only the analytics plumbing extensions.

## Tranche #27 — Promotions measurement (ROI, cohorts, holdouts, abuse monitoring)

Assumption: Shopify is connected; Shopify discount objects are truth for “what promotions exist.” Measurement is derived: we build event + metric tables and compute ROI/cohorts/overlap. Use OSS for experimentation plumbing and metrics governance, not for commerce truth.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Promo inventory list (what promos exist) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: discount objects in Shopify; Derived: cached list | List discounts via discountNodes + status filters | S247 |
| Redemption / revenue attribution baseline | 🧑‍💻 Build + 🛍️ Shopify API | Truth: orders in Shopify; Derived: promo→order attribution rows | Compute “orders with discount code” daily rollup | S210, S196 |
| Metric registry for promo KPIs (versioned) | 🧑‍💻 Build | Truth: metric definitions + owners | 10 promo KPIs w/ owner + change history | S196, S197 |
| Cohort dashboards by promo exposure/redemption | 🧑‍💻 Build + 🧰 OSS analytics | Derived: cohort tables + charts | 1 cohort chart (repeat purchase) by promo | S198, S196 |
| Holdout/experiment framework (A/B promos) | 🧰 OSS (GrowthBook) + 🧑‍💻 Build | Truth: experiment definitions; Derived: assignment logs | One holdout rule for a segment + results table | S195 |
| Stacking/overlap detection (promo interactions) | 🧑‍💻 Build | Derived: overlap matrix | Report: top 10 overlapping promos + revenue | S196 |
| Abuse monitoring (high redemptions, suspicious patterns) | 🧑‍💻 Build + 🧰 OSS jobs | Derived: abuse flags + alerts | 2 abuse rules + alert delivery log | S229, S194 |
| Promo preview / test cart simulator | 🧑‍💻 Build + 🛍️ Shopify discount truth | Derived: simulation results | Simulate one promo on 3 carts and store results | S247, S152 |
| Event pipeline for promo tracking | 🧰 OSS pipeline + 🧑‍💻 Build | Derived: event stream + schema | Track “promo viewed/applied” events + validate schema | S199, S194 |

Notes:

- Default architecture alignment: Shopify is truth for discounts and orders; our app stores derived event logs, metric tables, experiments/holdouts, and abuse flags. (`artifacts/build-vs-integrate-agent.md`)
- Treat measurement definitions as versioned product artifacts (metric registry) to avoid KPI drift over time.

## Tranche #25 — Shipping exceptions refresh (scan gaps, claims, tracking page v2)

Assumption: Shopify is connected; Shopify is truth for fulfillments/tracking numbers and fulfillment holds. Exception detection depends on carrier scan events, which generally requires a tracking provider API/webhooks. We build the exception inbox, playbooks, notification routing, and webhook delivery observability.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Scan-gap detector (hours since last scan) | 🧑‍💻 Build + 🔌 tracking webhooks + 🧰 OSS jobs | Derived: scan-gap flags + timestamps | One rule (48h no scan) + exceptions list | S179, S182, S229 |
| Canonical status normalization (carrier → internal status) | 🧑‍💻 Build | Derived: status mapping table | Map 10 statuses → 5 internal buckets | S14, S184 |
| Branded tracking page v2 (deflection + comms) | 🔌 tracking API + 🧑‍💻 Build | Truth: scan events upstream; Derived: page views | Tracking page that renders normalized timeline | S183, S47 |
| Address issue workflow (verify + confirm) | 🔌 3P address verification + 🧑‍💻 Build | Truth: verification results; Derived: customer confirmations | Verify address and create “confirm” task | S17, S101 |
| Lost package playbook (claims + refund rules) | 🧑‍💻 Build + 🛍️ Shopify API | Truth: refund in Shopify; Derived: playbook steps + outcomes | 5-step playbook + “refund issued” action | S180, S200 |
| Carrier claim links + checklist | 🧑‍💻 Build | Derived: checklist completion | One carrier claim checklist + links | S180 |
| Notification routing (who gets alerted) | 🧑‍💻 Build + 🔌 notifications | Truth: notification provider; Derived: delivery log | Route 2 alert types by role + logs | S15, S248 |
| Fulfillment hold/unhold from exceptions | 🛍️ Shopify API + 🧑‍💻 Build | Truth: hold in Shopify; Derived: hold reason + audit | Add hold + release hold buttons on exception | S208, S209, S65 |
| Webhook delivery diagnostics (tracking provider + Shopify) | 🧑‍💻 Build + 🛍️ Shopify API | Derived: delivery log + retries | Delivery log view + “replay” for one topic | S206, S186 |
| Escalation timers (SLA for exceptions) | 🧑‍💻 Build + 🧰 OSS jobs | Derived: timers + breach flags | Breach badge for 2 exception types | S35, S229 |

Notes:

- Default architecture alignment: Shopify holds/refunds are upstream truth; scan events come from tracking provider; our app stores derived exception state, playbooks, and notification delivery logs. (`artifacts/build-vs-integrate-agent.md`)
- Consolidation note: This tranche is intentionally a “refresh/extensions” layer that builds on Tranche #2 foundations. If implementing, start with Tranche #2 (canonical status + exception inbox + ingestion) then add these features. (`artifacts/build-vs-integrate-agent.md`)

## Tranche #26 — B2B subscription ops (accounts, quotes, invoices, entitlements)

Assumption: Shopify is connected. For **B2B subscription billing**, merchants often need invoice-based flows (quotes, approvals, net terms, consolidated invoicing, entitlements). Best leverage is typically:

- **🛍️ Shopify subscriptions** for Shopify-native subscription contracts and billing attempts (when the merchant’s subscriptions are implemented in Shopify).
- **🔌 Billing provider API** (e.g., Chargebee/Recurly) when the merchant needs B2B account hierarchy + invoicing + quotes as the system of record.

We should avoid creating a second billing truth. Instead, build a consistent ops control plane UX (queues, approvals, policy) around whichever upstream system owns the subscription + invoice lifecycle.

| Feature / workflow slice | Best leverage | What we store (truth vs derived) | Thin slice (1–3 days) | Evidence |
|---|---|---|---|---|
| Billing account hierarchy (parent/child accounts) | 🔌 Billing provider API + 🧑‍💻 Build | Truth: account hierarchy upstream; Derived: Shopify customer/company → billing account mapping | Show “Account tree” for 1 account + mapping table | S187, S191 |
| Billing contacts + invoicing preferences (billing email, PO ref fields) | 🔌 Billing provider API + 🧑‍💻 Build | Truth: billing profile upstream; Derived: ops notes + last-updated audit | Display billing profile + “last edited by” log | S191, S65 |
| Quotes (sales-assisted pricing / procurement) | 🔌 Billing provider API + 🧑‍💻 Build | Truth: quote objects/status upstream; Derived: approval trail + internal reason codes | “Quotes inbox” view + approve/reject placeholder | S188, S65 |
| Invoice lifecycle (issue, send, download, status) | 🔌 Billing provider API + 🧑‍💻 Build | Truth: invoices upstream; Derived: internal tags + collection task state | List invoices + download link + “needs follow-up” tag | S189, S192 |
| Advance invoices (invoice ahead of term) | 🔌 Billing provider API + 🧑‍💻 Build | Truth: advance invoice config upstream; Derived: exceptions (overdue/blocked) | Toggle “advance invoice” for 1 account + flag overdue | S190, S189 |
| Shopify-native subscription contract list (admin queue) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: `SubscriptionContract` in Shopify; Derived: queue status (needs review) | List contracts with status filters | S221, S222 |
| Shopify-native contract change workflow (update cadence/address/items) | 🛍️ Shopify API + 🧑‍💻 Build | Truth: contract state in Shopify; Derived: change request + approval/audit | “Request change” → approval → call update mutation | S223, S65 |
| Shopify-native cancellation + churn reason taxonomy | 🛍️ Shopify API + 🧑‍💻 Build | Truth: cancellation in Shopify; Derived: churn reason taxonomy + notes | Cancel flow with 5 reason codes + audit trail | S224, S65 |
| Staged changes / “edit upcoming order” flow | 🛍️ Shopify API + 🧑‍💻 Build | Truth: draft state in Shopify; Derived: proposed changes + reviewer notes | Create/update/commit a draft from admin UI | S227 |
| Billing failure queue (dunning / retries) | 🛍️ Shopify API + 🧰 OSS jobs + 🧑‍💻 Build | Truth: billing attempts upstream; Derived: dunning tasks + outreach attempts | “Failed billing attempts” queue + retry timer jobs | S225, S226, S229 |
| Entitlements / feature gating (seats/features) | 🔌 Billing provider entitlements + 🧑‍💻 Build | Truth: entitlement definitions upstream; Derived: effective entitlements in our app + provisioning logs | Sync 5 entitlements → show effective access for 1 account | S193 |
| Seat provisioning ops (assign/revoke seats, invite users) | 🧑‍💻 Build + (optional) 🔌 entitlements | Truth: seat assignments in our app; Derived: audit + status | Assign/revoke seats for 1 account + audit log | S193, S65 |

Notes:

- Default architecture alignment: keep **subscription + invoice truth** in the upstream owner (Shopify subscriptions OR billing provider). Our app stores only derived ops state (queues/approvals/tasks/audit). (`artifacts/build-vs-integrate-agent.md`)
- “Two-mode” implementation guidance: start with Shopify-native flows (contracts + billing attempts) for Shopify merchants; add billing-provider mode only when the merchant’s billing truth is external (account hierarchy, quotes, invoices, entitlements). (S221–S227, S187–S193)
