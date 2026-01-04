---
status: draft
last_reviewed: 2025-12-28
owner: agent
---

# Competitor Matrix (Core Sweep)

Purpose: breadth-first list, then deepened “winners” with copyable workflows/features.

## 1) Categories + inclusion criteria

- Categories:
  - Commerce platforms (all-in-one)
  - Headless commerce (developer-first / composable)
  - Shipping + tracking + fulfillment ops
  - Returns + post-purchase ops
  - Subscriptions
  - Support / helpdesk (merchant admin workflows)
- What counts as core competitor:
  - Directly touches ecommerce “admin + ops” workflows (orders, shipping, returns, subscriptions, support).
  - Has an admin/control-plane UI or an ops workflow we can model.
- What is adjacent/out of scope:
  - Pure analytics/experiment tools (covered in Step 03).
  - Generic infra not tied to merchant workflows.
- Target persona(s): merchant admins (primary), internal ops (secondary)

## 2) Breadth list (30–60)

Format:
- Name — Category — What they sell (1 line) — Why relevant (1 line) — Links

- Shopify — commerce platform — all-in-one commerce platform — baseline admin UX — https://www.shopify.com
- BigCommerce — commerce platform — ecommerce platform — common alternative to Shopify — https://www.bigcommerce.com
- WooCommerce — commerce platform — ecommerce for WordPress — huge ecosystem patterns — https://woocommerce.com
- Adobe Commerce (Magento) — commerce platform — enterprise commerce — enterprise admin patterns — https://business.adobe.com/products/magento/magento-commerce.html
- Salesforce Commerce Cloud — commerce platform — enterprise commerce — enterprise workflows — https://www.salesforce.com/products/commerce-cloud/overview/
- commercetools — headless commerce — composable commerce platform — headless patterns — https://commercetools.com
- Elastic Path — headless commerce — composable commerce — headless patterns — https://www.elasticpath.com
- Shopware — commerce platform — EU commerce platform — admin patterns — https://www.shopware.com
- PrestaShop — commerce platform — SMB commerce platform — admin patterns — https://prestashop.com
- Medusa — headless commerce (OSS) — dev-first commerce — OSS patterns — https://medusajs.com
- Saleor — headless commerce (OSS) — GraphQL-first headless commerce — OSS patterns — https://saleor.io
- Vendure — headless commerce (OSS) — TS headless commerce — OSS patterns — https://www.vendure.io
- ShipStation — shipping — shipping labels + ops — shipping workflow UX — https://www.shipstation.com
- Shippo — shipping — shipping API + labels — API patterns — https://goshippo.com
- EasyPost — shipping api — shipping primitives — API patterns — https://www.easypost.com
- AfterShip — post-purchase suite — tracking + returns suite — post-purchase ops — https://www.aftership.com
- Loop Returns — returns — returns + exchanges portal — returns workflow UX — https://loopreturns.com
- ReturnGO — returns — returns management — returns workflows — https://returngo.ai
- Narvar — post-purchase — post-purchase suite — enterprise post-purchase patterns — https://www.narvar.com
- Recharge — subscriptions — subscription platform — subscription admin workflows — https://rechargepayments.com
- Skio — subscriptions — subscription app — subscription workflows — https://skio.com
- Gorgias — helpdesk — ecommerce support helpdesk — merchant support workflows — https://www.gorgias.com
- Zendesk — helpdesk — helpdesk suite — support workflows — https://www.zendesk.com

## 3) Winners deepened (top ~15)

Use this block per winner:

### Shopify

- Category: commerce platform
- Website: https://www.shopify.com
- What they sell (1 line): all-in-one commerce platform for operating an online business.

Notable features (5–10):
- “All-in-one” admin surface (products, orders, customers, settings)
- POS features (from captured variant page)
- Strong onboarding + plan/pricing structure

Workflows worth copying (2–4):
1) “Start store” onboarding → pick plan later → guided setup checklist
2) Ops daily loop: orders → fulfill → communicate → track status

What we can steal:
- Easy: onboarding checklist UI pattern; “setup and pick plan later” messaging
- Medium: unified order timeline UI (order + customer + shipment + notes)
- Hard: full platform-level breadth (POS, payments, shipping, apps ecosystem)

Evidence links:
- `competitors/evidence/shopify.md`

### BigCommerce

- Category: commerce platform
- Website: https://www.bigcommerce.com
- What they sell (1 line): ecommerce platform for running an online store.

Notable features (5–10):
- Platform-led approach with pricing/plan packaging
- Focus on merchant operations tooling (admin-first surface)

Workflows worth copying (2–4):
1) “Platform comparison” flow → decision support copy + positioning
2) Admin IA patterns (category-first navigation)

What we can steal:
- Easy: positioning pages → “what we do vs X” structure
- Medium: clean “admin primitives” (permissions, roles, audit trails)
- Hard: enterprise-grade platform breadth

Evidence links:
- `competitors/evidence/bigcommerce.md`

### WooCommerce

- Category: commerce platform
- Website: https://woocommerce.com
- What they sell (1 line): ecommerce for WordPress with an extensible plugin ecosystem.

Notable features (5–10):
- Ecosystem-first approach (extensions marketplace pattern)
- Merchant-friendly packaging around store management

Workflows worth copying (2–4):
1) “Install + extend” workflow: baseline store → add extensions for capabilities
2) “App marketplace” discovery → category browsing → install CTA pattern

What we can steal:
- Easy: extension catalog organization patterns
- Medium: plugin-driven “capabilities as modules” architecture
- Hard: marketplace + billing + install pipeline

Evidence links:
- `competitors/evidence/woocommerce.md`

### Medusa

- Category: headless commerce (oss)
- Website: https://medusajs.com
- What they sell (1 line): developer-first commerce platform for specialized commerce cases.

Notable features (5–10):
- Developer positioning (“flexible commerce platform”)
- OSS adoption patterns (docs, examples, modularity)

Workflows worth copying (2–4):
1) “Start headless backend” → add modules → integrate storefront/admin
2) “Developer docs first” UX: learn → build → extend

What we can steal:
- Easy: docs structure + starter templates layout
- Medium: modular “capability packs” approach (shipping/returns/subscriptions as modules)
- Hard: full headless commerce backend replacement

Evidence links:
- `competitors/evidence/medusa.md`

### Saleor

- Category: headless commerce (oss)
- Website: https://saleor.io
- What they sell (1 line): headless, open source, GraphQL-first ecommerce platform.

Notable features (5–10):
- API-first positioning (GraphQL-first)
- Composable/headless messaging

Workflows worth copying (2–4):
1) “API-first commerce” story: docs → schema → integrations
2) “Composable” pitch: slot into existing stack

What we can steal:
- Easy: “API-first” documentation framing
- Medium: GraphQL schema design + developer UX
- Hard: commerce engine parity

Evidence links:
- `competitors/evidence/saleor.md`

### AfterShip

- Category: post-purchase suite (tracking/returns)
- Website: https://www.aftership.com
- What they sell (1 line): all-in-one ecommerce operations and post-purchase experience platform.

Notable features (5–10):
- Centralized “operations on a single platform” positioning
- Developer docs + APIs (captured docs variant)
- Post-purchase focus (reduce costs, streamline CX)

Workflows worth copying (2–4):
1) “Integrations first” onboarding: connect store → connect carriers → start tracking/returns
2) “Ops dashboard” loop: exceptions → actions → notifications

What we can steal:
- Easy: integration checklist UI + “connect X” progress UX
- Medium: unified post-purchase timeline across shipments/returns
- Hard: full ops suite breadth

Evidence links:
- `competitors/evidence/aftership.md`

### Loop Returns

- Category: returns
- Website: https://loopreturns.com
- What they sell (1 line): returns + exchanges workflow/portal for ecommerce brands.

Notable features (5–10):
- No‑code return policy “Workflows” (rules by product/customer/order/return attributes)
- Exchange‑first mechanics including “Instant exchange”
- Fraud prevention gates with manual review before refund

Workflows worth copying (2–4):
1) Policy builder: define rules → segment customers → set outcomes (exchange/credit/refund) → add fraud gates → iterate
2) Exchange-first return: shopper starts return → sees exchange-first offers → label/drop-off → resolution + notifications

What we can steal:
- Easy: policy templates + no‑code rules UI (“workflows” as a product surface)
- Medium: fraud review queue that plugs into refunds (flag → manual review → approve/deny)
- Hard: instant exchanges with inventory reservation + logistics coupling (OMS/WMS + comms)

