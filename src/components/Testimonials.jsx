import React, { useCallback, useEffect, useRef, useState } from 'react';
import { testimonials, TESTIMONIALS_ARE_SAMPLE } from '../data/testimonials.js';
import TestimonialCard from './TestimonialCard.jsx';
import '../styles/testimonials.css';

const GAP = 24;

function itemsForWidth(width) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

// No autoplay: the brief only requires pausing on hover/focus "if autoplay
// is used" — this carousel is manual-only (arrows/keyboard/swipe), which
// keeps it accessible and avoids unnecessary motion on a page that already
// has an autoplaying hero slideshow and reel carousel.
export default function Testimonials() {
  const trackRef = useRef(null);
  const [itemsPerView, setItemsPerView] = useState(() =>
    typeof window !== 'undefined' ? itemsForWidth(window.innerWidth) : 3
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(testimonials.length > itemsPerView);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const onResize = () => setItemsPerView(itemsForWidth(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 4);
    const card = track.querySelector('.testimonial-slot');
    if (card) {
      const cardWidth = card.getBoundingClientRect().width + GAP;
      setActivePage(Math.round(track.scrollLeft / cardWidth));
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      track.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, itemsPerView]);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.testimonial-slot');
    const cardWidth = card ? card.getBoundingClientRect().width + GAP : track.clientWidth / itemsPerView;
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * cardWidth, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const scrollToPage = (pageIndex) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.testimonial-slot');
    const cardWidth = card ? card.getBoundingClientRect().width + GAP : track.clientWidth / itemsPerView;
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: pageIndex * cardWidth, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      scroll(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scroll(-1);
    }
  };

  const cardBasis = `calc((100% - ${(itemsPerView - 1) * GAP}px) / ${itemsPerView})`;
  const pageCount = Math.max(1, testimonials.length - itemsPerView + 1);

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="testimonials-header">
          <span className="testimonials-eyebrow">Words From Our Customers</span>
          <h2 className="testimonials-heading">Celebrations Made Memorable</h2>
          <p className="testimonials-subtitle">
            Discover the experiences shared by families and guests who celebrated with Madhava
            Catering Services.
          </p>
          {TESTIMONIALS_ARE_SAMPLE && (
            <p className="testimonials-sample-note">
              Sample testimonials shown below for layout purposes — real customer reviews will
              replace these once supplied and approved.
            </p>
          )}
        </div>

        <div
          className="testimonial-carousel"
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Customer testimonials carousel"
        >
          <button
            type="button"
            className="carousel-arrow carousel-arrow-prev"
            onClick={() => scroll(-1)}
            disabled={!canPrev}
            aria-label="Previous testimonials"
          >
            ‹
          </button>

          <div className="testimonial-track" ref={trackRef} style={{ gap: `${GAP}px` }} tabIndex={0}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slot" style={{ flexBasis: cardBasis }}>
                <TestimonialCard testimonial={testimonial} isSample={TESTIMONIALS_ARE_SAMPLE} />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="carousel-arrow carousel-arrow-next"
            onClick={() => scroll(1)}
            disabled={!canNext}
            aria-label="Next testimonials"
          >
            ›
          </button>
        </div>

        {pageCount > 1 && (
          <div className="testimonial-dots" role="tablist" aria-label="Testimonial pages">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`testimonial-dot ${activePage === i ? 'is-active' : ''}`}
                onClick={() => scrollToPage(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-selected={activePage === i}
                role="tab"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
