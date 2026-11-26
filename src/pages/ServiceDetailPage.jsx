import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import CtaBand from '../components/CtaBand.jsx';
import FaqAccordion from '../components/FaqAccordion.jsx';
import { SectionHeading } from '../components/Ornaments.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import PredefinedMenuCard from '../components/PredefinedMenuCard.jsx';
import { services } from '../data/services.js';
import { occasionGroups } from '../data/siteContent.js';
import { predefinedMenus } from '../data/predefinedMenus.js';
import { SITE_URL, BUSINESS_NAME, BUSINESS_PHONES } from '../data/businessConfig.js';
import { useT, localizeService } from '../i18n/LanguageContext.jsx';
import NotFound from './NotFoundPage.jsx';
import '../styles/services.css';
import '../styles/predefined-menus.css';

// One crawlable page per service: only text already on the site (title,
// description) plus real links — no invented claims.
export default function ServiceDetailPage() {
  const { id } = useParams();
  const t = useT();
  const raw = services.find((s) => s.id === id);
  if (!raw) return <NotFound />;
  const s = localizeService(raw, t);
  const group = occasionGroups.find((g) => g.ids.includes(raw.id));
  const related = (group ? group.items : services).filter((x) => x.id !== raw.id).slice(0, 3);
  const veg = predefinedMenus.filter((m) => m.vegNonVeg === 'veg').slice(0, 3);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: raw.title,
      description: raw.description,
      serviceType: 'Catering',
      areaServed: ['Chennai', 'Tamil Nadu'],
      provider: { '@type': 'FoodEstablishment', name: BUSINESS_NAME, url: SITE_URL, telephone: BUSINESS_PHONES[0] },
      url: `${SITE_URL}/services/${raw.id}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
        { '@type': 'ListItem', position: 3, name: raw.title, item: `${SITE_URL}/services/${raw.id}` },
      ],
    },
  ];

  return (
    <>
      <Seo
        title={`${raw.title} in Chennai & Tamil Nadu`}
        description={raw.description}
        path={`/services/${raw.id}`}
        image={raw.image}
        jsonLd={jsonLd}
      />
      <PageHero eyebrow={t('svc.eyebrow', 'Our Services')} title={s.title} crumb={s.title} subtitle={s.description}>
        <div className="page-hero-actions">
          <Link to={`/plan-your-event?event=${raw.id}`} className="btn btn-primary">{t('sd.plan', 'Plan this event')}</Link>
          <Link to="/build-your-feast" className="btn btn-outline-light">{t('hero.feast', 'Build Your Feast')}</Link>
        </div>
      </PageHero>

      <section className="section sd-body">
        <div className="container sd-grid">
          <img className="sd-img" src={raw.image} alt={`${raw.title} — ${BUSINESS_NAME}`} loading="eager" />
          <div>
            <SectionHeading align="left" eyebrow={t('sd.what', 'About this service')} title={s.title} />
            <p className="rv">{s.description}</p>
            <p className="rv">{t('about.p2', 'We serve Chennai and across Tamil Nadu, with menus planned around your family’s customs — including vegetarian and Brahmin catering.')}</p>
          </div>
        </div>
      </section>

      <section className="section is-tinted predefined-menus">
        <div className="container">
          <SectionHeading eyebrow={t('pkg.menus.eyebrow', 'Signature Menus')} title={t('sd.menus', 'Menus you can explore')} />
          <div className="menu-pkg-grid">
            {veg.map((m) => <PredefinedMenuCard key={m.id} menu={m} />)}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section services-page">
          <div className="container">
            <SectionHeading eyebrow={t('svc.eyebrow', 'Our Services')} title={t('sd.related', 'Other services')} />
            <div className="services-grid">
              {related.map((r) => (
                <Link key={r.id} to={`/services/${r.id}`} className="sd-rel"><ServiceCard service={r} linkable={false} /></Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqAccordion limit={4} />
      <CtaBand />
    </>
  );
}
