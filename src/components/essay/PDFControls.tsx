import React from 'react';
import { ZoomIn, ZoomOut, Layout, Maximize2, FileText, Download } from 'lucide-react';

interface PDFControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  viewMode: 'single' | 'compare';
  onViewModeChange: (mode: 'single' | 'compare') => void;
  onToggleFocus: () => void;
  onGenerateReport: () => void;
}

export function PDFControls({
  zoom,
  onZoomIn,
  onZoomOut,
  viewMode,
  onViewModeChange,
  onToggleFocus,
  onGenerateReport,
}: PDFControlsProps) {
  return (
    <div className="bg-white border-b flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewModeChange('single')}
          className={`p-2 rounded ${viewMode === 'single' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
        >
          <FileText className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewModeChange('compare')}
          className={`p-2 rounded ${viewMode === 'compare' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
        >
          <Layout className="w-5 h-5" />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-2" />
        <button
          onClick={onZoomOut}
          className="p-2 rounded hover:bg-gray-100"
          disabled={zoom <= 0.5}
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-600">{Math.round(zoom * 100)}%</span>
        <button
          onClick={onZoomIn}
          className="p-2 rounded hover:bg-gray-100"
          disabled={zoom >= 2}
        >
          <ZoomIn className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleFocus}
          className="p-2 rounded hover:bg-gray-100"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
        <button
          onClick={onGenerateReport}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Download className="w-4 h-4" />
          Generate Report
        </button>
      </div>
    </div>
  );
}