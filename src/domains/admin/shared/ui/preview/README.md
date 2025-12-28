# Admin Preview UI (shared)

Reusable preview UI components for admin screens (Products, Pages, Components, etc.).

## Components
- `IPhonePreviewCard`
  - Sticky desktop-only preview that renders a product/page preview inside device mockups.
  - Supports `phone` / `tablet` / `desktop` modes via `DeviceToggle` (icons-only).
  - Automatically scales the device to fit the available preview column and viewport height.
- `IPhoneMockup`
  - Pure presentational iPhone frame (bezel + notch/island + safe areas).
  - Use this when you need custom content beyond an iframe.
- `TabletMockup`
  - Simple “iPad-ish” frame used for admin tablet previews.
- `MacbookPro`
  - SVG MacBook frame used for admin desktop previews.
- `DeviceToggle`
  - Icons-only device mode switch (phone/tablet/desktop).

## Recommended usage
```tsx
import IPhonePreviewCard from '@admin/shared/ui/preview/IPhonePreviewCard'

<IPhonePreviewCard
  src={`/admin/preview/product/${product.handle}`}
  iframeRef={iframeRef}
  onIframeLoad={handlePreviewIframeLoad}
/>
```

## Controlled device mode (optional)
If the page wants to own device state (e.g., store in URL/search params):
```tsx
<IPhonePreviewCard
  src={`/admin/preview/product/${product.handle}`}
  iframeRef={iframeRef}
  device={previewDevice}
  onDeviceChange={setPreviewDevice}
/>
```

Notes:
- The iframe itself scrolls; the admin page should not resize to preview height.
- Preview messaging (postMessage) should be handled by the feature page/hook, not inside shared UI.
- The preview route should read `?device=phone|tablet|desktop` to constrain its layout.
