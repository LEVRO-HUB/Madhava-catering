import React from 'react';
import { categories } from '../data/categories.js';
import '../styles/summary.css';

export default function SelectedMenuSummary({ selectedDishes }) {
  const grouped = categories
    .map((cat) => ({
      ...cat,
      dishes: selectedDishes.filter((d) => d.category === cat.id),
    }))
    .filter((cat) => cat.dishes.length > 0);

  if (grouped.length === 0) {
    return <p className="summary-empty">No dishes selected yet.</p>;
  }

  return (
    <div className="summary">
      <h4>Your Selected Menu</h4>
      <ul className="summary-list">
        {grouped.map((cat) => (
          <li key={cat.id}>
            <span className="summary-category">
              {cat.icon} {cat.name} ({cat.dishes.length})
            </span>
            <span className="summary-dishes">{cat.dishes.map((d) => d.name).join(', ')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
