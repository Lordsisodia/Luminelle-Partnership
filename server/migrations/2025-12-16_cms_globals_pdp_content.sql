-- Global PDP content (non-product-specific) so clients can edit:
-- - Section headings and fixed copy used across product pages
-- - Default reviews pool (used by ReviewsAutoCarousel)
-- - Featured TikTok story list (used by FeaturedTikTok)
--
-- Stored as jsonb blobs in cms_globals, keyed by:
-- - pdp_defaults
-- - pdp_reviews
-- - pdp_tiktok_stories

insert into public.cms_globals(key, data)
values (
  'pdp_defaults',
  $$
  {
    "navItems": [
      { "id": "media", "label": "Product" },
      { "id": "details", "label": "Highlights" },
      { "id": "reviews", "label": "Reviews" },
      { "id": "faq", "label": "FAQ" }
    ],
    "heroProofStrip": {
      "tagline": "Creator-loved protection",
      "sourceLine": "Source: TikTok Shop + verified store reviews",
      "quickFacts": [
        { "label": "Proven", "value": "Protects hair", "icon": "ShieldCheck" },
        { "label": "Dispatch", "value": "48 hrs ship time", "icon": "Truck" },
        { "label": "Guarantee", "value": "Free returns in 30 days", "icon": "Users" }
      ]
    },
    "detailsAccordionHeading": {
      "eyebrow": "Everything you need",
      "title": "Materials, care & fit",
      "description": "Quick references before you add it to your cart.",
      "alignment": "center"
    },
    "reviewsHeading": {
      "eyebrow": "Creator testimonials",
      "title": "Real feedback, real hair saved",
      "description": "Scroll through stories from TikTok Shop + verified shoppers.",
      "alignment": "center"
    },
    "faqHeading": {
      "eyebrow": "Need help?",
      "title": "Questions?\\nWe've got answers.",
      "description": null,
      "alignment": "center"
    },
    "featuredTikTokDefaultHeading": {
      "eyebrow": "As seen on TikTok",
      "title": "Creators using Lumelle",
      "description": "Swipe to watch a few of our favourite videos.",
      "alignment": "center"
    },
    "priceBlock": {
      "trustLine": "Free returns • Ships in 48h",
      "qtyPromoLabel": "Buy 2, save 10%",
      "qtyPromoBadgeText": "Save 10%",
      "qtyStandardText": "Standard",
      "rrpLabel": "RRP",
      "addToBasket": "Add to Basket",
      "buyNow": "Buy Now",
      "deliveryPrefix": "Free delivery",
      "dispatchLineTemplate": "Order within {hours} hrs {minutes} mins for earliest dispatch"
    },
    "bottomCta": {
      "eyebrow": "Last chance today",
      "title": "Keep style frizz-free this week.",
      "subtext": "Free 30-day returns · Ships in 48h · 4.8★ from 100+",
      "primaryCtaLabel": "Add to Basket",
      "secondaryCtaLabel": "Buy Now",
      "pills": ["Waterproof satin", "No-frizz seal", "UK free returns"]
    },
    "heroMediaAnnouncement": {
      "enabled": true,
      "href": "/product/satin-overnight-curler",
      "label": "New Heatless Curler Launched",
      "ariaLabel": "New heatless curler launched — view the satin overnight heatless curler set"
    },
    "howToSection": {
      "badgeText": "Your sign to try this"
    },
    "featureCalloutsStory": {
      "cta": {
        "label": "See it in action",
        "href": "/blog/frizz-free-showers-seo",
        "buttonLabel": "Watch routine"
      },
      "chipLabel": "Creator-tested",
      "fallbackMedia": {
        "src": "/uploads/luminele/product-feature-06.webp",
        "alt": "Lumelle shower cap in use",
        "label": "Less breakage",
        "note": "Soft satin band prevents pulling"
      }
    },
    "seo": {
      "titleTemplate": "{productTitle} | Satin-lined waterproof shower cap",
      "descriptionTemplate": "{productDesc} • Blocks steam for silk presses, curls, and braids. Free returns in 30 days."
    }
  }
  $$::jsonb
)
on conflict (key) do update
set data = excluded.data,
    updated_at = now();

