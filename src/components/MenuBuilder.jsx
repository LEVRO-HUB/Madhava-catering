import React, { useMemo, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { categories } from '../data/categories.js';
import { dishesByCategory } from '../data/dishes.js';
import { useMenuSelection } from '../context/MenuSelectionContext.jsx';
import CategorySelector from './CategorySelector.jsx';
import DishCard from './DishCard.jsx';
import BananaLeafPreview from './BananaLeafPreview.jsx';
import SelectedMenuSummary from './SelectedMenuSummary.jsx';
import '../styles/menu-builder.css';

export default function MenuBuilder() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [mobileView, setMobileView] = useState('select');
  const { selectedIds, selectedDishes, isSelected, toggleDish, clearAll } = useMenuSelection();
  const leafRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const dishesForCategory = useMemo(() => dishesByCategory(activeCategory), [activeCategory]);

  const countByCategory = useMemo(() => {
    const counts = {};
    selectedDishes.forEach((d) => {
      counts[d.category] = (counts[d.category] || 0) + 1;
    });
    return counts;
  }, [selectedDishes]);

  const handleReset = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm('Reset your menu? This will remove all selected dishes.')) {
      clearAll();
    }
  };

  const handleDownload = async () => {
    if (!leafRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(leafRef.current, { backgroundColor: null, scale: 2, useCORS: true });
      const link = document.createElement('a');
      link.download = 'madhava-catering-menu.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section id="customize" className="menu-builder section">
      <div className="container">
        <h2 className="section-title">Customize Your Menu</h2>
        <p className="section-subtitle">
          Pick your favourite dishes from each category and watch your banana leaf come to life.
        </p>

        <div className="mobile-tabs">
          <button className={mobileView === 'select' ? 'is-active' : ''} onClick={() => setMobileView('select')}>
            Select Dishes
          </button>
          <button className={mobileView === 'preview' ? 'is-active' : ''} onClick={() => setMobileView('preview')}>
            Leaf Preview {selectedIds.length > 0 && `(${selectedIds.length})`}
          </button>
        </div>

        <div className="menu-builder-grid">
          <div className={`builder-column-select ${mobileView === 'select' ? 'is-active-mobile' : ''}`}>
            <CategorySelector
              categories={categories}
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
              countByCategory={countByCategory}
            />
            <div className="dish-grid">
              {dishesForCategory.map((dish) => (
                <DishCard key={dish.id} dish={dish} selected={isSelected(dish.id)} onToggle={toggleDish} />
              ))}
            </div>
          </div>

          <div className={`builder-column-preview ${mobileView === 'preview' ? 'is-active-mobile' : ''}`}>
            <div className="preview-header">
              <h3>Live Banana Leaf Preview</h3>
              <span className="preview-count">{selectedIds.length} item{selectedIds.length !== 1 ? 's' : ''} selected</span>
            </div>
            <BananaLeafPreview ref={leafRef} selectedDishes={selectedDishes} />
            <div className="preview-actions">
              <button className="btn btn-primary" onClick={handleDownload} disabled={downloading || selectedIds.length === 0}>
                {downloading ? 'Preparing…' : 'Download My Menu'}
              </button>
              <button className="btn btn-secondary" onClick={handleReset} disabled={selectedIds.length === 0}>
                Reset Menu
              </button>
            </div>
            <SelectedMenuSummary selectedDishes={selectedDishes} />
          </div>
        </div>
      </div>
    </section>
  );
}
