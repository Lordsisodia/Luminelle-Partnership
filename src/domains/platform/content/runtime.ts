import { env } from '@/utils/env'
import { PortError } from '@platform/ports'
import type { ContentPort } from './ports'
import { createShopifyContentAdapter } from './adapters/shopify/internal-api'

type ContentRuntime = {
  sections: ContentPort
}

const isDev = () => import.meta.env.DEV

const isShopifyConfigured = () => {
  const domain = env('SHOPIFY_STORE_DOMAIN')
  return Boolean(domain)
}

const shouldUseRealContentInDev = () => env('USE_REAL_CONTENT') === 'true'

const createMockContent = (): ContentRuntime => {
  const sections: ContentPort = {
    async getLandingSections() {
      return {
        schemaVersion: 'mock.v1',
        heroSubtitle: 'Mock content adapter (dev only).',
        essentials: [],
        reasons: [],
        how: [],
        care: [],
        faq: [],
        gallery: [],
      }
    },
  }

  return { sections }
}

const createDisabledContent = (code: 'NOT_CONFIGURED' | 'UNAVAILABLE', message: string): ContentRuntime => {
  const sections: ContentPort = {
    async getLandingSections() {
      throw new PortError(code, message)
    },
  }
  return { sections }
}

export const createContent = (): ContentRuntime => {
  const configured = isShopifyConfigured()

  if (!configured) {
    if (isDev()) return createMockContent()
    return createDisabledContent(
      'NOT_CONFIGURED',
      'Content provider is not configured (missing SHOPIFY_STORE_DOMAIN).'
    )
  }

  // In dev, default to mock unless explicitly enabled (local dev often won't run Pages Functions).
  if (isDev() && !shouldUseRealContentInDev()) return createMockContent()

  const adapter = createShopifyContentAdapter()
  return { sections: adapter.sections }
}

export const content = createContent()
