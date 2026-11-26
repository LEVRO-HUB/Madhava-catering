import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { festivalBanner as cfg } from '../data/festival.js';
import { useLang } from '../i18n/LanguageContext.jsx';

export default function FestivalBanner() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const preview = new URLSearchParams(window.location.search).get('banner') === '1';
    const active = cfg.enabled && (!cfg.until || new Date().toISOString().slice(0, 10) <= cfg.until);
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(`banner-${cfg.id}`) === '1';
    } catch (e) {
      /* ignore */
    }
    setShow(preview || (active && !dismissed));
  }, []);

  if (!show) return null;
  const close = () => {
    setShow(false);
    try {
      sessionStorage.setItem(`banner-${cfg.id}`, '1');
    } catch (e) {
      /* ignore */
    }
  };
  return (
    <div className="festival-banner" role="region" aria-label="Offer">
      <span className="festival-orn" aria-hidden="true">✦</span>
      <span>{lang === 'ta' ? cfg.textTa : cfg.text}</span>
      <Link to={cfg.link} className="festival-cta">{lang === 'ta' ? cfg.ctaTa : cfg.cta}</Link>
      <button type="button" className="festival-close" onClick={close} aria-label="Close">×</button>
    </div>
  );
}
