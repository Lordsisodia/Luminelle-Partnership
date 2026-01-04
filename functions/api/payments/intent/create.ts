import type { PagesFunction } from '../../../_lib/types'
import { json, methodNotAllowed } from '../../../_lib/response'
import { coerceStripeSource } from '../../../_lib/payments/stripe'

type CreatePaymentIntentBody = {
  amount?: { amount: number; currencyCode: string }
  reference?: string
  metadata?: Record<string, string>
  source?: string
}

const currencyExponent = (currencyCode: string): number => {
  const c = currencyCode.trim().toUpperCase()
  // Minimal set; extend as needed.
  if (c === 'JPY') return 0
  return 2
}

const toMinorUnits = (major: number, currencyCode: string): number => {
  const exp = currencyExponent(currencyCode)
  const factor = 10 ** exp
  return Math.round(major * factor)
}

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])

  if (!env.STRIPE_SECRET_KEY) {
    // The shared internal-api client maps 500 + "not configured" language to PortError('NOT_CONFIGURED').
    return json({ error: 'Stripe is not configured (missing STRIPE_SECRET_KEY).' }, { status: 500 })
  }

  const body = (await request.json().catch(() => null)) as CreatePaymentIntentBody | null
  const currency = body?.amount?.currencyCode
  const amount = body?.amount?.amount

  if (!currency || typeof currency !== 'string' || !currency.trim()) {
    return json({ error: 'Invalid input: amount.currencyCode is required.' }, { status: 400 })
  }
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
    return json({ error: 'Invalid input: amount.amount must be a positive number.' }, { status: 400 })
  }

  const minor = toMinorUnits(amount, currency)
  if (!Number.isFinite(minor) || minor <= 0) {
    return json({ error: 'Invalid input: amount.amount must map to a positive minor-unit amount.' }, { status: 400 })
  }

  const params = new URLSearchParams()
  params.set('amount', String(minor))
  params.set('currency', currency.trim().toLowerCase())
  params.set('automatic_payment_methods[enabled]', 'true')

  if (body?.reference) {
    params.set('metadata[reference]', String(body.reference).slice(0, 200))
  }

  // Stable non-PII tag for Stripe Dashboard filtering.
  params.set('metadata[source]', coerceStripeSource(body?.source))

  if (body?.metadata && typeof body.metadata === 'object') {
    for (const [key, value] of Object.entries(body.metadata)) {
      if (!key) continue
      if (typeof value !== 'string') continue
      params.set(`metadata[${key.slice(0, 40)}]`, value.slice(0, 500))
    }
  }

  // If a run id is provided by the client, keep it visible in Stripe Dashboard for correlation.
  // Only accept a tight format to avoid unexpected metadata keys/values.
  const runId = typeof body?.metadata?.run_id === 'string' ? body.metadata.run_id.trim() : ''
  if (runId && /^[a-z0-9]{4,12}$/i.test(runId)) {
    params.set('metadata[run_id]', runId)
  }

  const res = await fetch('https://api.stripe.com/v1/payment_intents', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  })

  const raw = await res.text().catch(() => '')
  if (!res.ok) {
    // Surface as 502 to distinguish upstream failure from our own validation/config.
    return json({ error: raw || `Stripe ${res.status}` }, { status: 502 })
  }

  const stripeJson = raw ? (JSON.parse(raw) as any) : null
  const clientSecret = stripeJson?.client_secret
  if (!clientSecret || typeof clientSecret !== 'string') {
    return json({ error: 'Stripe response missing client_secret.' }, { status: 502 })
  }

  return json({ mode: 'embedded', clientSecret })
}
