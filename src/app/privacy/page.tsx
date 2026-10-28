import Link from 'next/link'

import { PageHero } from '@/components/layout/page-hero'
import { site } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description:
    'How Crunch Theory collects, uses and protects your data, including analytics cookies.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        lede="Short version: we collect as little as possible, we never sell your data, and you can opt out of analytics at any time."
        crumbs={[{ name: 'Privacy', path: '/privacy' }]}
      />
      <article className="container-page max-w-3xl space-y-8 pb-28 text-lg leading-relaxed text-muted [&_h2]:text-3xl [&_h2]:text-forest">
        <section>
          <h2>Analytics and ad measurement</h2>
          <p className="mt-3">
            With your consent we use Google Analytics 4 to understand which pages and products
            visitors find useful, and Google Ads conversion tracking to measure whether our ads lead
            to sign-ups, messages or product interest. We don’t use ad personalisation or
            remarketing, and we never sell your data.
          </p>
          <p className="mt-3">
            Without consent, analytics and advertising cookies stay off and Google only receives
            anonymous, cookieless signals (Google Consent Mode v2). When you tap “I’m interested”,
            we record an anonymous count for that flavour — no cookie, no account, and your IP
            address isn’t passed on. You can change your choice anytime via “Cookie settings” in the
            footer.
          </p>
          <p className="mt-3">
            We also use Vercel Web Analytics to count page views. It uses no cookies, doesn’t track
            you across sites and only reports aggregated numbers, so it runs without consent.
          </p>
        </section>
        <section>
          <h2>Forms</h2>
          <p className="mt-3">
            When you join our newsletter or contact us, we use your name and email only to reply or
            send the emails you asked for. You can unsubscribe at any time.
          </p>
        </section>
        <section>
          <h2>Your rights</h2>
          <p className="mt-3">
            Under India’s Digital Personal Data Protection Act, 2023, you can ask us to access,
            correct or erase your data.{' '}
            {site.email ? (
              <>
                Email{' '}
                <a className="text-forest underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
              </>
            ) : (
              <>
                Write to us through the{' '}
                <Link className="text-forest underline" href="/contact">
                  contact form
                </Link>
                .
              </>
            )}
          </p>
        </section>
      </article>
    </>
  )
}
