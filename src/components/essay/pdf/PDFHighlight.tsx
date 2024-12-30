import React from 'react';
import type { FeedbackItem } from '../../../types/feedback';

interface PDFHighlightProps {
  highlight: FeedbackItem['highlight'] | null;
}

export function PDFHighlight({ highlight }: PDFHighlightProps) {
  if (!highlight) return null;

  return (
    <div
      className="absolute bg-green-300/30 pointer-events-none animate-highlight"
      style={{
        left: `${highlight.coordinates.x}%`,
        top: `${highlight.coordinates.y}%`,
        width: `${highlight.coordinates.width}%`,
        height: `${highlight.coordinates.height}%`,
      }}
    />
  );
}