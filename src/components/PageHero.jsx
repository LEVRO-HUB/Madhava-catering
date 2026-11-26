import React from 'react';
import { Link } from 'react-router-dom';
import { Gopuram, Lotus } from './Ornaments.jsx';
import { useT } from '../i18n/LanguageContext.jsx';

// Shared royal-temple page banner: deep maroon, gold gopuram silhouettes,
// kolam dot pattern and a breadcrumb. Used on every inner page.
export default function PageHero({ eyebrow, title, subtitle, crumb, children }) {
  const t = useT();
  return (
    <section className="page-hero">
      <div className="page-hero-pattern" aria-hidden="true" />
      <Gopuram className="page-hero-gopuram is-left" />
      <Gopuram className="page-hero-gopuram is-right" />
      <div className="container page-hero-inner">
        <nav className="page-hero-crumb" aria-label="Breadcrumb">
          <Link to="/">{t('crumb.home', 'Home')}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb || title}</span>
        </nav>
        {eyebrow && <span className="page-hero-eyebrow">{eyebrow}</span>}
        <h1 className="page-hero-title">{title}</h1>
        <div className="page-hero-orn" aria-hidden="true">
          <span />
          <Lotus />
          <span />
        </div>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
