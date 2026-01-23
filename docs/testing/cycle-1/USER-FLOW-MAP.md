# Lumelle User Flow Map & Testing Action Plan

**Generated:** 2026-01-12
**Application:** Lumelle E-Commerce Platform
**Total Routes:** 54 (25 client-facing, 29 admin)

---

## Executive Summary

This document maps all user flows by business criticality, testing priority, and dependencies. It serves as the strategic guide for comprehensive testing execution.

### Quick Stats

- **Critical Revenue Flows:** 3 (直接影响收入)
- **High Priority Flows:** 8 (影响用户体验和转化)
- **Medium Priority Flows:** 18 (重要但非关键)
- **Low Priority Flows:** 25 (后台管理和边缘功能)

---

## Flow Priority Matrix

### 🔴 CRITICAL (P0) - Revenue-Blocking Flows
*Must work perfectly. Any break = immediate revenue loss.*

| Flow | Pages | Business Impact | Failure Risk | Test First |
|------|-------|-----------------|--------------|------------|
| **Guest Checkout** | `/product/:handle` → `/cart` → `/checkout` → `/order/:orderId/confirm` | **REVENUE** 💰 | EXTREME | ✅ Yes |
| **User Registration** | `/sign-up` → `/account` | **RETENTION** 🔒 | HIGH | ✅ Yes |
| **Cart Management** | `/cart` → add/remove/update items | **REVENUE** 💰 | HIGH | ✅ Yes |

### 🟠 HIGH (P1) - Core User Experience
*Major impact on user satisfaction and conversion rates.*

| Flow | Pages | Business Impact | User Volume | Test Order |
|------|-------|-----------------|-------------|------------|
| **Product Discovery** | `/` → `/product/:handle` | CONVERSION | VERY HIGH | 4 |
| **Product Search** | `/search` → results | CONVERSION | HIGH | 5 |
| **Login Flow** | `/sign-in` → redirect | RETENTION | HIGH | 6 |
| **Order Tracking** | `/order/track` | SUPPORT | MEDIUM | 7 |
| **Account Management** | `/account` → settings | RETENTION | MEDIUM | 8 |
| **Address Book** | `/account/addresses` | CONVERSION | MEDIUM | 9 |
| **Payment Methods** | `/account/payments` | CONVERSION | LOW | 10 |
| **Brand Story** | `/brand` | BRANDING | MEDIUM | 11 |

### 🟡 MEDIUM (P2) - Important Features
*Important for specific use cases but not revenue-critical.*

| Flow | Pages | Business Impact | User Volume | Test Order |
|------|-------|-----------------|-------------|------------|
| **Returns Process** | `/returns` | SUPPORT | LOW | 12 |
| **Blog Browsing** | `/blog` → `/blog/:slug` | CONTENT | LOW | 13 |
| **Creator Welcome** | `/welcome` | ACQUISITION | LOW | 14 |
| **Creators Page** | `/creators` | MARKETING | LOW | 15 |
| **Order History** | `/account/orders` | RETENTION | MEDIUM | 16 |
| **Order Details** | `/account/orders/:orderId` | SUPPORT | LOW | 17 |

### 🔵 ADMIN (P2-P3) - Internal Tools
*Critical for operations but not customer-facing.*

| Flow | Pages | User Type | Business Impact | Test Order |
|------|-------|-----------|-----------------|------------|
| **Admin Dashboard** | `/admin` → `/admin/analytics` | Internal | OPERATIONS | 18 |
| **Order Management** | `/admin/orders` → details | Internal | FULFILLMENT | 19 |
| **Product Catalog** | `/admin/products` → details | Internal | MERCHANDISING | 20 |
| **Content Management** | `/admin/pages`, `/admin/blogs` | Internal | CONTENT | 21 |
| **Media Library** | `/admin/media` | Internal | ASSETS | 22 |
| **Component Library** | `/admin/components` | Internal | DEVELOPMENT | 23 |
| **Admin Settings** | `/admin/settings/*` | Internal | CONFIGURATION | 24 |

---

