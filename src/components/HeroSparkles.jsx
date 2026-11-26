import React from 'react';

// Deterministic "pseudo-random" so server/prerender and client agree and the
// layout never jumps between renders.
const frac = (n) => n - Math.floor(n);
const rnd = (i, k) => frac(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453);

const COUNT = 26;
const sparkles = Array.from({ length: COUNT }, (_, i) => ({
  id: i,
  left: `${(rnd(i, 1) * 100).toFixed(1)}%`,
  size: 3 + Math.round(rnd(i, 2) * 5),
  duration: `${(9 + rnd(i, 3) * 10).toFixed(1)}s`,
  delay: `${(-rnd(i, 4) * 16).toFixed(1)}s`,
  drift: `${((rnd(i, 5) - 0.5) * 60).toFixed(0)}px`,
}));

// Floating golden motes drifting up, like lamp sparks / marigold petals.
export default function HeroSparkles() {
  return (
    <div className="hero-sparkles" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          style={{
            left: s.left,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
            '--drift': s.drift,
          }}
        />
      ))}
    </div>
  );
}
