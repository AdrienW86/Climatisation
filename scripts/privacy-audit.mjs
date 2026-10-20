import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
let requests = 0;
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.route('**/_vercel/**', (route) => {
  requests++;
  return route.fulfill({
    status: 200,
    contentType: 'application/javascript',
    body: '/* Prestataire simulé : aucune collecte réelle. */',
  });
});
try {
  await page.goto('http://127.0.0.1:3186/demande-de-devis');
  await page.getByRole('button', { name: 'Refuser', exact: true }).waitFor();
  assert.equal(requests, 0);
  await page.getByRole('button', { name: 'Refuser', exact: true }).click();
  await page.reload();
  await page.getByRole('button', { name: 'Choix de confidentialité' }).waitFor();
  assert.equal(requests, 0);
  await page.getByRole('button', { name: 'Choix de confidentialité' }).click();
  await page.getByRole('button', { name: 'Accepter', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('script[src*="/_vercel/"]'));
  await page.waitForTimeout(500);
  assert.ok(requests > 0);
  await page.getByRole('button', { name: 'Choix de confidentialité' }).click();
  await page.getByRole('button', { name: 'Refuser', exact: true }).click();
  await page.waitForLoadState('load');
  assert.equal(await page.locator('script[src*="/_vercel/"]').count(), 0);
  assert.equal(errors.length, 0);
  const results = {
    provider: 'Scripts des prestataires simulés, aucun événement transmis',
    initialRequests: 0,
    refusalRequests: 0,
    acceptedScriptRequests: requests,
    revocationReload: true,
    noScriptAfterRevocation: true,
    errors,
  };
  await writeFile('artifacts/privacy-phase2.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
