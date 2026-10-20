import { useId, type SVGProps } from 'react'

/** A single popped makhana seed, drawn to match the pouch's illustration style. */
export function Makhana({ className, ...props }: SVGProps<SVGSVGElement>) {
  const id = useId()
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} {...props}>
      <defs>
        <radialGradient id={`${id}-body`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#fffaf0" />
          <stop offset="55%" stopColor="#f1e4cb" />
          <stop offset="100%" stopColor="#d9c3a0" />
        </radialGradient>
      </defs>
      <path
        d="M50 7c11-1 19 5 25 9 8 4 15 11 17 21 3 10 1 20-3 28-4 9-10 17-19 22-9 5-20 6-30 3-10-3-18-10-23-19C12 63 9 53 11 43c2-10 8-19 16-25 7-6 14-10 23-11Z"
        fill={`url(#${id}-body)`}
      />
      <path
        d="M30 30c6 8 15 11 22 9M58 22c-2 9 2 17 10 21M24 56c9-2 17 2 22 9M55 58c7 1 14-2 19-8"
        fill="none"
        stroke="#c9ad83"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".55"
      />
      <g fill="#7a4e2e">
        <ellipse cx="40" cy="47" rx="3.2" ry="2.2" transform="rotate(-20 40 47)" />
        <ellipse cx="63" cy="35" rx="2.4" ry="1.6" transform="rotate(30 63 35)" />
        <ellipse cx="66" cy="66" rx="3" ry="2" transform="rotate(10 66 66)" />
        <ellipse cx="33" cy="72" rx="2" ry="1.4" />
        <ellipse cx="50" cy="20" rx="1.8" ry="1.2" />
      </g>
    </svg>
  )
}
