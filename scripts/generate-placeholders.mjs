// One-off generator for PLACEHOLDER dish art and the banana leaf background.
// Run with: node scripts/generate-placeholders.mjs
// Replace the files it writes under public/assets/ with real photography
// before launch — see public/assets/dishes/README.txt.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(decodeURIComponent(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))), '..');

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 0xff) + amt, b = (n & 0xff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
}

// --- shape builders (all return {svg, w, h}) -----------------------------

function bowlSVG(color) {
  const w = 300, h = 300;
  const light = shade(color, 45), dark = shade(color, -35), rim = shade(color, -70);
  return { w, h, svg: `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <radialGradient id="g" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stop-color="${light}"/>
          <stop offset="70%" stop-color="${color}"/>
          <stop offset="100%" stop-color="${dark}"/>
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="158" rx="118" ry="104" fill="${rim}" opacity="0.35"/>
      <ellipse cx="150" cy="150" rx="112" ry="98" fill="url(#g)"/>
      <ellipse cx="115" cy="112" rx="38" ry="20" fill="#ffffff" opacity="0.25"/>
    </svg>` };
}

function discSVG(color) {
  const w = 300, h = 300;
  const light = shade(color, 40), dark = shade(color, -30);
  const bumps = Array.from({ length: 18 }, (_, i) => {
    const a = (i / 18) * Math.PI * 2;
    const r = 108 + (i % 2 === 0 ? 6 : 0);
    return `${150 + r * Math.cos(a)},${150 + r * Math.sin(a)}`;
  }).join(' ');
  return { w, h, svg: `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <radialGradient id="g" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${light}"/>
          <stop offset="100%" stop-color="${color}"/>
        </radialGradient>
      </defs>
      <polygon points="${bumps}" fill="${dark}" opacity="0.5"/>
      <circle cx="150" cy="150" r="104" fill="url(#g)"/>
      <circle cx="150" cy="150" r="104" fill="none" stroke="${dark}" stroke-width="2" opacity="0.4"/>
    </svg>` };
}

function ringSVG(color) {
  const w = 300, h = 300;
  const light = shade(color, 40), dark = shade(color, -40);
  return { w, h, svg: `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <radialGradient id="g" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stop-color="${light}"/>
          <stop offset="100%" stop-color="${dark}"/>
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="100" fill="url(#g)"/>
      <circle cx="150" cy="150" r="38" fill="none" stroke="#00000000"/>
      <circle cx="150" cy="150" r="36" fill="#ffffff"/>
    </svg>` };
}

function moundSVG(color) {
  const w = 320, h = 260;
  const light = shade(color, 15), dark = shade(color, -25);
  return { w, h, svg: `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <radialGradient id="g" cx="40%" cy="30%" r="80%">
          <stop offset="0%" stop-color="${light}"/>
          <stop offset="100%" stop-color="${dark}"/>
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="190" rx="140" ry="55" fill="${dark}" opacity="0.3"/>
      <path d="M 40 170 Q 60 60 160 55 Q 260 60 280 170 Q 260 200 160 205 Q 60 200 40 170 Z" fill="url(#g)"/>
    </svg>` };
}

function curvedSVG(color) {
  const w = 300, h = 180;
  const light = shade(color, 40), dark = shade(color, -30);
  return { w, h, svg: `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${light}"/>
          <stop offset="100%" stop-color="${color}"/>
        </linearGradient>
      </defs>
      <path d="M 30 140 Q 60 40 160 30 Q 250 22 270 60 Q 220 50 160 65 Q 80 85 55 150 Z" fill="url(#g)" stroke="${dark}" stroke-width="2"/>
    </svg>` };
}

