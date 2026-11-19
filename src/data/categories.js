// Central list of menu categories. Add new categories here and they will
// automatically appear in the category selector. Each category needs at
// least one entry in `leafPositions.js` (unless `servedSeparately` is true).
export const categories = [
  { id: 'welcome-drinks', name: 'Welcome Drinks', icon: '🥤', servedSeparately: true },
  { id: 'starters', name: 'Starters', icon: '🍢', servedSeparately: true },
  { id: 'sweet', name: 'Sweet', icon: '🍬' },
  { id: 'vadai', name: 'Vadai', icon: '🍩' },
  { id: 'kosumalli', name: 'Kosumalli', icon: '🥗' },
  { id: 'pachadi', name: 'Pachadi', icon: '🥣' },
  { id: 'pickle', name: 'Pickle', icon: '🌶️' },
  { id: 'thogayal', name: 'Thogayal', icon: '🫙' },
  { id: 'poriyal', name: 'Poriyal', icon: '🥦' },
  { id: 'kootu', name: 'Kootu', icon: '🍲' },
  { id: 'aviyal', name: 'Aviyal', icon: '🥘' },
  { id: 'rice', name: 'Rice Varieties', icon: '🍚' },
  { id: 'sambar', name: 'Sambar', icon: '🍛' },
  { id: 'rasam', name: 'Rasam', icon: '🍵' },
  { id: 'kulambu', name: 'Kulambu', icon: '🫕' },
  { id: 'appalam', name: 'Appalam', icon: '🥠' },
  { id: 'curd', name: 'Curd', icon: '🥛' },
  { id: 'dessert', name: 'Dessert', icon: '🍮' },
  { id: 'fruits', name: 'Fruits', icon: '🍌' },
  { id: 'others', name: 'Other Special Items', icon: '✨' },
];

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]));
