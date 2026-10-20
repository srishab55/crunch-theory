import Link from 'next/link'

import { JsonLd } from '@/components/seo/json-ld'
import { breadcrumbSchema } from '@/lib/seo'

export type Crumb = { name: string; path: string }

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: 'Home', path: '/' }, ...crumbs]
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {all.map((c, i) => {
          const last = i === all.length - 1
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-semibold text-forest">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.path} className="transition-colors hover:text-forest">
                    {c.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
      <JsonLd data={breadcrumbSchema(all)} />
    </nav>
  )
}
