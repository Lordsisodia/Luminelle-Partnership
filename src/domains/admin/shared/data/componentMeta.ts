import { FREE_SHIPPING_THRESHOLD_LABEL, INSTAGRAM_URL, SUPPORT_EMAIL, TIKTOK_URL } from '@/config/constants'

export type ComponentKey =
  | 'promo'
  | 'header'
  | 'nav-public'
  | 'nav-admin'
  | 'footer'
  | 'spin-wheel'
  | 'announcement'
  | 'cta-ribbon'
  | 'trust-strip'
  | 'newsletter-modal'

export type ComponentMeta = {
  key: ComponentKey
  name: string
  description: string
  usedOn: string[]
  category: 'Core' | 'Content' | 'Promos' | 'Admin'
}

export type PromoConfig = {
  messages: { label: string; href?: string }[]
  activeIndex: number
  intervalMs: number
  colors: { bg: string; fg: string }
}

export type HeaderConfig = {
  subtitle: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel?: string
  secondaryHref?: string
  logoText: string
  accountButton: boolean
}

export type NavItemConfig = {
  label: string
  href: string
  icon: string
  badge?: string
  hidden?: boolean
}

export type NavConfig = {
  sections: { label: string; items: NavItemConfig[] }[]
}

export type FooterConfig = {
  headline: string
  body: string
  supportEmail: string
  badges: string[]
  links: { label: string; href: string }[]
  socials: { label: string; href: string; icon: string }[]
  newsletter: { subject: string; body: string }
}

export type SpinWheelConfig = {
  headline: string
  subhead: string
  ctaLabel: string
  ctaHref: string
  slices: { label: string; probability: number; prize: string }[]
  appearance: { background: string; accent: string }
  behavior: {
    cooldownHours: number
    entryLimit: number
    success: string
    failure: string
  }
  triggers: {
    autoOpen: boolean
    delayMs: number
    exitIntent: boolean
  }
}

export type AnnouncementConfig = {
  message: string
  severity: 'info' | 'warn' | 'error'
  ctaLabel?: string
  ctaHref?: string
  dismissible: boolean
}

export type CtaRibbonConfig = {
  headline: string
  subtext?: string
  ctaLabel: string
  ctaHref: string
  showOn: 'all' | 'pdp' | 'cart' | 'landing'
}

export type TrustStripConfig = {
  badges: { label: string; icon?: string; tooltip?: string }[]
  background: string
}

export type NewsletterModalConfig = {
  headline: string
  body: string
  placeholder: string
  consent: string
  ctaLabel: string
  success: string
  trigger: { afterSeconds: number; exitIntent: boolean }
}

export const componentMetaList: ComponentMeta[] = [
  {
    key: 'promo',
    name: 'Promo Bar',
    description: 'Rotating strip at the top of the site with quick promos.',
    usedOn: ['All public pages'],
    category: 'Content',
  },
  {
    key: 'header',
    name: 'Public Header',
    description: 'Top navigation: logo, CTAs, and account affordance.',
    usedOn: ['All public pages'],
    category: 'Content',
  },
  {
    key: 'nav-public',
    name: 'Drawer Nav (Public)',
    description: 'Mobile drawer navigation for shoppers.',
    usedOn: ['All public pages (mobile drawer)'],
    category: 'Content',
  },
  {
    key: 'nav-admin',
    name: 'Admin Nav',
    description: 'Sidebar navigation inside the admin console.',
    usedOn: ['Admin console'],
    category: 'Admin',
  },
  {
    key: 'footer',
    name: 'Footer',
    description: 'Global footer: support email, links, socials, newsletter.',
    usedOn: ['All public pages', 'Admin shell'],
    category: 'Core',
  },
  {
    key: 'spin-wheel',
    name: 'Spin the Wheel',
    description: 'Giveaway/discount wheel modal trigger and odds.',
    usedOn: ['Marketing promos (modal)'],
    category: 'Promos',
  },
  {
    key: 'announcement',
    name: 'Announcement Banner',
    description: 'Site-wide alert for shipping delays, cutoffs, or notices.',
    usedOn: ['All pages'],
    category: 'Core',
  },
  {
    key: 'cta-ribbon',
    name: 'Global CTA Ribbon',
    description: 'Bottom sticky ribbon for perks, promos, or referral pushes.',
    usedOn: ['All pages (rules-based)'],
    category: 'Promos',
  },
  {
    key: 'trust-strip',
    name: 'Trust Strip',
    description: 'Payment/shipping confidence badges used across surfaces.',
    usedOn: ['PDP', 'Cart', 'Drawer'],
    category: 'Core',
  },
  {
    key: 'newsletter-modal',
    name: 'Newsletter Modal',
    description: 'Lead-capture modal with consent text and triggers.',
    usedOn: ['All pages (timed/exit intent)'],
    category: 'Promos',
  },
]

