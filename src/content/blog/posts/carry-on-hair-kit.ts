import type { BlogPost } from '../types'

const post: BlogPost = {
  slug: 'carry-on-hair-kit',
  title: 'Carry-on hair kit: frizz-proof packing list for flights',
  subtitle: 'Everything you need in one quart bag to land sleek.',
  tag: 'Travel',
  pillar: 'Travel & on-the-go',
  primaryKeyword: 'travel hair kit frizz free',
  secondaryKeywords: ['travel shower cap', 'carry on hair kit', 'plane hair frizz'],
  intent: 'informational',
  status: 'draft',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  date: '2025-12-13',
  readTime: '7 min',
  cover: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
  ogImage: '/og/blog/carry-on-hair-kit.png',
  teaser: 'A compact, TSA-ready kit (cap, microfiber, serum, scrunchie, edge brush) plus an in-flight script so you land sleek.',
  sections: [
    {
      heading: 'The 8-piece carry-on kit (fits in a quart bag)',
      paragraphs: [
        '1) Satin-lined waterproof cap in its own pouch. Keeps liner clean and doubles as a humidity shield in hotels.',
        '2) Microfiber towel (face-size). Blots sweat/condensation without frizzing cuticles.',
        '3) Light serum (15–30 ml). One pump to seal ends pre-flight and post-landing.',
        '4) Satin scrunchie. Holds a loose pony or low braid without dents.',
        '5) Edge brush + tiny balm. For touch-ups after landing, not mid-flight.',
        '6) Mini refresher mist (under 100 ml). Only if hair feels static; one or two spritzes max.',
        '7) Comb or wide-tooth pick. Only for detangling ends before you wrap; no brushing mid-air.',
        '8) Zip bag + vented pouch. Zip bag for liquids; vented pouch for the cap so it can dry if you used it.',
      ],
    },
    {
      heading: 'Pre-flight: 5-minute prep before security',
      paragraphs: [
        'Set your style loose: a low pony with a satin scrunchie or a loose braid. Tight buns and headbands create dents that show after long flights.',
        'Smooth a pea-sized amount of light serum through mids and ends. Skip heavy oils—they trap dry cabin air and can leave hair limp.',
        'If you run hot or expect delays, tuck the cap into an easy-to-reach pocket. You can slip it on in a steamy jet bridge or a rain-soaked boarding line.',
        'Pack liquids together for TSA. Keep the cap in a breathable pouch outside the quart bag so you don’t sacrifice liquid space.',
      ],
    },
    {
      heading: 'In-flight routine: protect, don’t suffocate',
      paragraphs: [
        'Seat + settle: keep hair down or in a loose low pony. Avoid leaning hard on headrests; use a neck pillow to reduce friction.',
        'Humidity swing: cabin air is dry, but cabin changes at takeoff/landing plus your own body heat can cause small bursts of moisture. The goal is to minimize friction and avoid tight pressure points.',
        'If someone opens a steamy meal or you feel damp air, slip the cap on loosely for 10–15 minutes, then let hair breathe again. Do not trap heat for the whole flight—light, intermittent use works best.',
        'Mid-flight refresh (optional): one mist in palms, pat on ends only. Follow with a quick serum dab if ends feel rough. Skip roots to avoid oiliness.',
        'Hydrate you, not your hair: drink water; skip heavy leave-ins that can oxidize during long sits.',
      ],
    },
    {
      heading: 'Pre-landing reset (10 minutes before descent)',
      paragraphs: [
        'Bathroom reset: if possible, step into the lav for two minutes. Loosen the scrunchie, shake roots gently, and smooth flyaways with fingertip-serum (half a pea).',
        'Edge tidy: if edges need love, use a rice-grain amount of balm on the edge brush—no water. Quick strokes only where you need hold.',
        'Wrap for descent: a loose satin scarf or the cap for the last 10 minutes keeps headrest friction off while the plane cools. Remove right before deplaning to avoid creases.',
      ],
    },
    {
      heading: 'After landing: 3-minute “arrivals” play',
      paragraphs: [
        'Air out: once off the plane, take the scarf/cap off in a cool, drier area (jet bridge can be humid). Let hair breathe for 60–90 seconds.',
        'Volume reset: flip hair once, then smooth the surface with palms—skip brushes unless you truly need them.',
        'If heading into humidity (tropical arrivals), keep the cap handy for short, steamy transitions (shuttle, rain). It’s a humidity shield, not just a shower tool.',
      ],
    },
    {
      heading: 'Pack it right: cleanliness and longevity',
      paragraphs: [
        'Keep the cap liner clean: never stuff it damp into the quart bag. If you used it, blot with the microfiber, turn it inside-out to air while you travel to the hotel, then hang open.',
        'Microfiber hygiene: air the towel after use; swap for a clean one each trip to avoid musty transfer onto hair or cap.',
        'Refill minis every trip. Label the serum and mist so you don’t guess mid-flight.',
      ],
    },
  ],
  faqs: [
    {
      question: 'Can I wear the shower cap the whole flight?',
      answer:
        'You can, but it’s better in short stints. Cabin air is dry; trapping heat too long can flatten roots. Use it during humidity spikes (jet bridge, rain, meals with steam) and for the last 10 minutes before landing.',
    },
    {
      question: 'Do I need a scarf if I already have a cap?',
      answer:
        'A satin scarf is great for constant headrest friction; the cap is better for moisture spikes. Use the scarf for most of the flight, the cap for brief humidity/steam moments.',
    },
    {
      question: 'How do I avoid dents from scrunchies or headbands?',
      answer:
        'Keep tension low: loose low pony or braid with a satin scrunchie. Avoid tight elastic headbands; if you must, loosen and move them every hour.',
    },
    {
      question: 'What if I have to gate-check and lose my liquids bag?',
      answer:
        'Keep the cap + scrunchie in your personal item, not the quart bag. Even without liquids, you can manage friction and humidity with just those two pieces.',
    },
  ],
}

export default post
