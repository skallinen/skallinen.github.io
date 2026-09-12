import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e', fullyParallel: false, workers: 1, timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:3107', channel: 'chrome', screenshot: 'only-on-failure' },
  webServer: { command: 'node server/index.mjs --demo', url: 'http://127.0.0.1:3107',
    env: { PORT: '3107' }, reuseExistingServer: false },
});
