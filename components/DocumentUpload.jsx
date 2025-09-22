"use client";

import React from "react";
import { UploadCloud, FileText, X } from "lucide-react";

const DocumentUpload = ({ file, onFileChange, onDrop, onDragOver }) => {
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      onFileChange(selectedFile);
    }
  };

  const removeFile = () => {
    onFileChange(null);
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <FileText className="h-5 w-5 text-black" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black">Upload Legal Document</h3>
          <p className="text-sm text-gray-500">Select a PDF file to analyze</p>
        </div>
      </div>

      {!file ? (
        <div
          className="relative flex-grow flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 hover:border-black hover:bg-gray-50"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file-upload"
          />
          <UploadCloud className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <h4 className="text-base font-semibold text-gray-800 mb-1">
            Drag & drop or click to upload
          </h4>
          <p className="text-sm text-gray-500 mb-4">
            Your legal document here
          </p>
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <FileText className="h-4 w-4 mr-2" />
            Choose PDF File
          </label>
          <p className="text-xs text-gray-400 mt-3">PDF files only • Max 50MB</p>
        </div>
      ) : (
        <div className="flex-grow flex items-center border border-gray-200 rounded-xl p-4 bg-white">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="p-2 bg-green-100 rounded-lg shrink-0">
                <FileText className="h-5 w-5 text-green-700" />
              </div>
              <div className="truncate">
                <h4 className="font-semibold text-gray-900 truncate">{file.name}</h4>
                <p className="text-sm text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • PDF Document
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors shrink-0 ml-2"
              aria-label="Remove file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
