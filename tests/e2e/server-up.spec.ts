import { test, expect } from '@playwright/test';

test('server is up', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();

  const target = process.env.E2E_TARGET ?? 'python';
  if (target === 'node') {
    const bodyText = await response.text();
    expect(bodyText).toBe('Hello world!');
  } else {
    const bodyJson = await response.json();
    expect(bodyJson).toEqual({ message: 'hello world' });
  }
});
