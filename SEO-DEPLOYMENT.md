DEPLOYING WITH SEO/PRERENDERING — READ BEFORE LAUNCH
======================================================

1. SET THE REAL DOMAIN FIRST
   src/data/businessConfig.js has a placeholder SITE_URL
   ('https://www.madhavacateringservices.example'). Every canonical URL,
   Open Graph tag, JSON-LD field, sitemap.xml and robots.txt entry is
   generated from this constant. Set it to the real production domain
   before the final deploy build.

2. BUILD COMMAND FOR DEPLOYMENT
   Use this instead of a plain `npm run build`:

       npm run build:seo

   This runs, in order:
     - seo:sitemap   -> regenerates public/sitemap.xml + public/robots.txt
     - build         -> the normal Vite production build
     - seo:prerender -> visits every route in a headless browser and saves
                        its fully-rendered HTML as that route's own static
                        index.html inside dist/ (e.g. dist/blog/some-post/
                        index.html), so a crawler or a direct URL hit gets
                        real article content and correct <title>/meta tags
                        immediately — not a blank <div id="root"></div>
                        shell. The JS bundle is untouched and still loads
                        normally, so client-side navigation keeps working
                        exactly as before.

3. ADDING A NEW BLOG POST OR MENU PACKAGE
   After adding an entry to src/data/blogPosts.js or
   src/data/predefinedMenus.js, just run `npm run build:seo` again — the
   sitemap and prerendered pages are regenerated from that same data, no
   manual route list to maintain.

4. HOSTING REQUIREMENT
   Deploy the dist/ folder as-is to any static host (Netlify, Vercel static,
   S3+CloudFront, GitHub Pages, etc.). Almost all of these already serve
   nested index.html files for their matching path (e.g. a request for
   /blog/some-post/ serves dist/blog/some-post/index.html) — no special
   server-side rendering is required. If your host needs an explicit
   rewrite rule for this, configure it to serve <path>/index.html for an
   exact path match before falling back to the SPA's root index.html for
   anything else.
