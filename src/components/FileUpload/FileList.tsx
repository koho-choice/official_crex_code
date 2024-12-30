import React from 'react';
import { X } from 'lucide-react';
import type { FileWithStatus } from '../../types/upload';

interface FileListProps {
  files: Map<string, FileWithStatus>;
  onRemove: (filename: string) => void;
  isUploading: boolean;
}

export function FileList({ files, onRemove, isUploading }: FileListProps) {
  return (
    <div className="space-y-2">
      {Array.from(files.entries()).map(([filename, fileData]) => (
        <div key={filename} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div className="flex-1 mr-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600 truncate">{filename}</span>
              {!isUploading && (
                <button
                  type="button"
                  onClick={() => onRemove(filename)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="w-full h-1 bg-gray-200 rounded-full">
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  fileData.status === 'error' ? 'bg-red-500' :
                  fileData.status === 'success' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}
                style={{ width: `${fileData.progress}%` }}
              />
            </div>
            {fileData.error && (
              <p className="text-xs text-red-500 mt-1">{fileData.error}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}