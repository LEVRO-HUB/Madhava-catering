import React from 'react';
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import { services } from '../data/services.js';
import { predefinedMenus } from '../data/predefinedMenus.js';
import { BUSINESS_NAME, BUSINESS_PHONES } from '../data/businessConfig.js';
import { useT, localizeService } from '../i18n/LanguageContext.jsx';
import '../styles/brochure.css';

// E-brochure: a print-optimised page (Print → Save as PDF works in any
// browser) plus a pre-generated PDF at /madhava-catering-brochure.pdf.
export default function BrochurePage() {
  const t = useT();
  return (
    <>
      <Seo title="E-Brochure | Catering Services & Menus" description="Download the Madhava Catering Services brochure: our catering services, signature menus and contact details." path="/brochure" />
      <div className="br-screen">
        <PageHero eyebrow={t('br.eyebrow', 'Brochure')} title={t('br.title', 'Madhava Catering Brochure')} crumb={t('br.eyebrow', 'Brochure')} subtitle={t('br.sub', 'Our services, menus and contact details — download, print or share.')}>
          <div className="page-hero-actions">
            <a className="btn btn-primary" href="/madhava-catering-brochure.pdf" download>{t('br.download', 'Download PDF')}</a>
            <button type="button" className="btn btn-outline-light" onClick={() => window.print()}>{t('br.print', 'Print')}</button>
          </div>
        </PageHero>
      </div>
      <section className="br-sheet section">
        <div className="container br-doc">
          <header className="br-head">
            <img src="/assets/logo/madhava-logo.png" alt="" width="90" />
            <div>
              <h1>{BUSINESS_NAME}</h1>
              <p>Traditional South Indian catering · Chennai &amp; across Tamil Nadu</p>
            </div>
          </header>
          <h2>Our Services</h2>
          <ul className="br-services">
            {services.map((raw) => {
              const s = localizeService(raw, t);
              return (
                <li key={s.id}>
                  <strong>{s.title}</strong>
                  <span>{s.description}</span>
                </li>
              );
            })}
          </ul>
          <h2>Signature Menus</h2>
          <ul className="br-menus">
            {predefinedMenus.map((m) => (
              <li key={m.id}><strong>{m.name}</strong>{m.vegNonVeg === 'veg' ? ' · Vegetarian' : ''}</li>
            ))}
          </ul>
          <footer className="br-foot">
            <p><strong>Call:</strong> {BUSINESS_PHONES.map((p) => p.replace('+91', '')).join(' / ')} · <strong>WhatsApp:</strong> 98408 39157</p>
            <p>Final menus, quantities and arrangements are confirmed with you before the event.</p>
          </footer>
        </div>
      </section>
    </>
  );
}
