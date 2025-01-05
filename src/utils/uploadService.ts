import axios from "axios";
import { API_CONFIG } from "./config";
import type { PresignedPost } from "../types/upload";

export async function getPresignedUrls(
  files: File[]
): Promise<Array<{ filename: string; url: string }>> {
  try {
    const response = await axios.post(
      API_CONFIG.UPLOAD_ENDPOINT,
      {
        files: files.map((file) => ({
          filename: file.name,
          contentType: file.type,
        })),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: API_CONFIG.UPLOAD_TIMEOUT,
      }
    );

    return response.data.urls;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to get upload URLs: ${error.message}`);
    }
    throw error;
  }
}

export async function uploadFileToS3(
  file: File,
  presignedUrl: string,
  onProgress?: (progress: number) => void
): Promise<void> {
  try {
    await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
        "x-amz-acl": "public-read",
        "Cache-Control": "max-age=31536000",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(progress);
        }
      },
    });
  } catch (error) {
    console.log("Upload Error Details:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
    throw error;
  }
}
