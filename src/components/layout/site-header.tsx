'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { isLive, navigation, NOTIFY_HREF } from '@/data/site'
import { cn } from '@/lib/cn'

import { Logo } from '../illustrations/logo'
import { ButtonLink } from '../ui/button'

export function SiteHeader() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 400 && y > previous && !menuOpen)
  })

  // Makhana's flavour pages (/flavours/*) sit under Products in the nav.
  const navPath = pathname.startsWith('/flavours') ? '/products' : pathname
  const isActive = (href: string) => navPath === href || navPath.startsWith(`${href}/`)

  return (
    <motion.header
      animate={{ y: hidden ? '-110%' : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5"
    >
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-[background-color,box-shadow,backdrop-filter] duration-500 sm:px-7',
          (scrolled || menuOpen) &&
            'bg-paper/80 shadow-[0_8px_30px_-12px_rgb(36_35_30/0.25)] backdrop-blur-xl',
        )}
      >
        <Link href="/" aria-label="Crunch Theory — home" onClick={() => setMenuOpen(false)}>
          <Logo eager className="text-[1.45rem] sm:text-[1.6rem]" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium text-ink/75 transition-colors hover:text-forest',
                    isActive(item.href) && 'text-forest',
                  )}
                >
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-sand/70"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={isLive ? '/flavours' : NOTIFY_HREF}
            className="hidden sm:inline-flex"
            trackLabel={isLive ? 'Shop now' : 'Get notified'}
            trackLocation="header"
          >
            {isLive ? 'Shop now' : 'Get notified'}
          </ButtonLink>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="relative block h-3 w-6">
              <span
                className={cn(
                  'absolute inset-x-0 top-0 h-0.5 rounded bg-forest transition-transform duration-300',
                  menuOpen && 'translate-y-[5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 h-0.5 rounded bg-forest transition-transform duration-300',
                  menuOpen && '-translate-y-[5px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl bg-paper/95 p-6 shadow-xl backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {[{ label: 'Home', href: '/' }, ...navigation].map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 font-display text-4xl font-extrabold tracking-[-0.04em] text-forest"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
