# Landing Page UI Review — 14 Nov 2025

Annotated issues below reference the supplied mobile screenshot (`screencapture-localhost-5173-2025-11-14-09_10_21.png`). Each section lists concrete UI concerns plus suggested fixes. Client feedback items that remain open are noted separately.

## 1. Hero & Navigation (frames 0–1)

- **Washed-out background:** The hero photo is desaturated and clashes with the peach/blush palette, especially once the translucent overlay is applied. Brand guidance insists on light, airy hues drawn from #FBC7B2 / #FDD4DC with high-quality product or creator imagery. Replace the background with one of the planned lifestyle shots and keep enough negative space for copy. `(docs/02-BRANDING-DESIGN-SPECS.md:10-32)`
- **CTA hierarchy drift:** Primary and secondary buttons are nearly identical in weight and sit too far from the headline, so the call-to-action loses urgency. Increase size, differentiate fills (solid peach vs outlined cream), and pull the stack closer to the copy block.
- **Slider controls lack affordance:** Tiny pagination dots plus a “NEXT” text link do not clearly signal the 3-card carousel. Add arrow buttons or chunkier pills so users understand there’s more than one slide, especially given the request for a hero background slideshow. `(feedback/2025-10-31-client-feedback.md:5-35)`
- **Trust badges cramped:** The shipping/returns icons under the hero sit flush against the edge and read like body text. Increase spacing and add iconography or subtle dividers so they feel like reassurance chips instead of footnotes.
- **Header lacks action:** Mobile nav shows a hamburger but no “Join WhatsApp” or “Shop now” button, missing the immediate CTA the content structure calls for. Consider a sticky CTA or badge icon next to the wordmark per hero requirements. `(docs/04-CONTENT-STRUCTURE.md:5-18)`
- **Eyebrow pill tracking:** “BEST SELLER” spans nearly the full width because of extreme letter-spacing, making the headline feel detached. Reduce tracking to match brand typography guidance and align the pill to the same left edge as the headline for cleaner hierarchy. `(docs/02-BRANDING-DESIGN-SPECS.md:33-52)`

## 2. Highlight & Feature Cards (frames 1, 3)

- **Redundant card styling:** The same pill-shaped card appears repeatedly for “Highlights,” “Benefits,” and “Features,” making the vertical stack feel monotonous. Introduce hierarchy (e.g., alternating background bands, image-backed cards, or icon rows) to break the pattern fatigue.
- **Icon inconsistencies:** Some cards use outlined checkmarks while others use filled glyphs; stroke weights vary and the icons float relative to text. Standardize an icon set and align them on a vertical grid.
- **Copy density:** Supporting text is set in long paragraphs even when the message could be condensed to punchier bullets. Trim each card to one headline + one line to keep scannability high per the user-journey guidance. `(docs/05-USER-JOURNEY-FLOW.md:65-120)`
- **Shadow treatment:** The heavy drop shadow on every card makes the page look dated and adds visual noise. Tone down the blur/spread or switch to a subtle border so the cards feel premium instead of skeuomorphic.

## 3. Benefits Carousel (frame 1)

- **Single-card view feels static:** The “Why you’ll love it” slider shows one card at a time while the pagination rail indicates multiple slides, yet no arrows or auto-play hint encourages swiping. Either show two cards on wider screens or add motion/controls so the user realizes it’s interactive.
- **Image crop mismatch:** The crop isolates a single figure without contextual elements (e.g., product texture), so the card reads as generic stock. Use tighter shots of the cap material or creator routines to reinforce the copy.
- **Indicator misalignment:** Pagination pills sit directly beneath the image rather than the card container, creating awkward negative space. Align the indicator with card edges or integrate it into the card footer.

## 4. Social Proof Band (frame 2)

