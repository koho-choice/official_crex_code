import React, { useState, useCallback } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { DropZone } from './DropZone';
import { FileList } from './FileList';
import { UploadButton } from './UploadButton';
import { getPresignedUrls, uploadFileToS3 } from '../../utils/uploadService';
import { API_CONFIG } from '../../utils/config';
import type { FileWithStatus, UploadState } from '../../types/upload';

export function FileUpload() {
  const [state, setState] = useState<UploadState>({
    files: new Map(),
    isUploading: false,
    globalError: ''
  });

  const validateFile = (file: File): string | null => {
    if (!API_CONFIG.ALLOWED_TYPES.includes(file.type as any)) {
      return 'Please upload a PDF, DOC, PNG, or JPEG file.';
    }
    if (file.size > API_CONFIG.MAX_FILE_SIZE) {
      return 'File size must be less than 10MB.';
    }
    return null;
  };

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (selectedFiles.length + state.files.size > API_CONFIG.MAX_FILES) {
      setState(prev => ({
        ...prev,
        globalError: `You can only upload up to ${API_CONFIG.MAX_FILES} files at a time.`
      }));
      return;
    }

    setState(prev => {
      const newFiles = new Map(prev.files);
      
      selectedFiles.forEach(file => {
        const error = validateFile(file);
        if (error) {
          newFiles.set(file.name, {
            file,
            progress: 0,
            status: 'error',
            error
          });
        } else {
          newFiles.set(file.name, {
            file,
            progress: 0,
            status: 'idle'
          });
        }
      });

      return {
        ...prev,
        files: newFiles,
        globalError: ''
      };
    });

    // Reset input
    e.target.value = '';
  }, [state.files.size]);

  const removeFile = useCallback((filename: string) => {
    setState(prev => {
      const newFiles = new Map(prev.files);
      newFiles.delete(filename);
      return {
        ...prev,
        files: newFiles,
        globalError: ''
      };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.files.size === 0 || state.isUploading) return;

    setState(prev => ({ ...prev, isUploading: true, globalError: '' }));

    try {
      const filesToUpload = Array.from(state.files.values())
        .filter(fileData => fileData.status !== 'error')
        .map(fileData => fileData.file);

      const presignedUrls = await getPresignedUrls(filesToUpload);
      console.log('Received presigned URLs:', presignedUrls);

      for (const [filename, fileData] of state.files) {
        if (fileData.status === 'error') continue;

        try {
          // Update status to uploading
          setState(prev => {
            const newFiles = new Map(prev.files);
            newFiles.set(filename, { ...fileData, status: 'uploading' });
            return { ...prev, files: newFiles };
          });

          const urlData = presignedUrls.find(data => data.filename === filename);
          if (!urlData) {
            throw new Error(`No presigned URL found for ${filename}`);
          }

          console.log('Pre-Signed URL:', urlData.url);
          
          await uploadFileToS3(
            fileData.file,
            urlData.url,
            (progress) => {
              setState(prev => {
                const newFiles = new Map(prev.files);
                const currentFile = newFiles.get(filename);
                if (currentFile) {
                  newFiles.set(filename, { ...currentFile, progress });
                }
                return { ...prev, files: newFiles };
              });
            }
          );

          // Update status to success
          setState(prev => {
            const newFiles = new Map(prev.files);
            newFiles.set(filename, {
              ...fileData,
              progress: 100,
              status: 'success'
            });
            return { ...prev, files: newFiles };
          });
        } catch (error) {
          console.log(`Error uploading ${filename}:`, error);
          setState(prev => {
            const newFiles = new Map(prev.files);
            newFiles.set(filename, {
              ...fileData,
              progress: 0,
              status: 'error',
              error: error instanceof Error ? error.message : 'Upload failed'
            });
            return { ...prev, files: newFiles };
          });
        }
      }
    } catch (error) {
      console.error('Failed to get presigned URLs:', error);
      setState(prev => ({
        ...prev,
        globalError: error instanceof Error ? error.message : 'Upload failed'
      }));
    } finally {
      setState(prev => ({ ...prev, isUploading: false }));
    }
  };

  const allFilesSuccessful = state.files.size > 0 && 
    Array.from(state.files.values()).every(file => file.status === 'success');

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <DropZone
          onFileSelect={handleFileSelect}
          disabled={state.isUploading}
        />

        {state.files.size > 0 && (
          <FileList
            files={state.files}
            onRemove={removeFile}
            isUploading={state.isUploading}
          />
        )}

        {state.globalError && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm">{state.globalError}</span>
          </div>
        )}

        {allFilesSuccessful && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">All files uploaded successfully!</span>
          </div>
        )}

        <UploadButton
          isUploading={state.isUploading}
          fileCount={state.files.size}
          disabled={state.files.size === 0 || state.isUploading}
        />
      </form>
    </div>
  );
}