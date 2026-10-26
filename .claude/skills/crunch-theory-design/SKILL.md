---
name: crunch-theory-design
description: The Crunch Theory website's design system, covering its visual theme (colours, typography, spacing, surfaces, imagery) and its motion and smoothness rules (one easing curve, duration scale, scroll behaviour, hover vocabulary, reduced motion). Use it for any visual or interactive change to this site, such as a new page, section, component, card, banner, slider or form, restyling, animations, hover effects, colours, fonts, spacing, or a request to "make it look better", "match the theme" or "smoother". Use it even when the request only touches one class name or one animation, so the site stays consistent.
---

# Crunch Theory design system

The site is a warm, crafted, "premium Indian D2C snack" brand: cream paper, forest greens and
watercolour accents taken from the pouch artwork, with bold, friendly type and motion that feels
**smooth, confident and calm**. Motion is never bouncy, fast or noisy.

The site already has a consistent system. Most work should **reuse existing tokens and components**
rather than introduce new values. Before you add a colour, duration, radius or shadow, check
whether one here does the job. Every one-off value makes the site look slightly less designed.

Supporting references, read when relevant:

- `references/tokens.md`: the full colour table with usage, accessible pairings, flavour panel
  themes, radii and shadows. Read it when choosing colours or styling a new surface.
- `references/motion.md`: copy-paste recipes for every motion pattern (reveal, stagger, slide,
  parallax, hover fill, spring pop, autoplay). Read it before writing any animation.

## 1. Theme at a glance

**Colours** are Tailwind tokens defined in `src/app/globals.css` (`@theme`). Use them by name
(`bg-cream`, `text-forest`, `border-forest/15`), never as hex in class names.

