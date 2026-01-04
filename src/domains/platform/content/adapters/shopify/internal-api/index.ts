import type { ContentPort } from '@platform/content/ports'
import { createShopifyLandingSectionsPort } from './sections'

export type ShopifyContentAdapter = {
  sections: ContentPort
}

export const createShopifyContentAdapter = (): ShopifyContentAdapter => {
  return { sections: createShopifyLandingSectionsPort() }
}

