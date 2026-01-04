# Agent Cycle (≈50 prompts / 6–10 hours)

This is the **exact prompt sequence** to run inside the Codex session. Each item is one “prompt” (message) you give the agent.

Rules:
- Keep each prompt small and specific.
- After each prompt, the agent should write to the plan folder and cite file paths.
- Every 3–5 prompts, create a checkpoint step and update `status.md`.

## Phase 0 — Setup (Prompts 1–5)

1) Restate the goal in one sentence (Shopify now, Stripe later; UI plug-in).
2) Confirm constraints: no code changes; outputs only in this plan folder.
3) List “must-read” files to audit first (paths only) and why each matters.
4) Define a preliminary layering diagram (UI → domain → platform ports → adapters).
5) Propose the minimum artifact outputs and where they will be written (paths).

## Phase 1 — Inventory the current coupling (Prompts 6–20)

6) Inventory vendor touchpoints (Shopify + Stripe) (top 20) with file paths and short notes.
7) Categorize each touchpoint as: UI leak vs domain leak vs proper adapter vs “already ported”.
8) Identify vendor-ID leaks (Shopify GIDs) and where they should live instead.
9) Identify vendor-copy leaks (UI strings mentioning Shopify) and a strategy to remove them.
10) Identify branching leaks (e.g., `shopifyEnabled`) and a strategy to centralize capability checks.
11) List all “shared lib” infra leaks (`src/lib/*`) and propose where they should move.
12) Identify content/sections coupling (Shopify metaobjects) and propose a `ContentPort`.
13) Identify cart coupling and propose a `CartPort` boundary.
14) Identify checkout coupling (redirect URLs, assumptions) and propose a `CheckoutPort`.
15) Identify product/catalog coupling and propose a `CatalogPort`.
16) List existing “already-good” adapter candidates under `src/domains/platform/` (paths).
17) List gaps: which capabilities are missing (e.g., Admin API, payments abstraction).
18) Draft an initial `artifact-map.md` outline populated with concrete file paths.
19) Draft the dependency rules (what can import what) and list current violations.
20) Produce a “top 10 coupling issues” list ranked by severity.

## Phase 2 — Define the contracts (ports + DTOs + capabilities) (Prompts 21–35)

21) Define the principle: UI depends only on ports; adapters implement ports (confirm current reality in `src/domains/platform/*/ports/`).
22) Review existing `CatalogPort` + DTOs and propose deltas (no Shopify GraphQL types).
23) Review existing `CartPort` + DTOs and propose deltas (no Shopify cart shape).
24) Review existing `CheckoutPort` + capabilities and propose deltas for UI rendering.
25) Review existing `ContentPort` + DTOs and propose deltas for landing/PDP sections.
26) Define a “capability model” object (e.g., redirect vs embedded checkout; provider label).
27) Define error semantics and failure modes (dev vs prod) at the port boundary.
28) Define how config chooses adapters (factory): Shopify vs mock vs future Stripe.
29) Define minimal “surface exports” (one entrypoint per port under `@platform/commerce`).
30) Draft a “north star” directory layout consistent with `src/domains/*`.
31) Propose naming conventions for the contracts and adapters.
32) Propose a testing strategy later (unit tests on ports, contract tests on adapters).
33) Define how to handle “system of record” transitions without rewriting UI.
34) Produce an initial `ports.md` (or include in `final-report.md`) with all interfaces.
35) Check the contracts against the inventory: do they cover all current Shopify usage?

## Phase 3 — Migration plan (incremental, reversible) (Prompts 36–47)

36) Define migration guiding rules (“no UI imports vendor adapters”, etc.).
37) Step plan 1–3: smallest high-leverage changes (paths; no code yet, just plan).
38) Step plan 4–6: medium refactors (moving `src/lib/*` calls behind ports).
39) Step plan 7–9: hard parts (checkout capability model; content abstraction).
40) Identify risks per step + mitigations.
41) Identify “stop points” (safe intermediate states) and what success looks like at each.
42) Define how to introduce Stripe later without touching UI (adapter swap).
43) Define how to keep Shopify as system of record while payments move (if ever).
44) Produce `rankings.md` entries for each migration step (score with rubric).
45) Produce a “first implementation sprint” checklist (what to do in week 1).
46) Produce a “future extensibility” checklist (what to do once Stripe starts).
47) Update `artifact-map.md` to include the migration plan and affected files.

## Phase 4 — Synthesis + handoff (Prompts 48–50)

48) Write `final-report.md` as the clean executive summary + contracts + rules.
49) Write `artifacts/summary.md` as a 1-page skim version + next actions.
50) Write a “handoff” section: what to do next, what to avoid, what decisions remain.
