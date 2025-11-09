"use client";

import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeProvider } from "../contexts/ThemeContext";
import ThemeSelector from "./ThemeSelector";
import { 
    UploadCloud, FileText, Upload, GitCompare, MessageCircleQuestion, BarChart3, Settings,
    BookOpen, X, Zap, Bot, FileSearch, AlertCircle, Eye, Loader2, Scale, 
    Download, Copy, AlertTriangle, Sparkles, HelpCircle, Search
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
                    <div className="font-medium">Extractive Only (SBERT)</div>
                    <div className="text-xs text-gray-500">Fast & reliable sentence extraction using SBERT model</div>
                  </div>
                </div>
              </SelectItem>
              <SelectItem value="abstractive" className="cursor-pointer">
                <div className="flex items-center gap-3 py-2 px-2">
                  <Bot className="h-4 w-4 text-gray-700" />
                  <div>
                    <div className="font-medium">Abstractive Only</div>
                    <div className="text-xs text-gray-500">AI-generated summaries using transformer models</div>
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
        {(summaryMode === 'abstractive' || summaryMode === 'hybrid') && (
          <div className="space-y-2">
            <Label htmlFor="model-select" className="text-base font-semibold text-gray-800">Abstractive AI Model</Label>
            <Select value={abstractiveModel} onValueChange={setAbstractiveModel}>
              <SelectTrigger id="model-select" className="w-full h-12 text-sm rounded-lg border-gray-300 focus:border-black focus:ring-black">
                <SelectValue placeholder="Select abstractive model" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                <SelectItem value="t5" className="cursor-pointer">
                  <div className="py-2 px-2">
                    <div className="font-medium">T5 (Recommended)</div>
                    <div className="text-xs text-gray-500">Fine-tuned T5 for legal document summarization</div>
                  </div>
                </SelectItem>
                <SelectItem value="bart" className="cursor-pointer">
                  <div className="py-2 px-2">
                    <div className="font-medium">BART</div>
                    <div className="text-xs text-gray-500">Legal-specific BART model for high-quality summaries</div>
                  </div>
                </SelectItem>
                <SelectItem value="pegasus" className="cursor-pointer">
                  <div className="py-2 px-2">
                    <div className="font-medium">Pegasus</div>
                    <div className="text-xs text-gray-500">Pegasus model optimized for abstractive summarization</div>
                  </div>
                </SelectItem>
                <SelectItem value="led" className="cursor-pointer">
                  <div className="py-2 px-2">
                    <div className="font-medium">LED</div>
                    <div className="text-xs text-gray-500">Longformer Encoder-Decoder for very long documents</div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

const ExtractionInfo = () => {
  return (
    <div className="space-y-6 pt-6 border-t border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <FileSearch className="h-5 w-5 text-black" />
        </div>
        <h3 className="text-xl font-bold text-black">Text Extraction</h3>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Eye className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Direct PDF Text Extraction</h4>
            <p className="text-sm text-blue-800 mb-2">
              Currently using fast, direct text extraction from PDF files. Works best with text-based PDFs.
            </p>
            <div className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">
              🚀 OCR for scanned documents coming soon!
            </div>
          </div>
        </div>
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
    <Card className="bg-[var(--color-cardBg)] shadow-[var(--shadow-md)] rounded-xl border border-[var(--color-cardBorder)]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="flex items-center text-lg font-bold text-[var(--color-text)]">
          {icon}
          {title}
        </CardTitle>
        <div className="flex items-center gap-2">
          {!isLoading && !hasError && summary && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCopy(summary)}
                className="text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-surface)]"
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownload(summary, type)}
                className="text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-surface)]"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`p-4 rounded-lg border text-sm ${
          hasError 
            ? 'bg-red-50 border-red-200 text-red-800' 
            : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text)]'
        }`}>
          {/* Enhanced formatting for structured summaries */}
          <div 
            className="whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: contentToShow
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/📋|🔍|⚖️|📜|📄/g, '<span class="text-lg">$&</span>')
            }}
          />
        </div>
        
        {type === 'extractive' && !isLoading && !hasError && summary && (
          <div className="mt-4">
            <Button
              onClick={() => onSimplify(summary)}
              disabled={isSimplifying}
              className="w-full bg-[var(--color-primary)] text-white hover:opacity-90"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isSimplifying ? "Simplifying..." : "Simplify with CaseCut AI"}
            </Button>
          </div>
        )}
        
        {simplifiedSummary && type === 'extractive' && (
          <div className="mt-4">
              <h4 className="font-semibold text-[var(--color-text)] mb-2 flex items-center">
                  <Sparkles className="mr-2 h-4 w-4" />
                  CaseCut AI Simplified Summary
              </h4>
              <div className={`w-full p-3 rounded-lg text-sm whitespace-pre-line border ${
                  simplifyError 
                    ? 'bg-red-50 border-red-200 text-red-800' 
                    : 'bg-blue-50 border-blue-200 text-[var(--color-text)]'
              }`}>
                  {isSimplifying && <span className="italic text-[var(--color-textSecondary)]">✨ CaseCut is thinking...</span>}
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
      summaryData = { type: 'extractive', summary: extractiveSummary, icon: <FileText className="mr-2.5 h-5 w-5 text-[var(--color-primary)]" />, title: 'Extractive Summary' };
      break;
    case 'abstractive':
      summaryData = { type: 'abstractive', summary: abstractiveSummary, icon: <Bot className="mr-2.5 h-5 w-5 text-[var(--color-primary)]" />, title: 'Abstractive Summary' };
      break;
    case 'hybrid':
      summaryData = { type: 'hybrid', summary: hybridSummary, icon: <Zap className="mr-2.5 h-5 w-5 text-[var(--color-primary)]" />, title: 'Hybrid Summary' };
      break;
    default:
      return null;
  }

  return renderSummaryCard(summaryData.type, summaryData.summary, summaryData.icon, summaryData.title);
};

