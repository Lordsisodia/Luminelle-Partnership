import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

// Signed upload for Cloudinary. Requires env: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
// Request: POST { folder?: string, public_id?: string }
// Response: { signature, timestamp, api_key, cloud_name, folder?, public_id? }

const requiredEnv = ['CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'] as const

function assertEnv() {
  for (const key of requiredEnv) {
    if (!process.env[key]) throw new Error(`Missing env ${key}`)
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    assertEnv()
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message })
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // Simple auth guard: require ADMIN_SHARED_SECRET header if set; else allow (dev).
  const shared = process.env.ADMIN_SHARED_SECRET
  if (shared) {
    const provided = req.headers['x-admin-secret'] as string | undefined
    if (!provided || provided !== shared) {
      return res.status(403).json({ error: 'Unauthorized' })
    }
  }

  const { folder = '', public_id } = typeof req.body === 'object' ? req.body : {}
  const timestamp = Math.round(Date.now() / 1000)

  const params: Record<string, string | number> = { timestamp }
  if (folder) params.folder = folder
  if (public_id) params.public_id = public_id

  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join('&')

  const signature = crypto
    .createHash('sha1')
    .update(`${toSign}${process.env.CLOUDINARY_API_SECRET}`)
    .digest('hex')

  return res.status(200).json({
    signature,
    timestamp,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    folder,
    public_id,
  })
}