Evidence links:
- `competitors/evidence/loop-returns.md`

### Recharge

- Category: subscriptions
- Website: https://rechargepayments.com
- What they sell (1 line): subscriptions and recurring payments platform for ecommerce (Shopify-heavy).

Notable features (5–10):
- Claims category dominance/credibility (“powering 71% of subscriptions sold on Shopify stores”).
- Subscriber lifecycle framing as the core product loop (optimize subscriber lifecycle → increase conversion → maximize LTV).
- Portal + merchandising surfaces (customer portal + upsells/cross-sells shown as first-class product surfaces).

Workflows worth copying (2–4):
1) Launch subscriptions (merchant admin): install → configure offers → enable customer portal → monitor retention/LTV loop.
2) Subscription ops ritual: review subscriber metrics → iterate portal + incentives → add upsells/cross-sells → repeat.

What we can steal:
- Easy: make “subscriber lifecycle → conversion → LTV” the default dashboard narrative (merchant-readable).
- Medium: bundle portal + upsells into one configuration flow (avoid tool sprawl).
- Hard: full subscription state machine (billing retries, proration, inventory coupling, checkout edge cases).

Evidence links:
- `competitors/evidence/recharge.md`

### Skio

- Category: subscriptions
- Website: https://skio.com
- What they sell (1 line): Shopify subscriptions platform pitched to “top brands” upgrading for better retention + analytics.

Notable features (5–10):
- Analytics explicitly surfaced: revenue analytics, dunning analytics, and forecasting analytics.
- Customer portal UX emphasized (multiple “example portal” screenshots).
- Pricing posture: “All features included—no upsells, no surprises” + “seamless migration” positioning.

Workflows worth copying (2–4):
1) Migration-first onboarding: pick offer → migrate → configure portal → launch → iterate using analytics.
2) Subscription ops loop: revenue → dunning → forecasting → interventions → repeat.

What we can steal:
- Easy: dashboard that prioritizes dunning + forecasting alongside revenue (not an afterthought).
- Medium: migration wizard that validates subscription data correctness and reduces “go-live fear.”
- Hard: forecasting tied to billing state + inventory/fulfillment constraints (real ops planning, not just charts).

Evidence links:
- `competitors/evidence/skio.md`

### Bold Subscriptions

- Category: subscriptions
- Website: https://boldcommerce.com
- What they sell (1 line): Shopify subscriptions app focused on conversion/AOV lift + recurring revenue (plus migrations/winbacks).

Notable features (5–10):
- Upsell posture is explicit (“upsell subscribers” + boost conversions/AOV/recurring revenue).
- Retention controls: “prevent cancellations” + “churn reduction and winbacks”.
- Migration + interoperability: “migrate free from” competitor tools + integrates with upsell & bundles apps.

Workflows worth copying (2–4):
1) Subscription setup with upsells: install → configure offers → embed upsells → launch.
2) Churn program loop: detect cancellation intent → winback intervention → measure impact → repeat.

What we can steal:
- Easy: upsells as a first-class subscription configuration step.
- Medium: named “migrate from X” onboarding flow that removes adoption friction.
- Hard: unified rules/eligibility across subscriptions + bundles + upsells (consistent pricing + state).

Evidence links:
- `competitors/evidence/bold-subscriptions.md`

### Signifyd

- Category: fraud prevention / chargebacks
- Website: https://www.signifyd.com
- What they sell (1 line): fraud + abuse protection with guaranteed chargeback protection (Shopify app).

Notable features (5–10):
- Guaranteed protection against fraud and non-fraud chargebacks (explicit Shopify listing posture).
- Policy simulation + agent console + reporting dashboards (risk ops UX surfaces).
- Pricing posture is “request quote” style (pricing page exists, quote-oriented).

Workflows worth copying (2–4):
1) Fraud onboarding: install → enable protection → simulate policies on historical orders → monitor agent console → iterate.
2) Policy iteration loop: review trends → simulate changes → deploy → monitor approval/chargeback outcomes.

What we can steal:
- Easy: policy simulation as a standard configuration step.
- Medium: explainability “agent console” that shows decision variables for trust/support.
- Hard: guarantee product (liability + underwriting + dispute operations) as a merchant-friendly promise.

Evidence links:
- `competitors/evidence/signifyd.md`

### Riskified

- Category: fraud prevention / chargebacks
- Website: https://www.riskified.com
- What they sell (1 line): real-time fraud decisioning with guaranteed chargeback protection (Shopify app).

Notable features (5–10):
- Real-time fraud decisions + explicit guarantee posture for chargebacks.
- Implementation narrative (“integrate in weeks”) plus automation framing.
- Dashboard + “chargeback guarantee flow” surfaces shown in listing screenshots.

Workflows worth copying (2–4):
1) Integrate-in-weeks rollout: install → connect data flows → enable automation defaults → validate guarantee flow.
2) Ops loop: monitor dashboard → review edge cases → iterate controls → track guarantee outcomes.

What we can steal:
- Easy: explain the guarantee flow in-product (what’s covered / escalation path).
- Medium: onboarding checklist and timeline that makes trust tooling feel manageable.
- Hard: guarantee underwriting + dispute ops bundled with decisioning engine.

Evidence links:
- `competitors/evidence/riskified.md`

### NoFraud

- Category: fraud prevention / chargebacks
- Website: https://nofraud.com
- What they sell (1 line): fraud and revenue protection (chargeback elimination + “approve more orders” framing; includes subscriptions).

Notable features (5–10):
- Listing positions “eliminate chargebacks while approving more orders” (revenue protection posture).
- Dashboard + transparent decision details + “custom overrides” (rules) shown in screenshots.
- Subscription fraud & abuse prevention explicitly surfaced in screenshots.

Workflows worth copying (2–4):
1) Setup + guardrails: install → configure screening → add custom overrides → audit decisions → iterate.
2) Subscription fraud ops: enable subscription abuse prevention → monitor dashboard → automate workflows via settings.

What we can steal:
- Easy: “why was this blocked/approved?” transparency UI as a default primitive.
- Medium: custom override rules UI for fast response to new abuse patterns.
- Hard: subscription-specific fraud models and workflows (recurring billing + ATO patterns).

Evidence links:
- `competitors/evidence/nofraud.md`

### Chargeflow

- Category: chargebacks / fraud prevention
- Website: https://chargeflow.io
- What they sell (1 line): chargeback management automation + fraud prevention/alerts for Shopify merchants.

Notable features (5–10):
- “Prevent, alert, and automate” chargeback management posture (Shopify listing).
- Evidence automation + unified analytics surfaced in listing screenshots.
- Integrations: Shopify Payments + Stripe + PayPal + “50+ more” (listing screenshot callout).

Workflows worth copying (2–4):
1) Onboard disputes automation: install → connect payment providers → enable alerts → enable evidence automation → monitor analytics.
2) Learning loop: analyze reasons → identify friendly fraud → tune prevention controls → repeat.

What we can steal:
- Easy: merchant-readable alerting and outcome framing.
- Medium: automated evidence generation that’s explainable and customizable.
- Hard: cross-provider dispute automation with consistent audit trails.

Evidence links:
- `competitors/evidence/chargeflow.md`

### ClearSale

- Category: fraud prevention / chargebacks
- Website: https://www.clear.sale
- What they sell (1 line): ecommerce fraud prevention + chargeback protection guarantee with an “approval rate / false positive” posture.

Notable features (5–10):
- “Balanced approach” positioned to maximize approvals while minimizing false positives.
- Approval queue + order/customer behavior review surfaces shown in listing screenshots.
- Admin surfaces include user/store/company management (multi-store / team ops).

Workflows worth copying (2–4):
1) Approval queue ops: install → review pending approvals → inspect behavior → approve/deny → track approval rates.
2) Reduce false positives loop: monitor approval rate → review edge cases → iterate operational settings/permissions.

What we can steal:
- Easy: approval-request queue with approval-rate metric as a north star.
- Medium: explicit “high approval + low false positives” tradeoff surfaced in UX.
- Hard: chargeback guarantee product (liability + underwriting + dispute ops).

Evidence links:
- `competitors/evidence/clearsale.md`

### Stripe

- Category: payments
- Website: https://stripe.com
- What they sell (1 line): payments platform + hosted checkout pages + developer docs + transparent fees surface.

