import React, { useState, useRef, useCallback } from "react";
import { Upload, CheckCircle, AlertCircle, X, Loader2 } from "lucide-react";
import { getPresignedUrls, uploadFileToS3 } from "../utils/uploadService";
import { isUploadError } from "../utils/errorUtils";

// Allowed file types for upload
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

// Maximum file size allowed (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// Maximum number of files allowed for upload
const MAX_FILES = 100;

// Interface for file status
interface FileStatus {
  progress: number;
  error?: string;
  success?: boolean;
}

// Interface for file statuses
interface FileStatuses {
  [filename: string]: FileStatus;
}

export function FileUpload() {
  // State to store the selected files
  const [files, setFiles] = useState<File[]>([]);
  // State to store the status of each file
  const [fileStatuses, setFileStatuses] = useState<FileStatuses>({});
  // State to indicate if files are being uploaded
  const [isUploading, setIsUploading] = useState(false);
  // State to store any global error message
  const [globalError, setGlobalError] = useState<string>("");
  // Reference to the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to validate a file
  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Please upload a PDF, DOC, PNG, or JPEG file.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 10MB.";
    }
    return null;
  };

  // Handler for file input change event
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      setGlobalError("");

      // Check if the total number of files exceeds the maximum limit
      if (selectedFiles.length + files.length > MAX_FILES) {
        setGlobalError(
          `You can only upload up to ${MAX_FILES} files at a time.`
        );
        return;
      }

      const newFiles: File[] = [];
      const newFileStatuses: FileStatuses = { ...fileStatuses };

      // Validate each selected file
      selectedFiles.forEach((file) => {
        const error = validateFile(file);
        if (error) {
          newFileStatuses[file.name] = { progress: 0, error };
        } else {
          newFiles.push(file);
          newFileStatuses[file.name] = { progress: 0 };
        }
      });

      // Update the state with the new files and their statuses
      setFiles((prev) => [...prev, ...newFiles]);
      setFileStatuses(newFileStatuses);

      // Reset the file input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [files.length, fileStatuses]
  );

  // Handler to remove a file from the list
  const removeFile = useCallback((filename: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== filename));
    setFileStatuses((prev) => {
      const newStatuses = { ...prev };
      delete newStatuses[filename];
      return newStatuses;
    });
    setGlobalError("");
  }, []);

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Get presigned URLs for the files
      const presignedUrls = await getPresignedUrls(files);

      // Upload each file to S3
      await Promise.all(
        files.map((file, index) =>
          uploadFileToS3(file, presignedUrls[index].url, (progress) => {
            setFileStatuses((prev) => ({
              ...prev,
              [file.name]: { ...prev[file.name], progress },
            }));
          })
        )
      );

      // Update the status of each file to success
      setFileStatuses((prev) => {
        const newStatuses = { ...prev };
        files.forEach((file) => {
          newStatuses[file.name] = { ...newStatuses[file.name], success: true };
        });
        return newStatuses;
      });

      setGlobalError("");
    } catch (error) {
      setGlobalError("Failed to upload files. Please try again.");
    }
  };

  // Check if all files have been uploaded successfully
  const allFilesSuccessful =
    files.length > 0 && files.every((file) => fileStatuses[file.name]?.success);

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-blue-500 transition-colors">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <label className="block text-center cursor-pointer">
            <span className="text-gray-700">
              Drag & drop files here or click to browse
            </span>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              multiple
              disabled={isUploading}
            />
          </label>
          <p className="mt-2 text-sm text-gray-500">
            PDF, DOC, PNG, or JPEG (max 10MB per file)
          </p>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file) => {
              const status = fileStatuses[file.name];
              return (
                <div
                  key={file.name}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                >
                  <div className="flex-1 mr-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600 truncate">
                        {file.name}
                      </span>
                      {!isUploading && (
                        <button
                          type="button"
                          onClick={() => removeFile(file.name)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    {status && (
                      <>
                        <div className="w-full h-1 bg-gray-200 rounded-full">
                          <div
                            className={`h-1 rounded-full transition-all duration-300 ${
                              status.error
                                ? "bg-red-500"
                                : status.success
                                ? "bg-green-500"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${status.progress}%` }}
                          />
                        </div>
                        {status.error && (
                          <p className="text-xs text-red-500 mt-1">
                            {status.error}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {globalError && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{globalError}</span>
          </div>
        )}

        {allFilesSuccessful && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">All files uploaded successfully!</span>
          </div>
        )}

        <button
          type="submit"
          disabled={files.length === 0 || isUploading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center gap-2
            ${
              files.length === 0 || isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors`}
        >
          {isUploading && <Loader2 className="h-5 w-5 animate-spin" />}
          {isUploading
            ? "Uploading..."
            : `Upload ${files.length} ${files.length === 1 ? "File" : "Files"}`}
        </button>
      </form>
    </div>
  );
}
