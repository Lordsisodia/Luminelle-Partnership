export const STRIPE_ALLOWED_SOURCES = new Set([
  'lumelle.account.payments.dev',
  'lumelle.checkout.dev',
  'lumelle.checkout.prod',
])

export const coerceStripeSource = (raw: unknown): string => {
  const source = typeof raw === 'string' ? raw.trim() : ''
  return STRIPE_ALLOWED_SOURCES.has(source) ? source : 'lumelle.account.payments.dev'
}

