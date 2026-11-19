// Homepage hero background slideshow — real Madhava Catering Services
// photography, supplied in public/assets/backgrounds/.
//
// Performance: the original PNGs are ~2 MB each, so they are served through
// Cloudinary's image CDN (automatic modern format + quality, resized to
// 1600px wide). Cloudinary fetches the original from the deployed site.
const CDN = 'https://res.cloudinary.com/eppaoadw/image/fetch/f_auto,q_auto,w_1600/';
const SITE = 'https://madhava-catering.pages.dev';
const bg = (file) => `${CDN}${SITE}/assets/backgrounds/${file}`;

export const heroSlides = [
  { id: 'bg1', image: bg('Bg1.png'), alt: 'Traditional banana leaf wedding meal with copper serving vessels' },
  { id: 'bg2', image: bg('Bg2.png'), alt: 'Festive catering spread with traditional lamp and floral decor' },
  { id: 'bg3', image: bg('Bg3.png'), alt: 'Outdoor wedding catering setup with decorated dining tables' },
];
