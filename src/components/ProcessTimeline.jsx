import React from 'react';
import { processSteps } from '../data/siteContent.js';
import { SectionHeading } from './Ornaments.jsx';
import { useT } from '../i18n/LanguageContext.jsx';

export default function ProcessTimeline({ dark = false }) {
  const t = useT();
  return (
    <section className={`process section ${dark ? 'is-dark' : ''}`}>
      <div className="container">
        <SectionHeading
          light={dark}
          eyebrow={t('proc.eyebrow', 'How It Works')}
          title={t('proc.title', 'From First Call to the Last Sweet')}
          subtitle={t('proc.sub', 'A simple, unhurried journey so you can enjoy your own celebration.')}
        />
        <ol className="process-list">
          {processSteps.map((s, i) => (
            <li className="process-step rv" key={s.id} style={{ '--i': i }}>
              <span className="process-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t(`proc.${s.id}.t`, s.title)}</h3>
              <p>{t(`proc.${s.id}.d`, s.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
