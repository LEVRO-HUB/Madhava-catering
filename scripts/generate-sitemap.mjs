// Regenerates public/sitemap.xml and public/robots.txt from the actual
// routes in the app (home, services, menus + each menu slug, blog + each
// article slug). Run after adding/removing a menu or blog post:
//     node scripts/generate-sitemap.mjs
// Uses SITE_URL from src/data/businessConfig.js — update that constant to
// the real production domain before generating the final sitemap.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))), '..');

async function run() {
  // Plain require-free read of the two data modules via dynamic import
  // (they're ESM; Node can import .js directly given "type": "module").
  const { SITE_URL } = await import('../src/data/businessConfig.js');
  const { predefinedMenus } = await import('../src/data/predefinedMenus.js');
  const { blogPosts } = await import('../src/data/blogPosts.js');

  const staticRoutes = ['/', '/services', '/menus', '/blog', '/contact'];
  const menuRoutes = predefinedMenus.map((m) => `/menus/${m.slug}`);
  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`);
  const routes = [...staticRoutes, ...menuRoutes, ...blogRoutes];

  const urls = routes
    .map((route) => {
      const loc = `${SITE_URL}${route === '/' ? '/' : route}`;
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap);
  console.log(`Wrote sitemap.xml with ${routes.length} URLs.`);

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(root, 'public', 'robots.txt'), robots);
  console.log('Wrote robots.txt.');
}

run();
