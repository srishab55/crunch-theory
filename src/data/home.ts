/**
 * Copy for the landing page, derived from the brand strategy deck
 * (reference/Crunch Theory Personas, Tribes & Customer Journey.pptx).
 */

export const proofPoints = [
  'Roasted, not fried',
  'Gluten-free',
  '100% natural ingredients',
  'No palm oil',
  'Made in India',
] as const

/** "Central insight" from the deck: taste → trust → convenience → habit. */
export const theorySteps = [
  {
    step: '01',
    title: 'Taste earns the first bite',
    body: 'If it doesn’t taste great, nothing else matters. We lead with crunch and flavour — then back it up with nutrition.',
  },
  {
    step: '02',
    title: 'Trust earns the purchase',
    body: 'Six-ish ingredients, real serving sizes and nutrition you can read in five seconds. No miracle claims. Ever.',
  },
  {
    step: '03',
    title: 'Convenience builds the habit',
    body: 'Trial packs for your bag, pouches for your desk, multipacks for the pantry — delivered in 10 minutes.',
  },
  {
    step: '04',
    title: 'Satisfaction brings you back',
    body: 'A snack you look forward to, not one you settle for. That’s the whole theory.',
  },
] as const

export const stats = [
  { value: 0, suffix: '', label: 'Deep-fryers used', note: 'Slow-roasted in small batches' },
  { value: 118, suffix: ' kcal', label: 'Per 30 g serving', note: 'Indicative, varies by flavour' },
  { value: 94, suffix: '%', label: 'Want healthy and tasty', note: 'IBEF, 2025 consumer study' },
  { value: 6, suffix: '', label: 'Simple ingredients', note: 'In our Pink Salt & Pepper' },
] as const

export type Tone = 'sage' | 'mustard' | 'terracotta'

export type Moment = {
  time: string
  title: string
  body: string
  persona: string
  tone: Tone
  /** Lifestyle photo in /public (see docs/IMAGE_PROMPTS.md). Illustrated card when absent. */
  image?: string
}

/**
 * Snacking moments — one per persona in the strategy deck. Keep them in the order of a day
 * (morning → late night) so the horizontal scroll reads like a timeline.
 */
export const moments: Moment[] = [
  {
    time: '7:45 am',
    title: 'The lunchbox pack',
    body: 'Cheese & Herbs in a 30 g pack. Comes back empty, every time.',
    persona: 'For the family planner',
    tone: 'terracotta',
  },
  {
    time: '11:30 am',
    title: 'Between meetings',
    body: 'Clean label, nice pouch, credible numbers. Snacking that fits the calendar.',
    persona: 'For the label reader',
    tone: 'mustard',
  },
  {
    time: '4:00 pm',
    title: 'The desk slump',
    body: 'Swap the biscuit packet for something with crunch you won’t regret at 6.',
    persona: 'For the guilty snacker',
    tone: 'sage',
  },
  {
    time: '7:30 pm',
    title: 'After the gym',
    body: 'Exact serving sizes and honest macros, so it fits your plan.',
    persona: 'For the optimiser',
    tone: 'mustard',
  },
  {
    time: '1:00 am',
    title: 'Assignment o’clock',
    body: '₹49 trial packs. Bold flavours worth passing around the room.',
    persona: 'For the student',
    tone: 'sage',
  },
]
