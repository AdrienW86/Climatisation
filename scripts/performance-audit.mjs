import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome' });
const runs = [];
try {
  for (let i = 0; i < 3; i++) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 100,
      downloadThroughput: 200000,
      uploadThroughput: 100000,
    });
    await page.addInitScript(() => {
      window.lcPerformance = { lcp: null, cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.lcPerformance.lcp = entry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          if (!entry.hadRecentInput) window.lcPerformance.cls += entry.value;
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto('http://127.0.0.1:3186/');
    await page.waitForTimeout(2500);
    runs.push(
      await page.evaluate(() => ({
        ...window.lcPerformance,
        bytes: performance
          .getEntriesByType('resource')
          .reduce((sum, e) => sum + (e.transferSize || 0), 0),
      })),
    );
    await context.close();
  }
} finally {
  await browser.close();
}
await mkdir('artifacts', { recursive: true });
const result = {
  conditions:
    'Chrome local, mobile 390×844, CPU ×4, RTT 100 ms, débit 200 Ko/s, 3 navigations froides. Mesures de laboratoire, pas des données terrain.',
  runs,
  medianLcpMs: runs.map((r) => r.lcp).sort((a, b) => a - b)[1],
  maxCls: Math.max(...runs.map((r) => r.cls)),
  inp: 'Non mesuré : nécessite un protocole d’interactions et des données représentatives.',
};
await writeFile('artifacts/performance-phase2.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
