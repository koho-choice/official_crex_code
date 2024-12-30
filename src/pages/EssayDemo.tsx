import React, { useState, useCallback } from 'react';
import { PDFViewer } from '../components/essay/PDFViewer';
import { Resizer } from '../components/essay/Resizer';
import { FeedbackPanel } from '../components/essay/FeedbackPanel';
import type { FeedbackItem } from '../types/feedback';

export function EssayDemo() {
  const [splitPosition, setSplitPosition] = useState(60);
  const [isDragging, setIsDragging] = useState(false);
  const [submission1Url, setSubmission1Url] = useState<string | null>(null);
  const [submission2Url, setSubmission2Url] = useState<string | null>(null);
  const [activeHighlight, setActiveHighlight] = useState<FeedbackItem['highlight'] | null>(null);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;

    const containerWidth = window.innerWidth;
    const newPosition = (e.clientX / containerWidth) * 100;
    
    // Limit the resizer between 20% and 80% of the screen width
    const clampedPosition = Math.min(Math.max(newPosition, 20), 80);
    setSplitPosition(clampedPosition);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handlePDFUpload = useCallback((submissionNumber: 1 | 2) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (submissionNumber === 1) {
      setSubmission1Url(url);
    } else {
      setSubmission2Url(url);
    }
  }, []);

  const handleGenerateReport = useCallback(() => {
    // Implementation for report generation
    console.log('Generating report...');
  }, []);

  return (
    <div 
      className="h-screen flex"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="bg-gray-50"
        style={{ width: `${splitPosition}%` }}
      >
        <PDFViewer
          submission1Url={submission1Url}
          submission2Url={submission2Url}
          onUpload={handlePDFUpload}
          activeHighlight={activeHighlight}
        />
      </div>

      <Resizer onMouseDown={handleMouseDown} />

      <div 
        className="bg-white"
        style={{ width: `${100 - splitPosition}%` }}
      >
        <FeedbackPanel 
          onGenerateReport={handleGenerateReport}
          onHighlight={setActiveHighlight}
        />
      </div>
    </div>
  );
}