import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services.js';
import { BUSINESS_NAME, WHATSAPP_NUMBER } from '../data/businessConfig.js';
import '../styles/footer.css';

const quickLinks = [
  { to: '/#home', label: 'Home' },
  { to: '/services', label: 'Our Services' },
  { to: '/menus', label: 'Our Menu' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footer-grid">
        <div className="footer-col footer-brand">
          <img
            src="/assets/logo/madhava-logo.png"
            alt={BUSINESS_NAME}
            className="footer-logo"
          />
          <p className="footer-tagline">
            Traditional South Indian catering for weddings, receptions and family
            celebrations, made with love and served with care.
          </p>
        </div>

        <nav className="footer-col" aria-label="Footer quick links">
          <h4>Quick Links</h4>
          <ul className="footer-list">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Footer services">
          <h4>Our Services</h4>
          <ul className="footer-list">
            {services.map((service) => (
              <li key={service.id}>
                <Link to="/services">{service.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <ul className="footer-list">
            <li>
              <a href="tel:9840839157">98408 39157</a>
            </li>
            <li>
              <a href="tel:9566160584">95661 60584</a>
            </li>
            {WHATSAPP_NUMBER && (
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>
              </li>
            )}
          </ul>
          <Link to="/contact" className="btn btn-primary footer-contact-btn">
            Enquire Now
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-note">
          © {new Date().getFullYear()} {BUSINESS_NAME}. Traditional taste, memorable
          celebrations.
        </p>
      </div>
    </footer>
  );
}
