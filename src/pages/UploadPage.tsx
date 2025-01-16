import React, { useState, useRef } from "react";
import {
  Upload,
  Loader2,
  X,
  File,
  AlertCircle,
  CheckCircle,
  Download,
} from "lucide-react";

function UploadPage() {
  const [mode, setMode] = useState("essay");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: File[]): boolean => {
    if (mode === "essay") {
      const hasRubric = files.some((file) =>
        file.name.toLowerCase().includes("rubric")
      );

      if (!hasRubric) {
        setError(
          "Essay mode requires a rubric file. Please include a file with 'rubric' in its name."
        );
        return false;
      }
    }
    setError(null);
    return true;
  };

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      setError("No files selected");
      return;
    }

    if (!validateFiles(selectedFiles)) {
      return;
    }

    setIsProcessing(true);
    setError(null);
    setDownloadUrl(null);

    const fileData = selectedFiles.map((file) => ({
      filename: file.name,
      contentType: file.type,
    }));

    try {
      setProcessingStep("Preparing files for upload...");
      const response = await fetch(
        "https://crex-grader-d07366ace8fa.herokuapp.com/generate-presigned-urls",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ files: fileData, mode }),
        }
      );

      const data = await response.json();
      const urls = data.urls;

      setProcessingStep("Uploading files...");
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const { url } = urls[i];

        const uploadResponse = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload file ${file.name}`);
        }
      }

      setProcessingStep("Processing submissions...");
      const gradeSubmissions = await fetch(
        "https://crex-grader-d07366ace8fa.herokuapp.com/process-files",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: "All files uploaded successfully" }),
        }
      );

      if (gradeSubmissions.ok) {
        setProcessingStep("Generating feedback...");
        const feedbackResponse = await fetch(
          "https://crex-grader-d07366ace8fa.herokuapp.com/get-feedback-url",
          {
            method: "GET",
          }
        );

        if (feedbackResponse.ok) {
          const feedbackData = await feedbackResponse.json();
          setDownloadUrl(feedbackData.download_url);
        } else {
          throw new Error("Failed to get feedback URL");
        }
      } else {
        throw new Error("Submission grader failed after file upload");
      }
    } catch (error) {
      console.error("Error processing files:", error);
      setError("Failed to process files. Please try again.");
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...selectedFiles, ...newFiles];

      if (validateFiles(updatedFiles)) {
        setSelectedFiles(updatedFiles);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    if (validateFiles(updatedFiles)) {
      setSelectedFiles(updatedFiles);
    }
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    if (selectedFiles.length > 0) {
      validateFiles(selectedFiles);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
      setDownloadUrl(null);
      setSelectedFiles([]);
    }
  };

  const closeDownloadModal = () => {
    setDownloadUrl(null);
    setSelectedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isProcessing ? (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-blue-100 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                  <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-l-transparent animate-spin" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Processing Your Files
                </h3>
                <p className="mt-2 text-sm text-gray-600">{processingStep}</p>
                <div className="mt-6 w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-blue-600 animate-pulse"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : downloadUrl ? (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Processing Complete!
                </h3>
                <p className="mt-2 text-gray-600">
                  Your feedback is ready to download
                </p>
                <div className="mt-8 flex flex-col gap-3 w-full">
                  <button
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download Feedback
                  </button>
                  <button
                    onClick={closeDownloadModal}
                    className="px-4 py-3 text-gray-600 font-medium hover:text-gray-900 transition-colors"
                  >
                    Process Another Batch
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-12 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Upload your submissions here!
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Choose your grading mode and upload your files
              </p>
            </div>

            <div className="mt-12 max-w-xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex justify-center mb-8">
                  <div className="inline-flex rounded-lg bg-gray-100 p-1">
                    <button
                      onClick={() => handleModeChange("essay")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        mode === "essay"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Essay
                    </button>
                    <button
                      onClick={() => handleModeChange("assignment")}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        mode === "assignment"
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Assignment
                    </button>
                  </div>
                </div>

                {mode === "essay" && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Essay mode requires a rubric file. Please include a file
                      with 'rubric' in its name.
                    </p>
                  </div>
                )}
                {mode === "assignment" && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Assignment mode requires the files to be pictures, either
                      jpg or png.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="space-y-6">
                  <input
                    type="file"
                    ref={fileInputRef}
                    id="fileInput"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  />

                  <button
                    onClick={handleFileButtonClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="h-5 w-5" />
                    Choose Files
                  </button>

                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        Selected Files ({selectedFiles.length})
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {selectedFiles.map((file, index) => (
                          <div
                            key={`${file.name}-${index}`}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <File className="h-5 w-5 text-gray-400" />
                              <div>
                                <div className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                  {file.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {formatFileSize(file.size)}
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={uploadFiles}
                    disabled={selectedFiles.length === 0}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-lg transition-colors ${
                      selectedFiles.length === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    Upload and Process
                  </button>
                </div>
              </div>

              <p className="mt-4 text-sm text-center text-gray-500">
                Supported file types: PDF, DOC, DOCX, PNG, JPG
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