Notable features (5–10):
- Conversion-optimized hosted checkout (low-code checkout pages positioned to enhance conversion rates).
- Unified payments platform framing that avoids one-off “merchant account / gateway / processor” integrations.
- Strong developer docs and pricing/fees page as first-class surfaces.

Workflows worth copying (2–4):
1) Payments + Checkout setup: choose Stripe Payments → implement Stripe Checkout → validate via docs → go live.
2) Fee review loop: review pricing/fees → map to margin model → revisit as volume/mix changes.

What we can steal:
- Easy: checkout framed as a conversion lever, not just plumbing.
- Medium: unified onboarding that removes “gateway/processor” integration sprawl.
- Hard: global payment method orchestration + developer ergonomics + hosted checkout.

Evidence links:
- `competitors/evidence/stripe.md`

### Adyen

- Category: payments
- Website: https://www.adyen.com
- What they sell (1 line): end-to-end payments platform that combines payments, data, and financial management.

Notable features (5–10):
- Platform framing: payments + data + financial management in one solution.
- Omnichannel developer posture (docs explicitly cover online + point-of-sale payments).
- Transparent pricing posture (no setup fees; pay per transaction).

Workflows worth copying (2–4):
1) Platform rollout: align on platform scope → integrate via developer portal → implement checkout flows → go live.
2) Payment method cost loop: review pricing per payment method → choose method mix → iterate over time.

What we can steal:
- Easy: transparent pricing per payment method to reduce sales friction.
- Medium: docs that unify online + POS integration story (shared primitives, clear branching).
- Hard: centralized “payments + data + financial management” platform with reconciliation/reporting at scale.

Evidence links:
- `competitors/evidence/adyen.md`

### PayPal

- Category: payments
- Website: https://www.paypal.com
- What they sell (1 line): consumer + merchant payments with business acceptance pages and developer docs for scalable checkout integrations.

Notable features (5–10):
- Merchant acceptance framing includes online and in-store payments plus “flexible payment options.”
- Broad “payment processing solutions” posture for multiple business sizes.
- Developer docs emphasize scalable checkout integrations for web and mobile.

Workflows worth copying (2–4):
1) Start accepting payments: business setup → enable online/in-store acceptance → enable flexible payment options at checkout.
2) Integrate checkout: follow developer docs → implement web/mobile checkout flow → validate before launch.

What we can steal:
- Easy: job-to-be-done landing pages for merchant setup (online/in-store/flexible options).
- Medium: tighter handoff between merchant onboarding and developer integration docs.
- Hard: consistent checkout + identity + reporting across web/mobile.

Evidence links:
- `competitors/evidence/paypal.md`

### Braintree

- Category: payments
- Website: https://www.braintreepayments.com
- What they sell (1 line): developer-first payments platform (PayPal) with SDK/API posture and pricing surface.

Notable features (5–10):
- Enterprise posture (“end-to-end payment platform” positioned to drive growth).
- Explicit developer mission statement (SDKs/APIs to serve merchants globally).
- Fees/pricing page exists as a dedicated surface.

Workflows worth copying (2–4):
1) Developer-first integration: choose platform → follow docs → implement SDK/API flow → validate for required markets.
2) Fees evaluation: review pricing posture → map to expected volume/mix → revisit as markets expand.

What we can steal:
- Easy: docs that explicitly frame the integration posture and developer target.
- Medium: “end-to-end” narrative that connects platform primitives to growth outcomes.
- Hard: global payments reliability without sacrificing developer UX.

Evidence links:
- `competitors/evidence/braintree.md`

### Bolt

- Category: checkout
- Website: https://www.bolt.com
- What they sell (1 line): one-click checkout positioned as a conversion lift, supported by merchant docs/help.

Notable features (5–10):
- Checkout positioning: UX + conversion tools + “80M+ shopper network” to boost revenue.
- One-click checkout benchmarked explicitly against guest checkout conversion.
- Merchant help/docs explicitly scoped to Bolt Checkout.

Workflows worth copying (2–4):
1) Launch one-click checkout: adopt checkout → implement via merchant help → validate → go live → measure conversion lift.
2) CRO loop: compare one-click vs guest checkout → iterate checkout config/tools → repeat.

What we can steal:
- Easy: the “one-click vs guest checkout” benchmark framing for merchants.
- Medium: bundling UX + conversion tools into checkout so merchants don’t stitch multiple apps.
- Hard: cross-merchant shopper network + identity/saved state.

Evidence links:
- `competitors/evidence/bolt.md`

### Cin7

- Category: inventory/OMS
- Website: https://www.cin7.com
- What they sell (1 line): inventory management + order/channel control with a large integrations footprint.

Notable features (5–10):
- “Control stock, orders, and sales channels” framing (one system for inventory + orders + channels).
- Integration breadth is explicit (700+ integrations including Shopify/QuickBooks/Amazon/Xero).
- Plan packaging segmented into Core vs Omni.

Workflows worth copying (2–4):
1) Onboard: connect channels → connect accounting → automate inventory/order updates across channels.
2) Upgrade loop: start Core → move to Omni as multi-channel complexity grows.

What we can steal:
- Easy: integrations directory as a first-class product surface.
- Medium: onboarding checklist anchored to channels → accounting → automation.
- Hard: real-time omni-channel inventory accuracy (multi-warehouse + reconciliation).

Evidence links:
- `competitors/evidence/cin7.md`

### Linnworks

- Category: inventory/OMS
- Website: https://www.linnworks.com
- What they sell (1 line): inventory and order management software (Shopify listing), emphasizing forecasting and ops views.

Notable features (5–10):
- Inventory + order management framing is explicit in Shopify listing.
- Screenshot surfaces highlight order management, shipping integrations, insights, and stock forecasting.
- Listing metadata shows “Free to install” entry posture.

Workflows worth copying (2–4):
1) Shopify-first setup: install → unify orders + inventory → configure shipping integrations → operate with insights + forecasting.
2) Replenishment loop: forecasting → purchasing plan → monitor outcomes → repeat.

What we can steal:
- Easy: stock forecasting as a first-class surface.
- Medium: unified “orders + inventory + shipping integrations” cockpit UX.
- Hard: forecasting + multi-channel sync under high SKU/high volume constraints.

Evidence links:
- `competitors/evidence/linnworks.md`

### Brightpearl

- Category: inventory/ops
- Website: https://www.brightpearl.com
- What they sell (1 line): “Retail Operating System” for retailers/wholesalers; automates back-office for scale.

Notable features (5–10):
- Retail OS framing: automation of back office to “grow fearlessly” (hyper scalability narrative).
- Integrations surfaced as an “app store” marketplace.
- Sales-led pricing posture for larger/fast-growth merchants.

Workflows worth copying (2–4):
1) Back-office automation rollout: centralize ops → connect integrations → automate repeatable workflows → scale.
2) Enterprise onboarding: qualify → align requirements → implement integrations + automation.

What we can steal:
- Easy: cohesive “Retail OS” narrative for ops consolidation.
- Medium: integration selection guided by growth stage and workflow needs.
- Hard: reliable automation under hyper growth (high order volume + multi-channel).

Evidence links:
- `competitors/evidence/brightpearl.md`

### Extensiv

- Category: OMS/WMS
- Website: https://www.extensiv.com
- What they sell (1 line): one platform for fulfillment + order + warehouse management connecting brands, warehouses, and 3PLs.

Notable features (5–10):
- “One platform” spanning fulfillment, order, and warehouse management.
- Explicit multi-party model: connect brands + warehouses + 3PLs.
- Integrations are positioned as step-by-step workflow glue (seamless integrations at each step).

Workflows worth copying (2–4):
1) Brand ↔ warehouse/3PL connectivity: connect parties → run unified workflow → integrate at each step → scale partners.
2) Consolidation: map tools into pillars → consolidate into platform → measure efficiency improvements.

What we can steal:
- Easy: stakeholder model clarity (brands/warehouses/3PLs in one sentence).
- Medium: step-by-step integration checkpoints for complex ops onboarding.
- Hard: multi-party order/inventory model with dependable sync + auditability.

Evidence links:
- `competitors/evidence/extensiv.md`

### Zoho Inventory

- Category: inventory
- Website: https://www.zoho.com/inventory
- What they sell (1 line): SMB online inventory management with a free-trial posture and plan-based scaling.

