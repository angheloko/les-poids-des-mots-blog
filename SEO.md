# SEO Strategy - Les Poids des Mots

This document outlines the SEO strategy and implementations for the "Les Poids des Mots" blog.

## Core Implementations

### 1. Dynamic Metadata
We use a custom `SEO` component (`src/components/SEO.tsx`) that updates the following on every route change:
- `document.title`
- `meta[name="description"]`
- `link[rel="canonical"]`
- Open Graph tags (`og:title`, `og:description`, `og:url`, `og:image`, `og:type`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

### 2. Structured Data (JSON-LD)
Pages include specific JSON-LD scripts to help search engines understand the content:
- **Home**: `Blog` type.
- **About**: `AboutPage` type with `Person` entity.
- **Post**: `BlogPosting` type with specific details (headline, date, author).

### 3. Automated Sitemap
A script `scripts/generate-sitemap.ts` automatically generates `public/sitemap.xml` by scanning the markdown files in `src/content/posts`.
- This script is hooked into the build process (`npm run build` calls `npm run sitemap`).
- It ensures that new posts are immediately indexed after deployment.

### 4. Robots Configuration
`public/robots.txt` is configured to:
- Allow all user agents.
- Point explicitly to the sitemap URL.

## Technical Considerations

### Single Page Application (SPA)
Since this is a client-side React app, we rely on search engines executing JavaScript. To further improve SEO, consider:
- **SSG (Static Site Generation)**: Converting the app to a framework like Astro or Next.js for pre-rendered HTML.
- **Prerendering**: Using a service like Prerender.io if static generation isn't feasible.

### Performance & Accessibility
- **Images**: Ensure all images in markdown have descriptive `alt` text.
- **Semantic HTML**: Maintain the use of `<article>`, `<header>`, `<nav>`, and `<main>` tags.
- **Core Web Vitals**: Monitor Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) especially with the E-Ink refresh animations.

## Maintenance
When adding new posts:
1. Ensure the markdown frontmatter includes `title`, `slug`, `date`, `excerpt`, and `tags`.
2. The sitemap will update automatically on the next build.
