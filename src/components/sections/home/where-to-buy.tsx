import { BuyLinks } from '@/components/flavour/buy-links'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/ui/section-heading'

export function WhereToBuy() {
  return (
    <section id="where-to-buy" aria-labelledby="buy-title" className="scroll-mt-24 py-28 sm:py-36">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-sand/60 px-6 py-16 sm:px-14 sm:py-20">
          <SectionHeading
            eyebrow="Where to buy"
            title="At your door in ten minutes."
            lede="Find Crunch Theory on your favourite quick-commerce and grocery apps. Not sure yet? Start with a ₹49 trial pack."
            align="center"
          />
          <Reveal delay={0.2} className="mt-12">
            <BuyLinks flavour="makhana" location="home-where-to-buy" className="justify-center" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
