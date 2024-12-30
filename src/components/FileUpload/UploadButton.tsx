import React from 'react';
import { Loader2 } from 'lucide-react';

interface UploadButtonProps {
  isUploading: boolean;
  fileCount: number;
  disabled: boolean;
}

export function UploadButton({ isUploading, fileCount, disabled }: UploadButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center gap-2
        ${disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
        } transition-colors`}
    >
      {isUploading && <Loader2 className="h-5 w-5 animate-spin" />}
      {isUploading 
        ? 'Uploading...' 
        : `Upload ${fileCount} ${fileCount === 1 ? 'File' : 'Files'}`}
    </button>
  );
}