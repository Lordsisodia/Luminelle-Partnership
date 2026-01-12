# Black Box Task Status Report

**Generated:** 2026-01-11
**Scope:** All active black box plans and tasks

---

## 🎯 Landing Page UI Updates (Jan 2026)

**Plan:** `docs/.blackbox/.plans/2026-01-11_1631_landing-page-ui-updates-jan-2026/`

### Status: ✅ **IN PROGRESS** (Changes Staged)

**Completed Tasks:**
1. ✅ **Spin Wheel Updates** - IMPLEMENTED
   - Mixed percentages (5%, 10%, 15%) instead of all 10%
   - Changed guaranteed welcome deal to "Free Shipping on orders over £20"
   - Updated all user-facing text to reflect free shipping
   - **File:** `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`

2. ✅ **Footer L Logo** - IMPLEMENTED
   - Added L logo icon next to "Lumelle" text
   - Logo path: `/l-icon.svg`
   - Proper spacing with gap-3
   - **File:** `src/ui/components/GlobalFooter.tsx`

**Remaining Tasks:**
3. ⏳ **Hero Section Updates**
   - Remove "10k+" user count pill
   - Move stars above "Trusted by 10k users" text
   - **Files:** `src/content/landing.ts`, Hero section component

4. ⏳ **Customer Stories Updates**
   - Remove profile pictures from review cards
   - Extract stars from pill containers
   - Make review text longer (2-3 sentences each)
   - Make names bigger and centered
   - **Files:** `src/content/landing.ts`, `SuccessStoriesSection.tsx`

**Documentation Status:**
- ✅ PLAN.md (9,335 bytes) - Complete specification
- ✅ EXECUTION-PROMPT.md - Pre-written prompts
- ✅ QUICK-REFERENCE.md - Task summary
- ✅ FUTURE-IMPROVEMENTS.md (6,422 bytes) - Enhancement research
- ✅ VISUAL-IMPROVEMENTS.md (16,295 bytes) - Code examples
- ✅ README.md - Overview

**Next Steps:**
1. Commit the staged changes (Spin Wheel + Footer)
2. Implement Hero section updates
3. Implement Customer Stories updates
4. Test all changes together

---

## 🔧 Shopify WebhookInbox Reverse Engineering

**Plan:** `docs/.blackbox/.plans/2026-01-02_0012_reverse-engineer-shopify-webhookinbox-best-of-both-worlds/`

### Status: 🔄 **EXPLORATION PHASE**

**Progress:**
- ✅ Confirmed canonical ingress: `/api/shopify/webhooks/*`
- ✅ Captured current webhook inventory + drift signals
- ✅ Identified id header selection issues
- ✅ Found runtime duplication (api vs functions)
- ✅ Created gap analysis
- ✅ Drafted Phase 1 upgrade scope

**Artifacts Generated:**
- `current-inventory.md` - Webhook inventory
- `gap-list.md` - Identified gaps
- `phase-plan.md` - Phase 1 plan
- `sources.md` - Source files
- `summary.md` - Executive summary

**Work Queue (7 items pending):**
- [ ] Confirm production webhook runtime(s)
- [ ] Make inventory table of topics → handlers → side effects
- [ ] Diff verification behavior
- [ ] Diff idempotency behavior
- [ ] Draft canonical inbox schema
- [ ] Write "WebhookInbox Spec Pack"
- [ ] Identify OSS upstream PR opportunities

**Next Actions:**
1. Confirm production webhook ingress path(s)
2. Create inventory table
3. Write WebhookInbox specification

**Last Updated:** 2026-01-02 00:12

---

## 🏗️ UI↔Infra Plug-in Architecture

**Plan:** `docs/.blackbox/.plans/2025-12-28_2014_deep-research-architecture-ui-infra-plug-in-ports-adapters/`

### Status: ✅ **READY TO RUN**

**Completed Work:**
- ✅ Filled all run outputs (final-report, artifact-map, rankings, ports.md)
- ✅ Promoted evergreen notes to `docs/05-planning/research/`
- ✅ Tightened checkout handoff plan
- ✅ Decided implementation preference (internal API first)
- ✅ Validations green (all scripts passing)

