import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const origin = process.env.VIDEO_TEST_ORIGIN ?? 'http://localhost:3001';
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
try {
  for (const mobile of [false, true]) {
    const context = await browser.newContext({
      viewport: { width: mobile ? 390 : 1280, height: 900 },
    });
    const page = await context.newPage();
    const requests = [];
    page.on('request', (r) => {
      if (r.url().includes('.mp4')) requests.push(r.url());
    });
    await page.goto(origin);
    await page.getByRole('button', { name: 'Mettre en pause' }).waitFor();
    const before = await page.locator('video').evaluate((v) => ({
      width: v.videoWidth,
      height: v.videoHeight,
      paused: v.paused,
      time: v.currentTime,
      poster: v.poster,
    }));
    assert.ok(requests.length > 0);
    assert.equal(before.paused, false);
    assert.ok(before.poster);
    assert.equal(await page.locator('video').evaluate((v) => v.autoplay && v.loop), true);
    assert.equal(await page.locator('video').evaluate((v) => v.muted), true);
    await page.getByRole('button', { name: 'Activer le son', exact: true }).click();
    assert.equal(await page.locator('video').evaluate((v) => v.muted), false);
    await page.getByRole('button', { name: 'Couper le son', exact: true }).click();
    assert.equal(await page.locator('video').evaluate((v) => v.muted), true);
    await page.waitForFunction(() => {
      const v = document.querySelector('video');
      return v && !v.paused && v.currentTime > 0.3;
    });
    await page.getByRole('button', { name: 'Activer le son', exact: true }).click();
    assert.equal(await page.locator('video').evaluate((v) => v.muted), false);
    await page.getByRole('button', { name: 'Mettre en pause' }).click();
    const paused = await page
      .locator('video')
      .evaluate((v) => ({ paused: v.paused, time: v.currentTime }));
    assert.equal(paused.paused, true);
    await page.getByRole('button', { name: 'Lire la présentation' }).click();
    await page.waitForFunction((previous) => {
      const v = document.querySelector('video');
      return v && !v.paused && v.currentTime > previous;
    }, paused.time);
    assert.equal(await page.locator('video').evaluate((v) => v.muted), false);
    await page.getByRole('button', { name: 'Couper le son', exact: true }).click();
    assert.equal(await page.locator('video').evaluate((v) => v.muted), true);
    const dimensions = await page
      .locator('video')
      .evaluate((v) => ({ width: v.videoWidth, height: v.videoHeight, duration: v.duration }));
    assert.equal(dimensions.width, 1920);
    assert.equal(dimensions.height, 1080);
    assert.ok(dimensions.duration > 29);
    await page.locator('video').evaluate((v) => {
      v.currentTime = v.duration - 0.25;
    });
    await page.waitForFunction(() => {
      const v = document.querySelector('video');
      return v && !v.paused && v.currentTime < 1;
    });
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    await page.locator('video').evaluate((v) => v.pause());
    await page
      .locator('.hero')
      .screenshot({ path: `artifacts/hero-video-${mobile ? 'mobile' : 'desktop'}.png` });
    results.push({
      mobile,
      video: dimensions,
      automaticPlayback: true,
      loopRestart: true,
      pauseResume: true,
      soundToggle: true,
      noOverflow: true,
    });
    await context.close();
  }
  await writeFile('artifacts/hero-video-check.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
