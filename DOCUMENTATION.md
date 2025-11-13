# Technical Documentation

Complete technical reference for the Polish Driving License Test web application.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [How Page Generation Works](#how-page-generation-works)
4. [Database Layer](#database-layer)
5. [URL Slugification](#url-slugification)
6. [Type System](#type-system)
7. [Build Process](#build-process)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User's Browser                          │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                Static HTML Pages                      │  │
│  │  (Pre-rendered during build, served from CDN)        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↑
                            │ HTTPS
                            │
┌─────────────────────────────────────────────────────────────┐
│                  Cloudflare CDN (Edge Network)              │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Cached HTML Files (150+ edge locations)             │  │
│  │  - /pl/questions/123-pytanie.html                    │  │
│  │  - /en/questions/456-question.html                   │  │
│  │  - ... 13,568 more files                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↑
                            │ Deploy
                            │
┌─────────────────────────────────────────────────────────────┐
│                    Build Process (Local/CI)                 │
│                                                             │
│  1. npm run build                                           │
│     ↓                                                       │
│  2. Next.js reads SQLite databases                          │
│     ↓                                                       │
│  3. generateStaticParams() creates 13,568 routes            │
│     ↓                                                       │
│  4. Renders each route to static HTML                       │
│     ↓                                                       │
│  5. Output: 13,700 HTML files in /out directory            │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  SQLite Databases (public/databases/)               │   │
│  │  - database_pl.db  (3,392 questions)                │   │
│  │  - database_en.db  (3,392 questions)                │   │
│  │  - database_uk.db  (3,392 questions)                │   │
│  │  - database_de.db  (3,392 questions)                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **Static Site Generation (SSG)** - Pre-render all pages at build time
   - Why: Perfect SEO, instant loading, no backend cost
   - Trade-off: Must rebuild when content changes

2. **SQL.js (Build Time Only)** - Read SQLite databases in Node.js during build
   - Why: Reuse existing Flutter app databases without conversion
   - Trade-off: Databases must be included in repo (~12MB total)

3. **Next.js App Router** - Modern file-based routing with React Server Components
   - Why: Built-in SSG support, great DX, industry standard
   - Trade-off: Learning curve if unfamiliar

4. **Cloudflare Pages** - Static hosting with global CDN
   - Why: Free tier generous, fast deployment, edge caching
   - Trade-off: Static export only (no server-side features)

---

## File Structure

```
/web
├── app/                                 # Next.js App Router pages
│   ├── page.tsx                        # Root: redirects to /pl
│   ├── layout.tsx                      # Root layout (global styles)
│   ├── globals.css                     # Tailwind CSS imports
│   │
│   └── [locale]/                       # Locale-based routing
│       ├── layout.tsx                  # Validates locale, wraps children
│       ├── page.tsx                    # Landing page (4 versions: pl/en/uk/de)
│       │
│       ├── questions/
│       │   ├── page.tsx               # Question index (lists all by category)
│       │   │
│       │   └── [slug]/
│       │       └── page.tsx           # Individual question page
│       │                              # Implements generateStaticParams()
│       │                              # Generates 13,568 static pages
│       │
│       └── categories/
│           └── [slug]/
│               └── page.tsx           # Category page (all questions in category)
│                                      # Implements generateStaticParams()
│                                      # Generates 120 static pages
│
├── lib/                               # Shared utilities
│   ├── database.ts                   # SQL.js wrapper, database queries
│   ├── slugify.ts                    # URL slug generation
│   ├── types.ts                      # TypeScript interfaces
│   └── utils.ts                      # Utility functions (shadcn)
│
├── components/                       # Reusable React components
│   └── ui/                          # shadcn/ui components (if needed)
│
├── public/                          # Static assets
│   ├── databases/                   # SQLite database files
│   │   ├── database_pl.db          # Polish questions (2.8MB)
│   │   ├── database_en.db          # English questions (2.8MB)
│   │   ├── database_uk.db          # Ukrainian questions (3.1MB)
│   │   └── database_de.db          # German questions (2.8MB)
│   │
│   ├── sitemap.xml                 # Generated by scripts/generate-sitemap.ts
│   └── robots.txt                  # SEO directives for crawlers
│
├── scripts/                        # Build scripts
│   └── generate-sitemap.ts        # Generate sitemap.xml with all URLs
│
├── node_modules/                   # Dependencies
│   └── sql.js/                    # SQLite compiled to WebAssembly
│       └── dist/
│           ├── sql-wasm.wasm      # Used during build
│           └── sql-wasm.js        # SQLite JavaScript API
│
├── out/                            # Build output (generated by `npm run build`)
│   ├── pl/
│   │   ├── questions/
│   │   │   ├── 1-pytanie.html    # Static HTML files
│   │   │   ├── 2-pytanie.html
│   │   │   └── ... (3,392 files)
│   │   └── categories/
│   │       └── ... (30 files)
│   ├── en/
│   │   └── ... (same structure)
│   ├── uk/
│   │   └── ... (same structure)
│   └── de/
│       └── ... (same structure)
│
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # Quick start guide
```

---

## How Page Generation Works

### Overview

The magic happens during `npm run build`. Here's the complete flow:

```typescript
// 1. Next.js starts build process
npm run build

// 2. For each dynamic route, Next.js calls generateStaticParams()
//    Example: app/[locale]/questions/[slug]/page.tsx

export async function generateStaticParams() {
  const params = [];

  // 3. Loop through all locales
  for (const locale of ['pl', 'en', 'uk', 'de']) {

    // 4. Query database for all questions in this locale
    const questions = await getAllQuestionsWithAnswers(locale);
    // Returns 3,392 questions from database_pl.db (or en/uk/de)

    // 5. Generate slug for each question
    for (const question of questions) {
      params.push({
        locale: locale,
        slug: generateQuestionSlug(question.id, question.question)
        // Example: "123-co-oznacza-ten-znak-drogowy"
      });
    }
  }

  // 6. Return all params (13,568 total)
  return params;
}

// 7. Next.js renders each param to static HTML
//    Calls page component 13,568 times
export default async function QuestionPage({ params }) {
  const { locale, slug } = await params;
  const questionId = extractIdFromSlug(slug); // Extract "123" from slug
  const question = await getQuestionWithAnswers(locale, questionId);

  // 8. Render React component to HTML
  return <div>...</div>;
}

// 9. Output: 13,568 HTML files in /out directory
```

### Detailed Flow Diagram

```
┌────────────────────────────────────────────────────────────────┐
│ Step 1: npm run build                                          │
└─────────────┬──────────────────────────────────────────────────┘
              │
              ↓
┌────────────────────────────────────────────────────────────────┐
│ Step 2: Next.js compiles TypeScript → JavaScript               │
│         Validates configuration (next.config.ts)               │
└─────────────┬──────────────────────────────────────────────────┘
              │
              ↓
┌────────────────────────────────────────────────────────────────┐
│ Step 3: Initialize SQL.js                                      │
│         - Load sql-wasm.wasm from node_modules                 │
│         - Initialize SQLite engine in Node.js memory           │
└─────────────┬──────────────────────────────────────────────────┘
              │
              ↓
┌────────────────────────────────────────────────────────────────┐
│ Step 4: Load databases (lib/database.ts)                       │
│         - Read public/databases/database_pl.db into memory     │
│         - Read database_en.db, database_uk.db, database_de.db  │
│         - Cache in memory for fast access                      │
└─────────────┬──────────────────────────────────────────────────┘
              │
              ↓
┌────────────────────────────────────────────────────────────────┐
│ Step 5: Call generateStaticParams() for questions/[slug]       │
│                                                                │
│  for locale in [pl, en, uk, de]:                               │
│    questions = SELECT * FROM Questions WHERE locale = ?       │
│    for question in questions:                                  │
│      slug = slugify(question.id + question.question)          │
│      params.push({ locale, slug })                            │
│                                                                │
│  Returns: 13,568 params                                        │
└─────────────┬──────────────────────────────────────────────────┘
              │
              ↓
┌────────────────────────────────────────────────────────────────┐
│ Step 6: Call generateStaticParams() for categories/[slug]      │
│         Returns: 120 params (30 categories × 4 locales)        │
└─────────────┬──────────────────────────────────────────────────┘
              │
              ↓
┌────────────────────────────────────────────────────────────────┐
│ Step 7: Render each route to HTML                             │
│                                                                │
│  For each of 13,688 params:                                   │
│    1. Call page component with params                          │
│    2. Fetch question data from database                       │
│    3. Render React component                                  │
│    4. Convert to static HTML                                  │
│    5. Write to /out/{locale}/{type}/{slug}.html               │
│                                                                │
│  Progress: ████████████ (13700/13700) ✓                       │
└─────────────┬──────────────────────────────────────────────────┘
              │
              ↓
┌────────────────────────────────────────────────────────────────┐
│ Step 8: Generate sitemap (npm run generate-sitemap)            │
│         - Read all generated routes                            │
│         - Create sitemap.xml with all URLs                     │
│         - Save to public/sitemap.xml                           │
└─────────────┬──────────────────────────────────────────────────┘
              │
              ↓
┌────────────────────────────────────────────────────────────────┐
│ Step 9: Optimize assets                                        │
│         - Minify CSS                                           │
│         - Optimize JavaScript chunks                           │
│         - Compress HTML                                        │
└─────────────┬──────────────────────────────────────────────────┘
              │
              ↓
┌────────────────────────────────────────────────────────────────┐
│ ✓ Build Complete!                                              │
│   Output: /out directory with 13,700 static HTML files         │
│   Size: ~150MB (includes copied databases)                     │
│   Time: ~5 minutes                                             │
└────────────────────────────────────────────────────────────────┘
```

### Why This Approach Works

1. **Build Time Data Fetching** - All database queries happen during build
   - No database needed at runtime
   - Perfect for static hosting

2. **Parallel Rendering** - Next.js renders pages in parallel
   - Uses all CPU cores
   - 13,568 pages in ~5 minutes

3. **Deterministic Output** - Same input always produces same output
   - Reproducible builds
   - Safe for version control

---

## Database Layer

### SQL.js Integration (lib/database.ts)

```typescript
import initSqlJs, { Database } from 'sql.js';
import * as fs from 'fs';
import * as path from 'path';

// Initialize SQL.js with local WASM file
async function initSQL() {
  return await initSqlJs({
    locateFile: (file) => {
      // During build (Node.js), load from node_modules
      if (typeof window === 'undefined') {
        return path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file);
      }
      // In browser (not used for our static site)
      return `https://sql.js.org/dist/${file}`;
    },
  });
}

// Load database file for a specific locale
export async function getDatabase(locale: Locale): Promise<Database> {
  const SQL = await initSQL();
  const dbPath = path.join(process.cwd(), 'public', 'databases', `database_${locale}.db`);
  const buffer = fs.readFileSync(dbPath);
  return new SQL.Database(buffer);
}
```

### Database Schema

The SQLite databases from the Flutter app have this structure:

```sql
-- Questions table
CREATE TABLE Questions (
  id INTEGER PRIMARY KEY,
  category_id INTEGER NOT NULL,
  media TEXT,                      -- Image/video filename (nullable)
  question TEXT NOT NULL,
  points INTEGER NOT NULL,         -- 1, 2, or 3 points
  description TEXT,                -- Short description (nullable)
  explanation TEXT,                -- Detailed explanation (nullable)
  correct_answer INTEGER NOT NULL, -- Position: 0, 1, or 2
  type TEXT NOT NULL,              -- "AB" or "ABC"
  official_number INTEGER,         -- Government database ID (nullable)
  license_categories TEXT,         -- "A,B,C" comma-separated (nullable)
  FOREIGN KEY (category_id) REFERENCES Categories(id)
);

-- Answers table
CREATE TABLE Answers (
  id INTEGER PRIMARY KEY,
  question_id INTEGER NOT NULL,
  answer TEXT NOT NULL,
  position INTEGER NOT NULL,       -- 0=A, 1=B, 2=C
  FOREIGN KEY (question_id) REFERENCES Questions(id)
);

-- Categories table
CREATE TABLE Categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL               -- Localized category name
);

