# Hybrid Stack — Integration Plan (Clarity + PostHog + Lean DB)

This is the actionable “how everything works together” plan for:
- Heatmaps + session replay (qualitative)
- Funnels + conversion measurement + A/B testing (quantitative)
- Staying inside **free tiers** and avoiding database bloat

Recommended stack (default):
- **Microsoft Clarity** → heatmaps + replays (free)
- **PostHog** → funnels + experiment measurement (free tier, strict event budget)
- **Lean DB layer** (Supabase or Turso) → configs + optional rollups only (not raw event firehose)

---

## 0) First principles (why this design)

### Outcome we want
Over time, reliably answer:
- What’s good / bad in the funnel?
- Why are people behaving that way?
- What change will improve purchase conversion (our value moment)?

### Constraints
- Must be free-first (no surprise cost for clients)
- Hosted on Cloudflare (Pages + Workers)
- Supabase storage is limited; avoid storing raw click/event firehose

### Key insight
There are two kinds of data:

1) **Qualitative** (“why?”): session replay + heatmaps  
   - heavy/high-volume by nature
   - best collected by a dedicated tool that stays free (Clarity)

2) **Quantitative** (“how much?”): exposures + conversions + funnels  
   - can be small and intentional
   - best collected as a minimal set of events (PostHog), plus server-side purchase events

---

## 1) System architecture (what talks to what)

### Browser (Cloudflare Pages)
- Renders UI variants (A/B)
- Sends minimal events to PostHog (free-tier budgeted; no autocapture/replay/pageviews by default)
- Sends variant/session tagging to Clarity
- Before redirecting to Shopify checkout, writes tracking attributes onto the Shopify cart (so we can attribute purchases server-side)

### Shopify (checkout + orders)
- Checkout happens on Shopify
- Purchase event is confirmed via Shopify **order webhooks**

### Server (Cloudflare Workers)
- Handles Shopify webhooks (orders/create)
- Extracts the cart/order attributes we set (anon_id + variant)
- Sends `purchase` event to PostHog server-side

### Optional lean DB (Supabase or Turso)
- Stores experiment config if we don’t want it in PostHog
- Stores daily rollups if we want a small, queryable history
- Does **not** store raw events by default

---

## 2) Identity and attribution (critical)

We need a stable identifier to join:
- browser variant exposure
- browser CTA clicks / begin checkout
- server-side purchase webhook

### `anon_id` (browser)
Use the existing `src/experiments/identity.ts` approach (localStorage/cookie).

### Pass IDs + variants to Shopify checkout (so webhook can attribute purchase)
Before redirecting to `checkoutUrl`, update Shopify cart attributes:
- `lumelle_anon_id = <anon_id>`
- `lumelle_session_id = <session_id>`
- `ph_distinct_id = <posthog distinct id>` (from `posthog.get_distinct_id()`)
- `exp_<key> = <variant>` (for the currently active experiment(s))

Shopify should carry these attributes into the resulting order (usually as note attributes / additional details).  
**Staging validation step:** place a test order and confirm the webhook payload includes these attributes.

Fallback if attributes don’t propagate:
- Use `begin_checkout` as the primary metric for experiment wins (still strongly correlated with purchase)
- Or implement a “checkout session mapping” (store a short-lived mapping of `checkoutUrl/cartId → anon_id` server-side)

---

## 3) Event schema (minimal, free-tier-safe)

### Browser events (PostHog)
Keep the event list small:
- `experiment_exposure`
  - properties: `experiment_key`, `variant`, `anon_id`, `session_id`, `page_path`
- `cta_click`
  - properties: `click_id`, `experiment_key`, `variant`, `page_path`
- `add_to_cart`
- `begin_checkout`

Optional (only if needed):
- `page_view` (sampled or key pages only)

### Server events (PostHog)
- `purchase`
  - properties: `order_id`, `value`, `currency`, `anon_id`, `experiment_key`, `variant`

Guidelines:
- Do not log click coordinates to PostHog (leave that to Clarity).
- No PII in event payloads by default.

---

## 4) Experiment assignment (two viable paths)

### Path A (recommended): PostHog manages flags/experiments
Pros:
- Non-technical changes possible (splits, targeting) without redeploy
- Built-in experiment tooling + dashboards
Cons:
- Slight vendor reliance (acceptable for this project)

How:
- Define an experiment/flag in PostHog (e.g., `hero_cta_copy`)
- In the React component, read the flag and render the variant
- Emit one `experiment_exposure` event when the variant is determined
- Also set Clarity tags for that variant

Free-tier guardrail:
- When reading flags in code, use `getFeatureFlag(key, { send_event: false })` so we don’t emit `$feature_flag_called` events (those can explode event volume).

### Path B (fallback): use our deterministic `src/experiments/*` provider
Pros:
- Completely portable, deterministic, no external flag evaluation
Cons:
- Needs a config source (DB or static JSON) and more custom analysis work

How:
- Keep config in a lean DB (Turso recommended) or static JSON
- Use existing `ExperimentProvider` to assign variants
- Send exposure/conversion events to PostHog

---

## 5) Consent + privacy gates

Rules (see `privacy-consent.md`):
- Don’t load trackers pre-consent if policy requires it (especially for EEA traffic).
- Respect DNT.
- Mask/exclude sensitive pages from replay tools.

Implementation approach:
- Load Clarity + PostHog only after consent is granted (or initialize in “disabled” mode until consent).

---

## 6) Rollout plan (staging → production)

### Step 1: Tooling setup (per client)
- Create Clarity project
- Create PostHog project
- Decide whether we need the lean DB now (usually “no” initially)

### Step 2: Staging instrumentation
- Add Clarity + PostHog initializers behind env flags
- Add experiment variant rendering (hero CTA only)
- Send `experiment_exposure` and `cta_click` events
- Tag Clarity with `anon_id` + `exp_<key>=<variant>`

### Step 3: Purchase attribution verification (staging)
- Update Shopify cart attributes with `anon_id` + `variant` before redirect
- Place test order
- Confirm webhook payload contains the attributes

### Step 4: Server-side purchase event
- In webhook handler, send `purchase` event to PostHog with `distinct_id = ph_distinct_id` (fallback: `lumelle_anon_id`)
- Validate PostHog funnel: exposure → CTA click → begin checkout → purchase

Implementation note:
- Prefer `distinct_id = ph_distinct_id` (captured from the browser and stored in cart attributes) so server events join perfectly to browser events without calling `posthog.identify()` client-side.

### Step 5: Production “control-only” launch
- Enable tracking + logging but keep experiments on control (or 100% control split)
- Verify volumes stay within free-tier budget

### Step 6: Run the first real experiment
- Run 50/50 hero CTA test
- Let it run long enough to stabilize
- Use Clarity to review replays by variant for “why”
- Roll out winner; log decision in docs

---

## 7) Optional: where Turso fits (only if needed)

If Supabase storage is constrained and we still want a DB-backed “single truth” for experiment configs/rollups:
- Use **Turso** as a small “analytics config DB”
- Keep it to configs + rollups, not raw events

Suggested tables:
- `experiments` (key, status, split JSON, start/end)
- `experiment_rollups_daily` (date, experiment_key, variant, exposures, cta_clicks, begin_checkout, purchases, revenue)

---

## Related docs
- Stack overview + tradeoffs: `hybrid-analytics-heatmaps-stack.md`
- Weekly process: `optimization-loop.md`
- Privacy/cmp gating: `privacy-consent.md`
- Old DB-first plan (kept as fallback): `implementation-plan.md`
