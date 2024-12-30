import React from 'react';
import { ExternalLink, Play } from 'lucide-react';

interface VideoLinkProps {
  videoUrl: string;
  title?: string;
}

export function VideoLink({ videoUrl, title }: VideoLinkProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
      <a
        href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Play className="h-6 w-6" />
        <span className="text-lg font-medium">Watch Demo Video</span>
        <ExternalLink className="h-5 w-5" />
      </a>
      {title && (
        <p className="mt-4 text-gray-600">{title}</p>
      )}
    </div>
  );
}