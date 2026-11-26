import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services.js';
import { BUSINESS_NAME, WHATSAPP_NUMBER } from '../data/businessConfig.js';
import '../styles/footer.css';
import { useT, localizeService } from '../i18n/LanguageContext.jsx';

const quickLinks = [
  { to: '/#home', k: 'nav.home', label: 'Home' },
  { to: '/about', k: 'nav.about', label: 'About Us' },
  { to: '/services', k: 'nav.services', label: 'Our Services' },
  { to: '/packages', k: 'nav.packages', label: 'Packages' },
  { to: '/menus', k: 'nav.menu', label: 'Our Menu' },
  { to: '/gallery', k: 'nav.gallery', label: 'Gallery' },
  { to: '/plan-your-event', k: 'nav.plan', label: 'Plan Your Event' },
  { to: '/build-your-feast', k: 'ft.feast', label: 'Build Your Feast' },
  { to: '/brochure', k: 'ft.brochure', label: 'E-Brochure (PDF)' },
  { to: '/blog', k: 'nav.blog', label: 'Blog' },
  { to: '/contact', k: 'nav.contact', label: 'Contact' },
];

export default function Footer() {
  const t = useT();
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
            {t('ft.tagline', 'Traditional South Indian catering for weddings, receptions and family celebrations, made with love and served with care.')}
          </p>
        </div>

        <nav className="footer-col" aria-label="Footer quick links">
          <h4>{t('ft.quick', 'Quick Links')}</h4>
          <ul className="footer-list">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{t(link.k, link.label)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Footer services">
          <h4>{t('ft.services', 'Our Services')}</h4>
          <ul className="footer-list">
            {services.map((service) => (
              <li key={service.id}>
                <Link to={`/services/${service.id}`}>{localizeService(service, t).title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col footer-contact">
          <h4>{t('ft.contact', 'Contact Us')}</h4>
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
                  {t('ft.wa', 'WhatsApp us')}
                </a>
              </li>
            )}
          </ul>
          <Link to="/contact" className="btn btn-primary footer-contact-btn">
            {t('ft.enquire', 'Enquire Now')}
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="footer-note">
          © {new Date().getFullYear()} {BUSINESS_NAME}. {t('ft.note', 'Traditional taste, memorable celebrations.')}
        </p>
      </div>
    </footer>
  );
}
