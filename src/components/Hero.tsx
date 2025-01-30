import React from "react";
import { GraduationCap, Clock, CheckCircle, ArrowRight } from "lucide-react";

// Hero component to display the main feature section
export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            {/* Main headline for the Hero section */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Grade Handwritten Assignments in Minutes, Not Hours
            </h1>
            {/* Supporting paragraph explaining the feature */}
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Save countless hours with our intelligent grading system designed
              specifically for K-12 teachers. Simply take a picture of your
              assignment and let Crex do the rest.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {/* Call-to-action button for sign-ups */}
              <a
                href="https://buy.stripe.com/eVa9Ch50m10BagE28c"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 whitespace-nowrap"
              >
                <span className="mr-1">🎉</span>
                First 10 sign-ups get 1 month for $5!
              </a>
              {/* Demo button */}
              <a
                href="/login"
                className="flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors whitespace-nowrap"
              >
                Click here for a live demo
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <div className="mt-8 flex gap-6">
              {/* List of features with icons */}
              {[
                { icon: Clock, text: "Save 5+ hours weekly" },
                { icon: CheckCircle, text: "99% accuracy rate" },
                { icon: GraduationCap, text: "K-12 optimized" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <item.icon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2">
            {/* Image illustrating the feature */}
            <img
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80"
              alt="Teacher grading papers"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
