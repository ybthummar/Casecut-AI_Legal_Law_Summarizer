"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle, Clock, Zap } from "lucide-react";

const ProgressIndicator = ({ isLoading, currentStep, progress }) => {
  if (!isLoading) return null;

  const getStepIcon = () => {
    if (progress === 100) return <CheckCircle className="h-5 w-5 text-black" />;
    if (progress >= 60) return <Zap className="h-5 w-5 text-gray-700 animate-pulse" />;
    return <Clock className="h-5 w-5 text-gray-600" />;
  };

  const getProgressColor = () => {
    if (progress === 100) return "bg-black";
    if (progress >= 60) return "bg-gray-700";
    return "bg-gray-500";
  };

  return (
    <div className="space-y-6 py-6 animate-fade-in-up">
      {/* Main Progress Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 rounded-lg">
              <Loader2 className="h-6 w-6 text-black animate-spin" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg sm:text-xl">Processing Document</h3>
              <p className="text-base text-gray-600">Please wait while we analyze your file</p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <div className="text-3xl sm:text-4xl font-bold text-black">{progress}%</div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>

        {/* Current Step */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            {getStepIcon()}
            <span className="font-bold text-gray-800 text-lg">{currentStep}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="relative">
            <Progress 
              value={progress} 
              className="w-full h-4 bg-gray-100 rounded-full overflow-hidden"
            />
            {/* Animated overlay */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ease-out ${getProgressColor()} relative`}
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                {progress < 100 && (
                  <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent to-white opacity-30 animate-shimmer"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { step: "Upload", threshold: 20, icon: "📄" },
            { step: "Extract", threshold: 40, icon: "🔍" },
            { step: "Analyze", threshold: 80, icon: "🤖" },
            { step: "Complete", threshold: 100, icon: "✅" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center text-base transition-all duration-300 ${
                progress >= item.threshold 
                  ? 'bg-black text-white shadow-lg scale-110' 
                  : progress >= item.threshold - 20 
                    ? 'bg-gray-200 text-gray-700 animate-pulse' 
                    : 'bg-gray-100 text-gray-400'
              }`}>
                {progress >= item.threshold ? '✓' : item.icon}
              </div>
              <div className={`text-sm font-bold transition-colors duration-300 ${
                progress >= item.threshold 
                  ? 'text-black' 
                  : 'text-gray-500'
              }`}>
                {item.step}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Animation */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
          <span className="text-sm font-medium text-blue-700 ml-2">
            {progress === 100 ? 'Processing Complete!' : 'AI is working...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
