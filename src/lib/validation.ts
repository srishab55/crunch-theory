import { z } from 'zod'

export const newsletterSchema = z.object({
  email: z.email('Please enter a valid email address.').max(254),
})

/** Contact topics — shared by the form's <select>, validation and the emails. */
export const contactTopics = [
  { value: 'general', label: 'General question' },
  { value: 'feedback', label: 'Product feedback' },
  { value: 'retail', label: 'Retail & wholesale' },
  { value: 'press', label: 'Press & collaborations' },
] as const

export type ContactTopic = (typeof contactTopics)[number]['value']

export const topicLabel = (value: ContactTopic) =>
  contactTopics.find((t) => t.value === value)?.label ?? 'General question'

const topicValues = contactTopics.map((t) => t.value) as [ContactTopic, ...ContactTopic[]]

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name.').max(80),
  email: z.email('Please enter a valid email address.').max(254),
  topic: z.enum(topicValues),
  message: z
    .string()
    .trim()
    .min(10, 'A few more words, please (10+ characters).')
    .max(2000, 'Please keep it under 2000 characters.'),
})

export type ContactInput = z.infer<typeof contactSchema>

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Partial<Record<string, string[]>>
}

export const initialFormState: FormState = { status: 'idle' }
