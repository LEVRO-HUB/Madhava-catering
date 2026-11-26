import React, { useState } from 'react';

// <img> that falls back to a second source (e.g. the local copy when the CDN
// is unreachable) and then hides itself instead of showing a broken icon.
export default function SafeImg({ src, fallback, alt, className, ...rest }) {
  const [current, setCurrent] = useState(src);
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;
  return (
    <img
      className={className}
      src={current}
      alt={alt}
      onError={() => {
        if (fallback && current !== fallback) setCurrent(fallback);
        else setHidden(true);
      }}
      {...rest}
    />
  );
}
