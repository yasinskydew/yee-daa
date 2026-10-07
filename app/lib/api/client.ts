import 'server-only'

const DEFAULT_API_URL = 'http://localhost:8000'

export interface ApiFetchOptions {
  tags?: string[]
  searchParams?: Record<string, string | number | boolean | null | undefined>
  revalidate?: number
}

function getApiBaseUrl(): string {
  return process.env.API_URL?.replace(/\/$/, '') || DEFAULT_API_URL
}

function buildUrl(
  path: string,
  searchParams?: ApiFetchOptions['searchParams'],
): string {
  const base = `${getApiBaseUrl()}/api/v1${path.startsWith('/') ? path : `/${path}`}`
  if (!searchParams) return base

  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(searchParams)) {
    if (value === null || value === undefined) continue
    params.set(key, String(value))
  }
  const qs = params.toString()
  return qs ? `${base}?${qs}` : base
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T | null> {
  const url = buildUrl(path, options.searchParams)
  const revalidate = options.revalidate ?? 60
  const tags = options.tags

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate,
        ...(tags && tags.length > 0 ? { tags } : {}),
      },
    })

    if (!response.ok) {
      console.error(`[apiFetch] ${response.status} ${url}`)
      return null
    }

    return (await response.json()) as T
  } catch (error) {
    console.error(`[apiFetch] failed ${url}`, error)
    return null
  }
}
