# Skills Log (autopilot)

## Cycle 1 — 2025-12-29 (local)

- 🔎 Evidence triage: inspected existing evidence extracts to find “missing snapshot” and “404/blocked” gaps (ShipStation, EasyPost).
- 🌐 Snapshotting: captured durable HTML snapshots for home + pricing/docs + Shopify App Store listings using `snapshot_urls.py`.
- 🧾 Extraction: regenerated evidence notes using `extract_competitor_evidence.py` after new snapshots were captured.
- 🧠 Synthesis: converted raw evidence into 3 features + 2 workflows + 3 steal-ideas per competitor (ShipStation/Shippo/EasyPost) with explicit evidence paths.
- 🧭 Matrix normalization: updated `competitor-matrix.md` entries so shipping tools are comparable (automation/rate shopping/API posture).
- ✅ Validation: ran `validate-feature-research-run.py --kind step-02` in the prior tranche; kept changes within expected artifact structure this cycle.

## Cycle 2 — 2025-12-29 (local)

- 🔎 Evidence triage: inspected the auto-extracted support competitor evidence files and identified weak/redirect-only snapshots (Help Scout) and blocked/unstable sources (Gorgias Shopify App Store 404 shell).
- 🌐 Snapshotting + fixups: re-snapshotted redirecting Help Scout pages with trailing slashes and captured an “Inbox” page snapshot to keep claims auditable.
- 🧠 Workflow extraction: translated support competitor pages into build-ready workflows (order-context inbox, in-inbox actions, AI deflection + escalation).
- 🧭 Matrix normalization: rewrote support competitor blocks in `competitor-matrix.md` so they compare on the same axes (embedded context, embedded actions, AI handoff, deflection loop).
- 🧾 Source hygiene: appended tranche-03 URLs to `sources.md` with explicit confidence notes when evidence was blocked/unstable.

## Cycle 3 — 2025-12-29 (local)

- 🔁 URL forensics: tested multiple Shopify App Store listing URL variants to identify whether the “missing listing” was a bad URL vs a true removal.
- 🧩 Evidence recovery: used a Shopify category page snapshot to discover the actual app handle (`helpdesk`) for “Gorgias: Helpdesk, Chat & FAQ”.
- 🌐 Snapshotting: captured durable Shopify listing HTML for the correct handle and verified it contains listing metadata (title/description/JSON-LD).
- 🧾 Source hygiene: updated `sources.md` to reflect correct vs blocked URLs and prevent future snapshotting drift.

## Cycle 4 — 2025-12-29 (local)

- 🔎 Evidence triage: detected path drift/404s in initial fulfillment tranche variant URLs (ShipMonk and ShipBob) and adjusted to pages discoverable from home navigation.
- 🌐 Snapshotting: captured durable HTML snapshots for home + pricing + Shopify integrations across 3 fulfillment/WMS competitors.
- 🧾 Extraction: regenerated evidence extracts with `extract_competitor_evidence.py` to keep evidence files auditable and consistent.
- 🧠 Workflow synthesis: translated fulfillment/WMS pages into two build-ready ops loops (Shopify → fulfillment onboarding; run-your-own warehouse execution).
- 🧭 Normalization: updated matrix + summary so fulfillment competitors compare on posture (network-3PL vs WMS), pricing friction, and integration posture.

## Cycle 5 — 2025-12-29 (local)

- 🔎 Evidence extraction: parsed Shopify App Store listing snapshots for screenshot alt text and listing metadata to ground subscription feature claims (Skio/Bold/Ordergroove).
- 🧠 Workflow synthesis: converted listing signals into two build-ready subscription workflows per competitor (migration/setup; analytics + retention loop).
- 🧭 Matrix normalization: rewrote subscription competitor blocks to compare on the same axes (portal, analytics, migration, upsells, onboarding).
- 🧾 Source hygiene: appended tranche-05 sources with explicit confidence notes when vendor pages were suite-level or returned 404.
- ✅ License posture: N/A for SaaS competitors (no OSS license evaluation needed for this tranche).

## Cycle 6 — 2025-12-29 (local)

