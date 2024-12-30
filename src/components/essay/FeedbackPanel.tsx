import React, { useState } from 'react';
import { ChevronRight, Download } from 'lucide-react';
import { FeedbackContent } from './feedback/FeedbackContent';
import { submission1Feedback, submission2Feedback, comparisonFeedback } from '../../data/dummyFeedback';
import type { FeedbackItem } from '../../types/feedback';

type TabType = 'submission1' | 'submission2' | 'comparison';

interface FeedbackPanelProps {
  onGenerateReport: () => void;
  onHighlight: (highlight: FeedbackItem['highlight'] | null) => void;
}

export function FeedbackPanel({ onGenerateReport, onHighlight }: FeedbackPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('submission1');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'submission1', label: 'Submission 1 Feedback' },
    { id: 'submission2', label: 'Submission 2 Feedback' },
    { id: 'comparison', label: 'Comparison Feedback' },
  ];

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${isCollapsed ? 'w-12' : 'w-full'}`}>
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <button
          onClick={() => setIsCollapsed(prev => !prev)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <ChevronRight className={`w-5 h-5 transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
        </button>
        {!isCollapsed && (
          <button
            onClick={onGenerateReport}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            Generate Report
          </button>
        )}
      </div>

      {!isCollapsed && (
        <>
          <div className="flex border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors
                  ${activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-auto p-6">
            {activeTab === 'submission1' && (
              <FeedbackContent
                title="Submission 1 Analysis"
                score={85}
                sections={submission1Feedback}
                onHighlight={onHighlight}
              />
            )}
            {activeTab === 'submission2' && (
              <FeedbackContent
                title="Submission 2 Analysis"
                score={92}
                sections={submission2Feedback}
                onHighlight={onHighlight}
              />
            )}
            {activeTab === 'comparison' && (
              <FeedbackContent
                title="Comparison Analysis"
                score={95}
                sections={comparisonFeedback}
                onHighlight={onHighlight}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}