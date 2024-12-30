import React from 'react';
import { Upload, Cpu, MessageSquare, UserCog, Share2 } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload or Capture',
    description: 'Simply take a photo of student work with your phone or upload scanned assignments.',
    details: [
      'Batch upload multiple assignments',
      'Mobile-friendly camera capture',
      'Support for images and PDFs'
    ]
  },
  {
    icon: Cpu,
    title: 'AI Grading',
    description: 'Our advanced AI analyzes each submission against your rubric, providing consistent and fair grading in seconds.',
    details: [
      'Handwriting recognition',
      'Context-aware evaluation',
      'Rubric-based scoring'
    ]
  },
  {
    icon: MessageSquare,
    title: 'Smart Feedback',
    description: 'Generate personalized, constructive feedback for each student automatically, helping them understand where to improve.',
    details: [
      'Detailed explanations',
      'Improvement suggestions',
      'Common mistake detection'
    ]
  },
  {
    icon: UserCog,
    title: 'Teacher Control',
    description: 'Maintain full control over the grading process. Review, adjust, and approve AI-generated grades and feedback.',
    details: [
      'Easy grade adjustments',
      'Feedback customization',
      'Batch approval workflow'
    ]
  },
  {
    icon: Share2,
    title: 'LMS Integration',
    description: 'Seamlessly sync grades and feedback with your Learning Management System.',
    details: [
      'Direct Canvas integration',
      'Synergy compatibility',
      'Automatic grade sync'
    ]
  }
];

export function HowItWorks() {
  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            How Crex Works
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Grade assignments in five simple steps. Our AI-powered platform handles the heavy lifting while you maintain full control.
          </p>
        </div>

        <div className="mt-24 space-y-12">
          {steps.map((step, index) => (
            <div key={step.title} className="bg-white rounded-2xl shadow-sm p-8 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="flex items-start gap-6">
                <step.icon className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h2>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center text-sm text-gray-600">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://buy.stripe.com/eVa9Ch50m10BagE28c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Crex Today
          </a>
          <p className="mt-4 text-sm text-gray-600">
            First 10 sign-ups get 1 month for just $5!
          </p>
        </div>
      </div>
    </div>
  );
}