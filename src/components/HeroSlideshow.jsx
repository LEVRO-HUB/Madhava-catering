import React, { useEffect, useRef, useState } from 'react';

const DISPLAY_MS = 5000;
const FADE_MS = 1300;

export default function HeroSlideshow({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    if (reducedMotion.current || slides.length <= 1) return undefined;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, DISPLAY_MS);

    return () => clearInterval(id);
  }, [slides.length]);

  // Preload the next slide just before it's due to become active, so the
  // crossfade never reveals an unloaded image, without eagerly loading
  // every slide up front.
  useEffect(() => {
    if (slides.length <= 1) return;
    const nextIndex = (activeIndex + 1) % slides.length;
    const img = new Image();
    img.src = slides[nextIndex].image;
  }, [activeIndex, slides]);

  return (
    <div className="hero-slideshow" aria-hidden="true">
      {slides.map((slide, i) => (
        <img
          key={slide.id}
          src={slide.image}
          alt=""
          className={`hero-slide ${i === activeIndex ? 'is-active' : ''}`}
          style={{ transitionDuration: `${FADE_MS}ms` }}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchpriority={i === 0 ? 'high' : 'auto'}
        />
      ))}
      <div className="hero-overlay" />
    </div>
  );
}
