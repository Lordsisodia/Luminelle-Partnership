import { useEffect, useState } from 'react'
import { AppProvider as PolarisProvider, Card, Button, Page, TextField } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import { setNoIndexNoFollow } from '@/lib/seo'

export default function SettingsPage() {
  const params = new URLSearchParams(window.location.search)
  const shop = params.get('shop') || ''
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    setNoIndexNoFollow()
    const url = new URL('/api/shopify/settings', window.location.origin)
    url.searchParams.set('shop', shop)
    fetch(url)
      .then((r) => r.json())
      .then((j) => setMessage(j.publicMessage || ''))
      .catch(() => { })
  }, [shop])

  const save = async () => {
    setLoading(true)
    await fetch('/api/shopify/settings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ shop, publicMessage: message }),
    })
    setLoading(false)
  }

  return (
    <PolarisProvider i18n={i18n}>
      <Page title="Settings">
        <Card>
          <div style={{ padding: 16, display: 'grid', gap: 12 }}>
            <TextField label="Public message" value={message} onChange={setMessage} autoComplete="off" />
            <Button onClick={save} loading={loading} variant="primary">Save</Button>
          </div>
        </Card>
      </Page>
    </PolarisProvider>
  )
}
