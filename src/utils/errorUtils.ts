import { AxiosError } from 'axios';

export interface UploadError extends Error {
  fileName?: string;
  status?: number;
}

export function createUploadError(
  message: string,
  fileName?: string,
  status?: number
): UploadError {
  const error: UploadError = new Error(message);
  error.fileName = fileName;
  error.status = status;
  return error;
}

export function isUploadError(error: unknown): error is UploadError {
  return error instanceof Error && 'fileName' in error;
}