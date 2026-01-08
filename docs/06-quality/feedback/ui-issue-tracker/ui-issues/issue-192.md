# Issue 192: Landing “creators” section copy should be customer-focused + “Join creators” CTA should become “Learn more” (blog link)

Source: Client feedback screenshot `codex-clipboard-LHhLp4.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `VALIDATING`
- Area: `Client`
- Impact (1–5): `2`
- Reach (1–5): `4`
- Effort (1–5): `1`
- Confidence (1–3): `2`
- Priority: `(2×4×2)−1 = 15`
- Owner: `AI`
- Created: `2026-01-07`

---

## Problem statement

On the landing experience, there’s a block that is currently framed around **creators** (copy implies “creators won’t film without it”), and includes a **“Join creators”** button.

Client request:

- Switch the framing from **creators → customers** (customer-first, “customer tested” vibe)
- Replace the **“Join creators”** CTA with **“Learn more”**, linking to the blog post (same as before)

Reference: screenshot `codex-clipboard-LHhLp4.png`

---

## ✅ Outputs (what “done” produces)

- The landing block uses customer-focused copy (no “creators” language).
- The CTA is updated:
  - Button label: “Learn more”
  - Destination: the intended blog post route (confirm exact slug)
- No regressions on mobile/desktop layout.
- Copy is stored in a single obvious place (not duplicated across multiple files).

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + codebase understanding (NO CODE CHANGES)

**Goal:** find where this block is rendered, identify copy/CTA source, and propose 3 implementation options.

#### Tasks

1. Locate the block
   - Identify the route/page where it appears (e.g. main landing, “shop your sets”, etc.)
   - Confirm whether it is a reusable section component or page-local markup

2. Trace copy and CTA sources
   - Is the copy hard-coded in a page?
   - Is it in `src/content/*` data?
   - Is it fetched from CMS/admin-config?

3. Confirm the correct “Learn more” destination
   - Which blog post should it link to?
   - Confirm the URL slug (e.g. `/blog/about-lumelle`) and that it exists in production

4. Create the research doc with 3 options
   - Create/update: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-192-research.md`
   - Include three options with pros/cons + estimated effort + implementation notes

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-192-research.md`

---

## Candidate code hotspots (starting points)

Update during research with confirmed evidence.

- Landing page routes and sections:
  - `src/domains/client/marketing/ui/pages/*`
  - `src/domains/client/marketing/ui/sections/*`
- Content data:
  - `src/content/landing.ts`
  - `src/content/blog/*`

---

## Worklog

- 2026-01-08: Marked `IN_PROGRESS`; starting implementation (update landing copy + swap CTA to blog “Learn more”).
- 2026-01-08: Updated `BrandStoryPage` final CTA to customer-focused copy and swapped “Join creators” → “Learn more” linking to `/blog/about-lumelle`.
- 2026-01-08: `npm run typecheck` + `npm run build` pass locally; ready for validation in PR preview.
