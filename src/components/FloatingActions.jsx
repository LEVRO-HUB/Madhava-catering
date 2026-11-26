import React, { useEffect, useState } from 'react';
import { WHATSAPP_NUMBER } from '../data/businessConfig.js';

// Floating WhatsApp button + back-to-top, shown site-wide.
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 700);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  return (
    <div className="float-actions">
      <button
        type="button"
        className={`float-btn float-top ${showTop ? 'is-on' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        ↑
      </button>
      {WHATSAPP_NUMBER && (
        <a
          className="float-btn float-wa"
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Madhava Catering Services, I would like to enquire about catering.')}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
              fill="currentColor"
              d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.8 2 6.8L3 29l6.6-2c1.9 1 4 1.6 6.3 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3Zm0 23.2c-2 0-3.9-.6-5.5-1.6l-.4-.2-3.9 1.2 1.2-3.8-.3-.4a10 10 0 0 1-1.6-5.5C5.5 10.2 10.2 5.6 16 5.6s10.5 4.6 10.5 10.2S21.800 26.200 16 26.200Zm5.800-7.600c-.3-.2-1.900-.9-2.200-1s-.5-.2-.7.2-.8 1-1 1.200-.4.200-.7.100a8.500 8.500 0 0 1-4.200-3.700c-.3-.6.300-.5.900-1.700.1-.2 0-.4 0-.5l-1-2.300c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400s-1 1-1 2.400 1 2.800 1.200 3c.2.200 2.100 3.200 5.100 4.500 1.900.8 2.600.9 3.600.7.600-.1 1.900-.8 2.100-1.500s.3-1.400.2-1.500-.3-.2-.6-.3Z"
            />
          </svg>
        </a>
      )}
    </div>
  );
}
