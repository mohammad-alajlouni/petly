# Petly New CSS

واجهة ثابتة حديثة وثنائية اللغة لعيادة بيتلي البيطرية.

## نظرة عامة

`petly_new_css/` هو مشروع Front-End مستقل بالكامل عن مشروع PHP القديم.  
لا يوجد فيه:

- PHP
- قاعدة بيانات
- لوحة تحكم
- تسجيل دخول
- حجز
- متجر

هذه النسخة تركّز فقط على تجربة استخدام راقية، سريعة، ومتجاوبة، مع دعم كامل للإنجليزية والعربية وـ RTL.

## اسم المجلد النهائي

المشروع الكامل موجود هنا:

`petly_new_css/`

## البنية

```text
petly_new_css/
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

## طريقة المعاينة

يمكن فتح الموقع مباشرة من المتصفح:

- `petly_new_css/index.html`
- `petly_new_css/ar/index.html`

أو عبر سيرفر محلي بسيط:

```bash
cd petly_new_css
python -m http.server 4173
```

ثم:

```text
http://127.0.0.1:4173
```

## نظام التصميم

### الألوان

| Token | Value | الاستخدام |
|---|---:|---|
| `--color-primary` | `#28BCA8` | لون بيتلي الأساسي |
| `--color-secondary` | `#08A7AB` | تركواز داعم |
| `--color-accent` | `#F6C453` | لمسة دافئة مميزة |
| `--color-accent-soft` | `#FFF3EF` | خلفية دافئة خفيفة |
| `--color-ink` | `#444444` | لون النص الأساسي |
| `--color-deep` | `#17312D` | العناوين والتباين العالي |
| `--color-surface-alt` | `#F7FBFF` | خلفيات خفيفة |
| `--color-surface-muted` | `#ECEFF8` | محايد فاتح |

### الخطوط

| الاستخدام | الخط |
|---|---|
| English Display | `Fraunces` |
| English Body | `Inter` |
| Arabic Display | `Readex Pro` |
| Arabic Body | `Tajawal` |

### المسافات والظلال

- Spacing tokens: `--space-1` إلى `--space-11`
- Radius tokens: `--radius-sm` إلى `--radius-xl`
- Shadow tokens: `--shadow-soft`, `--shadow-glow`, `--shadow-strong`
- Motion tokens: `--transition-base`, `--transition-slow`

### مكونات قابلة لإعادة الاستخدام

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

## المكتبات المستخدمة

| المكتبة | لماذا استُخدمت |
|---|---|
| Tailwind CSS CDN | دعم Utility سريع ومرن |
| Bootstrap 5 | Grid واستجابة وتخطيط أساسي |
| Bootstrap Icons | أيقونات متناسقة |
| GSAP + ScrollTrigger | حركات الدخول والـ scroll reveal والعدادات |
| Swiper | سلايدر الشهادات |
| GLightbox | عرض صور المعرض |
| Lottie Web | حركة خفيفة في الصفحة الرئيسية |

## الصور المستخدمة

تم التأكد أن الصور داخل `petly_new_css/assets/images/` مأخوذة من المشروع الأصلي فقط، وتحديداً من:

- `website_assets/img/slider/`
- `website_assets/img/team/`
- `website_assets/img/blog/`
- صور مختارة من `uploads/`

لم يتم استخدام صور خارجية جديدة في هذه النسخة.

## ثنائية اللغة

- الصفحات الإنجليزية في جذر المشروع
- الصفحات العربية داخل `ar/`
- الصفحات العربية تستخدم:
  - `<html lang="ar" dir="rtl">`
  - تخطيط RTL فعلي
  - خطوط عربية مخصصة
  - نصوص عربية حقيقية ومهنية

## تحسين الهاتف

تم تحسين النسخة للهاتف بشكل خاص في:

- الهيدر والمينيو الجوال
- تكبير أهداف اللمس
- تكديس الأقسام الثقيلة بطريقة أنظف
- تحسين قراءة الـ hero على الشاشات الصغيرة
- تصغير وإعادة تموضع البطاقات والعناصر العائمة
- تحسين شبكة المقالات والخدمات والمعرض على المقاسات الصغيرة

## الوصول والأداء

- بنية HTML دلالية
- Skip link
- حالات Focus واضحة
- نصوص بديلة للصور
- دعم `prefers-reduced-motion`
- تحميل كسول للصور أسفل الجزء المرئي
- لا يوجد Framework JavaScript ثقيل

## القيود الحالية

- النماذج شكلية فقط ولا ترسل بيانات
- لا يوجد Backend
- لا يوجد حجز أو متجر
- بعض المكتبات محمولة عبر CDN، لذلك تحتاج اتصال إنترنت أثناء المعاينة
- الصور لم تُحوّل إلى WebP بعد، ويمكن تحسين ذلك لاحقاً

## ملاحظة أخيرة

هذه النسخة موجودة داخل مجلد جديد مستقل:

`petly_new_css/`

وتحافظ على نفس اللغة البصرية الراقية للمشروع السابق، لكن مع اسم مجلد جديد، وصور من المشروع الأصلي فقط، وتحسينات إضافية لتجربة الهاتف.
# petly
