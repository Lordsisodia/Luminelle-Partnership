# Work Queue

## Now (30–60 min)
- [x] Re-run vendor leak scan and keep it in `artifacts/vendor-leaks-current.txt`
- [x] Fill `final-report.md` with the exact `VariantKey` replacements and file-by-file edit sequence
- [x] Update `artifacts/sources.md` with internal paths + what they prove

## Next (implementation-ready)
- [ ] `DrawerProvider` upsells: change `variantId` → `variantKey` and ensure comparisons/add use keys
- [ ] `product-config.ts`: replace `fallbackVariantId` with a key (and plan compatibility)
- [ ] `volumeDiscounts.ts`: replace constant with key and update signature naming (`variantKey`)

## Done criteria
- [ ] `./.blackbox/scripts/check-vendor-leaks.sh --fail` exits 0 (only allowed legacy matches remain, if any)
