# 008 — Duplicate `cdnUrl()` implementations cause inconsistent asset loading

## Summary
There are two separate `cdnUrl()` utilities:

- `src/utils/cdn.ts`
- `src/lib/utils/cdn.ts`

They are both in use across the app (different import paths).

The `src/lib/utils/cdn.ts` version contains special-case CDN bypass logic for a known missing asset:
- bypass paths containing `/uploads/luminele/page9-image`

The `src/utils/cdn.ts` version does not include that bypass.

## Impact
- **Medium/High** when `VITE_USE_ASSET_CDN=1`:
  - some pages/components may render images correctly (bypass applies)
  - others may break (bypass missing) depending on which `cdnUrl()` import they use
- Hard-to-debug “works on one page, breaks on another” asset issues.

## Evidence
Some modules import `cdnUrl` from `@/utils/cdn`:
- blog pages and parts of landing page SEO metadata

Some modules import `cdnUrl` from `@/lib/utils/cdn`:
- landing hero shop section and product spotlight section

## Repro
1. Enable CDN mode: `VITE_USE_ASSET_CDN=1` and set `VITE_ASSET_BASE_URL`.
2. Visit pages that use the bypassed asset.
3. Compare:
   - components that import from `@/lib/utils/cdn` may work
   - components that import from `@/utils/cdn` may still request the missing CDN object

## Fix Direction
- Consolidate to a single `cdnUrl()` implementation and update imports.
- Keep bypass rules (if still needed), but centralize them so behavior is consistent.
- Add a lightweight “asset existence” check in the CDN upload pipeline to prevent missing critical images.

