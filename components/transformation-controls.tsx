"use client";

import { useAppContext } from "@/context/app-context";
import { ChangeEvent, useState } from "react";

const transformationOptions = [
  {
    id: "bgremove",
    name: "Remove Background (Standard)",
    description: "Cost-efficient background removal",
  },
  {
    id: "changebg",
    name: "Change Background",
    description: "Replace the background with a new one from text prompt",
    params: [
      {
        id: "prompt",
        name: "Background Prompt",
        type: "text",
      },
    ],
  },
];

export default function TransformationControls() {
  const {
    selectedTransformation,
    setSelectedTransformation,
    setTransformationParams,
  } = useAppContext();
  const [params, setParams] = useState<string>("");
  console.log(params);

  const handleTransformationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTransformation(e.target.value);
  };

  const selectedOption = transformationOptions.find(
    (option) => option.id === selectedTransformation
  );

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Transformation
        </label>
        
        <select
  value={selectedTransformation || ""}
  onChange={handleTransformationChange}
  className="w-full max-w-full mt-1 block pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-lg shadow-sm
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm
             transition duration-150 ease-in-out break-words text-ellipsis"
>
  <option value="">✨ Select a transformation</option>
  {transformationOptions.map((option) => (
    <option
      key={option.id}
      value={option.id}
      className="break-words"
    >
      {option.name} — {option.description}
    </option>
  ))}
</select>


        {selectedOption && (
          <p className="mt-2 text-sm text-gray-500">
            {selectedOption.description}
          </p>
        )}
      </div>

      {selectedOption?.params && selectedOption.params.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Parameters</h3>
          {selectedOption.params.map((param) => (
            <div key={param.id}>
              <label
                htmlFor={param.id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {param.name}
              </label>
              <input
                type={param.type}
                id={param.id}
                value={params}
                onChange={(e) => setParams(e.target.value)}
                name={param.id}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              <button
                onClick={() => {
                  if (params) {
                    setTransformationParams(params);
                  }
                }}
                className="bg-blue-600 text-white py-2 px-4 rounded-md my-4"
              >
                Apply Effect
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}