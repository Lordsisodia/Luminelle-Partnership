import type { ProductConfig } from './product-types'

export const DEFAULT_VIDEO_SLOT = 'video://https://www.tiktok.com/embed/v2/7567328998158585110'

const CAP_GALLERY = [
  '/uploads/luminele/main (1).webp',
  '/uploads/luminele/2ND PHOTO.webp',
  '/uploads/luminele/3RD PHOTO.webp',
  '/uploads/luminele/4TH PHOTO.webp',
  '/uploads/luminele/5TH PHOTO.webp',
  '/uploads/luminele/6TH PHOTO.webp',
  '/uploads/luminele/7TH PHOTO.webp',
  '/uploads/luminele/8TH PHOTO.webp',
  DEFAULT_VIDEO_SLOT,
]

const essentialsCap = [
  { title: 'Reusable waterproof', body: 'Dual-layer satin with a waterproof TPU core and comfort-fit elastic band that seals out steam.' },
  { title: 'Satin lined', body: 'Smooth satin interior protects styles, reduces friction, and blocks humidity.' },
  { title: 'Large wide shower cap', body: 'Roomy silhouette fits curls, coils, protective styles, and even bum-length hair (per customer reviews).' },
  { title: 'Adjustable', body: 'Comfort band stretches to 24"+ with a secure, no-crease fit for daily use.' },
]

const reasonsCap = [
  { title: 'Our best seller', desc: 'Creator-tested fit that keeps silk presses, curls, and braids camera-ready.' },
  { title: 'Happier hair days', desc: 'Steam-blocking core stops frizz so styles last through busy weeks.' },
  { title: 'Less breakage', desc: 'Satin-soft band prevents tugging while the roomy shape avoids tension.' },
  { title: 'Stays fresh', desc: 'Dual-layer build wipes clean and air-dries fast—made to reuse 100+ times.' },
]

const qaCap = [
  {
    q: 'Will it fit my hair?',
    a: "Customer review · 5★: I’ve never bothered with shower caps as I have super long hair that goes past my butt so my hair would always get wet and wouldn’t fit. This shower cap is perfect – my hair stays bone dry, it fits with plenty of room and the band fits snug around the head. 10/10 worth the price!",
  },
  { q: 'Is it fully waterproof?', a: 'Yes, the durable waterproof outer shell shields hair from moisture and humidity.' },
  {
    q: 'How do I wash it?',
    a: 'Hand wash the shower cap in lukewarm water with mild soap, gently clean the satin lining, rinse well, and air-dry only. Avoid machine washing, tumble drying, or heat to keep the waterproof layer and satin in good condition.',
  },
  { q: 'What’s the return policy?', a: '30-day Luxe Guarantee with easy exchanges or returns.' },
]

const howCap = [
  {
    title: 'Steam-proof shine',
    body: 'Your silk press stays smooth — the cap seals out steam and frizz in daily showers.',
  },
  {
    title: 'Room for every style',
    body: 'Roomy fit for curls, braids, and bum-length hair without creasing your edges.',
  },
  {
    title: 'Ready again tomorrow',
    body: 'Reusable satin + waterproof core wipes clean in seconds, ready for tomorrow.',
  },
]

const careCap = [
  {
    icon: 'Shield',
    title: 'Steam-shield core',
    body: 'Dual-layer satin with a waterproof TPU core keeps styles frizz-free in steamy showers.',
  },
  {
    icon: 'RefreshCcw',
    title: 'Reusable + easy care',
    body: 'Hand-wash friendly and built to last 100+ showers—no flimsy disposables.',
  },
  {
    icon: 'Feather',
    title: 'Comfort band, no creases',
    body: 'Soft stretch band hugs without denting edges and stays put on curls, braids, or silk presses.',
  },
]

const curlerGallery = [
  '/uploads/curler/1.webp',
  '/uploads/curler/2.webp',
  '/uploads/curler/3.webp',
  '/uploads/curler/4.webp',
  '/uploads/curler/5.webp',
  '/uploads/curler/6.webp',
  DEFAULT_VIDEO_SLOT,
]

const essentialsCurler = [
  {
    title: "What’s inside",
    body:
      'Satin heatless curling rod\n' +
      '• Luxury satin bonnet\n' +
      '• 2× matching satin scrunchies\n' +
      '• Claw clip',
  },
  {
    title: 'Works on all hair types',
    body: 'Straight, wavy, thick or fine — for smooth, long‑lasting curls.',
  },
  {
    title: 'Curls last all day',
    body:
      'Many customers say theirs hold for up to 2–3 days depending on hair type, how tightly they wrap, and the products they use.',
  },
]

const reasonsCurler = [
  {
    title: 'Wrap',
    desc: 'Start with dry or slightly damp hair, divide into two sections, and wrap each piece tightly around the satin rod. Full tutorial here (link to how to use video).',
  },
  {
    title: 'Secure',
    desc: 'Use the scrunchies to fasten the ends, then pop on the bonnet to keep everything in place.',
  },
  {
    title: 'Set & reveal',
    desc: 'Leave overnight or for a few hours, unwrap gently, and enjoy soft, bouncy, heat‑free curls.',
  },
]

