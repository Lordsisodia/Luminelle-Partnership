# Platform — Sign in (Feedback)

## Routes
- `/sign-in`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/platform/auth/ui/pages/SignInPage.tsx`

## Purpose
Authentication entry point (sign-in, SSO, error states).

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [x] (#28) Auth pages likely render a “double layout” (AuthLayout card + full-page UI); choose one layout approach. — Black-box: `NOT_AN_ISSUE` ([issue-028](../ui-issue-tracker/ui-issues/issue-028.md))
- [x] (#61) Auth can silently break if Clerk isn’t configured (placeholder key); add clear config validation + fallback messaging. — Black-box: `DONE` ([issue-061](../ui-issue-tracker/done-issues/issue-061.md))
- [ ] (#62) Admin sign-in should preserve “return to admin” (avoid landing users on `/account` after auth). — Black-box: `UNTRIAGED` ([issue-062](../ui-issue-tracker/ui-issues/issue-062.md))
- [x] (#29) Sign-out behavior exists in UI but is a no-op in auth context (ensure sign-out actually clears session). — Black-box: `NOT_AN_ISSUE` ([issue-029](../ui-issue-tracker/ui-issues/issue-029.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
