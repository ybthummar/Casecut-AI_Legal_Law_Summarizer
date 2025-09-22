"use client";

import React from "react";
import { FileSearch, Zap, Eye, AlertCircle } from "lucide-react";

const OCROptions = ({ useOCR, setUseOCR, forceOCR, setForceOCR }) => {
  return (
    <div className="space-y-6 p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-gray-200 rounded-lg">
          <FileSearch className="h-6 w-6 text-black" />
        </div>
        <div>
          <h4 className="font-bold text-black text-xl sm:text-2xl">Text Extraction Options</h4>
          <p className="text-base text-gray-600">Configure how text is extracted from your PDF</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* OCR Fallback Option */}
        <div className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
          useOCR 
            ? 'border-gray-400 bg-gray-50 shadow-md' 
            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
        }`}>
          <label className="flex items-start space-x-4 cursor-pointer">
            <div className="relative mt-1">
              <input
                type="checkbox"
                checked={useOCR}
                onChange={(e) => setUseOCR(e.target.checked)}
                className="w-6 h-6 text-black border-2 border-gray-300 rounded focus:ring-gray-500 focus:ring-2"
              />
              {useOCR && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Zap className="h-4 w-4 text-black" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="h-5 w-5 text-black" />
                <span className="font-bold text-gray-900 text-lg">Enable OCR Fallback</span>
                <span className="px-3 py-1 bg-gray-200 text-gray-800 text-sm font-medium rounded-full">
                  Recommended
                </span>
              </div>
              <p className="text-base text-gray-600 leading-relaxed">
                Automatically use OCR technology if direct PDF text extraction fails or produces poor quality results. 
                This ensures maximum compatibility with all PDF types.
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>Works with scanned documents and image-based PDFs</span>
              </div>
            </div>
          </label>
        </div>
        
        {/* Force OCR Option */}
        <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
          !useOCR 
            ? 'border-gray-200 bg-gray-50 opacity-60' 
            : forceOCR 
              ? 'border-gray-500 bg-gray-100 shadow-md cursor-pointer' 
              : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50 cursor-pointer'
        }`}>
          <label className={`flex items-start space-x-4 ${useOCR ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
            <div className="relative mt-1">
              <input
                type="checkbox"
                checked={forceOCR}
                onChange={(e) => setForceOCR(e.target.checked)}
                disabled={!useOCR}
                className="w-6 h-6 text-black border-2 border-gray-300 rounded focus:ring-gray-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {forceOCR && useOCR && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <AlertCircle className="h-4 w-4 text-black" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className={`h-5 w-5 ${useOCR ? 'text-black' : 'text-gray-400'}`} />
                <span className={`font-bold text-lg ${useOCR ? 'text-gray-900' : 'text-gray-500'}`}>
                  Force OCR Processing
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  useOCR 
                    ? 'bg-gray-200 text-gray-800' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  Advanced
                </span>
              </div>
              <p className={`text-base leading-relaxed ${useOCR ? 'text-gray-600' : 'text-gray-500'}`}>
                Always use OCR instead of direct PDF text extraction. Use this for scanned documents, 
                image-based PDFs, or when direct extraction produces poor results.
              </p>
              <div className={`mt-3 flex items-center gap-2 text-sm ${
                useOCR ? 'text-gray-700' : 'text-gray-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  useOCR ? 'bg-gray-400' : 'bg-gray-300'
                }`}></div>
                <span>Slower processing but better for complex layouts</span>
              </div>
              {!useOCR && (
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>Enable OCR Fallback first to use this option</span>
                </div>
              )}
            </div>
          </label>
        </div>
      </div>
      
      {/* Status Indicator */}
      <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 text-base">
          <div className={`w-3 h-3 rounded-full ${
            forceOCR && useOCR 
              ? 'bg-gray-600' 
              : useOCR 
                ? 'bg-gray-400' 
                : 'bg-gray-300'
          }`}></div>
          <span className="font-bold text-gray-800">
            Current Mode: 
          </span>
          <span className={`font-bold ${
            forceOCR && useOCR 
              ? 'text-black' 
              : useOCR 
                ? 'text-gray-700' 
                : 'text-gray-600'
          }`}>
            {forceOCR && useOCR 
              ? 'Force OCR Processing' 
              : useOCR 
                ? 'Smart Extraction with OCR Fallback' 
                : 'Direct PDF Text Extraction Only'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default OCROptions;
