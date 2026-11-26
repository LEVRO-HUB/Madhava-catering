import React from 'react';
import { predefinedMenus } from '../data/predefinedMenus.js';
import PredefinedMenuCard from './PredefinedMenuCard.jsx';
import Seo from './Seo.jsx';
import PageHero from './PageHero.jsx';
import CtaBand from './CtaBand.jsx';
import { Link } from 'react-router-dom';
import '../styles/predefined-menus.css';

export default function PredefinedMenuList() {
  return (
    <>
    <Seo
        title="Our Menu | Catering Packages"
        description="Explore Madhava Catering Services' predefined catering menu packages with full dish lists and banana leaf presentation — enquire for your event."
        path="/menus"
      />
      <PageHero
        eyebrow="Our Menu"
        title="Our Menu"
        subtitle="Explore our ready-made catering packages, see the complete food list and banana leaf presentation for each, and send us an enquiry for your event."
      >
        <div className="page-hero-actions">
          <Link to="/plan-your-event" className="btn btn-primary">Plan Your Event</Link>
          <Link to="/packages" className="btn btn-outline-light">Browse by Occasion</Link>
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
