import React from 'react';
import { categories } from '../data/categories.js';
import { dishesByCategory } from '../data/dishes.js';
import '../styles/our-menu.css';

export default function OurMenu() {
  return (
    <section id="our-menu" className="our-menu section">
      <div className="container">
        <h2 className="section-title">Our Menu</h2>
        <p className="section-subtitle">
          A glimpse of our traditional catering spread, organised by category. Ready to plan your
          event? Build your own banana leaf menu below.
        </p>
        <div className="our-menu-grid">
          {categories.map((cat) => {
            const count = dishesByCategory(cat.id).length;
            return (
              <a href="#customize" key={cat.id} className="our-menu-card">
                <span className="our-menu-icon">{cat.icon}</span>
                <span className="our-menu-name">{cat.name}</span>
                <span className="our-menu-count">{count} item{count !== 1 ? 's' : ''}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
