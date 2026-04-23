# Petly Frontend

Premium static frontend redesign for Petly Veterinary Clinic.

## Project Overview

`petly_frontend/` is a clean, fully static, bilingual website built independently from the legacy PHP project. It keeps Petly's recognizable mint-teal brand identity and logo, then reinterprets the clinic as a calmer, more editorial, more premium digital experience.

This version includes:

- English and Arabic page pairs
- Full RTL structure for Arabic
- Shared glassmorphism header and rich footer across every page
- Scroll-based animation, counters, filters, lightbox, carousel, and visual-only form interactions
- No backend, no admin panel, no booking engine, no store, no database

## Folder Structure

```text
petly_frontend/
├── index.html
├── about.html
├── services.html
├── team.html
├── blog.html
├── blog-post.html
├── contact.html
├── gallery.html
├── ar/
│   ├── index.html
│   ├── about.html
│   ├── services.html
│   ├── team.html
│   ├── blog.html
│   ├── blog-post.html
│   ├── contact.html
│   └── gallery.html
├── assets/
│   ├── css/
│   │   └── custom.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── gallery/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── team/
│   │   └── testimonials/
│   └── fonts/
└── README.md
```

## How to Preview Locally

Because the project is pure static HTML, the quickest preview is simply opening:

- `petly_frontend/index.html`
- `petly_frontend/ar/index.html`

If you prefer a local static server:

```bash
cd petly_frontend
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

## Design Tokens

### Color System

| Token | Value | Use |
|---|---:|---|
| `--color-primary` | `#28BCA8` | Main Petly mint |
| `--color-secondary` | `#08A7AB` | Strong clinic teal |
| `--color-accent` | `#F6C453` | Warm premium highlight |
| `--color-accent-soft` | `#FFF3EF` | Warm soft background accent |
| `--color-ink` | `#444444` | Body text |
| `--color-deep` | `#17312D` | Headings / deep contrast |
| `--color-surface-alt` | `#F7FBFF` | Light section wash |
| `--color-surface-muted` | `#ECEFF8` | Soft neutral background |

### Typography

| Role | Font |
|---|---|
| English display | `Fraunces` |
| English body | `Inter` |
| Arabic display | `Readex Pro` |
| Arabic body | `Tajawal` |

### Spacing + Shape

- Spacing tokens: `--space-1` through `--space-11`
- Radius tokens: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`
- Shadow tokens: `--shadow-soft`, `--shadow-glow`, `--shadow-strong`
- Motion tokens: `--transition-base`, `--transition-slow`

### Reusable Component Classes

- `.btn-primary-petly`
- `.btn-secondary-petly`
- `.btn-link-petly`
- `.card-petly`
- `.section-padding`
- `.section-heading`
- `.eyebrow`
- `.glass-panel`
- `.faq-item`
- `.team-card`
- `.article-card`
- `.cta-band`

## Libraries Used

| Library | Source | Why it is used |
|---|---|---|
| Tailwind CSS CDN | CDN | Utility support for layout accents and quick responsive helpers |
| Bootstrap 5 | CDN | Grid, spacing rhythm, and responsive foundation |
| Bootstrap Icons | CDN | Consistent iconography |
| GSAP + ScrollTrigger | CDN | Entrance motion, reveal animations, counters, and scroll polish |
| Swiper | CDN | Testimonial carousel |
| GLightbox | CDN | Gallery and facility image lightbox |
| Lottie Web | CDN | Lightweight animated SVG-style motion on the landing page |

## Bilingual Structure Notes

- English pages live at the root of `petly_frontend/`
- Arabic pages live inside `petly_frontend/ar/`
- Arabic pages use:
  - `<html lang="ar" dir="rtl">`
  - mirrored layout behavior in CSS
  - Arabic display/body fonts
  - translated content written for clinic context, not filler text
- The language switcher in the shared header maps each page to its correct counterpart

## Image Notes

Most imagery was copied from the legacy project’s clinic-related assets:

- `website_assets/img/slider/`
- `website_assets/img/team/`
- `website_assets/img/blog/`
- selected clinic-safe images from `uploads/`

### Reused Legacy Images

- hero and clinic backgrounds
- team portraits
- blog article imagery
- facility and gallery visuals
- testimonial portraits

### Placeholder / Swap-Later Notes

No external Unsplash placeholders were required in this pass. Some images come from the original project’s generic clinic library rather than clearly labeled real-world photography, so they can be swapped later if the brand team wants more specific final imagery.

## Accessibility Notes

- Semantic page structure across all pages
- Skip link included
- Visible focus states
- Meaningful alt text in matching page language
- RTL-aware layout and interaction handling
- Reduced-motion support through CSS and JS fallbacks

## Performance Notes

- No frontend framework bundle
- Static HTML with deferred JS libraries
- Reused local image assets where possible
- Hero images preloaded per page
- Below-the-fold images use `loading="lazy"`

## Known Limitations

- No backend or data persistence
- Forms are visual only and do not submit
- Newsletter signup is visual only
- Pagination is static
- Filters are client-side only
- CDN libraries require an internet connection when previewing locally
- Images were not converted to `.webp` in this pass, so later optimization is still available

## Legacy Brand Extraction

The new frontend palette was grounded in the legacy Petly CSS, especially:

- `website_assets/css/style.css`
- `website_assets/css/style_ar.css`

The most dominant extracted legacy brand color was `#28BCA8`, supported by `#08A7AB`, light neutrals, and dark text tones. The redesign extends that palette with warmer premium accents while keeping Petly recognizable.
