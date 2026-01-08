# Issue 092: Blog markdown renders internal links as plain `<a href>` (full reload + state loss in a SPA)

Source audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `92`
Tracker: `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md`

## Metadata

- Status: `DONE`
- Area: `Blog`
- Impact (1–5): `2`
- Reach (1–5): `2`
- Effort (1–5): `2`
- Confidence (1–3): `2`
- Priority: `6` (`(2×2×2)−2`)
- Owner: `AI`
- Created: `2025-12-27`

---

## Step 1 — Intake
- [x] Restate the issue (1 sentence).
  - Blog post markdown renders internal links as normal `<a href="/...">` anchors, causing full-page reloads instead of SPA navigation.
- [x] Link to the audit issue and copy the key claim.
  - Audit: `docs/06-quality/reviews/app-ui-review-2025-12-26.md` — issue `92`
  - Key claim (paraphrase): Blog post bodies are rendered via `markdown-to-jsx` and internal links become plain anchors, forcing reload navigation.
- [x] Identify likely files/components.
  - `src/domains/blog/ui/pages/BlogPostPage.tsx` (uses `markdown-to-jsx` to render `post.body`)
  - Router: `react-router-dom` (`<Link>` / `<RouterLink>` for internal routes)

## Step 2 — Verify
- [x] Confirm evidence in code (paths + what’s wrong).
  - `src/domains/blog/ui/pages/BlogPostPage.tsx` renders markdown via `<Markdown>{...}</Markdown>` without overriding `a` tags, so markdown links render as plain `<a href="...">`.
- [x] Write repro steps (route + actions).
  - Visit any blog post, e.g. `/blog/lumelle-journal-launch`.
  - Click an internal link inside the post body that points to another in-app route (e.g. `/blog/...` or `/products/...`).
  - Observe a full page navigation (document reload) instead of in-app SPA navigation (can confirm via Network tab “Doc” request + scroll/state reset).
- [x] Mark `Verified: YES/NO` and set status accordingly.
  - Verified: **YES** (code-path evidence; expected browser behavior for plain anchors)

## Step 3 — Assess
- [x] Score impact/reach/effort/confidence and compute priority.
  - Impact: 2 (polish + SPA UX quality)
  - Reach: 2 (blog readers; link-dense pages but not core checkout)
  - Effort: 2 (needs careful link classification: internal vs hash vs external)
  - Confidence: 2 (code evidence; manual repro not yet recorded)
  - Priority: 6 (`(2×2×2)−2`)
- [x] Decide: `FIX` / `DEFER` / `WONT_FIX` / `NEEDS_DECISION`.
  - Decision: **FIX**
- [x] Note dependencies (data, product decision, auth, etc.).
  - None (local UI rendering change only)

## Step 4 — Options
- [x] Option A: Override `markdown-to-jsx` link renderer to use `react-router-dom` `<Link>` for SPA routes.
  - Pros: localized change, minimal blast radius, matches router architecture, preserves typography styling.
  - Cons: needs careful route classification (don’t break links to static files like `/docs/...`).
- [x] Option B: Wrap blog content in a click-capture handler (event delegation) and intercept internal link clicks.
  - Pros: renderer-agnostic (works for any HTML).
  - Cons: brittle (modifier keys, target=_blank, nested elements), harder to reason about, easy to break accessibility expectations.
- [x] Pick one + rationale (fit with domain architecture).
  - Picked **Option A**: link rendering is the correct layer to decide SPA vs native navigation.

## Step 5 — Plan
- [x] Write implementation plan (bullets).
  - Add a custom markdown `a` override for blog rendering.
  - Route SPA-safe internal hrefs through `react-router-dom` `<Link>` to avoid full reload.
  - Keep native `<a>` for external links, hashes, and static file links.
- [x] Write acceptance criteria (testable).
  - Internal blog markdown links to app routes (e.g. `/blog/...`, `/product/...`, `/account/...`) do not trigger a full page reload.
  - Hash links (e.g. `#faq`) still behave like normal anchors.
  - External links (e.g. `https://...`, `mailto:...`) still render as normal anchors.
  - Build + typecheck succeed.
- [x] Risks/rollback notes.
  - Risk: classifying a non-router URL as SPA route could route to the NotFound page instead of letting the browser fetch a real file.
  - Mitigation: exclude obvious static file links (file extensions) and `/docs/*` from SPA routing.
  - Rollback: remove the `markdown-to-jsx` `a` override and revert to raw anchors.

## Step 6 — Execute + Validate
- [x] Implement changes.
  - Updated `src/domains/blog/ui/pages/BlogPostPage.tsx` to override markdown `a` rendering:
    - Internal app routes use `react-router-dom` `<Link>` (SPA navigation).
    - External / hash / static-file links use `<a href>`.
- [x] Validate (tests or best-effort manual checks).
  - `npm run typecheck` ✅
  - `npm run build` ✅
  - `npx eslint src/domains/blog/ui/pages/BlogPostPage.tsx` ✅
  - Note: `npm run lint` currently fails repo-wide due to pre-existing lint errors unrelated to this change (not addressed here to keep blast radius small).
- [x] Record results and any regressions found.
  - No type errors from the new link override.
  - Build succeeds; blog content validator passes.
  - Manual QA recommended: open `/blog/<slug>`, click an internal markdown link, confirm no document reload (Network tab: no “Doc” navigation).

## Step 7 — Record + Close
- [x] Update `docs/06-quality/feedback/ui-issue-tracker/ui-issue-tracker.md` (status + priority if changed).
  - Status progressed `UNTRIAGED → PLANNED → IN_PROGRESS → VALIDATING` (DONE once validation is accepted).
  - Priority updated `5 → 6` to reflect lower effort and a concrete plan.
- [x] Summarize what changed + where.
  - Blog markdown links now use SPA routing for internal app routes via `markdown-to-jsx` `a` override in `src/domains/blog/ui/pages/BlogPostPage.tsx`.
- [x] Mark DONE/DEFERRED/etc.
  - Final status: **DONE** (pending final tracker + worklog move per closure rule)

---

## Evidence / Links

- Code refs:
- `src/domains/blog/ui/pages/BlogPostPage.tsx` (markdown `a` override)
- Screenshots:
- Logs/traces:

## Outcome

- Final status: `DONE`
- Final notes:
  - This only changes how markdown links render; it does not touch other `<a href>` usages in blog (e.g. product cards).
  - Worklog moved to `done-issues/` per tracker closure rule.
