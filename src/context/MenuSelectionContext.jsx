import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { dishById } from '../data/dishes.js';

const MenuSelectionContext = createContext(null);

export function MenuSelectionProvider({ children }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const isSelected = useCallback((dishId) => selectedIds.includes(dishId), [selectedIds]);

  const toggleDish = useCallback((dishId) => {
    setSelectedIds((prev) => (prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]));
  }, []);

  const removeDish = useCallback((dishId) => {
    setSelectedIds((prev) => prev.filter((id) => id !== dishId));
  }, []);

  const clearAll = useCallback(() => setSelectedIds([]), []);

  const selectedDishes = useMemo(() => selectedIds.map((id) => dishById[id]).filter(Boolean), [selectedIds]);

  const value = useMemo(
    () => ({ selectedIds, selectedDishes, isSelected, toggleDish, removeDish, clearAll }),
    [selectedIds, selectedDishes, isSelected, toggleDish, removeDish, clearAll]
  );

  return <MenuSelectionContext.Provider value={value}>{children}</MenuSelectionContext.Provider>;
}

export function useMenuSelection() {
  const ctx = useContext(MenuSelectionContext);
  if (!ctx) throw new Error('useMenuSelection must be used within MenuSelectionProvider');
  return ctx;
}