## Critical Flow Breakdown

### 1. Guest Checkout Flow (CRITICAL P0) 💰

**Business Impact:** Direct revenue generation. Breakage = lost sales.

**Steps:**
```
1. Landing (/)
   ↓ View products
2. Product Page (/product/:handle)
   ↓ Select variant
   ↓ Add to cart
3. Cart (/cart)
   ↓ Review items
   ↓ Update quantities
   ↓ Apply discount (optional)
4. Checkout (/checkout)
   ↓ Enter shipping info
   ↓ Select shipping method
   ↓ Enter payment info
   ↓ Review order
   ↓ Place order
5. Order Confirmation (/order/:orderId/confirm)
   ✓ Order created
   ✓ Payment processed
   ✓ Order tracking available
```

**Key Test Points:**
- [ ] Product variant selection works
- [ ] Add to cart updates cart count
- [ ] Cart persists (session/localStorage)
- [ ] Quantity updates (min: 1, max: 4 per `MAX_CART_ITEM_QTY`)
- [ ] Remove item works
- [ ] Free shipping threshold displays correctly (£20+)
- [ ] Guest checkout available (no account required)
- [ ] Shipping form validation
- [ ] Payment form validation
- [ ] Order submission succeeds
- [ ] Confirmation page displays order details
- [ ] Order tracking works

**Dependencies:**
- Shopify Storefront API (product data)
- Stripe/PayPal (payment processing)
- Clerk (auth - optional for guest)
- Database (order creation)

**Failure Symptoms:**
- Cart not updating
- Cannot add items
- Checkout form errors
- Payment failures
- Order not created
- Confirmation page blank

**Estimated Test Time:** 45-60 minutes

---

### 2. User Registration Flow (CRITICAL P0) 🔒

**Business Impact:** Customer retention, repeat purchases, lifetime value.

**Steps:**
```
1. Sign Up Page (/sign-up)
   ↓ Enter email
   ↓ Enter password
   ↓ Confirm password
   ↓ Submit
2. Email Verification (if enabled)
   ↓ Check email
   ↓ Click verification link
3. Account Created
   ↓ Redirect to /account or /
4. Sign In (/sign-in)
   ✓ Can login with credentials
```

**Key Test Points:**
- [ ] Email validation works
- [ ] Password requirements enforced
- [ ] Password confirmation matches
- [ ] Form submission succeeds
- [ ] User session created
- [ ] Redirect after signup
- [ ] Email verification sent (if enabled)
- [ ] Can login after signup
- [ ] Session persists across pages
- [ ] Logout works

**Dependencies:**
- Clerk (authentication provider)
- Email service (verification emails)

**Failure Symptoms:**
- Cannot create account
- Form validation errors
- No email sent
- Cannot login after signup
- Session not persisting

**Estimated Test Time:** 20-30 minutes

---

### 3. Cart Management Flow (CRITICAL P0) 🛒

**Business Impact:** Direct revenue. Cart issues = abandoned purchases.

**Steps:**
```
1. Add to Cart (from product page)
   ↓ Cart icon updates count
2. View Cart (/cart)
   ↓ See all items
3. Update Quantity
   ↓ Plus/minus buttons
   ↓ Manual input (1-4 max)
4. Remove Item
   ↓ Remove button
5. Continue Shopping
   ↓ Return to browsing
6. Proceed to Checkout
   ↓ Go to /checkout
```

**Key Test Points:**
- [ ] Add to cart works from product page
- [ ] Cart count updates in header
- [ ] Cart page loads with items
- [ ] Quantity increase works (max 4)
- [ ] Quantity decrease works (min 1)
- [ ] Manual quantity input (1-4)
- [ ] Remove item works
- [ ] Cart total updates correctly
- [ ] Free shipping message updates (£20+ threshold)
- [ ] Continue shopping button works
- [ ] Checkout button redirects to /checkout
- [ ] Empty cart state displays
- [ ] Cart persists on refresh

**Dependencies:**
- Cart state management (likely React Query + localStorage)
- Shopify Storefront API

