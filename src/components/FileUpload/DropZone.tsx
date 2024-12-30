import React from 'react';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export function DropZone({ onFileSelect, disabled }: DropZoneProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-blue-500 transition-colors">
      <Upload className="h-12 w-12 text-gray-400 mb-4" />
      <label className="block text-center cursor-pointer">
        <span className="text-gray-700">
          Drag & drop files here or click to browse
        </span>
        <input
          type="file"
          className="hidden"
          onChange={onFileSelect}
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          multiple
          disabled={disabled}
        />
      </label>
      <p className="mt-2 text-sm text-gray-500">
        PDF, DOC, PNG, or JPEG (max 10MB per file)
      </p>
    </div>
  );
}