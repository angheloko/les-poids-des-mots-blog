import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

const BASE_URL = 'https://les-poids-des-mots.blog';
const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

function generateSitemap() {
  const posts = fs.readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
      const { attributes } = frontMatter<any>(content);
      return {
        slug: attributes.slug || file.replace('.md', ''),
        date: attributes.date ? new Date(attributes.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      };
    });

  const staticPages = [
    { url: '', lastmod: new Date().toISOString().split('T')[0] },
    { url: 'about', lastmod: new Date().toISOString().split('T')[0] }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${BASE_URL}/${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.url === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
${posts.map(post => `  <url>
    <loc>${BASE_URL}/post/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`;

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR);
  }
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();
