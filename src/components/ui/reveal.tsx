'use client'

import { motion, type HTMLMotionProps } from 'motion/react'

import { parseAccentWords, plainText } from '@/lib/accent-text'
import { cn } from '@/lib/cn'

type Props = HTMLMotionProps<'div'> & {
  delay?: number
  /** Distance in px the element travels while fading in. */
  y?: number
}

/** Fades and lifts children into view once, when they enter the viewport. */
export function Reveal({ delay = 0, y = 28, children, ...props }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type TextProps = {
  text: string
  id?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
  /** Colour class for `*accent*` words; override on dark or terracotta backgrounds. */
  accentClassName?: string
}

/**
 * Word-by-word masked reveal for headings. The full string stays in the DOM for crawlers.
 * Wrap words in asterisks to highlight them: "Four flavours. *Zero* boring."
 */
export function RevealText({
  text,
  id,
  as = 'h2',
  className,
  delay = 0,
  accentClassName = 'text-terracotta',
}: TextProps) {
  const Tag = motion[as]
  const words = parseAccentWords(text)
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={plainText(text)}
    >
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
          <motion.span
            className={cn('inline-block', word.accent && ['accent', accentClassName])}
            variants={{ hidden: { y: '105%' }, visible: { y: 0 } }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {word.text}
            {i < words.length - 1 && '\u00a0'}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
