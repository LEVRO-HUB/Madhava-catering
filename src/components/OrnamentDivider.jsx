import React from 'react';

// Traditional lotus-and-kolam divider. Lines draw themselves outward and the
// lotus blooms when the divider scrolls into view (see effects.css).
export default function OrnamentDivider({ flip = false }) {
  return (
    <div className={`orn-divider ${flip ? 'is-flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 600 60" preserveAspectRatio="xMidYMid meet" fill="none">
        <g className="orn-line">
          <path d="M20 30H250" />
          <path d="M350 30H580" />
          <circle cx="262" cy="30" r="3" />
          <circle cx="338" cy="30" r="3" />
        </g>
        <g className="orn-lotus">
          <path d="M300 14c7 7 11 14 11 20-5 3-8 3-11 3s-6 0-11-3c0-6 4-13 11-20Z" />
          <path d="M278 22c8 1 15 6 17 14-6 2-10 1-14 0-4-3-5-8-3-14Z" />
          <path d="M322 22c-8 1-15 6-17 14 6 2 10 1 14 0 4-3 5-8 3-14Z" />
          <path d="M268 32c7 2 12 6 15 11-5 2-9 2-12 0-3-3-4-7-3-11Z" />
          <path d="M332 32c-7 2-12 6-15 11 5 2 9 2 12 0 3-3 4-7 3-11Z" />
          <path d="M286 46c9 5 19 5 28 0" />
        </g>
      </svg>
    </div>
  );
}
