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
  'Slip on before your shower; tuck flyaways inside.',
  'After showering, rinse the lining and shake off water.',
  'Hang to air-dry; ready for tomorrow.',
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
  { title: 'Heatless, satin-wrapped', body: 'Soft foam core wrapped in satin shapes curls without heat damage.' },
  { title: 'Complete overnight kit', body: 'Includes curler rod, 2 satin scrunchies, and a claw clip to secure your wrap.' },
  { title: 'Sleep-friendly comfort', body: 'Flexible core you can sleep on—no hard plastic or pull on roots.' },
  { title: 'Works on damp or dry hair', body: 'Best on 70–90% dry hair for smooth, frizz-free waves by morning.' },
]

const reasonsCurler = [
  { title: 'Zero heat damage', desc: 'Wake up to soft curls without irons or blow-dryers.' },
  { title: 'Set it & forget it', desc: 'Wrap once at night, reveal bouncy waves in the morning.' },
  { title: 'Gentle on hairlines', desc: 'Satin finish reduces friction and keeps edges smooth.' },
  { title: 'Travel-ready', desc: 'Lightweight set rolls into your carry-on for hotel or gym nights.' },
]

const qaCurler = [
  { q: 'How long do I leave it in?', a: 'Wrap for 4–8 hours; overnight gives the longest-lasting curls.' },
  { q: 'Does it work on short hair?', a: 'Best from shoulder-length and longer; use smaller sections for medium lengths.' },
  { q: 'What’s included?', a: 'One satin curler rod, two satin scrunchies, and a claw clip.' },
  { q: 'How do I clean it?', a: 'Spot clean by hand with mild soap, then air dry flat.' },
]

const howCurler = [
  'Start on slightly damp hair; place the satin curler across your crown and secure with the claw clip.',
  'Wrap 1–2" sections around each side away from your face, keeping tension even.',
  'Secure the ends with the satin scrunchies, sleep or wait 4–8 hours, then unwrap for soft curls.',
]

const careCurler = [
  { icon: 'Shield', title: 'Heatless by design', body: 'Protects against heat damage while creating curls overnight.' },
  { icon: 'RefreshCcw', title: 'Reusable satin', body: 'Spot clean and air dry; built to reuse week after week.' },
  { icon: 'Feather', title: 'Soft sleep fit', body: 'Flexible foam core stays comfy on your pillow and gentle on roots.' },
]

const curlerConfig: ProductConfig = {
  handle: 'satin-overnight-curler',
  fallbackItemId: 'satin-overnight-curler-set',
  defaultTitle: 'Satin Overnight Curler Set',
  defaultSubtitle: 'Heatless satin curling set that delivers soft, frizz-free waves by morning.',
  defaultPrice: 24,
  badge: 'New viral heatless curlers',
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
      eyebrow: 'Why you’ll love it',
      title: 'Soft waves with zero heat damage',
      description: 'Wrap at night, wake up to smooth curls and no hot tools.',
      alignment: 'left',
    },
  },
  featuredTikTokHeading: {
    eyebrow: 'Creator in action',
    title: 'See the heatless set at work',
    description: 'Watch quick wrap tutorials and morning reveals.',
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
  },
  'satin-overnight-curler': curlerConfig,
  'satin-overnight-curler-set': { ...curlerConfig, handle: 'satin-overnight-curler-set' },
}

export const CAP_GALLERY_FALLBACK = CAP_GALLERY
