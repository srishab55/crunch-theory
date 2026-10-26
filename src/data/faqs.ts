import { isLive } from './site'

export type Faq = {
  question: string
  /** Answer-first: the first sentence should fully answer the question on its own. */
  answer: string
  category: 'Product' | 'Nutrition' | 'Buying' | 'Brand'
}

export const faqs: Faq[] = [
  {
    category: 'Product',
    question: 'What is makhana?',
    answer:
      'Makhana is the popped seed of the Euryale fox lotus, also called fox nut or lotus seed. It is harvested mainly in Bihar, India, then sun-dried and popped. Crunch Theory slow-roasts it in a little oil so it turns light, crisp and ready to season.',
  },
  {
    category: 'Product',
    question: 'Is Crunch Theory makhana fried?',
    answer:
      'No. Every Crunch Theory pack is roasted, never deep-fried. We use a small amount of rice bran oil so the seasoning sticks, which is why our fat content is a fraction of typical fried namkeen.',
  },
  {
    category: 'Nutrition',
    question: 'Is roasted makhana healthier than chips?',
    answer:
      'Roasted makhana is generally a lighter choice than fried potato chips: it is roasted instead of fried, naturally gluten-free and contains fibre. We do not claim it is a weight-loss food — it is a better everyday snack that still tastes like a treat. Compare the nutrition table on each flavour page with your usual snack.',
  },
  {
    category: 'Nutrition',
    question: 'Is Crunch Theory gluten-free?',
    answer:
      'Yes. Makhana is naturally gluten-free and none of our seasonings contain wheat. Our packs are made in a facility that also handles nuts, sesame and milk, so please check the allergen line on each flavour if you have severe allergies.',
  },
  {
    category: 'Nutrition',
    question: 'How much protein does makhana have?',
    answer:
      'A 30 g serving contains roughly 3 g of protein. That makes it a satisfying snack, but not a replacement for a protein shake — we would rather tell you the real number than oversell it.',
  },
  {
    category: 'Nutrition',
    question: 'How many calories are in a pack?',
    answer:
      'A 30 g trial pack is about 118 kcal. The exact energy, fat and sodium for each flavour are listed per serving and per 100 g on its flavour page and on the back of the pack.',
  },
  {
    category: 'Product',
    question: 'Will my kids actually eat it?',
    answer:
      'Most likely — Cheese & Herbs is our most kid-approved flavour. It tastes familiar, has no chilli heat and fits a lunchbox in the 30 g pack.',
  },
  {
    category: 'Buying',
    question: 'Where can I buy Crunch Theory?',
    answer: isLive
      ? 'You can buy Crunch Theory on Amazon, Blinkit, Zepto, Swiggy Instamart and BigBasket. Every flavour page has direct buy links for each store.'
      : 'Crunch Theory isn’t on sale yet — we’re launching soon on Blinkit, Zepto, Swiggy Instamart, Amazon and BigBasket. Join the newsletter to hear the day it goes live, or tap “I’m interested” on your favourite flavour.',
  },
  {
    category: 'Buying',
    question: 'Why is healthy snacking more expensive?',
    answer:
      'Makhana is hand-harvested from ponds and roasting takes longer than frying, so it costs more to make. To keep it fair we offer ₹49 trial packs and multipacks that bring the price per serving down for everyday snacking.',
  },
  {
    category: 'Brand',
    question: 'Who is Crunch Theory for?',
    answer:
      'Crunch Theory is for anyone who loves to snack but wants better everyday choices — the desk snacker, the label reader, the busy parent and the student on a budget. It is not a diet product; it is a snack you will actually look forward to.',
  },
  {
    category: 'Brand',
    question: 'How do I know your claims are true?',
    answer:
      'We only print claims we can back up, and every flavour page lists the full ingredients, allergens, serving size and nutrition values. If anything is unclear, email us and we will answer within two working days.',
  },
]
