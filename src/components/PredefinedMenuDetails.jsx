import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMenuBySlug, predefinedMenus } from '../data/predefinedMenus.js';
import Seo from './Seo.jsx';
import '../styles/menu-details.css';

export default function PredefinedMenuDetails() {
  const { slug } = useParams();
  const menu = getMenuBySlug(slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!menu) {
    return (
      <section className="menu-details section">
        <div className="container">
          <h1 className="section-title">Menu Not Found</h1>
          <p className="section-subtitle">This menu package doesn't exist or may have been removed.</p>
          <div className="menu-details-back">
            <Link to="/menus" className="btn btn-secondary">Back to All Menus</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="menu-details section">
      <Seo title={menu.name} description={menu.description} path={`/menus/${menu.slug}`} image={menu.image} />
      <div className="container">
        <div className="menu-details-back">
          <Link to="/menus" className="btn btn-secondary">&larr; Back to All Menus</Link>
        </div>

        <header className="menu-details-heading">
          <h1>{menu.name}</h1>
          {menu.description && <p className="menu-details-desc">{menu.description}</p>}
          {menu.vegNonVeg && (
            <span className={`menu-pkg-veg-badge is-${menu.vegNonVeg}`}>
              {menu.vegNonVeg === 'veg' ? 'Pure Veg' : 'Non-Veg'}
            </span>
          )}
        </header>

        <button
          type="button"
          className="menu-details-photo"
          onClick={() => setLightboxOpen(true)}
          aria-label="Click to enlarge menu photograph"
        >
          <img src={menu.image} alt={`${menu.name} banana leaf presentation`} />
        </button>

        <p className="menu-details-photo-note">
          This banana leaf photograph is an AI-generated representative image, not an actual
          photograph of a catered event.
        </p>
        {menu.photoSharedWith && (
          <p className="menu-details-photo-shared">
            Note: this image is visually very similar to the one used for{' '}
            {predefinedMenus.find((m) => m.slug === menu.photoSharedWith)?.name}, pending a
            distinct photograph for each package.
          </p>
        )}

        <div className="menu-details-items">
          <h2>Complete Food Item List</h2>
          <p className="menu-details-items-note">
            Dishes below were identified by reviewing the menu photograph and are provisional —
            items marked <span className="dish-unverified-badge">to confirm</span> could not be
            identified with confidence and need confirmation before this list is final.
          </p>
          {menu.categories.map((cat) => (
            <div className="menu-details-category" key={cat.name}>
              <h3>{cat.name}</h3>
              <ul>
                {cat.items.map((item) => (
                  <li key={item.name} className={item.verified ? '' : 'is-unverified'}>
                    {item.name}
                    {!item.verified && <span className="dish-unverified-badge">to confirm</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="menu-details-enquire-cta">
          <Link to={`/contact?menu=${menu.slug}`} className="btn btn-primary">Enquire About This Menu</Link>
        </div>

        <div className="menu-details-back">
          <Link to="/menus" className="btn btn-secondary">&larr; Back to All Menus</Link>
        </div>
      </div>

      {lightboxOpen && (
        <div className="menu-lightbox" onClick={() => setLightboxOpen(false)}>
          <img src={menu.image} alt={`${menu.name} enlarged`} />
          <button
            type="button"
            className="menu-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close enlarged image"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
