import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageToggle from './LanguageToggle.jsx';
import { useT } from '../i18n/LanguageContext.jsx';
import '../styles/navbar.css';

const links = [
  { to: '/#home', key: 'home', label: 'Home' },
  { to: '/about', key: 'about', label: 'About' },
  { to: '/services', key: 'services', label: 'Services' },
  { to: '/packages', key: 'packages', label: 'Packages' },
  { to: '/menus', key: 'menu', label: 'Menu' },
  { to: '/gallery', key: 'gallery', label: 'Gallery' },
  { to: '/blog', key: 'blog', label: 'Blog' },
  { to: '/contact', key: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const t = useT();

  const handleNavClick = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/#home" className="navbar-brand" onClick={handleNavClick}>
          <img src="/assets/logo/madhava-logo.png" alt="Madhava Catering Services" />
        </Link>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar-links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={handleNavClick}>
              {t(`nav.${link.key}`, link.label)}
            </Link>
          ))}
          <Link to="/plan-your-event" className="nav-cta" onClick={handleNavClick}>
            {t('nav.plan', 'Plan Your Event')}
          </Link>
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
}
