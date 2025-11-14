# Static Deployment Workflow

> ⚠️ **CRITICAL:** Always run `npm run build` before committing and pushing! The `/out` directory must be rebuilt whenever you change ANY files (code, public assets, etc.). Without rebuilding, your changes won't be deployed.

This project is configured to deploy pre-built static files to Vercel, bypassing the build step on Vercel's servers.

## Why Pre-build?

- ⚡ **Faster deployments** - No build step on Vercel (deploys in seconds)
- 💰 **Reduced costs** - Saves build minutes on Vercel
- 🎯 **Deploy what you tested** - Exactly what works locally goes to production

## Workflow

### 1. Make changes to your code
```bash
# Edit files in app/, components/, public/, etc.
```

### 2. Build locally ⚠️ **CRITICAL STEP**
```bash
npm run build
# This runs: next build && npm run generate-sitemap
# Output goes to /out directory
# Takes ~2-3 minutes to generate 13,860+ pages
```

**⚠️ IMPORTANT:** You MUST run `npm run build` BEFORE committing if you:
- Modified any files in `/public` (e.g., mobile-kodeks images)
- Changed app routes, components, or content
- Added new pages or updated existing ones

**Why?** The `/out` directory is what gets deployed. If you don't rebuild:
- Your changes won't be deployed
- Old/stale content will be served
- Public files won't be included

### 3. Test the build (optional but recommended)
```bash
npx serve out
# Visit http://localhost:3000 to verify
```

### 4. Commit and push
```bash
git add .
git commit -m "Your commit message"
git push
```

### 5. Vercel deploys automatically
Vercel will:
- Detect the push
- Use the pre-built `/out` directory (via `vercel.json`)
- Deploy instantly (no build step)
- Usually completes in 10-30 seconds

## Configuration

The following files enable this workflow:

### `vercel.json`
```json
{
  "buildCommand": "echo 'Using pre-built output'",
  "outputDirectory": "out",
  "framework": null
}
```

### `.gitignore`
The `/out/` directory is **NOT** ignored (normally it would be), so it gets committed.

### `next.config.ts`
```typescript
{
  output: 'export',  // Enables static export
  images: {
    unoptimized: true  // Required for static
  }
}
```

## Important Notes

1. **Always build before committing** - The `/out` directory must be up to date
2. **Large commits** - The `/out` directory contains ~127k files, so commits are large but pushes are fast
3. **No server-side features** - Static export means no API routes, no SSR, only client-side
4. **Mobile-kodeks updates** - When updating `/public/mobile-kodeks/`, rebuild and commit

## Reverting to Vercel Builds (if needed)

If you want Vercel to build remotely again:

1. Delete `vercel.json`
2. Add `/out/` back to `.gitignore`
3. Remove `/out` from git: `git rm -r --cached out`
4. Commit and push

## Troubleshooting

**Q: Deployment failed?**
A: Check that `/out` directory exists and is committed. Run `npm run build` first.

**Q: Changes not showing?**
A: Make sure you ran `npm run build` after making changes.

**Q: Push is slow?**
A: Large initial push is normal (~127k files). Subsequent pushes only send changed files.
