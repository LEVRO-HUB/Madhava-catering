import React from 'react';
import { blogCategories } from '../data/blogCategories.js';

export default function BlogCategories({ active, onSelect }) {
  return (
    <div className="blog-categories" role="tablist" aria-label="Blog categories">
      <button
        type="button"
        className={`blog-category-pill ${active === 'all' ? 'is-active' : ''}`}
        onClick={() => onSelect('all')}
      >
        All Articles
      </button>
      {blogCategories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          className={`blog-category-pill ${active === cat.slug ? 'is-active' : ''}`}
          onClick={() => onSelect(cat.slug)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
