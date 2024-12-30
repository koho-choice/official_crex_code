import React from 'react';
import { FeedbackItem } from './FeedbackItem';
import type { FeedbackSection as FeedbackSectionType } from '../../../types/feedback';

interface FeedbackSectionProps {
  section: FeedbackSectionType;
  onHighlight: (highlight: FeedbackSectionType['items'][0]['highlight'] | null) => void;
}

export function FeedbackSection({ section, onHighlight }: FeedbackSectionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
      <div className="space-y-2">
        {section.items.map((item) => (
          <FeedbackItem
            key={item.id}
            item={item}
            onHover={onHighlight}
          />
        ))}
      </div>
    </div>
  );
}