-- QuestionCategories table (license filtering)
CREATE TABLE QuestionCategories (
  question_id INTEGER NOT NULL,
  category_code TEXT NOT NULL,     -- "A", "B", "C", "D", "T", "AM", etc.
  PRIMARY KEY (question_id, category_code),
  FOREIGN KEY (question_id) REFERENCES Questions(id)
);
```

### Query Functions

```typescript
// Get all questions for a locale
export async function getAllQuestions(locale: Locale): Promise<Question[]> {
  const db = await getDatabase(locale);
  const result = db.exec('SELECT * FROM Questions ORDER BY id');
  return mapRowsToQuestions(result);
}

// Get question with answers
export async function getQuestionWithAnswers(
  locale: Locale,
  questionId: number
): Promise<QuestionWithAnswers> {
  const question = await getQuestion(locale, questionId);
  const answers = await getAnswers(locale, questionId);
  const category = await getCategory(locale, question.category_id);

  return { ...question, answers, category };
}

// Get all questions in a category
export async function getQuestionsByCategory(
  locale: Locale,
  categoryId: number
): Promise<QuestionWithAnswers[]> {
  const db = await getDatabase(locale);
  const result = db.exec(
    'SELECT * FROM Questions WHERE category_id = ? ORDER BY id',
    [categoryId]
  );
  // ... map and join with answers
}
```

---

## URL Slugification

### Slugify Algorithm (lib/slugify.ts)

```typescript
import slugifyLib from 'slugify';

