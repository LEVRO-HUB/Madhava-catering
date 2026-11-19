// One-off generator for PLACEHOLDER predefined-menu photographs.
// Run with: node scripts/generate-menu-placeholders.mjs
// Replace public/assets/menus/*.jpg with real banana-leaf photographs of
// each predefined menu package before launch — see public/assets/menus/README.txt.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))), '..');

const menus = [
  { file: 'sample-traditional-wedding-menu.jpg', title: 'Traditional Wedding Menu', color: '#3f6b30' },
  { file: 'sample-family-function-menu.jpg', title: 'Family Function Menu', color: '#4f7a3d' },
  { file: 'sample-premium-celebration-menu.jpg', title: 'Premium Celebration Menu', color: '#2e5323' },
];

async function run() {
  const dir = path.join(root, 'public', 'assets', 'menus');
  fs.mkdirSync(dir, { recursive: true });

  for (const menu of menus) {
    const W = 1000, H = 700;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
        <defs>
          <radialGradient id="bg" cx="50%" cy="40%" r="75%">
            <stop offset="0%" stop-color="${menu.color}"/>
            <stop offset="100%" stop-color="#1d3417"/>
          </radialGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#bg)"/>
        <ellipse cx="500" cy="420" rx="300" ry="230" fill="#000000" opacity="0.08"/>
        <text x="50%" y="46%" text-anchor="middle" font-family="Georgia, serif" font-size="40" fill="#fff8ec" opacity="0.95">${menu.title}</text>
        <text x="50%" y="56%" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" letter-spacing="4" fill="#f5b300">SAMPLE MENU PHOTO</text>
        <text x="50%" y="63%" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#fff8ec" opacity="0.7">Replace with real banana leaf photograph</text>
      </svg>`;
    await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(path.join(dir, menu.file));
  }
  console.log(`Generated ${menus.length} placeholder menu photos.`);
}

run();
