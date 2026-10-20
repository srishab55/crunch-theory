import { Fragment, type CSSProperties } from 'react'

import { cn } from '@/lib/cn'

import { Makhana } from '../illustrations/makhana'

type Props = { items: readonly string[]; className?: string; durationSeconds?: number }

/** Infinite CSS marquee. Items are duplicated once so the loop is seamless at -50%. */
export function Marquee({ items, className, durationSeconds = 30 }: Props) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <Fragment key={item}>
          <li className="font-display text-2xl whitespace-nowrap italic sm:text-4xl">{item}</li>
          <li aria-hidden="true">
            <Makhana className="size-8 sm:size-10" />
          </li>
        </Fragment>
      ))}
    </ul>
  )

  return (
    <div
      className={cn('group flex overflow-hidden', className)}
      style={{ '--marquee-duration': `${durationSeconds}s` } as CSSProperties}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
