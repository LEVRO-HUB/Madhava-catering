import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Elements that get a scroll-reveal automatically. Using selectors (instead
// of editing every component) keeps every page — Services, Menus, Blog —
// consistent. Anything already using its own `.reveal` is left alone.
const REVEAL_SELECTOR = [
  '.section-title',
  '.section-subtitle',
  '.testimonials-header > *',
  '.service-card',
  '.menu-pkg-card',
  '.blog-card',
  '.article-link-card',
  '.orn-divider',
  '.footer-col',
].join(',');

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Site-wide motion layer:
 *  - scroll-reveal (IntersectionObserver) with sibling stagger
 *  - sticky-header "scrolled" state + gold scroll-progress bar
 * Nothing is hidden until JS has added `.fx-on` to <html>, so prerendered
 * HTML and no-JS crawlers always see the full content.
 */
export default function ScrollEffects() {
  const { pathname } = useLocation();

  // header shrink + scroll progress
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty('--scroll', max > 0 ? String(Math.min(1, y / max)) : '0');
      document.body.classList.toggle('is-scrolled', y > 40);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // scroll reveal
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;

    const root = document.documentElement;
    root.classList.add('fx-on');

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );

    const tag = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (el.dataset.fx || el.classList.contains('reveal')) return;
        el.dataset.fx = '1';
        const siblings = el.parentElement
          ? Array.from(el.parentElement.children).filter((c) => c.matches(REVEAL_SELECTOR))
          : [el];
        el.style.setProperty('--fx-delay', `${(siblings.indexOf(el) % 6) * 90}ms`);
        io.observe(el);
      });
    };

    const timer = setTimeout(tag, 50);
    // pick up content that mounts later (route changes, lazy lists)
    const mo = new MutationObserver(() => {
      clearTimeout(mo.t);
      mo.t = setTimeout(tag, 80);
    });
    const main = document.querySelector('main');
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
