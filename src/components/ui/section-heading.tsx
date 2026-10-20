import { cn } from '@/lib/cn'

import { Reveal, RevealText } from './reveal'

type Props = {
  eyebrow: string
  title: string
  lede?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  inverted?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  as = 'h2',
  inverted = false,
  className,
}: Props) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal y={12}>
        <p className={cn('eyebrow', inverted && 'text-mustard')}>{eyebrow}</p>
      </Reveal>
      <RevealText
        as={as}
        text={title}
        className={cn(
          'mt-4 text-4xl leading-[1.02] font-medium tracking-tight sm:text-5xl lg:text-6xl',
          inverted && 'text-paper',
        )}
      />
      {lede && (
        <Reveal delay={0.15}>
          <p className={cn('mt-6 text-lg leading-relaxed text-muted', inverted && 'text-paper/75')}>
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  )
}
