import { useEffect } from 'react'
import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import { ProductPicker } from '../../components/shopify/ProductPicker'
import { setNoIndexNoFollow } from '@/lib/seo'

export default function AppEmbed() {
  const params = new URLSearchParams(window.location.search)
  const host = params.get('host') || ''
  const shop = params.get('shop') || ''
  useEffect(() => { setNoIndexNoFollow() }, [])

  const i18n = {
    Polaris: {
      ResourceList: {
        sortingLabel: 'Sort by',
        defaultItemSingular: 'item',
        defaultItemPlural: 'items',
        showing: 'Showing {itemsCount} {resource}',
        Item: {
          viewItem: 'View details for {itemName}',
        },
      },
      Common: {
        checkbox: 'checkbox',
      },
    },
  }

  return (
    <AppProvider i18n={i18n}>
      <div style={{ padding: 16 }}>
        <h2>Lumelle Shopify App</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <a href="/shopify/settings">Settings</a>
          <a href={`/api/shopify/billing/create?shop=${encodeURIComponent(shop)}&host=${encodeURIComponent(host)}`}>Billing</a>
        </div>

        <div style={{ marginBottom: 16 }}>
          <ProductPicker onSelect={(products) => console.log('Selected products:', products)} />
        </div>

        <p style={{ marginTop: 16 }}>This page is served from the core app and embedded in Shopify Admin.</p>
      </div>
    </AppProvider>
  )
}
