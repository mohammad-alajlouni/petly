(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const htmlLang = document.documentElement.lang || body.dataset.lang || 'en';
  const lang = htmlLang.toLowerCase().startsWith('ar') ? 'ar' : 'en';
  const page = body.dataset.page || 'home';
  const activePage = page === 'blog-post' ? 'blog' : page;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  const externalScripts = new Map();
  const CDN = {
    gsap: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    scrollTrigger: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
    swiper: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
    glightbox: 'https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js',
    lottie: 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js'
  };

  const shellContent = {
    en: {
      brandName: 'Petly Veterinary Clinic',
      brandTag: 'Modern care with a softer heartbeat',
      nav: [
        ['home', 'Home', 'index.html'],
        ['about', 'About', 'about.html'],
        ['services', 'Services', 'services.html'],
        ['team', 'Team', 'team.html'],
        ['blog', 'Blog', 'blog.html'],
        ['contact', 'Contact', 'contact.html'],
        ['gallery', 'Gallery', 'gallery.html']
      ],
      langLabel: 'AR',
      langHref: `ar/${page === 'home' ? 'index' : page}.html`,
      primaryCta: ['Contact Us', 'contact.html'],
      footerBlurb: 'Petly brings warm communication, careful medicine, and a calmer experience to every visit.',
      quickLinks: [
        ['About', 'about.html'],
        ['Services', 'services.html'],
        ['Team', 'team.html'],
        ['Blog', 'blog.html']
      ],
      serviceLinks: [
        ['Preventive Care', 'services.html'],
        ['Diagnostics', 'services.html'],
        ['Surgery Support', 'services.html'],
        ['Skin & Nutrition', 'services.html']
      ],
      contactItems: [
        ['Phone', 'tel:+962000000000', '+962 00 000 0000'],
        ['Email', 'mailto:hello@petlyclinic.com', 'hello@petlyclinic.com'],
        ['Address', '', 'Petly Veterinary Clinic, Amman, Jordan']
      ],
      newsletterTitle: 'Pet care notes worth opening',
      newsletterCopy: 'A visual-only signup in this static version. The final design still keeps the welcoming clinic feel.',
      newsletterPlaceholder: 'Email address',
      footerLegal: 'Static frontend concept. No forms submit, no backend services connected.'
    },
    ar: {
      brandName: 'عيادة بيتلي البيطرية',
      brandTag: 'رعاية حديثة بقلب أهدأ',
      nav: [
        ['home', 'الرئيسية', 'index.html'],
        ['about', 'عن العيادة', 'about.html'],
        ['services', 'الخدمات', 'services.html'],
        ['team', 'الفريق', 'team.html'],
        ['blog', 'المدونة', 'blog.html'],
        ['contact', 'تواصل معنا', 'contact.html'],
        ['gallery', 'المعرض', 'gallery.html']
      ],
      langLabel: 'EN',
      langHref: `../${page === 'home' ? 'index' : page}.html`,
      primaryCta: ['تواصل معنا', 'contact.html'],
      footerBlurb: 'تجمع بيتلي بين التواصل الدافئ والطب الدقيق وتجربة أهدأ للحيوانات الأليفة في كل زيارة.',
      quickLinks: [
        ['عن العيادة', 'about.html'],
        ['الخدمات', 'services.html'],
        ['الفريق', 'team.html'],
        ['المدونة', 'blog.html']
      ],
      serviceLinks: [
        ['الرعاية الوقائية', 'services.html'],
        ['الفحوصات والتشخيص', 'services.html'],
        ['الجراحة والتعافي', 'services.html'],
        ['العناية الجلدية والتغذية', 'services.html']
      ],
      contactItems: [
        ['الهاتف', 'tel:+962000000000', '+962 00 000 0000'],
        ['البريد الإلكتروني', 'mailto:hello@petlyclinic.com', 'hello@petlyclinic.com'],
        ['العنوان', '', 'عيادة بيتلي البيطرية، عمّان، الأردن']
      ],
      newsletterTitle: 'رسائل خفيفة ومفيدة لعناية أفضل',
      newsletterCopy: 'هذا الاشتراك بصري فقط في النسخة الثابتة، لكنه يحافظ على دفء التجربة داخل التصميم.',
      newsletterPlaceholder: 'البريد الإلكتروني',
      footerLegal: 'تصور واجهة ثابتة فقط. النماذج لا ترسل ولا توجد خدمات خلفية متصلة.'
    }
  };

  const shell = shellContent[lang];

  function scheduleDeferredTask(task) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(task, { timeout: 1600 });
    } else {
      window.setTimeout(task, 250);
    }
  }

  function loadExternalScript(src, check) {
    if (typeof check === 'function' && check()) return Promise.resolve();
    if (externalScripts.has(src)) return externalScripts.get(src);

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });

    externalScripts.set(src, promise);
    return promise;
  }

  async function ensureGsap() {
    await loadExternalScript(CDN.gsap, () => !!window.gsap);
    await loadExternalScript(CDN.scrollTrigger, () => !!window.ScrollTrigger);
  }

  function ensureSwiper() {
    return loadExternalScript(CDN.swiper, () => !!window.Swiper);
  }

  function ensureLottie() {
    return loadExternalScript(CDN.lottie, () => !!window.lottie);
  }

  function ensureLightbox() {
    return loadExternalScript(CDN.glightbox, () => !!window.GLightbox);
  }

  function injectShell() {
    const headerTarget = document.querySelector('[data-site-header]');
    const footerTarget = document.querySelector('[data-site-footer]');
    if (!headerTarget || !footerTarget) return;

    const navLinks = shell.nav.map(([key, label, href]) => {
      const finalHref = lang === 'ar' ? href : href;
      return `<a href="${finalHref}" class="${activePage === key ? 'active' : ''}">${label}</a>`;
    }).join('');

    headerTarget.innerHTML = `
      <header class="site-header">
        <div class="petly-container">
          <div class="header-shell glass-panel d-flex align-items-center justify-content-between gap-3">
            <a class="brand-mark" href="${lang === 'ar' ? 'index.html' : 'index.html'}" aria-label="${shell.brandName}">
              <img src="${lang === 'ar' ? '../assets/images/hero/petly-logo.png' : 'assets/images/hero/petly-logo.png'}" alt="${shell.brandName}">
              <span class="brand-copy d-none d-md-inline">
                <strong>${shell.brandName}</strong>
                <span>${shell.brandTag}</span>
              </span>
            </a>
            <nav class="desktop-nav" aria-label="${lang === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}">
              ${navLinks}
            </nav>
            <div class="header-actions d-flex align-items-center gap-2">
              <a class="lang-switcher" href="${shell.langHref}" aria-label="${lang === 'ar' ? 'Switch to English' : 'Switch to Arabic'}">${shell.langLabel}</a>
              <a class="btn-secondary-petly desktop-cta" href="${lang === 'ar' ? 'contact.html' : 'contact.html'}">${shell.primaryCta[0]}</a>
              <button class="mobile-nav-toggle" type="button" aria-label="${lang === 'ar' ? 'فتح القائمة' : 'Open menu'}" data-nav-toggle>
                <i class="bi bi-list"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      <div class="mobile-nav-overlay" data-nav-overlay>
        <div class="mobile-nav-panel">
          <nav class="mobile-nav" aria-label="${lang === 'ar' ? 'التنقل على الهاتف' : 'Mobile navigation'}">
            ${navLinks}
            <div class="cta-row">
              <a class="btn-primary-petly" href="${lang === 'ar' ? 'contact.html' : 'contact.html'}">${shell.primaryCta[0]}</a>
              <a class="btn-secondary-petly" href="${shell.langHref}">${shell.langLabel}</a>
            </div>
          </nav>
        </div>
      </div>
    `;

    footerTarget.innerHTML = `
      <footer class="site-footer">
        <div class="petly-container footer-shell">
          <div class="footer-grid">
            <div class="footer-brand">
              <img src="${lang === 'ar' ? '../assets/images/hero/petly-logo.png' : 'assets/images/hero/petly-logo.png'}" alt="${shell.brandName}">
              <p>${shell.footerBlurb}</p>
              <div class="social-row">
                <a href="#" class="social-pill" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                <a href="#" class="social-pill" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
                <a href="#" class="social-pill" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                <a href="#" class="social-pill" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
              </div>
            </div>
            <div>
              <h2 class="footer-title">${lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h2>
              <div class="footer-links">
                ${shell.quickLinks.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
              </div>
            </div>
            <div>
              <h2 class="footer-title">${lang === 'ar' ? 'أبرز الخدمات' : 'Popular Services'}</h2>
              <div class="footer-links">
                ${shell.serviceLinks.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
              </div>
            </div>
            <div>
              <h2 class="footer-title">${lang === 'ar' ? 'ابق قريباً من بيتلي' : 'Stay Close to Petly'}</h2>
              <div class="newsletter-shell">
                <p>${shell.newsletterTitle}</p>
                <p class="mt-2">${shell.newsletterCopy}</p>
                <form data-newsletter-form>
                  <input type="email" placeholder="${shell.newsletterPlaceholder}" aria-label="${shell.newsletterPlaceholder}">
                  <button type="submit" class="btn-primary-petly"><i class="bi bi-arrow-${lang === 'ar' ? 'left' : 'right'}"></i></button>
                </form>
                <div class="footer-contact mt-3">
                  ${shell.contactItems.map(([label, href, value]) => href ? `<a href="${href}"><strong>${label}:</strong> ${value}</a>` : `<span><strong>${label}:</strong> ${value}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; <span data-year></span> ${shell.brandName}</span>
            <span>${shell.footerLegal}</span>
          </div>
        </div>
      </footer>
    `;
  }

  function initCommonShell() {
    document.querySelector('[data-year]')?.append(String(new Date().getFullYear()));

    const overlay = document.querySelector('[data-nav-overlay]');
    const toggle = document.querySelector('[data-nav-toggle]');
    const closeMenu = () => overlay?.classList.remove('is-open');

    toggle?.addEventListener('click', () => {
      overlay?.classList.toggle('is-open');
    });

    overlay?.addEventListener('click', (event) => {
      if (event.target === overlay) closeMenu();
    });

    document.querySelectorAll('.mobile-nav a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const button = form.querySelector('button');
        if (button) {
          button.innerHTML = '<i class="bi bi-check2"></i>';
          setTimeout(() => {
            button.innerHTML = `<i class="bi bi-arrow-${lang === 'ar' ? 'left' : 'right'}"></i>`;
          }, 1500);
        }
      });
    });
  }

  function initPageTransition() {
    body.classList.add('page-transition-ready');
    requestAnimationFrame(() => body.classList.add('page-loaded'));
  }

  function initRevealAnimations() {
    const revealItems = document.querySelectorAll('[data-reveal]');
    if (!revealItems.length) return;
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) {
      revealItems.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
      return;
    }

    window.gsap.registerPlugin(window.ScrollTrigger);
    revealItems.forEach((item) => {
      const variant = item.dataset.reveal;
      const from = { opacity: 0, y: 32 };
      if (variant === 'left') { from.x = -44; from.y = 0; }
      if (variant === 'right') { from.x = 44; from.y = 0; }
      if (variant === 'scale') { from.scale = 0.95; from.y = 16; }
      window.gsap.fromTo(item, from, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 84%'
        }
      });
    });
  }

  function initHeroAnimations() {
    const hero = document.querySelector('.hero-shell');
    if (!hero || !window.gsap || reduceMotion) return;
    const heroElements = hero.querySelectorAll('[data-hero-reveal]');
    const visual = hero.querySelector('.hero-visual');
    const timeline = window.gsap.timeline({ defaults: { ease: 'power3.out' } });
    timeline.fromTo(heroElements, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.95, stagger: 0.1 })
      .fromTo(visual, { opacity: 0, y: 18, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, '-=0.75');

    window.addEventListener('scroll', () => {
      const offset = Math.min(window.scrollY * 0.12, 38);
      if (visual) visual.style.transform = `translateY(${offset}px)`;
    }, { passive: true });
  }

  function initFounderSpotlights() {
    const spotlights = document.querySelectorAll('.founder-spotlight');
    if (!spotlights.length) return;
    if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;

    spotlights.forEach((spotlight) => {
      const portrait = spotlight.querySelector('.founder-portrait-frame');
      const copyItems = spotlight.querySelectorAll('.founder-copy-flow > *');
      const timeline = window.gsap.timeline({
        scrollTrigger: {
          trigger: spotlight,
          start: 'top 78%'
        }
      });

      timeline
        .fromTo(portrait, { opacity: 0, scale: 0.94, y: 26 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' })
        .fromTo(copyItems, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.72, stagger: 0.1, ease: 'power3.out' }, '-=0.68');
    });
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const runCounter = (counter) => {
      const target = Number(counter.dataset.count);
      const suffix = counter.dataset.suffix || '';
      const decimals = Number(counter.dataset.decimals || 0);
      const state = { value: 0 };
      if (window.gsap && !reduceMotion) {
        window.gsap.to(state, {
          value: target,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => {
            counter.textContent = `${state.value.toFixed(decimals).replace(/\.0+$/, '')}${suffix}`;
          }
        });
      } else {
        counter.textContent = `${target}${suffix}`;
      }
    };

    if (!window.IntersectionObserver) {
      counters.forEach(runCounter);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach((counter) => observer.observe(counter));
  }

  function initSwipers(scope = document) {
    if (!window.Swiper) return;
    scope.querySelectorAll('.testimonials-swiper').forEach((element) => {
      if (element.swiper) return;
      const container = element.closest('.testimonials-shell');
      new window.Swiper(element, {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 700,
        loop: element.dataset.loop === 'true',
        autoplay: reduceMotion ? false : { delay: 4500 },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 20 }
        },
        navigation: {
          nextEl: container.querySelector('.swiper-next'),
          prevEl: container.querySelector('.swiper-prev')
        },
        pagination: {
          el: container.querySelector('.swiper-pagination-petly'),
          clickable: true
        }
      });
    });
  }

  async function renderGoogleReviews() {
    if (page !== 'home') return;
    const mounts = document.querySelectorAll('.testimonials-shell');
    if (!mounts.length) return;

    const copy = {
      en: {
        eyebrow: 'Verified Google Reviews',
        heading: 'Trusted by Pet Owners Across Amman',
        verified: 'Verified Google Review',
        basedOn: 'Based on {count} reviews shown here',
        cta: 'Read all reviews on Google',
        readMore: 'Read more',
        readLess: 'Read less',
        unavailable: 'Reviews are temporarily unavailable.'
      },
      ar: {
        eyebrow: 'تقييمات موثّقة من Google',
        heading: 'موثوقون من قبل أصحاب الحيوانات الأليفة في عمّان',
        verified: 'تقييم موثّق من Google',
        basedOn: 'استناداً إلى {count} تقييمات معروضة هنا',
        cta: 'اقرأ جميع التقييمات على Google',
        readMore: 'اقرأ المزيد',
        readLess: 'عرض أقل',
        unavailable: 'التقييمات غير متاحة مؤقتاً.'
      }
    }[lang];

    const palette = ['#28BCA8', '#08A7AB', '#F6C453', '#FF8E6E', '#5976FF', '#7AC17D', '#DA6FB4'];
    const formatter = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-JO' : 'en-US', { year: 'numeric', month: 'long' });

    const escapeHtml = (value) => value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    const initialsFor = (name) => {
      const words = name.trim().split(/\s+/).filter(Boolean);
      return words.slice(0, 2).map((word) => word[0]?.toUpperCase() || '').join('') || '?';
    };

    const colorFor = (name) => {
      const code = (name.trim()[0] || 'A').toUpperCase().charCodeAt(0);
      return palette[code % palette.length];
    };

    const googleLogo = `
      <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">
        <path fill="#EA4335" d="M9 7.364v3.455h4.879c-.197 1.11-1.301 3.253-4.879 3.253-2.938 0-5.333-2.435-5.333-5.436S6.062 3.2 9 3.2c1.674 0 2.795.714 3.436 1.33l2.348-2.267C13.243.832 11.333 0 9 0 4.03 0 0 4.03 0 9s4.03 9 9 9c5.182 0 8.618-3.642 8.618-8.77 0-.59-.064-1.04-.141-1.486H9z"/>
        <path fill="#FBBC05" d="M1.036 5.273l2.84 2.083C4.647 5.87 6.648 4.8 9 4.8c1.674 0 2.795.714 3.436 1.33l2.348-2.267C13.243 2.032 11.333 1.2 9 1.2c-3.456 0-6.448 1.976-7.964 4.873z"/>
        <path fill="#34A853" d="M9 18c2.26 0 4.156-.742 5.541-2.013l-2.56-2.099c-.688.48-1.622.816-2.981.816-3.564 0-6.595-2.406-7.677-5.644l-2.924 2.253C.899 14.16 4.628 18 9 18z"/>
        <path fill="#4285F4" d="M17.618 9.23c0-.59-.064-1.04-.141-1.486H9v3.455h4.879c-.235 1.292-.996 2.385-2.016 3.1l2.56 2.099C16.585 14.405 17.618 12.08 17.618 9.23z"/>
      </svg>
    `;

    const renderStars = (rating) => Array.from({ length: rating }, () => '<i class="bi bi-star-fill"></i>').join('');

    const bindReviewToggles = (mount) => {
      mount.querySelectorAll('[data-review-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
          const card = button.closest('.review-card');
          const isExpanded = card.classList.toggle('is-expanded');
          button.textContent = isExpanded ? copy.readLess : copy.readMore;
        });
      });
    };

    const animateReviewMount = (mount) => {
      if (!window.gsap || !window.ScrollTrigger || reduceMotion) return;
      const cards = mount.querySelectorAll('.review-card');
      const aggregate = mount.querySelector('.reviews-aggregate');
      const timeline = window.gsap.timeline({
        scrollTrigger: {
          trigger: mount,
          start: 'top 80%'
        }
      });

      timeline
        .fromTo(mount.querySelector('.reviews-heading-block'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, '-=0.45')
        .fromTo(aggregate, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.72, ease: 'power3.out' }, '-=0.28');
    };

    mounts.forEach(async (mount) => {
      const path = mount.dataset.reviewsPath || (lang === 'ar' ? '../assets/data/reviews.json' : 'assets/data/reviews.json');
      const url = mount.dataset.reviewsUrl || 'https://www.google.com/maps/place/PETLY+Veterinary+Hospital/@32.0508877,35.8839519,17.73z/data=!4m8!3m7!1s0x151c9ffebb2ce2b1:0x4891153ea7e06faa!8m2!3d32.0510737!4d35.8827585!9m1!1b1!16s%2Fg%2F11hyhwzc6b';
      mount.classList.add('google-reviews-shell');
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        const reviews = await response.json();
        const count = reviews.length;
        const average = (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / count).toFixed(1);

        mount.innerHTML = `
          <div class="reviews-heading-block">
            <div class="section-heading mb-4">
              <p class="eyebrow">${copy.eyebrow}</p>
              <h2 class="text-white">${copy.heading}</h2>
            </div>
          </div>
          <div class="swiper testimonials-swiper" data-loop="${count > 3}">
            <div class="swiper-wrapper">
              ${reviews.map((review) => {
                const reviewText = lang === 'ar' ? review.text_ar : review.text_en;
                const needsToggle = reviewText.length > 280;
                return `
                  <div class="swiper-slide">
                    <article class="review-card">
                      <div class="review-card-head">
                        <div class="review-avatar" style="--avatar-color: ${colorFor(review.author)}">${escapeHtml(initialsFor(review.author))}</div>
                        <div>
                          <strong>${escapeHtml(review.author)}</strong>
                          <div class="review-date">${formatter.format(new Date(review.date))}</div>
                        </div>
                      </div>
                      <div class="testimonial-rating review-stars">${renderStars(review.rating)}</div>
                      <div class="review-copy-wrap">
                        <p class="review-copy${needsToggle ? ' is-collapsible' : ''}">${escapeHtml(reviewText)}</p>
                        ${needsToggle ? `<button class="review-toggle" type="button" data-review-toggle>${copy.readMore}</button>` : ''}
                      </div>
                      <div class="review-verified">
                        <span class="review-verified-badge"><i class="bi bi-shield-check"></i>${copy.verified}</span>
                        <span class="review-google-mark">${googleLogo}<span>Google</span></span>
                      </div>
                    </article>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          <div class="swiper-controls">
            <div class="swiper-nav">
              <button class="swiper-button-petly swiper-prev" type="button" aria-label="${lang === 'ar' ? 'السابق' : 'Previous review'}"><i class="bi bi-arrow-${lang === 'ar' ? 'right' : 'left'}"></i></button>
              <button class="swiper-button-petly swiper-next" type="button" aria-label="${lang === 'ar' ? 'التالي' : 'Next review'}"><i class="bi bi-arrow-${lang === 'ar' ? 'left' : 'right'}"></i></button>
            </div>
            <div class="swiper-pagination-petly"></div>
          </div>
          <div class="reviews-aggregate">
            <strong>${average} / 5</strong>
            <p>${copy.basedOn.replace('{count}', count)}</p>
            <a class="btn-secondary-petly google-review-link" href="${url}" target="_blank" rel="noopener noreferrer">${copy.cta}</a>
          </div>
        `;

        await ensureSwiper();
        bindReviewToggles(mount);
        initSwipers(mount);
        animateReviewMount(mount);
      } catch (error) {
        mount.innerHTML = `<p class="text-white mb-0">${copy.unavailable}</p>`;
        console.error(error);
      }
    });
  }

  function initAccordions() {
    document.querySelectorAll('.faq-item').forEach((item) => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');
      trigger?.addEventListener('click', () => {
        const isOpen = item.classList.toggle('is-open');
        content.style.maxHeight = isOpen ? `${content.scrollHeight}px` : '0px';
      });
    });
  }

  function initFilters() {
    document.querySelectorAll('[data-filter-group]').forEach((group) => {
      const targetSelector = group.dataset.target;
      const items = document.querySelectorAll(targetSelector);
      const buttons = group.querySelectorAll('[data-filter]');
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const filter = button.dataset.filter;
          buttons.forEach((btn) => btn.classList.toggle('active', btn === button));
          items.forEach((item) => {
            const categories = (item.dataset.category || '').split(' ');
            const visible = filter === 'all' || categories.includes(filter);
            item.classList.toggle('hidden-by-filter', !visible);
          });
        });
      });
    });
  }

  function initLightbox() {
    if (window.GLightbox) {
      window.GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true
      });
    }
  }

  function initContactForms() {
    document.querySelectorAll('[data-contact-form]').forEach((form) => {
      const success = form.parentElement.querySelector('.form-success');
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        success?.classList.add('is-visible');
        form.reset();
        setTimeout(() => success?.classList.remove('is-visible'), 2600);
      });
    });
  }

  function initFieldStates() {
    document.querySelectorAll('.field-petly input, .field-petly textarea').forEach((field) => {
      const wrapper = field.closest('.field-petly');
      const sync = () => wrapper?.classList.toggle('is-filled', field.value.trim().length > 0);
      field.addEventListener('input', sync);
      sync();
    });
  }

  function initDirectionAwareIcons() {
    if (lang !== 'ar') return;
    document.querySelectorAll('[data-dir-icon]').forEach((icon) => {
      icon.classList.remove('bi-arrow-right', 'bi-chevron-right');
      if (icon.dataset.dirIcon === 'arrow') icon.classList.add('bi-arrow-left');
      if (icon.dataset.dirIcon === 'chevron') icon.classList.add('bi-chevron-left');
    });
  }

  function initParallax() {
    if (reduceMotion) return;
    const layers = document.querySelectorAll('[data-parallax]');
    if (!layers.length) return;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.parallax || 0.12);
        layer.style.transform = `translateY(${scrollY * depth}px)`;
      });
    }, { passive: true });
  }

  function initLottie() {
    if (!window.lottie || reduceMotion) return;
    const pawData = {
      v: '5.7.4',
      fr: 60,
      ip: 0,
      op: 180,
      w: 220,
      h: 220,
      nm: 'Petly Paw Pulse',
      ddd: 0,
      assets: [],
      layers: [
        createEllipseLayer(1, [110, 72, 0], [40, 54], [0.156, 0.737, 0.659, 1], 0),
        createEllipseLayer(2, [76, 100, 0], [32, 42], [0.965, 0.769, 0.325, 1], 15),
        createEllipseLayer(3, [144, 100, 0], [32, 42], [0.965, 0.769, 0.325, 1], 30),
        createEllipseLayer(4, [92, 136, 0], [34, 44], [0.156, 0.737, 0.659, 1], 45),
        createEllipseLayer(5, [128, 136, 0], [34, 44], [0.156, 0.737, 0.659, 1], 60),
        createEllipseLayer(6, [110, 170, 0], [82, 74], [0.091, 0.192, 0.176, 1], 0)
      ]
    };

    document.querySelectorAll('[data-lottie="petly"]').forEach((container) => {
      window.lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: pawData
      });
    });
  }

  function createEllipseLayer(ind, position, size, color, delay) {
    return {
      ddd: 0,
      ind,
      ty: 4,
      nm: `paw-${ind}`,
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0 + delay, s: [72] }, { t: 45 + delay, s: [100] }, { t: 90 + delay, s: [72] }, { t: 180, s: [72] }] },
        r: { a: 0, k: 0 },
        p: { a: 0, k: position },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0 + delay, s: [88, 88, 100] }, { t: 45 + delay, s: [102, 102, 100] }, { t: 90 + delay, s: [88, 88, 100] }, { t: 180, s: [88, 88, 100] }] }
      },
      shapes: [
        { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: size }, nm: 'ellipse' },
        { ty: 'fl', c: { a: 0, k: color }, o: { a: 0, k: 100 }, r: 1, nm: 'fill' }
      ],
      ip: 0,
      op: 180,
      st: 0,
      bm: 0
    };
  }

  function scheduleEnhancements() {
    const needsGsap = !reduceMotion && !!document.querySelector('.hero-shell, [data-reveal], .founder-spotlight, [data-count]');
    const needsLottie = !reduceMotion && !!document.querySelector('[data-lottie="petly"]');
    const needsLightbox = !!document.querySelector('.glightbox');

    if (needsGsap) {
      scheduleDeferredTask(async () => {
        try {
          await ensureGsap();
        } catch (error) {
          console.error(error);
        } finally {
          initHeroAnimations();
          initRevealAnimations();
          initFounderSpotlights();
          initCounters();
        }
      });
    } else {
      initHeroAnimations();
      initRevealAnimations();
      initFounderSpotlights();
      initCounters();
    }

    if (needsLottie) {
      scheduleDeferredTask(async () => {
        try {
          await ensureLottie();
          initLottie();
        } catch (error) {
          console.error(error);
        }
      });
    }

    if (needsLightbox) {
      scheduleDeferredTask(async () => {
        try {
          await ensureLightbox();
          initLightbox();
        } catch (error) {
          console.error(error);
        }
      });
    }
  }

  injectShell();
  initPageTransition();
  initCommonShell();
  initAccordions();
  initFilters();
  initContactForms();
  initFieldStates();
  initDirectionAwareIcons();
  initParallax();
  scheduleEnhancements();
  renderGoogleReviews();
})();
