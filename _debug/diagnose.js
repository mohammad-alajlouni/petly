const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const DEBUG = path.resolve(__dirname);
const BASE = 'http://localhost:8000';

async function inspect(page, label) {
  // Wait for the doctor shell to mount, plus the portrait img to be loaded
  await page.waitForSelector('.doctor-shell', { timeout: 5000 });
  await page.waitForSelector('.doctor-portrait-frame img', { timeout: 5000 });
  // Wait for image to actually load
  await page.evaluate(async () => {
    const img = document.querySelector('.doctor-portrait-frame img');
    if (!img) return;
    if (img.complete) return;
    await new Promise((res) => {
      img.addEventListener('load', res, { once: true });
      img.addEventListener('error', res, { once: true });
    });
  });
  // Allow layout to settle
  await page.waitForTimeout(300);

  const data = await page.evaluate(() => {
    const props = ['width', 'height', 'max-width', 'min-width', 'min-height',
                   'aspect-ratio', 'position', 'inset', 'transform',
                   'object-fit', 'display', 'overflow', 'box-sizing',
                   'margin', 'padding', 'top', 'right', 'bottom', 'left'];
    function snapshot(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const out = {};
      props.forEach((p) => out[p] = cs.getPropertyValue(p));
      const r = el.getBoundingClientRect();
      out.rect = {
        x: r.x, y: r.y, width: r.width, height: r.height,
        top: r.top, right: r.right, bottom: r.bottom, left: r.left
      };
      // any inline style attribute
      out.inlineStyle = el.getAttribute('style') || '';
      out.tagName = el.tagName;
      out.classes = el.className;
      return out;
    }
    function listMatchingRules(el) {
      // Walk all stylesheets and collect any rule whose selector matches el
      const matches = [];
      for (const sheet of document.styleSheets) {
        let rules;
        try { rules = sheet.cssRules; } catch (e) { continue; }
        if (!rules) continue;
        const collect = (rules, mediaText) => {
          for (const rule of rules) {
            if (rule.cssRules && rule.media) {
              // CSSMediaRule
              const mt = rule.media && rule.media.mediaText;
              if (window.matchMedia(mt).matches) {
                collect(rule.cssRules, mt);
              }
              continue;
            }
            if (!rule.selectorText) continue;
            // Selector might be comma-separated
            const selectors = rule.selectorText.split(',').map(s => s.trim());
            for (const sel of selectors) {
              try {
                if (el.matches(sel)) {
                  matches.push({
                    selector: sel,
                    media: mediaText || null,
                    css: rule.cssText
                  });
                  break;
                }
              } catch (e) { /* invalid selector for this engine */ }
            }
          }
        };
        collect(rules, null);
      }
      return matches;
    }
    const grid  = document.querySelector('.doctor-hero-grid');
    const shell = document.querySelector('.doctor-media-shell');
    const frame = document.querySelector('.doctor-portrait-frame');
    const img   = document.querySelector('.doctor-portrait-frame img');
    const fallback = document.querySelector('.doctor-portrait-frame .avatar-fallback');
    const copy = document.querySelector('.doctor-copy-card');
    return {
      docHTML: document.querySelector('[data-doctor-detail-root]').outerHTML.slice(0, 4000),
      doctorId: document.querySelector('.doctor-shell')?.getAttribute('data-doctor-id'),
      grid:  snapshot(grid),
      shell: snapshot(shell),
      frame: snapshot(frame),
      img:   snapshot(img),
      copy:  snapshot(copy),
      fallback: snapshot(fallback),
      imgNatural: img ? { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, src: img.src, currentSrc: img.currentSrc, complete: img.complete, displayed: img.style.display } : null,
      fallbackVisible: fallback ? fallback.classList.contains('is-visible') : null,
      imgRules:   img ? listMatchingRules(img) : [],
      frameRules: frame ? listMatchingRules(frame) : [],
      shellRules: shell ? listMatchingRules(shell) : [],
      gridRules:  grid ? listMatchingRules(grid) : [],
      bodyScrollWidth: document.body.scrollWidth,
      htmlScrollWidth: document.documentElement.scrollWidth,
      viewport: { w: window.innerWidth, h: window.innerHeight }
    };
  });
  return data;
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const targets = [
    { id: 'jawad-al-ajlouni', label: 'jawad' },
    { id: 'dr-adham', label: 'adham' },
    { id: 'dr-raed', label: 'raed' },
    { id: 'dr-yara', label: 'yara' }
  ];
  const result = {};

  for (const t of targets) {
    const url = `${BASE}/doctor.html?id=${t.id}`;
    console.log('\n>>> ', url);
    await page.goto(url, { waitUntil: 'networkidle' });
    const data = await inspect(page, t.label);
    result[t.label] = data;
    await page.screenshot({ path: path.join(DEBUG, `before_${t.label}.png`), fullPage: false });
    console.log(`  doctor-id=${data.doctorId}  scrollWidth=${data.bodyScrollWidth}`);
    if (data.frame) console.log(`  .frame  w=${data.frame.rect.width.toFixed(0)} h=${data.frame.rect.height.toFixed(0)} aspect=${data.frame['aspect-ratio']}`);
    if (data.img)   console.log(`  .img    w=${data.img.rect.width.toFixed(0)} h=${data.img.rect.height.toFixed(0)} pos=${data.img.position} display=${data.img.display}`);
    if (data.fallback) console.log(`  .fallback display=${data.fallback.display} visible=${data.fallbackVisible} h=${data.fallback.rect.height.toFixed(0)}`);
    if (data.imgNatural) console.log(`  natural ${data.imgNatural.naturalWidth}x${data.imgNatural.naturalHeight} complete=${data.imgNatural.complete}`);
  }

  fs.writeFileSync(path.join(DEBUG, 'before_data.json'), JSON.stringify(result, null, 2));
  await browser.close();
  console.log('\nWrote before_data.json');
})();
