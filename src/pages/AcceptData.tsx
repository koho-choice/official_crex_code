import React, { useState, useCallback, useRef } from "react";

import { FileUpload } from "../components/FileUpload";

export function AcceptData() {
  const [mode, setMode] = useState("essay");

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-center">
          Upload Your Files!
        </h1>
        <div className="mt-12">
          <label
            htmlFor="modeSelect"
            className="block text-sm font-medium text-gray-700"
          >
            Select Mode:
          </label>
          <select
            id="modeSelect"
            value={mode}
            onChange={handleModeChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="essay">Essay</option>
            <option value="assignment">Assignment</option>
          </select>
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