Notable features (5–10):
- “Ideal for small businesses” positioning + “Try for FREE!” adoption posture.
- Dedicated features page as a capability checklist surface.
- Plans and pricing page exists for self-serve evaluation.

Workflows worth copying (2–4):
1) SMB onboarding: start free → configure inventory/order basics → enable needed features → upgrade plan.
2) Plan-driven maturity: review plans → align to volume/features → revisit as channels/warehouses grow.

What we can steal:
- Easy: free-trial-first posture paired with an explicit features checklist.
- Medium: onboarding that maps features to the simplest merchant tasks before advanced automation.
- Hard: maintain simplicity while supporting multi-channel + advanced reconciliation.

Evidence links:
- `competitors/evidence/zoho-inventory.md`

### Gorgias

- Category: helpdesk
- Website: https://www.gorgias.com
- What they sell (1 line): ecommerce-focused customer support/helpdesk (with AI positioning).

Notable features (5–10):
- AI Agent + helpdesk suite positioned specifically for ecommerce (explicit Chat + FAQ in the pitch).
- Shopify-first positioning (helpdesk for Shopify stores) + embedded order context.
- “Order management” called out as a first-class capability (support tool claims it can do more than reply).
- Shopify App Store listing reinforces “automation & AI” + live chat + FAQ + free trial posture.

Workflows worth copying (2–4):
1) Inbox triage with embedded ecommerce context: ticket → see Shopify context → apply macro → (optional) take order action → respond/close.
2) AI Agent deflection + human handoff: AI answers common questions (FAQ-backed) → escalate on low confidence → agent continues with context.

What we can steal:
- Easy: capability list that maps 1:1 to admin primitives (AI agent, unified inbox, live chat, Shopify integration, order management).
- Medium: Shopify-first onboarding that anchors quickly to order-context (reduce context switching from day 1).
- Hard: safe AI that can take commerce actions (permissions, audit trail, reversal workflows).

Evidence links:
- `competitors/evidence/gorgias.md`

### ShipStation

- Category: shipping
- Website: https://www.shipstation.com
- What they sell (1 line): shipping label + fulfillment operations tooling.

Notable features (5–10):
- Explicit shipping automations + rate shopping + return labels (plan features surfaced in Shopify App Store)
- Multi-channel integrations posture (connect store + selling channels + carriers)
- Developer API docs for shipping primitives / fulfillment automation

Workflows worth copying (2–4):
1) Daily loop: import orders → apply automation rules (rate shop, service selection) → batch labels → tracking emails
2) Developer automation: create shipments/labels via API → sync tracking → handle holds/exceptions

What we can steal:
- Easy: pricing/plan “capability checklist” (automations, return labels, tracking) as decision UI
- Medium: rules + automations editor that reduces ops decision fatigue
- Hard: robust multi-carrier + multi-channel normalization (edge cases, reliability)

Evidence links:
- `competitors/evidence/shipstation.md`

### Shippo

- Category: shipping
- Website: https://goshippo.com
- What they sell (1 line): multi-carrier shipping platform (labels, rates, tracking) with an API surface.

Notable features (5–10):
- Shipping API + developer docs (“shipping layer of the internet” positioning)
- Plan packaging around label volumes + carrier-account connections
- Shopify App Store listing surfaces tracking + returns/reporting as part of plan pitch

Workflows worth copying (2–4):
1) Merchant setup: connect store + carriers → set defaults → print labels → tracking loop
2) API usage: rates → buy label → store tracking → customer-facing tracking experience

What we can steal:
- Easy: volume-based pricing UI (free tier capped by labels/month)
- Medium: “bring your own carrier accounts” onboarding step (enterprise-friendly)
- Hard: carrier normalization + refund/cancel lifecycle edge cases

Evidence links:
- `competitors/evidence/shippo.md`

### EasyPost

- Category: shipping api
- Website: https://www.easypost.com
- What they sell (1 line): shipping API primitives (rates/labels/tracking/address verify/insurance) across major carriers.

Notable features (5–10):
- Core primitives called out directly (rate shop, labels, address verify, tracking, insurance)
- Carrier breadth called out on docs landing page (UPS/USPS/FedEx/DHL and more)
- Pricing posture: simple pricing with no monthly fees/hidden charges

Workflows worth copying (2–4):
1) Developer baseline: rate shop → buy/print label → store tracking → ingest tracking events
2) Ops edge cases: address verification → insurance → reconcile claims

What we can steal:
- Easy: docs landing page that states carriers + capability checklist
- Medium: default “rate shop” experience baked into product primitives
- Hard: high-quality tracking ingestion + normalization at scale

Evidence links:
- `competitors/evidence/easypost.md`

---

## 3) Additional deepened set (batch 2)

### commercetools

- Category: headless commerce
- Website: https://commercetools.com
- What they sell (1 line): enterprise composable commerce platform (AI-first positioning) with docs + pricing.

Notable features (5–10):
- Composable/headless positioning (enterprise)
- Clear “pricing plans” page (packaging signal)
- Developer docs surface exists (integration + API-first signal)

Workflows worth copying (2–4):
1) Compose catalog/checkout services → ship storefront → iterate without replatforming
2) Admin loop: manage catalog + promotions → monitor performance → roll out safely

What we can steal:
- Easy: composable mental model + docs IA patterns (how they “teach” integration)
- Medium: admin UX patterns for “many services” (config surfaces, not just CRUD)
- Hard: full enterprise-grade commerce primitives

Evidence links:
- `competitors/evidence/commercetools.md`

### VTEX

- Category: commerce platform
- Website: https://vtex.com
- What they sell (1 line): connected commerce platform positioned as “backbone” for modern commerce stacks.

Notable features (5–10):
- “Connected commerce” / platform backbone positioning (stack modernization)
- Product/pricing/docs surfaces exist (even if sparse in snapshots)

Workflows worth copying (2–4):
1) Connect channels → unify commerce operations → reduce maintenance overhead
2) Admin loop: manage commerce configuration → monitor outcomes → iterate

What we can steal:
- Easy: “connected commerce” framing + onboarding narrative for merchants/IT
- Medium: admin patterns for multi-channel operations
- Hard: enterprise OMS-like capabilities (if present)

Evidence links:
- `competitors/evidence/vtex.md`

### Elastic Path

- Category: headless commerce
- Website: https://www.elasticpath.com
- What they sell (1 line): composable/headless commerce (snapshot currently blocked).

Notable features (5–10):
- Snapshot blocked (“Just a moment…”), needs manual follow-up or alternate sources.

Workflows worth copying (2–4):
1) (blocked) capture composable commerce workflows from docs/pricing pages
2) (blocked) capture admin configuration patterns for headless stacks

What we can steal:
- Easy: n/a until unblocked
- Medium: n/a until unblocked
- Hard: n/a until unblocked

Evidence links:
- `competitors/evidence/elastic-path.md`

### Salesforce Commerce Cloud

- Category: commerce platform
- Website: https://www.salesforce.com/products/commerce-cloud/overview/
- What they sell (1 line): flexible ecommerce platform with AI + automation positioning (“commerce everywhere”).

Notable features (5–10):
- AI + automation-forward positioning
- Emphasis on flexibility (platform breadth vs single workflow)

Workflows worth copying (2–4):
1) Implement automation-assisted ops loops (reduce manual admin work)
2) Run continuous optimization: launch → measure → automate next best actions

What we can steal:
- Easy: “automation-first” storytelling + admin UX copy patterns
- Medium: admin-side automation suggestions (guardrails + approvals)
- Hard: enterprise suite breadth

Evidence links:
- `competitors/evidence/salesforce-commerce-cloud.md`

### Adobe Commerce (Magento)

- Category: commerce platform
- Website: https://business.adobe.com/products/magento/magento-commerce.html
- What they sell (1 line): enterprise commerce platform (snapshot timeout/blocked).

Notable features (5–10):
- Snapshot missing (timeout/blocked) — needs retry with different URLs or manual capture.

Workflows worth copying (2–4):
1) (blocked) capture enterprise catalog/promotions/admin patterns
2) (blocked) capture extension/integration surface patterns

What we can steal:
- Easy: n/a until evidence captured
- Medium: n/a until evidence captured
- Hard: n/a until evidence captured

Evidence links:
- `competitors/evidence/adobe-commerce-magento.md`

### ShipBob

