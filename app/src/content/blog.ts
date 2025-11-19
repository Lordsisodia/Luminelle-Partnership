export type BlogPost = {
  slug: string
  title: string
  subtitle: string
  tag: string
  author: string
  authorAvatar?: string
  date: string
  readTime: string
  cover: string
  teaser: string
  body: string
  sections?: { heading: string; paragraphs: string[] }[]
  featured?: boolean
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'silk-press-shower-cap-guide',
    title: 'The ultimate shower-cap guide for silk presses',
    subtitle: 'Stop steam, keep shine, and protect edges every shower.',
    tag: 'Frizz-free',
    author: 'Lumelle Studio',
    date: '2025-11-10',
    readTime: '6 min',
    cover: '/uploads/luminele/product-feature-02.jpg',
    teaser: 'A step-by-step routine to keep silk presses flawless with steam-proof protection.',
    body:
      'Steam is the silent killer of silk presses. Start before you shower: smooth a pea-sized amount of light serum over your lengths, then tuck ends loosely into a low pony or claw clip. Slip on your cap, making sure the comfort band sits just beyond your hairline to seal out humidity without creasing edges.\n\nIn the shower, keep spray angles forward and away from the crown; if you love hot water, finish with one minute of cooler temp to drop ambient humidity fast. After you step out, blot the cap exterior, peel it off front to back, and let your hair cool fully before touching. If you need a refresh, a light pass with a cool blow-dryer will reset shape without heat damage.\n\nClean the cap weekly: rinse, gentle soap, air dry. A dry cap seals better and lasts longer, keeping that mirror-finish shine intact for days.',
    sections: [
      {
        heading: 'Before you shower',
        paragraphs: [
          'Smooth a pea-sized serum through your lengths, then tuck ends loosely so the comfort band can sit just beyond your hairline. That placement seals humidity without creasing edges.',
        ],
      },
      {
        heading: 'In the shower',
        paragraphs: [
          'Angle spray forward and away from the crown. If you love hot water, finish with 60 seconds of cooler temp to drop humidity fast.',
          'Peel the cap off front-to-back and let hair cool before touching. A quick cool-shot blast resets shape without extra heat.',
        ],
      },
      {
        heading: 'Aftercare',
        paragraphs: [
          'Rinse the cap, hand wash weekly with gentle soap, and air dry. A dry liner seals better and lasts longer, keeping that mirror-finish shine intact.',
        ],
      },
    ],
    featured: true,
  },
  {
    slug: 'protective-styles-in-the-shower',
    title: 'Protective styles in the shower: braids, twists, locs—without frizz',
    subtitle: 'Keep humidity out while keeping comfort in.',
    tag: 'Protective styles',
    author: 'Lumelle Studio',
    date: '2025-11-08',
    readTime: '7 min',
    cover: '/uploads/luminele/product-feature-06.jpg',
    teaser: 'Why your protective styles need a better seal and how to get it right every time.',
    body:
      'Protective styles aren’t “set it and forget it” when steam creeps in. Before you shower, mist lengths with a light leave-in to keep fibers supple, then coil long braids upward so the cap band can grip at the scalp. The waterproof liner should sit below baby hairs; if you have a low hairline, angle the band to cover sideburns for a full seal.\n\nKeep showers short and point the spray backward to avoid direct hits to the nape. After showering, pat the cap dry, remove front-to-back, and let roots cool. If you feel dampness around edges, hit it with a cool shot from a dryer for 30 seconds.\n\nWeekly care: cleanse the cap interior with mild soap, air dry fully, and swap to a spare while it dries. This prevents trapped moisture that can cause odor or frizz at braid bases.',
    featured: true,
    sections: [
      {
        heading: 'Prep your protective style',
        paragraphs: [
          'Mist lengths with a light leave-in, coil long braids upward, and seat the liner below baby hairs. Tilt the band to cover sideburns for a full seal.',
        ],
      },
      {
        heading: 'During the shower',
        paragraphs: [
          'Keep showers short; point spray backward to avoid the nape. Pat the cap dry, remove front-to-back, and let roots cool before touching.',
        ],
      },
      {
        heading: 'Weekly care',
        paragraphs: [
          'Hand wash the liner with mild soap, air dry fully, and rotate with a spare to prevent trapped moisture and odor at braid bases.',
        ],
      },
    ],
  },
  {
    slug: 'gym-sauna-spa',
    title: 'Gym, sauna, spa: how to keep hair dry everywhere',
    subtitle: 'A creator-tested checklist for wet environments.',
    tag: 'Lifestyle',
    author: 'Lumelle Studio',
    date: '2025-11-05',
    readTime: '5 min',
    cover: '/uploads/luminele/product-feature-04.jpg',
    teaser: 'The gear and habits that protect your style beyond the shower.',
    body:
      'Sweat plus steam = frizz. Pre-gym, smooth edges with a lightweight balm and clip lengths up; pop on your shower cap in the steam room—the TPU core blocks moisture better than a towel wrap. Keep a microfiber towel handy to blot sweat before it dries salty.\n\nAt the spa, limit cap time to heat sessions, then air out your hair in a cool lounge to drop humidity before removing. Traveling? Pack a mini kit: cap, microfiber towel, edge brush, satin scrunchie, and a travel-size refresher spray.\n\nAfter any hot session, cool-rinse your cap, air dry it flat, and give roots a cool blow-dry burst to reset volume without heat damage. This routine keeps styles camera-ready from treadmill to sauna.',
    sections: [
      {
        heading: 'Gym & sauna routine',
        paragraphs: [
          'Smooth edges with a lightweight balm, clip lengths up, and wear the cap in the steam room—the TPU core beats a towel wrap.',
          'Blot sweat with a microfiber towel before it dries salty.',
        ],
      },
      {
        heading: 'Spa & travel kit',
        paragraphs: [
          'Limit cap time to heat sessions, then air out hair in a cool lounge. Pack: cap, microfiber towel, edge brush, satin scrunchie, refresher spray.',
        ],
      },
      {
        heading: 'Post-heat reset',
        paragraphs: [
          'Rinse the cap, air dry flat, and cool-blow roots to reset volume without heat damage.',
        ],
      },
    ],
  },
  {
    slug: 'why-satin-matters',
    title: 'Why satin matters: the science of friction, frizz, and liners',
    subtitle: 'Materials matter more than you think.',
    tag: 'Science',
    author: 'Lumelle Studio',
    date: '2025-11-03',
    readTime: '6 min',
    cover: '/uploads/luminele/product-feature-05.jpg',
    teaser: 'A quick look at why satin + waterproof cores beat plastic caps.',
    body:
      'Friction lifts cuticles, and lifted cuticles equal frizz. Satin’s smooth surface reduces fiber-on-fiber drag, while a TPU core blocks humidity—the winning duo plastic caps miss. Cheap plastic traps heat and leaves condensation; satin+TPU protects while letting your scalp breathe.\n\nLook for: dual-layer build (satin outside, waterproof inside), a comfort band that won’t dent edges, and seamless linings that don’t snag coils. Avoid vinyl caps that crinkle and overheat.\n\nCare is part of the science: rinse after use, hand wash weekly, and air dry fully. A dry liner maintains its barrier so your style stays sleek longer.',
    sections: [
      {
        heading: 'Why materials matter',
        paragraphs: [
          'Satin reduces friction; TPU blocks humidity. Plastic traps heat and condensation, leading to frizz.',
        ],
      },
      {
        heading: 'What to choose',
        paragraphs: [
          'Dual-layer build, comfort band, seamless lining. Skip vinyl caps that crinkle and overheat.',
        ],
      },
      {
        heading: 'Care to keep performance',
        paragraphs: [
          'Rinse after use, hand wash weekly, air dry fully. A dry liner keeps its barrier and your style intact.',
        ],
      },
    ],
  },
  {
    slug: 'creator-tiktok-scripts',
    title: '5 TikTok scripts to show off your hair care routine',
    subtitle: 'Creator-ready hooks and CTAs you can swipe.',
    tag: 'Creator tips',
    author: 'Lumelle Studio',
    date: '2025-11-01',
    readTime: '4 min',
    cover: '/uploads/luminele/product-feature-07.jpg',
    teaser: 'Steal these scripts to film hair-protection content that sells.',
    body:
      'Hook 1: “My silk press vs. steam—watch this.” Cut to you putting on the cap, steam rolling, hair reveal. CTA: “Link in bio for the cap.”\n\nHook 2: “Edges laid after a 10-minute shower? Here’s how.” Show band placement, quick shower clip, edge reveal. CTA: “Save this for wash day.”\n\nHook 3: “Braids + sauna? I tested it.” Steam room clip, cap close-up, dry braids reveal. CTA: “DM me ‘sauna’ for the link.”\n\nHook 4: “Travel kit for frizz-free trips.” Show a flat-lay (cap, microfiber towel, mini serum). CTA: “Comment TRAVEL for the checklist.”\n\nHook 5: “Disposable caps vs. one luxe cap.” Side-by-side: fogged plastic vs. satin/TPU. CTA: “Which team are you?”',
    sections: [
      {
        heading: '5 creator-ready hooks',
        paragraphs: [
          '1) “My silk press vs. steam—watch this.” Cap on, steam, reveal. CTA: link in bio.',
          '2) “Edges laid after a 10-minute shower?” Band placement + reveal. CTA: save for wash day.',
          '3) “Braids + sauna? I tested it.” Steam clip, dry braids reveal. CTA: DM “sauna”.',
          '4) “Travel kit for frizz-free trips.” Flat-lay; CTA: comment TRAVEL.',
          '5) “Disposable vs luxe.” Fogged plastic vs satin/TPU. CTA: Which team are you?',
        ],
      },
    ],
  },
  {
    slug: 'travel-ready-hair-kit',
    title: 'Travel-ready hair kit: pack light, stay frizz-free',
    subtitle: 'A compact packing list for weekends and long hauls.',
    tag: 'Travel',
    author: 'Lumelle Studio',
    date: '2025-10-29',
    readTime: '5 min',
    cover: '/uploads/luminele/product-feature-03.jpg',
    teaser: 'Exactly what to bring so hotel steam and plane air don’t wreck your style.',
    body:
      'Carry-on checklist: luxury shower cap, microfiber towel, silk scrunchie, edge brush, mini refresher spray, light serum. Pack the cap in its own pouch to keep the liner clean.\n\nHotel routine: run the vent, drop shower temp one notch, cap on before the water heats. After showering, air the bathroom (prop the door) and let hair cool before removing the cap. Plane routine: moisturize ends lightly and keep hair up and loose to avoid kinks.\n\nClean the cap nightly if the hotel has high humidity; rinse, towel-blot, air dry by a vent. You’ll land with your style intact and no extra bulk in your bag.',
    sections: [
      {
        heading: 'Carry-on checklist',
        paragraphs: [
          'Cap, microfiber towel, silk scrunchie, edge brush, refresher spray, light serum—packed in its own pouch to keep the liner clean.',
        ],
      },
      {
        heading: 'Hotel routine',
        paragraphs: [
          'Run the vent, lower temp, cap on before steam rises. Air the bathroom after, and let hair cool before removing.',
        ],
      },
      {
        heading: 'Plane routine & nightly care',
        paragraphs: [
          'Moisturize ends lightly, keep hair loose to avoid kinks, rinse and air dry the cap nightly in humid hotels.',
        ],
      },
    ],
  },
  {
    slug: 'wash-day-mistakes',
    title: 'Wash-day mistakes that cause frizz (and quick fixes)',
    subtitle: 'Simple corrections that keep styles intact longer.',
    tag: 'How-to',
    author: 'Lumelle Studio',
    date: '2025-10-27',
    readTime: '5 min',
    cover: '/uploads/luminele/product-feature-01.jpg',
    teaser: 'Avoid these common traps to protect curls and blowouts.',
    body:
      'Mistake 1: Hot water blasting the crown—angle the spray down your back and cap the moment steam rises. Mistake 2: Tight elastics that leave dents—swap for a comfort band cap. Mistake 3: Leaving hair damp under the cap—always cool the room and let roots dry before styling.\n\nQuick fixes: finish showers cool, pat cap dry, and release hair only after temperature drops. For curls, scrunch a lightweight refresher mist post-shower only if needed. For blowouts, use a cool shot to reset volume.\n\nWeekly reset: clarify scalp, deep-condition lengths, and wash the cap liner so residue doesn’t transfer back to your hair.',
    sections: [
      {
        heading: 'Common mistakes',
        paragraphs: [
          'Hot water blasting the crown, tight elastics that dent edges, leaving hair damp under the cap—these trigger frizz fast.',
        ],
      },
      {
        heading: 'Quick fixes',
        paragraphs: [
          'Finish showers cool, pat the cap dry, release hair after the room cools. For blowouts, use a cool shot; for curls, only mist if needed.',
        ],
      },
      {
        heading: 'Weekly reset',
        paragraphs: [
          'Clarify scalp, deep-condition, and wash the cap liner weekly so residue doesn’t transfer back to your hair.',
        ],
      },
    ],
  },
  {
    slug: 'refresh-and-clean-cap',
    title: 'How to clean and refresh a luxury shower cap',
    subtitle: 'Care steps to extend lifespan past 100 uses.',
    tag: 'Care',
    author: 'Lumelle Studio',
    date: '2025-10-25',
    readTime: '4 min',
    cover: '/uploads/luminele/product-feature-05.jpg',
    teaser: 'Quick maintenance that keeps your cap fresh and leak-proof.',
    body:
      'After each use: rinse the interior with cool water, shake off excess, air dry. Weekly: hand wash with mild soap, focusing on the band (it traps oils). Blot with a towel, reshape, and air dry fully.\n\nDeodorize: sprinkle a pinch of baking soda inside, let sit 10 minutes, rinse thoroughly. Never machine-wash or wring; it stresses the seam bonding.\n\nRotation tip: keep two caps and alternate while one dries. A dry liner seals better and stays odor-free, preserving the waterproof core.',
    sections: [
      {
        heading: 'After each use',
        paragraphs: ['Rinse the interior with cool water, shake off excess, air dry.'],
      },
      {
        heading: 'Weekly refresh',
        paragraphs: [
          'Hand wash with mild soap, focus on the band, blot and reshape, air dry fully. Deodorize with a pinch of baking soda if needed.',
        ],
      },
      {
        heading: 'Rotation tip',
        paragraphs: ['Keep two caps and alternate; a dry liner seals better and avoids odor.'],
      },
    ],
  },
  {
    slug: 'steam-proof-bathroom',
    title: 'Steam-proof your bathroom in 10 minutes',
    subtitle: 'Small tweaks, big frizz reductions.',
    tag: 'Tips',
    author: 'Lumelle Studio',
    date: '2025-10-20',
    readTime: '4 min',
    cover: '/uploads/luminele/product-feature-04.jpg',
    teaser: 'Micro-adjustments that keep humidity from ruining your style.',
    body:
      'Run the vent early (before the water heats) and keep the door cracked to create flow. Drop temps by one notch and angle spray away from walls to reduce bounce-back steam. Place an absorbent bathmat by the shower to catch splash.\n\nPost-shower, prop the window or door for two minutes before taking off your cap; letting the room cool seals cuticles. Keep a small fan or cool-shot dryer handy for a 30-second pass around roots.\n\nBonus: keep your cap hanging open—not balled up—so moisture escapes and the liner stays effective.',
    sections: [
      {
        heading: 'Before you shower',
        paragraphs: [
          'Run the vent early, crack the door, drop temperature a notch, and angle spray away from walls to reduce bounce-back steam.',
        ],
      },
      {
        heading: 'After you shower',
        paragraphs: [
          'Prop a window or door for two minutes before removing the cap; a quick cool pass around roots keeps cuticles sealed.',
        ],
      },
      {
        heading: 'Cap storage',
        paragraphs: ['Hang the cap open so moisture escapes and the liner stays effective.'],
      },
    ],
  },
  {
    slug: 'hairline-health-bands',
    title: 'Hairline health: gentle bands vs tight elastics',
    subtitle: 'How the wrong cap can damage edges over time.',
    tag: 'Science',
    author: 'Lumelle Studio',
    date: '2025-10-18',
    readTime: '5 min',
    cover: '/uploads/luminele/product-feature-02.jpg',
    teaser: 'What to look for in a band to keep your edges safe.',
    body:
      'Tight elastics can tug follicles and leave dents that weaken edges over time. Look for wide, plush bands that distribute pressure and avoid exposed elastic seams.\n\nEdge check: if you see lines or redness after a shower, the band is too tight. A good cap seals without squeezing—slide a fingertip under the band to confirm.\n\nCare for the band: rinse after use to remove oils, air dry fully, and avoid twisting. Healthy edges + a gentle seal mean your styles stay sleek longer without sacrificing hairline health.',
    sections: [
      {
        heading: 'Choose a gentle band',
        paragraphs: [
          'Wide, plush bands distribute pressure and avoid exposed elastic seams that tug follicles and leave dents.',
        ],
      },
      {
        heading: 'Fit check',
        paragraphs: [
          'If you see lines or redness, it’s too tight. A good cap seals without squeezing—slide a fingertip under the band to confirm.',
        ],
      },
      {
        heading: 'Band care',
        paragraphs: [
          'Rinse after use, air dry fully, and avoid twisting. Healthy edges plus a gentle seal keep styles sleek longer.',
        ],
      },
    ],
  },
]
