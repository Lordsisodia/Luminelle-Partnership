export type Product = {
  id: string
  title: string
  description: string
  price: { amount: number; currencyCode?: string }
  images: string[]
  variantId: string
}

export const fetchProduct = async (id: string): Promise<Product> => ({
  id,
  title: 'Stub product',
  description: 'Placeholder description',
  price: { amount: 0, currencyCode: 'GBP' },
  images: ['/uploads/luminele/product-main.jpg'],
  variantId: id,
})

export const fetchProductByHandle = async (handle: string) => fetchProduct(handle)
