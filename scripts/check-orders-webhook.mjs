import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

function normalizeBaseUrl(input) {
  const url = String(input || '').trim()
  if (!url) return null
  return url.replace(/\/+$/, '')
}

function parseArgs(argv) {
  const args = new Map()
  for (const raw of argv) {
    const m = raw.match(/^--([^=]+)=(.*)$/)
    if (m) args.set(m[1], m[2])
    else if (raw.startsWith('--')) args.set(raw.slice(2), true)
  }
  return args
}

const args = parseArgs(process.argv.slice(2))

const appUrl = normalizeBaseUrl(args.get('url') || process.env.SHOPIFY_APP_URL || process.env.APP_URL)
const shopDomain = process.env.SHOPIFY_STORE_DOMAIN
const apiSecret = process.env.SHOPIFY_API_SECRET
const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET

if (!appUrl) {
  console.error('Missing app URL. Set SHOPIFY_APP_URL (preferred) / APP_URL, or pass `--url=https://...`.')
  process.exit(1)
}
if (!shopDomain) {
  console.error('Missing SHOPIFY_STORE_DOMAIN in .env.')
  process.exit(1)
}
if (!apiSecret) {
  console.error('Missing SHOPIFY_API_SECRET in .env.')
  process.exit(1)
}

const endpoint = `${appUrl}/api/shopify/webhooks/orders-create`

const payload = JSON.stringify({
  id: 9999990001,
  name: '#HMAC-TEST',
  currency: 'GBP',
  total_price: '0.00',
  processed_at: new Date().toISOString(),
  line_items: [],
})

function sign(secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64')
}

async function send(label, secret) {
  const hmac = sign(secret)
  const deliveryId = `hmac-test-${label}-${Date.now()}`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Topic': 'orders/create',
      'X-Shopify-Shop-Domain': shopDomain,
      'X-Shopify-Delivery-Id': deliveryId,
      'X-Shopify-Hmac-Sha256': hmac,
    },
    body: payload,
  })

  const text = await res.text()
  console.log(`${label}: ${res.status} ${res.statusText} — ${text.trim()}`)
}

console.log(`Target: ${endpoint}`)
await send('SHOPIFY_API_SECRET', apiSecret)

if (webhookSecret && webhookSecret !== apiSecret) {
  await send('SHOPIFY_WEBHOOK_SECRET', webhookSecret)
} else if (webhookSecret) {
  console.log('SHOPIFY_WEBHOOK_SECRET is identical to SHOPIFY_API_SECRET (skipping duplicate check).')
} else {
  console.log('SHOPIFY_WEBHOOK_SECRET is not set (ok if your deployment verifies with SHOPIFY_API_SECRET).')
}

