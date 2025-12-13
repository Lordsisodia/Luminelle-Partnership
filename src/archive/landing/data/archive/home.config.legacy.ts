// Archived copy of the old landing home config (kept for reference only).
// Note: The live site uses src/content/home.config.ts.

import type { HomeConfig } from '../home.types'

export const homeConfigLegacy: HomeConfig = {
  hero: {
    headline: 'Luxury shower cap that keeps hair frizz-free',
    subhead: 'Satin-lined, waterproof, and creator-tested to protect silk presses, curls, and braids from steam.',
    ctaLabel: 'Shop shower cap',
    ctaHref: '/product/lumelle-shower-cap',
    offerChip: 'Buy 2, save 10%',
    secondaryCtaLabel: 'Join WhatsApp',
    secondaryCtaHref: '/affiliates',
    image: '/uploads/luminele/hero-main-960.webp',
    bgImage: '/uploads/luminele/hero-main-960.webp',
    objectPosition: 'center 30%',
    objectFit: 'cover',
    pill: 'Best seller',
    assurances: [
      { label: 'Free shipping £20+' },
      { label: '30-day money back' },
    ],
    gallery: ['/uploads/luminele/hero-main-960.webp'],
  },
  slides: [
    {
      title: 'Luxury Self Care',
      copy: 'The design lets you fit your hair in easily and seal it comfortably for your shower.',
      image: '/uploads/luminele/product-feature-04.webp',
      ctaHref: '/product/lumelle-shower-cap',
      tag: 'Daily luxury',
      proof: '',
    },
    {
      title: 'Designed To Last',
      copy: 'It’s fully reusable, made with durable materials that hold their shape and last shower after shower.',
      image: '/uploads/luminele/product-feature-05.webp',
      ctaHref: '/product/lumelle-shower-cap',
      tag: 'Durability',
      proof: '',
    },
    {
      title: 'Fits All Hair Sizes',
      copy: 'Designed for all hair types—it even fits thick, curly, or bum-length hair.',
      image: '/uploads/luminele/product-feature-06.webp',
      ctaHref: '/product/lumelle-shower-cap',
      tag: 'All hair welcome',
      proof: '',
    },
    {
      title: 'Frizz-Free Protection',
      copy: 'The satin lining reduces friction to keep your hair frizz-free while you’re in your steamy shower.',
      image: '/uploads/luminele/steam-shield-new.webp',
      ctaHref: '/product/lumelle-shower-cap',
      tag: 'Frizz guard',
      proof: '',
    },
    {
      title: 'The Perfect Gift',
      copy: 'A simple gift that makes daily showers easier.',
      image: '/uploads/luminele/product-feature-07.webp',
      ctaHref: '/product/lumelle-shower-cap',
      tag: 'Giftable',
      proof: '',
    }
  ],
  socialProof: { rating: 4.8, count: 10000, tagline: 'Trusted by 10k users' },
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
    { src: '/uploads/luminele/product-feature-07.webp', type: 'image', caption: 'Morning routine ready' },
    { src: '/uploads/luminele/product-feature-02.webp', type: 'image' },
    { src: '/uploads/luminele/product-feature-04.webp', type: 'image' }
  ],
  benefits3: [
    { title: 'Seal out steam', body: 'Waterproof core protects styles from moisture and frizz.' },
    { title: 'Comfort, no creases', body: 'Spa‑grade band hugs softly without leaving marks.' },
    { title: 'Reusable luxe', body: 'Dual‑layer satin built to last 100+ uses.' },
  ],
  realWorldUse: [
    { src: '/uploads/luminele/product-feature-03.webp', alt: 'Creator mirror selfie wearing cap', caption: 'After a hot shower — blowout stays smooth.' },
    { src: '/uploads/luminele/product-feature-07.webp', alt: 'Comfort band macro', caption: 'Comfort band sits softly — no marks.' },
    { src: '/uploads/luminele/product-feature-02.webp', alt: 'Bathroom lifestyle shot', caption: 'Fits curls and braids comfortably.' },
  ],
  details: [
    {
      title: 'Reusable & waterproof',
      body: 'Dual‑layer satin exterior + waterproof TPU core. Wipes clean daily; rinse after use, air dry fully, and hand wash weekly with mild soap to keep the seal strong for 100+ uses.',
      thumbSrc: '/uploads/luminele/product-feature-05.webp',
      thumbAlt: 'Satin lining macro',
    },
    {
      title: 'Satin lined',
      body: 'Smooth inner lining protects styles while blocking steam—reduces friction on silk presses, curls, braids, and locs so hair stays glossy.',
      thumbSrc: '/uploads/luminele/product-feature-07.webp',
      thumbAlt: 'Soft satin lining detail',
    },
    {
      title: 'Fit & sizing',
      body: 'Roomy silhouette fits curls, coils, braids, and bum‑length hair. Comfort band stretches to 24"+ with a secure, no‑crease seal. 5★ customer: “Super long hair past my butt… hair stays bone dry and the band fits snug.”',
      thumbSrc: '/uploads/luminele/product-feature-04.webp',
      thumbAlt: 'Comfort band detail',
    },
    {
      title: 'Adjustable & fresh',
      body: 'Plush band flexes without denting edges; deep crown tucks volume easily. Air‑dries fast to stay odor‑free—keep it in the pouch between uses.',
      thumbSrc: '/uploads/luminele/product-feature-06.webp',
      thumbAlt: 'Cap depth and stretch',
    },
  ],
  reviews: [
    { author: 'Amelia', stars: 5, title: 'Zero frizz', body: 'Finally a cap that actually works.' },
    { author: 'Beth', stars: 5, title: 'So comfy', body: 'No marks on my forehead and looks cute.' },
    { author: 'Cara', stars: 5, title: 'Worth it', body: 'Saved my blowout more than once.' },
    { author: 'Danielle', stars: 5, title: 'Blowout saver', body: 'Stayed smooth after a long, steamy shower.' },
    { author: 'Ella', stars: 4.5, title: 'Soft band', body: 'No dents and super gentle on edges.' },
    { author: 'Fiona', stars: 5, title: 'Looks luxe', body: 'Finally a cap I’m not embarrassed to wear.' },
    { author: 'Grace', stars: 5, title: 'Curl friendly', body: 'Fits over braids without tugging.' },
    { author: 'Hana', stars: 4.8, title: 'Travel staple', body: 'Packs flat and keeps styles intact on trips.' },
    { author: 'Isla', stars: 5, title: 'Steam proof', body: 'Tested in a sauna shower—no puffiness.' },
    { author: 'Jade', stars: 4.9, title: 'Satin smooth', body: 'Interior feels like a silk pillowcase.' },
    { author: 'Kara', stars: 5, title: 'Stretch fit', body: 'Roomy enough for rollers and still sealed.' },
    { author: 'Lena', stars: 5, title: 'Worth the upgrade', body: 'Feels premium compared to plastic caps.' },
    { author: 'Mara', stars: 4.7, title: 'Holds up', body: 'Using daily for weeks—still perfect.' },
    { author: 'Nia', stars: 5, title: 'Edge-safe', body: 'No rubbing on baby hairs.' },
    { author: 'Opal', stars: 5, title: 'Great gift', body: 'Bought for my mom—she loves it.' },
    { author: 'Priya', stars: 4.8, title: 'Cute design', body: 'Functional and actually stylish.' },
    { author: 'Quinn', stars: 5, title: 'Frizz free', body: 'Hair stays shiny even on wash day.' },
  ],
  pdpTeaser: {
    title: 'Lumelle Shower Cap',
    subtitle: 'Creator-loved protection for every style',
    description:
      'Dual-layer satin with a waterproof core keeps silk presses, curls, and braids flawless through every steamy shower.',
    rating: 4.9,
    reviews: 1240,
    pills: ['No-frizz seal', 'Luxury feel', 'Reusable + eco'],
    price: '£14.99 (was £19.99)',
    bullets: [
      'Reusable waterproof',
      'Satin lined',
      'Large wide shower cap',
      'Adjustable',
    ],
    image: '/uploads/luminele/page9-image.webp',
    href: '/product/lumelle-shower-cap',
    ctaLabel: 'Shop the cap',
  },
  faq: [
    {
      q: 'Will it fit my hair?',
      a: "Customer review · 5★: I’ve never bothered with shower caps as I have super long hair that goes past my butt so my hair would always get wet and wouldn’t fit. This shower cap is perfect – my hair stays bone dry, it fits with plenty of room and the band fits snug around the head. 10/10 worth the price!",
    },
    {
      q: 'Is it fully waterproof?',
      a: 'Yes, the durable waterproof outer shell shields hair from moisture and humidity.',
    },
    {
      q: 'How do I wash it?',
      a: 'Hand wash the shower cap in lukewarm water with mild soap, gently clean the satin lining, rinse well, and air-dry only. Avoid machine washing, tumble drying, or heat to keep the waterproof layer and satin in good condition.',
    },
    {
      q: 'What’s the return policy?',
      a: '30-day Luxe Guarantee with easy exchanges or returns.',
    },
  ],
  stats: [
    { value: '4.9★', label: 'Average rating', helper: '10k+ trusted shoppers' },
    { value: '48 hrs', label: 'Dispatch time', helper: 'Ships fast from UK' },
    { value: 'Proven', label: 'Protects hair', helper: 'Creator-tested frizz defense' },
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
    ctaHref: '/product/lumelle-shower-cap',
  },
  mainCreatorClip: {
    eyebrow: 'From Lumelle HQ',
    title: 'Our studio lead sets the tone',
    description: 'Go behind the scenes with the core Lumelle creator as she maps out look-book shots and scripts that everyone in the program riffs on.',
    stat: 'Shot inside the Lumelle content studio',
    image: '/uploads/luminele/product-main.webp',
    imageAlt: 'Lumelle studio lead planning a shoot with the signature cap',
    ctaLabel: 'See the full brief',
    ctaHref: '/affiliates',
  },
}

