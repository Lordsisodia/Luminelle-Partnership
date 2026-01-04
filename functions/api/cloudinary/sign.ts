import type { PagesFunction } from '../../_lib/types'
import { sha1Hex } from '../../_lib/crypto'
import { json } from '../../_lib/response'

type SignPayload = {
  folder?: unknown
  public_id?: unknown
}

export const onRequest: PagesFunction = async ({ request, env }) => {
  const cloudName = env.CLOUDINARY_CLOUD_NAME
  const apiKey = env.CLOUDINARY_API_KEY
  const apiSecret = env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    return json({ error: 'Missing env CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET' }, { status: 500 })
  }

  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, { status: 405 })

  // Legacy behavior: require x-admin-secret only if ADMIN_SHARED_SECRET is configured; otherwise allow (dev).
  const shared = env.ADMIN_SHARED_SECRET
  if (shared) {
    const provided = request.headers.get('x-admin-secret') || request.headers.get('X-Admin-Secret')
    if (!provided || provided !== shared) {
      return json({ error: 'Unauthorized' }, { status: 403 })
    }
  }

  const body = (await request.json().catch(() => ({}))) as SignPayload
  const folder = typeof body?.folder === 'string' ? body.folder : ''
  const public_id = typeof body?.public_id === 'string' ? body.public_id : undefined
  const timestamp = Math.round(Date.now() / 1000)

  const params: Record<string, string | number> = { timestamp }
  if (folder) params.folder = folder
  if (public_id) params.public_id = public_id

  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')

  const signature = await sha1Hex(`${toSign}${apiSecret}`)

  return json({
    signature,
    timestamp,
    api_key: apiKey,
    cloud_name: cloudName,
    folder,
    public_id,
  })
}

