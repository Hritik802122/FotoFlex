"use client";

import ImageDisplaySection from "@/components/image-display-section";
import TransformationSection from "@/components/transformation-section";
import TransformedImageSection from "@/components/transformed-image-section";
import { useAppContext } from "@/context/app-context";

export default function UploadPage() {
  const { uploadedImageUrl } = useAppContext();

  return (
    <main className="flex flex-col items-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center leading-tight">
  Upload & <br className="sm:hidden" /> Transform Your Image
</h1>


      {/* Show sections */}
      <div className="w-full max-w-5xl space-y-10">
        <ImageDisplaySection />
        {uploadedImageUrl && (
          <>
            <TransformationSection />
            <TransformedImageSection />
          </>
        )}
      </div>
    </main>
  );
}
