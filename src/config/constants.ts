export const WHATSAPP_INVITE_URL =
  import.meta.env.VITE_WHATSAPP_INVITE_URL ??
  'https://chat.whatsapp.com/DDxJHZzpW003WZhayKJnWd'

export const WHATSAPP_SUPPORT_URL =
  import.meta.env.VITE_WHATSAPP_SUPPORT_URL ??
  'https://wa.me/message/lumellecaps'

export const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL ??
  'https://www.instagram.com/lumelleuk/'

export const TIKTOK_URL =
  import.meta.env.VITE_TIKTOK_URL ??
  'https://www.tiktok.com/@lumelleuk'

export const TWITTER_URL =
  import.meta.env.VITE_TWITTER_URL ??
  'https://x.com'

// Client-requested public contact email for footer and CTAs
export const SUPPORT_EMAIL = 'info@lumellebeauty.co.uk'

// Link to the creator content brief shared in welcome/onboarding flows
export const CONTENT_BRIEF_PDF_URL = import.meta.env.VITE_CONTENT_BRIEF_URL?.trim() || null
export const CONTENT_BRIEF_URL = CONTENT_BRIEF_PDF_URL ?? '/brief'

// Storefront pricing/shipping constants
export const FREE_SHIPPING_THRESHOLD_GBP = 20
export const FREE_SHIPPING_THRESHOLD_LABEL = `£${FREE_SHIPPING_THRESHOLD_GBP}+`

// Client requested: cap per-line quantity in cart/checkout flows.
export const MAX_CART_ITEM_QTY = 4
