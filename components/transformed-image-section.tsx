"use client";

import { useAppContext } from "@/context/app-context";
import TransformedImage from "./transformed-image";

export default function TransformedImageSection() {
  const { uploadedImageUrl, selectedTransformation } = useAppContext();

  if (uploadedImageUrl && selectedTransformation) {
    return (
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Transformed Image</h2>
        <TransformedImage />
      </div>
    );
  }
}