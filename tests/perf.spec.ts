import { test, expect } from '@playwright/test';

test('Measure page load performance', async ({ page }) => {
  const start = Date.now();
  await page.goto('https://empathy-client-site.pages.dev');
  const end = Date.now();

  const totalLoadTime = end - start;

  console.log(`Page Load Time: ${totalLoadTime} ms`);

  // Optional threshold check
  expect(totalLoadTime).toBeLessThan(3000);
});
