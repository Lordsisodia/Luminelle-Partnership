# Admin: Products page content model

Goal: Let admins edit every piece of storefront product storytelling without developer help. This doc lists the fields/components the Products admin page should surface for each product.

## 1) Catalog basics (from Shopify/Supabase)
- `title`
- `handle`
- `subtext` / short blurb
- `price`
- `compare_at_price` ("discounted from" price)
- `inventory` / availability (read-only or toggle?)
- `review_count` and `average_rating`

## 2) Merchandising + offers
- Quantity discounts (e.g., "Buy 2, get 10% off"): list of tiers `{min_qty, discount_type, value}` with enable/disable.
- "Sign to try" block: `{title, subtext}`.

## 3) Hero / PDP upper section
- Gallery: list of media with reorder + mark as primary. Accept images + TikTok/video embeds.
- Badges: small pills shown near title (e.g., "Best Seller").

## 4) Benefits / Why you’ll love it
- Section title & intro copy (e.g., "Why you’ll love it", subtext).
- Highlighted TikTok videos (for carousel): list of `{embed_url, caption}` with reorder/remove.
- Bullet points grid (the 4-up cards): list of items with `{title, subtext}` (e.g., "Effortless to put on", "Happy hair days").

## 5) Materials & care
- Section title.
- Bulleted items ("Karen materials" callouts): list of `{title, subtext}`.
- Care notes block (rich text or simple list).

## 6) Social proof
- Creator testimonials: list of cards `{quote, creator_name, role/handle, avatar, video_url?}` with reorder/remove.
- Reviews widget: source selection (Shopify reviews app / internal), plus override counts `{review_count, average_rating}` if needed for display parity.

## 7) Creators in action
- TikTok/UGC gallery: list of `{embed_url, caption}` with reorder/remove.

## 8) FAQ
- Q&A list: `{question, answer, is_expanded_default}` with add/remove/reorder.

## 9) SEO
- Meta title, meta description, social share image override.

## 10) System fields
- Draft/published toggle.
- Updated by / updated at.

---

### Layout notes for the Admin Products page
- Left rail: product selector (search + filter) and status chips (Published/Draft/Out of stock).
- Main content: tabbed or accordion sections matching the numbered groups above.
- Preview: optional right column showing live preview with current edits.

### Data shape (draft)
```ts
type ProductAdminContent = {
  title: string
  handle: string
  subtext: string
  price: number
  compare_at_price?: number
  review_count?: number
  average_rating?: number
  quantity_discounts: { min_qty: number; type: 'percent' | 'fixed'; value: number }[]
  sign_to_try: { title: string; subtext: string }
  gallery: { id: string; media_url: string; kind: 'image' | 'video'; caption?: string; is_primary?: boolean }[]
  badges: string[]
  why_love: {
    title: string
    subtext: string
    bullets: { title: string; subtext: string }[]
    videos: { embed_url: string; caption?: string }[]
  }
  materials: {
    title: string
    bullets: { title: string; subtext: string }[]
    care_notes: string
  }
  testimonials: { quote: string; creator: string; role?: string; avatar?: string; video_url?: string }[]
  reviews_widget: { source: 'shopify' | 'internal'; review_count?: number; average_rating?: number }
  creators_in_action: { embed_url: string; caption?: string }[]
  faq: { question: string; answer: string; expanded?: boolean }[]
  seo: { title?: string; description?: string; og_image?: string }
  status: 'draft' | 'published'
  updated_at?: string
  updated_by?: string
}
```

### Next implementation steps
1) Wire the admin Products page to read/write this shape (Supabase table or JSONB per product keyed by Shopify product ID/handle).
2) Build UI sections matching the groups above; use reorderable lists for gallery, bullets, videos, FAQ, testimonials.
3) Add optimistic save + autosave, with dirty state badge.
4) Respect draft/published to gate what the storefront consumes.
