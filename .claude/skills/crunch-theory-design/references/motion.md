# Motion recipes

Copy these patterns rather than inventing new ones. All Motion imports come from `motion/react`.
The shared constant is:

```ts
const ease = [0.16, 1, 0.3, 1] as const // expo-out; Tailwind: ease-out-expo
```

## Contents

1. Fade-up on scroll
2. Heading word reveal
3. Staggered grid entrance
4. Hover patterns (button, card, tile fill)
5. Spring pop-in (badges, stickers)
6. Scroll-linked parallax
7. Slide transitions (slider)
8. Background cross-fade
9. Autoplay with progress
10. CSS-only above-the-fold entrance
11. Reduced motion checklist

---

## 1. Fade-up on scroll

Use the component; don't re-implement it.

```tsx
<Reveal>…</Reveal>                       // y: 28 px, 0.9 s, once, -12% margin
<Reveal delay={0.15}>…</Reveal>          // stagger related blocks by 0.08–0.15 s
<Reveal y={12}><p className="eyebrow">…</p></Reveal>   // small elements travel less
```

## 2. Heading word reveal

`RevealText` masks each word and slides it up (0.85 s per word, 0.06 s stagger). The full
sentence stays in the DOM for crawlers and screen readers (`aria-label`).

```tsx
<RevealText as="h2" text="Made for your *moments*." className="font-extrabold …" />
// on dark panels: accentClassName="text-mustard"
```

## 3. Staggered grid entrance

```tsx
<motion.article
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
  transition={{ duration: 0.8, delay: index * 0.08, ease }}
/>
```

Keep the per-item delay at 0.07–0.08 s. Grids longer than about 6 items should cap the delay
(`Math.min(index, 5) * 0.08`) so the last card doesn't arrive late.

## 4. Hover patterns

**Button.** Built into `buttonStyles`: colour change over 300 ms with `ease-out-expo`, and
`active:scale-[0.97]`. Add `<ArrowIcon />` for the `translate-x-1` nudge.

**Card lift and image zoom:**

```tsx
<article className="group transition-shadow duration-500 hover:shadow-[0_30px_60px_-25px_rgb(36_35_30/0.45)]">
  <div className="overflow-hidden rounded-[1.75rem]">
    <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
      …
    </div>
  </div>
</article>
```

**Tile fill.** For outbound or selection tiles, a colour rises from the bottom:

```tsx
<a
  className="group relative isolate overflow-hidden hover:text-[var(--fill-fg)] focus-visible:text-[var(--fill-fg)]"
  style={{ '--fill-bg': bg, '--fill-fg': fg } as CSSProperties}
>
  <span
    aria-hidden
    className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-[var(--fill-bg)] transition-transform duration-500 ease-out-expo group-hover:scale-y-100 group-focus-visible:scale-y-100"
  />
  …
</a>
```

Always mirror hover with `focus-visible`, so keyboard users get the same feedback.

**Pointer tilt / magnetic.** Use `FlavourCard`'s tilt (±6°, spring 200/20) or wrap a CTA in
`<Magnetic>` (strength 0.3, spring 220/18). Only react to `pointerType === 'mouse'`, never to
touch.

## 5. Spring pop-in

```tsx
<motion.span
  initial={{ opacity: 0, scale: 0.6 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.3 + i * 0.15 }}
/>
```

## 6. Scroll-linked parallax

```tsx
const ref = useRef<HTMLElement>(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
const y = useTransform(scrollYProgress, [0, 1], [80, -80])      // ≤ ±80 px
const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8])    // ≤ ±8°
<motion.div style={reduceMotion ? undefined : { y, rotate }} />
```

Scroll-linked `style` values are not covered by `MotionConfig reducedMotion="user"`, so check
reduced motion explicitly. Pinned horizontal scroll (see `Moments`) runs on desktop only; on
touch, use a native `snap-x` carousel.

## 7. Slide transitions

Keep every slide in one CSS grid cell (`col-start-1 row-start-1`). The tallest slide sets the
height, so nothing jumps. Inactive slides are `inert` and `aria-hidden`. Drive them with variant
labels based on their position relative to the active slide:

```ts
state = i === active ? 'active' : i < active ? 'before' : 'after'
pack:  active { x: 0, rotate: -3, scale: 1, 0.8 s }  · before { x: -140, rotate: -14, scale: .92 } · after { x: 140, rotate: 10, scale: .92 }  (0.5 s)
copy:  active { x: 0, opacity: 1, 0.7 s }             · before/after { x: ∓40, opacity: 0, 0.35 s }
parent: active { opacity: 1, staggerChildren: 0.08, delayChildren: 0.1 }
```

Swipe is touch-only (`useDragControls`, started on non-mouse `pointerdown`, 60 px threshold).
Suppress the click that follows a swipe.

## 8. Background cross-fade

```tsx
<motion.section
  initial={false}
  animate={{ backgroundColor: current.bg }}
  transition={{ duration: 0.8, ease: 'easeInOut' }}
/>
```

This is the one place to use `easeInOut`. A full-surface colour change shouldn't snap.

## 9. Autoplay with progress

Drive the timer with the progress bar's CSS animation, so pausing the animation pauses the
timer exactly:

```tsx
<span
  style={{
    animation: `spotlight-progress ${AUTOPLAY_MS}ms linear forwards`,
    animationPlayState: running ? 'running' : 'paused',
  }}
  onAnimationEnd={() => goTo(active + 1)}
/>
// running = !reducedMotion && !userPaused && !hovered && !keyboardFocused && inView && !document.hidden
```

The interval is 4000 ms. Render the bar and the pause button only when autoplay is allowed (use
`usePrefersReducedMotion`, which is hydration-safe). Don't track automatic advances in analytics;
track only user-initiated ones (`spotlight_view` with `method`).

## 10. CSS-only above-the-fold entrance

Anything visible on first paint (hero headline, eyebrow, lede, CTAs) animates with keyframes,
so it starts before JavaScript loads and never sits hidden waiting for it:

```tsx
<span className="hero-word" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>…</span>
<p className="hero-fade" style={{ animationDelay: '0.75s' }}>…</p>
```

## 11. Reduced motion checklist

- `MotionConfig reducedMotion="user"` disables transform animations from Motion components.
- The global CSS rule clamps CSS animations and transitions to about 0 s.
- Lenis isn't started; the hero video is hidden (`motion-reduce:hidden`, poster shown instead).
- **You** must handle scroll-linked `style` values, autoplay, video and anything that loops in
  JavaScript.
- If the decision changes rendered markup, use `usePrefersReducedMotion()`, not Motion's
  `useReducedMotion()`, to avoid hydration mismatches.
