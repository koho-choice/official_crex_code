import React from 'react';
import { Users, BookOpen, Trophy } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About Crex
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We're on a mission to give teachers back their evenings and weekends by automating the grading process
          </p>
        </div>

        <div className="mt-20">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-blue-600">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Our Team</h3>
              <p className="mt-2 text-gray-600">
                Founded by a teacher and engineer who understands the challenges of modern education
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-blue-600">
                <BookOpen className="h-12 w-12" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Our Mission</h3>
              <p className="mt-2 text-gray-600">
                Personalizing education to exceed learning outcomes
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 text-blue-600">
                <Trophy className="h-12 w-12" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-gray-900">Our Impact</h3>
              <p className="mt-2 text-gray-600">
                Saving 5+ hours per week on grading
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Our Story</h2>
          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            As a data analytics teacher,{' '}
            <a
              href="https://www.linkedin.com/in/babatundeogundipe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Babatunde Ogundipe
            </a>{' '}
            found himself losing too much time creating and grading homework assignments. He realized that if he was facing these inefficiencies, other teachers probably were too. So, he set out to talk with educators to uncover their biggest time drains.
          </p>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The trend was clear: grading was a universal challenge. By focusing on this problem, Crex aims to help teachers reclaim their time while delivering even more value to their students, ultimately creating a better learning experience for everyone involved.
          </p>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Today, we're proud to be partnering with teachers, helping educators focus on what they do best: inspiring and teaching the next generation.
          </p>
        </div>
      </div>
    </div>
  );
}