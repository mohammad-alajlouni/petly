const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8000/index.html?v=' + Date.now(), { waitUntil: 'commit', timeout: 15000 });
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(3500);
  const r = await page.evaluate(() => {
    const vw = window.innerWidth;
    const offenders = [];
    document.body.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1) {
        const cs = getComputedStyle(el);
        // Skip elements inside something with overflow-x clipping (auto/hidden/scroll/clip)
        let p = el.parentElement;
        let clipped = false;
        while (p && p !== document.body) {
          const pcs = getComputedStyle(p);
          if (['hidden', 'auto', 'scroll', 'clip'].includes(pcs.overflowX)) { clipped = true; break; }
          p = p.parentElement;
        }
        if (!clipped) {
          offenders.push({
            tag: el.tagName,
            cls: typeof el.className === 'string' ? el.className.slice(0, 80) : '',
            right: Math.round(r.right),
            width: Math.round(r.width),
            ovx: cs.overflowX
          });
        }
      }
    });
    offenders.sort((a, b) => b.right - a.right);
    return { vw, scrollW: document.body.scrollWidth, top: offenders.slice(0, 20) };
  });
  console.log('viewport:', r.vw, 'scrollW:', r.scrollW);
  console.log('Offenders that escape any overflow-clipping ancestor:');
  r.top.forEach((o) => console.log(`  right=${o.right} w=${o.width}  ${o.tag}.${o.cls}  ovx=${o.ovx}`));
  await browser.close();
})();
