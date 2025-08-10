import { LoaderIcon } from "lucide-react";

export default function RenderLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70">
      <div className="flex flex-col items-center">
        <LoaderIcon className="animate-spin w-8 h-8" />
        <p className="mt-2 text-sm text-gray-600">Processing image...</p>
        <p className="text-xs text-gray-500">
          AI transformations may take a few seconds
        </p>
      </div>
    </div>
  );
}