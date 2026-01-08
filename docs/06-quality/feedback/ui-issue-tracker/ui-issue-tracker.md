# UI Issue Tracker (black-box)

Generated from: `docs/06-quality/reviews/app-ui-review-2025-12-26.md`

Workflow: `docs/06-quality/feedback/ui-issue-tracker/ai-loop.md`
Prompt template: `docs/06-quality/feedback/ui-issue-tracker/templates/autonomous-agent-prompt.md`

This is the execution tracker for the 192 UI issues (including post-audit additions).

## Status legend

- `UNTRIAGED` → imported, not checked
- `VERIFYING` → collecting evidence/repro
- `PLANNED` → plan written, ready to implement
- `IN_PROGRESS` → implementing
- `VALIDATING` → testing/sanity checks
- `DONE` → fixed + verified
- `DEFERRED` / `NOT_AN_ISSUE` / `DUPLICATE` / `NEEDS_DECISION`

## Scoring

Priority is computed as: `(Impact × Reach × Confidence) − Effort`.

> These are initial calibrated scores based on the audit; update them as you verify issues.

## Top ranked (auto-triage, open)

These are the current top *open* items by `Priority` (excludes `DONE` / `DEFERRED` / `DUPLICATE` / `NOT_AN_ISSUE`). Use this to decide what to verify/fix next.

| Rank | ID | Area | Title | I | R | E | C | P | Status |
|----:|---:|:-----|:------|:-:|:-:|:-:|:-:|--:|:------|
| 1 | 18 | Client | Discounts / promo codes / rewards UI is present but the underlying logic is stubbed | 2 | 3 | 3 | 2 | 9 | UNTRIAGED |
| 2 | 30 | Client | Discount messaging is shown widely, but there’s no working discount system in the app | 2 | 3 | 3 | 2 | 9 | UNTRIAGED |
| 3 | 37 | Platform | Shopify Storefront client is stubbed (dynamic content never loads) | 2 | 3 | 4 | 2 | 8 | UNTRIAGED |
| 4 | 50 | Client | Two different “spin wheel” experiences exist (inconsistent UX + obvious duplication) | 2 | 3 | 4 | 2 | 8 | UNTRIAGED |
| 5 | 120 | Client | Two different color token systems are used in global UI (`brand-*` vs `semantic-legacy-brand-*`) (design consistency drift risk) | 2 | 3 | 4 | 2 | 8 | UNTRIAGED |
| 6 | 130 | Client | Duplicate `StarRating` components exist (UI drift + bug fixes won’t apply consistently) | 2 | 3 | 4 | 2 | 8 | UNTRIAGED |
| 7 | 103 | Blog | Blog index “tag” chips look like filters but are inert, and pillar filtering is effectively unreachable | 2 | 2 | 2 | 2 | 6 | UNTRIAGED |
| 8 | 20 | Admin | Admin on mobile: drawer can’t be opened (no “burger” button) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED |
| 9 | 31 | Client | PDP “video” media likely renders at 0 height (looks broken when you tap the video thumbnail) | 2 | 4 | 3 | 1 | 5 | UNTRIAGED |
| 10 | 34 | Blog | Blog “social” section is blank (component returns `null`), creating dead whitespace | 2 | 2 | 3 | 2 | 5 | UNTRIAGED |

## Quick status (live vs completed)## Quick status (live vs completed)

As of the current tracker state:

- Total: **192**
- Open / live backlog (not `DONE` / `NOT_AN_ISSUE` / `DUPLICATE` / `DEFERRED`): **41**
- Completed (`DONE`): **134**
- Closed as `NOT_AN_ISSUE`: **17**

> This tracker was introduced in git on **2026-01-05** (commit `535309d3`).

## Open issues (canonical list)

This is the list you should use day-to-day to see what is still *live*.

