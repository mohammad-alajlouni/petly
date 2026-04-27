const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8000';

async function findOverflow(page, label) {
  await page.waitForSelector('.doctor-shell', { timeout: 5000 });
  await page.waitForTimeout(500);
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const docW = document.documentElement.scrollWidth;
    const offenders = [];
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      // find anything whose right edge crosses the viewport
      if (r.right > vw + 1 && r.width > 0) {
        offenders.push({
          tag: el.tagName,
          cls: el.className && typeof el.className === 'string' ? el.className.slice(0, 80) : '',
          id: el.id || '',
          x: Math.round(r.x),
          y: Math.round(r.y),
          width: Math.round(r.width),
          right: Math.round(r.right),
          text: (el.textContent || '').trim().slice(0, 60)
        });
      }
    });
    // Sort by right desc to put worst offenders first
    offenders.sort((a, b) => b.right - a.right);
    return { vw, docW, offenders: offenders.slice(0, 25) };
  });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const targets = ['jawad-al-ajlouni','dr-adham','dr-raed','dr-yara'];
  const out = {};
  for (const id of targets) {
    await page.goto(`${BASE}/doctor.html?id=${id}`, { waitUntil: 'networkidle' });
    const r = await findOverflow(page, id);
    out[id] = r;
    console.log(`\n=== ${id} === vw=${r.vw} docW=${r.docW} offenders=${r.offenders.length}`);
    r.offenders.slice(0, 12).forEach((o) => {
      console.log(`  right=${o.right.toString().padStart(5)} w=${o.width.toString().padStart(5)} ${o.tag}.${o.cls}  "${o.text}"`);
    });
  }
  fs.writeFileSync(path.join(__dirname, 'overflow.json'), JSON.stringify(out, null, 2));
  await browser.close();
})();
