import 'server-only'

import { z } from 'zod'

import { contactTopics, type ContactTopic } from './forms'

export const newsletterSchema = z.object({
  email: z.email('Please enter a valid email address.').max(254),
  /** Only on the international waitlist; tells us where demand is. */
  country: z.string().trim().max(60).optional(),
})

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