**Failure Symptoms:**
- Items not adding
- Count not updating
- Cannot update quantities
- Cannot remove items
- Total calculation wrong
- Cart empties on refresh

**Estimated Test Time:** 25-35 minutes

---

## Complete Flow Inventory

### E-Commerce Flows

#### 4. Product Discovery Flow (HIGH P1)
**Pages:** `/` → `/product/:handle`

**Steps:**
```
Homepage (/)
  ↓ Browse featured products
  ↓ Click product
Product Page (/product/:handle)
  ✓ View images
  ✓ Select variant
  ✓ Read description
  ✓ Add to cart
```

**Test Points:**
- [ ] Homepage loads
- [ ] Product cards display
- [ ] Product links work
- [ ] Product page loads
- [ ] Images display correctly
- [ ] Variant selector works
- [ ] Price displays
- [ ] Add to cart button works
- [ ] Back navigation works

**Estimated Test Time:** 20 minutes

---

#### 5. Product Search Flow (HIGH P1)
**Pages:** `/search` → results

**Steps:**
```
Search Input (in header)
  ↓ Type query
  ↓ Submit/press enter
Search Results Page (/search?q=...)
  ✓ Display results
  ✓ No results state
  ✓ Pagination (if applicable)
```

**Test Points:**
- [ ] Search input accessible from all pages
- [ ] Search submit works
- [ ] Results page loads
- [ ] Results display correctly
- [ ] No results state shows
- [ ] Can click products from results
- [ ] Search query persists in URL

**Estimated Test Time:** 15 minutes

---

#### 6. Order Tracking Flow (HIGH P1)
**Pages:** `/order/track`

**Steps:**
```
Order Tracking Page (/order/track)
  ↓ Enter order ID + email/zip
  ↓ Submit
Order Status Display
  ✓ Show order status
  ✓ Show tracking number
  ✓ Show estimated delivery
```

**Test Points:**
- [ ] Tracking form accessible
- [ ] Form validation works
- [ ] Order lookup succeeds
- [ ] Status displays correctly
- [ ] Tracking link works
- [ ] Error handling for invalid orders

**Estimated Test Time:** 15 minutes

---

### Authentication Flows

#### 7. Login Flow (HIGH P1)
**Pages:** `/sign-in` → redirect

**Steps:**
```
Sign In Page (/sign-in)
  ↓ Enter email
  ↓ Enter password
  ↓ Submit
Dashboard Redirect
  ✓ Redirect to /account or /
```

**Test Points:**
- [ ] Login form accessible
- [ ] Email validation
- [ ] Password field works
- [ ] Submit button works
- [ ] Successful login redirects
- [ ] Error message for invalid credentials
- [ ] "Forgot password" link works
- [ ] Social login buttons (if available)

**Estimated Test Time:** 15 minutes

---

### Account Management Flows

#### 8. Account Dashboard (HIGH P1)
**Pages:** `/account`

**Steps:**
```
Account Page (/account)
  ✓ View overview
  ✓ Quick links to orders, addresses, payments
```

**Test Points:**
- [ ] Account page loads
- [ ] User info displays
- [ ] Order history summary
- [ ] Navigation to sub-pages
- [ ] Logout button

**Estimated Test Time:** 10 minutes

---

#### 9. Address Book (HIGH P1)
**Pages:** `/account/addresses`

**Steps:**
```
Addresses Page (/account/addresses)
  ↓ View saved addresses
  ↓ Add new address
  ↓ Edit existing
  ↓ Delete address
  ↓ Set default
```

**Test Points:**
- [ ] Address list displays
- [ ] Add address form works
- [ ] Address validation
- [ ] Edit address works
- [ ] Delete address works
- [ ] Set default works
- [ ] Default address used in checkout

**Estimated Test Time:** 20 minutes

---

#### 10. Payment Methods (HIGH P1)
**Pages:** `/account/payments`

**Steps:**
```
Payment Methods Page (/account/payments)
  ↓ View saved methods
  ↓ Add new card
  ↓ Remove card
  ↓ Set default
```

