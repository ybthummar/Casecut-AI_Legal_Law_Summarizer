"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Scissors, 
  Bot, 
  Merge, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Loader2
} from "lucide-react";

const ProcessingTimeline = ({ 
  jobId, 
  isVisible = false, 
  onComplete = () => {}, 
  onError = () => {} 
}) => {
  const [status, setStatus] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(null);
  const [error, setError] = useState(null);

  // Processing steps configuration
  const steps = [
    {
      key: 'extracting',
      label: 'Text Extraction',
      icon: FileText,
      description: 'Extracting text from PDF with page boundaries'
    },
    {
      key: 'chunking',
      label: 'Intelligent Chunking',
      icon: Scissors,
      description: 'Splitting text into optimal chunks for processing'
    },
    {
      key: 'summarizing',
      label: 'AI Summarization',
      icon: Bot,
      description: 'Generating summaries using advanced AI models'
    },
    {
      key: 'merging',
      label: 'Summary Merging',
      icon: Merge,
      description: 'Combining and deduplicating results'
    },
    {
      key: 'finalizing',
      label: 'Finalizing',
      icon: CheckCircle,
      description: 'Preparing final results'
    }
  ];

  // Poll job status
  useEffect(() => {
    if (!jobId || !isVisible) return;

    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/summary_status/${jobId}`);
        const data = await response.json();

        if (data.success) {
          setStatus(data.status);
          setProgress(data.progress || 0);
          setCurrentStep(data.currentStep);
          setTimeline(data.timeline || []);

          if (data.status === 'completed') {
            onComplete(data.result);
            return; // Stop polling
          } else if (data.status === 'failed') {
            setError(data.error);
            onError(data.error);
            return; // Stop polling
          }
        }
      } catch (err) {
        console.error('Failed to fetch job status:', err);
        setError('Failed to fetch processing status');
        onError('Failed to fetch processing status');
        return; // Stop polling on error
      }

      // Continue polling if job is still processing
      if (status === 'processing' || status === 'pending') {
        setTimeout(pollStatus, 1000); // Poll every second
      }
    };

    pollStatus();
  }, [jobId, isVisible, status, onComplete, onError]);

  if (!isVisible || !jobId) {
    return null;
  }

  const getStepStatus = (stepKey) => {
    if (error) return 'error';
    if (currentStep === stepKey) return 'active';
    
    const stepIndex = steps.findIndex(s => s.key === stepKey);
    const currentIndex = steps.findIndex(s => s.key === currentStep);
    
    if (currentIndex > stepIndex) return 'completed';
    if (status === 'completed') return 'completed';
    
    return 'pending';
  };

  const getStepIcon = (step, stepStatus) => {
    const IconComponent = step.icon;
    
    if (stepStatus === 'error') {
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    } else if (stepStatus === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (stepStatus === 'active') {
      return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
    } else {
      return <IconComponent className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          Casecut Processing — {currentStep ? steps.find(s => s.key === currentStep)?.label : 'Initializing'}
        </CardTitle>
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{progress}% Complete</span>
            <span className="capitalize">{status || 'Starting'}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Processing Error</span>
            </div>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          {steps.map((step, index) => {
            const stepStatus = getStepStatus(step.key);
            const isLast = index === steps.length - 1;

            return (
              <div key={step.key} className="relative">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`
                      p-2 rounded-full border-2 transition-all duration-300
                      ${stepStatus === 'completed' ? 'bg-green-50 border-green-200' : 
                        stepStatus === 'active' ? 'bg-blue-50 border-blue-200' :
                        stepStatus === 'error' ? 'bg-red-50 border-red-200' :
                        'bg-gray-50 border-gray-200'}
                    `}>
                      {getStepIcon(step, stepStatus)}
                    </div>
                    {!isLast && (
                      <div className={`
                        w-0.5 h-8 mt-2 transition-all duration-300
                        ${stepStatus === 'completed' ? 'bg-green-200' : 'bg-gray-200'}
                      `} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`
                        font-medium transition-all duration-300
                        ${stepStatus === 'active' ? 'text-blue-700' :
                          stepStatus === 'completed' ? 'text-green-700' :
                          stepStatus === 'error' ? 'text-red-700' :
                          'text-gray-600'}
                      `}>
                        {step.label}
                      </h4>
                      
                      <Badge variant={
                        stepStatus === 'completed' ? 'default' :
                        stepStatus === 'active' ? 'secondary' :
                        stepStatus === 'error' ? 'destructive' :
                        'outline'
                      } className="text-xs">
                        {stepStatus === 'completed' ? 'Done' :
                         stepStatus === 'active' ? 'Processing' :
                         stepStatus === 'error' ? 'Error' :
                         'Pending'}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1">
                      {step.description}
                    </p>

                    {/* Show timeline details for active/completed steps */}
                    {timeline.find(t => t.step === step.key) && (
                      <div className="mt-2 text-xs text-gray-400">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {new Date(timeline.find(t => t.step === step.key).timestamp).toLocaleTimeString()}
                        {timeline.find(t => t.step === step.key).message && (
                          <span className="ml-2">
                            — {timeline.find(t => t.step === step.key).message}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {status === 'completed' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-4 w-4" />
              <span className="font-medium">Processing Complete!</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Your legal document has been successfully analyzed by Casecut AI.
            </p>
          </div>
        )}

        <div className="text-xs text-gray-400 text-center pt-2 border-t">
          Powered by Casecut AI — Advanced Legal Document Analysis
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingTimeline;
