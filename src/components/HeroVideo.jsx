import React, { useEffect, useState } from 'react';
import { reels } from '../data/reels.js';

// Cinematic background video behind the hero. Loaded only on large screens,
// never for reduced-motion or data-saver users, and it fades in once it can
// play — the slideshow underneath stays as the fallback.
export default function HeroVideo() {
  const [ok, setOk] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const big = window.matchMedia('(min-width: 900px)').matches;
    const saver = navigator.connection && (navigator.connection.saveData || /2g/.test(navigator.connection.effectiveType || ''));
    setOk(!reduce && big && !saver && reels.length > 0);
  }, []);

  if (!ok) return null;
  return (
    <video
      className={`hero-video ${ready ? 'is-ready' : ''}`}
      src={reels[0].src}
      poster={reels[0].poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={() => setReady(true)}
      onError={() => setOk(false)}
    />
  );
}
