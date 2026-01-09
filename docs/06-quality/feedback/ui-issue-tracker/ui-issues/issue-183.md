# Issue 183: Mobile account + footer has weird padding / horizontal scroll (should not scroll sideways)

Source: Client feedback screenshots `codex-clipboard-lLC8mw.png`, `codex-clipboard-RZrEtx.png` (Jan 2026)
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `VALIDATING`
- Area: `Client`
- Impact (1–5): `3`
- Reach (1–5): `5`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `(3×5×2)−2 = 28`
- Owner: `AI`
- Created: `2026-01-07`

---

## ✅ Outputs (what “done” produces)

- Verified repro of horizontal scrolling on mobile and/or missing padding on account + footer.
- Root-cause explanation (which element overflows and why).
- A decision doc with **three viable solutions** and a recommendation.
- Acceptance criteria (testable) for the later implementation agent.

---

## Problem statement

On mobile view (notably the account page + footer), the layout appears to have:

- Insufficient left/right padding (text runs too close to edges), and/or
- Unwanted horizontal scrolling (page can scroll sideways)

Horizontal scrolling should not be possible under normal layout.

Note (2026-01-08): monitor moved the kanban status from `inreview` → `todo` because there was no open PR into `dev`. Keep this issue in `VALIDATING` until a PR exists and mobile verification is complete.

---

## 🔁 Multi-agent workflow (runbook)

### Agent 1 — Research + codebase understanding (NO CODE CHANGES)

**Goal:** reproduce the overflow, find the overflowing element(s), and propose 3 fix options.

#### Tasks

1. Reproduce
   - Use iPhone XR viewport (or equivalent) and visit:
     - `/account`
     - footer section at the bottom of the page
   - Verify if horizontal scroll occurs when swiping left/right.
   - Confirm whether padding is actually missing vs being visually crowded due to overflow.

2. Identify the overflow culprit(s)
   - Use DevTools:
     - Inspect `document.documentElement.scrollWidth` vs `clientWidth`
     - Temporarily apply `* { outline: 1px solid red }` or use DevTools “Layout” tools
   - Find the element with width > viewport (common causes: `w-screen`, `100vw` + padding, fixed-position elements, large shadows, absolute-positioned badges, etc.)

3. Map the code structure
   - Identify the page component(s) for `/account`
   - Identify footer component(s) and global layout wrappers
   - Document any CSS utilities that can cause overflow (e.g. `w-screen`, `translate-x-*`, `min-w-*`, negative margins)

4. Write up findings + propose options
   - Create/update: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-183-research.md`
   - Include **3 solutions** with tradeoffs and implementation notes.

#### Deliverable

- `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-183-research.md`

---

## Candidate code hotspots (starting points)

- Account page(s):
  - `src/domains/client/account/ui/pages/*`
- Global layouts and wrappers:
  - `src/layouts/*`
  - `src/router.tsx`
- Footer:
  - `src/ui/components/GlobalFooter.tsx`
- Global styles:
  - `src/index.css`

---

## Acceptance criteria (for the later implementation agent)

- On mobile, `document.documentElement.scrollWidth === document.documentElement.clientWidth` (no horizontal overflow).
- Footer and account content have consistent, comfortable side padding (no edge-to-edge text).
- No regressions to drawer/checkout overlays (they should still slide correctly).

---

## Step 2 — Verify (evidence)

Verified (static code review): **LIKELY YES**.

Likely culprit:
- `src/ui/components/PublicHeader.tsx` — the cart quantity badge was positioned with `absolute -right-1 -top-1`, which can extend beyond the viewport on mobile and introduce horizontal scroll.

Secondary issue:
- Account pages used `px-4` while the shared header/footer used `px-5`, making the account page feel “tighter” than the footer on mobile.

---

## Step 4 — Options (3 viable fixes)

Option A — Fix the overflowing element(s) (recommended + implemented):
- Keep the cart badge fully within the icon button bounds (remove negative right/top offsets).
- Align account page container padding with header/footer (`px-5` on mobile).

Option B — Global overflow guard:
- Add `overflow-x: clip` / `hidden` on `html, body` to prevent any horizontal scroll.
- Faster, but can mask real overflow regressions and occasionally breaks off-canvas UIs if not tested carefully.

Option C — Layout wrapper “safe width” utility:
- Introduce a shared wrapper component/class that enforces `max-w-full` and consistent horizontal padding.
- Higher refactor cost, but improves consistency across the app.

---

## Step 6 — Execute + Validate

Changes (implementation in this branch):
- `src/ui/components/PublicHeader.tsx`
  - Moved cart badge from `-right-1 -top-1` to `right-0.5 top-0.5` to avoid viewport overflow.
- Account pages (MarketingLayout-based):
  - `src/domains/client/account/ui/pages/AccountPage.tsx`
  - `src/domains/client/account/ui/pages/OrdersPage.tsx`
  - `src/domains/client/account/ui/pages/OrderDetailPage.tsx`
  - `src/domains/client/account/ui/pages/AddressesPage.tsx`
  - `src/domains/client/account/ui/pages/PaymentMethodsPage.tsx`
  - Updated mobile padding from `px-4` → `px-5` to match header/footer.

Validation:
- `npm run validate:tokens` ✅
- `npm run lint:tokens` ✅
- `npm run typecheck` ✅
- `npm run build` ✅
- `npm run lint` ❌ (fails repo-wide due to pre-existing lint errors unrelated to this issue; changed files lint clean when run directly)

Next validation needed:
- Manual mobile check (iPhone XR or similar): confirm no sideways scroll on `/account` and the footer looks consistently padded.
