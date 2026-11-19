// Predefined position map for the banana leaf preview.
// Coordinates are percentages of the leaf container's width/height
// (percentage-based so the layout scales with any container size).
// x/y mark the CENTER of the dish image.
//
// Kept separate from dish data (dishes.js) so the same slot can be reused
// by different dishes, and so the arrangement can be retuned without
// touching the dish catalogue.
export const leafPositions = {
  // Row A — upper leaf
  'pickle-1': { x: 18, y: 15, width: 10, zIndex: 10 },
  'pachadi-1': { x: 35, y: 14, width: 11, zIndex: 10 },
  'pachadi-2': { x: 51, y: 15, width: 11, zIndex: 11 },
  'thogayal-1': { x: 67, y: 14, width: 10, zIndex: 10 },
  'thogayal-2': { x: 83, y: 15, width: 10, zIndex: 10 },

  // Row B
  'pickle-2': { x: 13, y: 27, width: 10, zIndex: 12 },
  'kosumalli-1': { x: 29, y: 27, width: 11, zIndex: 12 },
  'kosumalli-2': { x: 45, y: 26, width: 11, zIndex: 13 },
  'appalam-1': { x: 62, y: 26, width: 14, zIndex: 12 },
  'appalam-2': { x: 78, y: 27, width: 14, zIndex: 12 },
  'sweet-1': { x: 88, y: 27, width: 11, zIndex: 12 },

  // Row C — widest part of the leaf
  'poriyal-1': { x: 14, y: 39, width: 11, zIndex: 14 },
  'poriyal-2': { x: 29, y: 39, width: 11, zIndex: 14 },
  'poriyal-3': { x: 43, y: 38, width: 11, zIndex: 15 },
  'kootu-1': { x: 59, y: 39, width: 12, zIndex: 14 },
  'kootu-2': { x: 73, y: 39, width: 12, zIndex: 14 },
  'sweet-2': { x: 87, y: 39, width: 11, zIndex: 14 },

  // Row D
  'vadai-1': { x: 15, y: 51, width: 11, zIndex: 16 },
  'aviyal-1': { x: 29, y: 51, width: 12, zIndex: 16 },
  'dessert-1': { x: 50, y: 51, width: 13, zIndex: 17 },
  'dessert-2': { x: 67, y: 51, width: 13, zIndex: 16 },
  'sweet-3': { x: 84, y: 51, width: 11, zIndex: 16 },

  // Row E
  'vadai-2': { x: 15, y: 63, width: 11, zIndex: 18 },
  'sambar-1': { x: 32, y: 63, width: 13, zIndex: 18 },
  'rice-1': { x: 50, y: 64, width: 22, zIndex: 20 },
  'kulambu-1': { x: 68, y: 63, width: 13, zIndex: 18 },
  'rasam-1': { x: 85, y: 63, width: 12, zIndex: 18 },

  // Row F
  'others-1': { x: 20, y: 76, width: 11, zIndex: 19 },
  'rice-2': { x: 37, y: 77, width: 14, zIndex: 19 },
  'curd-1': { x: 54, y: 77, width: 12, zIndex: 19 },
  'others-2': { x: 70, y: 76, width: 11, zIndex: 19 },
  'fruits-1': { x: 86, y: 76, width: 12, zIndex: 19 },

  // Row G — near the stem end
  'fruits-2': { x: 50, y: 89, width: 12, zIndex: 21 },
};

// Welcome Drinks and Starters are served separately, outside the leaf
// (a small tray above the leaf), per traditional serving style.
export const sideTraySlots = {
  'drink-1': { x: 10, zIndex: 1 },
  'drink-2': { x: 30, zIndex: 1 },
  'drink-3': { x: 50, zIndex: 1 },
  'starter-1': { x: 70, zIndex: 1 },
  'starter-2': { x: 88, zIndex: 1 },
};
