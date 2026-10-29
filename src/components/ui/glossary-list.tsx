import type { GlossaryTerm } from '@/data/glossary'
import { cn } from '@/lib/cn'

type Props = { terms: GlossaryTerm[]; className?: string }

/** Indian snack words with pronunciation and a plain-English meaning, as a definition list. */
export function GlossaryList({ terms, className }: Props) {
  return (
    <dl className={cn('grid gap-4 sm:grid-cols-2', className)}>
      {terms.map((t) => (
        <div key={t.term} className="rounded-3xl border border-forest/10 bg-paper p-6">
          <dt>
            <dfn className="font-display text-2xl font-bold text-forest not-italic">{t.term}</dfn>
            {t.say && <span className="ml-2 text-sm text-olive italic">{t.say}</span>}
          </dt>
          <dd className="mt-2 leading-relaxed text-muted">{t.meaning}</dd>
        </div>
      ))}
    </dl>
  )
}
