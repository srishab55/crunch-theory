import type { Faq } from '@/data/faqs'

/**
 * Native <details> accordion: answers stay in the HTML (crawlable by search & AI engines) and
 * work without JavaScript. Opening animates via the CSS `::details-content` transition.
 * Server-rendered; `faq_open` is tracked by FaqOpenTracker via the `data-faq` attribute.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-forest/10 border-y border-forest/10">
      {items.map((faq) => (
        <details key={faq.question} name="faq" className="faq group py-2" data-faq={faq.question}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display text-xl text-forest sm:text-2xl">{faq.question}</h3>
            <span
              aria-hidden="true"
              className="relative grid size-10 shrink-0 place-items-center rounded-full border border-forest/20 transition-[transform,background-color] duration-500 ease-out-expo group-open:rotate-45 group-open:bg-forest group-open:text-paper"
            >
              <span className="absolute h-px w-4 bg-current" />
              <span className="absolute h-4 w-px bg-current" />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-lg leading-relaxed text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
