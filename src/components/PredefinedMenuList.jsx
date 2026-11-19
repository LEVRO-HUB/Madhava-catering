import React from 'react';
import { predefinedMenus } from '../data/predefinedMenus.js';
import PredefinedMenuCard from './PredefinedMenuCard.jsx';
import Seo from './Seo.jsx';
import '../styles/predefined-menus.css';

export default function PredefinedMenuList() {
  return (
    <section className="predefined-menus section">
      <Seo
        title="Our Menu | Catering Packages"
        description="Explore Madhava Catering Services' predefined catering menu packages with full dish lists and banana leaf presentation — enquire for your event."
        path="/menus"
      />
      <div className="container">
        <h1 className="section-title">Our Menu</h1>
        <p className="section-subtitle">
          Explore our ready-made catering packages, see the complete food list and banana leaf
          presentation for each, and send us an enquiry for your event.
        </p>
        <div className="menu-pkg-grid">
          {predefinedMenus.map((menu) => (
            <PredefinedMenuCard key={menu.id} menu={menu} />
          ))}
        </div>
      </div>
    </section>
  );
}
