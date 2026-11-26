import React from 'react';
import { dishes } from '../data/dishes.js';

// Endless gold ticker of real dish names from the dish catalogue.
export default function DishMarquee() {
  const names = dishes.map((d) => d.name);
  const row = names.concat(names);
  return (
    <div className="dish-marquee" aria-label="Some of the traditional dishes we serve">
      <div className="dish-marquee-track" aria-hidden="true">
        {row.map((n, i) => (
          <span key={`${n}-${i}`} className="dish-marquee-item">
            <i />
            {n}
          </span>
        ))}
      </div>
      <span className="sr-only">{names.join(', ')}</span>
    </div>
  );
}
