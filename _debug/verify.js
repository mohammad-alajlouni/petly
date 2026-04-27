const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8000';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const targets = [
    { id: 'jawad-al-ajlouni', label: 'jawad' },
    { id: 'dr-adham',         label: 'adham' },
    { id: 'dr-raed',          label: 'raed' },
    { id: 'dr-yara',          label: 'yara' }
  ];
  const summary = {};
  for (const t of targets) {
    await page.goto(`${BASE}/doctor.html?id=${t.id}`, { waitUntil: 'networkidle' });
    await page.waitForSelector('.doctor-portrait-frame img');
    await page.evaluate(async () => {
      const img = document.querySelector('.doctor-portrait-frame img');
      if (img && !img.complete) await new Promise((r) => { img.onload = r; img.onerror = r; });
    });
    await page.waitForTimeout(500);
    const data = await page.evaluate(() => {
      const frame = document.querySelector('.doctor-portrait-frame');
      const img   = document.querySelector('.doctor-portrait-frame img');
      const fr = frame.getBoundingClientRect();
      const ir = img.getBoundingClientRect();
      return {
        bodyScrollW: document.body.scrollWidth,
        htmlScrollW: document.documentElement.scrollWidth,
        viewport: window.innerWidth,
        frame: { w: Math.round(fr.width), h: Math.round(fr.height), right: Math.round(fr.right) },
        img:   { w: Math.round(ir.width), h: Math.round(ir.height), right: Math.round(ir.right) }
      };
    });
    summary[t.label] = data;
    await page.screenshot({ path: path.join(__dirname, `after_${t.label}.png`), fullPage: false });
    await page.screenshot({ path: path.join(__dirname, `after_${t.label}_full.png`), fullPage: true });
    const ok = data.bodyScrollW <= data.viewport;
    console.log(`${t.label}: scrollW=${data.bodyScrollW} viewport=${data.viewport}  frame=${data.frame.w}x${data.frame.h}  ${ok ? 'OK' : 'OVERFLOW'}`);
  }
  fs.writeFileSync(path.join(__dirname, 'after_data.json'), JSON.stringify(summary, null, 2));
  await browser.close();
})();