- **Statistic lacks credibility cues:** “4.9 (1,240)” appears alone in a rounded box with no logos, profile photos, or testimonial excerpts. Pair the rating with recognizable platform icons (TikTok Shop, Trustpilot) or avatar clusters so the metric feels verifiable.
- **Button emphasis:** “See all reviews” looks like a ghost link and gets lost. Style it as a secondary button or add chevron iconography.
- **Section bleed:** The gradient background transitions too subtly, so this block melts into the next “Swap problems” section. Add a stronger divider or modify the gradient stop so users can tell the section changed.

## 5. Problem/Solution + Feature Stack (frames 2–4)

- **Low contrast cards:** The white-on-pale-peach cards blur into the background, especially for visitors with low brightness. Add drop shadows or slightly darker borders to separate them from the section background.
- **Icon legend placement:** The “Common issues / Our solution” legend sits atop the card but doesn’t align with the content beneath it, so users must scan up and down to understand which column they’re reading. Consider moving the legend into the card header or using background fills to differentiate the columns.
- **Overlapping content:** Problems, solutions, and features all repeat similar bullet points. Consolidate to avoid fatigue and keep the scroll shorter.
- **Column balance:** The Problems column has bullet icons, while the Solution column mixes icons with plain text, making alignment feel off. Use consistent bullet styling or add vertical dividers to clarify the two-column grid.

## 6. How It Works (frame 4)

- **Cards feel empty:** Each step card dedicates most of its height to blank space. Reduce padding, introduce subtle illustrations, or place the numbers within circular badges to add visual interest.
- **Typography imbalance:** The numbers are pale peach with low contrast, while the step titles are dark and bold. Either darken the numerals or integrate them into a timeline layout to maintain balance.

## 7. Testimonials & UGC (frame 5)

- **Quote card lacks depth:** Only one quote is shown without creator avatar/context. Add faces, handles, or platform badges so the quote feels authentic.
- **UGC slider rails:** The grey bar beneath the “Real routines” gallery resembles a disabled progress bar. Replace with pagination dots or arrow buttons consistent with other carousels.
- **Spacing mismatch:** “What customers are saying” and “Real routines” stack without breathing room, causing heading fatigue. Introduce more vertical spacing or a different background tone between social proof blocks so they don’t blur together.

## 8. Pricing Grid (frame 6)

- **Buttons merge into cards:** Because the button fill matches the card gradient, “Buy now” looks like part of the background. Increase contrast (e.g., cocoa text on solid peach button with drop shadow) to reinforce clickability.
- **Badge placement:** Labels like “SAVE 10%” and “POPULAR” float close to the product image, making the hierarchy messy. Move badges above the card title or into a consistent corner badge component.
- **Card alignment:** Product images sit too close to the top edge while body copy floats, making the cards feel unbalanced. Add equal padding above and below content and consider aligning price + CTA on a consistent baseline.

## 9. PDP Teaser & FAQ (frame 7)

- **CTA blending:** “View details” uses a muted peach that disappears against the card. Give it the same treatment as the primary CTA or outline it in cocoa.
- **Accordion affordance:** FAQ rows use very light borders and no icons, so they appear static. Add chevrons and stronger separators per client expectation for clearer readability. `(feedback/2025-10-31-client-feedback.md:29-36)`
- **Content mismatch:** FAQ questions focus on basic product logistics rather than creator/affiliate concerns (commission, ad spend, brand story) noted by the client. Update entries to match the requested topics.

## 10. Footer & Email Capture (frame 8)

- **Input lacks label:** The newsletter field uses placeholder text as the only label, which disappears once typing starts. Add a floating label or helper text above the field for accessibility.
- **Isolated “Buy Now” button:** A lone CTA at the end without surrounding context feels disconnected. Either repeat key benefits nearby or convert this footer CTA into the WhatsApp prompt that the affiliate brief stresses. `(docs/04-CONTENT-STRUCTURE.md:5-18)`
- **Footer nav hierarchy:** Footer links use the same weight/size as the paragraph above, so the scannable routes (Terms, Privacy, Content Brief) get buried. Increase letter spacing or add separators to make the legal links obvious.

