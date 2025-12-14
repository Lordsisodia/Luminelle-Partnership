import type { PagesFunction } from '../../_lib/types'
import { methodNotAllowed, text } from '../../_lib/response'
import { Webhook } from 'svix'
import { upsertCustomer } from '../../_lib/customers'

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') return methodNotAllowed(['POST'])

  const secret = env.CLERK_WEBHOOK_SECRET
  if (!secret) return text('Missing CLERK_WEBHOOK_SECRET', { status: 500 })

  const rawBody = await request.text()
  const headers = Object.fromEntries(request.headers.entries())

  const wh = new Webhook(secret)
  let evt: any
  try {
    evt = wh.verify(rawBody, headers as any)
  } catch (err) {
    console.error('Clerk webhook verification failed:', err)
    return text('Verification failed', { status: 400 })
  }

  if (evt?.type === 'user.created' || evt?.type === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data || {}
    const email = email_addresses?.[0]?.email_address
    try {
      await upsertCustomer(env, { id, email, first_name, last_name, image_url })
    } catch (e) {
      console.error('Failed to save Clerk user', e)
    }
  }

  return text('OK', { status: 200 })
}

