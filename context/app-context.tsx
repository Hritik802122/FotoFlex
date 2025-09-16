"use client";

import { createContext, useContext, useState } from "react";

// Define the context type
interface AppState {
  uploadedImageUrl: string | null;
  setUploadedImageUrl: (url: string | null) => void;
  selectedTransformation: string | null;
  setSelectedTransformation: (transformation: string | null) => void;
  transformationParams: string;
  setTransformationParams: (params: string) => void;
  

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>("");
  const [selectedTransformation, setSelectedTransformation] = useState<
    string | null
  >(null);
  const [transformationParams, setTransformationParams] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const contextValue = {
    uploadedImageUrl,
    setUploadedImageUrl,
    selectedTransformation,
    setSelectedTransformation,
    transformationParams,
    setTransformationParams,
    isLoading,
    setIsLoading,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
