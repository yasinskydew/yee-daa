/**
 * API contracts for File / Presign / Confirm.
 * Source of truth: backend/app/schemas/file.py
 * Endpoints: POST /api/v1/files, /files/presign, /files/confirm,
 *            GET|DELETE /api/v1/files/{file_id}
 *
 * Errors: FastAPI ErrorResponse → { detail: string }
 *   400 empty / mismatch, 404 missing object or file,
 *   409 already confirmed, 413 too large
 */

/** Matches FileCategory enum */
export type FileCategory = 'recipes' | 'avatars' | 'general' | 'categories'

/** Matches PresignRequest */
export interface PresignRequest {
  category: FileCategory
  filename: string
  content_type: string
}

/** Matches PresignResponse */
export interface PresignResponse {
  file_id: string
  object_key: string
  upload_url: string
  public_url: string
  expires_in: number
  headers: Record<string, string>
}

/** Matches ConfirmRequest */
export interface ConfirmRequest {
  file_id: string
  object_key: string
  original_filename: string
  content_type: string
  category: FileCategory
}

/** Matches FileResponse */
export interface FileResponse {
  id: string
  object_key: string
  bucket: string
  original_filename: string
  content_type: string
  size: number
  category: FileCategory
  url: string
  etag: string | null
  created_at: string
  updated_at: string
}

/** FastAPI ErrorResponse body */
export interface ApiError {
  detail: string
}