function glassSVG(color) {
  const w = 220, h = 300;
  const light = shade(color, 45), dark = shade(color, -25);
  return { w, h, svg: `
    <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${light}"/>
          <stop offset="100%" stop-color="${dark}"/>
        </linearGradient>
      </defs>
      <path d="M 55 40 L 165 40 L 150 260 Q 110 275 70 260 Z" fill="url(#g)" opacity="0.92"/>
      <ellipse cx="110" cy="40" rx="55" ry="12" fill="${light}"/>
      <ellipse cx="95" cy="90" rx="14" ry="30" fill="#ffffff" opacity="0.25"/>
    </svg>` };
}

const shapeBuilders = { bowl: bowlSVG, disc: discSVG, ring: ringSVG, mound: moundSVG, curved: curvedSVG, glass: glassSVG };

// --- dish -> {shape,color} manifest ---------------------------------------

const manifest = {
  'rose-milk': ['glass', '#E85C83'],
  panakam: ['glass', '#D98E2E'],
  'nannari-sarbath': ['glass', '#8B3A4A'],
  'veg-cutlet': ['disc', '#C97A2E'],
  'gobi-65': ['bowl', '#B23A1E'],
  'mysore-pak': ['disc', '#D99A2E'],
  laddu: ['ring', '#E0A526'],
  jangiri: ['ring', '#D9631F'],
  'medhu-vadai': ['ring', '#C9842E'],
  'masala-vadai': ['ring', '#B5691F'],
  'carrot-kosumalli': ['bowl', '#D9712E'],
  'moong-dal-kosumalli': ['bowl', '#A9A13A'],
  'vellarikai-pachadi': ['bowl', '#E3906B'],
  'beetroot-pachadi': ['bowl', '#A52E3A'],
  'mango-pickle': ['bowl', '#A52422'],
  'lemon-pickle': ['bowl', '#C9A227'],
  'coconut-thogayal': ['bowl', '#8A8F4A'],
  'vendhaya-thogayal': ['bowl', '#6B7A3A'],
  'beans-poriyal': ['bowl', '#5E8C3E'],
  'cabbage-poriyal': ['bowl', '#7FA34A'],
  'carrot-poriyal': ['bowl', '#D9712E'],
  'vegetable-kootu': ['bowl', '#A9A13A'],
  'pumpkin-kootu': ['bowl', '#D99A2E'],
  aviyal: ['bowl', '#C9B65C'],
  'plain-rice': ['mound', '#F7F2E3'],
  'curd-rice': ['mound', '#FAFAF2'],
  sambar: ['bowl', '#C9701F'],
  rasam: ['bowl', '#D2601A'],
  'vatha-kulambu': ['bowl', '#8B3A1A'],
  'fried-appalam': ['disc', '#E8C873'],
  'roasted-appalam': ['disc', '#D9B45E'],
  curd: ['bowl', '#FAFAF5'],
  'paal-payasam': ['bowl', '#F0D9A8'],
  'semiya-payasam': ['bowl', '#E8C27A'],
  banana: ['curved', '#E8C94A'],
  'mixed-fruits': ['bowl', '#D9631F'],
  paruppu: ['bowl', '#D9A227'],
  ghee: ['bowl', '#F0C64A'],
};

const dishCategoryDir = {
  'rose-milk': 'welcome-drinks', panakam: 'welcome-drinks', 'nannari-sarbath': 'welcome-drinks',
  'veg-cutlet': 'starters', 'gobi-65': 'starters',
  'mysore-pak': 'sweet', laddu: 'sweet', jangiri: 'sweet',
  'medhu-vadai': 'vadai', 'masala-vadai': 'vadai',
  'carrot-kosumalli': 'kosumalli', 'moong-dal-kosumalli': 'kosumalli',
  'vellarikai-pachadi': 'pachadi', 'beetroot-pachadi': 'pachadi',
  'mango-pickle': 'pickle', 'lemon-pickle': 'pickle',
  'coconut-thogayal': 'thogayal', 'vendhaya-thogayal': 'thogayal',
  'beans-poriyal': 'poriyal', 'cabbage-poriyal': 'poriyal', 'carrot-poriyal': 'poriyal',
  'vegetable-kootu': 'kootu', 'pumpkin-kootu': 'kootu',
  aviyal: 'aviyal',
  'plain-rice': 'rice', 'curd-rice': 'rice',
  sambar: 'sambar', rasam: 'rasam', 'vatha-kulambu': 'kulambu',
  'fried-appalam': 'appalam', 'roasted-appalam': 'appalam',
  curd: 'curd',
  'paal-payasam': 'dessert', 'semiya-payasam': 'dessert',
  banana: 'fruits', 'mixed-fruits': 'fruits',
  paruppu: 'others', ghee: 'others',
};

