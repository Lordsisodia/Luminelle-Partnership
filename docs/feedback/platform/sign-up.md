# Platform — Sign up (Feedback)

## Routes
- `/sign-up`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/platform/auth/ui/pages/SignUpPage.tsx`

## Purpose
Account creation flow (email/password, SSO, validation/error states).

## Status legend
- `[ ]` requested / not yet verified
- `[x]` closed (DONE or NOT_AN_ISSUE in black-box)

## Feedback backlog

### Internal UI review (2025-12-26)
- [x] (#28) Auth pages likely render a “double layout” (AuthLayout card + full-page UI); choose one layout approach. — Black-box: `NOT_AN_ISSUE` ([issue-028](../black-box/ui-issues/issue-028.md))
- [x] (#61) Auth can silently break if Clerk isn’t configured (placeholder key); add clear config validation + fallback messaging. — Black-box: `DONE` ([issue-061](../black-box/ui-issues/issue-061.md))

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
