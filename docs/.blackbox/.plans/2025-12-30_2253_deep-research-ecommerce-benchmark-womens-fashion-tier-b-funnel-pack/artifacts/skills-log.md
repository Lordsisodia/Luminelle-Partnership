# Skills Log

Append-only log of skills used (snapshotting, extraction, synthesis, etc).

## 2025-12-30

- Extraction: derived funnel URL seeds from homepage snapshots for the Top‑25 apparel-first stores.
- Evidence capture: snapshotted 76/76 funnel pages as static HTML (Tier‑B evidence pack).
- Synthesis: upgraded the women’s fashion conversion checklist and benchmark doc with stronger evidence pointers.
- Backlog translation: upgraded backlog mapping rows with Tier‑B evidence for sizing + returns portal.
- Roadmapping: produced an evidence-linked conversion roadmap to turn patterns into an execution sequence.
- Audit enablement: generated a Tier‑A screenshot capture checklist (per store URLs + required captures) to unblock manual audits without additional research.
- Evidence gap closure: used sitemap/robots discovery + direct endpoint checks to add Tier‑B funnel seeds for Andie Swim + Uniqlo.
- Snapshotting: captured 12 additional stable-name HTML snapshots (Andie + Uniqlo) and regenerated the funnel summary reports.
- Aggregation: rolled up per-page signals into per-store prevalence and wrote a patterns note with evidence pointers (turning raw snapshots into actionable insights).
- Backlog translation: promoted additional Tier‑B evidence (Andie Swim returns portal; Uniqlo shipping/returns help) into the canonical pattern→backlog mapping.
- Audit enablement: scaffolded a Top‑25 audit set and injected preflight (targets + signals + bot-defense) from the Tier‑B pack so Tier‑A screenshot work can start immediately.
- Tooling hardening: updated label parsing across scripts so `<prefix> <store> <stage>` seeds behave consistently (rollups + preflight).
- Briefing synthesis: generated per-store audit briefs to keep Tier‑A screenshot capture focused (BNPL/reviews/returns/search extra captures).
- Audit instrumentation: added a Top‑25 scorecard (desktop + mobile rows) validated with `validate_audit_scorecard.py` so audits can be ranked once scored.
- Evidence ops: scaffolded Top‑25 evidence folders + CHECKLIST.md files and generated a pattern-capture checklist (screenshots → pattern cards → backlog).
- Audit orchestration: produced a Top‑25 Batch‑01 queue doc so screenshot audits start from an explicit, high-signal list.
- Audit batching: added Batch‑02 and Batch‑03 queue docs so the full Top‑25 set has a complete, ordered execution plan.
- Ops hygiene: fixed remaining evidence-path references after moving folders to `artifacts/evidence/<store-slug>/` (prevents postprocess path mismatches).
- Automation validation: ran `postprocess_store_audit.py --dry-run` for `andie-swim` to confirm the full postprocess pipeline runs cleanly before real screenshots exist.
- Reporting: generated evidence naming + coverage docs to operationalize Tier‑A screenshot capture (what’s missing; what filenames are expected).
- Runbook writing: added copy/paste postprocess commands (single-store + batch) to the Top‑25 audit dashboard so Tier‑A audits flow straight into automation.
- Documentation hygiene: removed a stale hard-coded plan path from the evidence capture guide and replaced it with an `<active-run>` placeholder + current-run example.
- Data formatting: rendered the women’s fashion scored CSV into a segment-grouped, evidence-linked markdown “store cards” view so humans can browse per-store what-works / watchouts / features without opening spreadsheets.
- Information architecture: built a “feature → exemplars” index across women’s fashion + cross‑niche so designers can jump from a feature to the best stores to model (with evidence pointers).
- Summarization: distilled the 100-store matrix into a segment-level “top 3 per segment” shortlist to speed up choosing model references by category (e.g., Swimwear vs. Plus-size).
- Prioritization: generated a Top‑50 apparel-first expansion queue (the “next 25” beyond the Top‑25 audit set) so future manual audits can expand the benchmark in a disciplined way.
- Prioritization: created a Tier‑A audit ROI map from Tier‑B rollups (signals + reachability) so screenshot effort focuses on the most pattern-dense stores first.
- Backlog synthesis: translated Top‑25 Tier‑B prevalence + snapshot evidence into an evidence-led backlog shortlist (returns portal, reviews, BNPL, personalization) with concrete example URLs + snapshot file paths.
- Roadmapping: distilled the evidence into a Top‑10 MVP backlog order (PDP confidence → returns → discovery → cart/checkout) and explicitly marked which items are Tier‑A-gated.
- Executive synthesis: wrote a one-page summary tying together evidence tiers, key prevalence insights, and the next operational steps (Tier‑A audits + MVP backlog execution).

