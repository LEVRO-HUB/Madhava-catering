import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { occasionGroups } from '../data/siteContent.js';
import { SectionHeading } from './Ornaments.jsx';
import { useT, localizeService } from '../i18n/LanguageContext.jsx';

// Tabbed explorer: pick a family of occasions, browse its services, and jump
// straight into the event planner with that occasion pre-selected.
export default function OccasionExplorer({ dark = true, heading = true }) {
  const t = useT();
  const [active, setActive] = useState(occasionGroups[0].id);
  const group = occasionGroups.find((g) => g.id === active) || occasionGroups[0];

  return (
    <section className={`occasions section ${dark ? 'is-dark' : ''}`}>
      <div className="container">
        {heading && (
          <SectionHeading
            light={dark}
            eyebrow={t('occ.eyebrow', 'Every Occasion')}
            title={t('occ.title', 'A Feast for Every Celebration')}
            subtitle={t('occ.sub', 'Choose the kind of celebration you are planning and explore how we cater for it.')}
          />
        )}

        <div className="occ-tabs rv" role="tablist" aria-label="Occasion types">
          {occasionGroups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={g.id === active}
              className={`occ-tab ${g.id === active ? 'is-active' : ''}`}
              onClick={() => setActive(g.id)}
            >
              {t(`occ.${g.id}`, g.label)}
            </button>
          ))}
        </div>

        <p className="occ-blurb" key={`${group.id}-b`}>{t(`occ.${group.id}.b`, group.blurb)}</p>

        <div className="occ-grid" key={group.id} role="tabpanel">
          {group.items.map((raw, i) => {
            const s = localizeService(raw, t);
            return (
            <article className="occ-card" key={s.id} style={{ '--i': i }}>
              <div className="occ-card-img">
                <img src={s.image} alt={s.title} loading="lazy" />
                <span className="occ-card-shine" aria-hidden="true" />
              </div>
              <div className="occ-card-body">
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <div className="occ-card-actions">
                  <Link to={`/services/${s.id}`} className="occ-link">{t('occ.more', 'Learn more')}</Link>
                  <Link to={`/plan-your-event?event=${s.id}`} className="occ-link">
                    {t('occ.plan', 'Plan this event')} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