const qaCurler = [
  {
    q: 'Will it work for my hair type?',
    a: 'Yes — the Lumelle Heatless Curler is designed for all hair types. Whether your hair is straight, wavy, thick, or fine, the flexible satin rod shapes smooth, lasting curls without heat damage.',
  },
  {
    q: 'How long do the curls last?',
    a: 'Most customers enjoy beautiful curls all day, and many say theirs last up to 2–3 days. Smaller sections and tighter wrapping can help your curls stay defined even longer.',
  },
  {
    q: 'Is it comfortable to sleep in?',
    a: 'Absolutely. Our satin-wrapped rod and lightweight bonnet are designed for soft, overnight comfort, so you wake up with curls — not discomfort.',
  },
  {
    q: 'Does it help with frizz?',
    a: 'Yes. Satin naturally reduces friction, leaving your hair smoother, shinier, and noticeably frizz-free after styling.',
  },
  {
    q: 'Will it damage my hair?',
    a: 'Not at all. Our heatless system avoids the breakage and dryness caused by hot tools, keeping your hair healthier with every use.',
  },
  {
    q: 'Do I use it on wet or dry hair?',
    a: 'For the best results, use on dry or slightly damp hair. Damp hair creates a stronger curl, while dry hair gives softer, looser waves.',
  },
  {
    q: 'How long do I leave it in?',
    a: 'Leave it in overnight or for at least a few hours. The longer it sets, the more defined your curls will be.',
  },
]

const howCurler = [
  { title: 'Heatless, healthy curls', body: 'Wake up to soft, effortless curls — no heat, no damage.' },
  { title: 'Frizz defense built in', body: 'Frizz‑free and helps protect your hair from breakage.' },
  { title: 'Sleep-easy design', body: 'Comfortable to sleep in and easy to wrap in minutes.' },
]

const careCurler = [
  {
    icon: 'Shield',
    title: "What's inside",
    body:
      '• Satin heatless curling rod\n' +
      '• Luxury satin bonnet\n' +
      '• 2x matching satin scrunchies\n' +
      '• Claw clip',
  },
  {
    icon: 'RefreshCcw',
    title: 'Works on all hair types',
    body: 'Straight, wavy, thick or fine for smooth, long‑lasting curls.',
  },
  {
    icon: 'Feather',
    title: 'Curls last all day',
    body:
      'Many customers say that theirs hold up to 2–3 days depending on hair type and how tightly they wrap and the products they use.',
  },
]

const curlerConfig: ProductConfig = {
  handle: 'satin-overnight-curler',
  fallbackItemId: 'satin-overnight-curler-set',
  fallbackVariantId: 'gid://shopify/ProductVariant/56852779696502',
  defaultTitle: 'Satin Overnight Heatless Curler Set',
  defaultSubtitle: 'Comfortable overnight curls, zero damage.',
  defaultPrice: 16.99,
  compareAtPrice: 21.99,
  discountPercentOverride: 20,
  ratingValueOverride: 4.8,
  ratingCountLabelOverride: '50+',
  careLabelOverride: "What's included",
  hideDetailsAccordion: true,
  gallery: curlerGallery,
  videoSlot: DEFAULT_VIDEO_SLOT,
  essentials: essentialsCurler,
  reasons: reasonsCurler,
  qa: qaCurler,
  how: howCurler,
  care: careCurler,
  featureCallouts: {
    mediaSrc: DEFAULT_VIDEO_SLOT,
    mediaAlt: 'Satin overnight curler demo',
    mediaLabel: 'Heatless overnight curls',
    mediaNote: 'Soft satin set that stays comfy all night',
    heading: {
      eyebrow: "How you'll use it",
      title: 'Wrap it once, wake up flawless curls',
      description: "You'll get effortless, frizz-free curls that last, with a comfy design that keeps your hair healthier every time you use it.",
      alignment: 'left',
    },
  },
  featuredTikTokHeading: {
    eyebrow: undefined,
    title: 'Watch How These Curls Came Out Flawless',
    description: "See How Long Creators' Curls Last and How Effortlessly Gorgeous They Look.",
    alignment: 'center',
  },
}

export const productConfigs: Record<string, ProductConfig> = {
  'shower-cap': {
    handle: 'lumelle-shower-cap',
    fallbackItemId: 'lumelle-cap',
    fallbackVariantId: 'gid://shopify/ProductVariant/56829020504438',
    defaultTitle: 'Lumelle Shower Cap',
    defaultSubtitle: 'Keep hair dry. Keep styles flawless.',
    defaultPrice: 14.99,
    compareAtPrice: 19.99,
    badge: 'Buy 2, save 10%',
    gallery: CAP_GALLERY,
    videoSlot: DEFAULT_VIDEO_SLOT,
    essentials: essentialsCap,
    reasons: reasonsCap,
    qa: qaCap,
    how: howCap,
    care: careCap,
    featureCallouts: {
      mediaSrc: DEFAULT_VIDEO_SLOT,
      mediaAlt: 'Lumelle cap TikTok demo',
      mediaLabel: 'Watch it in action',
      mediaNote: 'Creator-tested frizz defense',
      heading: {
        eyebrow: 'Why you’ll love it',
        title: 'Effortless to put on, frizz-free when you take it off',
        description: 'Your small daily luxury that keeps styles smooth, comfy, and camera-ready.',
        alignment: 'left',
      },
    },
    featuredTikTokHeading: {
      eyebrow: 'Creator in action',
      title: 'Watch the cap stay flawless',
      description: 'See how creators keep their silk press perfect after every shower.',
      alignment: 'center',
    },
    ratingValueOverride: 4.8,
    ratingCountLabelOverride: '100+',
  },
  'satin-overnight-curler': curlerConfig,
  'satin-overnight-curler-set': { ...curlerConfig, handle: 'satin-overnight-curler-set' },
}

export const CAP_GALLERY_FALLBACK = CAP_GALLERY
