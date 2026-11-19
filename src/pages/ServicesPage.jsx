import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services.js';
import ServiceCard from '../components/ServiceCard.jsx';
import Seo from '../components/Seo.jsx';
import '../styles/services.css';

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Our Catering Services"
        description="Wedding, buffet, Brahmin, Seemantham, corporate and family-function catering services from Madhava Catering Services — traditional South Indian catering for every occasion."
        path="/services"
      />
      <section className="services-page section">
        <div className="container">
          <h1 className="section-title">Our Catering Services</h1>
          <p className="section-subtitle">
            From traditional family celebrations to grand weddings and corporate gatherings, explore
            our catering services for every special occasion.
          </p>

          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="container services-cta-inner">
          <h2>Let's Make Your Celebration Special</h2>
          <p>Planning an event? Get in touch with Madhava Catering Services to discuss your catering requirements.</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
