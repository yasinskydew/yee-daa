import 'server-only'

const DEFAULT_API_URL = 'http://localhost:8000'

function getApiBaseUrl(): string {
  return process.env.API_URL?.replace(/\/$/, '') || DEFAULT_API_URL
}

export async function apiFetch<T>(path: string): Promise<T | null> {
  const url = `${getApiBaseUrl()}/api/v1${path.startsWith('/') ? path : `/${path}`}`

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      next: {
        revalidate: 60,
        tags: ['categories'],
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
