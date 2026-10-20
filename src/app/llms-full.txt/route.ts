import { buildLlmsFullTxt } from '@/lib/llms'

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