**Test Points:**
- [ ] Payment methods list displays
- [ ] Add card form works
- [ ] Card validation
- [ ] Remove card works
- [ ] Set default works
- [ ] Default card used in checkout

**Estimated Test Time:** 15 minutes

---

### Marketing & Branding Flows

#### 11. Brand Story (HIGH P1)
**Pages:** `/brand`

**Test Points:**
- [ ] Page loads
- [ ] Video content plays (if applicable)
- [ ] Social media embeds work (TikTok)
- [ ] Navigation works
- [ ] Responsive on mobile

**Estimated Test Time:** 10 minutes

---

#### 12. Blog Browsing (MEDIUM P2)
**Pages:** `/blog` → `/blog/:slug`

**Test Points:**
- [ ] Blog index loads
- [ ] Blog posts list
- [ ] Individual post loads
- [ ] Content displays correctly
- [ ] Social sharing works (if available)
- [ ] Comments work (if enabled)

**Estimated Test Time:** 15 minutes

---

#### 13. Creator Welcome (MEDIUM P2)
**Pages:** `/welcome`

**Test Points:**
- [ ] Welcome page loads
- [ ] Content displays
- [ ] CTA buttons work
- [ ] Brief download/link works

**Estimated Test Time:** 10 minutes

---

#### 14. Creators Page (MEDIUM P2)
**Pages:** `/creators`

**Test Points:**
- [ ] Page loads
- [ ] Creator information displays
- [ ] CTA buttons work
- [ ] Sign-up flow works

**Estimated Test Time:** 10 minutes

---

### Support Flows

#### 15. Returns Process (MEDIUM P2)
**Pages:** `/returns`

**Test Points:**
- [ ] Returns page loads
- [ ] Returns policy displays
- [ ] Return request form works (if applicable)
- [ ] Contact options display

**Estimated Test Time:** 10 minutes

---

#### 16. Order History (MEDIUM P2)
**Pages:** `/account/orders`

**Test Points:**
- [ ] Order history loads
- [ ] Orders list displays
- [ ] Can click to order details
- [ ] Order status shows
- [ ] Reorder option works (if available)

**Estimated Test Time:** 15 minutes

---

#### 17. Order Details (MEDIUM P2)
**Pages:** `/account/orders/:orderId`

**Test Points:**
- [ ] Order details load
- [ ] Items list displays
- [ ] Shipping address shows
- [ ] Payment info shows
- [ ] Tracking link works
- [ ] Invoice download works (if available)

**Estimated Test Time:** 10 minutes

---

### Admin Flows (P2-P3)

#### 18. Admin Dashboard (MEDIUM P2)
**Pages:** `/admin` → `/admin/analytics`

**Test Points:**
- [ ] Dashboard loads
- [ ] Analytics display
- [ ] Charts render correctly
- [ ] Date filters work
- [ ] Navigation works

**Estimated Test Time:** 15 minutes

---

#### 19. Order Management (MEDIUM P2)
**Pages:** `/admin/orders` → `/admin/orders/:orderId`

**Test Points:**
- [ ] Orders list loads
- [ ] Order details load
- [ ] Status update works
- [ ] Fulfillment actions work
- [ ] Filters/search work
- [ ] Export works (if available)

**Estimated Test Time:** 20 minutes

---

#### 20. Product Catalog (MEDIUM P2)
**Pages:** `/admin/products` → `/admin/products/:handle`

**Test Points:**
- [ ] Product list loads
- [ ] Product details load
- [ ] Create product works
- [ ] Edit product works
- [ ] Image uploads work
- [ ] Variant management works
- [ ] Inventory updates work

**Estimated Test Time:** 30 minutes

---

#### 21. Content Management (MEDIUM P2)
**Pages:** `/admin/pages`, `/admin/blogs`

**Test Points:**
- [ ] Page list loads
- [ ] Page editor works
- [ ] Blog list loads
- [ ] Blog editor works
- [ ] Preview works
- [ ] Publish works

**Estimated Test Time:** 25 minutes

---

