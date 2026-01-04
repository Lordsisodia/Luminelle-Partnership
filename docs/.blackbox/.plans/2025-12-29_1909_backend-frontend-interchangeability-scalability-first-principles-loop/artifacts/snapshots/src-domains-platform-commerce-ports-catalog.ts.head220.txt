import type { MoneyDTO, ProductKey, VariantKey } from '@platform/ports'

export type ProductVariantDTO = {
  variantKey: VariantKey
  title?: string
  available?: boolean
  unitPrice: MoneyDTO
  compareAt?: MoneyDTO
}

export type ProductDTO = {
  productKey: ProductKey
  handle?: string
  title: string
  description?: string
  images: string[]
  defaultVariantKey?: VariantKey
  variants: ProductVariantDTO[]
}

export interface CatalogPort {
  getProductByHandle(handle: string): Promise<ProductDTO>
}

