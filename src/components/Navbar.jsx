import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

const links = [
  { to: '/#home', label: 'Home' },
  { to: '/services', label: 'Our Services' },
  { to: '/menus', label: 'Our Menu' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
