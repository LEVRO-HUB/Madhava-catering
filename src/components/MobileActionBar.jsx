import React from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../data/businessConfig.js';
import { useT } from '../i18n/LanguageContext.jsx';
import { openCallback } from './CallbackModal.jsx';

// Sticky bottom bar on phones: the three things a catering customer does most.
export default function MobileActionBar() {
  const t = useT();
  return (
    <nav className="m-bar" aria-label="Quick actions">
      <a href="tel:9840839157">{t('bar.call', 'Call')}</a>
      {WHATSAPP_NUMBER && (
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">{t('bar.wa', 'WhatsApp')}</a>
      )}
      <button type="button" onClick={openCallback}>{t('bar.cb', 'Call me')}</button>
      <Link to="/plan-your-event" className="is-main">{t('bar.plan', 'Plan')}</Link>
    </nav>
  );
}
