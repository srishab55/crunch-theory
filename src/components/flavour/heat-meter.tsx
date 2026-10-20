import { cn } from '@/lib/cn'

const labels = ['No heat', 'Mild', 'Medium', 'Hot'] as const

export function HeatMeter({ level, className }: { level: 0 | 1 | 2 | 3; className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={cn('h-1.5 w-5 rounded-full', n <= level ? 'bg-terracotta' : 'bg-forest/10')}
          />
        ))}
      </span>
      <span className="text-xs font-semibold tracking-wide text-muted uppercase">
        {labels[level]}
      </span>
    </div>
  )
}
