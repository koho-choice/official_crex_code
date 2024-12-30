import React, { useState } from 'react';
import { Upload, CheckCircle2 } from 'lucide-react';

export function OldDemo() {
  const [step, setStep] = useState<'upload' | 'processing' | 'results'>(
    'upload'
  );
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
      setTimeout(() => {
        setStep('processing');
        setTimeout(() => setStep('results'), 2000);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            See Crex in action!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Experience how Crex gives you back your time
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {step === 'upload' && (
            <div className="text-center">
              <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                <Upload className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">
                Upload an Assignment
              </h2>
              <p className="text-gray-600 mb-8">
                Upload a sample assignment to see how Crex analyzes and grades
                it
              </p>
              <label className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                Upload Image
              </label>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center">
              <div className="mx-auto w-24 h-24 relative">
                <div className="absolute inset-0 border-t-4 border-blue-600 rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-semibold mt-6">
                Analyzing Assignment...
              </h2>
              <p className="text-gray-600 mt-2">
                Crex is now grading and provide feedback
              </p>
            </div>
          )}

          {step === 'results' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Original Assignment
                </h3>
                {preview && (
                  <img
                    src={preview}
                    alt="Uploaded assignment"
                    className="w-full rounded-lg shadow-sm"
                  />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Crex Analysis Results
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Overall Score</span>
                      <span className="text-blue-600 font-semibold">
                        100/100
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Excellent Word Knowledge</p>
                        <p className="text-sm text-gray-600">
                          The student correctly identified all the words,
                          demonstrating a clear understanding of their meanings.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Good Strategy</p>
                        <p className="text-sm text-gray-600">
                          Crossing out used words in the word bank shows great
                          organizational skills.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Detailed Feedback</h4>
                    <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                      <p>
                        The student did an outstanding job, answering every
                        question correctly. Their work reflects a solid grasp of
                        the vocabulary and an effective approach to solving the
                        assignment. Great job!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setStep('upload');
                      setFile(null);
                      setPreview('');
                    }}
                    className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Try Another Assignment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}