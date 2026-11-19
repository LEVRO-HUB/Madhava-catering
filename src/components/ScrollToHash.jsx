import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router doesn't scroll to #hash targets on navigation by default.
// This keeps the existing anchor-based Home/Customize/Contact links working
// across route changes (e.g. navigating from /menus back to /#customize).
export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      };
      // wait a tick so the route's content has mounted
      const timer = setTimeout(scroll, 60);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [location.pathname, location.hash]);

  return null;
}
