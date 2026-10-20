import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('animations : contenu disponible sans JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.audience-card').first()).toBeVisible();
  await page.goto('/conseils/puissance-climatisation-surface');
  await expect(page.locator('.answer-box')).toContainText('30 m²');
  await context.close();
});
test('animations respectent reduced-motion et menu refermable par Échap', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('h1').evaluate((el) => getComputedStyle(el).animationName)).toBe(
    'none',
  );
  await page.getByRole('button', { name: 'Ouvrir le menu' }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation', { name: 'Navigation mobile' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Ouvrir le menu' })).toBeFocused();
});
test('accessibilité automatisée des pages clés', async ({ page }) => {
  for (const route of ['/', '/demande-de-devis', '/conseils/choisir-climatiseur-location']) {
    await page.goto(route);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations,
      JSON.stringify(
        results.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
        null,
        2,
      ),
    ).toEqual([]);
  }
});
test('captures des pages principales mobile et desktop', async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 950 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const [label, route] of [
      ['home', '/'],
      ['devis', '/demande-de-devis'],
      ['guide', '/conseils/consommation-climatiseur-mobile'],
      ['local', '/location-climatisation/perpignan'],
    ]) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      await page.screenshot({ path: `artifacts/phase2-${label}-${width}.png`, fullPage: true });
    }
  }
});
