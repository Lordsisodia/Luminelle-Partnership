import type { PagesFunction } from '../../_lib/types'
import { json, text } from '../../_lib/response'
import { getSupabase } from '../../_lib/supabase'

type NewsletterSignupPayload = {
  email?: unknown
  source?: unknown
}

const isValidEmail = (email: string) => {
  if (!email) return false
  if (email.length > 254) return false
  // Intentionally simple validation: avoids rejecting legitimate addresses while blocking obvious junk.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const onRequest: PagesFunction = async ({ request, env }) => {
  if (request.method !== 'POST') {
    return text('Method not allowed', { status: 405 })
  }

  const payload = (await request.json().catch(() => null)) as NewsletterSignupPayload | null
  const rawEmail = typeof payload?.email === 'string' ? payload.email : ''
  const email = rawEmail.trim().toLowerCase()
  const sourceRaw = typeof payload?.source === 'string' ? payload.source : ''
  const source = sourceRaw.trim().slice(0, 200) || null

  if (!email) return text('Missing email', { status: 400 })
  if (!isValidEmail(email)) return text('Invalid email', { status: 400 })

  const supabase = getSupabase(env)
  const { data, error } = await supabase
    .from('newsletter_signups')
    .insert({ email, source })
    .select('email')

  if (error) {
    // Preserve legacy behavior: duplicate emails are not an error; they just set created=false.
    // PostgREST uses 23505 for unique violations.
    if (error.code === '23505') {
      return json({ ok: true, created: false })
    }
    return text('Unable to subscribe', { status: 500 })
  }

  const created = Array.isArray(data) && data.length > 0
  return json({ ok: true, created })
}

