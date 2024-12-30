import React from 'react';
import { VideoLink } from '../components/demo/VideoLink';
import { CallToAction } from '../components/demo/CallToAction';
import { DemoHeader } from '../components/demo/DemoHeader';

export function Demo() {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <DemoHeader />
        <div className="mt-12 space-y-12">
          <VideoLink 
            videoUrl="https://www.youtube.com/watch?v=AnhU5ZpdsEU&ab_channel=DavidOgundipe"
            title="See how Crex can transform your grading workflow"
          />
          <CallToAction />
        </div>
      </div>
    </div>
  );
}