## 11. Alignment with Affiliate-Page Feedback

- **Hero carousel assets still placeholders:** Client explicitly asked for 4–5 approved creator shots in the blurred hero background; the current ecommerce hero reuses generic imagery and lacks the blurred slideshow effect. `(feedback/2025-10-31-client-feedback.md:5-35)`
- **Metrics/perks imagery missing:** The hero metric cards should rotate through perks like spa days and £1,000 cash boosts; present implementation shows static text-only cards without supporting visuals.
- **Onboarding steps copy still literal:** “Protect / Rinse / Repeat” echoes product usage rather than the aspirational “Trial / Learn / Launch” narrative requested for affiliates. Update copy to highlight bonuses and scripts to stay on-brief. `(feedback/2025-10-31-client-feedback.md:25-33)`
- **Testimonials without avatars:** Client wanted profile photos and consistent stat typography in creator testimonials; the current quote block is anonymous and minimal. `(feedback/2025-10-31-client-feedback.md:29-31)`
- **FAQ wording:** Still references generic product concerns instead of the tailored questions about commission, brand story, and content briefs. `(feedback/2025-10-31-client-feedback.md:34-36)`

## 12. Global Layout & Spacing

- **Sections blur together:** Nearly every block uses the same pale blush background, so users lose sense of progression down the page. Introduce stronger contrast or divider motifs (e.g., subtle pattern overlays referenced in the plan) to signal transitions. `(app-plan/lumelle-app-plan.md:44-135)`
- **Uneven padding:** Some sections (hero, testimonials) have generous vertical padding, while others (UGC strip, pricing grid) feel cramped. Standardize padding tokens so the scroll rhythm feels intentional.
- **Card radius overload:** Every element—including headings and CTAs—sits inside rounded rectangles, which dulls the premium feel. Mix in clean edges or line-only components to modernize the layout.

## 13. Typography & Copy Tone

- **Heading weight inconsistencies:** Certain H2s (“Small details, big results”) are bold serif, others are lighter yet same size, causing hierarchy confusion. Reference the “The Seasons + Inter” pairing guidelines to keep heading levels consistent. `(docs/02-BRANDING-DESIGN-SPECS.md:33-52)`
- **Overuse of uppercase pills:** Section labels such as “FEATURES,” “BENEFITS,” “IN THE WILD” appear everywhere, diluting their usefulness. Reserve the pill style for key anchors and rely on typography for the rest.
- **Literal microcopy:** Steps/FAQ/CTA text focuses on product usage instead of the creator outcomes (income, bonuses, community) emphasized by the client. Rewrite to echo the affiliate storytelling. `(docs/05-USER-JOURNEY-FLOW.md:67-120)`

## 14. Imagery & Asset Usage

- **Asset mismatch:** Provided inventory lists specific hero, product macro, community moments, and creator avatars that haven’t been surfaced. Replace placeholder crops with these approved assets so the page reflects the actual Lumelle team. `(docs/07-ASSETS-INVENTORY.md:150-197)`
- **Inconsistent lighting:** Some photos are cool-toned (bathroom shot), others warm (UGC), creating jarring jumps. Apply consistent color grading aligned to the peach palette.
- **Missing overlays:** Photos within cards lack subtle gradient overlays, so black text occasionally fights the background (e.g., “Real routines” slider). Add translucent peach/cocoa overlays where needed for readability.

## 15. Microinteractions & States

- **No feedback on tap:** Buttons and carousels don’t show hover/active states in the design, which will make the final build feel flat. Document hover/tap states (scale, shadow, color) for key CTAs as part of the UI polish pass.
- **Auto-play absence:** Client called for a “slow/blurred image carousel” in the hero; the current slider appears manual-only. Implement auto-play with accessible pause controls so the motion supports storytelling. `(feedback/2025-10-31-client-feedback.md:5-25)`
- **Icon animations:** Perk/feature icons are static; subtle micro-animations (pulse, glow) would add modernity without overwhelming the luxury tone.

