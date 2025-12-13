import type { BlogPost } from '../types'

const post: BlogPost = {
  slug: 'dry-and-store-shower-cap',
  title: 'Deodorize, dry, and store your cap so it keeps sealing',
  subtitle: 'Simple drying habits that keep liners odor-free and grippy.',
  tag: 'Care',
  pillar: 'Care & maintenance',
  primaryKeyword: 'dry shower cap properly',
  secondaryKeywords: ['store shower cap', 'prevent shower cap odor', 'shower cap drying tips'],
  intent: 'how-to',
  status: 'draft',
  ctaTarget: '/product/lumelle-shower-cap',
  author: 'Lumelle Studio',
  date: '2025-12-13',
  readTime: '4 min',
  cover: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  ogImage: '/og/blog/dry-store-cap.png',
  teaser: 'A 3-minute dry-and-store routine that prevents odor and keeps the waterproof seal tight.',
  sections: [
    {
      heading: 'Right after use (1 minute)',
      paragraphs: [
        'Shake off water, especially at the band. Press with a microfiber towel—don’t twist.',
        'Turn the cap inside-out to expose the liner and band to air.',
      ],
    },
    {
      heading: 'Air it properly',
      paragraphs: [
        'Hang fully open on a hook or over a wide bar; airflow is the goal. Avoid tight pegs that crease the band.',
        'No sealed bags or shower caddies while damp. Trapped moisture = odor and weaker seal.',
      ],
    },
    {
      heading: 'Weekly freshen',
      paragraphs: [
        'Light baking-soda dust on the liner for 10 minutes, then rinse and air dry. This knocks down odor without harsh chemicals.',
        'If you sauna/gym often, pair this with your weekly soap wash (see deep-clean guide).',
      ],
    },
    {
      heading: 'Travel and humid climates',
      paragraphs: [
        'Use a vented pouch, not a zip bag. If you must bag it, add a dry microfiber and open it as soon as you reach a vent or window.',
        'In very humid rooms, dry near a fan/AC; avoid drying on warm radiators (can warp TPU).',
      ],
    },
    {
      heading: 'Rotate to preserve the seal',
      paragraphs: [
        'Keep two caps if you shower daily. A fully dry liner grips and seals better, preventing micro-leaks.',
      ],
    },
    {
      heading: 'FAQs',
      paragraphs: [
        'Musty smell after a trip? Rinse, baking-soda dust, rinse again, and air in front of a fan until fully dry.',
        'Can I sun-dry? Brief indirect sunlight is fine; avoid prolonged high heat.',
      ],
    },
  ],
}

export default post
