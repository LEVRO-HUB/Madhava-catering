// Post-build SPA prerenderer.
//
// This is a Vite + React SPA (client-side routing via react-router). A
// crawler hitting a route directly only sees whatever is in dist/index.html
// until the JS bundle runs — which is an empty <div id="root"></div> shell.
// This script fixes that for the routes that need to be indexed: it serves
// the built dist/ folder with `vite preview` (SPA fallback: any route
// resolves to index.html and the client renders it, same as production),
// visits each real route in a headless browser so React/Helmet render it
// fully, then saves that rendered HTML as that route's own static
// index.html. The JS bundle is left in place and still loads/takes over
// for client-side navigation — this only changes what the very first HTML
// response contains for a direct hit on that route.
//
// Run after `npm run build`:
//     npm run build && node scripts/prerender.mjs
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))), '..');
const distDir = path.join(root, 'dist');
const PORT = 4523;

async function getRoutes() {
  const { predefinedMenus } = await import('../src/data/predefinedMenus.js');
  const { blogPosts } = await import('../src/data/blogPosts.js');
  return [
    '/',
    '/about',
    '/services',
    '/packages',
    '/menus',
    '/gallery',
    '/plan-your-event',
    '/blog',
    '/contact',
    ...predefinedMenus.map((m) => `/menus/${m.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
  ];
}

function routeToFile(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

function waitForServer(url, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const tryOnce = () => {
      fetch(url)
        .then(() => resolve())
        .catch(() => {
          if (Date.now() > deadline) reject(new Error('preview server did not start in time'));
          else setTimeout(tryOnce, 300);
        });
    };
    tryOnce();
  });
}

async function run() {
  if (!fs.existsSync(distDir)) {
    console.error('dist/ not found — run `npm run build` first.');
    process.exit(1);
  }

  const routes = await getRoutes();

  const preview = spawn(`npx vite preview --port ${PORT} --strictPort`, {
    cwd: root,
    stdio: 'ignore',
    shell: true,
  });

  try {
    await waitForServer(`http://localhost:${PORT}/`);

    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (const route of routes) {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });
      // Give react-helmet-async's effect a tick to finish applying <head> tags.
      await page.waitForTimeout(150);
      const html = await page.content();
      const outFile = routeToFile(route);
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, html);
      console.log(`prerendered: ${route} -> ${path.relative(root, outFile)}`);
    }

    await browser.close();
  } finally {
    preview.kill();
  }
}

run();
