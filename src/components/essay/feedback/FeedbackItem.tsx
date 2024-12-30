import React from 'react';
import type { FeedbackItem as FeedbackItemType } from '../../../types/feedback';

interface FeedbackItemProps {
  item: FeedbackItemType;
  onHover: (highlight: FeedbackItemType['highlight'] | null) => void;
}

export function FeedbackItem({ item, onHover }: FeedbackItemProps) {
  return (
    <div
      className="p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
      onMouseEnter={() => onHover(item.highlight)}
      onMouseLeave={() => onHover(null)}
    >
      <p className="text-gray-700">{item.text}</p>
    </div>
  );
}