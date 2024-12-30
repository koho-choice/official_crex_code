import React from 'react';
import { Logo } from '../components/Logo';
import { FileUpload } from '../components/FileUpload';

export function SpecialDemo() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Logo />
        
        <div className="mt-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Upload Your File
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Experience our advanced AI grading system firsthand
          </p>
        </div>

        <div className="mt-12">
          <FileUpload />
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>This is a demonstration of our file upload system.</p>
          <p>In production, files are securely processed through our AI grading pipeline.</p>
        </div>
      </div>
    </div>
  );
}