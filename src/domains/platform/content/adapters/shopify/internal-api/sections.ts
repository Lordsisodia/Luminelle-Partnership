import type { ContentPort, SectionsDTO } from '@platform/content/ports'
import { requestJson } from '@platform/http/internal-api/client'

export const createShopifyLandingSectionsPort = (): ContentPort => {
  return {
    async getLandingSections(): Promise<SectionsDTO> {
      const data = await requestJson<{ sections: SectionsDTO }>(`/api/storefront/landing/sections`)
      return data.sections
    },
  }
}