| Role                                  | Token                                                         |
| ------------------------------------- | ------------------------------------------------------------- |
| Page background                       | `cream` (#f4eee3)                                             |
| Cards, light text on dark             | `paper` (#fbf8f2)                                             |
| Image wells, soft panels              | `sand` (#e6dccb), often `/40`–`/60`                           |
| Brand text, headings, primary buttons | `forest` (#2f4a2c)                                            |
| Dark sections, footer                 | `forest-deep` (#1d301c)                                       |
| Body text / secondary text            | `ink` (#24231e) / `muted` (#69655a)                           |
| Eyebrows                              | `olive` (#8a7a48)                                             |
| Accents                               | `terracotta` (#c4755a), `mustard` (#d7a44f), `sage` (#9fb18f) |

On dark surfaces, text is `text-paper` with `/75` for body and `/60` for meta. The accent becomes
`mustard`, or the panel's own accent. Flavour-specific panel colours live in data
(`flavour.spotlight.bg` / `.accent`), never in components.

**Typography** uses three families, each with one job:

- `font-display` (Bricolage Grotesque) for every heading and big number. Headings are bold to
  extra-bold with tight tracking: section h2 `font-extrabold tracking-[-0.035em] leading-[0.98]`,
  h1 `tracking-[-0.04em]`, and stats `tracking-[-0.05em]`.
- `accent` utility (Fraunces serif italic) for **one or two words per heading**, for contrast.
  Write them as `*word*` in any `RevealText` / `SectionHeading` / `PageHero` title:
  `"Four flavours. *Zero* boring."` Never set a whole sentence in the accent.
- `font-sans` (Manrope) for body copy, buttons and UI.
- `eyebrow` utility (12 px, uppercase, 0.22 em tracking, olive) sits above every section title.
  On dark backgrounds use `!text-mustard` or `!text-[var(--panel-accent)]`.

**Layout rhythm:**

- Wrap content in `container-page`. It provides max-w-7xl and responsive gutters; don't hand-roll
  gutters.
- Sections use `py-28 sm:py-36`. Compact or dark sliders use `py-24 sm:py-28`.
- The section header pattern is eyebrow, then h2 (with one `*accent*`), then an optional lede
  (`text-lg leading-relaxed text-muted`, max ~2 sentences). `SectionHeading` does all of this.
- Radii: big cards and media `rounded-[2rem]`, bands and callouts `rounded-[2.5rem]`, small
  cards `rounded-3xl` or `rounded-2xl`, and buttons, pills and badges `rounded-full`. Nothing
  square-cornered.
- Alternate light and dark full-bleed sections down a page, and don't stack two dark ones
  back to back. Coloured or dark sections get the `grain` utility (with `relative isolate`) so
  flat colour has the pouch's paper texture.

**Imagery:**

- Pack shots come from `content/pouches/*.png` via `npm run images`. The logo comes from
  `content/logo/` via `npm run logo`.
- Both are imported from `src/assets/…`, which gives hashed URLs so replaced pictures never stay
  cached. Don't put product images in `public/`.
- Decorative extras are `Makhana` (SVG seed) and `WatercolorBlob`. They're always `aria-hidden`
  and behind content (`-z-10`).

## 2. Motion and smoothness

The feel comes from three constraints. Keeping to them is what makes new work match old.

1. **One easing curve: expo-out `[0.16, 1, 0.3, 1]`.** Use it as `ease-out-expo` in Tailwind and
   `ease: [0.16, 1, 0.3, 1]` in Motion. It starts fast and settles gently, which reads as smooth
   and expensive. The exceptions are deliberate: `linear` for things that run continuously
   (marquee, spin, progress bars), `easeInOut` for full-section background colour cross-fades,
   and springs for physical "pop" or pointer-follow.
2. **A small duration scale:**

   | Use                                                             | Duration                        |
   | --------------------------------------------------------------- | ------------------------------- |
   | Hover and press feedback (colour, small transforms)             | 300 ms (`duration-300`)         |
   | Surfaces changing state (tile fill, header, card lift, shadows) | 500 ms (`duration-500`)         |
   | Image zoom inside a card on hover                               | 700 ms                          |
   | Elements entering (reveal, slide-in)                            | 0.7–0.9 s                       |
   | Headline word reveal                                            | 0.85 s per word, 0.06 s stagger |
   | Elements leaving or hiding                                      | 0.35 s                          |

   Exits are always quicker than entrances, so the UI never feels like it's waiting on itself.

3. **Small distances.** Content rises 28 px when revealed (12 px for eyebrows). Copy slides
   ±40 px and imagery ±140 px between slides. Parallax stays within about ±80 px or ±8°, and
   scale within 0.92–1.15. Big moves look cheap.

**Springs** are for physical pops and pointer-following only:

| Use                          | Spring                        |
| ---------------------------- | ----------------------------- |
| Badge and sticker pop-in     | `stiffness: 260, damping: 18` |
| Magnetic button, card tilt   | `220/18` and `200/20`         |
| Moving nav pill (`layoutId`) | `380/32`                      |
| Fanned pouch stack           | `120/16`                      |

**Scroll:**

- Lenis smooth scrolling is global (`Providers`, `lerp: 0.12`). Don't add another smooth-scroll
  library or `scroll-behavior` tweak.
- Use Motion's `useScroll`/`useTransform` for scroll-linked effects.
- In-view entrances fire once: `viewport={{ once: true, margin: '0px 0px -10% 0px' }}` (−8% to
  −15% is the house range).

**Hover vocabulary.** Reuse these so interactions feel related:

- **Buttons:** colour change over 300 ms, `active:scale-[0.97]`, arrow icon nudges
  `translate-x-1`.
- **Cards:** lift (`hover:-translate-y-1`) or the pointer tilt from `FlavourCard`, with the image
  inside zooming to `scale-[1.04]` over 700 ms.
- **Outbound or selection tiles:** a colour fill rises from the bottom (`origin-bottom scale-y-0`
  to `scale-y-100`, 500 ms). See `MarketplaceTiles`.
- **Logo:** a short wiggle on the mark.
- **Pills and nav:** the active state glides between items with a `layoutId` spring.

**Ambient motion** (`animate-float` 6 s, `animate-spin-slow` 24 s, `animate-marquee` 30 s) is
decoration only. It's slow, `aria-hidden`, never on text a user has to read, and hidden on mobile
(`hidden lg:block`) if it might sit on top of buttons.

**Autoplay** (the flavour slider is the model):

- Advance every 4 s, with a visible progress indicator.
- Pause on hover, on keyboard focus (`:focus-visible` only, so a mouse click on an arrow doesn't
  freeze it), when off-screen, and when the tab is hidden.
- Provide a pause/play button, and turn autoplay off entirely for reduced-motion users.

**Above the fold**, animate with **CSS keyframes** (`hero-word`, `hero-fade` in `globals.css`),
not Motion. Text gated behind JavaScript `opacity: 0` delays the Largest Contentful Paint and
flashes on slow devices.

**Reduced motion** is a requirement, not a nicety:

- `MotionConfig reducedMotion="user"` and a global CSS rule already neutralise most animation.
- Scroll-linked `style` values, autoplay, video and anything else that keeps moving need an
  explicit check.
- If the check changes **rendered markup** (e.g. whether a pause button exists), use
  `usePrefersReducedMotion()` from `src/lib/use-media-query.ts`. It's hydration-safe. Motion's
  `useReducedMotion()` reads the real value on the first client render and causes a React
  hydration error.

**Performance:** animate `transform` and `opacity`. They run on the compositor and stay smooth on
mid-range Android phones. Avoid animating layout properties (`width`, `height`, `top`) except
for tiny elements like the slider's progress bar.

## 3. Reuse these components

Check this list before building UI. Paths are under `src/components/`.

| Need                                    | Use                                                                                                                                               |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Section title block                     | `ui/section-heading` (`eyebrow`, `title` with `*accent*`, `lede`, `align`, `inverted`)                                                            |
| Inner-page header with breadcrumbs + H1 | `layout/page-hero`                                                                                                                                |
| Fade-up on scroll / masked word reveal  | `ui/reveal` → `Reveal` (`delay`, `y`), `RevealText` (`text`, `as`, `accentClassName`)                                                             |
| Buttons and CTAs                        | `ui/button` → `ButtonLink` / `Button`: variants `primary` · `secondary` · `ghost` · `light`; sizes `md` · `lg`; `trackLabel` sends GA `cta_click` |
| Pointer-magnetic CTA wrapper            | `ui/magnetic`                                                                                                                                     |
| Count-up stat                           | `ui/counter`                                                                                                                                      |
| Infinite strip of claims                | `ui/marquee`                                                                                                                                      |
| Rotating circular sticker               | `ui/spin-sticker`                                                                                                                                 |
| Accordion (crawlable `<details>`)       | `ui/faq-list`                                                                                                                                     |
| Pack image with illustrated fallback    | `flavour/flavour-visual`                                                                                                                          |
| Product card / grid                     | `flavour/flavour-card`, `flavour/flavour-grid`                                                                                                    |
| Store links (tracked `buy_click`)       | `flavour/marketplace-tiles` (`variant="feature"` on dark, `"compact"` on light)                                                                   |
| Flavour slider                          | `sections/home/flavour-spotlights`                                                                                                                |
| Logo                                    | `illustrations/logo` (`inverted` on dark, `eager` above the fold)                                                                                 |
| Decoration                              | `illustrations/makhana`, `illustrations/watercolor-blob`                                                                                          |

If you need something new, build it from these parts and tokens. Put copy and product facts in
`src/data/*`, not in components. Pages, structured data and `llms.txt` all read from there.

## 4. Content and accessibility rules that affect design

- **One `h1` per page.** Sections use `h2`; cards and slides use `h3`. Decorative headings
  elsewhere use `<p>`.
- **Write ledes and FAQ answers answer-first.** The first sentence should stand alone; search
  engines and AI answers quote it.
- **Keep claims honest:** no fabricated reviews, ratings or health promises. Prices and nutrition
  come from data.
- **Contrast.** `paper` on any `forest`/flavour panel and `forest` on `cream`/`paper` are the safe
  pairs. Accent colours are for large text, not small body copy (see `references/tokens.md`).
- **Tap targets** are at least 44 px (`size-11`, `h-11`). Every icon-only button gets an
  `aria-label`.
- **Carousels:** `aria-roledescription`, inactive slides `inert` + `aria-hidden`, and a polite
  live region.
- **Analytics.** New CTAs use `ButtonLink` with `trackLabel`. New interaction events are added to
  the typed `AnalyticsEvents` map in `src/lib/analytics.ts`, using GA4 recommended names where
  one exists.

## 5. Next.js 16 gotchas that show up in UI work

Read `node_modules/next/dist/docs/` when unsure. This version differs from older training data.

- **`next/image`:** `priority` is deprecated. Use `preload` only for the main image on first load
  (LCP), `loading="eager"` for other above-the-fold images, and lazy loading (the default) for
  everything else. Always pass `sizes` for responsive images.
- **Cache Components is on.** `new Date()`, `Math.random()` and similar can't run in the
  prerendered shell. Read them on the client (see `ui/current-year`) or behind
  `<Suspense>`/`connection()`.
- **Hydration-safe client-only values:** use `useSyncExternalStore` with a server snapshot (see
  `use-media-query.ts`) instead of reading `window` during render.

## 6. Before you ship a visual change

1. `npm run check` (types, lint, formatting) and `npm run build` both pass.
2. Look at it, don't assume: screenshot at **1440 × 900** and **390 × 844**, at rest and mid-
   interaction (hover, slide change).
3. Toggle **reduced motion** (Chrome DevTools → Rendering → `prefers-reduced-motion`). Content
   must stay visible, nothing should keep moving, and there should be no console errors.
4. Check the browser console for hydration warnings. They usually mean a client-only value
   rendered on the server.
5. New colours, durations or radii should appear in this skill. If you added one, either replace
   it with an existing token or add it here with a reason.
