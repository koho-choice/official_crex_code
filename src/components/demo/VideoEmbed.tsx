import React from 'react';

interface VideoEmbedProps {
  videoId: string;
}

export function VideoEmbed({ videoId }: VideoEmbedProps) {
  return (
    <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-2xl overflow-hidden">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}