## 2025-12-31

- Seed construction: derived a Top‑25 `/cart` + `/checkout` seed set from the existing funnel seeds (consistent labeling + stable slugs).
- Snapshotting: captured stable-name Tier‑B HTML snapshots for cart + checkout entry points to extend evidence beyond policy/help pages.
- Tooling hardening: expanded “stage” parsing to include `cart` and `checkout` so rollups + audit preflight injection work without manual relabeling.
- Extraction: scanned cart/checkout snapshots for express checkout signals (Shop Pay / Apple Pay / PayPal) and summarized prevalence with evidence pointers.
- Synthesis: promoted the strongest cart/checkout evidence into pattern cards + MVP backlog notes while still flagging Tier‑A as required for UI placement proof.
- Prioritization: generated a “checkout signal triage” ranking (Top‑25) to decide which stores to screenshot first when validating checkout UX patterns.
- Information architecture: promoted the triage + prevalence reports into the canonical backlog shortlist, audit ROI map, and audit dashboard so the next operator action is obvious.
- Operations design: converted the checkout triage into a concrete Tier‑A execution batch (`BATCH-CHECKOUT`) to reduce “what should I screenshot next?” ambiguity.
- Operations design: created a returns-focused Tier‑A batch (`BATCH-RETURNS`) based on detected returns portal signals (Loop/Narvar/etc) to accelerate proof-grade returns UX capture.
- Segmentation: generated a segment-level feature adoption breakdown to clarify which segments are best models for specific conversion features (and which features should be prioritized per segment).
- Risk analysis: generated an evidence-linked anti-patterns/watchouts library across the 100-store benchmark to prevent copying failure modes (promo clutter, performance, bot protection, etc).
- Gap closure: extracted missing high-impact mechanics (wishlist, back-in-stock/waitlist, shipping threshold messaging) directly from Tier‑B HTML snapshots via targeted string searches.
- Pattern writing: created new pattern cards that turn those signals into reusable, build-ready specs (with evidence pointers and Tier‑A caveats).
- Backlog translation: added new mapping rows with explicit acceptance tests so the patterns can be shipped without additional interpretation.
- Promotion: updated the women’s fashion conversion feature checklist to include these patterns (so the “single pane of glass” stays current).
- Ops hygiene: updated plan logs + checkpoint so the run remains auditable and easy to continue.
- Prioritization: promoted the new pattern cards into the Top‑25 evidence-led backlog shortlist so they show up in the default execution queue (no “hidden” features).
- Tier‑A capture automation: used Playwright-based screenshot capture to gather proof-grade returns center evidence (desktop + mobile) for 3 stores.
- Tooling debugging: fixed evidence-path normalization and post‑purchase URL selection so pattern suggestion/auto-apply outputs match the actual returns target URLs.
- Evidence promotion: updated the pattern card + backlog mapping + shortlist to reflect new Tier‑A proof (reduces “screenshot pending” placeholders).
- Bot/checkout workflow: used “cart + variant + ?checkout” deep links to reliably reach Shopify checkout in headless mode (avoids redirects back to homepage).
- Form automation: implemented a best-effort “reach shipping methods” step to capture delivery estimate/shipping options evidence in checkout (critical for shipping promise validation).

- Cart automation: implemented a best-effort Shopify add-to-cart flow (`/cart/add?id=<variant>&quantity=1` → `/cart`) to capture cart UI evidence without manual interaction.
- Evidence capture: collected Tier‑A cart screenshots across multiple high-signal women’s fashion stores (Carbon38, ThirdLove, Andie, Alo) to validate threshold cue placement.
- Evidence promotion: updated the cart shipping threshold pattern card + backlog mapping + shortlist so cart UX work is evidence-backed (not opinion).
- Pipeline execution: ran Top‑25 postprocess for updated stores to refresh evidence coverage + generated reports after new screenshots landed.
