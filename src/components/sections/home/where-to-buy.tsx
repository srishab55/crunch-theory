import Link from 'next/link'

import { MarketplaceTiles } from '@/components/flavour/marketplace-tiles'
import { OutsideIndiaNote } from '@/components/flavour/outside-india-note'
import { PouchFan } from '@/components/flavour/pouch-fan'
import { WatercolorBlob } from '@/components/illustrations/watercolor-blob'
import { Reveal, RevealText } from '@/components/ui/reveal'
import { SpinSticker } from '@/components/ui/spin-sticker'
import { InterestButton } from '@/components/flavour/interest-button'
import { ButtonLink } from '@/components/ui/button'
import { flavours } from '@/data/flavours'
import { isLive, NOTIFY_HREF } from '@/data/site'

const trialPrice = Math.min(...flavours.flatMap((f) => f.packs.map((p) => p.priceInr)))

export function WhereToBuy() {
  return (
    <section
      data-track-section="where-to-buy"
      id="where-to-buy"
      aria-labelledby="buy-title"
      className="grain relative isolate scroll-mt-20 overflow-hidden bg-forest-deep py-28 text-paper sm:py-36"
    >
      <WatercolorBlob
        color="var(--color-terracotta)"
        className="absolute -top-32 -left-40 -z-10 w-[36rem] opacity-15"
      />
      <WatercolorBlob
        color="var(--color-mustard)"
        variant={2}
        className="absolute -right-32 bottom-20 -z-10 w-[30rem] opacity-10"
      />

      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Reveal y={12}>
              <p className="eyebrow !text-mustard">Where to buy</p>
            </Reveal>
            <RevealText
              id="buy-title"
              text="Crunch, *lightning* fast."
              accentClassName="text-mustard"
              className="mt-4 text-5xl leading-[0.95] font-extrabold tracking-[-0.045em] text-paper sm:text-7xl"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/70">
                {isLive
                  ? 'Order on your favourite quick-commerce app and it’s at your desk before the meeting ends. Stocking up? Grab multipacks online.'
                  : 'We’re launching soon on your favourite quick-commerce apps — then it’s at your desk before the meeting ends. Tap “I’m interested” so we know you’re waiting.'}
              </p>
            </Reveal>
            {!isLive && (
              <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
                <InterestButton flavour="any" location="home-where-to-buy" tone="dark" />
                <ButtonLink
                  href={NOTIFY_HREF}
                  variant="light"
                  size="lg"
                  trackLabel="Get notified"
                  trackLocation="home-where-to-buy"
                >
                  Get notified at launch
                </ButtonLink>
              </Reveal>
            )}
            <Reveal delay={0.25} className="mt-10 flex items-center gap-5">
              <SpinSticker
                text="Try the trial pack • Roasted, not fried • "
                center={`₹${trialPrice}`}
              />
              <p className="max-w-[14rem] text-sm text-paper/60">
                New to makhana? Start with a 30 g trial pack of any flavour.
              </p>
            </Reveal>
          </div>
          <PouchFan />
        </div>

        <MarketplaceTiles
          flavour="makhana"
          location="home-where-to-buy"
          className="mt-14 lg:mt-20"
        />

        <p className="mt-8 text-center text-sm text-paper/50">
          {isLive ? 'Availability varies by city.' : 'Launching city by city.'}{' '}
          <Link
            href="/contact"
            className="font-semibold text-paper/80 underline underline-offset-4 hover:text-mustard"
          >
            {isLive ? 'Can’t find us near you?' : 'Want us in your city?'} Tell us your PIN code.
          </Link>
        </p>
        <OutsideIndiaNote tone="dark" className="mt-3 text-center" />
      </div>
    </section>
  )
}
