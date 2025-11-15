# Visual Improvements – Phase 2 Detailing
Follow-on actions from the roadmap. Each section references `analysis-images/section_XX.png` and builds toward concrete, implementation-ready tweaks.

## Section 07 – Carousel Micro-spec
- **Card grid:** 312px width, 232px height; all photos cropped to 4:3 with 16px internal padding.
- **Caption overlay:** 70% black gradient from bottom 40% + white text (creator handle in DemiBold 14px, quote in Regular 12px). Include a cocoa-colored underline as swipe affordance.
- **Controls:** Positioned vertically centered; 36px circular buttons (#FBE5DE background, #4A2B1E icon) with 50% opacity default, 100% on hover/tap.
- **Indicators:** Replace dots with mini progress bar spanning 40px width and 3px height to stay in family with other sliders but less repetitive.

## Section 08 – Slider Typography & Badging
- **Headline block:** Move text into a dedicated overlay container anchored top-left with 16px padding, background rgba(255,255,255,0.74). Serif headline 28px, sans subtitle 14px.
- **Badge system:** Use white pill with subtle drop shadow and include emoji/icon representing attribute (e.g., 🌀 for comfort, 💧 for moisture).
- **Motion cue:** Add auto-advancing slide indicator (3px line expanding left→right beneath dots) to show there is more than one view.

## Section 04 – Card Interaction Polish
- **Hover/tap effect:** On mobile, tap reveals a short expansion describing how the solution addresses each issue. Consider accordion-like paired rows.
- **Iconography:** Replace plain dots with custom icons (humidity droplet, elastic band, trash bin) to make each problem instantly recognizable.

## Section 10 – Testimonial Depth
- **Stacked layout:** Add a 12px-high stat bar above the card showing “4.9 average · 1,240 reviews” to connect social proof metrics to quotes.
- **Avatar treatment:** Use circular frames containing pastel gradients unique per reviewer so the section feels lively even without actual photos.
- **Auto height:** Expand quote text area to allow 2–3 sentences; maintain 8px padding adjustments so the card doesn’t grow too tall.

## Section 03 – Slider Reset
- **Heading pill:** 80px wide, uppercase label, letter-spacing 2px, background #FBD6D3. Place 20px above main heading.
- **Controls:** Introduce drag-handle icon inside the card’s right edge (three horizontal dots) to signal swipe; fallback arrow buttons for desktop.

## Section 09 – Pack Carousel Enhancements
- **Variant chips:** Add small tabs at the top (“Single”, “Duo”, “Creator”) so shoppers can switch without swiping if they prefer tapping.
- **Bundle upsell:** For the duo slide, display per-unit price (“£22 each when you buy two”) under the main price to highlight savings.

## Section 01 – Hero Refresh
- **Fab-detail inset:** Add a 96px circular inset in the lower-right corner showing a macro shot of the cap’s satin weave with a label “Luxe satin lining”.
- **Reassurance bar:** Place three icons (truck, arrow-loop, lock) beneath CTAs with small copy to keep the hero text area uncluttered.

## Section 13 – Last-call Variation
- **Background motif:** Apply a faint checker pattern referencing the cap design at 10% opacity. Add a thin golden border to elevate the block.
- **Dual CTA:** Primary “Claim Your Cap”; secondary text link “Chat with a stylist” for users not ready to purchase but near conversion.

## Section 11 – Comparison Remodeling
- **Icon column:** Introduce icons per row (fabric, fit, durability, care) to aid scanning.
- **Outcome row:** Add bottom row summarizing “Keeps styles flawless” vs. “Causes frizz + dents” with larger type.

## Section 14 – Footer Interaction
- **Newsletter incentive:** Mention the 10% offer plus “exclusive creator tutorials” for added value.
- **Sticky CTA alternative:** Instead of repeating “Buy Now” in the footer, consider a sticky bottom bar triggered after scrolling 50%.

## Section 05 – Process Visual Aid
- **Illustrations:** Add minimalist line icons (shield, water droplet, refresh arrows) per step for quicker comprehension.
- **Helper text:** Include estimated time (“<5 sec”, “10 sec rinse”, “Daily”) to set expectations.

## Section 12 – FAQ Support
- **Search field:** Add a compact FAQ search input so users can type keywords like “braids” or “travel”.
- **Accordion animation:** Use 250ms ease-out height transitions to feel smooth and premium.

## Section 06 – Stats Styling
- **Card grouping:** Wrap three metrics in a single rounded container with 12px dividers; overlay a badge “Loved by creators” on top corner.
- **Button alignment:** Stretch both CTAs full width stacked on mobile, with uniform padding and icon indicators (play icon for routines, star icon for reviews).

## Section 02 – Trust Badge Icons
- **Custom glyph set:** Use monochrome line icons designed in-house (security lock, stopwatch, badge) to maintain brand ownership vs. default icons.
- **Microcopy addition:** Add supporting lines (“Ships from UK” under 48 hrs) for clarity.
