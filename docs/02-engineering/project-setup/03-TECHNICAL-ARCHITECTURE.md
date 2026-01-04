# Technical Architecture & Tech Stack

## Architecture Overview
**Type:** Static Landing Page with Form Integration
**Hosting:** Vercel
**Deployment:** CI/CD via Git integration

## Tech Stack

### Frontend Framework
**Recommended:** React + Vite
- Fast development experience
- Component-based architecture
- Excellent Vercel integration
- Easy to maintain

**Alternative:** Next.js
- If SSR/SSG needed later
- Better SEO optimization
- API routes capability

### Styling
**Primary:** Tailwind CSS
- Rapid UI development
- Responsive utilities
- Custom color palette support
- Production optimizations

**Component Library (Optional):**
- shadcn/ui for consistent components
- Framer Motion for animations

### Form Handling
**Option 1:** Simple Client-Side
- Direct WhatsApp redirect with URL params
- No backend needed initially
- Store data in localStorage temporarily

**Option 2:** Vercel Serverless Functions
- Collect form data
- Send to CRM/database if needed later
- WhatsApp API integration

### Database (Future Consideration)
**Not Required Initially** - Keep it simple

**If Needed Later:**
- Supabase (PostgreSQL + Auth)
- Firebase Firestore
- Vercel Postgres

**Use Cases:**
- Track affiliate applications
- Store contact information
- Analytics and metrics
- Leaderboard data

## Project Structure
```
lumelle/
├── docs/                    # Project documentation
├── src/
│   ├── components/          # React components
│   │   ├── Hero.jsx
│   │   ├── BrandStory.jsx
│   │   ├── SuccessStories.jsx
│   │   ├── CreatorProfiles.jsx
│   │   ├── Incentives.jsx
│   │   ├── Leaderboard.jsx
│   │   ├── FAQ.jsx
│   │   └── OnboardingForm.jsx
│   ├── assets/             # Images, fonts, videos
│   ├── styles/             # Global styles
│   ├── utils/              # Helper functions
│   └── App.jsx             # Main app component
├── public/                 # Static assets
├── api/                    # Serverless functions (if needed)
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Key Features Implementation

### 1. WhatsApp Integration
```javascript
// Simple redirect approach
const whatsappGroupUrl = 'https://chat.whatsapp.com/[GROUP_ID]';
const handleJoinGroup = (formData) => {
  // Optional: Track in analytics
  window.location.href = whatsappGroupUrl;
};
```

### 2. Form Collection
**Minimal Data:**
- Name (required)
- Phone number (required)
- TikTok handle (optional)
- How they heard about Lumelle (optional)

**Storage Options:**
- localStorage (temporary)
- URL parameters to WhatsApp
- Serverless function → email notification

### 3. Content Brief Access
- Downloadable PDF link
- Or link to Notion/Google Drive
- Protected by simple password (optional)

### 4. TikTok Video Embeds
```javascript
// Use TikTok embed API or iframe
<TikTokEmbed videoUrl="https://www.tiktok.com/@username/video/123" />
```

## Performance Optimizations

### Image Optimization
- Lazy loading for below-fold images
- WebP format with fallbacks
- Responsive srcset attributes
- CDN delivery via Vercel

### Code Splitting
- Route-based code splitting
- Dynamic imports for heavy components
- Tree shaking for unused code

### Caching Strategy
- Static assets cached at edge
- Service worker for offline support (optional)
- Preload critical resources

## Security Considerations
- HTTPS enforced (Vercel default)
- No sensitive data storage client-side
- CORS configuration for API calls
- Input validation and sanitization
- Rate limiting on form submissions

## Analytics & Tracking
**Recommended:** Vercel Analytics
- Page views
- Conversion tracking
- Performance metrics

**Optional:**
- Google Analytics 4
- Facebook Pixel
- Custom event tracking

## Deployment Strategy

### Environment Setup
```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Deploy to Vercel
vercel deploy --prod
```

### CI/CD Pipeline
1. Push to Git (GitHub/GitLab)
2. Vercel auto-detects changes
3. Builds and deploys preview
4. Merge to main → production deploy

### Environment Variables
```
VITE_WHATSAPP_GROUP_URL=https://chat.whatsapp.com/...
VITE_CONTENT_BRIEF_URL=https://...
```

## Domain Configuration
**Options:**
1. **Subdomain:** `affiliates.lumellebeauty.co.uk`
2. **New Domain:** `joiumelle.com` or similar
3. **Path-based:** `lumellebeauty.co.uk/affiliates`

**Recommendation:** Use subdomain for clean separation

## Scalability Considerations
**Current:** Static landing page
**Future Expansion:**
- Admin dashboard for managing affiliates
- Leaderboard with real-time data
- Content library/resource center
- Affiliate tracking and analytics
- Commission calculator

## Development Timeline Estimate
- **Setup & Configuration:** 2-4 hours
- **Component Development:** 8-12 hours
- **Styling & Responsive:** 4-6 hours
- **Integration & Testing:** 3-5 hours
- **Deployment & DNS:** 1-2 hours

**Total:** 18-29 hours for MVP

## Maintenance Requirements
- **Minimal:** Static site, few updates needed
- **Content Updates:** Easy to modify text/images
- **Monitoring:** Vercel analytics dashboard
- **Costs:** Free tier initially (Vercel)
