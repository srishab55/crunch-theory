import type { Thing, WithContext } from 'schema-dts'

type Props = { data: WithContext<Thing> | WithContext<Thing>[] }

/** Renders schema.org JSON-LD. `<` is escaped to prevent script-injection via content. */
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
