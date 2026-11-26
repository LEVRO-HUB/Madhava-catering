import React from 'react';
import { whyUs } from '../data/siteContent.js';
import { SectionHeading, FeatureIcon } from './Ornaments.jsx';
import { useT } from '../i18n/LanguageContext.jsx';

export default function WhyUs() {
  const t = useT();
  return (
    <section className="whyus section">
      <div className="container">
        <SectionHeading
          eyebrow={t('why.eyebrow', 'Why Madhava')}
          title={t('why.title', 'Tradition You Can Taste, Service You Can Trust')}
          subtitle={t('why.sub', 'What families choose us for, in the way we serve every celebration.')}
        />
        <div className="whyus-grid">
          {whyUs.map((w, i) => (
            <div className="whyus-card rv" key={w.id} style={{ '--i': i }}>
              <span className="whyus-icon">
                <FeatureIcon name={w.icon} />
              </span>
              <h3>{t(`why.${w.id}.t`, w.title)}</h3>
              <p>{t(`why.${w.id}.d`, w.text)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
