'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import { flavours, type Flavour } from '@/data/flavours'

// Each card's left edge sits at the container's centre, so x = -50% centres it; the fan
// offsets are ±27% and ±80% of a card's width around that.
const spread = [
  { rotate: -14, x: '-130%', y: 26 },
  { rotate: -5, x: '-77%', y: 0 },
  { rotate: 5, x: '-23%', y: 6 },
  { rotate: 14, x: '30%', y: 30 },
]

/** The lineup as a hand of cards: stacked at first, fanning out when scrolled into view. */
export function PouchFan() {
  const lineup = flavours
    .filter((f): f is Flavour & Required<Pick<Flavour, 'image'>> => Boolean(f.image))
    .slice(0, spread.length)

  return (
    <div className="relative mx-auto h-[13rem] w-full max-w-xl sm:h-[24rem]">
      {lineup.map((f, i) => (
        <motion.div
          key={f.slug}
          className="absolute top-6 left-1/2 w-[38%] sm:w-[42%]"
          style={{ zIndex: i === 1 || i === 2 ? 2 : 1 }}
          initial={{ rotate: 0, x: '-50%', y: 40, opacity: 0 }}
          whileInView={{ rotate: spread[i].rotate, x: spread[i].x, y: spread[i].y, opacity: 1 }}
          whileHover={{ y: spread[i].y - 28, rotate: spread[i].rotate * 0.6, zIndex: 5 }}
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 + i * 0.08 }}
        >
          <Link
            href={`/flavours/${f.slug}`}
            className="block overflow-hidden rounded-[1.6rem] shadow-[0_30px_50px_-20px_rgb(0_0_0/0.55)] ring-1 ring-paper/10"
          >
            <Image
              src={f.image}
              alt={`${f.name} pouch`}
              sizes="(min-width: 640px) 240px, 42vw"
              className="aspect-square w-full object-cover"
            />
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
