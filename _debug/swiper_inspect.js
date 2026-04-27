const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8000/doctor.html?id=dr-raed', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const data = await page.evaluate(() => {
    function snap(el) {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        cls: el.className,
        rect: { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right },
        overflow: cs.overflow,
        overflowX: cs.overflowX,
        overflowY: cs.overflowY,
        display: cs.display,
        position: cs.position,
        width: cs.width,
        maxWidth: cs.maxWidth,
        transform: cs.transform,
        flex: cs.flex,
        gridTemplate: cs.gridTemplateColumns
      };
    }
    const shell = document.querySelector('.testimonials-shell');
    const swiper = document.querySelector('.testimonials-swiper');
    const wrapper = document.querySelector('.testimonials-swiper .swiper-wrapper');
    const slide = document.querySelector('.testimonials-swiper .swiper-slide');
    const card = document.querySelector('.testimonial-card');
    const heroSection = document.querySelector('.doctor-hero');
    const reviewSection = swiper ? swiper.closest('section') : null;
    return {
      hasSwiperGlobal: typeof window.Swiper !== 'undefined',
      swiperReady: swiper && swiper.dataset.swiperReady,
      shell: snap(shell),
      reviewSection: snap(reviewSection),
      heroSection: snap(heroSection),
      swiper: snap(swiper),
      wrapper: snap(wrapper),
      slide: snap(slide),
      card: snap(card),
      bodyScrollW: document.body.scrollWidth
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
