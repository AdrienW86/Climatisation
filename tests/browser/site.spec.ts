import { test, expect } from '@playwright/test';
test('routes principales, un H1 et absence d’erreurs JavaScript', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  for (const route of [
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
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('title')).not.toBeEmpty();
  }
  expect(errors).toEqual([]);
});
test('responsive, vidéo du hero et ressources locales accessibles', async ({ page }) => {
  const failures: string[] = [];
  page.on('response', (r) => {
    if (r.status() >= 400) failures.push(r.url());
  });
  for (const width of [320, 390, 768, 1280, 1920]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto('/');
    await expect(page.locator('.hero-visual video')).toBeVisible();
    await expect(page.locator('video')).toHaveAttribute(
      'poster',
      '/images/climatisation-hero-poster.webp',
    );
    if (width < 768) await expect(page.locator('video source')).toHaveCount(0);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBeTruthy();
    if (width === 1280)
      await page.screenshot({ path: 'artifacts/home-desktop.png', fullPage: true });
    if (width === 390) await page.screenshot({ path: 'artifacts/home-mobile.png', fullPage: true });
  }
  expect(failures).toEqual([]);
});
test('navigation mobile, FAQ et formulaire désactivé sans configuration', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await expect(page.getByRole('navigation', { name: 'Navigation mobile' })).toBeVisible();
  await page
    .getByRole('navigation', { name: 'Navigation mobile' })
    .getByRole('link', { name: 'Demander un devis' })
    .click();
  await expect(page.getByRole('button', { name: 'Envoyer ma demande' })).toBeDisabled();
  await expect(page.getByRole('status')).toContainText('Aucune information');
  await page.goto('/');
  const question = page.locator('summary').first();
  await question.click();
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
});
test('pages non publiées et absence de faux succès email', async ({ request }) => {
  expect((await request.get('/mentions-legales')).status()).toBe(404);
  expect((await request.get('/climatiseur-mobile')).status()).toBe(404);
  expect((await request.get('/location-climatisation/canet-en-roussillon')).status()).toBe(404);
  const denied = await request.post('/api/devis', {
    headers: { origin: 'https://unauthorized.test' },
    data: {},
  });
  expect(denied.status()).toBe(403);
  const missing = await request.post('/api/devis', { data: {} });
  expect(missing.status()).toBe(503);
  expect((await missing.json()).message).toContain('Aucune demande');
});
test('robots et réduction des mouvements', async ({ page, request }) => {
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('Disallow: /');
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).not.toContain('https://');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(
    await page
      .locator('.hero-visual')
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe('none');
});
test('métadonnées, FAQ structurée, ressources de marque et clavier', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Location de climatisation à Perpignan');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  const faq = schemas.map((s) => JSON.parse(s)).find((s) => s['@type'] === 'FAQPage');
  expect(faq.mainEntity.length).toBe(5);
  expect(faq.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused();
  for (const route of [
    '/favicon.svg',
    '/brand/logo-horizontal.svg',
    '/brand/logo-dark.svg',
    '/brand/logo-monochrome.svg',
    '/apple-icon',
    '/opengraph-image',
    '/manifest.webmanifest',
    '/fonts/manrope-latin.woff2',
  ])
    expect((await request.get(route)).status()).toBe(200);
});