insert into public.cms_globals(key, data)
values (
  'pdp_reviews',
  $$
  [
    { "author": "Amelia", "stars": 5, "title": "Zero frizz", "body": "Finally a cap that actually works." },
    { "author": "Beth", "stars": 5, "title": "So comfy", "body": "No marks on my forehead and looks cute." },
    { "author": "Cara", "stars": 5, "title": "Worth it", "body": "Saved my blowout more than once." },
    { "author": "Danielle", "stars": 5, "title": "Blowout saver", "body": "Stayed smooth after a long, steamy shower." },
    { "author": "Ella", "stars": 4.5, "title": "Soft band", "body": "No dents and super gentle on edges." },
    { "author": "Fiona", "stars": 5, "title": "Looks luxe", "body": "Finally a cap I’m not embarrassed to wear." },
    { "author": "Grace", "stars": 5, "title": "Curl friendly", "body": "Fits over braids without tugging." },
    { "author": "Hana", "stars": 4.8, "title": "Travel staple", "body": "Packs flat and keeps styles intact on trips." },
    { "author": "Isla", "stars": 5, "title": "Steam proof", "body": "Tested in a sauna shower—no puffiness." },
    { "author": "Jade", "stars": 4.9, "title": "Satin smooth", "body": "Interior feels like a silk pillowcase." },
    { "author": "Kara", "stars": 5, "title": "Stretch fit", "body": "Roomy enough for rollers and still sealed." },
    { "author": "Lena", "stars": 5, "title": "Worth the upgrade", "body": "Feels premium compared to plastic caps." },
    { "author": "Mara", "stars": 4.7, "title": "Holds up", "body": "Using daily for weeks—still perfect." },
    { "author": "Nia", "stars": 5, "title": "Edge-safe", "body": "No rubbing on baby hairs." },
    { "author": "Opal", "stars": 5, "title": "Great gift", "body": "Bought for my mom—she loves it." },
    { "author": "Priya", "stars": 4.8, "title": "Cute design", "body": "Functional and actually stylish." },
    { "author": "Quinn", "stars": 5, "title": "Frizz free", "body": "Hair stays shiny even on wash day." }
  ]
  $$::jsonb
)
on conflict (key) do update
set data = excluded.data,
    updated_at = now();

insert into public.cms_globals(key, data)
values (
  'pdp_tiktok_stories',
  $$
  [
    {
      "name": "Shannon Mitchell",
      "handle": "@shannon_mitch",
      "avatarAlt": "Profile photo of Shannon Mitchell",
      "avatarSrc": "/images/avatar-shannon.jpg",
      "embedUrl": "https://www.tiktok.com/embed/v2/7562893092957719830?embed_source=lite",
      "highlight": "29 sales in a single video",
      "stats": "Video to cart in under 4 hours",
      "earnings": "£340 commission payout",
      "quote": "Lumelle gave me scripts, hooks, and feedback within minutes—it felt like cheating in the best way.",
      "badge": "Momentum Maker",
      "videoUrl": "https://www.tiktok.com/@shannon_mitch/video/7562893092957719830"
    },
    {
      "name": "Rachel",
      "handle": "@rachelsummergreenie._",
      "avatarAlt": "Profile photo of Rachel",
      "avatarSrc": "/images/avatar-rachel.jpg",
      "embedUrl": "https://www.tiktok.com/embed/v2/7543668112630058262?embed_source=lite",
      "highlight": "11 sales in 14 days",
      "stats": "Consistent daily conversions",
      "earnings": "£210 commission payout",
      "quote": "The community kept me accountable and the weekly challenges made it fun to keep creating.",
      "videoUrl": "https://www.tiktok.com/@rachelsummergreenie._/video/7543668112630058262"
    },
    {
      "name": "Random Life UK",
      "handle": "@randomlifeuk",
      "avatarAlt": "Profile photo of Random Life UK",
      "avatarSrc": "/images/avatar-randomlife.jpg",
      "embedUrl": "https://www.tiktok.com/embed/v2/7544353160429587734?embed_source=lite",
      "highlight": "Top seller last month",
      "stats": "41 units sold",
      "earnings": "£540 commission payout",
      "quote": "Knowing the leaderboard updates in real-time pushes me to go after the top spot every week.",
      "badge": "🏆 Top Performer",
      "videoUrl": "https://www.tiktok.com/@randomlifeuk/video/7544353160429587734"
    },
    {
      "name": "Winging Ma Life",
      "handle": "@wingingmalife",
      "avatarAlt": "Profile photo of Winging Ma Life",
      "avatarSrc": "/images/avatar-rachel.jpg",
      "embedUrl": "https://www.tiktok.com/embed/v2/7567328998158585110?embed_source=lite",
      "highlight": "Unfiltered shower-cap demo",
      "stats": "Spike in saves + shares",
      "earnings": "Strong product clicks",
      "quote": "Loved how the satin lining kept my hair camera-ready—no slip, no frizz.",
      "videoUrl": "https://www.tiktok.com/@wingingmalife/video/7567328998158585110"
    },
    {
      "name": "By Latticia",
      "handle": "@bylatticia",
      "avatarAlt": "Profile photo of By Latticia",
      "avatarSrc": "/images/avatar-shannon.jpg",
      "embedUrl": "https://www.tiktok.com/embed/v2/7566245669250387222?embed_source=lite",
      "highlight": "Get-ready-with-me feature",
      "stats": "High completion rate",
      "earnings": "Audience asked for links",
      "quote": "Super easy to film with—looks luxe on camera and feels light.",
      "videoUrl": "https://www.tiktok.com/@bylatticia/video/7566245669250387222"
    },
    {
      "name": "Hannah Styles",
      "handle": "@hannahh.styless",
      "avatarAlt": "Profile photo of Hannah Styles",
      "avatarSrc": "/images/avatar-randomlife.jpg",
      "embedUrl": "https://www.tiktok.com/embed/v2/7575168979711397142?embed_source=lite",
      "highlight": "Steam test on-camera",
      "stats": "Comments about fit + seal",
      "earnings": "Repeat link clicks",
      "quote": "Held up through a long shower vlog—no flyaways after.",
      "videoUrl": "https://www.tiktok.com/@hannahh.styless/video/7575168979711397142"
    }
  ]
  $$::jsonb
)
on conflict (key) do update
set data = excluded.data,
    updated_at = now();
