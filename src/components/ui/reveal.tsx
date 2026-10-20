'use client'

import { motion, type HTMLMotionProps } from 'motion/react'

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
}

/** Word-by-word masked reveal for headings. The full string stays in the DOM for crawlers. */
export function RevealText({ text, id, as = 'h2', className, delay = 0 }: TextProps) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '105%' }, visible: { y: 0 } }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
