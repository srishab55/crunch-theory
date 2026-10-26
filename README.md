# Crunch Theory — Website

The brand site for **Crunch Theory**, which sells roasted makhana snacks: _The Smart Way to Snack._
It is built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Motion and Lenis.
The type is Bricolage Grotesque for display and the logo, Fraunces italic for accent words, and Manrope for body text.
Analytics run on GA4 with Consent Mode v2, and the site deploys to Vercel.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run dev                   # http://localhost:3000
```

| Script                        | What it does                                                        |
| ----------------------------- | ------------------------------------------------------------------- |
| `npm run dev`                 | Starts the dev server (Turbopack)                                   |
| `npm run build` / `npm start` | Builds for production and serves the build                          |
| `npm run typecheck`           | Generates route types, then runs `tsc`                              |
| `npm run lint`                | Runs ESLint (Next core-web-vitals and TypeScript rules)             |
| `npm run format`              | Formats with Prettier (with Tailwind class sorting)                 |
| `npm run check`               | Runs typecheck, lint and the format check, as CI would              |
| `npm run images`              | Rebuilds site and share-image crops from `content/pouches/*.png`    |
| `npm run logo`                | Rebuilds logo, wordmark, favicon and app icons from `content/logo/` |

## Project structure

```
content/            Raw brand media (source files; not deployed)
reference/          Brand strategy deck (personas, tribes, journey)
docs/               IMAGE_PROMPTS.md (AI prompts for the remaining photography)
public/media        Hero video (watermark removed, webm + mp4) and poster
public/images       Lifestyle / story images (served as-is)
src/assets/pouches  Pack shots, imported for hashed URLs (generate with npm run images)
src/assets/brand    Transparent logo mark + wordmarks (generate with npm run logo)
src/
  app/              Routes, metadata routes (sitemap, robots, manifest, OG images, llms.txt)
  actions/          Server Actions (newsletter, contact)
  components/
    analytics/      GA4 loader, consent banner, view_item tracker
    flavour/        Product cards, nutrition table, buy links
    forms/          Newsletter and contact forms
    illustrations/  SVG makhana, watercolour blobs, illustrated pouch, logo
    layout/         Header, footer, breadcrumbs, page hero, providers
    sections/       Home page sections
    seo/            JSON-LD renderer
    ui/             Primitives (button, reveal, marquee, counter, FAQ list…)
  data/             Single source of truth for all copy and product data
  lib/              env, analytics, SEO/schema builders, validation, mailer, llms.txt
```

To change copy, prices, flavours or FAQs, edit `src/data/*`. Pages, structured data, the sitemap
and `llms.txt` all update from it automatically.

## Design system

The theme (colours, type, spacing, surfaces) and the motion rules (one easing curve, duration
scale, hover vocabulary, reduced motion) are documented in
[`.claude/skills/crunch-theory-design/`](.claude/skills/crunch-theory-design/SKILL.md). Claude Code
loads it automatically for UI work. Humans should read it before adding a section or animation.

## Visit tracking (Google Analytics 4)

1. In GA4, create a property, then a **Web data stream**, and copy the Measurement ID (`G-…`).
2. The ID `G-T0HTG7NX71` is built in for Vercel **production** deployments (`src/lib/env.ts`). To test
   locally, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`. Setting it in Vercel overrides the default.
3. Leave **Enhanced measurement** on (it tracks scrolls, outbound clicks and so on), but open its ⚙️ settings
   → **Page views → Show advanced settings** and turn **off** "Page changes based on browser history
   events". The site sends its own `page_view` on every route change (`PageViewTracker`), because GA's
   history listener misses Next.js navigations. Leaving that setting on could double-count.

Custom events (`src/lib/analytics.ts`):

| Event           | When                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| `buy_click`     | A visitor clicks through to a marketplace (with `marketplace`, `flavour` and `location`) |
| `view_item`     | A visitor views a flavour page (GA4 ecommerce event)                                     |
| `generate_lead` | A visitor submits the newsletter or contact form                                         |
| `cta_click`     | A visitor clicks a primary button (with `label` and `location`)                          |
| `faq_open`      | A visitor opens an FAQ                                                                   |

In GA4, mark `generate_lead` and `buy_click` as **Key events** so they appear as conversions.
Consent defaults to _denied_ (DPDP Act / GDPR friendly) until the visitor accepts the banner.

## SEO and AI-search optimisation

- **Metadata:** every page has a unique title and description, a canonical URL, Open Graph and Twitter
  cards, `en-IN` locale, and large image previews allowed for Google.
- **Open Graph images:** generated per route, including one per flavour (`opengraph-image.tsx`).
- **Structured data (JSON-LD):** Organization, WebSite, Product with AggregateOffer for each flavour,
  ItemList, FAQPage, BreadcrumbList and AboutPage. Check them with the
  [Rich Results Test](https://search.google.com/test/rich-results).
- **AI engines (GEO):** `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended and others. `/llms.txt` and `/llms-full.txt` give a clean Markdown summary of
  the brand, flavours, nutrition and FAQs. Copy is written answer-first (the first sentence
  answers the question), FAQ answers stay in the HTML, and facts appear in real `<table>` elements.
- **Sitemap:** `/sitemap.xml` includes image entries. Submit it in Google Search Console and Bing
  Webmaster Tools, and set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- **Core Web Vitals:** pages are prerendered statically. The hero poster is the priority LCP image
  and the video fades in over it. Images are served as AVIF/WebP through `next/image`, fonts are
  self-hosted with `next/font`, and the hero headline animates with CSS only.
- **Accessibility:** semantic landmarks, a skip link, one H1 per page, focus styles, form labels and
  errors, and `prefers-reduced-motion` support (Lenis and the video are turned off).

## Deploy to Vercel

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for step-by-step instructions covering GitHub, GA4,
Vercel, custom domain, Search Console and troubleshooting.

## Content checklist before launch

- [ ] Replace the indicative nutrition values in `src/data/flavours.ts` with lab-tested figures from the
      printed pack, then set `nutritionIsIndicative: false`.
- [ ] Confirm flavours, ingredients, allergens and prices. Peri Peri, Cheese & Herbs and Pudina are proposals.
- [ ] Replace marketplace search URLs in `src/data/marketplaces.ts` with the real listing URLs.
- [ ] Update the email address and social handles in `src/data/site.ts`.
- [ ] Generate and add the photography in `docs/IMAGE_PROMPTS.md`.
- [ ] Only show the pack claims ("High Protein" and others) on the site once they meet FSSAI labelling rules.
- [ ] Optional: set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` so form submissions arrive by email.
      Without them, submissions are written to Vercel logs.