// Configure slugify for multi-language support
const SLUGIFY_OPTIONS = {
  lower: true,              // Convert to lowercase
  strict: true,             // Remove special characters
  remove: /[*+~.()'"!:@]/g, // Additional characters to remove
  locale: 'pl',             // Polish locale for proper character mapping
};

// Maximum slug length before truncation
const MAX_SLUG_LENGTH = 70;

// Generate slug from text
export function generateSlug(text: string): string {
  // Truncate if too long
  let truncated = text;
  if (text.length > MAX_SLUG_LENGTH) {
    truncated = text.substring(0, MAX_SLUG_LENGTH);

    // Try to truncate at word boundary
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > MAX_SLUG_LENGTH * 0.7) {
      truncated = truncated.substring(0, lastSpace);
    }
  }

  // Apply slugify
  return slugifyLib(truncated, SLUGIFY_OPTIONS);
}

// Generate question slug: {id}-{slug}
export function generateQuestionSlug(id: number, questionText: string): string {
  const slug = generateSlug(questionText);
  return `${id}-${slug}`;
}

// Extract ID from slug
export function extractIdFromSlug(slug: string): number {
  const match = slug.match(/^(\d+)-/);
  if (!match) throw new Error(`Invalid slug format: ${slug}`);
  return parseInt(match[1], 10);
}
```

### Character Mapping Examples

```typescript
// Polish characters
"ą" → "a"
"ć" → "c"
"ę" → "e"
"ł" → "l"
"ń" → "n"
"ó" → "o"
"ś" → "s"
"ź" → "z"
"ż" → "z"

