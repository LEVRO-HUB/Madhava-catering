import React from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../data/businessConfig.js';
import { Gopuram } from './Ornaments.jsx';

export default function CtaBand({
  title = 'Let’s Plan Your Celebration',
  text = 'Tell us about your occasion and we will help you shape a menu worthy of it.',
}) {
  return (
    <section className="cta-band">
      <Gopuram className="cta-band-gopuram" />
      <div className="container cta-band-inner">
        <h2 className="rv">{title}</h2>
        <p className="rv">{text}</p>
        <div className="cta-band-actions rv">
          <Link to="/plan-your-event" className="btn btn-primary">Plan Your Event</Link>
          <a href="tel:9840839157" className="btn btn-outline-light">Call 98408 39157</a>
          {WHATSAPP_NUMBER && (
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
            >
              WhatsApp Us
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
