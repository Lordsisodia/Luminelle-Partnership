export type Review = {
  author: string
  stars: number
  title: string
  body: string
  date?: string
  source?: string
}

export type HomeConfig = {
  hero: {
    headline: string
    subhead: string
    ctaLabel: string
    ctaHref: string
    secondaryCtaLabel?: string
    secondaryCtaHref?: string
    offerChip?: string
    image: string
    bgImage?: string
    gallery?: string[]
    objectPosition?: string
    pill?: string
    assurances?: { label: string }[]
  }
  slides: { title: string; copy: string; image: string; ctaHref: string; tag?: string; proof?: string }[]
  socialProof: { rating: number; count: number; tagline: string }
  problemSolution: { problems: string[]; solutions: string[] }
  ugc: { src: string; type: 'image' | 'video'; caption?: string }[]
  benefits3?: { title: string; body: string; icon?: string }[]
  realWorldUse?: { src: string; alt: string; caption: string }[]
  details?: { title: string; body: string; thumbSrc?: string; thumbAlt?: string }[]
  reviews: Review[]
  pdpTeaser: {
    title: string
    subtitle: string
    description: string
    rating: number
    reviews: number
    pills: string[]
    price: string
    bullets: string[]
    image: string
    href: string
    ctaLabel: string
  }
  faq: { q: string; a: string }[]
  stats: { value: string; label: string; helper?: string }[]
  comparison: { feature: string; lumelle: string; other: string }[]
  finalCta: { headline: string; subhead: string; bullets: string[]; ctaLabel: string; ctaHref: string }
}

