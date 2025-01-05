import React, { useState, useCallback, useRef } from "react";

import { FileUpload } from "../components/FileUpload";

export function AcceptData() {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-center">
          Upload Your Files
        </h1>
        <div className="mt-12">
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
