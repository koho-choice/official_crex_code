// src/components/UploadPage.tsx
import React from "react";

function UploadPage() {
  const uploadFiles = async () => {
    // Get the file input element from the DOM
    const input = document.getElementById("fileInput") as HTMLInputElement;

    // Check if any files are selected
    if (!input.files) {
      console.error("No files selected");
      return;
    }

    // Convert the FileList to an array and map it to an array of file data objects
    const files = Array.from(input.files);
    const fileData = files.map((file) => ({
      filename: file.name,
      contentType: file.type,
    }));

    try {
      // Step 1: Request pre-signed URLs for all files from the server
      const response = await fetch(
        "https://crex-grader-d07366ace8fa.herokuapp.com/generate-presigned-urls",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ files: fileData }),
        }
      );

      // Parse the JSON response to get the pre-signed URLs
      const data = await response.json();
      const urls = data.urls;

      // Step 2: Upload each file to S3 using its corresponding pre-signed URL
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const { url } = urls[i];

        // Upload the file to S3 using the pre-signed URL
        const uploadResponse = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        // Check if the upload was successful
        if (uploadResponse.ok) {
          console.log(`File ${file.name} uploaded successfully`);
        } else {
          console.error(`Failed to upload file ${file.name}`);
        }
      }

      // Step 3: Have the server grade the submissions
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
        console.log("All submissions graded!");

        // Step 4: Get the feedback URL after grading is complete
        const feedbackResponse = await fetch(
          "https://crex-grader-d07366ace8fa.herokuapp.com/get-feedback-url",
          {
            method: "GET",
          }
        );

        if (feedbackResponse.ok) {
          const feedbackData = await feedbackResponse.json();
          const downloadUrl = feedbackData.download_url;
          console.log("Feedback URL:", downloadUrl);

          // Optionally, create a download link in the DOM
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.textContent = "Download Feedback";
          document.body.appendChild(link);
        } else {
          console.error("Failed to get feedback URL");
        }
      } else {
        console.error("Submission grader failed after file upload");
      }
    } catch (error) {
      console.error("Error processing files:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mt-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Upload your submissions here!
          </h1>
        </div>

        <div className="mt-12 flex flex-col items-center">
          <input
            type="file"
            id="fileInput"
            multiple
            className="block w-full text-sm text-gray-600"
          />
          <button
            onClick={uploadFiles}
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
