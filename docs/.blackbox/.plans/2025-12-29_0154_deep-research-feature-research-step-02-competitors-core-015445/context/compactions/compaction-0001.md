---
compaction: 0001
created_at: "2025-12-29 20:54"
range: "0001-0010"
max_bytes: 1048576
per_step_budget_bytes: 98304
---

# Compaction 0001 (0001–0010)

## ✅ Summary (fill this after compaction)

- <3–7 bullets capturing the durable takeaways>

## 🧩 Patterns / heuristics (fill this after compaction)

- Prompt improvements:
- Checklist improvements:
- Better stop conditions:

## Steps compacted (trimmed)

### 0001_checkpoint-seeded-53-core-competitors-generated-stubs-snapped-19-homepages-triage-report.md

---
step: 0001
created_at: "2025-12-29 02:13"
title: "Checkpoint: seeded 53 core competitors + generated stubs + snapped 19 homepages + triage report"
---

# Step 0001: Checkpoint: seeded 53 core competitors + generated stubs + snapped 19 homepages + triage report

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0002_checkpoint-snapped-extracted-evidence-for-additional-10-core-winners-shippo-easypost-narvar-returngo-skio-bold-postscript-klaviyo-algolia-judge-me.md

---
step: 0002
created_at: "2025-12-29 02:33"
title: "Checkpoint: snapped + extracted evidence for additional 10 core winners (Shippo/EasyPost/Narvar/ReturnGO/Skio/Bold/Postscript/Klaviyo/Algolia/Judge.me)"
---

# Step 0002: Checkpoint: snapped + extracted evidence for additional 10 core winners (Shippo/EasyPost/Narvar/ReturnGO/Skio/Bold/Postscript/Klaviyo/Algolia/Judge.me)

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

### 0003_checkpoint-deepened-10-more-core-competitors.md

---
step: 0003
created_at: "2025-12-29 02:51"
title: "Checkpoint: deepened 10 more core competitors"
---

# Step 0003: Checkpoint: deepened 10 more core competitors

## ✅ What I did (facts)

- Captured additional homepage snapshots (stable filenames) for the next batch of core competitors.
- Captured additional pricing/docs/features variant snapshots for the same batch (stable filenames; skip-existing enabled).
- Generated 10 new evidence extracts and appended a “batch 2” section to `artifacts/competitor-matrix.md`.

## 🧠 What I learned (new information)

- Some core “enterprise” sites are blocked/time out under basic snapshotting (Elastic Path hit “Just a moment…”, Adobe timed out), so evidence capture needs either alternate URLs or manual follow-up.
- Support/CX tools (Zendesk, Intercom) increasingly lead with “AI agents” + packaging that bundles AI into plan pricing.
- Fulfillment + returns tools (ShipBob, Happy Returns) are rich sources of admin/ops workflow patterns (statuses, exceptions, logistics state machines).

## 🧭 What changes because of this

- The core competitor corpus now has another batch of deepened competitors with evidence files, so synthesis can start ranking features off stronger proofs.
- We now have a clear “blocked/timeout” category that the run should track separately (to avoid pretending we captured evidence when we didn’t).

## ➡️ Next step

- Deepen the next batch of core competitors (especially those with strong variant pages) OR retry blocked ones with alternate URLs / slower snapshot settings.

## 🔗 Links / references

- `artifacts/competitor-matrix.md`
- `competitors/evidence/` (new evidence extracts for this batch)

---

### 0004_checkpoint-deepened-returns-tranche-loop-aftership-returns-returngo-happy-returns-narvar-fixed-missing-weak-snapshots.md

---
step: 0004
created_at: "2025-12-29 19:25"
title: "Checkpoint: deepened returns tranche (Loop/AfterShip Returns/ReturnGO/Happy Returns/Narvar) + fixed missing/weak snapshots"
---

# Step 0004: Checkpoint: deepened returns tranche (Loop/AfterShip Returns/ReturnGO/Happy Returns/Narvar) + fixed missing/weak snapshots

