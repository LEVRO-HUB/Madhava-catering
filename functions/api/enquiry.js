// Cloudflare Pages Function: POST /api/enquiry
// Validates an enquiry, stores it in Supabase (REST) and optionally emails it
// via Resend. Every secret comes from Pages environment variables — nothing is
// hard-coded. If no storage is configured the function answers 503 and the
// site silently falls back to WhatsApp.
//
// Env vars (Pages → Settings → Environment variables):
//   SUPABASE_URL                e.g. https://xxxx.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY   (secret) — server only, never in the browser
//   RESEND_API_KEY              (secret, optional) email notification
//   NOTIFY_TO                   recipient email for notifications
//   NOTIFY_FROM                 verified sender, e.g. "Madhava Site <leads@yourdomain>"

const PHONE_RE = /^[6-9]\d{9}$/;
const MAX = { name: 80, text: 400, notes: 1500 };
const clean = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return json({ ok: false, error: 'bad_json' }, 400);
  }

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return json({ ok: true });

  const phone = clean(body.phone, 20).replace(/[\s-]/g, '').replace(/^(\+?91)/, '');
  const name = clean(body.name, MAX.name);
  if (!name || !PHONE_RE.test(phone)) return json({ ok: false, error: 'invalid' }, 400);

  const lead = {
    source: clean(body.source, 40) || 'planner',
    name,
    phone,
    occasion: clean(body.occasion, MAX.text),
    event_date: /^\d{4}-\d{2}-\d{2}$/.test(body.date || '') ? body.date : null,
    guests: clean(body.guests, 40),
    city: clean(body.city, MAX.text),
    meals: clean(body.meals, MAX.text),
    diet: clean(body.diet, 80),
    menu: clean(body.menu, 120),
    notes: clean(body.notes, MAX.notes),
    page: clean(body.page, 120),
    lang: body.lang === 'ta' ? 'ta' : 'en',
  };

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) return json({ ok: false, error: 'not_configured' }, 503);

  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/enquiries`, {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
  });
  if (!res.ok) return json({ ok: false, error: 'store_failed' }, 502);

  if (env.RESEND_API_KEY && env.NOTIFY_TO && env.NOTIFY_FROM) {
    const text = Object.entries(lead)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    // Best-effort: an email failure must not fail the enquiry.
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.NOTIFY_FROM,
          to: [env.NOTIFY_TO],
          subject: `New catering enquiry — ${lead.name} (${lead.source})`,
          text,
        }),
      });
    } catch (e) {
      /* ignore */
    }
  }
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, error: 'method_not_allowed' }, 405);
