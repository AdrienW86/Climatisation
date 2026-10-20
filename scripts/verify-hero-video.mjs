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
    await page
      .getByRole('button', { name: mobile ? 'Lire la présentation' : 'Mettre en pause' })
      .waitFor();
    const before = await page
      .locator('video')
      .evaluate((v) => ({
        width: v.videoWidth,
        height: v.videoHeight,
        paused: v.paused,
        time: v.currentTime,
        poster: v.poster,
      }));
    if (mobile) {
      assert.equal(requests.length, 0);
      assert.equal(before.paused, true);
      assert.ok(before.poster);
      await page.getByRole('button', { name: 'Lire la présentation' }).click();
    }
    await page.waitForFunction(() => {
      const v = document.querySelector('video');
      return v && !v.paused && v.currentTime > 0.3;
    });
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
    const dimensions = await page
      .locator('video')
      .evaluate((v) => ({ width: v.videoWidth, height: v.videoHeight, duration: v.duration }));
    assert.equal(dimensions.width, 1920);
    assert.equal(dimensions.height, 1080);
    assert.ok(dimensions.duration > 29);
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
      manualOnMobile: true,
      pauseResume: true,
      noOverflow: true,
    });
    await context.close();
  }
  await writeFile('artifacts/hero-video-check.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
