"use client";
import Image from "next/image";
import ImageUploader from "./image-uploader";
import { useAppContext } from "@/context/app-context";

export default function ImageDisplaySection() {
  const { uploadedImageUrl } = useAppContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ImageUploader />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Original Image</h2>
        <div className="aspect-video bg-gray-200 rounded-md overflow-hidden">
          {uploadedImageUrl ? (
            <Image
              src={uploadedImageUrl || ""}
              width={500}
              height={400}
              alt="Original uploaded image"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No image uploaded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
