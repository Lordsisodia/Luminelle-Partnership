import type { BlogPost } from '../types'

const post: BlogPost = {
  slug: 'red-eye-flight-hair-routine',
  title: 'Red-eye flight routine: arrive with smooth hair, no dents',
  subtitle: 'Overnight plane air protection with minimal products.',
  tag: 'Travel',
  pillar: 'Travel & on-the-go',
  primaryKeyword: 'red eye flight hair routine',
  secondaryKeywords: ['overnight flight hair frizz', 'plane hair protection cap', 'sleeping on plane hair silk press'],
  intent: 'how-to',
  status: 'draft',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  date: '2025-12-13',
  readTime: '5 min',
  cover: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
  ogImage: '/og/blog/red-eye-flight.png',
  teaser: 'Humidity swings, dry cabin air, and neck pillows—here’s how to land with smooth hair.',
  sections: [
    {
      heading: 'Pre-flight (15 minutes before boarding)',
      paragraphs: [
        'Set hair in a loose low pony or braid with a satin scrunchie; skip tight topknots that dent.',
        'Smooth a pea of light serum through mids/ends; avoid roots to prevent flatness after sleeping upright.',
        'Pack within reach: satin scarf, cap (for humidity bursts), mini serum, microfiber cloth.',
      ],
    },
    {
      heading: 'Seat setup for less friction',
      paragraphs: [
        'Use a neck pillow so your head isn’t grinding into the seat; friction = frizz and dents.',
        'Drape a satin scarf over the headrest area or wrap your hair loosely with it once seated.',
      ],
    },
    {
      heading: 'Overnight routine in-flight',
      paragraphs: [
        'Keep the scarf on for most of the flight; it handles friction. Use the cap only if cabin humidity spikes (meal steam, boarding in rain).',
        'Mid-flight refresh (optional): one drop of serum on ends if they feel crispy. Skip mists unless absolutely needed; dry cabin air evaporates them fast.',
        'Sleep position: keep hair loose; avoid leaning hard on one side for hours. Shift positions every 45–60 minutes if you wake.',
      ],
    },
    {
      heading: 'Pre-landing 10-minute reset',
      paragraphs: [
        'In the lav: remove scarf, shake roots gently, smooth surface with palms. Add a half-pea of serum only to ends.',
        'Edge tidy if needed with a rice-grain of balm; no water.',
        'If the cabin feels humid during descent, wear the cap for the last 10 minutes and remove right after landing.',
      ],
    },
    {
      heading: 'After landing',
      paragraphs: [
        'Step into cooler, drier air (jet bridge if ventilated or terminal). Remove cap/scarf, let hair breathe 60–90 seconds.',
        'Finger-lift roots once for volume; avoid brushing immediately—let hair acclimate first.',
        'If meeting people right away, a 30-second cool shot in a restroom restores smoothness without heat.',
      ],
    },
    {
      heading: 'FAQs',
      paragraphs: [
        'TSA issues with cap/scarf? None—keep them in your personal item; liquids stay in the quart bag.',
        'Headband dents? Skip hard headbands on overnight flights; use a soft scarf instead.',
        'Oily roots after sleeping? Blot with a tissue at the scalp, then lift with fingers; avoid dry shampoo until after you’re off the plane to prevent buildup in dry air.',
      ],
    },
  ],
}

export default post