- 🌐 Snapshotting: captured durable HTML snapshots for fraud/chargeback competitors (home + Shopify listings + category pages) using `snapshot_urls.py`.
- 🔎 Evidence recovery: used a Shopify category page to discover NoFraud’s actual app handle (`nofraud-chargeback-prevention-and-protection`) and re-snapshotted the correct listing.
- 🧾 Extraction: regenerated evidence extracts via `extract_competitor_evidence.py` and then appended tranche-06 deep dive notes (features/workflows/steal ideas).
- 🧠 UI signal extraction: pulled screenshot alt text from Shopify listings to ground admin UX claims (policy simulation, dashboards, approvals queues, alerts, evidence automation).
- 🧭 Normalization: added/rewrote matrix entries so trust-ops tools compare on the same axes (guarantee/liability posture, admin UX surfaces, integrations, rollout workflow).
- 🚧 Blocked evidence handling: documented bot protection (Riskified “Just a moment…”) and Cloudflare challenge (NoFraud vendor site) and relied on Shopify listings for auditable proof.

## Cycle 7 — 2025-12-29 (local)

- 🌐 Snapshotting: captured durable HTML snapshots for payments/checkout competitors (home + product pages + docs + pricing) using `snapshot_urls.py`.
- 🔁 Redirect handling: fixed Bolt “vercel redirect shell” snapshots by directly snapshotting the redirected merchant pages (`/checkout`, `/conversions`) and `help.bolt.com`.
- 🧾 Extraction: generated evidence extracts via `extract_competitor_evidence.py`, then appended tranche-07 deep dives (features/workflows/steal ideas).
- 🧠 Synthesis: normalized payments tools around comparable axes (checkout conversion framing, unified platform posture, docs as onboarding surface, pricing posture).
- 🧭 Source hygiene: appended tranche-07 sources with explicit confidence notes when pages were consumer-framed (PayPal home) vs merchant-facing.

## Cycle 8 — 2025-12-29 (local)

- 🌐 Snapshotting: captured durable HTML snapshots for inventory/OMS competitors (home + product/pricing/integrations pages) using `snapshot_urls.py`.
- 🚧 Blocked evidence handling: Linnworks vendor site snapshot returned 403/Cloudflare challenge; recovered durable proof via Shopify App Store listing snapshot.
- 🧾 Extraction: generated evidence extracts via `extract_competitor_evidence.py`, then appended tranche-08 deep dives (features/workflows/steal ideas) grounded in snapshot meta descriptions and listing screenshot alt text (Linnworks).
- 🧠 Normalization: added inventory/OMS entries to the matrix comparing on the same axes (integration breadth, operating model, forecasting/insights surfaces, GTM posture).
- 🧾 Source hygiene: appended tranche-08 URLs to `sources.md` with explicit confidence notes for blocked pages.

## Cycle 9 — 2025-12-29 (local)

- 🔎 Evidence extraction: pulled high-signal feature claims from Shopify App Store listing HTML (notably screenshot `alt=` text) for Rise.ai and Growave.
- 🧠 Workflow synthesis: translated loyalty evidence into two build-ready loops per competitor (program launch + omnichannel redemption; store credit refunds; wishlist/back-in-stock).
- 🧭 Matrix normalization: added loyalty competitors to `competitor-matrix.md` using comparable axes (primitives, Shopify surface area, integrations posture, bundling).
- 🧾 Source hygiene: appended tranche-09 URLs to `sources.md` (including canonical Shopify listing URLs) with confidence notes.
- 🧩 Synthesis: wrote durable cross-competitor insights for loyalty/rewards (primitives stability, Shopify POS/checkout extensions moat, store credit/returns bridge, bundling strategy).

## Cycle 10 — 2025-12-29 (local)

- 🌐 Snapshotting: captured durable HTML snapshots for analytics/BI competitors (home + product/pricing/integrations + docs + Shopify listings) using `snapshot_urls.py`.
- 🔁 URL forensics/fixups: detected 404 drift (`/pricing`, `/product`) and recovered usable product surfaces by extracting links from homepage navigation and retrying.
- 🔎 Evidence extraction: generated standardized evidence extracts from snapshots via `extract_competitor_evidence.py`.
- 🧠 Workflow synthesis: translated analytics pages into build-ready admin loops (connect → dashboard → segment → act → measure) and profit-first attribution loops.
- 🧭 Matrix normalization: added tranche-10 entries to `competitor-matrix.md` with comparable axes (automation, profit-first, attribution/MMM, integrations, packaging).
- 🧾 Source hygiene: updated `sources.md` to include canonical URLs and note drift/404s where relevant.
