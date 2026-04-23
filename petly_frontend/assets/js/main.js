(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const lang = body.dataset.lang || 'en';
  const page = body.dataset.page || 'home';
  const activePage = page === 'blog-post' ? 'blog' : page;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;

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

  function initSwipers() {
    if (!window.Swiper) return;
    document.querySelectorAll('.testimonials-swiper').forEach((element) => {
      const container = element.closest('.testimonials-shell');
      new window.Swiper(element, {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 700,
        loop: true,
        autoplay: reduceMotion ? false : { delay: 4500 },
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

  injectShell();
  initPageTransition();
  initCommonShell();
  initHeroAnimations();
  initRevealAnimations();
  initCounters();
  initSwipers();
  initAccordions();
  initFilters();
  initLightbox();
  initContactForms();
  initFieldStates();
  initDirectionAwareIcons();
  initParallax();
  initLottie();
})();
