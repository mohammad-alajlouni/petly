# Petly Static Frontend

Pure HTML, CSS, and JavaScript for the bilingual Petly site.

## Shelter Pages

Al-Eman Shelter is a tribute initiative founded by Petly in memory of Eman. It introduces a dedicated English and Arabic page for a rescue program focused on dogs with special needs, chronic conditions, abandoned seniors, and other dogs who are often overlooked.

Pages:

- `shelter.html`
- `ar/shelter.html`

Shared data:

- `assets/data/shelter.json`

Shared shelter media:

- `assets/images/shelter/al-eman-logo.png`
- `assets/images/shelter/al-eman-tribute-art.png`

## Shelter Data

The rescue cards on both shelter pages are rendered from `assets/data/shelter.json`.

Each rescue entry includes:

- `id`
- `name_en`
- `name_ar`
- `story_en`
- `story_ar`
- `condition_en`
- `condition_ar`
- `photo`
- `status`

Supported `status` values:

- `in-care`
- `adopted`
- `sanctuary`

If a rescue photo is missing on disk, the page automatically shows a warm gradient placeholder with the dog's name instead of a broken image.

## Shelter Palette Tokens

These tokens were added additively in `assets/css/custom.css` and are scoped to `body[data-page="shelter"]`:

```css
--shelter-orange: #F58634;
--shelter-orange-soft: #FCB07A;
--shelter-glow: #FFD2A8;
--shelter-deep: #C45A1E;
--shelter-mist: #FFF6EE;
```

## TODO Items

The shelter launch still needs these user-supplied updates:

- Donation link for the hero CTA and donate card
- Foster application link
- Adoption process link
- Real rescue stories for all placeholder entries in `assets/data/shelter.json`
- Real rescue photos in `assets/images/shelter/`
- Optional cleanup if you want the tribute artwork filename to match the original brief exactly: the current verified file on disk is `al-eman-tribute-art.png`

## Notes

- Header and footer navigation are shared through `assets/js/main.js`.
- The Shelter link is injected site-wide in both languages and includes a subtle heart cue.
- The shelter pages reuse the site footer and language switcher, and the switcher preserves the shelter route in both directions.
