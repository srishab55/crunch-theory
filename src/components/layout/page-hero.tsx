import { HeroText } from '@/components/ui/hero-text'
import { WatercolorBlob } from '@/components/illustrations/watercolor-blob'

import { Breadcrumbs, type Crumb } from './breadcrumbs'

type Props = { eyebrow: string; title: string; lede: string; crumbs: Crumb[] }

/**
 * Shared header for inner pages: breadcrumbs, single H1 and an answer-first summary paragraph.
 * Above the fold, so it animates with CSS (HeroText / hero-fade), not Motion: it paints before
 * hydration and never delays LCP.
 */
export function PageHero({ eyebrow, title, lede, crumbs }: Props) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <WatercolorBlob
        color="var(--color-mustard)"
        className="absolute -top-24 -right-24 -z-10 w-[28rem] opacity-50"
      />
      <WatercolorBlob
        color="var(--color-sage)"
        variant={2}
        className="absolute top-40 -left-32 -z-10 w-80 opacity-40"
      />
      <div className="container-page">
        <Breadcrumbs crumbs={crumbs} />
        <p className="mt-10 eyebrow">{eyebrow}</p>
        <HeroText
          text={title}
          className="mt-4 max-w-4xl text-5xl leading-[0.98] font-extrabold tracking-[-0.04em] sm:text-7xl"
        />
        <p
          className="hero-fade mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          style={{ animationDelay: '0.15s' }}
        >
          {lede}
        </p>
      </div>
    </section>
  )
}
