// Premium-site content. Everything here is either derived from real site data
// (services, menus, dishes) or written as qualitative copy that restates what
// the business already says about itself. NO invented statistics, prices,
// years in business, client counts or customer quotes — add those here only
// once the business supplies and confirms them.

import { services } from './services.js';

const SITE = 'https://madhava-catering.pages.dev';
const CDN = 'https://res.cloudinary.com/eppaoadw/image/fetch/f_auto,q_auto,w_1000/';
const exp = (file) => `${CDN}${SITE}/assets/experience/${encodeURIComponent(file)}`;

const byId = (id) => services.find((s) => s.id === id);

// These two service images are still branded "photo needed" placeholders
// (see public/assets/services/README.txt) — keep them out of the gallery.
const PLACEHOLDER_IMAGES = ['puberty-catering', 'industrial-events'];
const local = (file) => `/assets/experience/${file}`;

// Occasion explorer: services grouped into four families so visitors can find
// "their" celebration quickly. Every id must exist in services.js.
export const occasionGroups = [
  {
    id: 'weddings',
    label: 'Weddings & Receptions',
    blurb:
      'Grand South Indian feasts for the most important day of your family — from the muhurtham meal to the evening reception.',
    ids: ['wedding-catering', 'reception-buffet', 'engagement-catering', 'buffet-catering'],
  },
  {
    id: 'ceremonies',
    label: 'Traditional Ceremonies',
    blurb:
      'Customs have a menu of their own. Thoughtfully planned vegetarian meals for ceremonies that mark life’s milestones.',
    ids: ['seemantham-catering', 'brahmin-catering', 'puberty-catering', 'housewarming-catering'],
  },
  {
    id: 'family',
    label: 'Family & Festive',
    blurb: 'Warm, comforting food for the gatherings that bring everyone home.',
    ids: ['family-get-together', 'birthday-catering', 'festival-function-catering', 'outdoor-catering'],
  },
  {
    id: 'corporate',
    label: 'Corporate & Institutional',
    blurb: 'Well-organised catering for teams, campuses and large functions.',
    ids: ['corporate-events', 'industrial-events', 'school-college-catering'],
  },
].map((g) => ({ ...g, items: g.ids.map(byId).filter(Boolean) }));

export const processSteps = [
  {
    id: 'share',
    title: 'Share Your Celebration',
    text: 'Tell us the occasion, date, venue and approximate guest count — by call, WhatsApp or our planner.',
  },
  {
    id: 'shape',
    title: 'Shape the Menu',
    text: 'Choose from our menu packages or tell us what your family’s tradition calls for.',
  },
  {
    id: 'confirm',
    title: 'Confirm the Details',
    text: 'We discuss the final menu, service style and arrangements so everything is clear before the day.',
  },
  {
    id: 'prepare',
    title: 'Prepared With Care',
    text: 'Traditional recipes, prepared for your event with the attention a family celebration deserves.',
  },
  {
    id: 'serve',
    title: 'Served With Tradition',
    text: 'Warm service and a dining experience your guests will remember.',
  },
];

export const whyUs = [
  {
    id: 'recipes',
    title: 'Authentic South Indian Recipes',
    text: 'Timeless recipes and traditional flavours, the way a celebration meal is meant to taste.',
    icon: 'leaf',
  },
  {
    id: 'leaf',
    title: 'Banana-Leaf Dining Tradition',
    text: 'Menus presented in the traditional banana-leaf style that South Indian celebrations are known for.',
    icon: 'leaf-plate',
  },
  {
    id: 'veg',
    title: 'Vegetarian & Brahmin Catering',
    text: 'Menus planned to respect your family’s culinary customs and preferences.',
    icon: 'lamp',
  },
  {
    id: 'every',
    title: 'For Every Kind of Celebration',
    text: 'From intimate family gatherings to grand weddings, corporate events and institutions.',
    icon: 'gopuram',
  },
  {
    id: 'service',
    title: 'Thoughtful, Attentive Service',
    text: 'Care and attention to every dining experience, from the first welcome drink to the last sweet.',
    icon: 'hands',
  },
  {
    id: 'plan',
    title: 'Easy Planning',
    text: 'Call, WhatsApp or use our event planner — we help you shape the right menu for your occasion.',
    icon: 'chat',
  },
];

