const sharp = require('sharp');
const path = require('path');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <polygon points="50,5 11,27 11,72 50,95 89,73 89,28" fill="#0a192f"/>
  <text x="50" y="68" text-anchor="middle" font-family="Calibre, Inter, system-ui, sans-serif" font-size="50" font-weight="600" fill="#64ffda">R</text>
</svg>`;

(async () => {
  const out = path.resolve('src/images/logo.png');
  await sharp(Buffer.from(svg)).resize(512, 512).png().toFile(out);
  console.log('wrote', out);
})();
