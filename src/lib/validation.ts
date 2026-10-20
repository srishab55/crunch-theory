import { z } from 'zod'

export const newsletterSchema = z.object({
  email: z.email('Please enter a valid email address.').max(254),
})

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name.').max(80),
  email: z.email('Please enter a valid email address.').max(254),
  topic: z.enum(['general', 'retail', 'feedback', 'press']),
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
