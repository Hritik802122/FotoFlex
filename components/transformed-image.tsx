"use client";

import { useAppContext } from "@/context/app-context";
import Image from "next/image";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import RenderLoading from "./render-loading";

export default function TransformedImage() {
  const { uploadedImageUrl, selectedTransformation, transformationParams } =
    useAppContext();
  const [transformedUrl, setTransformedUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT || "";

  useEffect(() => {
    if (!uploadedImageUrl || !selectedTransformation) {
      return;
    }
    const path = uploadedImageUrl.replace(urlEndpoint, "");
    let trString = `tr=`;
    switch (selectedTransformation) {
      case "bgremove":
        trString += `e-bgremove`;
        break;
      case "changebg":
        if (transformationParams) {
          trString += `e-changebg-prompt-${transformationParams}`;
        }
        break;
    }
    // Build the transformed URL
    const newUrl = `${urlEndpoint}${path}?${trString}`;
    setTransformedUrl(newUrl);
    setIsLoading(true);
  }, [
    uploadedImageUrl,
    selectedTransformation,
    urlEndpoint,
    transformationParams,
  ]);

  const handleDownload = async () => {
    if (!transformedUrl) return;

    try {
      const response = await fetch(transformedUrl);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const blob = await response.blob();
      saveAs(blob, "transformed-image.png");
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      {transformedUrl && (
        <div className="aspect-video rounded-md relative bg-gray-200 overflow-hidden">
          {isLoading && <RenderLoading />}
          <Image
            key={transformedUrl}
            src={transformedUrl || ""}
            width={500}
            height={400}
            alt="Transformed image"
            className="w-full h-full object-contain"
            unoptimized
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>
      )}
      <div className="p-4 bg-gray-50 rounded-md">
        <p className="text-sm font-medium">Transformation URL:</p>
        <p
          className="
        text-xs font-mono break-all mt-2 p-2 bg-gray-100 rounded border border-gray-200
        "
        >
          {transformedUrl || "No URL generated yet."}
        </p>
      </div>

      {/* download button */}
      <button
        onClick={handleDownload}
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download Image
      </button>
    </div>
  );
}