#### 22. Media Library (LOW P3)
**Pages:** `/admin/media`

**Test Points:**
- [ ] Media library loads
- [ ] Upload works
- [ ] Delete works
- [ ] Organization works

**Estimated Test Time:** 15 minutes

---

#### 23. Component Library (LOW P3)
**Pages:** `/admin/components` → `/admin/components/:key`

**Test Points:**
- [ ] Component list loads
- [ ] Component editor works
- [ ] Preview works
- [ ] Save works

**Estimated Test Time:** 20 minutes

---

#### 24. Admin Settings (LOW P3)
**Pages:** `/admin/settings/*`

**Test Points:**
- [ ] Settings pages load
- [ ] Save changes works
- [ ] Validation works
- [ ] Different settings sections work

**Estimated Test Time:** 20 minutes

---

## Testing Action Plan

### Phase 1: Critical Revenue Flows (Day 1)
**Goal:** Ensure money-making flows work perfectly.

1. ✅ **Guest Checkout Flow** (60 min)
   - Test complete purchase journey
   - Verify payment processing
   - Confirm order creation
   - Test all 6 viewport/theme combos

2. ✅ **Cart Management** (35 min)
   - Test add/update/remove
   - Verify persistence
   - Test quantity limits (max 4)
   - Check free shipping messaging

3. ✅ **User Registration** (30 min)
   - Test signup flow
   - Verify email confirmation
   - Test login after signup
   - Check session persistence

**Total Time:** ~2 hours

**Deliverables:**
- 3 bug reports (one per flow)
- Screenshots for each viewport/theme
- Console error logs
- Performance metrics

---

### Phase 2: High Priority Flows (Day 2-3)
**Goal:** Ensure core UX flows work well.

4. **Product Discovery** (20 min)
5. **Product Search** (15 min)
6. **Login Flow** (15 min)
7. **Order Tracking** (15 min)
8. **Account Dashboard** (10 min)
9. **Address Book** (20 min)
10. **Payment Methods** (15 min)
11. **Brand Story** (10 min)

**Total Time:** ~2 hours

**Deliverables:**
- 8 bug reports
- Screenshots for critical flows
- UX improvement suggestions

---

### Phase 3: Medium Priority Flows (Day 4)
**Goal:** Test important but non-critical features.

12. **Returns Process** (10 min)
13. **Blog Browsing** (15 min)
14. **Creator Welcome** (10 min)
15. **Creators Page** (10 min)
16. **Order History** (15 min)
17. **Order Details** (10 min)

**Total Time:** ~1 hour

**Deliverables:**
- 6 bug reports
- Content quality assessment

---

### Phase 4: Admin Flows (Day 5)
**Goal:** Test internal tools.

18. **Admin Dashboard** (15 min)
19. **Order Management** (20 min)
20. **Product Catalog** (30 min)
21. **Content Management** (25 min)
22. **Media Library** (15 min)
23. **Component Library** (20 min)
24. **Admin Settings** (20 min)

**Total Time:** ~2.5 hours

**Deliverables:**
- 7 bug reports
- Admin UX assessment
- Operational workflow verification

---

## Total Testing Effort Summary

| Phase | Flows | Pages | Estimated Time | Priority |
|-------|-------|-------|----------------|----------|
| Phase 1: Critical | 3 | 8 | 2 hours | P0 |
| Phase 2: High | 8 | 15 | 2 hours | P1 |
| Phase 3: Medium | 6 | 9 | 1 hour | P2 |
| Phase 4: Admin | 7 | 29 | 2.5 hours | P2-P3 |
| **TOTAL** | **24** | **54** | **7.5 hours** | - |

**Note:** This is manual testing time only. Add 30% for bug documentation and AI screenshot analysis.

**Total with documentation:** ~10 hours

---

## Success Criteria

### Per Flow

Each flow must pass:

✅ **Functional Tests**
- All steps complete successfully
- No console errors
- No API failures
- Forms validate correctly

✅ **Visual Tests**
- Renders correctly in all viewports (mobile/tablet/desktop)
- Works in both themes (light/dark)
- No broken images
- No layout issues

