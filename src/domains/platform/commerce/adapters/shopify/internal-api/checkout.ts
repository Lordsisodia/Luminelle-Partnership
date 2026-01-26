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

    // Determine the base URL to use for checkout
    // In dev with APP_URL set, use the tunnel URL
    // In production, use the current origin
    let baseUrl = window.location.origin

    const isDevelopment = import.meta.env.DEV
    if (isDevelopment) {
      // Try to get APP_URL from window.env for development tunnel
      const appUrl = (window as any).APP_URL || import.meta.env.VITE_APP_URL || import.meta.env.APP_URL
      if (appUrl) {
        baseUrl = appUrl
        console.log('[Checkout] Dev mode: using APP_URL tunnel', { appUrl })
      } else {
        console.log('[Checkout] Dev mode: using Shopify domain directly (no APP_URL set)', { url: checkoutUrl })
        return checkoutUrl
      }
    }

    const transformed = `${baseUrl}${u.pathname}${u.search}${u.hash}`
    console.log('[Checkout URL Transform]', {
      original: checkoutUrl,
      transformed,
      hostname: u.hostname,
      baseUrl,
    })
    return transformed
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
      const stored = __internalShopifyCartKeyStorage.getStoredCartKey()
      if (!stored) {
        return { mode: 'none', reason: 'No cart exists' }
      }

      const rawCartId = decodeCartKey(stored)
      const data = await requestJson<{ cart: ShopifyCart }>(`/api/storefront/cart/fetch?id=${encodeURIComponent(rawCartId)}`)
      const checkoutUrl = data.cart.checkoutUrl

      // Default policy: prefer first-party proxy/handoff URLs when possible.
      const url = typeof window !== 'undefined' ? toFirstPartyHandoffUrl(checkoutUrl) : checkoutUrl
      return { mode: 'redirect', url }
    },
  }
}
