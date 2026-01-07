# Issue 188 — Research Notes (Agent 1)

Owner: `AI`
Date started: `2026-01-07`

## 1) Current wheel implementation

- Component: `src/domains/client/marketing/ui/sections/shop/final-cta-section/SpinWheelLocal.tsx`
- Render location: `src/domains/client/marketing/ui/sections/shop/final-cta-section/FinalCtaSection.tsx`

### Current prizes + UX

- `defaultPrizes` is currently 8 slices, all labeled **“10% off”**.
- The wheel background is a `conic-gradient(...)` of slice colors.
- The wheel currently has **no text labels drawn on the wheel** (only the reveal result panel).
- Spin outcome is **deterministic**: `guaranteedAward` is always used and the user is granted `WELCOME_DISCOUNT_CODE = "LUMELLE10"`.

### Current “claim” / persistence behavior

- Signed-in users:
  - The app writes a row to Supabase: `welcome_wheel_claims` (per `user.id`), enforcing “1 per account”.
  - If claim exists already, the UI loads it and shows as already spun.
- Signed-out users:
  - The app lets them “preview spin” and stores a pending flag in `localStorage` (`PENDING_PREVIEW_KEY`), then auto-claims on first login.

### Current cart/checkout integration

- Clicking “Apply to cart” calls `useCart().applyDiscount(code)` which writes the discount code into cart state (and attempts to apply to the backend if supported by `commerce.cart.applyDiscount`).
- This is separate from Shopify “automatic discounts”. It’s a **discount code** flow.

## 2) Requested changes (client)

### A) Show percentage numbers on the wheel itself

- Desired: show labels like **5, 10, 15, 5, 10, 15** on the wheel slices.

### B) Popup after spin

- Desired popup copy: **“Congrats! You've won 20% off your next order.”**

⚠️ **Important mismatch to clarify**

- If the wheel labels are **5/10/15**, but the popup always says **20%**, then either:
  1) The wheel is purely cosmetic and the real award is always 20%, or
  2) The popup copy should be dynamic (match the landed slice), or
  3) The slice labels should include a 20% option.

We should confirm which is intended before shipping anything customer-facing (to avoid misleading discount messaging).

## 2) Three solution options

### Option 1 — SVG wheel labels + modal popup (recommended)

Implementation outline:

1) Update the prize model from `label: string` to `percent: number` + derived label.
2) Render a wheel label per slice using **SVG text** (or HTML labels positioned + rotated).
3) Show a modal/popup after the spin completes.

Where:

- Wheel labels:
  - Add an `<svg className="absolute inset-0">` overlay on top of the wheel.
  - For each slice, position a `<text>` at angle `(idx + 0.5) * slice` and radius ~ 35–42% of wheel.
  - Rotate text so it reads “upright-ish”.
- Popup:
  - Add a `showModal` boolean + `modalCopy` string.
  - Toggle it in the same place that sets `result` (currently after the spin timeout).

Pros:

- Smallest code change, works in React/Tailwind.
- Crisp text rendering (SVG).
- Easy to keep labels in sync with the `prizes` array.

Cons:

- Requires design tuning (angles/radius/font size).
- Need to confirm the “20%” mismatch decision (see above).

### Option 2 — Canvas wheel + labels + confetti

Implementation outline:

- Replace gradient div with a `<canvas>` and draw:
  - slices
  - labels (`5%`, `10%`, `15%`)
  - pointer, and optionally confetti burst on win

Pros:

- Full visual control, more “premium” wheel.
- Labels and graphics can look more like the client reference screenshots.

Cons:

- More code + more fragility (DPI scaling, font rendering, SSR edge cases).
- Harder to tweak quickly; needs more testing across browsers.

### Option 3 — Static wheel UI + deterministic award (no real randomness)

Implementation outline:

- Keep the wheel UI as animation only.
- Always land on a predetermined “winner slice”.
- Popup always displays the predetermined reward (e.g. “20%”).

Pros:

- Simplest business logic (no complicated prize logic).
- Consistent with the current “guaranteed award” architecture.

Cons:

- If labels show 5/10/15 but reward is 20, this is misleading unless explicitly framed as “unlock up to X%” (and the wheel is just for fun).
- If the client truly wants 5/10/15 outcomes, this doesn’t satisfy it.

## 3) Recommendation

- Suggested option: **Option 1 (SVG labels + popup)**.
- Why:
  - Minimal disruption to the existing (already shipped) wheel + Supabase claim logic.
  - We can implement it in a way that supports either:
    - **Dynamic popup** (copy matches `result.percent`), or
    - **Fixed popup** (always 20%) if the client confirms the wheel is purely cosmetic.

## 4) Concrete next steps (requires client decision)

1) Confirm reward mapping:
   - ✅ A) Wheel labels + popup both dynamic (`5/10/15`), OR
   - ✅ B) Cosmetic labels (`5/10/15`) but real reward always 20%, OR
   - ✅ C) Add 20% into the wheel labels.
2) Confirm discount mechanism:
   - Discount code(s) (e.g. `LUMELLE5`, `LUMELLE10`, `LUMELLE15`, `LUMELLE20`), or
   - Shopify automatic discount(s) (not code-based), or
   - A hybrid (code for new customer, automatic for bundles, etc.).
