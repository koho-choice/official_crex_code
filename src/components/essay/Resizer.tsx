import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ResizerProps {
  onMouseDown: () => void;
}

export function Resizer({ onMouseDown }: ResizerProps) {
  return (
    <div
      className="w-4 bg-gray-200 hover:bg-blue-500 cursor-col-resize flex items-center justify-center group relative"
      onMouseDown={onMouseDown}
    >
      <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-blue-500/10" />
      <div className="flex flex-col gap-1">
        <ChevronLeft className="w-4 h-4 text-gray-500 group-hover:text-white" />
        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
      </div>
    </div>
  );
}