import React from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../data/businessConfig.js';
import { Gopuram } from './Ornaments.jsx';
import { useT } from '../i18n/LanguageContext.jsx';

export default function CtaBand({
  title,
  text,
}) {
  const t = useT();
  return (
    <section className="cta-band">
      <Gopuram className="cta-band-gopuram" />
      <div className="container cta-band-inner">
        <h2 className="rv">{title || t('cta.title', 'Let’s Plan Your Celebration')}</h2>
        <p className="rv">{text || t('cta.text', 'Tell us about your occasion and we will help you shape a menu worthy of it.')}</p>
        <div className="cta-band-actions rv">
          <Link to="/plan-your-event" className="btn btn-primary">{t('cta.plan', 'Plan Your Event')}</Link>
          <a href="tel:9840839157" className="btn btn-outline-light">{t('cta.call', 'Call')} 98408 39157</a>
          {WHATSAPP_NUMBER && (
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
            >
              {t('cta.wa', 'WhatsApp Us')}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
