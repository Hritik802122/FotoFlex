"use client";

import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/app-context";
import RenderLoading from "@/components/render-loading";

export default function LandingPage() {
  const { isLoading, setIsLoading } = useAppContext();
  const router = useRouter();

  const handleGetStarted = () => {
    setIsLoading(true);

    // Delay to let the loader be visible
    setTimeout(() => {
      router.push("/upload");
    }, 800);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-500 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 dark:bg-black/70 flex items-center justify-center z-50">
          <RenderLoading />
        </div>
      )}

      <h1 className="text-8xl font-extrabold text-blue-600 mb-2 tracking-tight">
        FotoFlex
      </h1>
      <p className="text-2xl text-gray-500 dark:text-gray-400 mb-6 ">
        AI Image Transformation
      </p>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-10">
        Transform your images with AI using{" "}
        <span className="font-semibold">ImageKit.io</span>. Upload, edit, and enhance your pictures effortlessly.
      </p>

      <button
        onClick={handleGetStarted}
        disabled={isLoading}
        className={`px-8 py-3 rounded-lg shadow-lg transition transform hover:scale-105 
          ${isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90"}`}
      >
        {isLoading ? "Loading..." : "Get Started"}
      </button>
    </main>
  );
}
