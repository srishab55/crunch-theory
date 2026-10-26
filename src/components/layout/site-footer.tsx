import Link from 'next/link'

import { flavours } from '@/data/flavours'
import { isLive, navigation, site } from '@/data/site'

import { NewsletterForm } from '../forms/newsletter-form'
import { Logo } from '../illustrations/logo'
import { Makhana } from '../illustrations/makhana'
import { CurrentYear } from '../ui/current-year'

export function SiteFooter() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-forest-deep text-paper">
      <Makhana className="absolute -top-16 -right-10 size-64 animate-spin-slow opacity-[0.07]" />

      <div className="container-page grid gap-14 py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo inverted className="text-4xl" />
          <p className="mt-6 max-w-sm text-paper/70">
            {site.tagline}. Roasted makhana with big crunch and honest labels — made in India.
          </p>
          <div id="newsletter" className="mt-8 scroll-mt-32">
            <p className="mb-3 text-sm font-semibold text-mustard">
              {isLive
                ? 'Snack news, new flavours, zero spam.'
                : 'Be first to know when we launch. Zero spam.'}
            </p>
            <NewsletterForm location="footer" inverted />
          </div>
        </div>

        <nav aria-label="Flavours" className="lg:col-span-3 lg:col-start-7">
          <h2 className="eyebrow !text-mustard">Flavours</h2>
          <ul className="mt-5 space-y-3">
            {flavours.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/flavours/${f.slug}`}
                  className="text-paper/75 transition-colors hover:text-paper"
                >
                  {f.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="lg:col-span-3">
          <h2 className="eyebrow !text-mustard">Company</h2>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/75 transition-colors hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            {site.email && (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-paper/75 transition-colors hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="container-page flex flex-col gap-4 border-t border-paper/10 py-8 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © <CurrentYear /> {site.legalName}. All rights reserved.
        </p>
        <ul className="flex gap-6">
          <li>
            <Link href="/privacy" className="hover:text-paper">
              Privacy
            </Link>
          </li>
          {Object.entries(site.social).map(([name, url]) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer me"
                className="capitalize hover:text-paper"
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Oversized wordmark — decorative */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.22em] text-center font-display text-[22vw] leading-none font-extrabold tracking-[-0.06em] text-paper/[0.05] select-none"
      >
        crunch
      </p>
    </footer>
  )
}
