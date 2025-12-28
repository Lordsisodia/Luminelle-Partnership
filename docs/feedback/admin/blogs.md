# Admin — Blogs (Feedback)

## Routes
- `/admin/blogs`
- `/admin/blogs/:slug`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/admin/blog/ui/pages/BlogsPage.tsx`
- `src/domains/admin/blog/ui/pages/BlogDetailPage.tsx`

## Purpose
Manage blog content (index, create/edit, publishing, SEO, scheduling).

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [ ] (#64) Blogs list has non-functional controls + placeholder metrics; implement CRUD/actions or label as demo UI. — Black-box: `UNTRIAGED` ([issue-064](../black-box/ui-issues/issue-064.md))
- [ ] (#65) Blog “Save / Publish” buttons are no-ops; disable until persistence exists (or implement draft save). — Black-box: `UNTRIAGED` ([issue-065](../black-box/ui-issues/issue-065.md))
- [ ] (#66) Editor inputs aren’t wired to draft state and preview isn’t live-draft; bind inputs + make preview reflect draft. — Black-box: `UNTRIAGED` ([issue-066](../black-box/ui-issues/issue-066.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