async function run() {
  for (const [dishId, [shape, color]] of Object.entries(manifest)) {
    const build = shapeBuilders[shape];
    const { svg } = build(color);
    const dir = path.join(root, 'public', 'assets', 'dishes', dishCategoryDir[dishId]);
    fs.mkdirSync(dir, { recursive: true });
    await sharp(Buffer.from(svg)).png().toFile(path.join(dir, `${dishId}.png`));
  }
  console.log(`Generated ${Object.keys(manifest).length} placeholder dish images.`);

  // Banana leaf background placeholder (portrait, matches leafPositions.js layout).
  const W = 900, H = 1300;
  const leafSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <radialGradient id="leafBg" cx="50%" cy="45%" r="75%">
        <stop offset="0%" stop-color="#eef4e2"/>
        <stop offset="100%" stop-color="#dce7cc"/>
      </radialGradient>
      <linearGradient id="leafFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#4f7a3d"/>
        <stop offset="45%" stop-color="#3f6b30"/>
        <stop offset="100%" stop-color="#2e5323"/>
      </linearGradient>
      <linearGradient id="leafShine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.16"/>
        <stop offset="50%" stop-color="#ffffff" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.12"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#leafBg)"/>
    <path d="M 450 30
             C 650 60, 790 230, 800 480
             C 810 700, 760 900, 630 1070
             C 560 1160, 490 1230, 450 1270
             C 410 1230, 340 1160, 270 1070
             C 140 900, 90 700, 100 480
             C 110 230, 250 60, 450 30 Z"
          fill="url(#leafFill)" stroke="#24401c" stroke-width="4"/>
    <path d="M 450 30 C 650 60, 790 230, 800 480 C 810 700, 760 900, 630 1070 C 560 1160, 490 1230, 450 1270 C 410 1230, 340 1160, 270 1070 C 140 900, 90 700, 100 480 C 110 230, 250 60, 450 30 Z"
          fill="url(#leafShine)"/>
    <path d="M 450 60 L 450 1240" stroke="#f3eecb" stroke-width="7" opacity="0.55"/>
    ${Array.from({ length: 9 }, (_, i) => {
      const y = 140 + i * 125;
      const spread = 140 + i * 18;
      const curveL = 60 + i * 10;
      const curveR = 60 + i * 10;
      return `<path d="M 450 ${y} C ${450 - curveL} ${y - 10}, ${450 - spread} ${y + 40}, ${450 - spread + 30} ${y + 70}" stroke="#f3eecb" stroke-width="3" opacity="0.4" fill="none"/>
              <path d="M 450 ${y} C ${450 + curveR} ${y - 10}, ${450 + spread} ${y + 40}, ${450 + spread - 30} ${y + 70}" stroke="#f3eecb" stroke-width="3" opacity="0.4" fill="none"/>`;
    }).join('\n')}
  </svg>`;
  fs.mkdirSync(path.join(root, 'public', 'assets', 'backgrounds'), { recursive: true });
  await sharp(Buffer.from(leafSvg)).png().toFile(path.join(root, 'public', 'assets', 'backgrounds', 'banana-leaf.png'));
  console.log('Generated banana leaf background placeholder.');
}

run();
