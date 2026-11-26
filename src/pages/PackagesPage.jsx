import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import Seo from '../components/Seo.jsx';
import OccasionExplorer from '../components/OccasionExplorer.jsx';
import PredefinedMenuCard from '../components/PredefinedMenuCard.jsx';
import ProcessTimeline from '../components/ProcessTimeline.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { SectionHeading } from '../components/Ornaments.jsx';
import { predefinedMenus } from '../data/predefinedMenus.js';
import '../styles/predefined-menus.css';

const FILTERS = [
  { id: 'all', label: 'All Menus' },
  { id: 'veg', label: 'Vegetarian' },
];

export default function PackagesPage() {
  const [filter, setFilter] = useState('all');
  const list = predefinedMenus.filter((m) => filter === 'all' || m.vegNonVeg === filter);

  return (
    <>
      <Seo
        title="Catering Packages & Occasions"
        description="Explore Madhava Catering Services by occasion — weddings, traditional ceremonies, family functions and corporate events — and browse our signature menu packages."
        path="/packages"
      />
      <PageHero
        eyebrow="Packages"
        title="Find the Right Feast"
        crumb="Packages"
        subtitle="Start with your occasion, then choose a menu. Everything can be tailored once we talk."
      >
        <div className="page-hero-actions">
          <Link to="/plan-your-event" className="btn btn-primary">Plan Your Event</Link>
          <Link to="/menus" className="btn btn-outline-light">Browse All Menus</Link>
        </div>
      </PageHero>

      <OccasionExplorer dark={false} />

      <section className="predefined-menus section is-tinted">
        <div className="container">
          <SectionHeading
            eyebrow="Signature Menus"
            title="Menu Packages"
            subtitle="See the complete food list and banana-leaf presentation for each. Final dishes are confirmed with you."
          />
          <div className="gal-filters rv" role="group" aria-label="Filter menus">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`gal-filter ${filter === f.id ? 'is-active' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="menu-pkg-grid">
            {list.map((menu) => (
              <PredefinedMenuCard key={menu.id} menu={menu} />
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
