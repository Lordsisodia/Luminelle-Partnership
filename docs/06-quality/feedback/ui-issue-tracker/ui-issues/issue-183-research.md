# Issue 183 — Research: Mobile account/footer padding + horizontal scroll

Parent worklog: `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-183.md`

## Summary (what’s happening)

Client reports that on mobile (notably on `/account` and when reaching the footer):

- Side padding feels inconsistent (some sections feel “too tight” vs others), and/or
- The page can be scrolled horizontally (sideways), which shouldn’t happen under normal layout.

## Likely root cause (static analysis)

Primary suspected overflow:
- `src/ui/components/PublicHeader.tsx` renders a cart quantity badge as:
  - `className="absolute -right-1 -top-1 ..."`
  - That negative right/top offset can push a positioned element beyond the viewport edge, increasing the document’s scrollable width and enabling horizontal scrolling.

Secondary “weird padding” cause:
- Account pages wrapped in `MarketingLayout` used `px-4` in their content containers, while the shared header/footer use `px-5`.
- On small viewports, `px-4` vs `px-5` (16px vs 20px) is visually noticeable and can look like the footer “doesn’t line up” with account content.

## Options (3 viable solutions)

Option A — Fix the overflowing element(s) (recommended)
- Remove negative viewport-edge offsets (e.g. `-right-1`) on absolutely positioned UI affordances.
- Standardize horizontal padding across header/content/footer (use the same mobile padding token, e.g. `px-5`).

Pros:
- Addresses root cause rather than masking it.
- Reduces future regressions by keeping UI within the viewport.

Cons:
- Requires a small amount of per-component tuning.

Option B — Add a global overflow-x guard (fast but riskier)
- Apply `overflow-x: clip` or `overflow-x: hidden` on `html, body` or a top-level wrapper.

Pros:
- One-line fix that prevents sideways scroll regardless of culprit.

Cons:
- Can hide real overflow bugs.
- Needs careful testing with off-canvas drawers/overlays that might rely on overflow behavior.

Option C — Introduce a shared “page container” wrapper
- Create a shared component/utility class used by pages to enforce:
  - `max-w-*`
  - consistent `px-*`
  - `min-w-0` / `max-w-full` guardrails

Pros:
- Long-term consistency and fewer per-page one-offs.

Cons:
- More refactor/coordination, higher effort for a single issue.

## Recommendation

Pick **Option A**:
- Fix the `PublicHeader` cart badge positioning so it never extends past the viewport.
- Align account page horizontal padding to match header/footer.

This is the smallest change that addresses both reported symptoms while keeping the layout model clean.

