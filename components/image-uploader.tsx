"use client";

import { useAppContext } from "@/context/app-context";
import { IKUpload, IKContext } from "imagekitio-react";
import { CheckCircle, Loader2, XCircle, UploadCloud } from "lucide-react";
import React, { useRef, useState, DragEvent } from "react";

export default function ImageUploader() {
  const ikUploadRef = useRef<HTMLInputElement>(null);
  const {
    setUploadedImageUrl,
    setSelectedTransformation,
    setTransformationParams,
  } = useAppContext();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [uploadStats, setUploadStats] = useState({ loaded: 0, total: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
  const authenticator = async () => {
    const response = await fetch("/api/auth");
    const data = await response.json();
    return { signature: data.signature, expire: data.expire, token: data.token };
  };

  const onError = () => setUploadStatus("error");

  const onSuccess = (res: { url: string }) => {
    setUploadStatus("success");
    setUploadProgress(100);
    if (res.url) {
      setUploadedImageUrl(res.url);
      setSelectedTransformation(null);
      setTransformationParams("");
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 KB";
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const resetUpload = () => {
    setUploadProgress(0);
    setUploadStatus("idle");
  };

  const uploadViaIkSdk = (files: FileList) => {
    if (ikUploadRef?.current) {
      const descriptor = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "files"
      );
      descriptor?.set?.call(ikUploadRef.current, files);
      ikUploadRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  const onProgress = (e: { loaded: number; total: number; lengthComputable: boolean }) => {
    if (e.lengthComputable) {
      setUploadStatus("uploading");
      setUploadProgress((e.loaded / e.total) * 100);
      setUploadStats({ loaded: e.loaded, total: e.total });
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      uploadViaIkSdk(e.dataTransfer.files);
    }
  };

  return (
    <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        onUploadProgress={onProgress}
        style={{ visibility: "hidden", height: 0, width: 0 }}
      />

      {/* Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 aspect-video flex flex-col items-center justify-center text-center transition-colors duration-300 ${
          isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
        } ${uploadStatus === "uploading" ? "opacity-75" : ""}`}
      >
        {uploadStatus === "idle" && (
          <>
            <UploadCloud className="w-12 h-12 text-blue-500 mb-3" />
            <p className="mb-1 text-gray-600 font-medium">Click or Drag & Drop to upload</p>
            <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              id="file-input"
              onChange={(e) => e.target.files && uploadViaIkSdk(e.target.files)}
            />
            <button
              className="mt-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md shadow hover:opacity-90 transition"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              Select File
            </button>
          </>
        )}

        {uploadStatus === "uploading" && (
          <div className="w-full max-w-xs space-y-3">
            <div className="flex items-center justify-center text-blue-600 font-medium">
              <Loader2 className="animate-spin h-5 w-5 mr-2" /> Uploading...
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(uploadProgress)}% ({formatBytes(uploadStats.loaded)} /{" "}
              {formatBytes(uploadStats.total)})
            </div>
          </div>
        )}

        {uploadStatus === "success" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 mb-4 shadow">
              <CheckCircle className="text-green-500 h-6 w-6" />
            </div>
            <p className="mb-2 text-green-600 font-medium">Upload Successful!</p>
            <button
              onClick={resetUpload}
              className="mt-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md shadow hover:opacity-90 transition"
            >
              Upload Another File
            </button>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4 shadow">
              <XCircle className="text-red-500 h-6 w-6" />
            </div>
            <p className="mb-1 text-red-600 font-medium">Upload Failed!</p>
            <p className="text-xs text-gray-500 mb-3">Please try again</p>
            <button
              onClick={resetUpload}
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md shadow hover:opacity-90 transition"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </IKContext>
  );
}
