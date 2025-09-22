"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, FileSearch, BarChart3, FileText } from "lucide-react";

const CitationAnalysis = ({
  documentText,
  extractCitations,
  analyzeLegalDocument,
  citations,
  isLoading
}) => {
  return (
    <Card className="bg-white shadow-lg rounded-xl border">
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="text-center mb-6">
          <BookOpen className="h-8 w-8 mx-auto mb-2 text-orange-600" />
          <h3 className="text-xl font-semibold">Citations & Legal Analysis</h3>
          <p className="text-muted-foreground">Extract legal citations and perform comprehensive document analysis</p>
        </div>
        
        {!documentText ? (
          <div className="text-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
            <FileSearch className="h-12 w-12 mx-auto mb-4 text-yellow-600" />
            <h4 className="font-semibold text-yellow-800 mb-2">No Document Loaded</h4>
            <p className="text-yellow-700">Please upload and process a document in the "Single Document" tab first to analyze citations.</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Document Ready for Analysis</h4>
              <p className="text-blue-700 text-sm">Using the document uploaded in Single Document tab for citation analysis.</p>
            </div>
          
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                className="px-6 py-2 bg-orange-600 hover:bg-orange-700"
                onClick={extractCitations}
                disabled={!documentText || isLoading}
              >
                <FileSearch className="mr-2 h-4 w-4" />
                Extract Citations
              </Button>
              
              <Button
                variant="outline"
                className="px-6 py-2 border-orange-600 text-orange-600 hover:bg-orange-50"
                onClick={analyzeLegalDocument}
                disabled={!documentText || isLoading}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Full Analysis
              </Button>
            </div>
          </div>
        )}
        
        {citations && (
          <div className="space-y-4">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Citation Results
            </h4>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800">Total Citations</h5>
                <div className="mt-2">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {citations.totalCitations || 0}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="font-medium text-green-800">Document Length</h5>
                <p className="text-sm text-green-600 mt-1">
                  {citations.documentLength || 0} characters
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h5 className="font-medium text-purple-800">Word Count</h5>
                <p className="text-sm text-purple-600 mt-1">
                  {citations.wordCount || 0} words
                </p>
              </div>
            </div>
            
            {citations.citations && citations.citations.length > 0 && (
              <div className="space-y-3">
                <h5 className="font-medium">Found Citations</h5>
                <div className="space-y-2">
                  {citations.citations.map((citation, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border">
                      <p className="font-medium text-gray-800">{citation.text}</p>
                      {citation.type && (
                        <Badge variant="outline" className="mt-1 text-xs">
                          {citation.type}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {citations.analysis && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-2">Analysis Summary</h5>
                <div className="space-y-2 text-sm text-gray-700">
                  {citations.analysis.documentType && (
                    <p><strong>Document Type:</strong> {citations.analysis.documentType}</p>
                  )}
                  {citations.analysis.complexity && (
                    <p><strong>Complexity:</strong> {citations.analysis.complexity}</p>
                  )}
                  {citations.analysis.ipcSections && citations.analysis.ipcSections.length > 0 && (
                    <div>
                      <strong>IPC Sections Found:</strong>
                      <ul className="mt-1 ml-4">
                        {citations.analysis.ipcSections.map((section, idx) => (
                          <li key={idx} className="text-xs">• {section.section}: {section.title}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CitationAnalysis;
