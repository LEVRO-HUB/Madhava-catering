import React, { useState } from 'react';

export default function ServiceCard({ service }) {
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
      </div>
    </div>
  );
}
