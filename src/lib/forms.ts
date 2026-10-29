/**
 * Form shapes shared by client forms and server actions. Deliberately free of zod, so the
 * validation library stays on the server (see validation.ts) instead of shipping to every page.
 */

/** Contact topics — shared by the form's <select>, validation and the emails. */
export const contactTopics = [
  { value: 'general', label: 'General question' },
  { value: 'feedback', label: 'Product feedback' },
  { value: 'retail', label: 'Retail & wholesale' },
  { value: 'international', label: 'International & distribution' },
  { value: 'press', label: 'Press & collaborations' },
] as const

export type ContactTopic = (typeof contactTopics)[number]['value']

export const topicLabel = (value: ContactTopic) =>
  contactTopics.find((t) => t.value === value)?.label ?? 'General question'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<string, string[]>>
}

export const initialFormState: FormState = { status: 'idle' }
