# Platform — SSO callback (Feedback)

## Routes
- `/sso-callback`

## Code pointers
- `src/App.tsx` (route wiring)
- `src/domains/platform/auth/ui/pages/SSOCallbackPage.tsx`

## Purpose
Handles SSO callback/redirect processing and finalizes auth session.

## Status legend
- `[ ]` requested / not yet verified
- `[x]` verified shipped (only tick once confirmed in the UI)

## Feedback backlog
- [ ] Confirm SSO callback handles error states cleanly and returns users to the intended destination.

## Decisions / notes
- _None yet._

## Related sources
- [app-ui-review-2025-12-26.md](../../reviews/app-ui-review-2025-12-26.md)