## ✅ What I did (facts)

- Deepened tranche-1 competitors (returns/exchanges/post-purchase): Loop Returns, AfterShip Returns, ReturnGO, Happy Returns, Narvar.
- Captured additional evidence snapshots (incl. Shopify App Store listings) and fixed weak evidence where snapshots were redirect-only or missing.
- Added “Tranche 01 Deep Dive” sections to each competitor evidence note with: 3 features, 2 copyable workflows (step-by-step), and 3 steal-ideas (easy/medium/hard).
- Updated the competitor matrix + sources + summary to reflect tranche-1 learnings and cite evidence files.

## 🧠 What I learned (new information)

- “Exchange-first” is a spectrum: Loop emphasizes workflows + fraud gating; ReturnGO emphasizes explicit policy rules + labels; AfterShip emphasizes portal + approvals/labels + usage-gated install; Happy Returns differentiates with physical network + in-person verification.
- Happy Returns’ strongest “copy” is the verification event (scan/verify) used to trigger instant refunds while reducing fraud (requires operational capability).
- Narvar’s packaging is “modules-first” (Promise/Track/Shield/Notify/etc.), which is a strong adoption pattern for an admin suite.

## 🧭 What changes because of this

- We now have auditable, tranche-focused evidence for returns/RMA workflows (not just homepage stubs), including steps we can directly model in merchant-admin UX.
- “Missing snapshot” gaps for Narvar are closed (homepage snapshot exists), and Loop redirect-only snapshots are flagged as unreliable with stronger alternate evidence captured.

## ➡️ Next step

- Tranche 2: pick the next N=5 competitors for the next core slice (e.g., shipping labels/ops or customer support inbox) and repeat evidence + workflow capture.

## 🔗 Links / references

