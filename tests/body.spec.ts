import { test, expect } from '@playwright/test';

test('assert server returns hello world JSON', async ({ request }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const target = process.env.E2E_TARGET;
  if (target === 'node') {
    const bodyText = await response.text();
    expect(bodyText).toBe('Hello world!');
  } else {
    const bodyJson = await response.json();
    expect(bodyJson).toEqual({ message: 'hello world' });
  }
});
