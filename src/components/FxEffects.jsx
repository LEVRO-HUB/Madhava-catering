import { useEffect } from 'react';

// Site-wide "wow" interactions, all disabled for reduced-motion users:
//  • 3D tilt on cards (mouse / pen only — never on touch)
//  • gentle parallax via --sy (scroll offset) consumed by CSS
const TILT = '.service-card,.occ-card,.menu-pkg-card,.whyus-card,.pillar,.feature-card,.blog-card';

export default function FxEffects() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let cur = null;
    const move = (e) => {
      const el = e.target.closest?.(TILT);
      if (cur && cur !== el) reset(cur);
      if (!el) return;
      cur = el;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--tilt', `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 9).toFixed(2)}deg) translateZ(0)`);
      el.classList.add('is-tilting');
    };
    const reset = (el) => {
      el.style.removeProperty('--tilt');
      el.classList.remove('is-tilting');
    };
    const leave = () => {
      if (cur) reset(cur);
      cur = null;
    };
    if (fine) {
      document.addEventListener('pointermove', move, { passive: true });
      document.addEventListener('pointerleave', leave);
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        document.documentElement.style.setProperty('--sy', String(Math.min(window.scrollY, 1400)));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