- Category: fulfillment (3PL)
- Website: https://www.shipbob.com
- What they sell (1 line): multi-channel ecommerce fulfillment with 2‑day shipping positioning; inventory + shipments ops.

Notable features (5–10):
- “Scale + 2-day shipping” fulfillment positioning + explicit inventory + shipments management.
- Product posture: fulfillment services + technology across a network of warehouses.
- Pricing posture: published “core fulfillment fees” plus request a customized quote.
- Shopify partner integration exists (automation posture for fulfillment).

Workflows worth copying (2–4):
1) Shopify → 3PL onboarding: connect store → sync products/inventory → inbound inventory → pick/pack/ship → track + exceptions.
2) Ops loop: monitor inventory + shipments → reconcile discrepancies → adjust service levels (e.g., delivery promises) and costs.

What we can steal:
- Easy: 1-sentence “value prop” that is merchant-readable (scale + 2‑day shipping) and ties directly to ops outcomes.
- Medium: Shopify integration onboarding that makes fulfillment automation the default.
- Hard: distributed warehouse network + reliable shared inventory/shipment state model.

Evidence links:
- `competitors/evidence/shipbob.md`

### Zendesk

- Category: helpdesk
- Website: https://www.zendesk.com
- What they sell (1 line): customer + employee service platform with AI Agents positioning; omnichannel support (chat/email/voice).

Notable features (5–10):
- AI Agents positioning + omnichannel support framing (chat/email/voice) as core product message.
- Plan packaging explicitly calls out “AI agents” and “Copilot” (AI as a tiered add-on / suite component).
- Shopify integration posture: “all the information… without having to leave the customer conversation” (anti-context-switching pitch).

Workflows worth copying (2–4):
1) “No context switching” support loop: message → Shopify context in-thread → reply/resolve without toggling between systems.
2) AI agent + human escalation model: AI handles first-line → escalate to human with context → Copilot assists replies → measure/iterate.

What we can steal:
- Easy: clear integration value prop (“without leaving the conversation”) that merchants immediately understand.
- Medium: packaging AI agent + Copilot as an adoption decision (not an implementation project).
- Hard: enterprise-grade omnichannel routing + identity resolution across channels/brands.

Evidence links:
- `competitors/evidence/zendesk.md`

### Intercom

- Category: customer messaging
- Website: https://www.intercom.com
- What they sell (1 line): AI-first customer service suite (Fin AI Agent + Copilot framing) and messaging workflows.

Notable features (5–10):
- “AI Agent + Copilot” bundling inside pricing plans
- Strong positioning around handling complex queries

Workflows worth copying (2–4):
1) Customer question → AI agent answers → human handoff when needed → resolution
2) Continuous improvement: monitor deflections → improve content/workflows → measure impact

What we can steal:
- Easy: AI agent UX patterns (handoff states, confidence cues, escalation buttons)
- Medium: shared inbox + action center patterns (embed order context)
- Hard: end-to-end customer messaging + automation platform

Evidence links:
- `competitors/evidence/intercom.md`

### Yotpo

- Category: reviews/ugc
- Website: https://www.yotpo.com
- What they sell (1 line): ecommerce marketing platform for loyalty + reviews (pricing/plans surfaced).

Notable features (5–10):
- Loyalty + reviews positioning
- Pricing/plans page exists (packaging signal)

Workflows worth copying (2–4):
1) Collect reviews/UGC → moderate/approve → publish → measure impact
2) Loyalty loop: earn/redeem → reward configuration → analyze retention impact

What we can steal:
- Easy: moderation queues + publish/approve admin UX patterns
- Medium: incentive configuration surfaces (rules, thresholds, tiers)
- Hard: full loyalty/reviews ecosystem integrations

Evidence links:
- `competitors/evidence/yotpo.md`

### Happy Returns

- Category: returns
- Website: https://happyreturns.com
- What they sell (1 line): returns software + reverse logistics (UPS) for ecommerce merchants.

Notable features (5–10):
- “Return Bar®” network for box‑free / label‑free drop‑off returns (positioned as ~8,000 locations)
- In‑person item scan/verification as a fraud/quality gate (bag tracked back to retailer)
- BORIS (Buy Online, Return In‑Store) and cross‑brand in‑store returns + coupon/promo hooks

Workflows worth copying (2–4):
1) Return Bar flow: shopper initiates → QR/drop‑off → scan/verify → “verification event” triggers refund → track bag
2) BORIS flow: start online or in-store → surface nearby locations/hours + promo → associate-assisted return → comms loop

What we can steal:
- Easy: “return method picker” (mail-in vs drop-off vs in-store) framed around convenience
- Medium: verification-gated instant refunds (scan/verify → refund) to reduce fraud and speed CX
- Hard: physical drop-off network + consolidation logistics (partner-dependent)

Evidence links:
- `competitors/evidence/happy-returns.md`

---

## 4) Additional deepened set (batch 3)

### Loox

- Category: reviews/ugc
- Website: https://loox.io
- What they sell (1 line): photo reviews + UGC to increase trust and conversion (merchant-facing app patterns).

Notable features (5–10):
- Photo reviews/UGC positioning (conversion + trust)
- Likely moderation and incentives workflows (common in category)

Workflows worth copying (2–4):
1) Collect review → moderate/approve → publish → measure impact
2) Incentivize review submission → prevent abuse → maintain authenticity

What we can steal:
- Easy: moderation queue UI + publish/approve patterns
- Medium: “review request” scheduling + templates
- Hard: full UGC pipeline + syndication

Evidence links:
- `competitors/evidence/loox.md`

### Mailchimp

- Category: email marketing
- Website: https://mailchimp.com
- What they sell (1 line): email marketing automation platform (campaigns, audiences, journeys) with strong admin UX patterns.

Notable features (5–10):
- Audience segmentation + campaign builder positioning
- Pricing/packaging surfaced via variants

Workflows worth copying (2–4):
1) Import customers → segment → launch campaign → monitor performance → iterate
2) Build automation journey → test → enable → watch deliverability/outcomes

What we can steal:
- Easy: campaign builder UX patterns (draft/publish states, previews)
- Medium: journey builder mental model (steps, triggers, conditions)
- Hard: deliverability + email infrastructure depth

Evidence links:
- `competitors/evidence/mailchimp.md`

### PrestaShop

- Category: commerce platform
- Website: https://prestashop.com
- What they sell (1 line): SMB ecommerce platform; useful baseline for admin patterns and feature breadth.

Notable features (5–10):
- Classic commerce platform positioning
- Snapshot present; variant pages captured

Workflows worth copying (2–4):
1) Configure catalog → launch store → manage orders → handle returns
2) Install extensions/modules → manage upgrades → maintain stability

What we can steal:
- Easy: “classic commerce admin” IA (catalog/orders/customers/settings)
- Medium: extension marketplace install/upgrade UX patterns
- Hard: long-tail platform coverage

Evidence links:
- `competitors/evidence/prestashop.md`

### ShipHero

- Category: warehouse management
- Website: https://shiphero.com
- What they sell (1 line): warehouse management + fulfillment ops tooling; strong source of ops dashboard patterns.

Notable features (5–10):
- WMS is explicitly designed for DTC brands and 3PL providers running their own warehouse + shipping operations.
- Shopify integration posture: Shopify Plus Certified Partner + “end-to-end control – from checkout to front door”.
- Integrations are a first-class product surface (dedicated integrations page).

Workflows worth copying (2–4):
1) Run-your-own-warehouse loop: receive → putaway → pick/pack/ship → exceptions → continuous ops improvement.
2) Shopify “end-to-end control” loop: connect store → sync order flow into warehouse ops → execute fulfillment while preserving CX expectations.

What we can steal:
- Easy: dual-persona positioning (DTC brands + 3PL providers) to broaden adoption.
- Medium: “certified partner” integration trust posture for high-volume merchants.
- Hard: WMS-grade inventory state model + throughput UX with exception handling.

Evidence links:
- `competitors/evidence/shiphero.md`

### Spree Commerce

- Category: headless commerce (oss)
- Website: https://spreecommerce.org
- What they sell (1 line): open-source ecommerce platform; useful for feature surface + admin patterns inspiration.

Notable features (5–10):
- OSS commerce platform framing
- Variant pages captured (docs/features surfaces)

Workflows worth copying (2–4):
1) Configure store → manage products/orders → extend via plugins
2) Developer workflow: integrate APIs → customize storefront/admin

