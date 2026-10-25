import Image from 'next/image'

import mark from '@/assets/brand/mark.png'
import wordmarkLight from '@/assets/brand/wordmark-light.png'
import wordmark from '@/assets/brand/wordmark.png'
import { cn } from '@/lib/cn'

type Props = { className?: string; inverted?: boolean; eager?: boolean }

// Intrinsic render sizes (CSS px at 1×); next/image adds a 2× variant. Large enough for the footer.
const MARK_H = 72
const WORDMARK_H = 48
const widthFor = (img: { width: number; height: number }, h: number) =>
  Math.round((h * img.width) / img.height)

/**
 * Brand lockup: the "ct" bite mark + "CRUNCH THEORY" wordmark (artwork from content/logo/, built
 * by `npm run logo`). Sized in `em`, so set its size with a text-* class. On hover (or when its
 * link is keyboard-focused) the mark does a small "crunch" wiggle — see globals.css.
 */
export function Logo({ className, inverted = false, eager = false }: Props) {
  const loading = eager ? 'eager' : 'lazy'
  return (
    <span className={cn('logo inline-flex items-center gap-[0.3em] leading-none', className)}>
      <Image
        src={mark}
        alt=""
        width={widthFor(mark, MARK_H)}
        height={MARK_H}
        loading={loading}
        className="logo-mark h-[1.75em] w-auto shrink-0"
      />
      <Image
        src={inverted ? wordmarkLight : wordmark}
        alt=""
        width={widthFor(wordmark, WORDMARK_H)}
        height={WORDMARK_H}
        loading={loading}
        className="h-[1.35em] w-auto"
      />
      <span className="sr-only">Crunch Theory</span>
    </span>
  )
}
