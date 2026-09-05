#!/usr/bin/env node
/**
 * Renders public/og.png, the link-preview card, from an inline SVG. Run once
 * (`npm run og`) and commit the result; it only changes when the words do.
 * Uses the system serif in the SVG because sharp's rasteriser reads system
 * fonts, not the site's bundled ones; the card is a card, not the page.
 */

import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const mark =
	'M119.517 67.5464C115.349 100.417 85.3235 123.685 52.4528 119.517C52.3029 119.498 52.1532 119.478 52.0038 119.458C48.5315 118.992 47.1181 114.965 49.2376 112.175C51.5416 109.143 55.8249 108.574 59.2674 110.203C62.7572 111.855 66.5636 112.991 70.6018 113.503C91.146 116.108 109.912 101.565 112.517 81.0214C115.122 60.4775 100.579 41.7116 80.035 39.1068C59.4908 36.5019 40.7247 51.0444 38.1198 71.5884C37.1334 79.3681 38.606 86.8929 41.9323 93.3816C43.536 96.5098 44.1308 102.951 42.0041 105.75C37.43 111.77 28.9711 112.2 23.2559 107.25C6.75749 93.75 -2.24283 73.9408 0.481664 52.4536C4.64949 19.5832 34.6752 -3.68482 67.5459 0.482967C100.417 4.65076 123.685 34.6761 119.517 67.5464Z';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#050505"/>
  <g transform="translate(96 96) scale(0.8)">
    <path d="${mark}" fill="#ffffff"/>
  </g>
  <text x="216" y="164" font-family="Helvetica, Arial, sans-serif" font-size="30" font-weight="500" letter-spacing="7" fill="#ffffff">OPUS</text>
  <text x="216" y="198" font-family="Menlo, monospace" font-size="15" letter-spacing="3" fill="#888888">HUMAN EXPERIENCE DESIGN</text>
  <text x="96" y="470" font-family="Georgia, 'Times New Roman', serif" font-size="46" font-style="italic" fill="#ffffff">opus</text>
  <text x="222" y="470" font-family="Menlo, monospace" font-size="18" fill="#888888">n. LATIN   a body of work</text>
  <text x="96" y="524" font-family="Georgia, 'Times New Roman', serif" font-size="46" font-style="italic" fill="#ffffff">opus</text>
  <text x="222" y="524" font-family="Menlo, monospace" font-size="18" fill="#888888">adj. ROMANIAN   opposite</text>
  <text x="96" y="586" font-family="Menlo, monospace" font-size="16" letter-spacing="3" fill="#555555">OPUS.RO</text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png().toBuffer();
writeFileSync('public/og.png', png);
console.log(`public/og.png written (${png.length} bytes)`);
