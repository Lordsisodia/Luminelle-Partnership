import dotenv from 'dotenv'

dotenv.config()

const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || '2025-10'
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
const ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN
const baseUrlRaw = process.env.SHOPIFY_APP_URL || process.env.APP_URL

const APPLY = process.argv.includes('--apply') || process.env.APPLY === '1'

function normalizeBaseUrl(input) {
  const url = String(input || '').trim()
  if (!url) return null
  return url.replace(/\/+$/, '')
}

const BASE_URL = normalizeBaseUrl(baseUrlRaw)

if (!SHOPIFY_STORE_DOMAIN) {
  console.error('Error: SHOPIFY_STORE_DOMAIN is missing (set it in `.env`).')
  process.exit(1)
}

if (!ACCESS_TOKEN) {
  console.error('Error: SHOPIFY_ADMIN_API_ACCESS_TOKEN is missing (set it in `.env`).')
  console.error('Tip: for a Shopify custom app token this usually starts with `shpat_`.')
  process.exit(1)
}

if (!BASE_URL) {
  console.error('Error: SHOPIFY_APP_URL (preferred) or APP_URL is missing (set it in `.env`).')
  console.error('Example: SHOPIFY_APP_URL=https://lumelle.com')
  process.exit(1)
}

// NOTE: Shopify *app* webhooks are registered via GraphQL as WebhookSubscriptions.
// Some topics (notably GDPR topics like `customers/data_request`) are NOT available
// as GraphQL enum values in many API versions, so this script intentionally focuses
// on the topics we actually use for app functionality (orders + customers + uninstall).
//
// GDPR webhooks should be configured via the Shopify app's privacy/compliance settings
// or via REST webhooks if you specifically need to manage them per shop.
const DESIRED = [
  { topic: 'CUSTOMERS_CREATE', path: '/api/shopify/webhooks/customers-create' },
  { topic: 'CUSTOMERS_UPDATE', path: '/api/shopify/webhooks/customers-update' },
  { topic: 'CUSTOMERS_DELETE', path: '/api/shopify/webhooks/customers-delete' },
  { topic: 'APP_UNINSTALLED', path: '/api/shopify/webhooks/app-uninstalled' },
  { topic: 'ORDERS_CREATE', path: '/api/shopify/webhooks/orders-create' },
  { topic: 'ORDERS_UPDATED', path: '/api/shopify/webhooks/orders-updated' },
  { topic: 'FULFILLMENTS_CREATE', path: '/api/shopify/webhooks/fulfillments-create' },
]

async function adminGraphQL(query, variables) {
  const res = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-Shopify-Access-Token': ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  })

  const text = await res.text()
  if (!res.ok) throw new Error(`Admin GraphQL failed: ${res.status} ${text}`)

  let json
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`Admin GraphQL returned non-JSON: ${text.slice(0, 200)}`)
  }

  if (json.errors?.length) throw new Error(`Admin GraphQL errors: ${JSON.stringify(json.errors)}`)
  return json.data
}

async function listWebhookSubscriptions() {
  const query = `#graphql
    query Webhooks($first: Int!, $after: String) {
      webhookSubscriptions(first: $first, after: $after) {
        pageInfo { hasNextPage endCursor }
        edges {
          node {
            id
            topic
            endpoint {
              __typename
              ... on WebhookHttpEndpoint { callbackUrl }
            }
          }
        }
      }
    }
  `

  const all = []
  let after = null
  for (;;) {
    const data = await adminGraphQL(query, { first: 100, after })
    const conn = data?.webhookSubscriptions
    const edges = conn?.edges || []
    for (const e of edges) {
      all.push({
        id: e?.node?.id,
        topic: e?.node?.topic,
        callbackUrl: e?.node?.endpoint?.callbackUrl || null,
      })
    }
    if (!conn?.pageInfo?.hasNextPage) break
    after = conn.pageInfo.endCursor
  }
  return all
}

async function deleteWebhookSubscription(id) {
  const mutation = `#graphql
    mutation DeleteWebhook($id: ID!) {
      webhookSubscriptionDelete(id: $id) {
        deletedWebhookSubscriptionId
        userErrors { field message }
      }
    }
  `
  const data = await adminGraphQL(mutation, { id })
  const res = data?.webhookSubscriptionDelete
  const errs = res?.userErrors || []
  if (errs.length) throw new Error(`Delete failed: ${JSON.stringify(errs)}`)
  return res?.deletedWebhookSubscriptionId
}

async function createWebhookSubscription(topic, callbackUrl) {
  const mutation = `#graphql
    mutation CreateWebhook($topic: WebhookSubscriptionTopic!, $callbackUrl: URL!) {
      webhookSubscriptionCreate(
        topic: $topic
        webhookSubscription: { callbackUrl: $callbackUrl, format: JSON }
      ) {
        webhookSubscription { id }
        userErrors { field message }
      }
    }
  `
  const data = await adminGraphQL(mutation, { topic, callbackUrl })
  const res = data?.webhookSubscriptionCreate
  const errs = res?.userErrors || []
  if (errs.length) throw new Error(`Create failed: ${JSON.stringify(errs)}`)
  return res?.webhookSubscription?.id
}

async function main() {
  console.log(`Store: ${SHOPIFY_STORE_DOMAIN}`)
  console.log(`API version: ${SHOPIFY_API_VERSION}`)
  console.log(`Webhook base URL: ${BASE_URL}`)
  if (String(BASE_URL).includes('trycloudflare.com')) {
    console.warn('Warning: base URL is a trycloudflare tunnel; webhooks will break when the tunnel changes.')
  }
  console.log(APPLY ? 'Mode: APPLY (will create/delete)' : 'Mode: DRY RUN (no changes). Add `--apply` to mutate.')
  console.log('---')

  const existing = await listWebhookSubscriptions()
  const relevantTopics = new Set(DESIRED.map(d => d.topic))
  const relevant = existing.filter(w => relevantTopics.has(w.topic))

  const byTopic = new Map()
  for (const w of relevant) {
    if (!byTopic.has(w.topic)) byTopic.set(w.topic, [])
    byTopic.get(w.topic).push(w)
  }

  const toDelete = []
  const toCreate = []

  for (const { topic, path } of DESIRED) {
    const desiredUrl = `${BASE_URL}${path}`
    const current = byTopic.get(topic) || []

    const keep = current.find(w => w.callbackUrl === desiredUrl) || null
    const extras = current.filter(w => w.id && w.id !== keep?.id)

    for (const w of extras) toDelete.push({ ...w, desiredUrl })
    if (!keep) toCreate.push({ topic, callbackUrl: desiredUrl })

    const statusLine = {
      topic,
      desiredUrl,
      existing: current.map(w => ({ id: w.id, callbackUrl: w.callbackUrl })),
      willCreate: !keep,
      willDelete: extras.length,
    }
    console.log(JSON.stringify(statusLine))
  }

  if (!APPLY) {
    console.log('---')
    console.log(`Dry run complete. Would delete ${toDelete.length} + create ${toCreate.length}.`)
    return
  }

  for (const w of toDelete) {
    console.log(`Deleting ${w.topic} (${w.id}) → ${w.callbackUrl}`)
    await deleteWebhookSubscription(w.id)
  }

  for (const w of toCreate) {
    console.log(`Creating ${w.topic} → ${w.callbackUrl}`)
    await createWebhookSubscription(w.topic, w.callbackUrl)
  }

  console.log('---')
  console.log('Done. Re-run without `--apply` to see final state.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
