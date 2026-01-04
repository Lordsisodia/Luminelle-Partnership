# Blog — Post (Feedback)

## Routes
- `/blog/:slug`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/blog/ui/pages/BlogPostPage.tsx`

## Purpose
Blog post detail page (rendering, SEO, sharing, related posts, comments if enabled).

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [ ] (#34) Blog “social” section is blank (component returns `null`) leaving dead whitespace. — Black-box: `UNTRIAGED` ([issue-034](../ui-issue-tracker/ui-issues/issue-034.md))
- [x] (#35) Author links fall back to `#` (dead link + page jump). — Black-box: `NOT_AN_ISSUE` ([issue-035](../ui-issue-tracker/ui-issues/issue-035.md))
- [ ] (#67) Related reads carousel has hidden scrollbars and no accessible controls (add prev/next + interactive dots). — Black-box: `UNTRIAGED` ([issue-067](../ui-issue-tracker/ui-issues/issue-067.md))
- [ ] (#48) Internal “Shop now” CTAs use raw `<a href>` even for internal routes (full reload + state loss). — Black-box: `UNTRIAGED` ([issue-048](../ui-issue-tracker/ui-issues/issue-048.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