✅ **Accessibility Tests**
- WCAG AA contrast compliance
- Keyboard navigation works
- Touch targets adequate (44×44px min)
- Focus indicators visible

✅ **Performance Tests**
- Page loads in <3 seconds
- Time to Interactive <5 seconds
- No excessive console warnings

### Overall

- **Zero P0 bugs** in critical flows
- **<5 P1 bugs** in high priority flows
- **<10 P2 bugs** in medium priority flows
- All bugs documented with:
  - Severity classification
  - Steps to reproduce
  - Screenshots
  - Fix suggestions

---

## Next Steps

### Immediate (Ready to Test Now)

1. **Start dev server:** `npm run dev`
2. **Begin Phase 1 testing:** Guest Checkout Flow
3. **Document bugs as found**
4. **Generate improvement suggestions after bugs fixed**

### This Week

- Complete Phase 1 (Critical)
- Complete Phase 2 (High Priority)
- Fix all P0/P1 bugs found
- Re-test to verify fixes

### Next Week

- Complete Phase 3 (Medium)
- Complete Phase 4 (Admin)
- Generate improvement suggestions (10 per page)
- Set up CI/CD automation

---

## Bug Tracking Template

For each bug found, document:

```json
{
  "id": "BUG-001",
  "flow": "Guest Checkout",
  "page": "/checkout",
  "severity": "P0",
  "category": "functional",
  "title": "Checkout form submission fails on mobile",
  "description": "When submitting checkout form on mobile viewport (375x667), form validation errors appear even when all fields are filled correctly.",
  "steps": [
    "Navigate to /checkout on mobile viewport",
    "Fill all required fields",
    "Tap submit button",
    "Form shows validation errors for all fields"
  ],
  "expected": "Form submits and creates order",
  "actual": "Form shows validation errors",
  "screenshots": [
    "test-results/bugs/checkout-mobile-before.png",
    "test-results/bugs/checkout-mobile-error.png"
  ],
  "consoleErrors": [
    {
      "message": "Failed to execute 'submit' on 'HTMLFormElement'",
      "url": "/checkout",
      "line": 245
    }
  ],
  "viewports": ["mobile"],
  "themes": ["light", "dark"],
  "codeLocation": "src/domains/client/shop/checkout/ui/pages/CheckoutPage.tsx:245",
  "fixSuggestion": "Check form validation logic. Ensure event.preventDefault() is not blocking submission.",
  "status": "open",
  "reportedDate": "2026-01-12T10:30:00Z",
  "assignedTo": null,
  "fixedDate": null,
  "verifiedDate": null
}
```

---

## Testing Checklist Template

For each flow, use this checklist:

### Functional Tests
- [ ] All steps complete successfully
- [ ] Forms validate and submit
- [ ] Navigation works
- [ ] Data persists where needed
- [ ] Error handling works

### Visual Tests
- [ ] Mobile (375×667) renders correctly
- [ ] Tablet (768×1024) renders correctly
- [ ] Desktop (1920×1080) renders correctly
- [ ] Light theme works
- [ ] Dark theme works
- [ ] No broken images
- [ ] No layout issues

### Accessibility Tests
- [ ] WCAG AA contrast compliance
- [ ] Keyboard navigation works
- [ ] Touch targets ≥44×44px
- [ ] Focus indicators visible
- [ ] ARIA labels present

### Performance Tests
- [ ] Page load <3 seconds
- [ ] Console error-free
- [ ] No failed API requests
- [ ] No memory leaks

---

## Conclusion

This flow map provides a complete strategic overview of testing priorities. By following this action plan, you'll:

1. **Protect Revenue** - Test critical flows first
2. **Ensure Quality** - Comprehensive coverage of all flows
3. **Work Efficiently** - Clear prioritization and time estimates
4. **Track Progress** - Structured documentation and bug tracking

**Ready to start testing?** Begin with Phase 1: Critical Revenue Flows.

**Estimated total time for complete testing cycle:** 10 hours (over 5 days)
