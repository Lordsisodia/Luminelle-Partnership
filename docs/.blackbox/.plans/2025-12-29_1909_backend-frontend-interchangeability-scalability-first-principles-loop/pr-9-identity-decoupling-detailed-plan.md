# PR 9 — Identity Decoupling (Clerk today; swappable identity later)

Goal:
- Make client projects “identity-swappable” by localizing identity provider coupling.
- Today the repo uses Clerk; this plan makes it possible to swap identity (or run “no-auth storefront”) without rewriting UI/client domains.

Scope (for this PR plan):
- This is an **implementation-ready plan**, but we are still in docs-only mode right now.
- No changes are made in this plan file itself; it describes what to change later.

Evidence rule:
- Any “current state” claim cites a snapshot under:
  - `docs/.blackbox/.plans/2025-12-29_1909_backend-frontend-interchangeability-scalability-first-principles-loop/artifacts/snapshots/`

---

## 0) Current baseline (what’s true today)

- Vendor SDK drift snapshot shows Clerk imports outside platform domains:
  - Raw matches: `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`
  - Unique Clerk files: `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.unique-files.clerk.txt`
- Stop-point metrics now track identity coupling via counts:
  - `vendor_sdk_imports_nonplatform_clerk=7` baseline: `artifacts/snapshots/stop-point-metrics.latest.txt`
- There is already a platform-level internal auth context shim wrapping Clerk hooks (this is the natural “identity adapter boundary” to grow into):
  - `artifacts/snapshots/src-domains-platform-auth-providers-AuthContext.impl.tsx.head240.txt`
- Clerk route shell exists (currently just renders nested routes):
  - `artifacts/snapshots/src-shells-ClerkShell.tsx.head200.txt`

---

## 1) Acceptance criteria (what “done” means)

### 1.1 Hard target (mechanical)

- `vendor_sdk_imports_nonplatform_clerk` trends to **0** in:
  - `artifacts/snapshots/stop-point-metrics.latest.txt`
- `boundary-vendor-sdk-imports.nonplatform.unique-files.clerk.txt` becomes empty.

### 1.2 Soft target (pragmatic)

- The only remaining identity-provider specific code is inside:
  - `src/domains/platform/auth/**` (identity “adapter boundary”)
- UI/client domains call internal wrappers/components:
  - `useAuthContext()` (or successor)
  - internal `UserMenu` / `SignedIn` / `SignedOut` wrappers (or successor)

---

## 2) Inventory: the concrete coupling sites to eliminate

Source of truth for the list:
- `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.unique-files.clerk.txt`

Current list (must drive to 0):
- `src/main.tsx`
- `src/ui/components/GlobalHeader.tsx`
- `src/ui/providers/DrawerProvider.tsx`
- `src/domains/admin/catalog/ui/pages/ProductsPage.tsx`
- `src/hooks/useSyncUserToSupabase.ts`
- `src/domains/client/account/hooks/useSyncUserToSupabase.ts`
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`

---

## 3) Migration strategy (how to remove coupling without breaking UX)

### 3.1 Establish the single “identity adapter boundary”

Target:
- All direct Clerk imports should move into `src/domains/platform/auth/**`.

Mechanism (already partially exists):
- Keep `AuthProvider` as the internal API for “signed in / user / get token / sign out”.
  - Evidence anchor for current shape: `artifacts/snapshots/src-domains-platform-auth-providers-AuthContext.impl.tsx.head240.txt`

### 3.2 Replace UI dependencies with internal wrappers

Replace patterns:
- `@clerk/clerk-react` UI components in `src/ui/**` → internal `platform/auth/ui/**` components.
- `useAuth()` / `useSignIn()` calls in UI/client domains → `useAuthContext()` (or a stronger typed internal port).

Why this is the correct seam:
- It keeps identity provider semantics behind a single module surface.
- It prevents client projects from forking every component that currently imports Clerk directly.

### 3.3 Consolidate duplicated “sync user to Supabase” logic

Current state:
- There are at least two hook paths importing Clerk auth:
  - `src/hooks/useSyncUserToSupabase.ts` and `src/domains/client/account/hooks/useSyncUserToSupabase.ts` appear in:
    `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.unique-files.clerk.txt`

Direction:
- Collapse “user sync” into a platform-owned capability (either identity-domain or data-domain), so:
  - UI/client doesn’t hold the logic for identity→data synchronization.

---

## 4) Evidence to run after implementation (prove the coupling is gone)

From `docs/`:
- `./.blackbox/scripts/run-1909-loop.sh`

Expected evidence deltas:
- `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.rg.txt`:
  - no `@clerk/*` imports outside `src/domains/platform/**`
- `artifacts/snapshots/boundary-vendor-sdk-imports.nonplatform.unique-files.clerk.txt`:
  - becomes empty
- `artifacts/snapshots/stop-point-metrics.latest.txt`:
  - `vendor_sdk_imports_nonplatform_clerk` decreases to 0

---

## 5) Stop condition (when to pause)

Stop (and do not keep churning) once:
- the coupling list is empty (`unique-files.clerk.txt`),
- the metrics show 0 for the Clerk drift count,
- and the UI still behaves correctly (manual smoke test in browser).
