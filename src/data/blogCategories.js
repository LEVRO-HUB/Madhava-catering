export const blogCategories = [
  { slug: 'wedding-catering', name: 'Wedding Catering' },
  { slug: 'traditional-south-indian-menus', name: 'Traditional South Indian Menus' },
  { slug: 'brahmin-catering', name: 'Brahmin Catering' },
  { slug: 'catering-planning-tips', name: 'Catering Planning Tips' },
  { slug: 'chennai-catering-guides', name: 'Chennai Catering Guides' },
  { slug: 'tamil-nadu-celebrations', name: 'Tamil Nadu Celebrations' },
  { slug: 'madhava-catering-updates', name: 'Madhava Catering Updates' },
];

export function categoryName(slug) {
  return blogCategories.find((c) => c.slug === slug)?.name || slug;
}
