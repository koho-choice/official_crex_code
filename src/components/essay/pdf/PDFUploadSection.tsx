import React from 'react';
import { Upload } from 'lucide-react';

interface PDFUploadSectionProps {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export function PDFUploadSection({ onUpload, label }: PDFUploadSectionProps) {
  return (
    <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-500 transition-colors">
      <div className="flex flex-col items-center">
        <Upload className="h-12 w-12 text-gray-400 mb-4" />
        <label className="block text-center cursor-pointer">
          <span className="text-gray-700 font-medium">{label}</span>
          <input
            type="file"
            className="hidden"
            onChange={onUpload}
            accept="application/pdf"
          />
        </label>
        <p className="mt-2 text-sm text-gray-500">
          Upload PDF file
        </p>
      </div>
    </div>
  );
}