What we can steal:
- Easy: OSS commerce feature inventory and vocabulary
- Medium: extension/plugin boundaries patterns
- Hard: full platform parity vs hosted suites

Evidence links:
- `competitors/evidence/spree-commerce.md`

### Square Online

- Category: commerce platform
- Website: https://squareup.com/us/en/online-store
- What they sell (1 line): omnichannel POS + online store; strong “offline ↔ online” ops patterns.

Notable features (5–10):
- Omnichannel baseline (POS + online)
- Variant pages captured (pricing/product surfaces)

Workflows worth copying (2–4):
1) Set up products → sync inventory → sell online + in store → reconcile
2) Orders + fulfillment loop: pickup/delivery/shipping coordination

What we can steal:
- Easy: omnichannel inventory status UI patterns
- Medium: store setup onboarding wizard patterns
- Hard: POS ecosystem integrations

Evidence links:
- `competitors/evidence/square-online.md`

### Sylius

- Category: headless commerce (oss)
- Website: https://sylius.com
- What they sell (1 line): OSS commerce platform; useful for catalog/order primitives and extensibility patterns.

Notable features (5–10):
- OSS commerce positioning
- Variant pages captured (pricing/docs/features likely)

Workflows worth copying (2–4):
1) Configure catalog/pricing → manage orders → extend via plugins
2) Developer integration: customization boundaries + upgrade strategy

What we can steal:
- Easy: OSS commerce primitives inventory (catalog, orders, promos)
- Medium: extension boundaries + upgrade playbooks
- Hard: building full commerce suite ourselves

Evidence links:
- `competitors/evidence/sylius.md`

### Ecwid

- Category: commerce platform
- Website: https://www.ecwid.com
- What they sell (1 line): embeddable storefront + ecommerce platform; useful for “add commerce anywhere” onboarding UX.

Notable features (5–10):
- Embeddable commerce framing (plugin/embed patterns)
- Variant pages captured (pricing/docs/features)

Workflows worth copying (2–4):
1) Create store → embed widget → sync products → start selling
2) Configure payments/shipping/taxes quickly (setup wizard patterns)

What we can steal:
- Easy: frictionless onboarding + “embed everywhere” messaging
- Medium: setup wizards with validation + defaults
- Hard: breadth of payments/shipping/tax edge cases

Evidence links:
- `competitors/evidence/ecwid.md`

### OpenCart

- Category: commerce platform
- Website: https://www.opencart.com
- What they sell (1 line): open-source ecommerce platform; useful for classic admin IA patterns and extensions framing.

Notable features (5–10):
- OSS commerce framing
- Variant pages captured (pricing/docs/features)

Workflows worth copying (2–4):
1) Install → configure store → manage catalog/orders → extend via modules
2) Admin maintenance: upgrades/backups/extensions compatibility

What we can steal:
- Easy: classic commerce admin navigation patterns
- Medium: extension install/upgrade workflows
- Hard: full platform maintenance surface

Evidence links:
- `competitors/evidence/opencart.md`

### Shopware

- Category: commerce platform
- Website: https://www.shopware.com
- What they sell (1 line): commerce platform (strong EU presence) with extensibility; useful admin and ecosystem patterns.

Notable features (5–10):
- Commerce + ecosystem positioning
- Variant pages captured (pricing/docs/features)

Workflows worth copying (2–4):
1) Configure store → manage products/orders → customize via apps/plugins
2) Admin ops: promotions/content/catalog iteration cycles

What we can steal:
- Easy: “apps/plugins” ecosystem UX patterns
- Medium: configuration surfaces for promos/catalog at scale
- Hard: full platform breadth + ecosystem tooling

Evidence links:
- `competitors/evidence/shopware.md`

---

## 5) Additional deepened set (batch 4)

### Lightspeed eCom

- Category: commerce platform
- Website: https://www.lightspeedhq.com
- What they sell (1 line): retail-first commerce platform spanning online + in-store ops.

Notable features (5–10):
- Retail/omnichannel framing (inventory + store operations)
- Variant pages captured (pricing/docs/features)

Workflows worth copying (2–4):
1) Set up products → manage inventory → sell across channels → reconcile
2) Ops loop: monitor stock/fulfillment → handle exceptions → keep catalog consistent

What we can steal:
- Easy: omnichannel inventory views + status UI patterns
- Medium: setup and migration “retail data” onboarding patterns
- Hard: POS ecosystem breadth

Evidence links:
- `competitors/evidence/lightspeed-ecom.md`

### Nosto

- Category: personalization
- Website: https://www.nosto.com
- What they sell (1 line): personalization/merchandising platform (recommendations + targeting) aimed at CRO.

Notable features (5–10):
- Personalization + merchandising positioning
- Variant pages captured (pricing/product/docs surfaces)

Workflows worth copying (2–4):
1) Define segments → choose recommendations/placements → launch → measure lift → iterate
2) Merchandising loop: boost/bury rules → measure conversion → adjust

What we can steal:
- Easy: segment + targeting UX patterns
- Medium: “recommendations config” admin surfaces with guardrails
- Hard: full personalization engine + data pipeline

Evidence links:
- `competitors/evidence/nosto.md`

### Klevu

- Category: site search
- Website: https://klevu.com
- What they sell (1 line): ecommerce search + discovery tooling (merchandising/search relevance).

Notable features (5–10):
- Search/discovery positioning (CRO-aligned)
- Variant pages captured (pricing/features/docs surfaces)

Workflows worth copying (2–4):
1) Index catalog → configure synonyms/rules → launch → monitor queries → tune
2) Merchandising loop: boost/bury → measure impact → refine rules

What we can steal:
- Easy: search tuning UI patterns (synonyms, boosts)
- Medium: query analytics dashboards for merch teams
- Hard: relevance tuning engine at scale

Evidence links:
- `competitors/evidence/klevu.md`

### Ordergroove

- Category: subscriptions
- Website: https://www.ordergroove.com
- What they sell (1 line): enterprise subscriptions/recurring commerce platform.

Notable features (5–10):
- Guided setup UX called out explicitly (“Subscription Onboarding Flow”).
- Customer portal framed as the core management surface (“Subscription Management Interface - Customer Portal”).
- Growth + retention levers bundled: instant subscription upsells + subscription analytics + “integrated checkout”.

Workflows worth copying (2–4):
1) Subscription onboarding: install → guided onboarding flow → enable portal → validate checkout.
2) Growth loop: analytics → configure upsells → iterate portal → repeat.

What we can steal:
- Easy: explicit onboarding checklist UX for subscription setup (reduce time-to-first-value).
- Medium: package portal + analytics + upsells as one cohesive “subscription growth” module.
- Hard: integrated checkout + subscription lifecycle engine that doesn’t degrade conversion under edge cases.

Evidence links:
- `competitors/evidence/ordergroove.md`

### Re:amaze

- Category: helpdesk
- Website: https://www.reamaze.com
- What they sell (1 line): ecom-friendly support suite (shared inbox + automation patterns).

Notable features (5–10):
- Shopify App Store listing is explicit about channel breadth (chat/social/email/voice/SMS/FAQ) and ecommerce focus.
- Shopify integration supports in-inbox commerce actions (see/manage orders, process refunds, create draft orders).
- “Order number inside the conversation” is used as a first-class demo pattern (order-context workflow).

Workflows worth copying (2–4):
1) Resolve an order issue without leaving the inbox: customer message → open Shopify order context → refund/draft order → reply → tag outcome.
2) Storefront deflection loop: connect Shopify → publish widgets (chat/FAQ/contact) → AI/chatbots deflect → human handoff with order context.

What we can steal:
- Easy: “capabilities bullets” that are merchant-readable and dev-traceable (orders/refunds/draft orders).
- Medium: dynamic variables + segmentation powering automated response templates (consistent, faster replies).
- Hard: safe in-inbox commerce actions with permissions + audit trail + rollback.

Evidence links:
- `competitors/evidence/re-amaze.md`

### Help Scout

- Category: helpdesk
- Website: https://www.helpscout.com
- What they sell (1 line): email-first support helpdesk; strong shared-inbox workflow patterns.

Notable features (5–10):
- Simple product triad: shared inbox + help center + live chat (SMB-friendly scope).
- Shared inbox explicitly described as a shared space for email + chat + social conversations.
- Knowledge base positioned as a deflection lever (“reduce your support volume by at least 30%…”).

