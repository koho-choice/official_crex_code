import React from 'react';
import { CheckCircle } from 'lucide-react';

export function Pricing() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Early Access Promotion</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Be among the first 10 teachers to experience the future of grading at an exclusive price as soon as we launch in January 2025.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Early Access Trial</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Get full access to all features for a full month at our special early-bird price.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-blue-600">What's included</h4>
              <div className="h-px flex-auto bg-gray-100"></div>
            </div>
            <ul className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
              {[
                'Unlimited assignments',
                'AI-powered grading',
                'Progress tracking',
                'Canvas and Synergy integration',
                'Export capabilities',
                'Priority support'
              ].map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckCircle className="h-6 w-5 flex-none text-blue-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="text-base font-semibold text-gray-600">Early Access Trial</p>
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">$5</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                </p>
                <p className="mt-3 text-sm text-gray-600">First 10 sign-ups only</p>
                <a
                  href="https://buy.stripe.com/eVa9Ch50m10BagE28c"
                  target = "_blank"
                  rel = "noopener noreferrer"
                  className="mt-10 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get Early Access
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}