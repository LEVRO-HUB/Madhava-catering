import React from 'react';
import { WHATSAPP_NUMBER } from '../data/businessConfig.js';

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <img className="contact-info-logo" src="/assets/logo/madhava-logo.png" alt="Madhava Catering Services" />

      <div className="contact-info-block">
        <h3>Call Us</h3>
        <a href="tel:9840839157" className="contact-info-link">98408 39157</a>
        <a href="tel:9566160584" className="contact-info-link">95661 60584</a>
      </div>

      {WHATSAPP_NUMBER && (
        <div className="contact-info-block">
          <h3>WhatsApp</h3>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light contact-whatsapp-btn"
          >
            Chat on WhatsApp
          </a>
        </div>
      )}

      <div className="contact-info-block">
        <h3>Service Area</h3>
        <p>Serving Chennai and across Tamil Nadu.</p>
      </div>

      <p className="contact-info-note">
        For the fastest response, calling or WhatsApp-ing us directly works best. You can also
        send your requirements using the enquiry form.
      </p>
    </div>
  );
}
