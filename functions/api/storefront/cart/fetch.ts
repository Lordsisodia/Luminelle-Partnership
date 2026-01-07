import type { PagesFunction } from '../../../_lib/types'
import { CART_FRAGMENT, runStorefront, storefrontError } from '../../../_lib/storefront'
import { json, methodNotAllowed, text } from '../../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'GET') return methodNotAllowed(['GET'])
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  if (!id) return text('Missing id', { status: 400 })
  try {
    const data = await runStorefront<any>(
      env,
      `#graphql
        query Cart($id:ID!) { cart(id:$id) { ...CartFields } }
        ${CART_FRAGMENT}
      `,
      { id },
    )
    if (!data.cart) return text('Not found', { status: 404 })
    return json({ cart: data.cart })
  } catch (err) {
    console.error('[storefront/cart/fetch] failed', err)
    return storefrontError(err)
  }
}
