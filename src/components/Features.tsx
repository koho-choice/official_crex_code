import React from 'react';
import { Sparkles, Brain, Clock, LineChart, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Recognition',
    description: 'Advanced machine learning algorithms that understand various handwriting styles with high accuracy.'
  },
  {
    icon: Clock,
    title: 'Rapid Processing',
    description: 'Grade entire class assignments in minutes instead of hours.'
  },
  {
    icon: LineChart,
    title: 'Progress Tracking',
    description: 'Monitor student progress with detailed analytics and insights.'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Bank-level encryption ensures student data remains protected.'
  },
  {
    icon: Sparkles,
    title: 'Smart Feedback',
    description: 'Automated, constructive feedback for common mistakes.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Share and standardize grading rubrics across your department.'
  }
];

export function Features() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything You Need to Grade Smarter
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our platform combines cutting-edge AI with teacher-friendly features to make grading quicker and more effective.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600" />
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}