const IPCDetection = ({ ipcSections, isLoading, generalError }) => {
  return (
    <Card className="bg-[var(--color-cardBg)] shadow-[var(--shadow-md)] rounded-xl border border-[var(--color-cardBorder)]">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-bold text-[var(--color-text)]">
          <Scale className="mr-2.5 h-5 w-5 text-[var(--color-accent)]" />
          Detected IPC Sections
          {ipcSections.length > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {ipcSections.length} found
            </Badge>
          )}
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

const CitationAnalysis = ({ documentText, extractCitations, analyzeLegalDocument, citations, isLoading }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-[var(--color-cardBg)] shadow-[var(--shadow-lg)] rounded-xl border border-[var(--color-cardBorder)]">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="text-center mb-6">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-[var(--color-accent)]" />
            <h3 className="text-xl font-semibold text-[var(--color-text)]">Citation & Legal Analysis</h3>
            <p className="text-[var(--color-textSecondary)]">Extract legal citations and analyze document structure</p>
          </div>

          {!documentText ? (
            <div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
              <h4 className="font-semibold text-yellow-800 mb-2">No Document Loaded</h4>
              <p className="text-yellow-700">Please upload and process a document in the "Single Document" tab first.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={extractCitations}
                  disabled={isLoading}
                  className="w-full bg-[var(--color-accent)] text-white hover:opacity-90 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Extracting Citations...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Extract Citations
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={analyzeLegalDocument}
                  disabled={isLoading}
                  className="w-full bg-[var(--color-success)] text-white hover:opacity-90 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Document...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Analyze Document
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Citations Results */}
      {citations && (
        <Card className="bg-[var(--color-cardBg)] shadow-[var(--shadow-md)] rounded-xl border border-[var(--color-cardBorder)]">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-bold text-[var(--color-text)]">
              <BookOpen className="mr-2.5 h-5 w-5 text-[var(--color-accent)]" />
              Legal Citations & Analysis
              {citations.citations && citations.citations.length > 0 && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  {citations.citations.length} citations found
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Citations Section */}
            {citations.citations && citations.citations.length > 0 && (
              <div>
                <h4 className="font-semibold text-[var(--color-text)] mb-3 flex items-center">
                  <Scale className="mr-2 h-4 w-4" />
                  Legal Citations
                </h4>
                <div className="grid gap-3">
                  {citations.citations.map((citation, index) => (
                    <div key={index} className="p-3 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
                      <div className="font-medium text-[var(--color-text)]">{citation.text}</div>
                      {citation.type && (
                        <div className="text-sm text-[var(--color-textSecondary)] mt-1">
                          Type: {citation.type}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Entities Section */}
            {citations.entities && citations.entities.length > 0 && (
              <div>
                <h4 className="font-semibold text-[var(--color-text)] mb-3 flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  Key Entities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {citations.entities.map((entity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {entity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Summary Section */}
            {citations.summary && (
              <div>
                <h4 className="font-semibold text-[var(--color-text)] mb-3 flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  Analysis Summary
                </h4>
                <div className="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] text-[var(--color-text)]">
                  {citations.summary}
                </div>
              </div>
            )}

            {/* No Results */}
            {(!citations.citations || citations.citations.length === 0) && 
             (!citations.entities || citations.entities.length === 0) && 
             !citations.summary && (
              <div className="text-center p-8 text-[var(--color-textSecondary)]">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No citations or analysis results found in this document.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
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
    <Card className="bg-[var(--color-cardBg)] shadow-[var(--shadow-lg)] rounded-xl border border-[var(--color-cardBorder)]">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="text-center mb-6">
          <MessageCircleQuestion className="h-8 w-8 mx-auto mb-2 text-[var(--color-accent)]" />
          <h3 className="text-xl font-semibold text-[var(--color-text)]">Enhanced Q&A System</h3>
          <p className="text-[var(--color-textSecondary)]">Ask intelligent questions about the uploaded document</p>
        </div>

        {!documentText ? (
          <div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
            <h4 className="font-semibold text-yellow-800 mb-2">No Document Loaded</h4>
            <p className="text-yellow-700">Please upload and process a document in the "Single Document" tab first.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Question Input Section */}
            <div className="space-y-4">
              <Label htmlFor="question" className="text-sm font-medium text-[var(--color-text)]">
                Ask a question about the document:
              </Label>
              <div className="flex gap-3">
                <Input
                  id="question"
                  type="text"
                  placeholder="e.g., What are the main charges in this case?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && askQuestion()}
                  className="flex-1 bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-text)]"
                />
                <Button
                  onClick={askQuestion}
                  disabled={!question.trim() || isLoading}
                  className="bg-[var(--color-accent)] text-white hover:opacity-90 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Suggested Questions */}
            {suggestedQuestions && suggestedQuestions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[var(--color-text)] mb-3">Suggested Questions:</h4>
                <div className="grid gap-2">
                  {suggestedQuestions.slice(0, 5).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuestion(suggestion)}
                      className="text-left justify-start h-auto p-3 text-[var(--color-text)] border-[var(--color-border)] hover:bg-[var(--color-surface)]"
                    >
                      <HelpCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Answer Section */}
            {(answer || isLoading) && (
              <Card className="bg-[var(--color-surface)] border-[var(--color-border)]">
                <CardHeader>
                  <CardTitle className="flex items-center text-base font-semibold text-[var(--color-text)]">
                    <MessageCircleQuestion className="mr-2 h-4 w-4" />
                    Answer
                    {confidence && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {confidence}% confidence
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center space-x-2 text-[var(--color-textSecondary)]">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Analyzing document and generating answer...</span>
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none text-[var(--color-text)]">
                      {answer}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// --- Main App Component ---

const AnimatedLogo = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800;900&display=swap');
        
        @keyframes logo-draw {
          0% { 
            fill: transparent; 
            stroke: var(--color-accent); 
            stroke-dasharray: 3000; 
            stroke-dashoffset: 3000; 
            opacity: 0;
          }
          20% {
            opacity: 1;
            stroke-dashoffset: 2400;
          }
          40% {
            stroke-dashoffset: 1800;
          }
          60% {
            stroke-dashoffset: 1200;
          }
          80% { 
            fill: transparent; 
            stroke: var(--color-accent); 
            stroke-dasharray: 3000; 
            stroke-dashoffset: 600; 
            opacity: 1;
          }
          90% {
            stroke-dashoffset: 0;
          }
          100% { 
            fill: var(--color-accent); 
            stroke: var(--color-accent); 
            stroke-dasharray: 3000; 
            stroke-dashoffset: 0; 
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes title-fade-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up { 
          animation: fade-in-up 0.7s ease-out forwards; 
          opacity: 0; 
        }
        
        .logo-container {
          /* No infinite animation - just the initial draw */
        }
        
        .logo-svg path {
          animation: logo-draw 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          animation-delay: 0.5s;
        }
        
        .title-animate {
          animation: title-fade-in 1s ease-out forwards;
          animation-delay: 2s;
          opacity: 0;
        }
        
        .brand-title {
          font-family: 'Orbitron', monospace;
          font-weight: 800;
          letter-spacing: 0.1em;
          background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .subtitle {
          font-family: 'Poppins', sans-serif;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: var(--color-textSecondary);
          text-transform: uppercase;
          font-size: 0.9em;
          opacity: 0.8;
        }
      `}</style>
      <div className="logo-container relative mb-6">
        <svg 
          className="logo-svg mx-auto" 
          width="80" 
          height="80" 
          viewBox="0 0 300 300" 
          preserveAspectRatio="xMidYMid meet"
        >
          <g transform="translate(0,300) scale(0.1,-0.1)">
            <path d="M1314 2587 c-68 -45 -74 -58 -74 -164 0 -85 -3 -98 -30 -146 -16 -30
-30 -60 -30 -69 0 -8 18 -41 41 -72 l41 -58 -23 -16 c-13 -9 -55 -30 -93 -47
-38 -16 -78 -41 -88 -56 -12 -16 -33 -95 -58 -215 -43 -209 -53 -246 -73 -278
-37 -56 -82 -223 -102 -376 -4 -30 -11 -64 -15 -75 -6 -17 -8 -17 -21 10 -38
77 -85 49 -74 -45 3 -30 6 -68 6 -84 0 -33 27 -90 65 -135 33 -40 26 -49 -54
-64 -39 -7 -64 -18 -72 -30 -15 -25 -6 -32 27 -19 15 6 51 14 78 17 l51 6 26
-93 c14 -51 25 -94 24 -95 0 -1 -61 33 -135 75 l-133 77 4 525 c2 289 0 505
-4 480 -18 -116 -39 -444 -45 -725 l-6 -311 424 -248 c233 -137 429 -249 434
-249 6 0 195 108 421 241 227 133 419 244 428 248 27 10 22 518 -8 824 l-24
235 -1 -506 -1 -507 -171 -101 c-94 -55 -175 -98 -180 -95 -5 3 -9 16 -9 28 0
38 -109 625 -131 706 -11 41 -31 94 -45 117 -13 23 -24 56 -24 73 0 59 70 433
85 457 24 36 72 61 155 79 41 9 112 29 158 44 45 15 82 26 82 24 0 -16 -53
-180 -61 -191 -28 -33 49 -67 151 -67 92 0 186 50 149 78 -15 11 -109 251
-109 277 0 8 13 52 29 99 l28 85 78 33 c66 27 77 29 72 15 -2 -10 -30 -101
-62 -203 -31 -102 -59 -192 -62 -201 -7 -25 46 -41 139 -41 83 1 174 17 183
33 3 4 -4 14 -14 21 -13 9 -44 79 -84 189 -35 96 -69 184 -75 195 -6 12 -7 25
-3 30 5 5 12 19 15 30 l7 22 -83 -24 c-45 -12 -84 -22 -85 -20 -9 9 43 116 67
136 37 32 53 72 37 93 -20 24 -60 47 -83 47 -30 0 -64 -45 -64 -85 0 -18 -18
-70 -39 -116 -63 -135 -56 -145 10 -14 l60 120 -5 -55 c-3 -30 -6 -74 -6 -98
0 -42 -1 -42 -62 -73 -54 -27 -66 -38 -86 -80 -13 -26 -35 -61 -50 -77 -40
-42 -143 -65 -299 -66 l-122 -1 5 36 c5 28 1 41 -21 67 -15 18 -40 40 -56 49
-25 15 -29 23 -29 64 0 35 -6 52 -25 73 -22 24 -25 36 -25 107 0 79 0 79 -39
118 -37 37 -42 39 -101 38 -51 0 -69 -5 -106 -30z" 
              fill="var(--color-accent)" 
              stroke="var(--color-accent)" 
              strokeWidth="2"
            />
          </g>
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
    
    // Build multipart form data for the server
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("summaryLength", summaryLength);
    formData.append("summaryMode", summaryMode);
    formData.append("abstractiveModel", abstractiveModel);

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

  const getSimplifiedSummary = async (summaryToSimplify, modelName, summaryMode) => {
      if (!summaryToSimplify) return;
      setIsSimplifying(true);
      setSimplifiedSummary("");
      setSimplifyError(null);
      try {
          const response = await fetch("http://localhost:8001/simplify-summary", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                originalSummary: summaryToSimplify,
                modelName: modelName || abstractiveModel,
                summaryLength: summaryLength,
                userDetails: {
                  summaryMode: summaryMode
                }
              }),
          });
          if (!response.ok) {
              const text = await response.text().catch(() => "");
              throw new Error(`CaseCut AI error ${response.status}: ${text || 'Server error'}`);
          }
          const result = await response.json();
          if (result.success && result.simplifiedSummary) {
            setSimplifiedSummary(result.simplifiedSummary);
          } else if (result.simplifiedSummary) {
            // Fallback mode
            setSimplifiedSummary(result.simplifiedSummary);
          } else {
            throw new Error("CaseCut AI did not return a simplified summary.");
          }
      } catch (error) {
          console.error("CaseCut AI simplification failed:", error);
          setSimplifyError(error.message || "Failed to get CaseCut AI simplified summary.");
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
    <div className="bg-[var(--color-background)] min-h-screen">
      <section className="bg-[var(--color-surface)] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="relative">
            {/* Theme Selector - Positioned absolutely */}
            <div className="absolute top-0 right-0 z-10">
              <ThemeSelector />
            </div>
            
            {/* Centered Content with Enhanced Animations */}
            <div className="text-center space-y-8">
              <div className="animate-fade-in-down stagger-1">
                <AnimatedLogo />
              </div>
              
              <div className="space-y-3">
                <h1 className="brand-title text-5xl md:text-7xl font-black tracking-wider animate-fade-in-up stagger-2 transition-smooth hover:scale-105">
                  CASECUT
                </h1>
                <h2 className="subtitle text-sm md:text-base tracking-widest animate-fade-in-up stagger-3 text-purple-600">
                  AI Legal Law Summarizer
                </h2>
                <div className="animate-fade-in-up stagger-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full border border-purple-200">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">Powered by CaseCut AI</span>
                  </div>
                </div>
              </div>
              
              <p className="text-[var(--color-textSecondary)] text-base md:text-lg max-w-4xl mx-auto leading-relaxed animate-fade-in-up stagger-5 px-4 break-words">
                Complete legal document analysis with extractive & hybrid summarization, intelligent question-answering, 
                document comparison, citation extraction, and IPC detection powered by advanced AI.
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-[var(--color-surface)] border border-[var(--color-border)] p-1 rounded-xl transition-smooth hover:shadow-lg">
              <TabsTrigger 
                value="single" 
                className="flex items-center gap-2 text-[var(--color-text)] data-[state=active]:bg-[var(--color-accent)] data-[state=active]:text-white transition-smooth hover:bg-gray-100"
              >
                <FileText className="h-4 w-4 transition-smooth" /> Single Document
              </TabsTrigger>
              <TabsTrigger 
                value="compare" 
                className="flex items-center gap-2 text-[var(--color-text)] data-[state=active]:bg-[var(--color-accent)] data-[state=active]:text-white transition-smooth hover:bg-gray-100"
              >
                <GitCompare className="h-4 w-4 transition-smooth" /> Compare Documents
              </TabsTrigger>
              <TabsTrigger 
                value="qna" 
                className="flex items-center gap-2 text-[var(--color-text)] data-[state=active]:bg-[var(--color-accent)] data-[state=active]:text-white transition-smooth hover:bg-gray-100"
              >
                <MessageCircleQuestion className="h-4 w-4 transition-smooth" /> Q&A System
              </TabsTrigger>
              <TabsTrigger 
                value="analysis" 
                className="flex items-center gap-2 text-[var(--color-text)] data-[state=active]:bg-[var(--color-accent)] data-[state=active]:text-white transition-smooth hover:bg-gray-100"
              >
                <BarChart3 className="h-4 w-4 transition-smooth" /> Analysis
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
                      
                      <ExtractionInfo />
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
            <TabsContent value="qna" className="mt-8">
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
            
            <TabsContent value="analysis" className="mt-8">
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

// Wrap the component with ThemeProvider
const ThemedLegalSummarizer = () => {
  return (
    <ThemeProvider>
      <LegalSummarizerNew />
    </ThemeProvider>
  );
};

export default ThemedLegalSummarizer;