Workflows worth copying (2–4):
1) Shared inbox triage: centralize messages → collaborate/assign → respond across channels → close + report.
2) Deflection loop: write help content → route customers to self-serve → measure ticket volume drop → iterate.

What we can steal:
- Easy: pricing posture tuned for growing teams (“fraction of the cost of competitive tools”).
- Medium: tight surface area (Inbox + Help Center + Live Chat) that maps to a clean admin IA.
- Hard: full “unified customer view” / identity resolution across channels (not the main focus here).

Evidence links:
- `competitors/evidence/help-scout.md`

### Kustomer

- Category: helpdesk
- Website: https://www.kustomer.com
- What they sell (1 line): omnichannel customer service platform; strong customer timeline/context patterns.

Notable features (5–10):
- Unified customer view + omnichannel messaging + AI-powered automations (explicitly called out in core positioning).
- Platform posture: unify data to drive smarter, personalized processes (CRM/control-plane framing).
- Explicit “AI Agent Studio” + “Workflows” as first-class product surfaces (no-code automation posture).

Workflows worth copying (2–4):
1) Unified profile → next action: open conversation → see unified profile/context → trigger workflow actions → resolve + record outcome.
2) Build AI agents with guardrails: define intents → configure allowed actions + escalation → deploy → measure/iterate.

What we can steal:
- Easy: “unified customer view” headline value prop (clear and durable).
- Medium: workflows/actions as a no-code product surface (ops teams improve without dev cycles).
- Hard: true unified data model across tools/channels with identity resolution + permissions.

Evidence links:
- `competitors/evidence/kustomer.md`

### Attentive

- Category: sms marketing
- Website: https://www.attentive.com
- What they sell (1 line): SMS marketing + journeys; strong lifecycle automation patterns for ecommerce.

Notable features (5–10):
- Lifecycle/journeys automation positioning
- Variant pages captured (pricing/docs/features)

Workflows worth copying (2–4):
1) Capture opt-in → segment → send campaigns → measure → iterate
2) Journey automation: trigger events → send messages → monitor outcomes

What we can steal:
- Easy: campaign scheduling + templates UI patterns
- Medium: journey/automation builder patterns
- Hard: deliverability/compliance breadth (carrier rules)

Evidence links:
- `competitors/evidence/attentive.md`

### ReturnGO

- Category: returns
- Website: https://returngo.ai
- What they sell (1 line): branded self-service returns portal + exchanges + labels + policy automation.

Notable features (5–10):
- “Unlimited policy rules” (policy engine / routing)
- Exchange + store-credit primitives (variant/product exchange; store credit)
- Shipping/labels workflow (“Ship by ReturnGO”) plus analytics/API

Workflows worth copying (2–4):
1) Policy builder: rules → outcomes (exchange/credit/refund) → labels provider → analytics iteration
2) Shopper self‑serve: portal → choose exchange/credit → label/QR → approvals/exceptions → resolution

What we can steal:
- Easy: “business logic” rules UI that reads like if/then policy
- Medium: integrated label flow (ship-by) so returns doesn’t require a second tool
- Hard: analytics + API that supports finance/warehouse reconciliation at scale

Evidence links:
- `competitors/evidence/returngo.md`

### Narvar

- Category: post-purchase suite (tracking/returns/claims)
- Website: https://www.narvar.com
- What they sell (1 line): modular post‑purchase suite (“beyond buy”) including tracking, comms, delivery promise, and returns/claims fraud tooling.

Notable features (5–10):
- Suite packaged as modules (Promise / Secure / Track / Shield / Notify / Assist)
- Returns/exchanges framed as fraud mitigation + “reward best customers” (Shield)
- Proactive comms + personalized tracking used as loyalty/CLV drivers (Track/Notify)

Workflows worth copying (2–4):
1) Module-first activation: pick 1 job-to-be-done → integrate → measure → add modules
2) Risk-gated returns: segment customers → route flows → proactive comms to reduce support load

What we can steal:
- Easy: productized “modules” navigation and 1-line JTBD copy per module
- Medium: shared event stream feeding tracking + comms + returns status in one admin timeline
- Hard: AI promise dates + claims fraud handling (data + model quality moat)

Evidence links:
- `competitors/evidence/narvar.md`

### AfterShip Returns

- Category: returns
- Website: https://www.aftership.com/returns
- What they sell (1 line): returns workflow + portal as part of broader AfterShip suite.

Notable features (5–10):
- Branded returns page + returns management portal
- Policy knobs: return window/reasons + approval/label handling
- Positioned as an “automated returns” system with flexible exchange solutions (post‑purchase suite framing)

Workflows worth copying (2–4):
1) Launch flow: connect Shopify → configure reasons/window → publish branded portal → enable approvals/labels → notifications
2) Daily ops: review return queue → approve/deny → label handling → refund management + stock updates → analytics loop

What we can steal:
- Easy: usage-gated onboarding (e.g., “free to install” + limited free usage) for quick activation
- Medium: contiguous ops workflow UI (approval → label → refund → stock update) without tool switching
- Hard: unified post‑purchase suite timeline spanning tracking + returns + comms

Evidence links:
- `competitors/evidence/aftership-returns.md`

### ShipMonk

- Category: fulfillment (3PL)
- Website: https://www.shipmonk.com
- What they sell (1 line): fulfillment + warehouse ops; good source of inventory/shipping admin workflow patterns.

Notable features (5–10):
- Homepage positioning explicitly ties to outcomes: faster delivery, reduced costs, enhanced visibility.
- Transparent fulfillment pricing / 3PL fees framing (reduces pre-sales friction).
- Shopify integration is explicit about data flows: import products, sync orders, manage inventory levels from the 3PL platform.
- Fulfillment page frames simplifying inventory management + order processing.

Workflows worth copying (2–4):
1) Shopify → 3PL integration: connect → import products → sync orders → manage inventory sync → fulfill.
2) Fulfillment ops loop: inbound inventory → order processing → exceptions → iterate on speed/cost tradeoffs.

What we can steal:
- Easy: integration copy that maps directly to merchant expectations (import products, sync orders, manage inventory).
- Medium: “transparent pricing” content explaining fees in plain language.
- Hard: unified visibility layer across inventory + order processing at multi-node scale.

Evidence links:
- `competitors/evidence/shipmonk.md`

### Smile.io

- Category: loyalty / rewards
- Website: https://smile.io
- What they sell (1 line): loyalty program app for Shopify (points + referrals + VIP tiers) with POS + messaging integration posture.

Notable features (5–10):
- Core primitives: points + referral + VIP programs (explicit in listing).
- Benchmarking / optimization framing (loyalty “benchmarks” posture).
- Shopify POS compatibility emphasized; integrates with email/SMS tooling (Klaviyo mention in listing screenshots).

Workflows worth copying (2–4):
1) Program launch: install → configure points/referrals/VIP tiers → publish loyalty prompts → connect messaging → iterate via benchmarks.
2) Omnichannel redemption: enable POS → staff redemption workflow → track program adoption → adjust incentives.

What we can steal:
- Easy: defaults/templates for points + VIP tiers setup.
- Medium: make “benchmarks” a product surface (compare program economics to industry norms).
- Hard: keep loyalty setup simple while supporting enterprise-grade POS + segmentation needs.

Evidence links:
- `competitors/evidence/smile-io.md`

### LoyaltyLion

- Category: loyalty / rewards
- Website: https://loyaltylion.com
- What they sell (1 line): customer loyalty platform positioned as “data-driven” loyalty beyond points, with tiering + integrations.

Notable features (5–10):
- “Data-driven loyalty” positioning (tailored experiences beyond points).
- VIP/subscriber tiers are explicitly called out.
- Ecosystem emphasis: Shopify POS support + Klaviyo flows integration posture.

Workflows worth copying (2–4):
1) Data-driven program setup: install → define earning/rewards → configure VIP/subscriber tiers → wire to ESP flows → iterate.
2) Omnichannel loyalty: enable POS + (where applicable) checkout/purchase surfaces → earn/redeem online + offline.

What we can steal:
- Easy: tier templates that feel “exclusive” (VIP/subscriber tiers).
- Medium: default integrations that map to real merchant stacks (ESP/helpdesk/reviews).
- Hard: personalization without making rule configuration unmaintainable.

Evidence links:
- `competitors/evidence/loyaltylion.md`

### Rise.ai

