/** Heading copy with `*accent*` markup, shared by RevealText (Motion) and HeroText (CSS). */

export type AccentWord = { text: string; accent: boolean }

/** Splits a heading into words; `*wrapped*` words (one or several) get the accent style. */
export function parseAccentWords(text: string): AccentWord[] {
  let inAccent = false
  return text.split(' ').map((raw) => {
    const opens = raw.startsWith('*')
    const closes = /\*[^*]*$/.test(opens ? raw.slice(1) : raw)
    const accent = inAccent || opens
    inAccent = (inAccent || opens) && !closes
    return { text: raw.replaceAll('*', ''), accent }
  })
}

/** Strips accent markers, e.g. for aria-labels and metadata. */
export const plainText = (text: string) => text.replaceAll('*', '')
