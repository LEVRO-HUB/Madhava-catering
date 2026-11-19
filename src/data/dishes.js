// Dish catalogue — separate from UI and from leaf position config.
// `image` points to a transparent PNG. Images currently shipped are
// clearly-labelled PLACEHOLDER art (see public/assets/dishes/README.txt) —
// swap them for real photographed dishes before going live.
// `slot` ties a dish to a reusable position defined in leafPositions.js.
export const dishes = [
  // Welcome Drinks
  { id: 'rose-milk', name: 'Rose Milk', category: 'welcome-drinks', image: '/assets/dishes/welcome-drinks/rose-milk.png', slot: 'drink-1' },
  { id: 'panakam', name: 'Panakam', category: 'welcome-drinks', image: '/assets/dishes/welcome-drinks/panakam.png', slot: 'drink-2' },
  { id: 'nannari-sarbath', name: 'Nannari Sarbath', category: 'welcome-drinks', image: '/assets/dishes/welcome-drinks/nannari-sarbath.png', slot: 'drink-3' },

  // Starters
  { id: 'veg-cutlet', name: 'Veg Cutlet', category: 'starters', image: '/assets/dishes/starters/veg-cutlet.png', slot: 'starter-1' },
  { id: 'gobi-65', name: 'Gobi 65', category: 'starters', image: '/assets/dishes/starters/gobi-65.png', slot: 'starter-2' },

  // Sweet
  { id: 'mysore-pak', name: 'Mysore Pak', category: 'sweet', image: '/assets/dishes/sweet/mysore-pak.png', slot: 'sweet-1' },
  { id: 'laddu', name: 'Laddu', category: 'sweet', image: '/assets/dishes/sweet/laddu.png', slot: 'sweet-2' },
  { id: 'jangiri', name: 'Jangiri', category: 'sweet', image: '/assets/dishes/sweet/jangiri.png', slot: 'sweet-3' },

  // Vadai
  { id: 'medhu-vadai', name: 'Medhu Vadai', category: 'vadai', image: '/assets/dishes/vadai/medhu-vadai.png', slot: 'vadai-1' },
  { id: 'masala-vadai', name: 'Masala Vadai', category: 'vadai', image: '/assets/dishes/vadai/masala-vadai.png', slot: 'vadai-2' },

  // Kosumalli
  { id: 'carrot-kosumalli', name: 'Carrot Kosumalli', category: 'kosumalli', image: '/assets/dishes/kosumalli/carrot-kosumalli.png', slot: 'kosumalli-1' },
  { id: 'moong-dal-kosumalli', name: 'Moong Dal Kosumalli', category: 'kosumalli', image: '/assets/dishes/kosumalli/moong-dal-kosumalli.png', slot: 'kosumalli-2' },

  // Pachadi
  { id: 'vellarikai-pachadi', name: 'Vellarikai Pachadi', category: 'pachadi', image: '/assets/dishes/pachadi/vellarikai-pachadi.png', slot: 'pachadi-1' },
  { id: 'beetroot-pachadi', name: 'Beetroot Pachadi', category: 'pachadi', image: '/assets/dishes/pachadi/beetroot-pachadi.png', slot: 'pachadi-2' },

  // Pickle
  { id: 'mango-pickle', name: 'Mango Pickle', category: 'pickle', image: '/assets/dishes/pickle/mango-pickle.png', slot: 'pickle-1' },
  { id: 'lemon-pickle', name: 'Lemon Pickle', category: 'pickle', image: '/assets/dishes/pickle/lemon-pickle.png', slot: 'pickle-2' },

  // Thogayal
  { id: 'coconut-thogayal', name: 'Coconut Thogayal', category: 'thogayal', image: '/assets/dishes/thogayal/coconut-thogayal.png', slot: 'thogayal-1' },
  { id: 'vendhaya-thogayal', name: 'Vendhaya Thogayal', category: 'thogayal', image: '/assets/dishes/thogayal/vendhaya-thogayal.png', slot: 'thogayal-2' },

  // Poriyal
  { id: 'beans-poriyal', name: 'Beans Poriyal', category: 'poriyal', image: '/assets/dishes/poriyal/beans-poriyal.png', slot: 'poriyal-1' },
  { id: 'cabbage-poriyal', name: 'Cabbage Poriyal', category: 'poriyal', image: '/assets/dishes/poriyal/cabbage-poriyal.png', slot: 'poriyal-2' },
  { id: 'carrot-poriyal', name: 'Carrot Poriyal', category: 'poriyal', image: '/assets/dishes/poriyal/carrot-poriyal.png', slot: 'poriyal-3' },

  // Kootu
  { id: 'vegetable-kootu', name: 'Vegetable Kootu', category: 'kootu', image: '/assets/dishes/kootu/vegetable-kootu.png', slot: 'kootu-1' },
  { id: 'pumpkin-kootu', name: 'Pumpkin Kootu', category: 'kootu', image: '/assets/dishes/kootu/pumpkin-kootu.png', slot: 'kootu-2' },

  // Aviyal
  { id: 'aviyal', name: 'Aviyal', category: 'aviyal', image: '/assets/dishes/aviyal/aviyal.png', slot: 'aviyal-1' },

  // Rice Varieties
  { id: 'plain-rice', name: 'Plain Rice', category: 'rice', image: '/assets/dishes/rice/plain-rice.png', slot: 'rice-1' },
  { id: 'curd-rice', name: 'Curd Rice', category: 'rice', image: '/assets/dishes/rice/curd-rice.png', slot: 'rice-2' },

  // Sambar
  { id: 'sambar', name: 'Sambar', category: 'sambar', image: '/assets/dishes/sambar/sambar.png', slot: 'sambar-1' },

  // Rasam
  { id: 'rasam', name: 'Rasam', category: 'rasam', image: '/assets/dishes/rasam/rasam.png', slot: 'rasam-1' },

  // Kulambu
  { id: 'vatha-kulambu', name: 'Vatha Kulambu', category: 'kulambu', image: '/assets/dishes/kulambu/vatha-kulambu.png', slot: 'kulambu-1' },

  // Appalam
  { id: 'fried-appalam', name: 'Fried Appalam', category: 'appalam', image: '/assets/dishes/appalam/fried-appalam.png', slot: 'appalam-1' },
  { id: 'roasted-appalam', name: 'Roasted Appalam', category: 'appalam', image: '/assets/dishes/appalam/roasted-appalam.png', slot: 'appalam-2' },

  // Curd
  { id: 'curd', name: 'Curd', category: 'curd', image: '/assets/dishes/curd/curd.png', slot: 'curd-1' },

  // Dessert
  { id: 'paal-payasam', name: 'Paal Payasam', category: 'dessert', image: '/assets/dishes/dessert/paal-payasam.png', slot: 'dessert-1' },
  { id: 'semiya-payasam', name: 'Semiya Payasam', category: 'dessert', image: '/assets/dishes/dessert/semiya-payasam.png', slot: 'dessert-2' },

  // Fruits
  { id: 'banana', name: 'Banana', category: 'fruits', image: '/assets/dishes/fruits/banana.png', slot: 'fruits-1' },
  { id: 'mixed-fruits', name: 'Mixed Fruits', category: 'fruits', image: '/assets/dishes/fruits/mixed-fruits.png', slot: 'fruits-2' },

  // Other Special Items
  { id: 'paruppu', name: 'Paruppu', category: 'others', image: '/assets/dishes/others/paruppu.png', slot: 'others-1' },
  { id: 'ghee', name: 'Ghee', category: 'others', image: '/assets/dishes/others/ghee.png', slot: 'others-2' },
];

export const dishById = Object.fromEntries(dishes.map((d) => [d.id, d]));

export function dishesByCategory(categoryId) {
  return dishes.filter((d) => d.category === categoryId);
}