- Category: store credit / gift cards (loyalty-adjacent)
- Website: https://rise.ai
- What they sell (1 line): store credit + gift cards as a “single digital wallet” (cashback, promotions, omnichannel issue/redeem).

Notable features (5–10):
- “One wallet for everything store credit” posture.
- Cashback rewards and promotions on store credit (retention lever).
- Store credit refunds positioned as reducing revenue loss from returns.
- Omnichannel issuance/redemption + Apple/Google wallet pass posture.

Workflows worth copying (2–4):
1) Returns → store credit loop: enable store credit refunds → issue credits on return approval → nudge redemption via owned channels.
2) Unified value instrument: sell gift cards + issue store credit → let customers redeem across channels → optionally publish wallet pass.

What we can steal:
- Easy: store credit as a first-class refund option with clear merchant economics.
- Medium: unified wallet balance across “credit types” (gift card + store credit + cashback).
- Hard: deliver a credible omnichannel wallet without introducing fraud/abuse vectors.

Evidence links:
- `competitors/evidence/rise-ai.md`

### Growave

- Category: loyalty / rewards (bundled retention suite)
- Website: https://growave.io
- What they sell (1 line): retention platform bundling loyalty + referrals + wishlists + reviews (with Shopify Plus checkout extensions + POS redemption).

Notable features (5–10):
- Loyalty points + VIP tiers + referral program.
- Standalone loyalty page.
- Reviews/Q&A + wishlist + back-in-stock emails (bundle posture).
- Shopify Plus checkout extensions + Shopify POS redemption called out.
- Admin analytics dashboard + API + multi-language/multi-currency posture.

Workflows worth copying (2–4):
1) Loyalty launch: points → VIP tiers → loyalty page → checkout extensions (Plus) → POS redemption → connect Klaviyo.
2) Wishlist → back-in-stock loop: enable wishlist → capture intent → back-in-stock emails → track conversion in dashboard.

What we can steal:
- Easy: “loyalty page” as a default program artifact.
- Medium: unify multiple retention modules in one admin cockpit with analytics.
- Hard: bundle breadth (loyalty + reviews + wishlist) while staying Shopify-native (checkout extensions + POS) and API-extensible.

Evidence links:
- `competitors/evidence/growave.md`

### Yotpo Loyalty

- Category: loyalty / referrals (platform suite)
- Website: https://www.yotpo.com
- What they sell (1 line): marketing platform framing loyalty + referrals alongside reviews/UGC, with an integrations-first posture.

Notable features (5–10):
- “Loyalty programs + customer reviews” combined framing (platform packaging).
- “Loyalty & Referrals” explicitly shown in navigation and copy.
- Integration breadth marketed (“180+ integrations”), with Klaviyo visible as an integration entry.

Workflows worth copying (2–4):
1) Suite packaging: launch loyalty/referrals as part of a unified “loyalty + reviews” narrative → reduce tool sprawl.
2) Integration-first activation: connect core martech tools (e.g., Klaviyo) → use integrations to unify lifecycle operations.

What we can steal:
- Easy: merged “loyalty + referrals” setup flow.
- Medium: integration catalog as the onboarding IA (pick stack → then configure).
- Hard: keep a platform suite accessible to SMBs (avoid enterprise-only complexity/pricing).

Evidence links:
- `competitors/evidence/yotpo-loyalty.md`

### Daasity

- Category: analytics / BI
- Website: https://www.daasity.com
- What they sell (1 line): omnichannel analytics for consumer brands, with a Shopify-facing reporting + segmentation posture.

Notable features (5–10):
- “Unified commerce platform” + “immediate access to data insights” posture (Shopify listing screenshot text).
- B2B vs D2C analytics cuts; filter by sales rep/territory (Shopify listing screenshot text).
- Retention + LTV framing inside analytics (segmentation + personalization posture).
- Shopify App Store presence (durable evidence surface; free trial label in listing metadata).

Workflows worth copying (2–4):
1) Install → unify data → get immediate dashboards → segment customers → iterate retention/acquisition playbooks.
2) B2B reporting loop: slice by rep/territory → reconcile performance → adjust sales + retention motions.

What we can steal:
- Easy: “unified commerce dashboards” as a default post-install landing experience.
- Medium: first-class B2B vs D2C analytics + rep/territory filters for Shopify B2B merchants.
- Hard: productize “data experts” onboarding without becoming custom-services heavy.

Evidence links:
- `competitors/evidence/daasity.md`

### Peel

- Category: analytics / BI (Shopify-first)
- Website: https://www.peelinsights.com
- What they sell (1 line): automated analytics for Shopify stores, framed around retention analytics and actionability.

Notable features (5–10):
- “Automated analytics” positioning (automation over manual dashboard/report building).
- Retention analytics framing (all-in-one retention analytics solutions posture).
- Explicit pricing surface (self-serve evaluation).

Workflows worth copying (2–4):
1) Connect store → auto-generated insights → weekly review cadence → prioritize actions.
2) Retention loop: diagnose cohorts/segments → run actions elsewhere → validate impact in dashboards → iterate.

What we can steal:
- Easy: automated insights as the default first-run UX (don’t require configuration first).
- Medium: retention analytics as the primary information architecture (retention KPIs and cohorts as top-level pages).
- Hard: “insight → action” guidance without becoming a full marketing automation platform.

Evidence links:
- `competitors/evidence/peel.md`

### Northbeam

- Category: attribution / marketing analytics
- Website: https://www.northbeam.io
- What they sell (1 line): marketing intelligence platform for profitable growth, positioned around multi-touch attribution + media mix modeling.

Notable features (5–10):
- Multi-touch attribution + media mix modeling framed as core capabilities (homepage description).
- Dedicated product page for multi-touch attribution (separate product surface).
- Profit-focused optimization artifact (“Profit Benchmarks” feature page).
- Docs/knowledge base exists as an onboarding surface.

Workflows worth copying (2–4):
1) Connect channels + store → analyze attribution outputs → adjust budgets → repeat weekly.
2) Profit benchmarks: review profit insights → update creative/media strategy → re-check benchmarks → iterate.

What we can steal:
- Easy: strong pricing surface + plan selection path for self-serve evaluation.
- Medium: productized “profit benchmarks” as an actionable insight artifact (not just dashboards).
- Hard: trustworthy attribution/MMM with explainability + confidence signals for merchants.

Evidence links:
- `competitors/evidence/northbeam.md`

### TrueProfit

- Category: profit analytics + attribution
- Website: https://apps.shopify.com/trueprofit
- What they sell (1 line): net profit analytics for Shopify (profit calculator + P&L + LTV + product analytics + marketing attribution).

Notable features (5–10):
- “True profit” cockpit (profit dashboard + profit calculator/tracker).
- Cost modeling breadth (COGS/product costs + customizable one-time/recurring costs).
- Ad spend integrations across major channels; marketing attribution posture.
- Multi-store “all-store view” posture + scheduled email reporting + mobile app mention.

Workflows worth copying (2–4):
1) Install → connect costs + ad spend → compute true profit → product analytics drilldown → scheduled email reports.
2) Multi-store operations: compare stores in an all-store view → drill into anomalies → act.

What we can steal:
- Easy: default weekly “profit digest” email report.
- Medium: profit-first attribution as the merchant mental model (not ROAS-only).
- Hard: robust cost ingestion/mapping that works with messy merchant data.

Evidence links:
- `competitors/evidence/trueprofit.md`

### Metorik

- Category: analytics + email (merchant ops)
- Website: https://metorik.com
- What they sell (1 line): real-time ecommerce analytics + reports + email marketing in one platform (WooCommerce and Shopify positioning).

Notable features (5–10):
- Analytics + email marketing combined (one tool for insight and outbound).
- Integrations posture spans advertising, analytics, and customer support systems (unified data story).
- Packaging: free 30-day trial; all features included; unlimited team seats.

Workflows worth copying (2–4):
1) Insight → email loop: find cohorts/opportunities in analytics → run targeted campaigns → measure outcomes → iterate.
2) Unified performance view: connect store + supporting systems → produce “true performance” reports → share across team (unlimited seats).

What we can steal:
- Easy: “all features + unlimited seats” pricing to reduce internal adoption friction.
- Medium: unify analytics and outbound actions to reduce tool switching.
- Hard: consistent multi-source data model without eroding trust in reported numbers.

Evidence links:
- `competitors/evidence/metorik.md`
