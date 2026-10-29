import { parseAccentWords, plainText } from '@/lib/accent-text'
import { cn } from '@/lib/cn'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'p'
  id?: string
  className?: string
  /** Seconds before the first word starts. */
  delay?: number
  /** Colour class for `*accent*` words. */
  accentClassName?: string
}

/**
 * Above-the-fold twin of RevealText: the same masked word-by-word reveal, but driven by the CSS
 * `hero-word` keyframes, so the heading paints before hydration and never holds back LCP.
 */
export function HeroText({
  text,
  as: Tag = 'h1',
  id,
  className,
  delay = 0,
  accentClassName = 'text-terracotta',
}: Props) {
  const words = parseAccentWords(text)
  return (
    <Tag id={id} className={className} aria-label={plainText(text)}>
      {words.map((word, i) => (
        <span
          key={`${word.text}-${i}`}
          aria-hidden="true"
          // Italic glyphs overhang their box; pad so the mask doesn't clip them.
          className={cn(
            'inline-block overflow-hidden pb-[0.08em] align-bottom',
            word.accent && '-mr-[0.08em] pr-[0.08em]',
          )}
        >
          <span
            className={cn('hero-word inline-block', word.accent && ['accent', accentClassName])}
            style={{ animationDelay: `${delay + i * 0.06}s` }}
          >
            {word.text}
            {i < words.length - 1 && ' '}
          </span>
        </span>
      ))}
    </Tag>
  )
}
