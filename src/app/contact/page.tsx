import { ContactForm } from '@/components/forms/contact-form'
import { PageHero } from '@/components/layout/page-hero'
import { Reveal } from '@/components/ui/reveal'
import { site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Crunch Theory for product questions, feedback, blind taste tests at your office or campus, retail and wholesale enquiries, or press.',
  path: '/contact',
})

const reasons = [
  { title: 'Taste tests', body: 'Book a blind crunch test for your office, gym or campus.' },
  {
    title: 'Retail & wholesale',
    body: 'Stock Crunch Theory in your store, café or vending machines.',
  },
  { title: 'Feedback', body: 'Loved it? Hated it? Tell us — it shapes the next flavour.' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say *hello.*"
        lede={
          site.email
            ? `Email ${site.email} or use the form — we reply within two working days.`
            : 'Send us a message with the form — a real person replies within two working days.'
        }
        crumbs={[{ name: 'Contact', path: '/contact' }]}
      />
      <section className="container-page grid gap-16 pb-28 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08} className="rounded-[2rem] bg-paper p-7">
              <h2 className="text-2xl">{r.title}</h2>
              <p className="mt-2 text-muted">{r.body}</p>
            </Reveal>
          ))}
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="block font-display text-2xl font-bold text-olive underline underline-offset-8"
            >
              {site.email}
            </a>
          )}
        </div>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <ContactForm />
        </Reveal>
      </section>
    </>
  )
}
