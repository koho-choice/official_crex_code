export const API_CONFIG = {
  UPLOAD_ENDPOINT: 'https://crex-grader-d07366ace8fa.herokuapp.com/generate-presigned-post',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 50,
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/png',
    'image/jpeg'
  ] as const,
  UPLOAD_TIMEOUT: 30000,
};