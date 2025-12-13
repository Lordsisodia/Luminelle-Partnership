import type { BlogPost } from '../types'

const post: BlogPost = {
  slug: 'beach-pool-hair-protection',
  title: 'Beach/pool day plan: protect silk presses from splash + humidity',
  subtitle: 'Sun, salt, and splash defense without killing volume.',
  tag: 'Travel',
  pillar: 'Travel & on-the-go',
  primaryKeyword: 'protect silk press at beach',
  secondaryKeywords: ['beach hair humidity silk press', 'pool hair protection cap', 'silk press travel beach tips'],
  intent: 'how-to',
  status: 'draft',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  date: '2025-12-13',
  readTime: '6 min',
  cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  ogImage: '/og/blog/beach-pool-hair.png',
  teaser: 'Your pre-beach prep, on-site cap strategy, and post-rinse reset for silk presses.',
  sections: [
    {
      heading: 'Pre-beach setup (5 minutes)',
      paragraphs: [
        'Light serum on mids/ends; avoid heavy oils that bake in sun.',
        'Loose low braid or pony with satin scrunchie; no tight buns that kink.',
        'Pack: cap, microfiber towel, wide-tooth comb, travel mist, satin scarf, vented pouch.',
      ],
    },
    {
      heading: 'Cap strategy by zone',
      paragraphs: [
        'High splash zones (pool edge, kids area): cap on; band seated just beyond hairline; keep sessions short to avoid sweat buildup.',
        'Low splash but high humidity (boardwalk, pier, cabana): cap optional—use scarf for friction, cap for quick moves through mist or rain.',
        'In-water? The cap is for splash/humidity, not diving. If you swim, use a swim cap and treat hair after.',
      ],
    },
    {
      heading: 'Salt/chlorine quick defense',
      paragraphs: [
        'If you get splashed: blot immediately with microfiber; don’t rub. If salt/chlorine hits, rinse with fresh water ASAP.',
        'Keep a small bottle of freshwater; a quick pour-over beats letting salt dry on a silk press.',
      ],
    },
    {
      heading: 'Post-beach reset (10 minutes)',
      paragraphs: [
        'Freshwater rinse or shower as soon as you’re inside. Cap on during a short, cooler shower to block steam.',
        'Cool the room/vent for 1–2 minutes, then remove the cap. Finger-shake roots, pat surface smooth.',
        'If needed, a 30-second cool shot resets volume without heat damage.',
      ],
    },
    {
      heading: 'Sun + sweat management',
      paragraphs: [
        'If you sweat under the cap, take a 2-minute break in shade, cap off, let sweat evaporate, then reapply if needed.',
        'Reapply serum sparingly; too much attracts sand and grit.',
      ],
    },
    {
      heading: 'FAQs',
      paragraphs: [
        'Can I wear the cap while swimming? It’s for humidity/splash, not submersion. Use a swim cap for laps.',
        'Will sunscreen ruin the cap? Wipe band if sunscreen transfers; rinse band with cool water after the day.',
      ],
    },
  ],
}

export default post
