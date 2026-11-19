import React from 'react';
import '../styles/dish-card.css';

export default function DishCard({ dish, selected, onToggle }) {
  return (
    <div className={`dish-card ${selected ? 'is-selected' : ''}`}>
      <div className="dish-card-thumb">
        <img src={dish.image} alt={dish.name} loading="lazy" />
      </div>
      <div className="dish-card-info">
        <span className="dish-card-name">{dish.name}</span>
        <button
          type="button"
          className={`dish-card-btn ${selected ? 'is-selected' : ''}`}
          onClick={() => onToggle(dish.id)}
          aria-pressed={selected}
        >
          {selected ? 'Remove' : 'Add'}
        </button>
      </div>
    </div>
  );
}