- Competitor matrix: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/competitor-matrix.md`
- Sources: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/sources.md`
- Summary: `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/summary.md`
- Evidence notes:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/loop-returns.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/aftership-returns.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/returngo.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/happy-returns.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/narvar.md`

---

### 0005_checkpoint-deepened-shipping-tranche-shipstation-shippo-easypost-with-auditable-snapshots-workflows.md

---
step: 0005
created_at: "2025-12-29 19:44"
title: "Checkpoint: deepened shipping tranche (ShipStation/Shippo/EasyPost) with auditable snapshots + workflows"
---

# Step 0005: Checkpoint: deepened shipping tranche (ShipStation/Shippo/EasyPost) with auditable snapshots + workflows

## ✅ What I did (facts)

- Captured fresh homepage + variant HTML snapshots for ShipStation, Shippo, and EasyPost (pricing/docs/app store where available).
- Regenerated evidence extracts for the 3 competitors and added tranche-2 deep-dive notes (3 features, 2 workflows, 3 steal ideas) with explicit evidence file paths.
- Updated `artifacts/competitor-matrix.md` to (a) deepen ShipStation with automation/API posture, and (b) add deepened entries for Shippo + EasyPost.
- Updated `artifacts/sources.md` with shipping tranche sources (ShipStation API docs + Shopify App Store listings + Shippo docs + EasyPost docs/pricing).
- Added shipping tranche durable insights to `artifacts/summary.md` with evidence pointers.

## 🧠 What I learned (new information)

- Shipping tools differentiate more on “automation rules + rate shopping” than on basic label printing; those terms show up as plan-tier features in Shopify App Store listings.
- The ecosystem splits into:
  - UI + API platforms (ShipStation/Shippo) aimed at merchant admins and integrators
  - API-first primitives (EasyPost) aimed at platform teams embedding shipping into their own admin
- Evidence reliability varies by surface:
  - Shopify App Store listings are high-signal for feature + plan bullets (works even when vendor help centers are bot-protected).

## 🧭 What changes because of this

- We now have auditable, build-ready shipping workflows (merchant loop + developer primitives loop) with concrete evidence paths per competitor.
- Prior “missing snapshot” gaps for ShipStation and EasyPost homepages are closed (home snapshots exist).

## ➡️ Next step

- Next cycle: pick N=3–5 support/helpdesk competitors (Gorgias, Re:amaze, Zendesk, Kustomer, Help Scout) and deepen “order-context in inbox” workflows with evidence.

## 🔗 Links / references

- Evidence notes:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipstation.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shippo.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/easypost.md`
- Artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/competitor-matrix.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/sources.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/summary.md`

---

### 0006_checkpoint-deepened-support-inbox-tranche-gorgias-re-amaze-zendesk-kustomer-help-scout-fixed-help-scout-redirects.md

---
step: 0006
created_at: "2025-12-29 20:00"
title: "Checkpoint: deepened support inbox tranche (Gorgias/Re:amaze/Zendesk/Kustomer/Help Scout) + fixed Help Scout redirects"
---

# Step 0006: Checkpoint: deepened support inbox tranche (Gorgias/Re:amaze/Zendesk/Kustomer/Help Scout) + fixed Help Scout redirects

## ✅ What I did (facts)

- Deepened 5 support/helpdesk competitors (Gorgias, Re:amaze, Zendesk, Kustomer, Help Scout) with evidence-first analyst notes (3 features, 2 workflows, 3 steal ideas each).
- Added/updated tranche-03 “support inbox + order context” workflows, emphasizing embedded order context, in-inbox actions, and AI handoff patterns.
- Fixed weak/redirect-only Help Scout snapshots by re-snapshotting trailing-slash URLs (pricing + knowledge base) and adding a stable Inbox snapshot for shared-inbox evidence.
- Updated the core artifacts (matrix + sources + summary) to include support tranche insights and comparable bullets.

## 🧠 What I learned (new information)

- Re:amaze is unusually explicit about “in-inbox commerce actions” (manage Shopify orders, process refunds, create draft orders) which is a stronger wedge than generic “order context”.
- Zendesk’s Shopify integration value prop is framed as “no context switching” (keep agents in the conversation), which is a concise merchant-admin pitch.
- Help Scout’s positioning is intentionally tight (Inbox + Help Center + Live Chat), with an explicit deflection claim on the knowledge base page (support volume reduction).

## 🧭 What changes because of this

- We now have build-ready, step-by-step “order-context inbox” workflows with auditable evidence paths for both SMB (Help Scout) and ecommerce-first (Gorgias/Re:amaze) approaches.
- Support tranche sources and matrix entries are now comparable to the returns + shipping tranches (same template and evidence posture).

## ➡️ Next step

- Optional gap fix: attempt to locate a working Shopify App Store listing snapshot for Gorgias (current snapshot returns a 404 shell) or mark it as blocked and rely on vendor pages.
- Next tranche candidate (if continuing): fraud/chargebacks or tracking/status comms tools that sit adjacent to support inbox workflows.

## 🔗 Links / references

- Evidence notes:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/re-amaze.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/zendesk.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/kustomer.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/help-scout.md`
- Artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/competitor-matrix.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/sources.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/summary.md`
- Snapshot fixups input:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/tranche-03-support-variant-fixups.txt`

---

### 0007_checkpoint-fixed-gorgias-shopify-app-store-evidence-handle-helpdesk.md

---
step: 0007
created_at: "2025-12-29 20:09"
title: "Checkpoint: fixed Gorgias Shopify App Store evidence (handle=helpdesk)"
---

# Step 0007: Checkpoint: fixed Gorgias Shopify App Store evidence (handle=helpdesk)

## ✅ What I did (facts)

- Retried multiple Shopify App Store URL variants for Gorgias and confirmed `apps.shopify.com/gorgias` consistently snapshots as a 404 shell.
- Discovered the Shopify App Store listing appears under handle `helpdesk` (“Gorgias: Helpdesk, Chat & FAQ”) and captured durable listing snapshots.
- Updated Gorgias evidence notes and core artifacts to reference the working Shopify listing evidence (and keep the broken URL explicitly low-confidence).

