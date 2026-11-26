import React from 'react';
import { predefinedMenus } from '../data/predefinedMenus.js';
import PredefinedMenuCard from './PredefinedMenuCard.jsx';
import Seo from './Seo.jsx';
import PageHero from './PageHero.jsx';
import CtaBand from './CtaBand.jsx';
import { Link } from 'react-router-dom';
import '../styles/predefined-menus.css';
import { useT } from '../i18n/LanguageContext.jsx';

export default function PredefinedMenuList() {
  const t = useT();
  return (
    <>
    <Seo
        title="Our Menu | Catering Packages"
        description="Explore Madhava Catering Services' predefined catering menu packages with full dish lists and banana leaf presentation — enquire for your event."
        path="/menus"
      />
      <PageHero
        eyebrow={t('menus.eyebrow', 'Our Menu')}
        title={t('menus.title', 'Our Menu')}
        subtitle={t('menus.sub', 'Explore our ready-made catering packages, see the complete food list and banana leaf presentation for each, and send us an enquiry for your event.')}
      >
        <div className="page-hero-actions">
          <Link to="/plan-your-event" className="btn btn-primary">{t('nav.plan', 'Plan Your Event')}</Link>
          <Link to="/packages" className="btn btn-outline-light">{t('menus.byocc', 'Browse by Occasion')}</Link>
        </div>
      </PageHero>
    <section className="predefined-menus section">
      <div className="container">
        <div className="menu-pkg-grid">
          {predefinedMenus.map((menu) => (
            <PredefinedMenuCard key={menu.id} menu={menu} />
          ))}
        </div>
      </div>
    </section>
    <CtaBand />
    </>
  );
}