export const homeConfig: HomeConfig = {
  hero: {
    headline: 'Keep hair dry. Keep styles flawless.',
    subhead: 'A luxury shower cap that protects against frizz and preserves your look.',
    ctaLabel: 'Shop Now',
    ctaHref: '/product/shower-cap',
    offerChip: 'Buy 2, save 10%',
    secondaryCtaLabel: 'Join WhatsApp',
    secondaryCtaHref: '/affiliates',
    image: '/uploads/luminele/product-feature-02.jpg',
    bgImage: '/uploads/luminele/product-feature-06.jpg',
    objectPosition: 'center center',
    pill: 'Best seller',
    assurances: [
      { label: 'Fast shipping' },
      { label: 'Easy returns' },
      { label: 'Secure checkout' },
    ],
    gallery: [
      '/uploads/luminele/product-feature-02.jpg',
      '/uploads/luminele/product-feature-04.jpg',
      '/uploads/luminele/product-feature-05.jpg'
    ]
  },
  slides: [
    {
      title: 'No‑frizz protection',
      copy: 'Keep blowouts and curls intact.',
      image: '/uploads/luminele/product-feature-04.jpg',
      ctaHref: '/product/shower-cap',
      tag: 'Creator fave',
      proof: '@shannon_mitch kept 29 sales in one video',
    },
    {
      title: 'Luxury feel',
      copy: 'Soft lining, comfortable fit.',
      image: '/uploads/luminele/product-feature-05.jpg',
      ctaHref: '/product/shower-cap',
      tag: 'Spa-grade',
      proof: 'Won “Most comfortable cap” by 100+ reviewers',
    },
    {
      title: 'Reusable & eco‑friendly',
      copy: 'Skip the disposables. Choose durable.',
      image: '/uploads/luminele/product-feature-06.jpg',
      ctaHref: '/product/shower-cap',
      tag: 'Durability',
      proof: 'Tested for 100+ showers without leaks',
    },
    {
      title: 'Steam shield',
      copy: 'Moisture-guard lining blocks even sauna-level steam.',
      image: '/uploads/luminele/product-feature-03.jpg',
      ctaHref: '/product/shower-cap',
      tag: 'Steam-proof',
      proof: 'Creators report 0 flyaways after 20-min showers',
    },
    {
      title: 'Creator-ready fit',
      copy: 'Roomy silhouette stretches over braids, locs, and rollers.',
      image: '/uploads/luminele/product-feature-07.jpg',
      ctaHref: '/product/shower-cap',
      tag: 'All hair welcome',
      proof: '100+ pros keep it in their travel kits',
    }
  ],
  socialProof: { rating: 4.9, count: 1240, tagline: 'Loved by thousands' },
  problemSolution: {
    problems: [
      'Plastic caps trap humidity → frizz',
      'Uncomfortable elastic leaves marks',
      'Disposable waste and poor durability'
    ],
    solutions: [
      'Moisture‑guard lining preserves styles',
      'Comfort stretch band with secure seal',
      'Long‑lasting build replaces disposables'
    ]
  },
  ugc: [
    { src: '/uploads/luminele/product-feature-07.jpg', type: 'image', caption: 'Morning routine ready' },
    { src: '/uploads/luminele/product-feature-02.jpg', type: 'image' },
    { src: '/uploads/luminele/product-feature-04.jpg', type: 'image' }
  ],
  benefits3: [
    { title: 'Seal out steam', body: 'Waterproof core protects styles from moisture and frizz.' },
    { title: 'Comfort, no creases', body: 'Spa‑grade band hugs softly without leaving marks.' },
    { title: 'Reusable luxe', body: 'Dual‑layer satin built to last 100+ uses.' },
  ],
  realWorldUse: [
    { src: '/uploads/luminele/product-feature-03.jpg', alt: 'Creator mirror selfie wearing cap', caption: 'After a hot shower — blowout stays smooth.' },
    { src: '/uploads/luminele/product-feature-07.jpg', alt: 'Comfort band macro', caption: 'Comfort band sits softly — no marks.' },
    { src: '/uploads/luminele/product-feature-02.jpg', alt: 'Bathroom lifestyle shot', caption: 'Fits curls and braids comfortably.' },
  ],
  details: [
    { title: 'Materials & care', body: 'Dual‑layer satin with waterproof TPU core. Rinse after use, air dry, and hand wash weekly with mild soap for longevity.', thumbSrc: '/uploads/luminele/product-feature-05.jpg', thumbAlt: 'Satin lining macro' },
    { title: 'Fit & sizing', body: 'Comfort‑fit band stretches to 24"+ circumference. Designed for curls, braids, and blowouts.', thumbSrc: '/uploads/luminele/product-feature-04.jpg', thumbAlt: 'Comfort band detail' },
    { title: 'What’s in the box', body: 'Lumelle Shower Cap in protective pouch. Simple care card inside.' },
    { title: 'Shipping & returns', body: 'Tracked worldwide shipping from the UK. 30‑day Luxe Guarantee with easy exchanges.' },
  ],
  reviews: [
    { author: 'Amelia', stars: 5, title: 'Zero frizz', body: 'Finally a cap that actually works.' },
    { author: 'Beth', stars: 5, title: 'So comfy', body: 'No marks on my forehead and looks cute.' },
    { author: 'Cara', stars: 5, title: 'Worth it', body: 'Saved my blowout more than once.' }
  ],
  pdpTeaser: {
    title: 'Lumelle Shower Cap',
    subtitle: 'Creator-loved protection for every style',
    description:
      'Dual-layer satin with a waterproof core keeps silk presses, curls, and braids flawless through every steamy shower.',
    rating: 4.9,
    reviews: 1240,
    pills: ['No-frizz seal', 'Luxury feel', 'Reusable + eco'],
    price: 'From £24',
    bullets: ['Moisture‑guard lining', 'Comfort stretch band', 'Reusable & durable'],
    image: '/uploads/luminele/product-feature-05.jpg',
    href: '/product/shower-cap',
    ctaLabel: 'Shop the cap',
  },
  faq: [
    { q: 'Is it fully waterproof?', a: 'Yes, with a moisture‑guard lining and sealed seams.' },
    { q: 'Will it fit my hair?', a: 'Designed to fit most hair types with a comfort stretch band.' },
    { q: 'How do I care for it?', a: 'Rinse and air‑dry. Hand wash as needed.' },
    { q: 'Can I travel with it?', a: 'Absolutely—packs flat and dries fast for hotel showers.' },
    { q: 'What’s the return policy?', a: 'Easy returns within 30 days if unused and in original packaging.' }
  ],
  stats: [
    { value: '4.9★', label: 'Average rating', helper: '1,240 reviews' },
    { value: '48 hrs', label: 'Dispatch time', helper: 'Ships fast from UK' },
    { value: '100+', label: 'Creators onboard', helper: 'Trusted by Lumelle pros' },
  ],
  comparison: [
    { feature: 'Material', lumelle: 'Dual-layer satin + waterproof core', other: 'Thin plastic film' },
    { feature: 'Fit', lumelle: 'Comfort band — no marks', other: 'Tight elastic dents' },
    { feature: 'Durability', lumelle: 'Reusable 100+ wears', other: 'Single-use disposables' },
    { feature: 'Care', lumelle: 'Rinse + air dry', other: 'Traps moisture & odor' },
  ],
  finalCta: {
    headline: 'Ready for frizz-free showers?',
    subhead: 'Join creators who keep every wash day protected with Lumelle.',
    bullets: ['Luxury satin exterior', 'Leak-proof lining', '30-day Luxe Guarantee'],
    ctaLabel: 'Buy Now',
    ctaHref: '/product/shower-cap',
  },
}
