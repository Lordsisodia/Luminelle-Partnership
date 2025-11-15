# Lumelle Visual Improvement Roadmap (Lowest Score Upward)
Source screenshots live in `analysis-images/section_01.png` → `section_14.png`. Start with lowest-rated sections for maximum impact.

## Section 07 – “In the Wild” Carousel (55/100)
- **Layout overhaul:** Constrain slide height (e.g., 240px) and enforce a 4:3 crop so cards stay uniform; show a 20px peek of the next slide to signal horizontal overflow.
- **Controls:** Add chevron buttons overlaid on left/right edges with 60% opacity backgrounds; supplement with 4px-tall progress dots directly beneath the carousel.
- **Captions:** Place a translucent caption bar on each slide containing creator name/handle + short quote to lean into the “community” narrative.
- **Spacing:** Move “Swipe through routines” label to sit inside the carousel gutter (top-left) and set it in the same pill style as other section tags for consistency.

## Section 08 – “A Closer Look” Slider (57/100)
- **Text legibility:** Apply a top-to-bottom gradient overlay (rgba(0,0,0,0.25) → transparent) so the white serif headline remains readable even on tiled backgrounds.
- **Feature badges:** Anchor the “Comfort fit” pill to the bottom-left corner with an 8px drop shadow; introduce contrasting badges for texture/material/fit slides using icons.
- **Pagination proximity:** Bring the dots to 12px below the card and enlarge to 10px; fill the active dot with brand brown (#4A2B1E) while keeping inactive dots outline-only.
- **Narrative tweak:** Update the lead paragraph to explain what each slide showcases (e.g., Slide 1 Comfort Fit, Slide 2 Moisture Guard, Slide 3 Luxe Lining) so swiping feels purposeful.

## Section 04 – Common Issues vs. Our Solution Cards (58/100)
- **Contrast correction:** Darken problem text to #B04040 and lighten the background to #FFE7E7 to meet AA contrast. Keep solution card mint (#E8FAF0) with darker green text (#2F8A5C).
- **Hierarchy:** Scale the solution card 4px larger with a soft glow to emphasize victories; optionally add a downward arrow linking problem items to their solution counterparts.
- **Typographic alignment:** Use CSS grid to align icons and text baselines; cap each bullet at ~36 characters before manual line breaks for stronger rhythm.
- **Connector sentence:** Add “Lumelle’s moisture-guard lining removes every issue listed above.” as a centered line between the cards for narrative clarity.

## Section 10 – Testimonials Slider (59/100)
- **Human presence:** Swap the initial-only avatar for creator selfies or patterned monograms with contrasting backgrounds (#F9DFC9 vs. #4A2B1E text).
- **Content depth:** Add tags under the name indicating hair type/use case (“Type 4 curls · Night routine”) so quotes feel specific.
- **Controls:** Introduce mini chevron buttons on either side of the card and relocate dots directly beneath it; keep the “See all reviews” link a full 24px below the dots.
- **Quote styling:** Use a pull-quote format with oversized quotation marks and highlight the benefit phrase (“No marks on my forehead”) in bold for emphasis.

## Section 03 – Issues Intro & Slider Controls (60/100)
- **Spacing reset:** Insert a 40px spacer or divider line above “Do you have these issues?” so it doesn’t feel connected to the previous carousel controls.
- **Label styling:** Convert the subheading into a pill matching other sections (soft pink background, uppercase label) to standardize the taxonomy.
- **Controls:** Replace the pill buttons with icon-only chevrons or adopt a swipe hint (animated arrow) positioned at the right edge of the card.
- **Pagination accuracy:** Update dot count to the actual slide total and align them centrally with equal spacing; consider numbering slides (“1/3”) for clarity.

## Section 09 – Choose Your Pack Carousel (63/100)
- **Variant visibility:** Display two cards at once (primary + 40% of the next) and add arrow controls; label each slide (“Single”, “Duo”, “Creator Bundle”).
- **Pricing clarity:** Show currency code (“£24 GBP”) and add a tooltip or secondary pricing for USD if analytics show US traffic.
- **CTA standardization:** Switch button text to “Buy Now” (Title Case) with consistent color (#4A2B1E) and width; secondary CTA could be “See details”.
- **Imagery:** Increase product thumbnail size 20% and add a close-up inset of the fabric to reinforce texture.

## Section 01 – Announcement Bar + Hero (64/100)
- **Announcement bar:** Swap the broken marquee for a segmented ticker (Shipping · Easy Returns · 30-Day Guarantee) and ensure full-width loop.
- **Copy differentiation:** Keep marquee focused on operational reassurance while the hero headline sells transformation (“Creator-grade shower cap that keeps curls camera-ready”).
- **CTA hierarchy:** Primary button in dark brown, secondary as outlined; add a tertiary “Watch demo” text link below for creators wanting proof.
- **Hero imagery:** Shift crop upward to reveal more of the cap pattern; optionally overlay a fabric detail inset for clarity.

## Section 13 – Last-Call CTA (61/100)
- **Visual pop:** Introduce a deeper gradient (#F5B6A1 → #F7DFD9) or textured background to differentiate from previous cards.
- **New hook:** Add an icon + copy like “Limited restock: 250 caps left” or mention the 10% email offer to justify another CTA.
- **CTA variation:** Change button label to “Claim Your Cap” and add a subtle countdown icon to reinforce urgency.

## Section 11 – Guarantee & Comparison (62/100)
- **Guarantee layout:** Increase line-height and place check icons to the left; consider a three-column mini-grid (Benefit · Icon · Description) for easier scanning.
- **Comparison emphasis:** Highlight the Lumelle column with a blush fill, use thin dividers between rows, and add a concluding “Result” row summarizing the advantage.

## Section 14 – Email Capture & Footer CTA (65/100)
- **Form labels:** Add a floating label or static label above the field; support with a lock icon + “Secure signup” text.
- **Footer spacing:** Insert 16–20px gap between legal links and the Buy Now button to reduce accidental taps; optionally move the CTA above the link list.

## Section 05 – Three-Step Process (66/100)
- **Streamlined text:** Remove duplicate step titles and instead add small benefit descriptors (“Protect · Shields from humidity”).
- **Flow indicator:** Connect cards with a vertical line or numbering on the left to reinforce progression.

## Section 12 – FAQ (67/100)
- **Default expansion:** Keep the first accordion open; include tiny icons representing each topic (raindrop for waterproof, comb for fit).
- **Support link:** Add a WhatsApp button directly under the intro copy for immediate help.

## Section 06 – Community Stats (68/100)
- **Consistency:** Reformat metrics with consistent casing and add subtle cards with drop shadows; ensure both CTAs use either filled or outline style but share width.

## Section 02 – Trust Badges & Benefits (71/100)
- **Pill alignment:** Use equal-width flex pills and add small icons (lock, clock, star) for quick cognition.
- **Benefit card padding:** Add interior padding around images to avoid edge collisions.
