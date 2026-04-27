const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8000';
const VIEWPORTS = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'tablet',  w: 820,  h: 1180 },
  { name: 'mobile',  w: 390,  h: 844 }
];
const PAGES = [
  { url: 'index.html', label: 'home' },
  { url: 'team.html', label: 'team' },
  { url: 'doctor.html?id=dr-raed', label: 'doctor' },
  { url: 'services.html', label: 'services' },
  { url: 'about.html', label: 'about' },
  { url: 'contact.html', label: 'contact' },
  { url: 'gallery.html', label: 'gallery' },
  { url: 'blog.html', label: 'blog' }
];

(async () => {
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await ctx.newPage();
    for (const p of PAGES) {
      try {
        await page.goto(`${BASE}/${p.url}`, { waitUntil: 'networkidle', timeout: 15000 });
        await page.waitForTimeout(700);
        const file = path.join(__dirname, `audit_${p.label}_${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: false });
        const fileFull = path.join(__dirname, `audit_${p.label}_${vp.name}_full.png`);
        await page.screenshot({ path: fileFull, fullPage: true });
        console.log(`OK  ${p.label} ${vp.name}`);
      } catch (e) {
        console.log(`ERR ${p.label} ${vp.name}: ${e.message}`);
      }
    }
    await ctx.close();
  }
  await browser.close();
})();
