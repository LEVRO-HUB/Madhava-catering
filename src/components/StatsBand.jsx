import React, { useEffect, useRef, useState } from 'react';
import { services } from '../data/services.js';
import { predefinedMenus } from '../data/predefinedMenus.js';
import { dishes } from '../data/dishes.js';

// Counters are derived from what actually exists on the site, so they can
// never drift from reality or overstate anything.
const stats = [
  { id: 'occasions', value: services.length, label: 'Celebration types we cater' },
  { id: 'menus', value: predefinedMenus.length, label: 'Signature menu packages' },
  { id: 'dishes', value: dishes.length, label: 'Traditional dishes to choose from' },
];

function useCountUp(target, start) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return undefined;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setN(target);
      return undefined;
    }
    let raf;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(target * (1 - (1 - p) ** 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start]);
  return n;
}

function Stat({ value, label, start }) {
  const n = useCountUp(value, start);
  return (
    <div className="stat">
      <span className="stat-num">{start ? n : value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function StatsBand() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setStart(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats-band" ref={ref}>
      <div className="container stats-grid">
        {stats.map((s) => (
          <Stat key={s.id} value={s.value} label={s.label} start={start} />
        ))}
        <div className="stat">
          <span className="stat-text">Chennai &amp; Tamil Nadu</span>
          <span className="stat-label">Where we serve</span>
        </div>
      </div>
    </section>
  );
}
