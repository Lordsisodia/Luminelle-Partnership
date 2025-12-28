# Admin feedback index

Living feedback docs for the `/admin` experience.

Source of truth for current routes: `src/App.tsx`.

## Pages (current)
- Dashboard (`/admin`) → [dashboard.md](./dashboard.md)
- Analytics (`/admin/analytics`) → [analytics.md](./analytics.md)
- Activity (`/admin/activity`) → [activity.md](./activity.md)
- Orders (`/admin/orders`, `/admin/orders/:orderId`) → [orders.md](./orders.md)
- Content (`/admin/content`) → [content.md](./content.md)
- Pages (`/admin/pages`, `/admin/pages/:slug`) → [pages.md](./pages.md)
- Products (`/admin/products`, `/admin/products/:handle`) → [products.md](./products.md)
- Blogs (`/admin/blogs`, `/admin/blogs/:slug`) → [blogs.md](./blogs.md)
- Media (`/admin/media`) → [media.md](./media.md)
- Components (`/admin/components`, `/admin/components/:key`) → [components.md](./components.md)
- Settings (`/admin/settings`) → [settings.md](./settings.md)
- Globals (`/admin/globals` → redirects to components) → [components.md](./components.md)
- Product preview frame (`/admin/preview/product/:handle`) → [product-preview.md](./product-preview.md)

## Planned / TBD
- Learning (route TBD) → [learning.md](./learning.md)

## Internal review notes (2025-12-26)
See `docs/reviews/app-ui-review-2025-12-26.md` for detailed findings. Highlights:
- Mobile admin drawer can’t be opened (missing burger action).
- Analytics/Activity/Pages/Blogs/Media surfaces are largely mock/stubbed; ensure they’re clearly labeled or hidden in production until wired.
