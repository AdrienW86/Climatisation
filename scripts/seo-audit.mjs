import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.AUDIT_BASE_URL ?? 'http://127.0.0.1:3186';
const phase = process.argv[2] === 'before' ? 'before' : 'after';
const routes = [
  '/',
  '/location-climatiseur',
  '/location-climatisation-particuliers',
  '/location-climatisation-professionnels',
  '/equipements',
  '/demande-de-devis',
  '/contact',
  '/conseils',
  '/conseils/choisir-climatiseur-location',
  '/conseils/puissance-climatisation-surface',
  '/conseils/evacuation-air-chaud',
  '/conseils/climatiseur-mobile-ou-ventilateur',
  '/conseils/consommation-climatiseur-mobile',
  '/conseils/climatisation-temporaire-bureau-commerce',
  '/location-climatisation/perpignan',
  '/politique-de-confidentialite',
  '/politique-de-cookies',
];
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const rows = [];
try {
  for (const route of routes) {
    const response = await page.goto(base + route);
    const data = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content'),
      headings: [...document.querySelectorAll('h1,h2,h3')].map((el) => ({
        level: el.tagName,
        text: el.textContent.trim(),
      })),
      links: [
        ...new Set(
          [...document.querySelectorAll('a[href]')]
            .map((el) => el.getAttribute('href'))
            .filter((h) => h?.startsWith('/') && !h.startsWith('//')),
        ),
      ],
      images: [...document.images].map((el) => ({
        src: el.getAttribute('src'),
        alt: el.getAttribute('alt'),
        width: el.width,
        height: el.height,
      })),
      schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map((el) =>
        JSON.parse(el.textContent),
      ),
      overflow: document.documentElement.scrollWidth > innerWidth,
    }));
    rows.push({ route, status: response.status(), ...data });
  }
} finally {
  await browser.close();
}
const orphans = routes.filter(
  (route) => route !== '/' && !rows.some((row) => row.route !== route && row.links.includes(route)),
);
await mkdir('artifacts', { recursive: true });
await writeFile(
  `artifacts/seo-${phase}.json`,
  JSON.stringify({ phase, checkedAt: new Date().toISOString(), base, rows, orphans }, null, 2),
);
console.log(
  JSON.stringify(
    {
      phase,
      pages: rows.length,
      orphans,
      duplicateTitles: rows
        .filter((row, i) => rows.findIndex((r) => r.title === row.title) !== i)
        .map((r) => r.route),
      badH1: rows
        .filter((r) => r.headings.filter((h) => h.level === 'H1').length !== 1)
        .map((r) => r.route),
      overflow: rows.filter((r) => r.overflow).map((r) => r.route),
    },
    null,
    2,
  ),
);
