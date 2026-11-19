import React from 'react';
import { Link } from 'react-router-dom';
import { totalDishCount } from '../data/predefinedMenus.js';

export default function PredefinedMenuCard({ menu }) {
  const dishCount = totalDishCount(menu);

  return (
    <div className="menu-pkg-card">
      <div className="menu-pkg-card-image">
        <img src={menu.image} alt={menu.name} loading="lazy" />
        {menu.vegNonVeg && (
          <span className={`menu-pkg-veg-badge is-${menu.vegNonVeg}`}>
            {menu.vegNonVeg === 'veg' ? 'Pure Veg' : 'Non-Veg'}
          </span>
        )}
      </div>
      <div className="menu-pkg-card-body">
        <h3>{menu.name}</h3>
        {menu.description && <p className="menu-pkg-desc">{menu.description}</p>}
        <div className="menu-pkg-meta">
          <span>{dishCount} dish{dishCount !== 1 ? 'es' : ''}</span>
          {menu.price && <span className="menu-pkg-price">₹{menu.price}</span>}
        </div>
        <Link to={`/menus/${menu.slug}`} className="btn btn-primary menu-pkg-cta">
          Explore Menu
        </Link>
      </div>
    </div>
  );
}
