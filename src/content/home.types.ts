// Shared landing page types (extracted from legacy home.config)
export type Review = {
  author: string
  stars: number
  title: string
  body: string
  image?: string
  date?: string
  source?: string
}

type MainCreatorClip = {
  eyebrow?: string
  title: string
  description: string
  stat?: string
  image: string
  imageAlt: string
  ctaLabel?: string
  ctaHref?: string
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
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
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
  pdpTeasers?: HomeConfig['pdpTeaser'][]
  faq: { q: string; a: string }[]
  stats: { value: string; label: string; helper?: string }[]
  comparison: { feature: string; lumelle: string; other: string }[]
  finalCta: { headline: string; subhead: string; bullets: string[]; ctaLabel: string; ctaHref: string }
  mainCreatorClip: MainCreatorClip
}
