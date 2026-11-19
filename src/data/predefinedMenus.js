// Predefined catering menu PACKAGES — separate from the dish/category data
// used by the live Customize Your Menu builder (see dishes.js, categories.js,
// leafPositions.js). Those power the interactive banana leaf preview; this
// file powers the "Our Menu" package browsing + enquiry flow and is rendered
// as-is, with no connection to the builder's selection state.
//
// ⚠ PROVISIONAL CONTENT:
//   - Names, descriptions and category/item lists were supplied by the
//     business, but the dish lists were inferred by visually inspecting
//     the uploaded banana-leaf photographs, NOT confirmed against an
//     actual package list. Any item with `verified: false` is uncertain
//     (shown with a "to confirm" marker on the site) — do not treat any
//     dish list here as a guaranteed package contents list before the
//     business confirms it.
//   - Menu photographs are AI-generated representative images, not real
//     photographs of an actual catered event. PredefinedMenuDetails
//     displays a disclaimer to this effect — do not remove it.
//   - `photoSharedWith`: the uploaded photos for "Grand Dinner Mega Menu"
//     (image 1) and "Signature Dinner Feast" (image 4) appear to show the
//     same meal from a different angle; likewise "Royal Lunch Mega Menu"
//     (image 2) and "Traditional Dining Special" (image 5) also appear to
//     be the same meal/shoot. Only "Premium Dinner Special" (image 3) has
//     genuinely distinct photography. Confirm with the business whether
//     these are meant to be visually-distinct packages — if so, 2 more
//     photo shoots are needed before real launch.
//   - No prices are set (price: null) — none were supplied, and none
//     should be invented.
export const predefinedMenus = [
  {
    id: 'menu-001',
    slug: 'grand-dinner-mega-menu',
    name: 'Grand Dinner Mega Menu',
    description:
      'A grand dinner spread combining traditional South Indian favourites, delicious tiffin specialities, flavourful rice varieties, crispy starters, rich gravies and festive desserts.',
    image: '/assets/menus/grand-dinner-mega.webp',
    price: null,
    vegNonVeg: 'veg',
    photoSharedWith: 'signature-dinner-feast',
    categories: [
      { name: 'Tiffin Items', items: [{ name: 'Dosa', verified: true }, { name: 'Idiyappam', verified: true }] },
      {
        name: 'Rice Varieties',
        items: [{ name: 'Flavoured Rice / Biryani', verified: false }, { name: 'White Rice', verified: true }],
      },
      { name: 'Starters', items: [{ name: 'Fried Starters', verified: true }] },
      {
        name: 'Accompaniments',
        items: [{ name: 'Papad', verified: true }, { name: 'Assorted Chutneys', verified: true }],
      },
      { name: 'Main Course Gravies', items: [{ name: 'Vegetable Gravies', verified: true }] },
      { name: 'Sweets', items: [{ name: 'Sweets', verified: true }] },
      { name: 'Curd', items: [{ name: 'Curd', verified: true }] },
    ],
  },
  {
    id: 'menu-002',
    slug: 'royal-lunch-mega-menu',
    name: 'Royal Lunch Mega Menu',
    description:
      'A traditional lunch experience featuring steamed rice, vegetable accompaniments, crispy papad, flavourful gravies, traditional sweets and refreshing desserts.',
    image: '/assets/menus/royal-lunch-mega.webp',
    price: null,
    vegNonVeg: 'veg',
    photoSharedWith: 'traditional-dining-special',
    categories: [
      {
        name: 'Rice Varieties',
        items: [{ name: 'White Rice', verified: true }, { name: 'Flavoured Rice', verified: true }],
      },
      { name: 'Accompaniments', items: [{ name: 'Papad', verified: true }, { name: 'Pickle', verified: true }] },
      {
        name: 'Poriyal & Kootu',
        items: [{ name: 'Poriyal Varieties', verified: true }, { name: 'Kootu', verified: true }],
      },
      { name: 'Starters', items: [{ name: 'Vadai / Fritters', verified: false }] },
      { name: 'Main Course Gravies', items: [{ name: 'Vegetable Gravies', verified: true }] },
      {
        name: 'Sweets & Desserts',
        items: [{ name: 'Sweets', verified: true }, { name: 'Payasam', verified: false }],
      },
      { name: 'Curd', items: [{ name: 'Curd', verified: true }] },
    ],
  },
  {
    id: 'menu-003',
    slug: 'premium-dinner-special',
    name: 'Premium Dinner Special',
    description:
      'A premium South Indian dinner experience featuring traditional tiffin favourites, assorted accompaniments, rich gravies and carefully selected sweets.',
    image: '/assets/menus/premium-dinner-special.webp',
    price: null,
    vegNonVeg: 'veg',
    photoSharedWith: null,
    categories: [
      {
        name: 'Tiffin Items',
        items: [{ name: 'Idiyappam', verified: true }, { name: 'Dosa / Flatbread', verified: false }],
      },
      { name: 'Main Course Gravies', items: [{ name: 'Assorted Gravies', verified: true }] },
      { name: 'Starters', items: [{ name: 'Fried Snacks', verified: true }] },
      {
        name: 'Accompaniments',
        items: [{ name: 'Chutneys', verified: true }, { name: 'Vegetable Side Dishes', verified: true }],
      },
      {
        name: 'Sweets & Desserts',
        items: [{ name: 'Sweets', verified: true }, { name: 'Dessert Varieties', verified: true }],
      },
    ],
  },
  {
    id: 'menu-004',
    slug: 'signature-dinner-feast',
    name: 'Signature Dinner Feast',
    description:
      'A signature catering selection combining South Indian specialities, festive starters, rice preparations, chutneys and delightful desserts.',
    image: '/assets/menus/signature-dinner-feast.webp',
    price: null,
    vegNonVeg: 'veg',
    photoSharedWith: 'grand-dinner-mega-menu',
    categories: [
      { name: 'Tiffin Items', items: [{ name: 'Dosa', verified: true }, { name: 'Idiyappam', verified: true }] },
      { name: 'Rice Varieties', items: [{ name: 'Rice Varieties', verified: true }] },
      { name: 'Starters', items: [{ name: 'Fried Items', verified: true }] },
      {
        name: 'Accompaniments',
        items: [{ name: 'Chutneys', verified: true }, { name: 'Vegetable Preparations', verified: true }],
      },
      { name: 'Sweets', items: [{ name: 'Sweets', verified: true }] },
    ],
  },
  {
    id: 'menu-005',
    slug: 'traditional-dining-special',
    name: 'Traditional Dining Special',
    description:
      'A traditional vegetarian dining experience featuring rice, vegetable dishes, accompaniments, traditional gravies, sweets and desserts.',
    image: '/assets/menus/traditional-dining-special.webp',
    price: null,
    vegNonVeg: 'veg',
    photoSharedWith: 'royal-lunch-mega-menu',
    categories: [
      { name: 'Rice Varieties', items: [{ name: 'White Rice', verified: true }] },
      {
        name: 'Accompaniments',
        items: [{ name: 'Papad', verified: true }, { name: 'Vegetable Sides', verified: true }],
      },
      { name: 'Tiffin Items', items: [{ name: 'Idiyappam / Noodles', verified: false }] },
      { name: 'Starters', items: [{ name: 'Fried Snacks', verified: true }] },
      { name: 'Main Course Gravies', items: [{ name: 'Gravies', verified: true }] },
      {
        name: 'Sweets & Desserts',
        items: [
          { name: 'Sweets', verified: true },
          { name: 'Payasam', verified: true },
          { name: 'Fruit Salad', verified: true },
        ],
      },
    ],
  },
];

export function getMenuBySlug(slug) {
  return predefinedMenus.find((m) => m.slug === slug);
}

export function totalDishCount(menu) {
  return menu.categories.reduce((sum, cat) => sum + cat.items.length, 0);
}