// Ukrainian characters
"і" → "i"
"ї" → "i"
"є" → "ie"

// German characters
"ä" → "a"
"ö" → "o"
"ü" → "u"
"ß" → "ss"

// Example transformations
"Co oznacza ten znak?"
  → "co oznacza ten znak" (lowercase)
  → "co-oznacza-ten-znak" (spaces to hyphens)

"123" + "co-oznacza-ten-znak"
  → "123-co-oznacza-ten-znak" (final slug)
```

---

## Type System

### Core Types (lib/types.ts)

```typescript
// Supported locales
export type Locale = 'pl' | 'en' | 'uk' | 'de';

// Database models
export interface Question {
  id: number;
  category_id: number;
  media: string | null;
  question: string;
  points: number;
  description: string | null;
  explanation: string | null;
  correct_answer: number;
  type: string;
  official_number: number | null;
  license_categories: string | null;
}

export interface Answer {
  id: number;
  question_id: number;
  answer: string;
  position: number;
}

export interface Category {
  id: number;
  name: string;
}

// Composite types
export interface QuestionWithAnswers extends Question {
  answers: Answer[];
  category: Category;
}

export interface QuestionWithSlug extends QuestionWithAnswers {
  slug: string;
}

// Page params
export interface QuestionPageParams {
  locale: Locale;
  slug: string;
}
```

---

## Build Process

### Build Configuration (next.config.ts)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',                // Enable static export
  images: {
    unoptimized: true,            // Required for static export
  },
  trailingSlash: true,            // Add trailing slash to URLs
};

export default nextConfig;
```

### Build Scripts (package.json)

```json
{
  "scripts": {
    "dev": "next dev",                    // Development server
    "build": "next build && npm run generate-sitemap", // Build static site + sitemap
    "generate-sitemap": "tsx scripts/generate-sitemap.ts" // Generate sitemap.xml
  }
}
```

### Build Output Structure

