# Public Assets Directory

This directory contains static assets that are served at the root of the website.

## ⚠️ IMPORTANT: Rebuild Required

**After modifying ANY files in this directory, you MUST rebuild the project:**

```bash
npm run build
```

**Why?** This project uses pre-built static deployment. Files in `/public` are copied to `/out` during the build process. If you don't rebuild:
- Your changes won't be included in the deployment
- Old versions of files will continue to be served

## Contents

### `/mobile-kodeks/`
- **Purpose:** HTML pages and images for the Flutter mobile app
- **Contains:**
  - 38 HTML files (Kodeks Drogowy pages)
  - 712 traffic sign images (~3MB)
  - Supporting JS/CSS files
- **Served at:** `https://www.prawojazdy.co/mobile-kodeks/`
- **Used by:** Flutter mobile app's WebView and traffic sign displays

### Other assets
- App icons (app-icon.webp, apple-touch-icon.png, etc.)
- Store badges (badges/)
- Database files (databases/)
- Landing page assets (landing/)
- Question thumbnails (thumbnails/)
- Reference materials (references/)

## Deployment Workflow

1. Modify files in `/public`
2. **Run `npm run build`** (⚠️ DON'T SKIP THIS!)
3. Commit changes (including `/out` directory)
4. Push to deploy

See `/DEPLOY_WORKFLOW.md` for full details.