## 16. Accessibility Considerations

- **Color contrast risks:** Peach text on white cards (e.g., numeral “01”) fails WCAG AA when tested; darken or outline these elements. `(docs/02-BRANDING-DESIGN-SPECS.md:70-92)`
- **Tap target sizing:** Pills like “Buy 2, save 10%” and small pagination dots may fall below 44px targets on mobile. Increase hit areas or wrap controls in larger invisible buttons per mobile-first requirements. `(app-plan/frontend-plan.md:88-105)`
- **Lack of descriptive labels:** Icon-only trust badges and carousel dots need accessible labels/aria text defined in the spec so implementation doesn’t guess.

## 17. CTA Chips & Offer Messaging

- **Offer chip parity:** “Buy 2, save 10%” sits beside the primary CTA with the same color and size, so it competes rather than supporting the main action. Reduce its prominence (pill chip above button or badge within copy) so the hero keeps a single clear decision. `(app-plan/frontend-plan.md:45-63)`
- **CTA copy mismatch:** Buttons read “Shop Now” / “Buy now” while the project brief emphasizes “Join WhatsApp” for affiliates. Align CTA text to the conversion goal described in the content structure. `(docs/04-CONTENT-STRUCTURE.md:5-18)`
- **Section CTAs inconsistent:** Some buttons use title case (“View details”), others sentence case (“Buy now”). Standardize casing, padding, and icon usage so the system feels cohesive.

## 18. Content Sequencing & Narrative

- **Product-first storyline:** The entire scroll feels like a DTC PDP rather than an affiliate recruitment funnel. Missing sections such as “Creator Success Stories,” “WhatsApp CTA,” and “Incentives & Rewards” from the content map makes the experience misaligned with stakeholder expectations. `(docs/04-CONTENT-STRUCTURE.md:21-120)`
- **Missing brand story slider:** The plan calls for a 3-slide brand vision/product/affiliate success carousel near the top; the current layout jumps straight into product benefits. Reintroduce the slider to communicate mission and community. `(docs/04-CONTENT-STRUCTURE.md:21-44)`
- **No leaderboard or rewards tiers:** Client feedback specified perks, tiers, and weekly prizes; none of that appears in this landing page, so affiliates can’t see the incentive structure. `(feedback/2025-10-31-client-feedback.md:32-34)`

## 19. Media Formatting & Technical Notes

- **Image aspect ratios:** Several cards display 4:5 imagery inside wide containers, leading to unused whitespace and inconsistent masks. Crop or mask assets consistently (rounded corners, same aspect) to avoid visual jitter.
- **Compression artifacts:** Hero and card images look slightly blurry, likely due to upscaling. Export optimized WebP/AVIF in the correct resolution to prevent softness that undercuts the premium feel. `(docs/07-ASSETS-INVENTORY.md:130-197)`
- **Missing loading strategy:** No indication of lazy-loading or skeleton states for the multiple carousels and grids. Document skeleton styles so the implementation doesn’t show harsh content pops. `(app-plan/frontend-plan.md:88-110)`

## 20. Validation & Handoff Details

- **Token usage undocumented:** Review doesn’t mention which Tailwind tokens or custom CSS variables apply to the new sections. Capture those in notes (e.g., `bg-brand-blush`, `shadow-soft`) to keep dev handoff clear. `(style_and_conventions memory)`
- **State specs absent:** There’s no documentation for focus outlines, disabled button states, or error states (newsletter input). Add these specs to prevent accessibility regressions during build QA.
- **Analytics cues missing:** Since the hero and other CTAs feed key conversion goals, annotate which events/pixels should fire when each button is pressed to align with the analytics plan. `(app-plan/frontend-plan.md:110-140)`

---

Addressing the above will bring the landing experience closer to the luxury, high-trust feel defined in the brand specs and keep us aligned with outstanding client feedback before handing off new assets.
