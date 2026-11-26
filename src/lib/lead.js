// Lead capture helper. Posts to the Cloudflare Pages Function at /api/enquiry.
// WhatsApp stays the guaranteed fallback: callers must never block the visitor
// on this call — it resolves { ok: false } instead of throwing.

export async function submitLead(payload) {
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, page: window.location.pathname, lang: document.documentElement.lang || 'en' }),
    });
    if (!res.ok) return { ok: false };
    const data = await res.json().catch(() => ({}));
    return { ok: data.ok !== false };
  } catch (e) {
    return { ok: false };
  }
}

// Privacy-friendly no-op analytics hook. Wire to GA4 / Plausible later by
// defining window.__track (or editing this one function).
export function track(event, props = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.__track === 'function') window.__track(event, props);
  } catch (e) {
    /* ignore */
  }
}
