# Assets Inventory & Management

## Provided Assets

### Logo
- **File:** `LUMELLE (6).png`
- **Format:** PNG
- **Usage:** Header, footer, hero section
- **Status:** ✅ Provided

**Action Items:**
- [ ] Optimize for web (compress)
- [ ] Create SVG version if possible
- [ ] Generate favicon variations

---

### Product Images
**Files Provided:**
1. `IMG_1878.jpeg` - Product photo
2. `IMG_1907.jpeg` - Product photo
3. `7850b2f7-4fc9-46dc-9e6e-baba4c00da86.jpeg` - Product photo
4. `IMG_2651.jpeg` - Product showcase
5. `IMG_2656.png` - Product detail/screenshot

**Status:** ✅ Provided

**Action Items:**
- [ ] Optimize all images (WebP format)
- [ ] Create multiple sizes (responsive)
- [ ] Generate thumbnails
- [ ] Add alt text descriptions

**Planned Usage:**
- Hero background
- Brand story section
- Product showcase carousel
- Testimonial backgrounds

---

### Reference Image
**File:** `photo.heic`
- **Format:** HEIC (Apple format)
- **Status:** ⚠️ Needs conversion

**Action Items:**
- [ ] Convert HEIC to JPG/PNG
- [ ] Review content for usage
- [ ] Optimize for web

---

### Brand Screenshots
**File:** `Screenshot 2025-10-16 143006.png`
- **Content:** Brand inspiration/reference
- **Usage:** Design reference only

**Action Items:**
- [ ] Review for design patterns
- [ ] Extract color palette
- [ ] Note layout preferences

---

## TikTok Content

### Creator Videos (For Embedding)

#### Shannon Mitchell
- **Handle:** @shannon_mitch
- **Video URL:** https://www.tiktok.com/@shannon_mitch/video/7562893092957719830
- **Stats:** 29 sales in single video
- **Status:** ✅ Link provided

**Action Items:**
- [ ] Test TikTok embed code
- [ ] Create thumbnail fallback
- [ ] Scrape profile photo

---

#### Rachel (rachelsummergreenie._)
- **Handle:** @rachelsummergreenie._
- **Video URL:** https://www.tiktok.com/@rachelsummergreenie._/video/7543668112630058262
- **Stats:** 11 sales in 14 days
- **Status:** ✅ Link provided

**Action Items:**
- [ ] Test TikTok embed code
- [ ] Create thumbnail fallback
- [ ] Scrape profile photo

---

#### Random Life UK
- **Handle:** @randomlifeuk
- **Video URL:** https://www.tiktok.com/@randomlifeuk/video/7544353160429587734
- **Stats:** 41 sales (top seller)
- **Status:** ✅ Link provided

**Action Items:**
- [ ] Test TikTok embed code
- [ ] Create thumbnail fallback
- [ ] Scrape profile photo

---

## Assets Needed (To Create/Source)

### Icons & Graphics

#### Icons Set
**Needed for:**
- Incentives section (spa, money, vouchers, products)
- FAQ section (question marks, checkmarks)
- Features list (WhatsApp, community, prizes)
- Social media (TikTok, Instagram, etc.)

**Source Options:**
- Heroicons (free)
- Lucide Icons (free)
- Custom SVG illustrations

**Action Items:**
- [ ] Select icon library
- [ ] Design custom icons if needed
- [ ] Match brand color palette

---

#### Badges & Medals
**Needed for:**
- Leaderboard rankings (🥇🥈🥉)
- Top performer badges
- Achievement icons

**Action Items:**
- [ ] Design medal graphics
- [ ] Create badge variations
- [ ] Export in multiple sizes

---

### Typography Assets

#### Custom Font: "The Seasons"
**Status:** ⚠️ Need to source
**Usage:** Headlines and brand text

**Action Items:**
- [ ] Locate font files (.woff2, .woff)
- [ ] Verify licensing for web use
- [ ] Set up font loading
- [ ] Create fallback stack

**Fallback Options:**
- Playfair Display
- Cormorant
- Lora

---

### Background & Textures

#### Hero Background
**Requirements:**
- Light, airy feel
- Complements brand colors
- Doesn't distract from content

**Options:**
1. Gradient (light orange to pink)
2. Subtle texture overlay
3. Product photo with overlay
4. Abstract shapes

**Action Items:**
- [ ] Design/select background
- [ ] Optimize for performance
- [ ] Test readability of text

---

#### Section Backgrounds
**Requirements:**
- Alternating sections for visual interest
- Subtle patterns or solid colors
- Maintain readability

**Action Items:**
- [ ] Design background variations
- [ ] Create SVG patterns if needed
- [ ] Test color contrast

---

## Content Documents

### Content Brief
**Status:** ⏳ Client to provide
**Format:** PDF or link to Notion/Google Drive

**Requirements:**
- Affiliate content guidelines
- Product information
- Dos and don'ts
- Script templates

**Action Items:**
- [ ] Receive from client
- [ ] Review for completeness
- [ ] Set up download/access link
- [ ] Add to landing page

