import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services.js';
import ServiceCard from '../components/ServiceCard.jsx';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import ProcessTimeline from '../components/ProcessTimeline.jsx';
import CtaBand from '../components/CtaBand.jsx';
import '../styles/services.css';

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Our Catering Services"
        description="Wedding, buffet, Brahmin, Seemantham, corporate and family-function catering services from Madhava Catering Services — traditional South Indian catering for every occasion."
        path="/services"
      />
      <PageHero
        eyebrow="Our Services"
        title="Our Catering Services"
        crumb="Services"
        subtitle="From traditional family celebrations to grand weddings and corporate gatherings, explore our catering services for every special occasion."
      >
        <div className="page-hero-actions">
          <Link to="/plan-your-event" className="btn btn-primary">Plan Your Event</Link>
          <Link to="/packages" className="btn btn-outline-light">Explore Packages</Link>
        </div>
      </PageHero>
      <section className="services-page section">
        <div className="container">

          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline dark />
      <CtaBand />
    </>
  );
}
