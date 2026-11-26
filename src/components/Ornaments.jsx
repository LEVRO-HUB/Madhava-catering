import React from 'react';

// Stepped gopuram (temple tower) silhouette, drawn with simple rectangles so it
// stays crisp at any size and costs nothing to load.
export function Gopuram({ className = '' }) {
  const tiers = 7;
  const rects = [];
  for (let i = 0; i < tiers; i += 1) {
    const w = 200 - i * 24;
    const h = 22;
    const y = 250 - (i + 1) * h - i * 3;
    rects.push(
      <g key={i}>
        <rect x={100 - w / 2} y={y} width={w} height={h} rx="2" />
        <rect x={100 - w / 2 + 6} y={y + 6} width={w - 12} height={4} opacity="0.55" />
        {[...Array(Math.max(2, Math.floor(w / 30)))].map((_, k, arr) => (
          <rect
            key={k}
            x={100 - w / 2 + ((k + 1) * w) / (arr.length + 1) - 3}
            y={y + 12}
            width="6"
            height="7"
            opacity="0.6"
          />
        ))}
      </g>
    );
  }
  return (
    <svg className={className} viewBox="0 0 200 260" fill="currentColor" aria-hidden="true">
      <rect x="10" y="238" width="180" height="12" rx="2" />
      {rects}
      <path d="M92 60c0-12 4-22 8-30 4 8 8 18 8 30Z" />
      <circle cx="100" cy="24" r="4" />
    </svg>
  );
}

// Small lotus used inside headings and dividers.
export function Lotus({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 60 36" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 3c5 5 8 10 8 15-4 2-6 2-8 2s-4 0-8-2c0-5 3-10 8-15Z" />
        <path d="M14 10c6 1 11 5 13 11-4 1-7 1-10 0-3-2-4-6-3-11Z" />
        <path d="M46 10c-6 1-11 5-13 11 4 1 7 1 10 0 3-2 4-6 3-11Z" />
        <path d="M6 20c5 2 9 5 11 8-4 1-7 1-9 0-2-2-3-5-2-8Z" />
        <path d="M54 20c-5 2-9 5-11 8 4 1 7 1 9 0 2-2 3-5 2-8Z" />
        <path d="M18 31c8 4 16 4 24 0" />
      </g>
    </svg>
  );
}

// Heading block used across the premium sections: eyebrow, title, ornament, subtitle.
export function SectionHeading({ eyebrow, title, subtitle, light = false, align = 'center' }) {
  return (
    <div className={`sec-head ${light ? 'is-light' : ''} is-${align} rv`}>
      {eyebrow && <span className="sec-eyebrow">{eyebrow}</span>}
      <h2 className="sec-title">{title}</h2>
      <div className="sec-orn" aria-hidden="true">
        <span />
        <Lotus />
        <span />
      </div>
      {subtitle && <p className="sec-sub">{subtitle}</p>}
    </div>
  );
}

// Small line icons for the "why choose us" cards.
export function FeatureIcon({ name }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    leaf: (
      <>
        <path d="M8 38C8 20 20 8 40 8c0 20-12 32-30 32" />
        <path d="M8 40 28 20" />
      </>
    ),
    'leaf-plate': (
      <>
        <path d="M5 28c6-9 14-14 19-14s13 5 19 14c-6 8-14 12-19 12S11 36 5 28Z" />
        <path d="M24 14v26M24 22l-8 5M24 22l8 5M24 30l-6 4M24 30l6 4" />
      </>
    ),
    lamp: (
      <>
        <path d="M24 6c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
        <path d="M8 26h32c0 8-6 14-16 14S8 34 8 26Z" />
        <path d="M18 42h12" />
      </>
    ),
    gopuram: (
      <>
        <path d="M24 4v6M14 40V30h20v10M10 40h28M17 30V22h14v8M20 22v-7h8v7" />
      </>
    ),
    hands: (
      <>
        <path d="M6 26l10-8 8 4 8-4 10 8-12 12-6-4-6 4Z" />
        <path d="M24 22v6" />
      </>
    ),
    chat: (
      <>
        <path d="M8 10h32v22H22l-9 8v-8H8Z" />
        <path d="M16 19h16M16 25h10" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 48 48" {...common} aria-hidden="true">
      {paths[name] || paths.leaf}
    </svg>
  );
}
