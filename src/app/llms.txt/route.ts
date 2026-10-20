import { buildLlmsTxt } from '@/lib/llms'

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
