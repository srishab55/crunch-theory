import { Makhana } from '@/components/illustrations/makhana'
import { ButtonLink } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[80vh] place-items-center pt-32 pb-20 text-center">
      <div>
        <Makhana className="mx-auto size-28 animate-float" />
        <p className="mt-8 eyebrow">404</p>
        <h1 className="mt-4 text-5xl sm:text-6xl">This page got eaten.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          We couldn’t find what you were looking for — but the snacks are right where we left them.
        </p>
        <ButtonLink href="/flavours" size="lg" className="mt-10">
          Browse flavours
        </ButtonLink>
      </div>
    </section>
  )
}