| ID | Area | Title | Priority | Status | Worklog |
|---:|:-----|:------|:--------:|:-------|:-------|
| 18 | Client | Discounts / promo codes / rewards UI is present but the underlying logic is stubbed | 9 | UNTRIAGED | [issue-018](ui-issues/issue-018.md) |
| 30 | Client | Discount messaging is shown widely, but there’s no working discount system in the app | 9 | UNTRIAGED | [issue-030](ui-issues/issue-030.md) |
| 37 | Platform | Shopify Storefront client is stubbed (dynamic content never loads) | 8 | UNTRIAGED | [issue-037](ui-issues/issue-037.md) |
| 50 | Client | Two different “spin wheel” experiences exist (inconsistent UX + obvious duplication) | 8 | UNTRIAGED | [issue-050](ui-issues/issue-050.md) |
| 120 | Client | Two different color token systems are used in global UI (`brand-*` vs `semantic-legacy-brand-*`) (design consistency drift risk) | 8 | UNTRIAGED | [issue-120](ui-issues/issue-120.md) |
| 130 | Client | Duplicate `StarRating` components exist (UI drift + bug fixes won’t apply consistently) | 8 | UNTRIAGED | [issue-130](ui-issues/issue-130.md) |
| 103 | Blog | Blog index “tag” chips look like filters but are inert, and pillar filtering is effectively unreachable | 6 | UNTRIAGED | [issue-103](ui-issues/issue-103.md) |
| 20 | Admin | Admin on mobile: drawer can’t be opened (no “burger” button) | 5 | UNTRIAGED | [issue-020](ui-issues/issue-020.md) |
| 31 | Client | PDP “video” media likely renders at 0 height (looks broken when you tap the video thumbnail) | 5 | UNTRIAGED | [issue-031](ui-issues/issue-031.md) |
| 34 | Blog | Blog “social” section is blank (component returns `null`), creating dead whitespace | 5 | UNTRIAGED | [issue-034](ui-issues/issue-034.md) |
| 48 | Blog | Blog “Shop now” CTAs use raw `<a href>` even for internal routes (full reload + state loss) | 5 | UNTRIAGED | [issue-048](ui-issues/issue-048.md) |
| 49 | Admin | Admin “Components” editor isn’t truly an admin system (localStorage-only, not publishable) | 5 | UNTRIAGED | [issue-049](ui-issues/issue-049.md) |
| 57 | Admin | Admin “Activity log” is a nav-linked placeholder (“Not wired yet”) | 5 | UNTRIAGED | [issue-057](ui-issues/issue-057.md) |
| 59 | Admin | Admin “Media” library is entirely in-memory mock content (no persistence or real upload) | 5 | UNTRIAGED | [issue-059](ui-issues/issue-059.md) |
| 60 | Admin | Admin “Product content” editor lacks error handling and success confirmation (silent failure risk) | 5 | UNTRIAGED | [issue-060](ui-issues/issue-060.md) |
| 62 | Admin | Admin sign-in flow doesn’t preserve “return to admin” (users land on `/account`) | 5 | UNTRIAGED | [issue-062](ui-issues/issue-062.md) |
| 63 | Admin | Admin “Pages” is presented as an editor, but it’s a static mock (no real edits/publish) | 5 | UNTRIAGED | [issue-063](ui-issues/issue-063.md) |
| 64 | Admin | Admin “Blogs” list has non-functional controls and placeholder metrics (looks like a dashboard, acts like a mock) | 5 | UNTRIAGED | [issue-064](ui-issues/issue-064.md) |
| 65 | Admin | Admin blog “Save / Publish” buttons are no-ops (no persistence) | 5 | UNTRIAGED | [issue-065](ui-issues/issue-065.md) |
| 66 | Admin | Admin blog editor inputs are not wired to the “draft” state and preview is not a live draft | 5 | UNTRIAGED | [issue-066](ui-issues/issue-066.md) |
| 67 | Blog | Blog “Related reads” carousel hides scrollbars and provides no accessible controls | 5 | UNTRIAGED | [issue-067](ui-issues/issue-067.md) |
| 75 | Admin | Admin product cards say “Updated” but don’t show an updated timestamp (low utility + confusion) | 5 | UNTRIAGED | [issue-075](ui-issues/issue-075.md) |
| 92 | Blog | Blog markdown renders internal links as plain `<a href>` (full reload + state loss in a SPA) | 6 | DONE | [issue-092](done-issues/issue-092.md) |
| 145 | Admin | Admin Products list silently hides any CMS products not present in `product-config` (admin ≠ source of truth) | 5 | UNTRIAGED | [issue-145](ui-issues/issue-145.md) |
| 146 | Admin | Admin product live preview is only available on XL screens (most editors won’t see a preview) | 5 | UNTRIAGED | [issue-146](ui-issues/issue-146.md) |
| 147 | Admin | Admin product gallery selection can’t truly be closed (state forces `editingMediaIdx` back to 0) | 5 | UNTRIAGED | [issue-147](ui-issues/issue-147.md) |
| 148 | Admin | Admin “Upload” relies on Cloudinary’s external widget script with no loading/progress UI (fragile + inconsistent asset pipeline) | 5 | UNTRIAGED | [issue-148](ui-issues/issue-148.md) |
| 154 | Admin | Admin “Pages” UI shows `/{slug}` as if it’s the live route, but `brand-story` doesn’t exist (`/brand` is the real route) | 5 | UNTRIAGED | [issue-154](ui-issues/issue-154.md) |
| 85 | Admin | Admin sidebar icon active-state styling likely never activates (current section is harder to spot) | 1 | UNTRIAGED | [issue-085](ui-issues/issue-085.md) |
| 95 | Admin | Admin product-count badge likely never updates (sessionStorage + `storage` listener doesn’t fire in-tab) | 1 | UNTRIAGED | [issue-095](ui-issues/issue-095.md) |
| 181 | Client | Multi-buy discount codes don’t apply at checkout (tiered discounts requested) | 0 | UNTRIAGED | [issue-181](ui-issues/issue-181.md) |
| 182 | Client | Drawer checkout CTA is stuck on “Preparing checkout…” (no working “Go to checkout”) | 0 | UNTRIAGED | [issue-182](ui-issues/issue-182.md) |
| 183 | Client | Mobile account + footer has weird padding / horizontal scroll (should not scroll sideways) | 0 | UNTRIAGED | [issue-183](ui-issues/issue-183.md) |
| 184 | Platform | `/api/storefront/*` endpoints return 500 (Cloudflare Worker 1101) — cart create, landing sections, product fetch | 0 | VERIFYING | [issue-184](ui-issues/issue-184.md) |
| 185 | Client | Entire site allows horizontal scrolling on mobile (layout should be flush + centered) | 0 | UNTRIAGED | [issue-185](ui-issues/issue-185.md) |
| 186 | Client | “Trusted by 10k users” avatars repeat (needs more authentic social proof) | 0 | UNTRIAGED | [issue-186](ui-issues/issue-186.md) |
| 187 | Client | Landing reviews section feels bland on desktop (needs higher-impact design) | 0 | UNTRIAGED | [issue-187](ui-issues/issue-187.md) |
| 188 | Client | Spin wheel needs visible % labels + “Congrats! You’ve won 20% off…” popup | 0 | UNTRIAGED | [issue-188](ui-issues/issue-188.md) |
| 189 | Client | Account “Payment methods” has dev artifacts; consider removing or simplifying (Shopify is the payment source-of-truth) | 0 | UNTRIAGED | [issue-189](ui-issues/issue-189.md) |
| 190 | Client | WhatsApp + email support links need to be verified/simplified | 0 | UNTRIAGED | [issue-190](ui-issues/issue-190.md) |
| 192 | Client | Landing “creators” section copy should be customer-focused + “Join creators” CTA should become “Learn more” (blog link) | 0 | UNTRIAGED | [issue-192](ui-issues/issue-192.md) |

## Full tracker (includes completed / closed)

This is the full historical list (including `DONE` and `NOT_AN_ISSUE` rows).

### Full tracker table

