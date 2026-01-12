import type { CheckoutPort } from '@platform/commerce/ports'
import { requestJson } from '@platform/http/internal-api/client'
import { decodeCartKey } from './keys'
import { __internalShopifyCartKeyStorage } from './cart'

type ShopifyCart = {
  id: string
  checkoutUrl: string
}

const toFirstPartyHandoffUrl = (checkoutUrl: string) => {
  try {
    const u = new URL(checkoutUrl)
    // In development, use the original checkout URL (Shopify domain)
    // In production, use first-party proxy/handoff URLs
    const isDevelopment = import.meta.env.DEV
    if (isDevelopment) {
      return checkoutUrl
    }
    return `${window.location.origin}${u.pathname}${u.search}${u.hash}`
  } catch {
    return checkoutUrl
  }
}

export const createShopifyCheckoutPort = (): CheckoutPort => {
  return {
    getCapabilities() {
      return {
        mode: 'redirect',
        providerLabel: 'Secure checkout',
        supportsDiscounts: true,
        supportsBuyerIdentity: true,
        handoff: { routes: ['/cart/c/*', '/checkouts/*'] },
      }
    },

    async beginCheckout() {
      console.log('[🔍 CHECKOUT-DIAGNOSTIC] beginCheckout called')
      const stored = __internalShopifyCartKeyStorage.getStoredCartKey()
      console.log('[🔍 CHECKOUT-DIAGNOSTIC] Stored cart key', { stored })
      if (!stored) {
        console.log('[🔍 CHECKOUT-DIAGNOSTIC] No cart exists')
        return { mode: 'none', reason: 'No cart exists' }
      }

      const rawCartId = decodeCartKey(stored)
      console.log('[🔍 CHECKOUT-DIAGNOSTIC] Fetching cart', { rawCartId })
      const data = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/fetch?id=${encodeURIComponent(rawCartId)}`)
      const checkoutUrl = data.cart.checkoutUrl
      console.log('[🔍 CHECKOUT-DIAGNOSTIC] Shopify cart checkout URL', { checkoutUrl })

      // Default policy: prefer first-party proxy/handoff URLs when possible.
      const url = typeof window !== 'undefined' ? toFirstPartyHandoffUrl(checkoutUrl) : checkoutUrl
      console.log('[🔍 CHECKOUT-DIAGNOSTIC] Final checkout URL (after handoff transformation)', { url })
      return { mode: 'redirect', url }
    },
  }
}
