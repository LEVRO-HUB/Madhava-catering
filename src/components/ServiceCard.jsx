import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useT, localizeService } from '../i18n/LanguageContext.jsx';

export default function ServiceCard({ service: raw, linkable = true }) {
  const t = useT();
  const service = localizeService(raw, t);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="service-card">
      <div className="service-card-image">
        {!imgError ? (
          <img
            src={service.image}
            alt={`${service.title} — Madhava Catering Services`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="service-card-image-fallback" aria-hidden="true">
            <span>{service.title}</span>
          </div>
        )}
      </div>
      <div className="service-card-body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        {linkable && (
          <Link to={`/services/${service.id}`} className="service-more">
            {t('svc.details', 'View details')} <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
