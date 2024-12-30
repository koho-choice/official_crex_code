import React from 'react';
import { FeedbackSection } from './FeedbackSection';
import type { FeedbackSection as FeedbackSectionType } from '../../../types/feedback';

interface FeedbackContentProps {
  title: string;
  score: number;
  sections: FeedbackSectionType[];
  onHighlight: (highlight: FeedbackSectionType['items'][0]['highlight'] | null) => void;
}

export function FeedbackContent({ title, score, sections, onHighlight }: FeedbackContentProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span>Score:</span>
          <span className="font-semibold">{score}/100</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {sections.map((section) => (
        <FeedbackSection
          key={section.title}
          section={section}
          onHighlight={onHighlight}
        />
      ))}
    </div>
  );
}