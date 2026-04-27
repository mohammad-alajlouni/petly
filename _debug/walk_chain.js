const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8000/doctor.html?id=dr-raed', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const data = await page.evaluate(() => {
    // Find every element whose right > 1440 and report its width and overflow + chain
    const vw = window.innerWidth;
    const offenders = [];
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > vw + 1) {
        const cs = getComputedStyle(el);
        offenders.push({
          tag: el.tagName,
          cls: typeof el.className === 'string' ? el.className.slice(0, 90) : '',
          width: Math.round(r.width),
          right: Math.round(r.right),
          cssWidth: cs.width,
          cssMaxWidth: cs.maxWidth,
          overflow: cs.overflow,
          overflowX: cs.overflowX,
          parentTag: el.parentElement ? el.parentElement.tagName : '',
          parentCls: el.parentElement && typeof el.parentElement.className === 'string'
            ? el.parentElement.className.slice(0, 80) : ''
        });
      }
    });
    // sort by width descending
    offenders.sort((a, b) => b.width - a.width);
    // also report html/body
    const html = document.documentElement;
    const body = document.body;
    const main = document.querySelector('main');
    const root = document.querySelector('[data-doctor-detail-root]');
    function info(el) {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        rectW: Math.round(r.width),
        scrollW: el.scrollWidth,
        clientW: el.clientWidth,
        cssWidth: cs.width,
        cssMaxWidth: cs.maxWidth,
        overflow: cs.overflow,
        overflowX: cs.overflowX
      };
    }
    return {
      html: info(html),
      body: info(body),
      main: info(main),
      root: info(root),
      offenders: offenders.slice(0, 30)
    };
  });
  console.log('html  ', data.html);
  console.log('body  ', data.body);
  console.log('main  ', data.main);
  console.log('root  ', data.root);
  console.log('\nWidest offenders:');
  data.offenders.forEach((o) => {
    console.log(`  w=${o.width} right=${o.right}  ${o.tag}.${o.cls}  cssW=${o.cssWidth} ovx=${o.overflowX}  parent=${o.parentTag}.${o.parentCls}`);
  });
  await browser.close();
})();
