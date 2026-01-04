# Prompt 3 — Boot + Composition Map (evidence-based)

This doc summarizes how the app boots and composes the global provider tree.

Evidence sources (snapshots captured for this loop):
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-router.tsx.head.txt`
- `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-App.tsx.head.txt`

---

## 1) Runtime entrypoint: `src/main.tsx`

### What it does (high-level)

From the snapshot, the app boot sequence:
- Initializes analytics early (PostHog).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`
- Creates the React root and renders:
  - `ClerkProvider` (auth)
  - `HelmetProvider` (head/SEO)
  - `AppErrorBoundary` (global error boundary)
  - `PaymentsProvider` (client/account provider)
  - `RouterProvider` (router from `src/router.tsx`)  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`
- Handles environment gating for Clerk (if not configured, it renders a safe fallback UI instead of booting auth pages).  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`
- Registers a service worker only in production, and surfaces update notifications when a new SW is ready.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`

### Why this matters for “frontend swappable”

If the frontend is swapped, the invariants say:
- global providers should be minimal and stable (auth/head/error boundary)
- integration logic should not be reimplemented inside UI components

This file is a good “single place” for boot + cross-cutting concerns.  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-main.tsx.head.txt`

---

## 2) Root provider tree: `src/router.tsx`

From the snapshot, `router.tsx` wraps `App` with:
- `CartProvider` (client/shop/cart provider)
- `AuthProvider` (platform/auth provider)
- `DrawerProvider` (global drawer provider)
- and global UX components (ScrollToTop, CookieConsentBanner, ServiceWorkerUpdateToast)  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-router.tsx.head.txt`

Why this matters:
- These are “always on” providers. Anything in here becomes a hard dependency of every page.
- If we want frontends to be swappable, these global providers should depend on stable contracts (ports), not provider-specific implementations.  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-router.tsx.head.txt`

---

## 3) Route map and domain composition: `src/App.tsx`

From the snapshot, `App.tsx`:
- Uses `lazy()` + `Suspense` for route-level code splitting.  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-App.tsx.head.txt`
- Routes map cleanly onto domains:
  - client marketing/shop pages (`/`, `/product/:handle`, `/cart`, etc.)
  - checkout handoff routes (`/cart/c/*`)
  - account pages under Clerk shell
  - admin pages under `AdminShell` guarded by `AdminGuard`  
  Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-App.tsx.head.txt`

Why this matters:
- Domain-level modularity exists already; the boundary work should focus on keeping the providers behind contracts rather than mixing vendor details into UI routes/pages.  
Evidence: `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/src-App.tsx.head.txt`

