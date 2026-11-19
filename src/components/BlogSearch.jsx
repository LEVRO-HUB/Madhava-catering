import React from 'react';

export default function BlogSearch({ value, onChange }) {
  return (
    <div className="blog-search">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search articles (e.g. wedding, Seemantham, buffet)"
        aria-label="Search blog articles"
      />
    </div>
  );
}
