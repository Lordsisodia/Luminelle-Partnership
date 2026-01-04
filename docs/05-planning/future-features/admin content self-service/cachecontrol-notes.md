# Cache-Control notes (Supabase Storage)

Supabase buckets don't store a default cache_control column per object; set per-upload or via `upload` API options.

Plan:
- For published buckets (`public-media`, `product-media`, `blog-media`): set `cacheControl` to `31536000` on upload.
- For draft bucket (`draft-media`): set `cacheControl` to short (e.g., `60`) on upload/signed URL fetch.

Implementation (client/uploader):
```ts
await supabaseAdmin.storage
  .from(bucket)
  .upload(path, file, { cacheControl: bucket === 'draft-media' ? '60' : '31536000', upsert: true });
```

If using CLI for seeds, pass `--content-type image/webp` and manually set cache via headers when serving; otherwise rely on uploader defaults later.
