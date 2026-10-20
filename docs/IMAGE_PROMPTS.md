# Crunch Theory — AI Image Prompts

Use these prompts with your image generator (Gemini / Imagen, Midjourney, DALL·E, Firefly…).
The site **already works without them**: it shows illustrated pouches and cards until you add the photos.

**Before you add any image:** remove the generator's watermark (for example the Gemini ✦ in the
corner), export it as **JPG, quality ~85**, and save it to the exact path listed.

---

## Shared style (paste at the end of every prompt)

> Style: premium Indian D2C food brand, soft natural daylight from the left, warm off-white and
> cream palette (#F4EEE3), muted watercolour accents in terracotta (#C4755A), sage green (#9FB18F)
> and mustard (#D7A44F), deep forest-green (#2F4A2C) typography on the pack, matte kraft-paper
> stand-up pouch with zip seal and a small transparent window showing roasted makhana, minimal
> props, shallow depth of field, editorial product photography, 50mm lens, photorealistic, no
> text other than the pack label, no watermark.

Reference the existing pack for consistency: `content/image1.png` (upload it as an image reference
if your tool supports it).

---

## 1. Flavour pack shots (square 1:1, 2048 × 2048)

Same scene as `image1.png`: the pouch centred on a stone tabletop, a soft blurred plant shadow on
a cream wall, and a small pile of makhana in front.

| #   | Save to                                     | Prompt                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1a  | `content/pouches/pouch-peri-peri-kick.png`  | A matte cream stand-up pouch labelled "CRUNCH THEORY — ROASTED MAKHANA — The Smart Way to Snack", flavour name "PERI PERI KICK" in olive serif capitals, watercolour illustration of makhana with terracotta and mustard paint splashes and small red chillies, four round badges "100% Natural", "Roasted, Not Fried", "Gluten-Free", "No Palm Oil". It stands on a light stone surface with roasted makhana dusted in red peri peri seasoning and two dried red chillies in front. |
| 1b  | `content/pouches/pouch-cheese-herbs.png`    | The same pouch design with flavour name "CHEESE & HERBS", watercolour makhana with mustard-yellow and sage splashes and sprigs of oregano and basil. In front: makhana with a light golden cheese coating and fresh basil leaves.                                                                                                                                                                                                                                                    |
| 1c  | `content/pouches/pouch-pudina-chatpata.png` | The same pouch design with flavour name "PUDINA CHATPATA", watercolour makhana with sage-green and mustard splashes and mint leaves. In front: makhana with green mint seasoning, fresh pudina leaves and a small bowl of chaat masala.                                                                                                                                                                                                                                              |

**After saving**, run `npm run images`. For a brand-new flavour, also import `src/assets/pouches/<slug>.jpg` in `src/data/flavours.ts` and set it as that flavour's `image`.

> **Status (21 Oct 2026):** all three are in use, regenerated with the correct "CRUNCH THEORY"
> spelling. The source PNGs are in `content/pouches/`. The site uses square JPG crops, which
> also cut out the Gemini watermark.
>
> The regenerated Pudina pack still had a faint ghost "R" ("CRURNCH"). The "CRUNCH" word was
> transplanted from the Cheese & Herbs pack, which uses the identical pixel-aligned layout. The
> untouched file is kept as `pouch-pudina-chatpata.original.png`.
>
> **To replace a pack image:** save the new PNG as `content/pouches/pouch-<slug>.png` (keep the
> same name) and run `npm run images`, then commit and push. Pack images are imported, so each new
> picture gets a new hashed URL, and no CDN or browser can keep showing the old one. Don't put
> files in `public/images/` for packs.

---

## 2. Snacking moments (portrait 3:4, 1536 × 2048)

Used for the horizontal-scroll "Made for your moments" cards. Leave space at the bottom of the frame
for overlaid text. Show real Indian people, natural and candid, not posed stock photos.

| #   | Save to                             | Prompt                                                                                                                                                                                                                                                          |
| --- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2a  | `public/images/moment-desk.jpg`     | A 35-year-old Indian software engineer at a tidy home-office desk at 4 pm, laptop open, reaching into an open Crunch Theory makhana pouch, a cup of chai beside him, warm afternoon window light, relaxed expression.                                           |
| 2b  | `public/images/moment-meetings.jpg` | A 28-year-old Indian woman marketing professional in a bright modern office lounge between meetings, smart-casual outfit, holding a small Crunch Theory pouch and phone, a glass wall and plants behind her, airy, aspirational.                                |
| 2c  | `public/images/moment-lunchbox.jpg` | An overhead shot of a steel Indian school lunchbox on a wooden kitchen counter in the morning: a sandwich, apple slices and a 30 g Crunch Theory Cheese & Herbs pack, with a parent's hands closing the lid and a child's school bag blurred in the background. |
| 2d  | `public/images/moment-study.jpg`    | Three Indian college students in a hostel room late at night studying on the floor with laptops and notebooks, sharing an open Crunch Theory Peri Peri pouch, warm desk-lamp light, fairy lights, candid laughter.                                              |
| 2e  | `public/images/moment-gym.jpg`      | A 31-year-old fit Indian man in gym wear sitting on a bench after a workout, towel over his shoulder, steel water bottle, eating makhana from a Crunch Theory pouch, soft gym lighting with a clean, minimal background.                                        |

**After saving**, open `src/data/home.ts` and add `image: '/images/moment-<name>.jpg',` to the matching moment.

---

## 3. Our Story page (landscape 16:9, 2400 × 1350)

| #   | Save to                             | Prompt                                                                                                                                                                                                                                                                           |
| --- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3a  | `public/images/story-harvest.jpg`   | Dawn over a makhana (fox nut) pond in Mithila, Bihar: lily-pad-like leaves of Euryale ferox cover the water, and a farmer in a traditional gamcha wades waist-deep collecting seeds into a bamboo basket. Misty golden light, documentary photography, respectful and authentic. |
| 3b  | `public/images/story-roasting.jpg`  | A close-up of makhana being slow-roasted in a large shallow steel kadhai in a clean small-batch food kitchen, a wooden paddle stirring, a light haze of steam, warm tones, artisanal craft feel, with hands in food-safe gloves.                                                 |
| 3c  | `public/images/story-seasoning.jpg` | Overhead flat lay on a cream stone surface of small ceramic bowls of Himalayan pink salt, cracked black pepper, peri peri powder, dried mint, oregano and amchur, arranged around a central bowl of roasted makhana, with terracotta, sage and mustard tones.                    |

To use these on the story page, swap the `src` of the image in `src/app/our-story/page.tsx`, or add
more `<Image>` blocks to the process section.

---

## 4. Social / campaign extras (optional)

| #   | Save to                           | Ratio | Prompt                                                                                                                                                                                                                                   |
| --- | --------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4a  | `public/images/lineup.jpg`        | 16:9  | All four Crunch Theory pouches (Pink Salt & Pepper, Peri Peri Kick, Cheese & Herbs, Pudina Chatpata) standing in a row on a cream stone surface, each with its matching seasoning scattered in front, a soft shadow, a hero lineup shot. |
| 4b  | `public/images/makhana-macro.jpg` | 1:1   | An extreme macro of a single roasted makhana seed with seasoning specks, floating against a soft cream background, crisp texture detail, studio lighting.                                                                                |