---

### Legal Documents

#### Terms & Conditions
**Status:** ⏳ To create
**Content Needed:**
- Affiliate program terms
- Commission structure
- Payment terms
- Termination clauses

**Action Items:**
- [ ] Draft basic T&Cs
- [ ] Client legal review
- [ ] Publish to separate page
- [ ] Link from footer

---

#### Privacy Policy
**Status:** ⏳ To create
**Content Needed:**
- Data collection practices
- WhatsApp group privacy
- Cookie usage
- GDPR compliance

**Action Items:**
- [ ] Draft privacy policy
- [ ] Client legal review
- [ ] Publish to separate page
- [ ] Link from footer

---

## Asset Organization

### Directory Structure
```
/public
  /images
    /logo
      - lumelle-logo.svg
      - lumelle-logo.png
      - favicon.ico
    /products
      - product-1.webp
      - product-2.webp
      - product-hero.webp
    /creators
      - shannon.jpg
      - rachel.jpg
      - randomlife.jpg
    /icons
      - spa.svg
      - money.svg
      - voucher.svg
      - whatsapp.svg
    /backgrounds
      - hero-bg.webp
      - section-pattern.svg
  /fonts
    - TheSeasons-Regular.woff2
    - TheSeasons-Bold.woff2
  /documents
    - content-brief.pdf
    - terms.pdf
    - privacy.pdf
```

---

## Image Optimization Workflow

### Process:
1. **Original Assets**
   - Store in `/assets-original` (not in public)
   - Keep high-res versions

2. **Optimization**
   - Compress with TinyPNG or Squoosh
   - Convert to WebP format
   - Generate multiple sizes

3. **Responsive Images**
   - Mobile: 640px width
   - Tablet: 1024px width
   - Desktop: 1920px width

4. **Delivery**
   - Use `<picture>` element
   - Provide fallbacks
   - Lazy load below fold

---

## Brand Assets to Create

### Social Media Graphics
- Open Graph image (1200x630px)
- Twitter Card image (1200x600px)
- Favicon set (16x16, 32x32, 180x180)

**Action Items:**
- [ ] Design OG image
- [ ] Create favicon variations
- [ ] Test social previews

---

### Marketing Materials (Future)
- Email header graphics
- WhatsApp welcome image
- Instagram story templates
- TikTok content templates

---

## Asset Quality Standards

### Images
- **Format:** WebP with JPG fallback
- **Max file size:** 200KB
- **Min resolution:** 1920px wide (desktop)
- **Compression:** 80% quality

### SVGs
- **Max file size:** 20KB
- **Optimization:** Run through SVGO
- **Inline when:** <5KB

### Fonts
- **Format:** WOFF2 primary, WOFF fallback
- **Max file size:** 100KB per weight
- **Loading:** Swap strategy

---

## Access & Licensing

### Logo & Brand Assets
- **Owner:** Oakshott Innovations
- **License:** Client-owned, full usage rights
- **Restrictions:** None for this project

### Third-Party Assets
- **Icons:** Open source (MIT/Apache)
- **Fonts:** Verify commercial license
- **Stock photos:** Client to confirm or use free (Unsplash/Pexels)

---

## Asset Delivery Checklist

### Before Development:
- [ ] All provided assets received
- [ ] Assets reviewed for quality
- [ ] Missing assets identified
- [ ] Timeline for asset creation

### During Development:
- [ ] Assets optimized and processed
- [ ] Responsive versions created
- [ ] Fallbacks implemented
- [ ] Performance tested

### Before Launch:
- [ ] All images have alt text
- [ ] Legal documents approved
- [ ] Fonts loading correctly
- [ ] No broken image links

---

## Asset Maintenance Plan

### Regular Updates:
- **Monthly:** Update creator photos/stats
- **Quarterly:** Refresh product images
- **Annually:** Update branding if evolved

### Optimization Reviews:
- Monitor loading performance
- Compress further if needed
- Remove unused assets
- Update for new formats (AVIF, etc.)

---

## Quick Reference: Asset Status

| Asset Type | Status | Priority | ETA |
|------------|--------|----------|-----|
| Logo | ✅ Provided | High | Ready |
| Product Photos | ✅ Provided | High | Ready |
| Creator Videos | ✅ Links provided | High | Ready |
| Creator Photos | ⏳ To scrape | Medium | Day 2 |
| Custom Font | ⏳ To source | Medium | Day 1 |
| Icons | ⏳ To create | Medium | Day 3 |
| Content Brief | ⏳ Client | Low | Week 2 |
| Legal Docs | ⏳ To draft | Low | Week 2 |
| Backgrounds | ⏳ To design | Medium | Day 4 |

---

## Notes for Asset Collection

### From Client:
- WhatsApp group invite link
- Content brief (PDF or link)
- Any additional product photos
- Brand guidelines document (if exists)
- Access to TikTok profiles for scraping

### For Development:
- Set up asset pipeline early
- Test with placeholders initially
- Swap in real assets progressively
- Document asset sources
