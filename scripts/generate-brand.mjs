import { mkdir, writeFile } from 'node:fs/promises';
const symbol = (color, second) =>
  `<path d="M14 32c0-10 8-18 18-18h18c0 10-8 18-18 18H14Z" fill="${color}"/><path d="M50 37c0 10-8 18-18 18H14c0-10 8-18 18-18h18Z" fill="${second}"/><path d="M9 24C9 13 18 4 29 4" stroke="${color}" stroke-width="4" stroke-linecap="round"/>`;
await mkdir('public/brand', { recursive: true });
for (const [variant, color, second, text] of [
  ['light', '#2878f0', '#43b9d5', '#102a43'],
  ['dark', '#8bdff0', '#5db4ce', '#ffffff'],
  ['monochrome', '#102a43', '#102a43', '#102a43'],
]) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 76" role="img" aria-label="Location Climatisation"><g transform="translate(0 6)">${symbol(color, second)}</g><text x="77" y="35" font-family="Manrope,Arial,sans-serif" font-size="26" font-weight="700" letter-spacing="-1" fill="${text}">location</text><text x="77" y="60" font-family="Manrope,Arial,sans-serif" font-size="22" font-weight="600" letter-spacing="-.7" fill="${text}">climatisation<tspan fill="${color}">.</tspan></text></svg>`;
  await writeFile('public/brand/logo-' + variant + '.svg', svg);
  if (variant === 'light') await writeFile('public/brand/logo-horizontal.svg', svg);
}
const iso = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Location Climatisation">${symbol('#2878f0', '#43b9d5')}</svg>`;
await writeFile('public/brand/isotype.svg', iso);
await writeFile('public/favicon.svg', iso);
console.log('Identité vectorielle générée.');
