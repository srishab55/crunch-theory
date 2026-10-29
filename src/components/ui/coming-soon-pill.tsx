/** Small "Coming soon" label pinned to the top-left of a card or product photo. */
export function ComingSoonPill({ className = 'top-3 left-3' }: { className?: string }) {
  return (
    <span
      className={`absolute z-10 rounded-full bg-paper/90 px-3 py-1 text-[0.65rem] font-semibold tracking-wide text-forest uppercase shadow-sm backdrop-blur ${className}`}
    >
      Coming soon
    </span>
  )
}