| ID | Area | Title | Impact | Reach | Effort | Conf | Priority | Status | Worklog |
|---:|:-----|:------|:------:|:-----:|:------:|:----:|:--------:|:-------|:-------|
| 1 | Client | Checkout is a stub page (breaks the purchase flow) | 5 | 5 | 4 | 2 | 46 | NOT_AN_ISSUE | [issue-001](ui-issues/issue-001.md) |
| 2 | Client | Post-purchase support pages are also stubs (creates “we don’t support you” vibes) | 4 | 4 | 4 | 2 | 28 | DONE | [issue-002](done-issues/issue-002.md) |
| 3 | Client | The entire account area is stubbed (users can’t manage anything) | 4 | 4 | 4 | 2 | 28 | DONE | [issue-003](done-issues/issue-003.md) |
| 4 | Client | “Spin to win” is shipped as a placeholder component (looks unfinished and off-brand) | 2 | 3 | 3 | 3 | 15 | NOT_AN_ISSUE | [issue-004](ui-issues/issue-004.md) |
| 5 | Client | Cart UI shows incorrect product media + fake compare-at pricing | 4 | 5 | 3 | 2 | 37 | DONE | [issue-005](done-issues/issue-005.md) |
| 6 | Client | Visually “disabled” checkout CTA is still a clickable link | 2 | 5 | 3 | 2 | 17 | DONE | [issue-006](done-issues/issue-006.md) |
| 7 | Client | Search results page is “fake” and contains dead links (`#`) | 4 | 4 | 3 | 2 | 29 | DONE | [issue-007](done-issues/issue-007.md) |
| 8 | Client | In-page section nav is defined but not rendered (users can’t jump to “Reviews / FAQ / …”) | 2 | 3 | 3 | 3 | 15 | NOT_AN_ISSUE | [issue-008](ui-issues/issue-008.md) |
| 9 | Client | Header redundancy + responsive layout risk | 2 | 5 | 3 | 2 | 17 | DONE | [issue-009](done-issues/issue-009.md) |
| 10 | Client | Landmark semantics: nested `<main>` elements (accessibility + screen reader navigation) | 3 | 3 | 3 | 2 | 15 | DONE | [issue-010](done-issues/issue-010.md) |
| 11 | Client | Right-side drawer doesn’t actually animate (appears/disappears instantly) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-011](done-issues/issue-011.md) |
| 12 | Client | Drawer uses fake “people checking out now” urgency | 4 | 5 | 3 | 2 | 37 | DONE | [issue-012](done-issues/issue-012.md) |
| 13 | Client | Drawer shows “Total savings” based on invented compare-at pricing | 4 | 5 | 3 | 2 | 37 | DONE | [issue-013](done-issues/issue-013.md) |
| 14 | Client | Drawer shows quantity “Save X%” labels that don’t actually apply | 2 | 5 | 3 | 2 | 17 | DONE | [issue-014](done-issues/issue-014.md) |
| 15 | Client | Drawer accessibility is incomplete (labeling + tab semantics + focus handling) | 3 | 5 | 3 | 2 | 27 | DONE | [issue-015](done-issues/issue-015.md) |
| 16 | Client | Product spotlight carousel hides its entire content from screen readers | 3 | 4 | 3 | 2 | 21 | DONE | [issue-016](done-issues/issue-016.md) |
| 17 | Creator | Public “Creators” page is visibly placeholder content | 3 | 3 | 2 | 3 | 25 | DONE | [issue-017](done-issues/issue-017.md) |
| 18 | Client | Discounts / promo codes / rewards UI is present but the underlying logic is stubbed | 2 | 3 | 3 | 2 | 9 | UNTRIAGED | [issue-018](ui-issues/issue-018.md) |
| 19 | Platform | Internal navigation sometimes uses raw `<a href>` links (full reload + state loss) | 2 | 3 | 2 | 3 | 16 | DONE | [issue-019](done-issues/issue-019.md) |
| 20 | Admin | Admin on mobile: drawer can’t be opened (no “burger” button) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-020](ui-issues/issue-020.md) |
| 21 | Client | “Benefits” section is a stub (renders nothing) | 2 | 3 | 3 | 3 | 15 | NOT_AN_ISSUE | [issue-021](ui-issues/issue-021.md) |
| 22 | Client | “Bundle cards” section is a stub (renders nothing) | 2 | 4 | 2 | 3 | 22 | DONE | [issue-022](done-issues/issue-022.md) |
| 23 | Client | Newsletter “Get 10% off” form has no submission behavior | 3 | 3 | 2 | 3 | 25 | DONE | [issue-023](done-issues/issue-023.md) |
| 24 | Client | Reviews section is biased: it filters to only 5★ reviews | 4 | 3 | 3 | 2 | 21 | NOT_AN_ISSUE | [issue-024](ui-issues/issue-024.md) |
| 25 | TBD | The 3D reviews carousel is not accessibility-friendly (and can be motion-heavy) | 3 | 3 | 3 | 2 | 15 | DONE | [issue-025](done-issues/issue-025.md) |
| 26 | Client | PDP delivery countdown / delivery date are “fake” (not tied to real shipping rules) | 4 | 4 | 3 | 2 | 29 | NOT_AN_ISSUE | [issue-026](ui-issues/issue-026.md) |
| 27 | Client | Policy/support pages link to broken routes | 3 | 3 | 3 | 2 | 15 | DONE | [issue-027](done-issues/issue-027.md) |
| 28 | Platform | Auth pages likely render “double layout” (squashed/overflowing sign-in UI) | 4 | 3 | 3 | 3 | 33 | NOT_AN_ISSUE | [issue-028](ui-issues/issue-028.md) |
| 29 | Platform | “Sign out” UI exists but sign-out behavior is a no-op | 2 | 3 | 3 | 3 | 15 | NOT_AN_ISSUE | [issue-029](ui-issues/issue-029.md) |
| 30 | Client | Discount messaging is shown widely, but there’s no working discount system in the app | 2 | 3 | 3 | 2 | 9 | UNTRIAGED | [issue-030](ui-issues/issue-030.md) |
| 31 | Client | PDP “video” media likely renders at 0 height (looks broken when you tap the video thumbnail) | 2 | 4 | 3 | 1 | 5 | UNTRIAGED | [issue-031](ui-issues/issue-031.md) |
| 32 | Client | Cart access is hidden behind the hamburger menu (no cart icon / qty badge in the header) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-032](done-issues/issue-032.md) |
| 33 | Client | Signed-in drawer profile uses a random “placekitten” avatar fallback | 2 | 5 | 3 | 2 | 17 | DONE | [issue-033](done-issues/issue-033.md) |
| 34 | Blog | Blog “social” section is blank (component returns `null`), creating dead whitespace | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-034](ui-issues/issue-034.md) |
| 35 | Blog | Blog author links fall back to `#` (dead link + unexpected page jump) | 3 | 2 | 3 | 3 | 15 | NOT_AN_ISSUE | [issue-035](ui-issues/issue-035.md) |
| 36 | Platform | Two different `cdnUrl` helpers exist (inconsistent asset loading + CDN-bypass mismatch) | 2 | 5 | 4 | 2 | 16 | DONE | [issue-036](done-issues/issue-036.md) |
| 37 | Platform | Shopify Storefront client is stubbed (dynamic content never loads) | 2 | 3 | 4 | 2 | 8 | UNTRIAGED | [issue-037](ui-issues/issue-037.md) |
| 38 | Client | Product fetching is stubbed (PDP can’t reflect real Shopify title/price/images) | 2 | 4 | 4 | 2 | 12 | NOT_AN_ISSUE | [issue-038](ui-issues/issue-038.md) |
| 39 | Client | PDP always shows the “New Heatless Curler Launched” banner (even on the curler PDP) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-039](done-issues/issue-039.md) |
| 40 | Platform | Announcement + newsletter components don’t match the “configurable components” system (broken UX if enabled) | 3 | 3 | 2 | 3 | 25 | DONE | [issue-040](done-issues/issue-040.md) |
| 41 | Client | Hamburger “menu” can reopen as the Cart tab (tab state leaks between opens) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-041](done-issues/issue-041.md) |
| 42 | Client | Two different header components exist, and they disagree on core navigation patterns | 2 | 5 | 4 | 2 | 16 | DONE | [issue-042](done-issues/issue-042.md) |
| 43 | Client | Star rating “half star” uses a non-unique SVG gradient id (can render incorrectly when multiple ratings exist) | 2 | 3 | 1 | 3 | 17 | DONE | [issue-043](done-issues/issue-043.md) |
| 44 | Client | Hero “carousel” is effectively disabled even if gallery images are provided | 2 | 4 | 3 | 2 | 13 | NOT_AN_ISSUE | [issue-044](ui-issues/issue-044.md) |
| 45 | Client | Drawer “Checkout” button is effectively unusable (disabled with no explanation) | 5 | 5 | 3 | 2 | 47 | DONE | [issue-045](done-issues/issue-045.md) |
| 46 | Client | Spin wheel is not actually random (it always lands on the same “best value” prize) | 3 | 3 | 2 | 3 | 25 | DONE | [issue-046](done-issues/issue-046.md) |
| 47 | Client | Promo text rotation does not respect “prefers-reduced-motion” | 3 | 3 | 3 | 2 | 15 | DONE | [issue-047](done-issues/issue-047.md) |
| 48 | Blog | Blog “Shop now” CTAs use raw `<a href>` even for internal routes (full reload + state loss) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-048](ui-issues/issue-048.md) |
| 49 | Admin | Admin “Components” editor isn’t truly an admin system (localStorage-only, not publishable) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-049](ui-issues/issue-049.md) |
| 50 | Client | Two different “spin wheel” experiences exist (inconsistent UX + obvious duplication) | 2 | 3 | 4 | 2 | 8 | UNTRIAGED | [issue-050](ui-issues/issue-050.md) |
| 51 | Client | FAQ “search” logic exists, but there is no search input (copy refers to missing UI) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-051](done-issues/issue-051.md) |
| 52 | Client | PDP “Share” button gives no success feedback and can fail silently | 2 | 4 | 3 | 2 | 13 | DONE | [issue-052](done-issues/issue-052.md) |
| 53 | Client | Product PDP “sections” are loaded globally (not per product), so multiple products can show wrong copy/media | 2 | 4 | 3 | 2 | 13 | DONE | [issue-053](done-issues/issue-053.md) |
| 54 | Client | Unknown product handles fall back to the shower cap instead of a 404 (wrong content on the wrong URL) | 3 | 4 | 3 | 2 | 21 | DONE | [issue-054](done-issues/issue-054.md) |
| 55 | Platform | Auth pages promise features that aren’t implemented (onboarding → dead ends) | 3 | 3 | 2 | 3 | 25 | DONE | [issue-055](done-issues/issue-055.md) |
| 56 | Admin | Admin “Analytics” page is mock data (can mislead, includes routes that don’t exist in this app) | 4 | 2 | 3 | 2 | 13 | DONE | [issue-056](done-issues/issue-056.md) |
| 57 | Admin | Admin “Activity log” is a nav-linked placeholder (“Not wired yet”) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-057](ui-issues/issue-057.md) |
| 58 | Admin | Admin component “detail” route is a hard-coded placeholder (editing drilldown doesn’t work) | 4 | 2 | 3 | 2 | 13 | DONE | [issue-058](done-issues/issue-058.md) |
| 59 | Admin | Admin “Media” library is entirely in-memory mock content (no persistence or real upload) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-059](ui-issues/issue-059.md) |
| 60 | Admin | Admin “Product content” editor lacks error handling and success confirmation (silent failure risk) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-060](ui-issues/issue-060.md) |
| 61 | Platform | Auth can silently break if Clerk is not configured (placeholder key) | 2 | 3 | 2 | 3 | 16 | DONE | [issue-061](done-issues/issue-061.md) |
| 62 | Admin | Admin sign-in flow doesn’t preserve “return to admin” (users land on `/account`) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-062](ui-issues/issue-062.md) |
| 63 | Admin | Admin “Pages” is presented as an editor, but it’s a static mock (no real edits/publish) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-063](ui-issues/issue-063.md) |
| 64 | Admin | Admin “Blogs” list has non-functional controls and placeholder metrics (looks like a dashboard, acts like a mock) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-064](ui-issues/issue-064.md) |
| 65 | Admin | Admin blog “Save / Publish” buttons are no-ops (no persistence) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-065](ui-issues/issue-065.md) |
| 66 | Admin | Admin blog editor inputs are not wired to the “draft” state and preview is not a live draft | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-066](ui-issues/issue-066.md) |
| 67 | Blog | Blog “Related reads” carousel hides scrollbars and provides no accessible controls | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-067](ui-issues/issue-067.md) |
| 68 | TBD | Typography system conflicts: `font-heading` is defined twice with different fonts | 2 | 3 | 1 | 3 | 17 | DONE | [issue-068](done-issues/issue-068.md) |
| 69 | Client | PDP quantity selector hard-codes “Buy 2, save 10%” for every product (even when not applicable) | 2 | 4 | 3 | 2 | 13 | NOT_AN_ISSUE | [issue-069](ui-issues/issue-069.md) |
| 70 | Client | PDP bottom CTA uses static urgency copy (“Last chance today”) regardless of stock/time | 2 | 4 | 3 | 2 | 13 | NOT_AN_ISSUE | [issue-070](ui-issues/issue-070.md) |
| 71 | Client | Drawer hijacks ArrowLeft/ArrowRight globally to switch tabs (surprising keyboard UX) | 3 | 5 | 3 | 2 | 27 | DONE | [issue-071](done-issues/issue-071.md) |
| 72 | Client | Free-shipping threshold + shipping copy is inconsistent across the site (trust + conversion hit) | 2 | 3 | 2 | 3 | 16 | DONE | [issue-072](done-issues/issue-072.md) |
| 73 | Client | Homepage hero social proof is hard-coded (rating + “Trusted by 10k”) instead of data-driven | 4 | 4 | 3 | 2 | 29 | DONE | [issue-073](done-issues/issue-073.md) |
| 74 | Client | Cart page links users to broken support/account routes and claims “secure checkout” while checkout is unavailable | 5 | 5 | 3 | 2 | 47 | DONE | [issue-074](done-issues/issue-074.md) |
| 75 | Admin | Admin product cards say “Updated” but don’t show an updated timestamp (low utility + confusion) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-075](ui-issues/issue-075.md) |
| 76 | Client | Multiple production-facing UI files disable TypeScript checks (`@ts-nocheck`) (higher risk of shipping broken UI) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-076](done-issues/issue-076.md) |
| 77 | Client | `LazyVisible` assumes `IntersectionObserver` exists (can throw in some browsers/webviews) | 2 | 3 | 3 | 2 | 9 | DONE | [issue-077](done-issues/issue-077.md) |
| 78 | Client | `useMediaQuery` uses `matchMedia.addEventListener` only (no Safari/legacy fallback) | 2 | 3 | 3 | 2 | 9 | DONE | [issue-078](done-issues/issue-078.md) |
| 79 | Client | Spin-wheel “Sign in to claim” loses the user’s place (no redirect back to the wheel) | 2 | 3 | 1 | 3 | 17 | DONE | [issue-079](done-issues/issue-079.md) |
| 80 | Client | The same product is linked by multiple URLs/handles (duplicate pages + confusing navigation) | 2 | 4 | 4 | 2 | 12 | DONE | [issue-080](done-issues/issue-080.md) |
| 81 | Client | Header promo strip uses opacity-only hiding, so “hidden” promos can still intercept clicks/focus | 3 | 5 | 3 | 2 | 27 | DONE | [issue-081](done-issues/issue-081.md) |
| 82 | Client | PDP hero image preload can miss the CDN URL (wasted bandwidth + slower hero render) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-082](done-issues/issue-082.md) |
| 83 | Client | PDP quantity picker uses ARIA “listbox” semantics but lacks keyboard listbox behavior | 3 | 4 | 2 | 2 | 22 | DONE | [issue-083](done-issues/issue-083.md) |
| 84 | Client | Drawer uses extremely small type (`text-[9px]`) for high-salience information | 2 | 5 | 3 | 2 | 17 | DONE | [issue-084](done-issues/issue-084.md) |
| 85 | Admin | Admin sidebar icon active-state styling likely never activates (current section is harder to spot) | 2 | 2 | 3 | 1 | 1 | UNTRIAGED | [issue-085](ui-issues/issue-085.md) |
| 86 | Admin | Admin “collapsed sidebar” mode creates unlabeled icon-only navigation (a11y + usability) | 3 | 2 | 3 | 3 | 15 | NOT_AN_ISSUE | [issue-086](ui-issues/issue-086.md) |
| 87 | Client | TikTok section hides the “Watch on TikTok” fallback link on mobile (no escape hatch if embeds fail) | 4 | 3 | 3 | 2 | 21 | DONE | [issue-087](done-issues/issue-087.md) |
| 88 | Client | PDP hero media uses generic alt text for key product imagery (accessibility + SEO loss) | 3 | 5 | 3 | 2 | 27 | DONE | [issue-088](done-issues/issue-088.md) |
| 89 | Client | Non-standard Tailwind utilities are used in production UI (silent styling failures) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-089](done-issues/issue-089.md) |
| 90 | Client | Footer “Stay in the loop” CTA is a `mailto:` link (not a real signup; breaks expectation on many devices) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-090](done-issues/issue-090.md) |
| 91 | Blog | Blog post contains internal links to slugs that don’t exist (dead navigation inside the article) | 2 | 3 | 1 | 3 | 17 | DONE | [issue-091](done-issues/issue-091.md) |
| 92 | Blog | Blog markdown renders internal links as plain `<a href>` (full reload + state loss in a SPA) | 2 | 2 | 2 | 2 | 6 | DONE | [issue-092](done-issues/issue-092.md) |
| 93 | Client | Search results show hard-coded prices that don’t match actual product pricing | 4 | 4 | 3 | 2 | 29 | DONE | [issue-093](done-issues/issue-093.md) |
| 94 | Client | Cart stepper controls and promo input lack accessible labels (hard for screen readers) | 3 | 5 | 3 | 2 | 27 | DONE | [issue-094](done-issues/issue-094.md) |
| 95 | Admin | Admin product-count badge likely never updates (sessionStorage + `storage` listener doesn’t fire in-tab) | 2 | 2 | 3 | 1 | 1 | UNTRIAGED | [issue-095](ui-issues/issue-095.md) |
| 96 | Client | PDP “Hero proof strip” trust claims are hard-coded (including “Source: TikTok Shop + verified store reviews”) | 4 | 4 | 3 | 2 | 29 | DONE | [issue-096](done-issues/issue-096.md) |
| 97 | Client | PDP structured data hard-codes review rating/count (can contradict what the UI displays) | 4 | 5 | 3 | 2 | 37 | DONE | [issue-097](done-issues/issue-097.md) |
| 98 | Admin | Shared `Button` component has no focus-visible styling (keyboard users lose their place) | 3 | 2 | 2 | 3 | 16 | DONE | [issue-098](done-issues/issue-098.md) |
| 99 | Platform | Support/contact + social identity is inconsistent across surfaces (trust drift) | 2 | 3 | 1 | 3 | 17 | DONE | [issue-099](done-issues/issue-099.md) |
| 100 | Blog | Blog promotes a “travel variant” URL but PDP ignores variant query params (misleading deep link) | 4 | 4 | 2 | 2 | 30 | DONE | [issue-100](done-issues/issue-100.md) |
| 101 | Creator | Creator “Download brief” CTAs can point to an `example.com` placeholder (broken onboarding resource) | 2 | 3 | 2 | 3 | 16 | DONE | [issue-101](done-issues/issue-101.md) |
| 102 | Creator | Welcome page “View leaderboard” card is a dead link and opens in a new tab | 3 | 4 | 3 | 2 | 21 | DONE | [issue-102](done-issues/issue-102.md) |
| 103 | Blog | Blog index “tag” chips look like filters but are inert, and pillar filtering is effectively unreachable | 2 | 2 | 2 | 2 | 6 | UNTRIAGED | [issue-103](ui-issues/issue-103.md) |
| 104 | Platform | Canonical URLs / breadcrumb JSON-LD / share links hard-code `https://lumelle.com` (breaks on staging/custom domains) | 4 | 5 | 3 | 2 | 37 | DONE | [issue-104](done-issues/issue-104.md) |
| 105 | Client | Brand story page has no SEO metadata (browser tab title/share preview can be stale or wrong) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-105](done-issues/issue-105.md) |
| 106 | Client | `Seo` auto-prefixing + titles that already contain “Lumelle \| …” yields awkward double-brand tab titles | 2 | 5 | 3 | 2 | 17 | DONE | [issue-106](done-issues/issue-106.md) |
| 107 | Client | Drawer upsell cards fabricate compare-at pricing + review counts (trust risk in cart) | 4 | 5 | 3 | 2 | 37 | DONE | [issue-107](done-issues/issue-107.md) |
| 108 | Client | Shopify checkout/cart handoff page doesn’t provide a direct “Open on Shopify” link even when the domain is known | 2 | 5 | 4 | 2 | 16 | DONE | [issue-108](done-issues/issue-108.md) |
| 109 | Blog | Blog pages don’t consistently apply `cdnUrl` to images (CDN toggle won’t apply; can cause broken imagery/perf regressions) | 3 | 5 | 3 | 2 | 27 | DONE | [issue-109](done-issues/issue-109.md) |
| 110 | Client | Some above-the-fold hero images omit explicit sizing (risk of layout shift/jank) | 2 | 3 | 1 | 3 | 17 | DONE | [issue-110](done-issues/issue-110.md) |
| 111 | Platform | `noindex` robots meta can “stick” across SPA navigation (you can accidentally noindex the whole site) | 4 | 5 | 3 | 2 | 37 | DONE | [issue-111](done-issues/issue-111.md) |
| 112 | Client | Several key routes don’t set page metadata (tab title/description can be stale from the previous page) | 4 | 3 | 3 | 2 | 21 | DONE | [issue-112](done-issues/issue-112.md) |
| 113 | Client | Spin wheel “Saved — add to cart” state is dead (saved discount code is never used later) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-113](done-issues/issue-113.md) |
| 114 | Platform | Drawer sign-in copy promises “manage subscriptions” (but there is no subscription management UI) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-114](done-issues/issue-114.md) |
| 115 | Platform | Successful sign-in redirects users to a broken destination (`afterSignInUrl="/account"` but `/account` is unavailable) | 4 | 4 | 3 | 2 | 29 | NOT_AN_ISSUE | [issue-115](ui-issues/issue-115.md) |
| 116 | Client | `index.html` structured data advertises a site search (`SearchAction`) but search UX/data is not real | 4 | 5 | 3 | 2 | 37 | DONE | [issue-116](done-issues/issue-116.md) |
| 117 | Creator | Duplicate “content source of truth” files increase copy drift risk (welcome/brief/legal exist twice) | 2 | 4 | 2 | 3 | 22 | DONE | [issue-117](done-issues/issue-117.md) |
| 118 | Platform | Social URL config exists but isn’t used; UI hard-codes social links so env vars can’t fix them | 2 | 3 | 1 | 3 | 17 | DONE | [issue-118](done-issues/issue-118.md) |
| 119 | Client | TikTok embeds are inconsistently sandboxed across pages (inconsistent behavior + privacy/security risk) | 2 | 3 | 1 | 3 | 17 | DONE | [issue-119](done-issues/issue-119.md) |
| 120 | Client | Two different color token systems are used in global UI (`brand-*` vs `semantic-legacy-brand-*`) (design consistency drift risk) | 2 | 3 | 4 | 2 | 8 | UNTRIAGED | [issue-120](ui-issues/issue-120.md) |
| 121 | Creator | WhatsApp CTAs are inconsistent (and one is mislabeled): “Message WhatsApp” points to a group invite link | 2 | 3 | 2 | 3 | 16 | NOT_AN_ISSUE | [issue-121](ui-issues/issue-121.md) |
| 122 | Client | Product spotlight discount UI depends on parsing a human-written price string (fragile + easy to break) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-122](done-issues/issue-122.md) |
| 123 | Creator | Creator “Leaderboard” claims it updates daily, but it’s hard-coded static data | 4 | 3 | 3 | 2 | 21 | DONE | [issue-123](done-issues/issue-123.md) |
| 124 | Platform | Sign-in / sign-up pages promise capabilities that don’t exist (orders/addresses/commissions) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-124](done-issues/issue-124.md) |
| 125 | Platform | The “Sign up” page uses the `signIn` Clerk API (sign-up flow is ambiguous and may fail) | 5 | 3 | 3 | 2 | 27 | DONE | [issue-125](done-issues/issue-125.md) |
| 126 | TBD | No global error boundary: any runtime error or chunk-load failure can white-screen the app | 4 | 5 | 3 | 2 | 37 | DONE | [issue-126](done-issues/issue-126.md) |
| 127 | Client | Homepage reviews section tells users to “visit our TikTok shop product page” but provides no link | 2 | 4 | 3 | 2 | 13 | DONE | [issue-127](done-issues/issue-127.md) |
| 128 | Creator | Welcome onboarding says “Log your launch date” but offers no action to actually do it | 2 | 4 | 3 | 2 | 13 | DONE | [issue-128](done-issues/issue-128.md) |
| 129 | Client | Marketing pages use raw hex colors in Tailwind classes (bypasses the token system and increases drift) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-129](done-issues/issue-129.md) |
| 130 | Client | Duplicate `StarRating` components exist (UI drift + bug fixes won’t apply consistently) | 2 | 3 | 4 | 2 | 8 | UNTRIAGED | [issue-130](ui-issues/issue-130.md) |
| 131 | Client | Social proof mismatch: homepage teaser shows 4.9★ / 1240 reviews, but the PDP shows 4.8 / 100+ | 2 | 4 | 3 | 2 | 13 | DONE | [issue-131](done-issues/issue-131.md) |
| 132 | Client | Search results page has no search input (users can’t refine or try again) | 2 | 4 | 3 | 2 | 13 | NOT_AN_ISSUE | [issue-132](ui-issues/issue-132.md) |
| 133 | Client | Above-the-fold hero images are lazy-loaded (blank hero risk + worse perceived quality) | 2 | 3 | 1 | 3 | 17 | DONE | [issue-133](done-issues/issue-133.md) |
| 134 | Client | Trust bar uses a marquee animation with a clickable link (moving target + no pause control) | 2 | 3 | 1 | 3 | 17 | DONE | [issue-134](done-issues/issue-134.md) |
| 135 | Platform | `Seo` allows relative `og:image` / `twitter:image` URLs (share previews can fail) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-135](done-issues/issue-135.md) |
| 136 | Client | Global `overflow-x-hidden` can clip focus rings/shadows and hides layout bugs instead of fixing them | 3 | 3 | 2 | 3 | 25 | DONE | [issue-136](done-issues/issue-136.md) |
| 137 | Client | PDP hero preload link is only ever added once (stale preload when navigating between products) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-137](done-issues/issue-137.md) |
| 138 | Client | PDP thumbnail strip hides the scrollbar and has no “more media” affordance | 2 | 4 | 3 | 2 | 13 | DONE | [issue-138](done-issues/issue-138.md) |
| 139 | Platform | Fonts are loaded via CSS `@import` (render-blocking and can worsen first paint) | 2 | 3 | 1 | 3 | 17 | DONE | [issue-139](done-issues/issue-139.md) |
| 140 | Client | Fixed bottom CTAs don’t respect iOS safe-area insets (can overlap the home indicator / browser UI) | 2 | 3 | 3 | 2 | 9 | DONE | [issue-140](done-issues/issue-140.md) |
| 141 | Client | Two SEO components exist (`Seo` vs `SEO`) with different defaults and URL/image handling (meta drift risk) | 4 | 5 | 3 | 2 | 37 | DONE | [issue-141](done-issues/issue-141.md) |
| 142 | Client | Multiple “design primitives” are duplicated across `src/ui` and marketing domain (drift + inconsistent fixes) | 2 | 4 | 2 | 3 | 22 | DONE | [issue-142](done-issues/issue-142.md) |
| 143 | Client | PDP “review count” in HeroProofStrip is derived by stripping digits from a label string (brittle + can show wrong numbers) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-143](done-issues/issue-143.md) |
| 144 | Admin | Admin Products “Save” can report success even when nothing was persisted (especially in “config fallback” mode) | 5 | 2 | 3 | 2 | 17 | DONE | [issue-144](done-issues/issue-144.md) |
| 145 | Admin | Admin Products list silently hides any CMS products not present in `product-config` (admin ≠ source of truth) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-145](ui-issues/issue-145.md) |
| 146 | Admin | Admin product live preview is only available on XL screens (most editors won’t see a preview) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-146](ui-issues/issue-146.md) |
| 147 | Admin | Admin product gallery selection can’t truly be closed (state forces `editingMediaIdx` back to 0) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-147](ui-issues/issue-147.md) |
| 148 | Admin | Admin “Upload” relies on Cloudinary’s external widget script with no loading/progress UI (fragile + inconsistent asset pipeline) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-148](ui-issues/issue-148.md) |
| 149 | Client | App-level `Suspense` fallback removes the site chrome (header/footer vanish during route loads) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-149](done-issues/issue-149.md) |
| 150 | Client | Drawer scroll-lock can cause horizontal “page jump” (scrollbar disappears with no compensation) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-150](done-issues/issue-150.md) |
| 151 | Client | JSON-LD structured data uses relative URLs (logo/images), which can break rich results | 4 | 5 | 3 | 2 | 37 | DONE | [issue-151](done-issues/issue-151.md) |
| 152 | Client | Terminology inconsistency: PDP says “Basket” while the rest of the UI says “Cart” | 1 | 5 | 1 | 3 | 14 | DONE | [issue-152](done-issues/issue-152.md) |
| 153 | Client | Responsive image variants exist, but key pages still load a single full-size JPG without `srcSet`/AVIF | 3 | 3 | 2 | 2 | 16 | DONE | [issue-153](done-issues/issue-153.md) |
| 154 | Admin | Admin “Pages” UI shows `/{slug}` as if it’s the live route, but `brand-story` doesn’t exist (`/brand` is the real route) | 2 | 2 | 3 | 2 | 5 | UNTRIAGED | [issue-154](ui-issues/issue-154.md) |
| 155 | Platform | Tailwind color `brand-porcelain` is referenced but not defined (styles silently fail) | 2 | 3 | 3 | 2 | 9 | DONE | [issue-155](done-issues/issue-155.md) |
| 156 | TBD | Service worker returns `offline.html` for failed asset requests (can break images/JS on flaky networks) | 4 | 5 | 3 | 2 | 37 | DONE | [issue-156](done-issues/issue-156.md) |
| 157 | Client | PDP meta description (and Product JSON-LD description) always appends “Blocks steam…” even for non-shower-cap products | 4 | 5 | 3 | 2 | 37 | DONE | [issue-157](done-issues/issue-157.md) |
| 158 | Platform | App sets a persistent `lumelle_anon_id` cookie with no consent UI (trust + compliance risk) | 4 | 5 | 3 | 2 | 37 | DONE | [issue-158](done-issues/issue-158.md) |
| 159 | Admin | Admin Products silently hides `satin-overnight-curler-set` via `ADMIN_HIDDEN_HANDLES` (product can’t be managed) | 2 | 2 | 3 | 3 | 9 | DONE | [issue-159](done-issues/issue-159.md) |
| 160 | Admin | Admin Products list can’t reliably open the editor (selection is cleared unless URL includes `/admin/products/:handle`) | 5 | 2 | 3 | 2 | 17 | DONE | [issue-160](done-issues/issue-160.md) |
| 161 | Admin | Admin Products list view shows a disabled “Save changes” button even when no product is selected | 2 | 2 | 3 | 2 | 5 | DONE | [issue-161](done-issues/issue-161.md) |
| 162 | Client | Product gallery asset filenames include spaces and inconsistent casing (fragile URLs + CDN friction) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-162](done-issues/issue-162.md) |
| 163 | Platform | `crypto.randomUUID()` is used without a fallback in browser-executed code (can crash on older browsers) | 4 | 3 | 3 | 2 | 21 | DONE | [issue-163](done-issues/issue-163.md) |
| 164 | Client | Client cart recovery feature flags are parsed incorrectly (`Boolean(...)` makes `'0'`/`'false'` truthy) | 4 | 5 | 3 | 2 | 37 | DONE | [issue-164](done-issues/issue-164.md) |
| 165 | Admin | Curler config defines two public handles (`satin-overnight-curler` vs `satin-overnight-curler-set`) and admin hides one (URL/SEO duplication + ops confusion) | 2 | 5 | 3 | 3 | 27 | DONE | [issue-165](done-issues/issue-165.md) |
| 166 | Client | Checkout attribution writes to `localStorage`/cookies without guarding storage failures (can crash checkout in privacy-restricted browsers) | 4 | 5 | 3 | 2 | 37 | DONE | [issue-166](done-issues/issue-166.md) |
| 167 | Platform | Service worker forces immediate activation (`skipWaiting` + `clients.claim`) with no “Update available” UX | 2 | 5 | 3 | 2 | 17 | DONE | [issue-167](done-issues/issue-167.md) |
| 168 | Client | Client cart recovery env module mixes `process.env` with `import.meta.env` (browser-unsafe footgun) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-168](done-issues/issue-168.md) |
| 169 | Admin | Admin Products editor can lose unsaved changes with no warning when switching products | 5 | 2 | 3 | 2 | 17 | DONE | [issue-169](done-issues/issue-169.md) |
| 170 | Client | PDP bottom CTA chips are hard-coded to shower-cap features (“Waterproof satin”, “No-frizz seal”) for every product | 4 | 4 | 3 | 2 | 29 | DONE | [issue-170](done-issues/issue-170.md) |
| 171 | Platform | Tailwind `line-clamp-*` utilities are used but the line-clamp plugin is not enabled (text overflow + layout breakage) | 2 | 3 | 1 | 3 | 17 | DONE | [issue-171](done-issues/issue-171.md) |
| 172 | Client | No “Skip to content” link (keyboard + screen-reader usability regression) | 3 | 3 | 2 | 2 | 16 | DONE | [issue-172](done-issues/issue-172.md) |
| 173 | Client | “Just added” CTAs use `animate-pulse` without respecting `prefers-reduced-motion` (motion a11y) | 3 | 3 | 3 | 2 | 15 | DONE | [issue-173](done-issues/issue-173.md) |
| 174 | Client | Public header shows two “Account” links on desktop (redundant + wastes header space) | 2 | 5 | 3 | 2 | 17 | DONE | [issue-174](done-issues/issue-174.md) |
| 175 | Creator | Welcome page “Copy invite link” failure has no user-visible fallback (onboarding friction) | 2 | 4 | 3 | 2 | 13 | DONE | [issue-175](done-issues/issue-175.md) |
| 176 | Admin | Admin blog editor relies on placeholders instead of real labels (accessibility + clarity issue) | 2 | 2 | 1 | 3 | 11 | DONE | [issue-176](done-issues/issue-176.md) |
| 177 | Platform | CDN URL encoding is inconsistent, which is brittle with space/case filenames (broken images / wrong preloads / bad previews) | 3 | 5 | 3 | 2 | 27 | DONE | [issue-177](done-issues/issue-177.md) |
| 178 | Client | Floating “Buy Now” CTA is hidden with `opacity-0` but remains focusable (invisible focus target) | 3 | 3 | 2 | 2 | 16 | DONE | [issue-178](done-issues/issue-178.md) |
| 179 | Creator | Floating WhatsApp CTA has the same invisible-focus problem (and exists in two copies) | 3 | 3 | 3 | 2 | 15 | DONE | [issue-179](done-issues/issue-179.md) |
| 180 | Admin | Admin mobile drawer is “hidden” only by transform (no `aria-hidden`/`inert`, still reachable in the DOM) | 3 | 2 | 3 | 3 | 15 | DONE | [issue-180](done-issues/issue-180.md) |
| 181 | Client | Multi-buy discount codes don’t apply at checkout (tiered discounts requested) | 4 | 4 | 3 | 2 | 0 | UNTRIAGED | [issue-181](ui-issues/issue-181.md) |
| 182 | Client | Drawer checkout CTA is stuck on “Preparing checkout…” (no working “Go to checkout”) | 5 | 5 | 3 | 2 | 0 | UNTRIAGED | [issue-182](ui-issues/issue-182.md) |
| 183 | Client | Mobile account + footer has weird padding / horizontal scroll (should not scroll sideways) | 3 | 5 | 2 | 2 | 0 | UNTRIAGED | [issue-183](ui-issues/issue-183.md) |
| 184 | Platform | `/api/storefront/*` endpoints return 500 (Cloudflare Worker 1101) — cart create, landing sections, product fetch | 5 | 5 | 2 | 3 | 0 | VERIFYING | [issue-184](ui-issues/issue-184.md) |
| 185 | Client | Entire site allows horizontal scrolling on mobile (layout should be flush + centered) | 4 | 5 | 2 | 2 | 0 | UNTRIAGED | [issue-185](ui-issues/issue-185.md) |
| 186 | Client | “Trusted by 10k users” avatars repeat (needs more authentic social proof) | 2 | 5 | 2 | 2 | 0 | UNTRIAGED | [issue-186](ui-issues/issue-186.md) |
| 187 | Client | Landing reviews section feels bland on desktop (needs higher-impact design) | 3 | 5 | 3 | 2 | 0 | UNTRIAGED | [issue-187](ui-issues/issue-187.md) |
| 188 | Client | Spin wheel needs visible % labels + “Congrats! You’ve won 20% off…” popup | 3 | 4 | 3 | 2 | 0 | UNTRIAGED | [issue-188](ui-issues/issue-188.md) |
| 189 | Client | Account “Payment methods” has dev artifacts; consider removing or simplifying (Shopify is the payment source-of-truth) | 3 | 3 | 2 | 2 | 0 | UNTRIAGED | [issue-189](ui-issues/issue-189.md) |
| 190 | Client | WhatsApp + email support links need to be verified/simplified | 3 | 4 | 1 | 2 | 0 | UNTRIAGED | [issue-190](ui-issues/issue-190.md) |
| 191 | Client | Brand story page copy needs update + CTA should link to “Learn more” blog post | 2 | 3 | 1 | 1 | 0 | DONE | [issue-191](done-issues/issue-191.md) |
| 192 | Client | Landing “creators” section copy should be customer-focused + “Join creators” CTA should become “Learn more” (blog link) | 2 | 4 | 1 | 2 | 0 | UNTRIAGED | [issue-192](ui-issues/issue-192.md) |
