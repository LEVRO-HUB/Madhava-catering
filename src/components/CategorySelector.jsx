import React from 'react';
import '../styles/category-selector.css';

export default function CategorySelector({ categories, activeCategory, onSelect, countByCategory }) {
  return (
    <div className="category-selector" role="tablist" aria-label="Menu categories">
      {categories.map((cat) => {
        const count = countByCategory[cat.id] || 0;
        const isActive = cat.id === activeCategory;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            className={`category-pill ${isActive ? 'is-active' : ''}`}
            onClick={() => onSelect(cat.id)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span>{cat.name}</span>
            {count > 0 && <span className="category-count">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
