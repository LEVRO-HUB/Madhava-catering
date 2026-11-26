import React, { useEffect, useRef, useState } from 'react';
import { WHATSAPP_NUMBER } from '../data/businessConfig.js';
import { submitLead, track } from '../lib/lead.js';
import { useT } from '../i18n/LanguageContext.jsx';

const PHONE_RE = /^[6-9]\d{9}$/;
const TIMES = ['Morning', 'Afternoon', 'Evening', 'Anytime'];
export const openCallback = () => window.dispatchEvent(new Event('madhava:callback'));

// "Request a call back" dialog, opened from the floating button / mobile bar.
export default function CallbackModal() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | ok | fail
  const [err, setErr] = useState('');
  const [f, setF] = useState({ name: '', phone: '', time: 'Anytime', website: '' });
  const nameRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    const on = () => {
      lastFocus.current = document.activeElement;
      setStatus('idle');
      setErr('');
      setOpen(true);
    };
    window.addEventListener('madhava:callback', on);
    return () => window.removeEventListener('madhava:callback', on);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    nameRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line
  }, [open]);

  const close = () => {
    setOpen(false);
    lastFocus.current?.focus?.();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!f.name.trim() || !PHONE_RE.test(f.phone.replace(/\s/g, ''))) {
      setErr(t('cb.err', 'Please enter your name and a valid 10-digit mobile number.'));
      return;
    }
    setErr('');
    setStatus('sending');
    track('callback_request');
    const r = await submitLead({ source: 'callback', name: f.name, phone: f.phone, notes: `Preferred time: ${f.time}`, website: f.website });
    setStatus(r.ok ? 'ok' : 'fail');
  };

  if (!open) return null;
  const wa = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hello Madhava Catering Services, please call me back. Name: ${f.name} Phone: ${f.phone} (${f.time})`)}`
    : '';

  return (
    <div className="cb-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="cb-dialog" role="dialog" aria-modal="true" aria-labelledby="cb-title">
        <button type="button" className="cb-x" onClick={close} aria-label={t('cb.close', 'Close')}>×</button>
        <h2 id="cb-title">{t('cb.title', 'We’ll call you back')}</h2>
        {status === 'ok' ? (
          <p className="cb-ok" role="status">{t('cb.ok', 'Thank you! We will call you shortly.')}</p>
        ) : (
          <form onSubmit={submit} noValidate>
            <p>{t('cb.sub', 'Leave your number and a convenient time and we will ring you.')}</p>
            <label htmlFor="cb-name">{t('cb.name', 'Your name')}</label>
            <input id="cb-name" ref={nameRef} type="text" autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
            <label htmlFor="cb-phone">{t('cb.phone', 'Mobile number')}</label>
            <input id="cb-phone" type="tel" inputMode="numeric" autoComplete="tel" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
            <label htmlFor="cb-time">{t('cb.time', 'Convenient time')}</label>
            <select id="cb-time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })}>
              {TIMES.map((x, i) => <option key={x} value={x}>{t(`cb.t.${i}`, x)}</option>)}
            </select>
            <div className="hp-field" aria-hidden="true">
              <input type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => setF({ ...f, website: e.target.value })} />
            </div>
            {err && <p className="planner-error" role="alert">{err}</p>}
            {status === 'fail' && (
              <p className="planner-error" role="alert">
                {t('cb.fail', 'Could not send. Please call us or WhatsApp instead.')}
                {wa && <> <a href={wa} target="_blank" rel="noopener noreferrer">{t('cb.wa', 'Or message us on WhatsApp')}</a></>}
              </p>
            )}
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>{t('cb.send', 'Request a call')}</button>
          </form>
        )}
      </div>
    </div>
  );
}
