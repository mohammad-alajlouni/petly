const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:8000';
const VIEWPORTS = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'mobile',  w: 390,  h: 844 }
];
const PAGES = [
  { url: 'index.html', label: 'home' },
  { url: 'team.html', label: 'team' },
  { url: 'doctor.html?id=dr-raed', label: 'doctor' },
  { url: 'doctor.html?id=jawad-al-ajlouni', label: 'doctor_jawad' },
  { url: 'doctor.html?id=dr-yara', label: 'doctor_yara' },
  { url: 'services.html', label: 'services' },
  { url: 'contact.html', label: 'contact' },
  { url: 'gallery.html', label: 'gallery' },
  { url: 'about.html', label: 'about' },
  { url: 'blog.html', label: 'blog' }
];

(async () => {
  const browser = await chromium.launch();
  const summary = {};
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const page = await ctx.newPage();
    for (const p of PAGES) {
      try {
        const sep = p.url.includes('?') ? '&' : '?';
        await page.goto(`${BASE}/${p.url}${sep}v=${Date.now()}`, { waitUntil: 'commit', timeout: 15000 });
        await page.waitForLoadState('domcontentloaded', { timeout: 15000 }).catch(() => {});
        // Give time for hydrating + reveal-fallback (1200ms)
        await page.waitForTimeout(2500);
        const file = path.join(__dirname, `post_${p.label}_${vp.name}.png`);
        await page.screenshot({ path: file, fullPage: false });
        const m = await page.evaluate(() => ({
          scrollW: document.body.scrollWidth,
          viewport: window.innerWidth,
          hidden: document.querySelectorAll('[data-reveal]:not([data-reveal-shown])').length,
          hiddenStuck: Array.from(document.querySelectorAll('[data-reveal]')).filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.1).length,
          ariaExpanded: document.querySelector('[data-nav-toggle]')?.getAttribute('aria-expanded')
        }));
        summary[`${p.label}_${vp.name}`] = m;
        console.log(`${p.label.padEnd(15)} ${vp.name}: scrollW=${m.scrollW} stuckHidden=${m.hiddenStuck} aria-expanded=${m.ariaExpanded}`);
      } catch (e) {
        console.log(`ERR ${p.label} ${vp.name}: ${e.message}`);
      }
    }
    await ctx.close();
  }
  fs.writeFileSync(path.join(__dirname, 'post_summary.json'), JSON.stringify(summary, null, 2));
  await browser.close();
})();
