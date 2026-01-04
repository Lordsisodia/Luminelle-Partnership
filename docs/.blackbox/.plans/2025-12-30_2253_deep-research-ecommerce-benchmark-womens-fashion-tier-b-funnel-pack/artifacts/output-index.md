# Output Index

Append-only log of what changed and why.

## 2025-12-30

- `artifacts/womens-top25-apparel-ranked.csv` — ordered Top‑25 store list (parsed from the apparel-first Top‑25 doc) with URL/niche fields.
- `artifact-seeds/womens-top25-apparel-funnel-seeds.txt` — extracted funnel snapshot URLs (collection/product/sizing/shipping/returns/support) for Top‑25.
- `artifacts/snapshots/funnel-top25-apparel/` — Tier‑B HTML snapshots (76/76 captured).
- `artifacts/reports/funnel-top25-apparel-summary.md` — coverage + signal counts for the Tier‑B pack.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-conversion-feature-checklist.md` — strengthened with additional Tier‑B evidence pointers.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md` — linked the new Tier‑B evidence pack.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md` — promoted Tier‑B evidence for sizing + returns portal patterns.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — added the new Tier‑B plan folder to the evidence index.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/conversion-roadmap.md` — execution sequence for women’s fashion conversion features (milestones + evidence pointers).
- `artifacts/womens-top25-tier-a-screenshot-capture-checklist.md` — store-by-store Tier‑A screenshot capture checklist (URLs + what to capture).
- `artifacts/prompt-log.md` — added prompt log entry for the resumed run.
- `status.md` / `progress-log.md` / `work-queue.md` — replaced placeholders with real state and next actions.
- `context/steps/0003_checkpoint-drafted-tier-a-screenshot-capture-checklist.md` — filled checkpoint step with real bullets + links.
- `artifact-seeds/womens-top25-apparel-funnel-seeds.txt` — added manual seeds for Andie Swim + Uniqlo (Top‑25 pack now 88/88).
- `artifacts/snapshots/funnel-top25-apparel/` — captured 12 additional Tier‑B snapshots for Andie Swim + Uniqlo.
- `artifacts/reports/funnel-top25-apparel-summary.{md,csv}` — regenerated summary after adding Andie Swim + Uniqlo.
- `artifacts/womens-top25-tier-a-screenshot-capture-checklist.md` — updated Andie Swim + Uniqlo sections with concrete URLs (no longer “missing seeds”).
- `artifacts/reports/funnel-top25-apparel-store-rollup.csv` — store-level rollup of snapshot signals (vendor prevalence per store).
- `artifacts/reports/funnel-top25-apparel-store-findings.md` — readable per-store findings (signals + captured pages).
- `artifacts/reports/funnel-top25-apparel-patterns.md` — concise “patterns to copy” + prevalence counts with direct snapshot evidence pointers.
- `.blackbox/scripts/research/synthesize_snapshot_signals_by_store.py` — fixed store/stage parsing to support `<prefix> <store> <stage>` labels (not just `<store>__<stage>`), enabling true per-store rollups.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md` — added Tier‑B evidence for Andie Swim returns portal + Uniqlo shipping/returns help pages.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-conversion-feature-checklist.md` — added Andie Swim returns portal evidence + linked the Top‑25 patterns note for prevalence.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md` — linked the Top‑25 per-store rollup + patterns outputs under Tier‑B evidence.
- `.blackbox/scripts/research/inject_preflight_into_audit_docs.py` — extended store/stage parsing to support `<prefix> <store> <stage>` labels (required for Top‑25 audit preflight injection).
- `.blackbox/scripts/research/synthesize_snapshot_signals_by_store.py` — updated to strip slug-ish label prefixes when present (produces clean store names like “Andie Swim” instead of “womens-top25-apparel Andie Swim”).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/README.md` — new Top‑25 manual-audit set (purpose + links).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/SHORTLIST.md` — tooling shortlist for scaffolding + slug-map generation.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/store-slug-map.json` — display-name → slug mapping for 25 stores.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/*.md` — scaffolded 25 store audit docs and injected Tier‑B preflight (targets + signals + bot-defense rate).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/PRE-AUDIT-PRIORITY.md` — reachability-first ordering computed from Tier‑B snapshots.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/DASHBOARD.md` — quick “how to run” entry point for Top‑25 audits.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/scorecard.csv` — Top‑25 scoring sheet (desktop + mobile rows) compatible with audit automation scripts.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/scorecard-guide.md` — how to fill/validate the Top‑25 scorecard.
- `artifacts/evidence/` — scaffolded per-store evidence folders + generated 25 `CHECKLIST.md` files for Tier‑A screenshot naming consistency.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/PATTERN-CAPTURE-CHECKLIST.md` — generated screenshot→pattern→backlog mapping for Top‑25 evidence capture.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-01.md` — recommended first-pass Tier‑A audit queue (balanced niche coverage + strong tooling signals).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-02.md` — Tier‑A audit queue for legacy retail + marketplace patterns (discovery + merchandising).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-03.md` — Tier‑A audit queue for remaining stores (includes bot-protected/JS-heavy targets like Uniqlo).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/README.md` — added Top‑25 audit set to “Current sets”.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — linked the Top‑25 audit set under manual audits.
- `08-meta/repo/docs-ledger.md` — added ledger entry for the Top‑25 audit dashboard.
- `artifacts/reports/top25-audit-briefs/` — generated 25 concise “audit briefs” (targets + tooling signals + extra capture suggestions) from the Top‑25 audit preflight + store rollups.

## 2025-12-31

- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-02.md` — fixed evidence paths after moving evidence folders to `artifacts/evidence/<store-slug>/`.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-03.md` — fixed evidence paths after moving evidence folders to `artifacts/evidence/<store-slug>/`.
- `artifacts/reports/andie-swim-pattern-update-suggestions.md` — dry-run postprocess output showing what pattern updates will be suggested once screenshots exist.
- `artifacts/reports/andie-swim-pattern-autoapply.md` — dry-run “auto-apply” report (no pattern cards written; validates pipeline wiring).
- `artifacts/evidence-naming.md` — generated evidence naming rules doc for screenshot drops.
- `artifacts/evidence-coverage.md` — generated evidence coverage report (what screenshots are missing per store).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/DASHBOARD.md` — added evidence links + copy/paste postprocess commands (single store + batch).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/evidence-capture-guide.md` — generalized “where to store evidence” to use `<active-run>` and added the Top‑25 women’s fashion run as an explicit example.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-stores-100.store-cards.md` — generated a segment-grouped, evidence-linked markdown view of the 100-store scored matrix (what works / watchouts / features per store).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — linked the new Top‑100 store cards doc for easier discovery.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/feature-exemplars-index.md` — generated a feature→exemplar index (women’s fashion + cross‑niche) to answer “who to copy for feature X?” with evidence pointers.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — linked the feature→exemplar index.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-segment-models.md` — generated a top-3 “model stores” list per segment to speed up store selection.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — linked the segment model summary.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top50-apparel-first-expansion.md` — generated an expansion queue (next 25 apparel-first stores beyond the Top‑25 audit set) to guide a future Top‑50 audit.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — linked the Top‑50 expansion queue doc.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/AUDIT-ROI-MAP.md` — generated a Tier‑A audit priority map (signal density + reachability) to maximize screenshot audit ROI.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md` — generated a Top‑25 evidence-led backlog shortlist (what to build first + snapshot-backed examples).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/README.md` — linked the new audit ROI map.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-benchmark.md` — linked the audit ROI map + Top‑25 backlog shortlist under the Tier‑B evidence section.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — linked the Top‑25 backlog shortlist.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-mvp-backlog-top10.md` — generated a Top‑10 “build next” backlog (evidence-linked; flags where Tier‑A screenshots are still required).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — linked the MVP backlog Top‑10.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/EXECUTIVE-SUMMARY.md` — wrote a 1-page “what we learned + what to do next” summary (links to ROI map + MVP backlog).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — linked the executive summary.

## 2025-12-31 (cart/checkout Tier‑B supplement)

- `artifact-seeds/womens-top25-apparel-cart-checkout-seeds.txt` — added `/cart` + `/checkout` seed targets for the Top‑25 apparel-first set (Tier‑B evidence).
- `artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-*-cart.html` — captured cart entry-point HTML snapshots (stable names).
- `artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-*-checkout.html` — captured checkout entry-point HTML snapshots (stable names).
- `artifacts/reports/funnel-top25-apparel-cart-checkout-summary.csv` — per-page scan of cart/checkout snapshots (tooling signals).
- `artifacts/reports/funnel-top25-apparel-cart-checkout-summary.md` — coverage + quick counts for the cart/checkout snapshot set.
- `artifacts/reports/funnel-top25-apparel-cart-checkout-store-rollup.csv` — per-store rollup (union signals across cart + checkout).
- `artifacts/reports/funnel-top25-apparel-cart-checkout-store-findings.md` — readable per-store findings for cart/checkout entry points.
- `artifacts/reports/funnel-top25-apparel-cart-checkout-patterns.md` — express checkout signal prevalence + evidence examples (Tier‑B) for Top‑25.
- `artifacts/reports/funnel-top25-apparel-patterns.md` — linked the new cart/checkout supplement outputs for discoverability.
- `artifacts/summary.md` — appended durable insight: express checkout signals are near table-stakes in the Top‑25.
- `artifacts/agent-plan.md` — updated next actions to include the cart/checkout supplement report.
- `artifacts/patterns-summary.md` — regenerated to reflect updated pattern-card evidence fields.
- `.blackbox/scripts/research/synthesize_snapshot_signals_by_store.py` — added `cart` and `checkout` to stage parsing for rollups.
- `.blackbox/scripts/research/inject_preflight_into_audit_docs.py` — added `cart` and `checkout` to stage parsing for audit preflight injection.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md` — updated evidence to a Top‑25 store + added Tier‑B snapshot pointer (Tier‑A still required).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md` — updated evidence to a Top‑25 store + added Tier‑B snapshot pointer (Tier‑A still required).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-mvp-backlog-top10.md` — linked the cart/checkout prevalence report under “Checkout express + trust cues”.
- `status.md` — updated status timestamp + noted the new cart/checkout Tier‑B supplement and report.
- `progress-log.md` — appended a progress entry for the cart/checkout snapshot + report work.
- `context/context.md` — refreshed the rolling context to include the cart/checkout evidence layer and current open questions.
- `artifacts/feature-research-config.yaml` — added a minimal config so “autopilot” prompts can self-configure when run against this plan folder.
- `artifacts/start-here.md` — added a quick navigation doc (what this plan is + where key outputs live + how to continue with Tier‑A).
- `artifacts/reports/funnel-top25-apparel-checkout-signal-triage.md` — ranked Top‑25 stores by cart/checkout express-pay signal density to prioritize Tier‑A checkout screenshots.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md` — added cart/checkout prevalence + triage evidence under Tier‑A-required checkout patterns.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/AUDIT-ROI-MAP.md` — linked cart/checkout evidence + triage report to refine Tier‑A execution order.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/DASHBOARD.md` — added direct links to cart/checkout prevalence + checkout triage reports.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/EXECUTIVE-SUMMARY.md` — added express checkout prevalence takeaway + linked the Tier‑B cart/checkout report.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-CHECKOUT.md` — created a checkout-focused Tier‑A screenshot batch (top 10 stores by checkout signal density).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/README.md` — added links to cart/checkout prevalence + checkout triage + the new checkout batch.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/audits/womens-fashion-top25-apparel-first/BATCH-RETURNS.md` — created a returns-focused Tier‑A screenshot batch (stores with Loop/Narvar/Happy Returns signals).
- `status.md` — updated status to reflect checkout triage + new Tier‑A batch queues (checkout-first + returns-first).
- `progress-log.md` — appended progress entries for checkout triage promotion and batch queue creation.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-by-segment.md` — generated a segment-level adoption breakdown from the scored 100-store matrix (evidence-linked).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/README.md` — linked the new segment adoption breakdown for discoverability.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-feature-adoption-by-segment.md` — added a segment→pattern-card cheat sheet to make the report build-ready.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-anti-patterns.md` — generated an evidence-linked “what not to copy” watchouts library with prevalence counts and examples.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-mvp-backlog-top10.md` — added explicit anti-pattern guardrails to prevent copying common failure modes (promo noise, performance debt, IA overload).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/conversion-roadmap.md` — linked the anti-patterns report under “Principles” so milestone planning includes explicit guardrails.

## 2025-12-31 (pattern-card gap closure)

- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md` — new pattern card for free-shipping threshold messaging (Tier‑B evidence from Carbon38 + ThirdLove carts).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-back-in-stock-waitlist.md` — new pattern card for notify-me/waitlist capture (Tier‑B evidence from Frankies BIS + nav “back in stock” entry).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-wishlist-saved-items.md` — new pattern card for wishlist/saved items (Tier‑B signals from Ganni + Triangl).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md` — added backlog rows + acceptance tests for the three new patterns (evidence-linked).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-conversion-feature-checklist.md` — promoted wishlist + back-in-stock + shipping threshold into the checklist (with evidence pointers + pattern card links).
- `artifacts/patterns-summary.md` — appended the new pattern cards to the plan’s pattern-card index table.
- `artifacts/agent-plan.md` — updated next actions to include closing remaining pattern-card gaps and mapping to backlog.
- `artifacts/summary.md` — appended durable insights about Tier‑B detectability for wishlist, BIS, and shipping thresholds.
- `artifacts/prompt-log.md` — appended the exact prompt used for this cycle.
- `context/steps/0022_checkpoint-pattern-card-gap-closure.md` — new checkpoint step (facts/learnings/next step) for this cycle.

## 2025-12-31 (promote patterns into shortlist)

- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md` — added a “Demand capture loops” section (wishlist + back‑in‑stock) and updated the Tier‑A cart/checkout section to include shipping threshold messaging evidence.
- `artifacts/agent-plan.md` — updated next actions to explicitly target Tier‑A screenshots for the new pattern cards.
- `artifacts/summary.md` — appended a durable insight about keeping execution aligned by promoting pattern cards into the shortlist.
- `artifacts/prompt-log.md` — appended the exact prompt used for this cycle.
- `context/steps/0023_checkpoint-promote-patterns-into-shortlist.md` — new checkpoint step capturing facts/learnings/next step.

## 2025-12-31 (extra Tier‑B evidence for wishlist/BIS)

- `artifact-seeds/womens-top25-apparel-extra-pattern-seeds.txt` — added a small, separate seed list to capture direct wishlist/back‑in‑stock pages without changing baseline funnel pack counts.
- `artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-triangl-wishlist.html` — direct wishlist page snapshot for stronger wishlist evidence.
- `artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-frankies-bikinis-back-in-stock.html` — direct “back in stock” collection snapshot as a demand capture entry point.
- `artifacts/snapshots/funnel-top25-apparel/womens-top25-apparel-ganni-wishlist.html` — wishlist URL snapshot (login-gated; useful tradeoff evidence).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-wishlist-saved-items.md` — switched primary evidence to Triangl wishlist page and moved other examples into supporting bullets.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/pdp-back-in-stock-waitlist.md` — added direct back-in-stock collection snapshot as supporting evidence.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md` — moved ThirdLove example into “Additional evidence” for template consistency.
- `artifacts/patterns-summary.md` — updated evidence fields for wishlist/back‑in‑stock cards to reflect the stronger primary examples.
- `context/steps/0024_checkpoint-extra-tier-b-evidence-for-wishlist-bis.md` — new checkpoint step documenting evidence capture + updates.

## 2025-12-31 (Tier‑A returns portal screenshots + mapping promotion)

- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__post-purchase__returns-portal__20251231.png` — Tier‑A returns evidence (entry CTAs + exchange/return split).
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/loveshackfancy/loveshackfancy__desktop__post-purchase__returns-portal__20251231.png` — Tier‑A returns evidence (policy page baseline; captured for comparison).
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__post-purchase__returns-portal__20251231.png` — Tier‑A returns evidence (structured returns center).
- `.blackbox/scripts/research/postprocess_batch_audits.py` — added overrides (`--audits-dir`, `--capture-checklist-md`, etc.) and passed plan artifacts dir through to `postprocess_store_audit.py` so the Top‑25 audit set can be postprocessed correctly.
- `.blackbox/scripts/research/apply_evidence_to_patterns.py` — fixed screenshot path normalization (no more `docs//Users/...`) and improved post‑purchase URL selection (prefer returns targets).
- `.blackbox/scripts/research/suggest_pattern_updates_from_evidence.py` — improved post‑purchase URL selection (prefer returns targets).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/returns-self-serve-portal.md` — switched primary evidence to ThirdLove returns center; added Andie as additional evidence.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md` — updated the “Self-serve returns portal” row to include Tier‑A screenshot links.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md` — promoted Tier‑A returns evidence into the Top‑25 backlog shortlist.
- `artifacts/agent-plan.md` — added an explicit “cycle focus” for Tier‑A returns evidence capture.
- `artifacts/summary.md` — appended a durable insight about the split between returns policy pages vs returns centers/portals.
- `context/steps/0025_checkpoint-tier-a-returns-portal-screenshots-3-stores.md` — new checkpoint step capturing facts/learnings/next step.

## 2025-12-31 (Tier‑A checkout express buttons proof)

- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__express-buttons__20251231.png` — Tier‑A checkout screenshot proving express buttons above fold (Shop + PayPal).
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__checkout__express-buttons__20251231.png` — Tier‑A checkout screenshot proving express buttons above fold (Shop + PayPal + G Pay).
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__checkout__express-buttons__20251231.png` — Tier‑A checkout screenshot proving express buttons above fold (Shop + PayPal + G Pay; Afterpay shown).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md` — replaced “pending” with Tier‑A proof and added additional evidence bullets.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md` — updated “Checkout express + trust” row with Tier‑A screenshot evidence.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md` — promoted Tier‑A checkout proof into the shortlist.
- `artifacts/summary.md` — appended durable insight confirming above-the-fold express button placement across multiple stores.

## 2025-12-31 (Tier‑A checkout trust cues proof)

- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__trust-cues__20251231.png` — Tier‑A checkout trust cues capture (desktop).
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__checkout__trust-cues__20251231.png` — Tier‑A checkout trust cues capture (desktop).
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__checkout__trust-cues__20251231.png` — Tier‑A checkout trust cues capture (desktop).
- `context/steps/0027_checkpoint-tier-a-checkout-trust-cues-3-stores.md` — checkpoint step documenting trust cue evidence capture and next step (delivery estimate capture).

## 2025-12-31 (Tier‑A checkout delivery estimate capture)

- `.blackbox/scripts/research/capture_tier_a_screenshot.py` — added `--checkout-step delivery-estimate` to fill checkout fields and reach shipping methods before screenshot.
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__checkout__delivery-estimate__20251231.png` — Tier‑A proof of shipping methods + delivery windows.
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/staud/staud__desktop__checkout__delivery-estimate__20251231.png` — Tier‑A proof of shipping methods + duties/taxes messaging.
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__checkout__delivery-estimate__20251231.png` — blocked by bot challenge (useful as a “blocked_evidence” artifact).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/checkout-express-checkout.md` — added delivery estimate evidence section and noted Carbon38 headless block.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md` — added delivery estimate Tier‑A evidence to the checkout row.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md` — added delivery estimate Tier‑A examples.
- `context/steps/0028_checkpoint-tier-a-checkout-delivery-estimate-capture.md` — checkpoint step documenting the new capture mode and evidence results.

## 2025-12-31 (Tier‑A cart add-to-cart capture + shipping threshold proof)

- `.blackbox/scripts/research/capture_tier_a_screenshot.py` — added `--cart-step add-to-cart` + `--cart-variant-id` to reliably create a cart session (Shopify) before capturing `/cart`.
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/alo-yoga/alo-yoga__desktop__cart__shipping-threshold__20251231.png` — Tier‑A cart threshold cue in-cart (desktop).
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/andie-swim/andie-swim__desktop__cart__shipping-threshold__20251231.png` — Tier‑A cart capture with an actual line item present (desktop).
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/carbon38/carbon38__desktop__cart__shipping-threshold__20251231.png` — Tier‑A cart capture for threshold placement reference (desktop; exact “spend X more” text is proven in Tier‑B HTML).
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/thirdlove/thirdlove__desktop__cart__shipping-threshold__20251231.png` — Tier‑A cart threshold cue in-cart (desktop).
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-shipping-threshold-messaging.md` — expanded evidence to include additional Tier‑A examples (ThirdLove/Andie/Alo) and clarified what Tier‑B vs Tier‑A proves.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/pattern-to-backlog-mapping.md` — added Tier‑A cart threshold evidence links (ThirdLove + Alo) to strengthen the backlog row.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/womens-fashion-top25-apparel-first-backlog-shortlist.md` — filled the previously blank “Tier‑A proof captured” section with cart threshold examples.
- `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/summary.md` — appended durable insights about automating cart evidence capture + threshold UI variants.
- `05-planning/research/market-intelligence/ecommerce-benchmarking/patterns/cart-variant-editing.md` — reverted “variant editing” evidence back to pending and moved existing captures to “attempts/adjacent” to avoid claiming an edit UI without proof.
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/*/*__cart__line-item-controls__20251231.png` — renamed previously mis-labeled `cart__variant-edit` captures to `cart__line-item-controls` so automation won’t treat them as proof of variant swapping.
- `.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence-inventory.md` — regenerated to reflect new/renamed evidence files (keeps coverage reporting accurate).
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/skims/skims__desktop__cart__blocked-region-modal__20251231.png` — renamed from `cart__variant-edit` because the capture shows a region/modal blocker, not cart variant editing proof.
- `docs/.blackbox/.plans/2025-12-30_2253_deep-research-ecommerce-benchmark-womens-fashion-tier-b-funnel-pack/artifacts/evidence/steve-madden/steve-madden__desktop__cart__line-item-controls__20251231.png` — renamed from `cart__variant-edit` because the capture shows standard line item controls (qty/remove), not size/color swapping proof.
