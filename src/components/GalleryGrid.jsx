import React, { useCallback, useEffect, useRef, useState } from 'react';
import { galleryItems, galleryCategories } from '../data/siteContent.js';
import SafeImg from './SafeImg.jsx';
import { useT } from '../i18n/LanguageContext.jsx';

// Filterable masonry-style gallery with an accessible lightbox
// (Esc closes, ←/→ navigate, focus is returned to the opened tile).
export default function GalleryGrid({ limit, showFilters = true }) {
  const t = useT();
  const [cat, setCat] = useState('all');
  const [openIdx, setOpenIdx] = useState(-1);
  const lastFocus = useRef(null);
  const closeRef = useRef(null);

  let items = cat === 'all' ? galleryItems : galleryItems.filter((g) => g.category === cat);
  if (limit) items = items.slice(0, limit);

  const close = useCallback(() => {
    setOpenIdx(-1);
    if (lastFocus.current) lastFocus.current.focus();
  }, []);
  const step = useCallback(
    (d) => setOpenIdx((i) => (i < 0 ? i : (i + d + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (openIdx < 0) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openIdx, close, step]);

  const current = openIdx >= 0 ? items[openIdx] : null;

  return (
    <>
      {showFilters && (
        <div className="gal-filters rv" role="group" aria-label="Filter gallery">
          {galleryCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`gal-filter ${cat === c.id ? 'is-active' : ''}`}
              aria-pressed={cat === c.id}
              onClick={() => setCat(c.id)}
            >
              {t(`gal.${c.id}`, c.label)}
            </button>
          ))}
        </div>
      )}

      <div className="gal-grid">
        {items.map((g, i) => (
          <button
            type="button"
            className="gal-tile"
            key={g.id}
            style={{ '--i': i % 8 }}
            onClick={(e) => {
              lastFocus.current = e.currentTarget;
              setOpenIdx(i);
            }}
            aria-label={`Open photo: ${g.caption}`}
          >
            <SafeImg src={g.src} fallback={g.fallback} alt={g.alt} loading="lazy" />
            <span className="gal-cap">{g.caption}</span>
          </button>
        ))}
      </div>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption} onClick={close}>
          <button type="button" className="lb-btn lb-close" ref={closeRef} onClick={close} aria-label="Close">
            ×
          </button>
          <button
            type="button"
            className="lb-btn lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
            <SafeImg src={current.src} fallback={current.fallback} alt={current.alt} />
            <figcaption>
              {current.caption}
              <small>
                {openIdx + 1} / {items.length}
              </small>
            </figcaption>
          </figure>
          <button
            type="button"
            className="lb-btn lb-next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
