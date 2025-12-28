# Admin Products Page – Refactor Plan (First Principles)

Date: 2025-12-26

## ✅ Goal
Make `ProductsPage` easy to edit (layout + preview + form sections) without risking:
- Supabase draft save behavior
- URL/selection behavior (`/admin/products` + `/admin/products/:handle`)
- Live preview behavior (admin sends draft overrides, PDP renders them)

## 🧠 First‑principles constraints (non‑negotiables)
1) **Behavior before structure**
   - Every refactor step must be behavior‑neutral.
   - No schema changes.

2) **High cohesion / low coupling**
   - UI sections should not know about Supabase.
   - Data hooks should not import JSX.
   - Preview should not depend on form section structure.

3) **Single ownership**
   - `admin/catalog` owns admin product editing.
   - `client/shop/products` owns the PDP rendering.

4) **Incremental, reversible steps**
   - Avoid “big bang” rewrites.
   - Each extraction is its own safe checkpoint.

5) **Colocate by feature (domains architecture)**
   - Keep “Products Admin” code under `src/domains/admin/catalog/…`.
   - Only move to `@platform/*` when it is truly cross-domain.

## 📍 Current state snapshot (what makes it hard today)
`src/domains/admin/catalog/ui/pages/ProductsPage.tsx` currently mixes:
- Supabase fetch/save + media upsert
- selection state + session caching
- preview (iframe + postMessage)
- list view rendering
- every form section (hero, gallery, copy, bullets, FAQ, etc)
- JSON parsing/mutations (`specs_text` / `faq_text`)

Typical failure modes:
- layout edits accidentally break save logic
- data edits accidentally break UI rendering

## ✅ Refactor status (already done)
- Layout shell extracted: `src/domains/admin/catalog/ui/layouts/ProductsLayout.tsx`
- Preview components moved to admin shared:
  - `src/domains/admin/shared/ui/preview/IPhonePreviewCard.tsx`
  - `src/domains/admin/shared/ui/preview/IPhoneMockup.tsx`
- Product list card exists at: `src/domains/admin/catalog/ui/cards/ProductCard.tsx`
- Form primitives extracted: `src/domains/admin/catalog/ui/components/FormPrimitives.tsx`
- First sections extracted: `src/domains/admin/catalog/ui/sections/EssentialsSection.tsx`, `src/domains/admin/catalog/ui/sections/FaqSection.tsx`

## 🧱 Target structure (aligned with `docs/domains-README.md`)
We keep domain-first + layered shape:

```
src/domains/admin/catalog/
├── data/
│   ├── productsRepo.ts              # low-level Supabase queries
│   └── productMediaRepo.ts          # low-level Supabase media queries
├── logic/
│   ├── productDraftMessaging.ts     # postMessage payload building + guards
│   ├── productSpecs.ts              # parse/mutate specs_text + faq_text
│   └── productNumbers.ts            # normalizers, price helpers
├── hooks/
│   ├── useProducts.ts               # orchestrates repos + snapshots + dirty
│   ├── useProductSelection.ts       # route <-> selection sync
│   └── useProductDraftPreview.ts    # sends draft payload to iframe
├── ui/
│   ├── cards/
│   │   └── ProductCard.tsx
│   ├── layouts/
│   │   └── ProductsLayout.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── GallerySection.tsx
│       ├── HeroTextSection.tsx
│       ├── ProofStripSection.tsx
│       ├── CareSection.tsx
│       ├── BenefitsSection.tsx
│       ├── CreatorsSection.tsx
│       ├── TikTokSection.tsx
│       └── FaqSection.tsx
└── ui/pages/
    └── ProductsPage.tsx             # orchestrator only

src/domains/admin/shared/ui/preview/
├── IPhonePreviewCard.tsx            # reusable preview shell (iframe + mock)
├── IPhoneMockup.tsx                 # reusable iPhone frame
├── DeviceFrame.tsx                  # (optional) generic device frame
└── DeviceToggle.tsx                 # (optional) device toggle UI
```

Notes:
- Hooks live in `hooks/` (React-only).
- Data access lives in `data/` (no React, no JSX).
- “Business transforms” live in `logic/`.

## 🔁 Refactor order (most effective + lowest risk)

### Step 0 — Baseline safety net
Definition of done:
- `npm run typecheck`
- `npm run lint`
- `npm run build`

### Step 1 — Layout + preview extraction (done)
Definition of done:
- Preview scrolls inside phone
- Admin page doesn’t grow to PDP height

### Step 2 — Extract UI sections (next)
Why:
- Section moves are mostly mechanical and low-risk.

Definition of done:
- Each section exports a single component with typed props:
  - `value` (structured)
  - `onChange` callbacks
  - `disabled` / `error` props where needed
- No section imports Supabase or router.

### Step 3 — Centralize “specs” transforms in `logic/productSpecs.ts`
Why:
- Today the most fragile part is JSON parsing/mutation scattered across the page.

Definition of done:
- All `specs_text`/`faq_text` parsing and update helpers live in one file.
- Updates are pure functions: `(draft, patch) => nextDraft`.

### Step 4 — Extract data access + hooks
Split:
- `data/*Repo.ts` = Supabase calls only
- `hooks/useProducts.ts` = orchestrates load/save + snapshots + dirty
- `hooks/useProductSelection.ts` = route ↔ selection

Definition of done:
- `ProductsPage` contains no Supabase calls.

### Step 5 — Harden preview messaging
Why:
- postMessage should be explicit and guarded.

Definition of done:
- `logic/productDraftMessaging.ts` builds payloads.
- `hooks/useProductDraftPreview.ts` sends messages.
- Message origin is validated and `targetOrigin` is explicit.

### Step 6 — Cleanup + docs
Definition of done:
- `ProductsPage.tsx` is “layout + orchestration only”.
- Dead helpers removed.
- Add small README files for `ui/sections`, `hooks`, `data` (recommended).

## 🔐 Preview messaging (security + stability)
Admin sender should:
- use `targetOrigin = window.location.origin`
- avoid `'*'` unless there is a deliberate cross-origin need

Client receiver should:
- ignore messages from unexpected origins
- ignore unknown message shapes

## ✅ “Good refactor” acceptance criteria
- No UI regressions in:
  - list view
  - selecting products
  - editing fields
  - saving
  - preview updates
- No new cross-domain deep imports.
- Small, obvious files.
- No new abstractions unless they remove duplication.

## 🧪 Validation commands
```bash
npm run typecheck
npm run lint
npm run build
```

## 📚 Reference reading (for rationale)
- React: “Reusing Logic with Custom Hooks”
- MDN: “Window.postMessage” (security + targetOrigin/origin checks)
- Kent C. Dodds: “Colocation”
- Feature-Sliced Design (FSD): feature-first modular structure
