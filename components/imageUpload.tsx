"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadCloudIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

// Define the props for our component
interface ImageUploaderProps {
  endpoint: keyof OurFileRouter;
  onUploadComplete: (url: string) => void;
  onUploadError: (error: Error) => void;
  initialImageUrl?: string | null; // <-- NEW: To display an existing image
  onDelete?: () => void; // <-- NEW: To handle deletion in the parent
}

export default function ImageUploader({
  endpoint,
  onUploadComplete,
  onUploadError,
  initialImageUrl,
  onDelete,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);

  // Sync state if the initialImageUrl from the parent changes
  useEffect(() => {
    setImageUrl(initialImageUrl || null);
  }, [initialImageUrl]);

  const handleDelete = () => {
    setImageUrl(null);
    if (onDelete) {
      onDelete(); // Notify the parent component that the image was deleted
    }
  };

  // If an image is present, display it with a delete button
  if (imageUrl) {
    return (
      <div className="relative w-full max-w-sm h-48">
        <Image
          src={imageUrl}
          alt="Uploaded Image"
          fill
          className="rounded-lg object-cover"
        />
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors"
          aria-label="Delete image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Otherwise, display the dropzone
  return (
    <UploadDropzone<OurFileRouter, keyof OurFileRouter>
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res[0]) {
          const uploadedUrl = res[0].url;
          setImageUrl(uploadedUrl);
          onUploadComplete(uploadedUrl);
        }
      }}
      onUploadError={onUploadError}
      appearance={{
        container:
          "flex flex-col items-center justify-center h-48 w-full max-w-sm text-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
        button:
          "bg-[#125892] text-white rounded-md px-4 py-4 mt-4 hover:bg-[#125892]",
        label: "text-gray-500 dark:text-gray-400",
      }}
      content={{
        label: ({ isDragActive }) => (
          <div className="flex flex-col items-center justify-center">
            <UploadCloudIcon className="w-12 h-12 text-gray-400 mb-2" />
            <div className="text-sm font-semibold">
              {isDragActive
                ? "Drop the file here"
                : "Drop file here or click to browse"}
            </div>
            <div className="text-xs text-gray-400 mt-1">Image (Max 2MB)</div>
          </div>
        ),
        allowedContent: null,
      }}
    />
  );
}