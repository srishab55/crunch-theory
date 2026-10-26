# Theme tokens: full reference

The source of truth is `src/app/globals.css` (`@theme` block). If this file and the CSS
disagree, the CSS wins. Update this file whenever the CSS changes.

## Colours

| Token         | Hex     | Use for                                                                                               | Avoid                                                    |
| ------------- | ------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `cream`       | #f4eee3 | Page background (`body`), light section backgrounds                                                   | Text                                                     |
| `paper`       | #fbf8f2 | Cards on cream; text and buttons on dark panels; marquee strip                                        | Large page areas next to cream (too close to tell apart) |
| `sand`        | #e6dccb | Image wells (`bg-sand/60`), alternating section tint (`bg-sand/40`), soft callouts                    | Text                                                     |
| `forest`      | #2f4a2c | Headings, brand text, primary buttons, focus outline, dark panels                                     | Body copy at small sizes on dark                         |
| `forest-deep` | #1d301c | Footer, "Where to buy", other deep sections; hover state of primary buttons                           | Next to another dark full-bleed section                  |
| `ink`         | #24231e | Default body text on light                                                                            | —                                                        |
| `muted`       | #69655a | Ledes, secondary copy, captions on light                                                              | Text on dark (use `text-paper/60–75`)                    |
| `olive`       | #8a7a48 | `eyebrow` labels, small prices on cards                                                               | Large fills                                              |
| `terracotta`  | #c4755a | `*accent*` heading words on light; newsletter band; heat meter; error text                            | Small text on `forest`                                   |
| `mustard`     | #d7a44f | Accent on dark (eyebrows, accent words), sticker, quick-commerce badge; `selection` highlight (`/40`) | Small text on cream (low contrast)                       |
| `sage`        | #9fb18f | Watercolour blobs, soft success panels (`bg-sage/25`)                                                 | Text                                                     |

Opacity steps in use are `/5 /10 /12 /15 /20 /25 /30 /40 /45 /50 /60 /70 /75 /80`. Prefer these
over new ones.

### Safe text pairings

| Background                     | Body text            | Meta text     | Accent words       |
| ------------------------------ | -------------------- | ------------- | ------------------ |
| `cream` / `paper`              | `ink` / `forest`     | `muted`       | `terracotta`       |
| `sand/40–60`                   | `forest`             | `muted`       | `terracotta`       |
| `forest`, `forest-deep`        | `paper/75`           | `paper/50–60` | `mustard`          |
| `terracotta` band              | `paper` / `paper/80` | `paper/80`    | `forest-deep`      |
| Flavour panel (`spotlight.bg`) | `paper/75`           | `paper/50–60` | `spotlight.accent` |

### Flavour panel themes (data: `src/data/flavours.ts` → `spotlight`)

| Flavour                      | `bg`                   | `accent` |
| ---------------------------- | ---------------------- | -------- |
| Himalayan Pink Salt & Pepper | #2f4a2c (forest)       | #d7a44f  |
| Peri Peri Kick               | #76301f (chilli)       | #f2b25c  |
| Cheese & Herbs               | #5e4a12 (deep mustard) | #f4d27a  |
| Pudina Chatpata              | #24493b (mint forest)  | #b9dba6  |

A new flavour needs a dark `bg` that `paper` text reads clearly on (contrast ≥ 7:1), and an
accent of ≥ 4.5:1 on that `bg`. Expose it as `--panel-accent` (the slider does this) rather than
adding a Tailwind token.

The logo artwork has its own greens (mark ≈ #6a9a5e, wordmark dark green). Don't sample them for
UI. Use `forest`; the logo is an image, not a palette.

## Typography

| Family              | Token / utility            | Weights in use                                 | Notes                                                                                |
| ------------------- | -------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| Bricolage Grotesque | `font-display`             | 600, 700 (`font-bold`), 800 (`font-extrabold`) | Variable with `opsz` and `wdth` axes; `font-optical-sizing: auto` is set on headings |
| Fraunces italic     | `accent` utility           | 600                                            | Italic only (loaded with `style: 'italic'`)                                          |
| Manrope             | `font-sans` (body default) | 400–700                                        | UI, body, buttons                                                                    |

Heading scale in use:

- **Hero h1:** `text-[clamp(3.4rem,9.5vw,8rem)] leading-[0.9] tracking-[-0.045em]`.
- **Page h1** (`PageHero`): `text-5xl sm:text-7xl tracking-[-0.04em]`.
- **Section h2** (`SectionHeading`): `text-4xl sm:text-5xl lg:text-6xl leading-[0.98]
tracking-[-0.035em]`.
- **Card h3:** `text-2xl`–`text-3xl`.
- **Body:** ledes `text-lg leading-relaxed`; small UI `text-sm`; legal and meta `text-xs`.

## Radii

| Radius                        | Use                                                                      |
| ----------------------------- | ------------------------------------------------------------------------ |
| `rounded-full`                | Buttons, pills, badges, round icon buttons, inputs in the newsletter bar |
| `rounded-[2.5rem]`            | Full-width bands and callouts (newsletter, where-to-buy box)             |
| `rounded-[2rem]`              | Product imagery, feature cards, marketplace tiles, moment cards          |
| `rounded-[1.75rem]`           | Media inside a padded card (card `p-3` + image)                          |
| `rounded-3xl` / `rounded-2xl` | Compact cards, tables, stat groups, form fields                          |

## Shadows

All shadows use a warm ink tint (`rgb(36 35 30)`) or black on dark sections, with a **negative
spread** so they read as soft lift rather than outlines:

- **Card at rest:** `shadow-[0_20px_50px_-30px_rgb(36_35_30/0.4)]`.
- **Card on hover:** `shadow-[0_30px_60px_-25px_rgb(36_35_30/0.45)]`.
- **Header when scrolled:** `shadow-[0_8px_30px_-12px_rgb(36_35_30/0.25)]` plus `backdrop-blur-xl`
  and `bg-paper/80`.
- **Primary button:** `shadow-[0_10px_30px_-10px_rgb(47_74_44/0.6)]`.
- **Product image on a dark panel:** `shadow-[0_40px_80px_-20px_rgb(0_0_0/0.55)]`.

## Texture

The `grain` utility adds an SVG noise `::after` (multiply, 18%). It needs a positioned parent:
use `grain relative isolate`. It goes on every coloured or dark section, not on cream.
