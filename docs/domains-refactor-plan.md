# Cross-Domain Refactor Playbook (Dec 2025)

## Objectives
- Shrink monolithic files into composable modules (data hooks, layouts, sections).
- Keep behaviors unchanged per step; ship in small, build-green increments.
- Make preview/iframe panes swappable (e.g., iPhone mockup) without touching form code.
- URL-driven selection for detail pages; refresh-safe.
- Add lightweight README per folder describing responsibilities/props.

## Domains & Priority
1) **Admin Catalog (Products)** – in progress (current focus).
2) **Admin Media** – next; similar list/detail/editor split.
3) **Admin Pages / Components** – rich-text/blocks; apply same pattern.
4) **Client PDP/PLP** – sectionized UI + data hooks for content/pricing/inventory.
5) **Platform Auth** – shared providers/guards/layout shells.

## Pattern to Apply (per domain)
1) Identify monoliths (>500 LOC). Extract in this order:
   - UI primitives/cards.
   - Preview pane (iframe + toggles) and layout shell (sticky column).
   - Selection hook (route <-> selection; session cache).
   - Data hook (fetch/save; snapshots; normalizers).
   - Specs/state hook (parse/update nested JSON).
   - Section components (one file per form block).
2) Add `Layout` component that slots `preview` and `content`.
3) Add per-folder README: responsibilities, main exports, prop shapes.
4) Keep a feature flag when hiding preview or new UI during migration.
5) After parity, remove dead code and inline helpers from the page.

## Admin Catalog (Products) – Detailed Steps
Status: preview/card extracted; selection hook in place; build green.
- [ ] Wire `useProducts` into page; move fetch logic out.
- [ ] Add `useProductSpecs` (reasons, care, proof, creators, TikTok, FAQ parsers/mutators).
- [ ] Split sections to `ui/sections/*`: Hero, SignToTry, CareMaterials, ProofStrip, WhyLove, Creators, TikTokFeature, FAQ.
- [ ] Add `ProductsLayout` (grid + sticky slot) and use shared preview UI (`IPhonePreviewCard` / `IPhoneMockup`) for phone mode.
- [ ] Clean up page to orchestration-only; delete inline helpers; add README in `ui/sections`, `ui/preview`, `data`.

## Admin Media – Plan
- Hooks: `useMediaLibrary` (query, filters, upload results), `useMediaSelection`.
- Components: `MediaCard`, `MediaGrid`, `MediaDetailPane`, `UploadDropzone`.
- Layout: `MediaLayout` with sticky preview/detail pane.
- Sections: filters, uploader, detail metadata form.
- Add README in `domains/admin/media/ui/sections`.

## Admin Pages / Components – Plan
- Hooks: `usePages`, `usePageSelection`, `usePageContent` (blocks/RTE state).
- Components: `PageCard`, `PageList`, `BlockEditor`, `SeoPanel`, `PreviewPane`.
- Layout shell similar to Products.

## Client PDP/PLP – Plan
- Hooks: `usePdpContent`, `usePricing`, `useInventory`, `useCartBridge`.
- Sections: hero, badges, callouts, media gallery, care, FAQs, reviews.
- Shared layout shell with optional device preview for admin preview routes.

## Platform Auth – Plan
- Extract guards/layouts to `domains/platform/auth/ui/layouts`.
- Hooks: `useAuthGate` (role-based), `useSessionInfo`.
- Components: `AuthProvider`, `AuthGate`, `RedirectNotice`.

## Execution Notes
- After each extraction, run `npm run build -- --mode development`.
- Avoid behavioral changes; keep feature flags for risky UI (preview).
- Commit in small chunks per section/hook for easy rollback.
