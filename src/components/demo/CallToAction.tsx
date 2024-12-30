import React from 'react';
import { Play } from 'lucide-react';

export function CallToAction() {
  return (
    <div className="mt-12 text-center">
      <a
        href="https://buy.stripe.com/eVa9Ch50m10BagE28c"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Play className="h-5 w-5 mr-2" />
        Try Crex Today
      </a>
      <p className="mt-4 text-sm text-gray-600">
        First 10 sign-ups get 1 month for just $5!
      </p>
    </div>
  );
}