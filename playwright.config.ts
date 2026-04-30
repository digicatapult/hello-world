import { defineConfig, devices } from '@playwright/test';

const e2eTarget = process.env.E2E_TARGET ?? 'python';
const isNodeTarget = e2eTarget === 'node';
const port = isNodeTarget ? 3000 : 3001;
const baseURL = `http://localhost:${port}`;
const webServerCommand = isNodeTarget
  ? 'npm start'
  : 'PORT=3001 poetry run python index.py';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html', { open: 'never' }],
    ['playwright-ctrf-json-reporter', { outputDir: './playwright-report' }],
    ['list', {}],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: webServerCommand,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
