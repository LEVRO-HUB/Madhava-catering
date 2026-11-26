import React, { useEffect, useState } from 'react';

const KEY = 'madhava-intro-seen';

// Short logo reveal shown once per browser session on the home page only.
// Rendered after mount (not in the prerendered HTML), skipped for reduced
// motion, and never blocks interaction.
export default function IntroSplash() {
  const [phase, setPhase] = useState('off'); // off | in | out

  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch (e) {
      seen = true;
    }
    if (reduce || seen || window.location.pathname !== '/') return undefined;

    try {
      sessionStorage.setItem(KEY, '1');
    } catch (e) {
      /* ignore */
    }
    setPhase('in');
    const t1 = setTimeout(() => setPhase('out'), 1700);
    const t2 = setTimeout(() => setPhase('off'), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === 'off') return null;

  return (
    <div className={`intro-splash is-${phase}`} aria-hidden="true">
      <div className="intro-splash-ring" />
      <img src="/assets/logo/madhava-logo.png" alt="" />
    </div>
  );
}
