import { runStorefront, shopifyEnabled } from './shopify'

export type ShopifyCart = {
  id: string
  checkoutUrl: string
  lines: {
    id: string
    quantity: number
    merchandise: {
      id: string
      title: string
      product: { title: string }
      price: { amount: string; currencyCode: string }
    }
  }[]
}

const CART_FRAGMENT = `
fragment CartFields on Cart {
  id
  checkoutUrl
  lines(first: 50) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product { title }
            price: priceV2 { amount currencyCode }
          }
        }
      }
    }
  }
}
`

export async function cartCreate(merchandiseId?: string, quantity = 1): Promise<ShopifyCart> {
  if (!shopifyEnabled) throw new Error('Shopify not configured')
  const data = await runStorefront<{ cartCreate: { cart: any } }>(
    `
    mutation CartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
      }
    }
    ${CART_FRAGMENT}
  `,
    {
      lines: merchandiseId ? [{ merchandiseId, quantity }] : [],
    }
  )
  return mapCart(data.cartCreate.cart)
}

export async function cartLinesAdd(cartId: string, merchandiseId: string, quantity: number): Promise<ShopifyCart> {
  const data = await runStorefront<{ cartLinesAdd: { cart: any } }>(
    `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
    }
    ${CART_FRAGMENT}
  `,
    { cartId, lines: [{ merchandiseId, quantity }] }
  )
  return mapCart(data.cartLinesAdd.cart)
}

export async function cartLinesUpdate(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
  const data = await runStorefront<{ cartLinesUpdate: { cart: any } }>(
    `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CartFields } }
    }
    ${CART_FRAGMENT}
  `,
    { cartId, lines: [{ id: lineId, quantity }] }
  )
  return mapCart(data.cartLinesUpdate.cart)
}

export async function cartLinesRemove(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await runStorefront<{ cartLinesRemove: { cart: any } }>(
    `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...CartFields } }
    }
    ${CART_FRAGMENT}
  `,
    { cartId, lineIds }
  )
  return mapCart(data.cartLinesRemove.cart)
}

export async function cartFetch(cartId: string): Promise<ShopifyCart> {
  const data = await runStorefront<{ cart: any }>(
    `
    query Cart($id: ID!) {
      cart(id: $id) { ...CartFields }
    }
    ${CART_FRAGMENT}
  `,
    { id: cartId }
  )
  if (!data.cart) throw new Error('Cart not found')
  return mapCart(data.cart)
}

function mapCart(cart: any): ShopifyCart {
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    lines: cart.lines.edges.map((e: any) => ({
      id: e.node.id,
      quantity: e.node.quantity,
      merchandise: {
        id: e.node.merchandise.id,
        title: e.node.merchandise.title,
        product: { title: e.node.merchandise.product.title },
        price: {
          amount: e.node.merchandise.price.amount,
          currencyCode: e.node.merchandise.price.currencyCode,
        },
      },
    })),
  }
}