**Remaining:**
- ⏳ Continue prompt blocks 11–20 / 21–35
- ⏳ Validate contracts against remaining Shopify touchpoints

**Estimated Effort:** 6–10 hours / ~50 prompts

**Next Actions:**
1. Continue prompt block execution
2. Validate contracts
3. Document findings

**Last Updated:** 2025-12-29 06:55

---

## 🔑 Vendor GID Migration

**Plan:** `docs/.blackbox/.plans/2025-12-29_0741_ui-infra-key-mapping-migration-remove-shopify-gids/`

### Status: 🔄 **EXPLOIT PHASE** (Plan Ready)

**Completed Work:**
- ✅ Captured baseline vendor leak scan
- ✅ Defined `VariantKey` naming scheme
- ✅ Decided mapping registry location
- ✅ Wrote file-by-file edit plan
- ✅ Created agent cycle and RUN-NOW instructions

**Artifacts:**
- ✅ `run-meta.yaml` filled
- ✅ `sources.md` captured
- ✅ `summary.md` written

**Pending:**
- [ ] Replace Shopify GIDs in UI/provider upsells
- [ ] Replace Shopify GIDs in client config
- [ ] Replace Shopify GID in `volumeDiscounts.ts`
- [ ] Promote to deepresearch
- [ ] Update journal.md
- [ ] Update docs-ledger.md

**Next Actions:**
1. Replace GIDs in `DrawerProvider`
2. Replace GIDs in `product-config.ts`
3. Replace GID in `volumeDiscounts.ts`

**Last Updated:** 2025-12-29 12:35

---

## 📊 Overall Status Summary

| Task | Phase | Completion | Next Step |
|------|-------|-----------|-----------|
| **Landing Page** | Implementation | 🟡 40% (2/4 sections) | Complete Hero & Stories |
| **WebhookInbox** | Exploration | 🔵 15% (research) | Create inventory table |
| **UI↔Infra Architecture** | Ready to Run | 🟢 80% (planned) | Execute prompts 11-20 |
| **Vendor GID Migration** | Exploit | 🟢 70% (planned) | Execute GID replacements |

---

## 🎯 Quick Wins Available

1. **Landing Page** - 2 sections done, 2 to go (straightforward UI changes)
2. **Vendor GID** - Plan complete, just needs execution (3 file edits)

## 📝 Maintenance Items

- [ ] Keep `deepresearch/index.md` current
- [ ] Log doc changes in `docs/08-meta/repo/docs-ledger.md`
- [ ] Archive old plans when noisy

---

## 🔍 Git Status

**Staged Changes:**
- `src/ui/components/GlobalFooter.tsx` - L logo added
- `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx` - Wheel updated
- `src/content/home.config.ts` - Type improvements
- `src/content/home.types.ts` - Type improvements
- `src/ui/components/PublicHeader.tsx` - Minor changes
- `vite.config.ts` - Config changes

**Untracked:**
- Landing page plan folder (new)

**Recent Commits:**
- `b31f22ac` - Sync all Jan 2026 client feedback issues to DONE
- `530d8b1c` - Fix console warnings and add testing checklist

---

## 📅 Timeline Activity (2026-01)

**2026-01-11:**
- 16:31 UTC - Created landing page UI updates plan
- 16:37 UTC - Added visual improvements research
- 16:37 UTC - Created Spin the Wheel implementation

**2026-01-02:**
- 15:42 UTC - Created `.timeline` structure

---

## 🎯 Recommendations

1. **Immediate:** Commit staged landing page changes (Spin Wheel + Footer)
2. **This Week:** Complete Hero and Customer Stories sections
3. **Next Week:** Execute Vendor GID migration (3 file edits)
4. **Ongoing:** Continue WebhookInbox research (low priority, exploration phase)

---

**Report Status:** ✅ Current and comprehensive
**All Plans Tracked:** 4 active plans
**Overall Progress:** 🟡 On track with good momentum
