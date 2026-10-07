/**
 * Browser-safe cover upload: POST /files/presign → PUT MinIO → POST /files/confirm.
 * Use returned `fileId` as RecipeCreate.cover_file_id.
 */

import type {
  ConfirmRequest,
  FileResponse,
  PresignRequest,
  PresignResponse,
} from '@/app/lib/api/file-types'

export type {
  ConfirmRequest,
  FileResponse,
  PresignRequest,
  PresignResponse,
} from '@/app/lib/api/file-types'

const DEFAULT_API_URL = 'http://localhost:8000'

function getBrowserApiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || DEFAULT_API_URL
  )
}

export interface UploadRecipeCoverResult {
  fileId: string
  url: string
}

export async function uploadRecipeCover(
  file: File,
): Promise<UploadRecipeCoverResult> {
  const api = `${getBrowserApiBaseUrl()}/api/v1`
  const contentType = file.type || 'application/octet-stream'

  const presignBody: PresignRequest = {
    category: 'recipes',
    filename: file.name,
    content_type: contentType,
  }

  const presignRes = await fetch(`${api}/files/presign`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(presignBody),
  })

  if (!presignRes.ok) {
    throw new Error(`presign failed: ${presignRes.status}`)
  }

  const presign = (await presignRes.json()) as PresignResponse

  const putRes = await fetch(presign.upload_url, {
    method: 'PUT',
    headers: {
      ...presign.headers,
      'Content-Type': contentType,
    },
    body: file,
  })

  if (!putRes.ok) {
    throw new Error(`upload failed: ${putRes.status}`)
  }

  const confirmBody: ConfirmRequest = {
    file_id: presign.file_id,
    object_key: presign.object_key,
    original_filename: file.name,
    content_type: contentType,
    category: 'recipes',
  }

  const confirmRes = await fetch(`${api}/files/confirm`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(confirmBody),
  })

  if (!confirmRes.ok) {
    throw new Error(`confirm failed: ${confirmRes.status}`)
  }

  const confirmed = (await confirmRes.json()) as FileResponse

  return {
    fileId: String(confirmed.id),
    url: confirmed.url,
  }
}