## 🧠 What I learned (new information)

- Shopify App Store listings may not match the vendor brand name in the URL (handle drift); the category page surfaced the real handle for Gorgias (`helpdesk`).
- The category page HTML includes app-card metadata (name, handle, link, rating count) even when some direct listing URLs fail, making it useful for evidence recovery.

## 🧭 What changes because of this

- The prior “blocked/unstable” evidence gap for Gorgias Shopify App Store listing is now closed with an auditable snapshot at the correct handle.
- Support tranche now has stronger proof for Gorgias’s “automation & AI + live chat + FAQ + free trial” posture (from the Shopify listing surface).

## ➡️ Next step

- Continue with the next core tranche (N=3–6): fraud/chargebacks or tracking/status comms tools that directly touch merchant admins.

## 🔗 Links / references

- Snapshots:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/gorgias-shopify-app-store-helpdesk.html`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/snapshots-variants/shopify-app-store-support-chat-category.html` (shows “Gorgias: Helpdesk, Chat & FAQ” linking to the `helpdesk` handle)
- Evidence + artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/gorgias.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/sources.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/competitor-matrix.md`

---

### 0008_checkpoint-deepened-fulfillment-tranche-shipbob-shiphero-shipmonk.md

---
step: 0008
created_at: "2025-12-29 20:19"
title: "Checkpoint: deepened fulfillment tranche (ShipBob/ShipHero/ShipMonk)"
---

# Step 0008: Checkpoint: deepened fulfillment tranche (ShipBob/ShipHero/ShipMonk)

## ✅ What I did (facts)

- Captured fresh homepage + variant HTML snapshots for ShipBob, ShipHero, and ShipMonk (pricing, Shopify integrations, and primary fulfillment/WMS pages where available).
- Regenerated evidence extracts for the 3 competitors and added tranche-04 deep dive notes (3 features, 2 workflows, 3 steal ideas) with explicit evidence paths.
- Updated `artifacts/competitor-matrix.md` so the three fulfillment/WMS entries are comparable and reflect the latest evidence.
- Updated `artifacts/sources.md` and `artifacts/summary.md` with fulfillment tranche sources + durable insights.

## 🧠 What I learned (new information)

- Fulfillment competitors split into two distinct product postures:
  - “Network fulfillment + software” (ShipBob) vs “run-your-own warehouse WMS” (ShipHero).
- Shopify integrations are sold as “automation + control” (merchant-facing language) rather than as technical primitives; ShipHero explicitly frames “end-to-end control – from checkout to front door”.
- Pricing pages are high-signal for adoption friction: ShipBob leans on “core fees + request quote” while ShipMonk leans on “transparent pricing / 3PL fees explained”.

## 🧭 What changes because of this

- We now have build-ready fulfillment/WMS workflows that can be used as templates for an “ops control plane” (inventory + shipping execution + exception handling) with concrete evidence pointers.
- The competitor matrix has clearer comparative bullets for fulfillment tools (pricing posture, integration posture, and operational scope).

## ➡️ Next step

- Next tranche: pick N=3–6 more core competitors from seeds (either subscriptions or another operations-heavy category) and repeat the same evidence-first deepening pattern.

## 🔗 Links / references

- Evidence notes:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipbob.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shiphero.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/competitors/evidence/shipmonk.md`
- Artifacts updated:
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/competitor-matrix.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/sources.md`
  - `.blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445/artifacts/summary.md`

---

### 0009_checkpoint-deepened-subscriptions-tranche-recharge-skio-bold-subscriptions-ordergroove.md

---
step: 0009
created_at: "2025-12-29 20:37"
title: "Checkpoint: deepened subscriptions tranche (Recharge/Skio/Bold Subscriptions/Ordergroove)"
---

# Step 0009: Checkpoint: deepened subscriptions tranche (Recharge/Skio/Bold Subscriptions/Ordergroove)

## ✅ What I did (facts)

- Added tranche-05 deep dive sections to subscription competitors (features, workflows, steal ideas, evidence gaps):
  - `competitors/evidence/skio.md`
  - `competitors/evidence/bold-subscriptions.md`
  - `competitors/evidence/ordergroove.md`
- Updated the competitor comparison matrix with evidence-grounded bullets and added missing subscription competitors:
  - `artifacts/competitor-matrix.md` (refreshed Recharge, added Skio + Bold Subscriptions, deepened Ordergroove)
- Appended tranche-05 sources and added a dedicated sources section for subscriptions:
  - `artifacts/sources.md`
- Added durable subscription-category insights (portal + analytics, migration wedge, upsells, packaging posture):
  - `artifacts/summary.md`
- Updated autopilot plan/log scaffolding for this cycle:
  - `artifacts/agent-plan.md`
  - `artifacts/prompt-log.md`

## 🧠 What I learned (new information)

- Shopify App Store listing screenshots are high-signal for “what the product actually wants to be” in subscriptions:
  - Skio surfaces analytics types explicitly (revenue/dunning/forecasting) plus multiple portal screenshots. Evidence: `competitors/evidence/skio.md`.
  - Ordergroove surfaces onboarding flow, customer portal, analytics, upsells, and “integrated checkout.” Evidence: `competitors/evidence/ordergroove.md`.
  - Bold surfaces upsells + churn reduction/winbacks + explicit “migrate from competitors” framing. Evidence: `competitors/evidence/bold-subscriptions.md`.
- Migration is being sold as a first-class product wedge (switching costs are the category friction). Evidence: `competitors/evidence/skio.md`, `competitors/evidence/bold-subscriptions.md`.

## 🧭 What changes because of this

- Subscription “ops” scope is clearer: a build-ready thin slice is portal + analytics (revenue + dunning + forecasting) + migration onboarding, rather than starting with billing edge cases.
- “Upsells in subscription flows” is a durable pattern across multiple vendors (not a one-off), which informs our product surface and integration priorities.

## ➡️ Next step

- Run validator to ensure the plan folder remains auditable: `python3 .blackbox/scripts/validate-feature-research-run.py --plan .blackbox/.plans/2025-12-29_0154_deep-research-feature-research-step-02-competitors-core-015445 --kind step-02`.
- Decide next tranche (payments/checkout, fraud/risk, inventory/OMS) by selecting N=3–5 from `artifacts/competitor-seeds.txt`.

## 🔗 Links / references

- Matrix: `artifacts/competitor-matrix.md`
- Sources: `artifacts/sources.md`
- Summary: `artifacts/summary.md`
- Evidence:
  - `competitors/evidence/recharge.md`
  - `competitors/evidence/skio.md`
  - `competitors/evidence/bold-subscriptions.md`
  - `competitors/evidence/ordergroove.md`

---

### 0010_checkpoint-deepened-fraud-chargebacks-tranche-signifyd-riskified-nofraud-chargeflow-clearsale.md

---
step: 0010
created_at: "2025-12-29 20:54"
title: "Checkpoint: deepened fraud/chargebacks tranche (Signifyd/Riskified/NoFraud/Chargeflow/ClearSale)"
---

# Step 0010: Checkpoint: deepened fraud/chargebacks tranche (Signifyd/Riskified/NoFraud/Chargeflow/ClearSale)

## ✅ What I did (facts)

- <fill>

## 🧠 What I learned (new information)

- <fill>

## 🧭 What changes because of this

- <fill>

## ➡️ Next step

- <fill>

## 🔗 Links / references

- <fill>

---

## Cleanup notes

- Step files compacted: 10 (and removed from steps/)
- Compaction file is capped at ~1048576 bytes (configurable via BLACKBOX_CONTEXT_MAX_BYTES).
