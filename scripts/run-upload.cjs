#!/usr/bin/env node
// Uploads public/uploads/** images to Cloudinary and upserts into cms_product_media via API.
// Prompts for secrets so you don't have to export them.
// Requires deps: cloudinary fast-glob node-fetch@2 prompt-sync

const cloudinary = require('cloudinary').v2
const fg = require('fast-glob')
const path = require('path')
const fetch = require('node-fetch')
const prompt = require('prompt-sync')({ sigint: true })

const ROOT = 'public/uploads'
const API_BASE = process.env.API_BASE || 'http://localhost:5174'

async function main() {
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || prompt('Cloudinary cloud name: ')
  const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || prompt('Cloudinary API key: ')
  const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || prompt('Cloudinary API secret: ', { echo: '*' })
  const UPLOAD_PRESET = process.env.VITE_CLOUDINARY_UPLOAD_PRESET || prompt('Upload preset (press Enter to skip): ')
  const ADMIN_SHARED_SECRET = process.env.ADMIN_SHARED_SECRET || prompt('ADMIN_SHARED_SECRET for signer (same as in env): ', { echo: '*' })

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  })

  const files = await fg(['**/*.{png,jpg,jpeg,webp,avif}'], { cwd: ROOT, absolute: true })
  console.log(`Found ${files.length} files`)
  for (const file of files) {
    const rel = path.relative(ROOT, file)
    const handle = rel.split(path.sep)[0]
    const publicId = `products/${handle}/${rel.replace(/\\/g, '/').replace(/\.[^.]+$/, '')}`
    console.log('Uploading', rel, '->', publicId)
    const res = await cloudinary.uploader.upload(file, {
      folder: `products/${handle}`,
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      ...(UPLOAD_PRESET ? { upload_preset: UPLOAD_PRESET } : {}),
    })
    console.log('  URL:', res.secure_url)

    try {
      const upsert = await fetch(`${API_BASE}/api/admin/media/upsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': ADMIN_SHARED_SECRET,
        },
        body: JSON.stringify({
          product_handle: handle,
          public_id: res.public_id,
          secure_url: res.secure_url,
          sort_order: 0,
          kind: 'image',
        }),
      })
      if (!upsert.ok) {
        console.warn('  Upsert failed:', await upsert.text())
      } else {
        console.log('  Upserted into cms_product_media')
      }
    } catch (err) {
      console.warn('  Upsert error:', err.message)
    }
  }
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
