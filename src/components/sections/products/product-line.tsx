import Image from 'next/image'

import { InterestButton } from '@/components/flavour/interest-button'
import { WatercolorBlob } from '@/components/illustrations/watercolor-blob'
import { ButtonLink } from '@/components/ui/button'
import { Reveal, RevealText } from '@/components/ui/reveal'
import type { Tone } from '@/data/home'
import type { ProductLine } from '@/data/products'
import { NOTIFY_HREF } from '@/data/site'
import { cn } from '@/lib/cn'

const blobColor: Record<Tone, string> = {
  sage: 'var(--color-sage)',
  mustard: 'var(--color-mustard)',
  terracotta: 'var(--color-terracotta)',
}

const stickerColor: Record<Tone, string> = {
  sage: 'bg-sage text-forest-deep',
  mustard: 'bg-mustard text-forest-deep',
  terracotta: 'bg-terracotta text-paper',
}

type Props = {
  line: ProductLine
  index: number
  /** Load the photo eagerly (the first row sits near the fold). */
  eager?: boolean
}

/**
 * One product line on /products: the pack photo with a sticker, then the story, callouts and a
 * CTA. Rows alternate sides on desktop; on mobile the photo always comes first.
 */
export function ProductLineRow({ line, index, eager }: Props) {
  const flip = index % 2 === 1
  const titleId = `${line.slug}-title`

  return (
    <section
      id={line.slug}
      aria-labelledby={titleId}
      className="container-page scroll-mt-28 py-14 sm:py-20"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal
          className={cn(
            'relative isolate lg:col-span-5 lg:row-start-1',
            flip ? 'lg:col-start-8' : 'lg:col-start-1',
          )}
        >
          <WatercolorBlob
            color={blobColor[line.tone]}
            variant={(index % 3) as 0 | 1 | 2}
            className="absolute -top-12 -left-12 -z-10 w-[115%] opacity-50"
          />
          <div className="overflow-hidden rounded-[2rem] shadow-[0_20px_50px_-30px_rgb(36_35_30/0.4)]">
            <Image
              src={line.image}
              alt={line.imageAlt}
              sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              loading={eager ? 'eager' : undefined}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          {!line.live && (
            <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-forest uppercase shadow-sm backdrop-blur">
              Coming soon
            </span>
          )}
          <span
            className={cn(
              'absolute -top-4 right-5 -rotate-6 rounded-full px-4 py-2 font-display text-sm font-bold tracking-tight shadow-[0_10px_30px_-12px_rgb(36_35_30/0.45)] sm:text-base',
              stickerColor[line.tone],
            )}
          >
            {line.sticker}
          </span>
        </Reveal>

        <div
          className={cn('lg:col-span-6 lg:row-start-1', flip ? 'lg:col-start-1' : 'lg:col-start-7')}
        >
          <Reveal y={12}>
            <p className="eyebrow">
              {String(index + 1).padStart(2, '0')} · {line.method}
            </p>
          </Reveal>
          <RevealText
            as="h2"
            id={titleId}
            text={line.title}
            className="mt-4 text-4xl leading-[0.98] font-extrabold tracking-[-0.035em] sm:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{line.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
              {line.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border border-forest/15 bg-paper px-3.5 py-1.5 text-sm font-semibold text-forest"
                >
                  {h}
                </li>
              ))}
            </ul>

            <dl className="mt-8 grid max-w-xl grid-cols-[1fr_auto] items-end gap-6 border-t border-forest/10 pt-6">
              <div>
                <dt className="text-sm text-muted">
                  {line.flavours.length > 1 ? 'Flavours' : 'Flavour'}
                </dt>
                <dd className="mt-1 font-semibold text-forest">{line.flavours.join(' · ')}</dd>
              </div>
              <div className="text-right">
                <dt className="text-sm text-muted">From</dt>
                <dd className="font-display text-3xl font-extrabold tracking-[-0.04em] text-forest">
                  ₹{line.fromPriceInr}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              {line.href ? (
                <ButtonLink
                  href={line.href}
                  size="lg"
                  trackLabel={`Explore ${line.name}`}
                  trackLocation="products-page"
                >
                  Explore the {line.flavours.length} flavours
                </ButtonLink>
              ) : (
                !line.live && (
                  <>
                    <InterestButton flavour={line.slug} location="products-page" />
                    <a
                      href={NOTIFY_HREF}
                      className="text-sm font-semibold text-forest underline underline-offset-4 hover:text-forest-deep"
                    >
                      Get notified at launch
                    </a>
                  </>
                )
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
