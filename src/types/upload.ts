export interface PresignedPost {
  url: string;
  fields: {
    acl: string;
    key: string;
    AWSAccessKeyId: string;
    policy: string;
    signature: string;
  };
}

export interface FileWithStatus {
  file: File;
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
  error?: string;
}

export interface UploadState {
  files: Map<string, FileWithStatus>;
  isUploading: boolean;
  globalError: string;
}