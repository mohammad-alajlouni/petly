const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8000/index.html', { waitUntil: 'commit', timeout: 15000 });
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(3500);
  const r = await page.evaluate(() => {
    const vw = window.innerWidth;
    const out = [];
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && r.width > 0) {
        out.push({
          tag: el.tagName,
          cls: typeof el.className === 'string' ? el.className.slice(0, 90) : '',
          right: Math.round(r.right),
          width: Math.round(r.width)
        });
      }
    });
    out.sort((a, b) => b.right - a.right);
    return { vw, scrollW: document.body.scrollWidth, htmlScrollW: document.documentElement.scrollWidth, top: out.slice(0, 12) };
  });
  console.log('viewport:', r.vw, 'body.scrollW:', r.scrollW, 'html.scrollW:', r.htmlScrollW);
  r.top.forEach((o) => console.log(`  right=${o.right} w=${o.width}  ${o.tag}.${o.cls}`));
  await browser.close();
})();