export const componentDefaults: Record<ComponentKey, unknown> = {
  promo: {
    messages: [
      { label: `Free shipping ${FREE_SHIPPING_THRESHOLD_LABEL}` },
      { label: '30-day money back guarantee' },
      { label: 'Buy 2, save 10% — Shop now', href: '/product/shower-cap' },
    ],
    activeIndex: 0,
    intervalMs: 5000,
    colors: { bg: '#f5d8cf', fg: '#2f1b16' },
  } satisfies PromoConfig,
  header: {
    subtitle: 'Creator-loved shower caps',
    primaryLabel: 'Join WhatsApp',
    primaryHref: '/creators',
    secondaryLabel: 'Shop now',
    secondaryHref: '/product/lumelle-shower-cap',
    logoText: 'Lumelle',
    accountButton: true,
  } satisfies HeaderConfig,
  'nav-public': {
    sections: [
      {
        label: 'Shop',
        items: [
          { label: 'Shower cap', href: '/product/lumelle-shower-cap', icon: 'capsule' },
          { label: 'Heatless curler', href: '/product/satin-overnight-curler', icon: 'sparkles' },
          { label: 'Bundles', href: '/search?q=bundle', icon: 'grid' },
        ],
      },
      {
        label: 'Content',
        items: [
          { label: 'Creators', href: '/creators', icon: 'users' },
          { label: 'Blog', href: '/blog', icon: 'pen' },
        ],
      },
    ],
  } satisfies NavConfig,
  'nav-admin': {
    sections: [
      {
        label: 'Core',
        items: [
          { label: 'Dashboard', href: '/admin', icon: 'layout' },
        ],
      },
      {
        label: 'Content',
        items: [
          { label: 'Products', href: '/admin/products', icon: 'boxes' },
          { label: 'Pages', href: '/admin/pages', icon: 'file' },
          { label: 'Components', href: '/admin/components', icon: 'panels' },
          { label: 'Media', href: '/admin/media', icon: 'image' },
          { label: 'Blogs', href: '/admin/blogs', icon: 'pen' },
        ],
      },
      {
        label: 'Tools',
        items: [
          { label: 'Analytics', href: '/admin/analytics', icon: 'chart' },
          { label: 'Activity', href: '/admin/activity', icon: 'history' },
        ],
      },
    ],
  } satisfies NavConfig,
  footer: {
    headline: 'Lumelle',
    body: 'Creator-grade shower caps that keep silk presses, curls, and braids flawless on camera.',
    supportEmail: SUPPORT_EMAIL,
    badges: ['Made in UK', '30-day returns'],
    links: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Creators', href: '/creators' },
    ],
    socials: [
      { label: 'Instagram', href: INSTAGRAM_URL, icon: 'instagram' },
      { label: 'TikTok', href: TIKTOK_URL, icon: 'tiktok' },
    ],
    newsletter: { subject: 'Join Lumelle List', body: 'Sign me up for launches and tips.' },
  } satisfies FooterConfig,
  'spin-wheel': {
    headline: 'Spin to win',
    subhead: 'Try your luck for exclusive discounts.',
    ctaLabel: 'Spin now',
    ctaHref: '#',
    slices: [
      { label: '10% off', probability: 40, prize: '10% discount code' },
      { label: '15% off', probability: 25, prize: '15% discount code' },
      { label: 'Free shipping', probability: 20, prize: 'Free UK shipping' },
      { label: 'No luck', probability: 15, prize: 'Try again soon' },
    ],
    appearance: { background: '#fef7f4', accent: '#bb7d6d' },
    behavior: {
      cooldownHours: 24,
      entryLimit: 2,
      success: 'Nice! Code sent to your email.',
      failure: 'Almost! Try again later.',
    },
    triggers: { autoOpen: false, delayMs: 0, exitIntent: true },
  } satisfies SpinWheelConfig,
  announcement: {
    message: 'Holiday shipping cut-off: Order by Dec 20 for delivery.',
    severity: 'warn',
    ctaLabel: 'View details',
    ctaHref: '/terms#shipping',
    dismissible: true,
  } satisfies AnnouncementConfig,
  'cta-ribbon': {
    headline: 'Free gift on orders over £30',
    subtext: 'Automatically added at checkout while supplies last.',
    ctaLabel: 'Shop bestsellers',
    ctaHref: '/product/lumelle-shower-cap',
    showOn: 'all',
  } satisfies CtaRibbonConfig,
  'trust-strip': {
    badges: [
      { label: '30-day returns', icon: 'shield' },
      { label: 'Secure checkout', icon: 'lock' },
      { label: '4.9★ 10k+ reviews', icon: 'star' },
    ],
    background: '#fff7f3',
  } satisfies TrustStripConfig,
  'newsletter-modal': {
    headline: 'Get launches & limited drops',
    body: 'Join the list for early access to creators-only releases.',
    placeholder: 'you@example.com',
    consent: 'I agree to receive emails and can opt out anytime.',
    ctaLabel: 'Join list',
    success: 'Thanks! Check your inbox for a welcome note.',
    trigger: { afterSeconds: 12, exitIntent: true },
  } satisfies NewsletterModalConfig,
}

export const iconWhitelist = ['layout', 'boxes', 'file', 'panels', 'image', 'chart', 'history', 'capsule', 'sparkles', 'grid', 'users', 'pen'] as const

export const socialIconWhitelist = ['instagram', 'tiktok', 'youtube', 'twitter'] as const

export function getComponentMeta(key: ComponentKey) {
  return componentMetaList.find((item) => item.key === key)
}
