import React, { useState, useRef } from 'react';
import { PDFControls } from './PDFControls';
import { PDFHighlight } from './pdf/PDFHighlight';
import { PDFUploadSection } from './pdf/PDFUploadSection';
import type { FeedbackItem } from '../../types/feedback';

interface PDFViewerProps {
  submission1Url: string | null;
  submission2Url: string | null;
  onUpload: (submissionNumber: 1 | 2) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  activeHighlight: FeedbackItem['highlight'] | null;
}

export function PDFViewer({ 
  submission1Url, 
  submission2Url, 
  onUpload,
  activeHighlight 
}: PDFViewerProps) {
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');
  const [focusMode, setFocusMode] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleViewModeChange = (mode: 'single' | 'compare') => setViewMode(mode);
  const handleToggleFocus = () => setFocusMode(prev => !prev);

  const scrollToHighlight = (highlight: FeedbackItem['highlight'] | null) => {
    if (!highlight || !pdfContainerRef.current) return;

    const container = pdfContainerRef.current;
    const scrollTop = (container.scrollHeight * highlight.coordinates.y) / 100;
    container.scrollTo({
      top: scrollTop - container.clientHeight / 2,
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    if (activeHighlight) {
      scrollToHighlight(activeHighlight);
    }
  }, [activeHighlight]);

  const renderPDF = (url: string | null, uploadHandler: (e: React.ChangeEvent<HTMLInputElement>) => void, label: string) => (
    url ? (
      <div 
        ref={pdfContainerRef}
        className="w-full h-full overflow-auto relative"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
      >
        <embed
          src={url}
          type="application/pdf"
          className="w-full h-full"
        />
        <PDFHighlight highlight={activeHighlight} />
      </div>
    ) : (
      <div className="h-full flex items-center justify-center p-4">
        <PDFUploadSection onUpload={uploadHandler} label={label} />
      </div>
    )
  );

  return (
    <div className="h-full flex flex-col">
      <PDFControls
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onToggleFocus={handleToggleFocus}
        onGenerateReport={() => {}}
      />
      
      <div className="flex-1 flex">
        {viewMode === 'single' ? (
          renderPDF(submission1Url, onUpload(1), "Upload Submission 1")
        ) : (
          <>
            <div className="flex-1 border-r">
              {renderPDF(submission1Url, onUpload(1), "Upload Submission 1")}
            </div>
            <div className="flex-1">
              {renderPDF(submission2Url, onUpload(2), "Upload Submission 2")}
            </div>
          </>
        )}
      </div>
    </div>
  );
}