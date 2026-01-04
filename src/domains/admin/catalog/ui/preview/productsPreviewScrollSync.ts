export const PRODUCTS_PREVIEW_TO_EDITOR_SECTION = {
  // Hero (granular)
  'pdp-hero': 'admin-editor-hero',
  'pdp-hero-gallery': 'admin-editor-hero-gallery',
  'pdp-hero-text': 'admin-editor-hero-text',
  'pdp-hero-reviews': 'admin-editor-hero-price-reviews',
  'pdp-hero-price': 'admin-editor-hero-price-reviews',
  'pdp-hero-badge': 'admin-editor-hero-badge',

  // Mid sections
  'pdp-sign': 'admin-editor-sign',
  'pdp-sign-step-1': 'admin-editor-sign-bullet-1',
  'pdp-sign-step-2': 'admin-editor-sign-bullet-2',
  'pdp-sign-step-3': 'admin-editor-sign-bullet-3',
  'pdp-care-section': 'admin-editor-care',
  'pdp-care-item-1': 'admin-editor-care-bullet-1',
  'pdp-care-item-2': 'admin-editor-care-bullet-2',
  'pdp-care-item-3': 'admin-editor-care-bullet-3',
  'pdp-proof': 'admin-editor-proof',
  'pdp-proof-item-1': 'admin-editor-proof-item-1',
  'pdp-proof-item-2': 'admin-editor-proof-item-2',
  'pdp-proof-item-3': 'admin-editor-proof-item-3',

  // Why you’ll love it (granular)
  details: 'admin-editor-details-heading',
  'details-heading': 'admin-editor-details-heading',
  'details-media': 'admin-editor-details-tiktok',
  'details-item-1': 'admin-editor-benefits-bullet-1',
  'details-item-2': 'admin-editor-benefits-bullet-2',
  'details-item-3': 'admin-editor-benefits-bullet-3',
  'details-item-4': 'admin-editor-benefits-bullet-4',
  'details-pills': 'admin-editor-details-pills',

  // Other sections
  reviews: 'admin-editor-hero-price-reviews',
  tiktok: 'admin-editor-featured-tiktok',
  essentials: 'admin-editor-essentials',
  'essentials-heading': 'admin-editor-essentials',
  'essentials-item-1': 'admin-editor-essentials-item-1',
  'essentials-item-2': 'admin-editor-essentials-item-2',
  'essentials-item-3': 'admin-editor-essentials-item-3',
  'essentials-item-4': 'admin-editor-essentials-item-4',
  faq: 'admin-editor-faq',
  'faq-item-1': 'admin-editor-faq-item-1',
  'faq-item-2': 'admin-editor-faq-item-2',
  'faq-item-3': 'admin-editor-faq-item-3',
  'faq-item-4': 'admin-editor-faq-item-4',

  // Bottom CTA (no dedicated editor yet)
  'pdp-bottom-cta': 'admin-editor-faq',
  'pdp-bottom-cta-add': 'admin-editor-faq',
  'pdp-bottom-cta-buy': 'admin-editor-faq',
} as const satisfies Record<string, string>

export const PRODUCTS_EDITOR_TO_PREVIEW_SECTION = {
  // Hero
  'admin-editor-hero': 'pdp-hero',
  'admin-editor-hero-badge': 'pdp-hero-badge',
  'admin-editor-hero-gallery': 'pdp-hero-gallery',
  'admin-editor-hero-text': 'pdp-hero-text',
  'admin-editor-hero-price-reviews': 'pdp-hero-price',

  // Mid sections
  'admin-editor-sign': 'pdp-sign',
  'admin-editor-sign-bullet-1': 'pdp-sign-step-1',
  'admin-editor-sign-bullet-2': 'pdp-sign-step-2',
  'admin-editor-sign-bullet-3': 'pdp-sign-step-3',
  'admin-editor-care': 'pdp-care-section',
  'admin-editor-care-bullet-1': 'pdp-care-item-1',
  'admin-editor-care-bullet-2': 'pdp-care-item-2',
  'admin-editor-care-bullet-3': 'pdp-care-item-3',
  'admin-editor-proof': 'pdp-proof',
  'admin-editor-proof-item-1': 'pdp-proof-item-1',
  'admin-editor-proof-item-2': 'pdp-proof-item-2',
  'admin-editor-proof-item-3': 'pdp-proof-item-3',

  // Why you’ll love it
  'admin-editor-details': 'details',
  'admin-editor-details-heading': 'details-heading',
  'admin-editor-details-tiktok': 'details-media',
  'admin-editor-details-pills': 'details-pills',

  // Other sections
  'admin-editor-essentials': 'essentials',
  'admin-editor-essentials-item-1': 'essentials-item-1',
  'admin-editor-essentials-item-2': 'essentials-item-2',
  'admin-editor-essentials-item-3': 'essentials-item-3',
  'admin-editor-essentials-item-4': 'essentials-item-4',
  'admin-editor-featured-tiktok': 'tiktok',
  'admin-editor-faq': 'faq',
  'admin-editor-faq-item-1': 'faq-item-1',
  'admin-editor-faq-item-2': 'faq-item-2',
  'admin-editor-faq-item-3': 'faq-item-3',
  'admin-editor-faq-item-4': 'faq-item-4',
  'admin-editor-benefits': 'details',
  'admin-editor-benefits-bullet-1': 'details-item-1',
  'admin-editor-benefits-bullet-2': 'details-item-2',
  'admin-editor-benefits-bullet-3': 'details-item-3',
  'admin-editor-benefits-bullet-4': 'details-item-4',
} as const satisfies Record<string, string>

// Ordered ids for editor scrollspy (used to pick "active" editor anchor).
export const PRODUCTS_EDITOR_SCROLL_SECTION_IDS = [
  // Hero section
  'admin-editor-hero',
  'admin-editor-hero-badge',
  'admin-editor-hero-gallery',
  'admin-editor-hero-text',
  'admin-editor-hero-price-reviews',

  // Mid sections
  'admin-editor-sign',
  'admin-editor-sign-bullet-1',
  'admin-editor-sign-bullet-2',
  'admin-editor-sign-bullet-3',
  'admin-editor-care',
  'admin-editor-care-bullet-1',
  'admin-editor-care-bullet-2',
  'admin-editor-care-bullet-3',
  'admin-editor-proof',
  'admin-editor-proof-item-1',
  'admin-editor-proof-item-2',
  'admin-editor-proof-item-3',

  // Why you’ll love it (subcards)
  'admin-editor-details',
  'admin-editor-details-heading',
  'admin-editor-details-tiktok',
  'admin-editor-details-pills',

  // Other sections
  'admin-editor-benefits',
  'admin-editor-benefits-bullet-1',
  'admin-editor-benefits-bullet-2',
  'admin-editor-benefits-bullet-3',
  'admin-editor-benefits-bullet-4',
  'admin-editor-essentials',
  'admin-editor-essentials-item-1',
  'admin-editor-essentials-item-2',
  'admin-editor-essentials-item-3',
  'admin-editor-essentials-item-4',
  'admin-editor-featured-tiktok',
  'admin-editor-faq',
  'admin-editor-faq-item-1',
  'admin-editor-faq-item-2',
  'admin-editor-faq-item-3',
  'admin-editor-faq-item-4',
] as const
