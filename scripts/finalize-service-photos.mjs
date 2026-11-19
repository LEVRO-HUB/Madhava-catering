// Crops/converts the sourced service photos (in .tmp-downloads/) into the
// final 1200x900 4:3 WebP files used by the Services page, and generates
// clearly-labeled placeholders for the 2 services that had no suitable
// licensed photo available (see public/assets/services/README.txt).
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))), '..');
const srcDir = path.join(root, '.tmp-downloads');
const outDir = path.join(root, 'public', 'assets', 'services');

const W = 1200, H = 900;

// Real, sourced photos (Pexels, free license) — cropped to 4:3.
const sourced = [
  'wedding-catering',
  'buffet-catering',
  'birthday-catering',
  'outdoor-catering',
  'brahmin-catering',
  'family-get-together',
  'seemantham-catering',
  'corporate-events',
  'reception-buffet',
  'school-college-catering',
  'engagement-catering',
  'festival-function-catering',
  'housewarming-catering',
];

// No suitable licensed photo found after multiple searches — placeholder.
const placeholders = [
  { name: 'puberty-catering', label: 'Puberty Catering', color: '#C9701F' },
  { name: 'industrial-events', label: 'Industrial Events', color: '#5A4536' },
];

async function run() {
  fs.mkdirSync(outDir, { recursive: true });

  for (const name of sourced) {
    const input = path.join(srcDir, `${name}.jpg`);
    await sharp(input)
      .resize(W, H, { fit: 'cover', position: 'attention' })
      .webp({ quality: 82 })
      .toFile(path.join(outDir, `${name}.webp`));
    console.log(`cropped+converted: ${name}.webp`);
  }

  for (const p of placeholders) {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
        <defs>
          <radialGradient id="bg" cx="50%" cy="38%" r="80%">
            <stop offset="0%" stop-color="${p.color}"/>
            <stop offset="100%" stop-color="#1d140f"/>
          </radialGradient>
        </defs>
        <rect width="${W}" height="${H}" fill="url(#bg)"/>
        <text x="24" y="${H - 24}" font-family="Arial, sans-serif" font-size="20" letter-spacing="1.5" fill="#f5b300" opacity="0.85">SAMPLE — ${p.label} (photo needed)</text>
      </svg>`;
    await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(path.join(outDir, `${p.name}.webp`));
    console.log(`placeholder generated: ${p.name}.webp`);
  }
}

run();
