# Issue 196 — Lax TypeScript Configuration

**Owner:** Architecture Audit  
**Date:** 2026-01-15  
**Area:** TypeScript / Configuration  
**Priority:** P1 (High)  
**Status:** UNTRIAGED  
**Worklog:** [ARCH-2026-01-15_architecture-audit-cart-context.md](../ARCH-2026-01-15_architecture-audit-cart-context.md)

---

## 1) Problem Statement

TypeScript compiler options `noUnusedLocals` and `noUnusedParameters` are disabled, allowing dead code to accumulate throughout the codebase.

**Files Affected:**
- `tsconfig.app.json` (TypeScript configuration)

---

## 2) Evidence

### Configuration
```json
{
  "compilerOptions": {
    "noUnusedLocals": false,
    "noUnusedParameters": false
  }
}
```

### From Initial Audit

The comprehensive architecture audit identified this as a medium-priority issue affecting code quality and maintainability.

---

## 3) Root Causes

1. **Legacy Configuration**
   - Disabled during early development to allow rapid prototyping
   - Never re-enabled as codebase matured
   - Dead code accumulated over time

2. **Lack of Incremental Fixes**
   - No process in place to fix unused code as it appears
   - Would require massive one-time effort to fix all at once

3. **Missing Quality Controls**
   - No pre-commit hooks to prevent re-introduction
   - No CI checks for code quality

---

## 4) Impact Assessment

### Code Quality
**Risk Level:** 🟡 Medium

**Impact:**
- Dead code accumulates over time
- Makes code review harder and more time-consuming
- Increases bundle size unintentionally
- Reduces developer productivity by creating confusion
- Makes it harder to understand what code is actually used

### Maintainability
**Risk Level:** 🟢 Low

**Impact:**
- Dead code creates technical debt
- Makes refactoring more difficult
- Unclear which code can be safely removed

---

## 5) Proposed Solution

### Phase A: Enable Checks (1 hour)

**1.1 Update tsconfig.app.json**
```json
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**1.2 Run typecheck**
```bash
npm run typecheck
```

**1.3 Identify Unused Code**
Run typecheck and document all unused locals and parameters found.

### Phase B: Incremental Fix (1-2 days)

**2.1 Fix Critical Areas First**
- Focus on high-impact domains (platform, admin, client)
- Fix unused code in critical paths
- Don't try to fix everything at once

**2.2 Update Documentation**
- Document the decision to enable these checks
- Update developer guidelines

### Phase C: Add Guardrails (2-3 hours)

**3.1 Pre-commit Hook**
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint:check"
    }
  }
}
```

**3.2 Lint Check**
```typescript
// package.json scripts
{
  "lint:check": "tsc --noEmit && eslint ."
}
```

---

## 6) Success Criteria

- [ ] `noUnusedLocals: true` enabled in tsconfig.app.json
- [ ] `noUnusedParameters: true` enabled in tsconfig.app.json
- [ ] All unused locals and parameters identified and fixed
- [ ] Pre-commit hook added to prevent re-introduction
- [ ] CI check added to ensure compliance
- [ ] Documentation updated with new guidelines
- [ ] No breaking changes in TypeScript usage

---

## 7) Dependencies

### Blocking
- None - can start immediately

### Related Issues
- Phase 1 Critical Issues: #193 (CartContext), #194 (Analytics)
- Other Phase 1 issues may be affected by typecheck errors

---

## 8) Effort Estimate

- **Phase A:** 1 hour
- **Phase B:** 1-2 days
- **Phase C:** 2-3 hours

**Total Effort:** 1-3 days

---

## 9) Research Needed

✅ **COMPLETE** - Research completed during comprehensive exploration phase:
- TypeScript configuration best practices
- Incremental fixing strategies
- Guardrail patterns for code quality

---

## 10) Next Steps

1. ✅ **Documented** - Issue created in tracker
2. ⏳ **Plan** - Incremental fixing approach defined
3. ⏳ **Approve** - Get stakeholder sign-off on approach
4. ⏳ **Execute** - Begin Phase A: Enable checks
5. ⏳ **Verify** - Run typecheck and identify unused code
6. ⏳ **Fix** - Incrementally fix unused code
7. ⏳ **Add Guardrails** - Implement pre-commit hook and lint check
8. ⏳ **Complete** - Update documentation and mark done

---

**Status:** UNTRIAGED  
**Next Action:** Incremental fixing approach defined

---

**Effort:** 1-3 days  
**Risk:** Low - Configuration change, incremental fixing
---

**Priority:** P1 (High) - Developer Experience and Code Quality