export const faqs = [
  {
    q: 'What kinds of events do you cater?',
    a: 'We cater weddings, receptions, engagements, Seemantham, puberty and housewarming ceremonies, birthdays, family get-togethers, festival functions, corporate and industrial events, and school and college functions.',
  },
  {
    q: 'Do you offer vegetarian and Brahmin menus?',
    a: 'Yes. Traditional South Indian vegetarian catering and Brahmin catering are among our services. Tell us your family’s customs and we will plan the menu around them.',
  },
  {
    q: 'Can I choose a ready-made menu or ask for changes?',
    a: 'You can start from any of our menu packages and tell us what you would like adjusted. We will talk it through with you before anything is confirmed.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'We serve Chennai and across Tamil Nadu.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Use the Plan Your Event page, call us, or message us on WhatsApp with your occasion, date, venue and approximate number of guests, and we will get back to you.',
  },
  {
    q: 'How early should I contact you?',
    a: 'As early as you can. Share your date and guest count and we will confirm availability and next steps.',
  },
];

// Gallery. Photography here is representative imagery (see the README files in
// public/assets/services and /menus) — the gallery page says so, and real event
// photos should replace these over time.
export const galleryItems = [
  {
    id: 'g-main',
    src: exp('Teal-Clad Server at South Indian Wedding Feast-1.png'),
    fallback: local('Teal-Clad Server at South Indian Wedding Feast-1.png'),
    alt: 'Catering staff serving guests at a traditional South Indian wedding feast',
    caption: 'Served with tradition',
    category: 'behind',
  },
  {
    id: 'g-hall',
    src: exp('Elegant South Indian Wedding Feast Hall-3.png'),
    fallback: local('Elegant South Indian Wedding Feast Hall-3.png'),
    alt: 'Elegant banana leaf dining hall set up for a wedding celebration',
    caption: 'The wedding feast hall',
    category: 'feasts',
  },
  {
    id: 'g-kitchen',
    src: exp('Busy South Asian Catering Kitchen-2.png'),
    fallback: local('Busy South Asian Catering Kitchen-2.png'),
    alt: 'Catering chefs preparing food in a busy event kitchen',
    caption: 'Behind the scenes in the kitchen',
    category: 'behind',
  },
  {
    id: 'g-m1',
    src: '/assets/menus/grand-dinner-mega.webp',
    alt: 'Grand Dinner Mega Menu served on a banana leaf',
    caption: 'Grand Dinner Mega Menu',
    category: 'feasts',
  },
  {
    id: 'g-m2',
    src: '/assets/menus/royal-lunch-mega.webp',
    alt: 'Royal Lunch Mega Menu served on a banana leaf',
    caption: 'Royal Lunch Mega Menu',
    category: 'feasts',
  },
  {
    id: 'g-m3',
    src: '/assets/menus/premium-dinner-special.webp',
    alt: 'Premium Dinner Special served on a banana leaf',
    caption: 'Premium Dinner Special',
    category: 'feasts',
  },
  {
    id: 'g-m4',
    src: '/assets/menus/signature-dinner-feast.webp',
    alt: 'Signature Dinner Feast served on a banana leaf',
    caption: 'Signature Dinner Feast',
    category: 'feasts',
  },
  {
    id: 'g-m5',
    src: '/assets/menus/traditional-dining-special.webp',
    alt: 'Traditional Dining Special served on a banana leaf',
    caption: 'Traditional Dining Special',
    category: 'feasts',
  },
  ...services.filter((s) => !PLACEHOLDER_IMAGES.includes(s.id)).map((s) => ({
    id: `g-${s.id}`,
    src: s.image,
    alt: `${s.title} by Madhava Catering Services`,
    caption: s.title,
    category: 'celebrations',
  })),
];

export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'celebrations', label: 'Celebrations' },
  { id: 'feasts', label: 'Feasts & Menus' },
  { id: 'behind', label: 'Behind the Scenes' },
];

// Guest-count and meal options for the event planner.
export const guestRanges = ['Up to 50', '50 – 150', '150 – 300', '300 – 600', '600+', 'Not sure yet'];
export const mealOptions = ['Breakfast / Tiffin', 'Lunch', 'Dinner', 'Snacks & Refreshments'];
export const dietOptions = ['Pure vegetarian', 'Brahmin-style vegetarian', 'Not sure yet'];
