import React, { useState } from 'react';
import { faqs } from '../data/siteContent.js';
import { SectionHeading } from './Ornaments.jsx';

export default function FaqAccordion({ limit }) {
  const [open, setOpen] = useState(0);
  const list = limit ? faqs.slice(0, limit) : faqs;
  return (
    <section className="faq section">
      <div className="container faq-inner">
        <SectionHeading
          eyebrow="Questions"
          title="Good to Know Before You Plan"
          subtitle="Quick answers to what families ask us most."
        />
        <div className="faq-list">
          {list.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item rv ${isOpen ? 'is-open' : ''}`} key={f.q} style={{ '--i': i }}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="faq-a-wrap" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <p className="faq-a">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
