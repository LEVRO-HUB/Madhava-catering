import React from 'react';
import { processSteps } from '../data/siteContent.js';
import { SectionHeading } from './Ornaments.jsx';

export default function ProcessTimeline({ dark = false }) {
  return (
    <section className={`process section ${dark ? 'is-dark' : ''}`}>
      <div className="container">
        <SectionHeading
          light={dark}
          eyebrow="How It Works"
          title="From First Call to the Last Sweet"
          subtitle="A simple, unhurried journey so you can enjoy your own celebration."
        />
        <ol className="process-list">
          {processSteps.map((s, i) => (
            <li className="process-step rv" key={s.id} style={{ '--i': i }}>
              <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
