// Business-level configuration for the predefined-menu enquiry handoff.
//
// WHATSAPP NUMBER: set to the catering business's WhatsApp-enabled number,
// in international format with no spaces, '+' or leading zeros
// (e.g. a number shown as "98408 39157" in India becomes "919840839157").
//
// This currently reuses the first contact number shown on the site footer
// (98408 39157). CONFIRM this number actually has WhatsApp enabled before
// launch — if it doesn't, replace it with the correct WhatsApp business
// number, or set it to '' to show the "not configured" notice instead of
// a non-working link.
export const WHATSAPP_NUMBER = '919840839157';

// ⚠ PLACEHOLDER DOMAIN — no real production domain has been confirmed yet.
// Every canonical URL, Open Graph tag, JSON-LD field and the sitemap/
// robots.txt below are generated from this constant. Set it to the real
// domain before launch (no trailing slash), then re-run:
//   node scripts/generate-sitemap.mjs
//   npm run build && node scripts/prerender.mjs
export const SITE_URL = 'https://www.madhavacateringservices.example';

// Verified contact details only (shown on the site itself) — used in
// JSON-LD. Do NOT add address, opening hours, ratings or review counts
// here unless the business confirms them; see PART 7 of the SEO brief.
export const BUSINESS_NAME = 'Madhava Catering Services';
export const BUSINESS_PHONES = ['+919840839157', '+919566160584'];
export const BUSINESS_LOGO = '/assets/logo/madhava-logo.png';
