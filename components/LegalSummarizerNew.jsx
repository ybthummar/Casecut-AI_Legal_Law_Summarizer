"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { 
    FileText, GitCompare, MessageCircleQuestion, BookOpen, UploadCloud, X, 
    Settings, Zap, Bot, FileSearch, AlertCircle, Eye, Loader2, Scale, 
    Download, Copy, AlertTriangle, Sparkles, HelpCircle, Search, CheckCircle, BarChart3
} from "lucide-react";

const DocumentUpload = ({ file, onFileChange, onDrop, onDragOver, label, id }) => {
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
          <h3 className="text-xl font-bold text-black">{label || "Upload Legal Document"}</h3>
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
            id={id || "file-upload"}
          />
          <UploadCloud className="h-12 w-12 mx-auto mb-3 text-gray-400" />
          <h4 className="text-base font-semibold text-gray-800 mb-1">
            Drag & drop or click to upload
          </h4>
          <p className="text-sm text-gray-500 mb-4">
            Your legal document here
          </p>
          <label
            htmlFor={id || "file-upload"}
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

const SummaryOptions = ({
  summaryMode,
  setSummaryMode,
  summaryLength,
  setSummaryLength,
  abstractiveModel,
  setAbstractiveModel
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Settings className="h-5 w-5 text-black" />
        </div>
        <h3 className="text-xl font-bold text-black">Summary Configuration</h3>
      </div>
      
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="mode-select" className="text-base font-semibold text-gray-800">
            Summary Mode
          </Label>
          <Select value={summaryMode} onValueChange={setSummaryMode}>
            <SelectTrigger id="mode-select" className="w-full h-12 text-sm rounded-lg border-gray-300 focus:border-black focus:ring-black">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="extractive" className="cursor-pointer">
                <div className="flex items-center gap-3 py-2 px-2">
                  <FileText className="h-4 w-4 text-black" />
                  <div>
                    <div className="font-medium">Extractive Only</div>
                    <div className="text-xs text-gray-500">Fast & reliable sentence extraction</div>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="abstractive" className="cursor-pointer">
                <div className="flex items-center gap-3 py-2 px-2">
                  <Bot className="h-4 w-4 text-gray-700" />
                  <div>
                    <div className="font-medium">Abstractive Only</div>
                    <div className="text-xs text-gray-500">AI-generated new content</div>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="hybrid" className="cursor-pointer">
                <div className="flex items-center gap-3 py-2 px-2">
                  <Zap className="h-4 w-4 text-gray-600" />
                  <div>
                    <div className="font-medium">Hybrid (Extract + Abstract)</div>
                    <div className="text-xs text-gray-500">Best of both approaches</div>
                  </div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="length-select" className="text-base font-semibold text-gray-800">Summary Length</Label>
          <Select value={summaryLength} onValueChange={setSummaryLength}>
            <SelectTrigger id="length-select" className="w-full h-12 text-sm rounded-lg border-gray-300 focus:border-black focus:ring-black">
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="short" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">Short (3-5 sentences)</div>
                  <div className="text-xs text-gray-500">Quick overview</div>
                </div>
              </SelectItem>
              <SelectItem value="medium" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">Medium (6-10 sentences)</div>
                  <div className="text-xs text-gray-500">Balanced detail</div>
                </div>
              </SelectItem>
              <SelectItem value="long" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">Long (11-15 sentences)</div>
                  <div className="text-xs text-gray-500">Comprehensive summary</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="model-select" className="text-base font-semibold text-gray-800">AI Model</Label>
          <Select value={abstractiveModel} onValueChange={setAbstractiveModel}>
            <SelectTrigger id="model-select" className="w-full h-12 text-sm rounded-lg border-gray-300 focus:border-black focus:ring-black">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent className="rounded-lg">
              <SelectItem value="t5" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">T5 (Fast & Balanced)</div>
                  <div className="text-xs text-gray-500">Recommended for most cases</div>
                </div>
              </SelectItem>
              <SelectItem value="pegasus" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">Pegasus (Accurate)</div>
                  <div className="text-xs text-gray-500">High quality summaries</div>
                </div>
              </SelectItem>
              <SelectItem value="led" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">LED (Long Documents)</div>
                  <div className="text-xs text-gray-500">Best for lengthy texts</div>
                </div>
              </SelectItem>
              <SelectItem value="bart" className="cursor-pointer">
                <div className="py-2 px-2">
                  <div className="font-medium">BART (General Purpose)</div>
                  <div className="text-xs text-gray-500">Versatile performance</div>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

const OCROptions = ({ extractionMode, setExtractionMode }) => {
  return (
    <div className="space-y-6 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <FileSearch className="h-5 w-5 text-black" />
        </div>
        <h3 className="text-xl font-bold text-black">Text Extraction</h3>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ocr-select" className="text-base font-semibold text-gray-800">
          Extraction Mode
        </Label>
        <Select value={extractionMode} onValueChange={setExtractionMode}>
          <SelectTrigger id="ocr-select" className="w-full h-12 text-sm rounded-lg border-gray-300 focus:border-black focus:ring-black">
            <SelectValue placeholder="Select extraction mode" />
          </SelectTrigger>
          <SelectContent className="rounded-lg">
            <SelectItem value="fallback" className="cursor-pointer">
              <div className="flex items-start gap-3 py-2 px-2">
                <Zap className="h-4 w-4 text-black mt-1 shrink-0" />
                <div>
                  <div className="font-medium flex items-center">
                    Smart Extraction w/ OCR Fallback
                    <span className="ml-2 text-xs font-semibold bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-normal">
                    Fast direct extraction, with automatic OCR for scanned or image-based PDFs.
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="force" className="cursor-pointer">
               <div className="flex items-start gap-3 py-2 px-2">
                <AlertCircle className="h-4 w-4 text-gray-700 mt-1 shrink-0" />
                <div>
                  <div className="font-medium flex items-center">
                    Force OCR Processing
                     <span className="ml-2 text-xs font-semibold bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full">
                      Advanced
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 whitespace-normal">
                    Always use OCR. Slower, but best for complex layouts or scanned documents.
                  </div>
                </div>
              </div>
            </SelectItem>
            <SelectItem value="direct" className="cursor-pointer">
              <div className="flex items-start gap-3 py-2 px-2">
                <Eye className="h-4 w-4 text-gray-600 mt-1 shrink-0" />
                <div>
                  <div className="font-medium">Direct Extraction Only</div>
                  <div className="text-xs text-gray-500 whitespace-normal">
                    Fastest option. Extracts text directly from the PDF. May fail on scanned documents.
                  </div>
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

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
  simplifyError 
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
            <div className="flex gap-2 flex-wrap justify-end">
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
              <Button
                size="sm"
                onClick={() => onSimplify(summary)}
                disabled={isSimplifying}
                className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
              >
                {isSimplifying ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Sparkles className="h-4 w-4 mr-1.5" />}
                 ✨ Simplify Summary
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
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
          {(isSimplifying || simplifiedSummary || simplifyError) && (
            <div className="pt-4 border-t border-gray-200">
                <h4 className="text-base font-bold text-black flex items-center mb-2">
                    <Sparkles className="h-5 w-5 mr-2 text-black" />
                    Simplified Explanation
                </h4>
                <div className={`w-full p-3 rounded-lg text-sm whitespace-pre-line border ${
                    simplifyError ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-gray-800'
                }`}>
                    {isSimplifying && <span className="italic text-gray-600">✨ CaseCut is thinking...</span>}
                    {simplifyError && `Error: ${simplifyError}`}
                    {simplifiedSummary && !isSimplifying && simplifiedSummary}
                </div>
            </div>
          )}
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

const IPCDetection = ({ ipcSections, isLoading, generalError }) => {
  return (
    <Card className="bg-white shadow-md rounded-xl border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-bold text-black">
          <Scale className="mr-2.5 h-5 w-5 text-black" />
          Detected IPC Sections
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && ipcSections.length === 0 ? (
          <p className="text-gray-500 italic">Detecting IPC sections...</p>
        ) : generalError ? (
          <p className="text-red-700 italic flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" /> Could not perform IPC detection due to an error.
          </p>
        ) : ipcSections.length > 0 ? (
          <ul className="space-y-3">
            {ipcSections.map((ipc, idx) => {
              const section = ipc.section || ipc.sectionNumber || ipc.id || ipc.code || "Unknown";
              const title = ipc.title || ipc.name || ipc.heading || ipc.description || "";
              const punishment = ipc.punishment || ipc.penalty || ipc.sentence || ipc.punishments || "N/A";
              return (
                <li key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <strong className="text-gray-900 font-semibold">{section}</strong>{title ? `: ${title}` : ""}
                  {punishment && (
                    <p className="text-sm text-gray-600 mt-1">
                      <strong>Punishment:</strong> {punishment}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No IPC sections were found in this PDF.</p>
        )}
      </CardContent>
    </Card>
  );
};

const ProgressIndicator = ({ isLoading, currentStep, progress }) => {
  if (!isLoading) return null;

  return (
    <div className="space-y-4 pt-4 animate-fade-in-up">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-black animate-spin" />
            <p className="text-sm font-medium text-black">{currentStep}</p>
        </div>
        <p className="text-sm font-semibold text-black">{progress}%</p>
      </div>
      <Progress value={progress} className="w-full h-2 [&>div]:bg-black" />
    </div>
  );
};

const DocumentComparison = () => {
  return (
    <Card className="bg-white shadow-lg rounded-xl border">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="text-center mb-2">
          <GitCompare className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <h3 className="text-xl font-semibold">Document Comparison</h3>
          <p className="text-gray-500">This feature is being polished and will be available soon.</p>
          <Badge className="mt-2" variant="outline">Coming Soon</Badge>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">What this feature will do</h4>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li>Side-by-side comparison of two legal PDFs</li>
            <li>Highlight key differences in facts, issues, and outcomes</li>
            <li>Measure similarity and overlap of sections</li>
            <li>Detect and summarize common legal themes</li>
            <li>Export comparison report as PDF</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const QuestionAnswering = ({
  documentText,
  question,
  setQuestion,
  answer,
  confidence,
  askQuestion,
  suggestedQuestions,
  isLoading,
}) => {
  return (
    <Card className="bg-white shadow-lg rounded-xl border">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="text-center mb-6">
          <MessageCircleQuestion className="h-8 w-8 mx-auto mb-2 text-blue-600" />
          <h3 className="text-xl font-semibold">Question & Answer System</h3>
          <p className="text-gray-500">Ask questions about the uploaded document</p>
        </div>

        {!documentText ? (
          <div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
            <h4 className="font-semibold text-yellow-800 mb-2">No Document Loaded</h4>
            <p className="text-yellow-700">Please upload and process a document in the "Single Document" tab first.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question-input" className="font-semibold">Ask a Question</Label>
              <div className="flex gap-2">
                <Input
                  id="question-input"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What is this case about?"
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
                />
                <Button
                  onClick={askQuestion}
                  disabled={!question.trim() || isLoading}
                  className="px-6 bg-black text-white hover:bg-gray-800"
                >
                  <Search className="mr-2 h-4 w-4" />
                  {isLoading ? "Asking..." : "Ask"}
                </Button>
              </div>
            </div>

            {suggestedQuestions && suggestedQuestions.length > 0 && (
              <div className="space-y-2">
                <Label className="font-semibold text-sm text-gray-600">Suggested Questions</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.slice(0, 4).map((q, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuestion(q)}
                      className="text-xs"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {answer && (
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Answer</h4>
                  {confidence && (
                    <Badge variant="outline" className="text-xs">
                      Confidence: {confidence}%
                    </Badge>
                  )}
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 whitespace-pre-wrap">{answer}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const CitationAnalysis = () => {
  return (
    <Card className="bg-white shadow-lg rounded-xl border">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="text-center mb-2">
          <BookOpen className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <h3 className="text-xl font-semibold">Citations & Legal Analysis</h3>
          <p className="text-gray-500">This feature will be unlocked soon.</p>
          <Badge className="mt-2" variant="outline">Coming Soon</Badge>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">What this feature will do</h4>
          <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
            <li>Extract case citations and legal references from the document</li>
            <li>Identify statutes and sections referenced (e.g., IPC, CrPC)</li>
            <li>Summarize arguments, holdings, and key legal findings</li>
            <li>Provide structured analytics like parties, decision, punishment</li>
            <li>Export analysis report with citations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Main App Component ---

const AnimatedLogo = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600&display=swap');
        
        @keyframes fill-in {
          0% { fill: transparent; stroke: #111827; stroke-dasharray: 4000; stroke-dashoffset: 4000; }
          50% { fill: transparent; stroke: #111827; stroke-dasharray: 4000; stroke-dashoffset: 0; }
          100% { fill: #111827; stroke: #111827; stroke-dasharray: 4000; stroke-dashoffset: 0; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.7s ease-out forwards; opacity: 0; }
      `}</style>
      <div className="relative mb-2">
        <svg width="50" height="50" viewBox="0 0 100 100" className="mx-auto">
          <path
            d="M20 30 L50 10 L80 30 L80 70 L50 90 L20 70 Z M30 40 L70 40 M30 50 L70 50 M30 60 L70 60"
            fill="none"
            stroke="#111827"
            strokeWidth="3"
            strokeLinejoin="round"
            style={{ animation: 'fill-in 2s ease-in-out forwards' }}
          />
        </svg>
      </div>
    </>
  );
};

const LegalSummarizerNew = () => {
  // File and basic settings
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null); // For comparison
  const [summaryLength, setSummaryLength] = useState("medium");
  const [abstractiveModel, setAbstractiveModel] = useState("t5");
  const [summaryMode, setSummaryMode] = useState("extractive");
  const [extractionMode, setExtractionMode] = useState("fallback");

  // Summary results
  const [extractiveSummary, setExtractiveSummary] = useState("");
  const [abstractiveSummary, setAbstractiveSummary] = useState("");
  const [hybridSummary, setHybridSummary] = useState("");
  const [ipcSections, setIpcSections] = useState([]);
  
  // Gemini Feature State
  const [simplifiedSummary, setSimplifiedSummary] = useState("");
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [simplifyError, setSimplifyError] = useState(null);
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [extractiveError, setExtractivError] = useState(null);
  const [generalError, setGeneralError] = useState(null);
  const [activeTab, setActiveTab] = useState("single");
  
  // State for other tabs
  const [documentText, setDocumentText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [citations, setCitations] = useState(null);

  const handleFileChange = useCallback((selectedFile) => {
    setFile(selectedFile);
    // Reset all results
    setExtractiveSummary("");
    setAbstractiveSummary("");
    setHybridSummary("");
    setIpcSections([]);
    setExtractivError(null);
    setGeneralError(null);
    setSimplifiedSummary("");
    setSimplifyError(null);
    setDocumentText("");
    setAnswer("");
    setComparisonResult(null);
    setCitations(null);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      handleFileChange(droppedFile);
    }
  }, [handleFileChange]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const generateSummary = async () => {
    if (!file) return;

    setIsLoading(true);
    setProgress(0);
    setCurrentStep("Uploading document...");
    setExtractiveSummary("");
    setAbstractiveSummary("");
    setIpcSections([]);
    setExtractivError(null);
    setGeneralError(null);
    setSimplifiedSummary("");
    setSimplifyError(null);
    // Determine OCR behavior from extractionMode
    const useOCR = extractionMode === 'fallback' || extractionMode === 'force';
    const forceOCR = extractionMode === 'force';
    // Build multipart form data for the server
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("summaryLength", summaryLength);
    formData.append("summaryMode", summaryMode);
    formData.append("abstractiveModel", abstractiveModel);
    formData.append("useOCR", String(useOCR));
    formData.append("forceOCR", String(forceOCR));

    try {
      setProgress(20);
      setCurrentStep("Processing PDF...");
      const response = await fetch("http://localhost:8001/summarize", { method: "POST", body: formData });
      setProgress(60);
      setCurrentStep("Generating summaries...");

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      if (data.error) setGeneralError(data.error);
      else {
        setExtractiveSummary(data.extractive || "");
        setAbstractiveSummary(data.abstractive || "");
        setHybridSummary(data.hybrid || "");
        setIpcSections(data.ipc_sections || []);
        setDocumentText(data.document_text || ""); 
        setSuggestedQuestions(data.suggested_questions || []);
        if (data.extractive_error) setExtractivError(data.extractive_error);
      }
      setProgress(100);
      setCurrentStep("Complete!");
    } catch (error) {
      console.error("Summarization failed:", error);
      setGeneralError("Failed to process document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getSimplifiedSummary = async (summaryToSimplify) => {
      if (!summaryToSimplify) return;
      setIsSimplifying(true);
      setSimplifiedSummary("");
      setSimplifyError(null);
      try {
          const response = await fetch("http://localhost:8001/simplified-summary", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: summaryToSimplify }),
          });
          if (!response.ok) {
              const text = await response.text().catch(() => "");
              throw new Error(`Simplify error ${response.status}: ${text || 'Server error'}`);
          }
          const result = await response.json();
          if (result.simplified) setSimplifiedSummary(result.simplified);
          else throw new Error("Server did not return simplified text.");
      } catch (error) {
          console.error("Simplification failed:", error);
          setSimplifyError(error.message || "Failed to get simplified summary.");
      } finally {
          setIsSimplifying(false);
      }
  };

  const compareDocuments = async () => {
    if (!file || !file2) return;
    setIsLoading(true);
    setCurrentStep("Comparing documents...");
    setComparisonResult(null);
    try {
      const formData = new FormData();
      formData.append("pdf1", file);
      formData.append("pdf2", file2);
      const response = await fetch("http://localhost:8001/compare", { method: "POST", body: formData });
      const data = await response.json();
      setComparisonResult(data);
    } catch (error) {
      console.error('Document comparison failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim() || !documentText) return;
    setIsLoading(true);
    setAnswer("");
    try {
      const response = await fetch("http://localhost:8001/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question, documentText: documentText }),
      });
      const data = await response.json();
      setAnswer(data.answer || "No answer available");
      setConfidence(data.confidence || null);
    } catch (error) {
      console.error('Question answering failed:', error);
      setAnswer("Failed to get answer. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const extractCitations = async () => {
    if (!documentText) return;
    setIsLoading(true);
    setCurrentStep("Extracting citations...");
    setCitations(null);
    try {
      const response = await fetch("http://localhost:8001/citations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentText: documentText }),
      });
      const data = await response.json();
      setCitations(data);
    } catch (error) {
      console.error('Citation extraction failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeLegalDocument = async () => {
    if (!documentText) return;
    setIsLoading(true);
    setCurrentStep("Analyzing document...");
    setCitations(null);
    try {
      const response = await fetch("http://localhost:8001/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentText: documentText }),
      });
      const data = await response.json();
      setCitations(data);
    } catch (error) {
      console.error('Document analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gray-50/50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 animate-fade-in-up">
            <AnimatedLogo />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              AI Legal Law Summarizer
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Complete legal document analysis with extractive & hybrid summarization, question-answering, 
              document comparison, citation extraction, and IPC detection.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger value="single" className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> Single Document
              </TabsTrigger>
              <TabsTrigger value="compare" className="flex items-center gap-2">
                <GitCompare className="h-4 w-4" /> Compare Documents
              </TabsTrigger>
              <TabsTrigger value="qa" className="flex items-center gap-2">
                <MessageCircleQuestion className="h-4 w-4" /> Q&A System
              </TabsTrigger>
              <TabsTrigger value="citations" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Citations & Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="mt-8 space-y-8">
              <Card className="bg-white shadow-lg rounded-2xl border border-gray-200">
                <CardContent className="p-6 sm:p-8 space-y-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <DocumentUpload
                      file={file}
                      onFileChange={handleFileChange}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                    />
                    
                    <div className="space-y-6">
                      <SummaryOptions
                        summaryMode={summaryMode}
                        setSummaryMode={setSummaryMode}
                        summaryLength={summaryLength}
                        setSummaryLength={setSummaryLength}
                        abstractiveModel={abstractiveModel}
                        setAbstractiveModel={setAbstractiveModel}
                      />
                      
                      <OCROptions
                        extractionMode={extractionMode}
                        setExtractionMode={setExtractionMode}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <ProgressIndicator
                      isLoading={isLoading}
                      currentStep={currentStep}
                      progress={progress}
                    />
                    
                    {!isLoading && (
                        <div className="flex justify-center mt-6">
                            <Button
                              onClick={generateSummary}
                              disabled={!file || isLoading}
                              className="px-10 py-3 text-base font-semibold bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                              Generate Summary
                            </Button>
                        </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {(extractiveSummary || abstractiveSummary || hybridSummary || isLoading || extractiveError || generalError) && (
                <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <SummaryDisplay
                    summaryMode={summaryMode}
                    extractiveSummary={extractiveSummary}
                    abstractiveSummary={abstractiveSummary}
                    hybridSummary={hybridSummary}
                    isLoading={isLoading}
                    extractiveError={extractiveError}
                    generalError={generalError}
                    onSimplify={getSimplifiedSummary}
                    simplifiedSummary={simplifiedSummary}
                    isSimplifying={isSimplifying}
                    simplifyError={simplifyError}
                  />
                  <IPCDetection
                    ipcSections={ipcSections}
                    isLoading={isLoading}
                    generalError={generalError}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="compare" className="mt-8">
              <DocumentComparison
                file={file}
                file2={file2}
                setFile={handleFileChange} 
                setFile2={setFile2}
                onDrop={onDrop}
                onDragOver={onDragOver}
                compareDocuments={compareDocuments}
                comparisonResult={comparisonResult}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="qa" className="mt-8">
              <QuestionAnswering
                documentText={documentText}
                question={question}
                setQuestion={setQuestion}
                answer={answer}
                confidence={confidence}
                askQuestion={askQuestion}
                suggestedQuestions={suggestedQuestions}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="citations" className="mt-8">
                <CitationAnalysis
                    documentText={documentText}
                    extractCitations={extractCitations}
                    analyzeLegalDocument={analyzeLegalDocument}
                    citations={citations}
                    isLoading={isLoading}
                />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default LegalSummarizerNew;

