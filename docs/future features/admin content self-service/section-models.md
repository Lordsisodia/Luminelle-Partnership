# Section & block models (proposed defaults)

Used for `sections.data` jsonb and `blog_blocks.data`. Keep shapes small for Free plan.

## Page sections (`sections.kind`, `sections.data`)

- `hero`
  - `title`: string
  - `subtitle`: string
  - `cta`: { `label`: string, `href`: string }
  - `image`: { `path`: string, `alt`: string, `focal`: {x,y} }
  - `background`: { `color`: string | null }
- `feature_grid`
  - `eyebrow`: string
  - `title`: string
  - `items`: [{ `icon`: string (path), `title`: string, `desc`: string }]
- `testimonial`
  - `quote`: string
  - `name`: string
  - `role`: string
  - `avatar`: { `path`: string, `alt`: string }
- `faq`
  - `items`: [{ `q`: string, `a`: string }]
- `cta_footer`
  - `title`: string
  - `subtitle`: string
  - `cta`: { `label`: string, `href`: string }
- `promo_bar`
  - `message`: string
  - `cta`: { `label`: string, `href`: string } | null
  - `background`: { `color`: string }
  - `foreground`: { `color`: string }

## Blog blocks (`blog_blocks.type`, `blog_blocks.data`)
- `paragraph`: { `text`: string }
- `heading`: { `level`: 2 | 3 | 4, `text`: string }
- `list`: { `ordered`: boolean, `items`: string[] }
- `quote`: { `text`: string, `cite`: string | null }
- `image`: { `path`: string, `alt`: string, `caption`: string | null, `focal`: {x,y} | null }
- `youtube`: { `url`: string } // whitelist YouTube only

## Globals (`globals.key`, `globals.data`)
- `nav`: { `links`: [{ `label`: string, `href`: string, `order`: number }] }
- `footer`: { `links`: [{ `label`: string, `href`: string, `order`: number }] }
- `promo`: { `message`: string, `cta`: {label, href} | null, `bg`: string, `fg`: string }
- `seo_default`: { `title`: string, `description`: string, `image`: string | null }

Notes:
- All images reference Storage paths; alt required; focal optional except hero/gallery where required.
- Keep optional colors as hex strings; validate contrast in UI for promo/promo_bar.
