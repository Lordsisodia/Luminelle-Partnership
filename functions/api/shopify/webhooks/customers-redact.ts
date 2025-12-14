import type { PagesFunction } from '../../../_lib/types'
import { methodNotAllowed, text } from '../../../_lib/response'
import { verifyShopifyWebhook } from '../../../_lib/shopifyWebhooks'
import { redactShopCustomer } from '../../../_lib/shopCustomers'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])

  const { valid, body } = await verifyShopifyWebhook(request, env)
  if (!valid) return text('Invalid HMAC', { status: 401 })

  const shop =
    request.headers.get('x-shopify-shop-domain') ||
    request.headers.get('X-Shopify-Shop-Domain') ||
    body?.domain ||
    body?.shop_domain
  const customer = body?.customer || {}
  if (shop && (customer.id || customer.email)) {
    const idRaw = customer.id
    const id = typeof idRaw === 'number' ? String(Math.trunc(idRaw)) : typeof idRaw === 'string' ? idRaw : undefined
    const email = typeof customer.email === 'string' ? customer.email : undefined
    await redactShopCustomer(env, String(shop), { id, email })
  }
  return text('OK', { status: 200 })
}

