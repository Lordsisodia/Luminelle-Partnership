# Feedback Executive Summary (as of 2025-12-28)

This folder is the project’s “feedback → backlog → execution” system.

If you’re new here, start with:
- `docs/06-quality/feedback/README.md` (how feedback is organized)
- `docs/06-quality/feedback/ui-issue-tracker/README.md` (AI-executable UI backlog system)
- `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (single source of truth for the 2025-12-26 UI audit)

---

## What exists (and why it matters)

The feedback system is intentionally split into two layers:

1) **Time-based snapshots** (`docs/06-quality/feedback/YYYY-MM-DD-*.md`)
   - Immutable-ish raw notes (calls, transcripts, screenshots, Looms, etc.)
   - Example: `docs/06-quality/feedback/2025-11-13-client-call.md`

2) **Living page/surface docs** (folders: `admin/`, `client/`, `blog/`, `creator/`, `platform/`)
   - A consolidated backlog per route / product area (what to fix next, decisions, code pointers)
   - These are meant to stay “current” as implementation progresses.

---

## UI audit backlog status (2025-12-26)

The internal UI audit (`docs/06-quality/reviews/app-ui-review-2025-12-26.md`) has been converted into:

- **Tracker:** `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`
- **Per-issue worklogs (180):** `docs/06-quality/feedback/ui-issue-tracker/ui-issues/issue-*.md`

Current totals (from the tracker’s full table):
- `DONE`: **133**
- `NOT_AN_ISSUE`: **17**
- `UNTRIAGED`: **30**
- Total issues: **180**

Notes:
- Many items are already closed (`DONE` / `NOT_AN_ISSUE`) with verification notes captured in the worklogs.
- “Per-page” feedback docs should link to the relevant worklog when referencing audit issue IDs.

---

## Top open items (UNTRIAGED)

Below are open items that still need verification/triage (sorted by priority, then ID).

### Client (storefront)
- `#018` (P09) Discounts / promo codes / rewards UI is present but underlying logic is stubbed.
- `#030` (P09) Discount messaging is shown widely, but there’s no working discount system in the app.
- `#050` (P08) Two different “spin wheel” experiences exist (inconsistent UX + obvious duplication).
- `#031` (P05) PDP “video” media likely renders at 0 height (broken-looking when selected).
- `#120` (P08) Two different color token systems exist (`brand-*` vs `semantic-legacy-brand-*`) (design drift).
- `#130` (P08) Duplicate `StarRating` components exist (UI drift + bug fixes won’t apply consistently).

### Admin
- `#020` (P05) Admin on mobile: drawer can’t be opened (no burger button).
- `#049` (P05) Components editor is localStorage-only (not publishable).
- `#057` (P05) Activity log is a nav-linked placeholder (“Not wired yet”).
- `#059` (P05) Media library is in-memory mock content (no persistence/upload).
- `#060` (P05) Product content editor lacks explicit success/error handling (silent failure risk).
- `#062` (P05) Admin sign-in doesn’t preserve return-to-admin (lands on `/account`).
- `#063` (P05) Pages UI implies editing/publish, but it’s a static mock.
- `#064` (P05) Blogs list has non-functional controls + placeholder metrics.
- `#065` (P05) Blog “Save/Publish” buttons are no-ops.
- `#066` (P05) Blog editor inputs not wired to draft; preview isn’t live-draft.
- `#075` (P05) Products cards show “Updated” without timestamp.
- `#085` (P01) Admin sidebar icon active-state styling likely never activates.
- `#095` (P01) Admin product-count badge likely never updates (in-tab `storage` listener doesn’t fire).
- `#145` (P05) Admin Products hides CMS products not present in `product-config`.
- `#146` (P05) Admin product live preview is XL-only (most editors won’t see it).
- `#147` (P05) Admin product gallery selection can’t truly be closed (state forces index back to 0).
- `#148` (P05) Upload relies on Cloudinary widget script with no loading/progress UI.
- `#154` (P05) Pages UI suggests routes that don’t exist (e.g. `/{slug}` vs actual `/brand`).

### Blog
- `#034` (P05) Blog “social” section is blank (component returns `null`).
- `#048` (P05) Blog “Shop now” CTAs use raw `<a href>` for internal routes (full reload).
- `#067` (P05) Related reads carousel hides scrollbars and has no accessible controls.
- `#092` (P05) Blog markdown renders internal links as raw `<a href>` (full reload).
- `#103` (P06) Blog index tag chips look like filters but are inert; filtering is unreachable.

Next step for any of the above: move from `UNTRIAGED` → `VERIFYING` in the tracker and create/extend the issue worklog with repro + evidence.

---

## Screenshot / asset hygiene

There are **47 unique** `codex-clipboard-*.png` references across `docs/06-quality/feedback/**/*.md`, and **none** of those files exist in `docs/06-quality/feedback/Feedback images/`.

Action:
- If you have those screenshots, drop them into `docs/06-quality/feedback/Feedback images/` and update the notes to link to the real filenames.
- If you don’t have them, keep the references as historical context, but avoid adding new dangling references going forward.
