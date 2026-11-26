import React from 'react';
import { whyUs } from '../data/siteContent.js';
import { SectionHeading, FeatureIcon } from './Ornaments.jsx';

export default function WhyUs() {
  return (
    <section className="whyus section">
      <div className="container">
        <SectionHeading
          eyebrow="Why Madhava"
          title="Tradition You Can Taste, Service You Can Trust"
          subtitle="What families choose us for, in the way we serve every celebration."
        />
        <div className="whyus-grid">
          {whyUs.map((w, i) => (
            <div className="whyus-card rv" key={w.id} style={{ '--i': i }}>
              <span className="whyus-icon">
                <FeatureIcon name={w.icon} />
              </span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
