"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Bot, Zap, Download, Copy, AlertTriangle } from "lucide-react";

const SummaryDisplay = ({
  summaryMode,
  extractiveSummary,
  abstractiveSummary,
  hybridSummary,
  isLoading,
  extractiveError,
  generalError,
}) => {
  const onDownload = (content, type) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const onCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      // Optional: Add a toast notification for feedback
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderSummaryCard = (type, summary, icon, title) => {
    const hasError = extractiveError || generalError;
    const errorContent = `Error: ${extractiveError || generalError}`;
    
    let contentToShow = "";
    if (isLoading) contentToShow = "Generating summary, please wait...";
    else if (hasError) contentToShow = errorContent;
    else contentToShow = summary || "No summary was generated for this mode.";

    return (
      <Card className="bg-white shadow-md rounded-xl border border-gray-200">
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
                onClick={() => onDownload(summary, type)}
                className="text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                <Download className="h-4 w-4 mr-1.5" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopy(summary)}
                className="text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                <Copy className="h-4 w-4 mr-1.5" />
                Copy
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div
            className={`w-full p-3 rounded-lg text-sm read-only resize-none whitespace-pre-line border ${
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
    );
  };

  let summaryData;
  switch (summaryMode) {
    case 'extractive':
      summaryData = { type: 'extractive', summary: extractiveSummary, icon: <FileText className="mr-2.5 h-5 w-5 text-black" />, title: 'Extractive Summary' };
      break;
    case 'abstractive':
      summaryData = { type: 'abstractive', summary: abstractiveSummary, icon: <Bot className="mr-2.5 h-5 w-5 text-black" />, title: 'Abstractive Summary' };
      break;

    case 'hybrid':
      summaryData = { type: 'hybrid', summary: hybridSummary, icon: <Zap className="mr-2.5 h-5 w-5 text-black" />, title: 'Hybrid Summary' };
      break;
    default:
      return null;
  }

  return renderSummaryCard(summaryData.type, summaryData.summary, summaryData.icon, summaryData.title);
};

export default SummaryDisplay;
