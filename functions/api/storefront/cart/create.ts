import type { PagesFunction } from '../../../_lib/types'
import { CART_FRAGMENT, runStorefront } from '../../../_lib/storefront'
import { json, methodNotAllowed } from '../../../_lib/response'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])
  const body = await request.json().catch(() => ({} as any))
  const lines = body.merchandiseId ? [{ merchandiseId: body.merchandiseId, quantity: body.quantity ?? 1 }] : []
  const data = await runStorefront<any>(
    env,
    `#graphql
      mutation CartCreate($lines:[CartLineInput!]) {
        cartCreate(input:{ lines:$lines }) { cart { ...CartFields } }
      }
      ${CART_FRAGMENT}
    `,
    { lines },
  )
  return json({ cart: data.cartCreate.cart })
}

