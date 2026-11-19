// Converts the 5 supplied banana-leaf menu images (PNG) into the WebP
// files referenced by src/data/predefinedMenus.js. Proper format
// conversion via sharp, not a file-extension rename.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))), '..');
const dir = path.join(root, 'public', 'assets', 'menus');

const mapping = [
  { src: 'South Indian Banana Leaf Feast-1.png', out: 'grand-dinner-mega.webp' },
  { src: 'Festive South Indian Banana Leaf Feast-2.png', out: 'royal-lunch-mega.webp' },
  { src: 'South Indian Feast on a Banana Leaf-3.png', out: 'premium-dinner-special.webp' },
  { src: 'South Indian Feast on a Banana Leaf-4.png', out: 'signature-dinner-feast.webp' },
  { src: 'Traditional South Indian Banana Leaf Feast-5.png', out: 'traditional-dining-special.webp' },
];

async function run() {
  for (const { src, out } of mapping) {
    await sharp(path.join(dir, src)).webp({ quality: 88 }).toFile(path.join(dir, out));
    console.log(`${src} -> ${out}`);
  }
}

run();
