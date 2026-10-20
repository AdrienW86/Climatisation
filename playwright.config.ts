import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:3186', channel: 'chrome', headless: true },
  webServer: {
    command: 'npm.cmd run start -- --hostname 127.0.0.1 --port 3186',
    url: 'http://127.0.0.1:3186',
    reuseExistingServer: process.env.PLAYWRIGHT_REUSE_SERVER === 'true',
    timeout: 60000,
  },
});
