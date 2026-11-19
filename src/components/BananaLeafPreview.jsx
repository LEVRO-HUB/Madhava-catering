import React, { forwardRef } from 'react';
import { leafPositions, sideTraySlots } from '../data/leafPositions.js';
import '../styles/banana-leaf.css';

const BananaLeafPreview = forwardRef(function BananaLeafPreview({ selectedDishes }, ref) {
  const onLeaf = selectedDishes.filter((d) => leafPositions[d.slot]);
  const onTray = selectedDishes.filter((d) => sideTraySlots[d.slot]);

  return (
    <div className="leaf-preview-capture" ref={ref}>
      {onTray.length > 0 && (
        <div className="side-tray">
          {onTray.map((dish) => {
            const pos = sideTraySlots[dish.slot];
            return (
              <div
                key={dish.id}
                className="tray-item"
                style={{ left: `${pos.x}%`, zIndex: pos.zIndex }}
                title={dish.name}
              >
                <img src={dish.image} alt={dish.name} />
                <span>{dish.name}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="leaf-stage">
        <img className="leaf-bg" src="/assets/backgrounds/banana-leaf.png" alt="Banana leaf" />
        {onLeaf.map((dish) => {
          const pos = leafPositions[dish.slot];
          return (
            <img
              key={dish.id}
              className="leaf-dish fade-in"
              src={dish.image}
              alt={dish.name}
              title={dish.name}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                width: `${pos.width}%`,
                zIndex: pos.zIndex,
              }}
            />
          );
        })}
        {onLeaf.length === 0 && (
          <div className="leaf-placeholder-text">Select dishes to build your banana leaf menu</div>
        )}
      </div>
    </div>
  );
});

export default BananaLeafPreview;