```
/out
├── _next/                    # Next.js static assets
│   ├── static/              # JavaScript chunks
│   └── ...
│
├── pl/
│   ├── index.html           # Landing page
│   ├── questions/
│   │   ├── index.html       # Question index
│   │   ├── 1-pytanie-1.html
│   │   ├── 2-pytanie-2.html
│   │   └── ... (3,392 files)
│   └── categories/
│       ├── 1-kategoria-1.html
│       └── ... (30 files)
│
├── en/ (same structure)
├── uk/ (same structure)
├── de/ (same structure)
│
├── sitemap.xml
└── robots.txt
```

---

## Deployment

### Cloudflare Pages Setup

1. **Connect Repository:**
   ```
   Cloudflare Dashboard → Pages → Create Project → Connect Git
   ```

2. **Build Settings:**
   ```
   Build command: npm run build
   Build output directory: out
   Environment variables: (none needed)
   ```

3. **Deploy:**
   - Automatic on every git push to main
   - Manual via Wrangler CLI: `wrangler pages deploy out`

### Deployment Checklist

- [ ] Update `BASE_URL` in `scripts/generate-sitemap.ts`
- [ ] Update sitemap URL in `public/robots.txt`
- [ ] Configure custom domain in Cloudflare
- [ ] Enable "Always Use HTTPS"
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

---

## Troubleshooting

### Build Errors

#### Error: "ENOENT: no such file or directory, open '...sql-wasm.wasm'"

**Cause:** SQL.js can't find WASM file

**Fix:** Check `lib/database.ts` locateFile function:
```typescript
return path.join(process.cwd(), 'node_modules', 'sql.js', 'dist', file);
```

#### Error: "Failed to collect page data for /[locale]/questions/[slug]"

**Cause:** Database query failed or question not found

**Fix:** Check database files exist in `public/databases/`

#### Error: "Invalid slug format"

**Cause:** Slug doesn't match `{id}-{text}` pattern

**Fix:** Check `generateQuestionSlug()` in `lib/slugify.ts`

### Runtime Errors

#### 404 on question pages

**Cause:** Page wasn't generated during build

**Fix:** Check `generateStaticParams()` in question page

#### Broken links

**Cause:** Slug mismatch between link and actual file

**Fix:** Use `generateQuestionSlug()` consistently everywhere

### Performance Issues

#### Slow build time (>10 minutes)

**Possible causes:**
- Disk I/O slow (use SSD)
- Low memory (increase Node heap: `NODE_OPTIONS=--max-old-space-size=4096`)
- Many parallel builds (limit to one at a time)

#### Large output size (>200MB)

**Expected:** ~150MB with databases
**If larger:** Check for duplicate files or unoptimized assets

---

## Development Workflow

### Local Development

```bash
# 1. Clone repository
git clone <repo>
cd web

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
open http://localhost:3000
```

### Making Changes

1. **Edit code** in `app/`, `lib/`, or `components/`
2. **Hot reload** automatically updates browser
3. **Test locally** with dev server
4. **Build** to verify static generation works
5. **Deploy** (git push or wrangler)

### Testing Production Build

```bash
# Build static site + sitemap
npm run build

# Serve locally (requires http-server or similar)
npx http-server out -p 3000

# Or use Next.js preview (limited functionality)
npx serve out
```

---

## Advanced Topics

### Adding New Languages

1. **Add locale type:**
   ```typescript
   // lib/types.ts
   export type Locale = 'pl' | 'en' | 'uk' | 'de' | 'fr'; // Add 'fr'
   ```

2. **Add database:**
   ```bash
   cp database_fr.db public/databases/
   ```

3. **Add translations:**
   ```typescript
   // app/[locale]/page.tsx
   const translations = {
     // ... existing
     fr: { title: 'Permis de conduire...', ... }
   };
   ```

4. **Update locale list:**
   ```typescript
   const locales: Locale[] = ['pl', 'en', 'uk', 'de', 'fr'];
   ```

5. **Rebuild:**
   ```bash
   npm run build
   ```

### Adding Media Support

Question pages expect media files but don't render them yet. To add:

1. **Store media in:** `public/media/`

2. **Update question page:**
   ```tsx
   {question.media && (
     <Image
       src={`/media/${question.media}`}
       alt={question.question}
       width={800}
       height={600}
     />
   )}
   ```

3. **Optimize images:**
   - Convert to WebP
   - Generate responsive sizes
   - Add lazy loading

---

## References

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [SQL.js Documentation](https://sql.js.org/#/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

---

**Last Updated:** November 2024
**Documentation Version:** 1.0