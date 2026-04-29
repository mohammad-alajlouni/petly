(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const body = document.body;
  const lang = body.dataset.lang || 'en';
  const page = body.dataset.page || 'home';
  const activePage = page === 'blog-post' ? 'blog' : page;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const pathPrefix = lang === 'ar' ? '../' : '';
  document.documentElement.dir = dir;

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function getAlternateLangHref() {
    if (page === 'doctor') {
      const currentId = getQueryParam('id');
      const query = currentId ? `?id=${encodeURIComponent(currentId)}` : '';
      return lang === 'ar' ? `../doctor.html${query}` : `ar/doctor.html${query}`;
    }
    return lang === 'ar' ? `../${page === 'home' ? 'index' : page}.html` : `ar/${page === 'home' ? 'index' : page}.html`;
  }

  const alternateLangHref = getAlternateLangHref();

  const shellContent = {
    en: {
      brandName: 'Petly Veterinary Clinic',
      brandTag: 'Modern care with a softer heartbeat',
      nav: [
        ['home', 'Home', 'index.html'],
        ['about', 'About', 'about.html'],
        ['shelter', 'Shelter', 'shelter.html'],
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
        ['Shelter', 'shelter.html'],
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
        ['shelter', 'الملجأ', 'shelter.html'],
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
        ['الملجأ', 'shelter.html'],
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

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function resolveAssetPath(value) {
    if (!value) return '';
    if (/^(https?:)?\/\//.test(value)) return value;
    return `${pathPrefix}${value}`;
  }

  function initialsFromName(name) {
    const clean = String(name || '')
      .replace(/^dr\.?\s*/i, '')
      .replace(/^د\.?\s*/i, '')
      .trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (!parts.length) return 'P';
    return parts.slice(0, 2).map((part) => Array.from(part)[0]).join('').toUpperCase();
  }

  function colorFromName(name) {
    let hash = 0;
    String(name || 'petly').split('').forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    const hue = Math.abs(hash) % 360;
    return `linear-gradient(135deg, hsl(${hue} 66% 44%), hsl(${(hue + 34) % 360} 72% 56%))`;
  }

  function getAvatarMarkup(name, photo, fallbackClassName) {
    const safeName = escapeHtml(name);
    const fallbackClasses = ['avatar-fallback', fallbackClassName].filter(Boolean).join(' ');
    const fallback = `<span class="${fallbackClasses}" style="background:${colorFromName(name)}">${escapeHtml(initialsFromName(name))}</span>`;
    if (!photo) return fallback;
    return `<img src="${resolveAssetPath(photo)}" alt="${safeName}" loading="lazy">${fallback}`;
  }

  function hydrateAvatarFallbacks(scope = document) {
    scope.querySelectorAll('[data-avatar-root]').forEach((root) => {
      const image = root.querySelector('img');
      const fallback = root.querySelector('.avatar-fallback');
      if (!fallback) return;
      if (!image) {
        fallback.classList.add('is-visible');
        return;
      }
      const showFallback = () => {
        image.style.display = 'none';
        fallback.classList.add('is-visible');
      };
      image.addEventListener('error', showFallback, { once: true });
      if (image.complete && image.naturalWidth === 0) showFallback();
    });
  }

  function fetchJson(url) {
    return fetch(url, { cache: 'no-store' }).then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.json();
    });
  }

  function getTeamDataUrl() {
    return `${pathPrefix}assets/data/team.json`;
  }

  function getReviewsDataUrl() {
    return `${pathPrefix}assets/data/reviews.json`;
  }

  function getShelterDataUrl() {
    return `${pathPrefix}assets/data/shelter.json`;
  }

  function getTeamPageHref() {
    return 'team.html';
  }

  function getDoctorPageHref(id) {
    return `doctor.html?id=${encodeURIComponent(id)}`;
  }

  function getLocalizedValue(entry, field) {
    return entry?.[`${field}_${lang}`] ?? '';
  }

  function getReviewAuthor(review) {
    return review.author || getLocalizedValue(review, 'author') || '';
  }

  function getReviewAvatar(review) {
    return review.avatar || review.photo || null;
  }

  function getReviewText(review) {
    return getLocalizedValue(review, 'text') || review.text || '';
  }

  function formatParagraphs(text) {
    return String(text || '')
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
      .join('');
  }

  function extractQuote(text) {
    if (!text) return '';
    const quoted = text.match(/["“](.+?)["”]/);
    if (quoted?.[1]) return quoted[1].trim();
    const sentences = text.split(/(?<=[.!?])\s+/).map((item) => item.trim()).filter(Boolean);
    if (!sentences.length) return '';
    return sentences.sort((a, b) => b.length - a.length)[0];
  }

  function getFirstName(name) {
    const stripped = String(name || '')
      .replace(/^dr\.?\s*/i, '')
      .replace(/^د\.?\s*/i, '')
      .trim();
    return stripped.split(/\s+/)[0] || '';
  }

  function updateAlternateLinks(id) {
    const query = id ? `?id=${encodeURIComponent(id)}` : '';
    document.querySelector('link[hreflang="en"]')?.setAttribute('href', `${lang === 'ar' ? '../' : ''}doctor.html${query}`.replace('..//', '../'));
    document.querySelector('link[hreflang="ar"]')?.setAttribute('href', `${lang === 'ar' ? '' : 'ar/'}doctor.html${query}`);
  }

  function updateDoctorMeta(member) {
    const name = getLocalizedValue(member, 'name');
    const shortBio = getLocalizedValue(member, 'short_bio');
    const clinicName = lang === 'ar' ? 'عيادة بيتلي البيطرية' : 'Petly Veterinary Clinic';
    document.title = `${name} — ${clinicName}`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', shortBio || (lang === 'ar' ? 'تعرّف على أحد أعضاء فريق بيتلي.' : 'Meet a Petly team member.'));
    updateAlternateLinks(member.id);
  }

  function renderStars(count = 5) {
    return Array.from({ length: count }).map(() => '<i class="bi bi-star-fill"></i>').join('');
  }

  function getGoogleMapsReviewsUrl() {
    return 'https://www.google.com/maps/place/PETLY+Veterinary+Hospital/@32.0508877,35.8839519,17.73z/data=!4m8!3m7!1s0x151c9ffebb2ce2b1:0x4891153ea7e06faa!8m2!3d32.0510737!4d35.8827585!9m1!1b1!16s%2Fg%2F11hyhwzc6b';
  }

  function formatReviewDate(dateString) {
    try {
      const locale = document.documentElement.lang === 'ar' ? 'ar-JO' : 'en-US';
      return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long' }).format(new Date(dateString));
    } catch (error) {
      void error;
      return dateString;
    }
  }

  function getAvatarTone(seed) {
    const firstChar = String(seed || 'P').trim().charAt(0).toUpperCase() || 'P';
    const hue = (firstChar.charCodeAt(0) * 17) % 360;
    return `linear-gradient(135deg, hsl(${hue} 68% 48%), hsl(${(hue + 40) % 360} 72% 58%))`;
  }

  function getGoogleLogoSvg() {
    return `
      <svg class="google-g-logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.47a5.53 5.53 0 0 1-2.4 3.63v3.01h3.88c2.27-2.09 3.54-5.17 3.54-8.67Z"/>
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.88-3.01c-1.08.73-2.45 1.16-4.05 1.16-3.11 0-5.75-2.1-6.69-4.92H1.3v3.09A11.99 11.99 0 0 0 12 24Z"/>
        <path fill="#FBBC05" d="M5.31 14.33A7.2 7.2 0 0 1 4.94 12c0-.81.14-1.6.37-2.33V6.58H1.3A11.99 11.99 0 0 0 0 12c0 1.94.46 3.78 1.3 5.42l4.01-3.09Z"/>
        <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.82l3.44-3.44C17.94 1.17 15.23 0 12 0A11.99 11.99 0 0 0 1.3 6.58l4.01 3.09c.94-2.82 3.58-4.9 6.69-4.9Z"/>
      </svg>
    `;
  }

  function buildTeamCard(member) {
    const name = getLocalizedValue(member, 'name');
    const role = getLocalizedValue(member, 'role');
    const shortBio = getLocalizedValue(member, 'short_bio');
    const indicator = lang === 'ar' ? 'عرض الملف' : 'View profile';
    const isFounder = Boolean(
      member.featured_founder
      || member.data_role === 'founder'
      || member.id === 'jawad-al-ajlouni'
      || /Founder\s*&\s*CEO/i.test(member.role_en || '')
    );
    return `
      <a class="team-grid-link ${isFounder ? 'is-founder-link' : ''}" href="${getDoctorPageHref(member.id)}" aria-label="${escapeHtml(`${indicator}: ${name}`)}" data-reveal="scale" ${isFounder ? 'data-role="founder"' : ''}>
        <article class="card-petly team-detail-card ${isFounder ? 'is-founder-card' : ''}" ${isFounder ? 'data-role="founder"' : ''}>
          <div class="team-photo" data-avatar-root>
            ${getAvatarMarkup(name, member.photo, 'team-fallback')}
            ${isFounder ? `<span class="team-spotlight-badge">${escapeHtml(role)}</span>` : ''}
          </div>
          <div class="team-meta">
            <span class="tag-petly">${escapeHtml(role)}</span>
            <h4 class="mt-3">${escapeHtml(name)}</h4>
            <p class="mt-3">${escapeHtml(shortBio)}</p>
            <span class="team-link-indicator">${escapeHtml(indicator)} <i class="bi bi-arrow-${lang === 'ar' ? 'left' : 'right'}"></i></span>
          </div>
        </article>
      </a>
    `;
  }

  function renderStateCard(title, copy, buttonLabel) {
    return `
      <div class="petly-container">
        <div class="doctor-empty card-petly">
          <div>
            <p class="eyebrow justify-content-center">${lang === 'ar' ? 'الفريق' : 'Team'}</p>
            <h2>${escapeHtml(title)}</h2>
            <p class="lead-copy mt-3">${escapeHtml(copy)}</p>
            <a class="btn-primary-petly mt-4" href="${getTeamPageHref()}">${escapeHtml(buttonLabel)}</a>
          </div>
        </div>
      </div>
    `;
  }

  function getRelatedMembers(allMembers, currentId) {
    const members = allMembers
      .filter((member) => member.id !== currentId && !member.featured_founder)
      .slice();
    for (let i = members.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [members[i], members[j]] = [members[j], members[i]];
    }
    return members.slice(0, 3);
  }

  function buildRelatedCard(member) {
    const name = getLocalizedValue(member, 'name');
    const role = getLocalizedValue(member, 'role');
    const shortBio = getLocalizedValue(member, 'short_bio');
    return `
      <a class="card-petly mini-team-card" href="${getDoctorPageHref(member.id)}" data-reveal="scale">
        <div class="mini-team-photo" data-avatar-root>
          ${getAvatarMarkup(name, member.photo, 'mini-team-fallback')}
        </div>
        <div class="team-meta">
          <span class="tag-petly">${escapeHtml(role)}</span>
          <h4 class="mt-3">${escapeHtml(name)}</h4>
          <p>${escapeHtml(shortBio)}</p>
        </div>
      </a>
    `;
  }

  function buildReviewSlides(reviews) {
    return reviews.map((review) => `
      <div class="swiper-slide">
        <article class="testimonial-card">
          <div class="testimonial-media" data-avatar-root>
            ${getAvatarMarkup(getReviewAuthor(review), getReviewAvatar(review), '')}
          </div>
          <div>
            <div class="testimonial-rating">
              ${renderStars(review.rating || 5)}
            </div>
            <p>${escapeHtml(getReviewText(review))}</p>
            <div class="testimonial-meta mt-4">
              <strong>${escapeHtml(getReviewAuthor(review))}</strong>
              <span>${escapeHtml(review.source || getLocalizedValue(review, 'context') || '')}</span>
            </div>
          </div>
        </article>
      </div>
    `).join('');
  }

  function buildReviewsSection(member, reviews) {
    if (!reviews.length) return '';
    const name = getLocalizedValue(member, 'name');
    const heading = lang === 'ar'
      ? `ماذا يقول أصحاب الحيوانات الأليفة عن ${name}؟`
      : `What pet owners say about ${name}`;
    return `
      <section class="section-padding-sm">
        <div class="petly-container">
          <div class="testimonials-shell" data-reveal="scale">
            <div class="section-heading mb-4">
              <p class="eyebrow">${lang === 'ar' ? 'آراء العائلات' : 'Family Reviews'}</p>
              <h2 class="text-white">${escapeHtml(heading)}</h2>
            </div>
            <div class="swiper testimonials-swiper">
              <div class="swiper-wrapper">
                ${buildReviewSlides(reviews)}
              </div>
            </div>
            ${reviews.length > 1 ? `
              <div class="swiper-controls">
                <div class="swiper-nav">
                  <button class="swiper-button-petly swiper-prev" type="button" aria-label="${lang === 'ar' ? 'التقييم السابق' : 'Previous testimonial'}"><i class="bi bi-arrow-${lang === 'ar' ? 'right' : 'left'}"></i></button>
                  <button class="swiper-button-petly swiper-next" type="button" aria-label="${lang === 'ar' ? 'التقييم التالي' : 'Next testimonial'}"><i class="bi bi-arrow-${lang === 'ar' ? 'left' : 'right'}"></i></button>
                </div>
                <div class="swiper-pagination-petly"></div>
              </div>
            ` : ''}
          </div>
        </div>
      </section>
    `;
  }

  function getShelterStatusMeta(status) {
    const statusMap = {
      'in-care': {
        label: lang === 'ar' ? 'تحت الرعاية' : 'In Care',
        className: 'is-in-care'
      },
      adopted: {
        label: lang === 'ar' ? 'تم تبنيه' : 'Adopted',
        className: 'is-adopted'
      },
      sanctuary: {
        label: lang === 'ar' ? 'إقامة دائمة' : 'Sanctuary',
        className: 'is-sanctuary'
      }
    };
    return statusMap[status] || statusMap['in-care'];
  }

  function buildRescueCard(entry) {
    const id = entry.id || `rescue-${Math.random().toString(36).slice(2, 8)}`;
    const name = getLocalizedValue(entry, 'name') || (lang === 'ar' ? 'أحد كلاب الملجأ' : 'Shelter Rescue');
    const story = getLocalizedValue(entry, 'story') || '';
    const condition = getLocalizedValue(entry, 'condition') || (lang === 'ar' ? 'احتياجات خاصة' : 'Special needs');
    const status = getShelterStatusMeta(entry.status);
    const moreLabel = lang === 'ar' ? 'اقرأ القصة كاملة' : 'Read full story';
    const lessLabel = lang === 'ar' ? 'إخفاء القصة' : 'Show less';
    const photoAlt = lang === 'ar'
      ? `${name}، أحد كلاب ملجأ الإيمان`
      : `${name}, a rescue dog at Al-Eman Shelter`;
    return `
      <article class="card-petly rescue-card" id="${escapeHtml(id)}" data-reveal="scale">
        <div class="rescue-media" data-rescue-media-root>
          <img src="${resolveAssetPath(entry.photo)}" alt="${escapeHtml(photoAlt)}" loading="lazy">
          <div class="rescue-media-placeholder" aria-hidden="true">
            <span>${escapeHtml(name)}</span>
          </div>
        </div>
        <div class="rescue-card-body">
          <div class="rescue-card-topline">
            <span class="rescue-status ${status.className}">${escapeHtml(status.label)}</span>
            <span class="rescue-condition">${escapeHtml(condition)}</span>
          </div>
          <h3>${escapeHtml(name)}</h3>
          <p class="rescue-story is-collapsed" data-rescue-story id="${escapeHtml(`${id}-story`)}">${escapeHtml(story)}</p>
          <button
            class="btn-link-petly rescue-story-link"
            type="button"
            data-story-toggle
            data-more-label="${escapeHtml(moreLabel)}"
            data-less-label="${escapeHtml(lessLabel)}"
            aria-expanded="false"
            aria-controls="${escapeHtml(`${id}-story`)}"
          >
            ${escapeHtml(moreLabel)} <i class="bi bi-arrow-${lang === 'ar' ? 'left' : 'right'}" data-dir-icon="arrow"></i>
          </button>
        </div>
      </article>
    `;
  }

  function hydrateRescueMediaFallbacks(scope = document) {
    scope.querySelectorAll('[data-rescue-media-root]').forEach((root) => {
      const image = root.querySelector('img');
      if (!image) {
        root.classList.add('is-fallback');
        return;
      }
      const showFallback = () => {
        root.classList.add('is-fallback');
        image.style.display = 'none';
      };
      image.addEventListener('error', showFallback, { once: true });
      const probe = new Image();
      probe.addEventListener('error', showFallback, { once: true });
      probe.src = image.currentSrc || image.src;
      if (image.complete && image.naturalWidth === 0) showFallback();
    });
  }

  function initShelterStoryToggles(scope = document) {
    scope.querySelectorAll('[data-story-toggle]').forEach((button) => {
      if (button.dataset.toggleReady === 'true') return;
      button.dataset.toggleReady = 'true';
      button.addEventListener('click', () => {
        const card = button.closest('.rescue-card');
        const story = card?.querySelector('[data-rescue-story]');
        if (!story) return;
        const isCollapsed = story.classList.toggle('is-collapsed');
        button.setAttribute('aria-expanded', String(!isCollapsed));
        button.innerHTML = `${isCollapsed ? button.dataset.moreLabel : button.dataset.lessLabel} <i class="bi bi-arrow-${lang === 'ar' ? 'left' : 'right'}" data-dir-icon="arrow"></i>`;
        initDirectionAwareIcons();
      });
    });
  }

  function initShelterRescues() {
    const grid = document.querySelector('[data-shelter-rescues]');
    if (!grid) return;
    fetchJson(getShelterDataUrl())
      .then((rescues) => {
        grid.innerHTML = rescues.map(buildRescueCard).join('');
        hydrateRescueMediaFallbacks(grid);
        initShelterStoryToggles(grid);
        initRevealAnimations();
      })
      .catch(() => {
        grid.innerHTML = `<p class="team-loading card-petly">${escapeHtml(lang === 'ar' ? 'تعذر تحميل قصص الإنقاذ حالياً.' : 'We could not load the rescue stories right now.')}</p>`;
      });
  }

  function buildBioSection(member) {
    const longBio = getLocalizedValue(member, 'long_bio');
    const highlights = getLocalizedValue(member, 'highlights') || [];
    const hasBio = Boolean(longBio && String(longBio).trim());
    const hasHighlights = Array.isArray(highlights) && highlights.length;
    if (!hasBio && !hasHighlights) return '';
    const quote = extractQuote(longBio);
    return `
      <section class="section-padding-sm">
        <div class="petly-container">
          <div class="doctor-content-grid">
            <div class="doctor-prose" data-reveal="${lang === 'ar' ? 'right' : 'left'}">
              <div class="section-heading mb-4">
                <p class="eyebrow">${lang === 'ar' ? 'نبذة' : 'Biography'}</p>
                <h2>${lang === 'ar' ? 'عن هذا العضو من فريق بيتلي' : 'A closer look at this Petly team member'}</h2>
              </div>
              ${hasBio ? formatParagraphs(longBio) : ''}
              ${quote ? `<blockquote class="pull-quote">${escapeHtml(quote)}</blockquote>` : ''}
            </div>
            <div class="doctor-side-stack" data-reveal="${lang === 'ar' ? 'left' : 'right'}">
              ${hasHighlights ? `
                <div class="card-petly">
                  <p class="eyebrow">${lang === 'ar' ? 'أبرز ما يميّزه' : 'Highlights'}</p>
                  <div class="doctor-highlights">
                    ${highlights.map((item) => `
                      <div class="doctor-highlight">
                        <i class="bi bi-check2"></i>
                        <p>${escapeHtml(item)}</p>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function buildDoctorDetail(member, allMembers, reviews) {
    const name = getLocalizedValue(member, 'name');
    const role = getLocalizedValue(member, 'role');
    const shortBio = getLocalizedValue(member, 'short_bio');
    const specialties = getLocalizedValue(member, 'specialties') || [];
    const relatedMembers = getRelatedMembers(allMembers, member.id);
    const facts = [];
    if (member.years_experience) {
      facts.push(`
        <span class="doctor-stat">
          <strong>${escapeHtml(String(member.years_experience))}+</strong>
          ${lang === 'ar' ? 'سنوات خبرة' : 'Years of experience'}
        </span>
      `);
    }

    return `
      <div class="doctor-shell" data-doctor-id="${escapeHtml(member.id)}">
        <section class="doctor-hero">
          <div class="petly-container">
            <div class="doctor-hero-grid">
              <div class="doctor-media-shell" data-reveal="${lang === 'ar' ? 'right' : 'left'}">
                <div class="doctor-media-orbit"></div>
                <div class="doctor-portrait-frame" data-avatar-root>
                  ${getAvatarMarkup(name, member.photo, 'portrait-fallback')}
                  <div class="doctor-media-chip">
                    <strong>${lang === 'ar' ? 'فريق بيتلي' : 'Petly Team'}</strong>
                    <span>${escapeHtml(role)}</span>
                  </div>
                </div>
              </div>
              <div class="card-petly doctor-copy-card" data-reveal="${lang === 'ar' ? 'left' : 'right'}">
                <p class="eyebrow">${escapeHtml(role)}</p>
                <h1>${escapeHtml(name)}</h1>
                <p class="doctor-intro">${escapeHtml(shortBio)}</p>
                ${specialties.length ? `
                  <div class="detail-pills">
                    ${specialties.map((item) => `<span class="pill-chip">${escapeHtml(item)}</span>`).join('')}
                  </div>
                ` : ''}
                ${facts.length ? `<div class="doctor-stat-row">${facts.join('')}</div>` : ''}
                <div class="doctor-actions share-row">
                  <a class="btn-secondary-petly" href="${getTeamPageHref()}"><i class="bi bi-arrow-${lang === 'ar' ? 'right' : 'left'}"></i> ${lang === 'ar' ? 'العودة إلى الفريق' : 'Back to team'}</a>
                  <button class="btn-primary-petly" type="button" data-share-profile><i class="bi bi-share"></i> ${lang === 'ar' ? 'مشاركة الصفحة' : 'Share profile'}</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        ${buildBioSection(member)}
        ${buildReviewsSection(member, reviews)}

        ${relatedMembers.length ? `
          <section class="section-padding-sm">
            <div class="petly-container">
              <div class="section-heading" data-reveal="${lang === 'ar' ? 'right' : 'left'}">
                <p class="eyebrow">${lang === 'ar' ? 'المزيد من الفريق' : 'Other Team Members'}</p>
                <h2>${lang === 'ar' ? 'تعرّف على بقية الفريق' : 'Meet the Rest of Our Team'}</h2>
              </div>
              <div class="related-team-grid">
                ${relatedMembers.map(buildRelatedCard).join('')}
              </div>
            </div>
          </section>
        ` : ''}

        <section class="section-padding-sm doctor-cta">
          <div class="petly-container">
            <div class="cta-band" data-reveal="scale">
              <div class="cta-content">
                <p class="eyebrow">${lang === 'ar' ? 'تواصل معنا' : 'Talk to Petly'}</p>
                <h2>${escapeHtml(lang === 'ar' ? `هل لديك سؤال لـ ${name}؟` : `Have a question for ${name}?`)}</h2>
                <p class="lead-copy mt-4">${escapeHtml(lang === 'ar' ? 'فريق بيتلي جاهز لمساعدتك في الخطوة التالية والإجابة عن أسئلتك بهدوء ووضوح.' : 'The Petly team can help you with the next step and make sure your questions are answered with clarity and care.')}</p>
                <a class="btn-primary-petly mt-4" href="contact.html">${lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  function buildGoogleReviewCard(review) {
    const author = getReviewAuthor(review);
    const text = getReviewText(review);
    const isLong = text.length > 280;
    const verifiedLabel = lang === 'ar' ? 'تقييم موثّق من Google' : 'Verified Google Review';
    const readMoreLabel = lang === 'ar' ? 'اقرأ المزيد' : 'Read more';
    const readLessLabel = lang === 'ar' ? 'إظهار أقل' : 'Read less';
    return `
      <div class="swiper-slide">
        <article class="google-review-card card-petly">
          <div class="google-review-inner">
            <div class="google-review-head">
              <div class="google-review-author">
                <span class="google-review-avatar" style="background:${getAvatarTone(author)}">${escapeHtml(initialsFromName(author).slice(0, 1))}</span>
                <div>
                  <strong>${escapeHtml(author)}</strong>
                  <span class="google-review-date">${escapeHtml(formatReviewDate(review.date))}</span>
                </div>
              </div>
              <div class="testimonial-rating">
                ${renderStars(review.rating || 5)}
              </div>
            </div>
            <div>
              <p class="google-review-copy ${isLong ? 'is-collapsed' : ''}" data-review-copy>${escapeHtml(text)}</p>
              ${isLong ? `<button class="google-review-toggle" type="button" data-review-toggle data-more-label="${escapeHtml(readMoreLabel)}" data-less-label="${escapeHtml(readLessLabel)}">${escapeHtml(readMoreLabel)} <i class="bi bi-plus-circle"></i></button>` : ''}
            </div>
            <div class="google-review-source">
              <span class="google-review-verified"><i class="bi bi-patch-check-fill"></i> ${getGoogleLogoSvg()} ${escapeHtml(verifiedLabel)}</span>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  function buildGoogleReviewsSection(reviews) {
    const eyebrow = lang === 'ar' ? 'تقييمات موثّقة من Google' : 'Verified Google Reviews';
    const heading = lang === 'ar' ? 'موثوقون من قبل أصحاب الحيوانات الأليفة في عمّان' : 'Trusted by Pet Owners Across Amman';
    const aggregate = lang === 'ar' ? `بناءً على ${reviews.length} تقييمات معروضة` : `Based on ${reviews.length} reviews shown here`;
    const buttonLabel = lang === 'ar' ? 'اقرأ جميع التقييمات على Google' : 'Read all reviews on Google';
    return `
      <div class="testimonials-shell google-reviews-shell" data-reveal="scale">
        <div class="section-heading mb-4">
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h2 class="text-white">${escapeHtml(heading)}</h2>
        </div>
        <div class="swiper testimonials-swiper" data-google-reviews-swiper>
          <div class="swiper-wrapper">
            ${reviews.map(buildGoogleReviewCard).join('')}
          </div>
        </div>
        <div class="swiper-controls">
          <div class="swiper-nav">
            <button class="swiper-button-petly swiper-prev" type="button" aria-label="${lang === 'ar' ? 'السابق' : 'Previous review'}"><i class="bi bi-arrow-${lang === 'ar' ? 'right' : 'left'}"></i></button>
            <button class="swiper-button-petly swiper-next" type="button" aria-label="${lang === 'ar' ? 'التالي' : 'Next review'}"><i class="bi bi-arrow-${lang === 'ar' ? 'left' : 'right'}"></i></button>
          </div>
          <div class="swiper-pagination-petly"></div>
        </div>
        <div class="google-reviews-meta">
          <div class="google-score">
            <strong>5.0 / 5</strong>
            <span>${escapeHtml(aggregate)}</span>
          </div>
          <a class="btn-secondary-petly" href="${getGoogleMapsReviewsUrl()}" target="_blank" rel="noreferrer noopener">${escapeHtml(buttonLabel)}</a>
        </div>
      </div>
    `;
  }

  function injectShell() {
    const headerTarget = document.querySelector('[data-site-header]');
    const footerTarget = document.querySelector('[data-site-footer]');
    if (!headerTarget || !footerTarget) return;

    const navLinks = shell.nav.map(([key, label, href]) => {
      const finalHref = lang === 'ar' ? href : href;
      const specialClass = key === 'shelter' ? 'nav-special-link' : '';
      const activeClass = activePage === key ? 'active' : '';
      const classes = [activeClass, specialClass].filter(Boolean).join(' ');
      const labelMarkup = key === 'shelter'
        ? `<span class="nav-heart" aria-hidden="true"><i class="bi bi-heart-fill"></i></span><span>${label}</span>`
        : label;
      return `<a href="${finalHref}" class="${classes}">${labelMarkup}</a>`;
    }).join('');

    const footerQuickLinks = shell.quickLinks.map(([label, href]) => {
      const specialClass = href === 'shelter.html' ? 'nav-special-link' : '';
      const labelMarkup = href === 'shelter.html'
        ? `<span class="nav-heart" aria-hidden="true"><i class="bi bi-heart-fill"></i></span><span>${label}</span>`
        : label;
      return `<a href="${href}" class="${specialClass}">${labelMarkup}</a>`;
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
              <a class="lang-switcher" href="${alternateLangHref}" aria-label="${lang === 'ar' ? 'Switch to English' : 'Switch to Arabic'}">${shell.langLabel}</a>
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
              <a class="btn-secondary-petly" href="${alternateLangHref}">${shell.langLabel}</a>
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
                ${footerQuickLinks}
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
    const syncToggleState = () => {
      const open = overlay?.classList.contains('is-open') || false;
      toggle?.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    const closeMenu = () => {
      overlay?.classList.remove('is-open');
      syncToggleState();
    };
    if (toggle && !toggle.hasAttribute('aria-expanded')) toggle.setAttribute('aria-expanded', 'false');

    toggle?.addEventListener('click', () => {
      overlay?.classList.toggle('is-open');
      syncToggleState();
    });

    overlay?.addEventListener('click', (event) => {
      if (event.target === overlay) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && overlay?.classList.contains('is-open')) closeMenu();
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
        item.dataset.revealReady = 'true';
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
      return;
    }

    // Safety net: if a reveal item is still hidden 1.2s after init (e.g. ScrollTrigger
    // fails silently, or item is below the fold and never scrolled into view in a
    // headless context), force it visible so content is never permanently invisible.
    setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not([data-reveal-shown])').forEach((item) => {
        const cs = window.getComputedStyle(item);
        if (parseFloat(cs.opacity) < 0.1) {
          item.style.opacity = '1';
          item.style.transform = 'none';
        }
      });
    }, 1200);

    window.gsap.registerPlugin(window.ScrollTrigger);
    revealItems.forEach((item) => {
      if (item.dataset.revealReady === 'true') return;
      item.dataset.revealReady = 'true';
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
        onStart: () => { item.dataset.revealShown = 'true'; },
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
      if (element.dataset.swiperReady === 'true') return;
      const container = element.closest('.testimonials-shell');
      const isGoogleReviews = element.hasAttribute('data-google-reviews-swiper');
      new window.Swiper(element, {
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 700,
        loop: element.querySelectorAll('.swiper-slide').length > 1,
        autoplay: reduceMotion ? false : { delay: 4500 },
        breakpoints: isGoogleReviews ? {
          768: { slidesPerView: 2, spaceBetween: 18 },
          1024: { slidesPerView: 3, spaceBetween: 20 }
        } : undefined,
        navigation: {
          nextEl: container.querySelector('.swiper-next'),
          prevEl: container.querySelector('.swiper-prev')
        },
        pagination: {
          el: container.querySelector('.swiper-pagination-petly'),
          clickable: true
        }
      });
      element.dataset.swiperReady = 'true';
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
    document.querySelectorAll('.field-petly input, .field-petly textarea, .field-petly select').forEach((field) => {
      const wrapper = field.closest('.field-petly');
      const sync = () => wrapper?.classList.toggle('is-filled', String(field.value || '').trim().length > 0);
      field.addEventListener('input', sync);
      field.addEventListener('change', sync);
      // Chrome fires animationstart for autofill via the :-webkit-autofill rule below
      field.addEventListener('animationstart', (event) => {
        if (event.animationName === 'petly-autofill') sync();
      });
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

  function initTeamGrid() {
    const grid = document.querySelector('[data-team-grid]');
    if (!grid) return;
    fetchJson(getTeamDataUrl())
      .then((members) => {
        const founder = members.find((member) => member.featured_founder);
        const others = members.filter((member) => !member.featured_founder);
        const visibleMembers = founder ? [founder, ...others] : others;
        grid.innerHTML = visibleMembers.map(buildTeamCard).join('');
        hydrateAvatarFallbacks(grid);
        initAccessibleCardLinks(grid);
        initRevealAnimations();
      })
      .catch(() => {
        grid.innerHTML = `<p class="team-loading card-petly">${escapeHtml(lang === 'ar' ? 'تعذر تحميل الفريق حالياً.' : 'We could not load the team right now.')}</p>`;
      });
  }

  function initReviewToggles(scope = document) {
    scope.querySelectorAll('[data-review-toggle]').forEach((button) => {
      if (button.dataset.toggleReady === 'true') return;
      button.dataset.toggleReady = 'true';
      button.addEventListener('click', () => {
        const card = button.closest('.google-review-card');
        const copy = card?.querySelector('[data-review-copy]');
        if (!copy) return;
        const collapsed = copy.classList.toggle('is-collapsed');
        button.innerHTML = `${collapsed ? button.dataset.moreLabel : button.dataset.lessLabel} <i class="bi bi-${collapsed ? 'plus' : 'dash'}-circle"></i>`;
      });
    });
  }

  function initGoogleReviews() {
    const root = document.querySelector('[data-google-reviews-root]');
    if (!root) return;
    fetchJson(getReviewsDataUrl())
      .then((reviews) => {
        root.innerHTML = buildGoogleReviewsSection(reviews);
        initReviewToggles(root);
        initRevealAnimations();
        initSwipers();
      })
      .catch(() => {
        root.innerHTML = `
          <div class="testimonials-shell google-reviews-shell" data-reveal="scale">
            <div class="doctor-empty">
              <p>${escapeHtml(lang === 'ar' ? 'تعذر تحميل التقييمات حالياً.' : 'We could not load the reviews right now.')}</p>
            </div>
          </div>
        `;
        initRevealAnimations();
      });
  }

  function initAccessibleCardLinks(scope = document) {
    scope.querySelectorAll('.team-grid-link, .team-card-link').forEach((link) => {
      if (link.dataset.keyboardReady === 'true') return;
      link.dataset.keyboardReady = 'true';
      link.addEventListener('keydown', (event) => {
        if (event.key === ' ') {
          event.preventDefault();
          link.click();
        }
      });
    });
  }

  function initDoctorShare(root, member) {
    const shareButton = root.querySelector('[data-share-profile]');
    if (!shareButton) return;
    shareButton.addEventListener('click', async () => {
      const name = getLocalizedValue(member, 'name');
      try {
        if (navigator.share) {
          await navigator.share({ title: document.title, text: name, url: window.location.href });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          shareButton.innerHTML = `<i class="bi bi-check2"></i> ${lang === 'ar' ? 'تم نسخ الرابط' : 'Link copied'}`;
          setTimeout(() => {
            shareButton.innerHTML = `<i class="bi bi-share"></i> ${lang === 'ar' ? 'مشاركة الصفحة' : 'Share profile'}`;
          }, 1800);
        }
      } catch (error) {
        void error;
      }
    });
  }

  function initDoctorDetail() {
    const root = document.querySelector('[data-doctor-detail-root]');
    if (!root) return;

    const id = getQueryParam('id');
    if (!id) {
      root.innerHTML = renderStateCard(
        lang === 'ar' ? 'لم نتمكن من العثور على هذا العضو.' : 'We could not find that team member.',
        lang === 'ar' ? 'جرّب العودة إلى صفحة الفريق واختيار الملف المطلوب من هناك.' : 'Try heading back to the team page and opening the profile from there.',
        lang === 'ar' ? 'العودة إلى الفريق' : 'Back to Team'
      );
      return;
    }

    Promise.all([fetchJson(getTeamDataUrl()), fetchJson(getReviewsDataUrl())])
      .then(([members, reviews]) => {
        const member = members.find((item) => item.id === id || item.slug === id);
        if (!member) {
          root.innerHTML = renderStateCard(
            lang === 'ar' ? 'لم نتمكن من العثور على هذا العضو.' : 'We could not find that team member.',
            lang === 'ar' ? 'قد يكون الرابط غير صحيح أو لم يعد هذا الملف متاحاً.' : 'The link may be incorrect or this profile may no longer be available.',
            lang === 'ar' ? 'العودة إلى الفريق' : 'Back to Team'
          );
          return;
        }

        updateDoctorMeta(member);
        const firstName = getFirstName(getLocalizedValue(member, 'name'));
        const matchedReviews = firstName
          ? reviews.filter((review) => String(review.text_en || review.text || '').toLowerCase().includes(firstName.toLowerCase()))
          : [];

        root.innerHTML = buildDoctorDetail(member, members, matchedReviews);
        hydrateAvatarFallbacks(root);
        initDoctorShare(root, member);
        initRevealAnimations();
        initSwipers();
      })
      .catch(() => {
        root.innerHTML = renderStateCard(
          lang === 'ar' ? 'تعذر تحميل هذا الملف الآن.' : 'We could not load this profile right now.',
          lang === 'ar' ? 'حاول مرة أخرى بعد قليل أو ارجع إلى صفحة الفريق.' : 'Please try again in a moment or head back to the team page.',
          lang === 'ar' ? 'العودة إلى الفريق' : 'Back to Team'
        );
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
  initTeamGrid();
  initDoctorDetail();
  initGoogleReviews();
  initShelterRescues();
  initAccessibleCardLinks();
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
