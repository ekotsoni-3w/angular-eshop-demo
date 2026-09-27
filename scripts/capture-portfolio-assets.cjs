const { chromium } = require('playwright');
const fs = require('node:fs');

const baseUrl = process.env.CAPTURE_BASE_URL || 'http://127.0.0.1:4200';

async function preparePage(page) {
  await page.addInitScript(() => localStorage.clear());
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
}

(async () => {
  fs.mkdirSync('docs/screenshots', { recursive: true });
  fs.mkdirSync('docs/demo/raw', { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    recordVideo: { dir: 'docs/demo/raw', size: { width: 960, height: 600 } },
  });
  const page = await desktop.newPage();

  await preparePage(page);
  await page.screenshot({ path: 'docs/screenshots/home.png' });
  await page.waitForTimeout(1100);

  await page.getByRole('link', { name: /Explore products/i }).click();
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'docs/screenshots/products.png' });
  await page.waitForTimeout(900);

  await page.getByLabel('Search products').fill('air');
  await page.waitForTimeout(900);
  await page.getByLabel(/Add Apple AirPods to cart/i).click();
  await page.waitForTimeout(700);
  await page.getByRole('link', { name: /Cart/i }).click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /Increase quantity/i }).click();
  await page.waitForTimeout(1100);
  await page.screenshot({ path: 'docs/screenshots/cart.png' });

  const video = page.video();
  await desktop.close();
  fs.copyFileSync(await video.path(), 'docs/demo/angular-eshop-demo.webm');

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
  });
  const mobilePage = await mobile.newPage();
  await preparePage(mobilePage);
  await mobilePage.goto(`${baseUrl}/products`, { waitUntil: 'networkidle' });
  await mobilePage.screenshot({ path: 'docs/screenshots/products-mobile.png' });
  await mobile.close();
  await browser.close();
  fs.rmSync('docs/demo/raw', { recursive: true, force: true });
})();
