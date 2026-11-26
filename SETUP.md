# Madhava Catering – Round 3 setup

## 1. Put the files on the site (Windows)
1. Extract `madhava-round3-overlay.zip` **over** `C:\Users\harih\Madhava-catering` (choose "Replace files").
2. In PowerShell:
   ```
   cd C:\Users\harih\Madhava-catering
   git add -A
   git commit -m "Round 3: Tamil toggle, feast builder, lead capture, SEO pages, brochure"
   git push origin main
   ```
   Cloudflare Pages redeploys automatically (build command `npm run build`, output `dist`).

## 2. Turn on lead capture (optional but recommended)
Until this is done, enquiries still go to WhatsApp as before – nothing breaks.
1. Supabase: create a project, open **SQL editor**, run `supabase/enquiries.sql`.
2. Cloudflare Pages → your project → **Settings → Environment variables** (Production), add:
   - `SUPABASE_URL` – your project URL
   - `SUPABASE_SERVICE_ROLE_KEY` – service-role key (**secret**, never put it in the code)
   - Optional email alerts via Resend: `RESEND_API_KEY`, `NOTIFY_TO`, `NOTIFY_FROM`
3. Redeploy. Leads appear in Supabase → Table editor → `enquiries`.

## 3. Things the business controls
- **Festival banner**: edit `src/data/festival.js` (`enabled: true`, text, optional `until` date). Preview any time with `?banner=1`.
- **Brochure PDF**: `/brochure` is the printable page; `public/madhava-catering-brochure.pdf` was generated from it. After changing services/menus, regenerate: open `/brochure` → Print → Save as PDF → replace the file.
- **Tamil**: all Tamil text is in `src/i18n/ta.js`. **Have a native Tamil speaker review it before launch.** Blog articles, dish names and the contact form stay English for now.
- **Real domain**: set `SITE_URL` in `src/data/businessConfig.js`, then `npm run build:seo`.
- **Dish photos**: add PNGs under `public/assets/dishes/...` (paths are in `src/data/dishes.js`); the Feast Builder uses icons until then.
- Still placeholders needing real data: testimonials, prices, years in business, Puberty & Industrial service photos.
