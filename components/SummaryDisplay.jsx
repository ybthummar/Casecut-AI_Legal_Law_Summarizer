"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Bot, Zap, Download, Copy, AlertTriangle, Sparkles, CheckCircle, Loader2 } from "lucide-react";

const SummaryDisplay = ({
  summaryMode,
  extractiveSummary,
  abstractiveSummary,
  hybridSummary,
  isLoading,
  extractiveError,
  generalError,
  onSimplify,
  simplifiedSummary,
  isSimplifying,
  simplifyError,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showSimplified, setShowSimplified] = useState(false);
  const onDownload = (content, type) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Show download animation
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const onCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      // Show copy animation
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSimplify = (summary, modelName) => {
    if (onSimplify) {
      onSimplify(summary, modelName, summaryMode);
      setShowSimplified(true);
    }
  };

  const renderSummaryCard = (type, summary, icon, title, modelName) => {
    const hasError = extractiveError || generalError;
    const errorContent = `Error: ${extractiveError || generalError}`;
    
    let contentToShow = "";
    if (isLoading) contentToShow = "Generating summary, please wait...";
    else if (hasError) contentToShow = errorContent;
    else contentToShow = summary || "No summary was generated for this mode.";

    return (
      <div className="space-y-4">
        <Card className="bg-white shadow-md rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center text-lg font-bold text-black">
              {icon}
              {title}
            </CardTitle>
            {summary && !isLoading && !hasError && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSimplify(summary, modelName)}
                  disabled={isSimplifying}
                  className="text-purple-700 border-purple-300 hover:bg-purple-50 transition-all duration-200"
                >
                  {isSimplifying ? (
                    <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-1.5" />
                  )}
                  Simplify with CaseCut AI
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDownload(summary, type)}
                  className={`transition-all duration-300 ${
                    downloadSuccess 
                      ? 'text-green-700 border-green-300 bg-green-50' 
                      : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {downloadSuccess ? (
                    <CheckCircle className="h-4 w-4 mr-1.5 animate-bounce" />
                  ) : (
                    <Download className="h-4 w-4 mr-1.5" />
                  )}
                  {downloadSuccess ? 'Downloaded!' : 'Download'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCopy(summary)}
                  className={`transition-all duration-300 ${
                    copySuccess 
                      ? 'text-green-700 border-green-300 bg-green-50' 
                      : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {copySuccess ? (
                    <CheckCircle className="h-4 w-4 mr-1.5 animate-bounce" />
                  ) : (
                    <Copy className="h-4 w-4 mr-1.5" />
                  )}
                  {copySuccess ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`w-full p-3 rounded-lg text-sm read-only resize-none whitespace-pre-line border transition-all duration-200 ${
                hasError 
                  ? 'bg-red-50 border-red-200 text-red-800' 
                  : 'bg-gray-50 border-gray-200 text-gray-800'
              }`}
              style={{ minHeight: '200px' }}
            >
               {hasError && <AlertTriangle className="inline h-4 w-4 mr-2 mb-0.5" />}
               {contentToShow}
            </div>
          </CardContent>
        </Card>

        {/* CaseCut AI Simplified Summary */}
        {showSimplified && (simplifiedSummary || isSimplifying || simplifyError) && (
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 shadow-md rounded-xl border border-purple-200 animate-fade-in-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center text-lg font-bold text-purple-800">
                <Sparkles className="mr-2.5 h-5 w-5 text-purple-600" />
                CaseCut AI Simplified Summary
              </CardTitle>
              {simplifiedSummary && !isSimplifying && !simplifyError && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownload(simplifiedSummary, 'casecut-ai-simplified')}
                    className="text-purple-700 border-purple-300 hover:bg-purple-100"
                  >
                    <Download className="h-4 w-4 mr-1.5" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCopy(simplifiedSummary)}
                    className="text-purple-700 border-purple-300 hover:bg-purple-100"
                  >
                    <Copy className="h-4 w-4 mr-1.5" />
                    Copy
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div
                className={`w-full p-3 rounded-lg text-sm read-only resize-none whitespace-pre-line border transition-all duration-200 ${
                  simplifyError 
                    ? 'bg-red-50 border-red-200 text-red-800' 
                    : 'bg-white border-purple-200 text-gray-800'
                }`}
                style={{ minHeight: '200px' }}
              >
                {isSimplifying && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-purple-600 mr-3" />
                    <span className="text-purple-700">CaseCut AI is simplifying your summary...</span>
                  </div>
                )}
                {simplifyError && (
                  <>
                    <AlertTriangle className="inline h-4 w-4 mr-2 mb-0.5" />
                    Error: {simplifyError}
                  </>
                )}
                {simplifiedSummary && !isSimplifying && !simplifyError && simplifiedSummary}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  let summaryData;
  switch (summaryMode) {
    case 'extractive':
      summaryData = { 
        type: 'extractive', 
        summary: extractiveSummary, 
        icon: <FileText className="mr-2.5 h-5 w-5 text-black" />, 
        title: 'Extractive Summary',
        modelName: 'sbert'
      };
      break;
    case 'abstractive':
      summaryData = { 
        type: 'abstractive', 
        summary: abstractiveSummary, 
        icon: <Bot className="mr-2.5 h-5 w-5 text-black" />, 
        title: 'Abstractive Summary',
        modelName: 't5' // This should be dynamic based on selected model
      };
      break;
    case 'hybrid':
      summaryData = { 
        type: 'hybrid', 
        summary: hybridSummary, 
        icon: <Zap className="mr-2.5 h-5 w-5 text-black" />, 
        title: 'Hybrid Summary',
        modelName: 'hybrid'
      };
      break;
    default:
      return null;
  }

  return renderSummaryCard(
    summaryData.type, 
    summaryData.summary, 
    summaryData.icon, 
    summaryData.title, 
    summaryData.modelName
  );
};

export default SummaryDisplay;
