const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('console', (m) => console.log('CONSOLE', m.type(), m.text()));
  page.on('pageerror', (m) => console.log('PAGEERR', m.message));
  page.on('requestfailed', (r) => console.log('REQFAIL', r.url(), r.failure()?.errorText));
  try {
    console.log('Loading index.html (commit:load)...');
    await page.goto('http://localhost:8000/index.html', { waitUntil: 'commit', timeout: 8000 });
    console.log('committed');
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
    console.log('domcontentloaded reached');
  } catch (e) {
    console.log('ERROR:', e.message);
  }
  await page.waitForTimeout(2000);
  console.log('readyState:', await page.evaluate(() => document.readyState));
  await page.screenshot({ path: '_debug/post_home_desktop.png' });
  console.log('screenshot taken');
  await browser.close();
})();
